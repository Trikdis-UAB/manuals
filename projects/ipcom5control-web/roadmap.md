# IPcom5 Control Web — UI Documentation Pipeline

This sub‑project maintains the automated capture → generate → validate workflow for the IPcom5 Control Web UI manual.

## Objectives

1. Produce screen‑level UI documentation grounded in live UI structure (DOM + accessibility tree).
2. Maintain a repeatable capture pipeline with clear outputs.
3. Keep explanations conservative; mark uncertainty with `[REVIEW]`.

## Sources (priority)

1. Live UI capture artifacts (`artifacts/ui/ipcom5control-web/`)
2. Internal presentation summary (`projects/ipcom5control-web/sources/captions_topics_timed.en.md`)
3. Engineering installation documentation (pending)

## Rules

- Never hardcode credentials. Use environment variables.
- The DOM + accessibility tree are the source of truth for control lists.
- Screenshots are illustrative only.
- If purpose or behavior is unclear, mark `[REVIEW]`.

## Workflow

From repo root:

1. Install dependencies (once):
   - `npm install --prefix Scripts/ipcom5control-web`
   - `npx playwright install`
2. Capture:
   - `IPCOM_URL=... IPCOM_USERNAME=... IPCOM_PASSWORD=... npm --prefix Scripts/ipcom5control-web run capture:web`
3. Generate:
   - `npm --prefix Scripts/ipcom5control-web run generate:manual`
4. Validate:
   - `npm --prefix Scripts/ipcom5control-web run validate:coverage`
5. Build docs:
   - `.venv/bin/mkdocs build --strict`

## Output locations

- Artifacts: `artifacts/ui/ipcom5control-web/`
- Generated pages: `docs/en/receivers/ipcom5control/ui/`
- Screenshots for docs: `docs/en/receivers/ipcom5control/ui/assets/screens/`

## Roadmap

### Phase 1 — Baseline (current)
- [x] Scaffolding and scripts
- [x] Screen template
- [ ] Capture first set of screens

### Phase 2 — Discovery hardening
- Improve navigation discovery
- Handle tabs and modal dialogs
- Capture desktop + mobile viewports

### Phase 3 — Content depth
- Expand screen descriptions with verified text
- Add task‑based guides
- Add permission/role notes

### Phase 4 — Release readiness
- Coverage gates
- Visual regression for key screens
- Final editorial pass
