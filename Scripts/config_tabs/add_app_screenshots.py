#!/usr/bin/env python3
"""Add Protegus app phone screenshots to the GET manual's "Protegus app" tabs.

Masters come from tools/app-screenshots (released web.protegus.app with sample
data, firmware 1.35; see its out/manifest.json). This script converts them to
webp at 640 px wide into docs/<lang>/.../get/protegus-app/ and inserts each
image after the opening "In the Protegus app: ..." line of its tab.

Usage (repo root):
  python3 Scripts/config_tabs/add_app_screenshots.py --masters <out/en> --lang en
Idempotent: an image already referenced on the page is not inserted again.
"""
import argparse
import sys
from pathlib import Path

from PIL import Image

WIDTH = 640
PAGE = "docs/{lang}/alarm-communicators/cellular/get/index.md"
DEST = "docs/{lang}/alarm-communicators/cellular/get/protegus-app"

# (anchor line in the Protegus app tab, [(image, alt), ...] or a pair for two hardware variants)
PLACEMENTS = [
    ("2.  The first time, the app shows **Proceed with Caution**.", [
        ("get-advanced-intro-phone",
         "Protegus app, Advanced settings: 'Proceed with Caution' warning that these settings are for professionals only, "
         "with a 'Do not show this again.' checkbox and the 'Accept the risk and continue' button."),
    ]),
    ("The settings are grouped in the menu as **System options**", [
        ("get-menu-phone",
         "Protegus app, Advanced settings menu for GET: device card with Unique ID, serial number, boot and firmware 1.35 versions; "
         "Read and Write buttons; menu items System options, Panel settings, Reporting to CMS, User reporting, Network settings, "
         "IN/OUT and System events."),
    ]),
    ("Depending on the firmware and hardware version, **Account No.**", "pair", [
        ("get-systemoptions-general-x1x1-phone", "Hardware x1x1",
         "Protegus app, System options, System general on GET hardware x1x1 with firmware 1.35: only Time set (First channel); "
         "the account numbers are in the CMS settings."),
        ("get-systemoptions-general-x1x0-phone", "Hardware x1x0",
         "Protegus app, System options, System general on GET hardware x1x0: Account No. 561234, Device account No. 0123456789, "
         "Time set First channel."),
    ]),
    ("Depending on the firmware and hardware version, **Account No.**", [
        ("get-systemoptions-access-phone",
         "Protegus app, System options, Access: Administrator code and Installer code (masked), Only an administrator can restore on, "
         "and under Allow installer to change: Account number, CMS reporting, User reporting, SIM card and Event summary, all on."),
    ]),
    ("In the Protegus app: **Advanced settings → Panel settings → TLF**", [
        ("get-panel-tlf-phone",
         "Protegus app, Panel settings, TLF: Security panel model 2. AUTO, First HSK tone Dual Tone, Second HSK tone SIA FSK, "
         "Use security panel account ID off, Wait acknowledgment from CMS off, Dial tone enabled on, Dial tone frequency 425 Hz."),
        ("get-panel-serial-phone",
         "Protegus app, Panel settings, Serial Bus: Protocol CID, Security panel model 6. PARADOX SP+/MG+, Remote Arm/Disarm on, "
         "Event on but greyed out, PC download password (masked)."),
    ]),
    ("In the Protegus app: **Advanced settings → Reporting to CMS → CMS settings**, then **Primary channel**", [
        ("get-reporting-cms-phone",
         "Protegus app, Reporting to CMS, CMS settings: Primary channel, Backup channel, Parallel channel and Reporting mode."),
    ]),
    ("In the Protegus app: **Advanced settings → Reporting to CMS → CMS settings**, then **Primary channel**", "pair", [
        ("get-reporting-cms-primary-x1x1-phone", "Hardware x1x1",
         "Protegus app, Primary channel on GET hardware x1x1: Enabled on, Primary Account no. 561234, Communication type IP, "
         "Domain or IP receiver.example.com, Port 55555, TCP or UDP TCP/IP; Protocol TRK8 with TRK encryption key (masked)."),
        ("get-reporting-cms-primary-x1x0-phone", "Hardware x1x0",
         "Protegus app, Primary channel on GET hardware x1x0: Enabled on, Communication type IP, Domain or IP receiver.example.com, "
         "Port 55555, TCP or UDP TCP/IP; Protocol TRK8 with TRK encryption key (masked)."),
    ]),
    ("In the Protegus app: **Advanced settings → Reporting to CMS → Settings**", "pair", [
        ("get-reporting-settings-x1x1-phone", "Hardware x1x1",
         "Protegus app, Reporting to CMS, Settings on GET hardware x1x1: Enable test on, Test period 24 h 0 min, Enable ping on, "
         "IP ping period 3 min 0 s, Backup reporting after 3 attempts, Return from Backup after 1 min 0 s, "
         "Device account No. 0123456789, Receiver No. 01, Line No. 1."),
        ("get-reporting-settings-x1x0-phone", "Hardware x1x0",
         "Protegus app, Reporting to CMS, Settings on GET hardware x1x0: Enable test on, Test period 24 h 0 min, Enable ping on, "
         "IP ping period 3 min 0 s, Backup reporting after 3 attempts, Return from Backup after 1 min 0 s, Receiver No. 01, Line No. 1."),
    ]),
    ("In the Protegus app: **Advanced settings → Reporting to CMS → Settings**", [
        ("get-reporting-cms-reportingmode-phone",
         "Protegus app, CMS settings, Reporting mode: Main type LAN, Backup type SIM, Backup type 2 Disabled, Test enabled on, "
         "Communication path test 1 day(s) 0 h."),
    ]),
    ("In the Protegus app: **Advanced settings → User reporting → Cloud**.", [
        ("get-userreporting-cloud-phone",
         "Protegus app, User reporting, Cloud: Enabled on, Parallel reporting off, Cloud access code (masked)."),
    ]),
    ("In the Protegus app: **Advanced settings → Network settings → LAN**.", [
        ("get-network-lan-phone",
         "Protegus app, Network settings, LAN (Ethernet screen): Use DHCP on; Static IP 192.168.1.100, Subnet mask 255.255.255.0, "
         "Default gateway 192.168.1.1, DNS1 8.8.8.8 and DNS2 8.8.4.4 greyed out."),
    ]),
    ("In the Protegus app: **Advanced settings → Network settings → SIM** (SIM1) or **SIM2**.", [
        ("get-network-sim-phone",
         "Protegus app, Network settings, SIM (SIM card screen): SIM card PIN, APN internet, Login, Password, SIM ICCID, DNS1, DNS2, "
         "and Forbid connection when roaming detected off."),
    ]),
    ("In the Protegus app: **Advanced settings → IN/OUT**", [
        ("get-inout-terminal-phone",
         "Protegus app, IN/OUT, terminal 1: Function IN, Type NO; Alarm event: Enabled on, Classificator Event, CID code 130, "
         "Sia code BA, Partition number 99, Zone number 001. The screen continues with the alarm restore and the tamper event and restore."),
    ]),
    ("In the Protegus app: **Advanced settings → System events**.", [
        ("get-events-phone",
         "Protegus app, System events. Event list, all enabled: COMMUNICATION E350, LAN_FAILURE E358, POWER E302, REMOTE_FINISHED E412, "
         "REMOTE_STARTED E411, SIM1_FAILURE E358, SIM2_FAILURE E358, TEST E602. Restore list: COMMUNICATION R350, LAN_FAILURE R358, "
         "POWER R302, SIM1_FAILURE R358, SIM2_FAILURE R358."),
    ]),
]

