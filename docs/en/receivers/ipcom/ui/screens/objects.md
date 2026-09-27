# Objects

![Objects tab full-screen view](../assets/screens/objects.webp)

**Purpose:** Review and manage the list of tracked objects (devices), their status, and connection details.

## When to use

- When searching for a specific device or verifying its online status.
- When exporting device lists or auditing connectivity issues.

## Sections and why they matter

### Actions and filters {#objects-actions-filters}

- `Refresh` reloads the list to show the latest device states.
- `Delete all objects` removes all objects from the list and should be used only with explicit approval.
- `Export` downloads the currently filtered list as a semicolon-delimited CSV file named `objects.csv`, with one row per device plus additional rows for each channel and, when shown, each related object. Values are wrapped in double quotes and booleans are written as `Yes`/`No`. The file carries object and device identifiers — handle and store it accordingly.
- Filter fields for `OID` and `UID` help narrow large lists, with `+` to apply and `Clear` to reset.
- `Show Related Objects` expands the list with related entries.

![Objects tab actions and filters section](../assets/screens/objects-sections/actions-and-filters.webp)

### Object list table {#objects-object-list}

Key columns include:

- Identification: `OID`, `UID`, and `ICCID` identify the device and SIM.
- Status: `Status` and `Last Activity` show availability and the last reported time.
- Connectivity: `Ping`, `IP`, `Lvl` (signal level), `Com Type` (GSM/WiFi/LAN), and `Con` (TCP/UDP) reveal transport health.
- Device version: `HW` and `FW` help relate behavior to firmware levels.
- Routing: `RR ID` (receiver ID), `RR` (receiver number), and `LL` (line number) show routing context; `Dev RR` and `Dev LL` are device-reported routing values.
- `OOVR` is the override OID: an alternative object number that replaces the object's own OID, used to remap an object to the account number your monitoring software expects. Empty or `0` means no override is applied.

Red `X` indicators in the `Ping` column typically mean no recent ping was recorded.
For full field definitions, see `Glossary` in the IPcom navigation.

![Objects tab object list table section](../assets/screens/objects-sections/object-list-table.webp)

### Operational checks and actions {#objects-operational-checks}

Use two quick passes: first monitor object health signals over time, then confirm table values against expected routing and inventory.

**Monitor these in runtime:**

- Accidental destructive actions (`Delete all objects`) during operations. Alert cue: sudden empty inventory.
- Stale filter state. Alert cue: expected devices missing from current view.
- `Status` and `Last Activity` divergence. Alert cue: object reported online but stale activity timestamp.
- Repeated `Ping` red `X` across the same transport group. Alert cue: channel or path degradation.
- `OOVR` values changing unexpectedly. Alert cue: an object has been remapped to a different account number, so its events will arrive under that number in your monitoring software.

**Confirm before production use:**

- `Refresh` is used before incident triage snapshots.
- Routing fields (`RR ID`, `RR`, `LL`, `Dev RR`, `Dev LL`) align with receiver/output mapping.
- Hardware and firmware fields (`HW`, `FW`) are present for expected managed device types.
