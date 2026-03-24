const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.MANUAL_PDF_BASE_URL || "http://127.0.0.1:8012").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.MANUAL_PDF_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/manual-pdf-playwright");

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function expectPdfActionPlacement(page, item, viewport, expectations) {
  await page.setViewportSize(viewport);
  await page.goto(`${BASE_URL}${item.route}`, { waitUntil: "domcontentloaded" });

  const action = page.locator("[data-manual-pdf-download]");
  await expect(action).toBeVisible();
  await expect(page.locator("article > h1 + [data-manual-pdf-download]")).toHaveCount(1);

  const link = action.locator("a");
  await expect(link).toBeVisible();

  const metrics = await action.evaluate((element) => {
    const link = element.querySelector("a");
    const actionStyles = window.getComputedStyle(element);
    const linkStyles = link ? window.getComputedStyle(link) : null;
    const actionRect = element.getBoundingClientRect();
    const linkRect = link ? link.getBoundingClientRect() : null;
    return {
      actionJustifyContent: actionStyles.justifyContent,
      actionWidth: actionRect.width,
      linkWidth: linkRect?.width ?? 0,
      linkHeight: linkRect?.height ?? 0,
      linkDisplay: linkStyles?.display ?? "",
    };
  });

  expect(metrics.actionJustifyContent).toBe(expectations.justifyContent);
  expect(["flex", "inline-flex"]).toContain(metrics.linkDisplay);
  expect(metrics.linkWidth).toBeGreaterThanOrEqual(expectations.minWidth);
  expect(metrics.linkWidth).toBeLessThanOrEqual(expectations.maxWidth);
  expect(metrics.linkHeight).toBeGreaterThanOrEqual(expectations.minHeight);
  expect(metrics.linkHeight).toBeLessThanOrEqual(expectations.maxHeight);

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${item.file}-${expectations.artifactSuffix}.png`),
    fullPage: false,
  });
}

test.describe("Manual PDF downloads", () => {
  test("eligible manuals expose working PDF links while excluded pages do not", async ({
    browserName,
    page,
    request,
  }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");
    ensureArtifactsDir();

    const includedRoutes = [
      { file: "gt", route: "/en/alarm-communicators/cellular/gt/" },
      { file: "quick-setup-paradox", route: "/en/alarm-communicators/cellular/quick-setup/paradox/" },
    ];

    for (const item of includedRoutes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}${item.route}`, { waitUntil: "domcontentloaded" });
      const action = page.locator("[data-manual-pdf-download]");
      await expect(action).toBeVisible();
      await expect(page.locator("article > h1 + [data-manual-pdf-download]")).toHaveCount(1);
      const link = action.locator("a");
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", /\.pdf$/);
      await expect(link).toHaveAttribute("download", /^TRIKDIS .+\.pdf$/);
      const pdfUrl = await link.getAttribute("href");
      expect(pdfUrl).toBeTruthy();
      const response = await request.get(new URL(pdfUrl, page.url()).toString());
      expect(response.ok()).toBeTruthy();
      const pdfBytes = await response.body();
      expect(pdfBytes.subarray(0, 4).toString()).toBe("%PDF");
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `${item.file}.png`),
        fullPage: false,
      });
    }

    await expectPdfActionPlacement(
      page,
      includedRoutes[0],
      { width: 430, height: 932 },
      {
        artifactSuffix: "mobile-placement",
        justifyContent: "center",
        minWidth: 200,
        maxWidth: 240,
        minHeight: 40,
        maxHeight: 48,
      },
    );

    await expectPdfActionPlacement(
      page,
      includedRoutes[0],
      { width: 1440, height: 900 },
      {
        artifactSuffix: "desktop-placement",
        justifyContent: "flex-end",
        minWidth: 110,
        maxWidth: 220,
        minHeight: 38,
        maxHeight: 48,
      },
    );

    const excludedRoutes = [
      { file: "home", route: "/" },
      { file: "ipcom", route: "/en/receivers/ipcom/" },
    ];

    for (const item of excludedRoutes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}${item.route}`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-manual-pdf-download]")).toHaveCount(0);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `${item.file}.png`),
        fullPage: false,
      });
    }
  });
});
