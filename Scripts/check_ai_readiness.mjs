import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const result = { site: "site" };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--site" && argv[index + 1]) {
      result.site = argv[index + 1];
      index += 1;
    }
  }

  return result;
}

async function readText(filePath) {
  const value = await fs.readFile(filePath, "utf8");
  return value.trim();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const siteDir = path.resolve(args.site);
  const llmsPath = path.join(siteDir, "llms.txt");
  const robotsPath = path.join(siteDir, "robots.txt");
  const llms = await readText(llmsPath);
  const robots = await readText(robotsPath);

  assert(!llms.startsWith("<"), "site/llms.txt rendered as HTML instead of plain text");
  assert(llms.includes("# TRIKDIS Installation Manuals"), "site/llms.txt missing manuals heading");
  assert(robots.includes("User-agent: *"), "site/robots.txt missing global user-agent rule");
  assert(robots.includes("Allow: /"), "site/robots.txt missing allow rule");
  assert(
    robots.includes("Sitemap: https://docs.trikdis.com/sitemap.xml"),
    "site/robots.txt missing sitemap pointer",
  );

  console.log(`AI readiness assets verified in ${siteDir}.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
