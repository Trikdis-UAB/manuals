import fs from "fs/promises";
import { fileExists, resolveRepo } from "./lib/utils.mjs";

const checks = [
  {
    path: "docs/en/receivers/ipcom5control/ui/glossary.md",
    snippets: [
      "# IPCom UI Glossary",
      "## Core IDs",
      "## Connectivity and transport",
      "## Routing fields",
      "## Event payload fields",
      "`RR ID` - Receiver routing identifier. [REVIEW]",
      "Open SME questions for unresolved term semantics are tracked in `team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/status.md",
    snippets: [
      "![Status - Full Screen](../assets/screens/status.png)",
      "## Operations runbook",
      "## Key fields to watch",
      "`Output buffer keeps increasing`",
      "![Status - General](../assets/screens/status-sections/general.png)",
      "![Status - API](../assets/screens/status-sections/api.png)",
      "![Status - TCP Connections](../assets/screens/status-sections/tcp-connections.png)",
      "![Status - Output Buffers](../assets/screens/status-sections/output-buffers.png)",
      "![Status - Device Tracker](../assets/screens/status-sections/device-tracker.png)",
      "![Status - Database](../assets/screens/status-sections/database.png)",
      "![Status - Modem Status](../assets/screens/status-sections/modem-status.png)",
      "![Status - Connected Users](../assets/screens/status-sections/connected-users.png)",
      "![Status - Footer Left](../assets/screens/status-sections/footer-left.png)",
      "![Status - Footer Center](../assets/screens/status-sections/footer-center.png)",
      "![Status - Footer Right](../assets/screens/status-sections/footer-right.png)",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/outputs.md",
    snippets: [
      "## Operations runbook",
      "## Key fields to watch",
      "`Buffer size` is a queue limit per output.",
      "### Confirmed option values (IPCom API reference)",
      "`SiaDc09` | `7` | SIA DC-09",
      "`buffer_size = 0` uses the default queue size of `1000`.",
      "For a cross-tab mapping, see `../cms-integration-mapping.md`.",
      "Open SME questions for this screen are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/receivers.md",
    snippets: [
      "See `../cms-integration-mapping.md`.",
      "### Confirmed validation limits (IPCom API reference)",
      "Encryption password for IP/Modem receivers must be either 6 or 16 characters.",
      "## Key fields to watch",
      "Open SME questions for unresolved control labels are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/users.md",
    snippets: [
      "## Hardening checklist",
      "### Confirmed scope values and limits (IPCom API reference)",
      "Allowed scopes: `users`, `settings`, `objects`, `device_control`, `events`, `omit_mpass`, `restart_services`, `turnoff_receiver`, `license`.",
      "`token_time` range: `1` to `5,256,000` minutes",
      "## Key fields to watch",
      "Keep `administrator` for emergency use only",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/general.md",
    snippets: [
      "![General - Full Screen](../assets/screens/general.png)",
      "## Change management",
      "**Operational checks and validation:**",
      "![General - Misc](../assets/screens/general-sections/misc.png)",
      "![General - Object tracker settings](../assets/screens/general-sections/object-tracker-settings.png)",
      "![General - API settings](../assets/screens/general-sections/api-settings.png)",
      "![General - Device STATUS export settings](../assets/screens/general-sections/device-status-export-settings.png)",
      "![General - Database settings](../assets/screens/general-sections/database-settings.png)",
      "![General - Ignorable startup event settings](../assets/screens/general-sections/ignorable-startup-event-settings.png)",
      "![General - Show passwords](../assets/screens/general-sections/show-passwords.png)",
      "Watch: `Send IPCom time to devices` and sync interval.",
      "Watch: `Enable HTTP API`, API ports, and TLS status.",
      "Watch: `Enable cluster`.",
      "Watch: `Enable database` and SQL connection fields.",
      "Watch: `Ignore events on device startup` and exception list.",
      "`instance_name` must be non-empty.",
      "`timeout_multiplier` and `sms_timeout_multiplier` must be `1..100`.",
      "`api_port` and `api_http_port` must be between `1` and `65535`.",
      "Device STATUS export `port` must be `1..65535`.",
      "`api_jwt_secret` must be exactly 64 characters.",
      "if database is enabled, `sqluser`, `sqlpass`, `sqlhost`, and `sqldatabase` must be non-empty.",
      "`event_code <= 0xFFF`, `group_no <= 0xFF`, `zone_no <= 0xFFF`, and each triplet must be unique.",
      "Schedule changes to API, database, and retention settings",
      "Open SME questions about API exposure policy are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/logs.md",
    snippets: [
      "## Incident checklist",
      "### Confirmed log type values (IPCom API reference)",
      "- `3`: settings-change messages.",
      "## Key fields to watch",
      "`Destination delivery failures`",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/objects.md",
    snippets: [
      "`OOVR` meaning unclear. [REVIEW]",
      "## Key fields to watch",
      "Open SME questions for this screen are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/incoming-events.md",
    snippets: [
      "## Key fields to watch",
      "Open SME questions for unresolved field semantics are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/internal-events.md",
    snippets: [
      "### Confirmed validation limits (IPCom API reference)",
      "`classificator` must be `E` (event) or `R` (restore).",
      "## Key fields to watch",
      "Open SME questions for unresolved control labels are tracked in `../team-input-questions.md`.",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/login.md",
    snippets: [
      "# Login",
      "## Key fields to watch",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/cms-integration-mapping.md",
    snippets: [
      "# CMS Integration Mapping",
      "## End-to-end flow",
      "{#cms-protocol-notes}",
      "- `7`: `SiaDc09`",
      "## Validation checklist before go-live",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/networking-firewall.md",
    snippets: [
      "# Networking and Firewall Guide",
      "## Traffic directions",
      "{#network-ip-allowlist}",
      "## Firewall planning",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/ha-cluster-backup.md",
    snippets: [
      "# HA, Cluster, and Backup Notes",
      "## Cluster expectations",
      "{#ha-backup-scope}",
      "## Recovery planning",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/team-input-questions.md",
    snippets: [
      "# Team Input Tracker (CMS/IT Admin)",
      "## Open questions by priority",
      "## Completion checklist",
      "Incorrect mapping can cause event loss",
      "Output queue durability and retry policy",
      "`Objects` export specification",
      "Unknown field semantics (`OOVR`, `Reg?`)",
      "#cms-protocol-notes",
      "#network-ip-allowlist",
      "#status-operations-runbook",
      "All `[REVIEW]` markers are replaced with confirmed deployment behavior.",
    ],
  },
  {
    path: "mkdocs.yml",
    snippets: [
      "- Receivers:",
      "- IPcom5 Control:",
      "- Tabs:",
      "- Status: receivers/ipcom5control/ui/screens/status.md",
      "- Logs: receivers/ipcom5control/ui/screens/logs.md",
      "- General: receivers/ipcom5control/ui/screens/general.md",
      "- Internal events: receivers/ipcom5control/ui/screens/internal-events.md",
      "- Receivers: receivers/ipcom5control/ui/screens/receivers.md",
      "- Outputs: receivers/ipcom5control/ui/screens/outputs.md",
      "- Users: receivers/ipcom5control/ui/screens/users.md",
      "- Incoming events: receivers/ipcom5control/ui/screens/incoming-events.md",
      "- Objects: receivers/ipcom5control/ui/screens/objects.md",
      "- Operations:",
      "- CMS integration mapping: receivers/ipcom5control/ui/cms-integration-mapping.md",
      "- Networking and firewall: receivers/ipcom5control/ui/networking-firewall.md",
      "- HA, cluster, and backup: receivers/ipcom5control/ui/ha-cluster-backup.md",
      "- Glossary: receivers/ipcom5control/ui/glossary.md",
    ],
  },
  {
    path: "docs/_NAVIGATION.md",
    snippets: [
      "- Tabs",
      "- [Status](en/receivers/ipcom5control/ui/screens/status.md)",
      "- [Logs](en/receivers/ipcom5control/ui/screens/logs.md)",
      "- [General](en/receivers/ipcom5control/ui/screens/general.md)",
      "- [Internal events](en/receivers/ipcom5control/ui/screens/internal-events.md)",
      "- [Receivers](en/receivers/ipcom5control/ui/screens/receivers.md)",
      "- [Outputs](en/receivers/ipcom5control/ui/screens/outputs.md)",
      "- [Users](en/receivers/ipcom5control/ui/screens/users.md)",
      "- [Incoming events](en/receivers/ipcom5control/ui/screens/incoming-events.md)",
      "- [Objects](en/receivers/ipcom5control/ui/screens/objects.md)",
      "- Operations",
      "- [CMS integration mapping](en/receivers/ipcom5control/ui/cms-integration-mapping.md)",
      "- [Networking and firewall](en/receivers/ipcom5control/ui/networking-firewall.md)",
      "- [HA, cluster, and backup](en/receivers/ipcom5control/ui/ha-cluster-backup.md)",
      "- [Glossary](en/receivers/ipcom5control/ui/glossary.md)",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/index.md",
    snippets: [
      "Operational security baseline:",
      "Restrict management UI access by network allowlist or VPN.",
    ],
  },
];

const missing = [];

for (const check of checks) {
  const absolutePath = resolveRepo(check.path);
  if (!(await fileExists(absolutePath))) {
    missing.push(`${check.path} (file missing)`);
    continue;
  }

  const content = await fs.readFile(absolutePath, "utf8");
  for (const snippet of check.snippets) {
    if (!content.includes(snippet)) {
      missing.push(`${check.path} missing: ${snippet}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Monitoring/admin docs check failed:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Monitoring/admin docs check passed.");
