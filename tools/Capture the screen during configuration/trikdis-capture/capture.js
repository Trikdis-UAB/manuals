'use strict';

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ─── DOM listener script injected into every page before scripts run ─────────
const DOM_LISTENER_SCRIPT = `
(function () {
  try {
    if (window.__captureListenersAttached) return;
    window.__captureListenersAttached = true;

    function getElementInfo(el) {
      try {
        var info = {
          tag: el.tagName ? el.tagName.toLowerCase() : 'unknown',
          id: el.id || '',
          name: el.name || '',
          text: '',
          ariaLabel: el.getAttribute ? (el.getAttribute('aria-label') || '') : '',
          placeholder: el.placeholder || '',
          value: el.value !== undefined ? String(el.value).slice(0, 50) : ''
        };
        try {
          info.text = ((el.innerText || el.textContent || '')).trim().slice(0, 50);
        } catch (e) {}
        return info;
      } catch (e) {
        return { tag: 'unknown', id: '', name: '', text: '', ariaLabel: '', placeholder: '', value: '' };
      }
    }

    var SKIP_TAGS = { div: 1, span: 1, li: 1, ul: 1, ol: 1, p: 1, section: 1, article: 1, main: 1, header: 1, footer: 1, nav: 1 };

    document.addEventListener('click', function (e) {
      try {
        var el = e.target;
        var info = getElementInfo(el);
        // Skip bare container elements with no identifying label/text
        if (SKIP_TAGS[info.tag] && !info.ariaLabel && !info.id && !info.text) return;
        // Delay so the UI fully responds to the click before we screenshot
        setTimeout(function () {
          try { window.__captureEvent('click', info); } catch (err) {}
        }, 250);
      } catch (err) {}
    }, true);

    document.addEventListener('change', function (e) {
      try {
        window.__captureEvent('formChange', getElementInfo(e.target));
      } catch (err) {}
    }, true);

    document.addEventListener('input', function (e) {
      try {
        window.__captureEvent('input', getElementInfo(e.target));
      } catch (err) {}
    }, true);

  } catch (outerErr) {}
})();
`;

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULTS = {
  url: 'https://config.trikdis.com',
  outputDir: './sessions',
  screenshotQuality: 90,
  captureEvents: {
    navigation: true,
    clicks: true,
    formChanges: true,
    dialogs: true,
    pageErrors: true
  },
  debounceMs: 400,
  screenshotFormat: 'png',
  viewport: { width: 1440, height: 900 }
};

// ─── loadConfig ───────────────────────────────────────────────────────────────
function loadConfig() {
  let userConfig = {};
  const configPath = path.join(__dirname, 'config.json');
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    userConfig = JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.warn('[warn] config.json not found — using defaults');
    } else {
      console.warn('[warn] config.json parse error:', e.message, '— using defaults');
    }
  }

  const config = Object.assign({}, DEFAULTS, userConfig);
  config.captureEvents = Object.assign({}, DEFAULTS.captureEvents, userConfig.captureEvents || {});
  config.viewport = Object.assign({}, DEFAULTS.viewport, userConfig.viewport || {});
  config.outputDir = path.resolve(__dirname, config.outputDir);

  if (!config.url || !/^https?:\/\//.test(config.url)) {
    console.error('[error] config.url is missing or invalid');
    process.exit(1);
  }

  return config;
}

// ─── createSessionDir ─────────────────────────────────────────────────────────
async function createSessionDir(outputDir) {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const ts = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '_',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds())
  ].join('');

  const sessionDir = path.join(outputDir, `session_${ts}`);
  const screenshotsDir = path.join(sessionDir, 'screenshots');
  try {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  } catch (e) {
    console.error('[error] Cannot create output directory:', e.message);
    process.exit(1);
  }
  return { sessionDir, screenshotsDir };
}

// ─── slugify / deriveEventName ────────────────────────────────────────────────
function slugify(str, maxLen) {
  maxLen = maxLen || 40;
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, maxLen) || 'event';
}

