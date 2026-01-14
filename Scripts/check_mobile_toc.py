#!/usr/bin/env python3
"""
Playwright smoke test:
- Mobile: drawer opens directly to the page TOC (with the built-in back button).
- Desktop: right sidebar styles, deep-nav guides, and language-specific nav isolation.

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
import platform
from pathlib import Path
from typing import Optional

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
URLS = [
    "http://127.0.0.1:8001/en/alarm-communicators/cellular/gt/",
    "http://127.0.0.1:8001/en/alarm-communicators/cellular/get/",
    "http://127.0.0.1:8001/en/alarm-communicators/e16/",
    "http://127.0.0.1:8001/en/alarm-communicators/fire-panels/g17f/",
]
HOME_URLS = [
    "http://127.0.0.1:8001/en/",
]
DESKTOP_URLS = [
    ("http://127.0.0.1:8001/en/alarm-communicators/cellular/gt/", "en"),
    ("http://127.0.0.1:8001/lt/alarm-communicators/cellular/gt/", "lt"),
    ("http://127.0.0.1:8001/en/alarm-communicators/e16/", "en"),
    ("http://127.0.0.1:8001/en/alarm-communicators/fire-panels/g17f/", "en"),
]
ROOT_URL = "http://127.0.0.1:8001/"

EXPECTED_COLORS = {
    "toc_bg": "rgb(246, 246, 246)",
    "toc_border": "rgb(210, 209, 209)",
    "toc_active": "rgb(228, 228, 228)",
    "nav_depth_border": "rgb(210, 209, 209)",
}


def find_headless_shell(cache_root: Path) -> Optional[Path]:
  if not cache_root.exists():
    return None
  arch = platform.machine().lower()
  if sys.platform == "darwin":
    platform_dirs = (
        ["chrome-headless-shell-mac-arm64", "chrome-headless-shell-mac-x64"]
        if "arm" in arch
        else ["chrome-headless-shell-mac-x64", "chrome-headless-shell-mac-arm64"]
    )
    exe_names = ["chrome-headless-shell"]
  elif sys.platform.startswith("linux"):
    platform_dirs = ["chrome-headless-shell-linux64"]
    exe_names = ["chrome-headless-shell"]
  elif sys.platform.startswith("win"):
    platform_dirs = ["chrome-headless-shell-win64"]
    exe_names = ["chrome-headless-shell.exe"]
  else:
    platform_dirs = []
    exe_names = ["chrome-headless-shell", "chrome-headless-shell.exe"]

  for candidate in sorted(cache_root.glob("chromium_headless_shell-*"), reverse=True):
    for platform_dir in platform_dirs:
      for exe_name in exe_names:
        exec_path = candidate / platform_dir / exe_name
        if exec_path.exists():
          return exec_path
    for exe_name in exe_names:
      for exec_path in candidate.rglob(exe_name):
        if exec_path.is_file():
          return exec_path
  return None


def launch_chromium(playwright):
  # Prefer the headless shell to avoid AppKit registration crashes on macOS.
  cache_root = Path.home() / "Library/Caches/ms-playwright"
  headless_shell = find_headless_shell(cache_root)
  base_args = ["--headless=new", "--disable-crashpad", "--disable-features=Crashpad"]
  attempts = []
  if headless_shell:
    attempts.append(
      {
        "headless": True,
        "args": base_args,
        "ignore_default_args": ["--headless=old"],
        "executable_path": str(headless_shell),
      }
    )
  attempts.extend(
    [
      {
        "headless": True,
        "args": base_args,
        "ignore_default_args": ["--headless=old"],
      },
      {
        "headless": True,
        "args": base_args,
        "ignore_default_args": ["--headless=old"],
        "chromium_sandbox": False,
      },
      {
        "headless": True,
        "args": base_args,
        "ignore_default_args": ["--headless=old"],
        "channel": "chrome",
      },
    ]
  )
  last_exc = None
  for idx, options in enumerate(attempts, start=1):
    try:
      return playwright.chromium.launch(**options)
    except Exception as exc:
      print(f"⚠️ Chromium launch attempt {idx} failed: {exc}")
      last_exc = exc
  raise last_exc


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


def get_style(page, selector: str, prop: str):
  handle = page.query_selector(selector)
  if not handle:
    return None
  return handle.evaluate(
      "(el, prop) => getComputedStyle(el).getPropertyValue(prop)",
      prop,
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

  sidebar_shadow = get_style(page, ".md-sidebar--primary", "box-shadow")
  if sidebar_shadow not in ("none", ""):
    raise RuntimeError(f"[{url}] Mobile sidebar box-shadow {sidebar_shadow} should be none")

  sidebar_shadow_any = page.evaluate(
      """
      () => {
        const items = Array.from(document.querySelectorAll('.md-sidebar--primary *'));
        return items
          .map((el) => getComputedStyle(el).boxShadow)
          .filter((shadow) => shadow && shadow !== 'none');
      }
      """
  )
  if sidebar_shadow_any:
    raise RuntimeError(f"[{url}] Sidebar contains box-shadow: {sidebar_shadow_any}")

  header_shadow = get_style(page, ".md-header", "box-shadow")
  if header_shadow not in ("none", ""):
    raise RuntimeError(f"[{url}] Mobile header box-shadow {header_shadow} should be none")

  header_shadow_after = page.evaluate(
      """
      () => {
        const header = document.querySelector('.md-header');
        if (!header) return null;
        return getComputedStyle(header, '::after').boxShadow;
      }
      """
  )
  if header_shadow_after not in (None, "", "none"):
    raise RuntimeError(
        f"[{url}] Mobile header ::after box-shadow {header_shadow_after} should be none"
    )

  print(f"✅ Mobile drawer defaults to TOC on {url}")


def assert_desktop_styles(page, url: str, lang: str):
  page.goto(url, wait_until="networkidle")
  page.evaluate(
      """
      () => {
        const toggles = document.querySelectorAll(
          ".md-nav--primary .md-nav__list .md-nav__list .md-nav__list .md-nav__toggle"
        );
        toggles.forEach((toggle) => {
          toggle.checked = true;
        });
      }
      """
  )
  page.wait_for_timeout(400)

  toc_bg = get_style(page, ".md-sidebar--primary .md-sidebar__inner", "background-color")
  toc_active = page.evaluate(
      """
      () => {
        const nav = document.querySelector('.md-sidebar--primary');
        if (!nav) return null;
        const link = nav.querySelector(
          'a.md-nav__link--active, a.md-nav__link[aria-current="page"]'
        );
        if (!link) return null;
        return getComputedStyle(link).backgroundColor;
      }
      """
  )

  if toc_bg != EXPECTED_COLORS["toc_bg"]:
    raise RuntimeError(f"[{url}] Left sidebar background {toc_bg} != {EXPECTED_COLORS['toc_bg']}")
  if toc_active != EXPECTED_COLORS["toc_active"]:
    raise RuntimeError(f"[{url}] Left sidebar active {toc_active} != {EXPECTED_COLORS['toc_active']}")

  collapsible = page.evaluate(
      """
      () => {
        const nav = document.querySelector('.md-nav--primary');
        if (!nav) return null;
        const labels = ["Keypads", "Klaviatūros", "Teclados", "Клавиатуры"];
        let keypads = null;
        let other = null;
        for (const item of nav.querySelectorAll(':scope > ul.md-nav__list > li.md-nav__item')) {
          const label = item.querySelector(':scope > label.md-nav__link');
          const text = label?.querySelector('.md-ellipsis')?.textContent?.trim();
          const icon = label?.querySelector('.md-nav__icon');
          const toggle = item.querySelector(':scope > input.md-nav__toggle');
          const subnav = item.querySelector(':scope > nav.md-nav');
          if (!label || !text || !icon || !toggle || !subnav) continue;
          const info = { id: toggle.id, text };
          if (labels.includes(text)) {
            keypads = info;
          } else if (!other) {
            other = info;
          }
        }
        if (!keypads) return null;
        return { keypads, other };
      }
      """
  )
  if not collapsible:
    raise RuntimeError(f"[{url}] Keypads toggle not found for collapse check.")

  def click_icon(selector: str):
    handle = page.query_selector(selector)
    if not handle:
      raise RuntimeError(f"[{url}] Chevron icon not found for selector: {selector}")
    handle.scroll_into_view_if_needed()
    box = handle.bounding_box()
    if not box:
      raise RuntimeError(f"[{url}] Chevron icon has no bounding box: {selector}")
    page.mouse.click(
        box["x"] + box["width"] / 2,
        box["y"] + box["height"] / 2,
    )

  keypads_id = collapsible["keypads"]["id"]
  keypads_icon = f".md-nav--primary input#{keypads_id} + label .md-nav__icon"
  before_keypads = page.evaluate(
      f"""
      () => {{
        const toggle = document.querySelector('input#{keypads_id}');
        const subnav = toggle?.parentElement?.querySelector(':scope > nav.md-nav');
        return {{
          checked: toggle?.checked,
          display: subnav ? getComputedStyle(subnav).display : null,
        }};
      }}
      """
  )
  click_icon(keypads_icon)
  page.wait_for_timeout(150)
  expanded_after = page.evaluate(
      f"""
      () => {{
        const toggle = document.querySelector('input#{keypads_id}');
        const subnav = toggle?.parentElement?.querySelector(':scope > nav.md-nav');
        return {{
          checked: toggle?.checked,
          display: subnav ? getComputedStyle(subnav).display : null,
        }};
      }}
      """
  )
  if expanded_after["checked"] == before_keypads["checked"]:
    raise RuntimeError(f"[{url}] Keypads did not toggle after chevron click.")
  if before_keypads["display"] == expanded_after["display"]:
    raise RuntimeError(f"[{url}] Keypads subnav display did not change on toggle.")

  click_icon(keypads_icon)
  page.wait_for_timeout(150)
  collapsed_after = page.evaluate(
      f"""
      () => {{
        const toggle = document.querySelector('input#{keypads_id}');
        const subnav = toggle?.parentElement?.querySelector(':scope > nav.md-nav');
        return {{
          checked: toggle?.checked,
          display: subnav ? getComputedStyle(subnav).display : null,
        }};
      }}
      """
  )
  if collapsed_after["checked"] != before_keypads["checked"]:
    raise RuntimeError(f"[{url}] Keypads did not toggle back after second click.")
  if expanded_after["display"] == collapsed_after["display"]:
    raise RuntimeError(f"[{url}] Keypads subnav display did not change on toggle back.")

  if not collapsible.get("other"):
    raise RuntimeError(f"[{url}] No other top-level chevron found for click test.")
  other_id = collapsible["other"]["id"]
  other_icon = f".md-nav--primary input#{other_id} + label .md-nav__icon"
  before_other = page.evaluate(
      f"""
      () => {{
        const toggle = document.querySelector('input#{other_id}');
        const subnav = toggle?.parentElement?.querySelector(':scope > nav.md-nav');
        return {{
          checked: toggle?.checked,
          display: subnav ? getComputedStyle(subnav).display : null,
        }};
      }}
      """
  )
  click_icon(other_icon)
  page.wait_for_timeout(150)
  after_other = page.evaluate(
      f"""
      () => {{
        const toggle = document.querySelector('input#{other_id}');
        const subnav = toggle?.parentElement?.querySelector(':scope > nav.md-nav');
        return {{
          checked: toggle?.checked,
          display: subnav ? getComputedStyle(subnav).display : null,
        }};
      }}
      """
  )
  if before_other["checked"] == after_other["checked"]:
    raise RuntimeError(f"[{url}] Chevron click did not toggle {collapsible['other']['text']}.")
  if before_other["display"] == after_other["display"]:
    raise RuntimeError(
        f"[{url}] Chevron click did not change display for {collapsible['other']['text']}."
    )

  toc_info = page.evaluate(
      """
      () => {
        const nav = document.querySelector('.md-sidebar--secondary');
        if (!nav) return null;
        const links = Array.from(nav.querySelectorAll('.md-nav__link')).filter((link) => link.hash);
        const active = nav.querySelector(
          '.md-nav__link--active, .md-nav__item--active > .md-nav__link, .md-nav__link[aria-current="true"]'
        );
        return {
          count: links.length,
          active: active ? active.getAttribute('href') : null,
        };
      }
      """
  )
  if toc_info and toc_info["count"] > 1:
    initial_active = toc_info["active"]
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(200)
    updated = page.evaluate(
        """
        () => {
          const nav = document.querySelector('.md-sidebar--secondary');
          if (!nav) return null;
          const active = nav.querySelector(
            '.md-nav__link--active, .md-nav__item--active > .md-nav__link, .md-nav__link[aria-current="true"]'
          );
          return active ? active.getAttribute('href') : null;
        }
        """
    )
    if updated == initial_active:
      raise RuntimeError(f"[{url}] TOC active link did not update after scroll.")

  depth_border = get_style(
      page,
      ".md-nav--primary .md-nav__list .md-nav__list .md-nav__list",
      "border-left-color",
  )
  depth_width = get_style(
      page,
      ".md-nav--primary .md-nav__list .md-nav__list .md-nav__list",
      "border-left-width",
  )
  depth4_border = get_style(
      page,
      ".md-nav--primary .md-nav__list .md-nav__list .md-nav__list .md-nav__list",
      "border-left-color",
  )
  depth4_width = get_style(
      page,
      ".md-nav--primary .md-nav__list .md-nav__list .md-nav__list .md-nav__list",
      "border-left-width",
  )
  depth2_border = get_style(
      page,
      ".md-nav--primary .md-nav__list .md-nav__list",
      "border-left-width",
  )
  if depth_border != EXPECTED_COLORS["nav_depth_border"] or depth_width != "1px":
    raise RuntimeError(
        f"[{url}] Deep nav border {depth_border}/{depth_width} != "
        f"{EXPECTED_COLORS['nav_depth_border']}/1px"
    )
  if depth4_border is None or depth4_width is None:
    raise RuntimeError(f"[{url}] Level-4 nav not expanded for border check.")
  if depth4_border != EXPECTED_COLORS["nav_depth_border"] or depth4_width != "1px":
    raise RuntimeError(
        f"[{url}] Level-4 nav border {depth4_border}/{depth4_width} != "
        f"{EXPECTED_COLORS['nav_depth_border']}/1px"
    )
  if depth2_border not in (None, "", "0px"):
    raise RuntimeError(f"[{url}] Level-2 nav border should be none, got {depth2_border}")

  nav_text = page.evaluate(
      "() => document.querySelector('.md-nav--primary')?.innerText || ''"
  )
  if lang == "en":
    if "Communicators" not in nav_text or "Komunikatoriai" in nav_text:
      raise RuntimeError(f"[{url}] Expected English nav only.")
  if lang == "lt":
    if "Komunikatoriai" not in nav_text or "Communicators" in nav_text:
      raise RuntimeError(f"[{url}] Expected Lithuanian nav only.")

  print(f"✅ Desktop styles and language nav ok on {url}")


def assert_homepage_styles(page, url: str):
  page.goto(url, wait_until="networkidle")

  nav_visible = is_visible(page, ".md-sidebar--primary")
  if not nav_visible:
    raise RuntimeError(f"[{url}] Left nav should remain visible on the homepage.")

  nav_title_visible = is_visible(page, ".md-nav--primary > .md-nav__title")
  if nav_title_visible:
    raise RuntimeError(f"[{url}] Nav title should be hidden.")

  nav_padding = get_style(page, ".md-sidebar--primary", "padding-top")
  if nav_padding != "0px":
    raise RuntimeError(f"[{url}] Left nav padding-top {nav_padding} != 0px")

  nav_bg = get_style(page, ".md-sidebar--primary", "background-color")
  if nav_bg != EXPECTED_COLORS["toc_bg"]:
    raise RuntimeError(f"[{url}] Left nav background {nav_bg} != {EXPECTED_COLORS['toc_bg']}")

  nav_container_bg = get_style(page, ".md-sidebar--primary .md-nav", "background-color")
  if nav_container_bg != EXPECTED_COLORS["toc_bg"]:
    raise RuntimeError(
        f"[{url}] Left nav container background {nav_container_bg} != {EXPECTED_COLORS['toc_bg']}"
    )

  nav_list_shadow = get_style(page, ".md-nav--primary > .md-nav__list", "box-shadow")
  if nav_list_shadow not in ("none", ""):
    raise RuntimeError(f"[{url}] Left nav list box-shadow {nav_list_shadow} should be none")

  sidebar_mask = page.evaluate(
      """
      () => {
        const sidebar = document.querySelector('.md-sidebar--primary');
        if (!sidebar) return null;
        const style = getComputedStyle(sidebar, '::before');
        return {
          content: style.content,
          height: style.height,
          background: style.backgroundColor,
        };
      }
      """
  )
  if not sidebar_mask:
    raise RuntimeError(f"[{url}] Sidebar ::before mask not found.")
  if sidebar_mask["content"] == "none":
    raise RuntimeError(f"[{url}] Sidebar ::before mask content should be set.")
  if sidebar_mask["height"] not in ("6px", "5px"):
    raise RuntimeError(f"[{url}] Sidebar ::before height {sidebar_mask['height']} != 6px")
  if sidebar_mask["background"] != EXPECTED_COLORS["toc_bg"]:
    raise RuntimeError(
        f"[{url}] Sidebar ::before background {sidebar_mask['background']} != "
        f"{EXPECTED_COLORS['toc_bg']}"
    )

  sidebar_shadows = page.evaluate(
      """
      () => {
        const lists = Array.from(
          document.querySelectorAll('.md-sidebar--primary .md-nav__list')
        );
        return lists
          .map((list) => getComputedStyle(list).boxShadow)
          .filter((shadow) => shadow && shadow !== 'none');
      }
      """
  )
  if sidebar_shadows:
    raise RuntimeError(f"[{url}] Sidebar nav list shadows present: {sidebar_shadows}")

  footer_overlap = page.evaluate(
      """
      () => {
        const sidebar = document.querySelector('.md-sidebar--primary');
        const footer = document.querySelector('.md-footer');
        if (!sidebar || !footer) return null;
        const s = sidebar.getBoundingClientRect();
        const f = footer.getBoundingClientRect();
        return {
          sidebarBottom: s.bottom,
          footerTop: f.top,
        };
      }
      """
  )
  if footer_overlap is None:
    raise RuntimeError(f"[{url}] Footer overlap measurement unavailable.")
  if footer_overlap["sidebarBottom"] > footer_overlap["footerTop"] + 1:
    raise RuntimeError(
        f"[{url}] Sidebar overlaps footer: "
        f"{footer_overlap['sidebarBottom']} > {footer_overlap['footerTop']}"
    )

  gap = page.evaluate(
      """
      () => {
        const sidebar = document.querySelector('.md-sidebar--primary');
        const scrollwrap = document.querySelector('.md-sidebar__scrollwrap');
        if (!sidebar || !scrollwrap) return null;
        return {
          gap: scrollwrap.getBoundingClientRect().top - sidebar.getBoundingClientRect().top,
          sidebarHeight: sidebar.offsetHeight,
          scrollwrapHeight: scrollwrap.offsetHeight,
        };
      }
      """
  )
  if gap is None:
    raise RuntimeError(f"[{url}] Left nav gap measurement unavailable.")
  if gap["gap"] > 1:
    raise RuntimeError(f"[{url}] Left nav top gap {gap['gap']}px > 1px")
  if gap["sidebarHeight"] + 1 < gap["scrollwrapHeight"]:
    raise RuntimeError(
        f"[{url}] Left nav height {gap['sidebarHeight']}px < "
        f"scrollwrap {gap['scrollwrapHeight']}px"
    )

  nav_title_height = page.evaluate(
      """
      () => {
        const el = document.querySelector('.md-nav--primary > .md-nav__title');
        return el ? el.getBoundingClientRect().height : null;
      }
      """
  )
  if nav_title_height is None:
    raise RuntimeError(f"[{url}] Nav title not found for height check.")
  if nav_title_height > 1:
    raise RuntimeError(f"[{url}] Nav title height {nav_title_height}px > 1px")

  nav_text = page.evaluate(
      "() => document.querySelector('.md-nav--primary')?.innerText || ''"
  )
  if "Home" in nav_text:
    raise RuntimeError(f"[{url}] Home should not appear in nav text.")

  grid_max_width = get_style(page, ".language-grid", "max-width")
  if grid_max_width not in ("760px", "47.5rem"):
    raise RuntimeError(f"[{url}] Language grid max-width {grid_max_width} != 760px")

  padding = page.evaluate(
      """
      () => {
        const card = document.querySelector('.language-card');
        if (!card) return null;
        const style = getComputedStyle(card);
        return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft];
      }
      """
  )
  if padding != ["20px", "20px", "20px", "20px"]:
    raise RuntimeError(f"[{url}] Language card padding {padding} != 20px")

  welcome = page.evaluate(
      """
      () => {
        const el = document.querySelector('#welcome-message');
        if (!el) return null;
        const style = getComputedStyle(el);
        return {
          color: style.color,
          size: style.fontSize,
          weight: style.fontWeight,
        };
      }
      """
  )
  if not welcome:
    raise RuntimeError(f"[{url}] Welcome message not found.")
  if welcome["color"] != "rgb(107, 107, 107)":
    raise RuntimeError(f"[{url}] Welcome color {welcome['color']} != rgb(107, 107, 107)")
  if float(welcome["weight"]) > 600:
    raise RuntimeError(f"[{url}] Welcome font-weight {welcome['weight']} too heavy")
  size_px = float(welcome["size"].replace("px", ""))
  if size_px > 36:
    raise RuntimeError(f"[{url}] Welcome font-size {welcome['size']} too large")

  print(f"✅ Homepage sizing and left nav ok on {url}")


def assert_root_redirect(page, url: str, target_suffix: str):
  page.goto(url, wait_until="domcontentloaded")
  page.wait_for_url(f"**{target_suffix}", timeout=4000)
  if not page.url.rstrip("/").endswith(target_suffix.rstrip("/")):
    raise RuntimeError(f"[{url}] Root did not redirect to {target_suffix}, got {page.url}")

  print(f"✅ Root redirect ok on {url}")


def main():
  server = start_server()
  time.sleep(1.5)

  try:
    with sync_playwright() as p:
      browser = launch_chromium(p)
      page = browser.new_page(viewport={"width": 375, "height": 812})
      page.on("console", lambda msg: print(f"[console] {msg.type}: {msg.text}"))
      for url in URLS:
        assert_mobile_toc(page, url)
      page.close()

      desktop = browser.new_page(viewport={"width": 1280, "height": 900})
      desktop.on("console", lambda msg: print(f"[console] {msg.type}: {msg.text}"))
      assert_root_redirect(desktop, ROOT_URL, "/en/")
      for url in HOME_URLS:
        assert_homepage_styles(desktop, url)
      for url, lang in DESKTOP_URLS:
        assert_desktop_styles(desktop, url, lang)
      desktop.close()
      browser.close()
  finally:
    server.terminate()
    server.wait(timeout=5)


if __name__ == "__main__":
  main()
