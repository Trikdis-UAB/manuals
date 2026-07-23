# TrikdisConfig Session Capture Tool — Implementation Spec

**Purpose:** Implement a Node.js \+ Playwright tool that silently observes a technician configuring a TRIKDIS SP3 panel in Chrome and automatically captures screenshots \+ a structured log. Output is used to generate Markdown documentation for docs.trikdis.com.

---

## 1\. File Structure

trikdis-capture/

├── capture.js          \# Main entry point — run this to start a session

├── config.json         \# User-editable config (URL, output path, options)

├── package.json        \# Dependencies

├── setup.sh            \# Mac one-time setup script

├── setup.bat           \# Windows one-time setup script

└── sessions/           \# Created automatically, one subfolder per run

    └── session\_YYYYMMDD\_HHMMSS/

        ├── screenshots/

        │   ├── 001\_page\_load.png

        │   ├── 002\_click\_save\_button.png

        │   └── ...

        ├── session\_log.json

        ├── trace.zip

        └── README.md

---

## 2\. config.json

{

  "url": "https://config.trikdis.com",

  "outputDir": "./sessions",

  "screenshotQuality": 90,

  "captureEvents": {

    "navigation": true,

    "clicks": true,

    "formChanges": true,

    "dialogs": true,

    "pageErrors": true

  },

  "debounceMs": 400,

  "screenshotFormat": "png",

  "viewport": { "width": 1440, "height": 900 }

}

**Notes:**

- `debounceMs` prevents screenshot flood on rapid input (e.g. typing into a field triggers one screenshot after the user pauses, not one per keystroke)  
- `outputDir` supports both relative and absolute paths — normalise with `path.resolve()` at startup  
- All fields should have hardcoded defaults in `capture.js` so a missing or partial `config.json` never crashes

---

## 3\. package.json

{

  "name": "trikdis-capture",

  "version": "1.0.0",

  "description": "Playwright session capture for TrikdisConfig documentation",

  "main": "capture.js",

  "scripts": {

    "start": "node capture.js",

    "capture": "node capture.js"

  },

  "dependencies": {

    "playwright": "^1.44.0"

  },

  "engines": {

    "node": "\>=18.0.0"

  }

}

---

## 4\. capture.js — Key Functions

### 4.1 `loadConfig()`

function loadConfig()

// Returns: merged config object (defaults \+ config.json overrides)

// \- Reads config.json with fs.readFileSync, gracefully falls back to defaults if missing

// \- Resolves outputDir to absolute path

// \- Validates url is present and looks like a URL

### 4.2 `createSessionDir(outputDir)`

async function createSessionDir(outputDir)

// Returns: { sessionDir, screenshotsDir } — absolute paths

// \- Creates sessions/session\_YYYYMMDD\_HHMMSS/ 

// \- Creates screenshots/ subfolder inside

// \- Uses fs.mkdirSync with { recursive: true } — safe on both Mac and Windows

// \- Timestamp format: YYYYMMDD\_HHMMSS using local time (not UTC) for readability

### 4.3 `deriveEventName(event)`

function deriveEventName(event)

// Returns: string — short slug usable as part of a filename, max 40 chars

// \- Input: { type, url, element } where element \= { tag, id, name, text, ariaLabel, placeholder }

// \- Priority order for naming:

//     navigation → slugify(new URL(url).pathname) e.g. "page\_panel\_settings"

//     click → element.ariaLabel || element.text || element.id || element.name || element.tag

//     formChange → "input\_" \+ (element.name || element.id || element.placeholder || element.tag)

//     dialog → "dialog\_" \+ slugify(dialogMessage, 30\)

// \- slugify: lowercase, replace non-alphanumeric with underscore, collapse repeats, trim

// \- Truncate to 40 chars

### 4.4 `takeScreenshot(page, screenshotsDir, index, eventName)`

async function takeScreenshot(page, screenshotsDir, index, eventName)

// Returns: filename string e.g. "042\_click\_save\_button.png"

// \- Filename: zero-padded 3-digit index \+ "\_" \+ eventName \+ ".png"

