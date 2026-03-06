#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

function parseArgs(argv) {
  const parsed = { site: "site" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if ((arg === "--site" || arg === "--site-dir") && argv[i + 1]) {
      parsed.site = argv[i + 1];
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    }
  }
  return parsed;
}

function usage() {
  return [
    "Usage:",
    "  node Scripts/check_query_expansion.mjs --site site",
    "",
    "Options:",
    "  --site, --site-dir   Built site directory (default: site)",
  ].join("\n");
}

function assertCondition(condition, message, details, failures) {
  if (!condition) {
    failures.push({ message, details });
  }
}

function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateDictionary(dictionary, failures) {
  assertCondition(isObject(dictionary), "Dictionary must be an object", { type: typeof dictionary }, failures);
  assertCondition(Number(dictionary?.version) >= 1, "Dictionary version must be >= 1", { version: dictionary?.version }, failures);
  assertCondition(isObject(dictionary?.languages), "Dictionary must contain a languages object", null, failures);
  const langs = ["en", "lt", "es", "ru"];
  for (const lang of langs) {
    const entry = dictionary?.languages?.[lang];
    assertCondition(isObject(entry), `Missing language block for '${lang}'`, null, failures);
    assertCondition(Array.isArray(entry?.phrases), `'${lang}' phrases must be an array`, { type: typeof entry?.phrases }, failures);
    assertCondition(isObject(entry?.tokens), `'${lang}' tokens must be an object`, { type: typeof entry?.tokens }, failures);
    assertCondition(Array.isArray(entry?.protected_terms), `'${lang}' protected_terms must be an array`, null, failures);
  }
}

function loadExpansionHooks(sourceText, failures) {
  const windowStub = {
    location: {
      pathname: "/en/control-panels/sp3/",
      search: "?search_synonyms=1&search_debug=1",
      href: "http://127.0.0.1:9000/en/control-panels/sp3/?search_synonyms=1&search_debug=1",
      origin: "http://127.0.0.1:9000",
    },
  };

  const documentStub = {
    addEventListener() {},
    querySelector() {
      return null;
    },
    getElementById() {
      return null;
    },
    createElement() {
      return {
        innerHTML: "",
        textContent: "",
        appendChild() {},
        setAttribute() {},
      };
    },
  };

  const context = {
    window: windowStub,
    document: documentStub,
    document$: undefined,
    requestAnimationFrame(fn) {
      if (typeof fn === "function") fn();
    },
    URL,
    URLSearchParams,
    Map,
    Set,
    Promise,
    JSON,
    fetch: async () => ({ ok: false, status: 404, json: async () => ({}) }),
    Event: class Event {
      constructor(type) {
        this.type = type;
      }
    },
    console,
    setTimeout,
    clearTimeout,
  };
  context.globalThis = context;

  try {
    vm.runInNewContext(sourceText, context, { filename: "pagefind-modal-search.js" });
  } catch (error) {
    failures.push({ message: "Failed to evaluate pagefind-modal-search.js", details: { error: String(error) } });
    return null;
  }

  const hooks = context.window.__pagefindModalSearchDebug;
  assertCondition(isObject(hooks), "Debug hooks were not exposed by pagefind-modal-search.js", null, failures);
  assertCondition(typeof hooks?.expandQuery === "function", "expandQuery hook is missing", null, failures);
  assertCondition(
    typeof hooks?.filterExpansionVariants === "function",
    "filterExpansionVariants hook is missing",
    null,
    failures,
  );
  assertCondition(
    typeof hooks?.countUniqueResultPages === "function",
    "countUniqueResultPages hook is missing",
    null,
    failures,
  );
  return hooks;
}

