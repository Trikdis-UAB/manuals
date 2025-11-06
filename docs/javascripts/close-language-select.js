function attachLanguageSelectCloser() {
  var languageLinks = document.querySelectorAll(".md-select__inner .md-select__link");
  if (!languageLinks.length) {
    return;
  }
  languageLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var select = link.closest(".md-select");
      if (!select) {
        return;
      }
      ["md-select--active", "md-select--fade", "md-select--focused"].forEach(function (cls) {
        select.classList.remove(cls);
      });
      try {
        if (select.dataset) {
          delete select.dataset.mdState;
        }
      } catch (err) {}
     var toggle = select.querySelector("button");
     if (toggle) {
       toggle.setAttribute("aria-expanded", "false");
        requestAnimationFrame(function () {
          toggle.blur();
        });
     }
     var inner = select.querySelector(".md-select__inner");
     if (inner) {
       inner.removeAttribute("style");
        inner.style.maxHeight = "0px";
        inner.style.opacity = "0";
        inner.style.pointerEvents = "none";
     }
     setTimeout(function () {
        ["md-select--active", "md-select--fade", "md-select--focused"].forEach(function (cls) {
          select.classList.remove(cls);
        });
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      }, 120);
    });
  });
}

document.addEventListener("DOMContentLoaded", attachLanguageSelectCloser);
if (typeof document$ !== "undefined" && document$.subscribe) {
  document$.subscribe(attachLanguageSelectCloser);
}
