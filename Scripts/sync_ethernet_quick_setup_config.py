#!/usr/bin/env python3

from pathlib import Path
import re


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

E16_SECTION = """## Quick configuration with *TrikdisConfig* software

1. Download **TrikdisConfig** from [www.trikdis.com](http://www.trikdis.com) and install it.
2. Open the E16 casing with a flat-head screwdriver.

![Open the E16 casing](../../../../e16/image6.png)

3. Connect E16 to the computer with a USB Mini-B cable.
4. Run **TrikdisConfig**. The software will recognize the communicator and open the configuration window.
5. Click **Read [F4]** to load the current settings. If requested, enter the Administrator or Installer 6-digit code.

Complete the subsection that matches the installation:

- **Protegus2 app** if the system will be controlled remotely by users.
- **Central Monitoring Station** if the communicator will report to CMS.
- Complete both subsections if the communicator must support both CMS and Protegus2.

### Settings for connection with Protegus2 app

**In "System settings" window:**

![E16 system settings](../../../../e16/image7.png)

1. Select the **Security panel model** that will be connected to the communicator.
2. Select **Remote Arm/Disarm** if users must control the panel in Protegus2 with their keypad code.
3. For direct control of Paradox and Texecom panels, enter the **Security panel PC download password**. It must match the password set in the control panel.

!!! note
    For direct control to work, the control panel must also be programmed as described in the panel-specific section below.

**In "User reporting" window, "PROTEGUS Cloud" tab:**

![E16 Protegus Cloud settings](../../../../e16/image8.png)

4. Tick **Enable connection** to the Protegus Cloud.
5. Change the **Protegus Cloud access Code** if users should be asked to enter it when adding the system to Protegus2.

After finishing configuration, click **Write [F5]** and disconnect the USB cable.

### Settings for connection with Central Monitoring Station

**In "System settings" window:**

![E16 CMS system settings](../../../../e16/image9.png)

1. Enter the **Object ID** provided by the Central Monitoring Station.
2. Select the **Security panel model** that will be connected to the communicator.

**In "CMS reporting" window settings for "Primary channel":**

![E16 CMS reporting settings](../../../../e16/image10.png)

3. Set **Communication type** to **IP**.
4. Select the protocol required by the receiver: **TRK**, **DC-09_2007**, **DC-09_2012**, or **TL150**.
5. Enter the receiver encryption key if the selected protocol requires it.
6. Enter the receiver **Domain or IP** and **Port**.
7. Select **TCP** or **UDP**.
8. Configure backup and parallel channels if the installation requires redundancy.

!!! note
    If you select a **DC-09** protocol, also enter the object, line, and receiver numbers in the **Settings** tab of the **CMS reporting** window.

After finishing configuration, click **Write [F5]** and disconnect the USB cable.
"""

E16T_SECTION = """## Quick configuration with *TrikdisConfig* software

1. Download **TrikdisConfig** from [www.trikdis.com](http://www.trikdis.com) and install it.
2. Open the E16T casing with a flat-head screwdriver.

![Open the E16T casing](../../../e16t/image5.png)

3. Connect E16T to the computer with a USB Mini-B cable.
4. Run **TrikdisConfig**. The software will recognize the communicator and open the configuration window.
5. Click **Read [F4]** to load the current settings. If requested, enter the Administrator or Installer 6-digit code.

Complete the subsection that matches the installation:

- **Protegus app** if users will control the system remotely.
- **Central Monitoring Station** if the communicator will report to CMS.
- Complete both subsections if the communicator must support both CMS and Protegus.

### Settings for connection with Protegus app

**In "System settings" window:**

![E16T system settings](../../../e16t/image6.png)

1. Select the **Security panel model** that will be connected to the communicator.

**In "Reporting" window, "Protegus Service" tab:**

![E16T Protegus settings](../../../e16t/image7.png)

2. Tick **Enable connection** in the Protegus service settings.
3. Change the **Service code** if users should be asked to enter it when adding the system to Protegus.

After finishing configuration, click **Write [F5]** and disconnect the USB cable.

### Settings for connection with Central Monitoring Station

**In "System settings" window:**

![E16T CMS system settings](../../../e16t/image8.png)

1. Enter the **Account number** provided by the Central Monitoring Station.
2. Select the **Security panel model** that will be connected to the communicator.

**In "Reporting" window settings for "Primary" channel:**

![E16T CMS reporting settings](../../../e16t/image9.png)

3. Enable the primary communication channel.
4. Enter the receiver **Remote Host** and **Remote Port**.
5. Select **TCP** or **UDP**.
6. Set **PING Time** and the encryption key required by the receiver.
7. Configure **Backup** settings if the installation requires redundancy.
8. Select the TCP protocol required by the receiver: **TRK**, **DC-09_2007**, or **DC-09_2012**.
9. If **DC-09_2012** is used, configure encryption and the receiver and line numbers.

**In "Reporting" window, "Protegus Service" tab:**

![E16T Protegus service settings](../../../e16t/image10.png)

10. Tick **Enable connection** to Protegus if users will use the app.
11. Change the **Service code** if users should be asked to enter it when adding the system to Protegus.

!!! note
    If you select a **DC-09** protocol, also enter the object, line, and receiver numbers in the **Settings** tab of the **Reporting** window.

After finishing configuration, click **Write [F5]** and disconnect the USB cable.
"""


def replace_section(path: Path, pattern: str, replacement: str) -> None:
    text = path.read_text()
    updated, count = re.subn(pattern, replacement, text, flags=re.S)
    if count != 1:
        raise RuntimeError(f"Expected one TrikdisConfig section in {path}, found {count}")
    path.write_text(updated)


def main() -> None:
    e16_pattern = r"## (?:Configure E16 in TrikdisConfig|Quick configuration with \*TrikdisConfig\* software)\n.*?\n## Wiring\n"
    e16_replacement = E16_SECTION + "\n## Wiring\n"
    for path in E16_FILES:
        replace_section(path, e16_pattern, e16_replacement)

    e16t_pattern = r"## (?:Configure E16T in TrikdisConfig|Quick configuration with \*TrikdisConfig\* software)\n.*?\n## Wiring\n"
    e16t_replacement = E16T_SECTION + "\n## Wiring\n"
    replace_section(E16T_FILE, e16t_pattern, e16t_replacement)
if __name__ == "__main__":
    main()
