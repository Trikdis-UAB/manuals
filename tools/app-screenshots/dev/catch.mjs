// Reports every thrown exception (caught or not) while clicking the system row.
import { openApp, settle } from '../lib/app.mjs';
const { browser, context, page } = await openApp({ lang: 'en', model: 'GET', layout: 'desktop' });
const cdp = await context.newCDPSession(page);
await cdp.send('Debugger.enable');
cdp.on('Debugger.paused', async (ev) => {
  const d = ev.data?.description ?? JSON.stringify(ev.data ?? {}).slice(0, 200);
  const frames = ev.callFrames.slice(0, 4).map((f) => `${f.functionName || '(anon)'}@${f.location.lineNumber}:${f.location.columnNumber}`).join(' < ');
  console.log('EXC', ev.reason, String(d).split('\n')[0].slice(0, 200), '|', frames);
  await cdp.send('Debugger.resume').catch(() => {});
});
await cdp.send('Debugger.setPauseOnExceptions', { state: 'all' });
await page.getByText('Sample system', { exact: true }).first().click();
await settle(page, 1500);
console.log('URL', page.url());
await browser.close();
