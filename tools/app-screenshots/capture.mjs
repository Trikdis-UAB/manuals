// Screenshots of Protegus app configurator screens, from the released web app, with sample data.
//
//   node capture.mjs --model GET --lang en --layout phone [--screen panel-tlf,events] [--out out]
//                    [--fw 1.35 --revision x1x1]
//
// Writes PNGs to <out>/<lang>/ and merges one record per image into <out>/manifest.json.
// See README.md for the safety rules and for adding screens.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { openApp, routerGo, settle, contentBottom, LAYOUTS } from './lib/app.mjs';
import { MODELS, SAMPLE, sampleFirmware, setFirmware, sampleVersion } from './lib/sample.mjs';
import { readJson, APP_ORIGIN } from './lib/guard.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs(process.argv.slice(2));
const model = args.model ?? 'GET';
const langs = (args.lang ?? 'en').split(',');
const layouts = (args.layout ?? 'desktop,phone').split(',');
const outDir = path.resolve(ROOT, args.out ?? 'out');
if (!MODELS[model]) throw new Error(`Unknown model ${model}. Known: ${Object.keys(MODELS).join(', ')}`);
const def = readJson(ROOT, 'screens', `${MODELS[model].configurator}.json`);
setFirmware(model, { firmware: args.fw, revision: args.revision });
const defaultRevision = MODELS[model].revision;
if (!MODELS[model].confirmed && !args.fw) {
  console.log(`NOTE firmware ${MODELS[model].firmware} for ${model} is a placeholder; pass --fw and --revision with the current release`);
}
const screens = def.screens
  .filter((s) => !args.screen || args.screen.split(',').includes(s.id))
  .filter((s) => !s.onlyModels || s.onlyModels.includes(model));
if (!screens.length) throw new Error(`No screens to capture for ${model}${args.screen ? ` (${args.screen})` : ''}`);

// Public label packs and reference lists are not committed; fetch them if this checkout lacks them.
const missing = langs.filter((l) => !fs.existsSync(path.join(ROOT, 'fixtures/translations', `${def.configurator}.${l}.json`)));
if (missing.length || !fs.existsSync(path.join(ROOT, 'fixtures/public/regions.json'))) {
  execFileSync(process.execPath, [path.join(ROOT, 'fetch-public.mjs'), ...langs], { stdio: 'inherit' });
}

// The read-only POSTs the app makes on this path (answered locally like everything else).
const SAFE_POSTS = new Set(['POST /translations', 'POST /get-pgm-icon-paths', 'POST /get-system', 'POST /config/read', 'POST /config/time/read', 'POST /get-system-status-new']);

const appBuild = await releasedBuild();
const modelSlug = model.toLowerCase().replace('+', '-plus');
const records = [];
let problems = 0;

for (const lang of langs) {
  const t = labels(lang, def.configurator);
  fs.mkdirSync(path.join(outDir, lang), { recursive: true });
  for (const layout of layouts) {
    for (const screen of screens) {
      if (screen.layouts && !screen.layouts.includes(layout)) continue;
      // A screen whose fields depend on the hardware revision is captured once per revision,
      // with the revision in the file name. Others use the model's default revision.
      for (const revision of screen.revisions ?? [null]) {
        setFirmware(model, { revision: revision ?? defaultRevision });
        const id = revision ? `${screen.id}-${revision}` : screen.id;
        const label = `${lang} ${layout} ${model} ${id}`;
        const app = await openApp({ lang, model, layout, skipAdvancedIntro: screen.kind !== 'intro', configPatch: screen.config, storage: seedStorage() });
        const { page, browser, guard, errors } = app;
        try {
          const appPath = await walkTo(page, t, screen);
          await settle(page, 800);
          const base = `${modelSlug}-${id}`;
          const shots = [{ variant: layout, file: `${base}-${layout}.png` }];
          // g16 opens in the right-hand column of the desktop layout, so that column is also cut out.
          if (layout === 'desktop' && def.flow !== 'configuration') shots.push({ variant: 'desktop-panel', file: `${base}-desktop-panel.png`, selector: 'app-company-mobile-host' });
          for (const s of shots) records.push(await shoot(page, { s, layout, screen, id, revision, lang, appPath, label }));
          const issues = [...guard.unmocked.keys()].map((k) => `unmocked ${k}`).concat(errors.map((e) => `pageerror ${e}`));
          if (issues.length) { problems++; console.log(`WARN ${label}: ${issues.join('; ')}`); }
          console.log(`ok   ${label} -> ${shots.map((s) => s.file).join(', ')}`);
          if (args.verbose) printSafety(guard);
          else if (guard.unmocked.size || [...guard.mocked.keys()].some((k) => !k.startsWith('GET ') && !SAFE_POSTS.has(k))) printSafety(guard);
        } catch (e) {
          problems++;
          const file = path.join(outDir, lang, `ERROR-${modelSlug}-${id}-${layout}.png`);
          await page.screenshot({ path: file }).catch(() => {});
          console.log(`FAIL ${label}: ${e.message.split('\n')[0]} (see ${path.relative(ROOT, file)})`);
        } finally {
          await browser.close();
        }
      }
    }
  }
}
setFirmware(model, { revision: defaultRevision });

