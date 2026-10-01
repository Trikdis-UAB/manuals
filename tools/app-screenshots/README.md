# Protegus app screenshots

Takes screenshots of the Protegus app's device-configurator screens for the manuals' "Protegus app"
tabs, without a live device or a real account.

It opens the **released** web app (`https://web.protegus.app`, the EU production front-end customers
use) in headless Chrome and answers every API call itself with sample data: a signed-in installer,
one system and that system's configuration. So the screenshots show exactly the version customers
have, filled with invented values.

## Run

```bash
cd tools/app-screenshots
npm ci                      # Playwright only; it drives the installed Google Chrome, no browser download
node capture.mjs --model GET --lang en --layout desktop,phone
```

Output goes to `out/<lang>/` and `out/manifest.json` (one record per image: screen, app path, file,
model, language, layout, viewport, the front-end build it came from). Re-running replaces the matching
records and leaves the rest.

| Option | Default | Meaning |
|---|---|---|
| `--model` | `GET` | `GET`, `GT`, `GT+`, `G16`, `G16T`, `E16`, `E16T` (all served by the shared g16 configurator) |
| `--lang` | `en` | comma-separated; any language the app has (`en,lt,es,ru`) |
| `--layout` | `desktop,phone` | desktop is 1440×900 @2x, phone is 390×844 @3x |
| `--screen` | all in `screens/g16.json` | comma-separated screen ids |
| `--fw`, `--revision` | placeholder | firmware (e.g. `1.37`) and hardware revision the sample device reports. They change which fields the app shows, so pass the current release; both go into the manifest |
| `--out` | `out` | output folder |

Each desktop capture gives two files: the whole window (`…-desktop.png`) and just the configurator
column (`…-desktop-panel.png`). The phone layout is what the native apps show, since they wrap the same
web app; phone images are cut 24 px below the last card, so short pages don't carry empty grey. If a
page is longer than one phone screen the run warns and the manifest says `contentOverflows`.

The label packs are fetched from the public translations endpoint on first use and cached in
`fixtures/translations/` (not committed). Run `node fetch-public.mjs en lt es ru` before a batch to pick
up label changes.

A run of one screen in two layouts takes about 25 seconds, and two runs give pixel-identical images.

## Safety

The guard in `lib/guard.mjs` is the only thing between this tool and production. It:

- answers **every** `/v3/api/*` request locally, whatever the method. Nothing under `/v3/api` reaches
  the server, so the fake token can never cause a server-side effect and no real account data can come
  back. That includes the translations call: it is served from the saved public copy.
- fetches the front-end itself (HTML, JS, CSS, images, fonts) live, **GET only**.
- refuses everything else: analytics (`/ingest/`), error reporting (GlitchTip), the realtime socket,
  every other host and every non-GET request. Google Sign-In gets a local no-op script, because the app
  waits for it to load before it opens a system.

`node guard-selftest.mjs` is the positive control: from inside a guarded page it tries an API
`DELETE`, a configuration write, a POST to the app host, an analytics call, another host and a
WebSocket, and fails if any gets through. Run it after changing the guard. Each capture also prints
what was answered locally, fetched live and refused. Never log in with real
credentials and never point the mocks at real data. `fetch-public.mjs` calls only auth-free read
endpoints (translations, regions, languages, timezones, output icons) and sends no token.

All sample values are in `lib/sample.mjs` and `fixtures/config/g16-family.json`. They are invented and
recognisable: IMEI `123456789012345`, "Sample system", "Sample Installer", `installer@example.com`.

## What the app asks for, and what answers it

| Call | Answer |
|---|---|
| `POST /translations` (app pack and the g16 pack) | saved public copy |
| `GET /regions`, `/languages`, `/timezones`, `POST /get-pgm-icon-paths` | saved public copy |
| `GET /me` | sample installer (role 3, no company) |
| `GET /systems-with-devices` | one row: the sample system |
| `POST /get-system` | the sample system |
| `GET /dashboard/widget-data` | empty |
| `GET /config/info` | sample device info: model, firmware, serial |
| `POST /config/read` | `fixtures/config/g16-family.json` |
| `POST /error` | swallowed (the app's own error reporting) |

Anything else is answered with `success: false` and reported as `UNMOCKED` with a warning.

## How a capture walks the app

Boot at `/` (this loads the label pack), click "Sample system", open its Advanced settings, press
**Read**, then click the screen's menu labels (looked up in the label pack, so it works in every
language) and screenshot. The Advanced-settings warning page and the "Data we collect" notice are
skipped by setting the same local flags the app sets when you dismiss them.

## Adding a screen

Add an entry to `screens/g16.json`: an `id`, the translation keys of the menu items to click
(`menu`), the route it lands on (`route`), and `onlyModels` if the menu item is model-specific. Fill in
the matching branch of `fixtures/config/g16-family.json` if the page reads data that is not there yet.
Debug a new path with `node dev/step.mjs desktop '[{"text":"Sample system"}, …]'` (a screenshot after
each step) and `node dev/catch.mjs` (reports every exception, including ones the app swallows).

## Known limits

- **Device-stored option texts are inferred.** On GET/GT/GT+ the panel lists ("AUTO", "Dual Tone",
  "SIA FSK", panel models) are strings stored on the device, not app labels. The samples use the texts
  TrikdisConfig shows for GET without its "N. " numbering. They stay in English in every language, as
  on a real device.
- **Live-only screens are not captured:** the read and write progress ("Reading… n%", "Writing… n%",
  progress bar) and the write result, which the app drives from its realtime channel. The manifest lists
  them under `liveOnly`.
- The front-end source used to learn the data shapes and routes is the beta line. The screenshots
  themselves come from the released build named in the manifest.
