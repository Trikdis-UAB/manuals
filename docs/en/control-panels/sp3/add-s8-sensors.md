# Adding S8/S9 wireless sensors to FLEXi SP3

![FLEXi SP3 control panel, RF-S8 transceiver and S8 sensors paired via Protegus](./sp3-s8-hero.jpg){ .trik-hero-img }

Pair S8 wireless sensors (PIR detectors, door/window magnets, smoke detectors, sirens, remote controls) with the FLEXi SP3 control panel. Choose your configuration method.

> [!IMPORTANT]
> **Firmware requirement:** The FLEXi SP3 must run firmware revision 4 (`SP3_xxx4_0122.fw`, version 1.22 or later) to support S8 wireless sensors.

**Before you start — prepare the sensors** (applies to all methods):

- If a sensor was previously paired with any panel, unenroll it first: hold the sensor's **learn button for 5 seconds**, release when the indicator flashes **green three times**.
- Insert batteries into all sensors you intend to pair.
- Keep the RF-S8 transceiver **at least 1 m away** from sensors during pairing.

---

=== "Protegus web"

    Open [web.protegus.app](https://web.protegus.app) in a desktop browser. The SP3 system must already be added to your account.

    1. Select the SP3 system from the left panel, then click **Devices** in the system menu.

        ![Protegus web app — SP3 kit selected in left panel; Devices menu item highlighted](./web-01-sp3-devices.png)

    2. Click the **+** button to add a new wireless sensor.

        ![Protegus web app — Devices page with + button highlighted in bottom-right corner](./web-02-add-sensor-btn.png)

    3. The **Add wireless sensor** panel opens with all supported sensor types. Click the sensor type you want to pair (e.g. **Smart PET PIR detector**).

        ![Protegus web app — Add wireless sensor panel with Smart PET PIR detector highlighted](./web-03-sensor-categories.png)

    4. The app switches to **Learning** mode and shows the sensor with a diagram indicating the learn button location.

        **Press and hold the learn button** until the green indicator stays lit for 2 seconds (approximately 4–5 seconds).

        ![Protegus web app — pairing mode active for Smart PET PIR detector; red arrow highlights the learn button location](./web-04-learning-mode.png)

    5. When the panel detects the sensor, a confirmation appears with its serial number. Click **OK**.

        ![Protegus web app — Smart PET PIR detector successfully detected; serial number confirmed; OK button highlighted](./web-05-sensor-found.png)

    6. The sensor appears in the list with a **NEW** badge. To add another sensor, click **+** and repeat steps 3–5. When all sensors are paired, click **Next**.

        ![Protegus web app — paired sensor in list with NEW badge; Next button highlighted](./web-06-sensor-in-list.png)

    7. A success dialog confirms the pairing. Click **Close**.

        ![Protegus web app — "Wireless devices added successfully" dialog; Close button highlighted](./web-07-success.png)

    **Configure zone settings:**

    8. In the **Devices** list, click a paired sensor to open its settings. Click **Zone settings** to expand the section.

        ![Protegus web app — sensor detail page; Zone settings section highlighted](./web-08-zone-settings.png)

    9. Set the **Definition** (e.g. Instant) and **Type** (e.g. NO) for the zone.

        ![Protegus web app — Zone settings expanded showing Definition and Type fields highlighted](./web-09-zone-def-type.png)

    **Verify zone status:**

    10. From the home screen, click the **Area 1** tile.

        ![Protegus web app — home screen with Area 1 tile highlighted](./web-10-zone-status1.png)

    11. Click **Zone statuses**.

        ![Protegus web app — Area 1 panel with Zone statuses button highlighted](./web-11-zone-status2.png)

    12. The **Zone status / bypass** panel lists all zones. A red alert icon on a zone means the sensor is currently open or triggered. Bypass toggles let you temporarily disable individual zones.

        ![Protegus web app — Zone status/bypass panel; Zone 9 highlighted with alert icon indicating open state](./web-12-zone-status3.png)

=== "Protegus mobile"

    The Protegus app must be installed on your phone and the SP3 system already added to your account.

    1. Open the Protegus app and select the **SP3 kit** system. Tap **⋮** in the top-right corner.

        ![Protegus mobile app — SP3 kit home screen; three-dot menu button highlighted in top-right](./mob-01-home.png){ .trik-mob-img }

    2. Tap **System configuration**.

        ![Protegus mobile app — dropdown menu with System configuration highlighted](./mob-02-system-config.png){ .trik-mob-img }

    3. Tap **Devices**.

        ![Protegus mobile app — Configure SP3 kit menu with Devices highlighted](./mob-03-config-menu.png){ .trik-mob-img }

    4. Tap the **+** button to add a new sensor.

        ![Protegus mobile app — empty Devices page; + button highlighted in bottom-right corner](./mob-04-add-btn.png){ .trik-mob-img }

    5. Select the sensor type you want to pair (e.g. **Smart PET PIR detector**).

        ![Protegus mobile app — Add wireless sensor type list with Smart PET PIR detector highlighted](./mob-05-sensor-categories.png){ .trik-mob-img }

    6. The app shows the sensor in **Learning** mode with a diagram of the learn button. **Press and hold the learn button** until the green indicator stays lit for 2 seconds.

        ![Protegus mobile app — Learning mode for Smart PET PIR detector; red arrow highlights the learn button on the circuit board](./mob-06-learning.png){ .trik-mob-img }

    7. When the sensor is detected, a confirmation appears with its serial number. Tap **OK**.

        ![Protegus mobile app — Smart PET PIR detector successfully detected; OK button highlighted](./mob-07-sensor-found.png){ .trik-mob-img }

    8. The sensor appears in the list with a **NEW** badge.

        ![Protegus mobile app — paired Smart PET PIR detector in list with NEW badge highlighted](./mob-08-sensor-in-list.png){ .trik-mob-img }

    **Configure zone settings:**

    9. Tap the sensor to open its settings. Tap **Zone settings** to expand the section.

        ![Protegus mobile app — Sensor settings page showing Zone settings section highlighted](./mob-09-zone-settings.png){ .trik-mob-img }

    10. Set the **Definition** (e.g. 24 hours) and **Type** (e.g. NO), then tap **Confirm**.

        ![Protegus mobile app — Zone settings expanded; Definition and Type fields highlighted; Confirm button highlighted](./mob-10-zone-def-type.png){ .trik-mob-img }

    11. To add another sensor, tap **+** and repeat steps 5–10. When all sensors are paired, tap **Next**.

        ![Protegus mobile app — sensor in list; Next button highlighted](./mob-11-sensor-list-next.png){ .trik-mob-img }

    12. A success dialog confirms the pairing. Tap **Close**.

        ![Protegus mobile app — "Wireless devices added successfully" dialog; Close button highlighted](./mob-12-success.png){ .trik-mob-img }

    **Verify zone status:**

    13. From the system home screen, tap the **Area 1** tile.

        ![Protegus mobile app — SP3 kit home screen; Area 1 tile highlighted](./mob-13-zone-status1.png){ .trik-mob-img }

    14. Tap **Zone statuses**.

        ![Protegus mobile app — Area 1 page with Zone statuses button highlighted](./mob-14-zone-status2.png){ .trik-mob-img }

    15. The **Zone status / bypass** screen lists all zones. A red alert icon means the sensor is currently open or triggered. Bypass toggles let you temporarily disable individual zones.

        ![Protegus mobile app — Zone status/bypass list; Zone 2 with alert icon highlighted](./mob-15-zone-status3.png){ .trik-mob-img }

=== "TrikdisConfig"

    Two sub-methods: **remote** (over network) or **local** (USB, no network needed).

    #### Remote pairing

    Requirements: activated SIM with PIN disabled, mobile internet on SIM, Protegus cloud enabled, SP3 powered on (**PWR** LED green blinking), SP3 online (**NET** LED green solid + yellow blinking).

    > [!WARNING]
    > Never enroll or unenroll sensors while the panel is in learning mode for a different operation. Before pairing, unenroll each sensor first: hold learn button 5 s → three green flashes. **If a sensor is accidentally unpaired it stops working until re-paired.**

    1. Open TrikdisConfig. In the **Remote access** section, enter the panel's **Unique ID** (printed on the device label), then click **Configure**.

        ![TrikdisConfig — Remote access section; Unique ID field and Configure button highlighted](./tc-01-remote-access.png)

    2. Click **Read [F4]**. Enter admin or installer code if prompted.

    3. Go to **Wireless sensors** and click **Learn sensors**.

        ![TrikdisConfig — Wireless sensors tab with Learn sensors button highlighted](./tc-02-learn-sensors.png)

    4. The **Learning mode** dialog opens. For each sensor, press and hold the learn button for 5 seconds until it flashes **green four times**.

        ![Diagram showing sensor with arrow pointing to learn button: "Press and hold the learning button for 5 seconds"](./tc-03-sensor-learn-diagram.png)

        ![TrikdisConfig — Learning mode dialog: "Learning mode started. Insert the batteries into the new sensor and wait for it to complete initialization"; Stop learning button](./tc-04-learning-mode.png)

    5. When a sensor is detected, the **New device was found** dialog opens. Set the **Zone number** and **Zone definition** (e.g. Instant), then click **Save**.

        ![TrikdisConfig — New device was found dialog; Zone number and Zone definition fields highlighted; Save button highlighted](./tc-05-new-device-dialog.png)

    6. The Learning mode status line confirms the device was registered. Repeat steps 4–5 for each additional sensor.

        ![TrikdisConfig — Learning mode showing "New device was found: ID:1 S8 Door/Window Sensor, UID: …"; Stop learning button highlighted](./tc-06-device-detected.png)

    7. Click **Stop learning**. When prompted to save the new parameters, click **Yes**.

        ![TrikdisConfig — "Save configuration" dialog asking to save new parameters; Yes button highlighted](./tc-07-save-config.png)

    8. Click **Read [F4]**. The **Wireless sensors** tab now lists all registered sensors with their serial numbers.

        ![TrikdisConfig — Wireless sensors tab showing S8 Door/Window Sensor registered with serial number](./tc-09-wireless-sensors.png)

    9. Open the **Zones** tab. Confirm zone and area assignments. Set **Type** to `EOL-T` to enable tamper monitoring. Click **Write [F5]**.

        ![TrikdisConfig — Zones settings table with zone assignments and area configuration](./tc-10-zones.png)

    #### Local pairing (no network)

    The RF-S8 transceiver has a **LEARN** button on its circuit board — use it to enter and exit learning mode without a PC connection.

    ![RF-S8 transceiver PCB with Learn button labelled](./tc-11-rfs8-photo.png)

    1. Confirm the RF-S8 is registered with the SP3 (visible in Modules list after firmware setup).
    2. Power on the SP3.
    3. Remove the RF-S8 cover.
    4. Hold the RF-S8 **LEARN** button until the NETWORK LED flashes green/red. Release.
    5. Pair each sensor: hold learn button 5 s → four green flashes. NETWORK LED turns solid green briefly after each success.
    6. When done, hold the RF-S8 **LEARN** button until NETWORK LED stops flashing. Release — transceiver exits learning mode.
    7. Connect USB Mini-B to SP3. Open TrikdisConfig → **Read [F4]**.
    8. Confirm serial numbers in **Wireless sensors** tab.
    9. Assign zones and areas in the **Zones** tab → **Write [F5]**.

    #### Remove a wireless sensor

    1. Connect to SP3 (USB or remote) → **Read [F4]**.
    2. In **Wireless sensors**, set the sensor's **Device type** to `Disabled`.
    3. Click **Write [F5]**.

---

## LED reference — RF-S8 transceiver

| LED | State | Meaning |
|-----|-------|---------|
| NETWORK | Flashing green/red | Learning mode active |
| NETWORK | Solid green (5 s) | Sensor successfully enrolled |
| POWER | Off | No supply voltage |
| POWER | Green blinking | Normal operation |
| POWER | Yellow blinking | Supply voltage low (≤ 11.5 V) |
| POWER | Yellow solid | No RS485 communication with SP3 |
