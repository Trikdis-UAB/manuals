#!/usr/bin/env python3
"""One-off restructure of the GET English manual into Protegus app | TrikdisConfig tabs.

Pilot for projects/ConfigurationTabs (spec D6: hand-authored from the inventory).
Existing TrikdisConfig text and images are moved verbatim into the TrikdisConfig
tabs; app paths and labels come from the Protegus g16 configurator (release
branch origin/master_eu, labels from the public EN pack v2608312014).

Run from the repo root. Safe to re-run only on an un-restructured page: it
checks the original headings are present and refuses otherwise.
"""
from pathlib import Path
import sys

PAGE = Path("docs/en/alarm-communicators/cellular/get/index.md")


def indent(block: str, n: int = 4) -> str:
    pad = " " * n
    return "\n".join((pad + l) if l.strip() else "" for l in block.split("\n"))


def tabs(app: str, tc: str) -> str:
    return f'=== "Protegus app"\n\n{indent(app.strip())}\n\n=== "TrikdisConfig"\n\n{indent(tc.strip())}\n'


def main() -> None:
    text = PAGE.read_text(encoding="utf-8")
    L = text.split("\n")

    def find(prefix: str) -> int:
        hits = [i for i, l in enumerate(L) if l.startswith(prefix)]
        if len(hits) != 1:
            sys.exit(f"expected exactly one line starting with {prefix!r}, found {len(hits)}")
        return hits[0]

    def seg(a: int, b: int) -> str:  # lines a..b-1
        return "\n".join(L[a:b])

    def img(src: str) -> str:
        hits = [l.strip() for l in L if f'src="./{src}"' in l]
        if len(hits) != 1:
            sys.exit(f"image {src} found {len(hits)} times")
        return hits[0]

    q0 = find("## Quick configuration with *TrikdisConfig* software")
    qp = find("### Settings for connection with Protegus2 app")
    qc = find("### Settings for connection with Central Monitoring Station")
    inst = find("## Installation and wiring")
    c0 = find("## TrikdisConfig window description")
    rc = find("## Remote configuration")

    # ---- chapter 2: quick configuration ---------------------------------
    tc_connect = seg(q0 + 2, q0 + 13)            # steps 1-5
    intro = L[q0 + 14]                           # "Below we describe ..."
    tc_protegus = seg(qp + 2, qp + 59)           # up to "After finishing ... Write [F5]"
    tc_cms = seg(qc + 2, qc + 61)
    assert L[qp + 58].startswith("After finishing configuration"), L[qp + 58]
    assert L[qc + 60].startswith("After finishing configuration"), L[qc + 60]
    assert L[q0 + 14].startswith("Below we describe"), L[q0 + 14]

    app_connect = """
The communicator must be online and added to your Protegus account (see [Adding the security system to Protegus2 app](#adding-the-security-system-to-protegus2-app)). If it can't connect yet, for example because the SIM card needs a PIN or a different APN, make these settings with TrikdisConfig first.

1.  In the Protegus app, open the system and go to **Settings → Advanced settings**.

2.  The first time, the app shows **Proceed with Caution**. Tap **Accept the risk and continue**. Tick **Do not show this again.** to skip it next time.

3.  The app reads the communicator's settings. If it asks for the **Service Access code**, enter the communicator's Protegus Cloud access code (default 123456).

4.  Change the settings described below, then tap **Write** to save them to the communicator.

!!! note
    The Protegus app supports GET firmware 1.08 or later.
"""

    app_protegus = """
In the Protegus app, open **Settings → Advanced settings** and set:

1.  **Panel settings → TLF** (communicator connected to the TIP/RING terminals of the control panel): set **Security panel model** to **AUTO**.

2.  **Panel settings → Serial Bus** (communicator connected to the keypad bus or serial bus): select the **Security panel model**.

3.  On the same screen, turn on **Remote Arm/Disarm** if users should control the panel in the Protegus app with their keypad code. This setting is only shown for directly controlled panels.

4.  For direct control of Paradox panels, enter the **PC download password**; for Texecom panels, the UDL passcode. It must match the password entered in the control panel.

5.  **User reporting → Cloud**: turn on **Enabled**, and change the **Cloud access code** if users should be asked for it when adding the system to the Protegus app (default 123456).

6.  **Network settings → LAN** (communicator connected to a LAN network): turn on **Use DHCP**.

7.  **Network settings → SIM** and **SIM2** (for each inserted SIM card): enter the **SIM card PIN** and the **APN**. Check that **DNS1** and **DNS2** match those supported by your ISP.

8.  **Reporting to CMS → CMS settings → Reporting mode**: set **Main type**, **Backup type** and **Backup type 2**, the order in which the communicator uses LAN, SIM1 and SIM2.

9.  Tap **Write**.

!!! note
    For direct panel control to work, you will need to change the panel settings. How to do this is described in chapter 4.1 "Programming of control panels when the communicator is connected to the keypad bus or serial bus".
"""

    app_cms = """
In the Protegus app, open **Settings → Advanced settings** and set:

1.  **System options → System general**: enter the **Account No.** provided by the Central Monitoring Station (0-9, A-F; **do not use FFFE, FFFF**). On newer hardware versions with firmware 1.31 or later, the account number is set per channel instead: **Reporting to CMS → CMS settings → Primary channel → Primary Account no.**

2.  **Panel settings → TLF** (TIP/RING connection): set **Security panel model** to **AUTO**. Or **Panel settings → Serial Bus** (keypad or serial bus connection): select the **Security panel model**.

3.  **Reporting to CMS → CMS settings → Primary channel**: turn on **Enabled**, then set:
    - **Communication type**: **IP**.
    - **Domain or IP** and **Port** of the receiver.
    - **TCP or UDP**.
    - **Protocol**: **TRK8** (to TRIKDIS receivers), **DC-09_2007** or **DC-09_2012** (to universal receivers), **TL150** (to SUR-GUARD receivers).
    - The encryption key that is set in the receiver: **TRK encryption key** for TRK protocols; for DC-09, turn on **Enable encryption key** and enter the **DC-09 encryption key**.

4.  (Recommended) Set up the **Backup channel** the same way.

5.  **Reporting to CMS → CMS settings → Reporting mode**: set **Main type**, **Backup type** and **Backup type 2**.

6.  **Network settings → LAN** (LAN connection): turn on **Use DHCP**. **Network settings → SIM** and **SIM2** (for each SIM card): enter the **SIM card PIN** and the **APN**, and check **DNS1** and **DNS2**.

7.  Tap **Write**.
"""

    settings_note = """!!! note
    For a description of all GET settings, see [Communicator settings](#communicator-settings)."""

    ch2 = "\n".join([
        "## Quick configuration",
        "",
        intro,
        "",
        "You can make these settings in the Protegus app or in TrikdisConfig; each section below gives the steps for both.",
        "",
        tabs(app_connect, tc_connect),
        L[qp],  # heading kept for stable anchors
        "",
        tabs(app_protegus, tc_protegus),
        settings_note,
        "",
        L[qc],
        "",
        tabs(app_cms, tc_cms),
        settings_note,
    ])

    # ---- chapter 6: communicator settings ---------------------------------
    def between(start_prefix: str, end_prefix: str) -> str:
        a = find(start_prefix)
        b = find(end_prefix)
        return seg(a, b)

    status_text = seg(c0 + 4, find("### “System settings” window") - 1)

    sys_shared = seg(find("**“General” settings group**"), find("###  “Panel settings” window") - 1)
    tlc_start = find("**“TLC” settings group**")
    serial_start = find("**“Serial bus” settings group**")
    tlc_shared = "\n".join(l for l in L[tlc_start:serial_start - 1] if 'src="./image48.webp"' not in l).rstrip()
    serial_shared = seg(serial_start, find("### “CMS reporting” window") - 1)

    cms_intro = seg(find("Events can be sent over several channels"), find("**“Primary channel” settings group**") - 1)
    cms_channels = seg(find("**“Primary channel” settings group**"), find('<img alt="TrikdisConfig \'CMS reporting\' window, Settings tab.'))
    cms_channels = cms_channels.replace('\n“Parallel channel” settings group\n', '\n**“Parallel channel” settings group**\n')
    cms_settings = seg(find("**“Settings” tab** **“Settings” settings group**") + 1, find('<span id="_Ref526770803"></span>'))
    cms_settings = cms_settings.replace("  - **Line No.** - enter line number of the receiver.", "- **Line No.** - enter line number of the receiver.")

    ur_intro = L[find("Protegus2 service allows users to remotely monitor")]
    ur_shared = seg(find("**“Protegus Cloud” settings group**"), find("### “Network settings” window") - 1)

    lan_shared = seg(find("**“Ethernet settings” settings group**"), find("**“SIM1” tab**") - 1)
    sim_warn = seg(find("**“SIM1” tab**") + 2, find("**“SIM1” tab**") + 5)
    sim1_group = find("**These settings must be made if the SIM card is inserted into the SIM1 slot")
    sim_shared = seg(sim1_group + 2, find("**“SIM2” tab**") - 1)

    io_intro = seg(find("The communicator has 2 universal (input / output) terminals."), find("- **Enable** – checked event fields") - 1)
    io_shared = seg(find("- **Enable** – checked event fields"), find("###  “Event summary” window") - 1)

    ev_intro = L[find("In this window, you can enable, disable and modify internal messages")]
    ev_shared = seg(find("- **COMMUNICATION** – message about connection error"), find("### Restoring factory settings") - 1)
    ev_shared = ev_shared.replace(
        '!!! note\n    To enable periodic TEST messages and set their period, go to "**CMS\n    reporting" -> "Settings" -> "Test period"**.',
        '!!! note\n    To enable periodic TEST messages and set their period, see **Test period** in [Test, ping and reporting mode](#test-ping-and-reporting-mode).')
    assert "see **Test period**" in ev_shared, "event summary note not rewritten"

    reset_tc = seg(find("To restore the communicator's factory settings"), find("Another way to restore factory settings."))
    reset_btn = seg(find("Power supply is connected to the communicator. Press and hold"), rc)

    ch6 = f"""## Communicator settings

All GET settings described below can be changed in the Protegus app or in TrikdisConfig. What each setting does is described once; the tabs show where to find it in your tool. Names in brackets are the Protegus app's labels where they differ from TrikdisConfig's.

### Connecting to the communicator

{tabs('''
Open the system in the Protegus app and go to **Settings → Advanced settings** (see [Quick configuration](#quick-configuration)). The top of each screen shows the connected device: **Unique ID** (IMEI), **Serial**, **Firmware** and **Boot** version.

The settings are grouped in the menu as **System options**, **Panel settings**, **Reporting to CMS**, **User reporting**, **Network settings**, **IN/OUT** and **System events**. After changing settings, tap **Write** to save them to the communicator.
''', status_text)}
### System settings

{tabs('''
In the Protegus app: **Advanced settings → System options → System general** (Object ID, Module ID, Time set) and **System options → Access** (codes and installer permissions).

Depending on the firmware and hardware version, **Account No.** and **Device account No.** are either in **System general**, or (firmware 1.31 or later on newer hardware versions) per channel in **Reporting to CMS → CMS settings → Primary channel** (**Primary Account no.**) and in **Reporting to CMS → Settings** (**Device account No.**).
''', f"In TrikdisConfig, open the **System settings** window.\n\n{img('image46.webp')}")}
{sys_shared.replace("- **Object ID** –", "- **Object ID** (**Account No.**) –").replace("- **Module ID** –", "- **Module ID** (**Device account No.**) –").replace("- **Allow installer to change** – the administrator can specify which settings can be changed by the installer.", "- **Allow installer to change** – the administrator can specify which settings can be changed by the installer: **Account number**, **CMS reporting**, **User reporting**, **SIM card** and **Event summary**.")}

!!! note "Installer access in the Protegus app"
    When the communicator is opened with the installer code, the Protegus app hides **Administrator code** and **Only an administrator can restore**, and shows the settings the administrator did not allow as read-only. In the app, the **SIM card** permission also covers the **LAN** settings.

### Panel settings

{tabs('''
In the Protegus app: **Advanced settings → Panel settings → TLF** (TIP/RING connection) and **Panel settings → Serial Bus** (keypad or serial bus connection).
''', f"In TrikdisConfig, open the **Panel settings** window.\n\n{img('image47.webp')}\n\n{img('image48.webp')}")}
{tlc_shared.replace("- **Communication protocol** –", "- **Communication protocol** (**Security panel model**) –")}

    In the Protegus app, the **TLF** screen also has **Dial tone enabled**, which turns the dial tone on or off; **Dial tone frequency** can only be changed while it is on.

{serial_shared.replace("- **Event coding protocol** –", "- **Event coding protocol** (**Protocol**) –").replace("- **Event** – check the box so that the communicator sends events to the CMS and to Protegus2.", "- **Event** – check the box so that the communicator sends events to the CMS and to Protegus2. In the Protegus app this switch is shown but cannot be changed.").replace("- **Security panel PC download password** -", "- **Security panel PC download password** (**PC download password**; for Texecom, the UDL passcode) -")}

### CMS reporting

{cms_intro}

#### Receiver channels

{tabs('''
In the Protegus app: **Advanced settings → Reporting to CMS → CMS settings**, then **Primary channel**, **Backup channel** or **Parallel channel** (**Parallel primary channel**, **Parallel backup channel**). Turn on **Enabled** to show the channel's settings.
''', f"In TrikdisConfig, open the **CMS reporting** window, **CMS settings** tab.\n\n{img('image49.webp')}")}
{cms_channels.replace("- **Encryption key** -", "- **Encryption key** (**TRK encryption key**; for DC-09 protocols, **Enable encryption key** and **DC-09 encryption key**, with **HEX** for a key in hexadecimal) -")}

#### Test, ping and reporting mode

{tabs('''
In the Protegus app: **Advanced settings → Reporting to CMS → Settings** (test, ping, backup timing, receiver and line numbers) and **Reporting to CMS → CMS settings → Reporting mode** (connection order).

The app has an on/off switch next to each period: **Enable test** for **Test period**, **Enable ping** for **IP ping period**, and **Test enabled** for **Communication path test**.
''', f"In TrikdisConfig, open the **CMS reporting** window, **Settings** tab.\n\n{img('image50.webp')}")}
**“Settings” settings group**

{cms_settings.strip()}

<span id="_Ref526770803"></span>

### User reporting

{ur_intro}

{tabs('''
In the Protegus app: **Advanced settings → User reporting → Cloud**.
''', f"In TrikdisConfig, open the **User reporting** window, **PROTEGUS cloud** tab.\n\n{img('image51.webp')}")}
{ur_shared.replace("- **Enable connection** –", "- **Enable connection** (**Enabled**) –").replace("- **Protegus Cloud access Code -**", "- **Protegus Cloud access Code** (**Cloud access code**) -").replace("- **Parallel reporting** –", "- **Parallel reporting** (shown in the app when the firmware supports it) –")}

### Network settings

#### LAN

**These settings must be made if the communicator is connected to a LAN network.**

{tabs('''
In the Protegus app: **Advanced settings → Network settings → LAN**. **Static IP**, **Subnet mask**, **Default gateway**, **DNS1** and **DNS2** can only be changed while **Use DHCP** is off.
''', f"In TrikdisConfig, open the **Network settings** window, **LAN** tab.\n\n{img('image52.webp')}")}
{lan_shared}

#### SIM1 and SIM2

**These settings must be made for each SIM card inserted into the communicator.** The SIM1 and SIM2 slots have the same settings.

{sim_warn}

{tabs('''
In the Protegus app: **Advanced settings → Network settings → SIM** (SIM1) or **SIM2**.

On firmware 1.17 or later with hardware revision M15, the **SIM** screen also has **Generation** and **Bands**, which limit the mobile network technology and frequency bands the communicator uses. On firmware without **Preferred operator**, the app shows **Forbid connection when roaming detected** instead.
''', f"In TrikdisConfig, open the **Network settings** window, **SIM1** or **SIM2** tab.\n\n{img('image53.webp')}\n\n{img('image54.webp')}")}
{sim_shared}

### IN/OUT

{io_intro}

{tabs('''
In the Protegus app: **Advanced settings → IN/OUT**, then select **I/O 1** or **I/O 2**. Set **Function** (**Disabled**, **IN**, **OUT**) and, for an input, **Type**. The **Alarm** and **Tamper** sections hold the event and restore messages sent when the input is triggered.
''', f"In TrikdisConfig, open the **IN/OUT** window.\n\n{img('image55.webp')}")}
{io_shared.replace("- **Enable** –", "- **Enable** (**Enabled**) –").replace("- **E/R** –", "- **E/R** (**Classificator**) –").replace("- **CID** –", "- **CID** (**CID code**) –").replace("- **SIA** - –", "- **SIA** (**Sia code**, shown when a SIA protocol is used) –").replace("- **Part**. –", "- **Part.** (**Partition number**) –").replace("- **Zone** -", "- **Zone** (**Zone number**) -")}

### Event summary

{ev_intro.replace("In this window, you can", "Here you can").replace("in this window will", "here will")}

{tabs('''
In the Protegus app: **Advanced settings → System events**. Events are listed under **Event** and **Restore**; select one to change it.
''', f"In TrikdisConfig, open the **Event summary** window.\n\n{img('image56.webp')}")}
{ev_shared.replace("- **Enable** – when selected", "- **Enable** (**Enabled**) – when selected")}

### Restoring factory settings

The Protegus app cannot restore factory settings. Use TrikdisConfig or the RESET button.

{reset_tc}

Another way to restore factory settings.

{reset_btn.rstrip()}
"""

    out = L[:q0] + ch2.split("\n") + [""] + L[inst:c0] + ch6.split("\n") + [""] + L[rc:]
    new = "\n".join(out)
    new = new.replace('"Protegus cloud" is enabled. See chapter 6.5\xa0"User\n        reporting" window;',
                      '"Protegus cloud" is enabled. See [User reporting](#user-reporting);')
    assert "See [User reporting](#user-reporting)" in new, "User reporting cross-reference not rewritten"
    wiring_old = 'The input type can be changed in the TrikdisConfig window „**IN/OUT” -> “Type”.**'
    wiring_new = 'The input type can be changed in the TrikdisConfig window „**IN/OUT” -> “Type”**, or in the Protegus app under **Advanced settings → IN/OUT → I/O 1** (or **I/O 2**) **→ Type**.'
    assert new.count(wiring_old) == 1, "wiring input-type sentence not found"
    new = new.replace(wiring_old, wiring_new)
    PAGE.write_text(new, encoding="utf-8")
    print("restructured", PAGE)


if __name__ == "__main__":
    main()
