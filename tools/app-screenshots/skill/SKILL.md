---
name: protegus-app-screenshots
description: Take screenshots of the Protegus app's device configurator (Advanced settings) and its add-new-system wizard for the TRIKDIS manuals, from the released web.protegus.app with invented sample data - no device, no real account, nothing sent to Protegus. Use this whenever someone wants Protegus app images for a manual or a "Protegus app" tab, says "build the screenshots as we did for GET", "app tab images", "configurator screenshots", "capture the SP5 / GT / GET settings pages in the app", wants the same screens in LT, ES or RU, or wants app screenshots recaptured after a release, firmware or label change, or wants the "Adding the security system to Protegus2 app" pictures redone. Also use it before adding a new product (GT, GT+, G16, SP3, FC, ...) or a new screen to the screenshot tool. Not for TrikdisConfig screenshots, and not for reading live data from a real system.
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
```

Output: `out/<lang>/<model>-<screen>[-<revision>]-<layout>.png` and `out/manifest.json`, one
record per image (menu path in that language, firmware, `firmwareConfirmed`, `revisionConfirmed`,
any `unverified` note, the front-end bundle and its deploy date). Each capture is a fresh browser,
about 12 s per screen and layout; two runs give pixel-identical images. Long runs go in the
background.

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
- **Keep menu clicks inside the configurator**: on desktop "Settings" is also a top-bar item.
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
- **Defaults come from the server, not the browser.** A new system's default time zone is the
  `userTimeZone` in `/timezones`; the walk's `timezones` map sets it per language.
- **Some languages are not fully translated in the app** (Russian is English; Spanish lacks a few
  labels). Check the label pack before blaming the tool, and report the gap.
- **Releases.** The manifest records the bundle and its deploy date. When web.protegus.app is
  redeployed, re-capture into a scratch folder and pixel-compare (`magick compare -metric AE`) before
  saying published images are still current. The label packs change too: `node fetch-public.mjs en lt`.

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
