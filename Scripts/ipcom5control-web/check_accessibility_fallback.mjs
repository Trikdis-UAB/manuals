import { captureAccessibilityTree } from "./lib/accessibility.mjs";

const snapshotResult = { nodes: [{ name: "mock-node" }] };
const snapshotOnlyPage = {
  accessibility: {
    snapshot: async () => snapshotResult,
  },
};

const cdpCalls = [];
const cdpPage = {
  context: () => ({
    newCDPSession: async () => ({
      send: async (command) => {
        cdpCalls.push(command);
        if (command === "Accessibility.getFullAXTree") {
          return { nodes: [{ name: "mock-cdp" }] };
        }
        return {};
      },
    }),
  }),
};

const snapshotTree = await captureAccessibilityTree(snapshotOnlyPage);
if (!snapshotTree || snapshotTree.nodes?.[0]?.name !== "mock-node") {
  throw new Error("Snapshot path did not return expected data.");
}

const cdpTree = await captureAccessibilityTree(cdpPage);
if (!cdpTree || cdpTree.nodes?.[0]?.name !== "mock-cdp") {
  throw new Error("CDP fallback did not return expected data.");
}

if (!cdpCalls.includes("Accessibility.enable")) {
  throw new Error("CDP fallback did not enable accessibility.");
}

console.log("Accessibility fallback check passed.");
