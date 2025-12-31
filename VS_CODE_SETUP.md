# VS Code Setup for TRIKDIS Documentation

**Last Updated:** 2025-10-02

This document describes the VS Code configuration for editing TRIKDIS MkDocs documentation. All configuration files are located in `/Users/local/projects/trikdis-docs/manuals/`.

## Quick Start

1. Open the `manuals/` folder in VS Code
2. Install recommended extensions (VS Code will prompt automatically)
3. Reload window to activate configuration
4. Press **Cmd+Shift+B** to start MkDocs preview server

## Configuration Files

```
manuals/
├── .vscode/
│   ├── extensions.json              # 8 recommended extensions
│   ├── settings.json                # Editor and extension settings
│   ├── tasks.json                   # MkDocs serve/build commands
│   └── trikdis-snippets.code-snippets  # Shortcuts for common patterns
├── .editorconfig                    # Consistent formatting rules
├── vale.ini                         # Vale configuration
└── .vale/styles/Vocab/
    ├── accept.txt                   # Approved terminology
    └── reject.txt                   # Words to avoid
```

## Extensions

### yzhang.markdown-all-in-one
**Purpose:** Quality-of-life for Markdown writing
**Features:** Keyboard shortcuts, TOC generator, table formatting, auto lists
**Why:** Speeds up editing and reduces fiddly formatting work

### DavidAnson.vscode-markdownlint
**Purpose:** Linting for Markdown files
**Features:** Enforces consistency in headings, spacing, code blocks
**Why:** Prevents small mistakes that break MkDocs builds

### ChrisChinchilla.vale-vscode
**Purpose:** Style and terminology checking
**Features:** Checks TRIKDIS-specific vocabulary, writing style, banned words
**Why:** Ensures consistent voice and terminology across all manuals

### redhat.vscode-yaml
**Purpose:** YAML validation and autocomplete
**Features:** Validates `mkdocs.yml` and front-matter
**Why:** Prevents broken builds from typos/indentation mistakes

### christian-kohler.path-intellisense
**Purpose:** File path autocomplete
**Features:** Autocompletes relative paths for images and links
**Why:** Dramatically reduces "image not found" errors

### streetsidesoftware.code-spell-checker
**Purpose:** Spell checking
**Features:** Flags typos in prose, filenames, and links
**Why:** Low-friction safety net; whitelist project-specific words

### mushan.vscode-paste-image
**Purpose:** Image pasting from clipboard
**Features:** Paste → auto-saves and inserts correct relative link
**Why:** Fixes the most common writer pain point

### bierner.markdown-mermaid
**Purpose:** Mermaid diagram support
**Features:** Syntax highlighting and preview for diagrams
**Why:** Helps if you use diagrams in documentation

### csholmq.excel-to-markdown-table
**Purpose:** Convert Excel/Sheets data to Markdown tables
**Features:** Paste TSV/CSV and convert to formatted tables
**Why:** Quickly import product specs from spreadsheets

## Key Features

### Image Pasting
1. Copy image to clipboard (screenshot or from file)
2. Paste in Markdown file (Cmd+V)
3. Image auto-saves as `image1.png`, `image2.png`, etc.
4. Correct relative path automatically inserted

### Snippets
- Type `adm` → Insert MkDocs admonition
- Type `tabs` → Insert MkDocs tabs
- Type `img` → Insert image with correct path format
- Type `tbl2` → Insert 2-column parameter table
- Type `tbl3` → Insert 3-column data table

### Table Editing
1. **Create table:** Type `tbl2` or `tbl3` snippet, or type manually
2. **Format table:** Markdown All in One auto-formats on save
3. **Navigate cells:** Use Tab to move between cells
4. **Import from Excel:**
   - Copy cells from Excel/Google Sheets
   - Paste in VS Code
   - Run command: "Excel to Markdown Table: Convert Selection"
5. **Add rows:** Press Enter at end of table

