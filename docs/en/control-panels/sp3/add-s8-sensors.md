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

    1. Select the SP3 system from the left panel, then click **Devices** in the system menu. Click the **+** button in the top-right corner of the Devices panel.

        ![Protegus web app — system settings menu with Devices selected; empty Devices panel with Add button](./web-01-devices-menu.png)

    2. The **Add wireless sensor** panel opens with all supported sensor types.

        ![Protegus web app — Add wireless sensor panel listing available sensor categories: PIR detectors, vibration detector, magnets, smoke detector](./web-02-add-sensor-categories.png)

    3. Click the sensor type you want to pair (e.g. **Smart Door/Window sensor**).

        The app switches to **Learning** mode and shows the sensor with a diagram indicating the learn button location.

        ![Protegus web app — pairing mode active for Smart Door/Window sensor; diagram shows learn button location with pairing instruction](./web-03-learning-door-sensor.png)

    4. On the physical sensor, **press and hold the learn button** until the green indicator stays lit for 2 seconds (hold for approximately 4–5 seconds).

        When the panel detects the sensor, a confirmation appears:

        ![Protegus web app — Smart Door/Window sensor successfully detected; serial number 3633866376 confirmed](./web-04-door-sensor-found.png)

    5. Click **OK**. The sensor appears in the list with a **NEW** badge.

        ![Protegus web app — paired Smart Door/Window sensor in list with NEW badge; + button to add more](./web-05-sensor-in-list.png)

    6. To add another sensor, click **+** and repeat steps 3–5. Each sensor type shows its own diagram — for example, the Smart Curtain PIR detector shows the internal board with an arrow to the learn button:

        ![Protegus web app — pairing mode for Smart Curtain PIR detector; red arrow highlights the learn button on the circuit board](./web-06-learning-curtain-pir.png)

        ![Protegus web app — Smart Curtain PIR detector successfully detected; serial number 1957335796 confirmed](./web-07-curtain-pir-found.png)

    7. When all sensors are paired, click **Next**. A success dialog confirms the pairing.

        ![Protegus web app — pairing success dialog: 'Wireless devices added successfully' with both paired sensors in the list](./web-08-pairing-complete.png)

    8. Click **Close**.

    **Next:** Go to **Zones** in the system menu to rename zones and set zone types (Instant, Delay, etc.).

=== "Protegus mobile"

    The Protegus app must be installed on your phone and the SP3 system already added to your account.

    1. Open the Protegus app and select the **SP3 kit** system.

        ![Protegus mobile app — SP3 kit home screen showing Online status, zone alarm events, and Area 1 arm/disarm controls](./mob-01-system-home.png){ .trik-mob-img }

    2. Tap **⋮** (top-right) and select **Configure SP3 kit**.

        ![Protegus mobile app — Configure SP3 kit settings menu](./mob-02-settings-menu.png){ .trik-mob-img }

    3. Tap **Devices**, then tap **+**.

        ![Protegus mobile app — Devices list with paired sensors and zone assignments; + button to add more](./mob-04-devices-list.png){ .trik-mob-img }

    4. Select the sensor type you want to pair. The app shows a diagram of the learn button location. **Press and hold the learn button** until the green indicator stays lit for 2 seconds.

        ![Protegus mobile app — pairing mode for Smart PET PIR detector; red circle highlights the learn button on the circuit board](./mob-05-learning-pet-pir.png){ .trik-mob-img }

    5. When the sensor is detected, a confirmation appears with its serial number. Tap **OK**.

        ![Protegus mobile app — Smart PET PIR detector successfully detected; serial number 3722542041 confirmed](./mob-06-pet-pir-found.png){ .trik-mob-img }

    6. Repeat steps 4–5 for each additional sensor.

    **Review sensor details:**

    7. Tap any sensor in the Devices list to view its settings: signal strength (RSSI), battery voltage, zone name, zone type, and area assignment.

        ![Protegus mobile app — Smart Door/Window sensor settings: RSSI 90%, battery 2.90V, serial number 3633866376, Zone 10 assigned](./mob-03-sensor-detail.png){ .trik-mob-img }

        A good RSSI is 60% or above. Below 20% means the sensor is too far from the RF-S8 transceiver or obstructed — reposition and tap **Refresh** to re-check.

    **Verify zone status:**

    8. From the system home screen, tap the area tile → **Zone statuses**. Each paired sensor shows its current open/closed state.

        ![Protegus mobile app — Zone status and bypass screen; Zone 10 shows a red alert icon (open state); bypass toggles allow disabling individual zones](./mob-07-zone-status.png){ .trik-mob-img }

        A red alert icon on a zone means the sensor is currently open or in alarm. Bypass toggles let you temporarily disable individual zones.

