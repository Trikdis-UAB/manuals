# Internal events

**Purpose:** Review and control system-generated events and the codes that are sent to downstream destinations.

## When to use

- When you need to map internal events to CMS or automation codes.
- When you need to enable or suppress specific internal events.

## Sections and why they matter

### Internal event list

Each row defines how an internal system condition is represented in outgoing messages. This is where you align internal event names with the numeric codes expected by your monitoring platform.

### Columns explained

- `Enabled`: whether the event is active (checked) or suppressed.
- `Classificator`: event classifier (for example, `E` for event, `R` for restore).
- `Event code`: numeric code sent in event output.
- `Group no` and `Zone no`: numeric routing fields used by receiver integrations.
- `Type`: category such as `System` or `Aux`.
- `Name`: internal event identifier (for example, `EVENT_SYSTEM_STARTED`).

Disabling events or changing codes affects downstream routing and alarm interpretation, so changes should be coordinated with the monitoring platform.
Open SME questions for unresolved control labels are tracked in `../team-input-questions.md`.

### Confirmed validation limits (IPCom API reference)

The following constraints are confirmed by the local IPCom API documentation (`PUT /api/settings` validation sections):

- `classificator` must be `E` (event) or `R` (restore).
- `type` must be a valid backend enum value.
- `event_code`, `group_no`, and `zone_no` must be valid hex-compatible values within backend limits.
- `name` must be non-empty.


## Key fields to watch {#internal-events-key-fields}

- `Enabled`: controls whether an internal event is emitted. Alert cue: expected alarms/restores stop appearing downstream.
- `Classificator`: distinguishes event vs restore semantics. Alert cue: one-sided event streams with missing restores.
- `Event code`: outbound numeric value expected by CMS. Alert cue: CMS decodes events into wrong type/class.
- `Group no` / `Zone no`: routing context used by integrations. Alert cue: alarms arrive under wrong group/zone.
- `Name`: internal event identity for traceability. Alert cue: changed mappings without documented change request.
