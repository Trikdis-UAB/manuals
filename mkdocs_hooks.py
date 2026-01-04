"""
MkDocs hooks to normalize GitHub-style callouts for markdown-callouts.
"""

from __future__ import annotations

import re

CALLOUT_RE = re.compile(r"^(?P<indent>\s*)>\s*\[!(?P<kind>[A-Z]+)\]\s*(?P<rest>.*)$")


def normalize_github_callouts(markdown: str) -> str:
    lines = markdown.splitlines()
    for idx, line in enumerate(lines):
        match = CALLOUT_RE.match(line)
        if not match:
            continue
        indent = match.group("indent")
        kind = match.group("kind")
        rest = match.group("rest").strip()
        if rest:
            lines[idx] = f"{indent}> {kind}: {rest}"
        else:
            lines[idx] = f"{indent}> {kind}:"
    return "\n".join(lines)


def on_page_markdown(markdown: str, page, config, files):
    return normalize_github_callouts(markdown)