# Tall screens: keep only the top part, in CSS px of the 390 px wide phone layout.
CROP_CSS_HEIGHT = {"get-inout-terminal-phone": None}  # computed: end of the first alarm card


def first_card_end(img: Image.Image, min_css: int, scale: float) -> int:
    """Return the pixel row of the first full-width background gap below min_css."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    bg = rgb.getpixel((2, h - 2))
    start = int(min_css * scale)
    run = 0
    for y in range(start, h):
        row_bg = all(rgb.getpixel((x, y)) == bg for x in range(int(w * 0.1), int(w * 0.9), 25))
        run = run + 1 if row_bg else 0
        if run >= int(6 * scale):
            return y + int(18 * scale)
    return h


def convert(src: Path, dst: Path) -> None:
    img = Image.open(src)
    scale = img.width / 390
    if src.stem in CROP_CSS_HEIGHT:
        img = img.crop((0, 0, img.width, first_card_end(img, 520, scale)))
    img = img.convert("RGB")
    img = img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=85, method=6)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--masters", required=True)
    ap.add_argument("--lang", default="en")
    a = ap.parse_args()
    masters = Path(a.masters)
    page = Path(PAGE.format(lang=a.lang))
    dest = Path(DEST.format(lang=a.lang))
    text = page.read_text(encoding="utf-8")
    lines = text.split("\n")

    inserted = 0
    for placement in PLACEMENTS:
        anchor, items = placement[0], placement[-1]
        pair = len(placement) == 3
        hits = [i for i, l in enumerate(lines) if l.strip().startswith(anchor)]
        if len(hits) != 1:
            sys.exit(f"anchor {anchor[:60]!r} found {len(hits)} times")
        i = hits[0]
        indent = lines[i][: len(lines[i]) - len(lines[i].lstrip())]
        if lines[i].lstrip()[:1].isdigit():  # list item: the image belongs inside it
            indent += "    "
        # images go after the anchor's paragraph, and after images already placed there
        j = i
        while j < len(lines) and lines[j].strip():
            j += 1

        def is_image_line(line: str) -> bool:
            t = line.strip()
            return "protegus-app/" in t or t in ('<span class="trik-mob-pair">', "</span>")

        while True:
            k = j + 1
            while k < len(lines) and not lines[k].strip():
                k += 1
            if k < len(lines) and is_image_line(lines[k]):
                j = k
                while j < len(lines) and lines[j].strip():
                    j += 1
            else:
                break
        for item in items:
            name = item[0]
            convert(masters / f"{name}.png", dest / f"{name}.webp")
        if any(f"protegus-app/{items[0][0]}.webp" in l for l in lines):
            continue
        if pair:
            # Spans, not div/figure: inside a tab this HTML ends up within a <p>.
            block = [indent + '<span class="trik-mob-pair">']
            for name, caption, alt in items:
                block.append(
                    f'{indent}<span class="trik-mob-pair__item"><img class="trik-mob-img" alt="{alt}" '
                    f'src="./protegus-app/{name}.webp" /><span class="trik-mob-pair__caption">{caption}</span></span>'
                )
            block.append(indent + "</span>")
        else:
            block = []
            for name, alt in items:
                block += [f"{indent}![{alt}](./protegus-app/{name}.webp){{ .trik-mob-img }}", ""]
            block = block[:-1]
        lines[j:j] = [""] + block
        inserted += len(items)
    page.write_text("\n".join(lines), encoding="utf-8")
    print(f"inserted {inserted} images into {page}")


if __name__ == "__main__":
    main()
