import { chromium } from "playwright";

const url = process.env.IPCOM_URL;
const username = process.env.IPCOM_USERNAME;
const password = process.env.IPCOM_PASSWORD;

if (!url || !username || !password) {
  console.error("Missing IPCOM_URL, IPCOM_USERNAME, or IPCOM_PASSWORD.");
  process.exit(1);
}

const tabs = ["General", "Internal events", "Receivers", "Outputs", "Users"];

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(url, { waitUntil: "domcontentloaded" });

const inputs = page.locator("input");
const count = await inputs.count();
let filledUser = false;
let filledPass = false;
for (let i = 0; i < count; i += 1) {
  const input = inputs.nth(i);
  const type = (await input.getAttribute("type")) || "text";
  if (!filledPass && type.toLowerCase() === "password") {
    await input.fill(password);
    filledPass = true;
    continue;
  }
  if (!filledUser && type.toLowerCase() !== "password") {
    await input.fill(username);
    filledUser = true;
  }
}

const loginButton = page.locator("button", { hasText: "Login" }).first();
if (await loginButton.count()) {
  await loginButton.click();
}

await page.waitForTimeout(2000);

console.log("Base URL after login:", page.url());

for (const tab of tabs) {
  const tabLocator = page.locator("button, a").filter({ hasText: tab }).first();
  if (!(await tabLocator.count())) {
    console.log(`${tab}: not found`);
    continue;
  }
  await tabLocator.click();
  await page.waitForTimeout(1500);
  console.log(`${tab}: ${page.url()}`);
}

await browser.close();
