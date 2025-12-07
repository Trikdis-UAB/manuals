# TRIKDIS Documentation Project

**Location:** `/Users/local/projects/trikdis-docs/`

## Project Overview

TRIKDIS product documentation system with automated DOCX-to-Markdown conversion pipeline and GitHub Pages deployment.

## Repository Structure

This project contains **two separate git repositories**:

### 1. manuals/ (Public Documentation Site)
- **Repository:** `git@github.com:Trikdis-UAB/manuals.git`
- **Purpose:** Public documentation site published to GitHub Pages
- **URL:** https://docs.trikdis.com
- **Technology:** MkDocs Material
- **Working Directory:** `/Users/local/projects/trikdis-docs/manuals/`

### 2. manuals-darbiniai/ (Working Files)
- **Repository:** `git@github.com:Trikdis/manuals-darbiniai.git`
- **Purpose:** Work-in-progress documentation before publishing
- **Description:** "Čia mūsų TRIKDIS instrukcijų darbiniai failai, kol dar neįkelti į manuals ir nepublikuoti"
- **Working Directory:** `/Users/local/projects/trikdis-docs/manuals-darbiniai/`

### 3. Parent Directory (Not a Git Repo)
- Contains README.md with project overview
- Contains seed_docs.sh script
- Not version controlled itself

## Conversion Pipeline

**Pipeline Location:** `/Users/local/projects/knowledgebase-conversion-pipeline/`
**Pipeline Repository:** `git@github.com:andrius-tr/knowledgebase-conversion-pipeline.git`

### Conversion Process

1. **Convert DOCX to Markdown:**
   ```bash
   cd /Users/local/projects/knowledgebase-conversion-pipeline
   ./convert-single.sh "docx manuals/<filename>.docx"
   ```

2. **Output Location:**
   - Creates `docs/<manual-name>/` folder
   - Contains `index.md` and `image*.png` files

3. **Deploy to Site:**
   ```bash
   # Copy to working directory first
   cp -r docs/<manual-name>/ /Users/local/projects/trikdis-docs/manuals-darbiniai/docs/manual/

   # Review and test
   cd /Users/local/projects/trikdis-docs/manuals-darbiniai
   mkdocs serve

   # When ready, copy to public site
   cp -r docs/manual/ /Users/local/projects/trikdis-docs/manuals/docs/manual/
   cd /Users/local/projects/trikdis-docs/manuals
   git add docs/manual/
   git commit -m "Update manual: <name>"
   git push
   ```

### Pipeline Features (Updated 2025-10-01)

- **Table Structure Fixes:** Removes H1 tags in cells, fixes malformed headers
- **GitHub Alerts:** Converts to MkDocs admonitions (NOTE, IMPORTANT, WARNING, CAUTION)
- **List Continuity:** Smart numbered list continuation across images and sections
- **Spacing Normalization:** Reduces excessive whitespace
- **Image Handling:** Relative paths with `./image.png` format
- **Underline Conversion:** HTML `<u>` tags to markdown
- **Title Generation:** Adds H1 title and main image automatically

## MkDocs Configuration

### Required Extensions

**CRITICAL:** The following must be configured in `mkdocs.yml`:

```yaml
markdown_extensions:
  - markdown_callouts  # For GitHub-style alerts

plugins:
  - search
  - add-number:
      order: 2           # Start numbering from H2 (skip H1)
      strict_mode: false # Required for proper numbering
      excludes:
        - index.md       # Don't number homepage
```

**requirements.txt (Updated 2025-10-02 - Pinned Versions):**
```
mkdocs==1.6.1
mkdocs-material==9.6.20
mkdocs-add-number-plugin==1.2.2
markdown-callouts==0.4.0
PyYAML==6.0.2
mkdocs-redirects==1.2.2
mkdocs-minify-plugin==0.8.0
```

⚠️ **WARNING:**
- Removing these will break alert rendering!
- **NEVER** change `order: 2` or `strict_mode: false` - this is the ONLY working configuration for heading numbering
- `order: 2` + `strict_mode: false` = H1 unnumbered, H2+ numbered correctly

### Supported Alert Types

```markdown
> [!NOTE]
> Informational content

> [!IMPORTANT]
> Critical information

> [!WARNING]
> Warning content

> [!CAUTION]
> Caution content
```

