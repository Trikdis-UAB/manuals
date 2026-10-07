// Sample-data answers for the /v3/api/* calls the web app makes. Everything served here is
// either public reference data saved from the auth-free endpoints (translations, regions,
// languages) or invented sample data from sample.mjs / fixtures/config. No real account,
// company, device or customer appears in it.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson } from './guard.mjs';
import { SAMPLE, MODELS, sampleMe, sampleSystem, sampleConfigInfo, sampleListRow } from './sample.mjs';
import { configuratorMocks } from './mocks-configurators.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = path.join(ROOT, 'fixtures');

export function fakeToken() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: 'screenshot-mode', iat: now, nbf: now, exp: now + 86400 * 365, sub: SAMPLE.userId, home_region: 'eu' };
  return `${b64({ typ: 'JWT', alg: 'none' })}.${b64(payload)}.c2FtcGxl`;
}

export function createMocks({ lang, model, configPatch = null }) {
  const routes = [];
  const on = (method, endpoint, fn) => routes.push({ method, endpoint, fn });
  const regions = readJson(FIX, 'public', 'regions.json').regions;
  const token = fakeToken();

  // Public, auth-free reference data (saved copies; see README).
  on('*', '/translations', ({ query, body }) => {
    const p = { ...Object.fromEntries(query ?? []), ...(body ?? {}) };
    const l = p.language || lang;
    const pack = p.config ? p.config : 'app';
    return readJson(FIX, 'translations', `${pack}.${l}.json`);
  });
  on('GET', '/regions', () => readJson(FIX, 'public', 'regions.json'));
  on('GET', '/languages', () => readJson(FIX, 'public', 'languages.json'));
  on('GET', '/timezones', () => readJson(FIX, 'public', 'timezones.json'));
  // The app reports its own front-end errors here; swallowed so nothing is sent.
  on('POST', '/error', () => ({ success: true }));

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
  on('*', '/get-system', () => ({ success: true, system: sampleSystem(model), relatedSystems: [] }));

  // Device configuration (what a live read would return).
  on('*', '/config/info', () => sampleConfigInfo(model));
  on('*', '/config/read', () => {
    const data = deepMerge(readJson(FIX, 'config', MODELS[model].fixture), configPatch ?? {});
    for (const k of Object.keys(data)) if (k.startsWith('_')) delete data[k]; // notes and side data, not config
    data.isInstaller = false;
    return { success: true, data };
  });

  // Calls a particular configurator makes besides config/read (status, keypads, users, ...).
  configuratorMocks(MODELS[model].configurator, { on, readJson, FIX, model });

  return {
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
