# IPcom5 Control Web — Agent Instructions

These instructions apply to the IPcom5 Control Web UI documentation sub-project.

## Credentials (local only)

Store credentials in macOS Keychain and inject them at runtime. Do not store secrets in the repo, even in ignored files.
Use `administrator` as the default username for full-window UI documentation coverage.

Add credentials to Keychain (run once, replace placeholders):

```bash
security add-generic-password -a "$USER" -s ipcom5control-url -w "https://example"
security add-generic-password -a "$USER" -s ipcom5control-user -w "administrator"
security add-generic-password -a "$USER" -s ipcom5control-pass -w "password"
```

Run capture using Keychain values:

```bash
IPCOM_URL="$(security find-generic-password -w -s ipcom5control-url)" \
IPCOM_USERNAME="$(security find-generic-password -w -s ipcom5control-user)" \
IPCOM_PASSWORD="$(security find-generic-password -w -s ipcom5control-pass)" \
npm --prefix Scripts/ipcom5control-web run capture:web
```

## Core rules

- Treat `projects/Ipcom5/roadmap.md` as the authoritative project plan and workflow.
- Never hardcode credentials; use environment variables.
- The DOM + accessibility tree are the source of truth for control listings.
- If behavior or purpose is uncertain, mark it `[REVIEW]`.
- Keep generated artifacts in `artifacts/ui/ipcom5control-web/` and do not commit them.

## Unredacted screenshot backup rule

- Before applying or re-running redaction, preserve unredacted screenshots in a local backup folder under:
  - `artifacts/private/ipcom5-unredacted-<timestamp>/`
- Include `MANIFEST.sha256` and keep a `.tar.gz` archive of that folder for rollback.
- Never commit unredacted backups to git.
- If screenshots are re-captured, create a new timestamped backup instead of overwriting the previous one.

## Required checks

When adding or modifying pipeline scripts or templates, run:

- `npm --prefix Scripts/ipcom5control-web run check:scaffold`
- `npm --prefix Scripts/ipcom5control-web run check:syntax`
- `npm --prefix Scripts/ipcom5control-web run check:accessibility`
- `npm --prefix Scripts/ipcom5control-web run check:login-capture`
- `npm --prefix Scripts/ipcom5control-web run check:tab-screens`
- `npm --prefix Scripts/ipcom5control-web run check:intro-page`
- `npm --prefix Scripts/ipcom5control-web run check:monitoring-docs`
- `.venv/bin/mkdocs build --strict`

For sensitive screenshot redaction workflow, also run:

- `npm --prefix Scripts/ipcom5control-web run redact:images`
- `npm --prefix Scripts/ipcom5control-web run check:redaction`
