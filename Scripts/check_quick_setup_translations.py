#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
GLOSSARY = json.loads((ROOT / "Scripts/quick_setup_glossary.json").read_text(encoding="utf-8"))

GENERIC_GT_FILE = "alarm-communicators/cellular/quick-setup/generic-dial-capture/index.md"

GT_EN_FILES = [
    GENERIC_GT_FILE,
    "alarm-communicators/cellular/quick-setup/paradox/index.md",
    "alarm-communicators/cellular/quick-setup/dsc neo hs/GT+ NEO HS2016 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/dsc pc/GT+ DSC PC585 2026 01 06.md",
    "alarm-communicators/cellular/quick-setup/honeywell vista/GT+ Honeywell vista 48 ENG 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/interlogix nx-4v2 nx-6v2/GT+ Interlogix NX-4V2 NX-6V2 ENG 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/interlogix nx-8v2/GT+ Interlogix NX-8V2 2026 01 07.md",
]

ETHERNET_E16_FILES = {
    "dsc-pc585": "alarm-communicators/ethernet/quick-setup/e16/dsc-pc585/index.md",
    "paradox": "alarm-communicators/ethernet/quick-setup/e16/paradox/index.md",
    "honeywell-vista": "alarm-communicators/ethernet/quick-setup/e16/honeywell-vista/index.md",
    "interlogix-nx-4v2-nx-6v2": "alarm-communicators/ethernet/quick-setup/e16/interlogix-nx-4v2-nx-6v2/index.md",
    "interlogix-nx-8v2": "alarm-communicators/ethernet/quick-setup/e16/interlogix-nx-8v2/index.md",
    "texecom": "alarm-communicators/ethernet/quick-setup/e16/texecom/index.md",
    "innerrange-inception": "alarm-communicators/ethernet/quick-setup/e16/innerrange-inception/index.md",
    "innerrange-integriti": "alarm-communicators/ethernet/quick-setup/e16/innerrange-integriti/index.md",
}

ETHERNET_E16T_FILE = "alarm-communicators/ethernet/quick-setup/e16t/index.md"

E16_IMAGES = {
    "dsc-pc585": "dsc.webp",
    "paradox": "paradox.webp",
    "honeywell-vista": "honeywell.webp",
    "interlogix-nx-4v2-nx-6v2": "caddx.webp",
    "interlogix-nx-8v2": "caddx.webp",
    "texecom": "texecom.webp",
    "innerrange-inception": "innerrange-inception.webp",
    "innerrange-integriti": "innerrange-integriti.webp",
}

LANG_RULES = {
    "lt": {"quick_setup_phrase": "greitas paruošimas"},
    "es": {"quick_setup_phrase": "configuración rápida"},
    "ru": {"quick_setup_phrase": "быстрая настройка"},
}


def fail(message: str) -> None:
    raise SystemExit(message)


def read(rel_path: str, lang: str) -> tuple[Path, str]:
    path = DOCS / lang / rel_path
    if not path.exists():
        fail(f"Missing translation: {path}")
    return path, path.read_text(encoding="utf-8")


def ensure(text: str, needle: str, path: Path) -> None:
    if needle not in text:
        fail(f"Missing {needle!r} in {path}")


def forbid(text: str, needle: str, path: Path) -> None:
    if needle in text:
        fail(f"Unexpected English text {needle!r} in {path}")


def first_line(text: str, path: Path) -> str:
    line = text.splitlines()[0].strip() if text.splitlines() else ""
    if not line.startswith("# "):
        fail(f"Missing H1 in {path}")
    return line


def check_gt(lang: str) -> None:
    glossary = GLOSSARY[lang]
    for rel_path in GT_EN_FILES:
        path, content = read(rel_path, lang)
        title = first_line(content, path)
        if rel_path == GENERIC_GT_FILE:
            if title != f"# {glossary['generic_tipring_title']}":
                fail(f"Unexpected generic TIP/RING title in {path}: {title}")
        else:
            if "quick setup" in title.lower():
                fail(f"Untranslated title in {path}")
            ensure(title, glossary["quick_setup_suffix_gt"], path)
        ensure(content, f"## {glossary['prerequisites']}", path)
        forbid(content, "## Prerequisites", path)
        forbid(content, "Short wiring and programming steps", path)
        ensure(content, "!!! caution", path)
        ensure(content, "!!! tip", path)
        ensure(content, "Protegus2", path)


def check_e16(lang: str) -> None:
    glossary = GLOSSARY[lang]
    for slug, rel_path in ETHERNET_E16_FILES.items():
        path, content = read(rel_path, lang)
        title = first_line(content, path)
        if "quick setup" in title.lower():
            fail(f"Untranslated title in {path}")
        ensure(title, glossary["quick_setup_suffix_e16"], path)
        ensure(content, f"## {glossary['prerequisites']}", path)
        ensure(content, f"## {glossary['wiring']}", path)
        ensure(content, f"## {glossary['panel_programming']}", path)
        ensure(content, f"## {glossary['add_system_protegus2']}", path)
        ensure(content, f"## {glossary['system_check']}", path)
        ensure(content, f"## {glossary['quick_configuration_trikdisconfig']}", path)
        ensure(content, f"### {glossary['settings_protegus2']}", path)
        ensure(content, f"### {glossary['settings_cms']}", path)
        forbid(content, "## Prerequisites", path)
        forbid(content, "## Wiring", path)
        forbid(content, "## Panel programming", path)
        forbid(content, "## System check", path)
        forbid(content, "## Quick configuration with *TrikdisConfig* software", path)
        ensure(content, "Protegus2", path)
        ensure(content, "MAC / Unique ID", path)

        image_name = E16_IMAGES[slug]
        ensure(content, f'../images/{image_name}', path)
        if not (path.parent.parent / "images" / image_name).exists():
            fail(f"Missing locale wiring image {(path.parent.parent / 'images' / image_name)}")


def check_e16t(lang: str) -> None:
    glossary = GLOSSARY[lang]
    path, content = read(ETHERNET_E16T_FILE, lang)
    title = first_line(content, path)
    if title != f"# {glossary['quick_setup_title_e16t']}":
        fail(f"Unexpected E16T title in {path}: {title}")
    ensure(content, f"## {glossary['prerequisites']}", path)
    ensure(content, f"## {glossary['wiring']}", path)
    ensure(content, f"## {glossary['panel_programming']}", path)
    ensure(content, f"## {glossary['special_settings_honeywell_vista']}", path)
    ensure(content, f"## {glossary['add_system_protegus']}", path)
    ensure(content, f"## {glossary['system_check']}", path)
    ensure(content, f"## {glossary['quick_configuration_trikdisconfig']}", path)
    ensure(content, f"### {glossary['settings_protegus']}", path)
    ensure(content, f"### {glossary['settings_cms']}", path)
    forbid(content, "## Prerequisites", path)
    forbid(content, "## Wiring", path)
    forbid(content, "## Panel programming", path)
    forbid(content, "## Quick configuration with *TrikdisConfig* software", path)
    ensure(content, "../../../cellular/quick-setup/paradox/protegus-enter-imei.webp", path)
    ensure(content, "Protegus", path)
    ensure(content, "MAC / Unique ID", path)


def main() -> int:
    for lang in LANG_RULES:
        check_gt(lang)
        check_e16(lang)
        check_e16t(lang)
    print("Quick-setup translation checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