## Local Development

### Preview Changes

```bash
# For public site
cd /Users/local/projects/trikdis-docs/manuals
python3 -m pip install -r requirements.txt
python3 -m mkdocs serve
# Visit http://127.0.0.1:8000

# For working files
cd /Users/local/projects/trikdis-docs/manuals-darbiniai
mkdocs serve
```

### Alternative (using pipx)
```bash
cd /Users/local/projects/trikdis-docs/manuals
pipx run --spec mkdocs-material mkdocs serve --dev-addr 127.0.0.1:8000
```

## Decap CMS (Web-based Content Editor)

**Status:** ✅ Deployed in test-repo mode (OAuth required for production use)
**Access:** https://docs.trikdis.com/admin/
**Documentation:** See `manuals/DECAP_CMS_SETUP.md`
**Deployed:** October 3, 2025

Decap CMS provides a user-friendly web interface for editing documentation through your browser.

### Setup Required

To activate Decap CMS, you need to:
1. Create a GitHub OAuth App
2. Deploy a Cloudflare Worker for OAuth proxy
3. Update `base_url` in `docs/admin/config.yml`

**See detailed instructions:** `manuals/DECAP_CMS_SETUP.md`

### When to Use Decap CMS

**✅ Use CMS for:**
- Quick typo fixes
- Minor content updates
- Adding new Markdown-native content
- Creating pages not derived from DOCX

**⚠️ DO NOT use CMS for:**
- Editing converted DOCX manuals (use conversion pipeline instead)
- Major restructuring
- Batch updates across multiple files

## Deployment

### Automatic Deployment (Optimized 2025-10-02)

**Public site (manuals/):**
1. Push to `main` branch (only triggers on relevant file changes)
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. Uses pip caching for faster builds (~30s saved)
4. Generates homepage automatically
5. Builds with `mkdocs build --strict`
6. Minifies HTML/CSS/JS for smaller pages
7. Deploys only changed files to `gh-pages` branch
8. Published to https://docs.trikdis.com

**CI/CD Optimizations:**
- Pip caching (saves ~30 seconds per build)
- Concurrency control (cancels superseded runs)
- Only triggers on changes to: docs/, mkdocs.yml, requirements.txt, workflows
- HTML/CSS/JS minification enabled
- Pinned dependency versions for reproducible builds

**No manual intervention needed** - just push to main!

### Manual Build Test

```bash
cd /Users/local/projects/trikdis-docs/manuals
mkdocs build --strict
# Check site/ directory for output
```

## Documentation Structure (Updated 2025-10-02)

The documentation uses a **simple direct-path structure** for optimal navigation and build speed.

### Structure

```
manuals/
├── mkdocs.yml                      # Root config with direct paths
├── docs/
│   ├── index.md                    # Auto-generated homepage
│   ├── en/                         # English manuals
│   │   └── alarm-communicators/
│   │       └── gt-cellular/
│   │           ├── index.md
│   │           └── image*.png
│   ├── lt/                         # Lithuanian manuals (future)
│   ├── es/                         # Spanish manuals (future)
│   └── ru/                         # Russian manuals (future)
```

### Navigation

Navigation uses **direct file paths** in `mkdocs.yml`:

```yaml
nav:
  - Home: index.md
  - English:
      - Alarm Communicators:
          - GT Cellular Communicator: en/alarm-communicators/gt-cellular/index.md
```

**Why not monorepo plugin?**
- Creates duplicate navigation items for single-page manuals
- Adds unnecessary complexity
- Direct paths work better for our use case (50+ single-page manuals)
- Build time: ~1-2 minutes for 50 manuals (acceptable)

## Automatic Homepage Generation (Added 2025-10-01)

The homepage (`docs/index.md`) is **automatically generated** from the `nav` structure in `mkdocs.yml`.

### How It Works

1. **`generate_homepage.py`**: Reads `mkdocs.yml` nav structure and generates `docs/index.md`
2. **GitHub Actions**: Runs script automatically before deployment

### Scripts Available

- **`generate_homepage.py`**: Generate homepage from nav structure (runs automatically in CI)

## Workflow

### Adding a New Manual (Updated 2025-10-02)

