#!/usr/bin/env python3

from __future__ import annotations

import json
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
REL_PAGE = "alarm-communicators/cellular/quick-setup/generic-dial-capture/index.md"
LANGS = ("en", "lt", "es", "ru")
SHARED_DIAGRAM = ROOT / "docs/images/quick-setup/generic-dial-capture.svg"
NAV_PATH = "alarm-communicators/cellular/quick-setup/generic-dial-capture/index.md"
GLOSSARY = json.loads((ROOT / "Scripts/quick_setup_glossary.json").read_text(encoding="utf-8"))


REQUIRED_EN = (
    "previously reported through a landline dialer",
    "automatically captures the Contact ID events",
    "with any account ID sent by the panel",
    "Skip this section if the panel is already dialing through the landline dialer",
    "Enable the panel PSTN landline dialer",
    "Select tone / DTMF dialing",
    "Select the Contact ID reporting format",
    "If reporting to ARC/CMS is required",
    "no separate communicator Object ID is required for basic dial capture",
    "Program the zone connected to the communicator output as a keyswitch zone only when remote arm/disarm",
    "Choose <strong>AUTO</strong>",
    "Control with Protegus2",
    "If only event reporting is needed",
)

FORBIDDEN_PANEL_CODES = (
    "*85555",
    "001*",
    "066##",
    "301*",
    "Section 801",
    "*41",
    "*42",
)

GENERIC_TERM_KEYS = (
    "generic_tipring_title",
    "pstn_dialer",
    "dial_capture",
    "keyswitch_zone",
    "remote_arm_disarm",
    "account_id",
    "monitoring_station",
    "pulse",
    "level",
    "next",
    "add_new_system",
    "control_with_protegus2",
)

REQUIRED_DIAGRAM_TEXT = (
    "Panel auxiliary power and Contact ID TIP/RING signals go to the communicator.",
    "The communicator output controls a panel keyswitch zone.",
    "panel AUX power to communicator",
    "Contact ID from panel dialer to communicator",
    "arm/disarm command to panel zone",
    "common reference, if required",
)


def require(text: str, needle: str, path: Path) -> None:
    if needle not in text:
        raise AssertionError(f"Missing {needle!r} in {path.relative_to(ROOT)}")


def forbid(text: str, needle: str, path: Path) -> None:
    if needle in text:
        raise AssertionError(f"Unexpected panel-specific code {needle!r} in {path.relative_to(ROOT)}")


def check_page(lang: str) -> None:
    path = ROOT / "docs" / lang / REL_PAGE
    if not path.is_file():
        raise AssertionError(f"Missing page {path.relative_to(ROOT)}")

    text = path.read_text(encoding="utf-8")
    first = text.splitlines()[0].strip() if text.splitlines() else ""
    if first != f"# {GLOSSARY[lang]['generic_tipring_title']}":
        raise AssertionError(f"Unexpected H1 in {path.relative_to(ROOT)}: {first!r}")

    require(text, "../../../../../images/quick-setup/generic-dial-capture.svg", path)
    require(text, "../dsc neo hs/GT+ neo hs2016 4 ENG 2026 01 02.webp", path)
    require(text, "../dsc neo hs/GT+ neo hs2016 14 ENG 2026 01 02.webp", path)
    require(text, "TIP", path)
    require(text, "RING", path)
    require(text, "Contact ID", path)
    require(text, "Object ID", path)
    require(text, "Protegus2", path)
    require(text, "- [ ]", path)

    for key in GENERIC_TERM_KEYS:
        require(text, GLOSSARY[lang][key], path)

    if lang == "en":
        for needle in REQUIRED_EN:
            require(text, needle, path)
        for needle in FORBIDDEN_PANEL_CODES:
            forbid(text, needle, path)


def main() -> int:
    if not SHARED_DIAGRAM.is_file():
        raise AssertionError(f"Missing shared diagram {SHARED_DIAGRAM.relative_to(ROOT)}")

    ET.parse(SHARED_DIAGRAM)
    diagram_text = SHARED_DIAGRAM.read_text(encoding="utf-8")
    for needle in REQUIRED_DIAGRAM_TEXT:
        require(diagram_text, needle, SHARED_DIAGRAM)

    for lang in LANGS:
        check_page(lang)

    mkdocs_text = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
    if mkdocs_text.count(NAV_PATH) != len(LANGS):
        raise AssertionError(f"Expected {NAV_PATH!r} once per locale in mkdocs.yml")
    for lang in LANGS:
        require(mkdocs_text, GLOSSARY[lang]["generic_tipring_nav"], ROOT / "mkdocs.yml")
    require(mkdocs_text, "pymdownx.tasklist", ROOT / "mkdocs.yml")
    require(mkdocs_text, "clickable_checkbox: true", ROOT / "mkdocs.yml")

    nav_text = (ROOT / "docs/_NAVIGATION.md").read_text(encoding="utf-8")
    if nav_text.count("generic-dial-capture/index.md") != len(LANGS):
        raise AssertionError("Expected generic-dial-capture links once per locale in docs/_NAVIGATION.md")
    for lang in LANGS:
        require(nav_text, GLOSSARY[lang]["generic_tipring_nav"], ROOT / "docs/_NAVIGATION.md")

    print("Generic dial-capture quick-setup page looks correct.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(str(exc))
        raise SystemExit(1)
