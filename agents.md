# Repository Guidelines

## Project Structure & Modules
- `docs/` — source markdown and assets (images per manual folder).
- `mkdocs.yml` — site config, nav, plugins, extra JS/CSS.
- `Scripts/` — maintenance helpers (e.g., `fix_callouts.py`, `link_chapters.py`, `check_mobile_toc.py`).
- `docs/javascripts/` & `docs/stylesheets/` — custom behavior and theming.
- `.venv/` — local Python env (pinned in `requirements.txt`).
- General project description: see `CLAUDE.md` (this file is the core instructions source and takes precedence).
- Repo: https://github.com/Trikdis-UAB/manuals (source of truth).
- DOCX → Markdown pipeline: https://github.com/Trikdis-UAB/knowledgebase-conversion-pipeline (use for imports; local clone often at `~/Projects/knowledgebase-conversion-pipeline`).
- Navigation helper: `docs/_NAVIGATION.md` should mirror `mkdocs.yml` ordering; update it when nav changes.

## Build, Test, and Development
- Install deps (once): `python3 -m pip install -r requirements.txt` (or use `.venv/bin/pip`).
- Strict build: `.venv/bin/mkdocs build --strict` (fails on nav/link/format issues).
- Local preview: `.venv/bin/mkdocs serve --dev-addr 127.0.0.1:8000 --strict`.
- Mobile TOC smoke: `.venv/bin/python Scripts/check_mobile_toc.py` (Playwright headless check for GT/GET pages).
- Normalize callouts/headings: `.venv/bin/python Scripts/fix_callouts.py` (run after DOCX conversion).
- Auto-link “See chapter …”: `.venv/bin/python Scripts/link_chapters.py`.
- Prefer `.venv/bin/...` commands to avoid picking up system mkdocs/python.

## Coding Style & Naming
- Keep Markdown plain and numbered headings consistent (plugin config in `mkdocs.yml`; do not change `add-number` order/strict settings).
- Admonitions: use standard markdown callouts (`> [!NOTE] …`) or `!!! note` blocks; avoid inline fused headings.
- Paths: use relative `./imageX.png` for assets; keep filenames ASCII, hyphen-separated where possible.
- Custom JS/CSS: brief, focused; avoid heavy frameworks; keep mobile behavior tested.

## Testing Guidelines
- Minimum: run `mkdocs build --strict` before commit.
- UI/behavior changes: run relevant targeted checks (e.g., `Scripts/check_mobile_toc.py` for mobile drawer/TOC).
- Mobile layout sanity: `Scripts/check_mobile_toc.py` also validates mobile sidebar overlay/no reserved space; run after UI CSS/JS tweaks.
- For UI regressions, add or expand targeted checks with explicit assertions for the observed behavior (layout, visibility, interactions) and document the command in handoffs.
- For mobile nav/dropdown issues, extend `Scripts/check_mobile_toc.py` to click-expand a product category and assert the submenu renders.
- Before implementing changes, review the objective, surface risks/unknowns, and add or extend automated checks so new behavior is validated to a professional standard.
- After conversions: re-run `fix_callouts.py` and `link_chapters.py` to prevent regressions.
- Add small, scriptable checks when introducing new behaviors; document the command in PR notes.
- When converting other-language manuals for a product that was just updated in English, compare the converted outputs against the English version to catch missing/extra headings, duplicated text, and broken button markers.

## Handoff Note (docs UI tweaks)
- Status: Active (continuing docs.trikdis.com UI tweaks task; added / → /en/ redirect and homepage duplication, updated checks; investigating left sidebar top “bulge”).
- TODO: Add per-language search support and constrain search to the selected document/manual.
- UI CSS updates already applied in `docs/stylesheets/base.user.css`: responsive language selector (no fixed width), `.language-card` padding 20px, smaller grey `#welcome-message`, TOC background `#F6F6F6`, active TOC item `#E4E4E4`, TOC left border `#D2D1D1`, and deep-nav (level 3+) left border `#D2D1D1`.
- JS nav behavior now sets default top-level expansion (Keypads collapsed unless on /keypads/) without overriding native chevron clicks in `docs/javascripts/language-ui.js`.
- Began MkDocs i18n refactor in `mkdocs.yml`: top-level nav now points to `en/...`, and `mkdocs-static-i18n` config adds a dummy default locale `xx` plus per-language navs; build currently fails because default build cannot resolve `en/...` docs with folder-based i18n.
- `requirements.txt` now includes `mkdocs-static-i18n==1.2.3`.
- `Scripts/check_mobile_toc.py` expanded to check desktop styles and language nav isolation in addition to mobile TOC behavior.
- Bulge investigation: DevTools shows `.md-nav__title` still has height (5.6rem) and nav was `position:absolute` inside `.md-sidebar__inner` with height 0. Applied CSS in `docs/stylesheets/base.user.css` to hard-hide title (`display:none !important; height:0; margin/padding 0`) and set `.md-sidebar--primary .md-nav--primary { position: static !important; }`. Local Playwright checks show nav/inner top alignment and no visible bulge, but user still sees it in browser.
- If bulge persists, check for cached CSS or other styles overriding `base.user.css` in dev server. Ask user to hard refresh after restarting `mkdocs serve`. Next step: use newly added Chrome DevTools MCP to inspect live DOM/computed styles for `.md-sidebar--primary` and confirm final computed `position`/`height`/`display` values for nav/title/inner.
- MCP note: user added Chrome DevTools MCP (https://github.com/ChromeDevTools/chrome-devtools-mcp); restart required to access it.

## Commit & Pull Request Guidelines
- Commits: concise, imperative (e.g., “Normalize SP3 callouts”, “Lazy-load content images”).
- Include what changed and why in the PR description; link related issues/tasks.
- For UI changes, note manual test steps and viewports; attach screenshots/gifs if relevant.
- Ensure Playwright/targeted scripts and strict build are run; mention the commands in the PR.

## Security & Configuration
- No secrets in repo; use local env/.venv only.
- Extra JS/CSS is loaded from `docs/javascripts`/`stylesheets`; avoid remote/CDN dependencies unless already approved.
