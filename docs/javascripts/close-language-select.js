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
      select.classList.remove("md-select--active");
      var toggle = select.querySelector("button");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.blur();
      }
      var inner = select.querySelector(".md-select__inner");
      if (inner) {
        inner.removeAttribute("style");
      }
      setTimeout(function () {
        select.classList.remove("md-select--active");
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
