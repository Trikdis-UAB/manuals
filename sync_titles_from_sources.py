#!/usr/bin/env python3
"""
Synchronise manual H1 titles with the product names defined in doc_sources.csv.

This keeps document content and navigation aligned with the canonical naming on docs.trikdis.com.
"""

from __future__ import annotations

import csv
from pathlib import Path

DOC_SOURCES = Path("/Users/local/projects/knowledgebase-conversion-pipeline/doc_sources.csv")
REPO_ROOT = Path(__file__).parent
DOCS_DIR = REPO_ROOT / "docs"

PRODUCT_CATEGORY_MAP = {
    "GT": "alarm-communicators",
    "GT_PLUS": "alarm-communicators",
    "GET": "alarm-communicators",
    "FIRECOM": "alarm-communicators",
    "E16": "alarm-communicators",
    "E16T": "alarm-communicators",
    "G16": "alarm-communicators",
    "G16T": "alarm-communicators",
    "G17F": "alarm-communicators",
    "T16": "alarm-communicators",
    "SP3": "control-panels",
    "CG17": "control-panels",
    "GATOR_CELL": "gate-controllers",
    "GATOR_WIFI": "gate-controllers",
}

PRODUCT_SLUG_MAP = {
    "GET": "dual-path/get",
    "GT": "cellular/gt",
    "GT_PLUS": "cellular/gt-plus",
    "FIRECOM": "fire-panels/firecom",
    "E16": "e16",
    "E16T": "e16t",
    "G16": "g16",
    "G16T": "g16t",
    "G17F": "fire-panels/g17f",
    "T16": "t16",
    "SP3": "sp3",
    "CG17": "cg17",
    "GATOR_CELL": "gator",
    "GATOR_WIFI": "gator-wifi",
}

LANGUAGE_DIRS = {
    "en": "en",
    "es": "es",
    "lt": "lt",
    "ru": "ru",
}


def set_first_heading(md_path: Path, new_title: str) -> bool:
    """Replace the first markdown heading with the desired title."""
    lines = md_path.read_text(encoding="utf-8").splitlines()
    for idx, line in enumerate(lines):
        if line.startswith("#"):
            desired = f"# {new_title}"
            if line.strip() == desired:
                return False
            lines[idx] = desired
            md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            return True
    return False


def main() -> None:
    if not DOC_SOURCES.exists():
        raise SystemExit(f"doc_sources.csv not found at {DOC_SOURCES}")

    changed: list[Path] = []

    with DOC_SOURCES.open("r", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            product_code = row.get("product_code", "").strip()
            product_name = row.get("product_name", "").strip()
            language = row.get("language", "").strip().lower()

            if not (product_code and product_name and language):
                continue

            category_slug = PRODUCT_CATEGORY_MAP.get(product_code)
            product_slug = PRODUCT_SLUG_MAP.get(product_code)
            lang_dir = LANGUAGE_DIRS.get(language)

            if not (category_slug and product_slug and lang_dir):
                continue

            md_path = DOCS_DIR / lang_dir / category_slug / product_slug / "index.md"
            if not md_path.exists():
                continue

            if set_first_heading(md_path, product_name):
                changed.append(md_path)

    if changed:
        print("Updated titles:")
        for path in changed:
            print(f" - {path.relative_to(REPO_ROOT)}")
    else:
        print("Titles already match doc_sources.csv")


if __name__ == "__main__":
    main()
