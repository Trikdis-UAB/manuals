// Network guard: the only thing standing between this tool and the live Protegus platform.
//
// Rules (see README.md "Safety"):
//   - Every /v3/api/* request is answered locally from saved public data or invented sample data.
//     Nothing under /v3/api reaches the real server, of any method, so a fake token can never
//     cause a server-side effect and no real account data can come back.
//   - The released front-end itself (HTML/JS/CSS/images/fonts on web.protegus.app) is fetched live,
//     GET only, so screenshots show the version customers have.
//   - Analytics (/ingest/), error reporting, every other host, every non-GET and every WebSocket
//     are refused. A few third-party scripts the app waits for get a local no-op stand-in.

import fs from 'node:fs';
import path from 'node:path';

export const APP_ORIGIN = 'https://web.protegus.app';
const STATIC_GET_HOSTS = new Set(['web.protegus.app', 'fonts.googleapis.com', 'fonts.gstatic.com']);
const BLOCKED_PATH_PREFIXES = ['/ingest/']; // PostHog analytics + session recording

// The app's route resolver waits for Google Sign-In to load before it opens a system.
const LOCAL_STUBS = {
  'https://accounts.google.com/gsi/client':
    'window.google={accounts:{id:{initialize(){},prompt(){},renderButton(){},disableAutoSelect(){},cancel(){}}}};',
};

export async function installGuard(context, { mocks, log }) {
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

    if (url.host === 'web.protegus.app' && url.pathname.startsWith('/v3/api/')) {
      const endpoint = url.pathname.slice('/v3/api'.length);
      const key = `${method} ${endpoint}`;
      const handler = mocks.resolve(method, endpoint);
      if (!handler) {
        bump(stats.unmocked, key);
        log?.(`UNMOCKED ${key} ${url.search}`);
        return route.fulfill(json({ success: false, error: 'Not available in screenshot mode.' }));
      }
      bump(stats.mocked, key);
      log?.(`mock ${key}${url.search}`);
      return route.fulfill(json(handler({ method, endpoint, query: url.searchParams, body: parseBody(req) })));
    }

    const stub = LOCAL_STUBS[url.origin + url.pathname];
    if (method === 'GET' && stub !== undefined) {
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: stub });
    }

    const blockedPath = BLOCKED_PATH_PREFIXES.some((p) => url.pathname.startsWith(p));
    if (method === 'GET' && STATIC_GET_HOSTS.has(url.host) && !blockedPath) {
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

function json(obj) {
  return {
    status: 200,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify(obj),
  };
}

export function readJson(...parts) {
  return JSON.parse(fs.readFileSync(path.join(...parts), 'utf8'));
}
