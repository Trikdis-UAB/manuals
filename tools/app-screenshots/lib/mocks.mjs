// Sample-data answers for the /v3/api/* calls the web app makes. Everything served here is
// either public reference data saved from the auth-free endpoints (translations, regions,
// languages) or invented sample data from sample.mjs / fixtures/config. No real account,
// company, device or customer appears in it.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson } from './guard.mjs';
import { FRONTENDS, configFixture } from './frontends.mjs';
import { SAMPLE, MODELS, NEW_SYSTEM_ID, sampleMe, sampleSystem, sampleConfigInfo, sampleListRow } from './sample.mjs';
import { configuratorMocks } from './mocks-configurators.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = path.join(ROOT, 'fixtures');

export function fakeToken() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: 'screenshot-mode', iat: now, nbf: now, exp: now + 86400 * 365, sub: SAMPLE.userId, home_region: 'eu' };
  return `${b64({ typ: 'JWT', alg: 'none' })}.${b64(payload)}.c2FtcGxl`;
}

export function createMocks({ lang, model, configPatch = null, timezoneId = null, frontend = FRONTENDS.released }) {
  const routes = [];
  const on = (method, endpoint, fn) => routes.push({ method, endpoint, fn });
  const regions = readJson(FIX, 'public', 'regions.json').regions;
  const state = {}; // what this session's add-system wizard created
  const token = fakeToken();
  const fixture = configFixture(path.join(FIX, 'config'), MODELS[model].fixture, frontend).file;

  // Public, auth-free reference data (saved copies; see README).
  on('*', '/translations', ({ query, body }) => {
    const p = { ...Object.fromEntries(query ?? []), ...(body ?? {}) };
    const l = p.language || lang;
    const pack = p.config ? p.config : 'app';
    return readJson(FIX, frontend.labelsDir, `${pack}.${l}.json`);
  });
  on('GET', '/regions', () => readJson(FIX, 'public', 'regions.json'));
  on('GET', '/languages', () => readJson(FIX, 'public', 'languages.json'));
  // The server also names the caller's own zone (it becomes a new system's default); the saved copy
  // says whatever it said where it was fetched, so the run's chosen zone replaces it.
  on('GET', '/timezones', () => ({ ...readJson(FIX, 'public', 'timezones.json'), ...(timezoneId ? { userTimeZone: timezoneId } : {}) }));
  // The app reports its own front-end errors here. Nothing is sent; the run reports them as problems,
  // because they usually mean the sample data is shaped differently from the server's.
  const appErrors = [];
  on('POST', '/error', ({ body }) => { appErrors.push(String(body?.msg ?? body?.message ?? JSON.stringify(body)).slice(0, 200)); return { success: true }; });

  // The signed-in sample installer.
  on('*', '/me', ({ query }) => {
    const sid = Number(query.get('systemId') || 0);
    const me = sampleMe({ regions, modelName: model, withSystem: sid === SAMPLE.systemId });
    me.token = token;
    me.language = lang;
    return me;
  });

  on('*', '/get-pgm-icon-paths', () => readJson(FIX, 'public', 'pgm-icons.json'));
  on('GET', '/dashboard/widget-data', () => ({ success: true, data: {} }));
  on('GET', '/systems-with-devices', ({ query }) => ({
    success: true,
    list: Number(query.get('systemOffset') || 0) === 0 ? [sampleListRow(model)] : [],
  }));
  on('*', '/get-system', ({ body }) => ({
    success: true,
    system: Number(body?.system_id) === NEW_SYSTEM_ID && state.system ? state.system : sampleSystem(model),
    relatedSystems: [],
  }));

  // Device configuration (what a live read would return).
  on('*', '/config/info', () => sampleConfigInfo(model));
  on('*', '/config/read', () => {
    const data = deepMerge(readJson(FIX, 'config', fixture), configPatch ?? {});
    for (const k of Object.keys(data)) if (k.startsWith('_')) delete data[k]; // notes and side data, not config
    data.isInstaller = false;
    return { success: true, data };
  });

  // Calls a particular configurator makes besides config/read (status, keypads, users, ...).
  configuratorMocks(MODELS[model].configurator, { on, readJson, FIX, model, state, fixture, configPatch });

  return {
    appErrors,
    sampleSystem: () => sampleSystem(model),
    resolve(method, endpoint) {
      const r = routes.find((x) => (x.method === '*' || x.method === method) && x.endpoint === endpoint);
      return r?.fn;
    },
  };
}

// Objects merge key by key; arrays and values in the patch replace what is there.
function deepMerge(base, patch) {
  for (const [k, v] of Object.entries(patch)) {
    const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
    base[k] = isObj(v) && isObj(base[k]) ? deepMerge(base[k], v) : v;
  }
  return base;
}
