import fs from "fs/promises";
import { fileExists, resolveRepo } from "./lib/utils.mjs";

const introPath = resolveRepo("docs/en/receivers/ipcom5control/index.md");

if (!(await fileExists(introPath))) {
  throw new Error(`Missing intro page: ${introPath}`);
}

const markdown = await fs.readFile(introPath, "utf8");

const requiredSnippets = [
  "# IPCom v5 Receiver Overview",
  "Windows install",
  "Linux install (hardware or VM)",
  "Linux install in RL25 hardware receiver",
  "Number of supervised devices",
  "Protegus 2 application",
  "Trikdis (TCP/UDP/COM/SMS)",
  "TCP Client/Server, RS232, JSON, Webhook",
  "## Operational scope (from presentation summary)",
  "### Access and security",
  "### Monitoring and operations",
  "### Events, routing, and protocol handling",
  "### Integration and data",
  "### Deployment and lifecycle",
  "[IPcom5 Control Web - UI Guide](./ui/index.md)",
];

const missing = requiredSnippets.filter((snippet) => !markdown.includes(snippet));
if (missing.length > 0) {
  console.error("Intro page check failed. Missing required content:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Intro page check passed.");
