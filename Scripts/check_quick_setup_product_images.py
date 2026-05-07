#!/usr/bin/env python3
"""Validate generated quick-setup product image blocks in a built MkDocs site."""

from __future__ import annotations

import argparse
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


class QuickSetupProductImageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._product_depth = 0
        self.images: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        product_id = attrs_dict.get("data-quick-setup-product")
        inside_product = self._product_depth > 0 or bool(product_id)

        if tag == "img" and inside_product:
            src = attrs_dict.get("src")
            if src:
                self.images.append(src)

        if product_id:
            self._product_depth += 1
        elif self._product_depth > 0 and tag not in VOID_TAGS:
            self._product_depth += 1

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        product_id = attrs_dict.get("data-quick-setup-product")
        if tag == "img" and (product_id or self._product_depth > 0):
            src = attrs_dict.get("src")
            if src:
                self.images.append(src)

    def handle_endtag(self, tag: str) -> None:
        if self._product_depth > 0 and tag not in VOID_TAGS:
            self._product_depth -= 1


def _site_path_for_src(site_dir: Path, html_path: Path, src: str) -> Path | None:
    if src.startswith("data:"):
        return None

    parsed = urlparse(src)
    path = unquote(parsed.path)
    if not path:
        return None

    if path.startswith("/"):
        return site_dir / path.lstrip("/")
    return (html_path.parent / path).resolve()


def check_site(site_dir: Path, require_blocks: bool) -> list[str]:
    errors: list[str] = []
    block_count = 0
    image_count = 0

    for html_path in sorted(site_dir.rglob("*.html")):
        parser = QuickSetupProductImageParser()
        parser.feed(html_path.read_text(encoding="utf-8"))
        if not parser.images:
            continue

        block_count += 1
        for src in parser.images:
            image_count += 1
            if not urlparse(src).path.endswith(".webp"):
                errors.append(f"{html_path}: quick-setup product image is not WebP: {src}")

            image_path = _site_path_for_src(site_dir, html_path, src)
            if image_path and not image_path.exists():
                errors.append(f"{html_path}: missing quick-setup product image: {src}")

    if require_blocks and block_count == 0:
        errors.append("No generated quick-setup product image blocks were found.")

    if not errors:
        print(
            f"Quick-setup product image check passed: {block_count} pages, {image_count} images."
        )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site-dir", default="site", help="Built MkDocs site directory.")
    parser.add_argument(
        "--require-blocks",
        action="store_true",
        help="Fail if no quick-setup product image blocks are present.",
    )
    args = parser.parse_args()

    site_dir = Path(args.site_dir).resolve()
    if not site_dir.is_dir():
        print(f"Site directory does not exist: {site_dir}", file=sys.stderr)
        return 1

    errors = check_site(site_dir, args.require_blocks)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
