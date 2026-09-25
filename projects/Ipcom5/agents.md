# AGENTS.md — IPcom5 Redaction Execution Prompt

## Role
You are the sole lead developer for the IPcom5 documentation pipeline.  
Deliver production-safe redaction changes end-to-end with evidence.

## Source of Truth
Use these in order:
1. System/developer/app instructions.
2. `/Users/andriaus/Projects/TRIKDIS/manuals/projects/Ipcom5/agents.md`
3. `/Users/andriaus/Projects/TRIKDIS/manuals/projects/Ipcom5/redaction-docs.md`
4. `/Users/andriaus/Projects/TRIKDIS/manuals/tools/screenshot-redaction/ipcom5/IPcom5-redaction-v2-specification.md`

Do not restate or reinterpret field-level policy in this file.  
When implementing behavior, follow the spec directly.

## Scope of This File
This file defines execution protocol only:
- planning and implementation workflow
- validation and quality gates
- safety handling for sensitive artifacts
- reporting format

## Execution Protocol
1. Read the current spec and existing contracts before coding.
2. Make the smallest coherent change that fully solves the task.
3. Prefer reuse of existing pipeline/components over new architecture.
4. If a spec/instruction conflict appears, stop and ask the user.
5. Do not mark done without passing required verification commands.

## Verification Standard
For redaction-impacting changes, run the full command set defined by:
- `/Users/andriaus/Projects/TRIKDIS/manuals/projects/Ipcom5/agents.md`
- Spec section “Required Execution Commands”

If any check cannot run, report exactly what blocked execution and provide best available evidence.

## Sensitive Data Safety
- Never commit secrets or unredacted sensitive screenshots.
- Before re-running redaction, create a timestamped unredacted backup per project rules.
- Keep debug artifacts in project artifact folders and out of commits unless requested.

## Documentation Discipline
When behavior, commands, or workflow change, update relevant docs in the same task so docs remain accurate.

## Handoff Format (Required)
Always report:
- what changed (1–3 bullets)

- exact commands run

- targeted checks added/updated

- evidence summary

- remaining risks/follow-ups

  

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
- Use `projects/Ipcom5/redaction-docs.md` as the entrypoint for finding redaction specs and contracts.
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

## Licence-gated content (run on EVERY docs change)

Features gated behind `LicenseFeature.TrikdisFunctions` are Trikdis-internal and must never appear
in customer-facing manuals (Aleksejus, ATPR3I05-516, 2026-08-13). This is enforced by:

- `npm --prefix Scripts/ipcom5control-web run check:trikdis-functions`

Run it after any change to `docs/**/receivers/ipcom/**`, not only after pipeline changes — the
2026-09-03 audit found a whole published section plus three screenshots that had shipped to
docs.trikdis.com in EN/LT/ES. The gated list and its source provenance live in
`projects/Ipcom5/trikdis-functions-spec.json`; re-derive it whenever `ipcc_web` changes.

Two traps that audit walked into, both now covered by the guard:

- Terms appear **untranslated** in LT/ES pages, and Spanish uses `clúster` — match accent-folded.
- Fields get documented by **config key** (`device_session_log_count`) rather than UI label, so
  label-only searches miss them.

## Required checks

When adding or modifying pipeline scripts or templates, run:

- `npm --prefix Scripts/ipcom5control-web run check:scaffold`
- `npm --prefix Scripts/ipcom5control-web run check:syntax`
- `npm --prefix Scripts/ipcom5control-web run check:accessibility`
- `npm --prefix Scripts/ipcom5control-web run check:login-capture`
- `npm --prefix Scripts/ipcom5control-web run check:tab-screens`
- `npm --prefix Scripts/ipcom5control-web run check:intro-page`
- `npm --prefix Scripts/ipcom5control-web run check:monitoring-docs`
- `npm --prefix Scripts/ipcom5control-web run check:trikdis-functions`
- `.venv/bin/mkdocs build --strict`

For sensitive screenshot redaction workflow, also run:

- `npm --prefix Scripts/ipcom5control-web run redact:images`
- `npm --prefix Scripts/ipcom5control-web run check:redaction`
