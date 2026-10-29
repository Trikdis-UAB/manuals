// Sample-data answers for the /v3/api/* calls the web app makes. Everything served here is
// either public reference data saved from the auth-free endpoints (translations, regions,
// languages) or invented sample data from sample.mjs / fixtures/config. No real account,
// company, device or customer appears in it.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson } from './guard.mjs';
import { FRONTENDS, configFixture } from './frontends.mjs';
import { SAMPLE, MODELS, NEW_SYSTEM_ID, sampleMe, sampleSystem, sampleAreaSystem, sampleConfigInfo, sampleListRow } from './sample.mjs';
import { configuratorMocks } from './mocks-configurators.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = path.join(ROOT, 'fixtures');

export function fakeToken() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: 'screenshot-mode', iat: now, nbf: now, exp: now + 86400 * 365, sub: SAMPLE.userId, home_region: 'eu' };
  return `${b64({ typ: 'JWT', alg: 'none' })}.${b64(payload)}.c2FtcGxl`;
}

// scenario (walks that use the app as a user does): sampleSystem 'areas' picks the system with areas and
// zones; system patches it (deepMerge below); zoneStatus sets zones' live state by number
// ({ "4": { "alarm": true } }); openZones are the zones the panel names when it refuses to arm;
// deviceOffline makes the add-system wizard find the device offline.
export function createMocks({ lang, model, configPatch = null, timezoneId = null, frontend = FRONTENDS.released, scenario = {} }) {
  const routes = [];
  const on = (method, endpoint, fn) => routes.push({ method, endpoint, fn });
  const regions = readJson(FIX, 'public', 'regions.json').regions;
  const state = {}; // what this session's add-system wizard created
  const token = fakeToken();
  const fixture = configFixture(path.join(FIX, 'config'), MODELS[model].fixture, frontend).file;
  const system = () => deepMerge(scenario.sampleSystem === 'areas' ? sampleAreaSystem(model) : sampleSystem(model), structuredClone(scenario.system ?? {}));

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
    const me = sampleMe({ regions, modelName: model, withSystem: sid === SAMPLE.systemId, system: system() });
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
    system: Number(body?.system_id) === NEW_SYSTEM_ID && state.system ? state.system : system(),
    relatedSystems: [],
  }));

  // An area's zones and their live state (zone status list).
  on('GET', '/area-zones', ({ query }) => {
    const sys = system();
    const area = sys.areas.find((a) => a.queue_no === Number(query.get('area_number')));
    const closed = { enabled: true, alarm: false, failure: false, bypass: false };
    return {
      success: true,
      zones: Object.fromEntries(sys.zones.filter((z) => z.area_id === area?.id).map((z) => [z.queue_no, { ...closed, ...scenario.zoneStatus?.[z.queue_no] }])),
    };
  });
  // Arming or disarming. Nothing is sent: the panel's answer is made up here. With openZones it refuses
  // to arm and names them, which opens the app's "Bypass failed zones" dialog.
  on('POST', '/set-area-status', ({ body }) => {
    const sys = system();
    const area = sys.areas.find((a) => a.id === Number(body?.area_id));
    const open = (scenario.openZones ?? []).map((n) => sys.zones.find((z) => z.queue_no === n)).filter(Boolean);
    const common = { isLoggedIn: true, badPin: false, failed_areas: [] };
    if (open.length && Number(body?.new_state) !== 1) {
      return { ...common, success: false, state: area?.status ?? 0, error: '', hasFailedzones: true, failedZones: Object.fromEntries(open.map((z) => [z.queue_no, z.name])) };
    }
    return { ...common, success: true, state: Number(body?.new_state), error: '', hasFailedzones: false, failedZones: [] };
  });

  // Device configuration (what a live read would return).
  on('*', '/config/info', () => sampleConfigInfo(model));
  on('*', '/config/read', () => {
    const data = deepMerge(readJson(FIX, 'config', fixture), configPatch ?? {});
    for (const k of Object.keys(data)) if (k.startsWith('_')) delete data[k]; // notes and side data, not config
    data.isInstaller = false;
    return { success: true, data };
  });

  // Calls a particular configurator makes besides config/read (status, keypads, users, ...).
  configuratorMocks(MODELS[model].configurator, { on, readJson, FIX, model, state, fixture, configPatch, scenario });

  return {
    appErrors,
    sampleSystem: system,
    resolve(method, endpoint) {
      const r = routes.find((x) => (x.method === '*' || x.method === method) && x.endpoint === endpoint);
      return r?.fn;
    },
  };
}

// Objects merge key by key; arrays and values in the patch replace what is there, except that an
// object with index keys patches single items of an array: { "schedules": { "0": { "validity": true } } }.
function deepMerge(base, patch) {
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  for (const [k, v] of Object.entries(patch)) {
    if (Array.isArray(base[k]) && isObj(v) && Object.keys(v).every((i) => /^\d+$/.test(i))) {
      for (const [i, item] of Object.entries(v)) base[k][i] = isObj(item) && isObj(base[k][i]) ? deepMerge(base[k][i], item) : item;
    } else {
      base[k] = isObj(v) && isObj(base[k]) ? deepMerge(base[k], v) : v;
    }
  }
  return base;
}
