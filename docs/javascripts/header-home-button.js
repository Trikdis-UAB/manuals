(function () {
  var SUPPORTED_LANGS = new Set(["en", "lt", "es"]);
  var HOME_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>';

  function detectLanguage() {
    if (typeof window === "undefined") {
      return "en";
    }
    var segments = (window.location.pathname || "/")
      .split("/")
      .filter(Boolean);
    if (segments.length === 0) {
      return "en";
    }
    var candidate = segments[0].toLowerCase();
    if (SUPPORTED_LANGS.has(candidate)) {
      return candidate;
    }
    return "en";
  }

  function ensureHomeButton() {
    var header = document.querySelector("header .md-header__inner");
    var palette = document.querySelector(
      "header form[data-md-component='palette']"
    );
    if (!header || !palette) {
      return;
    }
    var lang = detectLanguage();
    var href = "/" + lang + "/";
    var button = header.querySelector(".md-home-button");
    if (!button) {
      button = document.createElement("a");
      button.className = "md-header__button md-icon md-home-button";
      button.setAttribute("aria-label", "Home");
      button.innerHTML = HOME_ICON;
      header.insertBefore(button, palette);
    }
    if (button.getAttribute("href") !== href) {
      button.setAttribute("href", href);
    }
    if (button.nextSibling !== palette) {
      header.insertBefore(button, palette);
    }
  }

  function applyHomeButton() {
    requestAnimationFrame(ensureHomeButton);
  }

  document.addEventListener("DOMContentLoaded", applyHomeButton);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(applyHomeButton);
  }
})();