writeManifest(records);
console.log(`\n${records.length} image(s), ${problems} problem(s). Manifest: ${path.relative(ROOT, path.join(outDir, 'manifest.json'))}`);
process.exit(problems ? 1 : 0);

// --- steps -------------------------------------------------------------------------------

// System list -> system -> Advanced settings [-> Read -> menu items]. Same path a person takes.
// Returns the labels of the menu items clicked, as the app shows them.
async function walkTo(page, t, screen) {
  await page.getByText('Sample system', { exact: true }).first().click({ timeout: 15000 });
  await page.waitForURL((u) => u.pathname.endsWith(`/${SAMPLE.systemId}`), { timeout: 15000 });
  await settle(page, 300);
  const systemBase = new URL(page.url()).pathname; // /d/company/systems/<id> or /a/<id>
  const desktop = page.viewportSize().width >= 1150; // the app's own desktop/phone switch
  // The newer configurator reads by itself on desktop as soon as Advanced settings opens it.
  const autoRead = def.flow === 'configuration' && desktop && screen.kind !== 'intro'
    ? page.waitForResponse((r) => r.url().includes('/v3/api/config/read'), { timeout: 30000 }) : null;
  await routerGo(page, `${systemBase}/settings/advanced`);
  if (screen.kind === 'intro') {
    // The warning page stays on settings/advanced until the user accepts it.
    await page.getByText(t(screen.waitFor), { exact: true }).first().waitFor({ timeout: 10000 });
    return [t('systems.menu.advancedSettings')];
  }
  if (def.flow === 'configuration') return walkConfiguration(page, t, screen, { desktop, autoRead });
  await page.waitForURL((u) => u.pathname.endsWith(`/configure/${def.configurator}`), { timeout: 15000 });
  await settle(page, 500);
  const read = page.waitForResponse((r) => r.url().includes('/v3/api/config/read'));
  await page.getByText(t('configurators.buttons.readConfig'), { exact: true }).click({ timeout: 10000 });
  await read;
  await settle(page, 800);
  const appPath = [t('systems.menu.advancedSettings')];
  // Menu labels are clicked inside the configurator only: on desktop "Settings" is also a top-bar item.
  const configurator = page.locator('app-ui-container').first();
  for (const key of screen.menu ?? []) {
    const text = t(key);
    await configurator.getByText(text, { exact: true }).first().click({ timeout: 10000 });
    appPath.push(text);
    await settle(page, 300);
  }
  for (const text of screen.click ?? []) { // items labelled by data rather than a label key
    await configurator.getByText(text, { exact: true }).first().click({ timeout: 10000 });
    appPath.push(text);
    await settle(page, 300);
  }
  const route = screen.route ?? '';
  const want = `/configure/${def.configurator}${route ? '/' + route : ''}`;
  await page.waitForURL((u) => u.pathname.endsWith(want), { timeout: 10000 });
  if (screen.waitFor) await page.getByText(t(screen.waitFor), { exact: true }).first().waitFor({ timeout: 10000 });
  return appPath;
}

