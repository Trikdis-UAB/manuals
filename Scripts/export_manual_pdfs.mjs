#!/usr/bin/env node

import http from "node:http";
import { spawn } from "node:child_process";
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

function deriveCategory(entry) {
  const normalized = entry.url.replace(/^\/+|\/+$/g, "");
  const parts = normalized.split("/");
  const locale = parts[0] || "en";
  const category = parts[1] || "";
  const labelsByLocale = {
    en: {
      "alarm-communicators": "Communicators",
      "control-panels": "Control Panels",
      "gate-controllers": "Gate Controllers",
      keypads: "Keypads",
      receivers: "Receivers",
    },
    lt: {
      "alarm-communicators": "Komunikatoriai",
      "control-panels": "Apsaugos centralės",
      "gate-controllers": "Valdikliai",
      keypads: "Klaviatūros",
      receivers: "Imtuvai",
    },
    es: {
      "alarm-communicators": "Comunicadores",
      "control-panels": "Paneles de control",
      "gate-controllers": "Controladores",
      keypads: "Teclados",
      receivers: "Receptores",
    },
    ru: {
      "alarm-communicators": "Коммуникаторы",
      "control-panels": "Панели управления",
      "gate-controllers": "Контроллеры",
      keypads: "Клавиатуры",
      receivers: "Приемники",
    },
  };
  const labels = labelsByLocale[locale] || labelsByLocale.en;
  return labels[category] || "";
}

function resolvePythonBin() {
  return process.env.TRIKDOCS_PYTHON_BIN || process.env.PYTHON_BIN || "python3";
}

async function runCommand(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}\n${stderr}`));
      }
    });
  });
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

async function markPdfSchematics(page) {
  await page.evaluate(() => {
    const normalizeText = (value) =>
      (value || "")
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .toLowerCase();
    const schematicHeadingPattern =
      /schematic|schematics|wiring|diagram|schema|schemos|jungimo|pajungimo|esquema|esquemas|cableado|conexion|схем|подключен|структур/u;
    const contentRoot = document.querySelector(".md-content__inner");
    if (!contentRoot) {
      return;
    }

    const markImage = (image) => {
      if (!(image instanceof HTMLImageElement)) {
        return;
      }
      if (image.closest(".steps-grid, .step-card")) {
        return;
      }
      image.classList.add("trik-pdf-schematic");
      const block = image.closest("p, div, figure, li, td, th");
      if (block) {
        block.classList.add("trik-pdf-schematic-block");
      }
    };

    for (const heading of contentRoot.querySelectorAll("h2, h3, h4")) {
      if (!schematicHeadingPattern.test(normalizeText(heading.textContent))) {
        continue;
      }

      let sibling = heading.nextElementSibling;
      while (sibling && !/^H[1-6]$/u.test(sibling.tagName)) {
        sibling.querySelectorAll("img").forEach((image) => markImage(image));
        sibling = sibling.nextElementSibling;
      }
    }

    contentRoot.querySelectorAll("img").forEach((image) => {
      const src = image.currentSrc || image.getAttribute("src") || "";
      if (image.classList.contains("wiring-diagram") || /\.svg(?:$|\?)/iu.test(src)) {
        markImage(image);
      }
    });
  });
}

async function exportEntry(browser, baseUrl, siteDir, stylePath, stampScriptPath, pythonBin, entry, index, total) {
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
    const baseOutputPath = `${outputPath}.base.pdf`;
    const category = deriveCategory(entry);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const response = await page.goto(pageUrl, { waitUntil: "domcontentloaded" });
    if (!response || !response.ok()) {
      throw new Error(`Failed to load ${entry.url}: ${response ? response.status() : "no response"}`);
    }

    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    await page.addStyleTag({ path: stylePath });
    await page.evaluate((categoryValue) => {
      const h1 = document.querySelector(".md-content__inner h1");
      if (!h1 || !categoryValue || document.querySelector(".trik-pdf-category")) {
        return;
      }

      const kicker = document.createElement("p");
      kicker.className = "trik-pdf-category";
      kicker.textContent = categoryValue;
      h1.parentElement?.insertBefore(kicker, h1);
    }, category);
    await forceManualImagesReady(page);
    await markPdfSchematics(page);
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    const titleText =
      (await page.locator(".md-content__inner h1").first().evaluate((heading) => {
        const clone = heading.cloneNode(true);
        clone.querySelectorAll(".headerlink").forEach((link) => link.remove());
        return clone.textContent?.replace(/\s+/g, " ").replace(/[¶#]+$/u, "").trim() || "";
      })) || "TRIKDIS Manual";
    await page.pdf({
      format: "A4",
      margin: {
        top: "18mm",
        right: "10mm",
        bottom: "24mm",
        left: "10mm",
      },
      path: baseOutputPath,
      outline: true,
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });

    await runCommand(pythonBin, [
      stampScriptPath,
      "--input",
      baseOutputPath,
      "--output",
      outputPath,
      "--title",
      titleText,
      "--logo",
      path.resolve("docs/images/logo.png"),
      "--mark",
      path.resolve("docs/images/favicon.png"),
      "--font-regular",
      path.resolve("Scripts/fonts/NotoSans-Regular.ttf"),
      "--font-bold",
      path.resolve("Scripts/fonts/NotoSans-Bold.ttf"),
    ]);
    await fs.unlink(baseOutputPath).catch(() => {});

    console.log(`[${index + 1}/${total}] ${entry.url} -> ${entry.output}`);
  } finally {
    await page.close();
    await context.close();
  }
}

async function runWorkers(entries, browser, baseUrl, siteDir, stylePath, stampScriptPath, pythonBin, concurrency) {
  let currentIndex = 0;

  async function worker() {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;
      if (index >= entries.length) {
        return;
      }
      await exportEntry(
        browser,
        baseUrl,
        siteDir,
        stylePath,
        stampScriptPath,
        pythonBin,
        entries[index],
        index,
        entries.length,
      );
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
  const stampScriptPath = path.resolve("Scripts/stamp_manual_pdf.py");
  const pythonBin = resolvePythonBin();

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
  if (!fsSync.existsSync(stampScriptPath)) {
    console.error(`PDF stamp helper not found: ${stampScriptPath}`);
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
    await runWorkers(manifest, browser, baseUrl, siteDir, stylePath, stampScriptPath, pythonBin, concurrency);
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
