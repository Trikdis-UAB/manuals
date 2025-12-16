#!/usr/bin/env python3
"""
Auto-link "See chapter ..." references to the correct headings.

- Scans target markdown files
- Builds heading anchors (Material style: lowercased, spaces->-, strip punctuation)
- Finds phrases like "See chapter X.Y “Heading Text”" or "See chapter “Heading Text”"
- Replaces with markdown link to the resolved heading anchor
- Ignores if no matching heading is found

Usage:
  .venv/bin/python Scripts/link_chapters.py
"""

import re
import unicodedata
from pathlib import Path
from typing import Dict, List, Tuple

ROOT = Path(__file__).resolve().parent.parent

TARGETS = [
    ROOT / "docs/en/control-panels/sp3/index.md",
    ROOT / "docs/lt/control-panels/sp3/index.md",
    ROOT / "docs/es/control-panels/sp3/index.md",
    ROOT / "docs/ru/control-panels/sp3/index.md",
]

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")

# Examples matched:
#   See chapter 5 “Something”
#   See chapter 5.2 “Something”
#   see chapter “Something”
#   See chapter 5.2 "Something"
CHAPTER_REF_RE = re.compile(
    r"""(?P<prefix>See\s+chapter\s+)
        (?:(?P<num>\d+(?:\.\d+)*)\s+)?          # optional number
        [“"]\s*(?P<title>[^”"]+?)\s*[”"]       # quoted title
    """,
    re.IGNORECASE | re.VERBOSE,
)


def slugify(text: str) -> str:
    text = text.strip()
    text = (
        unicodedata.normalize("NFKD", text)
        .encode("ascii", "ignore")
        .decode("ascii")
    )
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s]+", "-", text)
    return text


def collect_headings(lines: List[str]) -> Dict[str, Tuple[str, str]]:
    """
    Returns mapping of:
      - heading slug -> (heading text, numeric prefix if present like '5.2')
    """
    headings = {}
    for line in lines:
        m = HEADING_RE.match(line.strip())
        if not m:
            continue
        level, text = m.groups()
        slug = slugify(text)
        # Extract leading number if present (e.g., "5.2 Window")
        num_match = re.match(r"(\d+(?:\.\d+)*)", text.strip())
        num = num_match.group(1) if num_match else ""
        headings[slug] = (text.strip(), num)
    return headings


def resolve_heading(headings: Dict[str, Tuple[str, str]], num: str, title: str) -> str:
    """Return anchor slug if found by number or title."""
    # First try exact number match
    for slug, (_, hnum) in headings.items():
        if num and hnum == num:
            return slug
    # Next try title match
    wanted_slug = slugify(title)
    for slug, (htext, _) in headings.items():
        if slug == wanted_slug:
            return slug
        if slugify(htext) == wanted_slug:
            return slug
    return ""


def link_refs(path: Path) -> bool:
    lines = path.read_text(encoding="utf-8").splitlines(keepends=False)
    headings = collect_headings(lines)
    changed = False
    out: List[str] = []

    for line in lines:
        def repl(m: re.Match) -> str:
            num = (m.group("num") or "").strip()
            title = (m.group("title") or "").strip()
            anchor = resolve_heading(headings, num, title)
            if not anchor:
                return m.group(0)  # leave unchanged
            # keep the visible text as-is, but link to anchor
            visible = f'{m.group("prefix")}{title}'
            return f"[{visible}](#{anchor})"

        new_line = CHAPTER_REF_RE.sub(repl, line)
        if new_line != line:
            changed = True
        out.append(new_line)

    if changed:
        path.write_text("\n".join(out) + "\n", encoding="utf-8")
    return changed


def main():
    any_changed = False
    for target in TARGETS:
        if not target.exists():
            print(f"Missing {target}, skipping")
            continue
        if link_refs(target):
            print(f"Linked chapter refs in {target}")
            any_changed = True
    if not any_changed:
        print("No changes made")


if __name__ == "__main__":
    main()
