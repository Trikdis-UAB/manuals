// Support chat, loaded on demand: our own Chatwoot at chat.trikdis.com, where Joy
// (TRIKDIS's AI assistant) answers. respond.io, used before it, lapsed on 2026-10-05.
//
// Nothing from Chatwoot loads until a visitor clicks our chat button. The
// widget writes a visitor id into storage as soon as it loads, so loading it on
// every page view would need cookie consent; loading it on request does not.
// After a visitor has opened the chat once, later page loads bring the widget
// back automatically so their conversation stays reachable.
//
// Config comes from the JSON block that mkdocs_hooks.py injects into each page.
(function () {
  var CONFIG_ID = "trikdocs-chat-config";
  var PREVIEW_SESSION_KEY = "trikdocs-chat-preview-enabled";
  var ENGAGED_KEY = "trikdocs-chat-engaged";
  var LAUNCHER_ID = "trikdocs-chat-launcher";
  var CHATWOOT_SCRIPT_ID = "trikdocs-chatwoot-sdk";
  var TEASER_ID = "trikdocs-chat-teaser";
  var TEASER_DISMISSED_KEY = "trikdocs-chat-teaser-dismissed";
  var TEASER_SHOWN_KEY = "trikdocs-chat-teaser-shown";
  var TEASER_PDF_KEY = "trikdocs-chat-pdf-downloaded";
  // The teaser invites only when the page suggests the visitor would welcome help (Andrius and
  // Codex, 2026-10-28: time on a page alone says nothing; half the visits to a manual last 40 s+):
  // - a settled search with no results, or two different settled searches within 2 min without
  //   opening a result;
  // - or, after 2 min of reading, coming back twice to the same wiring or LED/fault section after
  //   15 s+ elsewhere.
  // Only on a product's pages, once a visit, never after that product's PDF was downloaded in this
  // visit, and only 5 s after the search, cookie or picture overlay closed. The text is about the
  // page ("Questions about GET wiring?"), never about what the visitor did.
  // Tests shorten the timings with window.__trikdocsTeaserTiming = { dwellMs, returnGapMs, quietMs }.
  var TEASER_DWELL_MS = 120000;
  var TEASER_RETURN_GAP_MS = 15000;
  var TEASER_QUIET_MS = 5000;
  var TEASER_SEARCH_WINDOW_MS = 120000;
  // The product a page is about, from its path.
  var PRODUCT_NAMES = {
    "g16": "G16", "g16t": "G16T", "get": "GET", "gt": "GT", "gt-plus": "GT+", "e16": "E16",
    "e16t": "E16T", "t16": "T16", "firecom": "FIRECOM", "g17f": "G17F", "cg17": "CG17",
    "sp3": "SP3", "io-8": "iO-8", "io-lora": "iO-LORA", "io8-lora": "iO8-LoRa",
    "pb-lora": "PB-LoRa", "rf-lora": "RF-LoRa", "rf-s8": "RF-S8", "gator": "GATOR",
    "gator-io4r": "GATOR", "gator-wifi": "GATOR WiFi", "flexi-sk-lcd": "SK-LCD TouchPad",
    "flexi-sk-led": "SK-LED TouchPad", "sk-lcd-button": "SK-LCD", "sk-lcd-touchpad": "SK-LCD TouchPad",
    "sk-led-button": "SK-LED", "sk-led-touchpad": "SK-LED TouchPad", "rl14": "RL14",
    "ipcom": "IPcom", "rt2": "RT2", "rth2": "RTH2", "r11": "R11", "rfh11": "RFH11", "rr-ip12": "R-IP12"
  };
  // Sections worth coming back to: wiring, and LED indication or faults.
  var WIRING_RE = /wiring|connect|schematic|terminal|prijung|jungim|schem|gnybt|conexi|esquema|подключ|схем/i;
  var TROUBLE_RE = /\bLED|indicat|trouble|fault|troubleshoot|indikac|gedim|šviesos|indicaci|fallo|averí|индикац|неисправ/i;
  // Joy's face, next to this script: /javascripts/ -> /images/.
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || "";
  // The teaser says in a few words that Joy is an AI assistant, so "Ask Joy" doesn't read as a person;
  // her full introduction comes in the chat's first message (Codex review, Andrius 2026-10-28).
  var LABELS = {
    en: { launcher: "Chat with Joy, TRIKDIS AI assistant", close: "Close",
          wiring: "Questions about {p} wiring? Ask Joy, our AI assistant.",
          trouble: "Questions about the {p}'s indications or faults? Ask Joy, our AI assistant.",
          product: "Questions about the {p}? Ask Joy, our AI assistant." },
    lt: { launcher: "Pokalbis su Joy, TRIKDIS DI asistente", close: "Uždaryti",
          wiring: "Klausimų apie {p} prijungimą? Klauskite Joy, mūsų DI asistentės.",
          trouble: "Klausimų apie {p} indikaciją ar gedimus? Klauskite Joy, mūsų DI asistentės.",
          product: "Klausimų apie {p}? Klauskite Joy, mūsų DI asistentės." },
    es: { launcher: "Chatea con Joy, la asistente de IA de TRIKDIS", close: "Cerrar",
          wiring: "¿Preguntas sobre la conexión del {p}? Pregunta a Joy, nuestra asistente de IA.",
          trouble: "¿Preguntas sobre las indicaciones o fallos del {p}? Pregunta a Joy, nuestra asistente de IA.",
          product: "¿Preguntas sobre el {p}? Pregunta a Joy, nuestra asistente de IA." },
    ru: { launcher: "Чат с Joy, ИИ-ассистентом TRIKDIS", close: "Закрыть",
          wiring: "Вопросы о подключении {p}? Спросите Joy, нашего ИИ-ассистента.",
          trouble: "Вопросы об индикации или неисправностях {p}? Спросите Joy, нашего ИИ-ассистента.",
          product: "Вопросы о {p}? Спросите Joy, нашего ИИ-ассистента." }
  };
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

  // ?chat_preview=1 turns the preview gate on for this browser tab (so does the
  // older ?chat_preview=chatwoot), ?chat_preview=0 turns it off. The parameter is
  // removed from the address bar.
  function updatePreviewState(queryName) {
    var url;
    var requested = null;

    try {
      url = new URL(window.location.href);
      requested = url.searchParams.get(queryName);
    } catch (error) {
      url = null;
    }

    if (requested === "1" || requested === "chatwoot") {
      storageSet("sessionStorage", PREVIEW_SESSION_KEY, "1");
    } else if (requested === "0") {
      storageRemove("sessionStorage", PREVIEW_SESSION_KEY);
    }

    if (url && requested !== null) {
      url.searchParams.delete(queryName);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }

    state.previewEnabled = storageGet("sessionStorage", PREVIEW_SESSION_KEY) === "1";
    return state.previewEnabled;
  }

  function loadWidget(config) {
    loadChatwoot(config.chatwoot);
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
        tagConversation();
        openChatwootIfRequested();
      });
      window.addEventListener("chatwoot:on-message", countChatStart);
      // navigation.instant: pages change without reloading this script.
      if (window.document$ && typeof window.document$.subscribe === "function") {
        window.document$.subscribe(function () {
          if (state.widgetReady) {
            tagConversation();
          }
        });
      }
    }
    window.chatwootSettings = {
      position: "right",
      type: "standard",
      locale: pageLocale(),
      darkMode: "auto",
      // A button in the chat header that opens the chat in a window of its own.
      showPopoutButton: true
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

  // What a chat tells us about where it came from (2026-10-12):
  // - In Chatwoot, each chat carries the manual page and language the visitor is on
  //   (conversation attributes docs_page and docs_lang). That is support context, not
  //   tracking, so it needs no cookie consent. Before the first message the widget holds
  //   them and sends them with it.
  // - In Google Analytics, a chat's start is an event, joy_chat_started, with the chat's
  //   number (chat_id, as Chatwoot shows it) and language. GA adds country, device and how
  //   the visitor arrived, so a chat can be matched to its visit. Only with the visitor's
  //   analytics consent: the theme creates window.dataLayer only after that.
  var CHAT_COUNTED_KEY = "trikdocs-chat-counted";

  function tagConversation() {
    if (!window.$chatwoot || typeof window.$chatwoot.setConversationCustomAttributes !== "function") {
      return;
    }
    var page = window.location.pathname;
    if (state.taggedPage === page) {
      return;
    }
    state.taggedPage = page;
    window.$chatwoot.setConversationCustomAttributes({ docs_page: page, docs_lang: pageLocale() });
  }

  // The cookieless analytics (analytics-cookieless.js) get the same event without consent,
  // so nothing is remembered on the device for them: once per chat per page load here,
  // and reports count distinct chat_id values.
  var cookielessCounted = {};

  function countChatStart(event) {
    var data = event && event.detail;
    var id = data && data.conversation_id;
    if (!id) {
      return;
    }
    if (!cookielessCounted[id] && window.trikdocsAnalytics) {
      cookielessCounted[id] = true;
      window.trikdocsAnalytics.cookieless("joy_chat_started", { chat_id: String(id), chat_lang: pageLocale(),
                                                               via: state.openedVia || (state.restored ? "restored" : "launcher") });
    }
    if (!Array.isArray(window.dataLayer)) {
      return;
    }
    var counted = (storageGet("localStorage", CHAT_COUNTED_KEY) || "").split(",");
    if (counted.indexOf(String(id)) !== -1) {
      return;
    }
    counted.push(String(id));
    storageSet("localStorage", CHAT_COUNTED_KEY, counted.slice(-20).join(","));
    // The same call the theme's gtag makes: dataLayer takes the arguments object.
    (function () {
      window.dataLayer.push(arguments);
    })("event", "joy_chat_started", { chat_id: String(id), chat_lang: pageLocale() });
  }

  function openChatwootIfRequested() {
    if (!state.openRequested || state.opened || !state.widgetReady || !window.$chatwoot) {
      return;
    }
    window.$chatwoot.toggle("open");
    state.opened = true;
  }

  function labels() {
    return LABELS[pageLocale()] || LABELS.en;
  }

  function avatarUrl() {
    try {
      return new URL("../images/joy-avatar.svg", SCRIPT_SRC || window.location.href).href;
    } catch (error) {
      return "/images/joy-avatar.svg";
    }
  }

  function removeTeaser() {
    var teaser = document.getElementById(TEASER_ID);
    if (teaser && teaser.parentNode) {
      teaser.parentNode.removeChild(teaser);
    }
  }

  function removeLauncher() {
    removeTeaser();
    var launcher = document.getElementById(LAUNCHER_ID);
    if (launcher && launcher.parentNode) {
      launcher.parentNode.removeChild(launcher);
    }
  }

  function pageProduct() {
    var parts = window.location.pathname.split("/").filter(Boolean);
    for (var i = parts.length - 1; i >= 0; i -= 1) {
      if (Object.prototype.hasOwnProperty.call(PRODUCT_NAMES, parts[i])) {
        return PRODUCT_NAMES[parts[i]];
      }
    }
    return null;
  }

  // The section being read: the last chapter (h2) above the middle of the screen, with its
  // subsection (h3); both texts count ("Mounting" sits inside "Installation and wiring").
  function sectionInView() {
    var headings = document.querySelectorAll(".md-content h2, .md-content h3");
    var chapter = null;
    var sub = "";
    for (var i = 0; i < headings.length; i += 1) {
      if (headings[i].getBoundingClientRect().top > window.innerHeight / 2) {
        break;
      }
      if (headings[i].tagName === "H2") {
        chapter = headings[i];
        sub = "";
      } else {
        sub = headings[i].textContent || "";
      }
    }
    if (!chapter) {
      return null;
    }
    var text = sub + " " + (chapter.textContent || "");
    var kind = WIRING_RE.test(text) ? "wiring" : (TROUBLE_RE.test(text) ? "trouble" : null);
    return { key: chapter.id || chapter.textContent, kind: kind };
  }

  function pdfDownloaded(product) {
    return (storageGet("sessionStorage", TEASER_PDF_KEY) || "").split("|").indexOf(product) !== -1;
  }

  // Who downloads a product's PDF has what they came for.
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    var product = pageProduct();
    if (!link || !product || !/\.pdf(\?|#|$)/i.test(link.getAttribute("href") || "")) {
      return;
    }
    var done = (storageGet("sessionStorage", TEASER_PDF_KEY) || "").split("|").filter(Boolean);
    if (done.indexOf(product) === -1) {
      done.push(product);
      storageSet("sessionStorage", TEASER_PDF_KEY, done.join("|"));
    }
  }, true);

  // Searches, from pagefind-modal-search.js. They live through page changes (a search often
  // ends on another page); opening a result means the visitor found something.
  var searches = { noResult: false, recent: [] };
  window.addEventListener("trikdocs:search-settled", function (event) {
    var detail = (event && event.detail) || {};
    var now = Date.now();
    if (detail.scope === "none") {
      searches.noResult = true;
    }
    searches.recent = searches.recent.filter(function (item) {
      return now - item.at < TEASER_SEARCH_WINDOW_MS && item.term !== detail.term;
    });
    searches.recent.push({ term: detail.term, at: now });
  });
  window.addEventListener("trikdocs:search-result-opened", function () {
    searches.noResult = false;
    searches.recent = [];
  });

  function searchSignal() {
    return searches.noResult || searches.recent.length >= 2;
  }

  function cookieless(name, props) {
    if (window.trikdocsAnalytics && typeof window.trikdocsAnalytics.cookieless === "function") {
      window.trikdocsAnalytics.cookieless(name, props);
    }
  }

  function overlayOpen() {
    var consent = document.getElementById("__consent");
    var search = document.getElementById("__search");
    return (consent && !consent.hidden) || (search && search.checked)
      || !!document.querySelector(".glightbox-open, .gslide.current, dialog[open]");
  }

  // Watches the page for a reason to invite; starts again on every page (navigation.instant
  // swaps pages without reloading this script).
  function scheduleTeaser(open) {
    window.clearInterval(state.teaserTimer);
    state.teaserPage = window.location.pathname;
    if (storageGet("sessionStorage", TEASER_DISMISSED_KEY) === "1"
        || storageGet("sessionStorage", TEASER_SHOWN_KEY) === "1") {
      return;
    }
    var product = pageProduct();
    if (!product) {
      return;  // home, categories, FAQ: no invitation
    }
    var timing = window.__trikdocsTeaserTiming || {};
    var dwellMs = typeof timing.dwellMs === "number" ? timing.dwellMs : TEASER_DWELL_MS;
    var returnGapMs = typeof timing.returnGapMs === "number" ? timing.returnGapMs : TEASER_RETURN_GAP_MS;
    var quietMs = typeof timing.quietMs === "number" ? timing.quietMs : TEASER_QUIET_MS;
    var page = window.location.pathname;
    var reading = 0;            // ms with the tab visible and no overlay
    var last = Date.now();
    var busyAt = 0;             // when an overlay was last open
    var current = null;         // the section in view now
    var seen = {};              // section key -> { leftAt, returns, kind }
    var eligibleSent = false;
    state.teaserTimer = window.setInterval(function () {
      var now = Date.now();
      var step = Math.min(now - last, 2000);  // a throttled timer must not count a long gap
      last = now;
      if (window.location.pathname !== page || state.openRequested) {
        window.clearInterval(state.teaserTimer);
        return;
      }
      if (document.visibilityState !== "visible" || overlayOpen()) {
        busyAt = now;
        return;
      }
      reading += step;
      var section = sectionInView();
      var key = section ? section.key : null;
      if (key !== (current && current.key)) {
        if (current && seen[current.key]) {
          seen[current.key].leftAt = reading;
        }
        if (section && section.kind) {
          var item = seen[key];
          if (!item) {
            seen[key] = { leftAt: null, returns: 0, kind: section.kind };
          } else if (item.leftAt !== null && reading - item.leftAt >= returnGapMs) {
            item.returns += 1;
          }
        }
        current = section;
      }
      var trigger = null;
      var kind = "product";
      if (searchSignal()) {
        trigger = "search";
      } else if (reading >= dwellMs) {
        for (var k in seen) {
          if (Object.prototype.hasOwnProperty.call(seen, k) && seen[k].returns >= 2) {
            trigger = "reread";
            kind = seen[k].kind;
            break;
          }
        }
      }
      if (!trigger || now - busyAt < quietMs) {
        return;
      }
      window.clearInterval(state.teaserTimer);
      var props = { trigger: trigger, product: product, chat_lang: pageLocale(),
                    reading_band: reading < 120000 ? "<2m" : (reading < 300000 ? "2-5m" : "5m+") };
      if (pdfDownloaded(product)) {
        if (!eligibleSent) {
          cookieless("joy_teaser_eligible", Object.assign({ suppressed: "pdf" }, props));
        }
        return;
      }
      cookieless("joy_teaser_eligible", props);
      eligibleSent = true;
      showTeaser(open, (labels()[kind] || labels().product).replace("{p}", product), props);
    }, 250);
  }

  function showTeaser(open, line, props) {
    if (state.openRequested || document.getElementById(TEASER_ID) || !document.getElementById(LAUNCHER_ID)) {
      return;
    }
    var text = labels();
    var teaser = document.createElement("div");
    teaser.id = TEASER_ID;
    teaser.className = "trikdocs-chat-teaser";
    teaser.setAttribute("role", "status");
    var body = document.createElement("span");
    body.textContent = line;
    var close = document.createElement("button");
    close.type = "button";
    close.className = "trikdocs-chat-teaser-close";
    close.setAttribute("aria-label", text.close);
    close.textContent = "×";
    close.addEventListener("click", function (event) {
      event.stopPropagation();
      storageSet("sessionStorage", TEASER_DISMISSED_KEY, "1");
      cookieless("joy_teaser_action", Object.assign({ action: "dismiss" }, props));
      removeTeaser();
    });
    teaser.appendChild(body);
    teaser.appendChild(close);
    teaser.addEventListener("click", function () {
      state.openedVia = "teaser";
      cookieless("joy_teaser_action", Object.assign({ action: "open" }, props));
      open();
    });
    document.body.appendChild(teaser);
    storageSet("sessionStorage", TEASER_SHOWN_KEY, "1");
    cookieless("joy_teaser_shown", props);
    state.teaserShown = true;
  }

  function renderLauncher(config) {
    if (document.getElementById(LAUNCHER_ID)) {
      // a new page (sync also runs again for the same page: document$, pageshow)
      if (state.teaserOpen && state.teaserPage !== window.location.pathname) {
        removeTeaser();  // a bubble about the previous page
        scheduleTeaser(state.teaserOpen);
      }
      return;
    }

    var button = document.createElement("button");
    button.id = LAUNCHER_ID;
    button.type = "button";
    button.className = "trikdocs-chat-launcher";
    button.setAttribute("aria-label", labels().launcher);
    button.title = labels().launcher;
    var face = document.createElement("img");
    face.src = avatarUrl();
    face.alt = "";
    face.width = 60;
    face.height = 60;
    var dot = document.createElement("span");
    dot.className = "trikdocs-chat-online-dot";
    dot.setAttribute("aria-hidden", "true");
    button.appendChild(face);
    button.appendChild(dot);
    var open = function () {
      storageSet("localStorage", ENGAGED_KEY, "1");
      state.openRequested = true;
      loadWidget(config);
      openChatwootIfRequested();
      removeLauncher();
    };
    button.addEventListener("click", open);
    document.body.appendChild(button);
    state.teaserOpen = open;
    scheduleTeaser(open);
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
    var configured = !!(config.chatwoot.baseUrl && config.chatwoot.websiteToken);
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
