# TRIKDIS Manuals (Public)

This repository hosts the public documentation site for TRIKDIS manuals. Content is written in Markdown and published with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) to GitHub Pages.

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
2. Copy the generated folder (`docs/manuals/<manual-name>/`) into this repo as `docs/manual/` (or another nav location).
3. Commit the Markdown + images.

## Preview Locally

Run MkDocs in dev mode to inspect changes before pushing:

```bash
cd projects/trikdis-docs/manuals
pipx run --spec mkdocs-material mkdocs serve --dev-addr 127.0.0.1:8000
```

The command installs MkDocs Material (via `pipx`) if necessary and serves the site at `http://127.0.0.1:8000`. Stop with `Ctrl+C`.

## Publishing Pipeline

Publishing is fully automated via GitHub Pages:

1. Push or merge into `main`.
2. The workflow `.github/workflows/deploy.yml` checks out the repo, installs MkDocs + MkDocs Material, runs `mkdocs build --strict` (output in `site/`).
3. The built static site is uploaded as an artifact and deployed with `actions/deploy-pages@v4` to the `gh-pages` branch. GitHub Pages serves the result at `https://docs.trikdis.com`.

The deploy workflow also publishes a `CNAME` so the custom domain stays pinned to `docs.trikdis.com`. No manual intervention is needed after a push—wait for the Pages deployment badge to turn green.

## Updating Navigation / Styling

- Edit `mkdocs.yml` to add manuals to the nav (`nav:` section). Use relative paths such as `manual/index.md`.
- Adjust shared styling in `docs/stylesheets/base.user.css`. Typora is symlinked to the same file, so changes affect both the local Markdown editor and the published site.

## Troubleshooting

- **Images missing**: ensure links look like `![](./image3.png)`; the conversion pipeline adds this automatically. MkDocs copies the files from `docs/manual/` into the published `manual/` folder.
- **New manual not visible**: verify it is referenced in `mkdocs.yml` and that the Pages workflow succeeded.
- **Local build errors**: run `pipx run --spec mkdocs-material mkdocs build` to get strict error messages before pushing.

With this setup, any future manual update is simply a conversion + commit + push cycle. The GitHub Actions workflow handles building and deploying the site automatically.
