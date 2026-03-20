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
  var QUICK_SETUP_PATH = "/quick-setup/";
  var quickSetupCloneCount = 0;

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

  function resolvePath(href) {
    var resolvedPath = href || "";
    try {
      resolvedPath = new URL(resolvedPath, window.location.origin).pathname;
    } catch (err) {
      resolvedPath = href || "";
    }
    return resolvedPath;
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

  function findQuickSetupItem(subnav) {
    var items = subnav.querySelectorAll("li.md-nav__item");
    for (var i = 0; i < items.length; i += 1) {
      var nestedNav = items[i].querySelector(":scope > nav.md-nav");
      if (!nestedNav) {
        continue;
      }

      var links = Array.from(nestedNav.querySelectorAll("a.md-nav__link"));
      var quickSetupLinks = links.filter(function (link) {
        return resolvePath(link.getAttribute("href")).indexOf(QUICK_SETUP_PATH) !== -1;
      });
      if (!quickSetupLinks.length) {
        continue;
      }

      var nonQuickSetupLinks = links.filter(function (link) {
        var path = resolvePath(link.getAttribute("href"));
        return path.indexOf("/alarm-communicators/") !== -1 && path.indexOf(QUICK_SETUP_PATH) === -1;
      });
      if (nonQuickSetupLinks.length) {
        continue;
      }

      return items[i];
    }
    return null;
  }

  function collectQuickSetupLinks(sourceItem, currentPath) {
    var seen = new Set();
    var items = [];

    Array.from(sourceItem.querySelectorAll("a.md-nav__link")).forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.indexOf("#") !== -1) {
        return;
      }

      var resolvedPath = resolvePath(href);
      if (resolvedPath.indexOf(QUICK_SETUP_PATH) === -1) {
        return;
      }

      var text = normalizeText(link.textContent);
      if (!text || seen.has(resolvedPath)) {
        return;
      }

      seen.add(resolvedPath);
      items.push({
        text: text,
        href: href,
        active: resolvedPath === currentPath
      });
    });

    return items;
  }

  function buildQuickSetupItem(subnav, currentPath) {
    var sourceItem = findQuickSetupItem(subnav);
    if (!sourceItem) {
      return null;
    }

    var label = sourceItem.querySelector(":scope > label .md-ellipsis, :scope > a .md-ellipsis");
    var links = collectQuickSetupLinks(sourceItem, currentPath);
    if (!label || !links.length) {
      return null;
    }

    quickSetupCloneCount += 1;
    var toggleId = "comm-quick-setup-az-" + quickSetupCloneCount;
    var labelId = toggleId + "-label";
    var isActive = links.some(function (item) {
      return item.active;
    });

    var li = document.createElement("li");
    li.className = "md-nav__item md-nav__item--nested";
    li.dataset.commPinnedQuickSetup = "true";
    if (isActive) {
      li.classList.add("md-nav__item--active");
    }

    var input = document.createElement("input");
    input.className = "md-nav__toggle md-toggle";
    input.type = "checkbox";
    input.id = toggleId;
    input.checked = isActive;

    var labelNode = document.createElement("label");
    labelNode.className = "md-nav__link";
    labelNode.setAttribute("for", toggleId);
    labelNode.id = labelId;
    labelNode.tabIndex = 0;
    labelNode.innerHTML =
      '<span class="md-ellipsis"></span><span class="md-nav__icon md-icon"></span>';
    labelNode.querySelector(".md-ellipsis").textContent = normalizeText(label.textContent);

    var nav = document.createElement("nav");
    nav.className = "md-nav";
    nav.setAttribute("data-md-level", "2");
    nav.setAttribute("aria-labelledby", labelId);
    nav.setAttribute("aria-expanded", isActive ? "true" : "false");

    var title = document.createElement("label");
    title.className = "md-nav__title";
    title.setAttribute("for", toggleId);
    title.innerHTML = '<span class="md-nav__icon md-icon"></span>';
    title.appendChild(document.createTextNode(normalizeText(label.textContent)));

    var list = document.createElement("ul");
    list.className = "md-nav__list";

    links.forEach(function (item) {
      var child = document.createElement("li");
      child.className = "md-nav__item";
      var anchor = document.createElement("a");
      anchor.className = "md-nav__link";
      anchor.setAttribute("href", item.href);

      var text = document.createElement("span");
      text.className = "md-ellipsis";
      text.textContent = item.text;
      anchor.appendChild(text);

      if (item.active) {
        child.classList.add("md-nav__item--active");
        anchor.classList.add("md-nav__link--active");
        anchor.setAttribute("aria-current", "page");
      }

      child.appendChild(anchor);
      list.appendChild(child);
    });

    nav.appendChild(title);
    nav.appendChild(list);

    li.appendChild(input);
    li.appendChild(labelNode);
    li.appendChild(nav);
    return li;
  }

  function buildAzList(subnav, currentPath) {
    var quickSetupItem = buildQuickSetupItem(subnav, currentPath);
    var links = Array.from(subnav.querySelectorAll("a.md-nav__link"));
    var seen = new Set();
    var items = [];
    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.indexOf("#") !== -1) {
        return;
      }
      var resolvedPath = resolvePath(href);
      if (resolvedPath.indexOf("/alarm-communicators/") === -1) {
        return;
      }
      if (resolvedPath.indexOf(QUICK_SETUP_PATH) !== -1) {
        return;
      }
      var text = normalizeText(link.textContent);
      if (!text) {
        return;
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
    if (quickSetupItem) {
      list.appendChild(quickSetupItem);
    }
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