### Tasks (Cmd+Shift+P → "Tasks: Run Task")
- **MkDocs: serve** - Start preview server (default: Cmd+Shift+B)
- **MkDocs: build --strict** - Test build with strict error checking

### Vale Terminology
**Accepted terms** (in `.vale/styles/Vocab/accept.txt`):
- TRIKDIS, Protegus, MkDocs, LoRa
- DSC, Paradox, Honeywell, Caddx
- GET, E16T, SP3, SP4, SP5
- Anixter, Wesco, EMCS, Redcare

**Rejected words** (avoid these):
- utilise, whilst, simply, very, obviously, basically

**Config notes:**
- `vale.ini` sets `MinAlertLevel = warning` for lower-noise linting.
- Vocab rules are wired in `.vale/styles/Vocab/Vocab.yml`.

## Settings Highlights

### Markdown Formatting
- Line length: 100 characters (soft limit)
- Word wrap: Enabled
- Trailing whitespace: Trimmed (except in markdown for line breaks)
- Final newline: Always added

### markdownlint Rules
- MD013 (line length): Disabled
- MD033 (HTML): Allowed for `<br>`, `<details>`, `<summary>`, `<div>`, `<span>`, `<kbd>`, `<sup>`, `<sub>`, `<img>`
- MD041 (first line H1): Disabled
- MD024 (duplicate headings): Siblings only

### File Exclusions
Hidden from file explorer and search:
- `site/` (MkDocs build output)
- `.venv/` (Python virtual environment)
- `__pycache__/` (Python cache)

## Optional: Vale CLI

For command-line style checking:

```bash
# Install Vale
brew install vale

# Download Vale styles (first time only)
cd /Users/local/projects/trikdis-docs/manuals
vale sync

# Check a file
vale docs/en/alarm-communicators/gt-cellular/index.md
```

## Troubleshooting

### Extensions not activating
1. Reload VS Code window: Cmd+Shift+P → "Developer: Reload Window"
2. Check extension is installed: Cmd+Shift+X
3. Check for extension errors: Cmd+Shift+U → "Output" → Select extension

### Vale not working
1. Check `vale.ini` exists in workspace root
2. Extension auto-detects configuration
3. Optional: Install Vale CLI with `brew install vale`

### Images pasting to wrong location
- Ensure you're editing a file inside `docs/` directory
- Check `.vscode/settings.json` has `pasteImage.basePath` set to `${workspaceFolder}/docs`

### MkDocs task not found
- Ensure you've opened the `manuals/` folder as workspace root
- Check `.vscode/tasks.json` exists
- Verify `mkdocs` is installed: `python3 -m pip install -r requirements.txt`

## Sharing with Team

To set up a new team member:

1. **Clone repository:**
   ```bash
   git clone git@github.com:Trikdis-UAB/manuals.git
   cd manuals
   ```

2. **Install Python dependencies:**
   ```bash
   python3 -m pip install -r requirements.txt
   ```

3. **Open in VS Code:**
   ```bash
   code .
   ```

4. **Install recommended extensions:**
   - VS Code will prompt: "This workspace has extension recommendations"
   - Click "Install All"

5. **Reload window:**
   - Cmd+Shift+P → "Developer: Reload Window"

6. **Test setup:**
   - Press Cmd+Shift+B (should start MkDocs server)
   - Visit http://127.0.0.1:8000

## Reference: Project Documentation

- **Main project docs:** `/Users/local/projects/trikdis-docs/CLAUDE.md`
- **Conversion pipeline:** `/Users/local/projects/knowledgebase-conversion-pipeline/`
- **Live site:** https://docs.trikdis.com
- **GitHub repo:** https://github.com/Trikdis-UAB/manuals

## Notes

- Configuration is specific to the `manuals/` directory (public site)
- For `manuals-darbiniai/` (working files), copy configuration if needed
- All settings are workspace-specific, won't affect global VS Code config
- Safe for use in GitHub Codespaces

---

**Questions?** Contact: Andrius (obsmind)
