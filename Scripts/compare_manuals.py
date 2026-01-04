#!/usr/bin/env python3
"""
Compare translated manuals against a base manual for structural issues.

Checks:
- Heading level counts and sequence length
- Ordered list item count
- Broken button markers ([], ]], escaped brackets)
- Duplicate phrase fragments on a single line
- Duplicate headings (same level/title)
- Inline note labels not in admonitions
- Headings that look split across lines
- Orphaned note markers
- Blockquoted underlined subheadings
- Bracketed bold keypad buttons
- Cover image not near overview heading
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Dict, List, Tuple

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
ORDERED_ITEM_RE = re.compile(r"^\s*\d+\.\s+")
BROKEN_MARKERS_RE = re.compile(r"(\[\]|\]\]|\\\[|\\\])")
TAG_RE = re.compile(r"<[^>]+>")
INLINE_NOTE_RE = re.compile(
    r"\*\*(?:note|nota|pastaba|\u041f\u0440\u0438\u043c\u0435\u0447\u0430\u043d\u0438\u0435)\s*[:.]\*\*",
    re.IGNORECASE,
)
OVERVIEW_RE = re.compile(
    r"^(?:##+)\s+.*(?:overview|apžvalga|obzor|обзор|vista general)\b",
    re.IGNORECASE,
)
IMAGE1_RE = re.compile(r"image1\.png", re.IGNORECASE)
BRACKETED_BOLD_RE = re.compile(r"\[(?:\*\*)?\d{1,2}(?:\*\*)?[^]]*]", re.UNICODE)
BLOCKQUOTE_UNDERLINE_RE = re.compile(r"^>\s*\*\*<u>.+</u>\*\*", re.IGNORECASE)


def load_lines(path: Path) -> List[str]:
    return path.read_text(encoding="utf-8").splitlines()


def collect_headings(lines: List[str]) -> List[Tuple[int, str]]:
    headings = []
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
        if in_code:
            continue
        m = HEADING_RE.match(line)
        if m:
            level = len(m.group(1))
            title = m.group(2).strip()
            headings.append((level, title))
    return headings


def count_ordered_items(lines: List[str]) -> int:
    count = 0
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
        if in_code:
            continue
        if ORDERED_ITEM_RE.match(line):
            count += 1
    return count


def heading_level_counts(headings: List[Tuple[int, str]]) -> Dict[int, int]:
    counts: Dict[int, int] = {}
    for level, _ in headings:
        counts[level] = counts.get(level, 0) + 1
    return counts


def normalize_text(line: str) -> str:
    line = TAG_RE.sub("", line)
    return re.sub(r"\s+", " ", line).strip()


def find_duplicate_fragments(lines: List[str]) -> List[str]:
    issues = []
    for line in lines:
        if not line.strip():
            continue
        normalized = normalize_text(line)
        if " / " in normalized:
            left, _, right = normalized.partition(" / ")
            if left and right and left.casefold() == right.casefold():
                issues.append(line)
                continue
        sentences = re.split(r"(?<=[.!?])\s+", normalized)
        seen = set()
        for sentence in sentences:
            key = sentence.casefold().strip()
            if not key or len(key) < 30:
                continue
            if key in seen:
                issues.append(line)
                break
            seen.add(key)
    return issues


def find_broken_markers(lines: List[str]) -> List[str]:
    issues = []
    for line in lines:
        if BROKEN_MARKERS_RE.search(line):
            issues.append(line)
    return issues


def find_duplicate_headings(headings: List[Tuple[int, str]]) -> List[str]:
    counts: Dict[Tuple[int, str], int] = {}
    for level, title in headings:
        key = (level, normalize_text(title).casefold())
        counts[key] = counts.get(key, 0) + 1
    duplicates = []
    for (level, title), count in counts.items():
        if count > 1:
            duplicates.append(f"{level} {title} (x{count})")
    return duplicates


def find_inline_note_labels(lines: List[str]) -> List[str]:
    issues = []
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
        if in_code:
            continue
        if INLINE_NOTE_RE.search(line) and not line.lstrip().startswith(">"):
            issues.append(line)
    return issues


def find_split_headings(lines: List[str]) -> List[str]:
    issues = []
    for idx, line in enumerate(lines):
        m = HEADING_RE.match(line)
        if not m:
            continue
        title = m.group(2).strip()
        if not title.endswith(("-", "/", "\u2013", "\u2014")):
            continue
        if idx + 1 >= len(lines):
            continue
        next_line = lines[idx + 1].strip()
        if next_line and not HEADING_RE.match(next_line):
            issues.append(f"{line} || {next_line}")
    return issues


def find_orphaned_notes(lines: List[str]) -> List[str]:
    issues = []
    for idx, line in enumerate(lines):
        if line.strip() != "> [!NOTE]":
            continue
        j = idx + 1
        while j < len(lines) and not lines[j].strip():
            j += 1
        if j >= len(lines):
            issues.append(line)
            continue
        if lines[j].startswith("#"):
            issues.append(f"{line} -> {lines[j]}")
    return issues


def find_blockquoted_underlines(lines: List[str]) -> List[str]:
    return [line for line in lines if BLOCKQUOTE_UNDERLINE_RE.match(line)]


def find_bracketed_bold_buttons(lines: List[str]) -> List[str]:
    issues = []
    for line in lines:
        if BRACKETED_BOLD_RE.search(line):
            issues.append(line)
    return issues


def find_overview_image_misplaced(lines: List[str]) -> List[str]:
    overview_idx = None
    for idx, line in enumerate(lines):
        if OVERVIEW_RE.match(line):
            overview_idx = idx
            break
    if overview_idx is None:
        return []
    image_idx = None
    for idx, line in enumerate(lines):
        if IMAGE1_RE.search(line):
            image_idx = idx
            break
    if image_idx is None:
        return ["image1.png missing near overview heading"]
    if image_idx < overview_idx or image_idx > overview_idx + 10:
        return [f"image1.png at line {image_idx + 1} (overview at line {overview_idx + 1})"]
    return []


def compare(base: Path, target: Path) -> List[str]:
    base_lines = load_lines(base)
    target_lines = load_lines(target)

    base_headings = collect_headings(base_lines)
    target_headings = collect_headings(target_lines)

    issues: List[str] = []

    if len(base_headings) != len(target_headings):
        issues.append(
            f"Heading count mismatch: base={len(base_headings)} target={len(target_headings)}"
        )

    base_counts = heading_level_counts(base_headings)
    target_counts = heading_level_counts(target_headings)
    if base_counts != target_counts:
        issues.append(f"Heading level counts mismatch: base={base_counts} target={target_counts}")

    base_items = count_ordered_items(base_lines)
    target_items = count_ordered_items(target_lines)
    if base_items != target_items:
        issues.append(f"Ordered list item count mismatch: base={base_items} target={target_items}")

    broken = find_broken_markers(target_lines)
    if broken:
        issues.append(f"Broken button markers: {len(broken)} line(s)")

    dupes = find_duplicate_fragments(target_lines)
    if dupes:
        issues.append(f"Duplicated fragments: {len(dupes)} line(s)")

    duplicate_headings = find_duplicate_headings(target_headings)
    if duplicate_headings:
        issues.append(f"Duplicate headings: {', '.join(duplicate_headings)}")

    inline_notes = find_inline_note_labels(target_lines)
    if inline_notes:
        issues.append(f"Inline note labels: {len(inline_notes)} line(s)")

    split_headings = find_split_headings(target_lines)
    if split_headings:
        issues.append(f"Split headings: {len(split_headings)} line(s)")

    orphaned_notes = find_orphaned_notes(target_lines)
    if orphaned_notes:
        issues.append(f"Orphaned note markers: {len(orphaned_notes)} line(s)")

    blockquoted_underlines = find_blockquoted_underlines(target_lines)
    if blockquoted_underlines:
        issues.append(f"Blockquoted underlined headings: {len(blockquoted_underlines)} line(s)")

    bracketed_buttons = find_bracketed_bold_buttons(target_lines)
    if bracketed_buttons:
        issues.append(f"Bracketed bold buttons: {len(bracketed_buttons)} line(s)")

    overview_image_issues = find_overview_image_misplaced(target_lines)
    if overview_image_issues:
        issues.append(f"Overview image placement: {', '.join(overview_image_issues)}")

    return issues


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True, type=Path)
    parser.add_argument("--targets", nargs="+", required=True, type=Path)
    args = parser.parse_args()

    if not args.base.exists():
        raise SystemExit(f"Missing base file: {args.base}")

    any_fail = False
    for target in args.targets:
        if not target.exists():
            print(f"ERROR: Missing target file: {target}")
            any_fail = True
            continue
        issues = compare(args.base, target)
        if issues:
            any_fail = True
            print(f"[{target}]")
            for issue in issues:
                print(f"  - {issue}")
        else:
            print(f"[{target}] OK")

    return 1 if any_fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