function deriveEventName(event) {
  const type = event.type;
  const url = event.url;
  const element = event.element;
  let name;

  if (type === 'navigation' && url) {
    try {
      const pathname = new URL(url).pathname;
      const slug = slugify(pathname, 35);
      name = 'page_' + (slug === 'event' ? 'home' : slug);
    } catch (_) {
      name = 'page_' + slugify(url, 35);
    }
  } else if (type === 'click' && element) {
    name = 'click_' + slugify(
      element.ariaLabel || element.text || element.id || element.name || element.tag,
      34
    );
  } else if ((type === 'formChange' || type === 'input') && element) {
    name = 'input_' + slugify(
      element.name || element.id || element.placeholder || element.tag,
      34
    );
  } else if (type === 'dialog') {
    name = 'dialog_' + slugify(event.message || 'dialog', 30);
  } else if (type === 'pageError') {
    name = 'page_error';
  } else {
    name = slugify(type, 40);
  }

  return name.slice(0, 40) || 'event';
}

// ─── takeScreenshot ───────────────────────────────────────────────────────────
async function takeScreenshot(page, screenshotsDir, index, eventName) {
  const filename = String(index).padStart(3, '0') + '_' + eventName + '.png';
  const filepath = path.join(screenshotsDir, filename);
  try {
    await page.screenshot({ path: filepath, fullPage: false, type: 'png' });
    return filename;
  } catch (e) {
    console.warn('[warn] Screenshot failed (' + eventName + '):', e.message);
    return null;
  }
}

// ─── appendLog + incremental flush ───────────────────────────────────────────
function appendLog(log, entry) {
  log.push(entry);
}

function flushLog(state) {
  try {
    fs.writeFileSync(
      path.join(state.sessionDir, 'session_log.json'),
      JSON.stringify(state.log, null, 2),
      'utf8'
    );
  } catch (_) {}
  try {
    generateReadme(state.log, state.sessionDir, state.config);
  } catch (_) {}
}

// ─── buildCaptureHandler (shared logic for DOM-exposed events) ────────────────
function buildCaptureHandler(context, state) {
  return async function handleCapture(type, element) {
    try {
      const isFormEvent = type === 'input' || type === 'formChange';
      if (isFormEvent && !state.config.captureEvents.formChanges) return;

      // Clicks: log only — no screenshot. Taking a screenshot on every click causes
      // a white-flash flicker in headful Chrome (CDP capture pauses compositing).
      // Navigation events capture the visible result of any meaningful click anyway.
      if (type === 'click') {
        if (!state.config.captureEvents.clicks) return;
        const pages = context.pages();
        const page = pages[pages.length - 1];
        let pageTitle = ''; let pageUrl = '';
        try { pageTitle = await page.title(); } catch (_) {}
        try { pageUrl = page.url(); } catch (_) {}
        const label = element
          ? (element.ariaLabel || element.text || element.name || element.id || element.tag || '')
          : '';
        appendLog(state.log, {
          index: null,
          timestamp: new Date().toISOString(),
          action_type: 'click',
          element_description: label,
          url: pageUrl,
          page_title: pageTitle,
          screenshot_filename: null
        });
        console.log('[click] ' + label.slice(0, 60));
        return;
      }

      if (isFormEvent) {
        const key = (element.name || element.id || element.tag || 'field') + '_' + type;
        if (state.debounceTimers[key]) clearTimeout(state.debounceTimers[key]);
        state.debounceTimers[key] = setTimeout(async () => {
          delete state.debounceTimers[key];
          await doCapture(type, element);
        }, state.config.debounceMs);
        return;
      }

      await doCapture(type, element);
    } catch (_) {
      // Ignore errors from closed pages or contexts
    }
  };

  async function doCapture(type, element) {
    try {
      const pages = context.pages();
      const page = pages[pages.length - 1];
      if (!page || page.isClosed()) return;

      state.counter.value++;
      const eventName = deriveEventName({ type, element });

      let pageTitle = '';
      let pageUrl = '';
      try { pageTitle = await page.title(); } catch (_) {}
      try { pageUrl = page.url(); } catch (_) {}

      const filename = await takeScreenshot(
        page,
        state.screenshotsDir,
        state.counter.value,
        eventName
      );

      appendLog(state.log, {
        index: state.counter.value,
        timestamp: new Date().toISOString(),
        action_type: type,
        element_description: element
          ? (element.ariaLabel || element.text || element.name || element.id || element.tag || '')
          : '',
        url: pageUrl,
        page_title: pageTitle,
        screenshot_filename: filename
      });

      flushLog(state);

      if (filename) {
        console.log(
          '[' + String(state.counter.value).padStart(3, '0') + '] ' +
          type + ': ' + eventName + ' → ' + filename
        );
      }
    } catch (_) {}
  }
}

