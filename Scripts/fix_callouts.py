#!/usr/bin/env python3
"""
Normalize inline callouts produced by the docx->md conversion.
Transforms single-line `!!! note ...` into proper multi-line blocks and
fixes escaped headings like `\##` that were stuck on the same line.

Usage:
  .venv/bin/python Scripts/fix_callouts.py
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

TARGETS = [
    ROOT / "docs/en/control-panels/sp3/index.md",
    ROOT / "docs/lt/control-panels/sp3/index.md",
    ROOT / "docs/es/control-panels/sp3/index.md",
    ROOT / "docs/ru/control-panels/sp3/index.md",
]


def normalize_callout(line: str) -> list[str]:
    """Return possibly expanded lines when a single-line callout is found."""
    if not line.lstrip().startswith("!!! note"):
        return [line]

    stripped = line.strip()
    if stripped == "!!! note":
        return [line]

    # Split off the content after "!!! note"
    content = stripped[len("!!! note") :].lstrip()

    # Fix escaped headings that got glued onto the same line
    content = content.replace("\\####", "\n####").replace("\\##", "\n##")

    # Indent content for MkDocs admonition
    content_lines = content.split("\n")
    indented = ["    " + c for c in content_lines]
    return ["!!! note\n"] + [l + ("\n" if not l.endswith("\n") else "") for l in indented]


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8").splitlines(keepends=True)
    out: list[str] = []
    changed = False

    for line in original:
        if line.lstrip().startswith("!!! note") and line.strip() != "!!! note":
            expanded = normalize_callout(line)
            out.extend(expanded)
            if len(expanded) != 1 or expanded[0] != line:
                changed = True
        else:
            out.append(line)

    if changed:
        path.write_text("".join(out), encoding="utf-8")
    return changed


def main():
    any_changed = False
    for target in TARGETS:
        if target.exists():
            if process_file(target):
                print(f"Updated {target}")
                any_changed = True
        else:
            print(f"Missing {target}, skipping")
    if not any_changed:
        print("No changes made")


if __name__ == "__main__":
    main()
