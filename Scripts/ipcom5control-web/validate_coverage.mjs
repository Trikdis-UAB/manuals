import fs from "fs/promises";
import {
  fileExists,
  normalizeLabel,
  readJson,
  resolveArtifacts,
  resolveDocs,
  writeJson,
} from "./lib/utils.mjs";

const screenMapPath = resolveArtifacts("screen-map.json");
if (!(await fileExists(screenMapPath))) {
  console.error("Missing artifacts/ui/ipcom5control-web/screen-map.json. Run capture first.");
  process.exit(1);
}

const screenMap = await readJson(screenMapPath);
const report = {
  generatedAt: new Date().toISOString(),
  summary: { totalScreens: 0, pass: 0, fail: 0 },
  screens: [],
};

for (const screen of screenMap.screens) {
  const controlsPath = resolveArtifacts("screens", screen.id, "controls.json");
  const docPath = resolveDocs("screens", `${screen.id}.md`);

  if (!(await fileExists(controlsPath))) {
    report.screens.push({
      id: screen.id,
      title: screen.title,
      status: "FAIL",
      reason: "Missing controls.json",
      missing: [],
      extra: [],
    });
    continue;
  }

  const controlsData = await readJson(controlsPath);
  const captured = (controlsData.controls || [])
    .map((control) => normalizeLabel(control.label || ""))
    .filter(Boolean);

  if (!(await fileExists(docPath))) {
    report.screens.push({
      id: screen.id,
      title: screen.title,
      status: "FAIL",
      reason: "Missing documentation file",
      missing: unique(captured),
      extra: [],
    });
    continue;
  }

  const markdown = await fs.readFile(docPath, "utf8");
  const documented = extractTableFirstColumn(markdown).map(normalizeLabel).filter(Boolean);

  const missing = unique(captured.filter((item) => !documented.includes(item)));
  const extra = unique(documented.filter((item) => !captured.includes(item)));

  const status = missing.length === 0 ? "PASS" : "FAIL";
  report.screens.push({
    id: screen.id,
    title: screen.title,
    status,
    missing,
    extra,
  });
}

report.summary.totalScreens = report.screens.length;
report.summary.pass = report.screens.filter((screen) => screen.status === "PASS").length;
report.summary.fail = report.screens.filter((screen) => screen.status === "FAIL").length;

await writeJson(resolveArtifacts("coverage-report.json"), report);
await fs.writeFile(resolveArtifacts("coverage-report.md"), renderReport(report));

if (report.summary.fail > 0) {
  console.error(
    `Coverage failed for ${report.summary.fail} of ${report.summary.totalScreens} screens.`
  );
  process.exit(1);
}

console.log(
  `Coverage passed for ${report.summary.pass} of ${report.summary.totalScreens} screens.`
);

function extractTableFirstColumn(markdown) {
  const lines = markdown.split("\n");
  const rows = [];
  let inTable = false;
  for (const line of lines) {
    if (!inTable && line.startsWith("| Name |")) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!line.startsWith("|")) break;
      if (line.includes("---")) continue;
      const cells = line.split("|").map((cell) => cell.trim());
      if (cells.length > 1) {
        rows.push(cells[1]);
      }
    }
  }
  return rows;
}

function unique(items) {
  return Array.from(new Set(items));
}

function renderReport(data) {
  const lines = [
    "# Coverage report",
    "",
    `Generated: ${data.generatedAt}`,
    "",
    `Total screens: ${data.summary.totalScreens}`,
    `Pass: ${data.summary.pass}`,
    `Fail: ${data.summary.fail}`,
    "",
    "## Screens",
    "",
  ];

  for (const screen of data.screens) {
    lines.push(`- ${screen.title || screen.id}: ${screen.status}`);
    if (screen.missing?.length) {
      lines.push(`  - Missing: ${screen.missing.join(", ")}`);
    }
    if (screen.extra?.length) {
      lines.push(`  - Extra: ${screen.extra.join(", ")}`);
    }
  }

  lines.push("");
  return lines.join("\n");
}
