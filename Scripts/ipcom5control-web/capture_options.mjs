import { chromium } from "playwright";
import path from "path";
import { ensureDir, resolveArtifacts, writeJson } from "./lib/utils.mjs";

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => (arg.includes("=") ? arg.split("=") : [arg, true]))
);

const baseUrl = process.env.IPCOM_URL;
const username = process.env.IPCOM_USERNAME;
const password = process.env.IPCOM_PASSWORD;

if (!baseUrl || !username || !password) {
  console.error(
    "Missing IPCOM_URL, IPCOM_USERNAME, or IPCOM_PASSWORD environment variables."
  );
  process.exit(1);
}

const headless = !args.has("--headed");
const slowMo = Number(args.get("--slowmo") || 0);
const viewport = { width: 1440, height: 900 };

const tabLabels = [
  "Status",
  "Logs",
  "General",
  "Internal events",
  "Receivers",
  "Outputs",
  "Users",
  "Incoming events",
  "Objects",
];

const outputDir = resolveArtifacts("options");
await ensureDir(outputDir);

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputPath = path.join(outputDir, `options-${timestamp}.json`);
const latestPath = path.join(outputDir, "options-latest.json");

const browser = await chromium.launch({ headless, slowMo: slowMo || undefined });
const context = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport,
});
const page = await context.newPage();

await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
await attemptLogin(page, username, password);

if (await hasLoginForm(page)) {
  await browser.close();
  throw new Error("Login failed. Check IPCOM_USERNAME/IPCOM_PASSWORD.");
}

const capture = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  tabs: [],
};

for (const label of tabLabels) {
  const opened = await openTab(page, label);
  const tabSnapshot = {
    label,
    title: await safeTitle(page),
    url: page.url(),
    opened,
    selects: [],
    datalists: [],
    comboboxes: [],
  };

  if (!opened) {
    tabSnapshot.error = "Tab not found";
    capture.tabs.push(tabSnapshot);
    continue;
  }

  tabSnapshot.selects = await collectSelects(page);
  tabSnapshot.datalists = await collectDatalists(page);
  tabSnapshot.comboboxes = await collectComboboxes(page);

  capture.tabs.push(tabSnapshot);
}

await writeJson(outputPath, capture);
await writeJson(latestPath, capture);

console.log(`Options captured: ${outputPath}`);

await browser.close();

async function attemptLogin(pageRef, user, pass) {
  const passwordInput = pageRef.locator('input[type="password"]');
  if ((await passwordInput.count()) === 0) {
    return false;
  }

  await passwordInput.first().waitFor({ state: "visible", timeout: 10000 });

  const labelUser = pageRef.getByLabel(/user|login|email/i).first();
  const placeholderUser = pageRef.getByPlaceholder(/user|login|email/i).first();
  const textUser = pageRef.locator('input[type="text"], input[type="email"]').first();

  if ((await labelUser.count()) > 0) {
    await labelUser.fill(user);
  } else if ((await placeholderUser.count()) > 0) {
    await placeholderUser.fill(user);
  } else if ((await textUser.count()) > 0) {
    await textUser.fill(user);
  }

  await passwordInput.first().fill(pass);

  const submit = pageRef.locator(
    'button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Prisijungti")'
  );

  if ((await submit.count()) > 0) {
    await submit.first().click();
  } else {
    await pageRef.keyboard.press("Enter");
  }

  await Promise.race([
    pageRef.waitForURL((url) => url.pathname.startsWith("/main"), { timeout: 15000 }),
    pageRef.locator("text=Logout").first().waitFor({ timeout: 15000 }),
  ]).catch(() => {});

  await pageRef.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  return true;
}

async function hasLoginForm(pageRef) {
  const passwordInput = pageRef.locator('input[type="password"]');
  return (await passwordInput.count()) > 0;
}

async function safeTitle(pageRef) {
  try {
    return (await pageRef.title()) || "Untitled";
  } catch {
    return "Untitled";
  }
}

async function openTab(pageRef, label) {
  const tabLocator = pageRef.locator("button, a").filter({ hasText: label }).first();
  if ((await tabLocator.count()) === 0) {
    return false;
  }
  await tabLocator.click();
  await pageRef.waitForTimeout(500);
  await pageRef.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  return true;
}

