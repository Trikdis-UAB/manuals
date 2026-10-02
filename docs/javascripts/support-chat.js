// Support chat, loaded on demand: our own Chatwoot at chat.trikdis.com (Joy answers
// there), or respond.io Website Chat while we compare the two.
//
// Nothing from the chat provider loads until a visitor clicks our chat button. The
// widget writes a visitor id into storage as soon as it loads, so loading it on
// every page view would need cookie consent; loading it on request does not.
// After a visitor has opened the chat once, later page loads bring the widget
// back automatically so their conversation stays reachable.
//
// Config comes from the JSON block that mkdocs_hooks.py injects into each page.
// ?chat_preview=1 uses the configured provider; ?chat_preview=respondio or
// ?chat_preview=chatwoot picks one for this tab.
(function () {
  var CONFIG_ID = "trikdocs-chat-config";
  var PREVIEW_SESSION_KEY = "trikdocs-chat-preview-enabled";
  var PROVIDER_SESSION_KEY = "trikdocs-chat-provider";
  var ENGAGED_KEY = "trikdocs-chat-engaged";
  var LAUNCHER_ID = "trikdocs-chat-launcher";
  var SCRIPT_ID = "respondio__widget";
  var SCRIPT_BASE = "https://cdn.respond.io/webchat/widget/widget.js?cId=";
  var CHATWOOT_SCRIPT_ID = "trikdocs-chatwoot-sdk";
  var PROVIDERS = ["chatwoot", "respondio"];
  var DEFAULT_PREVIEW_QUERY = "chat_preview";

  var state = window.__TRIKDOCS_CHAT__ || {
    hostMatched: false,
    online: navigator.onLine !== false,
    permitted: false,
    previewEnabled: false,
    scriptRequested: false,
    openRequested: false,
    subscribed: false
  };
  window.__TRIKDOCS_CHAT__ = state;

  function storageGet(storage, key) {
    try {
      return window[storage].getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storageSet(storage, key, value) {
    try {
      window[storage].setItem(key, value);
    } catch (error) {
      return null;
    }
    return value;
  }

  function storageRemove(storage, key) {
    try {
      window[storage].removeItem(key);
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
      var chatwoot = parsed.chatwoot || {};
      return {
        enabled: parsed.enabled === true,
        provider: PROVIDERS.indexOf(parsed.provider) !== -1 ? parsed.provider : "respondio",
        channelId: parsed.channelId || "",
        chatwoot: { baseUrl: chatwoot.baseUrl || "", websiteToken: chatwoot.websiteToken || "" },
        hosts: Array.isArray(parsed.hosts) ? parsed.hosts : [],
        previewOnly: parsed.previewOnly !== false,
        previewQuery: parsed.previewQuery || DEFAULT_PREVIEW_QUERY
      };
    } catch (error) {
      state.error = "invalid-config";
      return null;
    }
  }

  // ?chat_preview=1 turns the preview gate on for this browser tab,
  // ?chat_preview=0 turns it off, and a provider name turns it on with that
  // provider. The parameter is removed from the address bar.
  function updatePreviewState(queryName) {
    var url;
    var requested = null;

    try {
      url = new URL(window.location.href);
      requested = url.searchParams.get(queryName);
    } catch (error) {
      url = null;
    }

    if (requested === "1") {
      storageSet("sessionStorage", PREVIEW_SESSION_KEY, "1");
      storageRemove("sessionStorage", PROVIDER_SESSION_KEY);
    } else if (PROVIDERS.indexOf(requested) !== -1) {
      storageSet("sessionStorage", PREVIEW_SESSION_KEY, "1");
      storageSet("sessionStorage", PROVIDER_SESSION_KEY, requested);
    } else if (requested === "0") {
      storageRemove("sessionStorage", PREVIEW_SESSION_KEY);
      storageRemove("sessionStorage", PROVIDER_SESSION_KEY);
    }

    if (url && requested !== null) {
      url.searchParams.delete(queryName);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }

    state.previewEnabled = storageGet("sessionStorage", PREVIEW_SESSION_KEY) === "1";
    return state.previewEnabled;
  }

  // respond.io passes "chat:open" into its iframe, and the message is lost while
  // the iframe is still starting. So keep asking until it reports "chat:opened",
  // for up to 10 seconds.
  function openWhenReady(attempt) {
    var api = window.$respond;
    if (state.opened || attempt >= 40) {
      return;
    }
    if (api && typeof api.do === "function") {
      if (!state.openListenerBound && typeof api.on === "function") {
        state.openListenerBound = true;
        api.on("chat:opened", function () {
          state.opened = true;
        });
      }
      api.do("chat:open");
    }
    window.setTimeout(function () {
      openWhenReady(attempt + 1);
    }, 250);
  }

  function loadWidget(config) {
    if (state.provider === "chatwoot") {
      loadChatwoot(config.chatwoot);
      return;
    }
    if (state.scriptRequested || document.getElementById(SCRIPT_ID)) {
      state.scriptRequested = true;
      return;
    }

    var script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_BASE + encodeURIComponent(config.channelId);
    script.async = true;
    script.onload = function () {
      state.scriptLoaded = true;
    };
    document.head.appendChild(script);
    state.scriptRequested = true;
  }

  // The page language, from the site's /en/, /lt/, /es/, /ru/ paths: the widget's
  // own texts follow it.
  function pageLocale() {
    var match = window.location.pathname.match(/^\/(en|lt|es|ru)(\/|$)/);
    return match ? match[1] : "en";
  }

  // Chatwoot: its SDK script, then chatwootSDK.run(). It announces "chatwoot:ready"
  // on window; a requested open waits for that.
  function loadChatwoot(chatwoot) {
    if (state.scriptRequested || document.getElementById(CHATWOOT_SCRIPT_ID)) {
      state.scriptRequested = true;
      return;
    }
    if (!state.readyListenerBound) {
      state.readyListenerBound = true;
      window.addEventListener("chatwoot:ready", function () {
        state.widgetReady = true;
        if (window.$chatwoot && typeof window.$chatwoot.setLocale === "function") {
          window.$chatwoot.setLocale(pageLocale());
        }
        openChatwootIfRequested();
      });
    }
    window.chatwootSettings = {
      position: "right",
      type: "standard",
      locale: pageLocale(),
      darkMode: "auto"
    };
    var base = chatwoot.baseUrl.replace(/\/+$/, "");
    var script = document.createElement("script");
    script.id = CHATWOOT_SCRIPT_ID;
    script.src = base + "/packs/js/sdk.js";
    script.async = true;
    script.onload = function () {
      state.scriptLoaded = true;
      if (window.chatwootSDK && typeof window.chatwootSDK.run === "function") {
        window.chatwootSDK.run({ websiteToken: chatwoot.websiteToken, baseUrl: base });
      }
    };
    document.head.appendChild(script);
    state.scriptRequested = true;
  }

  function openChatwootIfRequested() {
    if (!state.openRequested || state.opened || !state.widgetReady || !window.$chatwoot) {
      return;
    }
    window.$chatwoot.toggle("open");
    state.opened = true;
  }

  function removeLauncher() {
    var launcher = document.getElementById(LAUNCHER_ID);
    if (launcher && launcher.parentNode) {
      launcher.parentNode.removeChild(launcher);
    }
  }

  function renderLauncher(config) {
    if (document.getElementById(LAUNCHER_ID)) {
      return;
    }

    var button = document.createElement("button");
    button.id = LAUNCHER_ID;
    button.type = "button";
    button.className = "trikdocs-chat-launcher";
    button.setAttribute("aria-label", "Chat with TRIKDIS Support");
    button.title = "Chat with TRIKDIS Support";
    button.innerHTML =
      '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2zm3 6v2h2V9H7zm4 0v2h2V9h-2zm4 0v2h2V9h-2z"/>' +
      "</svg>";
    button.addEventListener("click", function () {
      storageSet("localStorage", ENGAGED_KEY, "1");
      state.openRequested = true;
      loadWidget(config);
      if (state.provider === "chatwoot") {
        openChatwootIfRequested();
      } else {
        openWhenReady(0);
      }
      removeLauncher();
    });
    document.body.appendChild(button);
  }

  function sync() {
    var config = readConfig();

    state.config = config;
    if (!config) {
      state.reason = "missing-config";
      removeLauncher();
      return;
    }

    state.hostMatched = config.hosts.indexOf(window.location.hostname) !== -1;
    if (!state.hostMatched) {
      state.permitted = false;
      state.reason = "host-mismatch";
      removeLauncher();
      return;
    }

    updatePreviewState(config.previewQuery);
    // Once a widget is on the page, stay with it until the next full page load.
    if (!state.scriptRequested) {
      var chosen = storageGet("sessionStorage", PROVIDER_SESSION_KEY);
      state.provider = PROVIDERS.indexOf(chosen) !== -1 ? chosen : config.provider;
    }
    var configured = state.provider === "chatwoot"
      ? !!(config.chatwoot.baseUrl && config.chatwoot.websiteToken)
      : !!config.channelId;
    state.permitted = config.enabled && configured && (!config.previewOnly || state.previewEnabled);

    if (!state.permitted) {
      state.reason = config.enabled && configured ? "preview-gated" : "disabled";
      removeLauncher();
      return;
    }

    // Once the widget is on the page it brings its own launcher.
    if (state.scriptRequested) {
      state.reason = "widget-loaded";
      removeLauncher();
      return;
    }

    if (storageGet("localStorage", ENGAGED_KEY) === "1") {
      state.reason = "restored";
      state.restored = true;
      loadWidget(config);
      removeLauncher();
      return;
    }

    if (!state.online) {
      state.reason = "offline";
      removeLauncher();
      return;
    }

    state.reason = "launcher";
    renderLauncher(config);
  }

  function subscribe() {
    if (state.subscribed) {
      return;
    }
    state.subscribed = true;

    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(sync);
    }
    window.addEventListener("pageshow", sync);
    window.addEventListener("online", function () {
      state.online = true;
      sync();
    });
    window.addEventListener("offline", function () {
      state.online = false;
      sync();
    });
  }

  subscribe();
  sync();
})();
