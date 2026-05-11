(function () {
  var SEARCH_DEBOUNCE_MS = 180;
  var MAX_RESULTS = 20;
  var DEFAULT_LANG = "en";
  var KNOWN_LANGS = new Set(["en", "lt", "es", "ru"]);
  var EXPANSION_VARIANT_LIMIT = 8;
  var TOKEN_EXPANSION_PAGE_THRESHOLD = 3;
  var LANGUAGE_SCOPE_MAX_SUBRESULTS_PER_PAGE = 4;
  var EXACT_MATCH_BONUS = 0.08;
  var PENDING_RESULT_NAVIGATION_KEY = "__pagefindPendingResultNavigation";
  var VARIANT_WEIGHTS = {
    exact: 1.0,
    phrase: 0.93,
    tokenSingle: 0.88,
    tokenMulti: 0.82
  };
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
      expandedHint: "Expanded with synonyms: #",
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
      expandedHint: "Paieška išplėsta sinonimais: #",
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
      expandedHint: "Búsqueda ampliada con sinónimos: #",
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
      expandedHint: "Поиск расширен синонимами: #",
      languageNames: {
        en: "английском",
        lt: "литовском",
        es: "испанском",
        ru: "русском"
      }
    }
  };
  var ORIGIN_SEGMENT_LABELS = {
    en: {
      "alarm-communicators": "Communicators",
      "control-panels": "Control Panels",
      "gate-controllers": "Gate Controllers",
      receivers: "Receivers",
      keypads: "Keypads",
      cellular: "Cellular",
      "fire-panels": "For Fire Panels",
      "quick-setup": "Quick Setup",
      ethernet: "Ethernet",
      radio: "Radio"
    },
    lt: {
      "alarm-communicators": "Komunikatoriai",
      "control-panels": "Apsaugos centrelės",
      "gate-controllers": "Valdikliai",
      receivers: "Imtuvai",
      keypads: "Klaviatūros",
      cellular: "Mobilaus ryšio",
      "fire-panels": "Priešgaisrinėms centralėms",
      "quick-setup": "Greitas diegimas",
      ethernet: "Ethernet",
      radio: "UHF radijo bangomis"
    },
    es: {
      "alarm-communicators": "Comunicadores",
      "control-panels": "Paneles de control",
      "gate-controllers": "Controladores",
      receivers: "Receptores",
      keypads: "Teclados",
      cellular: "Celular",
      "fire-panels": "Celular para Incendio",
      "quick-setup": "Instalación rápida",
      ethernet: "Ethernet",
      radio: "Banda de radio UHF"
    },
    ru: {
      "alarm-communicators": "Коммуникаторы",
      "control-panels": "Панели управления",
      "gate-controllers": "Контроллеры",
      receivers: "Приёмники",
      keypads: "Клавиатуры",
      cellular: "GSM/GPRS",
      "fire-panels": "Для противопожарной охранной панели",
      "quick-setup": "Быстрая настройка",
      ethernet: "Ethernet",
      radio: "UHF модули"
    }
  };
  var ORIGIN_PRODUCT_LABELS = {
    "gt-plus": "GT+",
    gt: "GT",
    get: "GET",
    g16: "G16",
    g16t: "G16T",
    g17f: "G17F",
    cg17: "CG17",
    sp3: "SP3",
    e16: "E16",
    e16t: "E16T",
    t16: "T16",
    ipcom: "IPcom",
    flexi: "FLEXi",
    firecom: "FIRECOM",
    gator: "GATOR",
    "gator-wifi": "GATOR WiFi",
    "sk-lcd-button": "SK-LCD Button",
    "sk-led-button": "SK-LED Button",
    "sk-lcd-touchpad": "SK-LCD TouchPad",
    "sk-led-touchpad": "SK-LED TouchPad",
    "flexi-sk-lcd": "FLEXi SK LCD",
    "flexi-sk-led": "FLEXi SK LED",
    "gt-family": "GT/GT+/GET"
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

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalizeForExpansion(query) {
    return String(query || "")
      .toLowerCase()
      .replace(/[^A-Za-z0-9\u00C0-\u024F\u0400-\u04FF]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeQueryTerm(value) {
    return normalizeForExpansion(value);
  }

  function tokenizeNormalizedQuery(value) {
    var normalized = normalizeForExpansion(value);
    if (!normalized) {
      return [];
    }
    return normalized.split(" ").filter(Boolean);
  }

  function calculateCoverage(originalTerms, variantTerms) {
    if (!originalTerms.length) {
      return 1;
    }
    var variantSet = new Set(variantTerms);
    var covered = 0;
    for (var index = 0; index < originalTerms.length; index += 1) {
      if (variantSet.has(originalTerms[index])) {
        covered += 1;
      }
    }
    return covered / originalTerms.length;
  }

  function variantSortOrder(reason) {
    if (reason === "exact") {
      return 0;
    }
    if (reason === "phrase") {
      return 1;
    }
    if (reason === "token-single") {
      return 2;
    }
    return 3;
  }

  function dedupeAndCapVariants(variants) {
    var byQuery = new Map();
    for (var index = 0; index < variants.length; index += 1) {
      var variant = variants[index];
      var key = normalizeForExpansion(variant.query);
      if (!key) {
        continue;
      }
      if (!byQuery.has(key) || (variant.weight || 0) > (byQuery.get(key).weight || 0)) {
        byQuery.set(key, variant);
      }
    }

    var unique = Array.from(byQuery.values());
    unique.sort(function (left, right) {
      var orderDelta = variantSortOrder(left.reason) - variantSortOrder(right.reason);
      if (orderDelta !== 0) {
        return orderDelta;
      }
      return (right.weight || 0) - (left.weight || 0);
    });
    return unique.slice(0, EXPANSION_VARIANT_LIMIT);
  }

  function getQueryTerms(query) {
    var seen = new Set();
    var terms = [];
    var rawTerms = String(query || "").trim().split(/\s+/);
    for (var index = 0; index < rawTerms.length; index += 1) {
      var normalized = normalizeQueryTerm(rawTerms[index]);
      if (normalized.length < 2) {
        continue;
      }
      var lowered = normalized.toLowerCase();
      if (seen.has(lowered)) {
        continue;
      }
      seen.add(lowered);
      terms.push(normalized);
    }
    terms.sort(function (left, right) {
      return right.length - left.length;
    });
    return terms.slice(0, 8);
  }

  function highlightText(text, query) {
    var plainText = stripHtml(text);
    if (!plainText) {
      return "";
    }
    var highlighted = escapeHtml(plainText);
    var terms = getQueryTerms(query);
    for (var index = 0; index < terms.length; index += 1) {
      var pattern = new RegExp("(" + escapeRegExp(terms[index]) + ")", "gi");
      highlighted = highlighted.replace(pattern, '<mark class="md-search__term">$1</mark>');
    }
    return highlighted;
  }

  function cleanTitle(value) {
    return String(value || "").replace(/¶/g, "").replace(/\s+/g, " ").trim();
  }

  function normalizeStructuredQuery(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "");
  }

  function isStructuredAliasQuery(query) {
    var raw = String(query || "").trim();
    if (!raw) {
      return false;
    }
    return /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)+$/.test(raw);
  }

  function parseSearchAliases(meta) {
    if (!meta) {
      return [];
    }
    var raw = meta.search_aliases || meta.searchAliases || meta["search_aliases"] || "";
    if (Array.isArray(raw)) {
      return raw.map(cleanTitle).filter(Boolean);
    }
    return String(raw)
      .split(/\s*\|\s*/)
      .map(cleanTitle)
      .filter(Boolean);
  }

  function getSearchContextKind(meta) {
    if (!meta) {
      return "";
    }
    return cleanTitle(meta.search_context_kind || meta.searchContextKind || meta["search_context_kind"] || "").toLowerCase();
  }

  function isManualAliasSearchContext(meta) {
    return getSearchContextKind(meta) === "manual-aliases";
  }

  function matchesStructuredAliasQuery(query, aliases) {
    if (!isStructuredAliasQuery(query) || !aliases.length) {
      return false;
    }
    var normalizedQuery = normalizeStructuredQuery(query);
    if (!normalizedQuery) {
      return false;
    }

    for (var index = 0; index < aliases.length; index += 1) {
      var normalizedAlias = normalizeStructuredQuery(aliases[index]);
      if (!normalizedAlias) {
        continue;
      }
      if (
        normalizedAlias === normalizedQuery ||
        normalizedAlias.endsWith(normalizedQuery) ||
        normalizedQuery.endsWith(normalizedAlias)
      ) {
        return true;
      }
    }
    return false;
  }

  function isAliasNoiseText(text, aliases) {
    var plain = cleanTitle(stripHtml(text));
    if (!plain) {
      return false;
    }

    var matchedAliases = 0;
    for (var index = 0; index < aliases.length; index += 1) {
      var alias = cleanTitle(aliases[index]);
      if (!alias || alias.length < 5) {
        continue;
      }
      if (plain.indexOf(alias) !== -1) {
        matchedAliases += 1;
        if (matchedAliases >= 2) {
          return true;
        }
      }
    }

    return /TX-[A-Z0-9_]+/i.test(plain) && /FLEXi SP3/i.test(plain);
  }

  function pickCleanExcerptText(candidates, aliases) {
    if (!Array.isArray(candidates)) {
      return "";
    }

    var fallback = "";
    for (var index = 0; index < candidates.length; index += 1) {
      var plain = cleanTitle(stripHtml(candidates[index]));
      if (!plain) {
        continue;
      }
      if (!fallback) {
        fallback = plain;
      }
      if (!isAliasNoiseText(plain, aliases)) {
        return plain;
      }
    }
    return isAliasNoiseText(fallback, aliases) ? "" : fallback;
  }

  function findRepresentativePageExcerpt(data, pageTitle, aliases) {
    var subResults = Array.isArray(data && data.sub_results) ? data.sub_results : [];
    for (var index = 0; index < subResults.length; index += 1) {
      var sub = subResults[index] || {};
      var subTitle = cleanTitle(sub.title || "");
      if (!subTitle || subTitle === pageTitle) {
        continue;
      }
      var excerpt = pickCleanExcerptText([sub.excerpt], aliases);
      if (!excerpt) {
        continue;
      }
      return excerpt;
    }

    return pickCleanExcerptText([data && data.excerpt ? data.excerpt : ""], aliases);
  }

  function buildExcerptHtml(excerptText, query) {
    var plain = cleanTitle(excerptText);
    if (!plain) {
      return "";
    }
    return highlightText(plain, query);
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

  function toPathname(urlValue) {
    var raw = String(urlValue || "").trim();
    if (!raw) {
      return "/";
    }
    try {
      return new URL(raw, window.location.origin).pathname || "/";
    } catch (error) {
      return raw.split("#")[0].split("?")[0] || "/";
    }
  }

  function getScopeSegments(scope, lang) {
    var segments = ensureScopePath(scope).split("/").filter(Boolean);
    if (segments.length && KNOWN_LANGS.has(segments[0])) {
      return segments.slice(1);
    }
    if (segments.length && segments[0] === lang) {
      return segments.slice(1);
    }
    return segments;
  }

  function humanizeSegmentToken(token) {
    if (!token) {
      return "";
    }
    if (token === "wifi") {
      return "WiFi";
    }
    if (token === "lte") {
      return "LTE";
    }
    if (token.length <= 3 || /[0-9]/.test(token)) {
      return token.toUpperCase();
    }
    return token.charAt(0).toUpperCase() + token.slice(1);
  }

  function decodePathSegment(segment) {
    var raw = String(segment || "").trim();
    if (!raw) {
      return "";
    }
    try {
      return decodeURIComponent(raw);
    } catch (error) {
      return raw;
    }
  }

  function humanizeSegment(segment, lang) {
    var normalized = decodePathSegment(segment).toLowerCase();
    if (!normalized) {
      return "";
    }
    if (ORIGIN_PRODUCT_LABELS[normalized]) {
      return ORIGIN_PRODUCT_LABELS[normalized];
    }

    var localized = ORIGIN_SEGMENT_LABELS[lang] || ORIGIN_SEGMENT_LABELS[DEFAULT_LANG] || {};
    if (localized[normalized]) {
      return localized[normalized];
    }

    return normalized
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map(humanizeSegmentToken)
      .join(" ");
  }

  function normalizeQuickSetupOriginSegments(segments) {
    var quickSetupIndex = segments.indexOf("quick-setup");
    if (quickSetupIndex === -1) {
      return segments;
    }

    var trimmed = segments.slice(0, quickSetupIndex + 1);
    var communicator = segments[quickSetupIndex + 1] || "";
    if (communicator === "e16" || communicator === "e16t") {
      trimmed.push(communicator);
      return trimmed;
    }
    if (segments[1] === "cellular") {
      trimmed.push("gt-family");
      return trimmed;
    }
    return trimmed;
  }

  function formatOriginFromManualScope(manualScope, lang) {
    var segments = normalizeQuickSetupOriginSegments(
      getScopeSegments(manualScope, lang)
        .map(function (segment) {
          return decodePathSegment(segment).toLowerCase();
        })
        .filter(Boolean)
    );
    if (!segments.length) {
      return "";
    }
    var localized = [];
    for (var index = 0; index < segments.length; index += 1) {
      var label = humanizeSegment(segments[index], lang);
      if (label) {
        localized.push(label);
      }
    }
    return localized.join(" > ");
  }

  function getManualScopeFromUrl(urlValue, lang) {
    var pagePath = ensureScopePath(toPathname(urlValue));
    var segments = pagePath.split("/").filter(Boolean);
    var language = lang || DEFAULT_LANG;
    var offset = 0;

    if (segments.length && KNOWN_LANGS.has(segments[0])) {
      language = segments[0];
      offset = 1;
    }

    if (segments.length <= offset) {
      return ensureScopePath("/" + language + "/");
    }

    var manualTail;
    if (segments[offset] === "alarm-communicators" && segments.length >= offset + 3) {
      manualTail = segments.slice(offset, offset + 3);
    } else if (segments.length >= offset + 2) {
      manualTail = segments.slice(offset, offset + 2);
    } else {
      manualTail = segments.slice(offset, offset + 1);
    }

    return ensureScopePath("/" + [language].concat(manualTail).join("/") + "/");
  }

  function getManualScopeFromResultData(data, lang) {
    var manualFilters = data && data.filters ? data.filters.manual : null;
    if (Array.isArray(manualFilters) && manualFilters.length && manualFilters[0]) {
      return ensureScopePath(manualFilters[0]);
    }
    if (typeof manualFilters === "string" && manualFilters.trim()) {
      return ensureScopePath(manualFilters);
    }
    return getManualScopeFromUrl(data && data.url ? data.url : "", lang);
  }

  function ensureTrailingSlash(value) {
    if (!value) {
      return value;
    }
    return value.endsWith("/") ? value : value + "/";
  }

  function buildPagefindScriptCandidates() {
    var base = getConfigBase();
    var normalized = ensureTrailingSlash(base);
    var primary = new URL(normalized + "pagefind/pagefind.js", window.location.href).toString();
    var root = new URL("/pagefind/pagefind.js", window.location.origin).toString();
    var cacheBypass = primary + (primary.indexOf("?") === -1 ? "?" : "&") + "v=" + Date.now();

    var ordered = [primary, root, cacheBypass];
    var unique = [];
    var seen = new Set();
    for (var index = 0; index < ordered.length; index += 1) {
      var candidate = ordered[index];
      if (!seen.has(candidate)) {
        seen.add(candidate);
        unique.push(candidate);
      }
    }
    return unique;
  }

  function buildSynonymsDictionaryUrl() {
    var base = getConfigBase();
    var normalized = ensureTrailingSlash(base);
    return new URL(normalized + "javascripts/search-synonyms.json", window.location.href).toString();
  }

  function parseFeatureFlag(value) {
    var normalized = String(value || "").trim().toLowerCase();
    if (!normalized) {
      return false;
    }
    return !(normalized === "0" || normalized === "false" || normalized === "off" || normalized === "no");
  }

  function isSynonymsEnabled(root) {
    var params = new URLSearchParams(window.location.search || "");
    var override = params.get("search_synonyms");
    if (override === null) {
      override = params.get("synonyms");
    }
    if (override !== null) {
      return parseFeatureFlag(override);
    }
    return parseFeatureFlag(root && root.dataset ? root.dataset.searchSynonymsEnabled : "");
  }

  function isObject(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function normalizeProtectedTerms(terms) {
    var set = new Set();
    if (!Array.isArray(terms)) {
      return set;
    }
    for (var index = 0; index < terms.length; index += 1) {
      var normalized = normalizeForExpansion(terms[index]);
      if (normalized) {
        set.add(normalized);
      }
    }
    return set;
  }

  function normalizeSynonymList(values) {
    if (!Array.isArray(values)) {
      return [];
    }
    var unique = [];
    var seen = new Set();
    for (var index = 0; index < values.length; index += 1) {
      var normalized = normalizeForExpansion(values[index]);
      if (!normalized || seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      unique.push(normalized);
    }
    return unique;
  }

  function loadSynonymsDictionary() {
    if (!state.synonymsEnabled) {
      return Promise.resolve(null);
    }
    if (state.synonymsDictionary) {
      return Promise.resolve(state.synonymsDictionary);
    }
    if (state.synonymsDictionaryPromise) {
      return state.synonymsDictionaryPromise;
    }

    state.synonymsDictionaryPromise = fetch(buildSynonymsDictionaryUrl(), {
      credentials: "same-origin",
      cache: "no-store"
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load synonym dictionary: HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (dictionary) {
        if (!isObject(dictionary) || !isObject(dictionary.languages)) {
          throw new Error("Synonym dictionary has invalid shape.");
        }
        state.synonymsDictionary = dictionary;
        return dictionary;
      })
      .catch(function (error) {
        if (typeof console !== "undefined" && typeof console.warn === "function") {
          console.warn("[pagefind-modal-search] Synonym expansion unavailable.", error);
        }
        state.synonymsDictionary = null;
        return null;
      });

    return state.synonymsDictionaryPromise;
  }

  function getRequiredProtectedTerms(tokens, protectedTerms) {
    var required = new Set();
    for (var index = 0; index < tokens.length; index += 1) {
      var token = tokens[index];
      if (token && protectedTerms.has(token)) {
        required.add(token);
      }
    }
    return required;
  }

  function containsRequiredProtectedTerms(query, requiredProtectedTerms) {
    if (!requiredProtectedTerms || !requiredProtectedTerms.size) {
      return true;
    }
    var tokens = new Set(tokenizeNormalizedQuery(query));
    var iterator = requiredProtectedTerms.values();
    var current = iterator.next();
    while (!current.done) {
      if (!tokens.has(current.value)) {
        return false;
      }
      current = iterator.next();
    }
    return true;
  }

  function generatePhraseVariants(normalizedQuery, languageDictionary, originalTerms, requiredProtectedTerms) {
    var phrases = Array.isArray(languageDictionary && languageDictionary.phrases) ? languageDictionary.phrases : [];
    var variants = [];

    for (var index = 0; index < phrases.length; index += 1) {
      var phraseConfig = phrases[index] || {};
      var matchTerms = normalizeSynonymList(phraseConfig.match);
      var expandTerms = normalizeSynonymList(phraseConfig.expand);
      if (!matchTerms.length || !expandTerms.length) {
        continue;
      }

      for (var matchIndex = 0; matchIndex < matchTerms.length; matchIndex += 1) {
        var matchTerm = matchTerms[matchIndex];
        if (!matchTerm || normalizedQuery.indexOf(matchTerm) === -1) {
          continue;
        }
        for (var expandIndex = 0; expandIndex < expandTerms.length; expandIndex += 1) {
          var expandTerm = expandTerms[expandIndex];
          if (!expandTerm || expandTerm === matchTerm) {
            continue;
          }
          var replaced = normalizedQuery.replace(matchTerm, expandTerm).trim();
          if (!replaced || replaced === normalizedQuery) {
            continue;
          }
          if (!containsRequiredProtectedTerms(replaced, requiredProtectedTerms)) {
            continue;
          }
          variants.push({
            query: replaced,
            weight: VARIANT_WEIGHTS.phrase,
            reason: "phrase",
            displayTerm: expandTerm,
            exactTermCoverage: calculateCoverage(originalTerms, tokenizeNormalizedQuery(replaced))
          });
        }
      }
    }

    return variants;
  }

  function generateTokenVariants(normalizedQuery, languageDictionary, protectedTerms, originalTerms) {
    var tokenMap = isObject(languageDictionary && languageDictionary.tokens) ? languageDictionary.tokens : {};
    var tokens = tokenizeNormalizedQuery(normalizedQuery);
    var variants = [];
    var replacementTargets = [];

    for (var index = 0; index < tokens.length; index += 1) {
      var token = tokens[index];
      if (!token || token.length <= 1 || protectedTerms.has(token)) {
        continue;
      }
      var synonyms = normalizeSynonymList(tokenMap[token]);
      if (!synonyms.length) {
        continue;
      }

      replacementTargets.push({ index: index, synonyms: synonyms });
      for (var synonymIndex = 0; synonymIndex < synonyms.length; synonymIndex += 1) {
        var synonym = synonyms[synonymIndex];
        if (!synonym || synonym === token || protectedTerms.has(synonym)) {
          continue;
        }
        var singleTokens = tokens.slice();
        singleTokens[index] = synonym;
        var singleQuery = singleTokens.join(" ").trim();
        if (!singleQuery || singleQuery === normalizedQuery) {
          continue;
        }
        variants.push({
          query: singleQuery,
          weight: VARIANT_WEIGHTS.tokenSingle,
          reason: "token-single",
          displayTerm: synonym,
          exactTermCoverage: calculateCoverage(originalTerms, singleTokens)
        });
      }
    }

    if (replacementTargets.length >= 2) {
      var pairLimit = Math.min(replacementTargets.length, 5);
      for (var left = 0; left < pairLimit; left += 1) {
        for (var right = left + 1; right < pairLimit; right += 1) {
          var leftSynonym = replacementTargets[left].synonyms[0];
          var rightSynonym = replacementTargets[right].synonyms[0];
          if (!leftSynonym || !rightSynonym) {
            continue;
          }
          var multiTokens = tokens.slice();
          multiTokens[replacementTargets[left].index] = leftSynonym;
          multiTokens[replacementTargets[right].index] = rightSynonym;
          var multiQuery = multiTokens.join(" ").trim();
          if (!multiQuery || multiQuery === normalizedQuery) {
            continue;
          }
          variants.push({
            query: multiQuery,
            weight: VARIANT_WEIGHTS.tokenMulti,
            reason: "token-multi",
            displayTerm: leftSynonym + ", " + rightSynonym,
            exactTermCoverage: calculateCoverage(originalTerms, multiTokens)
          });
        }
      }
    }

    return variants;
  }

  function expandQuery(query, lang, dictionary) {
    var sourceQuery = String(query || "").trim();
    var normalizedQuery = normalizeForExpansion(sourceQuery);
    var originalTerms = tokenizeNormalizedQuery(normalizedQuery);
    var variants = [
      {
        query: sourceQuery,
        weight: VARIANT_WEIGHTS.exact,
        reason: "exact",
        displayTerm: "",
        exactTermCoverage: 1
      }
    ];

    if (!normalizedQuery || !isObject(dictionary) || !isObject(dictionary.languages)) {
      return { variants: variants, usedExpansions: [] };
    }

    var languageDictionary = dictionary.languages[lang];
    if (!isObject(languageDictionary)) {
      return { variants: variants, usedExpansions: [] };
    }

    var protectedTerms = normalizeProtectedTerms(languageDictionary.protected_terms);
    var requiredProtectedTerms = getRequiredProtectedTerms(originalTerms, protectedTerms);
    variants = variants
      .concat(generatePhraseVariants(normalizedQuery, languageDictionary, originalTerms, requiredProtectedTerms))
      .concat(generateTokenVariants(normalizedQuery, languageDictionary, protectedTerms, originalTerms));

    var compact = dedupeAndCapVariants(variants);
    var usedExpansions = [];
    var seenExpansions = new Set();

    for (var index = 0; index < compact.length; index += 1) {
      var variant = compact[index];
      if (variant.reason === "exact") {
        continue;
      }
      var term = normalizeForExpansion(variant.displayTerm || variant.query);
      if (!term || seenExpansions.has(term)) {
        continue;
      }
      seenExpansions.add(term);
      usedExpansions.push(term);
    }

    return {
      variants: compact,
      usedExpansions: usedExpansions
    };
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
      synonymsEnabled: false,
      synonymsDictionary: null,
      synonymsDictionaryPromise: null,
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

  function renderExpansionHint(terms) {
    if (!state.actions || !Array.isArray(terms) || !terms.length) {
      return;
    }
    var normalizedTerms = [];
    var seen = new Set();
    for (var index = 0; index < terms.length; index += 1) {
      var term = normalizeForExpansion(terms[index]);
      if (!term || seen.has(term)) {
        continue;
      }
      seen.add(term);
      normalizedTerms.push(term);
      if (normalizedTerms.length >= 4) {
        break;
      }
    }
    if (!normalizedTerms.length) {
      return;
    }
    var hint = document.createElement("p");
    hint.className = "md-search-result__expanded-hint";
    hint.textContent = formatCount(state.texts.expandedHint, normalizedTerms.join(", "));
    state.actions.appendChild(hint);
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

  function readPendingResultNavigation() {
    try {
      var raw = window.sessionStorage.getItem(PENDING_RESULT_NAVIGATION_KEY);
      if (!raw) {
        return null;
      }
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function clearPendingResultNavigation() {
    try {
      window.sessionStorage.removeItem(PENDING_RESULT_NAVIGATION_KEY);
    } catch (error) {
      // Ignore session storage failures.
    }
  }

  function writePendingResultNavigation(parsedUrl) {
    if (!parsedUrl || !parsedUrl.hash) {
      clearPendingResultNavigation();
      return;
    }
    try {
      window.sessionStorage.setItem(
        PENDING_RESULT_NAVIGATION_KEY,
        JSON.stringify({
          pathname: normalizeResultPath(parsedUrl.pathname),
          search: parsedUrl.search || "",
          hash: parsedUrl.hash || ""
        })
      );
    } catch (error) {
      // Ignore session storage failures.
    }
  }

  function pendingResultMatchesCurrentDocument(pending) {
    if (!pending) {
      return false;
    }
    return (
      normalizeResultPath(pending.pathname || "/") === normalizeResultPath(window.location.pathname || "/") &&
      (pending.search || "") === (window.location.search || "")
    );
  }

  function parseResultUrl(urlValue) {
    var raw = String(urlValue || "").trim();
    if (!raw) {
      return null;
    }
    try {
      return new URL(raw, window.location.origin);
    } catch (error) {
      return null;
    }
  }

  function normalizeResultPath(pathname) {
    var value = String(pathname || "/").trim();
    if (!value.startsWith("/")) {
      value = "/" + value;
    }
    return value.endsWith("/") ? value : value + "/";
  }

  function isSameDocumentResult(parsedUrl) {
    if (!parsedUrl || parsedUrl.origin !== window.location.origin) {
      return false;
    }
    return (
      normalizeResultPath(parsedUrl.pathname) === normalizeResultPath(window.location.pathname || "/") &&
      (parsedUrl.search || "") === (window.location.search || "")
    );
  }

  function getSearchScrollOffset() {
    var header = document.querySelector(".md-header");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.max(0, Math.ceil(headerHeight + 12));
  }

  function scrollToResultHash(hashValue, behavior) {
    var hash = String(hashValue || "");
    if (!hash) {
      window.scrollTo({ top: 0, behavior: behavior || "auto" });
      return true;
    }

    var targetId = hash.charAt(0) === "#" ? hash.slice(1) : hash;
    if (!targetId) {
      return false;
    }
    try {
      targetId = decodeURIComponent(targetId);
    } catch (error) {
      // Keep the original hash when decoding fails.
    }

    var target = document.getElementById(targetId);
    if (!target) {
      return false;
    }

    var top = window.scrollY + target.getBoundingClientRect().top - getSearchScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: behavior || "auto" });
    return true;
  }

  function scheduleHashScroll(hashValue, attempt, onComplete) {
    if (scrollToResultHash(hashValue, "auto")) {
      if (typeof onComplete === "function") {
        onComplete(true);
      }
      return;
    }
    if ((attempt || 0) >= 8) {
      if (typeof onComplete === "function") {
        onComplete(false);
      }
      return;
    }
    requestAnimationFrame(function () {
      scheduleHashScroll(hashValue, (attempt || 0) + 1, onComplete);
    });
  }

  function stabilizeHashScroll(hashValue, onComplete) {
    var delays = [0, 80, 180, 360];
    var completionCalled = false;

    delays.forEach(function (delay) {
      window.setTimeout(function () {
        scheduleHashScroll(hashValue, 0, function (success) {
          if (success && !completionCalled && typeof onComplete === "function") {
            completionCalled = true;
            onComplete(true);
          }
        });
      }, delay);
    });
  }

  function applyPendingResultNavigation() {
    var pending = readPendingResultNavigation();
    if (!pending || !pendingResultMatchesCurrentDocument(pending) || !pending.hash) {
      return;
    }
    stabilizeHashScroll(pending.hash, function () {
      clearPendingResultNavigation();
    });
  }

  function applyCurrentHashScrollOffset() {
    if (!window.location.hash) {
      return;
    }
    stabilizeHashScroll(window.location.hash);
  }

  function navigateToResult(urlValue) {
    var parsedUrl = parseResultUrl(urlValue);
    if (!parsedUrl) {
      return;
    }

    if (isSameDocumentResult(parsedUrl)) {
      state.searchToken += 1;
      clearPendingResultNavigation();
      closeSearchModal();

      var nextUrl = parsedUrl.pathname + parsedUrl.search;
      var currentUrl = window.location.pathname + window.location.search;
      if (nextUrl !== currentUrl) {
        window.history.pushState(null, "", nextUrl);
      }

      if (parsedUrl.hash && window.location.hash !== parsedUrl.hash) {
        window.location.hash = parsedUrl.hash;
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (!parsedUrl.hash) {
            window.scrollTo({ top: 0, behavior: "auto" });
            return;
          }
          stabilizeHashScroll(parsedUrl.hash, function (success) {
            if (!success) {
              window.location.assign(parsedUrl.toString());
            }
          });
        });
      });
      return;
    }

    closeSearchModal();
    writePendingResultNavigation(parsedUrl);
    window.location.assign(parsedUrl.toString());
  }

  function loadPagefind() {
    if (state.pagefindApi) {
      return Promise.resolve(state.pagefindApi);
    }
    if (state.pagefindPromise) {
      return state.pagefindPromise;
    }

    state.pagefindPromise = Promise.resolve()
      .then(async function () {
        var candidates = buildPagefindScriptCandidates();
        var failures = [];

        for (var idx = 0; idx < candidates.length; idx += 1) {
          var scriptUrl = candidates[idx];
          try {
            var moduleApi = await import(scriptUrl);
            var api = moduleApi && moduleApi.default ? moduleApi.default : moduleApi;
            if (!api || typeof api.search !== "function") {
              throw new Error("Pagefind module loaded but API is missing.");
            }
            if (typeof api.options === "function") {
              var basePath = ensureTrailingSlash(new URL("./", scriptUrl).toString());
              await Promise.resolve(api.options({ basePath: basePath }));
            }
            await Promise.resolve(api.init ? api.init() : undefined);
            state.pagefindApi = api;
            state.lastLoadError = null;
            return api;
          } catch (error) {
            failures.push({
              url: scriptUrl,
              error: error && error.message ? error.message : String(error)
            });
          }
        }

        throw new Error("Pagefind init failed for all script candidates: " + JSON.stringify(failures));
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

    if (entry.manualTitle && cleanTitle(entry.manualTitle) !== cleanTitle(entry.title)) {
      var manual = document.createElement("p");
      manual.className = "md-search-result__manual";
      manual.textContent = entry.manualTitle;
      article.appendChild(manual);
    }

    if (entry.originLabel) {
      var origin = document.createElement("p");
      origin.className = "md-search-result__origin";
      origin.textContent = entry.originLabel;
      article.appendChild(origin);
    }

    if (entry.excerptHtml) {
      var teaser = document.createElement("p");
      teaser.className = "md-search-result__teaser";
      teaser.innerHTML = entry.excerptHtml;
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

  async function hydrateResults(rawResults, query, options) {
    var maxSubResultsPerPage = MAX_RESULTS;
    if (options && typeof options.maxSubResultsPerPage === "number" && options.maxSubResultsPerPage > 0) {
      maxSubResultsPerPage = options.maxSubResultsPerPage;
    }
    var searchQuery = options && options.searchQuery ? options.searchQuery : query;
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
        var searchAliases = parseSearchAliases(data.meta);
        var manualAliasContext = isManualAliasSearchContext(data.meta);
        var structuredAliasMatch = matchesStructuredAliasQuery(searchQuery, searchAliases);
        var activeLang = state.scopes && state.scopes.lang ? state.scopes.lang : detectLanguage();
        var originManualScope = getManualScopeFromResultData(data, activeLang);
        var originPathSegments = getScopeSegments(originManualScope, activeLang);
        var originLabel = formatOriginFromManualScope(originManualScope, activeLang);
        var pageKey = toResultPageKey(data.url);

        if (structuredAliasMatch) {
          items.push({
            url: data.url,
            title: cleanTitle(pageTitle || data.url),
            manualTitle: cleanTitle(pageTitle || data.url),
            excerptHtml: buildExcerptHtml(findRepresentativePageExcerpt(data, pageTitle, searchAliases), query),
            score: score,
            originLabel: originLabel,
            originManualScope: originManualScope,
            originPathSegments: originPathSegments.slice(),
            aliasMatched: true,
            aliasCollapsed: true,
            pageKey: pageKey
          });
          continue;
        }

        if (subResults.length) {
          var subresultCountForPage = 0;
          for (var subIndex = 0; subIndex < subResults.length; subIndex += 1) {
            if (items.length >= MAX_RESULTS) {
              break;
            }
            if (subresultCountForPage >= maxSubResultsPerPage) {
              break;
            }
            var sub = subResults[subIndex] || {};
            var subTitle = cleanTitle(sub.title || pageTitle || data.url);
            var isPageHeadingSubresult = subTitle === pageTitle;
            var excerptCandidates = manualAliasContext && isPageHeadingSubresult
              ? [findRepresentativePageExcerpt(data, pageTitle, searchAliases), data.excerpt]
              : [
                  sub.excerpt,
                  isPageHeadingSubresult ? findRepresentativePageExcerpt(data, pageTitle, searchAliases) : "",
                  data.excerpt
                ];
            items.push({
              url: sub.url || data.url,
              title: subTitle,
              manualTitle: cleanTitle(pageTitle || data.url),
              excerptHtml: buildExcerptHtml(
                pickCleanExcerptText(excerptCandidates, searchAliases),
                query
              ),
              score: score,
              originLabel: originLabel,
              originManualScope: originManualScope,
              originPathSegments: originPathSegments.slice(),
              aliasMatched: false,
              aliasCollapsed: false,
              pageKey: pageKey
            });
            subresultCountForPage += 1;
          }
          continue;
        }

        items.push({
          url: data.url,
          title: cleanTitle(pageTitle || data.url),
          manualTitle: cleanTitle(pageTitle || data.url),
          excerptHtml: buildExcerptHtml(
            manualAliasContext
              ? findRepresentativePageExcerpt(data, pageTitle, searchAliases)
              : pickCleanExcerptText([data.excerpt], searchAliases),
            query
          ),
          score: score,
          originLabel: originLabel,
          originManualScope: originManualScope,
          originPathSegments: originPathSegments.slice(),
          aliasMatched: false,
          aliasCollapsed: false,
          pageKey: pageKey
        });
      } catch (error) {
        // Skip malformed result entries but continue rendering valid ones.
      }
    }
    return items;
  }

  function buildEntryKey(entry) {
    return String(entry.url || "") + "::" + String(entry.title || "");
  }

  function mergeAndRankResults(entries) {
    var exactKeys = new Set();
    for (var index = 0; index < entries.length; index += 1) {
      if (entries[index].variantReason === "exact") {
        exactKeys.add(entries[index].key);
      }
    }

    var deduped = new Map();
    for (var entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
      var entry = entries[entryIndex];
      var effectiveScore = (entry.rawScore || 0) * (entry.variantWeight || VARIANT_WEIGHTS.exact);
      if (exactKeys.has(entry.key)) {
        effectiveScore += EXACT_MATCH_BONUS;
      }
      entry.effectiveScore = effectiveScore;

      var existing = deduped.get(entry.key);
      if (existing && existing.variantReason === "exact" && entry.variantReason !== "exact") {
        continue;
      }
      if (!existing || entry.effectiveScore > existing.effectiveScore) {
        deduped.set(entry.key, entry);
      }
    }

    return Array.from(deduped.values())
      .sort(function (left, right) {
        var leftExact = left.variantReason === "exact";
        var rightExact = right.variantReason === "exact";
        if (leftExact !== rightExact) {
          return leftExact ? -1 : 1;
        }
        if (right.effectiveScore !== left.effectiveScore) {
          return right.effectiveScore - left.effectiveScore;
        }
        var orderDelta = variantSortOrder(left.variantReason) - variantSortOrder(right.variantReason);
        if (orderDelta !== 0) {
          return orderDelta;
        }
        return (right.rawScore || 0) - (left.rawScore || 0);
      })
      .slice(0, MAX_RESULTS);
  }

  function filterStructuredAliasEntries(query, entries) {
    if (!isStructuredAliasQuery(query)) {
      return entries;
    }

    var aliasMatched = entries.filter(function (entry) {
      return !!entry.aliasMatched;
    });
    if (!aliasMatched.length) {
      return entries;
    }

    var byPage = new Map();
    for (var index = 0; index < aliasMatched.length; index += 1) {
      var entry = aliasMatched[index];
      var pageKey = entry.pageKey || toResultPageKey(entry.url);
      var existing = byPage.get(pageKey);
      if (
        !existing ||
        (!!entry.aliasCollapsed && !existing.aliasCollapsed) ||
        ((entry.effectiveScore || 0) > (existing.effectiveScore || 0) && !!entry.aliasCollapsed === !!existing.aliasCollapsed)
      ) {
        byPage.set(pageKey, entry);
      }
    }

    return Array.from(byPage.values())
      .sort(function (left, right) {
        return (right.effectiveScore || 0) - (left.effectiveScore || 0);
      })
      .slice(0, MAX_RESULTS);
  }

  function toResultPageKey(urlValue) {
    var raw = String(urlValue || "").trim();
    if (!raw) {
      return "";
    }
    try {
      var parsed = new URL(raw, window.location.origin);
      var pathname = parsed.pathname || "/";
      return pathname.endsWith("/") ? pathname : pathname + "/";
    } catch (error) {
      var plain = raw.split("#")[0].split("?")[0];
      return plain.endsWith("/") ? plain : plain + "/";
    }
  }

  function countUniqueResultPages(entries) {
    var unique = new Set();
    for (var index = 0; index < entries.length; index += 1) {
      var key = toResultPageKey(entries[index] && entries[index].url);
      if (key) {
        unique.add(key);
      }
    }
    return unique.size;
  }

  function isTokenVariant(variant) {
    return !!(variant && (variant.reason === "token-single" || variant.reason === "token-multi"));
  }

  function filterExpansionVariants(variants, query, exactUniquePages) {
    var normalizedQuery = normalizeForExpansion(query);
    var phraseVariants = [];
    var tokenVariants = [];

    for (var index = 0; index < variants.length; index += 1) {
      var variant = variants[index];
      if (!variant || variant.reason === "exact") {
        continue;
      }
      if (!variant.query || normalizeForExpansion(variant.query) === normalizedQuery) {
        continue;
      }
      if (isTokenVariant(variant)) {
        tokenVariants.push(variant);
      } else {
        phraseVariants.push(variant);
      }
    }

    if (exactUniquePages < TOKEN_EXPANSION_PAGE_THRESHOLD) {
      return phraseVariants.concat(tokenVariants);
    }
    return phraseVariants;
  }

  async function searchVariant(pagefind, query, filters, variant) {
    var variantQuery = String(variant.query || "").trim();
    if (!variantQuery) {
      return [];
    }
    var response = await pagefind.search(variantQuery, { filters: filters });
    var highlightQuery = variant.reason === "exact" ? query : query + " " + variant.query;
    var isLanguageScope = !filters || !filters.manual;
    var hydrated = await hydrateResults(
      response && response.results ? response.results : [],
      highlightQuery,
      {
        maxSubResultsPerPage: isLanguageScope ? LANGUAGE_SCOPE_MAX_SUBRESULTS_PER_PAGE : MAX_RESULTS,
        searchQuery: query
      }
    );
    var entries = [];

    for (var index = 0; index < hydrated.length; index += 1) {
      var item = hydrated[index];
      entries.push({
        url: item.url,
        title: item.title,
        manualTitle: item.manualTitle || "",
        excerptHtml: item.excerptHtml,
        rawScore: item.score,
        score: item.score,
        originLabel: item.originLabel || "",
        originManualScope: item.originManualScope || "",
        originPathSegments: Array.isArray(item.originPathSegments) ? item.originPathSegments.slice() : [],
        aliasMatched: !!item.aliasMatched,
        aliasCollapsed: !!item.aliasCollapsed,
        pageKey: item.pageKey || toResultPageKey(item.url),
        variantReason: variant.reason,
        variantWeight: variant.weight,
        variantQuery: variant.query,
        displayTerm: variant.displayTerm || variant.query,
        key: buildEntryKey(item)
      });
    }
    return entries;
  }

  async function runScopedSearch(pagefind, query, filters) {
    var exactVariant = {
      query: query,
      weight: VARIANT_WEIGHTS.exact,
      reason: "exact",
      displayTerm: ""
    };
    var combined = await searchVariant(pagefind, query, filters, exactVariant);

    var expansionTermsInResults = [];
    if (!state.synonymsEnabled) {
      return {
        entries: filterStructuredAliasEntries(query, mergeAndRankResults(combined)),
        expansionTerms: expansionTermsInResults
      };
    }

    var dictionary = await loadSynonymsDictionary();
    var expansion = expandQuery(query, state.scopes.lang, dictionary);
    var exactUniquePages = countUniqueResultPages(combined);
    var variants = filterExpansionVariants(expansion.variants, query, exactUniquePages);

    if (!variants.length) {
      return {
        entries: filterStructuredAliasEntries(query, mergeAndRankResults(combined)),
        expansionTerms: expansionTermsInResults
      };
    }

    var tasks = variants.map(function (variant) {
      return searchVariant(pagefind, query, filters, variant);
    });
    var expandedBatches = await Promise.all(tasks);
    for (var index = 0; index < expandedBatches.length; index += 1) {
      combined = combined.concat(expandedBatches[index]);
    }

    var ranked = filterStructuredAliasEntries(query, mergeAndRankResults(combined));
    var seenTerms = new Set();
    for (var rankedIndex = 0; rankedIndex < ranked.length; rankedIndex += 1) {
      var rankedItem = ranked[rankedIndex];
      if (rankedItem.variantReason === "exact") {
        continue;
      }
      var display = normalizeForExpansion(rankedItem.displayTerm || rankedItem.variantQuery);
      if (!display || seenTerms.has(display)) {
        continue;
      }
      seenTerms.add(display);
      expansionTermsInResults.push(display);
      if (expansionTermsInResults.length >= 4) {
        break;
      }
    }

    return {
      entries: ranked,
      expansionTerms: expansionTermsInResults
    };
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
      var manualSearch = await runScopedSearch(pagefind, query, {
        lang: state.scopes.lang,
        manual: state.scopes.manual
      });
      var manualResults = manualSearch.entries;

      if (token !== state.searchToken) {
        return;
      }

      if (manualResults.length) {
        if (state.actions) {
          state.actions.innerHTML = "";
        }
        renderResultList(manualResults);
        setMatchCount(manualResults.length, { inDocument: isCurrentDocumentScope() });
        renderExpansionHint(manualSearch.expansionTerms);
        return;
      }

      setMeta(isCurrentDocumentScope() ? (state.texts.noResultsDocument || state.texts.noResultsManual) : state.texts.noResultsManual);
      setLanguageFallbackHeader();
      var languageSearch = await runScopedSearch(pagefind, query, {
        lang: state.scopes.lang
      });
      var languageResults = languageSearch.entries;

      if (token !== state.searchToken) {
        return;
      }

      if (languageResults.length) {
        renderResultList(languageResults);
        renderExpansionHint(languageSearch.expansionTerms);
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
          navigateToResult(firstLink.getAttribute("href"));
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
      if (!(target instanceof Element)) {
        return;
      }
      var resultLink = target.closest("a.md-search-result__link");
      if (resultLink) {
        event.preventDefault();
        navigateToResult(resultLink.getAttribute("href"));
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
    state.synonymsEnabled = isSynonymsEnabled(root);

    bindEvents();
    state.form.reset();
    state.currentQuery = "";
    setIdleState();
    updateListRole();
  }

  if (document && typeof document.addEventListener === "function") {
    document.addEventListener("DOMContentLoaded", function () {
      applyCurrentHashScrollOffset();
      applyPendingResultNavigation();
      applyPagefindModalSearch();
    });
  }
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(function () {
      requestAnimationFrame(function () {
        applyCurrentHashScrollOffset();
        applyPendingResultNavigation();
        applyPagefindModalSearch();
      });
    });
  }
  if (window && typeof window.addEventListener === "function") {
    window.addEventListener("hashchange", function () {
      requestAnimationFrame(applyCurrentHashScrollOffset);
    });
  }

  var debugParam = new URLSearchParams(window.location.search || "").get("search_debug");
  if (parseFeatureFlag(debugParam)) {
    window.__pagefindModalSearchDebug = {
      normalizeForExpansion: normalizeForExpansion,
      tokenizeNormalizedQuery: tokenizeNormalizedQuery,
      generatePhraseVariants: generatePhraseVariants,
      generateTokenVariants: generateTokenVariants,
      dedupeAndCapVariants: dedupeAndCapVariants,
      expandQuery: expandQuery,
      filterExpansionVariants: filterExpansionVariants,
      countUniqueResultPages: countUniqueResultPages
    };
  }
})();
