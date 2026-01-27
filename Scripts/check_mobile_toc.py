#!/usr/bin/env python3
"""
Playwright smoke test:
- Mobile: drawer opens directly to the page TOC (with the built-in back button).
- Mobile: sidebar overlay does not reserve layout space and opens via drawer.
- Desktop: right sidebar styles, deep-nav guides, and language-specific nav isolation.

Usage:
  1) Build the site: `.venv/bin/mkdocs build --strict`
  2) Run the test: `.venv/bin/python Scripts/check_mobile_toc.py`

Requires:
  pip install playwright==1.48.0
  python -m playwright install chromium
"""

import re
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
MOBILE_LAYOUT_URLS = [
    "http://127.0.0.1:8001/en/",
    "http://127.0.0.1:8001/en/alarm-communicators/cellular/gt/",
]
HOME_URLS = [
    "http://127.0.0.1:8001/en/",
]
DARK_MODE_URLS = [
    "http://127.0.0.1:8001/en/",
]
DESKTOP_URLS = [
    ("http://127.0.0.1:8001/en/alarm-communicators/cellular/gt/", "en"),
    ("http://127.0.0.1:8001/lt/alarm-communicators/cellular/gt/", "lt"),
    ("http://127.0.0.1:8001/en/alarm-communicators/e16/", "en"),
    ("http://127.0.0.1:8001/en/alarm-communicators/fire-panels/g17f/", "en"),
]
PARADOX_URL = "http://127.0.0.1:8001/en/alarm-communicators/cellular/quick-setup/paradox/"
ROOT_URL = "http://127.0.0.1:8001/"

EXPECTED_COLORS = {
    "toc_bg": "rgb(246, 246, 246)",
    "toc_border": "rgb(210, 209, 209)",
    "toc_active": "rgb(228, 228, 228)",
    "nav_depth_border": "rgb(210, 209, 209)",
}

DARK_MODE_SURFACES = [
    ".md-sidebar--primary",
    ".md-sidebar__scrollwrap",
    ".md-nav--primary",
    ".md-sidebar--primary .md-nav__list",
    ".md-sidebar--primary .md-nav__list .md-nav__list",
]


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


def parse_rgba(value: Optional[str]):
  if not value:
    return None
  value = value.strip().lower()
  if value in ("transparent", ""):
    return (0, 0, 0, 0)
  match = re.match(r"rgba?\\(([^)]+)\\)", value)
  if not match:
    return None
  parts = [p.strip() for p in match.group(1).split(",")]
  if len(parts) < 3:
    return None
  r = int(float(parts[0]))
  g = int(float(parts[1]))
  b = int(float(parts[2]))
  a = float(parts[3]) if len(parts) > 3 else 1.0
  return (r, g, b, a)


def is_light_background(value: Optional[str], threshold: int = 200) -> bool:
  rgba = parse_rgba(value)
  if not rgba:
    return False
  r, g, b, a = rgba
  if a == 0:
    return False
  return min(r, g, b) >= threshold


def set_color_scheme(page, scheme: str):
  page.evaluate(
      """
      (scheme) => {
        const input = document.querySelector(
          `input[data-md-color-scheme="${scheme}"]`
        );
        if (input) input.click();
      }
      """,
      scheme,
  )
  page.wait_for_function(
      f"document.body.getAttribute('data-md-color-scheme') === '{scheme}'",
      timeout=2000,
  )


def assert_dark_mode_surfaces(page, url: str):
  page.goto(url, wait_until="networkidle")
  set_color_scheme(page, "slate")

  failures = []
  for selector in DARK_MODE_SURFACES:
    color = get_style(page, selector, "background-color")
    if is_light_background(color):
      failures.append(f"{selector}: {color}")

  if failures:
    raise RuntimeError(
        f"[{url}] Dark mode surfaces too light: {', '.join(failures)}"
    )

  print(f"✅ Dark mode surfaces ok on {url}")


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


