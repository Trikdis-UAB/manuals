(function () {
  var messages = [
    { text: "Welcome! Pick your language:", lang: "en" },
    { text: "Sveiki! Pasirinkite kalbą:", lang: "lt" },
    { text: "¡Bienvenido! Elige tu idioma:", lang: "es" },
    { text: "Добро пожаловать! Выберите язык:", lang: "ru" }
  ];

  var messageByLang = {};
  messages.forEach(function (message) {
    messageByLang[message.lang] = message;
  });

  var cycleState = {
    heading: null,
    cards: [],
    grid: null,
    interval: null,
    index: 0,
    manualOverride: false
  };

  var INTERVAL_MS = 2000;

  function clearIntervalTimer() {
    if (cycleState.interval) {
      clearInterval(cycleState.interval);
    }
    cycleState.interval = null;
  }

  function setActiveCard(cards, lang) {
    cards.forEach(function (card) {
      if (!card || !card.dataset) {
        return;
      }
      if (card.dataset.lang === lang) {
        card.classList.add("language-card--active");
      } else {
        card.classList.remove("language-card--active");
      }
    });
  }

  function showLanguage(lang) {
    if (!cycleState.heading || !cycleState.cards.length) {
      return;
    }

    var message = messageByLang[lang];
    if (!message) {
      return;
    }

    cycleState.heading.textContent = message.text;
    cycleState.heading.setAttribute("lang", message.lang);
    setActiveCard(cycleState.cards, message.lang);

    var idx = messages.findIndex(function (msg) {
      return msg.lang === message.lang;
    });
    if (idx >= 0) {
      cycleState.index = idx;
    }
  }

  function startAutoCycle(startLang) {
    if (!cycleState.heading || !cycleState.cards.length) {
      return;
    }

    cycleState.manualOverride = false;

    var startIndex = 0;
    if (startLang) {
      var foundIndex = messages.findIndex(function (msg) {
        return msg.lang === startLang;
      });
      if (foundIndex >= 0) {
        startIndex = foundIndex;
      }
    }

    cycleState.index = startIndex;
    showLanguage(messages[startIndex].lang);

    clearIntervalTimer();
    cycleState.interval = window.setInterval(function () {
      if (cycleState.manualOverride) {
        clearIntervalTimer();
        return;
      }
      cycleState.index = (cycleState.index + 1) % messages.length;
      showLanguage(messages[cycleState.index].lang);
    }, INTERVAL_MS);
  }

  function onCardEnter(event) {
    var card = event.currentTarget;
    var lang = card && card.dataset ? card.dataset.lang : null;
    if (!lang) {
      return;
    }
    cycleState.manualOverride = true;
    clearIntervalTimer();
    showLanguage(lang);
  }

  function shouldResumeCycle(nextTarget) {
    if (!cycleState.grid) {
      return true;
    }

    if (nextTarget && cycleState.grid.contains(nextTarget)) {
      return false;
    }

    var activeElement = document.activeElement;
    if (activeElement && cycleState.grid.contains(activeElement)) {
      return false;
    }

    return true;
  }

  function resumeAutoCycle() {
    cycleState.manualOverride = false;
    var nextIndex = (cycleState.index + 1) % messages.length;
    var nextLang = messages[nextIndex].lang;
    startAutoCycle(nextLang);
  }

  function onCardLeave(event) {
    if (!shouldResumeCycle(event.relatedTarget)) {
      return;
    }
    resumeAutoCycle();
  }

  function onCardBlur() {
    if (!shouldResumeCycle(null)) {
      return;
    }
    resumeAutoCycle();
  }

  function attachHandlers(cards) {
    cards.forEach(function (card) {
      if (!card || card.dataset.hoverBound === "true") {
        return;
      }
      card.dataset.hoverBound = "true";
      card.addEventListener("mouseenter", onCardEnter);
      card.addEventListener("mouseleave", onCardLeave);
      card.addEventListener("focus", onCardEnter);
      card.addEventListener("blur", onCardBlur);
    });
  }

  function removeToc() {
    var tocNav = document.querySelector('nav[aria-label="Table of contents"]');
    if (tocNav) {
      tocNav.remove();
    }
  }

  function initCycle() {
    var heading = document.getElementById("welcome-message");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".language-card"));
    var grid = document.querySelector(".language-grid");

    if (!heading || !cards.length) {
      clearIntervalTimer();
      cycleState.heading = null;
      cycleState.cards = [];
      cycleState.grid = null;
      return;
    }

    cycleState.heading = heading;
    cycleState.cards = cards;
    cycleState.grid = grid || heading.closest(".language-home") || heading.parentElement;

    attachHandlers(cards);
    removeToc();
    startAutoCycle();
  }

  function ensureSubscribed() {
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(function () {
        initCycle();
      });
      return true;
    }
    return false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCycle, { once: true });
  } else {
    initCycle();
  }

  if (!ensureSubscribed()) {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (ensureSubscribed() || attempts > 100) {
        window.clearInterval(timer);
      }
    }, 100);
  }
})();
