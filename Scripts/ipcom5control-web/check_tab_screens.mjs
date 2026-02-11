import path from "path";
import { fileExists, readJson, resolveArtifacts, resolveDocs } from "./lib/utils.mjs";

const required = [
  "status",
  "logs",
  "general",
  "internal-events",
  "receivers",
  "outputs",
  "users",
  "incoming-events",
  "objects",
];

const screenMapPath = resolveArtifacts("screen-map.json");
if (!(await fileExists(screenMapPath))) {
  throw new Error("Missing screen-map.json. Run capture first.");
}

const screenMap = await readJson(screenMapPath);
const screenIds = new Set((screenMap.screens || []).map((screen) => screen.id));

for (const id of required) {
  if (!screenIds.has(id)) {
    throw new Error(`Missing screen in screen-map.json: ${id}`);
  }
  const docPath = resolveDocs("screens", `${id}.md`);
  if (!(await fileExists(docPath))) {
    throw new Error(`Missing generated doc page: ${docPath}`);
  }
  const screenshotPath = resolveDocs("assets", "screens", `${id}.png`);
  if (!(await fileExists(screenshotPath))) {
    throw new Error(`Missing screenshot: ${screenshotPath}`);
  }
}

console.log("Tab screens check passed.");
