// The front-ends the tool can photograph (--app). Either way every /v3/api call is answered by the
// guard, whatever host the app sends it to; only the front-end's own files are fetched live.

import fs from 'node:fs';
import path from 'node:path';

export const FRONTENDS = {
  // What customers have.
  released: {
    id: 'released',
    origin: 'https://web.protegus.app',
    staticHosts: ['web.protegus.app'],
    labelsApi: 'https://web.protegus.app/v3/api', // public label packs, read-only, no token
    labelsDir: 'translations',
  },
  // The beta line. Its newer API client sends every call through a region router
  // (region-router.trikdis.workers.dev); the older one, and icon URLs, use the region's own host
  // (web.protegus.app for the sample's EU region). Label packs are the EU server's plus the keys only the
  // beta server has yet (labels for fields only the beta shows); the beta server's own wording names its
  // region, North America, so it is not used for keys the EU server has (fetch-public.mjs).
  beta: {
    id: 'beta',
    origin: 'https://beta2.protegus.app',
    staticHosts: ['beta2.protegus.app', 'web.protegus.app'],
    labelsApi: 'https://api.beta2.protegus.app/v3/api',
    labelsDir: 'translations-beta',
    fixtureSuffix: '-beta', // e.g. sp5-beta.json, when the beta server's config/read is shaped differently
  },
};

export function frontend(id = 'released') {
  const fe = FRONTENDS[id];
  if (!fe) throw new Error(`Unknown --app ${id}. Known: ${Object.keys(FRONTENDS).join(', ')}`);
  return fe;
}

// The sample configuration for this front-end: its own shape if there is one, else the released one.
export function configFixture(dir, file, fe) {
  if (!fe.fixtureSuffix) return { file, own: true };
  const own = file.replace(/\.json$/, `${fe.fixtureSuffix}.json`);
  return fs.existsSync(path.join(dir, own)) ? { file: own, own: true } : { file, own: false };
}