=== "TrikdisConfig"

    > [!NOTE]
    > TrikdisConfig is the legacy configuration method and will be discontinued in a future release. Use Protegus web or mobile where possible.

    Two sub-methods: **remote** (over network) or **local** (USB, no network needed).

    #### Remote pairing

    Requirements: activated SIM with PIN disabled, mobile internet on SIM, Protegus cloud enabled, SP3 powered on (**PWR** LED green blinking), SP3 online (**NET** LED green solid + yellow blinking).

    > [!WARNING]
    > Never enroll or unenroll sensors while the panel is in learning mode for a different operation. Before pairing, unenroll each sensor first: hold learn button 5 s → three green flashes. **If a sensor is accidentally unpaired it stops working until re-paired.**

    1. Open TrikdisConfig. In **Remote access**, enter the panel's **IMEI/Unique ID** (on the device label).

        ![TrikdisConfig — Remote access section with IMEI/Unique ID field](./tc-image10.png)

    2. Click **Configure** → **Read [F4]**. Enter admin or installer code if prompted.

    3. Go to **Wireless sensors** → click **Learn sensors**.

        The RF-S8 **NETWORK** LED flashes green/red (learning mode active). The sensor binding window opens.

        ![TrikdisConfig — sensor binding window open during learning mode](./tc-image11.png)

    4. For each sensor:

        a. Hold the sensor's **learn button for 5 seconds** → release when it flashes **green four times**.

        ![Sensor learn button — four green flashes confirms enrollment](./tc-image12.png)

        b. The RF-S8 NETWORK LED briefly turns solid green, then resumes flashing.

        c. Assign a **Zone Number** and **Zone Definition** (Instant / Delay).

        ![TrikdisConfig — assign zone number and zone definition](./tc-image13.png)

        d. Click **Save**. Repeat for each additional sensor.

    5. Click **Stop learning**.

        ![TrikdisConfig — Stop learning button](./tc-image14.png)

    6. Click **Yes** to write sensors to the SP3.

        ![TrikdisConfig — write sensors confirmation dialog](./tc-image15.png)

    7. Wait a few minutes → click **Read [F4]**. The Wireless sensors window lists all registered sensors with serial numbers.

        ![TrikdisConfig — Wireless sensors window with registered sensors and serial numbers](./tc-image16.png)

    8. Open the **Zones** window. Confirm zone and area assignments. Set **Type** to `EOL-T` to enable tamper monitoring. Click **Write [F5]**.

        ![TrikdisConfig — Zones window with zone and area assignment](./tc-image17.png)

    #### Local pairing (no network)

    1. Confirm the RF-S8 is registered with the SP3 (visible in Modules list after firmware setup).
    2. Power on the SP3.
    3. Remove the RF-S8 cover.
    4. Hold the RF-S8 **LEARN** button until the NETWORK LED flashes green/red. Release.
    5. Pair each sensor: hold learn button 5 s → four green flashes. NETWORK LED turns solid green briefly after each success.
    6. When done, hold the RF-S8 **LEARN** button until NETWORK LED stops flashing. Release — transceiver exits learning mode.
    7. Connect USB Mini-B to SP3. Open TrikdisConfig → **Read [F4]**.
    8. Confirm serial numbers in **Wireless sensors** window.
    9. Assign zones and areas in the **Zones** window → **Write [F5]**.

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
