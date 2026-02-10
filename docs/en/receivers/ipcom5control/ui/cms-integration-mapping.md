# CMS Integration Mapping

This page explains how `Receivers`, `Internal events`, and `Outputs` settings fit together for CMS delivery.

## End-to-end flow {#cms-end-to-end-flow}

1. Device sends event to IPCom on a configured receiver endpoint (`TCP`/`UDP`/`COM`/`Modem`).
2. IPCom classifies the event and applies internal event code/group/zone rules.
3. IPCom routes the event to one or more outputs.
4. Output protocol and destination settings define how the CMS receives it.

## Field mapping reference {#cms-field-mapping-reference}

| UI field | Operational meaning | Used in |
| --- | --- | --- |
| `Receiver #` | Receiver routing number assigned to inbound endpoint | Receivers |
| `Line #` | Line routing number paired with receiver | Receivers |
| `Event code` | Code forwarded in outbound event payload | Internal events |
| `Group no` / `Zone no` | Event grouping and zone routing values | Internal events |
| `Identifier` | Output-side destination identifier | Outputs |
| `Account number` | Panel/account identifier expected by CMS | Outputs |
| `Receiver` / `Line` | Output-side routing numbers for CMS delivery | Outputs |

## Protocol notes {#cms-protocol-notes}

- Confirmed protocol values from IPCom API docs:
  - `0`: `Surgard`
  - `1`: `Monas3`
  - `2`: `Surgard8`
  - `3`: `SurgardNoEnd`
  - `4`: `Ademco685`
  - `5`: `Ademco685Cid`
  - `6`: `Surgard2000`
  - `7`: `SiaDc09`
  - `8`: `SurgardMlr2_LineWithAccount`
- `SIA DC-09`: verify account identifier format, receiver/line mapping, and time deviation settings before production cutover.
- `Surgard`/`Ademco` style integrations: confirm expected account padding and code mapping with CMS configuration.
- `JSON`/`Webhook`: validate event schema with downstream parser before enabling routing.

Detailed CMS-specific behavior (which destination uses which protocol and exact accepted field set) still requires deployment confirmation. [REVIEW]

## Validation checklist before go-live {#cms-validation-checklist}

- Confirm each output has the correct protocol, destination, and account mapping.
- Generate test events for each critical alarm type and confirm CMS decoding.
- Verify restore events map correctly (`Classificator` values in Internal events tab).
- Record known-good receiver/line/account mappings for rollback and audits.
