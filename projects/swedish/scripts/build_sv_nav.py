#!/usr/bin/env python3
"""Rebuild the Swedish nav in mkdocs.yml from the English one.

Takes the English locale's nav, translates the section and page labels (LABELS below), keeps
only pages that exist under docs/sv, drops sections left empty, and writes the result as the
sv locale's nav. Run after each batch of translated pages. Labels missing from LABELS are kept
as they are (product names) and listed, so a new English nav entry is noticed.

Usage: build_sv_nav.py [--write]
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
MKDOCS = REPO / "mkdocs.yml"

LABELS = {
    "Communicators": "Larmsändare",
    "Quick setup (GT, GT+, GET)": "Snabbinstallation (GT, GT+, GET)",
    "Universal TIP/RING connection": "Universell TIP/RING-anslutning",
    "Cellular": "Mobilnät",
    "For Fire Panels": "För brandlarmcentraler",
    "E16 quick setup": "Snabbinstallation E16",
    "E16T quick setup": "Snabbinstallation E16T",
    "Control Panels": "Centralapparater",
    "FLEXi SP3 manual": "Manual för FLEXi SP3",
    "Using Protegus and Paradox keypads": "Använda knappsatser från Protegus och Paradox",
    "Adding S8/S9 wireless sensors": "Lägga till trådlösa detektorer S8/S9",
    "Paradox wireless devices (RTX3)": "Trådlösa enheter från Paradox (RTX3)",
    "Gate Controllers": "Styrenheter för portar",
    "GATOR LTE / GATOR WiFi with iO4R": "GATOR LTE / GATOR WiFi med iO4R",
    "Keypads": "Knappsatser",
    "Keypad SK-LCD Button": "Knappsats SK-LCD Button",
    "Keypad SK-LED Button": "Knappsats SK-LED Button",
    "Keypad SK-LCD TouchPad": "Knappsats SK-LCD TouchPad",
    "Keypad SK-LED TouchPad": "Knappsats SK-LED TouchPad",
    "Keypad FLEXi SK LCD": "Knappsats FLEXi SK LCD",
    "Keypad FLEXi SK LED": "Knappsats FLEXi SK LED",
    "Expanders": "Utbyggnadsmoduler",
    "Transceivers": "Radiotransceivrar",
    "Receivers": "Mottagare",
    "Overview": "Översikt",
    "RL25 hardware receiver": "Hårdvarumottagare RL25",
    "Access and login": "Åtkomst och inloggning",
    "User interface": "Användargränssnitt",
    "Logs": "Loggar",
    "General": "Allmänt",
    "Internal events": "Interna händelser",
    "Outputs": "Utgångar",
    "Users": "Användare",
    "Incoming events": "Inkommande händelser",
    "Objects": "Objekt",
    "Glossary": "Ordlista",
    "Networking and Firewall": "Nätverk och brandvägg",
    "Legacy IP - RL14": "Äldre IP-mottagare RL14",
    "Landline RTH2": "Telelinje RTH2",
}
# Labels that are names and stay as they are.
KEEP = {
    "Home", "Ethernet", "Radio", "Status", "IPcom", "FLEXi SP3", "CG17", "GATOR", "GATOR WiFi",
    "GT", "GT+", "GET", "G16", "G16T", "FireCom", "G17F", "E16", "E16T", "T16", "iO-8", "iO-LORA",
    "iO8-LoRa", "PB-LoRa", "RF-LoRa", "RF-S8", "RFH11", "R11", "RR-IP12", "Paradox SP(+)/MG(+)",
    "DSC PowerSeries Neo", "DSC PowerSeries", "Honeywell Vista", "Interlogix NX-4v2 / NX-6v2",
    "Interlogix NX-8v2", "Texecom", "Innerrange Inception", "Innerrange Integriti",
}
# "Receivers" is both a section and an IPcom screen; the screen keeps the same Swedish word.

LINE_RE = re.compile(r"^(\s*)- (.+?):(?: (.+))?$")


def locale_nav(text: str, locale: str) -> tuple[int, int]:
    """Return (start, end) line indexes of the nav items for a locale (lines after 'nav:')."""
    lines = text.split("\n")
    start = next(i for i, l in enumerate(lines) if l.strip() == f"- locale: {locale}")
    nav = next(i for i in range(start, len(lines)) if lines[i].strip() == "nav:")
    end = nav + 1
    while end < len(lines) and (lines[end].startswith("      -") or lines[end].startswith("        ")):
        end += 1
    return nav + 1, end


def main(argv: list[str]) -> int:
    text = MKDOCS.read_text(encoding="utf-8")
    lines = text.split("\n")
    s, e = locale_nav(text, "en")
    items = []
    unknown = set()
    for line in lines[s:e]:
        m = LINE_RE.match(line)
        if not m:
            continue
        indent, label, path = m.group(1), m.group(2), m.group(3)
        sv_label = LABELS.get(label, label)
        if label not in LABELS and label not in KEEP:
            unknown.add(label)
        items.append([len(indent), sv_label, path])

    # Keep leaves whose Swedish page exists; keep sections that end up with children.
    keep = [False] * len(items)
    for i, (ind, _, path) in enumerate(items):
        if path:
            keep[i] = (REPO / "docs" / "sv" / path).exists()
    for i in range(len(items) - 1, -1, -1):
        ind, _, path = items[i]
        if path is None:
            j = i + 1
            while j < len(items) and items[j][0] > ind:
                if keep[j]:
                    keep[i] = True
                    break
                j += 1

    out = []
    for k, (ind, label, path) in zip(keep, items):
        if k:
            out.append(" " * ind + f"- {label}:" + (f" {path}" if path else ""))

    ss, se = locale_nav(text, "sv")
    new_lines = lines[:ss] + out + lines[se:]
    if "--write" in argv:
        MKDOCS.write_text("\n".join(new_lines), encoding="utf-8")
    pages = sum(1 for k, it in zip(keep, items) if k and it[2])
    missing = [it[2] for k, it in zip(keep, items) if it[2] and not k]
    print(f"sv nav: {pages} pages" + (" (written)" if "--write" in argv else " (dry run)"))
    for m in missing:
        print(f"  not yet in Swedish: {m}")
    for u in sorted(unknown):
        print(f"  label not in LABELS (kept as is): {u}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
