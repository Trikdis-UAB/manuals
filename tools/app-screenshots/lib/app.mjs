// Drives the released Protegus web app the way a person does: boot, open the system, open
// Advanced settings, press Read, then walk the configurator menu.

import { chromium } from 'playwright';
import { installGuard, APP_ORIGIN } from './guard.mjs';
import { createMocks, fakeToken } from './mocks.mjs';
import { SAMPLE } from './sample.mjs';

export const LAYOUTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
  // iPhone 14/15-sized viewport. The web app switches to its phone layout below ~768 px.
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};

export async function openApp({ lang, model, layout, log = () => {} }) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    ...LAYOUTS[layout],
    serviceWorkers: 'block', // a service worker could fetch around page.route
    locale: lang === 'en' ? 'en-GB' : lang,
    timezoneId: 'Europe/Vilnius',
    colorScheme: 'light',
  });
  const mocks = createMocks({ lang, model });
  const guard = await installGuard(context, { mocks, log });
  await context.addInitScript(({ token, lang, userId, systemId }) => {
    if (location.origin !== 'https://web.protegus.app' || localStorage.getItem('token')) return;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('lang', JSON.stringify(lang));
    localStorage.setItem('privacy_consent', 'true'); // the "Data we collect" notice
    // Skip the Advanced-settings warning page and go straight to the configurator.
    localStorage.setItem(`do_not_show_adv_${userId}_${systemId}`, '1');
  }, { token: fakeToken(), lang, userId: SAMPLE.userId, systemId: SAMPLE.systemId });

  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(APP_ORIGIN + '/', { waitUntil: 'domcontentloaded' });
  // Booting at "/" runs the app's global resolver, which loads the label pack.
  await page.waitForURL((u) => !['/', '/login/email'].includes(u.pathname), { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  return { browser, context, page, guard, errors, mocks };
}

// Client-side navigation through Angular's router (a full page load would lose in-memory state).
export async function routerGo(page, path) {
  await page.evaluate((p) => {
    history.pushState(null, '', p);
    dispatchEvent(new PopStateEvent('popstate', { state: null }));
  }, path);
  await page.waitForLoadState('networkidle');
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

export async function settle(page, ms = 600) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms); // let enter animations finish
}