// \- Uses page.screenshot({ path, fullPage: false, type: 'png' })

// \- Do NOT use fullPage:true — TrikdisConfig likely uses fixed-height panels; fullPage can produce giant blank screenshots

// \- Wraps in try/catch — if screenshot fails (e.g. page navigating mid-shot), logs warning and returns null

### 4.5 `attachListeners(page, state)`

async function attachListeners(page, state)

// Attaches all Playwright event listeners to a page instance

// state \= { screenshotsDir, log, counter, debounceTimers, config }

// 

// Listeners to attach:

//   page.on('load', ...)           → navigation screenshot (immediate, no debounce)

//   page.on('framenavigated', ...) → only fire on mainFrame to avoid iframe noise

//   page.on('dialog', ...)         → auto-dismiss after screenshot (dialog.accept())

//   page.on('pageerror', ...)      → log error text, no screenshot unless config says so

//

// For click and input — use page.on('request',...) is NOT the right approach.

// Instead use: page.addInitScript() to inject a lightweight DOM listener that 

// calls window.\_\_captureEvent(type, elementInfo) on click/change/input.

// Then expose that function with page.exposeFunction('\_\_captureEvent', handler).

// This is the correct cross-origin-safe approach.

//

// Debounce logic for formChange events:

//   Use a per-element debounce map keyed by element name/id

//   Clear and reset timer on each event; fire screenshot only after debounceMs silence

### 4.6 `injectDOMListeners()` — string to pass to `page.addInitScript()`

// This JS string is injected into every page before any scripts run

// It adds document-level listeners for 'click' and 'change'/'input'

// For each event it calls window.\_\_captureEvent(type, { tag, id, name, text, ariaLabel, placeholder })

// IMPORTANT: wrap in try/catch inside the injected script — never let this crash the page

// IMPORTANT: filter out events where target is inside a shadow DOM you can't inspect — just pass tag only

// text: trim innerText to 50 chars max to avoid huge log entries

### 4.7 `appendLog(log, entry)`

function appendLog(log, entry)

// Pushes entry to in-memory log array

// entry shape: { index, timestamp (ISO), action\_type, element\_description, url, page\_title, screenshot\_filename }

// Does NOT write to disk on every event — bulk write at end for performance

### 4.8 `finalise(state, sessionDir)`

async function finalise(state, sessionDir)

// Called on Ctrl+C (SIGINT) and on browser close

// \- Stops Playwright tracing: await context.tracing.stop({ path: trace.zip })

// \- Writes session\_log.json with JSON.stringify(log, null, 2\)

// \- Generates README.md (see section 5\)

// \- Prints summary to console: "Session complete. X screenshots captured. Saved to: \<path\>"

// \- Guards against double-call with a \`finalised\` boolean flag — SIGINT and browser close can both fire

### 4.9 `generateReadme(log, sessionDir, config)`

function generateReadme(log, sessionDir, config)

// Writes README.md to sessionDir

// Content:

//   \# TrikdisConfig Session — YYYY-MM-DD HH:MM

//   \*\*URL:\*\* \<url\>

//   \*\*Screenshots captured:\*\* N

//   \*\*Duration:\*\* X minutes (first to last log timestamp)

//   

//   \#\# Pages Visited

//   \- \<page\_title\> (\<url\>) — first seen at HH:MM:SS

//   

//   \#\# Event Summary

//   | \# | Time | Action | Element | Screenshot |

//   |---|------|--------|---------|------------|

//   | 001 | 10:23:01 | navigation | /panel/settings | 001\_page\_panel\_settings.png |

//   ...

---

## 5\. setup.sh (Mac)

\#\!/bin/bash

echo "Setting up TrikdisConfig Capture Tool..."

command \-v node \>/dev/null 2\>&1 || { echo "Node.js not found. Install from https://nodejs.org"; exit 1; }

node \-e "if(parseInt(process.versions.node) \< 18\) { console.error('Node 18+ required'); process.exit(1); }"

npm install

npx playwright install chromium

echo ""

echo "Setup complete. Run: node capture.js"

---

