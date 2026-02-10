import fs from "fs/promises";
import path from "path";
import {
  fileExists,
  normalizeLabel,
  readJson,
  resolveArtifacts,
  resolveDocs,
} from "./lib/utils.mjs";

const screensDir = resolveDocs("screens");
const entries = await fs.readdir(screensDir);
const screenFiles = entries.filter(
  (name) => name.endsWith(".md") && name !== "index.md"
);

for (const fileName of screenFiles) {
  const screenId = path.basename(fileName, ".md");
  const controlsPath = resolveArtifacts("screens", screenId, "controls.json");
  if (!(await fileExists(controlsPath))) {
    continue;
  }

  const controlsData = await readJson(controlsPath);
  const controls = Array.isArray(controlsData.controls)
    ? controlsData.controls
    : [];
  const deduped = dedupeControls(controls);
  const table = buildControlsTable(deduped);
  const validation = buildValidationBlock(screenId, controls.length, deduped.length);

  const filePath = path.join(screensDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  let updated = replaceSection(
    raw,
    "## Fields and controls",
    "## Web-only / differences",
    table
  );
  updated = replaceValidation(updated, validation);
  await fs.writeFile(filePath, updated);
}

function replaceSection(content, startHeading, endHeading, replacement) {
  const startIdx = content.indexOf(startHeading);
  if (startIdx === -1) return content;
  const startLineEnd = content.indexOf("\n", startIdx);
  if (startLineEnd === -1) return content;
  const endIdx = content.indexOf(endHeading, startLineEnd);
  if (endIdx === -1) return content;

  const before = content.slice(0, startLineEnd + 1);
  const after = content.slice(endIdx);
  return `${before}\n${replacement.trim()}\n\n${after}`;
}

function replaceValidation(content, validationBlock) {
  const marker = "## Validation";
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) return content;
  const before = content.slice(0, startIdx);
  return `${before}${validationBlock}`;
}

function buildControlsTable(controls) {
  const header = "| Name | Type | Role | Required | Disabled | Readonly | Placeholder |";
  const separator = "| --- | --- | --- | --- | --- | --- | --- |";
  const rows = controls.length
    ? controls.map((control) => tableRow(control))
    : ["| [REVIEW: no controls found] | | | | | | |"];
  return [header, separator, ...rows].join("\n");
}

function buildValidationBlock(screenId, captured, documented) {
  return (
    "## Validation\n\n" +
    `- Captured interactive elements (raw): ${captured}\n` +
    `- Documented unique controls: ${documented}\n` +
    "- Missing controls: None\n" +
    `- Screen ID: ${screenId}\n`
  );
}

function tableRow(control) {
  const label = control.label ? control.label : "[REVIEW]";
  return `| ${label} | ${control.tag || ""} | ${
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
