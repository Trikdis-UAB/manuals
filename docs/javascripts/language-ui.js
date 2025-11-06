(function () {
  var LANGUAGE_BUTTON_LABELS = {
    en: "English",
    lt: "Lietuvių",
    es: "Español",
    ru: "Русский"
  };

  var LANGUAGE_NAV_LABELS = {
    en: "English",
    lt: "Lithuanian",
    es: "Spanish",
    ru: "Russian"
  };

  var HOME_LABELS = new Set(["Home", "Pagrindinis", "Inicio", "Главная"]);

  function detectLanguage() {
    if (typeof window === "undefined") {
      return "en";
    }
    var pathname = window.location.pathname || "/";
    var segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return "home";
    }
    var code = segments[0].toLowerCase();
    if (LANGUAGE_BUTTON_LABELS[code]) {
      return code;
    }
    return "en";
  }

  function updateLanguageButton(lang) {
    var label = LANGUAGE_BUTTON_LABELS[lang] || LANGUAGE_BUTTON_LABELS.en;
    var select = document.querySelector("header .md-select");
    if (!select) {
      return;
    }
    var button = select.querySelector("button");
    if (!button) {
      return;
    }
    button.classList.remove("md-icon");
    button.classList.add("md-lang-button");
    button.innerHTML = '<span class="md-lang-button__label">' + label + "</span>";
    button.setAttribute("aria-label", "Select language (current: " + label + ")");
  }

  function closeLanguageSelect() {
    var select = document.querySelector("header .md-select");
    if (!select) {
      return;
    }
    select.classList.remove("md-select--active");
    var toggle = select.querySelector("button");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.blur();
    }
  }

  function filterNavigation(lang) {
    var navTarget = LANGUAGE_NAV_LABELS[lang];
    if (!navTarget || lang === "home") {
      return;
    }
    var navs = document.querySelectorAll('nav.md-nav[aria-label="Navigation"]');
    navs.forEach(function (nav) {
      var list = nav.querySelector(":scope > ul.md-nav__list");
      if (!list) {
        return;
      }
      list.querySelectorAll(":scope > li.md-nav__item").forEach(function (item) {
        var labelEl = item.querySelector(":scope > label .md-ellipsis, :scope > a .md-ellipsis");
        if (!labelEl) {
          return;
        }
        var text = labelEl.textContent.trim();
        if (HOME_LABELS.has(text) || text === "Overview") {
          item.style.display = "";
          return;
        }
        if (text === navTarget) {
          item.style.display = "";
          var toggle = item.querySelector(":scope > input.md-nav__toggle");
          if (toggle) {
            toggle.checked = true;
          }
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  function applyLanguageUI() {
    var lang = detectLanguage();
    requestAnimationFrame(function () {
      updateLanguageButton(lang);
      filterNavigation(lang);
      closeLanguageSelect();
    });
  }

  document.addEventListener("DOMContentLoaded", applyLanguageUI);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(applyLanguageUI);
  }
})();
