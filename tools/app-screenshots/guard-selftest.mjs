// Positive control for the network guard: from inside the guarded page, deliberately try the
// requests the guard must stop, and fail loudly if any of them gets through.
//   node guard-selftest.mjs
import { chromium } from 'playwright';
import { installGuard, APP_ORIGIN } from './lib/guard.mjs';

const mocks = { resolve: (m, e) => (e === '/me' ? () => ({ success: true, mocked: true }) : undefined) };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ serviceWorkers: 'block' });
const stats = await installGuard(context, { mocks });
const page = await context.newPage();
await page.goto(APP_ORIGIN + '/robots.txt'); // a page on the app origin, so fetches are same-origin

const tryFetch = (url, init) => page.evaluate(async ([u, i]) => {
  try { const r = await fetch(u, i); return { ok: true, status: r.status, body: (await r.text()).slice(0, 80) }; }
  catch (e) { return { ok: false, error: String(e) }; }
}, [url, init ?? {}]);

const checks = [
  // [description, url, init, expectation]
  ['API GET answered locally', `${APP_ORIGIN}/v3/api/me`, {}, (r) => r.ok && r.body.includes('"mocked":true')],
  ['API DELETE answered locally, never sent', `${APP_ORIGIN}/v3/api/account`, { method: 'DELETE' }, (r) => r.ok && r.body.includes('screenshot mode')],
  ['API write answered locally, never sent', `${APP_ORIGIN}/v3/api/config/write`, { method: 'POST', body: '{}' }, (r) => r.ok && r.body.includes('screenshot mode')],
  ['non-GET to the app host refused', `${APP_ORIGIN}/anything`, { method: 'POST', body: 'x' }, (r) => !r.ok],
  ['analytics GET refused', `${APP_ORIGIN}/ingest/e/?x=1`, {}, (r) => !r.ok],
  ['other host refused', 'https://example.com/', {}, (r) => !r.ok],
];

let failed = 0;
for (const [what, url, init, expect] of checks) {
  const r = await tryFetch(url, init);
  const pass = expect(r);
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${what}  ${JSON.stringify(r).slice(0, 120)}`);
}
const wsBlocked = await page.evaluate(() => new Promise((res) => {
  const ws = new WebSocket('wss://web.protegus.app/socket.io/?EIO=4&transport=websocket');
  ws.onopen = () => res(false); ws.onclose = () => res(true); ws.onerror = () => res(true);
  setTimeout(() => res(true), 3000);
}));
if (!wsBlocked) failed++;
console.log(`${wsBlocked ? 'PASS' : 'FAIL'}  WebSocket refused`);
console.log(`refused: ${[...stats.refused.keys()].join(', ')}`);
await browser.close();
console.log(failed ? `\n${failed} check(s) FAILED` : '\nall guard checks passed');
process.exit(failed ? 1 : 0);
