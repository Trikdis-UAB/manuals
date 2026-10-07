// Which labels does the app hold in localStorage at a given screen? (debug helper)
import { openApp, routerGo, settle } from '../lib/app.mjs';
const { browser, page } = await openApp({ lang: 'en', model: 'SP5', layout: 'desktop', log: (m) => { if (/translations/.test(m)) console.log(m); },
  storage: { configuration_devices: [{ name: 'Sample system', version: 'SP5_0100', uid: '123456789012345', timestamp: 1, connection: 'cloud' }] } });
const count = () => page.evaluate(() => ({
  total: Object.keys(localStorage).length,
  configurators: Object.keys(localStorage).filter((k) => k.startsWith('configurators.')).length,
  def5: localStorage.getItem('configurators.settings.sections.zones.definitions.sp5.5'),
  nav: localStorage.getItem('configurators.navigation.zones'),
  version: localStorage.getItem('lang_version'), cfg: localStorage.getItem('lang_version_config'),
}));
console.log('after boot', await count());
await page.getByText('Sample system', { exact: true }).first().click(); await settle(page, 500);
const read = page.waitForResponse((r) => r.url().includes('/config/read'));
await routerGo(page, '/d/company/systems/900101/settings/advanced'); await read; await settle(page, 2000);
console.log('after read', await count());
await browser.close();
