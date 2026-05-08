const { test, expect, devices } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.PAGEFIND_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const ARTIFACT_DIR = process.env.PAGEFIND_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/pagefind-playwright");

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function ensureModalOpen(page) {
  await page.evaluate(() => {
    const consent = document.querySelector("[data-md-component='consent']");
    if (consent) {
      consent.remove();
    }
    document.querySelectorAll(".md-consent__overlay").forEach((node) => node.remove());
  });
  const input = page.locator(".md-search input[name='query']");
  const toggle = page.locator("#__search");
  await expect(toggle).toHaveCount(1);
  if (!(await toggle.isChecked())) {
    await page.evaluate(() => {
      const toggleEl = document.getElementById("__search");
      if (toggleEl) {
        toggleEl.checked = true;
        toggleEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }
  await expect(toggle).toBeChecked();
  await expect(input).toBeVisible();
  await input.focus();
  await expect
    .poll(async () => page.evaluate(() => !document.querySelector(".md-search-result__list")?.hidden))
    .toBeTruthy();
}

async function readSearchState(page) {
  return page.evaluate(() => {
    const queryValue = document.querySelector(".md-search input[name='query']")?.value || "";
    const meta = document.querySelector(".md-search-result__meta")?.textContent?.trim() || "";
    const fallbackTitle = document.querySelector(".md-search-result__fallback-title")?.textContent?.trim() || "";
    const fallbackEmpty = document.querySelector(".md-search-result__fallback-empty")?.textContent?.trim() || "";
    const expandedHint = document.querySelector(".md-search-result__expanded-hint")?.textContent?.trim() || "";
    const firstTeaserHtml = document.querySelector(".md-search-result__teaser")?.innerHTML || "";
    const highlightCount = document.querySelectorAll(".md-search-result__teaser mark.md-search__term").length;
    const entries = Array.from(document.querySelectorAll(".md-search-result__list a.md-search-result__link"))
      .map((link) => ({
        href: link.getAttribute("href") || "",
        title: link.querySelector("h2")?.textContent?.trim() || "",
        manual: link.querySelector(".md-search-result__manual")?.textContent?.trim() || "",
        origin: link.querySelector(".md-search-result__origin")?.textContent?.trim() || "",
        teaser: link.querySelector(".md-search-result__teaser")?.textContent?.trim() || "",
      }))
      .filter((entry) => entry.href.length > 0);
    const links = entries.map((entry) => entry.href);
    const titles = entries.map((entry) => entry.title).filter((value) => value.length > 0);
    const manuals = entries.map((entry) => entry.manual).filter((value) => value.length > 0);
    const origins = entries.map((entry) => entry.origin).filter((value) => value.length > 0);
    return {
      meta,
      queryValue,
      fallbackTitle,
      fallbackEmpty,
      expandedHint,
      entries,
      titles,
      manuals,
      origins,
      uniqueOriginCount: new Set(origins).size,
      firstTeaserHtml,
      highlightCount,
      links,
    };
  });
}

function stateSignature(state) {
  return [
    state.queryValue,
    state.meta,
    state.fallbackTitle,
    state.fallbackEmpty,
    state.expandedHint,
    state.titles.join("||"),
    state.manuals.join("||"),
    state.origins.join("||"),
    state.links.join("||"),
  ].join("||");
}

function isSettledState(state) {
  const meta = (state.meta || "").toLowerCase();
  const isPlaceholder =
    meta === "type to start searching" ||
    meta === "rašykite, kad pradėtumėte paiešką" ||
    meta === "escriba para iniciar la búsqueda" ||
    meta === "начните вводить для поиска";
  const isInitializing =
    meta.includes("initializing") ||
    meta.includes("inicijuojama") ||
    meta.includes("inicializando") ||
    meta.includes("инициализация");
  if (state.links.length > 0) {
    return true;
  }
  if (state.fallbackEmpty.length > 0) {
    return true;
  }
  if (state.fallbackTitle.length > 0) {
    return false;
  }
  return !!state.meta && !isPlaceholder && !isInitializing;
}

async function waitForStateChange(page, previousState, timeoutMs = 5000) {
  const previousSignature = stateSignature(previousState);
  await expect
    .poll(
      async () => {
        const current = await readSearchState(page);
        return stateSignature(current) !== previousSignature && isSettledState(current);
      },
      { timeout: timeoutMs },
    )
    .toBeTruthy();
  return readSearchState(page);
}

async function query(page, value, timeoutMs = 5000) {
  await ensureModalOpen(page);
  const previousState = await readSearchState(page);
  const input = page.locator(".md-search input[name='query']");
  await input.fill("");
  await input.fill(value);
  await page.waitForTimeout(300);
  return waitForStateChange(page, previousState, timeoutMs);
}

function includesPath(links, prefix) {
  return links.some((href) => href.startsWith(prefix));
}

function resolveResultUrl(href) {
  return new URL(href, `${BASE_URL}/`);
}

function findEntryIndex(entries, predicate) {
  return entries.findIndex((entry) => {
    try {
      return predicate(entry, resolveResultUrl(entry.href));
    } catch (error) {
      return false;
    }
  });
}

async function expectHashTargetNearViewportTop(page, hash) {
  await expect
    .poll(
      async () =>
        page.evaluate((hashValue) => {
          const raw = String(hashValue || "");
          if (!raw) {
            return false;
          }
          let targetId = raw.startsWith("#") ? raw.slice(1) : raw;
          try {
            targetId = decodeURIComponent(targetId);
          } catch (error) {
            // Keep the original id if decoding fails.
          }
          const target = document.getElementById(targetId);
          if (!target) {
            return false;
          }
          const rect = target.getBoundingClientRect();
          const header = document.querySelector(".md-header");
          const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
          return rect.top >= headerBottom - 8 && rect.top <= headerBottom + 180;
        }, hash),
      { timeout: 2500 },
    )
    .toBeTruthy();
}

test.describe("Pagefind modal scoped search", () => {
  test("shows immediate language fallback with divider/title and keeps language isolation", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    const requestUrls = [];
    const requestFailures = [];
    const consoleErrors = [];
    page.on("request", (request) => {
      requestUrls.push(request.url());
    });
    page.on("requestfailed", (request) => {
      requestFailures.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure() ? request.failure().errorText : "unknown",
      });
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-search-open.png"), fullPage: false });

    const homeG16 = await query(page, "g16");
    expect(homeG16.meta).toContain("No matches in this page.");
    expect(homeG16.fallbackTitle).toContain("Results from site in English:");
    expect(homeG16.links.length).toBeGreaterThan(0);
    expect(homeG16.links.every((href) => href.startsWith("/en/"))).toBeTruthy();
    expect(includesPath(homeG16.links, "/en/alarm-communicators/cellular/g16/")).toBeTruthy();
    expect(homeG16.origins.length).toBe(homeG16.links.length);
    expect(homeG16.origins[0]).toContain("Communicators");
    expect(homeG16.origins[0]).toContain("G16");
    expect(homeG16.highlightCount).toBeGreaterThan(0);
    expect(homeG16.firstTeaserHtml.toLowerCase()).toContain("<mark");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-g16-language-results.png"), fullPage: false });

    const homeSmsCommands = await query(page, "sms command list");
    expect(homeSmsCommands.links.length).toBeGreaterThan(0);
    expect(homeSmsCommands.manuals.length).toBeGreaterThan(0);
    expect(homeSmsCommands.origins.length).toBe(homeSmsCommands.links.length);
    expect(homeSmsCommands.uniqueOriginCount).toBeGreaterThan(1);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-sms-origin-cross-manual.png"), fullPage: false });

    const homeControlViaText = await query(page, "control via text messages");
    expect(homeControlViaText.links.length).toBeGreaterThan(0);
    expect(homeControlViaText.manuals.length).toBeGreaterThan(0);
    expect(homeControlViaText.origins.length).toBe(homeControlViaText.links.length);
    expect(homeControlViaText.uniqueOriginCount).toBeGreaterThan(1);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-control-via-text-origin-cross-manual.png"), fullPage: false });

    const homeNone = await query(page, "qzvwyx123456789");
    expect(homeNone.meta).toContain("No matches in this page.");
    expect(homeNone.fallbackTitle).toContain("Results from site in English:");
    expect(homeNone.fallbackEmpty).toContain("No matching documents in this language.");
    expect(homeNone.links.length).toBe(0);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-no-results-language-empty.png"), fullPage: false });

    await page.goto(`${BASE_URL}/en/receivers/ipcom/`, { waitUntil: "domcontentloaded" });
    const ipcom = await query(page, "sqlport");
    expect(ipcom.links.length).toBeGreaterThan(0);
    expect(ipcom.links.every((href) => href.startsWith("/en/receivers/ipcom/"))).toBeTruthy();
    expect(ipcom.manuals.length).toBeGreaterThan(0);
    expect(ipcom.origins.length).toBe(ipcom.links.length);
    expect(ipcom.origins[0]).toContain("Receivers");
    expect(ipcom.origins[0]).toContain("IPcom");
    expect(ipcom.fallbackTitle).toBe("");
    const expectedTopResult = resolveResultUrl(ipcom.links[0]);
    await page.locator(".md-search input[name='query']").press("Enter");
    await page.waitForFunction(
      ({ pathname, hash }) => window.location.pathname === pathname && window.location.hash === hash,
      { pathname: expectedTopResult.pathname, hash: expectedTopResult.hash },
    );
    await expectHashTargetNearViewportTop(page, expectedTopResult.hash);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "ipcom-enter-navigation.png"), fullPage: false });

    await page.goto(`${BASE_URL}/en/control-panels/sp3/`, { waitUntil: "domcontentloaded" });
    const sp3G16 = await query(page, "g16");
    expect(sp3G16.meta).toContain("No matches in this page.");
    expect(sp3G16.fallbackTitle).toContain("Results from site in English:");
    expect(sp3G16.links.length).toBeGreaterThan(0);
    expect(sp3G16.links.every((href) => href.startsWith("/en/"))).toBeTruthy();
    expect(includesPath(sp3G16.links, "/en/alarm-communicators/cellular/g16/")).toBeTruthy();
    expect(sp3G16.manuals.length).toBeGreaterThan(0);
    expect(sp3G16.origins.length).toBe(sp3G16.links.length);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "sp3-g16-language-results.png"), fullPage: false });

    await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/gt/`, { waitUntil: "domcontentloaded" });
    const gtPolling = await query(page, "polling");
    expect(gtPolling.meta).toContain("1 match in this page");
    expect(gtPolling.meta.toLowerCase()).not.toContain("matching document");
    expect(gtPolling.links.length).toBe(1);

    await page.goto(`${BASE_URL}/lt/alarm-communicators/cellular/gt/`, { waitUntil: "domcontentloaded" });
    const ltFlexi = await query(page, "FLEXi");
    expect(ltFlexi.links.length).toBeGreaterThan(0);
    expect(ltFlexi.links.every((href) => href.startsWith("/lt/"))).toBeTruthy();
    expect(ltFlexi.origins.length).toBe(ltFlexi.links.length);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "lt-language-isolation.png"), fullPage: false });

    expect(requestUrls.some((url) => url.includes("/pagefind/pagefind.js"))).toBeTruthy();
    expect(requestUrls.some((url) => url.includes("/search/search_index.json"))).toBeFalsy();
    const actionableFailures = requestFailures.filter((entry) => !entry.url.includes("/livereload/"));
    expect(actionableFailures).toEqual([]);
    expect(consoleErrors).toEqual([]);

    const searchDomSnapshot = await page.evaluate(() => {
      const root = document.querySelector(".md-search");
      return root ? root.outerHTML : "";
    });

    fs.writeFileSync(path.join(ARTIFACT_DIR, "requests.json"), `${JSON.stringify(requestUrls, null, 2)}\n`);
    fs.writeFileSync(path.join(ARTIFACT_DIR, "request-failures.json"), `${JSON.stringify(requestFailures, null, 2)}\n`);
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "request-failures-actionable.json"),
      `${JSON.stringify(actionableFailures, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(ARTIFACT_DIR, "console-errors.json"), `${JSON.stringify(consoleErrors, null, 2)}\n`);
    fs.writeFileSync(path.join(ARTIFACT_DIR, "search-dom.html"), searchDomSnapshot);
  });

  test("mobile emulation loads Pagefind and avoids search-index load error", async ({ browser, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    const context = await browser.newContext({
      ...devices["Galaxy S9+"],
    });
    const page = await context.newPage();

    const requestUrls = [];
    const pagefindStatuses = [];
    const consoleErrors = [];
    page.on("request", (request) => {
      requestUrls.push(request.url());
    });
    page.on("response", (response) => {
      if (response.url().includes("/pagefind/pagefind.js")) {
        pagefindStatuses.push(response.status());
      }
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(`${BASE_URL}/es/?search_synonyms=1`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);
    const mobileState = await query(page, "control con mensajes");

    expect(mobileState.meta.toLowerCase()).not.toContain("failed to load the search index");
    expect(mobileState.meta.toLowerCase()).not.toContain("no se pudo cargar el índice de búsqueda");
    expect(pagefindStatuses.some((status) => status >= 200 && status < 300)).toBeTruthy();
    expect(requestUrls.some((url) => url.includes("/search/search_index.json"))).toBeFalsy();
    expect(mobileState.links.every((href) => href.startsWith("/es/"))).toBeTruthy();
    expect(mobileState.manuals.length).toBeGreaterThan(0);
    expect(mobileState.origins.length).toBe(mobileState.links.length);
    expect(consoleErrors).toEqual([]);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "mobile-es-synonyms.png"), fullPage: false });
    await context.close();
  });

  test("synonym expansion shows hint only when expansion contributes", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    await page.goto(`${BASE_URL}/en/?search_synonyms=0`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);
    const stableOff = await query(page, "sms command list");
    expect(stableOff.links.length).toBeGreaterThan(0);

    await page.goto(`${BASE_URL}/en/?search_synonyms=1`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);
    const stableOn = await query(page, "sms command list");
    expect(stableOn.links.length).toBeGreaterThan(0);
    expect(stableOn.links[0]).toBe(stableOff.links[0]);
    expect(stableOn.manuals.length).toBeGreaterThan(0);
    expect(stableOn.origins.length).toBe(stableOn.links.length);
    expect(stableOn.uniqueOriginCount).toBeGreaterThan(1);
    expect(stableOn.expandedHint).toBe("");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "synonyms-en-stable-exact-ranking.png"), fullPage: false });

    await page.goto(`${BASE_URL}/en/receivers/ipcom/?search_synonyms=1`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);

    const paraphrase = await query(page, "control via text messages");
    expect(paraphrase.links.length).toBeGreaterThan(0);
    expect(paraphrase.links.every((href) => href.startsWith("/en/"))).toBeTruthy();
    expect(paraphrase.expandedHint).toContain("Expanded with synonyms:");
    expect(paraphrase.expandedHint).toMatch(/sms/i);
    expect(paraphrase.manuals.length).toBeGreaterThan(0);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "synonyms-en-paraphrase.png"), fullPage: false });

    const exactOnly = await query(page, "sqlport");
    expect(exactOnly.links.length).toBeGreaterThan(0);
    expect(exactOnly.expandedHint).toBe("");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "synonyms-en-exact-no-hint.png"), fullPage: false });
  });

  test("same-page mobile result navigation lands on the matched SP3 section", async ({ browser, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    const context = await browser.newContext({
      ...devices["Galaxy S9+"],
    });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/en/control-panels/sp3/`, { waitUntil: "domcontentloaded" });
    const state = await query(page, "firmware versions");
    const targetIndex = findEntryIndex(
      state.entries,
      (entry, url) => url.pathname === "/en/control-panels/sp3/" && !!url.hash,
    );
    expect(targetIndex).toBeGreaterThanOrEqual(0);

    const targetUrl = resolveResultUrl(state.entries[targetIndex].href);
    await page.locator(".md-search-result__link").nth(targetIndex).click();
    await page.waitForFunction(
      ({ pathname, hash }) => window.location.pathname === pathname && window.location.hash === hash,
      { pathname: targetUrl.pathname, hash: targetUrl.hash },
    );
    await expectHashTargetNearViewportTop(page, targetUrl.hash);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "mobile-sp3-same-page-anchor.png"), fullPage: false });

    await context.close();
  });

  test("cross-page deep links keep the hash target visible", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
    const state = await query(page, "sqlport");
    const targetIndex = findEntryIndex(
      state.entries,
      (entry, url) => url.pathname.startsWith("/en/receivers/ipcom/") && !!url.hash,
    );
    expect(targetIndex).toBeGreaterThanOrEqual(0);

    const targetUrl = resolveResultUrl(state.entries[targetIndex].href);
    await page.locator(".md-search-result__link").nth(targetIndex).click();
    await page.waitForFunction(
      ({ pathname, hash }) => window.location.pathname === pathname && window.location.hash === hash,
      { pathname: targetUrl.pathname, hash: targetUrl.hash },
    );
    await expectHashTargetNearViewportTop(page, targetUrl.hash);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "cross-page-anchor-navigation.png"), fullPage: false });
  });

  test("SP3 SKU aliases resolve to the single SP3 manual", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);

    for (const queryValue of ["TX-SP3_3E", "TX-SP3_200", "TX-SP3_44E", "TX-SP3_24E", "SP3_44E"]) {
      const state = await query(page, queryValue, 10000);
      expect(includesPath(state.links, "/en/control-panels/sp3/")).toBeTruthy();
      const sp3Entries = state.entries.filter((entry) => resolveResultUrl(entry.href).pathname === "/en/control-panels/sp3/");
      expect(sp3Entries.length).toBeGreaterThan(0);
      expect(state.entries.every((entry) => resolveResultUrl(entry.href).pathname === "/en/control-panels/sp3/")).toBeTruthy();
      expect(sp3Entries.some((entry) => entry.manual.includes("FLEXi") || entry.title.includes("FLEXi"))).toBeTruthy();
      expect(sp3Entries.some((entry) => entry.origin === "Control Panels > SP3")).toBeTruthy();
      expect(sp3Entries.every((entry) => !/TX-SP3_3E|TX-SP3_200|TX-SP3_24E|TX-SP3_44E/.test(entry.teaser))).toBeTruthy();
    }

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "sp3-sku-discoverability.png"), fullPage: false });
  });

  test("Ethernet quick setup queries return panel-specific E16 manuals", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
    await ensureModalOpen(page);

    const paradox = await query(page, "paradox e16");
    expect(includesPath(paradox.links, "/en/alarm-communicators/ethernet/quick-setup/e16/paradox/")).toBeTruthy();
    expect(
      paradox.entries.some(
        (entry) =>
          resolveResultUrl(entry.href).pathname === "/en/alarm-communicators/ethernet/quick-setup/e16/paradox/" &&
          /quick setup/i.test(entry.manual),
      ),
    ).toBeTruthy();

    const honeywell = await query(page, "honeywell e16");
    expect(includesPath(honeywell.links, "/en/alarm-communicators/ethernet/quick-setup/e16/honeywell-vista/")).toBeTruthy();
    expect(
      honeywell.entries.some(
        (entry) =>
          resolveResultUrl(entry.href).pathname === "/en/alarm-communicators/ethernet/quick-setup/e16/honeywell-vista/" &&
          /Honeywell Vista/i.test(entry.manual),
      ),
    ).toBeTruthy();

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "ethernet-quick-setup-discoverability.png"), fullPage: false });
  });

  test("result cards show readable section, manual, and origin labels", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
    const state = await query(page, "object id paradox e16");

    expect(state.entries.length).toBeGreaterThan(0);
    const firstQuickSetup = state.entries.find(
      (entry) =>
        resolveResultUrl(entry.href).pathname === "/en/alarm-communicators/ethernet/quick-setup/e16/paradox/" &&
        entry.manual.length > 0,
    );
    expect(firstQuickSetup).toBeTruthy();
    expect(firstQuickSetup.title.length).toBeGreaterThan(0);
    expect(firstQuickSetup.manual).toContain("quick setup");
    expect(firstQuickSetup.origin).toBe("Communicators > Ethernet > Quick Setup > E16");
    expect(firstQuickSetup.manual).not.toContain("%");
    expect(firstQuickSetup.origin).not.toContain("%");

    await page.screenshot({ path: path.join(ARTIFACT_DIR, "result-identity-labels.png"), fullPage: false });
  });
});
