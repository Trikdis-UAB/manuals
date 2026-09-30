/*
 * One "configuration tool" switcher per chapter, instead of a tab bar in every
 * settings section (projects/ConfigurationTabs/spec.md).
 *
 * The per-section content tabs stay in the Markdown ("Protegus app" |
 * "TrikdisConfig"), so search, the PDF and Joy still see every tool's text.
 * On screen, each chapter that contains such tabs gets one sticky switcher right
 * under its heading, and the chapter's own tab bars are hidden. The switcher
 * clicks the native tab inputs, so Material's linked tabs keep every set, and
 * the saved choice, in sync. Without JavaScript nothing changes: the per-section
 * tab bars remain.
 */
(function () {
  // Tab labels that count as configuration tools, in display order.
  var TOOLS = ["Protegus app", "Desktop Config", "TrikdisConfig"];
  var CAPTION = {
    en: "Configure with",
    lt: "Konfigūruoti per",
    es: "Configurar con",
    ru: "Настройка через"
  };

  var resizeListening = false;

  function measureHeader() {
    var root = document.documentElement.style;
    var header = document.querySelector(".md-header");
    var bar = document.querySelector(".trik-tool-bar");
    if (header) {
      root.setProperty("--trik-header-height", header.offsetHeight + "px");
    }
    if (bar) {
      root.setProperty("--trik-tool-bar-height", bar.offsetHeight + "px");
    }
  }

  function labelsOf(set) {
    return Array.prototype.map.call(
      set.querySelectorAll(":scope > .tabbed-labels > label"),
      function (label) {
        return label.textContent.trim();
      }
    );
  }

  function isToolSet(set) {
    var labels = labelsOf(set);
    return (
      labels.length > 1 &&
      labels.every(function (text) {
        return TOOLS.indexOf(text) !== -1;
      })
    );
  }

  function activeLabel(set) {
    var inputs = set.querySelectorAll(":scope > input");
    var labels = labelsOf(set);
    for (var i = 0; i < inputs.length; i += 1) {
      if (inputs[i].checked) {
        return labels[i];
      }
    }
    return labels[0];
  }

  function selectInSet(set, text) {
    var labels = labelsOf(set);
    var index = labels.indexOf(text);
    if (index === -1) {
      return;
    }
    var input = set.querySelectorAll(":scope > input")[index];
    if (input && !input.checked) {
      input.click();
    }
  }

  function nearestSet(sets) {
    // Click the set closest to the viewport, so Material's scroll anchoring keeps
    // what the reader is looking at in place.
    var best = sets[0];
    var bestDistance = Infinity;
    sets.forEach(function (set) {
      var distance = Math.abs(set.getBoundingClientRect().top);
      if (distance < bestDistance) {
        best = set;
        bestDistance = distance;
      }
    });
    return best;
  }

  function buildBar(tools, caption) {
    var bar = document.createElement("div");
    bar.className = "trik-tool-bar";

    var label = document.createElement("span");
    label.className = "trik-tool-bar__caption";
    label.textContent = caption;
    bar.appendChild(label);

    var group = document.createElement("div");
    group.className = "trik-tool-bar__options";
    group.setAttribute("role", "radiogroup");
    group.setAttribute("aria-label", caption);
    tools.forEach(function (tool) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "trik-tool-bar__option";
      button.setAttribute("role", "radio");
      button.dataset.tool = tool;
      button.textContent = tool;
      group.appendChild(button);
    });
    bar.appendChild(group);
    return bar;
  }

  function setBarState(bar, tool) {
    Array.prototype.forEach.call(
      bar.querySelectorAll(".trik-tool-bar__option"),
      function (button) {
        var on = button.dataset.tool === tool;
        button.setAttribute("aria-checked", on ? "true" : "false");
        button.tabIndex = on ? 0 : -1;
      }
    );
  }

  function setup() {
    var article = document.querySelector(".md-content__inner");
    if (!article || article.dataset.toolSwitcher === "true") {
      return;
    }
    var sets = Array.prototype.filter.call(
      article.querySelectorAll(".tabbed-set"),
      isToolSet
    );
    if (!sets.length) {
      return;
    }
    article.dataset.toolSwitcher = "true";

    var lang = (document.documentElement.lang || "en").slice(0, 2);
    var caption = CAPTION[lang] || CAPTION.en;
    var bars = [];

    // Group the sets by chapter (h2); each chapter gets one switcher.
    var chapters = [];
    sets.forEach(function (set) {
      var node = set;
      while (node && node.parentElement !== article) {
        node = node.parentElement;
      }
      var heading = node;
      while (heading && heading.tagName !== "H2") {
        heading = heading.previousElementSibling;
      }
      if (!heading) {
        return;
      }
      var chapter = chapters.filter(function (c) {
        return c.heading === heading;
      })[0];
      if (!chapter) {
        chapter = { heading: heading, sets: [] };
        chapters.push(chapter);
      }
      chapter.sets.push(set);
      set.classList.add("trik-tool-set");
    });

    chapters.forEach(function (chapter) {
      // Wrap the chapter so the sticky switcher stays within it.
      var region = document.createElement("div");
      region.className = "trik-tool-region";
      chapter.heading.parentElement.insertBefore(region, chapter.heading);
      var node = chapter.heading;
      while (node && !(node !== chapter.heading && node.tagName === "H2")) {
        var next = node.nextElementSibling;
        region.appendChild(node);
        node = next;
      }

      var tools = TOOLS.filter(function (tool) {
        return chapter.sets.some(function (set) {
          return labelsOf(set).indexOf(tool) !== -1;
        });
      });
      var bar = buildBar(tools, caption);
      region.insertBefore(bar, chapter.heading.nextSibling);
      bars.push(bar);

      bar.addEventListener("click", function (event) {
        var button = event.target.closest(".trik-tool-bar__option");
        if (!button) {
          return;
        }
        var tool = button.dataset.tool;
        selectInSet(nearestSet(sets), tool);
        sets.forEach(function (set) {
          selectInSet(set, tool);
        });
        sync();
      });

      bar.addEventListener("keydown", function (event) {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(event.key) === -1) {
          return;
        }
        event.preventDefault();
        var buttons = Array.prototype.slice.call(bar.querySelectorAll(".trik-tool-bar__option"));
        var current = buttons.indexOf(document.activeElement);
        var step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
        var next = buttons[(current + step + buttons.length) % buttons.length];
        next.focus();
        next.click();
      });
    });

    function sync() {
      var tool = activeLabel(sets[0]);
      bars.forEach(function (bar) {
        setBarState(bar, tool);
      });
    }

    sets.forEach(function (set) {
      set.addEventListener("change", sync);
    });
    sync();

    measureHeader();
    if (!resizeListening) {
      window.addEventListener("resize", measureHeader);
      resizeListening = true;
    }

    // Only hide the per-section tab bars once the switcher works.
    document.documentElement.classList.add("trik-tool-switcher-ready");
  }

  document.addEventListener("DOMContentLoaded", setup);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(setup);
  }
})();
