# TRIKDIS Documentation

This repository hosts the TRIKDIS product documentation and manuals, built with MkDocs Material and published to GitHub Pages at https://docs.trikdis.com.

## Critical Configuration
- Keep GitHub-style alerts enabled: `markdown_callouts` in `mkdocs.yml` and `markdown-callouts>=0.3.0` in `requirements.txt` (see `GITHUB_ALERTS_CONFIG.md`).
- Heading numbering uses `mkdocs-add-number-plugin` with `order: 2`.
- Conversion filters normalize lists, tables, and callouts—avoid manual tweaks that fight the pipeline.

## Quick Start (Local)
```bash
cd manuals
python3 -m pip install -r requirements.txt
python3 -m mkdocs serve
```
For the shared preview port we often reuse `mkdocs serve -a 127.0.0.1:8892` (see below for a restart helper).

To verify the production-style search index locally:
```bash
.venv/bin/mkdocs build --strict
node Scripts/check_pagefind_smoke.mjs --site site
node Scripts/check_query_expansion.mjs --site site
python3 Scripts/check_search_scopes.py --site site
```
`mkdocs_hooks.py` now auto-runs Pagefind at the end of each build/serve cycle and writes it to the active `site_dir` (including MkDocs temp dirs used by `mkdocs serve`). If you need to disable that behavior temporarily, use `MKDOCS_PAGEFIND_AUTOINDEX=0`.

For CI parity or manual reindexing, you can still run:
```bash
npx -y pagefind --site site
```

For browser-level modal behavior checks (manual scope + immediate language fallback UI and no Lunr runtime request), run:
```bash
npm install
PAGEFIND_BASE_URL=http://127.0.0.1:8000 npm run test:search-ui
```
This expects a running docs server. For a one-shot serve + UI verification flow:
```bash
npm install
Scripts/check_pagefind_serve.sh 8011
```

## Repository Layout
```
mkdocs.yml                 # MkDocs configuration (theme, navigation, build settings)
docs/
  index.md                 # Landing page content
  manual/                  # Generated manuals live here (one folder per manual)
    index.md               # Manual content in Markdown (images in the same folder)
    image*.png             # Referenced illustrations (relative links e.g. ./image1.png)
  stylesheets/base.user.css# Shared styling used by MkDocs and Typora
```
All Markdown files live under `docs/`. MkDocs treats that directory as the site root when building.

## Conversion Pipeline
Manuals originate from DOCX files and are converted with the companion project `knowledgebase-conversion-pipeline`. The conversion scripts handle:
- extracting text/images into `docs/manuals/<manual-name>/`
- normalising headings and callouts
- ensuring image links use `./image.png` for safe relative paths

Typical flow for a new or updated manual:
1. From the pipeline project run `./convert-single.sh "docx manuals/<file>.docx"`.
2. Copy the generated folder to this repo: `cp -r <pipeline>/docs/<manual-name> docs/`
3. Run `python3 update_navigation.py && python3 generate_homepage.py` (or let GitHub Actions do it)
4. Commit and push

## Preview Locally
Run MkDocs in dev mode to inspect changes before pushing:
```bash
cd projects/trikdis-docs/manuals
pipx run --spec mkdocs-material mkdocs serve --dev-addr 127.0.0.1:8000
```
The command installs MkDocs Material (via `pipx`) if necessary and serves the site at `http://127.0.0.1:8000`. Stop with `Ctrl+C`.

### Quick restart on the shared preview port (127.0.0.1:8892)
We often reuse `mkdocs serve -a 127.0.0.1:8892` during multi-manual QA. The process sometimes leaves a background child bound to the port after you stop the parent, so a fresh `mkdocs serve` fails with `OSError: [Errno 48] Address already in use`.
```bash
# Kill any stale preview instances first (fast, idempotent)
pkill -f 'mkdocs serve -a 127.0.0.1:8892' || true

# Relaunch in the background so the shell is free immediately
cd /Users/local/projects/trikdis-docs/manuals
nohup mkdocs serve -a 127.0.0.1:8892 >/tmp/mkdocs-serve.log 2>&1 &

# Confirm the listener (optional)
lsof -nP -i tcp:8892
```
With this sequence the old process is removed instantly and the new server starts within a second or two. Logs stream to `/tmp/mkdocs-serve.log` for inspection.

