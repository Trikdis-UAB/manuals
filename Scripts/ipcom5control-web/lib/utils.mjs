import fs from "fs/promises";
import path from "path";

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const repoRoot = path.resolve(scriptDir, "..", "..", "..");

export const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const readJson = async (filePath) => {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
};

export const writeJson = async (filePath, data) => {
  const serialized = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, serialized);
};

export const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const slugify = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const normalizeLabel = (value) => {
  return value
    .toLowerCase()
    .replace(/s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
};

export const resolveArtifacts = (...parts) => {
  return path.resolve(repoRoot, "artifacts", "ui", "ipcom5control-web", ...parts);
};

export const resolveDocs = (...parts) => {
  return path.resolve(
    repoRoot,
    "docs",
    "en",
    "receivers",
    "ipcom5control",
    "ui",
    ...parts
  );
};

export const resolveRepo = (...parts) => {
  return path.resolve(repoRoot, ...parts);
};
