export async function captureAccessibilityTree(pageRef) {
  if (pageRef?.accessibility?.snapshot) {
    return await pageRef.accessibility.snapshot({ interestingOnly: false });
  }

  const context = pageRef?.context?.();
  if (!context?.newCDPSession) {
    return null;
  }

  const client = await context.newCDPSession(pageRef);
  try {
    await client.send("Accessibility.enable");
    return await client.send("Accessibility.getFullAXTree");
  } finally {
    await client.send("Accessibility.disable").catch(() => {});
  }
}
