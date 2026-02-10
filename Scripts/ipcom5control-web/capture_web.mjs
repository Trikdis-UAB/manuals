import { chromium } from "playwright";
import path from "path";
import { captureAccessibilityTree } from "./lib/accessibility.mjs";
import {
  ensureDir,
  fileExists,
  readJson,
  resolveArtifacts,
  slugify,
  writeJson,
} from "./lib/utils.mjs";

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
const maxPages = Number(args.get("--max-pages") || 40);
const slowMo = Number(args.get("--slowmo") || 0);
const viewport = { width: 1440, height: 900 };

const workspaceDir = resolveArtifacts();
const screensDir = resolveArtifacts("screens");

await ensureDir(workspaceDir);
await ensureDir(screensDir);

const browser = await chromium.launch({ headless, slowMo: slowMo || undefined });
const context = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport,
});
const page = await context.newPage();

await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

const loginScreen = {
  id: "login",
  title: "Login",
  url: page.url(),
  navPath: ["Login"],
  type: "login",
  source: "seed",
};

const hasLogin = await hasLoginForm(page);
if (hasLogin) {
  await captureScreen(page, loginScreen, viewport, { skipNavigation: true });
}

await attemptLogin(page, username, password);

if (await hasLoginForm(page)) {
  throw new Error("Login failed. Check IPCOM_USERNAME/IPCOM_PASSWORD.");
}

const currentScreen = {
  id: "status",
  title: "Status tab",
  url: absoluteUrl(baseUrl, "/main/stats"),
  navPath: ["Status"],
  type: "route",
  source: "seed",
};

const discoveredScreens = await discoverScreens(page, baseUrl);
const seedScreens = await loadSeedScreens(baseUrl);
const screens = uniqueScreens([
  loginScreen,
  currentScreen,
  ...discoveredScreens,
  ...seedScreens,
])
  .slice(0, maxPages);

const screenMap = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  screens,
};

for (const screen of screens) {
  if (hasLogin && screen.id === loginScreen.id) {
    continue;
  }
  await captureScreen(page, screen, viewport);
}

await writeJson(resolveArtifacts("screen-map.json"), screenMap);
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

  const submit = pageRef.locator('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Prisijungti")');

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

function uniqueScreens(list) {
  const seen = new Map();
  for (const screen of list) {
    const key = screen.id || screen.url;
    if (!seen.has(key)) {
      seen.set(key, screen);
    }
  }
  return Array.from(seen.values()).map((screen) => ({
    ...screen,
    id: screen.id || slugify(screen.title || screen.url || "screen"),
  }));
}

async function loadSeedScreens(origin) {
  const seedPath = path.resolve("screen_seeds.json");
  if (!(await fileExists(seedPath))) {
    return [];
  }
  const seedData = await readJson(seedPath);
  const seeds = Array.isArray(seedData?.screens) ? seedData.screens : [];
  return seeds.map((seed) => ({
    id: seed.id || slugify(seed.title || seed.url || "seed"),
    title: seed.title || seed.url,
    url: absoluteUrl(origin, seed.url),
    navPath: seed.navPath || [],
    type: seed.type || "route",
    source: "seed",
  }));
}

function absoluteUrl(origin, href) {
  try {
    return new URL(href, origin).toString();
  } catch {
    return href;
  }
}

async function discoverScreens(pageRef, origin) {
  const links = await pageRef.evaluate(() => {
    const selectors = [
      'nav a',
      '[role="navigation"] a',
      '.sidebar a',
      '.menu a',
      '[data-nav] a',
    ];
    const linkElements = selectors
      .flatMap((selector) => Array.from(document.querySelectorAll(selector)));

    return linkElements.map((link) => ({
      href: link.getAttribute("href") || "",
      text: (link.textContent || "").trim(),
      ariaLabel: link.getAttribute("aria-label") || "",
    }));
  });

  return links
    .map((link) => ({
      title: link.text || link.ariaLabel || link.href || "Screen",
      url: absoluteUrl(origin, link.href),
      navPath: link.text ? [link.text] : [],
      type: "route",
      source: "nav",
    }))
    .filter((link) => link.url.startsWith(origin));
}

