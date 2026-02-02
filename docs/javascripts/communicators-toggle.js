(function () {
  var LABELS = new Set([
    "Communicators",
    "Komunikatoriai",
    "Comunicadores",
    "Коммуникаторы"
  ]);
  var TOGGLE_LABELS = {
    en: { tech: "By technology", az: "A–Z" },
    lt: { tech: "Pagal technologiją", az: "A–Z" },
    es: { tech: "Por tecnología", az: "A–Z" },
    ru: { tech: "По технологии", az: "A–Z" }
  };
  var STORAGE_KEY = "communicatorsView";

  function getStorage() {
    try {
      return window.sessionStorage;
    } catch (err) {
      return null;
    }
  }

  function getStoredView() {
    var storage = getStorage();
    if (!storage) {
      return "tech";
    }
    var value = storage.getItem(STORAGE_KEY);
    return value === "az" ? "az" : "tech";
  }

  function setStoredView(view) {
    var storage = getStorage();
    if (!storage) {
      return;
    }
    storage.setItem(STORAGE_KEY, view);
  }

  function normalizeText(value) {
    return (value || "").trim();
  }

  function detectLanguageCode() {
    var pathname = window.location.pathname || "/";
    var segments = pathname.split("/").filter(Boolean);
    for (var i = 0; i < segments.length; i += 1) {
      var code = segments[i].toLowerCase();
      if (TOGGLE_LABELS[code]) {
        return code;
      }
    }
    return "en";
  }

  function findCommunicatorsItem(nav) {
    var items = nav.querySelectorAll(":scope > ul.md-nav__list > li.md-nav__item");
    for (var i = 0; i < items.length; i += 1) {
      var label = items[i].querySelector(
        ":scope > label .md-ellipsis, :scope > a .md-ellipsis"
      );
      if (!label) {
        continue;
      }
      if (LABELS.has(normalizeText(label.textContent))) {
        return items[i];
      }
    }
    return null;
  }

  function buildToggle(view) {
    var lang = detectLanguageCode();
    var labels = TOGGLE_LABELS[lang] || TOGGLE_LABELS.en;
    var wrapper = document.createElement("div");
    wrapper.className = "md-comm-toggle";
    wrapper.setAttribute("role", "tablist");
    wrapper.setAttribute("aria-label", "Communicators view");

    var tech = document.createElement("button");
    tech.type = "button";
    tech.className = "md-comm-toggle__button";
    tech.setAttribute("role", "tab");
    tech.setAttribute("data-view", "tech");
    tech.textContent = labels.tech;

    var az = document.createElement("button");
    az.type = "button";
    az.className = "md-comm-toggle__button";
    az.setAttribute("role", "tab");
    az.setAttribute("data-view", "az");
    az.textContent = labels.az;

    wrapper.appendChild(tech);
    wrapper.appendChild(az);

    return wrapper;
  }

  function setToggleState(wrapper, view) {
    var buttons = wrapper.querySelectorAll(".md-comm-toggle__button");
    buttons.forEach(function (button) {
      var isActive = button.getAttribute("data-view") === view;
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function buildAzList(subnav, currentPath) {
    var links = Array.from(subnav.querySelectorAll("a.md-nav__link"));
    var seen = new Set();
    var items = [];
    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.indexOf("/alarm-communicators/") === -1) {
        return;
      }
      if (href.indexOf("/quick-setup/") !== -1) {
        return;
      }
      var text = normalizeText(link.textContent);
      if (!text) {
        return;
      }
      var resolvedPath = href;
      try {
        resolvedPath = new URL(href, window.location.origin).pathname;
      } catch (err) {
        resolvedPath = href;
      }
      var key = text + "|" + resolvedPath;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      items.push({
        text: text,
        href: href,
        active: resolvedPath === currentPath
      });
    });

    items.sort(function (a, b) {
      return a.text.localeCompare(b.text, undefined, { numeric: true, sensitivity: "base" });
    });

    var list = document.createElement("ul");
    list.className = "md-nav__list md-comm-list md-comm-list--az";
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "md-nav__item";
      var anchor = document.createElement("a");
      anchor.className = "md-nav__link";
      anchor.textContent = item.text;
      anchor.setAttribute("href", item.href);
      if (item.active) {
        anchor.classList.add("md-nav__link--active");
        anchor.setAttribute("aria-current", "page");
        li.classList.add("md-nav__item--active");
      }
      li.appendChild(anchor);
      list.appendChild(li);
    });

    return list;
  }

  function applyView(subnav, view) {
    subnav.dataset.commView = view;
  }

  function setupToggle() {
    document.querySelectorAll("nav.md-nav--primary").forEach(function (nav) {
      var item = findCommunicatorsItem(nav);
      if (!item) {
        return;
      }
      var subnav = item.querySelector(":scope > nav.md-nav");
      if (!subnav || subnav.dataset.communicatorsToggle === "true") {
        return;
      }

      var list = subnav.querySelector(":scope > ul.md-nav__list");
      if (!list) {
        return;
      }
      list.classList.add("md-comm-list", "md-comm-list--tech");

      var currentPath = window.location.pathname || "";
      var azList = buildAzList(subnav, currentPath);
      list.insertAdjacentElement("afterend", azList);

      var toggle = buildToggle(getStoredView());
      var title = subnav.querySelector(":scope > label.md-nav__title");
      if (title) {
        title.insertAdjacentElement("afterend", toggle);
      } else {
        subnav.insertAdjacentElement("afterbegin", toggle);
      }

      toggle.addEventListener("click", function (event) {
        var target = event.target.closest(".md-comm-toggle__button");
        if (!target) {
          return;
        }
        var view = target.getAttribute("data-view") === "az" ? "az" : "tech";
        setStoredView(view);
        setToggleState(toggle, view);
        applyView(subnav, view);
      });

      toggle.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }
        event.preventDefault();
        var buttons = Array.from(toggle.querySelectorAll(".md-comm-toggle__button"));
        var current = buttons.findIndex(function (btn) {
          return btn.getAttribute("aria-selected") === "true";
        });
        if (current === -1) {
          current = 0;
        }
        var next = event.key === "ArrowRight" ? current + 1 : current - 1;
        if (next < 0) {
          next = buttons.length - 1;
        }
        if (next >= buttons.length) {
          next = 0;
        }
        buttons[next].focus();
        buttons[next].click();
      });

      var view = getStoredView();
      setToggleState(toggle, view);
      applyView(subnav, view);
      subnav.dataset.communicatorsToggle = "true";
    });
  }

  document.addEventListener("DOMContentLoaded", setupToggle);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(setupToggle);
  }
})();
