function attachLanguageSelectCloser() {
  var languageLinks = document.querySelectorAll(".md-select__inner .md-select__link");
  if (!languageLinks.length) {
    return;
  }
  languageLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var select = link.closest(".md-select");
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
      setTimeout(function () {
        ["md-select--active", "md-select--fade", "md-select--focused"].forEach(function (cls) {
          select.classList.remove(cls);
        });
        if (select.dataset) {
          delete select.dataset.mdState;
        }
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
          if (toggle.dataset) {
            delete toggle.dataset.mdState;
          }
        }
      }, 120);

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      event.preventDefault();
      var target = link.getAttribute("href");
      setTimeout(function () {
        window.location.href = target;
      }, 80);
    });
  });
}

document.addEventListener("DOMContentLoaded", attachLanguageSelectCloser);
if (typeof document$ !== "undefined" && document$.subscribe) {
  document$.subscribe(attachLanguageSelectCloser);
}