// ─── attachListeners (page-level: navigation, dialogs, errors) ────────────────
async function attachListeners(page, state) {

  async function capturePageEvent(type, extraInfo) {
    try {
      state.counter.value++;
      const eventName = deriveEventName(Object.assign({ type }, extraInfo));

      let pageTitle = '';
      let pageUrl = '';
      try { pageTitle = await page.title(); } catch (_) {}
      try { pageUrl = page.url(); } catch (_) {}

      const filename = await takeScreenshot(
        page,
        state.screenshotsDir,
        state.counter.value,
        eventName
      );

      appendLog(state.log, {
        index: state.counter.value,
        timestamp: new Date().toISOString(),
        action_type: type,
        element_description: extraInfo.url || extraInfo.message || '',
        url: extraInfo.url || pageUrl,
        page_title: pageTitle,
        screenshot_filename: filename
      });

      flushLog(state);

      if (filename) {
        console.log(
          '[' + String(state.counter.value).padStart(3, '0') + '] ' +
          type + ': ' + eventName + ' → ' + filename
        );
      }
    } catch (_) {}
  }

  if (state.config.captureEvents.navigation) {
    page.on('framenavigated', async (frame) => {
      if (frame !== page.mainFrame()) return;
      await capturePageEvent('navigation', { url: frame.url() });
    });
  }

  if (state.config.captureEvents.dialogs) {
    page.on('dialog', async (dialog) => {
      await capturePageEvent('dialog', { message: dialog.message() });
      try { await dialog.accept(); } catch (_) {}
    });
  }

  if (state.config.captureEvents.pageErrors) {
    page.on('pageerror', (error) => {
      appendLog(state.log, {
        index: null,
        timestamp: new Date().toISOString(),
        action_type: 'pageError',
        element_description: error.message,
        url: page.url(),
        page_title: '',
        screenshot_filename: null
      });
      console.warn('[page error]', error.message.slice(0, 120));
    });
  }
}

// ─── generateReadme ───────────────────────────────────────────────────────────
function generateReadme(log, sessionDir, config) {
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

  const pagesMap = new Map();
  for (const entry of log) {
    if (entry.action_type === 'navigation' && entry.url && !pagesMap.has(entry.url)) {
      pagesMap.set(entry.url, {
        title: entry.page_title,
        url: entry.url,
        time: entry.timestamp
      });
    }
  }

  const timestamps = log
    .filter(e => e.timestamp)
    .map(e => new Date(e.timestamp).getTime());
  let duration = 'N/A';
  if (timestamps.length >= 2) {
    const mins = Math.round((Math.max.apply(null, timestamps) - Math.min.apply(null, timestamps)) / 60000);
    duration = mins + ' minute' + (mins !== 1 ? 's' : '');
  }

  const screenshots = log.filter(e => e.screenshot_filename).length;

  let md = '# TrikdisConfig Session — ' + dateStr + '\n\n';
  md += '**URL:** ' + config.url + '\n';
  md += '**Screenshots captured:** ' + screenshots + '\n';
  md += '**Duration:** ' + duration + '\n\n';

  if (pagesMap.size > 0) {
    md += '## Pages Visited\n\n';
    pagesMap.forEach(function (p) {
      const t = new Date(p.time).toTimeString().slice(0, 8);
      md += '- ' + (p.title || '(untitled)') + ' (' + p.url + ') — first seen at ' + t + '\n';
    });
    md += '\n';
  }

  md += '## Event Summary\n\n';
  md += '| # | Time | Action | Element | Screenshot |\n';
  md += '|---|------|--------|---------|------------|\n';
  for (const entry of log) {
    if (entry.index == null) continue;
    const t = new Date(entry.timestamp).toTimeString().slice(0, 8);
    const idx = String(entry.index).padStart(3, '0');
    const el = (entry.element_description || '').slice(0, 60).replace(/\|/g, '\\|');
    const ss = entry.screenshot_filename
      ? '[' + entry.screenshot_filename + '](screenshots/' + entry.screenshot_filename + ')'
      : '—';
    md += '| ' + idx + ' | ' + t + ' | ' + entry.action_type + ' | ' + el + ' | ' + ss + ' |\n';
  }

  fs.writeFileSync(path.join(sessionDir, 'README.md'), md, 'utf8');
}

