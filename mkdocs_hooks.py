"""
MkDocs hooks to normalize GitHub-style callouts for markdown-callouts.
"""

from __future__ import annotations

import html
import logging
import os
import re
import shutil
import subprocess
from collections import defaultdict
from pathlib import Path, PurePosixPath
from typing import Dict, Iterable, Optional, Set, Tuple
from urllib.parse import quote

from mkdocs import plugins as mkdocs_plugins
from mkdocs_add_number_plugin.plugin import AddNumberPlugin

CALLOUT_RE = re.compile(r"^(?P<indent>\s*)>\s*\[!(?P<kind>[A-Z]+)\]\s*(?P<rest>.*)$")
NUMBERED_H2_RE = re.compile(r"^##\s+\d+\.")
LOGGER = logging.getLogger("mkdocs.hooks.pagefind")


class SearchScopeResolver:
    """Resolve page search scopes for language, manual, and subcategory."""

    def __init__(self):
        self._initialized = False
        self._languages: Set[str] = set()
        self._manual_scope_by_src: Dict[str, str] = {}
        self._subcategory_scope_by_src: Dict[str, str] = {}

    def _scope_from_parts(self, language: str, parts: Iterable[str]) -> str:
        encoded_parts = [quote(language, safe="")] + [quote(part, safe="") for part in parts if part]
        return "/" + "/".join(encoded_parts) + "/"

    def _scope_from_src_path(self, src_path: str) -> str:
        parts = src_path.split("/")
        language = parts[0]
        page_parts = parts[1:]
        if not page_parts:
            return self._scope_from_parts(language, [])

        filename = page_parts[-1]
        if filename.lower() == "index.md":
            return self._scope_from_parts(language, page_parts[:-1])

        stem = PurePosixPath(filename).stem
        return self._scope_from_parts(language, [*page_parts[:-1], stem])

    def _languages_from_config(self, config) -> Set[str]:
        alternates = (config.get("extra", {}) or {}).get("alternate", [])
        return {alt.get("lang") for alt in alternates if alt.get("lang")}

    def _build_index_directories(self, docs_dir: Path) -> Dict[str, Set[Tuple[str, ...]]]:
        index_dirs: Dict[str, Set[Tuple[str, ...]]] = defaultdict(set)
        for index_file in docs_dir.rglob("index.md"):
            rel_path = index_file.relative_to(docs_dir).as_posix()
            parts = rel_path.split("/")
            if len(parts) < 2:
                continue
            language = parts[0]
            if language not in self._languages:
                continue
            index_dirs[language].add(tuple(parts[1:-1]))
        return index_dirs

    def _compute_manual_scope(self, src_path: str, index_dirs: Dict[str, Set[Tuple[str, ...]]]) -> str:
        parts = src_path.split("/")
        language = parts[0]
        page_parts = parts[1:]
        if not page_parts:
            return self._scope_from_parts(language, [])

        filename = page_parts[-1]
        directory_parts = page_parts[:-1]

        candidates = []
        if filename.lower() == "index.md":
            candidates.append(tuple(directory_parts))
        for depth in range(len(directory_parts), 0, -1):
            candidates.append(tuple(directory_parts[:depth]))

        seen = set()
        for candidate in candidates:
            if not candidate or candidate in seen:
                continue
            seen.add(candidate)
            if candidate in index_dirs.get(language, set()):
                return self._scope_from_parts(language, candidate)

        return self._scope_from_src_path(src_path)

    def _scope_parts_without_language(self, scope: str, language: str) -> Tuple[str, ...]:
        trimmed = scope.strip("/")
        if not trimmed:
            return tuple()
        parts = trimmed.split("/")
        if not parts:
            return tuple()
        if parts[0] == language:
            return tuple(parts[1:])
        return tuple(parts)

    def _initialize(self, config):
        if self._initialized:
            return

        docs_dir = Path(config["docs_dir"])
        self._languages = self._languages_from_config(config)
        index_dirs = self._build_index_directories(docs_dir)

        source_pages = []
        for source_file in docs_dir.rglob("*.md"):
            src_path = source_file.relative_to(docs_dir).as_posix()
            parts = src_path.split("/")
            if len(parts) < 2:
                continue
            language = parts[0]
            if language not in self._languages:
                continue
            source_pages.append(src_path)

        for src_path in source_pages:
            self._manual_scope_by_src[src_path] = self._compute_manual_scope(src_path, index_dirs)

        manual_counts: Dict[Tuple[str, Tuple[str, ...]], Set[str]] = defaultdict(set)
        for src_path, manual_scope in self._manual_scope_by_src.items():
            language = src_path.split("/")[0]
            manual_parts = self._scope_parts_without_language(manual_scope, language)
            for depth in range(1, len(manual_parts)):
                ancestor = manual_parts[:depth]
                manual_counts[(language, ancestor)].add(manual_scope)

        for src_path, manual_scope in self._manual_scope_by_src.items():
            language = src_path.split("/")[0]
            manual_parts = self._scope_parts_without_language(manual_scope, language)
            subcategory_scope = self._scope_from_parts(language, [])

            for depth in range(len(manual_parts) - 1, 0, -1):
                ancestor = manual_parts[:depth]
                if depth == 1 or len(manual_counts[(language, ancestor)]) > 1:
                    subcategory_scope = self._scope_from_parts(language, ancestor)
                    break

            self._subcategory_scope_by_src[src_path] = subcategory_scope

        self._initialized = True

    def get_scopes(self, page, config) -> Optional[Dict[str, str]]:
        if not page or not getattr(page, "file", None):
            return None

        src_path = page.file.src_path
        parts = src_path.split("/")
        if len(parts) < 2:
            return None

        language = parts[0]
        self._initialize(config)
        if language not in self._languages:
            return None

        return {
            "language": language,
            "manual": self._manual_scope_by_src.get(src_path, self._scope_from_src_path(src_path)),
            "subcategory": self._subcategory_scope_by_src.get(src_path, self._scope_from_parts(language, [])),
        }


