import fs from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { resolveRepo } from "./lib/utils.mjs";

const execFileAsync = promisify(execFile);

const args = new Map(
  process.argv.slice(2).map((arg) => {
    if (!arg.includes("=")) return [arg, true];
    const [key, value] = arg.split("=");
    return [key, value];
  })
);

const specArg = args.get("--spec") || "screenshot_specs/status-sections.json";
const specPath = path.isAbsolute(specArg)
  ? specArg
  : path.join(process.cwd(), specArg);

const spec = JSON.parse(await fs.readFile(specPath, "utf8"));

const sourcePath = resolveRepo(spec.source);
const outputDir = resolveRepo(spec.outputDir);

await fs.mkdir(outputDir, { recursive: true });

for (const section of spec.sections || []) {
  const outputPath = path.join(outputDir, `${section.id}.png`);
  const crop = `${section.w}x${section.h}+${section.x}+${section.y}`;
  await execFileAsync("magick", [
    sourcePath,
    "-crop",
    crop,
    "+repage",
    outputPath,
  ]);
  console.log(`Generated ${path.relative(resolveRepo(), outputPath)}`);
}
