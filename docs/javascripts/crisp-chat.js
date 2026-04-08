(function () {
  var CONFIG_ID = "trikdocs-crisp-config";
  var PREVIEW_SESSION_KEY = "trikdocs-crisp-preview-enabled";
  var DEFAULT_HOST = "docs.trikdis.com";
  var DEFAULT_PREVIEW_QUERY = "chat_preview";
  var DEFAULT_LOCALES = ["en", "lt", "es", "ru"];
  var SCRIPT_ID = "trikdocs-crisp-loader";
  var SCRIPT_SRC = "https://client.crisp.chat/l.js";

  var state = window.__TRIKDOCS_CRISP__ || {
    available: true,
    hostMatched: false,
    locale: "en",
    online: navigator.onLine !== false,
    permitted: false,
    previewEnabled: false,
    scriptLoaded: false,
    scriptRequested: false,
    started: false,
    subscribed: false
  };
  window.__TRIKDOCS_CRISP__ = state;

  function safeSessionGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSessionSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      return null;
    }
    return value;
  }

  function safeSessionRemove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      return null;
    }
    return null;
  }

  function readConfig() {
    var node = document.getElementById(CONFIG_ID);
    if (!node || !node.textContent) {
      return null;
    }

    try {
      var parsed = JSON.parse(node.textContent);
      return {
        enabled: parsed.enabled === true,
        host: parsed.host || DEFAULT_HOST,
        locales: Array.isArray(parsed.locales) && parsed.locales.length ? parsed.locales : DEFAULT_LOCALES,
        previewOnly: parsed.previewOnly !== false,
        previewQuery: parsed.previewQuery || DEFAULT_PREVIEW_QUERY,
        websiteId: parsed.websiteId || ""
      };
    } catch (error) {
      state.error = "invalid-config";
      return null;
    }
  }

  function cleanQueryParam(queryName) {
    var url;

    try {
      url = new URL(window.location.href);
    } catch (error) {
      return;
    }

    if (!url.searchParams.has(queryName)) {
      return;
    }

    url.searchParams.delete(queryName);
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }

  function updatePreviewState(queryName) {
    var url;
    var requested;

    try {
      url = new URL(window.location.href);
      requested = url.searchParams.get(queryName);
    } catch (error) {
      requested = null;
    }

    if (requested === "1") {
      safeSessionSet(PREVIEW_SESSION_KEY, "1");
    } else if (requested === "0") {
      safeSessionRemove(PREVIEW_SESSION_KEY);
    }

    if (requested !== null) {
      cleanQueryParam(queryName);
    }

    state.previewEnabled = safeSessionGet(PREVIEW_SESSION_KEY) === "1";
    return state.previewEnabled;
  }

  function detectLocale(locales) {
    var segments = (window.location.pathname || "/").split("/").filter(Boolean);
    if (segments.length && locales.indexOf(segments[0]) !== -1) {
      return segments[0];
    }
    return "en";
  }

  function ensureRuntimeConfig(locale) {
    window.CRISP_RUNTIME_CONFIG = Object.assign({}, window.CRISP_RUNTIME_CONFIG || {}, {
      locale: locale
    });
    state.locale = locale;
  }

  function pushCrisp(command) {
    if (!window.$crisp) {
      window.$crisp = [];
    }
    if (typeof window.$crisp.push === "function") {
      window.$crisp.push(command);
    }
  }

  function syncVisibility() {
    state.shouldShow = !!(state.started && state.permitted && state.online && state.available);

    if (!state.started || !window.$crisp || typeof window.$crisp.push !== "function") {
      return;
    }

    pushCrisp(["do", state.shouldShow ? "chat:show" : "chat:hide"]);
  }

  function bindNetworkListeners() {
    if (state.networkListenersBound) {
      return;
    }

    state.networkListenersBound = true;
    window.addEventListener("online", function () {
      state.online = true;
      syncVisibility();
    });
    window.addEventListener("offline", function () {
      state.online = false;
      syncVisibility();
    });
  }

  function bindAvailabilityListener() {
    if (state.availabilityListenerBound) {
      return;
    }

    state.availabilityListenerBound = true;
    pushCrisp(["on", "website:availability:changed", function (isAvailable) {
      state.available = isAvailable !== false;
      syncVisibility();
    }]);
  }

  function injectLoader() {
    if (document.getElementById(SCRIPT_ID)) {
      state.scriptRequested = true;
      return;
    }

    var script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = function () {
      state.scriptLoaded = true;
      syncVisibility();
    };
    document.head.appendChild(script);
    state.scriptRequested = true;
  }

  function bootstrap(config, locale) {
    ensureRuntimeConfig(locale);
    bindNetworkListeners();

    if (state.started) {
      syncVisibility();
      return;
    }

    state.started = true;
    state.available = true;
    window.CRISP_WEBSITE_ID = config.websiteId;

    pushCrisp(["config", "position:reverse", [false]]);
    pushCrisp(["config", "color:theme", ["red"]]);
    pushCrisp(["config", "color:mode", ["auto"]]);
    pushCrisp(["config", "hide:on:away", [true]]);

    bindAvailabilityListener();
    injectLoader();
    syncVisibility();
  }

  function sync() {
    var config = readConfig();
    var locale;

    state.config = config;
    if (!config) {
      state.reason = "missing-config";
      return;
    }

    state.hostMatched = window.location.hostname === config.host;
    if (!state.hostMatched) {
      state.permitted = false;
      state.reason = "host-mismatch";
      syncVisibility();
      return;
    }

    locale = detectLocale(config.locales);
    ensureRuntimeConfig(locale);
    updatePreviewState(config.previewQuery);

    state.permitted = !config.previewOnly || state.previewEnabled;
    if (!config.enabled || !config.websiteId) {
      state.reason = "disabled";
      syncVisibility();
      return;
    }

    if (!state.permitted) {
      state.reason = "preview-gated";
      syncVisibility();
      return;
    }

    state.reason = "boot";
    bootstrap(config, locale);
  }

  function subscribeToNavigation() {
    if (state.subscribed) {
      return;
    }

    state.subscribed = true;
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(sync);
    }

    window.addEventListener("pageshow", sync);
  }

  subscribeToNavigation();
  sync();
})();
