#!/usr/bin/env python3
"""Copy the English SP3 S8/S9 guide assets into every translated guide folder."""

from __future__ import annotations

import argparse
import filecmp
from pathlib import Path
import re
import shutil


IMAGE_RE = re.compile(r"!\[[^\]]*\]\(\./([^)]+)\)")
LOCALES = ("lt", "es", "ru")
GUIDE = Path("control-panels/sp3/add-s8-sensors.md")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--check", action="store_true", help="Verify assets without copying them")
    return parser.parse_args()


def guide_images(path: Path) -> set[Path]:
    return {Path(match) for match in IMAGE_RE.findall(path.read_text(encoding="utf-8"))}


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    source_page = root / "docs" / "en" / GUIDE
    source_dir = source_page.parent
    images = guide_images(source_page)
    if not images:
        raise SystemExit(f"No local images found in {source_page}")

    for locale in LOCALES:
        target_page = root / "docs" / locale / GUIDE
        if not target_page.is_file():
            raise SystemExit(f"Missing translated guide: {target_page}")
        target_dir = target_page.parent
        if guide_images(target_page) != images:
            raise SystemExit(f"Image references differ in {target_page}")

        for image in images:
            source = source_dir / image
            target = target_dir / image
            if not source.is_file():
                raise SystemExit(f"Missing English source asset: {source}")
            if target.exists() and not filecmp.cmp(source, target, shallow=False):
                raise SystemExit(f"Refusing to overwrite different asset: {target}")
            if args.check:
                if not target.is_file():
                    raise SystemExit(f"Missing translated asset: {target}")
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists():
                shutil.copy2(source, target)
        print(f"✓ {locale}: {len(images)} assets {'verified' if args.check else 'synchronized'}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
