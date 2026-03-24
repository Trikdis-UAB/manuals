const { test, expect } = require("@playwright/test");

const BASE_URL = (process.env.PAGEFIND_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

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

async function getQuickSetupFamilyCaptions(page) {
  return page.evaluate(() =>
    Array.from(
      document.querySelectorAll("[data-quick-setup-product='gt-family'] figcaption")
    ).map((item) => item.textContent.trim())
  );
}

async function getQuickSetupFamilyWidths(page) {
  return page.evaluate(() =>
    Array.from(
      document.querySelectorAll("[data-quick-setup-product='gt-family'] .trik-quick-setup-product__item")
    ).map((item) => Math.round(item.getBoundingClientRect().width))
  );
}

test.describe("Quick setup navigation labels", () => {
  test("GT/GT+/GET quick setup labels stay clean in A-Z on an active quick setup page", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Scoped to Chromium runtime.");

    await page.goto(
      `${BASE_URL}/en/alarm-communicators/cellular/quick-setup/interlogix%20nx-4v2%20nx-6v2/GT+%20Interlogix%20NX-4V2%20NX-6V2%20ENG%202026%2001%2007/`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    await expect(page.locator("article > [data-manual-pdf-download] + [data-quick-setup-product='gt-family']")).toHaveCount(1);
    await expect(page.locator("[data-quick-setup-product='gt-family'] img")).toHaveCount(3);
    expect(await getQuickSetupFamilyCaptions(page)).toEqual(["GT", "GT+", "GET"]);
    expect(await getQuickSetupFamilyWidths(page)).toEqual([124, 124, 124]);

    const primaryNav = page.locator("nav.md-nav--primary").first();
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
    expect(topLevelLabels).toContain("GT/GT+/GET quick setup");
    expect(topLevelLabels).not.toContain("Quick setup");
    expect(topLevelLabels).not.toContain("Interlogix NX-4v2 / NX-6v2");
    expect(await getGroupFontWeight(azList, "GT/GT+/GET quick setup")).toBe("400");
    expect(topLevelLabels.indexOf("GT+")).toBeGreaterThan(topLevelLabels.indexOf("GT"));
    expect(topLevelLabels.indexOf("GT/GT+/GET quick setup")).toBeGreaterThan(
      topLevelLabels.indexOf("GT+")
    );
    expect(topLevelLabels.indexOf("GT/GT+/GET quick setup")).toBeLessThan(
      topLevelLabels.indexOf("T16")
    );

    await page.evaluate(() => {
      const item = Array.from(document.querySelectorAll("li[data-comm-pinned-quick-setup='true']")).find(
        (node) => {
          const label = node.querySelector(":scope > label .md-ellipsis, :scope > a");
          return label && label.textContent.trim() === "GT/GT+/GET quick setup";
        }
      );
      const toggle = item ? item.querySelector("input.md-nav__toggle") : null;
      if (toggle) {
        toggle.checked = true;
        toggle.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const nestedLabels = await getNestedLabels(azList, "GT/GT+/GET quick setup");
    expect(nestedLabels).toEqual([
      "Paradox SP(+)/MG(+)",
      "DSC PowerSeries Neo",
      "DSC PowerSeries",
      "Honeywell Vista",
      "Interlogix NX-4v2 / NX-6v2",
      "Interlogix NX-8v2",
      "Texecom",
      "Innerrange Inception",
      "Innerrange Integriti",
    ]);
  });
});
