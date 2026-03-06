const { test, expect, devices } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.PAGEFIND_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const ARTIFACT_DIR = process.env.PAGEFIND_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/pagefind-playwright");

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function ensureModalOpen(page) {
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
    const meta = document.querySelector(".md-search-result__meta")?.textContent?.trim() || "";
    const fallbackTitle = document.querySelector(".md-search-result__fallback-title")?.textContent?.trim() || "";
    const fallbackEmpty = document.querySelector(".md-search-result__fallback-empty")?.textContent?.trim() || "";
    const expandedHint = document.querySelector(".md-search-result__expanded-hint")?.textContent?.trim() || "";
    const origins = Array.from(document.querySelectorAll(".md-search-result__origin"))
      .map((node) => node.textContent?.trim() || "")
      .filter((value) => value.length > 0);
    const firstTeaserHtml = document.querySelector(".md-search-result__teaser")?.innerHTML || "";
    const highlightCount = document.querySelectorAll(".md-search-result__teaser mark.md-search__term").length;
    const links = Array.from(document.querySelectorAll(".md-search-result__list a.md-search-result__link"))
      .map((link) => link.getAttribute("href"))
      .filter((href) => typeof href === "string" && href.length > 0);
    return {
      meta,
      fallbackTitle,
      fallbackEmpty,
      expandedHint,
      origins,
      uniqueOriginCount: new Set(origins).size,
      firstTeaserHtml,
      highlightCount,
      links,
    };
  });
}

function stateSignature(state) {
  return `${state.meta}||${state.fallbackTitle}||${state.fallbackEmpty}||${state.expandedHint}||${state.origins.join("||")}||${state.links.join("||")}`;
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
  return (
    state.links.length > 0 ||
    state.fallbackEmpty.length > 0 ||
    state.fallbackTitle.length > 0 ||
    (!!state.meta && !isPlaceholder && !isInitializing)
  );
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

async function query(page, value) {
  await ensureModalOpen(page);
  const previousState = await readSearchState(page);
  const input = page.locator(".md-search input[name='query']");
  await input.fill("");
  await input.fill(value);
  return waitForStateChange(page, previousState);
}

function includesPath(links, prefix) {
  return links.some((href) => href.startsWith(prefix));
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
    expect(homeSmsCommands.origins.length).toBe(homeSmsCommands.links.length);
    expect(homeSmsCommands.uniqueOriginCount).toBeGreaterThan(1);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "home-sms-origin-cross-manual.png"), fullPage: false });

    const homeControlViaText = await query(page, "control via text messages");
    expect(homeControlViaText.links.length).toBeGreaterThan(0);
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
    expect(ipcom.origins.length).toBe(ipcom.links.length);
    expect(ipcom.origins[0]).toContain("Receivers");
    expect(ipcom.origins[0]).toContain("IPcom");
    expect(ipcom.fallbackTitle).toBe("");
    const expectedTopResult = new URL(ipcom.links[0], BASE_URL).pathname;
    await page.locator(".md-search input[name='query']").press("Enter");
    await page.waitForFunction((expected) => window.location.pathname === expected, expectedTopResult);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "ipcom-enter-navigation.png"), fullPage: false });

    await page.goto(`${BASE_URL}/en/control-panels/sp3/`, { waitUntil: "domcontentloaded" });
    const sp3G16 = await query(page, "g16");
    expect(sp3G16.meta).toContain("No matches in this page.");
    expect(sp3G16.fallbackTitle).toContain("Results from site in English:");
    expect(sp3G16.links.length).toBeGreaterThan(0);
    expect(sp3G16.links.every((href) => href.startsWith("/en/"))).toBeTruthy();
    expect(includesPath(sp3G16.links, "/en/alarm-communicators/cellular/g16/")).toBeTruthy();
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
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "synonyms-en-paraphrase.png"), fullPage: false });

    const exactOnly = await query(page, "sqlport");
    expect(exactOnly.links.length).toBeGreaterThan(0);
    expect(exactOnly.expandedHint).toBe("");
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "synonyms-en-exact-no-hint.png"), fullPage: false });
  });
});
