// Cookieless visitor analytics, side by side with Google Analytics (2026-10-19, Andrius).
//
// GA runs only after a visitor accepts the cookie banner, so it undercounts. This counts
// every visit in our own PostHog (analytics.protegus.app, on our server in the EU) without
// cookies: PostHog's cookieless mode stores nothing on the device. The server tells visitors
// apart by a hash of IP address, browser and a salt that changes every day, so a visitor
// who comes back on another day counts as new. Both run for a while, then we compare.
//
// The same things as in GA: page views (with Material's instant navigation), time on page,
// PDF and other file downloads, searches and chat starts. The search and chat code report
// through window.trikdocsAnalytics.cookieless(name, props); GA keeps its own path.
//
// Only on docs.trikdis.com, so local previews and Netlify deploy previews don't count.
// Add ?ph_test=1 to a page's address to send events from anywhere while testing; they
// carry the real host, so reports that filter on docs.trikdis.com leave them out.
(function () {
  var API_HOST = "https://analytics.protegus.app";
  var PROJECT_TOKEN = "phc_mATbGdi59ZxUBWb3afS6LuHqMp2aYMEQQz8haQrhQrtM"; // PostHog project "TRIKDIS docs"; public by design, like GA's ID
  var LIVE_HOST = "docs.trikdis.com";
  var FILE_TYPES = /\.(pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp[st]x?|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma)$/i;

  window.trikdocsAnalytics = { cookieless: function () {} };

  var testing = /[?&]ph_test=1(&|$)/.test(window.location.search);
  // host, not hostname: the chat tests serve the site as docs.trikdis.com:8013.
  if (!PROJECT_TOKEN || (window.location.host !== LIVE_HOST && !testing)) {
    return;
  }

  // Events from before PostHog has loaded wait here.
  var queue = [];
  window.trikdocsAnalytics.cookieless = function (name, props) {
    queue.push([name, props || {}]);
  };

  var script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = API_HOST + "/static/array.js";
  script.onload = function () {
    var posthog = window.posthog;
    if (!posthog || typeof posthog.init !== "function") {
      return;
    }
    posthog.init(PROJECT_TOKEN, {
      api_host: API_HOST,
      cookieless_mode: "always",
      person_profiles: "never",
      // Page views come from the theme below, not from PostHog's own history watching,
      // which fires before instant navigation has swapped in the new page and its title.
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true
    });
    window.trikdocsAnalytics.cookieless = function (name, props) {
      posthog.capture(name, props || {});
    };
    // Material's document$ gives the current page at once and every page instant navigation
    // brings in, as its own GA integration uses it.
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(function () {
        posthog.capture("$pageview");
      });
    } else {
      posthog.capture("$pageview");
    }
    queue.forEach(function (item) {
      posthog.capture(item[0], item[1]);
    });
    queue = [];
  };
  document.head.appendChild(script);

  // File downloads, named as GA's enhanced measurement names them.
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link) {
      return;
    }
    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }
    var match = url.pathname.match(FILE_TYPES);
    if (!match) {
      return;
    }
    window.trikdocsAnalytics.cookieless("file_download", {
      file_name: url.pathname,
      file_extension: match[1].toLowerCase(),
      link_url: url.href,
      link_text: (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100)
    });
  }, true);
})();
