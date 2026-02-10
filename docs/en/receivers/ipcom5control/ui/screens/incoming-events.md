# Incoming events

**Purpose:** Monitor live incoming device events and pings, and filter them by device or receiver.

## When to use

- When validating that devices are sending events.
- When troubleshooting routing, connectivity, or event decoding.

## Sections and why they matter

### Filters and actions

- `Show events` and `Show pings` toggle which message types appear.
- Filters for `OID`, `UID`, and `Receiver` narrow the stream to a specific device or instance.
- `Apply filter` updates the view, `Clear` resets filter fields, and `Clear events` clears the current list.

Filters are essential for high-volume receivers where scrolling the raw stream is impractical.

### Incoming event table

The table is wide and grouped by purpose:

- Identification: `Time`, `OID`, `PUID`, `UID`, `ICCID` identify the device.
- Connectivity: `Signal`, `Com` (communication type), `Con` (protocol), `IP`, `Ping`, `SMS Ping` show transport health.
- Device version: `HW` and `FW` help correlate behavior with hardware or firmware revisions.
- Routing: `RR ID`, `RR`, `LL` show receiver and line routing identifiers; `Dev RR` and `Dev LL` are device-reported routing values. `Reg?` indicates registration status.
- Event details: `Seq`, `C`, `Code`, `Group`, `Zone`, `Type`, `SubType`, `P` define the event payload.

Use these columns to confirm that events are correctly decoded and routed to the intended output.
Open SME questions for unresolved field semantics are tracked in `../team-input-questions.md`.

### Toast notifications

A brief toast (for example, `Settings loaded`) may appear after the page refreshes. It confirms the UI reloaded configuration data.


## Key fields to watch {#incoming-events-key-fields}

- `Time`: confirms end-to-end event latency and ordering. Alert cue: large delays relative to source event time.
- `OID` / `UID`: ties event to specific device identity. Alert cue: events from unknown or duplicated identifiers.
- `Con` / `IP` / `Ping`: indicates transport and reachability state. Alert cue: frequent ping loss or source IP churn.
- `RR ID` / `RR` / `LL`: routing context used for downstream delivery. Alert cue: events mapped to unexpected receiver/line.
- `Code` / `Group` / `Zone`: core payload used by CMS rules. Alert cue: unexpected code/group/zone combinations.
- `Reg?`: registration status indicator. Alert cue: unregistered state with ongoing event anomalies.
