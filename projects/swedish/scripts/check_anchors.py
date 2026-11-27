#!/usr/bin/env python3
"""After a build, check that every section link in the built Swedish pages lands on a real id.

`mkdocs build --strict` does not catch a wrong #fragment: the link renders and lands at
the top of the page (NOTES/agent-lessons/section-anchor-links.md). Headings change when
translated, so every section link in a translation must be re-pointed and checked here.

Usage: check_anchors.py <built site dir> [lang]     e.g. check_anchors.py /tmp/site sv
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ID_RE = re.compile(r"""\bid=["']?([^"'\s>]+)""")
HREF_RE = re.compile(r"""\bhref=["']?([^"'\s>]+)""")


def ids_of(page: Path, cache: dict[Path, set[str]]) -> set[str]:
    if page not in cache:
        cache[page] = set(ID_RE.findall(page.read_text(encoding="utf-8", errors="replace")))
    return cache[page]


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    site = Path(argv[1]).resolve()
    lang = argv[2] if len(argv) > 2 else "sv"
    cache: dict[Path, set[str]] = {}
    bad = 0
    checked = 0
    for page in sorted((site / lang).rglob("*.html")):
        html = page.read_text(encoding="utf-8", errors="replace")
        # Skip the header/nav/toc: only links inside the article content matter.
        m = re.search(r"<article\b.*?</article>", html, re.S)
        body = m.group(0) if m else html
        for href in HREF_RE.findall(body):
            parts = urlsplit(href)
            if not parts.fragment or parts.scheme or parts.netloc:
                continue
            if parts.fragment.startswith("__") or parts.fragment == "":
                continue
            if parts.path.startswith("/"):
                target = (site / unquote(parts.path).lstrip("/")).resolve()
                if target.is_dir():
                    target = target / "index.html"
            elif parts.path:
                target = (page.parent / unquote(parts.path)).resolve()
                if target.is_dir():
                    target = target / "index.html"
            else:
                target = page
            if not target.exists() or site not in target.parents:
                continue
            checked += 1
            frag = unquote(parts.fragment)
            if frag not in ids_of(target, cache):
                bad += 1
                print(f"BROKEN {page.relative_to(site)} -> {href}")
    print(f"{checked} section links checked, {bad} broken")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
