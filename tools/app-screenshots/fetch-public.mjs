// Saves the public, auth-free reference data the app needs, so captures run offline against it.
// Run before a capture batch so labels match what customers currently see.
//   node fetch-public.mjs [en lt es ru ...] [--app beta]
// Only read-only, unauthenticated endpoints are called. No token is sent.
// --app beta saves label packs for the beta front-end (fixtures/translations-beta, see pack() below);
// the reference lists (regions, languages, time zones, output icons, event types) always come from the released server.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontend, FRONTENDS } from './lib/frontends.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const appAt = argv.indexOf('--app');
const fe = frontend(appAt >= 0 ? argv.splice(appAt, 2)[1] : 'released');
const langs = argv.length ? argv : ['en'];
// 'sp5' has no pack of its own: the endpoint returns the shared configurator labels, which the
// newer configurator pages use alongside the main app pack.
const CONFIG_PACKS = ['g16', 'sp5'];

async function save(file, res) {
  const body = await res.json();
  if (!body.success) throw new Error(`${file}: success=false`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(body));
  return body;
}
const post = (api, p, body) => fetch(api + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

const REF = FRONTENDS.released.labelsApi;
for (const name of ['regions', 'languages', 'timezones']) {
  await save(path.join(ROOT, 'fixtures/public', `${name}.json`), await fetch(`${REF}/${name}`));
}
await save(path.join(ROOT, 'fixtures/public/pgm-icons.json'), await fetch(`${REF}/get-pgm-icon-paths`));
// Event types and their icons (front-end assets); the app asks with an empty POST, auth only if it has one.
await save(path.join(ROOT, 'fixtures/public/reactions.json'), await post(REF, '/get-reactions', {}));

// The beta server is the P2B North America region, and its pack names the region in ~25 labels
// ("Via Protegus2 North America cloud"). So a beta pack is the released (EU) pack plus only the keys the
// EU server does not have yet: what an EU user sees once those labels reach the EU server.
async function pack(lang, config) {
  const body = { language: lang, version: '-1', ...(config ? { config } : {}) };
  const eu = await (await post(REF, '/translations', body)).json();
  if (!eu.success) throw new Error(`${config ?? 'app'}.${lang}: success=false`);
  if (fe.labelsApi === REF) return eu;
  const own = await (await post(fe.labelsApi, '/translations', body)).json();
  if (!own.success) throw new Error(`${fe.id} ${config ?? 'app'}.${lang}: success=false`);
  const base = JSON.parse(eu.translations);
  const extra = Object.fromEntries(Object.entries(JSON.parse(own.translations)).filter(([k]) => !(k in base)));
  return { ...eu, translations: JSON.stringify({ ...base, ...extra }),
    _merged: { base: new URL(REF).host, baseVersion: eu.version, addedFrom: new URL(fe.labelsApi).host, addedVersion: own.version, addedKeys: Object.keys(extra) } };
}
function write(file, body) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(body));
  const added = body._merged ? ` (+${body._merged.addedKeys.length} from ${body._merged.addedFrom})` : '';
  return `${path.basename(file, '.json').split('.')[0]} ${Object.keys(JSON.parse(body.translations)).length}${added}`;
}

for (const lang of langs) {
  const dir = path.join(ROOT, 'fixtures', fe.labelsDir);
  const counts = [write(path.join(dir, `app.${lang}.json`), await pack(lang))];
  for (const p of CONFIG_PACKS) counts.push(write(path.join(dir, `${p}.${lang}.json`), await pack(lang, p)));
  console.log(`${fe.id} ${lang}: ${counts.join(', ')} keys`);
}