_SCOPE_RESOLVER = SearchScopeResolver()


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


def _build_scope_marker(scopes: Dict[str, str]) -> str:
    filter_value = (
        "lang[data-language-scope],"
        "manual[data-manual-scope],"
        "subcategory[data-subcategory-scope]"
    )
    attributes = {
        "class": "pagefind-scope-marker",
        "hidden": "hidden",
        "aria-hidden": "true",
        "data-pagefind-filter": filter_value,
        "data-language-scope": scopes["language"],
        "data-manual-scope": scopes["manual"],
        "data-subcategory-scope": scopes["subcategory"],
    }
    serialized = " ".join(
        f'{name}="{html.escape(value, quote=True)}"' for name, value in attributes.items()
    )
    return f"<div {serialized}></div>"


def on_page_content(html_content: str, page, config, files):
    scopes = _SCOPE_RESOLVER.get_scopes(page, config)
    if not scopes:
        return html_content

    if "pagefind-scope-marker" in html_content:
        return html_content

    return html_content + _build_scope_marker(scopes)


def _run_pagefind_index(site_dir: Path) -> bool:
    npx_path = shutil.which("npx")
    if not npx_path:
        LOGGER.warning("Skipping Pagefind indexing: 'npx' is not available in PATH.")
        return False

    command = [npx_path, "-y", "pagefind", "--site", str(site_dir)]
    completed = subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        output = (completed.stdout or completed.stderr or "").strip()
        LOGGER.warning("Pagefind indexing failed for '%s': %s", site_dir, output or "unknown error")
        return False

    LOGGER.info("Pagefind index generated for '%s'.", site_dir)
    return True


@mkdocs_plugins.event_priority(-101)
def on_post_build(config):
    i18n_plugin = config.plugins.get("i18n")
    if i18n_plugin and getattr(i18n_plugin, "building", False):
        return

    if os.environ.get("MKDOCS_PAGEFIND_AUTOINDEX", "1").strip() in {"0", "false", "False"}:
        LOGGER.info("Skipping Pagefind indexing: MKDOCS_PAGEFIND_AUTOINDEX disabled.")
        return

    site_dir = Path(config.get("site_dir", "site"))
    if not site_dir.exists():
        LOGGER.warning("Skipping Pagefind indexing: site directory does not exist: %s", site_dir)
        return

    _run_pagefind_index(site_dir)
