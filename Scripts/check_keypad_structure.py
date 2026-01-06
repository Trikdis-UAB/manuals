#!/usr/bin/env python3
"""
Lightweight structure checker for keypad manuals.

Flags common conversion issues:
- H1 not the first non-empty line or multiple H1s
- cover image (image1.png) not placed shortly after H1
- title-looking H2s (Brief User Guide/etc.) when H1 doesn't match
- underline-styled "titles" not promoted to headings
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Iterable, List, Tuple

H1_RE = re.compile(r"^#\s+")
H2_RE = re.compile(r"^##\s+(.*)$")
IMAGE1_RE = re.compile(r"image1\.png", re.IGNORECASE)
UNDERLINE_RE = re.compile(r"<u>.+</u>", re.IGNORECASE)
TITLE_HINT_RE = re.compile(
    r"(brief user guide|breve gu[ií]a del usuario|trumpa naudojimo instrukcija|краткая инструкция)",
    re.IGNORECASE,
)
GRAPHIC_SYMBOLS_RE = re.compile(
    r"^##\s+.*(?:graphic symbols|s[ií]mbolos gr[aá]ficos|grafiniai žymėjimai|графические обозначения)\b",
    re.IGNORECASE,
)
SYMBOL_TABLE_RE = re.compile(
    r"\|\s*(?:Symbol|Símbolo|Simbolis|Символ)\s*\|\s*(?:Description|Descripción|Aprašymas|Описание)\s*\|",
    re.IGNORECASE,
)
IMAGE13_RE = re.compile(r"image13\.jpe?g", re.IGNORECASE)


def iter_markdown_files(paths: Iterable[Path]) -> List[Path]:
    files: List[Path] = []
    for path in paths:
        if path.is_dir():
            files.extend(sorted(path.rglob("*.md")))
        else:
            files.append(path)
    return files


def load_lines(path: Path) -> List[str]:
    return path.read_text(encoding="utf-8").splitlines()


def first_non_empty(lines: List[str]) -> Tuple[int, str] | None:
    for idx, line in enumerate(lines):
        if line.strip():
            return idx, line
    return None


def find_h1_indices(lines: List[str]) -> List[int]:
    return [idx for idx, line in enumerate(lines) if H1_RE.match(line)]


def find_h2_titles(lines: List[str]) -> List[str]:
    titles = []
    for line in lines:
        match = H2_RE.match(line)
        if match:
            titles.append(match.group(1).strip())
    return titles


def find_image1_index(lines: List[str]) -> int | None:
    for idx, line in enumerate(lines):
        if IMAGE1_RE.search(line):
            return idx
    return None


def find_underlined_lines(lines: List[str]) -> List[Tuple[int, str]]:
    results = []
    for idx, line in enumerate(lines):
        if UNDERLINE_RE.search(line) and not line.lstrip().startswith("#"):
            results.append((idx, line.strip()))
    return results


def check_file(path: Path) -> List[str]:
    issues: List[str] = []
    lines = load_lines(path)

    first = first_non_empty(lines)
    if first:
        idx, line = first
        if not H1_RE.match(line):
            issues.append(f"H1 not first non-empty line (line {idx + 1})")

    h1_indices = find_h1_indices(lines)
    if len(h1_indices) == 0:
        issues.append("Missing H1")
    elif len(h1_indices) > 1:
        issues.append(f"Multiple H1 headings ({len(h1_indices)})")

    image_idx = find_image1_index(lines)
    if image_idx is not None and h1_indices:
        h1_idx = h1_indices[0]
        if image_idx < h1_idx or image_idx > h1_idx + 10:
            issues.append(
                f"image1.png placement: line {image_idx + 1} (expected within 10 lines after H1)"
            )

    h2_titles = find_h2_titles(lines)
    if any(TITLE_HINT_RE.search(title) for title in h2_titles):
        if not any(TITLE_HINT_RE.search(lines[idx]) for idx in h1_indices):
            issues.append("Title-like H2 present but H1 does not look like a title")

    underlined = find_underlined_lines(lines)
    if underlined:
        for idx, line in underlined:
            issues.append(f"Underline-styled title not promoted to heading (line {idx + 1}): {line}")

    symbol_table_idx = None
    for idx, line in enumerate(lines):
        if SYMBOL_TABLE_RE.search(line):
            symbol_table_idx = idx
            break

    graphic_heading_idx = None
    for idx, line in enumerate(lines):
        if GRAPHIC_SYMBOLS_RE.match(line):
            graphic_heading_idx = idx
            break

    if symbol_table_idx is not None and graphic_heading_idx is not None:
        if symbol_table_idx < graphic_heading_idx:
            issues.append(
                f"Symbol table appears before Graphic symbols section (line {symbol_table_idx + 1})"
            )

    if graphic_heading_idx is not None:
        table_found = False
        search_end = min(len(lines), graphic_heading_idx + 30)
        for line in lines[graphic_heading_idx:search_end]:
            if SYMBOL_TABLE_RE.search(line) or IMAGE13_RE.search(line):
                table_found = True
                break
        if not table_found:
            issues.append("Graphic symbols section missing symbol table near heading")

    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description="Check keypad manual structure.")
    parser.add_argument("paths", nargs="+", help="Markdown file(s) or directories to check")
    args = parser.parse_args()

    paths = [Path(path) for path in args.paths]
    files = iter_markdown_files(paths)
    failures = 0

    for path in files:
        issues = check_file(path)
        if issues:
            failures += 1
            print(f"[{path}]")
            for issue in issues:
                print(f"  - {issue}")

    if failures == 0:
        print("All checked files look structurally consistent.")
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
