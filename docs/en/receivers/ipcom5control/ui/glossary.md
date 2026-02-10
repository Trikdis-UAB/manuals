# IPCom UI Glossary

Use this glossary when reviewing `Status`, `Incoming events`, and `Objects` tabs.

## Core IDs

- `OID` - Object ID in IPCom.
- `PUID` - Partial UID (truncated device UID shown in event lists).
- `UID` - Unique device identifier.
- `ICCID` - SIM card identifier for cellular devices.

## Connectivity and transport

- `Com` / `Com Type` - Communication channel used by the device (for example `GSM`, `WiFi`, `LAN`).
- `Con` - Connection protocol (for example `TCP`, `UDP`).
- `Lvl` - Signal level indicator.
- `Ping` - Keepalive or reachability indicator.
- `SMS Ping` - Keepalive over SMS transport.

## Routing fields {#glossary-routing-fields}

- `RR ID` - Receiver routing identifier. [REVIEW]
- `RR` - Receiver number used for event routing. [REVIEW]
- `LL` - Line number used for event routing. [REVIEW]
- `Dev RR` - Device-reported receiver value. [REVIEW]
- `Dev LL` - Device-reported line value. [REVIEW]
- `Reg?` - Device registration state flag. [REVIEW]

Open SME questions for unresolved term semantics are tracked in `team-input-questions.md`.

## Event payload fields

- `Seq` - Event sequence number.
- `Code` - Event code sent to downstream systems.
- `Group` - Event group value.
- `Zone` - Event zone value.
- `Type` / `SubType` - Event category and subcategory.
- `P` - Partition value (if used by panel protocol).

## Operational statuses

- `Online` - Device is actively communicating within supervision thresholds.
- `Offline` - Device has missed supervision thresholds.
- `Untracked` - Device is present but not currently supervised by tracker logic.
