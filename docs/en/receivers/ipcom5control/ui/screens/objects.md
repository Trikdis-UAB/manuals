# Objects

**Purpose:** Review and manage the list of tracked objects (devices), their status, and connection details.

## When to use

- When searching for a specific device or verifying its online status.
- When exporting device lists or auditing connectivity issues.

## Sections and why they matter

### Actions and filters

- `Refresh` reloads the list to show the latest device states.
- `Delete all objects` removes all objects from the list and should be used only with explicit approval.
- `Export` downloads the list for reporting or analysis. [REVIEW]
- Filter fields for `OID` and `UID` help narrow large lists, with `+` to apply and `Clear` to reset.
- `Show Related Objects` expands the list with related entries.

### Object list table

Key columns include:

- Identification: `OID`, `UID`, and `ICCID` identify the device and SIM.
- Status: `Status` and `Last Activity` show availability and the last reported time.
- Connectivity: `Ping`, `IP`, `Lvl` (signal level), `Com Type` (GSM/WiFi/LAN), and `Con` (TCP/UDP) reveal transport health.
- Device version: `HW` and `FW` help relate behavior to firmware levels.
- Routing: `RR ID`, `RR`, `LL` show receiver and line routing identifiers; `Dev RR` and `Dev LL` are device-reported routing values.
- `OOVR` meaning unclear. [REVIEW]

Open SME questions for this screen are tracked in `../team-input-questions.md`.

Red `X` indicators in the `Ping` column typically mean no recent ping was recorded.

### Toast notifications

A toast such as `Object list refreshed` appears after refresh completes to confirm the action.


## Key fields to watch {#objects-key-fields}

- `Status`: current supervision state for each object. Alert cue: sudden shift from `Online` to `Offline`.
- `Last Activity`: recency of device communication. Alert cue: prolonged inactivity while device expected online.
- `Ping`: connectivity heartbeat indicator. Alert cue: repeated red `X` across multiple devices.
- `Com Type` / `Con`: active transport path and protocol. Alert cue: unexpected transport changes during incidents.
- `HW` / `FW`: hardware/firmware baseline context. Alert cue: failures concentrated on one firmware revision.
- `OOVR`: unresolved field semantics under review. Alert cue: value changes coinciding with routing/supervision anomalies.
