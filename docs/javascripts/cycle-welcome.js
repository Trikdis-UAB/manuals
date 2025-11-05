(function () {
  var cycleState = {
    heading: null,
    interval: null
  };

  var messages = [
    { text: "Welcome! Pick your language:", lang: "en" },
    { text: "Sveiki! Pasirinkite kalbą:", lang: "lt" },
    { text: "¡Bienvenido! Elige tu idioma:", lang: "es" },
    { text: "Добро пожаловать! Выберите язык:", lang: "ru" }
  ];

  var intervalMs = 2000;

  function clearCycle() {
    if (cycleState.interval) {
      clearInterval(cycleState.interval);
    }
    cycleState.interval = null;
    cycleState.heading = null;
  }

  function setActiveCard(languageCards, lang) {
    languageCards.forEach(function (card) {
      if (card.dataset.lang === lang) {
        card.classList.add("language-card--active");
      } else {
        card.classList.remove("language-card--active");
      }
    });
  }

  function createCycle(heading, languageCards) {
    var index = 0;

    function showMessage(i) {
      var current = messages[i];
      heading.textContent = current.text;
      heading.setAttribute("lang", current.lang);
      setActiveCard(languageCards, current.lang);
    }

    showMessage(index);

    cycleState.interval = window.setInterval(function () {
      index = (index + 1) % messages.length;
      showMessage(index);
    }, intervalMs);

    cycleState.heading = heading;
  }

  function initWelcomeCycle() {
    var heading = document.getElementById("welcome-message");
    var languageCards = document.querySelectorAll(".language-card");

    if (!heading || !languageCards.length) {
      clearCycle();
      return;
    }

    if (cycleState.heading === heading) {
      return;
    }

    clearCycle();

    var tocNav = document.querySelector('nav[aria-label="Table of contents"]');
    if (tocNav) {
      tocNav.remove();
    }

    createCycle(heading, languageCards);
  }

  function subscribeToDocument() {
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(function () {
        initWelcomeCycle();
      });
      return true;
    }
    return false;
  }

  if (document.readyState !== "loading") {
    initWelcomeCycle();
  } else {
    document.addEventListener("DOMContentLoaded", function onReady() {
      document.removeEventListener("DOMContentLoaded", onReady);
      initWelcomeCycle();
    });
  }

  if (!subscribeToDocument()) {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (subscribeToDocument() || attempts > 100) {
        window.clearInterval(timer);
      }
    }, 100);
  }
})();