// The newer configurator (SP5): desktop has a sidebar menu and has already read; the phone shows
// the menu with a Read button. Menu labels are clicked inside the sidebar navigation only.
async function walkConfiguration(page, t, screen, { desktop, autoRead }) {
  if (desktop) {
    await autoRead;
    await page.waitForURL((u) => u.pathname.includes(`/${def.base}/`), { timeout: 15000 });
  } else {
    await page.waitForURL((u) => u.pathname.endsWith(`/${def.base}`), { timeout: 15000 });
    await settle(page, 500);
    const read = page.waitForResponse((r) => r.url().includes('/v3/api/config/read'));
    await page.locator('app-configuration-layout-sidebar').getByText(t('configurators.buttons.readConfig'), { exact: true }).first().click({ timeout: 10000 });
    await read;
  }
  await settle(page, 800);
  const nav = page.locator('app-configuration-layout-sidebar-navigation').first();
  const appPath = [t('systems.menu.advancedSettings')];
  const labelsToClick = (screen.menu ?? []).map((k) => t(k));
  for (let i = 0; i < labelsToClick.length; i++) {
    const text = labelsToClick[i];
    const next = labelsToClick[i + 1];
    // A group that is already open would close on a click, so open it only if its child is hidden.
    if (!next || !(await nav.getByText(next, { exact: true }).first().isVisible())) {
      await nav.getByText(text, { exact: true }).first().click({ timeout: 10000 });
      await settle(page, 300);
    }
    appPath.push(text);
  }
  const route = screen.route ?? '';
  const want = `/${def.base}${route ? '/' + route : ''}`;
  await page.waitForURL((u) => u.pathname.endsWith(want), { timeout: 10000 });
  await settle(page, screen.settleMs ?? 2000); // status calls run after the page opens
  return appPath;
}

function seedStorage() {
  if (def.flow !== 'configuration') return {};
  // Marks the sample device as configured over the cloud, as the desktop flow records it; without
  // it the pages take the USB path and never ask for live status.
  return { configuration_devices: [{ name: 'Sample system', version: sampleVersion(model), uid: SAMPLE.imei, timestamp: Date.UTC(2026, 9, 6, 9, 30), connection: 'cloud' }] };
}

async function shoot(page, { s, layout, screen, id, revision, lang, appPath, label }) {
  const file = path.join(outDir, lang, s.file);
  const opts = { path: file, animations: 'disabled', caret: 'hide' };
  let crop = null;
  if (s.selector) {
    await page.locator(s.selector).first().screenshot(opts);
  } else if (layout === 'phone' || def.flow === 'configuration') {
    // Pages longer than the window are rendered whole: the window is made taller, then the image is
    // cut 24 px below the last card. Phone images are always cut there (the manual shows them at
    // 320 px wide); desktop images keep the full window when the page fits.
    crop = await contentBottom(page);
    const { width, height } = LAYOUTS[layout].viewport;
    if (crop.overflows) {
      await page.setViewportSize({ width, height: Math.min(crop.bottom + 24, 3000) });
      await settle(page, 500);
      const again = await contentBottom(page);
      crop = { ...again, overflows: true };
      console.log(`note ${label}: page is longer than one ${layout} screen; image is ${Math.min(again.bottom + 24, 3000)} CSS px tall`);
    }
    crop.height = crop.overflows ? Math.min(crop.bottom + 24, 3000) : layout === 'phone' ? Math.min(height, crop.bottom + 24) : height;
    await page.screenshot({ ...opts, clip: { x: 0, y: 0, width, height: crop.height } });
  } else {
    await page.screenshot(opts);
  }
  const fw = sampleFirmware(model);
  return {
    screen: id,
    configurator: def.configurator,
    appPath,
    model,
    hwId: MODELS[model].hwId,
    firmware: fw.firmware,
    revision: fw.revision,
    firmwareConfirmed: Boolean(MODELS[model].confirmed || args.fw),
    ...(revision ? { variantOf: screen.id } : {}),
    ...(screen.unverified ? { unverified: screen.unverified } : {}),
    language: lang,
    layout: s.variant,
    file: path.relative(outDir, file),
    viewport: LAYOUTS[layout].viewport,
    deviceScaleFactor: LAYOUTS[layout].deviceScaleFactor,
    ...(crop ? { croppedToCss: { width: LAYOUTS[layout].viewport.width, height: crop.height }, [layout === 'phone' ? 'tallerThanPhoneScreen' : 'tallerThanWindow']: crop.overflows } : {}),
    appUrl: new URL(page.url()).pathname,
    appBuild,
    sampleData: true,
    capturedAt: new Date().toISOString(),
  };
}

