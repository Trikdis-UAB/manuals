// Drives the Protegus web app (released, or the beta with --app beta) the way a person does: boot,
// open the system, open Advanced settings, press Read, then walk the configurator menu.

import { chromium } from 'playwright';
import { installGuard } from './guard.mjs';
import { FRONTENDS } from './frontends.mjs';
import { createMocks, fakeToken } from './mocks.mjs';
import { SAMPLE } from './sample.mjs';
import { readJson } from './guard.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

export const LAYOUTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
  // iPhone 14/15-sized viewport. The web app switches to its phone layout below ~768 px.
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};

export async function openApp({ lang, model, layout, log = () => {}, skipAdvancedIntro = true, configPatch = null, storage = {}, timezoneId = 'Europe/Vilnius', frontend = FRONTENDS.released }) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    ...LAYOUTS[layout],
    serviceWorkers: 'block', // a service worker could fetch around page.route
    locale: lang === 'en' ? 'en-GB' : lang,
    timezoneId, // the browser's zone; the app shows it as the new system's default time zone
    colorScheme: 'light',
  });
  const mocks = createMocks({ lang, model, configPatch, timezoneId, frontend });
  // Start as a returning user whose label pack is already cached. On a browser's very first visit
  // some configurator pages build their option lists before the labels arrive and show raw keys.
  const pack = readJson(ROOT, 'fixtures', frontend.labelsDir, `app.${lang}.json`);
  const guard = await installGuard(context, { mocks, log, frontend });
  await context.addInitScript(({ origin, token, lang, userId, systemId, skipAdvancedIntro, storage, labels, labelsVersion }) => {
    if (location.origin !== origin || localStorage.getItem('token')) return;
    for (const [k, v] of Object.entries(JSON.parse(labels))) localStorage.setItem(k, v.replace(/&apos;/g, "'").replace(/&quot;/g, '"'));
    localStorage.setItem('lang_version', JSON.stringify(labelsVersion));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('lang', JSON.stringify(lang));
    localStorage.setItem('privacy_consent', 'true'); // the "Data we collect" notice
    // Skip the Advanced-settings warning page ("don't show again") and go straight to the configurator.
    if (skipAdvancedIntro) localStorage.setItem(`do_not_show_adv_${userId}_${systemId}`, '1');
    for (const [k, v] of Object.entries(storage)) localStorage.setItem(k, JSON.stringify(v));
  }, { origin: frontend.origin, token: fakeToken(), lang, userId: SAMPLE.userId, systemId: SAMPLE.systemId, skipAdvancedIntro, storage, labels: pack.translations, labelsVersion: pack.version });

  const page = await context.newPage();
  trackRequests(page);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // A front-end file that did not arrive (icons, scripts) leaves gaps in the picture. Not counted: the
  // guard's own refusals, and requests the page cancelled itself (ERR_ABORTED, e.g. on navigation).
  page.on('requestfailed', (r) => {
    const why = r.failure()?.errorText ?? '';
    if (!/ERR_BLOCKED_BY_CLIENT|ERR_ABORTED/.test(why)) errors.push(`failed to load ${r.url().split('?')[0]} (${why})`);
  });
  page.on('response', (r) => { if (r.status() >= 400 && r.request().method() === 'GET') errors.push(`HTTP ${r.status()} for ${r.url().split('?')[0]}`); });
  try {
    // One retry: a slow moment on the host (30 s+ for the first byte) should not cost the screen.
    await page.goto(frontend.origin + '/', { waitUntil: 'domcontentloaded' }).catch((e) => {
      if (e.name !== 'TimeoutError') throw e;
      log(`retrying the first load of ${frontend.origin}`);
      return page.goto(frontend.origin + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    });
    // Booting at "/" runs the app's global resolver, which loads the label pack.
    await page.waitForURL((u) => !['/', '/login/email'].includes(u.pathname), { timeout: 30000 });
    await page.waitForLoadState('networkidle');
  } catch (e) {
    await browser.close();
    throw e;
  }
  return { browser, context, page, guard, errors, mocks };
}

// Client-side navigation through Angular's router (a full page load would lose in-memory state).
export async function routerGo(page, path) {
  await page.evaluate((p) => {
    history.pushState(null, '', p);
    dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, path);
  await networkQuiet(page);
}

// Bottom edge (CSS px) of the last painted content: cards, text, icons. Ignores the empty page
// background, so a short page can be cropped instead of shipping a mostly grey image.
export async function contentBottom(page) {
  return page.evaluate(() => {
    const vh = innerHeight;
    const transparent = (c) => c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c);
    // Colour of the empty area at the bottom of the screen = the page background.
    let emptyBg = getComputedStyle(document.body).backgroundColor;
    for (let el = document.elementFromPoint(4, vh - 4); el; el = el.parentElement) {
      const c = getComputedStyle(el).backgroundColor;
      if (!transparent(c)) { emptyBg = c; break; }
    }
    let bottom = 0;
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2 || r.height >= vh * 0.9 || r.bottom <= 0) continue;
      const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      const bg = cs.backgroundColor;
      const paintsBox = !transparent(bg) && bg !== emptyBg;
      const media = ['IMG', 'svg', 'CANVAS', 'INPUT', 'VIDEO'].includes(el.tagName);
      if (ownText || paintsBox || media) bottom = Math.max(bottom, r.bottom);
    }
    return { bottom: Math.ceil(bottom), viewportHeight: vh, overflows: bottom > vh };
  });
}

// Waits until the page has loaded what it asked for, then lets enter animations finish. Playwright's
// 'networkidle' is reached once per document, and the app changes pages without a new document, so
// after the first page it no longer waited for anything: on a slow network, icons the app fetches after
// opening a page arrived after the picture (2026-10-23). So the page's requests are counted here.
export async function settle(page, ms = 600) {
  await networkQuiet(page);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms);
  await networkQuiet(page); // anything the animations started
}

const INFLIGHT = new WeakMap();

function trackRequests(page) {
  const inflight = new Set();
  INFLIGHT.set(page, inflight);
  page.on('request', (r) => inflight.add(r));
  page.on('requestfinished', (r) => inflight.delete(r));
  page.on('requestfailed', (r) => inflight.delete(r));
}

// Nothing in flight for quietMs. A page still loading after maxMs fails its screen rather than
// giving an incomplete picture.
async function networkQuiet(page, { quietMs = 500, maxMs = 20000 } = {}) {
  const inflight = INFLIGHT.get(page);
  if (!inflight) return page.waitForLoadState('networkidle');
  const start = Date.now();
  let quietSince = null;
  while (Date.now() - start < maxMs) {
    if (inflight.size) quietSince = null;
    else if (quietSince === null) quietSince = Date.now();
    else if (Date.now() - quietSince >= quietMs) return;
    await page.waitForTimeout(50);
  }
  throw new Error(`the page was still loading after ${maxMs / 1000} s: ${[...inflight].slice(0, 3).map((r) => r.url().split('?')[0]).join(', ')}`);
}
