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
