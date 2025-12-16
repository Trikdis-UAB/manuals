# Repository Guidelines

## Project Structure & Modules
- `docs/` — source markdown and assets (images per manual folder).
- `mkdocs.yml` — site config, nav, plugins, extra JS/CSS.
- `Scripts/` — maintenance helpers (e.g., `fix_callouts.py`, `link_chapters.py`, `check_mobile_toc.py`).
- `docs/javascripts/` & `docs/stylesheets/` — custom behavior and theming.
- `.venv/` — local Python env (pinned in `requirements.txt`).

## Build, Test, and Development
- Install deps (once): `python3 -m pip install -r requirements.txt` (or use `.venv/bin/pip`).
- Strict build: `.venv/bin/mkdocs build --strict` (fails on nav/link/format issues).
- Local preview: `.venv/bin/mkdocs serve --dev-addr 127.0.0.1:8000 --strict`.
- Mobile TOC smoke: `.venv/bin/python Scripts/check_mobile_toc.py` (Playwright headless check for GT/GET pages).
- Normalize callouts/headings: `.venv/bin/python Scripts/fix_callouts.py` (run after DOCX conversion).
- Auto-link “See chapter …”: `.venv/bin/python Scripts/link_chapters.py`.

## Coding Style & Naming
- Keep Markdown plain and numbered headings consistent (plugin config in `mkdocs.yml`; do not change `add-number` order/strict settings).
- Admonitions: use standard markdown callouts (`> [!NOTE] …`) or `!!! note` blocks; avoid inline fused headings.
- Paths: use relative `./imageX.png` for assets; keep filenames ASCII, hyphen-separated where possible.
- Custom JS/CSS: brief, focused; avoid heavy frameworks; keep mobile behavior tested.

## Testing Guidelines
- Minimum: run `mkdocs build --strict` before commit.
- UI/behavior changes: run relevant targeted checks (e.g., `Scripts/check_mobile_toc.py` for mobile drawer/TOC).
- After conversions: re-run `fix_callouts.py` and `link_chapters.py` to prevent regressions.
- Add small, scriptable checks when introducing new behaviors; document the command in PR notes.

## Commit & Pull Request Guidelines
- Commits: concise, imperative (e.g., “Normalize SP3 callouts”, “Lazy-load content images”).
- Include what changed and why in the PR description; link related issues/tasks.
- For UI changes, note manual test steps and viewports; attach screenshots/gifs if relevant.
- Ensure Playwright/targeted scripts and strict build are run; mention the commands in the PR.

## Security & Configuration
- No secrets in repo; use local env/.venv only.
- Extra JS/CSS is loaded from `docs/javascripts`/`stylesheets`; avoid remote/CDN dependencies unless already approved.