// ─── finalise ─────────────────────────────────────────────────────────────────
async function finalise(state) {
  if (state.finalised) return;
  state.finalised = true;

  console.log('\n[info] Finalising session...');

  try {
    await state.context.tracing.stop({ path: path.join(state.sessionDir, 'trace.zip') });
    console.log('[info] Trace saved.');
  } catch (e) {
    console.warn('[warn] Could not save trace:', e.message);
  }

  try {
    fs.writeFileSync(
      path.join(state.sessionDir, 'session_log.json'),
      JSON.stringify(state.log, null, 2),
      'utf8'
    );
    console.log('[info] session_log.json saved.');
  } catch (e) {
    console.error('[error] Could not write session_log.json:', e.message);
  }

  try {
    generateReadme(state.log, state.sessionDir, state.config);
    console.log('[info] README.md generated.');
  } catch (e) {
    console.error('[error] Could not generate README.md:', e.message);
  }

  const ssCount = state.log.filter(e => e.screenshot_filename).length;
  console.log('\n✓ Session complete. ' + ssCount + ' screenshot(s) captured.');
  console.log('✓ Saved to: ' + state.sessionDir);

  try { await state.browser.close(); } catch (_) {}
  process.exit(0);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const config = loadConfig();
  const { sessionDir, screenshotsDir } = await createSessionDir(config.outputDir);

  console.log('\n╔══════════════════════════════════════╗');
  console.log('║     Trikdis Capture Tool v1.0        ║');
  console.log('╚══════════════════════════════════════╝');
  console.log('Session: ' + sessionDir);
  console.log('URL:     ' + config.url);
  console.log('');

  // Launch browser — prefer system Chrome, fall back to bundled Chromium
  // --window-size sets the outer window; add ~88px for macOS browser chrome (tabs + address bar)
  const w = config.viewport.width;
  const h = config.viewport.height;
  const launchArgs = [
    `--window-size=${w},${h + 88}`,
    '--window-position=80,40'
  ];
  let browser;
  try {
    browser = await chromium.launch({ headless: false, channel: 'chrome', args: launchArgs });
    console.log('[info] Launched system Chrome');
  } catch (_) {
    browser = await chromium.launch({ headless: false, args: launchArgs });
    console.log('[info] Launched bundled Chromium (system Chrome not found)');
  }

  const context = await browser.newContext({ viewport: config.viewport });

  const state = {
    context,
    browser,
    sessionDir,
    screenshotsDir,
    config,
    log: [],
    counter: { value: 0 },
    debounceTimers: {},
    finalised: false
  };

  // Start Playwright tracing
  await context.tracing.start({ screenshots: true, snapshots: true, sources: false });

  // Expose Node.js handler to browser — must happen before addInitScript takes effect
  const captureHandler = buildCaptureHandler(context, state);
  await context.exposeFunction('__captureEvent', captureHandler);

  // Inject DOM listener into every new page/navigation
  await context.addInitScript(DOM_LISTENER_SCRIPT);

  const page = await context.newPage();
  await page.setViewportSize(config.viewport);

  await attachListeners(page, state);

  // Navigate to starting URL
  try {
    await page.goto(config.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.warn('[warn] Initial navigation:', e.message);
  }

  console.log('Browser open. Technician can now configure the device.');
  console.log('Press Ctrl+C when done.\n');

  process.on('SIGINT', () => finalise(state));
  browser.on('disconnected', () => {
    // Flush synchronously first — guarantees data on disk even if finalise fails
    flushLog(state);
    try { generateReadme(state.log, state.sessionDir, state.config); } catch (_) {}
    finalise(state).catch(() => process.exit(0));
  });

  // Keep process alive while browser is open
  await new Promise(() => {});
}

main().catch(function (e) {
  console.error('[fatal]', e.message);
  process.exit(1);
});
