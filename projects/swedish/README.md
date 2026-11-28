# Swedish manuals (docs/sv)

Started 2026-11-27 for Teletec (Sweden). Status per page: `progress.md`.

## How it works

- **Translators:** Claude Sonnet subagents, one page each, following `TRANSLATION-BRIEF.md`,
  `glossary-sv.md` and `style-guide-sv.md`.
- **Supervisor:** the Opus session runs the checks, reads each page, keeps the glossary
  consistent and decides term questions.
- **Checks:** `scripts/check_structure.py` (EN vs SV structure, images, links, numbers),
  `scripts/check_anchors.py` (section links after build), then `mkdocs build --strict`.
- **Native review:** Erik Haversten at Teletec settles the "Open questions" in the style
  guide and proofreads the pilot pages before the language goes public.

## What worked (2026-11-27/28, all 69 pages in two days)

- **Families, model page first.** Translate one page of a family (GET, G16, E16, SP3, FireCom,
  GATOR, the DSC quick setup), check it, then have the siblings reuse its Swedish for identical
  English. GT+ took ~75 % from GET; CG17 ~45 % from SP3. Siblings read the same and cost less.
- **Up to ~8 Sonnet translators in parallel** in one worktree, each owning its own files; the
  supervisor alone edits shared files (glossary, mkdocs.yml, brief) and commits.
- **Translation finds English errors.** Translators compare text with screenshots and section
  numbers; they fix the Swedish to match the screen and report. Real errors were fixed in English
  in the same PR; the rest are in `source-issues.md`.
- **After each batch:** `build_sv_nav.py --write`, build, `switch_en_links.py <site> --write`,
  rebuild, `check_anchors.py`, `check_structure.py --all`, banned-term grep (kommunikator, zon,
  larma på, kontonummer).
- **When Erik answers:** change the glossary row first, then replace across `docs/sv` with a script,
  then rerun the checks.

## Where the terminology comes from

Five Swedish installation and programming manuals Erik sent on 2026-11-12 (DSC
PowerSeries Neo guide by Teletec, PC1616/1864, Power 864/PC5020). They are third-party
copyrighted documents, so they stay in the private Workspace:
`Workspace/Accounts/Teletec — Nordics/Swedish manual samples/` (PDFs and extracted text).
Only the term list and style rules derived from them live here.

## Swedish is hidden until reviewed

The `sv` pages build and are reachable by URL (`/sv/...`), but:

- the language menu hides Svenska (rule at the end of `docs/stylesheets/base.user.v2.css`),
- `docs/robots.txt` disallows `/sv/`.

**Launch** = remove both, add a Swedish homepage text to `generate_homepage.py` if not done,
and check the language switch from an English page that has no Swedish twin yet.

## Images

Screenshots and diagrams are copied from English by `scripts/prepare_page.sh`. The
TrikdisConfig and Protegus interfaces have no Swedish, so English screenshots are what a
Swedish installer sees. Diagrams with English captions may get Swedish versions later.
