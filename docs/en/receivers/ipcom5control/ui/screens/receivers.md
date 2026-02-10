# Receivers

**Purpose:** Configure receiver endpoints (TCP, UDP, COM, and Modem) that accept incoming device traffic and define routing parameters.

## When to use

- When onboarding a new receiver endpoint or changing listening ports.
- When routing identifiers or encryption settings change.

## Sections and why they matter

### Show passwords

Reveals masked encryption passwords for verification. Enable only when needed and disable immediately after verification.

### TCP Receivers

Defines TCP listening endpoints. `Port` controls where devices connect. `Receiver #` and `Line #` are routing identifiers used by downstream systems. `Encryption Password` protects encrypted traffic. `SIA - Time Dev.` fields define allowed time deviation thresholds for the SIA protocol (negative and positive).

Use consistent receiver/line mapping with outputs and CMS expectations. See `../cms-integration-mapping.md`.

### UDP Receivers

Defines UDP listening endpoints. Use this when devices report over UDP. Field meanings mirror TCP receivers, with the same routing identifiers.

### COM Receivers

Defines serial (RS232/COM) receivers for local integrations. These are typically used when hardware or legacy panels report over serial links.

### Modem Receivers

Defines modem-based receivers for SMS or dial-up style traffic. Use this when SMS or modem channels are part of the deployment.

### Assigned outputs and removal

The `Assigned outputs` column shows which outputs are linked to each receiver. The red `X` action removes a receiver entry, so use it only with explicit approval.
Open SME questions for unresolved control labels are tracked in `../team-input-questions.md`.

### Confirmed validation limits (IPCom API reference)

The following receiver constraints are confirmed by the local IPCom API documentation (`PUT /api/settings` validation sections):

- TCP and UDP ports must be between `1` and `65535`.
- TCP and UDP ports must be unique within their receiver category.
- Receiver `id` must be unique and non-zero; receiver `name` must be non-empty.
- Encryption password for IP/Modem receivers must be either 6 or 16 characters.
- COM and Modem receivers must reference a valid COM terminal (`port_id` must exist).

## Networking notes

- Receiver tabs define inbound endpoints (device -> IPCom).
- Output tabs define outbound destinations (IPCom -> CMS/automation).
- When changing receiver ports, update firewall and NAT rules before switching production traffic.


## Key fields to watch {#receivers-key-fields}

- `Port`: defines listening endpoint for device traffic. Alert cue: sudden ingest drop after port changes.
- `Receiver #` / `Line #`: core routing identifiers used downstream. Alert cue: events arrive in CMS under wrong receiver/line.
- `Encryption Password`: secures receiver channel. Alert cue: connection attempts fail after credential mismatch.
- `Assigned outputs`: links ingress path to delivery destinations. Alert cue: events ingested but not forwarded.
- `SIA - Time Dev. -/+`: tolerance for time deviation checks. Alert cue: repeated reject patterns tied to timestamp mismatch.
