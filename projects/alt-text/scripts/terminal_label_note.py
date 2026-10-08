#!/usr/bin/env python3
"""Add a note under the GT, GT+ and GET panel wiring diagrams: the drawings say +DC/-DC and
A RS485/B RS485, but the communicator case is marked +12 VDC (GT+: +12/24 VDC) and A 485.
Checked 2026-10-08 against the case photos (image4.webp) and the trikdis.com product pages.
RU GT+ drawings already show +12/24 VDC, so its note covers only the RS485 names.
Idempotent: skips a page that already has the note. Keeps the file's line endings.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
MARK = "<!-- terminal-label-note -->"
TITLE = {"en": "Note", "lt": "Pastaba", "es": "Nota", "ru": "Примечание"}

def text(lang, volt, power=True):
    if lang == "en":
        p = f"**+DC** and **−DC** are the terminals marked **+{volt} VDC** and **−{volt} VDC** on the communicator, and "
        r = "**A RS485** / **B RS485** are the terminals marked **A 485** / **B 485**."
        return "In the diagrams below, " + (p + r if power else r)
    if lang == "lt":
        p = f"**+DC** ir **−DC** yra komunikatoriaus gnybtai, pažymėti **+{volt} VDC** ir **−{volt} VDC**, o "
        r = "**A RS485** / **B RS485** yra gnybtai, pažymėti **A 485** / **B 485**."
        return "Žemiau pateiktose schemose " + (p + r if power else r)
    if lang == "es":
        p = f"**+DC** y **−DC** son los terminales marcados **+{volt} VDC** y **−{volt} VDC** en el comunicador, y "
        r = "**A RS485** / **B RS485** son los terminales marcados **A 485** / **B 485**."
        return "En los diagramas siguientes, " + (p + r if power else r)
    p = f"**+DC** и **−DC** — это клеммы коммуникатора с маркировкой **+{volt} VDC** и **−{volt} VDC**, а "
    r = "**A RS485** / **B RS485** — клеммы с маркировкой **A 485** / **B 485**."
    return "На схемах ниже " + (p + r if power else r)

def main():
    changed = 0
    for model, volt in (("gt", "12"), ("gt-plus", "12/24"), ("get", "12")):
        for lang in ("en", "lt", "es", "ru"):
            page = ROOT / f"docs/{lang}/alarm-communicators/cellular/{model}/index.md"
            raw = page.read_bytes().decode("utf-8")
            if MARK in raw:
                print(f"skip (already has note): {page.relative_to(ROOT)}"); continue
            nl = "\r\n" if "\r\n" in raw else "\n"
            lines = raw.split(nl)
            first = next(i for i, l in enumerate(lines) if "wiring-dsc.webp" in l)
            h4 = max(i for i in range(first) if lines[i].startswith("#### "))
            power = not (model == "gt-plus" and lang == "ru")
            block = [MARK, "", f'!!! note "{TITLE[lang]}"', "    " + text(lang, volt, power), ""]
            lines[h4:h4] = block
            page.write_bytes(nl.join(lines).encode("utf-8"))
            changed += 1
            print(f"note added: {page.relative_to(ROOT)}")
    print(f"{changed} pages changed")

if __name__ == "__main__":
    sys.exit(main())
