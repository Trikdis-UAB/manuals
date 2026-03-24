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

    await page.goto(`${BASE_URL}/en/alarm-communicators/ethernet/quick-setup/e16t/`, {
      waitUntil: "domcontentloaded",
    });

    const primaryNav = page.locator("nav.md-nav--primary").first();
    await expect(primaryNav).toContainText("Communicators");
    await expect(primaryNav).toContainText("Ethernet");
    await expect(primaryNav).toContainText("E16 quick setup");
    await expect(primaryNav).toContainText("E16");
    await expect(primaryNav).toContainText("E16T quick setup");
    await expect(primaryNav).toContainText("E16T");
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
    expect(await getGroupFontWeight(azList, "E16 quick setup")).toBe("400");

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
      "Interlogix NX-4V2 / NX-6V2",
      "Interlogix NX-8V2",
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