def assert_mobile_sidebar_layout(page, url: str):
  page.goto(url, wait_until="networkidle")
  viewport = page.viewport_size
  if not viewport:
    raise RuntimeError(f"[{url}] Missing viewport size for mobile layout check.")

  layout = page.evaluate(
      """
      () => {
        const sidebar = document.querySelector('.md-sidebar--primary');
        const content = document.querySelector('.md-content');
        if (!sidebar || !content) return null;
        const s = sidebar.getBoundingClientRect();
        const c = content.getBoundingClientRect();
        const drawer = document.getElementById('__drawer');
        return {
          drawerChecked: drawer ? drawer.checked : null,
          sidebar: {
            left: s.left,
            right: s.right,
            width: s.width,
            position: getComputedStyle(sidebar).position,
          },
          content: {
            left: c.left,
            right: c.right,
            width: c.width,
          },
        };
      }
      """
  )
  if not layout:
    raise RuntimeError(f"[{url}] Unable to read mobile layout.")

  if layout["sidebar"]["position"] not in ("fixed", "absolute"):
    raise RuntimeError(
        f"[{url}] Sidebar position {layout['sidebar']['position']} should be fixed on mobile."
    )
  if layout["content"]["left"] > 2:
    raise RuntimeError(
        f"[{url}] Content left {layout['content']['left']}px should be near 0."
    )
  if layout["content"]["right"] < viewport["width"] - 2:
    raise RuntimeError(
        f"[{url}] Content right {layout['content']['right']}px should reach viewport width."
    )

  page.evaluate(
      """
      () => {
        const drawer = document.getElementById('__drawer');
        if (drawer) {
          drawer.checked = true;
          drawer.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      """
  )
  page.wait_for_timeout(300)

  open_layout = page.evaluate(
      """
      () => {
        const sidebar = document.querySelector('.md-sidebar--primary');
        const content = document.querySelector('.md-content');
        const drawer = document.getElementById('__drawer');
        if (!sidebar || !content) return null;
        const s = sidebar.getBoundingClientRect();
        const c = content.getBoundingClientRect();
        return {
          drawerChecked: drawer ? drawer.checked : null,
          sidebar: { left: s.left, right: s.right, width: s.width },
          content: { left: c.left, right: c.right, width: c.width },
        };
      }
      """
  )
  if not open_layout:
    raise RuntimeError(f"[{url}] Unable to read drawer-open layout.")
  if not open_layout["drawerChecked"]:
    raise RuntimeError(f"[{url}] Drawer did not open for mobile layout check.")
  if open_layout["sidebar"]["right"] < 160:
    raise RuntimeError(
        f"[{url}] Sidebar not visible when open: {open_layout['sidebar']}"
    )
  if open_layout["content"]["left"] > 2:
    raise RuntimeError(
        f"[{url}] Content shifts when drawer opens: left {open_layout['content']['left']}px"
    )

  toc_lines = page.evaluate(
      """
      () => {
        const selectors = [
          '.md-nav--secondary .md-nav__list',
          '.md-nav--secondary .md-nav__list .md-nav__list',
          '.md-nav--primary .md-nav__list .md-nav__list',
          '.md-nav--primary .md-nav__list .md-nav__list .md-nav__list',
        ];
        return selectors.map((selector) => {
          const el = document.querySelector(selector);
          const style = el ? getComputedStyle(el) : null;
          return {
            selector,
            borderLeftWidth: style ? style.borderLeftWidth : null,
          };
        });
      }
      """
  )
  for entry in toc_lines:
    if entry["borderLeftWidth"] not in (None, "", "0px"):
      raise RuntimeError(
          f"[{url}] Mobile nav border {entry['selector']} has {entry['borderLeftWidth']}"
      )

  toc_title = page.evaluate(
      """
      () => {
        const title = document.querySelector('.md-nav--secondary .md-nav__title');
        const icon = title?.querySelector('.md-nav__icon');
        if (!title || !icon) return null;
        const style = getComputedStyle(title);
        const i = icon.getBoundingClientRect();
        return {
          paddingLeft: style.paddingLeft,
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          iconRight: i.right,
        };
      }
      """
  )
  if toc_title:
    padding_left = float(toc_title["paddingLeft"].replace("px", ""))
    if padding_left < 40:
      raise RuntimeError(
          f"[{url}] TOC title padding-left {padding_left}px too small."
      )
    padding_bottom = float(toc_title["paddingBottom"].replace("px", ""))
    if padding_bottom < 6:
      raise RuntimeError(
          f"[{url}] TOC title padding-bottom {padding_bottom}px too small."
      )
    padding_top = float(toc_title["paddingTop"].replace("px", ""))
    if padding_top < 6:
      raise RuntimeError(
          f"[{url}] TOC title padding-top {padding_top}px too small."
      )

  nav_title = page.evaluate(
      """
      () => {
        const titles = Array.from(
          document.querySelectorAll('.md-nav--primary .md-nav__title')
        );
        for (const title of titles) {
          const rect = title.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            const style = getComputedStyle(title);
            return {
              paddingLeft: style.paddingLeft,
              paddingTop: style.paddingTop,
              paddingBottom: style.paddingBottom,
              whiteSpace: style.whiteSpace,
            };
          }
        }
        return null;
      }
      """
  )
  if nav_title:
    padding_left = float(nav_title["paddingLeft"].replace("px", ""))
    if padding_left < 40:
      raise RuntimeError(
          f"[{url}] Nav title padding-left {padding_left}px too small."
      )
    padding_bottom = float(nav_title["paddingBottom"].replace("px", ""))
    if padding_bottom < 6:
      raise RuntimeError(
          f"[{url}] Nav title padding-bottom {padding_bottom}px too small."
      )
    padding_top = float(nav_title["paddingTop"].replace("px", ""))
    if padding_top < 6:
      raise RuntimeError(
          f"[{url}] Nav title padding-top {padding_top}px too small."
      )
    if nav_title["whiteSpace"] == "nowrap":
      raise RuntimeError(f"[{url}] Nav title should wrap on mobile.")

  print(f"✅ Mobile sidebar layout ok on {url}")


