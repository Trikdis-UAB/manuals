#!/usr/bin/env python3
"""
Verify GitHub-style callouts render as MkDocs admonitions.
"""

from __future__ import annotations

import sys
from pathlib import Path

import markdown


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    if str(root) not in sys.path:
        sys.path.insert(0, str(root))
    from mkdocs_hooks import normalize_github_callouts

    sample = "> [!NOTE]\n> Callout test\n"
    normalized = normalize_github_callouts(sample)
    html = markdown.markdown(normalized, extensions=["markdown_callouts", "admonition"])
    if 'class="admonition note"' not in html:
        print("ERROR: GitHub callouts did not render as admonitions.")
        print(html)
        return 1
    print("OK: GitHub callouts render as admonitions.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