1. **Convert DOCX:**
   ```bash
   cd /Users/local/projects/knowledgebase-conversion-pipeline
   ./convert-single.sh "docx manuals/Product_Manual.docx"
   ```

2. **Copy to docs directory:**
   ```bash
   cd /Users/local/projects/trikdis-docs/manuals
   mkdir -p docs/en/category-name/product-slug
   cp -r /Users/local/projects/knowledgebase-conversion-pipeline/docs/[manual-name]/* \
         docs/en/category-name/product-slug/
   ```

3. **Update navigation in `mkdocs.yml`:**
   ```yaml
   nav:
     - Home: index.md
     - English:
         - Category Name:
             - GT Cellular Communicator: en/alarm-communicators/gt-cellular/index.md
             - New Product: en/category-name/product-slug/index.md
   ```

4. **Generate homepage and deploy:**
   ```bash
   python3 generate_homepage.py
   git add .
   git commit -m "Add Product Manual"
   git push
   ```

**Key Points:**
- No separate mkdocs.yml per manual needed
- Direct file paths in navigation
- Homepage auto-generated from nav
- Single build process for all manuals

### Updating an Existing Manual

1. Convert latest DOCX with pipeline
2. Replace content in `manuals-darbiniai/` first
3. Test locally
4. Copy to `manuals/` when ready
5. Commit and push to deploy

## File Structure (Updated 2025-10-02)

```
trikdis-docs/
├── CLAUDE.md                      # Project documentation
├── README.md                      # Project overview (not in git)
├── manuals/                       # PUBLIC SITE REPO
│   ├── .git/                     # → Trikdis-UAB/manuals
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy.yml        # Optimized CI/CD pipeline
│   ├── mkdocs.yml                # MkDocs config (direct paths)
│   ├── requirements.txt          # Pinned dependencies
│   ├── generate_homepage.py      # Auto-generate homepage
│   └── docs/
│       ├── index.md              # Auto-generated homepage
│       ├── stylesheets/
│       │   ├── base.user.css     # Custom styling
│       │   └── numbered-headings.css
│       ├── javascripts/
│       │   └── redirect-trailing-slash.js
│       └── en/                   # English manuals
│           └── alarm-communicators/
│               └── gt-cellular/
│                   ├── index.md
│                   └── image*.png
└── manuals-darbiniai/            # WORKING FILES REPO
    ├── .git/                     # → Trikdis/manuals-darbiniai
    ├── mkdocs.yml
    └── docs/                     # Work in progress manuals
```

## Troubleshooting

### GitHub Alerts Not Rendering
- Check `mkdocs.yml` has `markdown_callouts` extension
- Verify `requirements.txt` includes `markdown-callouts>=0.3.0`
- See `GITHUB_ALERTS_CONFIG.md` in manuals repo

### Images Not Showing
- Ensure image links use `./image.png` format (relative paths)
- Check images are in the same directory as `index.md`
- Pipeline handles this automatically

### Tables Malformed
- Pipeline includes `fix_table_structure.py` filter
- Removes H1 tags from cells
- Fixes rowspan issues
- See `TABLE_STRUCTURE_FIX.md` in pipeline repo

### List Numbering Broken
- Pipeline includes `maintain-list-continuity.lua` filter
- Handles numbered lists across images and sections
- Should work automatically during conversion

### Build Fails on GitHub Actions
- Run `mkdocs build --strict` locally first
- Check deployment workflow logs on GitHub
- Verify all images are committed
- Check for broken links in markdown

### Changes Not Appearing on Site
- Wait 2-3 minutes for GitHub Pages deployment
- Check workflow status: `gh run list --repo Trikdis-UAB/manuals`
- Clear browser cache

## Related Projects

### Conversion Pipeline
- **Path:** `/Users/local/projects/knowledgebase-conversion-pipeline/`
- **Repo:** `git@github.com:andrius-tr/knowledgebase-conversion-pipeline.git`
- **Documentation:** See `FILTER_USAGE.md`, `TABLE_STRUCTURE_FIX.md`, `GITHUB_ALERTS_CONFIG.md`

## Quick Commands

