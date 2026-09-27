# IPCom UI Glossary

Use this glossary when reviewing `Status`, `Incoming events`, and `Objects` tabs.

## Core IDs

- `OID` - Object ID in IPCom.
- `PUID` - Partial UID (truncated device UID shown in event lists).
- `UID` - Unique device identifier.
- `ICCID` - SIM card identifier for cellular devices.
- `OOVR` - Override OID. An alternative object number that replaces the object's own OID, used to remap an object to the account number your monitoring software expects. Empty or `0` means no override is applied.

## Connectivity and transport

- `Com` / `Com Type` - Communication channel used by the device (for example `GSM`, `WiFi`, `LAN`).
- `Con` - Connection protocol (for example `TCP`, `UDP`).
- `Lvl` - Signal level indicator.
- `Ping` - Keepalive or reachability indicator.
- `SMS Ping` - Keepalive over SMS transport.

## Routing fields {#glossary-routing-fields}

- `RR ID` - Receiver ID.
- `RR` - Receiver number.
- `LL` - Line number.
- `Dev RR` - Receiver number as reported by the device itself.
- `Dev LL` - Line number as reported by the device itself.

## Event payload fields

- `Reg?` - Marks whether this particular event is a registration event. It describes the event, not the device's current state.
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
