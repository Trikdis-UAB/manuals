const { test, expect, chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = (process.env.CRISP_CHAT_BASE_URL || "http://docs.trikdis.com:8013").replace(/\/+$/, "");
const ARTIFACT_DIR =
  process.env.CRISP_CHAT_ARTIFACT_DIR || path.join(process.cwd(), "artifacts/ui/crisp-chat");
const HOST_RULE = "MAP docs.trikdis.com 127.0.0.1";

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

function crispStubScript() {
  return `
    (function () {
      var state = window.__CRISP_STUB__ || { commands: [], config: {}, listeners: {} };
      var launcher = document.getElementById("crisp-chatbox");

      function ensureLauncher() {
        if (!launcher) {
          launcher = document.createElement("div");
          launcher.id = "crisp-chatbox";
          launcher.setAttribute("data-visible", "true");
          document.body.appendChild(launcher);
        }
        return launcher;
      }

      function handle(command) {
        var type = command[0];
        var name = command[1];
        var args = command[2];

        state.commands.push(command);
        if (type === "config") {
          state.config[name] = Array.isArray(args) && args.length === 1 ? args[0] : args;
          return;
        }

        if (type === "on" && typeof args === "function") {
          if (!state.listeners[name]) {
            state.listeners[name] = [];
          }
          state.listeners[name].push(args);
          return;
        }

        if (type === "do" && name === "chat:hide") {
          ensureLauncher().setAttribute("data-visible", "false");
          return;
        }

        if (type === "do" && name === "chat:show") {
          ensureLauncher().setAttribute("data-visible", "true");
        }
      }

      function emit(name, payload) {
        var callbacks = state.listeners[name] || [];
        callbacks.forEach(function (callback) {
          callback(payload);
        });
      }

      (window.$crisp || []).forEach(handle);
      window.$crisp = { push: handle };
      state.emit = emit;
      state.runtimeConfig = window.CRISP_RUNTIME_CONFIG || {};
      ensureLauncher();
      window.__CRISP_STUB__ = state;
    })();
  `;
}

async function withPage(run) {
  const browser = await chromium.launch({
    args: [`--host-resolver-rules=${HOST_RULE}`]
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];

  await page.route("https://client.crisp.chat/l.js", async (route) => {
    requests.push(route.request().url());
    await route.fulfill({
      body: crispStubScript(),
      contentType: "application/javascript",
      status: 200
    });
  });

  try {
    await run({ browser, context, page, requests });
  } finally {
    await context.close();
    await browser.close();
  }
}

async function crispState(page) {
  return page.evaluate(() => ({
    crisp: window.__TRIKDOCS_CRISP__ || null,
    crispStub: window.__CRISP_STUB__ || null,
    runtimeConfig: window.CRISP_RUNTIME_CONFIG || null
  }));
}

test.describe("Crisp chat rollout", () => {
  test("keeps Crisp gated until preview is enabled and persists the session gate", async () => {
    ensureArtifactsDir();

    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/en/`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CRISP__);
      expect(requests).toEqual([]);

      let state = await crispState(page);
      expect(state.crisp.hostMatched).toBeTruthy();
      expect(state.crisp.permitted).toBeFalsy();
      expect(state.crisp.previewEnabled).toBeFalsy();

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "preview-gated.png"),
        fullPage: false
      });

      await page.goto(`${BASE_URL}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__CRISP_STUB__);
      await page.waitForFunction(() => !window.location.search.includes("chat_preview"));

      state = await crispState(page);
      expect(requests).toHaveLength(1);
      expect(state.crisp.previewEnabled).toBeTruthy();
      expect(state.crisp.started).toBeTruthy();
      expect(state.runtimeConfig.locale).toBe("en");
      expect(state.crispStub.config["position:reverse"]).toBe(false);
      expect(state.crispStub.config["color:theme"]).toBe("red");
      expect(state.crispStub.config["color:mode"]).toBe("auto");
      expect(state.crispStub.config["hide:on:away"]).toBe(true);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "preview-enabled.png"),
        fullPage: false
      });

      await page.goto(`${BASE_URL}/en/alarm-communicators/cellular/g16/`, {
        waitUntil: "domcontentloaded"
      });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CRISP__);

      state = await crispState(page);
      expect(state.crisp.previewEnabled).toBeTruthy();
      expect(state.crisp.permitted).toBeTruthy();
      expect(state.runtimeConfig.locale).toBe("en");

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "preview-persisted.png"),
        fullPage: false
      });
    });
  });

  test("maps locale by language path and hides the launcher when preview is cleared, offline, or unavailable", async () => {
    ensureArtifactsDir();

    for (const locale of ["lt", "es", "ru"]) {
      await withPage(async ({ page }) => {
        await page.goto(`${BASE_URL}/${locale}/?chat_preview=1`, { waitUntil: "domcontentloaded" });
        await page.waitForFunction(() => !!window.__CRISP_STUB__);
        const state = await crispState(page);
        expect(state.runtimeConfig.locale).toBe(locale);
      });
    }

    await withPage(async ({ page, requests }) => {
      await page.goto(`${BASE_URL}/en/?chat_preview=1`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__CRISP_STUB__);

      await page.evaluate(() => {
        window.dispatchEvent(new Event("offline"));
      });
      await expect.poll(async () => {
        return page.evaluate(() => {
          const launcher = document.getElementById("crisp-chatbox");
          return launcher ? launcher.getAttribute("data-visible") : "missing";
        });
      }).toBe("false");

      await page.evaluate(() => {
        window.dispatchEvent(new Event("online"));
      });
      await expect.poll(async () => {
        return page.evaluate(() => document.getElementById("crisp-chatbox").getAttribute("data-visible"));
      }).toBe("true");

      await page.evaluate(() => {
        window.__CRISP_STUB__.emit("website:availability:changed", false);
      });
      await expect.poll(async () => {
        return page.evaluate(() => document.getElementById("crisp-chatbox").getAttribute("data-visible"));
      }).toBe("false");

      const requestCountBeforeClear = requests.length;
      await page.goto(`${BASE_URL}/en/?chat_preview=0`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => !!window.__TRIKDOCS_CRISP__);

      const state = await crispState(page);
      expect(state.crisp.previewEnabled).toBeFalsy();
      expect(state.crisp.permitted).toBeFalsy();
      expect(state.crispStub).toBeNull();
      expect(requests).toHaveLength(requestCountBeforeClear);

      await expect.poll(async () => {
        return page.evaluate(() => !!document.getElementById("crisp-chatbox"));
      }).toBe(false);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "preview-cleared-hidden.png"),
        fullPage: false
      });
    });
  });
});
