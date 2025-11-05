document.addEventListener("DOMContentLoaded", function () {
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
    });
  });
});