async function collectSelects(pageRef) {
  return pageRef.evaluate(() => {
    const labelFor = (el) => {
      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel.trim();
      const labelledBy = el.getAttribute("aria-labelledby");
      if (labelledBy) {
        const text = labelledBy
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(" ");
        if (text) return text;
      }
      if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label?.textContent) return label.textContent.trim();
      }
      const parentLabel = el.closest("label");
      if (parentLabel?.textContent) return parentLabel.textContent.trim();
      return el.getAttribute("name") || el.id || "select";
    };

    return Array.from(document.querySelectorAll("select")).map((select, index) => ({
      label: labelFor(select) || `select-${index + 1}`,
      name: select.getAttribute("name") || null,
      id: select.getAttribute("id") || null,
      disabled: select.disabled || false,
      options: Array.from(select.querySelectorAll("option")).map((option) => ({
        value: option.value ?? "",
        label: option.textContent?.trim() ?? "",
        disabled: option.disabled || false,
        selected: option.selected || false,
      })),
    }));
  });
}

async function collectDatalists(pageRef) {
  return pageRef.evaluate(() => {
    const labelFor = (el) => {
      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel.trim();
      if (el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label?.textContent) return label.textContent.trim();
      }
      return el.getAttribute("name") || el.id || "input";
    };

    const inputs = Array.from(document.querySelectorAll("input[list]"));
    return inputs
      .map((input) => {
        const listId = input.getAttribute("list");
        if (!listId) return null;
        const datalist = document.getElementById(listId);
        if (!datalist) return null;
        return {
          label: labelFor(input),
          name: input.getAttribute("name") || null,
          id: input.getAttribute("id") || null,
          datalistId: listId,
          options: Array.from(datalist.querySelectorAll("option")).map((option) => ({
            value: option.value ?? "",
            label: option.label || option.textContent?.trim() || option.value || "",
          })),
        };
      })
      .filter(Boolean);
  });
}

async function collectComboboxes(pageRef) {
  const candidates = pageRef.locator(
    '[role="combobox"], input[aria-haspopup="listbox"], button[aria-haspopup="listbox"]'
  );
  const count = await candidates.count();
  const results = [];

  for (let i = 0; i < count; i += 1) {
    const candidate = candidates.nth(i);
    const meta = await candidate.evaluate((el) => {
      const labelFor = (node) => {
        const ariaLabel = node.getAttribute("aria-label");
        if (ariaLabel) return ariaLabel.trim();
        const labelledBy = node.getAttribute("aria-labelledby");
        if (labelledBy) {
          const text = labelledBy
            .split(" ")
            .map((id) => document.getElementById(id)?.textContent?.trim())
            .filter(Boolean)
            .join(" ");
          if (text) return text;
        }
        if (node.id) {
          const label = document.querySelector(`label[for="${node.id}"]`);
          if (label?.textContent) return label.textContent.trim();
        }
        const parentLabel = node.closest("label");
        if (parentLabel?.textContent) return parentLabel.textContent.trim();
        return node.getAttribute("name") || node.id || node.textContent?.trim() || "combobox";
      };

      return {
        label: labelFor(el),
        id: el.getAttribute("id") || null,
        name: el.getAttribute("name") || null,
        ariaControls: el.getAttribute("aria-controls") || null,
        ariaOwns: el.getAttribute("aria-owns") || null,
      };
    });

    await candidate.scrollIntoViewIfNeeded().catch(() => {});
    await candidate.click({ timeout: 2000 }).catch(() => {});
    await pageRef.waitForTimeout(250);

    let options = [];
    if (meta.ariaControls) {
      options = await pageRef.evaluate((listId) => {
        const listbox = document.getElementById(listId);
        if (!listbox) return [];
        const nodes = listbox.querySelectorAll('[role="option"], option, li');
        return Array.from(nodes).map((node) => ({
          value: node.getAttribute("value") || node.textContent?.trim() || "",
          label: node.textContent?.trim() || "",
          disabled:
            node.getAttribute("aria-disabled") === "true" ||
            node.classList.contains("disabled"),
        }));
      }, meta.ariaControls);
    }

    if (options.length === 0) {
      options = await pageRef.evaluate(() => {
        const listboxes = Array.from(document.querySelectorAll('[role="listbox"]')).filter(
          (node) => node.offsetParent !== null || node.getClientRects().length > 0
        );
        if (listboxes.length === 0) return [];
        const listbox = listboxes
          .map((node) => ({
            node,
            count: node.querySelectorAll('[role="option"], option, li').length,
          }))
          .sort((a, b) => b.count - a.count)[0]?.node;
        if (!listbox) return [];
        return Array.from(listbox.querySelectorAll('[role="option"], option, li')).map((node) => ({
          value: node.getAttribute("value") || node.textContent?.trim() || "",
          label: node.textContent?.trim() || "",
          disabled:
            node.getAttribute("aria-disabled") === "true" ||
            node.classList.contains("disabled"),
        }));
      });
    }

    await pageRef.keyboard.press("Escape").catch(() => {});

    results.push({
      ...meta,
      options,
    });
  }

  return results;
}
