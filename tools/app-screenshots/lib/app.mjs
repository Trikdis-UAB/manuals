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

export async function settle(page, ms = 600) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms); // let enter animations finish
}
