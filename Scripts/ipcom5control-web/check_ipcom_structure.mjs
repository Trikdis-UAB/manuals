import fs from "fs/promises";
import { fileExists, resolveRepo } from "./lib/utils.mjs";

const screenPaths = [
  "docs/en/receivers/ipcom5control/ui/screens/login.md",
  "docs/en/receivers/ipcom5control/ui/screens/status.md",
  "docs/en/receivers/ipcom5control/ui/screens/logs.md",
  "docs/en/receivers/ipcom5control/ui/screens/general.md",
  "docs/en/receivers/ipcom5control/ui/screens/internal-events.md",
  "docs/en/receivers/ipcom5control/ui/screens/receivers.md",
  "docs/en/receivers/ipcom5control/ui/screens/outputs.md",
  "docs/en/receivers/ipcom5control/ui/screens/users.md",
  "docs/en/receivers/ipcom5control/ui/screens/incoming-events.md",
  "docs/en/receivers/ipcom5control/ui/screens/objects.md",
];

const requiredOrderedSectionsDefault = [
  "**Purpose:**",
  "## When to use",
  "## Sections and why they matter",
  "## Key fields to watch",
];

const errors = [];

for (const path of screenPaths) {
  const absolutePath = resolveRepo(path);

  if (!(await fileExists(absolutePath))) {
    errors.push(`${path}: file missing`);
    continue;
  }

  const content = await fs.readFile(absolutePath, "utf8");

  if (content.includes("**Location:**")) {
    errors.push(`${path}: location line should not be present`);
  }

  if (content.includes("\n## Fields and controls (generated reference)\n")) {
    errors.push(`${path}: generated fields section should not be present`);
  }

  if (content.includes("\n## Validation\n")) {
    errors.push(`${path}: validation section should not be present`);
  }

  const requiredOrderedSections = path.endsWith("/general.md")
    ? ["**Purpose:**", "## When to use", "## Sections and why they matter"]
    : requiredOrderedSectionsDefault;

  let previousIndex = -1;
  for (const marker of requiredOrderedSections) {
    const markerIndex = content.indexOf(marker);
    if (markerIndex === -1) {
      errors.push(`${path}: missing required section marker '${marker}'`);
      continue;
    }
    if (markerIndex <= previousIndex) {
      errors.push(`${path}: section order violation at '${marker}'`);
    }
    previousIndex = markerIndex;
  }

  const sectionsIndex = content.indexOf("## Sections and why they matter");
  const keyFieldsIndex = content.indexOf("## Key fields to watch");
  const operationsIndex = content.indexOf("## Operations runbook");
  if (
    operationsIndex !== -1 &&
    (operationsIndex <= sectionsIndex || (keyFieldsIndex !== -1 && operationsIndex >= keyFieldsIndex))
  ) {
    errors.push(
      `${path}: '## Operations runbook' must appear after sections explanation and before key fields`,
    );
  }

  if (content.includes("[REVIEW]") && !content.includes("team-input-questions.md")) {
    errors.push(`${path}: contains [REVIEW] but no link to team-input-questions.md`);
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
