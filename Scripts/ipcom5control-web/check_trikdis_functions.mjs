// Fails if any feature gated behind LicenseFeature.TrikdisFunctions is documented.
// Spec (with source provenance): projects/Ipcom5/trikdis-functions-spec.json
//
// Design note: this guard is written to fail LOUDLY when its own assumptions break —
// a moved docs path, an empty term list, or a stale exclusion all abort rather than
// silently scanning nothing and reporting success.

import fs from "fs/promises";
import path from "path";
import { fileExists, readJson, resolveRepo } from "./lib/utils.mjs";

const specPath = resolveRepo("projects/Ipcom5/trikdis-functions-spec.json");

if (!(await fileExists(specPath))) {
  console.error(`Missing spec: ${specPath}`);
  process.exit(1);
}

const spec = await readJson(specPath);
const setupErrors = [];

// Accent-fold + lowercase so an "cluster" term matches Spanish "clúster".
const fold = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const walk = async (dir) => {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
};

// --- Validate the spec itself ---------------------------------------------

const features = spec.gated_features ?? [];
if (features.length === 0) {
  setupErrors.push("Spec lists no gated_features — the guard would pass vacuously.");
}
for (const feature of features) {
  const terms = feature.terms ?? [];
  const assets = feature.asset_patterns ?? [];
  if (terms.length === 0 && assets.length === 0) {
    setupErrors.push(`Feature "${feature.id}" has neither terms nor asset_patterns.`);
  }
}

// --- Validate scan roots exist (a moved path must not pass silently) ------

const roots = spec.scan?.doc_roots ?? [];
if (roots.length === 0) {
  setupErrors.push("Spec lists no scan.doc_roots.");
}

const presentRoots = [];
const missingRoots = [];
for (const root of roots) {
  if (await fileExists(resolveRepo(root))) presentRoots.push(root);
  else missingRoots.push(root);
}
// A root may legitimately not exist yet (e.g. ru/ has no IPcom docs). Only abort
// if EVERY root is gone, which means the docs tree moved under us.
if (roots.length > 0 && presentRoots.length === 0) {
  setupErrors.push(
    `None of the configured doc_roots exist — the docs tree has moved. Configured: ${roots.join(", ")}`
  );
}

// --- Validate exclusions are still real ----------------------------------

const excluded = new Set(spec.scan?.exclude_files ?? []);
for (const rel of excluded) {
  if (!(await fileExists(resolveRepo(rel)))) {
    setupErrors.push(`exclude_files entry no longer exists (stale exclusion): ${rel}`);
  }
}

// An excluded file is only safe if mkdocs really keeps it out of the build.
const mustExclude = spec.scan?.must_stay_excluded_in_mkdocs ?? [];
if (mustExclude.length > 0) {
  const mkdocsPath = resolveRepo("mkdocs.yml");
  if (!(await fileExists(mkdocsPath))) {
    setupErrors.push("mkdocs.yml not found — cannot verify exclude_docs.");
  } else {
    const mkdocs = await fs.readFile(mkdocsPath, "utf8");
    const excludeBlock = mkdocs.match(/exclude_docs:[\s\S]*?(?=\n\S)/)?.[0] ?? "";
    for (const rel of mustExclude) {
      if (!excludeBlock.includes(rel)) {
        setupErrors.push(
          `"${rel}" must be listed under exclude_docs in mkdocs.yml but is not — gated content would ship.`
        );
      }
    }
  }
}

if (setupErrors.length > 0) {
  console.error("Trikdis functions check could not run safely:");
  for (const err of setupErrors) console.error(`- ${err}`);
  process.exit(1);
}

// --- Scan --------------------------------------------------------------

const findings = [];
let scannedDocs = 0;
let scannedAssets = 0;

// Reviewed false positives. Each one must still match something, or it is stale
// and widening the guard's blind spot without anyone noticing — so we track use.
const allowances = [];
for (const feature of features) {
  for (const entry of feature.allow ?? []) {
    allowances.push({ ...entry, feature: feature.id, used: 0 });
  }
}

const isAllowed = (relFile, line, featureId) => {
  const folded = fold(line);
  for (const a of allowances) {
    if (a.feature !== featureId) continue;
    if (a.file !== relFile) continue;
    if (!folded.includes(fold(a.line_contains))) continue;
    a.used += 1;
    return true;
  }
  return false;
};

for (const root of presentRoots) {
  const absRoot = resolveRepo(root);
  for (const file of await walk(absRoot)) {
    const rel = path.relative(resolveRepo("."), file);
    if (excluded.has(rel)) continue;

    if (file.endsWith(".md")) {
      scannedDocs += 1;
      const lines = (await fs.readFile(file, "utf8")).split("\n");
      lines.forEach((line, index) => {
        const folded = fold(line);
        for (const feature of features) {
          for (const term of feature.terms ?? []) {
            if (folded.includes(fold(term))) {
              if (isAllowed(rel, line, feature.id)) continue;
              findings.push({
                kind: "text",
                file: rel,
                line: index + 1,
                feature: feature.id,
                term,
                excerpt: line.trim().slice(0, 120),
              });
            }
          }
        }
      });
    } else {
      scannedAssets += 1;
      const base = fold(path.basename(file));
      for (const feature of features) {
        for (const pattern of feature.asset_patterns ?? []) {
          if (base.includes(fold(pattern))) {
            findings.push({
              kind: "asset",
              file: rel,
              feature: feature.id,
              term: pattern,
            });
          }
        }
      }
    }
  }
}

// A never-used allowance is stale: the content it excused is gone, so the
// exception is now silently permitting something nobody reviewed.
const staleAllowances = allowances.filter((a) => a.used === 0);
if (staleAllowances.length > 0) {
  console.error("Trikdis functions check FAILED — stale allow entries in the spec:");
  for (const a of staleAllowances) {
    console.error(
      `- [${a.feature}] ${a.file} :: "${a.line_contains}" matched nothing. Remove it from the spec.`
    );
  }
  process.exit(1);
}

// Scanning nothing is a failure, not a pass.
if (scannedDocs === 0) {
  console.error(
    `Trikdis functions check scanned 0 markdown files under ${presentRoots.join(", ")} — refusing to report success.`
  );
  process.exit(1);
}

// --- Report ------------------------------------------------------------

if (missingRoots.length > 0) {
  console.log(`Note: doc_roots not present (skipped): ${missingRoots.join(", ")}`);
}
for (const feature of features) {
  if (feature.narrowing) {
    console.log(`Note: ${feature.id} coverage is narrowed — ${feature.narrowing}`);
  }
}

if (findings.length > 0) {
  console.error(
    `\nTrikdis functions check FAILED — ${findings.length} reference(s) to licence-gated features:\n`
  );
  for (const f of findings) {
    if (f.kind === "text") {
      console.error(`- ${f.file}:${f.line} [${f.feature}] matched "${f.term}"`);
      console.error(`    ${f.excerpt}`);
    } else {
      console.error(`- ${f.file} [${f.feature}] filename matched "${f.term}"`);
    }
  }
  console.error(
    `\nThese features are gated behind ${spec.source?.flag} and must not appear in customer docs.`
  );
  console.error(`Spec: projects/Ipcom5/trikdis-functions-spec.json`);
  process.exit(1);
}

console.log(
  `Trikdis functions check passed — ${scannedDocs} markdown file(s) and ${scannedAssets} asset(s) scanned across ${presentRoots.length} language tree(s), ${features.length} gated feature(s) enforced.`
);
