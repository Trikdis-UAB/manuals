import fs from "fs/promises";
import { fileExists, resolveRepo } from "./lib/utils.mjs";

const checks = [
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/status.md",
    snippets: [
      "![Status tab full-screen view](../assets/screens/status.webp)",
      "### Connected users",
      "### Footer",
      "## Operations runbook",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/general.md",
    snippets: [
      "![General tab full-screen view](../assets/screens/general.webp)",
      "**Operational checks and actions:**",
      "### Database settings",
      "### Ignorable startup event settings",
      "## Change management",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/logs.md",
    snippets: [
      "![Logs tab full-screen view](../assets/screens/logs.webp)",
      "### Log table",
      "## Incident checklist",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/internal-events.md",
    snippets: [
      "![Internal events tab full-screen view](../assets/screens/internal-events.webp)",
      "### Internal event list",
      "### Columns explained",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/receivers.md",
    snippets: [
      "![Receivers tab full-screen view](../assets/screens/receivers.webp)",
      "### TCP Receivers",
      "### UDP Receivers",
      "### COM Receivers",
      "### Modem Receivers",
      "### Assigned outputs and removal",
      "## Networking notes",
      "**Operational checks and actions:**",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/outputs.md",
    snippets: [
      "![Outputs tab full-screen view](../assets/screens/outputs.webp)",
      "### Outputs table",
      "`Buffer size` is a queue limit per output.",
      "Available `Type` options:",
      "JSON Server",
      "Available `Protocol` options:",
      "Surgard MLR2 Line with Account",
      "## Operations runbook",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/users.md",
    snippets: [
      "![Users tab full-screen view](../assets/screens/users.webp)",
      "### Users table",
      "## Common procedures",
      "### Create a new user",
      "### Change a user password",
      "## Hardening checklist",
      "token_time",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/access-and-login.md",
    snippets: [
      "# Access and login",
      "![Access and login page full-screen view](./assets/screens/login.webp)",
      "## Access methods",
      "## Web access flow",
      "## Windows `.exe` access flow",
      "## Security baseline for access",
      "## Quick troubleshooting",
      "## Related pages",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/incoming-events.md",
    snippets: [
      "![Incoming events tab full-screen view](../assets/screens/incoming-events.webp)",
      "### Filters and actions",
      "### Incoming event table",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/objects.md",
    snippets: [
      "![Objects tab full-screen view](../assets/screens/objects.webp)",
      "### Actions and filters",
      "### Object list table",
      "### Operational checks and actions",
    ],
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/team-questions.md",
    snippets: [
      "# Team Questions (CMS/IT Admin)",
      "## Open questions by priority",
      "## Completion checklist",
      "#network-ip-allowlist",
      "#status-operations-runbook",
    ],
    forbidden: [
      "#general-key-fields",
      "#outputs-key-fields",
      "#objects-key-fields",
      "#incoming-events-key-fields",
      "#users-key-fields",
      "#receivers-key-fields",
      "#logs-key-fields",
      "#internal-events-key-fields",
    ],
  },
  {
    path: "mkdocs.yml",
    snippets: [
      "- Receivers:",
      "- IPcom5 Control:",
      "- Overview: receivers/ipcom5control/index.md",
      "- Status: receivers/ipcom5control/ui/screens/status.md",
      "- Team questions: receivers/ipcom5control/ui/team-questions.md",
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

  for (const snippet of check.snippets || []) {
    if (!content.includes(snippet)) {
      missing.push(`${check.path} missing: ${snippet}`);
    }
  }

  for (const forbidden of check.forbidden || []) {
    if (content.includes(forbidden)) {
      missing.push(`${check.path} contains deprecated reference: ${forbidden}`);
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
