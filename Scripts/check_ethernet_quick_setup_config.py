#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent

E16_FILES = [
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/dsc-pc585/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/paradox/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/honeywell-vista/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/interlogix-nx-4v2-nx-6v2/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/interlogix-nx-8v2/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/texecom/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/innerrange-inception/index.md",
    ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16/innerrange-integriti/index.md",
]

E16T_FILE = ROOT / "docs/en/alarm-communicators/ethernet/quick-setup/e16t/index.md"


def require(text: str, needle: str, path: Path) -> None:
    if needle not in text:
        raise AssertionError(f"Missing {needle!r} in {path}")


def forbid(text: str, needle: str, path: Path) -> None:
    if needle in text:
        raise AssertionError(f"Unexpected {needle!r} in {path}")


def check_e16(path: Path) -> None:
    text = path.read_text()
    require(text, "## Quick configuration with *TrikdisConfig* software", path)
    require(text, "### Settings for connection with Protegus2 app", path)
    require(text, "### Settings for connection with Central Monitoring Station", path)
    require(text, "![E16 system settings](../../../../e16/image7.png)", path)
    require(text, "![E16 Protegus Cloud settings](../../../../e16/image8.png)", path)
    require(text, "![E16 CMS system settings](../../../../e16/image9.png)", path)
    require(text, "![E16 CMS reporting settings](../../../../e16/image10.png)", path)
    require(text, "## Wiring", path)
    forbid(text, "## Configure E16 in TrikdisConfig", path)

    wiring_images = {
        "dsc-pc585": ('<img alt="E16 DSC panel connection diagram" src="../images/dsc.png" style="width:5.2in;max-width:100%;height:auto;" />', "dsc.png"),
        "paradox": ('<img alt="E16 Paradox panel connection diagram" src="../images/paradox.png" style="width:5.2in;max-width:100%;height:auto;" />', "paradox.png"),
        "honeywell-vista": ('<img alt="E16 Honeywell panel connection diagram" src="../images/honeywell.png" style="width:5.2in;max-width:100%;height:auto;" />', "honeywell.png"),
        "interlogix-nx-4v2-nx-6v2": ('<img alt="E16 Interlogix panel connection diagram" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />', "caddx.png"),
        "interlogix-nx-8v2": ('<img alt="E16 Interlogix panel connection diagram" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />', "caddx.png"),
        "texecom": ('<img alt="E16 Texecom panel connection diagram" src="../images/texecom.png" style="width:5.2in;max-width:100%;height:auto;" />', "texecom.png"),
        "innerrange-inception": ('<img alt="E16 Innerrange Inception panel connection diagram" src="../images/innerrange-inception.png" style="width:5.2in;max-width:100%;height:auto;" />', "innerrange-inception.png"),
        "innerrange-integriti": ('<img alt="E16 Innerrange Integriti panel connection diagram" src="../images/innerrange-integriti.png" style="width:5.2in;max-width:100%;height:auto;" />', "innerrange-integriti.png"),
    }
    markdown_ref, image_name = wiring_images[path.parent.name]
    require(text, markdown_ref, path)
    image_path = path.parent.parent / "images" / image_name
    if not image_path.is_file():
        raise AssertionError(f"Missing wiring image file {image_path}")

    if path.parent.name == "texecom":
        require(text, "Texecom EX-CRP4 cable", path)
        require(text, "Communication Options", path)
        require(text, "UDL passcode", path)
    elif path.parent.name == "innerrange-inception":
        require(text, "skytunnel.com.au/inception/SERIALNUMBER", path)
        require(text, "Configuration > General > Alarm Reporting", path)
        require(text, "![Innerrange Inception alarm reporting settings](../../../../e16/image21.png)", path)
    elif path.parent.name == "innerrange-integriti":
        require(text, "TTL Port-0", path)
        require(text, "Contact ID", path)
        require(text, "19.1.0.15396", path)
        forbid(text, "skytunnel.com.au/inception/SERIALNUMBER", path)


def check_e16t(path: Path) -> None:
    text = path.read_text()
    require(text, "## Quick configuration with *TrikdisConfig* software", path)
    require(text, "### Settings for connection with Protegus app", path)
    require(text, "### Settings for connection with Central Monitoring Station", path)
    require(text, "![E16T system settings](../../../e16t/image6.png)", path)
    require(text, "![E16T Protegus settings](../../../e16t/image7.png)", path)
    require(text, "![E16T CMS system settings](../../../e16t/image8.png)", path)
    require(text, "![E16T CMS reporting settings](../../../e16t/image9.png)", path)
    require(text, "![E16T Protegus service settings](../../../e16t/image10.png)", path)
    require(text, "## Wiring", path)
    require(text, "![Protegus add system screen](../../../cellular/quick-setup/paradox/protegus-enter-imei.png)", path)
    forbid(text, "## Configure E16T in TrikdisConfig", path)


def main() -> int:
    for path in E16_FILES:
        check_e16(path)
    check_e16t(E16T_FILE)
    print("Ethernet quick-setup TrikdisConfig sections look correct.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(1)
