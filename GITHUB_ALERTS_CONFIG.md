# GitHub Alerts Configuration for TRIKDIS Manuals

## Overview
This document explains the GitHub alerts configuration for the TRIKDIS manuals site at https://docs.trikdis.com

## Current Configuration
The site uses GitHub-style alerts that work in both Typora and MkDocs Material.

### mkdocs.yml Configuration
```yaml
markdown_extensions:
  - attr_list
  - admonition
  - sane_lists
  - pymdownx.details
  - pymdownx.superfences
  - markdown_callouts  # CRITICAL: Enables GitHub alerts
```

### requirements.txt
```
mkdocs>=1.6.0
mkdocs-material>=9.0.0
mkdocs-add-number-plugin>=1.2.0
markdown-callouts>=0.3.0
```

## Alert Syntax Used in Manuals
The manuals use these GitHub alert types:

```markdown
> [!NOTE]
> This is a note with additional information

> [!IMPORTANT]
> This is important information that users must know
```

## How It Works
1. **Typora editing**: GitHub alerts display with native styling
2. **MkDocs build**: `markdown-callouts` extension converts alerts to styled admonition boxes
3. **GitHub Pages**: Deploys with proper styling on the live site

## CRITICAL MAINTENANCE NOTES

### ⚠️ DO NOT REMOVE
- Never remove `markdown_callouts` from mkdocs.yml
- Never remove `markdown-callouts>=0.3.0` from requirements.txt
- These are required for alerts to display properly

### ⚠️ EXTENSION CONFLICTS
- Do NOT add `pymdownx.blocks.admonition` - it conflicts with `markdown_callouts`
- Keep the standard `admonition` extension - it works with `markdown_callouts`

### ⚠️ MANUAL FORMAT
- Keep alerts in GitHub format: `> [!NOTE]` and `> [!IMPORTANT]`
- Do NOT convert to MkDocs format: `!!! note`
- GitHub format works in both Typora and MkDocs

## Troubleshooting

### If alerts show as plain blockquotes on live site:
1. Check GitHub Actions build logs for extension installation errors
2. Verify `markdown-callouts>=0.3.0` is in requirements.txt
3. Ensure `markdown_callouts` is in mkdocs.yml extensions list

### If local development shows plain blockquotes:
1. Install extension: `python3 -m pip install "markdown-callouts>=0.3.0"`
2. Restart MkDocs dev server
3. Check for configuration errors in mkdocs.yml

## Testing Checklist
Before any configuration changes:
- [ ] Alerts render as styled boxes locally
- [ ] Alerts render as styled boxes on live site
- [ ] Both [!NOTE] and [!IMPORTANT] types work
- [ ] No conflicts with other extensions

## Git Reference
Working configuration restored from commit `d17d5c5` (September 22, 2025).

## Contact
If GitHub alerts stop working, check this documentation and the conversion pipeline at:
`/Users/local/projects/knowledgebase-conversion-pipeline/GITHUB_ALERTS_CONFIG.md`