# MkDocs Monorepo Plugin Migration Plan

**Date:** 2025-10-01
**Current Status:** Planning phase
**Estimated Time:** 30-45 minutes

## Why We're Doing This

**Problem:** With current setup, editing one manual requires building ALL manuals locally. With 50 manuals, this could take 3-4 minutes every time someone wants to preview changes.

**Solution:** mkdocs-monorepo-plugin allows each manual to be built independently during local development, while still combining everything for production deployment.

## Benefits

### For Developers/Editors:
- **Fast local builds**: Edit one manual, build only that manual (5 seconds vs 3-4 minutes)
- **Independent configs**: Each manual has its own `mkdocs.yml`
- **Team ownership**: Each team/person can own their manual folder
- **VS Code friendly**: Open just your manual folder, work independently

### For Production:
- **Single unified site**: Still deploys as one site at docs.trikdis.com
- **Unified navigation**: All manuals accessible from one place
- **Consistent styling**: Shared themes and CSS
- **Single search index**: Search across all manuals

### For Conversion Pipeline:
- **Clear output structure**: Each converted DOCX goes to its own folder
- **Language organization**: Easy to organize by language (en/, lt/, es/, ru/)
- **Product categories**: Easy to group by category (alarm-communicators/, control-panels/)

## Current Structure

```
manuals/
├── mkdocs.yml                    # One config for entire site
├── requirements.txt
├── docs/
│   ├── index.md                  # Home page
│   ├── images/
│   │   └── categories/           # Product category images
│   ├── stylesheets/
│   │   ├── base.user.css
│   │   └── numbered-headings.css
│   └── manual/                   # GT Cellular Communicator
│       ├── index.md
│       └── image1.png, image2.png, ...
└── .github/
    └── workflows/
        └── deploy.yml
```

## Target Structure

```
manuals/
├── mkdocs.yml                    # Root config with !include directives
├── requirements.txt              # Add mkdocs-monorepo-plugin
├── docs/
│   ├── index.md                  # Home page (unchanged)
│   ├── images/
│   │   └── categories/           # Product category images (unchanged)
│   └── stylesheets/              # Shared styles (unchanged)
│       ├── base.user.css
│       └── numbered-headings.css
├── en/                           # English manuals
│   └── alarm-communicators/
│       └── gt-cellular/
│           ├── mkdocs.yml        # GT-specific config
│           └── docs/
│               ├── index.md      # GT manual content
│               └── image1.png, image2.png, ...
├── lt/                           # Lithuanian manuals (future)
├── es/                           # Spanish manuals (future)
├── ru/                           # Russian manuals (future)
└── .github/
    └── workflows/
        └── deploy.yml            # Update with path filters
```

## Migration Steps

### Step 1: Install Plugin

**File:** `requirements.txt`

Add:
```
mkdocs-monorepo-plugin>=1.1.0
```

### Step 2: Create New Manual Structure

```bash
cd /Users/local/projects/trikdis-docs/manuals

# Create directory structure
mkdir -p en/alarm-communicators/gt-cellular/docs

# Move existing manual
mv docs/manual/* en/alarm-communicators/gt-cellular/docs/

# Remove old empty directory
rmdir docs/manual
```

### Step 3: Create Manual-Specific Config

**File:** `en/alarm-communicators/gt-cellular/mkdocs.yml`

```yaml
site_name: GT Cellular Communicator
docs_dir: docs
site_url: https://docs.trikdis.com/en/alarm-communicators/gt-cellular/

theme:
  name: material

plugins:
  - search
  - add-number:
      strict_mode: true

markdown_extensions:
  - attr_list
  - admonition
  - sane_lists
  - pymdownx.details
  - pymdownx.superfences
  - markdown_callouts

nav:
  - GT Cellular Communicator: index.md
```

### Step 4: Update Root Config

**File:** `mkdocs.yml`

Replace:
```yaml
nav:
  - Home: index.md
  - English:
      - Alarm Communicators:
          - GT Cellular Communicator: manual/index.md
```

With:
```yaml
plugins:
  - search
  - monorepo

nav:
  - Home: index.md
  - English:
      - Alarm Communicators:
          - GT Cellular Communicator: '!include en/alarm-communicators/gt-cellular/mkdocs.yml'
```