async function captureScreen(pageRef, screen, viewportInfo, options = {}) {
  const screenDir = resolveArtifacts("screens", screen.id);
  await ensureDir(screenDir);

  if (!options.skipNavigation) {
    await pageRef.goto(screen.url, { waitUntil: "domcontentloaded" });
  }
  await pageRef.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

  const accessibilityTree = await captureAccessibilityTree(pageRef);

  const controls = await pageRef.evaluate(() => {
    const toLabel = (element) => {
      const ariaLabel = element.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel.trim();

      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) {
        const labelElement = document.getElementById(labelledBy);
        if (labelElement?.textContent) return labelElement.textContent.trim();
      }

      if (element.id) {
        const label = document.querySelector(`label[for="${element.id}"]`);
        if (label?.textContent) return label.textContent.trim();
      }

      const parentLabel = element.closest("label");
      if (parentLabel?.textContent) return parentLabel.textContent.trim();

      return (
        element.getAttribute("placeholder") ||
        element.getAttribute("title") ||
        element.getAttribute("name") ||
        element.textContent ||
        ""
      ).trim();
    };

    const isInteractive = (element) => {
      const tag = element.tagName.toLowerCase();
      if (["input", "select", "textarea", "button"].includes(tag)) return true;
      if (tag === "a" && element.getAttribute("href")) return true;
      const role = element.getAttribute("role");
      return [
        "button",
        "checkbox",
        "combobox",
        "link",
        "listbox",
        "menuitem",
        "radio",
        "switch",
        "tab",
        "textbox",
      ].includes(role || "");
    };

    const elements = Array.from(
      document.querySelectorAll(
        'input, select, textarea, button, a[href], [role="button"], [role="checkbox"], [role="combobox"], [role="link"], [role="listbox"], [role="menuitem"], [role="radio"], [role="switch"], [role="tab"], [role="textbox"]'
      )
    );

    return elements
      .filter(isInteractive)
      .map((element) => ({
        label: toLabel(element),
        role: element.getAttribute("role") || element.tagName.toLowerCase(),
        tag: element.tagName.toLowerCase(),
        type: element.getAttribute("type") || "",
        placeholder: element.getAttribute("placeholder") || "",
        disabled: element.disabled || element.getAttribute("aria-disabled") === "true",
        required: element.required || element.getAttribute("aria-required") === "true",
        readonly: element.readOnly || element.getAttribute("aria-readonly") === "true",
      }));
  });

  await writeJson(path.join(screenDir, "accessibility-tree.json"), accessibilityTree);
  await writeJson(path.join(screenDir, "controls.json"), {
    screenId: screen.id,
    capturedAt: new Date().toISOString(),
    controls,
  });
  await writeJson(path.join(screenDir, "meta.json"), {
    screenId: screen.id,
    title: screen.title,
    url: pageRef.url(),
    navPath: screen.navPath || [],
    type: screen.type,
    source: screen.source,
    capturedAt: new Date().toISOString(),
    viewport: viewportInfo,
  });

  await suppressTransientOverlays(pageRef);

  await pageRef.screenshot({
    path: path.join(screenDir, "screenshot.png"),
    fullPage: true,
  });
}

async function suppressTransientOverlays(pageRef) {
  // Hide transient toast/notification overlays so cover screenshots capture only screen content.
  await pageRef
    .addStyleTag({
      content: `
      [role="alert"],
      [aria-live="assertive"],
      .toast,
      .toast-container,
      .Toastify__toast,
      .Toastify__toast-container,
      .notification,
      .snackbar {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `,
    })
    .catch(() => {});

  await pageRef
    .evaluate(() => {
      const markers = [
        "settings loaded",
        "list refreshed",
        "refreshed",
        "saved",
        "updated",
      ];
      const elements = Array.from(document.querySelectorAll("div,span,p,strong"));
      for (const element of elements) {
        const text = (element.textContent || "").toLowerCase().trim();
        if (!text) continue;
        if (markers.some((marker) => text.includes(marker))) {
          const rect = element.getBoundingClientRect();
          if (rect.width > 80 && rect.height > 20) {
            element.style.display = "none";
          }
        }
      }
    })
    .catch(() => {});

  await pageRef.waitForTimeout(250);
}
