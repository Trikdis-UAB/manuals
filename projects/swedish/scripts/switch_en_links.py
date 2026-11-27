#!/usr/bin/env python3
"""Point '/en/...' stand-in links at the Swedish page once it exists.

While a page has no Swedish version, translators link to it as '/en/<path>/#<english-id>'.
When the Swedish page appears, this rewrites such links in docs/sv to a relative .md link and
maps the English section id to the Swedish one by heading position (check_structure.py
guarantees both pages have the same heading sequence).

Usage: switch_en_links.py <built site dir> [--write]
Without --write it only prints what it would change. Build first so heading ids are known.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
DOCS = REPO / "docs"
LINK_RE = re.compile(r"\]\((/en/([^)#\s]*?)/?(?:#([^)\s]+))?)\)")
HEADING_ID_RE = re.compile(r"<h[1-6][^>]*\bid=[\"']?([^\"'\s>]+)")


def source_for(rel: str, lang: str) -> Path | None:
    """docs/<lang>/<rel>/index.md, or a page named <rel>.md."""
    for cand in (DOCS / lang / rel / "index.md", DOCS / lang / f"{rel}.md"):
        if cand.exists():
            return cand
    folder = DOCS / lang / Path(rel).parent
    stem = Path(rel).name
    for md in folder.glob("*.md") if folder.exists() else []:
        if md.stem == stem:
            return md
    return None


def heading_ids(site: Path, lang: str, rel: str) -> list[str]:
    page = site / lang / rel / "index.html"
    if not page.exists():
        return []
    html = page.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"<article\b.*?</article>", html, re.S)
    return HEADING_ID_RE.findall(m.group(0) if m else html)


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    site = Path(argv[1]).resolve()
    write = "--write" in argv
    problems = 0
    for md in sorted((DOCS / "sv").rglob("*.md")):
        text = md.read_text(encoding="utf-8")

        def repl(m: re.Match) -> str:
            nonlocal problems
            rel, frag = m.group(2).strip("/"), m.group(3)
            sv_target = source_for(rel, "sv")
            if not sv_target:
                return m.group(0)
            new_frag = ""
            if frag:
                en_ids, sv_ids = heading_ids(site, "en", rel), heading_ids(site, "sv", rel)
                if frag in en_ids and len(en_ids) == len(sv_ids):
                    new_frag = "#" + sv_ids[en_ids.index(frag)]
                else:
                    problems += 1
                    print(f"  cannot map #{frag} for {rel} (rebuild, or headings differ)")
                    return m.group(0)
            target = os.path.relpath(sv_target, md.parent).replace(os.sep, "/").replace(" ", "%20")
            new = f"]({target}{new_frag})"
            print(f"{md.relative_to(DOCS)}: {m.group(1)} -> {target}{new_frag}")
            return new

        new_text = LINK_RE.sub(repl, text)
        if write and new_text != text:
            md.write_text(new_text, encoding="utf-8")
    if not write:
        print("(dry run; add --write to apply)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
