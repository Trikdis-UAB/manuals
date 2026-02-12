# Capture Pipeline

The capture pipeline logs in to the web UI, discovers screens, and stores structured artifacts for each screen.

## Commands

From repo root:

- `npm --prefix Scripts/ipcom5control-web run capture:web`
- `npm --prefix Scripts/ipcom5control-web run generate:manual`
- `npm --prefix Scripts/ipcom5control-web run validate:coverage`
- `npm --prefix Scripts/ipcom5control-web run docs:all`

## Environment variables

- `IPCOM_URL` (e.g., `https://beta2.protegus.app:30003/`)
- `IPCOM_USERNAME`
- `IPCOM_PASSWORD`

## Output layout

Artifacts live in `artifacts/ui/ipcom5control-web/`:

- `screen-map.json`
- `screens/<screen-id>/accessibility-tree.json`
- `screens/<screen-id>/controls.json`
- `screens/<screen-id>/meta.json`
- `screens/<screen-id>/screenshot.png`

Screens and screenshots are copied into:

- `docs/en/receivers/ipcom/ui/screens/`
- `docs/en/receivers/ipcom/ui/assets/screens/`

## Notes

- Credentials are never stored.
- The accessibility tree is the authoritative inventory of controls.
- Screenshots are only visual references.
