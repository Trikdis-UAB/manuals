// Network guard: the only thing standing between this tool and the live Protegus platform.
//
// Rules (see README.md "Safety"):
//   - Every /v3/api/* request is answered locally from saved public data or invented sample data,
//     on whatever host it is addressed to (the app's own, a region's, the beta's region router).
//     Nothing under /v3/api reaches any server, of any method, so a fake token can never cause a
//     server-side effect and no real account data can come back.
//   - The front-end itself (HTML/JS/CSS/images/fonts on its own host, lib/frontends.mjs) is fetched
//     live, GET only, so screenshots show the version that is deployed.
//   - Analytics (/ingest/), error reporting, every other host, every non-GET and every WebSocket
//     are refused. A few third-party scripts the app waits for get a local no-op stand-in.

import fs from 'node:fs';
import path from 'node:path';
import { FRONTENDS } from './frontends.mjs';

export const APP_ORIGIN = FRONTENDS.released.origin;
export const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const BLOCKED_PATH_PREFIXES = ['/ingest/']; // PostHog analytics + session recording

// Third-party resources the app needs, answered locally instead of fetched:
//  - Google Sign-In: the app's route resolver waits for it to load before it opens a system.
//  - mcc-mnc.com: the SP5 SIM card reads its operator list from there; one sample entry.
const LOCAL_STUBS = {
  'https://accounts.google.com/gsi/client': {
    contentType: 'text/javascript',
    body: 'window.google={accounts:{id:{initialize(){},prompt(){},renderButton(){},disableAutoSelect(){},cancel(){}}}};',
  },
  'https://mcc-mnc.com/api/v1/mcc-mnc.php': {
    contentType: 'application/json',
    body: JSON.stringify({ data: [{ mcc: '246', mnc: '01', network: 'Sample Mobile', iso: 'lt', country: 'Lithuania', countryCode: '370' }] }),
  },
};

export async function installGuard(context, { mocks, log, frontend = FRONTENDS.released }) {
  const staticHosts = new Set([...frontend.staticHosts, ...FONT_HOSTS]);
  const stats = {
    mocked: new Map(),    // "METHOD /endpoint" -> count, answered locally
    unmocked: new Map(),  // API calls with no sample answer (answered locally with success:false)
    fetched: new Map(),   // host -> count of live static GETs
    refused: new Map(),   // "METHOD origin/path" -> count
  };
  const bump = (m, k) => m.set(k, (m.get(k) ?? 0) + 1);

  await context.routeWebSocket(/.*/, (ws) => {
    bump(stats.refused, `WS ${ws.url().split('?')[0]}`);
    ws.close();
  });

  await context.route('**/*', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const method = req.method();

    if (url.pathname.startsWith('/v3/api/')) {
      const cors = corsHeaders(req);
      // A cross-origin call (the beta's region router) is preceded by a CORS preflight; answer it here.
      if (method === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
      const endpoint = url.pathname.slice('/v3/api'.length);
      const key = `${method} ${endpoint}`;
      const handler = mocks.resolve(method, endpoint);
      if (!handler) {
        bump(stats.unmocked, key);
        log?.(`UNMOCKED ${key} ${url.host}${url.search}`);
        return route.fulfill(json({ success: false, error: 'Not available in screenshot mode.' }, cors));
      }
      bump(stats.mocked, key);
      log?.(`mock ${key} ${url.host}${url.search}`);
      return route.fulfill(json(handler({ method, endpoint, query: url.searchParams, body: parseBody(req) }), cors));
    }

    const stub = LOCAL_STUBS[url.origin + url.pathname];
    if (method === 'GET' && stub !== undefined) {
      return route.fulfill({ status: 200, contentType: stub.contentType, headers: { 'access-control-allow-origin': '*' }, body: stub.body });
    }

    const blockedPath = BLOCKED_PATH_PREFIXES.some((p) => url.pathname.startsWith(p));
    if (method === 'GET' && staticHosts.has(url.host) && !blockedPath) {
      bump(stats.fetched, url.host);
      return route.continue();
    }

    bump(stats.refused, `${method} ${url.origin}${url.pathname}`);
    return route.abort('blockedbyclient');
  });

  return stats;
}

function parseBody(req) {
  const raw = req.postData();
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return Object.fromEntries(new URLSearchParams(raw)); }
}

// Lets the page read a local answer to a cross-origin call, as the real API's CORS headers would.
function corsHeaders(req) {
  const h = req.headers();
  return {
    'access-control-allow-origin': h.origin ?? '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-methods': h['access-control-request-method'] ?? 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': h['access-control-request-headers'] ?? '*',
    vary: 'Origin',
  };
}

function json(obj, headers = { 'access-control-allow-origin': '*' }) {
  return { status: 200, contentType: 'application/json', headers, body: JSON.stringify(obj) };
}

export function readJson(...parts) {
  return JSON.parse(fs.readFileSync(path.join(...parts), 'utf8'));
}
