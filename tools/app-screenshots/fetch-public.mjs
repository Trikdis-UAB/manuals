// Saves the public, auth-free reference data the app needs, so captures run offline against it.
// Run before a capture batch so labels match what customers currently see.
//   node fetch-public.mjs [en lt es ru ...]
// Only read-only, unauthenticated endpoints are called. No token is sent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://web.protegus.app/v3/api';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['en'];
const CONFIG_PACKS = ['g16']; // add 'sp3', 'gv17', ... as screens for those configurators are added

async function save(file, res) {
  const body = await res.json();
  if (!body.success) throw new Error(`${file}: success=false`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(body));
  return body;
}
const post = (p, body) => fetch(API + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

for (const name of ['regions', 'languages', 'timezones']) {
  await save(path.join(ROOT, 'fixtures/public', `${name}.json`), await fetch(`${API}/${name}`));
}
await save(path.join(ROOT, 'fixtures/public/pgm-icons.json'), await fetch(`${API}/get-pgm-icon-paths`));

for (const lang of langs) {
  const app = await save(path.join(ROOT, 'fixtures/translations', `app.${lang}.json`), await post('/translations', { language: lang, version: '-1' }));
  const counts = [`app ${Object.keys(JSON.parse(app.translations)).length}`];
  for (const pack of CONFIG_PACKS) {
    const p = await save(path.join(ROOT, 'fixtures/translations', `${pack}.${lang}.json`), await post('/translations', { language: lang, version: '-1', config: pack }));
    counts.push(`${pack} ${Object.keys(JSON.parse(p.translations)).length}`);
  }
  console.log(`${lang}: ${counts.join(', ')} keys`);
}
