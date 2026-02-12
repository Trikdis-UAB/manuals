import { fileExists, resolveRepo } from "./lib/utils.mjs";

const requiredFiles = [
  "projects/Ipcom5/roadmap.md",
  "Scripts/ipcom5control-web/capture_web.mjs",
  "Scripts/ipcom5control-web/generate_manual.mjs",
  "Scripts/ipcom5control-web/validate_coverage.mjs",
  "Scripts/ipcom5control-web/templates/screen.md",
  "docs/en/receivers/ipcom5control/ui/index.md",
];

let missing = 0;

for (const filePath of requiredFiles) {
  if (!(await fileExists(resolveRepo(filePath)))) {
    console.error(`Missing required file: ${filePath}`);
    missing += 1;
  }
}

if (missing > 0) {
  process.exit(1);
}

console.log("Scaffold check passed.");
