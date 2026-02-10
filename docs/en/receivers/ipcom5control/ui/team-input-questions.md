# Team Input Tracker (CMS/IT Admin)

This page lists deployment-specific questions that cannot be finalized from UI inspection alone.

Use it during SME review sessions and mark each item as resolved after confirmation.

## How to use this tracker

1. Open the linked page and section.
2. Confirm behavior in a staging environment if needed.
3. Replace `[REVIEW]` notes in the linked docs with confirmed text.
4. Record final values or rules in change management notes.

## Open questions by priority

| Priority | Topic | Question for team | Why this is needed | Where to update |
| --- | --- | --- | --- | --- |
| High | Output protocol mapping | For each output protocol in use (`SIA`, `Surgard`, `JSON`), which fields are mandatory, optional, or ignored by the CMS? | Incorrect mapping can cause event loss, wrong alarm decoding, or duplicate handling in production. | [`Protocol notes`](./cms-integration-mapping.md#cms-protocol-notes) |
| High | Routing fields semantics | Confirm exact meaning of `RR ID`, `RR`, `LL`, `Dev RR`, and `Dev LL` in your deployment and outbound payloads. | These fields affect routing/correlation and are currently marked `[REVIEW]`. | [`Routing fields`](./glossary.md#glossary-routing-fields) |
| High | Whitelist enforcement | Does `IP Whitelist` in `General` and `Outputs` enforce source filtering, destination filtering, or both? Is it deny-by-default or allow-only-when-set? | Firewall and segmentation guidance depends on exact enforcement direction and default policy. | [`IP allowlist notes`](./networking-firewall.md#network-ip-allowlist), [`General sections`](./screens/general.md#general-sections), [`Outputs key fields`](./screens/outputs.md#outputs-key-fields) |
| High | Cluster failover behavior | In cluster mode, what fails over automatically: UI access, receiver listeners, output delivery, database state? | Recovery playbooks and downtime expectations require explicit failover scope. | [`Cluster expectations`](./ha-cluster-backup.md#ha-cluster-expectations) |
| High | Output queue durability and retry policy | For each output type, are queued events persisted across restart, and what retry/backoff policy is used when destination is unavailable? | This defines data-loss risk and expected recovery behavior during outages. | [`Outputs operations runbook`](./screens/outputs.md#outputs-operations-runbook), [`Protocol notes`](./cms-integration-mapping.md#cms-protocol-notes) |
| Medium | Alert thresholds | What thresholds should trigger operations alerts (buffer growth, offline count, heartbeat loss, repeated connection errors)? | Without approved thresholds, runbooks are descriptive but not actionable for NOC/SOC alerts. | [`Status operations runbook`](./screens/status.md#status-operations-runbook), [`Logs incident checklist`](./screens/logs.md#logs-incident-checklist) |
| Medium | Event retention policy | Confirm required retention period for events/devices and compliance constraints for prune settings. | Retention impacts audits, investigations, and database sizing. | [`General sections`](./screens/general.md#general-sections), [`Backup scope`](./ha-cluster-backup.md#ha-backup-scope) |
| Medium | Time sync policy | Confirm approved time source and tolerated drift for device/receiver/CMS correlation. | Time drift causes false sequence interpretation in investigations and SLA reporting. | [`General sections`](./screens/general.md#general-sections), [`Validation checklist`](./cms-integration-mapping.md#cms-validation-checklist) |
| Medium | `Objects` export specification | What format does `Export` produce (CSV/XLS/JSON), which fields are included, and does it include sensitive data? | Needed for secure data handling, SIEM ingestion, and repeatable audit reporting. | [`Objects key fields`](./screens/objects.md#objects-key-fields) |
| Medium | Output encryption key format | For output `Encrypt`/`Encryption key` fields, confirm accepted character set and encoding (ASCII only, hex-only, UTF-8 support, whitespace rules). | API confirms 16-character length, but format constraints are not explicit; wrong format could break encrypted delivery. | [`Outputs table`](./screens/outputs.md#outputs-table), [`Outputs key fields`](./screens/outputs.md#outputs-key-fields) |
| Medium | Unknown field semantics (`OOVR`, `Reg?`) | Confirm exact meaning and operational use of `OOVR` and `Reg?` in troubleshooting workflows. | These fields appear in high-volume operational views but currently have ambiguous interpretation. | [`Objects key fields`](./screens/objects.md#objects-key-fields), [`Incoming events key fields`](./screens/incoming-events.md#incoming-events-key-fields), [`Routing fields`](./glossary.md#glossary-routing-fields) |
| Medium | API management-plane policy | Clarify whether management API exposure is HTTPS-only in production and how `Enable HTTP API` should be used. | Prevents accidental insecure API exposure and aligns firewall policy with security baseline. | [`General sections`](./screens/general.md#general-sections), [`Firewall planning`](./networking-firewall.md#network-firewall-planning) |
| Low | Unlabeled captured controls | Identify all `[REVIEW]` unlabeled controls in generated tables and provide canonical names/intent. | Improves operator confidence and avoids ambiguous procedural steps in manuals. | [`screens/general.md`](./screens/general.md), [`screens/receivers.md`](./screens/receivers.md), [`screens/internal-events.md`](./screens/internal-events.md), [`screens/incoming-events.md`](./screens/incoming-events.md), [`screens/outputs.md`](./screens/outputs.md), [`screens/objects.md`](./screens/objects.md) |

## Completion checklist

- All `[REVIEW]` markers are replaced with confirmed deployment behavior.
- CMS test events are validated end-to-end for each critical alarm type.
- Firewall and allowlist rules match documented receiver/output settings.
- Cluster/backup/recovery runbook is tested and signed off by operations.
