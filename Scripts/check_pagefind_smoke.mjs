#!/usr/bin/env node

import http from "node:http";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function parseArgs(argv) {
  const parsed = {
    site: "site",
  };
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
    "  node Scripts/check_pagefind_smoke.mjs --site site",
    "",
    "Options:",
    "  --site, --site-dir   Built site directory (default: site)",
  ].join("\n");
}

function toPathname(urlValue) {
  try {
    return new URL(urlValue).pathname;
  } catch {
    return String(urlValue || "");
  }
}

function assertCondition(condition, message, details, failures) {
  if (!condition) {
    failures.push({ message, details });
  }
}

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js" || ext === ".mjs") return "text/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".xml") return "application/xml; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function createStaticServer(siteDir) {
  const root = path.resolve(siteDir);
  const server = http.createServer(async (req, res) => {
    try {
      const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const normalized = requestPath.endsWith("/") ? `${requestPath}index.html` : requestPath;
      const filePath = path.resolve(root, `.${normalized}`);

      if (!filePath.startsWith(root)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      const stat = await fs.stat(filePath);
      if (!stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      const body = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": mimeFor(filePath) });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  return server;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return 0;
  }

  const siteDir = path.resolve(args.site);
  const pagefindPath = path.join(siteDir, "pagefind", "pagefind.js");
  if (!fsSync.existsSync(siteDir)) {
    console.error(`Site directory not found: ${siteDir}`);
    return 2;
  }
  if (!fsSync.existsSync(pagefindPath)) {
    console.error(`Pagefind bundle not found: ${pagefindPath}`);
    return 2;
  }

  const failures = [];
  const summary = {};

  const server = await createStaticServer(siteDir);
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const pagefind = await import(pathToFileURL(pagefindPath).href);
    if (typeof pagefind.options === "function") {
      await pagefind.options({ basePath: `${baseUrl}/pagefind/` });
    }

    const searchPaths = async (term, filters) => {
      const response = await pagefind.search(term, { filters });
      const paths = [];
      for (const result of response.results) {
        const data = await result.data();
        paths.push(toPathname(data.url));
      }
      return paths;
    };

    const searchMatchCount = async (term, filters) => {
      const response = await pagefind.search(term, { filters });
      let count = 0;
      for (const result of response.results) {
        const data = await result.data();
        const subResults = Array.isArray(data.sub_results) ? data.sub_results : [];
        count += subResults.length || 1;
      }
      return count;
    };

    const allFilters = await pagefind.filters();
    assertCondition(
      !!allFilters.lang && !!allFilters.manual && !!allFilters.subcategory,
      "Expected lang/manual/subcategory filter maps to exist",
      { keys: Object.keys(allFilters || {}) },
      failures,
    );

    for (const lang of ["en", "lt", "es", "ru"]) {
      assertCondition(
        Number(allFilters?.lang?.[lang] || 0) > 0,
        `Expected indexed pages for language '${lang}'`,
        { langCounts: allFilters?.lang || {} },
        failures,
      );
    }

    const manualIpcom = await searchPaths("sqlport", {
      lang: "en",
      manual: "/en/receivers/ipcom/",
    });
    summary.manualIpcom = manualIpcom.length;
    assertCondition(
      manualIpcom.length > 0,
      "Expected at least one IPcom manual result for 'sqlport'",
      { paths: manualIpcom.slice(0, 10) },
      failures,
    );
    assertCondition(
      manualIpcom.every((p) => p.startsWith("/en/receivers/ipcom/")),
      "Expected IPcom manual search results to stay in /en/receivers/ipcom/",
      { paths: manualIpcom.slice(0, 10) },
      failures,
    );

    const pyronixManual = await searchPaths("Pyronix", {
      lang: "en",
      manual: "/en/alarm-communicators/cellular/gt/",
    });
    const pyronixLanguage = await searchPaths("Pyronix", { lang: "en" });
    summary.pyronix = {
      manual: pyronixManual.length,
      language: pyronixLanguage.length,
    };
    assertCondition(
      pyronixManual.length === 0,
      "Expected no manual-scope result for 'Pyronix' in GT manual",
      { paths: pyronixManual.slice(0, 10) },
      failures,
    );
    assertCondition(
      pyronixLanguage.length > 0,
      "Expected language-scope result for 'Pyronix'",
      { paths: pyronixLanguage.slice(0, 10) },
      failures,
    );
    assertCondition(
      pyronixLanguage.every((p) => p.startsWith("/en/")),
      "Expected 'Pyronix' language results to stay in /en/",
      { paths: pyronixLanguage.slice(0, 10) },
      failures,
    );

    const flexiManual = await searchPaths("FLEXi", {
      lang: "en",
      manual: "/en/alarm-communicators/cellular/gt/",
    });
    const flexiLanguage = await searchPaths("FLEXi", { lang: "en" });
    summary.flexi = {
      manual: flexiManual.length,
      language: flexiLanguage.length,
    };
    assertCondition(
      flexiManual.length === 0,
      "Expected no manual-scope result for 'FLEXi' in GT manual",
      { paths: flexiManual.slice(0, 10) },
      failures,
    );
    assertCondition(
      flexiLanguage.length > 0,
      "Expected language-scope result for 'FLEXi'",
      { paths: flexiLanguage.slice(0, 10) },
      failures,
    );
    assertCondition(
      flexiLanguage.every((p) => p.startsWith("/en/")),
      "Expected language-scope 'FLEXi' results to stay in /en/",
      { paths: flexiLanguage.slice(0, 10) },
      failures,
    );
    assertCondition(
      flexiLanguage.some((p) => p.startsWith("/en/control-panels/sp3/")),
      "Expected 'FLEXi' language search to include /en/control-panels/sp3/",
      { paths: flexiLanguage.slice(0, 20) },
      failures,
    );

    const g16HomeManual = await searchPaths("g16", {
      lang: "en",
      manual: "/en/",
    });
    const g16Sp3Manual = await searchPaths("g16", {
      lang: "en",
      manual: "/en/control-panels/sp3/",
    });
    const g16Sp3Subcategory = await searchPaths("g16", {
      lang: "en",
      subcategory: "/en/control-panels/",
    });
    const g16Language = await searchPaths("g16", { lang: "en" });
    summary.g16 = {
      homeManual: g16HomeManual.length,
      sp3Manual: g16Sp3Manual.length,
      sp3Subcategory: g16Sp3Subcategory.length,
      language: g16Language.length,
    };
    assertCondition(
      g16HomeManual.length === 0,
      "Expected no manual-scope result for 'g16' on /en/ manual scope",
      { paths: g16HomeManual.slice(0, 10) },
      failures,
    );
    assertCondition(
      g16Sp3Manual.length === 0,
      "Expected no manual-scope result for 'g16' in SP3 manual",
      { paths: g16Sp3Manual.slice(0, 10) },
      failures,
    );
    assertCondition(
      g16Sp3Subcategory.length === 0,
      "Expected no control-panels subcategory result for 'g16'",
      { paths: g16Sp3Subcategory.slice(0, 10) },
      failures,
    );
    assertCondition(
      g16Language.length > 0,
      "Expected language-scope result for 'g16'",
      { paths: g16Language.slice(0, 10) },
      failures,
    );
    assertCondition(
      g16Language.some((p) => p.startsWith("/en/alarm-communicators/cellular/g16/")),
      "Expected 'g16' language search to include /en/alarm-communicators/cellular/g16/",
      { paths: g16Language.slice(0, 20) },
      failures,
    );

    const gtCellularMatches = await searchMatchCount("cellular", {
      lang: "en",
      manual: "/en/alarm-communicators/cellular/gt/",
    });
    const gtSchematicsMatches = await searchMatchCount("schematics", {
      lang: "en",
      manual: "/en/alarm-communicators/cellular/gt/",
    });
    summary.gt_match_count = {
      cellular: gtCellularMatches,
      schematics: gtSchematicsMatches,
    };
    assertCondition(
      gtCellularMatches > 1,
      "Expected 'cellular' to have multiple matches in GT document scope",
      { count: gtCellularMatches },
      failures,
    );
    assertCondition(
      gtSchematicsMatches > 1,
      "Expected 'schematics' to have multiple matches in GT document scope",
      { count: gtSchematicsMatches },
      failures,
    );

    summary.languageIsolation = {};
    for (const lang of ["lt", "es", "ru"]) {
      const paths = await searchPaths("FLEXi", { lang });
      summary.languageIsolation[lang] = paths.length;
      assertCondition(
        paths.length > 0,
        `Expected '${lang}' language results for 'FLEXi'`,
        { paths: paths.slice(0, 10) },
        failures,
      );
      assertCondition(
        paths.every((p) => p.startsWith(`/${lang}/`)),
        `Expected '${lang}' language results to stay within /${lang}/`,
        { paths: paths.slice(0, 10) },
        failures,
      );
    }

    const paraphraseManual = await searchPaths("control with messages", {
      lang: "en",
      manual: "/en/control-panels/sp3/",
    });
    const expandedLanguage = await searchPaths("sms control", { lang: "en" });
    const expandedSpanish = await searchPaths("control por sms", { lang: "es" });
    summary.synonymsSeed = {
      paraphraseManual: paraphraseManual.length,
      expandedLanguage: expandedLanguage.length,
      expandedSpanish: expandedSpanish.length,
    };
    assertCondition(
      paraphraseManual.every((p) => p.startsWith("/en/control-panels/sp3/")),
      "Expected paraphrase manual results to stay in SP3 manual scope",
      { paths: paraphraseManual.slice(0, 10) },
      failures,
    );
    assertCondition(
      expandedLanguage.length > 0,
      "Expected synonym seed query 'sms control' to produce English language results",
      { paths: expandedLanguage.slice(0, 10) },
      failures,
    );
    assertCondition(
      expandedLanguage.some((p) => p.startsWith("/en/control-panels/cg17/")),
      "Expected 'sms control' language results to include CG17 manual",
      { paths: expandedLanguage.slice(0, 20) },
      failures,
    );
    assertCondition(
      expandedLanguage.every((p) => p.startsWith("/en/")),
      "Expected English synonym seed results to stay within /en/",
      { paths: expandedLanguage.slice(0, 10) },
      failures,
    );
    assertCondition(
      expandedSpanish.length > 0,
      "Expected Spanish synonym seed query 'control por sms' to produce results",
      { paths: expandedSpanish.slice(0, 10) },
      failures,
    );
    assertCondition(
      expandedSpanish.every((p) => p.startsWith("/es/")),
      "Expected Spanish synonym seed results to stay within /es/",
      { paths: expandedSpanish.slice(0, 10) },
      failures,
    );

    if (typeof pagefind.destroy === "function") {
      await pagefind.destroy();
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length) {
    console.error("Pagefind smoke checks failed:");
    failures.forEach((failure, index) => {
      console.error(`${index + 1}. ${failure.message}`);
      if (failure.details) {
        console.error(`   details: ${JSON.stringify(failure.details)}`);
      }
    });
    return 1;
  }

  console.log("Pagefind smoke checks passed.");
  console.log(`Summary: ${JSON.stringify(summary)}`);
  return 0;
}

run()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    console.error(`Pagefind smoke checks crashed: ${error.stack || error.message}`);
    process.exitCode = 1;
  });