function runExpansionChecks(hooks, dictionary, failures) {
  const english = hooks.expandQuery("control with messages", "en", dictionary);
  const englishQueries = english.variants.map((variant) => variant.query);
  assertCondition(
    englishQueries.includes("sms control"),
    "Expected phrase expansion to include 'sms control'",
    { variants: englishQueries.slice(0, 10) },
    failures,
  );
  assertCondition(
    english.variants.length <= 8,
    "Expected variant list to be capped at 8",
    { count: english.variants.length, variants: englishQueries },
    failures,
  );
  assertCondition(
    new Set(englishQueries).size === englishQueries.length,
    "Expected variants to be deduplicated",
    { variants: englishQueries },
    failures,
  );

  const protectedTerm = hooks.expandQuery("ipcom messages", "en", dictionary);
  const protectedQueries = protectedTerm.variants.map((variant) => variant.query);
  assertCondition(
    protectedQueries.every((query) => query.includes("ipcom")),
    "Protected term 'ipcom' should never be replaced",
    { variants: protectedQueries },
    failures,
  );

  const lithuanian = hooks.expandQuery("valdymas zinutemis", "lt", dictionary);
  assertCondition(
    lithuanian.variants.some((variant) => variant.query.includes("sms valdymas")),
    "Expected Lithuanian phrase expansion to include 'sms valdymas'",
    { variants: lithuanian.variants.map((variant) => variant.query) },
    failures,
  );
  const lithuanianDiacritics = hooks.expandQuery("valdymas žinutėmis", "lt", dictionary);
  assertCondition(
    lithuanianDiacritics.variants.some((variant) => variant.query.includes("sms valdymas")),
    "Expected Lithuanian diacritic phrase expansion to include 'sms valdymas'",
    { variants: lithuanianDiacritics.variants.map((variant) => variant.query) },
    failures,
  );

  const languageIsolation = hooks.expandQuery("control with messages", "ru", dictionary);
  assertCondition(
    !languageIsolation.variants.some((variant) => variant.query === "sms control"),
    "Russian expansion should not reuse English phrase synonym",
    { variants: languageIsolation.variants.map((variant) => variant.query) },
    failures,
  );

  const highCoverage = hooks.filterExpansionVariants(english.variants, "control with messages", 6);
  assertCondition(
    highCoverage.some((variant) => variant.reason === "phrase"),
    "Phrase variants should stay enabled at high exact page coverage",
    { variants: highCoverage.map((variant) => `${variant.reason}:${variant.query}`) },
    failures,
  );
  assertCondition(
    !highCoverage.some((variant) => String(variant.reason || "").startsWith("token-")),
    "Token variants should be skipped at high exact page coverage",
    { variants: highCoverage.map((variant) => `${variant.reason}:${variant.query}`) },
    failures,
  );

  const lowCoverage = hooks.filterExpansionVariants(english.variants, "control with messages", 1);
  assertCondition(
    lowCoverage.some((variant) => String(variant.reason || "").startsWith("token-")),
    "Token variants should be enabled at low exact page coverage",
    { variants: lowCoverage.map((variant) => `${variant.reason}:${variant.query}`) },
    failures,
  );

  const uniquePages = hooks.countUniqueResultPages([
    { url: "/en/receivers/ipcom/#a" },
    { url: "/en/receivers/ipcom/#b" },
    { url: "/en/alarm-communicators/cellular/g16/#1" },
  ]);
  assertCondition(uniquePages === 2, "Expected unique page counting to ignore anchors", { uniquePages }, failures);

  const protectedPhrase = hooks.expandQuery("connect to protegus service", "en", dictionary);
  const protectedPhraseQueries = protectedPhrase.variants.map((variant) => variant.query);
  assertCondition(
    !protectedPhraseQueries.includes("enable cloud service"),
    "Phrase expansion must not drop protected term 'protegus'",
    { variants: protectedPhraseQueries },
    failures,
  );
  assertCondition(
    protectedPhraseQueries.some((query) => query.includes("protegus")),
    "Expected at least one expansion variant to preserve 'protegus'",
    { variants: protectedPhraseQueries },
    failures,
  );
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return 0;
  }

  const siteDir = path.resolve(args.site);
  const dictionaryPath = path.join(siteDir, "javascripts", "search-synonyms.json");
  const searchScriptPath = path.join(siteDir, "javascripts", "pagefind-modal-search.js");
  const failures = [];

  const [dictionaryRaw, searchScriptRaw] = await Promise.all([
    fs.readFile(dictionaryPath, "utf8"),
    fs.readFile(searchScriptPath, "utf8"),
  ]);

  const dictionary = JSON.parse(dictionaryRaw);
  validateDictionary(dictionary, failures);
  const hooks = loadExpansionHooks(searchScriptRaw, failures);
  if (hooks) {
    runExpansionChecks(hooks, dictionary, failures);
  }

  if (failures.length) {
    console.error("Query expansion checks failed:");
    failures.forEach((failure, index) => {
      console.error(`${index + 1}. ${failure.message}`);
      if (failure.details) {
        console.error(`   details: ${JSON.stringify(failure.details)}`);
      }
    });
    return 1;
  }

  console.log("Query expansion checks passed.");
  return 0;
}

run()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    console.error(`Query expansion checks crashed: ${error.stack || error.message}`);
    process.exitCode = 1;
  });
