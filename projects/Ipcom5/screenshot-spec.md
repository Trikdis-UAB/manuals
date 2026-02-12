# IPCom UI Screenshot Spec (Section-first)

This spec is the default for tab documentation screenshots.

## Goals

- Prioritize readability over full-screen context.
- Keep screenshots maintainable when one section changes.
- Keep image style consistent across tabs.

## Style rules

- Source capture: `1440x900`, browser at 100% zoom.
- Use section-level crops as primary visuals.
- Keep one image per section (no text overlays in this iteration).
- File format: `png`.
- Naming: `<tab>-sections/<section-id>.png`.

## Status tab section set

Spec source: `Scripts/ipcom5control-web/screenshot_specs/status-sections.json`

Generated files:

- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/general.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/api.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/tcp-connections.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/output-buffers.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/device-tracker.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/database.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/modem-status.png`
- `docs/en/receivers/ipcom5control/ui/assets/screens/status-sections/footer-totals.png`

## Regeneration command

From repo root:

`npm --prefix Scripts/ipcom5control-web run capture:status-sections`
