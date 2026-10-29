// Screenshots of Protegus app configurator screens, from the released web app (or the beta with
// --app beta), with sample data.
//
//   node capture.mjs --model GET --lang en --layout phone [--screen panel-tlf,events] [--out out]
//                    [--fw 1.35 --revision x1x1] [--app beta]
//
// Writes PNGs to <out>/<lang>/ and merges one record per image into <out>/manifest.json. Beta images
// go to out/beta/ unless --out says otherwise, so they never replace released ones.
// See README.md for the safety rules and for adding screens.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { openApp, routerGo, settle, contentBottom, LAYOUTS } from './lib/app.mjs';
import { MODELS, SAMPLE, sampleFirmware, setFirmware, sampleVersion, sampleUid } from './lib/sample.mjs';
import { readJson } from './lib/guard.mjs';
import { frontend, configFixture } from './lib/frontends.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs(process.argv.slice(2));
const model = args.model ?? 'GET';
const langs = (args.lang ?? 'en').split(',');
const layouts = (args.layout ?? 'desktop,phone').split(',');
const fe0 = frontend(args.app ?? 'released');
// --theme released: the beta build in the released app's colours (lib/frontends.mjs); --theme own: its own skin.
const theme = args.theme ?? fe0.defaultTheme ?? 'own';
if (!['own', 'released'].includes(theme)) throw new Error(`Unknown --theme ${theme}. Known: own, released`);
const fe = theme === 'released' && fe0.releasedColours ? { ...fe0, recolour: fe0.releasedColours } : fe0;
const outDir = path.resolve(ROOT, args.out ?? (fe.id === 'released' ? 'out' : `out/${fe.id}`));
if (!MODELS[model]) throw new Error(`Unknown model ${model}. Known: ${Object.keys(MODELS).join(', ')}`);
const cfg = MODELS[model].configurator;
// --flow picks a screen list that is not tied to one configurator (e.g. the add-system wizard).
const def = readJson(ROOT, 'screens', `${args.flow ?? cfg}.json`);
if (def.models && !def.models.includes(model)) throw new Error(`${args.flow ?? cfg}.json does not cover ${model}`);
setFirmware(model, { firmware: args.fw, revision: args.revision });
const defaultRevision = MODELS[model].revision;
if (!MODELS[model].firmwareConfirmed && !args.fw) {
  console.log(`NOTE firmware ${MODELS[model].firmware} for ${model} is a placeholder; pass --fw and --revision with the current release`);
}
if (!MODELS[model].revisionConfirmed && !args.revision) console.log(`NOTE the hardware revision for ${model} is not confirmed`);
const screens = (def.screens ?? [])
  .filter((s) => !args.screen || args.screen.split(',').includes(s.id))
  .filter((s) => !s.onlyModels || s.onlyModels.includes(model))
  .filter((s) => !s.onlyApps || s.onlyApps.includes(args.app ?? 'released'));
if (def.flow !== 'walk' && !screens.length) throw new Error(`No screens to capture for ${model}${args.screen ? ` (${args.screen})` : ''}`);

// Public label packs and reference lists are not committed; fetch them if this checkout lacks them.
const missing = langs.filter((l) => !fs.existsSync(path.join(ROOT, 'fixtures', fe.labelsDir, `${cfg}.${l}.json`)));
if (missing.length || ['regions', 'reactions'].some((n) => !fs.existsSync(path.join(ROOT, `fixtures/public/${n}.json`)))) {
  execFileSync(process.execPath, [path.join(ROOT, 'fetch-public.mjs'), ...langs, '--app', fe.id], { stdio: 'inherit' });
}
const fixture = configFixture(path.join(ROOT, 'fixtures/config'), MODELS[model].fixture, fe);
if (!fixture.own) console.log(`NOTE no ${fe.id}-shaped sample for ${model}; using ${fixture.file}, shaped like the released server's answer`);

// The read-only POSTs the app makes on this path (answered locally like everything else).
const SAFE_POSTS = new Set(['POST /translations', 'POST /get-pgm-icon-paths', 'POST /get-reactions', 'POST /get-system', 'POST /config/read', 'POST /config/time/read', 'POST /get-system-status-new',
  'POST /get-system-info-new', 'POST /create-system', 'POST /area']); // the last three: the wizard, answered locally

