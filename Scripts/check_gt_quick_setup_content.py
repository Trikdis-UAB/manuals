#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent

TEXECOM_FILE = (
    ROOT
    / "docs/en/alarm-communicators/cellular/quick-setup/texecom/GT+ Texecom ENG 2026 03 24.md"
)
INCEPTION_FILE = (
    ROOT
    / "docs/en/alarm-communicators/cellular/quick-setup/innerrange inception/GT+ Innerrange Inception ENG 2026 03 24.md"
)
INTEGRITI_FILE = (
    ROOT
    / "docs/en/alarm-communicators/cellular/quick-setup/innerrange integriti/GT+ Innerrange Integriti ENG 2026 03 24.md"
)
TRACKER_FILE = ROOT / "projects/AlarmCommunicators/gt-quick-setup-missing-screenshots.md"

COMMON_SCREEN_REFS = [
    "../../dsc pc/GT+ dsc pc585 1 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 2 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 3 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 7 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 8 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 9 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 10 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 11 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 12 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 13 ENG 2026 01 06.png",
    "../../dsc pc/GT+ dsc pc585 14 ENG 2026 01 06.png",
]


def require(text: str, needle: str, path: Path) -> None:
    if needle not in text:
        raise AssertionError(f"Missing {needle!r} in {path}")


def forbid(text: str, needle: str, path: Path) -> None:
    if needle in text:
        raise AssertionError(f"Unexpected {needle!r} in {path}")


def require_comment(text: str, marker: str, path: Path) -> None:
    require(text, f"<!-- MISSING-SCREENSHOT: {marker} -->", path)


def check_common(path: Path, title: str) -> str:
    text = path.read_text()
    require(text, title, path)
    require(text, "## Prerequisites", path)
    require(text, "## Wiring", path)
    require(text, "## Add system to Protegus2", path)
    require(text, "## System check", path)
    require(text, "Protegus2 company/installer account and communicator IMEI.", path)
    for ref in COMMON_SCREEN_REFS:
        require(text, ref, path)
    forbid(text, "[REVIEW:", path)
    forbid(text, "TODO", path)
    return text


def check_file_exists(relative_path: str) -> None:
    path = ROOT / relative_path
    if not path.is_file():
        raise AssertionError(f"Missing file {path}")


def check_texecom() -> None:
    text = check_common(TEXECOM_FILE, "# Texecom with GT/GT+/GET quick setup")
    require(text, "Texecom EX-CRP4 cable", TEXECOM_FILE)
    require(text, "Communication Options", TEXECOM_FILE)
    require(text, "UDL passcode", TEXECOM_FILE)
    require(
        text,
        '<img src="../GT+ Texecom prijungimo schema ENG 2026 03 24.png" alt="GT+ Texecom wiring diagram"',
        TEXECOM_FILE,
    )
    check_file_exists(
        "docs/en/alarm-communicators/cellular/quick-setup/texecom/GT+ Texecom prijungimo schema ENG 2026 03 24.png"
    )
    for marker in [
        "gt-texecom-programming",
        "gt-texecom-protegus-brand",
        "gt-texecom-protegus-model",
        "gt-texecom-protegus-object-module",
    ]:
        require_comment(text, marker, TEXECOM_FILE)


def check_inception() -> None:
    text = check_common(
        INCEPTION_FILE, "# Innerrange Inception with GT/GT+/GET quick setup"
    )
    require(text, "2.3.0.3507-r0", INCEPTION_FILE)
    require(text, "https://skytunnel.com.au/inception/SERIALNUMBER", INCEPTION_FILE)
    require(text, "Configuration > General > Alarm Reporting", INCEPTION_FILE)
    require(
        text,
        "![Innerrange Inception alarm reporting settings](../../gt-plus/image30.png)",
        INCEPTION_FILE,
    )
    require(
        text,
        '<img src="../GT+ Innerrange Inception prijungimo schema ENG 2026 03 24.png" alt="GT+ Innerrange Inception wiring diagram"',
        INCEPTION_FILE,
    )
    check_file_exists(
        "docs/en/alarm-communicators/cellular/quick-setup/innerrange inception/GT+ Innerrange Inception prijungimo schema ENG 2026 03 24.png"
    )
    for marker in [
        "gt-innerrange-inception-protegus-brand",
        "gt-innerrange-inception-protegus-model",
        "gt-innerrange-inception-protegus-object-module",
    ]:
        require_comment(text, marker, INCEPTION_FILE)


def check_integriti() -> None:
    text = check_common(
        INTEGRITI_FILE, "# Innerrange Integriti with GT/GT+/GET quick setup"
    )
    require(text, "19.1.0.36608", INTEGRITI_FILE)
    require(text, "19.1.0.15396", INTEGRITI_FILE)
    require(text, "Contact ID", INTEGRITI_FILE)
    require(text, "TTL Port-0", INTEGRITI_FILE)
    require(
        text,
        '<img src="../GT+ Innerrange Integriti prijungimo schema ENG 2026 03 24.png" alt="GT+ Innerrange Integriti wiring diagram"',
        INTEGRITI_FILE,
    )
    check_file_exists(
        "docs/en/alarm-communicators/cellular/quick-setup/innerrange integriti/GT+ Innerrange Integriti prijungimo schema ENG 2026 03 24.png"
    )
    for marker in [
        "gt-innerrange-integriti-programming",
        "gt-innerrange-integriti-protegus-brand",
        "gt-innerrange-integriti-protegus-model",
        "gt-innerrange-integriti-protegus-object-module",
    ]:
        require_comment(text, marker, INTEGRITI_FILE)


def check_tracker() -> None:
    text = TRACKER_FILE.read_text()
    for marker in [
        "gt-texecom-programming",
        "gt-texecom-protegus-brand",
        "gt-texecom-protegus-model",
        "gt-texecom-protegus-object-module",
        "gt-innerrange-inception-protegus-brand",
        "gt-innerrange-inception-protegus-model",
        "gt-innerrange-inception-protegus-object-module",
        "gt-innerrange-integriti-programming",
        "gt-innerrange-integriti-protegus-brand",
        "gt-innerrange-integriti-protegus-model",
        "gt-innerrange-integriti-protegus-object-module",
    ]:
        require(text, f"`{marker}`", TRACKER_FILE)


def main() -> int:
    check_texecom()
    check_inception()
    check_integriti()
    check_tracker()
    print("GT/GT+/GET quick-setup pages and screenshot markers look correct.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(1)
