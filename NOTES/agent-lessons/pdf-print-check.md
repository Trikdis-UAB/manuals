# Checking the manual PDFs before a print-affecting change ships

Staging and deploy previews build **no PDFs**; only the production deploy does. So a change that
reaches print gets its first real PDF in production unless you export one locally. Do that before
merging anything that touches `docs/stylesheets/print.css`, `Scripts/pdf-export.css`,
`docs/javascripts/tool-switcher.js`, content tabs (`=== "…"`), or pages with large images.

## Steps (from the branch's worktree)

1. Build with PDFs on, into a scratch folder:
   `TRIKDOCS_PDF_DOWNLOADS=1 <main tree>/.venv/bin/python -m mkdocs build --strict -d <scratch>/site-pdf`
   This writes `site-pdf/pdf-manifest.json` (198 entries). It is not written when PDFs are off.
2. Cut that manifest down to the pages you changed (match on `src_path`), and save it as a small JSON list.
3. Export. `Scripts/export_manual_pdfs.mjs` launches Playwright's own Chromium, which is **not installed
   on this Mac**, so it fails. Use a copy whose only change is
   `chromium.launch({ headless: true, channel: "chrome" })`. Put the copy in the worktree's `Scripts/` and run
   it from the worktree root, so it picks up that branch's print files (from inside `Scripts/` it looks for
   `Scripts/Scripts/pdf-export.css` and stops):
   `TRIKDOCS_PYTHON_BIN=<main tree>/.venv/bin/python node Scripts/<copy>.mjs --site <scratch>/site-pdf --manifest <small manifest>`.
   The venv Python is needed because stamping uses pikepdf. Delete the copy afterwards.
   - It needs `node_modules`. A symlink from the main tree works, but `node_modules/` in `.gitignore` only matches
     a directory, **not a symlink**. Remove the link afterwards and never `git add -A` while it exists.
4. Check each PDF:
   - **No image cut by a page break.** Walk the content streams and compare where each image is drawn with the
     18 mm top and 24 mm bottom margins.
   - **Tool labels kept.** print.css prints each tab block's label from `data-label` **in capitals**. Search the
     extracted text for `^TRIKDISCONFIG$`, not `TrikdisConfig`. Each count must equal the number of
     `=== "…"` tabs in the source.
   - **No screen-only furniture.** "Configure with" and "The steps below change with your choice." must not
     appear.

Baselines from the 19 Oct 2026 production deploy (#29): GET EN 65 pages / 77 images, GET LT 57 / 60, SP3 "Adding
S8/S9 sensors" EN 28 / 38. Local export with system Chrome can differ by a page; the image count must not.

## Where the helpers are

The image-cut checker (`pdf_image_check.py`), the PDF text/PNG tool (`pdfpages.swift`), the Chrome export copy
(`export_pdf_chrome.mjs`) and the navigation test (`verify-nav-ux.mjs`) are **not in this repo**. They exist only in
the git-excluded `.review/` folders of the `get-app-tabs` and `wiring-split-all` worktrees under
`~/Projects/TRIKDIS/.worktrees/manuals/`. Do not remove those worktrees until the helpers have a home.

## In production

`Scripts/pdf_cache.py` hashes print.css, pdf-export.css, tool-switcher.js, the stamp script, fonts and images
into one global key. A change to any of them regenerates all PDFs on the next deploy. On 19 Oct that took about
3 minutes; on 8 Oct it took about 15. Afterwards, fetch one or two live PDFs and confirm that their creation date
is the deploy time.
