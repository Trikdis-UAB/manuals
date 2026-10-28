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
            setLocale: function (locale) { calls.push("setLocale:" + locale); },
            setConversationCustomAttributes: function (attrs) {
              calls.push("attrs:" + attrs.docs_page + ":" + attrs.docs_lang);
            }
          };
          setTimeout(function () { window.dispatchEvent(new Event("chatwoot:ready")); }, 300);
        }
      };
    })();
  `;
}

// The teaser's waits (2 min of reading, 15 s between returns, 5 s after an overlay) are shortened
// in tests; null keeps the real ones.
async function withPage(run, teaserTiming = { dwellMs: 0, returnGapMs: 300, quietMs: 300 }) {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    args: [`--host-resolver-rules=${HOST_RULE}`]
  });
  const context = await browser.newContext();
  if (teaserTiming) {
    await context.addInitScript((timing) => { window.__trikdocsTeaserTiming = timing; }, teaserTiming);
  }
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

// What would reach the cookieless analytics (they stay off on the test host).
async function recordCookieless(page) {
  await page.evaluate(() => {
    window.__cookielessSent = [];
    window.trikdocsAnalytics = window.trikdocsAnalytics || {};
    window.trikdocsAnalytics.cookieless = (name, props) => window.__cookielessSent.push([name, props]);
  });
  return () => page.evaluate(() => window.__cookielessSent.filter(([name]) => name.startsWith("joy_teaser")));
}

// A search the visitor settled on, as pagefind-modal-search.js announces it.
async function searchSettled(page, scope, term) {
  await page.evaluate(([s, t]) => {
    window.dispatchEvent(new CustomEvent("trikdocs:search-settled", { detail: { scope: s, term: t } }));
  }, [scope, term]);
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
      // Joy's face on the launcher; no invitation on the home page.
      expect(await page.evaluate(() => document.querySelector("#trikdocs-chat-launcher img").getAttribute("src")))
        .toMatch(/\/images\/joy-avatar\.svg$/);
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
      expect(state.chatwoot.calls).toEqual(["run:https://chat.trikdis.com:token", "setLocale:en", "attrs:/en/:en", "toggle:open"]);
      expect(requests).toEqual([CHATWOOT_SDK_URL]);
      expect(await page.evaluate(() => window.chatwootSettings.showPopoutButton)).toBe(true);
      expect(state.launcher).toBeFalsy();
      expect(await page.evaluate(() => localStorage.getItem("trikdocs-chat-engaged"))).toBe("1");

      // A later full page load restores the widget (closed), in the page's language.
      await page.goto(`${BASE_URL}/lt/`, { waitUntil: "domcontentloaded" });
      await expect.poll(async () => ((await chatState(page)).chatwoot || { calls: [] }).calls.length).toBe(3);
      state = await chatState(page);
      expect(state.chat.restored).toBeTruthy();
      expect(state.chatwoot.calls).toEqual(["run:https://chat.trikdis.com:token", "setLocale:lt", "attrs:/lt/:lt"]);
      expect(state.launcher).toBeFalsy();
      expect(requests.filter((url) => url.startsWith("UNEXPECTED"))).toEqual([]);
    });
  });

  // 2026-10-12: a chat's start goes to Google Analytics (joy_chat_started, with the chat's
  // number) only when the visitor accepted the analytics cookies, and only once per chat.
  test("counts a chat's start in analytics only with consent, and only once", async () => {
    for (const choice of ["Accept", "Reject"]) {
      await withPage(async ({ page }) => {
        await page.route(/googletagmanager\.com/, (route) =>
          route.fulfill({ body: "", contentType: "application/javascript", status: 200 }));
        await page.goto(`${BASE_URL}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
        const button = page.locator(".md-consent button", { hasText: choice });
        await button.waitFor({ state: "visible", timeout: 5000 });
        await button.click();
        await page.waitForLoadState("domcontentloaded");
        await page.waitForSelector(LAUNCHER, { state: "visible" });
        await page.click(LAUNCHER);
        await expect.poll(async () => ((await chatState(page)).chatwoot || { calls: [] }).calls.length).toBe(4);
        const [sent, cookieless] = await page.evaluate(() => {
          // The cookieless analytics stay off on localhost; record what would reach them.
          const cookielessSent = [];
          window.trikdocsAnalytics.cookieless = (name, props) => cookielessSent.push([name, props]);
          for (const id of [42, 42, 43]) {
            window.dispatchEvent(new CustomEvent("chatwoot:on-message", { detail: { conversation_id: id } }));
          }
          return [(window.dataLayer || [])
            .map((entry) => Array.from(entry))
            .filter((args) => args[0] === "event" && args[1] === "joy_chat_started")
            .map((args) => args[2]), cookielessSent];
        });
        // 2026-10-19: the cookieless analytics count each chat once too, with or without consent.
        expect(cookieless).toEqual([["joy_chat_started", { chat_id: "42", chat_lang: "en", via: "launcher" }],
                                    ["joy_chat_started", { chat_id: "43", chat_lang: "en", via: "launcher" }]]);
        if (choice === "Accept") {
          expect(sent).toEqual([{ chat_id: "42", chat_lang: "en" }, { chat_id: "43", chat_lang: "en" }]);
        } else {
          expect(sent).toEqual([]);
          expect(await page.evaluate(() => typeof window.dataLayer)).toBe("undefined");
        }
      });
    }
  });

  test("a search with no results invites once the search closes, in the page language; dismissed stays closed", async () => {
    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/lt/alarm-communicators/cellular/get/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      const sent = await recordCookieless(page);
      await page.evaluate(() => { document.getElementById("__search").checked = true; });
      await searchSettled(page, "none", "gnybtas x9");
      await page.waitForTimeout(1500);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();  // not while the search is open
      await page.evaluate(() => { document.getElementById("__search").checked = false; });
      await page.waitForSelector("#trikdocs-chat-teaser", { state: "visible" });
      expect(await page.textContent("#trikdocs-chat-teaser")).toContain("Klausimų apie GET? Klauskite Joy, mūsų DI asistentės.");
      await page.click("#trikdocs-chat-teaser .trikdocs-chat-teaser-close");
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
      expect((await chatState(page)).launcher).toBe(true);
      const names = (await sent()).map(([name]) => name);
      expect(names).toEqual(["joy_teaser_eligible", "joy_teaser_shown", "joy_teaser_action"]);
      expect(JSON.stringify(await sent())).not.toContain("gnybtas");  // the search term never leaves the page

      await page.goto(`${BASE_URL}/lt/alarm-communicators/cellular/gt/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await searchSettled(page, "none", "kitas");
      await page.waitForTimeout(1500);
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

  test("no invitation for time on a page alone, on the home page, or after the PDF", async () => {
    await withPage(async ({ page }) => {
      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/get/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.evaluate(() => window.scrollTo(0, 3000));
      await page.waitForTimeout(3000);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
    }, null);
    await withPage(async ({ page }) => {
      await page.goto(`${BASE_URL}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await searchSettled(page, "none", "x");
      await page.waitForTimeout(1500);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();

      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/get/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.evaluate(() => {
        const link = document.createElement("a");
        link.href = "/en/alarm-communicators/cellular/get/GET.pdf";
        link.addEventListener("click", (event) => event.preventDefault());
        document.querySelector(".md-content").appendChild(link);
        link.click();
      });
      await searchSettled(page, "none", "y");
      await page.waitForTimeout(1500);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
    });
  });

  test("coming back twice to the wiring section invites about wiring, once a visit", async () => {
    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/get/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await answerConsent(page);
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      // answering the cookie banner reloads the page: scroll only the page that stays
      await page.waitForLoadState("load");
      await page.waitForTimeout(1000);
      // "instant": the theme scrolls smoothly, and a long smooth scroll would still be running
      const toWiring = () => page.evaluate(() => {
        const heading = [...document.querySelectorAll(".md-content h2")].find((h) => /wiring/i.test(h.textContent));
        window.scrollTo({ top: heading.getBoundingClientRect().top + window.scrollY - 100, behavior: "instant" });
      });
      const toTop = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await toWiring(); await page.waitForTimeout(600);
      await toTop(); await page.waitForTimeout(600);
      await toWiring(); await page.waitForTimeout(600);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();  // one return isn't enough
      await toTop(); await page.waitForTimeout(600);
      await toWiring();
      await page.waitForSelector("#trikdocs-chat-teaser", { state: "visible" });
      expect(await page.textContent("#trikdocs-chat-teaser")).toContain("Questions about GET wiring? Ask Joy, our AI assistant.");
      ensureArtifactsDir();
      await page.waitForTimeout(800);  // after its fade-in
      await page.screenshot({ path: path.join(ARTIFACT_DIR, "teaser-wiring.png"), fullPage: false });

      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/gt/`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(LAUNCHER, { state: "visible" });
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(2000);
      expect(await page.$("#trikdocs-chat-teaser")).toBeNull();
      expect(requests).toEqual([]);
    });
  });
});
