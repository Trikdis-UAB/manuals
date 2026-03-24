const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.PAGEFIND_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.ETHERNET_QS_ARTIFACT_DIR ||
  path.join(process.cwd(), "artifacts/ui/ethernet-quick-setup-playwright");

async function getTopLevelLabels(listLocator) {
  return listLocator.evaluate((list) =>
    Array.from(list.children).map((item) => {
      const label = item.querySelector(":scope > label .md-ellipsis, :scope > a");
      return label ? label.textContent.trim() : "";
    })
  );
}

async function getNestedLabels(listLocator, groupText) {
  return listLocator.evaluate((list, targetText) => {
    const item = Array.from(list.children).find((entry) => {
      const label = entry.querySelector(":scope > label .md-ellipsis, :scope > a");
      return label && label.textContent.trim() === targetText;
    });
    if (!item) {
      return [];
    }
    return Array.from(item.querySelectorAll(":scope > nav > ul > li > a")).map((link) =>
      link.textContent.trim()
    );
  }, groupText);
}

async function getGroupFontWeight(listLocator, groupText) {
  return listLocator.evaluate((list, targetText) => {
    const item = Array.from(list.children).find((entry) => {
      const label = entry.querySelector(":scope > label .md-ellipsis, :scope > a");
      return label && label.textContent.trim() === targetText;
    });
    if (!item) {
      return null;
    }
    const label = item.querySelector(":scope > label .md-ellipsis");
    return label ? window.getComputedStyle(label).fontWeight : null;
  }, groupText);
}

async function getQuickSetupProductMetrics(page, selector) {
  return page.locator(selector).evaluate((element) => {
    const image = element.querySelector("img");
    const rect = image ? image.getBoundingClientRect() : { width: 0, height: 0 };
    return {
      width: rect.width,
      height: rect.height,
    };
  });
}

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

test.describe("Ethernet quick setup navigation", () => {
  test("technology and A-Z views expose E16 and E16T quick setup entries", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    const consoleErrors = [];
    const requestFailures = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("requestfailed", (request) => {
      requestFailures.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure() ? request.failure().errorText : "unknown",
      });
    });

    await page.goto(`${BASE_URL}/en/alarm-communicators/ethernet/quick-setup/e16/texecom/`, {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("article > [data-manual-pdf-download] + [data-quick-setup-product='e16']")).toHaveCount(1);
    await expect(page.locator("[data-quick-setup-product='e16'] img")).toBeVisible();
    const productMetrics = await getQuickSetupProductMetrics(page, "[data-quick-setup-product='e16']");
    expect(productMetrics.width).toBeGreaterThanOrEqual(240);
    expect(productMetrics.width).toBeLessThanOrEqual(320);

    const primaryNav = page.locator("nav.md-nav--primary").first();
    await expect(primaryNav).toContainText("Communicators");
    await expect(primaryNav).toContainText("Ethernet");
    await expect(primaryNav).toContainText("E16 quick setup");
    await expect(primaryNav).toContainText("E16");
    await expect(primaryNav).toContainText("E16T quick setup");
    await expect(primaryNav).toContainText("E16T");
    await expect(primaryNav).toContainText("Texecom");
    await expect(primaryNav).toContainText("Innerrange Inception");
    await expect(primaryNav).toContainText("Innerrange Integriti");
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "ethernet-tech-view.png"),
      fullPage: false,
    });

    await primaryNav.getByRole("tab", { name: "A–Z" }).click();
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const nav = document.querySelector("nav.md-nav--primary nav.md-nav[data-communicators-toggle='true']");
          return nav ? nav.dataset.commView : "";
        })
      )
      .toBe("az");

    const azList = primaryNav.locator("ul.md-comm-list--az").first();
    await expect(azList).toBeVisible();

    const topLevelLabels = await getTopLevelLabels(azList);
    expect(topLevelLabels).toContain("E16 quick setup");
    expect(topLevelLabels).toContain("E16T quick setup");
    expect(topLevelLabels).not.toContain("Quick setup");
    expect(topLevelLabels).not.toContain("Interlogix NX-4v2 / NX-6v2");
    expect(await getGroupFontWeight(azList, "E16 quick setup")).toBe("400");
    expect(topLevelLabels.indexOf("E16 quick setup")).toBeGreaterThan(topLevelLabels.indexOf("E16"));
    expect(topLevelLabels.indexOf("E16T quick setup")).toBeGreaterThan(topLevelLabels.indexOf("E16T"));
    expect(topLevelLabels.indexOf("E16 quick setup")).toBeLessThan(topLevelLabels.indexOf("E16T"));

    await page.evaluate(() => {
      const item = Array.from(document.querySelectorAll("li[data-comm-pinned-quick-setup='true']")).find(
        (node) => (node.textContent || "").includes("E16 quick setup")
      );
      const toggle = item ? item.querySelector("input.md-nav__toggle") : null;
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const nestedLabels = await getNestedLabels(azList, "E16 quick setup");
    expect(nestedLabels).toEqual([
      "DSC PowerSeries",
      "Paradox SP(+)/MG(+)",
      "Honeywell Vista",
      "Interlogix NX-4v2 / NX-6v2",
      "Interlogix NX-8v2",
      "Texecom",
      "Innerrange Inception",
      "Innerrange Integriti",
    ]);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "ethernet-az-view.png"),
      fullPage: false,
    });

    const actionableFailures = requestFailures.filter((entry) => !entry.url.includes("/livereload/"));
    expect(actionableFailures).toEqual([]);
    expect(consoleErrors).toEqual([]);

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "request-failures.json"),
      `${JSON.stringify(requestFailures, null, 2)}\n`
    );
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "console-errors.json"),
      `${JSON.stringify(consoleErrors, null, 2)}\n`
    );
  });
});
