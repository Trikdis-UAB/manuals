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
    // The beta's skin, and the released colour for each shade (--theme released). The beta build sets
    // two theme colours (indigo #6067cd, orange #f96432) where the released one has blue #0070a7 and
    // pink #ef476f, and its compiled styles carry their hover, pressed and disabled shades. Each pair
    // was found by reading the same CSS rule in both builds (main-WF7OQQHA vs main-AJDMRO5K,
    // 2026-10-19); every derived shade occurs equally often in both. Beta-only colours that are not the
    // theme (the camera zones' yellow, a warning's brown) are left alone. Verified: pages whose text is
    // the same in both front-ends came out pixel-identical to the released app (desktop below the top
    // bar, and phone), so this is the default; customers get these colours when the features ship.
    defaultTheme: 'released',
    releasedColours: [
      ['#f96432', '#ef476f'], ['#f84e14', '#ed2b59'], ['#bf3406', '#bf113a'], ['#d29d8c', '#ce9ba7'], ['#fb9c7c', '#f58da6'],
      ['#baa9a4', '#b7b2b3'], ['#6067cd', '#0070a7'], ['#4951c6', '#005b88'], ['#303697', '#002c41'], ['#aeafb2', '#3780a4'],
    ],
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
