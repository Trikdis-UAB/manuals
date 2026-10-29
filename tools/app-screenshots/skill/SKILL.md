---
name: protegus-app-screenshots
description: Take screenshots of the Protegus app's device configurator (Advanced settings), its add-new-system wizard and the everyday user screens (home with areas, arming, PIN keypad, zone bypass, zone statuses) for the TRIKDIS manuals and the Protegus app manual, from the released web.protegus.app (or the beta front-end, beta2.protegus.app) with invented sample data - no device, no real account, nothing sent to Protegus. Use this whenever someone wants Protegus app images for a manual or a "Protegus app" tab, says "build the screenshots as we did for GET", "app tab images", "configurator screenshots", "arming screenshots", "Protegus app manual pictures", "capture the SP5 / GT / GET settings pages in the app", wants the same screens in LT, ES or RU, or wants app screenshots recaptured after a release, firmware or label change, or wants the "Adding the security system to Protegus2 app" pictures redone. Also use it before adding a new product (GT, GT+, G16, SP3, FC, ...) or a new screen to the screenshot tool. Not for TrikdisConfig screenshots, and not for reading live data from a real system.
---

# Protegus app screenshots

The tool lives in the manuals repo at `tools/app-screenshots/` (on `main`). Its `README.md` is the
reference: options, safety rules, what each API call is answered with, known limits. Read it before
changing anything. This skill is the working knowledge around it: how to run it, how to add a
product, the traps, and how to hand the result over.

It opens the released front-end in headless Chrome and answers every `/v3/api/*` call locally with
sample data, so the images show exactly what customers have, filled with invented values.

## Run

Work in your own worktree, never in Andrius's main checkout:
`~/.claude/tools/agent-worktree.sh ~/Projects/TRIKDIS/manuals app-screenshots origin/main`
(it is reused if it exists; `out/` there may hold images other sessions are waiting for).

```bash
cd tools/app-screenshots && npm ci
node guard-selftest.mjs                                   # must say "all guard checks passed"
node capture.mjs --model GET --lang en --layout phone,desktop
node capture.mjs --model SP5 --lang en --layout phone --screen zones,users-list
node capture.mjs --model GET --flow protegus --lang en --layout phone   # user screens: protegus-*-phone.png
```

A user-screen walk sets its sample state in `screens/protegus.json` (system patch, zone status, zones
the panel names when it refuses to arm). Read the released source first (`origin/master_eu` in
`~/Projects/TRIKDIS/worktrees/Protegus_v3`, read with `git show`, never checked out): which buttons a
screen shows depends on the system's capabilities (`systemHelper().supports` in `systems.service.ts`).

Output: `out/<lang>/<model>-<screen>[-<revision>]-<layout>.png` and `out/manifest.json`, one
record per image (menu path in that language, firmware, `firmwareConfirmed`, `revisionConfirmed`,
any `unverified` note, the front-end bundle and its deploy date). Each capture is a fresh browser,
about 12 s per screen and layout; two runs give pixel-identical images. Long runs go in the
background, under `caffeinate -i`: when the Mac sleeps midway every screen after that fails with
`ERR_NETWORK_CHANGED` (2026-10-26, 35 of 65 lost). That stops idle sleep only; a lid closed on
battery still sleeps it (2026-10-28, 10 lost), so read the run's FAIL lines and rerun just those
with `--screen` (the manifest merges).

**Beta front-end:** `--app beta` photographs beta2.protegus.app instead (SP5 follows the beta, Andrius
2026-10-19). Images and their own manifest go to `out/beta/`, every record says `frontend: "beta"`,
and the sample configuration is `fixtures/config/<name>-beta.json` when the beta server's answer is
shaped differently. A model without one falls back to the released shape, and the run prints a NOTE
saying so. Labels: `node fetch-public.mjs en --app beta` takes the EU server's pack and adds only the
keys the beta server has that the EU server lacks. Never use the beta server's own wording: it is the
North America region and says "Via Protegus2 North America cloud" in about 25 labels. Desktop pages of
the newer configurator also get `…-desktop-content.png`, cut below the app's top bar, which on the beta
shows the β logo and the region name. Colours: by default the beta is shown in the released app's
colours (`--theme released`; `--theme own` for its indigo/orange skin), because customers get the
released theme when the features ship. The swap changes only the theme's colour values; when the beta
is redeployed, re-verify it: pages with the same `--text` in both front-ends must pixel-match the
released images (desktop below the top bar). If a run says "no theme colour was found to swap", the
beta's palette changed: find the new pairs as `lib/frontends.mjs` describes.

## Walks (wizards and other flows)