// Tallest page image, in CSS px. SP5 System options on a phone is about 3,100.
const MAX_CSS_HEIGHT = 5000;

const appBuild = await deployedBuild(fe.origin);
const modelSlug = model.toLowerCase().replace('+', '-plus');
const records = [];
let problems = 0;

for (const lang of langs) {
  const t = labels(lang, cfg);
  if (def.flow === 'walk') { await runWalks(lang, t); continue; }
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
        const app = await openOrFail(label, { lang, model, layout, skipAdvancedIntro: screen.kind !== 'intro', configPatch: screen.config, storage: seedStorage(), frontend: fe });
        if (!app) continue;
        const { page, browser, guard, errors, mocks } = app;
        try {
          const appPath = await walkTo(page, t, screen);
          await settle(page, 800);
          if (screen.steps) appPath.push(...await runSteps(page, t, screen.steps));
          const base = `${modelSlug}-${id}`;
          // A pop-up or a single card is cut out of the page (screen.crop: its CSS selector).
          const shots = [{ variant: layout, file: `${base}-${layout}.png`, ...(screen.crop ? { crop: screen.crop, isolate: screen.isolate, keepFocus: screen.keepFocus } : {}) }];
          // g16 opens in the right-hand column of the desktop layout, so that column is also cut out.
          if (layout === 'desktop' && def.flow !== 'configuration') shots.push({ variant: 'desktop-panel', file: `${base}-desktop-panel.png`, selector: 'app-company-mobile-host' });
          // The newer configurator fills the window under the app's top bar (logo, region, account);
          // the same page without that bar, for manuals that should not show it (e.g. the beta's logo).
          if (layout === 'desktop' && def.flow === 'configuration' && screen.kind !== 'intro' && !screen.crop) shots.push({ variant: 'desktop-content', file: `${base}-desktop-content.png`, below: 'app-company-header' });
          for (const s of shots) records.push(await shoot(page, { s, layout, screen, id, revision, lang, appPath, label }));
          const issues = runIssues(guard, errors, mocks);
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

// A walk is one pass through the app in a fresh browser; each {shot} step saves an image.
async function runWalks(lang, t) {
  const perLang = Object.fromEntries(Object.entries(def.values ?? {}).map(([k, v]) => [k, typeof v === 'object' ? (v[lang] ?? v.en) : v]));
  const values = { imei: sampleUid(model), model, ...perLang };
  const fillIn = (v) => String(v).replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`);
  const wanted = args.screen ? args.screen.split(',') : null;
  for (const layout of layouts) {
    if (def.layouts && !def.layouts.includes(layout)) { console.log(`skip ${layout}: ${args.flow} is captured in ${def.layouts.join(', ')} only`); continue; }
    for (const walk of def.walks) {
      if (wanted && !wanted.some((id) => id === walk.id || walk.steps.some((st) => st.shot === id))) continue;
      const label = `${lang} ${layout} ${model} ${walk.id}`;
      // The sample state this walk needs (lib/mocks.mjs, createMocks): the flow's system plus the walk's changes.
      const scenario = { sampleSystem: def.sampleSystem, system: walk.system, zoneStatus: walk.zoneStatus, openZones: walk.openZones, deviceOffline: walk.deviceOffline };
      const app = await openOrFail(label, { lang, model, layout, timezoneId: def.timezones?.[lang], frontend: fe, scenario });
      if (!app) continue;
      const { page, browser, guard, errors, mocks } = app;
      const files = [];
      try {
        for (const step of walk.steps) {
          if (step.eval) await page.evaluate(step.eval);
          if (step.fill) await page.locator(step.fill.css).nth(step.fill.nth ?? 0).fill(fillIn(step.fill.value), { timeout: 10000 });
          if (step.click) await clickStep(page, t, step.click);
          if (step.waitUrl) await page.waitForURL((u) => u.pathname.endsWith(step.waitUrl), { timeout: 20000 });
          await settle(page, step.shot ? 1000 : 400);
          if (!step.shot) continue;
          // Screens that do not depend on the device are named by the flow (filePrefix), not the model.
          const s = { variant: layout, file: `${def.filePrefix ?? modelSlug}-${step.shot}-${layout}.png` };
          const rec = await shoot(page, { s, layout, screen: { id: step.shot, unverified: step.unverified, fullScreen: step.fullScreen, sheet: step.sheet }, id: step.shot, revision: null, lang,
            appPath: step.title ? [t(step.title)] : [], label: `${label} ${step.shot}` });
          rec.walk = walk.id;
          if (def.sampleNote) rec.sample = def.sampleNote;
          if (step.note) rec.note = step.note;
          records.push(rec);
          files.push(s.file);
        }
        const issues = runIssues(guard, errors, mocks);
        if (issues.length) { problems++; console.log(`WARN ${label}: ${issues.join('; ')}`); }
        console.log(`ok   ${label} -> ${files.join(', ')}`);
      } catch (e) {
        problems++;
        const file = path.join(outDir, lang, `ERROR-${def.filePrefix ?? modelSlug}-${walk.id}-${layout}.png`);
        await page.screenshot({ path: file }).catch(() => {});
        console.log(`FAIL ${label} after ${files.length} image(s): ${e.message.split('\n')[0]} (see ${path.relative(ROOT, file)})`);
      } finally {
        await browser.close();
      }
    }
  }
}

// Steps after a page has opened, to reach a pop-up and set its state. Each step is one of:
//   {text|label|css, within?, row?, nth?, exact?}  click (label = a label key; row = a table row's text;
//                                                  css + hasText: the match containing that text)
//   {fill: css, value, within?, nth?}             type into a field
// plus wait (ms, default 600) and settle: false for screens that never go quiet (polling).
// Returns the texts clicked, for the manifest's appPath.
async function runSteps(page, t, steps) {
  const path = [];
  for (const st of steps) {
    let scope = st.within ? page.locator(st.within).last() : page;
    // Table rows are div.table-row; the same data is also laid out as phone cards, hidden on desktop.
    if (st.row) scope = scope.locator('div.table-row, tr').filter({ hasText: st.row, visible: true }).first();
    if (st.fill) {
      await scope.locator(st.fill).nth(st.nth ?? 0).fill(String(st.value), { timeout: 10000 });
    } else {
      const text = st.label ? t(st.label) : st.text;
      let loc = st.css ? scope.locator(st.css) : scope.getByText(text, { exact: st.exact ?? true });
      if (st.css && st.hasText) loc = loc.filter({ hasText: st.hasText }); // e.g. a dropdown's .item
      await loc.nth(st.nth ?? 0).click({ timeout: 10000 });
      if (text && !st.hidden) path.push(text);
    }
    if (st.settle === false) await page.waitForTimeout(st.wait ?? 1000);
    else await settle(page, st.wait ?? 600);
  }
  return path;
}

// A pop-up or card on its own. The window is made taller first when the element scrolls inside or
// runs past the window, so the whole element is drawn. isolate: only the element is painted, on a
// transparent background, so a pop-up's rounded corners do not carry the dimmed page behind it.
async function shootElement(page, s, layout, opts) {
  const el = page.locator(s.crop).first();
  await el.waitFor({ timeout: 10000 });
  const need = await el.evaluate((e) => {
    let extra = 0;
    for (const x of [e, ...e.querySelectorAll('*')]) {
      if (/(auto|scroll)/.test(getComputedStyle(x).overflowY) && x.scrollHeight > x.clientHeight + 1) extra = Math.max(extra, x.scrollHeight - x.clientHeight);
    }
    return { extra, bottom: e.getBoundingClientRect().bottom };
  });
  const { width, height } = LAYOUTS[layout].viewport;
  if (need.extra > 0 || need.bottom > height) {
    await page.setViewportSize({ width, height: Math.min(Math.max(height + need.extra, need.bottom) + 120, MAX_CSS_HEIGHT) });
    await settle(page, 500);
  }
  // No focus ring on the last field typed into (keepFocus: an open dropdown would close).
  if (!s.keepFocus) await page.evaluate(() => document.activeElement?.blur());
  if (s.isolate) {
    await page.addStyleTag({ content: `html, body { background: transparent !important; } body * { visibility: hidden !important; }
      ${s.crop}, ${s.crop} * { visibility: visible !important; }` });
  }
  await el.screenshot({ ...opts, omitBackground: Boolean(s.isolate) });
}

async function clickStep(page, t, c) {
  let loc;
  if (c.css && c.hasText) loc = page.locator(c.css).filter({ hasText: t(c.hasText) });
  else if (c.css && c.text) loc = page.locator(c.css).filter({ hasText: c.text }); // text from the sample data, e.g. an area name
  else if (c.css) loc = page.locator(c.css);
  else loc = page.getByText(c.label ? t(c.label) : c.text, { exact: c.exact ?? true });
  if (c.inner) loc = loc.locator(c.inner);
  await loc.first().click({ timeout: 10000 });
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
  } else if (s.crop) {
    await shootElement(page, s, layout, opts);
  } else if (screen.fullScreen) {
    await page.screenshot(opts); // pages whose background is part of the design (the system dashboard)
  } else if (screen.sheet) {
    // A bottom sheet and a strip of the dimmed screen above it (sheet: its CSS selector and the strip in CSS px).
    const { width, height } = LAYOUTS[layout].viewport;
    const top = await page.locator(screen.sheet.css).first().evaluate((e) => e.getBoundingClientRect().top);
    const y = Math.max(0, Math.floor(top - (screen.sheet.above ?? 120)));
    await page.screenshot({ ...opts, clip: { x: 0, y, width, height: height - y } });
    crop = { top: y, height };
  } else if (layout === 'phone' || def.flow === 'configuration') {
    // Pages longer than the window are rendered whole: the window is made taller, then the image is
    // cut 24 px below the last card. Phone images are always cut there (the manual shows them at
    // 320 px wide); desktop images keep the full window when the page fits.
    crop = await contentBottom(page);
    const { width, height } = LAYOUTS[layout].viewport;
    if (crop.overflows) {
      await page.setViewportSize({ width, height: Math.min(crop.bottom + 24, MAX_CSS_HEIGHT) });
      await settle(page, 500);
      const again = await contentBottom(page);
      crop = { ...again, overflows: true };
      console.log(`note ${label}: page is longer than one ${layout} screen; image is ${Math.min(again.bottom + 24, MAX_CSS_HEIGHT)} CSS px tall`);
    }
    crop.height = crop.overflows ? Math.min(crop.bottom + 24, MAX_CSS_HEIGHT) : layout === 'phone' ? Math.min(height, crop.bottom + 24) : height;
    crop.top = s.below ? Math.ceil(await page.locator(s.below).first().evaluate((e) => e.getBoundingClientRect().bottom)) : 0;
    await page.screenshot({ ...opts, clip: { x: 0, y: crop.top, width, height: crop.height - crop.top } });
    // Back to the normal window, so the next image of this page is measured the same way.
    if (crop.overflows) { await page.setViewportSize(LAYOUTS[layout].viewport); await settle(page, 500); }
  } else {
    await page.screenshot(opts);
  }
  if (args.text && s.variant === layout) fs.writeFileSync(file.replace(/\.png$/, '.txt'), await pageText(page));
  const fw = sampleFirmware(model);
  return {
    screen: id,
    configurator: def.configurator,
    appPath,
    model,
    hwId: MODELS[model].hwId,
    firmware: fw.firmware,
    revision: fw.revision,
    firmwareConfirmed: Boolean(MODELS[model].firmwareConfirmed || args.fw),
    revisionConfirmed: Boolean(MODELS[model].revisionConfirmed || args.revision),
    ...(revision ? { variantOf: screen.id } : {}),
    ...(screen.unverified ? { unverified: screen.unverified } : {}),
    language: lang,
    layout: s.variant,
    file: path.relative(outDir, file),
    viewport: LAYOUTS[layout].viewport,
    deviceScaleFactor: LAYOUTS[layout].deviceScaleFactor,
    ...(s.crop ? { croppedTo: s.crop } : {}),
    ...(crop ? { croppedToCss: { ...(crop.top ? { top: crop.top } : {}), width: LAYOUTS[layout].viewport.width, height: crop.height - crop.top }, [layout === 'phone' ? 'tallerThanPhoneScreen' : 'tallerThanWindow']: crop.overflows } : {}),
    appUrl: new URL(page.url()).pathname,
    frontend: fe.id,
    ...(fe.releasedColours ? { theme: fe.recolour ? 'released colours on this build' : `${fe.id} colours` } : {}),
    appBuild,
    labels: labelsInfo(lang),
    sampleConfig: fixture.file,
    sampleData: true,
    capturedAt: new Date().toISOString(),
  };
}

// --- helpers -----------------------------------------------------------------------------

// --text: the page's visible text and field values, one per line, beside the image. For comparing two
// front-ends or releases screen by screen (images differ in theme alone) and for writing alt text.
// The app's top bar and the configurator menu are left out; password fields are never read.
async function pageText(page) {
  return page.evaluate(() => {
    const skip = new Set(['APP-COMPANY-HEADER', 'APP-CONFIGURATION-LAYOUT-SIDEBAR']);
    const out = [];
    const walk = (el) => {
      if (skip.has(el.tagName)) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      if (el.matches('input, textarea, select')) {
        if (el.type === 'checkbox' || el.type === 'radio') out.push(el.checked ? '[on]' : '[off]');
        else if (el.type !== 'password') out.push(`[${el.value}]`);
        return;
      }
      for (const n of el.childNodes) {
        if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) out.push(t); }
        else if (n.nodeType === 1) walk(n);
      }
    };
    walk(document.body);
    return out.join('\n') + '\n';
  });
}

// A browser on the app, or null when the app would not load (counted as a problem; the run goes on).
async function openOrFail(label, opts) {
  try {
    return await openApp(opts);
  } catch (e) {
    problems++;
    console.log(`FAIL ${label}: the app did not load: ${e.message.split('\n')[0]}`);
    return null;
  }
}

// Calls with no sample answer, uncaught exceptions, and errors the app reported to its own error
// endpoint (answered locally, never sent).
function runIssues(guard, errors, mocks) {
  return [...guard.unmocked.keys()].map((k) => `unmocked ${k}`)
    .concat(errors.map((e) => `pageerror ${e}`))
    .concat([...new Set(mocks.appErrors)].map((e) => `app error ${e}`))
    .concat(fe.recolour && !guard.recoloured.size ? ['no theme colour was found to swap; the build\'s colours may have changed (lib/frontends.mjs)'] : []);
}

function labels(lang, configurator) {
  const load = (pack) => {
    const f = path.join(ROOT, 'fixtures', fe.labelsDir, `${pack}.${lang}.json`);
    if (!fs.existsSync(f)) throw new Error(`Missing ${path.relative(ROOT, f)}. Run: node fetch-public.mjs ${lang} --app ${fe.id}`);
    return JSON.parse(readJson(f).translations);
  };
  const all = { ...load('app'), ...load(configurator) };
  return (key) => {
    if (!(key in all)) throw new Error(`No label for ${key} in ${lang}`);
    return all[key].replace(/&apos;/g, "'").replace(/&quot;/g, '"');
  };
}

// Where the label pack came from; a beta pack is the EU server's plus keys only the beta server has.
function labelsInfo(lang) {
  const read = (pack) => readJson(ROOT, 'fixtures', fe.labelsDir, `${pack}.${lang}.json`);
  const app = read('app');
  const info = { server: app._merged?.base ?? new URL(fe.labelsApi).host, version: app._merged?.baseVersion ?? app.version ?? null };
  if (!app._merged) return info;
  const added = [...new Set([...app._merged.addedKeys, ...read(cfg)._merged.addedKeys])];
  return { ...info, addedFrom: app._merged.addedFrom, addedVersion: app._merged.addedVersion, addedKeys: added.length };
}

async function deployedBuild(origin) {
  // The web build has no version number of its own (appVersion is 0.0(0); it is set only for the
  // native apps), so the bundle hash and its deploy date are the identifiers.
  const html = await (await fetch(origin + '/')).text();
  const main = html.match(/main[-.][0-9A-Za-z]+\.js/)?.[0] ?? 'unknown';
  let deployed = null;
  if (main !== 'unknown') {
    const lm = (await fetch(`${origin}/${main}`, { method: 'HEAD' })).headers.get('last-modified');
    deployed = lm ? new Date(lm).toISOString().slice(0, 10) : null;
  }
  return { origin, bundle: main, deployed };
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
    about: fe.id === 'released'
      ? 'Protegus app screenshots with sample data, from the released web app (web.protegus.app). Generated by tools/app-screenshots/capture.mjs.'
      : `Protegus app screenshots with sample data, from the ${fe.id} front-end (${new URL(fe.origin).host}), not the released app. Generated by tools/app-screenshots/capture.mjs --app ${fe.id}.`,
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