Remove from root config (now in manual-specific config):
- `add-number` plugin (each manual controls its own numbering)

Keep in root config:
- Theme settings
- Extra CSS/JS (shared across all manuals)
- Markdown extensions (shared)

### Step 5: Update Extra CSS Paths

**File:** `mkdocs.yml`

CSS paths should be relative to root:
```yaml
extra_css:
  - stylesheets/base.user.css
  - stylesheets/numbered-headings.css
```

### Step 6: Add Path Filters to GitHub Actions

**File:** `.github/workflows/deploy.yml`

Add path filters to prevent unnecessary builds:

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'docs/**'
      - 'en/**'
      - 'lt/**'
      - 'es/**'
      - 'ru/**'
      - 'mkdocs.yml'
      - 'requirements.txt'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:
```

### Step 7: Test Locally

**Test individual manual:**
```bash
cd /Users/local/projects/trikdis-docs/manuals/en/alarm-communicators/gt-cellular
mkdocs serve
# Should build ONLY GT manual at http://127.0.0.1:8000
```

**Test full site:**
```bash
cd /Users/local/projects/trikdis-docs/manuals
mkdocs serve
# Should build home page + all manuals combined
```

### Step 8: Update Conversion Pipeline

**File:** `/Users/local/projects/knowledgebase-conversion-pipeline/convert-single.sh`

Current output path:
```bash
doc_dir="${OUT_DIR}/docs/manual"
```

Update to monorepo structure:
```bash
# For GT Cellular Communicator (English)
OUT_DIR="en/alarm-communicators/gt-cellular"
doc_dir="${OUT_DIR}/docs"
```

**Strategy for future conversions:**

Each manual conversion should specify:
1. **Language**: en, lt, es, ru
2. **Category**: alarm-communicators, control-panels, keypads, etc.
3. **Product name**: gt-cellular, lte-communicator, etc.

Example:
```bash
# Convert GT manual to English
OUT_DIR="en/alarm-communicators/gt-cellular" ./convert-single.sh "docx manuals/GT_UM_ENG.docx"

# Convert same manual to Lithuanian
OUT_DIR="lt/alarm-communicators/gt-cellular" ./convert-single.sh "docx manuals/GT_UM_LT.docx"
```

### Step 9: Commit and Deploy

```bash
cd /Users/local/projects/trikdis-docs/manuals

git add .
git status
# Review changes

git commit -m "Migrate to monorepo structure for scalable multi-manual management"
git push

# Monitor GitHub Actions deployment
gh run watch
```

## Conversion Pipeline Integration

### Directory Naming Convention

**Pattern:** `{language}/{category}/{product-slug}/`

**Examples:**
- `en/alarm-communicators/gt-cellular/`
- `en/alarm-communicators/lte-communicator/`
- `en/control-panels/flexi-sp3/`
- `lt/alarm-communicators/gt-cellular/`
- `es/keypads/sk232-lcd/`

**Category Slugs:**
- alarm-communicators
- control-panels
- controllers
- keypads
- wireless-sensors
- accessories
- monitoring-software
- receivers

### Conversion Workflow

1. **Convert DOCX:**
   ```bash
   cd /Users/local/projects/knowledgebase-conversion-pipeline
   OUT_DIR="/tmp/converted-manual" ./convert-single.sh "docx manuals/Product_Manual.docx"
   ```

2. **Copy to manual structure:**
   ```bash
   # Determine target location
   LANG="en"
   CATEGORY="alarm-communicators"
   PRODUCT="gt-cellular"

   # Copy converted files
   mkdir -p /Users/local/projects/trikdis-docs/manuals/${LANG}/${CATEGORY}/${PRODUCT}/docs
   cp -r /tmp/converted-manual/* /Users/local/projects/trikdis-docs/manuals/${LANG}/${CATEGORY}/${PRODUCT}/docs/
   ```

3. **Create manual config (if new):**
   ```bash
   # Copy from template or create new mkdocs.yml
   ```

4. **Update root navigation:**
   Edit `/Users/local/projects/trikdis-docs/manuals/mkdocs.yml` nav section

## Future: Adding New Manuals

### Template for New Manual

**Directory structure:**
```
{lang}/{category}/{product-slug}/
├── mkdocs.yml
└── docs/
    ├── index.md
    └── images/
```

**mkdocs.yml template:**
```yaml
site_name: {Product Name}
docs_dir: docs
site_url: https://docs.trikdis.com/{lang}/{category}/{product-slug}/

theme:
  name: material

plugins:
  - search
  - add-number:
      strict_mode: true

markdown_extensions:
  - attr_list
  - admonition
  - sane_lists
  - pymdownx.details
  - pymdownx.superfences
  - markdown_callouts

nav:
  - {Product Name}: index.md
```

### Adding to Root Navigation

**File:** `mkdocs.yml`

```yaml
nav:
  - Home: index.md
  - English:
      - Alarm Communicators:
          - GT Cellular Communicator: '!include en/alarm-communicators/gt-cellular/mkdocs.yml'
          - LTE Communicator: '!include en/alarm-communicators/lte-communicator/mkdocs.yml'  # New
      - Control Panels:
          - Flexi SP3: '!include en/control-panels/flexi-sp3/mkdocs.yml'  # New
  - Lietuvių:
      - Ryšio įrenginiai:
          - GT Ląstelinis komunikatorius: '!include lt/alarm-communicators/gt-cellular/mkdocs.yml'
```

### Glob Pattern for Multiple Manuals (Advanced)

Instead of listing each manual individually, use glob pattern:

```yaml
nav:
  - Home: index.md
  - English:
      - Alarm Communicators: '*include en/alarm-communicators/*/mkdocs.yml'
      - Control Panels: '*include en/control-panels/*/mkdocs.yml'
  - Lietuvių:
      - Ryšio įrenginiai: '*include lt/alarm-communicators/*/mkdocs.yml'
