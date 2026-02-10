# Logs

**Purpose:** Provide an audit trail of system activity and administrative actions for troubleshooting and compliance.

## When to use

- After configuration changes to confirm they were applied.
- When investigating restarts, cleanup tasks, or unexpected behavior.

## Sections and why they matter

### Log table

Each row records a system or administrative event with a timestamp, type, and message. This is the first place to confirm scheduled cleanup, upgrades, or configuration changes.

### Detail links

Some entries include a `more info` link with extended details. Use this to identify what changed and who initiated it.

### Footer summary

The footer shows the logged-in user, host, and live object totals. It provides context for the environment where the log entries were recorded.

### Confirmed log type values (IPCom API reference)

The log `Type` field values are documented by the local IPCom API docs:

- `0`: informational messages.
- `1`: warning messages.
- `2`: error messages.
- `3`: settings-change messages.

## Incident checklist {#logs-incident-checklist}

- `Destination delivery failures`: look for repeated output connection errors and timeout patterns.
- `Receiver ingest failures`: look for listener bind/start errors after port or network changes.
- `Auth and permission issues`: look for failed login/auth events after account or token changes.
- `Backlog symptoms`: correlate cleanup or warning entries with buffer growth in `Status`.


## Key fields to watch {#logs-key-fields}

- `Time`: establishes incident chronology. Alert cue: repeated errors clustered in short windows.
- `Type`: classifies log severity/context. Alert cue: repeated `Settings`/error-like types after deployments.
- `Text`: carries operational detail for root cause. Alert cue: recurring timeout/connectivity phrases.
- `more info`: reveals change details and actor context. Alert cue: unexpected admin/source or unscheduled changes.