A page that only appears partway through a flow, such as the add-new-system wizard, is a *walk*: one
pass through the app in a fresh browser, with an image at each `shot` step
(`screens/new-system.json`; run with `--flow new-system`). Steps click by label key so the walk works
in every language, and sample values can differ per language (area "Home" / "Namai" / "Casa" / "Дом").
Each call the flow makes needs a sample answer that keeps the app on the path you want (for the
wizard: online, not directly controlled, so it asks for areas and PGM control).

## Before capturing: facts that change what the app shows

Firmware and hardware revision decide which fields appear (on GET, firmware 1.31+ on an `x1x1`
board moves the account number into each CMS channel). They are set per model in `lib/sample.mjs`
or with `--fw` / `--revision`. Never guess them. Look first in the Workspace
(`~/Projects/TRIKDIS/Workspace/Products/`, e.g. the firmware-release notes in Open-Questions), then
ask Andrius. Until confirmed, capture with the placeholder and leave the manifest saying so.

When the manual already shows TrikdisConfig screenshots for the same settings, use their values in
the sample so the two tabs agree (GET: Object ID 561234, TLF AUTO / Dual Tone / SIA FSK, 425 Hz).

## Adding a product or a screen

1. Find the configurator in the front-end source, `~/Projects/TRIKDIS/worktrees/Protegus_v3`
   (beta line, reference only): `general/advanced-settings/advanced-settings.routes.ts` (which
   configurator a model opens), `configurators/configuration.routes.ts` (the newer one's pages), and
   the configurator's `navigation.service.ts` (which menu items each model shows).
2. Get each page's data shape from the app's USB parser, `configurators/wired/<x>-communication.service.ts`:
   it builds the same object `config/read` returns, with the real field types and array lengths.
   For many pages, split the reading between parallel read-only research agents (one per menu group)
   and ask each for: the JSON per page, every display condition with file:line, the extra API calls
   and their response shapes, and what throws when a field is missing.
3. Add the model to `MODELS` in `lib/sample.mjs`, its screens to `screens/<configurator>.json` (the
   `_fields` line explains each field), its sample config to `fixtures/config/`, and any extra calls to
   `lib/mocks-configurators.mjs`.
4. Debug the path with `node dev/step.mjs <layout> '[{"text":"Sample system"}, ...]'` (a screenshot
   after each step) and `node dev/catch.mjs` (every exception, including swallowed ones). A run that
   reports `UNMOCKED` means a call still needs a sample answer.

Sample values are invented and recognisable: IMEI `123456789012345`, "Sample system",
`@example.com`, phone numbers from `+44 7700 900xxx` (the UK range reserved for fiction). The repo is
public, so keep real names, systems and customer data out of fixtures and commit messages.

## Traps that already cost time

- **Boot at `/`, as a returning user.** The label pack is loaded by the root route's resolver, and the
  tool pre-caches it: on a browser's first visit some pages (SP5 Zones) build option lists before the
  labels arrive and show raw keys.
- **The app waits for Google Sign-In** before it opens a system; the guard serves a no-op stand-in.
  If a click does nothing and no error appears, a resolver is waiting on something blocked.
- **A system that will not open** usually means the sample system object makes the app's converter
  throw silently (e.g. `eventConfiguration` must be a JSON string, `events` must be `{events: []}`).
  `dev/catch.mjs` shows it.
- **A field the server leaves out must be left out, not `null`.** The released app forgave
  `installerAccess: null`; the beta threw on every render of the system page. The server's API reference
  (`~/Projects/TRIKDIS/worktrees/protegus_internal_api/endpoints/`) says which fields are "only present
  when…". The run now reports what the app sends to its own error endpoint as `app error …`; treat one as
  a sample-data bug, not app noise.
- **The beta calls the API through a region router** (`region-router.trikdis.workers.dev`, with an
  `X-Home-Region` header) and sometimes the region's host directly. The guard answers `/v3/api/*` on every
  host and the CORS preflight too; `guard-selftest.mjs` proves it for both front-ends.
- **Waiting for a page is done by counting its requests** (`settle` in `lib/app.mjs`). Playwright's
  `networkidle` is reached once per document and the app changes pages without a new one, so it stopped
  waiting after the first page; on a slow morning (2026-10-23) icons the app fetches after opening a
  page were missing from the pictures, and the run said 0 problems. Never wait with `networkidle` after
  the first load. A page still loading after 20 s now fails its screen. When pictures from two runs
  differ, look for missing icons before blaming the app.
- **A menu item can depend on the sample having its data.** SP5's Automation appears only when the
  configuration has an `automation` block (the configurator's `navigation.service.ts`); adding it put a
  new item in every desktop sidebar, so the whole beta set was recaptured (2026-10-26). Before adding
  data a page needs, check what else it changes.
- **Keep menu clicks inside the configurator**: on desktop "Settings" is also a top-bar item.
- **Pop-ups** (README, "Pop-ups and single cards"): find a row by its text in `div.table-row` and only
  among visible ones, because each list is also laid out as phone cards hidden on desktop. A dropdown
  shows its value inside an `input`, so it is opened by that input, not by its text. A pop-up that polls
  (the wireless scan) never lets the network go quiet: give that step `settle: false` and stop the
  polling with the next click before the image.
- **The newer configurator (SP5)**: desktop reads by itself and opens the Dashboard; on a phone (the
  app switches below 1150 px) the menu page has a Read button. The device must be recorded as a cloud
  device in local storage or the pages never ask for live status.
- **Device-stored option texts** (panel lists, protocol names) come from the device and keep its
  own "N. " numbering, as TrikdisConfig shows them. They do not change with the app language.
- **Beta source vs release.** Before telling anyone "the released app does X", find it in the released
  lazy chunks (`chunk-*.js`, named inside `main-*.js`; download them and grep). The beta source can differ.
- **Phone-app-only UI** (the wizard's QR button) is drawn when the native bridge `window.jsi` exists.
  Imitate it with a Proxy that answers every property with a no-op, except `then` and symbols:
  answering `then` makes it look like a promise and the run hangs.
- **Model details show up in the pictures.** The dashboard draws the connection next to "Online"
  (cellular bars or an Ethernet port), and Ethernet-only models (E16, E16T) are added by MAC address,
  not IMEI. The number of outputs shows too (output tiles on the dashboard): G16T and E16T have one.
  Set `comType`, `uid` and `outputs` per model in `lib/sample.mjs` before capturing a new model, from its
  manual's specifications; the first GT+ dashboard went out with an Ethernet icon. The same goes for
  device families: SP5's sample wireless devices are HEYI (group 9) because SP5 does not support Maximum
  Security devices (firmware team, 2026-10-23), even though the app's catalog still lists them; HEYI
  devices measure no temperature. Ask the manual's session what the product supports before picking.
- **Defaults come from the server, not the browser.** A new system's default time zone is the
  `userTimeZone` in `/timezones`; the walk's `timezones` map sets it per language.
- **Some languages are not fully translated in the app** (Russian is English; Spanish lacks a few
  labels). Check the label pack before blaming the tool, and report the gap.
- **Releases.** The manifest records the bundle and its deploy date. When web.protegus.app is
  redeployed, re-capture into a scratch folder and pixel-compare (`magick compare -metric AE`) before
  saying published images are still current. The label packs change too: `node fetch-public.mjs en lt`.
  The beta is redeployed often (main-WF7OQQHA on 2026-10-19); re-capture beta images before handing them
  over, not from an older run. To say which screens changed between two front-ends or releases, capture
  both with `--text` into scratch folders and `diff` the `.txt` files: the beta's theme makes every image
  differ in pixels, so a pixel diff cannot answer it.
- **After changing a shared sample** (`lib/sample.mjs`, the mocks), re-capture a few released images
  into a scratch folder and pixel-compare them with `out/`, so a fix for one front-end or model does not
  silently change published pictures of another.

## Check before handing over

Look at every image yourself (`magick montage` contact sheets make this quick): labels translated, no
raw keys, statuses plausible, nothing cut off. The run must end with 0 problems, and the guard
self-test must pass after any change to the guard. Values you could not confirm stay flagged in the
manifest (`firmwareConfirmed`, `revisionConfirmed`, `unverified`), and you name them in the hand-off.

## When the tool cannot produce the real screen

Some screens cannot be captured from the released web app at all, or only imitated: phone-only UI
such as the QR scanner page, states that need a live device, anything that looks different on a real
phone. Andrius's rule (2026-10-19): *"Jeigu mums reikia screenshotų, kurių mes patys negalim padaryt,
arba sugeneruoti beveik tinkamu su mūsų frontendo prieiga, tai mes tada turim jų paprašyti Igorio."*

So ask Igoris Šimkevič (igoris@trikdis.lt, documentation) for real phone screenshots. Write in
Lithuanian, from joy@trikdis.lt, with the `gmail-draft` skill, naming the exact screens and languages
you need; the draft waits for Andrius's yes. Until the real screenshots arrive, the imitated image may
be used, marked `unverified` in the manifest, and the session that owns the manual swaps it when they
come. Check first whether a request for the same screens is already out.

## Hand-off

The images serve a manual another session owns. Send that session the manifest path, the image folder
and the list of unconfirmed values by message (the hand-off rule in the global CLAUDE.md, §1.2).
Do not write into its `docs/` files or its PR. The GET app tabs use the phone images, cut to content;
desktop images are masters. If no session owns the manual yet, report to Andrius and leave the images
in `out/`.
