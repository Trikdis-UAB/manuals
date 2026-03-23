const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.MANUAL_PDF_BASE_URL || "http://127.0.0.1:8012").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.MANUAL_PDF_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/manual-pdf-playwright");

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
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
      await page.goto(`${BASE_URL}${item.route}`, { waitUntil: "domcontentloaded" });
      const action = page.locator("[data-manual-pdf-download]");
      await expect(action).toBeVisible();
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

    const excludedRoutes = [
      { file: "home", route: "/" },
      { file: "ipcom", route: "/en/receivers/ipcom/" },
    ];

    for (const item of excludedRoutes) {
      await page.goto(`${BASE_URL}${item.route}`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-manual-pdf-download]")).toHaveCount(0);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `${item.file}.png`),
        fullPage: false,
      });
    }
  });
});
