(function () {
  var SEARCH_DEBOUNCE_MS = 180;
  var MAX_RESULTS = 20;
  var DEFAULT_LANG = "en";
  var KNOWN_LANGS = new Set(["en", "lt", "es", "ru"]);
  var STRINGS = {
    en: {
      placeholder: "Type to start searching",
      initializing: "Initializing search",
      loadError: "Search is unavailable. Failed to load the search index.",
      one: "1 matching document",
      other: "# matching documents",
      noResultsManual: "No matching documents in this manual.",
      noResultsDocument: "No matches in this page.",
      oneInDocument: "1 match in this page",
      otherInDocument: "# matches in this page",
      noResultsLanguage: "No matching documents in this language.",
      resultsFromLanguage: "Results from site in #:",
      languageNames: {
        en: "English",
        lt: "Lithuanian",
        es: "Spanish",
        ru: "Russian"
      }
    },
    lt: {
      placeholder: "Rašykite, kad pradėtumėte paiešką",
      initializing: "Inicijuojama paieška",
      loadError: "Paieška nepasiekiama. Nepavyko įkelti paieškos indekso.",
      one: "1 atitinkantis dokumentas",
      other: "# atitinkantys dokumentai",
      noResultsManual: "Šiame vadove atitinkančių dokumentų nerasta.",
      noResultsDocument: "Šiame puslapyje atitikmenų nerasta.",
      oneInDocument: "1 atitiktis šiame puslapyje",
      otherInDocument: "# atitiktys šiame puslapyje",
      noResultsLanguage: "Šia kalba atitinkančių dokumentų nerasta.",
      resultsFromLanguage: "Rezultatai svetainėje kalba #:",
      languageNames: {
        en: "anglų",
        lt: "lietuvių",
        es: "ispanų",
        ru: "rusų"
      }
    },
    es: {
      placeholder: "Escriba para iniciar la búsqueda",
      initializing: "Inicializando la búsqueda",
      loadError: "La búsqueda no está disponible. No se pudo cargar el índice de búsqueda.",
      one: "1 documento coincidente",
      other: "# documentos coincidentes",
      noResultsManual: "No se encontraron documentos coincidentes en este manual.",
      noResultsDocument: "No se encontraron coincidencias en esta página.",
      oneInDocument: "1 coincidencia en esta página",
      otherInDocument: "# coincidencias en esta página",
      noResultsLanguage: "No se encontraron documentos coincidentes en este idioma.",
      resultsFromLanguage: "Resultados del sitio en #:",
      languageNames: {
        en: "inglés",
        lt: "lituano",
        es: "español",
        ru: "ruso"
      }
    },
    ru: {
      placeholder: "Начните вводить для поиска",
      initializing: "Инициализация поиска",
      loadError: "Поиск недоступен. Не удалось загрузить поисковый индекс.",
      one: "1 подходящий документ",
      other: "# подходящих документов",
      noResultsManual: "В этом руководстве подходящие документы не найдены.",
      noResultsDocument: "Совпадений на этой странице не найдено.",
      oneInDocument: "1 совпадение на этой странице",
      otherInDocument: "# совпадений на этой странице",
      noResultsLanguage: "В этом языке подходящие документы не найдены.",
      resultsFromLanguage: "Результаты по сайту на #:",
      languageNames: {
        en: "английском",
        lt: "литовском",
        es: "испанском",
        ru: "русском"
      }
    }
  };

  function getConfigBase() {
    var configNode = document.getElementById("__config");
    if (!configNode || !configNode.textContent) {
      return ".";
    }
    try {
      var parsed = JSON.parse(configNode.textContent);
      return parsed.base || ".";
    } catch (error) {
      return ".";
    }
  }

  function detectLanguage() {
    var segments = (window.location.pathname || "/").split("/").filter(Boolean);
    if (segments.length && KNOWN_LANGS.has(segments[0])) {
      return segments[0];
    }
    return DEFAULT_LANG;
  }

  function ensureScopePath(path) {
    if (!path) {
      return "/";
    }
    var value = String(path).trim();
    if (!value.startsWith("/")) {
      value = "/" + value;
    }
    if (!value.endsWith("/")) {
      value += "/";
    }
    return value;
  }

  function getCurrentPageScope() {
    var pathname = window.location.pathname || "/";
    return ensureScopePath(pathname);
  }

  function stripHtml(value) {
    if (!value) {
      return "";
    }
    var container = document.createElement("div");
    container.innerHTML = value;
    return (container.textContent || "").replace(/\s+/g, " ").trim();
  }

  function cleanTitle(value) {
    return String(value || "").replace(/¶/g, "").replace(/\s+/g, " ").trim();
  }

  function formatCount(template, count) {
    return String(template || "").replace("#", String(count));
  }

  function getLocaleText(lang) {
    return STRINGS[lang] || STRINGS[DEFAULT_LANG];
  }

  function resolveScopes(marker) {
    var languageScope = marker && marker.dataset.languageScope ? marker.dataset.languageScope : detectLanguage();
    var manualScope = marker && marker.dataset.manualScope ? marker.dataset.manualScope : getCurrentPageScope();
    var subcategoryScope = marker && marker.dataset.subcategoryScope ? marker.dataset.subcategoryScope : "/" + languageScope + "/";
    return {
      lang: languageScope,
      manual: ensureScopePath(manualScope),
      subcategory: ensureScopePath(subcategoryScope)
    };
  }

  function buildPagefindScriptUrl() {
    var base = getConfigBase();
    var normalized = base.endsWith("/") ? base : base + "/";
    return new URL(normalized + "pagefind/pagefind.js", window.location.href).toString();
  }

  function createState() {
    return {
      bound: false,
      boundForm: null,
      searchToken: 0,
      pagefindApi: null,
      pagefindPromise: null,
      root: null,
      form: null,
      input: null,
      meta: null,
      actions: null,
      list: null,
      toggle: null,
      debounceTimer: null,
      scopes: null,
      texts: getLocaleText(DEFAULT_LANG),
      currentQuery: "",
      lastLoadError: null
    };
  }

  var state = window.__pagefindModalSearchState || createState();
  window.__pagefindModalSearchState = state;

  function setMeta(text) {
    if (state.meta) {
      state.meta.textContent = text;
    }
  }

  function clearResults() {
    if (state.list) {
      state.list.innerHTML = "";
    }
    if (state.actions) {
      state.actions.innerHTML = "";
    }
  }

  function setIdleState() {
    clearResults();
    setMeta(state.texts.placeholder);
  }

  function getLanguageDisplayName(lang) {
    var names = state.texts.languageNames || {};
    return names[lang] || String(lang || "").toUpperCase();
  }

  function setLanguageFallbackHeader(noResultText) {
    if (!state.actions || !state.scopes) {
      return;
    }

    state.actions.innerHTML = "";
    var wrapper = document.createElement("div");
    wrapper.className = "md-search-result__fallback";

    var separator = document.createElement("hr");
    separator.className = "md-search-result__fallback-separator";
    wrapper.appendChild(separator);

    var title = document.createElement("p");
    title.className = "md-search-result__fallback-title";
    title.textContent = formatCount(state.texts.resultsFromLanguage, getLanguageDisplayName(state.scopes.lang));
    wrapper.appendChild(title);

    if (noResultText) {
      var empty = document.createElement("p");
      empty.className = "md-search-result__fallback-empty";
      empty.textContent = noResultText;
      wrapper.appendChild(empty);
    }

    state.actions.appendChild(wrapper);
  }

  function isCurrentDocumentScope() {
    if (!state.scopes || !state.scopes.manual) {
      return false;
    }
    return state.scopes.manual === getCurrentPageScope();
  }

  function updateListRole() {
    if (!state.list || !state.toggle) {
      return;
    }
    var isOpen = !!state.toggle.checked;
    state.list.setAttribute("role", isOpen ? "list" : "presentation");
    state.list.hidden = !isOpen;
  }

  function openSearchModal() {
    if (!state.toggle || state.toggle.checked) {
      return;
    }
    state.toggle.checked = true;
    state.toggle.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function closeSearchModal() {
    if (state.toggle) {
      state.toggle.checked = false;
      state.toggle.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (state.input) {
      state.input.blur();
    }
  }

  function loadPagefind() {
    if (state.pagefindApi) {
      return Promise.resolve(state.pagefindApi);
    }
    if (state.pagefindPromise) {
      return state.pagefindPromise;
    }

    state.pagefindPromise = Promise.resolve()
      .then(function () {
        return import(buildPagefindScriptUrl());
      })
      .then(function (moduleApi) {
        var api = moduleApi && moduleApi.default ? moduleApi.default : moduleApi;
        if (!api || typeof api.search !== "function") {
          throw new Error("Pagefind module loaded but API is missing.");
        }
        return Promise.resolve(api.init ? api.init() : undefined).then(function () {
          state.pagefindApi = api;
          state.lastLoadError = null;
          return api;
        });
      })
      .catch(function (error) {
        state.pagefindPromise = null;
        state.lastLoadError = error;
        if (typeof console !== "undefined" && typeof console.error === "function") {
          console.error("[pagefind-modal-search] Failed to initialize Pagefind.", error);
        }
        throw error;
      });

    return state.pagefindPromise;
  }

  function createResultItem(entry) {
    var item = document.createElement("li");
    item.className = "md-search-result__item";

    var link = document.createElement("a");
    link.className = "md-search-result__link";
    link.href = entry.url;
    link.tabIndex = -1;

    var article = document.createElement("article");
    article.className = "md-search-result__article md-typeset";
    article.setAttribute("data-md-score", entry.score.toFixed(2));

    var title = document.createElement("h2");
    title.textContent = entry.title;
    article.appendChild(title);

    if (entry.excerpt) {
      var teaser = document.createElement("p");
      teaser.className = "md-search-result__teaser";
      teaser.textContent = entry.excerpt;
      article.appendChild(teaser);
    }

    link.appendChild(article);
    item.appendChild(link);
    return item;
  }

  function renderResultList(entries) {
    if (!state.list) {
      return;
    }
    state.list.innerHTML = "";
    var fragment = document.createDocumentFragment();
    entries.forEach(function (entry) {
      fragment.appendChild(createResultItem(entry));
    });
    state.list.appendChild(fragment);
  }

  async function hydrateResults(rawResults) {
    var items = [];
    for (var index = 0; index < rawResults.length; index += 1) {
      if (items.length >= MAX_RESULTS) {
        break;
      }
      var raw = rawResults[index];
      try {
        var data = await raw.data();
        if (!data || !data.url) {
          continue;
        }
        var score = typeof raw.score === "number" ? raw.score : 1;
        var pageTitle = cleanTitle(data.meta && data.meta.title ? data.meta.title : data.url);
        var subResults = Array.isArray(data.sub_results) ? data.sub_results : [];

        if (subResults.length) {
          for (var subIndex = 0; subIndex < subResults.length; subIndex += 1) {
            if (items.length >= MAX_RESULTS) {
              break;
            }
            var sub = subResults[subIndex] || {};
            items.push({
              url: sub.url || data.url,
              title: cleanTitle(sub.title || pageTitle || data.url),
              excerpt: stripHtml(sub.excerpt || data.excerpt || ""),
              score: score
            });
          }
          continue;
        }

        items.push({
          url: data.url,
          title: cleanTitle(pageTitle || data.url),
          excerpt: stripHtml(data.excerpt || ""),
          score: score
        });
      } catch (error) {
        // Skip malformed result entries but continue rendering valid ones.
      }
    }
    return items;
  }

  async function searchWithFilters(pagefind, query, filters) {
    var response = await pagefind.search(query, { filters: filters });
    return hydrateResults(response && response.results ? response.results : []);
  }

  function setMatchCount(count, options) {
    var inDocument = !!(options && options.inDocument);
    if (inDocument) {
      if (count === 1) {
        setMeta(state.texts.oneInDocument || state.texts.one);
        return;
      }
      setMeta(formatCount(state.texts.otherInDocument || state.texts.other, count));
      return;
    }

    if (count === 1) {
      setMeta(state.texts.one);
      return;
    }
    setMeta(formatCount(state.texts.other, count));
  }

  async function performSearch() {
    if (!state.input) {
      return;
    }

    var query = (state.input.value || "").trim();
    state.currentQuery = query;

    if (!query) {
      setIdleState();
      return;
    }

    var token = state.searchToken + 1;
    state.searchToken = token;
    clearResults();
    setMeta(state.texts.initializing);

    try {
      var pagefind = await loadPagefind();
      var manualResults = await searchWithFilters(pagefind, query, {
        lang: state.scopes.lang,
        manual: state.scopes.manual
      });

      if (token !== state.searchToken) {
        return;
      }

      if (manualResults.length) {
        if (state.actions) {
          state.actions.innerHTML = "";
        }
        renderResultList(manualResults);
        setMatchCount(manualResults.length, { inDocument: isCurrentDocumentScope() });
        return;
      }

      setMeta(isCurrentDocumentScope() ? (state.texts.noResultsDocument || state.texts.noResultsManual) : state.texts.noResultsManual);
      setLanguageFallbackHeader();
      var languageResults = await searchWithFilters(pagefind, query, {
        lang: state.scopes.lang
      });

      if (token !== state.searchToken) {
        return;
      }

      if (languageResults.length) {
        renderResultList(languageResults);
        return;
      }

      if (state.list) {
        state.list.innerHTML = "";
      }
      setLanguageFallbackHeader(state.texts.noResultsLanguage);
    } catch (error) {
      if (token !== state.searchToken) {
        return;
      }
      clearResults();
      if (state.lastLoadError) {
        setMeta(state.texts.loadError);
        return;
      }
      setMeta(state.texts.noResultsLanguage);
    }
  }

  function scheduleSearch() {
    if (state.debounceTimer) {
      clearTimeout(state.debounceTimer);
    }
    state.debounceTimer = setTimeout(function () {
      performSearch();
    }, SEARCH_DEBOUNCE_MS);
  }

  function bindEvents() {
    if (state.bound && state.boundForm === state.form) {
      return;
    }

    state.form.addEventListener("submit", function (event) {
      event.preventDefault();
      openSearchModal();
      performSearch();
    });

    state.form.addEventListener("reset", function () {
      state.searchToken += 1;
      state.currentQuery = "";
      setTimeout(function () {
        setIdleState();
      }, 0);
    });

    state.input.addEventListener("focus", function () {
      openSearchModal();
    });

    state.input.addEventListener("click", function () {
      openSearchModal();
    });

    state.input.addEventListener("input", function () {
      openSearchModal();
      scheduleSearch();
    });

    state.input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearchModal();
        return;
      }

      if (event.key === "Enter") {
        var firstLink = state.list ? state.list.querySelector("a.md-search-result__link") : null;
        if (firstLink) {
          event.preventDefault();
          firstLink.click();
        }
      }
    });

    state.root.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearchModal();
      }
    });

    state.root.addEventListener("click", function (event) {
      var target = event.target;
      if (target instanceof Element && target.closest("a.md-search-result__link")) {
        closeSearchModal();
      }
    });

    if (state.toggle) {
      state.toggle.addEventListener("change", function () {
        updateListRole();
        if (state.toggle.checked) {
          if (state.input && document.activeElement !== state.input) {
            requestAnimationFrame(function () {
              try {
                state.input.focus({ preventScroll: true });
              } catch (error) {
                state.input.focus();
              }
            });
          }
          loadPagefind().catch(function () {
            // Keep modal usable even if Pagefind fails to initialize.
          });
          if ((state.input.value || "").trim()) {
            scheduleSearch();
          }
          return;
        }
        if (state.debounceTimer) {
          clearTimeout(state.debounceTimer);
        }
      });
    }

    state.bound = true;
    state.boundForm = state.form;
  }

  function applyPagefindModalSearch() {
    var root = document.querySelector(".md-search");
    if (!root) {
      return;
    }
    var form = root.querySelector("form[name='manual-search']");
    if (!form) {
      return;
    }
    var input = form.querySelector("input[name='query']");
    var meta = root.querySelector(".md-search-result__meta");
    var actions = root.querySelector(".md-search-result__actions");
    var list = root.querySelector(".md-search-result__list");
    if (!input || !meta || !actions || !list) {
      return;
    }

    state.root = root;
    state.form = form;
    state.input = input;
    state.meta = meta;
    state.actions = actions;
    state.list = list;
    state.toggle = document.getElementById("__search");

    var marker = document.querySelector(".pagefind-scope-marker[data-language-scope]");
    state.scopes = resolveScopes(marker);
    state.texts = getLocaleText(state.scopes.lang);

    bindEvents();
    state.form.reset();
    state.currentQuery = "";
    setIdleState();
    updateListRole();
  }

  document.addEventListener("DOMContentLoaded", applyPagefindModalSearch);
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(function () {
      requestAnimationFrame(applyPagefindModalSearch);
    });
  }
})();