## 6\. setup.bat (Windows)

@echo off

echo Setting up TrikdisConfig Capture Tool...

where node \>nul 2\>&1 || (echo Node.js not found. Install from https://nodejs.org && pause && exit /b 1\)

npm install

npx playwright install chromium

echo.

echo Setup complete. Run: node capture.js

pause

---

## 7\. Event Listener Strategy — Detail

**Why `exposeFunction` \+ `addInitScript` instead of Playwright's built-in locator events:**

Playwright's `page.on('click')` does not exist. The correct way to observe user-driven DOM events without intercepting them is:

1. `page.exposeFunction('__captureEvent', handler)` — exposes a Node.js callback to the browser context  
2. `page.addInitScript(domListenerString)` — injects JS that attaches `document.addEventListener('click', ...)` and calls `window.__captureEvent(...)`

This must be set up on the `context` level (not page level) so it applies to every new page/tab:

await context.addInitScript(domListenerString);

await context.exposeFunction('\_\_captureEvent', handler);

**Gotcha:** `exposeFunction` must be called before `addInitScript` takes effect. Both must be on `context`, not `page`, to survive navigation.

---

## 8\. Playwright Trace API

// Start tracing after context is created, before navigation

await context.tracing.start({ screenshots: true, snapshots: true, sources: false });

// Stop on finalise

await context.tracing.stop({ path: path.join(sessionDir, 'trace.zip') });

**Gotcha:** `tracing.stop()` will throw if the context is already closed. Wrap in try/catch inside `finalise()`.

Trace is viewable at: [https://trace.playwright.dev](https://trace.playwright.dev) (drag and drop the zip)

---

## 9\. Cross-Platform Path Handling

- Always use `path.join()` — never string concatenation with `/` or `\`  
- `path.resolve()` all paths from config at startup  
- Session folder name uses `_` not `:` in timestamp (colons are invalid in Windows filenames)  
- Screenshot filenames: only alphanumeric \+ underscore \+ dot — `deriveEventName()` must enforce this

---

## 10\. Error Handling Approach

| Scenario | Handling |
| :---- | :---- |
| config.json missing | Use defaults, warn to console |
| config.json malformed JSON | Print parse error, use defaults |
| Screenshot fails mid-navigation | try/catch, log null filename, continue |
| Browser closed by user (not Ctrl+C) | Listen to `browser.on('disconnected')` → call finalise() |
| exposeFunction fires after page close | try/catch in the handler, ignore the error |
| tracing.stop() on closed context | try/catch in finalise() |
| Output directory not writable | Catch on mkdirSync, print clear error and exit |

---

## 11\. Main Flow (capture.js top-level)

1\. loadConfig()

2\. createSessionDir()

3\. playwright.chromium.launch({ headless: false, channel: 'chrome' })

   \- Use channel:'chrome' to launch system Chrome (not bundled Chromium)

   \- If system Chrome not found, fall back to default Chromium without channel

4\. context.tracing.start(...)

5\. context.addInitScript(domListenerString)

6\. context.exposeFunction('\_\_captureEvent', handler)

7\. page \= await context.newPage()

8\. Set viewport from config

9\. attachListeners(page, state)

10\. page.goto(config.url)

11\. Console: "Browser open. Technician can now configure the device. Press Ctrl+C when done."

12\. Register process.on('SIGINT', () \=\> finalise(...))

13\. Register browser.on('disconnected', () \=\> finalise(...))

14\. Keep process alive: await new Promise(() \=\> {}) — Playwright keeps it alive while browser is open

---

## 12\. Implementation Notes for Claude Code

- Implement all functions in a single `capture.js` file — no need to split into modules for v1  
- The `domListenerString` (injected browser JS) can be a template literal defined at the top of the file  
- Counter for screenshot index should be an object property `state.counter` so it's passed by reference across async calls — not a plain `let` variable captured in closures  
- Test the debounce by typing into a form field rapidly — only one screenshot should result  
- On first run, print the session directory path clearly so the user knows where to find files  
- The tool should feel zero-friction: launch, hand to technician, Ctrl+C, done