def assert_desktop_styles(page, url: str, lang: str):
  page.goto(url, wait_until="networkidle")
  set_color_scheme(page, "default")

  logo = page.query_selector("a.md-logo")
  if not logo:
    raise RuntimeError(f"[{url}] Missing header logo link")
  expected_logo = f"/{lang}/"
  logo_href = logo.get_attribute("href")
  if logo_href != expected_logo:
    raise RuntimeError(f"[{url}] Logo href {logo_href} should be {expected_logo}")
  logo.click()
  page.wait_for_url(re.compile(rf".*/{re.escape(lang)}/$"), timeout=3000)
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
  toc_border = get_style(page, ".md-content", "border-right-color")
  toc_border_width = get_style(page, ".md-content", "border-right-width")

  if toc_bg != EXPECTED_COLORS["toc_bg"]:
    raise RuntimeError(f"[{url}] Left nav background {toc_bg} != {EXPECTED_COLORS['toc_bg']}")
  if toc_active != EXPECTED_COLORS["toc_active"]:
    raise RuntimeError(f"[{url}] Active TOC {toc_active} != {EXPECTED_COLORS['toc_active']}")
  if toc_border_width != "1px" or toc_border != EXPECTED_COLORS["toc_border"]:
    raise RuntimeError(
        f"[{url}] TOC border {toc_border}/{toc_border_width} != "
        f"{EXPECTED_COLORS['toc_border']}/1px"
    )

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


def assert_paradox_tip(page, url: str):
  page.goto(url, wait_until="networkidle")
  tip = page.query_selector(".md-typeset .admonition.tip")
  if not tip:
    raise RuntimeError(f"[{url}] Missing tip callout in main content")
  tip_box = tip.bounding_box()
  if not tip_box:
    raise RuntimeError(f"[{url}] Unable to read tip bounding box")
  toc = page.query_selector(".md-sidebar--secondary")
  if toc:
    toc_box = toc.bounding_box()
    if toc_box and tip_box["x"] >= toc_box["x"] - 10:
      raise RuntimeError(f"[{url}] Tip appears inside TOC area")
  print(f"✅ Paradox tip appears in content on {url}")


def assert_homepage_styles(page, url: str):
  page.goto(url, wait_until="networkidle")
  set_color_scheme(page, "default")

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

  lang_cards = page.evaluate(
      """
      () => Array.from(document.querySelectorAll('.language-grid .language-card'))
        .map((card) => ({
          text: card.textContent.trim(),
          top: card.getBoundingClientRect().top,
        }))
      """
  )
  if len(lang_cards) != 3:
    raise RuntimeError(f"[{url}] Language cards count {len(lang_cards)} != 3")
  labels = [card["text"] for card in lang_cards]
  if labels != ["English", "Lietuvių", "Español"]:
    raise RuntimeError(f"[{url}] Language cards {labels} != expected list")
  tops = [card["top"] for card in lang_cards]
  if max(tops) - min(tops) > 4:
    raise RuntimeError(f"[{url}] Language cards should be one row, tops: {tops}")

  grid_max_width = get_style(page, ".language-grid", "max-width")
  if grid_max_width not in ("520px", "32.5rem"):
    raise RuntimeError(f"[{url}] Language grid max-width {grid_max_width} != 520px")

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
  if float(welcome["weight"]) > 500:
    raise RuntimeError(f"[{url}] Welcome font-weight {welcome['weight']} too heavy")
  size_px = float(welcome["size"].replace("px", ""))
  if size_px > 28:
    raise RuntimeError(f"[{url}] Welcome font-size {welcome['size']} too large")

  allowed_messages = {
      "Welcome! Pick your language:",
      "Sveiki! Pasirinkite kalbą:",
      "¡Bienvenido! Elige tu idioma:",
  }
  seen_messages = set()
  for _ in range(4):
    message = page.evaluate(
        "() => document.getElementById('welcome-message')?.textContent?.trim() || ''"
    )
    if message:
      seen_messages.add(message)
      if re.search(r"[\u0400-\u04FF]", message):
        raise RuntimeError(f"[{url}] Welcome message contains Cyrillic: {message}")
    page.wait_for_timeout(2200)

  unexpected = [msg for msg in seen_messages if msg not in allowed_messages]
  if unexpected:
    raise RuntimeError(f"[{url}] Unexpected welcome messages: {unexpected}")

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
      for url in MOBILE_LAYOUT_URLS:
        assert_mobile_sidebar_layout(page, url)
      page.close()

      desktop = browser.new_page(viewport={"width": 1280, "height": 900})
      desktop.on("console", lambda msg: print(f"[console] {msg.type}: {msg.text}"))
      assert_root_redirect(desktop, ROOT_URL, "/en/")
      for url in HOME_URLS:
        assert_homepage_styles(desktop, url)
      for url in DARK_MODE_URLS:
        assert_dark_mode_surfaces(desktop, url)
      for url, lang in DESKTOP_URLS:
        assert_desktop_styles(desktop, url, lang)
      assert_paradox_tip(desktop, PARADOX_URL)
      desktop.close()
      browser.close()
  finally:
    server.terminate()
    server.wait(timeout=5)


if __name__ == "__main__":
  main()
