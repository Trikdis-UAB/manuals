# MkDocs Heading Numbering Solution

## Problem
Need automatic numbering for MkDocs Material headings:
- H2 headings: 1., 2., 3., etc.
- H3 headings: 1.1., 1.2., 2.1., 2.2., etc.

## Working Solution

### Plugin Configuration (mkdocs.yml)
```yaml
plugins:
  - search
  - add-number:
      order: 2
      strict_mode: false
      excludes:
        - index.md
```

### CSS Configuration (docs/stylesheets/numbered-headings.css)
```css
/* MkDocs Material heading numbering */
/* Numbers are now injected by mkdocs-add-number-plugin into HTML text */
/* Plugin configured with order: 2 to start numbering from H2 level */

/* This should automatically exclude H1 and number H2 as "1., 2., 3." */
/* No custom CSS hiding needed with order: 2 configuration */
```

### Key Points
1. **order: 2** - Numbers H2 headings as main sections (1, 2, 3...)
2. **excludes: [index.md]** - Excludes home page but numbers manual content
3. **No manual numbering in markdown** - Plugin handles everything automatically
4. **Minimal CSS** - No custom overrides needed, plugin works natively

## Results
- Description: **1.** (auto-numbered by plugin)
- Features: **1.1.** (auto-numbered as subsection)
- Quick configuration: **2.** (auto-numbered by plugin)
- Installation and wiring: **3.** (auto-numbered by plugin)
- All subsequent sections numbered sequentially

## What NOT to Do
❌ Don't manually add numbers in markdown (## 1. Description)
❌ Don't use complex CSS overrides or counters
❌ Don't exclude specific headings (h2:first-of-type)
❌ Don't try to mix manual and automatic numbering

## Tested and Working
- Commit: `ff91059` (2025-09-23)
- Original working commit: `1ba4327`
- Live site: https://docs.trikdis.com/manual/

## If Numbering Breaks Again
1. Check `mkdocs.yml` plugin configuration matches above exactly
2. Verify CSS is minimal (no custom ::before rules)
3. Ensure no manual numbers in markdown headings
4. Reference this document and working commits