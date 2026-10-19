// Positive control for the network guard: from inside a guarded page, deliberately try the
// requests the guard must stop, and fail loudly if any of them gets through. Runs once per front-end.
//   node guard-selftest.mjs
import { chromium } from 'playwright';
import { installGuard, FONT_HOSTS } from './lib/guard.mjs';
import { FRONTENDS } from './lib/frontends.mjs';

const mocks = { resolve: (m, e) => (e === '/me' ? () => ({ success: true, mocked: true }) : undefined) };
const ROUTER = 'https://region-router.trikdis.workers.dev'; // where the beta's newer API client sends calls
const BETA_API = 'https://api.beta2.protegus.app';
// A name that can never resolve: if a call to it comes back answered, neither the call nor its CORS
// preflight went to the network.
const NOWHERE = 'https://api.screenshot-guard.invalid';
// The headers the app sends. Cross-origin they make the browser send a preflight first.
const appHeaders = { Authorization: 'Bearer sample', 'X-Home-Region': 'eu', 'My-Language': 'en', 'Content-Type': 'application/json' };

const mockedOk = (r) => r.ok && r.body.includes('"mocked":true');
const local = (r) => r.ok && r.body.includes('screenshot mode');
const refused = (r) => !r.ok;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
let failed = 0;
for (const fe of Object.values(FRONTENDS)) {
  console.log(`\n${fe.id} front-end (${fe.origin})`);
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const stats = await installGuard(context, { mocks, frontend: fe });
  const page = await context.newPage();
  await page.goto(fe.origin + '/robots.txt'); // a page on the app origin, so fetches start from there

  const tryFetch = (url, init) => page.evaluate(async ([u, i]) => {
    try { const r = await fetch(u, i); return { ok: true, status: r.status, body: (await r.text()).slice(0, 80) }; }
    catch (e) { return { ok: false, error: String(e) }; }
  }, [url, init ?? {}]);

  const O = fe.origin;
  const checks = [
    // [description, url, init, expectation]
    ['API GET answered locally', `${O}/v3/api/me`, {}, mockedOk],
    ['API DELETE answered locally, never sent', `${O}/v3/api/account`, { method: 'DELETE' }, local],
    ['API write answered locally, never sent', `${O}/v3/api/config/write`, { method: 'POST', body: '{}' }, local],
    ['region router: API GET with the app headers answered locally', `${ROUTER}/v3/api/me`, { headers: appHeaders }, mockedOk],
    ['region router: API write answered locally, never sent', `${ROUTER}/v3/api/config/write`, { method: 'POST', body: '{}', headers: appHeaders }, local],
    ['beta server: API write answered locally, never sent', `${BETA_API}/v3/api/config/write`, { method: 'POST', body: '{}', headers: appHeaders }, local],
    ['unresolvable host: API write and its preflight answered locally', `${NOWHERE}/v3/api/config/write`, { method: 'PUT', body: '{}', headers: appHeaders }, local],
    ['region router: anything outside /v3/api refused', `${ROUTER}/`, {}, refused],
    ['non-GET to the app host refused', `${O}/anything`, { method: 'POST', body: 'x' }, refused],
    ['analytics GET refused', `${O}/ingest/e/?x=1`, {}, refused],
    ['other host refused', 'https://example.com/', {}, refused],
  ];
  for (const [what, url, init, expect] of checks) {
    const r = await tryFetch(url, init);
    const pass = expect(r);
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${what}  ${JSON.stringify(r).slice(0, 120)}`);
  }
  const wsBlocked = await page.evaluate((host) => new Promise((res) => {
    const ws = new WebSocket(`wss://${host}/socket.io/?EIO=4&transport=websocket`);
    ws.onopen = () => res(false); ws.onclose = () => res(true); ws.onerror = () => res(true);
    setTimeout(() => res(true), 3000);
  }), new URL(O).host);
  if (!wsBlocked) failed++;
  console.log(`${wsBlocked ? 'PASS' : 'FAIL'}  WebSocket refused`);
  // Nothing but the front-end's own files and fonts may have been fetched live.
  const allowed = [...fe.staticHosts, ...FONT_HOSTS];
  const live = [...stats.fetched.keys()].filter((h) => !allowed.includes(h));
  if (live.length) failed++;
  console.log(`${live.length ? 'FAIL' : 'PASS'}  fetched live only from ${allowed.join(', ')}${live.length ? ` (also: ${live.join(', ')})` : ''}`);
  console.log(`refused: ${[...stats.refused.keys()].join(', ')}`);
  await context.close();
}
await browser.close();
console.log(failed ? `\n${failed} check(s) FAILED` : '\nall guard checks passed');
process.exit(failed ? 1 : 0);