// --- helpers -----------------------------------------------------------------------------

function labels(lang, configurator) {
  const load = (pack) => {
    const f = path.join(ROOT, 'fixtures/translations', `${pack}.${lang}.json`);
    if (!fs.existsSync(f)) throw new Error(`Missing ${path.relative(ROOT, f)}. Run: node fetch-public.mjs ${lang}`);
    return JSON.parse(readJson(f).translations);
  };
  const all = { ...load('app'), ...load(configurator) };
  return (key) => {
    if (!(key in all)) throw new Error(`No label for ${key} in ${lang}`);
    return all[key].replace(/&apos;/g, "'").replace(/&quot;/g, '"');
  };
}

async function releasedBuild() {
  // The web build has no version number of its own (appVersion is 0.0(0); it is set only for the
  // native apps), so the bundle hash and its deploy date are the identifiers.
  const html = await (await fetch(APP_ORIGIN + '/')).text();
  const main = html.match(/main[-.][0-9A-Za-z]+\.js/)?.[0] ?? 'unknown';
  let deployed = null;
  if (main !== 'unknown') {
    const lm = (await fetch(`${APP_ORIGIN}/${main}`, { method: 'HEAD' })).headers.get('last-modified');
    deployed = lm ? new Date(lm).toISOString().slice(0, 10) : null;
  }
  return { bundle: main, deployed };
}

function writeManifest(newRecords) {
  const file = path.join(outDir, 'manifest.json');
  const prev = fs.existsSync(file) ? readJson(file) : { images: [] };
  const old = prev.images;
  // Per configurator, so a GET run and an SP5 run don't overwrite each other's notes.
  const byConfigurator = (v) => (Array.isArray(v) ? { g16: v } : v ?? {});
  const key = (r) => `${r.language}|${r.file}`;
  const fresh = new Set(newRecords.map(key));
  const images = [...old.filter((r) => !fresh.has(key(r))), ...newRecords]
    .sort((a, b) => key(a).localeCompare(key(b)));
  const manifest = {
    about: 'Protegus app screenshots with sample data, from the released web app (web.protegus.app). Generated by tools/app-screenshots/capture.mjs.',
    liveOnly: { ...byConfigurator(prev.liveOnly), [def.configurator]: def.liveOnly },
    notShown: { ...byConfigurator(prev.notShown), [def.configurator]: def.notShown ?? [] },
    images,
  };
  fs.writeFileSync(file, JSON.stringify(manifest, null, 2) + '\n');
}

function printSafety(g) {
  const fmt = (m) => [...m.entries()].map(([k, v]) => (v > 1 ? `${k} x${v}` : k)).join(', ') || 'none';
  console.log(`     answered locally: ${fmt(g.mocked)}`);
  console.log(`     fetched live (static GET): ${fmt(g.fetched)}`);
  console.log(`     refused: ${fmt(g.refused)}`);
}

function parseArgs(a) {
  const o = {};
  for (let i = 0; i < a.length; i++) if (a[i].startsWith('--')) o[a[i].slice(2)] = a[i + 1]?.startsWith('--') || a[i + 1] === undefined ? true : a[++i];
  return o;
}
