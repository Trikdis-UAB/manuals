#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
REL_PAGE = "alarm-communicators/cellular/quick-setup/generic-dial-capture/index.md"
LANGS = ("en", "lt", "es", "ru")
SHARED_DIAGRAM = ROOT / "docs/images/quick-setup/generic-dial-capture.svg"
NAV_PATH = "alarm-communicators/cellular/quick-setup/generic-dial-capture/index.md"


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
    require(text, "../../../../../images/quick-setup/generic-dial-capture.svg", path)
    require(text, "../dsc neo hs/GT+ neo hs2016 4 ENG 2026 01 02.webp", path)
    require(text, "../dsc neo hs/GT+ neo hs2016 14 ENG 2026 01 02.webp", path)
    require(text, "TIP", path)
    require(text, "RING", path)
    require(text, "Contact ID", path)
    require(text, "Object ID", path)
    require(text, "Protegus2", path)
    require(text, "- [ ]", path)

    if lang == "en":
        for needle in REQUIRED_EN:
            require(text, needle, path)
        for needle in FORBIDDEN_PANEL_CODES:
            forbid(text, needle, path)


def main() -> int:
    if not SHARED_DIAGRAM.is_file():
        raise AssertionError(f"Missing shared diagram {SHARED_DIAGRAM.relative_to(ROOT)}")

    for lang in LANGS:
        check_page(lang)

    mkdocs_text = (ROOT / "mkdocs.yml").read_text(encoding="utf-8")
    if mkdocs_text.count(NAV_PATH) != len(LANGS):
        raise AssertionError(f"Expected {NAV_PATH!r} once per locale in mkdocs.yml")
    require(mkdocs_text, "pymdownx.tasklist", ROOT / "mkdocs.yml")
    require(mkdocs_text, "clickable_checkbox: true", ROOT / "mkdocs.yml")

    nav_text = (ROOT / "docs/_NAVIGATION.md").read_text(encoding="utf-8")
    if nav_text.count("generic-dial-capture/index.md") != len(LANGS):
        raise AssertionError("Expected generic-dial-capture links once per locale in docs/_NAVIGATION.md")

    print("Generic dial-capture quick-setup page looks correct.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(str(exc))
        raise SystemExit(1)
