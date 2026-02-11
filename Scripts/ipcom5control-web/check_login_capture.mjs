import path from "path";
import { fileExists, readJson, resolveArtifacts } from "./lib/utils.mjs";

const loginDir = resolveArtifacts("screens", "login");
const controlsPath = path.join(loginDir, "controls.json");
const screenshotPath = path.join(loginDir, "screenshot.png");

if (!(await fileExists(controlsPath))) {
  throw new Error("Missing login controls.json. Run capture first.");
}
if (!(await fileExists(screenshotPath))) {
  throw new Error("Missing login screenshot.png. Run capture first.");
}

const controlsData = await readJson(controlsPath);
const controls = controlsData.controls || [];
const hasPassword = controls.some(
  (control) =>
    control.type === "password" ||
    /password/i.test(control.label || "") ||
    /password/i.test(control.placeholder || "")
);
const hasUsername = controls.some(
  (control) =>
    /user|login|name|email/i.test(control.label || "") ||
    /user|login|name|email/i.test(control.placeholder || "")
);

if (!hasPassword) {
  throw new Error("Login capture missing a password field.");
}
if (!hasUsername) {
  throw new Error("Login capture missing a username field.");
}

console.log("Login capture check passed.");