## Publishing Pipeline
Publishing is fully automated via GitHub Pages:
1. Push or merge into `main`.
2. The workflow `.github/workflows/deploy.yml` checks out the repo, installs MkDocs + MkDocs Material, runs `mkdocs build --strict` (output in `site/`), then builds the Pagefind index (`npx -y pagefind --site site`).
3. The built static site is uploaded as an artifact and deployed with `actions/deploy-pages@v4` to the `gh-pages` branch. GitHub Pages serves the result at `https://docs.trikdis.com`.

The deploy workflow also publishes a `CNAME` so the custom domain stays pinned to `docs.trikdis.com`. No manual intervention is needed after a push—wait for the Pages deployment badge to turn green.

## Automatic Navigation & Homepage
Both the navigation (`mkdocs.yml`) and homepage (`docs/index.md`) are automatically generated from the `docs/` directory structure.

### How It Works
1. **Scan docs/**: `update_navigation.py` finds all folders with `index.md` files
2. **Update nav**: Updates `mkdocs.yml` with discovered manuals
3. **Generate homepage**: `generate_homepage.py` creates homepage from nav structure

### Manual Updates
After adding a new manual to `docs/`:
```bash
python3 update_navigation.py    # Scan docs/ and update mkdocs.yml
python3 generate_homepage.py    # Generate homepage from nav
```
### Automatic Updates
During GitHub Actions deployment:
1. Navigation is auto-updated from `docs/` structure
2. Homepage is auto-generated from navigation
3. Site is built and deployed

**You don't need to manually edit `mkdocs.yml` or `docs/index.md`!**

### Category Detection
Manuals are categorized by folder name:
- `alarm-communicators/` → Alarm Communicators
- `control-panels/` → Control Panels
- `controllers/` → Controllers
- etc.

If no category keyword is found in the folder name, it defaults to "Alarm Communicators".

## Updating Styling
- Adjust shared styling in `docs/stylesheets/base.user.css`. Typora is symlinked to the same file, so changes affect both the local Markdown editor and the published site.

## Search Behavior
- Search modal UI stays Material-based, but search execution is handled by Pagefind in `docs/javascripts/pagefind-modal-search.js`.
- Pagefind indexing is triggered automatically in `mkdocs_hooks.py` (`on_post_build`) for both `mkdocs build` and `mkdocs serve`.
- Synonym/query expansion dictionary is maintained in `docs/javascripts/search-synonyms.json`.
- Runtime scopes are injected into each language page by `mkdocs_hooks.py`:
  - `lang`
  - `manual`
  - `subcategory`
- Synonym expansion is feature-flagged in `mkdocs.yml` (`extra.search_synonyms_enabled`).
- Optional runtime override for QA: append `?search_synonyms=1` (enable) or `?search_synonyms=0` (disable).
- Search fallback flow:
  1. Current manual scope
  2. If empty, immediately show whole-language results in the same modal section (with divider + title)
- Each result card includes an origin breadcrumb (for example `Communicators > Cellular > GT`) derived from scoped path metadata/URL.
- Balanced expansion flow (when enabled):
  1. Exact query first
  2. Phrase synonym variants always run within the same scope
  3. Token synonym variants run only when exact coverage is low (fewer than 3 unique result pages)
  4. Expansion hint is shown only when synonym variants contributed to displayed results
- The MkDocs `search` plugin remains enabled temporarily for theme compatibility; runtime search results are sourced from Pagefind.

## Troubleshooting
- **Images missing**: ensure links look like `![](./image3.png)`; the conversion pipeline adds this automatically. MkDocs copies the files from `docs/manual/` into the published `manual/` folder.
- **New manual not visible**: verify it is referenced in `mkdocs.yml` and that the Pages workflow succeeded.
- **Local build errors**: run `pipx run --spec mkdocs-material mkdocs build` to get strict error messages before pushing.

With this setup, any future manual update is simply a conversion + commit + push cycle. The GitHub Actions workflow handles building and deploying the site automatically.
