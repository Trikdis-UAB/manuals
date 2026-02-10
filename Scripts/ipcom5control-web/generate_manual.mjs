import fs from "fs/promises";
import path from "path";
import {
  ensureDir,
  fileExists,
  normalizeLabel,
  readJson,
  resolveArtifacts,
  resolveDocs,
} from "./lib/utils.mjs";

const screenMapPath = resolveArtifacts("screen-map.json");
if (!(await fileExists(screenMapPath))) {
  console.error("Missing artifacts/ui/ipcom5control-web/screen-map.json. Run capture first.");
  process.exit(1);
}

const screenMap = await readJson(screenMapPath);
const templatePath = path.resolve("templates", "screen.md");

if (!(await fileExists(templatePath))) {
  console.error("Missing Scripts/ipcom5control-web/templates/screen.md.");
  process.exit(1);
}

const template = await fs.readFile(templatePath, "utf8");
const screensOutputDir = resolveDocs("screens");
const assetsDir = resolveDocs("assets", "screens");

await ensureDir(screensOutputDir);
await ensureDir(assetsDir);

const screenLinks = [];

for (const screen of screenMap.screens) {
  const screenDir = resolveArtifacts("screens", screen.id);
  const controlsPath = path.join(screenDir, "controls.json");
  const metaPath = path.join(screenDir, "meta.json");

  if (!(await fileExists(controlsPath)) || !(await fileExists(metaPath))) {
    continue;
  }

  const controlsData = await readJson(controlsPath);
  const meta = await readJson(metaPath);

  const controls = dedupeControls(controlsData.controls || []);
  const controlsTable = controls.length
    ? controls.map((control) => tableRow(control)).join("\n")
    : "| [REVIEW: no controls found] | | | | | | |";

  const screenshotSource = path.join(screenDir, "screenshot.png");
  let screenshotBlock = "_[REVIEW: screenshot not captured]_";
  if (await fileExists(screenshotSource)) {
    const targetScreenshot = path.join(assetsDir, `${screen.id}.png`);
    await fs.copyFile(screenshotSource, targetScreenshot);
    screenshotBlock = `![${screen.title}](../assets/screens/${screen.id}.png)`;
  }

  const location =
    meta.navPath && meta.navPath.length > 0
      ? meta.navPath.join(" > ")
      : meta.url || screen.url || "[REVIEW]";

  const content = template
    .replaceAll("{{title}}", screen.title || meta.title || screen.id)
    .replaceAll("{{location}}", location)
    .replaceAll("{{screenshot}}", screenshotBlock)
    .replaceAll("{{controlsTable}}", controlsTable)
    .replaceAll("{{controlsCount}}", String(controls.length))
    .replaceAll("{{screenId}}", screen.id);

  const outputPath = path.join(screensOutputDir, `${screen.id}.md`);
  await fs.writeFile(outputPath, content);

  screenLinks.push({
    id: screen.id,
    title: screen.title || meta.title || screen.id,
  });
}

await writeScreensIndex(screenLinks);

function tableRow(control) {
  return `| ${control.label || "[REVIEW]"} | ${control.tag || ""} | ${
    control.role || ""
  } | ${bool(control.required)} | ${bool(control.disabled)} | ${bool(
    control.readonly
  )} | ${control.placeholder || ""} |`;
}

function bool(value) {
  return value ? "Yes" : "No";
}

function dedupeControls(list) {
  const seen = new Set();
  const result = [];
  for (const control of list) {
    const key = `${normalizeLabel(control.label || "")}|${
      control.tag || ""
    }|${control.role || ""}|${control.placeholder || ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(control);
    }
  }
  return result;
}

async function writeScreensIndex(links) {
  const header = `# Screens\n\n`;
  const body =
    links.length === 0
      ? "No screens captured yet. Run `npm --prefix Scripts/ipcom5control-web run capture:web`.\n"
      : links
          .map((link) => `- [${link.title}](./${link.id}.md)`)
          .join("\n") + "\n";

  await fs.writeFile(resolveDocs("screens", "index.md"), header + body);
}
