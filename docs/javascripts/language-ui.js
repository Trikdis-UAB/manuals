(function () {
  var LANGUAGE_BUTTON_LABELS = {
    en: "English",
    lt: "Lietuvių",
    es: "Español",
    ru: "Русский"
  };
  var MOBILE_BREAKPOINT = 960;
  var HOME_LABELS = new Set(["Home", "Pagrindinis", "Inicio", "Главная"]);
  var RECEIVER_LABELS = new Set(["Receivers", "Imtuvai", "Receptores", "Приемники"]);
  var COLLAPSIBLE_LABELS = new Set(["Keypads", "Klaviatūros", "Teclados", "Клавиатуры"]);

  function findLanguageIndex(segments) {
    for (var i = 0; i < segments.length; i += 1) {
      var code = segments[i].toLowerCase();
      if (LANGUAGE_BUTTON_LABELS[code]) {
        return i;
      }
    }
    return -1;
  }

  function detectLanguage() {
    if (typeof window === "undefined") {
      return "en";
    }
    var pathname = window.location.pathname || "/";
    var segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return "home";
    }
    var langIndex = findLanguageIndex(segments);
    if (langIndex !== -1) {
      return segments[langIndex].toLowerCase();
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
    var pathname = window.location.pathname || "/";
    var segments = pathname.split("/").filter(Boolean);
    var langIndex = findLanguageIndex(segments);
    var prefix = "";
    if (langIndex > 0) {
      prefix = "/" + segments.slice(0, langIndex).join("/");
    }
    var href = prefix + "/" + targetLang + "/";
    document.querySelectorAll("a.md-logo").forEach(function (logo) {
      logo.setAttribute("href", href);
    });
  }

  function updateLanguageLinks() {
    var pathname = window.location.pathname || "/";
    var search = window.location.search || "";
    var hash = window.location.hash || "";
    var segments = pathname.split("/").filter(Boolean);
    var langIndex = findLanguageIndex(segments);
    var origin = window.location.origin || "";

    document.querySelectorAll(".md-select__inner .md-select__link").forEach(function (link) {
      var targetLang = (link.getAttribute("hreflang") || "").toLowerCase();
      if (!LANGUAGE_BUTTON_LABELS[targetLang]) {
        return;
      }
      var newSegments = segments.slice();
      if (newSegments.length === 0) {
        newSegments = [targetLang];
      } else if (langIndex !== -1) {
        newSegments[langIndex] = targetLang;
      } else {
        newSegments.unshift(targetLang);
      }
      var newPath = "/" + newSegments.join("/");
      if (pathname.endsWith("/") && !newPath.endsWith("/")) {
        newPath += "/";
      }
      link.setAttribute("href", origin + newPath + search + hash);
    });
  }

  function hideHomeNavItem() {
    var pathname = window.location.pathname || "/";
    var inIpcomSection =
      pathname.indexOf("/receivers/ipcom5control/") !== -1 ||
      pathname.endsWith("/receivers/ipcom5control");

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
        var text = label.textContent.trim();
        if (HOME_LABELS.has(text)) {
          item.style.display = "none";
          return;
        }
        if (RECEIVER_LABELS.has(text)) {
          item.style.display = inIpcomSection ? "" : "none";
        }
      });
    });
  }

  function setCollapsibleSections() {
    var pathname = window.location.pathname || "/";
    var keepExpanded = pathname.indexOf("/keypads/") !== -1;
    var segments = pathname.split("/").filter(Boolean);
    var isLangRoot = segments.length === 1 && LANGUAGE_BUTTON_LABELS[segments[0]];
    var isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    var forceCollapse = isLangRoot && isMobile;
    document.querySelectorAll("nav.md-nav--primary").forEach(function (nav) {
      if (nav.dataset.defaultsApplied === pathname) {
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
        var text = label.textContent.trim();
        if (forceCollapse) {
          toggle.checked = false;
          if (subnav) {
            subnav.setAttribute("aria-expanded", "false");
          }
          return;
        }
        if (item.dataset.userToggled === "true") {
          return;
        }
        if (COLLAPSIBLE_LABELS.has(text)) {
          toggle.checked = keepExpanded;
          if (subnav) {
            subnav.setAttribute("aria-expanded", keepExpanded ? "true" : "false");
          }
          return;
        }
        if (isLangRoot) {
          var expand = !isMobile;
          toggle.checked = expand;
          if (subnav) {
            subnav.setAttribute("aria-expanded", expand ? "true" : "false");
          }
        }
      });
      nav.dataset.defaultsApplied = pathname;
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
      updateLanguageLinks();
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
