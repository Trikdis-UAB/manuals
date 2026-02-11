import fs from "fs/promises";
import { fileExists, resolveRepo } from "./lib/utils.mjs";

const remainingTabs = [
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/logs.md",
    cover: "../assets/screens/logs.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/internal-events.md",
    cover: "../assets/screens/internal-events.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/receivers.md",
    cover: "../assets/screens/receivers.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/outputs.md",
    cover: "../assets/screens/outputs.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/users.md",
    cover: "../assets/screens/users.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/incoming-events.md",
    cover: "../assets/screens/incoming-events.webp",
  },
  {
    path: "docs/en/receivers/ipcom5control/ui/screens/objects.md",
    cover: "../assets/screens/objects.webp",
  },
];

const errors = [];

for (const tab of remainingTabs) {
  const absolutePath = resolveRepo(tab.path);

  if (!(await fileExists(absolutePath))) {
    errors.push(`${tab.path}: file missing`);
    continue;
  }

  const content = await fs.readFile(absolutePath, "utf8");

  if (!content.includes(tab.cover)) {
    errors.push(`${tab.path}: missing cover image '${tab.cover}'`);
  }

  const orderedMarkers = [
    "**Purpose:**",
    "## When to use",
    "## Sections and why they matter",
  ];
  let previousIndex = -1;
  for (const marker of orderedMarkers) {
    const markerIndex = content.indexOf(marker);
    if (markerIndex === -1) {
      errors.push(`${tab.path}: missing required section marker '${marker}'`);
      continue;
    }
    if (markerIndex <= previousIndex) {
      errors.push(`${tab.path}: section order violation at '${marker}'`);
    }
    previousIndex = markerIndex;
  }

  if (content.includes("## Key fields to watch")) {
    errors.push(`${tab.path}: standalone key fields section should not be present`);
  }

  if (content.includes("### Confirmed ")) {
    errors.push(`${tab.path}: standalone confirmed-values section should not be present`);
  }

  const sectionHeadingRegex = /^### .+$/gm;
  const sectionMatches = [...content.matchAll(sectionHeadingRegex)];

  if (sectionMatches.length === 0) {
    errors.push(`${tab.path}: no '###' section headings found`);
    continue;
  }

  if (!content.includes("![") || !content.includes("](")) {
    errors.push(`${tab.path}: missing section imagery`);
  }

  const hasOperationalBlock =
    content.includes("**Operational checks and actions:**") ||
    content.includes("### Operational checks and actions");

  if (!hasOperationalBlock) {
    errors.push(`${tab.path}: missing 'Operational checks and actions' block`);
  }

  const hasMonitorGuidance =
    content.includes("Monitor:") ||
    content.includes("**Monitor these in runtime:**");

  if (!hasMonitorGuidance) {
    errors.push(`${tab.path}: missing monitor guidance`);
  }
}

if (errors.length > 0) {
  console.error("IPcom structure check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("IPcom structure check passed.");
