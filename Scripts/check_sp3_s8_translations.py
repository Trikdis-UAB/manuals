#!/usr/bin/env python3
"""Validate the localized copies of the SP3 S8/S9 wireless sensor guide."""

from __future__ import annotations

import argparse
from pathlib import Path
import re


IMAGE_RE = re.compile(r"!\[[^\]]*\]\(\./([^)]+)\)")
HEADING_RE = re.compile(r"^(#{1,6})\s+", re.MULTILINE)
ORDERED_ITEM_RE = re.compile(r"^\s*\d+\.\s+", re.MULTILINE)
TAB_RE = re.compile(r'^=== "(.+)"$', re.MULTILINE)
GUIDE = Path("control-panels/sp3/add-s8-sensors.md")
EXPECTED_TITLES = {
    "lt": "# S8/S9 belaidžių jutiklių pridėjimas prie FLEXi SP3",
    "es": "# Añadir sensores inalámbricos S8/S9 a FLEXi SP3",
    "ru": "# Добавление беспроводных датчиков S8/S9 к FLEXi SP3",
}
SCREENSHOT_LANGUAGE_NOTES = {
    "lt": "**Ekrano vaizdų kalba:**",
    "es": "**Idioma de las capturas:**",
    "ru": "**Язык скриншотов:**",
}
UNTRANSLATED_MARKERS = (
    "Pair S8 wireless sensors",
    "**Firmware requirement:**",
    "Before you start — prepare the sensors",
    "**Configure zone settings:**",
    "**Verify zone status:**",
    "#### Remote pairing",
    "#### Local pairing (no network)",
    "#### Remove a wireless sensor",
    "## LED reference — RF-S8 transceiver",
)
REQUIRED_TOKENS = ("SP3_xxx4_0122.fw", "EOL-T", "Read [F4]", "Write [F5]")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    return parser.parse_args()


def image_names(text: str) -> set[Path]:
    return {Path(match) for match in IMAGE_RE.findall(text)}


def count(pattern: re.Pattern[str], text: str) -> int:
    return len(pattern.findall(text))


def check_page(root: Path, locale: str, english: str) -> list[str]:
    page = root / "docs" / locale / GUIDE
    if not page.is_file():
        return [f"Missing translated guide: {page}"]

    text = page.read_text(encoding="utf-8")
    errors: list[str] = []
    h1_lines = [line for line in text.splitlines() if line.startswith("# ")]
    if h1_lines != [EXPECTED_TITLES[locale]]:
        errors.append(f"Unexpected H1: {h1_lines}")
    if count(HEADING_RE, text) != count(HEADING_RE, english):
        errors.append("Heading count differs from English")
    if count(ORDERED_ITEM_RE, text) != count(ORDERED_ITEM_RE, english):
        errors.append("Ordered-step count differs from English")
    if TAB_RE.findall(text) == TAB_RE.findall(english):
        errors.append("Tab titles were not localized")
    if len(TAB_RE.findall(text)) != len(TAB_RE.findall(english)):
        errors.append("Tab count differs from English")
    if image_names(text) != image_names(english):
        errors.append("Image references differ from English")
    for image in image_names(text):
        if not (page.parent / image).is_file():
            errors.append(f"Missing local image: {image}")
    for marker in UNTRANSLATED_MARKERS:
        if marker in text:
            errors.append(f"Untranslated English marker: {marker!r}")
    for token in REQUIRED_TOKENS:
        if token not in text:
            errors.append(f"Missing required procedure token: {token!r}")
    if SCREENSHOT_LANGUAGE_NOTES[locale] not in text:
        errors.append("Missing localized English-screenshot notice")
    return errors


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    english_page = root / "docs" / "en" / GUIDE
    english = english_page.read_text(encoding="utf-8")
    failures: list[str] = []

    for locale in EXPECTED_TITLES:
        errors = check_page(root, locale, english)
        if errors:
            failures.extend(f"{locale}: {error}" for error in errors)
        else:
            print(f"✓ {locale} SP3 S8/S9 guide passed")

    if failures:
        raise SystemExit("\n".join(failures))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
