# TRIKDIS Letterhead Template

Reusable PDF stamper for TRIKDIS-branded documents. This is the generic letterhead variant extracted from the manuals project.

What it does:
- Adds the red footer strip to every page
- Adds clickable footer links for URL, email, and phone
- Adds the corner brand block on page 1
- Adds the running header from page 2 onward by default
- Keeps page numbering in the bottom-right margin
- Uses neutral company defaults suitable for many document types

Files:
- `stamp_pdf_template.py` - the stamper
- `assets/logo-white.png` - white TRIKDIS wordmark used on the red footer
- `assets/logo-full-color-light-bg.png` - full-color TRIKDIS logo used on page 1
- `assets/mark-red.png` - red square TRIKDIS mark used on later-page headers and the footer
- `fonts/NotoSans-Regular.ttf`
- `fonts/NotoSans-Bold.ttf`

Python dependencies:

```bash
python3 -m pip install pillow pikepdf
```

Basic usage:

```bash
python3 stamp_pdf_template.py \
  --input input.pdf \
  --output output.pdf \
  --title "Project Handbook"
```

Example with custom footer text and a more documentation-like running header:

```bash
python3 stamp_pdf_template.py \
  --input input.pdf \
  --output output.pdf \
  --title "Project Handbook" \
  --header-label "TRIKDIS DOCUMENTATION" \
  --footer-url "trikdis.com" \
  --footer-url-link "https://trikdis.com" \
  --footer-email "info@trikdis.com" \
  --footer-email-link "mailto:info@trikdis.com" \
  --footer-phone "+370 00 000000" \
  --footer-phone-link "tel:+37000000000" \
  --footer-address "Example address line"
```

Useful knobs:
- `--show-header-from 2`
  Starts the running header on page 2. Set `1` if you want the running header on every page.
- `--cover-logo`
  Full-color page-1 logo. Defaults to `assets/logo-full-color-light-bg.png`.
- `--no-cover-logo`
  Disables the page-1 corner logo entirely if your source PDF already has its own cover treatment.
- `--header-label`
  Small red text above the running title, for example `TRIKDIS`, `TRIKDIS DOCUMENTATION`, or `TRIKDIS MANUALS`.
- `--page-label-format`
  Default: `Page {page_number} of {total_pages}`

Defaults:
- header label: `TRIKDIS`
- footer URL: `trikdis.com`
- footer email: `support@trikdis.lt`
- footer phone: `+370 37 408040`
- footer address: `Draugystes str. 7, LT-51229 Kaunas, Lithuania`

Notes:
- The template does not paginate HTML. It stamps an already-generated PDF.
- The script preserves existing page content and adds overlays.
- The default assets and fonts are resolved relative to the script, so you can move the whole folder together.
- If you need different branding assets, replace the PNGs in `assets/` or point to different files with `--logo` and `--mark`.
- For manuals-specific defaults, override `--header-label "TRIKDIS MANUALS"` and use a docs-specific footer URL if needed.
