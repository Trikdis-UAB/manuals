#!/usr/bin/env python3
"""
Minimal Playwright smoke test:
Verifies that on a mobile viewport the drawer opens directly to the page TOC (with the built-in back button).

Usage:
  1) Build the site: `.venv/bin/mkdocs build --strict`
  2) Run the test: `.venv/bin/python Scripts/check_mobile_toc.py`

Requires:
  pip install playwright==1.48.0
  python -m playwright install chromium
"""

import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
URLS = [
    "http://127.0.0.1:8001/en/alarm-communicators/cellular/gt/",
    "http://127.0.0.1:8001/en/alarm-communicators/dual-path/get/",
]


def start_server():
  # Serve the built site on 8001
  return subprocess.Popen(
      [sys.executable, "-m", "http.server", "8001", "--directory", str(SITE)],
      stdout=subprocess.DEVNULL,
      stderr=subprocess.DEVNULL,
  )


def is_visible(page, selector: str) -> bool:
  handle = page.query_selector(selector)
  if not handle:
    return False
  return page.evaluate(
      """
      el => {
        const style = getComputedStyle(el);
        return style.display !== 'none' &&
               style.visibility !== 'hidden' &&
               el.offsetParent !== null;
      }
      """,
      handle,
  )


def assert_mobile_toc(page, url: str):
  page.goto(url, wait_until="networkidle")

  # Open drawer by clicking the header hamburger button
  # Use the header hamburger button (avoids the invisible overlay label)
  page.click("header label[for='__drawer']", timeout=2000)
  page.wait_for_function("document.querySelector('#__drawer')?.checked === true", timeout=2000)

  # Wait for JS to auto-open the TOC inside the drawer
  page.wait_for_function("document.querySelector('#__toc')?.checked === true", timeout=3000)

  # Validate that the secondary nav (TOC) is visible with items and has the back button label
  toc_visible = is_visible(page, "nav.md-nav--secondary")
  toc_has_items = page.query_selector("nav.md-nav--secondary .md-nav__item") is not None
  toc_has_label = is_visible(page, "nav.md-nav--secondary label[for='__toc']")

  if not (toc_visible and toc_has_items and toc_has_label):
    raise RuntimeError(
        f"[{url}] TOC visibility: {toc_visible}, items: {toc_has_items}, label: {toc_has_label}"
    )

  print(f"✅ Mobile drawer defaults to TOC on {url}")


def main():
  server = start_server()
  time.sleep(1.5)

  try:
    with sync_playwright() as p:
      browser = p.chromium.launch(headless=True)
      page = browser.new_page(viewport={"width": 375, "height": 812})
      page.on("console", lambda msg: print(f"[console] {msg.type}: {msg.text}"))
      for url in URLS:
        assert_mobile_toc(page, url)
      browser.close()
  finally:
    server.terminate()
    server.wait(timeout=5)


if __name__ == "__main__":
  main()
