# Team Questions (CMS/IT Admin)

Internal backlog only (kept in repo, not published on docs site).

This page tracks open deployment questions that cannot be finalized from UI inspection alone.

Use it during SME review sessions and close each item after confirmation.

## Unpublished draft pointer

`HA, cluster, and backup` content is intentionally kept out of published navigation and deployment until engineering sign-off.

Draft source kept in repository:

- `docs/en/receivers/ipcom/ui/ha-cluster-backup.md`
- Re-enable by removing this file from `exclude_docs` and adding it back to IPcom navigation in `mkdocs.yml`.

## Recently resolved

- Output `Type` and `Protocol` option lists are documented in [`Outputs`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-table).
- Output encryption key length is documented as `16` characters; only encoding/charset constraints remain open.

## How to use this page

1. Open the linked page and section.
2. Confirm behavior in staging/production configuration.
3. Replace `[REVIEW]` notes in linked docs with confirmed text.
4. Record owner and final policy/value in change management notes.

## Open questions by priority

| Priority | Topic | Question for team | Why this is needed | Where to update |
| --- | --- | --- | --- | --- |
| High | Output protocol mapping | For each output protocol used in your CMS pipeline, which fields are mandatory, optional, or ignored? | Incorrect field mapping can cause event loss, bad decoding, or duplicate processing. | [`Outputs table`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-table) |
| High | Routing fields semantics | Confirm exact meaning of `RR ID`, `RR`, `LL`, `Dev RR`, and `Dev LL` in outbound payloads and routing logic. | These fields drive correlation/routing and remain marked `[REVIEW]`. | [`Routing fields`](../../docs/en/receivers/ipcom/ui/glossary.md#glossary-routing-fields) |
| High | Whitelist enforcement | Does `IP Whitelist` in `General` and `Outputs` apply to source filtering, destination filtering, or both? What is the default behavior when unset? | Firewall and segmentation guidance depends on enforcement direction and default policy. | [`IP allowlist notes`](../../docs/en/receivers/ipcom/ui/networking-firewall.md#network-ip-allowlist), [`General sections`](../../docs/en/receivers/ipcom/ui/screens/general.md#general-sections), [`Outputs table`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-table) |
| High | Cluster failover behavior | In cluster mode, what fails over automatically: UI access, receiver listeners, output delivery, and/or database state? | Recovery runbooks need explicit failover scope and expected downtime behavior. | Hold for unpublished draft (`docs/en/receivers/ipcom/ui/ha-cluster-backup.md`) |
| High | Output queue durability and retry policy | For each output type, are queues persisted across restart? What retry/backoff policy is applied when destination is unavailable? | Defines real data-loss risk and outage recovery expectations. | [`Outputs operations runbook`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-operations-runbook), [`Outputs table`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-table) |
| Medium | Alert thresholds | What thresholds should trigger alerts (buffer growth, offline count, heartbeat loss, repeated connection errors)? | Runbooks are descriptive but not actionable for NOC/SOC until thresholds are approved. | [`Status operations runbook`](../../docs/en/receivers/ipcom/ui/screens/status.md#status-operations-runbook), [`Logs incident checklist`](../../docs/en/receivers/ipcom/ui/screens/logs.md#logs-incident-checklist) |
| Medium | Event retention policy | Confirm required event/device retention and compliance constraints for prune settings. | Retention affects audits, investigations, and database sizing. | [`General sections`](../../docs/en/receivers/ipcom/ui/screens/general.md#general-sections), backup scope held in unpublished draft (`docs/en/receivers/ipcom/ui/ha-cluster-backup.md`) |
| Medium | Time sync policy | Confirm approved time source and tolerated drift for receiver/device/CMS event correlation. | Time drift causes false sequence interpretation in incidents and SLA reporting. | [`General sections`](../../docs/en/receivers/ipcom/ui/screens/general.md#general-sections), [`Status operations runbook`](../../docs/en/receivers/ipcom/ui/screens/status.md#status-operations-runbook) |
| Medium | `Objects` export specification | What format does `Export` produce (CSV/XLS/JSON), which fields are included, and does it include sensitive data? | Needed for secure handling, SIEM ingestion, and repeatable audit reporting. | [`Object list table`](../../docs/en/receivers/ipcom/ui/screens/objects.md#objects-object-list) |
| Medium | Output encryption key format | For output `Encrypt` and `Encryption key`, confirm accepted charset/encoding and whitespace rules (length `16` already confirmed). | Wrong format can break encrypted delivery even when key length is valid. | [`Outputs table`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-table), [`Outputs runbook`](../../docs/en/receivers/ipcom/ui/screens/outputs.md#outputs-operations-runbook) |
| Medium | Unknown field semantics (`OOVR`, `Reg?`) | Confirm exact meaning and operational use of `OOVR` and `Reg?` in troubleshooting workflows. | These fields appear in high-volume operational views but remain ambiguous. | [`Object list table`](../../docs/en/receivers/ipcom/ui/screens/objects.md#objects-object-list), [`Incoming event table`](../../docs/en/receivers/ipcom/ui/screens/incoming-events.md#incoming-events-table), [`Routing fields`](../../docs/en/receivers/ipcom/ui/glossary.md#glossary-routing-fields) |
| Medium | API management-plane policy | Clarify whether management API must be HTTPS-only in production and how `Enable HTTP API` is allowed to be used. | Prevents accidental insecure exposure and aligns firewall policy with security baseline. | [`General sections`](../../docs/en/receivers/ipcom/ui/screens/general.md#general-sections), [`Firewall planning`](../../docs/en/receivers/ipcom/ui/networking-firewall.md#network-firewall-planning) |
| Low | Unlabeled captured controls | Identify remaining `[REVIEW]` unlabeled controls and provide canonical labels/intent. | Reduces ambiguity and improves operator confidence in runbooks. | [`screens/general.md`](../../docs/en/receivers/ipcom/ui/screens/general.md), [`screens/receivers.md`](../../docs/en/receivers/ipcom/ui/screens/receivers.md), [`screens/internal-events.md`](../../docs/en/receivers/ipcom/ui/screens/internal-events.md), [`screens/incoming-events.md`](../../docs/en/receivers/ipcom/ui/screens/incoming-events.md), [`screens/outputs.md`](../../docs/en/receivers/ipcom/ui/screens/outputs.md), [`screens/objects.md`](../../docs/en/receivers/ipcom/ui/screens/objects.md) |

## Completion checklist

- All `[REVIEW]` markers are replaced with confirmed deployment behavior.
- CMS test events are validated end-to-end for each critical alarm type.
- Firewall and allowlist rules match documented receiver/output settings.
- Cluster/backup/recovery runbook is tested and signed off by operations.
