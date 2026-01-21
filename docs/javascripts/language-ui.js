(function () {
  var LANGUAGE_BUTTON_LABELS = {
    en: "English",
    lt: "Lietuvių",
    es: "Español",
    ru: "Русский"
  };
  var HOME_LABELS = new Set(["Home", "Pagrindinis", "Inicio", "Главная"]);
  var COLLAPSIBLE_LABELS = new Set(["Keypads", "Klaviatūros", "Teclados", "Клавиатуры"]);

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

  function updateLogoLinks(lang) {
    var targetLang = lang === "home" ? "en" : lang;
    var href = "/" + targetLang + "/";
    document.querySelectorAll("a.md-logo").forEach(function (logo) {
      logo.setAttribute("href", href);
    });
  }

  function hideHomeNavItem() {
    document.querySelectorAll("nav.md-nav--primary").forEach(function (nav) {
      var list = nav.querySelector(":scope > ul.md-nav__list");
      if (!list) {
        return;
      }
      list.querySelectorAll(":scope > li.md-nav__item").forEach(function (item) {
        var label = item.querySelector(":scope > a .md-ellipsis, :scope > label .md-ellipsis");
        if (!label) {
          return;
        }
        if (HOME_LABELS.has(label.textContent.trim())) {
          item.style.display = "none";
        }
      });
    });
  }

  function setCollapsibleSections() {
    var pathname = window.location.pathname || "/";
    var keepExpanded = pathname.indexOf("/keypads/") !== -1;
    var segments = pathname.split("/").filter(Boolean);
    var isLangRoot = segments.length === 1 && LANGUAGE_BUTTON_LABELS[segments[0]];
    document.querySelectorAll("nav.md-nav--primary").forEach(function (nav) {
      if (nav.dataset.defaultsApplied === "true") {
        return;
      }
      var list = nav.querySelector(":scope > ul.md-nav__list");
      if (!list) {
        return;
      }
      list.querySelectorAll(":scope > li.md-nav__item").forEach(function (item) {
        var label = item.querySelector(":scope > label .md-ellipsis");
        var toggle = item.querySelector(":scope > input.md-nav__toggle");
        var subnav = item.querySelector(":scope > nav.md-nav");
        if (!label || !toggle) {
          return;
        }
        if (item.dataset.userToggled === "true") {
          return;
        }
        var text = label.textContent.trim();
        if (COLLAPSIBLE_LABELS.has(text)) {
          toggle.checked = keepExpanded;
          if (subnav) {
            subnav.setAttribute("aria-expanded", keepExpanded ? "true" : "false");
          }
          return;
        }
        if (isLangRoot) {
          toggle.checked = true;
          if (subnav) {
            subnav.setAttribute("aria-expanded", "true");
          }
        }
      });
      nav.dataset.defaultsApplied = "true";
    });
  }

  function attachToggleStateTracking() {
    document.querySelectorAll("nav.md-nav--primary").forEach(function (nav) {
      var list = nav.querySelector(":scope > ul.md-nav__list");
      if (!list) {
        return;
      }
      list.querySelectorAll(":scope > li.md-nav__item").forEach(function (item) {
        var toggle = item.querySelector(":scope > input.md-nav__toggle");
        if (!toggle || item.dataset.toggleTracked === "true") {
          return;
        }
        item.dataset.toggleTracked = "true";
        toggle.addEventListener("change", function () {
          item.dataset.userToggled = "true";
        });
      });
    });
  }

  function scheduleCollapsibleSections() {
    attachToggleStateTracking();
    setCollapsibleSections();
    setTimeout(setCollapsibleSections, 120);
    setTimeout(setCollapsibleSections, 300);
  }

  function closeLanguageSelect() {
    var select = document.querySelector("header .md-select");
    if (!select) {
      return;
    }
    ["md-select--active", "md-select--fade", "md-select--focused"].forEach(function (cls) {
      select.classList.remove(cls);
    });
    if (select.dataset) {
      delete select.dataset.mdState;
    }
    var toggle = select.querySelector("button");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      if (toggle.dataset) {
        delete toggle.dataset.mdState;
      }
      requestAnimationFrame(function () {
        toggle.blur();
      });
    }
    var inner = select.querySelector(".md-select__inner");
    if (inner) {
      inner.removeAttribute("style");
    }
  }


  function scheduleClose() {
    closeLanguageSelect();
    setTimeout(closeLanguageSelect, 60);
    setTimeout(closeLanguageSelect, 150);
    setTimeout(closeLanguageSelect, 300);
  }

  function applyLanguageUI() {
    var lang = detectLanguage();
    requestAnimationFrame(function () {
      updateLanguageButton(lang);
      updateLogoLinks(lang);
      hideHomeNavItem();
      scheduleCollapsibleSections();
      scheduleClose();
    });
  }

  document.addEventListener("DOMContentLoaded", applyLanguageUI);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(applyLanguageUI);
  }
})();
