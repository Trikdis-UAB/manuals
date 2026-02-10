# Outputs

**Purpose:** Configure output destinations for event delivery and automation integrations.

## When to use

- When creating or updating CMS or automation routes.
- When troubleshooting delivery to a specific destination.

## Sections and why they matter

### Show passwords

Reveals masked encryption keys for verification. Enable only during controlled maintenance, and disable immediately after verification to avoid exposing secrets in shared screens or screenshots.

### Outputs table {#outputs-table}

Each row represents a destination and its routing configuration. Key fields:

- `ID` and `Name`: identify the output.
- `Enabled`: controls whether events are sent to this destination.
- `Type` and `Protocol`: describe the output transport.
- `Identifier` and `Account number`: routing identifiers expected by the destination system.
- `Receiver` and `Line`: receiver-side routing identifiers.
- `Receivers`: assigned receiver group for this output.
- `Host` and `Port`: remote destination address.
- `Buffer size`: queue limit per output used to detect delivery bottlenecks.
- `Heartbeat` and `Heartbeat interval`: connection health checks.
- `Encrypt` and `Encryption key`: secure the transport when required (API-backed integrations use a fixed-length key).
- `IP Whitelist`: restricts allowed destination IPs.
- `Filters`: event routing filters that control which events are sent.

Misconfigured fields here are a common cause of undelivered events, so validate changes against the destination system requirements.

`Buffer size` is a queue limit per output. High or growing queue usage indicates destination-side delays or protocol mismatch and can lead to delayed alarm delivery.

Protocol-specific field usage varies by integration. For a cross-tab mapping, see `../cms-integration-mapping.md`.

### Confirmed option values (IPCom API reference)

The following values are confirmed by the local IPCom API documentation (`Configuration Reference` and `PUT /api/settings` validation sections):

| Output type | Value | Operational meaning |
| --- | --- | --- |
| `TCP` | `0` | TCP client to external CMS endpoint |
| `COM` | `1` | Serial output over COM |
| `JSON_SERVER` | `2` | Local JSON server output |
| `TCP_SERVER` | `3` | TCP server mode (incoming clients connect to IPCom) |
| `WEBHOOK` | `4` | HTTP webhook output |

| Output protocol | Value | Notes |
| --- | --- | --- |
| `Surgard` | `0` | Standard Surgard format |
| `Monas3` | `1` | Monas3 format |
| `Surgard8` | `2` | Surgard with 8-symbol account length |
| `SurgardNoEnd` | `3` | Surgard without end terminator (`0x14`) |
| `Ademco685` | `4` | Ademco 685 |
| `Ademco685Cid` | `5` | Ademco 685 Contact ID |
| `Surgard2000` | `6` | Surgard 2000 |
| `SiaDc09` | `7` | SIA DC-09 |
| `SurgardMlr2_LineWithAccount` | `8` | MLR2 variant where line uses first two account characters |

Validation constraints confirmed by API docs:

- `id` must be unique and non-zero; `name` must be non-empty.
- `type`, `protocol`, and `identificator` must be within allowed backend ranges.
- `oid`, `receiver_number`, and `line_number` must be within allowed backend ranges.
- For output settings that use `encryption_key`, key length is 16 characters.
- For `SiaDc09`, encryption key must be valid when encryption is enabled.
- `buffer_size = 0` uses the default queue size of `1000`.

Format note:

- The API specifies key length, but does not explicitly define required character set/encoding for output `encryption_key` fields. [REVIEW]

Retry/backoff and queue persistence behavior must be validated in your deployment. [REVIEW]
Open SME questions for this screen are tracked in `../team-input-questions.md`.

### Add output

Use `Add output` to create a new destination. Populate routing identifiers and network values first, then enable the output after validation.

## Operations runbook {#outputs-operations-runbook}

- `Events not arriving at destination`: verify `Enabled`, destination `Host`/`Port`, protocol choice, and receiver/line mapping.
- `Frequent reconnects`: tune `Heartbeat interval`, verify network stability, and confirm destination accepts the configured protocol.
- `Queue growth on one output`: temporarily disable the problematic output, fix endpoint settings, then re-enable and watch buffer recovery.
- `Changes break delivery`: compare with a known working output and roll back to the last stable values before retrying.


## Key fields to watch {#outputs-key-fields}

- `Enabled`: controls whether destination is active. Alert cue: events stop for a destination immediately after disable.
- `Host` / `Port`: destination endpoint for delivery. Alert cue: connect timeouts or refused sessions.
- `Protocol`: determines payload and transport semantics. Alert cue: destination receives undecodable or rejected messages.
- `Buffer size`: per-output queue backlog indicator. Alert cue: sustained growth without drain indicates delivery bottleneck.
- `Heartbeat interval`: connection liveness cadence. Alert cue: frequent reconnect churn under stable network conditions.
- `IP Whitelist`: limits permitted target addresses by policy. Alert cue: traffic blocked after destination/network changes.
