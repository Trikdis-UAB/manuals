// Scratch helper: run a list of UI steps and screenshot after each one (out/step/<layout>/).
//   node scratch/step.mjs desktop '[{"text":"Sample system"},{"go":"/d/..."},{"css":"#di_read"}]'
import fs from 'node:fs';
import { openApp, routerGo, settle } from '../lib/app.mjs';

const layout = process.argv[2] ?? 'desktop';
const steps = JSON.parse(process.argv[3] ?? '[]');
const dir = `out/step/${layout}`;
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
const quiet = /me\?|regions|pgm-icon|widget|systems-with/;
const { browser, page, guard, errors } = await openApp({
  lang: 'en', model: process.env.MODEL ?? 'GET', layout, log: (m) => { if (!quiet.test(m)) console.log(m); },
});
let i = 0;
page.on('console', (m) => { const t = m.text(); if (!/ERR_BLOCKED/.test(t)) console.log('console.' + m.type(), t.slice(0, 250)); });
page.on('framenavigated', (f) => { if (f === page.mainFrame()) console.log('NAV', f.url()); });
await page.screenshot({ path: `${dir}/0.png` });
for (const s of steps) {
  try {
    if (s.go) await routerGo(page, s.go);
    if (s.text) await page.getByText(s.text, { exact: s.exact ?? true }).first().click({ timeout: 8000 });
    if (s.css) await page.locator(s.css).first().click({ timeout: 8000 });
    await settle(page, s.wait ?? 800);
  } catch (e) {
    console.log('ERROR at', JSON.stringify(s), e.message.split('\n')[0]);
  }
  const f = `${dir}/${++i}.png`;
  await page.screenshot({ path: f });
  console.log('SHOT', f, page.url());
}
console.log('pageerrors', errors.slice(0, 5));
console.log('unmocked', [...guard.unmocked.entries()]);
await browser.close();
