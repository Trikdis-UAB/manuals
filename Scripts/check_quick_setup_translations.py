#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

EN_FILES = [
    "alarm-communicators/cellular/quick-setup/paradox/index.md",
    "alarm-communicators/cellular/quick-setup/dsc neo hs/GT+ NEO HS2016 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/dsc pc/GT+ DSC PC585 2026 01 06.md",
    "alarm-communicators/cellular/quick-setup/honeywell vista/GT+ Honeywell vista 48 ENG 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/interlogix nx-4v2 nx-6v2/GT+ Interlogix NX-4V2 NX-6V2 ENG 2026 01 07.md",
    "alarm-communicators/cellular/quick-setup/interlogix nx-8v2/GT+ Interlogix NX-8V2 2026 01 07.md",
]

LANG_RULES = {
    "lt": {
        "prereq_heading": "## Reikalavimai",
        "quick_setup_phrase": "greitas paruošimas",
    },
    "es": {
        "prereq_heading": "## Requisitos",
        "quick_setup_phrase": "configuración rápida",
    },
    "ru": {
        "prereq_heading": "## Требования",
        "quick_setup_phrase": "быстрая настройка",
    },
}


def fail(message: str) -> None:
    raise SystemExit(message)


for lang, rules in LANG_RULES.items():
    for rel_path in EN_FILES:
        path = DOCS / lang / rel_path
        if not path.exists():
            fail(f"Missing translation: {path}")
        content = path.read_text(encoding="utf-8")
        first_line = content.splitlines()[0].strip()
        if not first_line.startswith("# "):
            fail(f"Missing H1 in {path}")
        if "quick setup" in first_line.lower():
            fail(f"Untranslated title in {path}")
        if rules["quick_setup_phrase"] not in first_line.lower():
            fail(f"Expected quick-setup phrase missing in {path}")
        if rules["prereq_heading"] not in content:
            fail(f"Missing prerequisites heading in {path}")
        if "## Prerequisites" in content:
            fail(f"English prerequisites heading in {path}")
        if "Short wiring and programming steps" in content:
            fail(f"English intro text in {path}")
        if "!!! caution" not in content or "!!! tip" not in content:
            fail(f"Missing caution/tip callouts in {path}")
        if "Protegus2" not in content:
            fail(f"Missing Protegus2 reference in {path}")

print("Quick-setup translation checks passed.")
