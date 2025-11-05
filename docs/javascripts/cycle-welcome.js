document.addEventListener("DOMContentLoaded", function () {
  var heading = document.getElementById("welcome-message");
  var languageCards = document.querySelectorAll(".language-card");

  if (!heading || !languageCards.length) {
    return;
  }

  var tocNav = document.querySelector('nav[aria-label="Table of contents"]');
  if (tocNav) {
    tocNav.remove();
  }

  var messages = [
    { text: "Welcome! Pick your language:", lang: "en" },
    { text: "Sveiki! Pasirinkite kalbą:", lang: "lt" },
    { text: "¡Bienvenido! Elige tu idioma:", lang: "es" },
    { text: "Добро пожаловать! Выберите язык:", lang: "ru" }
  ];

  var index = 0;
  var intervalMs = 2000;

  function setActiveCard(lang) {
    languageCards.forEach(function (card) {
      if (card.dataset.lang === lang) {
        card.classList.add("language-card--active");
      } else {
        card.classList.remove("language-card--active");
      }
    });
  }

  function showMessage(i) {
    var current = messages[i];
    heading.textContent = current.text;
    heading.setAttribute("lang", current.lang);
    setActiveCard(current.lang);
  }

  showMessage(index);

  setInterval(function () {
    index = (index + 1) % messages.length;
    showMessage(index);
  }, intervalMs);
});
