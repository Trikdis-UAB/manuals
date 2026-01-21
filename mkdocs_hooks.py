"""
MkDocs hooks to normalize GitHub-style callouts for markdown-callouts.
"""

from __future__ import annotations

import re

from mkdocs_add_number_plugin.plugin import AddNumberPlugin

CALLOUT_RE = re.compile(r"^(?P<indent>\s*)>\s*\[!(?P<kind>[A-Z]+)\]\s*(?P<rest>.*)$")
NUMBERED_H2_RE = re.compile(r"^##\s+\d+\.")


def _should_number_headings(page, markdown: str, config) -> bool:
    if not page or not getattr(page, "file", None):
        return False

    src_path = page.file.src_path
    if src_path == "index.md":
        return False

    locales = [
        alt.get("lang")
        for alt in (config.get("extra", {}) or {}).get("alternate", [])
        if alt.get("lang")
    ]
    if any(src_path == f"{locale}/index.md" for locale in locales):
        return False

    return not any(NUMBERED_H2_RE.match(line) for line in markdown.splitlines())


def _apply_heading_numbers(page, markdown: str) -> str:
    plugin = AddNumberPlugin()
    plugin.load_config(
        {
            "order": 2,
            "strict_mode": False,
            "excludes": [],
            "includes": [],
            "increment_pages": False,
            "increment_topnav": False,
        }
    )
    plugin.files_str = [page.file.src_path]
    plugin._order = plugin.config["order"] - 1
    return plugin.on_page_markdown(markdown, page, None, None)


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
    markdown = normalize_github_callouts(markdown)
    if _should_number_headings(page, markdown, config):
        markdown = _apply_heading_numbers(page, markdown)
    return markdown