```

This auto-includes all manuals in each category folder.

## Testing Checklist

After migration:

- [ ] Root build works: `cd manuals && mkdocs serve`
- [ ] Individual manual builds: `cd en/alarm-communicators/gt-cellular && mkdocs serve`
- [ ] Home page loads with product categories
- [ ] Navigation tree shows proper structure
- [ ] Manual content displays correctly
- [ ] Images load properly
- [ ] Numbered headings work
- [ ] GitHub alerts render correctly
- [ ] Search works across all content
- [ ] GitHub Actions deployment succeeds
- [ ] Live site (docs.trikdis.com) displays correctly

## Rollback Plan

If migration fails:

```bash
cd /Users/local/projects/trikdis-docs/manuals
git reset --hard HEAD~1  # Undo last commit
git push --force  # Only if you already pushed
```

Or restore from specific commit:
```bash
git checkout {commit-hash} .
```

## Documentation Updates Needed

After successful migration:

1. **Update CLAUDE.md:**
   - Document new monorepo structure
   - Update workflow examples
   - Add manual creation guide

2. **Update conversion pipeline:**
   - Update output path logic
   - Document target directory structure
   - Add examples for each language/category

3. **Create contributor guide:**
   - How to edit existing manual
   - How to add new manual
   - Local development workflow

## Questions to Resolve During Migration

1. Should shared images (like product category images) stay in root `docs/images/` or be duplicated per manual?
   - **Decision:** Keep in root, manuals reference with relative paths

2. Should each manual have its own styling or all share root styles?
   - **Decision:** Share base styles, allow manual-specific overrides if needed

3. How to handle cross-manual links?
   - **Decision:** Use absolute paths: `/en/alarm-communicators/gt-cellular/`

## Success Criteria

Migration is successful when:

1. ✅ Local editing is fast (individual manual builds in <10 seconds)
2. ✅ Full site builds successfully
3. ✅ GitHub Actions deploys without errors
4. ✅ Live site displays all content correctly
5. ✅ Conversion pipeline outputs to correct directories
6. ✅ Navigation structure is clear and logical
7. ✅ Documentation is updated for future contributors

## Resources

- **mkdocs-monorepo-plugin docs:** https://backstage.github.io/mkdocs-monorepo-plugin/
- **GitHub repo:** https://github.com/backstage/mkdocs-monorepo-plugin
- **Example usage:** https://backstage.github.io/mkdocs-monorepo-plugin/CONTRIBUTING/

## Notes

- Plugin is maintained by Spotify's Backstage team (well-supported)
- Used by major projects with hundreds of documentation pages
- Compatible with MkDocs Material theme
- Works with all standard MkDocs plugins
- Does NOT speed up production builds, only local development
