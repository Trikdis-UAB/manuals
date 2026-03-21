#!/usr/bin/env node

import http from "node:http";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";

import { chromium } from "@playwright/test";

function parseArgs(argv) {
  const parsed = {
    manifest: "site/pdf-manifest.json",
    site: "site",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if ((arg === "--site" || arg === "--site-dir") && argv[i + 1]) {
      parsed.site = argv[i + 1];
      i += 1;
    } else if (arg === "--manifest" && argv[i + 1]) {
      parsed.manifest = argv[i + 1];
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    }
  }

  return parsed;
}

function usage() {
  return [
    "Usage:",
    "  node Scripts/export_manual_pdfs.mjs --site site --manifest site/pdf-manifest.json",
    "",
    "Options:",
    "  --site, --site-dir   Built site directory (default: site)",
    "  --manifest          PDF manifest path (default: site/pdf-manifest.json)",
  ].join("\n");
}

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js" || ext === ".mjs") return "text/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".xml") return "application/xml; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".pdf") return "application/pdf";
  return "application/octet-stream";
}

async function createStaticServer(siteDir) {
  const root = path.resolve(siteDir);
  const server = http.createServer(async (req, res) => {
    try {
      const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const normalized = requestPath.endsWith("/") ? `${requestPath}index.html` : requestPath;
      const filePath = path.resolve(root, `.${normalized}`);

      if (!filePath.startsWith(root)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      const stat = await fs.stat(filePath);
      if (!stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      const body = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": mimeFor(filePath) });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  return server;
}

function parseConcurrency(rawValue) {
  const value = Number.parseInt(rawValue || "", 10);
  if (Number.isInteger(value) && value > 0) {
    return value;
  }
  return Math.min(2, Math.max(1, os.availableParallelism ? os.availableParallelism() : 2));
}

function validateManifest(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("PDF manifest must contain at least one entry.");
  }

  for (const [index, entry] of data.entries()) {
    if (!entry || typeof entry !== "object") {
      throw new Error(`Manifest entry #${index + 1} is not an object.`);
    }
    for (const key of ["src_path", "url", "output"]) {
      if (typeof entry[key] !== "string" || entry[key].length === 0) {
        throw new Error(`Manifest entry #${index + 1} is missing '${key}'.`);
      }
    }
  }
}

async function forceManualImagesReady(page) {
  await page.evaluate(async () => {
    const raf = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
    const images = Array.from(document.querySelectorAll(".md-content img"));

    for (const image of images) {
      image.loading = "eager";
      image.removeAttribute("loading");
      image.decoding = "sync";
      image.removeAttribute("decoding");
      if (image.currentSrc && image.src !== image.currentSrc) {
        image.src = image.currentSrc;
      }
    }

    window.scrollTo(0, document.body.scrollHeight);
    await raf();
    await raf();
    window.scrollTo(0, 0);
    await raf();

    await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            const done = async () => {
              if (typeof image.decode === "function") {
                try {
                  await image.decode();
                } catch {
                  // Ignore decode errors; broken image URLs will fail validation elsewhere.
                }
              }
              resolve();
            };

            if (image.complete) {
              void done();
              return;
            }

            image.addEventListener(
              "load",
              () => {
                void done();
              },
              { once: true },
            );
            image.addEventListener("error", resolve, { once: true });
          }),
      ),
    );

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
}

async function exportEntry(browser, baseUrl, siteDir, stylePath, entry, index, total) {
  const context = await browser.newContext({
    colorScheme: "light",
    viewport: {
      width: 1440,
      height: 1600,
    },
  });

  const page = await context.newPage();
  try {
    const pageUrl = new URL(entry.url, baseUrl).toString();
    const outputPath = path.join(siteDir, entry.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const response = await page.goto(pageUrl, { waitUntil: "domcontentloaded" });
    if (!response || !response.ok()) {
      throw new Error(`Failed to load ${entry.url}: ${response ? response.status() : "no response"}`);
    }

    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    await page.addStyleTag({ path: stylePath });
    await forceManualImagesReady(page);
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.pdf({
      format: "A4",
      margin: {
        top: "12mm",
        right: "10mm",
        bottom: "12mm",
        left: "10mm",
      },
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
    });

    console.log(`[${index + 1}/${total}] ${entry.url} -> ${entry.output}`);
  } finally {
    await page.close();
    await context.close();
  }
}

async function runWorkers(entries, browser, baseUrl, siteDir, stylePath, concurrency) {
  let currentIndex = 0;

  async function worker() {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;
      if (index >= entries.length) {
        return;
      }
      await exportEntry(browser, baseUrl, siteDir, stylePath, entries[index], index, entries.length);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, entries.length) }, () => worker()));
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return 0;
  }

  const siteDir = path.resolve(args.site);
  const manifestPath = path.resolve(args.manifest);
  const stylePath = path.resolve("Scripts/pdf-export.css");

  if (!fsSync.existsSync(siteDir)) {
    console.error(`Site directory not found: ${siteDir}`);
    return 2;
  }
  if (!fsSync.existsSync(manifestPath)) {
    console.error(`PDF manifest not found: ${manifestPath}`);
    return 2;
  }
  if (!fsSync.existsSync(stylePath)) {
    console.error(`PDF export stylesheet not found: ${stylePath}`);
    return 2;
  }

  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf-8"));
  try {
    validateManifest(manifest);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }

  const server = await createStaticServer(siteDir);
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;
  const concurrency = parseConcurrency(process.env.TRIKDOCS_PDF_CONCURRENCY);

  const browser = await chromium.launch({ headless: true });
  try {
    await runWorkers(manifest, browser, baseUrl, siteDir, stylePath, concurrency);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }

  return 0;
}

run()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    process.exit(1);
  });
