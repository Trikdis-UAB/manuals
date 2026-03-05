#!/usr/bin/env python3
"""Validate Pagefind scope markers in built MkDocs HTML pages."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Dict, List

MARKER_RE = re.compile(r"<div[^>]*pagefind-scope-marker[^>]*>", re.IGNORECASE)
ATTR_RE = re.compile(
    r"([a-zA-Z0-9:_-]+)(?:=(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+)))?",
    re.IGNORECASE,
)

SUPPORTED_LANGS = {"en", "lt", "es", "ru"}
REQUIRED_ATTRS = {
    "data-pagefind-filter",
    "data-language-scope",
    "data-manual-scope",
    "data-subcategory-scope",
}
EXPECTED_FILTER_EXPR = (
    "lang[data-language-scope],"
    "manual[data-manual-scope],"
    "subcategory[data-subcategory-scope]"
)


def parse_attrs(tag: str) -> Dict[str, str]:
    attrs: Dict[str, str] = {}
    for match in ATTR_RE.findall(tag):
        name = match[0]
        value = match[1] or match[2] or match[3] or ""
        attrs[name] = value
    return attrs


def normalize(path: str) -> str:
    value = path.strip()
    if not value.startswith("/"):
        value = "/" + value
    if not value.endswith("/"):
        value += "/"
    return value


def validate_marker(page: Path, attrs: Dict[str, str], errors: List[str]) -> None:
    missing = REQUIRED_ATTRS.difference(attrs)
    if missing:
        errors.append(f"{page}: missing required attributes: {sorted(missing)}")
        return

    rel = page.as_posix()
    lang = rel.split("/", 1)[0]
    language_scope = attrs["data-language-scope"]
    manual_scope = normalize(attrs["data-manual-scope"])
    subcategory_scope = normalize(attrs["data-subcategory-scope"])

    if language_scope != lang:
        errors.append(
            f"{page}: data-language-scope '{language_scope}' does not match page language '{lang}'"
        )

    expected_lang_prefix = f"/{lang}/"
    if not manual_scope.startswith(expected_lang_prefix):
        errors.append(f"{page}: manual scope '{manual_scope}' is outside language prefix '{expected_lang_prefix}'")
    if not subcategory_scope.startswith(expected_lang_prefix):
        errors.append(
            f"{page}: subcategory scope '{subcategory_scope}' is outside language prefix '{expected_lang_prefix}'"
        )
    if not manual_scope.startswith(subcategory_scope):
        errors.append(
            f"{page}: manual scope '{manual_scope}' is not nested in subcategory '{subcategory_scope}'"
        )

    if attrs["data-pagefind-filter"] != EXPECTED_FILTER_EXPR:
        errors.append(
            f"{page}: unexpected data-pagefind-filter expression "
            f"'{attrs['data-pagefind-filter']}'"
        )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-dir", default="site", help="Built site directory path (default: site)")
    args = parser.parse_args()

    site_dir = Path(args.site_dir)
    if not site_dir.exists():
        print(f"Site directory not found: {site_dir}", file=sys.stderr)
        return 2

    html_files = sorted(site_dir.rglob("*.html"))
    errors: List[str] = []
    checked = 0

    for html_file in html_files:
        rel = html_file.relative_to(site_dir)
        parts = rel.parts
        if not parts:
            continue

        lang = parts[0]
        if lang not in SUPPORTED_LANGS:
            continue

        checked += 1
        content = html_file.read_text(encoding="utf-8")
        match = MARKER_RE.search(content)
        if not match:
            errors.append(f"{rel}: missing pagefind-scope-marker element")
            continue

        attrs = parse_attrs(match.group(0))
        validate_marker(rel, attrs, errors)

    if checked == 0:
        print("No language HTML pages were checked.", file=sys.stderr)
        return 2

    if errors:
        print("Search scope validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Search scope validation passed for {checked} HTML pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
