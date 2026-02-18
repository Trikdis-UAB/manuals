# IPcom5 Redaction Documentation Index

This file is the quick index for all IPcom5 screenshot redaction references.

## Authoritative execution protocol

- `projects/Ipcom5/agents.md`

## Authoritative redaction specification

- `tools/screenshot-redaction/ipcom5/IPcom5-redaction-v2-specification.md`

## Supporting discussion/context

- `tools/screenshot-redaction/ipcom5/Blur and replace discussion.md`
- `tools/screenshot-redaction/ipcom5/agents.md`

## Active machine-readable contracts

- `projects/Ipcom5/redaction-spec.json`
- `projects/Ipcom5/redaction-requirements.json`

## Redaction command entrypoints

From repo root:

```bash
npm --prefix Scripts/ipcom5control-web run redact:images
npm --prefix Scripts/ipcom5control-web run check:redaction
```

## Location note

Redaction implementation docs now live under `tools/screenshot-redaction/` to keep them discoverable from repo root while retaining IPcom5-specific profiling in `tools/screenshot-redaction/ipcom5/`.