```bash
# Check repo status
cd /Users/local/projects/trikdis-docs/manuals && git status
cd /Users/local/projects/trikdis-docs/manuals-darbiniai && git status

# Preview sites
cd /Users/local/projects/trikdis-docs/manuals && mkdocs serve
cd /Users/local/projects/trikdis-docs/manuals-darbiniai && mkdocs serve

# Convert DOCX
cd /Users/local/projects/knowledgebase-conversion-pipeline
./convert-single.sh "docx manuals/<file>.docx"

# Find latest manual for a product
cd /Users/local/projects/trikdis-docs
./find-latest-manual.sh "/Volumes/TRIKDIS/PRODUKTAI/GET"

# Optimize images in a manual directory (manual optimization)
cd /Users/local/projects/trikdis-docs
./optimize-images.sh manuals/docs/en/alarm-communicators/get-cellular

# Note: Image optimization is now AUTOMATIC during conversion
# The convert-single.sh script automatically optimizes all images:
# - Max width: 1200px (suitable for A4 print at 150 DPI)
# - Quality: 85% (visual quality vs file size balance)
# - PNG optimization with pngquant if available
# - Typical reduction: 65-75% file size

# Deploy public site (automatic on push)
cd /Users/local/projects/trikdis-docs/manuals
git add .
git commit -m "Update documentation"
git push
```

## Image Optimization (Added 2025-10-02)

### Automatic Optimization During Conversion

All images are automatically optimized during DOCX conversion with optimal settings for web and A4 print:

**Optimization Settings:**
- **Max width**: 1200px (suitable for A4 at 150 DPI)
- **Quality**: 85% (optimal balance of visual quality vs file size)
- **PNG compression**: Uses pngquant if available (80-95% quality range)
- **Typical reduction**: 65-75% file size savings

**Technical Details:**
- Images >1200px are resized using `sips -Z 1200`
- PNG files compressed with `pngquant --quality=80-95 --force`
- JPG/JPEG files resized but not recompressed
- All processing done in convert-single.sh (lines 133-152)

**Results:**
- GET manual: Images optimized from original DOCX sizes to 28KB-265KB
- GT/GT+ manuals: Similar optimization ratios
- Fast page loads while maintaining print quality

### Manual Optimization

For existing manuals not yet optimized, use the standalone script:

```bash
cd /Users/local/projects/trikdis-docs
./optimize-images.sh manuals/docs/en/alarm-communicators/[product]/
```

This applies the same optimization settings to all PNG/JPG/JPEG files in the directory.

## Quality Checklist - ALWAYS Verify Before Completing Tasks

**Before claiming a task is complete, ALWAYS:**

1. ✅ **Verify the actual output** - Read/view the final result, don't just trust the process
2. ✅ **Test the rendered result** - Check live preview or deployed site
3. ✅ **Look for edge cases** - Check multiple instances of the same pattern
4. ✅ **Validate all changes** - Ensure the fix actually worked as intended
5. ✅ **Commit accurate messages** - Only claim fixes that are verified to work

**Example:** "Fixed table structure" ❌ until you've actually viewed the rendered table
**Better:** Check the table → Verify it's fixed → Then commit with accurate description

## Important Notes (Updated 2025-10-02)

1. **Two Separate Repos:** Don't confuse `manuals/` (public) with `manuals-darbiniai/` (working)
2. **Test First:** Always test in `manuals-darbiniai/` before publishing to `manuals/`
3. **Pipeline First:** Always convert DOCX with pipeline, never edit markdown manually
4. **Git Each Separately:** Each repo has its own git history and remote
5. **Alerts Configuration:** Critical for proper rendering - don't remove extensions
6. **Auto-deployment:** Public site deploys automatically on push to main
7. **Auto-homepage:** Homepage is auto-generated from nav - don't edit `docs/index.md` manually
8. **Direct Paths:** Use direct file paths in navigation, not monorepo !include directives
9. **Pinned Versions:** Don't change version numbers in requirements.txt without testing
10. **Single Build:** All manuals build together (~1-2 min for 50 manuals)
11. **Image Optimization:** Automatic during conversion - no manual intervention needed
12. **ALWAYS VERIFY:** Check actual output before claiming completion (see Quality Checklist above)

## Contact

Project Owner: Andrius (obsmind)
TRIKDIS Organization: Trikdis-UAB (public), Trikdis (working files)
