---
name: control-panel-manual
description: Write, review or update a TRIKDIS control-panel manual page the way the SP5 page was built - installation, common tasks and a full Protegus app settings reference with screenshots - from the app, the firmware notes and colleagues' answers. Use this whenever someone works on the SP5 or SP3 manual or another control panel (FLEXi SP3, SP5, SP10), even phrased as "peržiūrėk SP5 instrukciją", "pataisyk SP5 instrukciją", "padaryk SP3 instrukciją kaip SP5", "perrašyk SP3 instrukciją", "the app changed, update the manual", "what is still to confirm in SP5", "add the Protegus app settings to the SP3 manual", or "answer Alvaras's/Dovydas's reply in the manual". Not for communicators (GT, GET, G16), whose pages have their own Protegus app / TrikdisConfig tab format.
---

# Control-panel manual (the SP5 method)

The model is the SP5 page: `docs/en/control-panels/sp5/index.md`, on branch `agent/sp5-manual`,
pull request #30 (status and open questions are in the PR description). Read it before writing
anything for another panel: copy its structure and tone, not its facts.

Read `agents.md` first (repo rules: verification, PR or `main`, deploy). Also
`NOTES/agent-lessons/who-confirms-product-facts.md` (who answers what).

## Page structure

H2 sections, in this order:

1. **About the control panel**: what's new against the previous model, specifications, system limits
   in the Protegus app, board and terminals (photo), LED indication.
2. **Planning the system**: how devices connect, where zones come from, supported keypads and
   modules, power budget, installation site.
3. **Installation and wiring**: one H3 per kind of connection.
4. **First power-up and adding the panel to Protegus.**
5. **Common tasks**: complete procedures (numbered steps) for what installers do most. Pop-up
   screenshots sit indented under the step they belong to.
6. **Commissioning and handover**, 7. **Maintenance**, 8. **Troubleshooting** (table: what you see,
   cause, what to do).
9. **Settings in the Protegus app**: one H3 per configurator page, in menu order. Under each: the menu
   path, a page screenshot, then one H4 per card or pop-up with a table
   `| Setting | What it does | Values |`. Setting names in bold exactly as the app shows them; Values
   give ranges, units, lists and defaults.
10. **Appendix**: system events and Contact ID codes.

Headings are numbered by the `add-number` plugin. Link to the built id (e.g.
`#42-adding-the-panel-to-protegus`); a heading with a colon may not be rewritten, so link to its
parent instead.

## Facts: where they come from

Never invent a fact. Anything not found goes in the text as **[to confirm: …]**, and the PR
description lists these by owner.

1. **The app, for every setting.** Labels: `POST https://api.beta2.protegus.app/v3/api/translations`
   with `{"language":"en","version":"-1","config":"sp5"}` (`"sp3"` for SP3; released app:
   `api.protegus.app`). Behaviour (ranges, which items a list offers, what a switch writes): the
   front-end source is TRIKDIS-internal (ask Dovydas for read access). Without it, use the app's
   public JavaScript, as `tools/app-screenshots/skill/SKILL.md` describes ("Adding a product or a
   screen").
2. **The firmware designer's notes and Jira**: behaviour inside the panel, defaults, limits.
3. **The existing manual and datasheets** (for SP3: `docs/en/control-panels/sp3/index.md`, converted
   from Word and written for TrikdisConfig): hardware facts, wiring. Check they still hold.
4. **Colleagues, last**, only for what is still unknown, sorted by owner. For SP5: Alvaras (firmware:
   behaviour, defaults, limits), Dovydas (the Protegus configurator), Igoris (tests on a real
   panel), Vytautas (product and commercial), Saulius (hardware). Write in Lithuanian, short, one
   question per line. Read the earlier thread first: don't ask what was already answered.

When an answer comes in, put it in the page, remove its **[to confirm]**, and update the PR
description.

## Screenshots

Use `tools/app-screenshots` (its `README.md`, "Running it on your own computer", and
`skill/SKILL.md`). SP5 uses `--app beta`. SP3 is not in the tool yet: adding it follows the skill's
"Adding a product or a screen". Pictures for one page come from one computer.

Images go in `docs/en/control-panels/<model>/protegus-app/` as WebP, quality 80, by width:
`*-desktop-content` 1200 px, `*-phone` 640 px, pop-ups by the source width (2000 px or more: 1200;
1300 or more: 700; otherwise 560). Pop-ups get `{ .trik-popup-img }`. Alt text says what the
picture shows, with its sample values (e.g. "Protegus app, SP5 Thermostats page…").

## Keeping up with the app

The beta app changes every week. Before a review round, fetch the labels and compare them with the
last copy, look for the product's new front-end changes, recapture the changed screens, and fix the
text they touch.

## Checks before pushing

- `mkdocs build --strict` passes (Python venv with `requirements.txt`).
- Every image file exists and every `#anchor` link resolves in the built page.
- Look at the changed sections in the pull request's Netlify deploy preview.
- Pull before you start and before you push: more than one person writes to this branch.
