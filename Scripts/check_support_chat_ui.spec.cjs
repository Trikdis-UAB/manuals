const { test, expect, chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.SUPPORT_CHAT_BASE_URL || "http://docs.trikdis.com:8013").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.SUPPORT_CHAT_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/support-chat");
const HOST_RULE = "MAP docs.trikdis.com 127.0.0.1";
const WIDGET_URL_PREFIX = "https://cdn.respond.io/webchat/widget/widget.js";
const CHATWOOT_SDK_URL = "https://chat.trikdis.com/packs/js/sdk.js";
const LAUNCHER = "#trikdocs-chat-launcher";

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

// Stands in for respond.io's widget.js: records API calls and draws a fake
// launcher, so the checks never reach respond.io. Like the real widget, it
// drops the first "chat:open" because its iframe is not ready yet.
function widgetStubScript() {
  return `
    (function () {
      var calls = [];
      var listeners = {};
      var ready = false;
      var widget = document.createElement("div");
      widget.id = "respondio-stub-widget";
      widget.setAttribute("data-open", "false");
      document.body.appendChild(widget);
      window.$respond = {
        do: function (command) {
          calls.push(command);
          if (command === "chat:open") {
            if (!ready) {
              ready = true;
              return;
            }
            widget.setAttribute("data-open", "true");
            (listeners["chat:opened"] || []).forEach(function (callback) { callback(); });
          }
        },
        on: function (name, callback) {
          (listeners[name] = listeners[name] || []).push(callback);
        },
        is: function () { return false; }
      };
      window.__RESPONDIO_STUB__ = { calls: calls };
    })();
  `;
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

  await page.route(`${WIDGET_URL_PREFIX}*`, async (route) => {
    requests.push(route.request().url());
    await route.fulfill({
      body: widgetStubScript(),
      contentType: "application/javascript",
      status: 200
    });
  });
  // Anything else on respond.io's domains would mean the page loaded the real
  // widget without a click. Fail loudly instead of reaching the network.
  await page.route(/https:\/\/[^/]*respond\.io\/(?!webchat\/widget\/widget\.js)/, async (route) => {
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
    stub: window.__RESPONDIO_STUB__ || null,
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
      expect(state.chat.provider).toBe("chatwoot");
      expect(requests).toEqual([]);

      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      expect(requests).toEqual([]);

      await page.click(LAUNCHER);
      await expect
        .poll(async () => page.evaluate(() => {
          const bubble = document.getElementById("chatwoot-stub-bubble");
          return bubble ? bubble.getAttribute("data-open") : null;
        }))
        .toBe("true");
      state = await chatState(page);
      expect(state.chatwoot.calls).toEqual(["run:https://chat.trikdis.com:token", "setLocale:en", "toggle:open"]);
      expect(requests).toEqual([CHATWOOT_SDK_URL]);
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

  test("?chat_preview=respondio still loads respond.io only on click", async () => {
    ensureArtifactsDir();

    await withPage(async ({ page, requests }) => {
      let state;
      await page.goto(`${BASE_URL}/en/?chat_preview=respondio`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.waitForFunction(() => !window.location.search.includes("chat_preview"));

      state = await chatState(page);
      expect(state.chat.previewEnabled).toBeTruthy();
      expect(state.chat.reason).toBe("launcher");
      // The launcher alone must not fetch anything from respond.io.
      expect(requests).toEqual([]);
      expect(await page.getAttribute(LAUNCHER, "aria-label")).toBe("Chat with TRIKDIS Support");

      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      expect(requests).toEqual([]);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "launcher.png"), fullPage: false });

      await page.click(LAUNCHER);
      await page.waitForFunction(() => !!window.__RESPONDIO_STUB__);
      // The first open is dropped, so the loader must retry, then stop once opened.
      await expect
        .poll(async () => page.evaluate(() => document.getElementById("respondio-stub-widget").getAttribute("data-open")))
        .toBe("true");
      await page.waitForTimeout(800);
      expect(await page.evaluate(() => window.__RESPONDIO_STUB__.calls.join(","))).toBe("chat:open,chat:open");

      state = await chatState(page);
      expect(requests).toHaveLength(1);
      expect(requests[0]).toContain("cId=");
      expect(state.launcher).toBeFalsy();
      expect(await page.evaluate(() => localStorage.getItem("trikdocs-chat-engaged"))).toBe("1");

      await page.screenshot({ path: path.join(ARTIFACT_DIR, "opened.png"), fullPage: false });

      // A later full page load restores the widget (closed) without our launcher.
      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/g16/`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__RESPONDIO_STUB__);

      state = await chatState(page);
      expect(state.chat.restored).toBeTruthy();
      expect(state.chat.openRequested).toBeFalsy();
      expect(state.launcher).toBeFalsy();
      expect(state.stub.calls).toEqual([]);
      expect(requests).toHaveLength(2);
      expect(requests.filter((url) => url.startsWith("UNEXPECTED"))).toEqual([]);
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
