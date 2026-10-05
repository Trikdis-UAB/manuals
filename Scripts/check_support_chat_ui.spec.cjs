const { test, expect, chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.SUPPORT_CHAT_BASE_URL || "http://docs.trikdis.com:8013").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.SUPPORT_CHAT_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/support-chat");
const HOST_RULE = "MAP docs.trikdis.com 127.0.0.1";
const CHATWOOT_SDK_URL = "https://chat.trikdis.com/packs/js/sdk.js";
const LAUNCHER = "#trikdocs-chat-launcher";

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

// Stands in for Chatwoot's sdk.js: records calls, draws a fake bubble and, like the
// real widget, announces "chatwoot:ready" a moment after run().
function chatwootStubScript() {
  return `
    (function () {
      var calls = [];
      window.__CHATWOOT_STUB__ = { calls: calls };
      window.chatwootSDK = {
        run: function (options) {
          calls.push("run:" + options.baseUrl + ":" + (options.websiteToken ? "token" : "no-token"));
          var bubble = document.createElement("div");
          bubble.id = "chatwoot-stub-bubble";
          bubble.setAttribute("data-open", "false");
          document.body.appendChild(bubble);
          window.$chatwoot = {
            toggle: function (state) {
              calls.push("toggle:" + state);
              bubble.setAttribute("data-open", state === "open" ? "true" : "false");
            },
            setLocale: function (locale) { calls.push("setLocale:" + locale); }
          };
          setTimeout(function () { window.dispatchEvent(new Event("chatwoot:ready")); }, 300);
        }
      };
    })();
  `;
}

async function withPage(run) {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    args: [`--host-resolver-rules=${HOST_RULE}`]
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];

  // respond.io lapsed on 2026-10-05: anything from it would be a leftover. Fail loudly.
  await page.route(/https:\/\/[^/]*respond\.io\//, async (route) => {
    requests.push(`UNEXPECTED ${route.request().url()}`);
    await route.abort();
  });
  await page.route(/https:\/\/chat\.trikdis\.com\//, async (route) => {
    const url = route.request().url();
    if (url === CHATWOOT_SDK_URL) {
      requests.push(url);
      await route.fulfill({ body: chatwootStubScript(), contentType: "application/javascript", status: 200 });
      return;
    }
    requests.push(`UNEXPECTED ${url}`);
    await route.abort();
  });

  try {
    await run({ browser, context, page, requests });
  } finally {
    await context.close();
    await browser.close();
  }
}

// The cookie-consent banner covers the chat button until the visitor answers it.
async function answerConsent(page) {
  const reject = page.locator(".md-consent button", { hasText: "Reject" });
  await reject.waitFor({ state: "visible", timeout: 5000 });
  await reject.click();
  await page.waitForLoadState("domcontentloaded");
}

async function chatState(page) {
  return page.evaluate(() => ({
    chat: window.__TRIKDOCS_CHAT__ || null,
    chatwoot: window.__CHATWOOT_STUB__ || null,
    launcher: !!document.getElementById("trikdocs-chat-launcher")
  }));
}

test.describe("Support chat rollout", () => {
  test("stays hidden until the preview gate is on, then loads Chatwoot only on click", async () => {
    ensureArtifactsDir();

    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CHAT__);

      let state = await chatState(page);
      expect(state.chat.hostMatched).toBeTruthy();
      expect(state.chat.permitted).toBeFalsy();
      expect(state.chat.reason).toBe("preview-gated");
      expect(state.launcher).toBeFalsy();
      expect(requests).toEqual([]);

      await page.goto(`${BASE_URL}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.waitForFunction(() => !window.location.search.includes("chat_preview"));
      state = await chatState(page);
      expect(requests).toEqual([]);

      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      expect(requests).toEqual([]);
      // Joy's face on the launcher, and her "Hi, I'm Joy" pop-up a moment later.
      expect(await page.evaluate(() => document.querySelector("#trikdocs-chat-launcher img").getAttribute("src")))
        .toMatch(/\/images\/joy-avatar\.svg$/);
      await page.waitForSelector("#trikdocs-chat-teaser", { state: "visible" });
      expect(await page.textContent("#trikdocs-chat-teaser")).toContain("AI assistant");
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "chatwoot-launcher.png"), fullPage: false });

      await page.click(LAUNCHER);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
      await expect
        .poll(async () => page.evaluate(() => {
          const bubble = document.getElementById("chatwoot-stub-bubble");
          return bubble ? bubble.getAttribute("data-open") : null;
        }))
        .toBe("true");
      state = await chatState(page);
      expect(state.chatwoot.calls).toEqual(["run:https://chat.trikdis.com:token", "setLocale:en", "toggle:open"]);
      expect(requests).toEqual([CHATWOOT_SDK_URL]);
      expect(await page.evaluate(() => window.chatwootSettings.showPopoutButton)).toBe(true);
      expect(state.launcher).toBeFalsy();
      expect(await page.evaluate(() => localStorage.getItem("trikdocs-chat-engaged"))).toBe("1");

      // A later full page load restores the widget (closed), in the page's language.
      await page.goto(`${BASE_URL}/lt/`, { waitUntil: "domcontentloaded" });
      await expect.poll(async () => ((await chatState(page)).chatwoot || { calls: [] }).calls.length).toBe(2);
      state = await chatState(page);
      expect(state.chat.restored).toBeTruthy();
      expect(state.chatwoot.calls).toEqual(["run:https://chat.trikdis.com:token", "setLocale:lt"]);
      expect(state.launcher).toBeFalsy();
      expect(requests.filter((url) => url.startsWith("UNEXPECTED"))).toEqual([]);
    });
  });

  test("the pop-up stays closed once dismissed, and speaks the page language", async () => {
    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/lt/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await answerConsent(page);
      await page.waitForSelector("#trikdocs-chat-teaser", { state: "visible" });
      expect(await page.textContent("#trikdocs-chat-teaser")).toContain("dirbtinio intelekto asistentė");
      await page.click("#trikdocs-chat-teaser .trikdocs-chat-teaser-close");
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
      expect((await chatState(page)).launcher).toBe(true);

      await page.goto(`${BASE_URL}/lt/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.waitForTimeout(2000);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
      expect(requests).toEqual([]);
    });
  });

  test("clears the preview gate, respects the host list, and hides the launcher offline", async () => {
    ensureArtifactsDir();

    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/lt/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });

      await page.evaluate(() => window.dispatchEvent(new Event("offline")));
      await expect.poll(async () => (await chatState(page)).launcher).toBe(false);

      await page.evaluate(() => window.dispatchEvent(new Event("online")));
      await expect.poll(async () => (await chatState(page)).launcher).toBe(true);

      await page.goto(`${BASE_URL}/lt/?chat_preview=0`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CHAT__);

      const state = await chatState(page);
      expect(state.chat.previewEnabled).toBeFalsy();
      expect(state.chat.permitted).toBeFalsy();
      expect(state.launcher).toBeFalsy();
      expect(requests).toEqual([]);
    });

    await withPage(async ({ page, requests }) => {
      const localUrl = BASE_URL.replace("docs.trikdis.com", "127.0.0.1");
      await page.goto(`${localUrl}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CHAT__);

      const state = await chatState(page);
      expect(state.chat.hostMatched).toBeFalsy();
      expect(state.chat.reason).toBe("host-mismatch");
      expect(state.launcher).toBeFalsy();
      expect(requests).toEqual([]);
    });
  });
});
