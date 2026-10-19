# Security control panel "FLEXi" SP5

!!! warning "Draft for internal review, not published"
    This page is a working draft. It is built from the SP5 specification, the firmware designer's terminal notes, the test log, the Protegus app (beta front-end, firmware 1.00, hardware revision 1E7LWB.0) and the settings read from a test panel.
    Items marked **[to confirm]** come from the specification or are inferred, and need a check against a production board before publishing. The product name may change to SP10.

## About the control panel

The "FLEXi" SP5 is an intrusion and access control panel for small and medium sites: shops, offices, warehouses, service centres, schools and gyms. It has a built-in 4G LTE modem, a LAN port and a 2.4 GHz WiFi module. It reports events to monitoring stations (CMS) and to the Protegus cloud, and it is configured in the Protegus app.

The panel has 10 on-board input/output terminals, a keypad bus and an RS485 bus. With keypads, RS485 expanders and wireless devices it supports up to 192 zones in 16 areas.

### What is new compared with "FLEXi" SP3

| | "FLEXi" SP3 | "FLEXi" SP5 |
|---|---|---|
| Zones | up to 64 | up to 192 |
| Areas (partitions) | 8 | 16 |
| Keypads | up to 8 | up to 16 |
| Devices on the RS485 bus | up to 8 | up to 64 |
| Users | 40 | up to 999 |
| Event log | 1000 events | 5000 events |
| Event buffer | 60 events | 256 events |
| LAN | with the E485 module | built in |
| Temperature sensors | 1-Wire (Dallas) | NTC 10K on any I/O terminal, RS485 and wireless sensors |
| Relay output on the board | no | yes (REL) |
| Configuration | TrikdisConfig | Protegus app |

### Specifications

| Parameter | Value |
|---|---|
| Power supply voltage [AC / DC] | 16 V AC or 12–24 V DC |
| Current consumption | **[to confirm]** |
| Backup power source [BAT] | 12 V lead-acid battery **[capacity to confirm]** |
| Battery charge current | Up to 500 mA |
| Power output for external devices [AUX] | 12 V DC, up to 2 A |
| Siren output [BELL] | 1 A |
| Open-collector output on an I/O terminal | 0.1 A |
| Relay output [REL] | **[ratings to confirm]** |
| Cellular modem | 4G LTE, EU version (EG915) **[bands to confirm]** |
| SIM card | 1, nano-SIM |
| WiFi | 2.4 GHz; DHCP or manual IP |
| LAN | Built in; DHCP or manual IP |
| Event reporting channels | LTE, LAN, WiFi, SMS |
| Report destinations | Two monitoring stations (primary and parallel), each with a backup channel and an SMS fallback; Protegus cloud and app; SMS to users |
| Protocols to the CMS | TRK8, SIA DC-09, TL150; TCP/IP, UDP/IP; SMS |
| Event encoding | Contact ID, SIA |
| Report encryption | TRK8 AES 128, SIA DC-09 AES 128 |
| Account (object) number | Up to 6 characters, hexadecimal |
| Internal clock | Yes, with time synchronization (SIM, LAN, NTP server) |
| Event buffer | 256 events |
| Event log | Up to 5000 events; the oldest are deleted automatically |
| Users | Up to 999 |
| On-board I/O terminals | 10 (IO1–IO10) |
| Areas | 16 |
| Zones | Up to 192 |
| PGM outputs | Up to 64 |
| Keypads | Up to 16 |
| RFID readers (Wiegand 26/34) | Up to 2, on IO1–IO2 and IO3–IO4 |
| Temperature, voltage and resistance inputs | Up to 20 sensors |
| Devices on the RS485 bus | Up to 64 |
| Wireless devices | Up to 42 |
| Operating environment | −10 °C to +50 °C, relative humidity up to 80 % at +20 °C, no condensation |
| Dimensions, weight | **[to confirm]** |

### System limits in the Protegus app

The app enforces these maximums:

| Item | Maximum |
|---|---|
| On-board I/O terminals | 10 |
| Zones | 192 |
| Areas | 16 |
| Keypads | 16 |
| RS485 expanders | 64 |
| Wireless devices | 42 |
| Sensors (temperature, voltage, resistance) | 20 |
| Thermostats | 8 |
| Users | 1000 **[spec says 999; to confirm]** |
| Supervisors | 8 |
| User groups | 32 |
| Schedules | 64 |
| Blacklisted numbers | 40 |

### Board and terminals

!!! question "To confirm"
    Board photo with numbered callouts, the position of the USB connector, SIM holder, antenna connectors and the F1 button. Requested from the test team.

| Terminal | Purpose |
|---|---|
| Power terminals | Power supply input, 16 V AC or 12–24 V DC **[labels to confirm]** |
| BAT+ / BAT− | 12 V backup battery **[labels to confirm]** |
| AUX+ / AUX− | 12 V DC output for external devices, up to 2 A **[labels to confirm]** |
| BELL+ | Siren supply, always on |
| BELL− | Siren output. Default function **Siren**; can be changed to other output functions, such as **Remote control** |
| GRN, YEL | Keypad data bus |
| A, B | RS485 data bus for expanders and wireless receivers |
| IO1–IO10 | Input/output terminals. Each can be a zone input, a PGM output (open collector), a temperature input (NTC 10K), a voltage input or a resistance input |
| REL | Relay output; its function can be changed |
| C | Common terminal **[label to confirm]** |

Additional functions of the I/O terminals:

| Terminals | Additional function |
|---|---|
| IO1, IO2 | RFID reader 1 (Wiegand 26/34) |
| IO3, IO4 | RFID reader 2 (Wiegand 26/34) |
| IO9, IO10 | 2-wire fire loop **[IO9 and IO10, or IO10 only: to confirm]** |

A terminal can have only one function at a time. When you assign a terminal as a zone, it is removed from the output and sensor lists, and the other way round. The exception is resistance measurement: a terminal used as a zone can also be measured as a resistance sensor.

### LED indication

!!! question "To confirm"
    Which LEDs the board has and what each colour and blink pattern means. Requested from the test team.

## Planning the system

### How the devices connect

- **On-board terminals (IO1–IO10):** wired detectors, sirens, relays, readers and sensors.
- **Keypad bus (GRN, YEL):** up to 16 keypads. Each keypad also gives one zone input.
- **RS485 bus (A, B):** up to 64 devices: input/output expanders and wireless receivers.
- **Wireless:** detectors, sirens and key fobs through an RF-LORA or RF-S8 receiver on the RS485 bus, up to 42 devices.
- **Reporting:** 4G LTE (nano-SIM), LAN and WiFi to monitoring stations and to the Protegus cloud.

### Where zones come from

The panel has up to 192 logical zones. Each zone takes its input from one of these sources:

| Zone source | Number of inputs | Zone types allowed |
|---|---|---|
| On-board terminals IO1–IO10 | 10, or 20 with ATZ | All |
| RS485 expanders (iO, iO-8, iO-LORA, iO8-LORA) | 1 or 8 per expander; ATZ on iO-8 doubles them | All on iO-8 |
| Keypad inputs | 1 per keypad, up to 16 | NO, NC, EOL; also EOL_T on keypads with serial numbers starting 1D, 1E, 51 or 52 |
| Wireless devices | 1 per device, up to 42 | Set by the device |
| 2-wire fire loop | IO9 or IO10 | Fire |

### Supported keypads

Protegus SK232 LED W (SK-LED TouchPad), FLEXi SK232 LCD (SK-LCD TouchPad), SK LCD Button, SK LED Button, Paradox K636, K10H(V), K32 LED, K32+ LED, K32LCD+, K35, TM50 and TM70 **[final list to confirm]**.

### Supported RS485 modules

iO, iO-8, iO-LORA, iO8-LORA expanders and RF-LORA and RF-S8 wireless receivers **[full list to confirm, including T16]**. The panel recognises connected RS485 modules automatically.

### Power budget

The 12 V AUX output supplies up to 2 A to keypads, expanders, receivers, detectors and sirens. Add up the current of everything connected to AUX and BELL, both in standby and in alarm, and check that it stays below the limit.

The backup battery must keep the system running after a mains failure. EN 50131 requires at least 12 hours for Grade 2 and 60 hours for Grade 3 (30 hours if the mains failure is reported to the monitoring station).

Battery capacity (Ah) ≥ standby current (A) × required hours + alarm current (A) × alarm time (h)

!!! question "To confirm"
    The panel's own current in standby and while transmitting, and the recommended battery capacity.

### Choosing the installation site

- Install the panel indoors, in a dry place, within −10 °C to +50 °C and up to 80 % relative humidity.
- Check the cellular signal where the antenna will be before fixing the enclosure.
- Keep the panel and its cables away from mains cables and strong sources of interference.
- Plan the cable routes for the keypad bus and the RS485 bus before mounting. **[Maximum cable lengths to confirm]**

## Installation and wiring

!!! warning
    Make all connections with the power and the backup battery disconnected.

### Recommended order of work

1. Mount the enclosure and fit the panel.
2. Connect the zones, outputs, keypads and RS485 modules.
3. Insert the nano-SIM card and connect the antennas and the LAN cable.
4. Connect the backup battery, then the main power supply.
5. Add the panel to the Protegus app and configure it.
6. Test every zone and the reporting to the monitoring station.

### Connecting detectors

Any of the terminals IO1–IO10 can be a zone input. Set the circuit type of each zone in the app (**Areas and zones → Zones**, column **Type**). With the ATZ types, one terminal carries two zones.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./zone-no.webp" alt="Normally open (NO) circuit: an NO contact between IOx and C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./zone-nc.webp" alt="Normally closed (NC) circuit: an NC contact between IOx and C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./zone-eol-no.webp" alt="Normally open with end-of-line resistor (EOL): resistor R1 in parallel with the NO contact, between IOx and C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./zone-eol-nc.webp" alt="Normally closed with end-of-line resistor (EOL): the NC contact and resistor R1 in series between IOx and C." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./zone-eol-t.webp" alt="Normally closed with end-of-line resistor, tamper and wire fault recognition (EOL_T): from IOx, the NC tamper contact and resistor RT in series; the NC alarm contact and resistor R1 in parallel between RT and C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./zone-atz.webp" alt="Two zones on one terminal (ATZ): two detector circuits in series between IOx and C. Detector 1 has an NC contact in parallel with R1; detector 2 has an NC contact in parallel with R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./zone-atz-t.webp" alt="Two zones on one terminal with tamper and wire fault recognition (ATZ_T): two detector circuits in series between IOx and C. Detector 1: NC tamper contact and RT in series, then an NC contact in parallel with R1. Detector 2: NC tamper contact in series, then an NC contact in parallel with R2." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./zone-3eol.webp" alt="Triple end-of-line (3EOL): between IOx and C, an NC tamper contact and RT in series with two sections. Alarm: an NC contact in parallel with R1. Anti-masking: an NC contact in parallel with R2." style="width: 100%; height: auto;" />
  </figure>
</div>

| Type in the app | Circuit |
|---|---|
| NO | Normally open contact, no resistor |
| NC | Normally closed contact, no resistor |
| EOL | One end-of-line resistor (R1) |
| EOL_T | End-of-line resistor with tamper and wire fault recognition (RT, R1) |
| ATZ | Two zones on one terminal, no tamper recognition (R1, R2) |
| ATZ_T | Two zones on one terminal, with tamper and wire fault recognition (RT, R1, R2) |
| 3EOL | Alarm, anti-masking and tamper on one terminal (RT, R1, R2) |

#### Resistor values

Choose the resistor set in **System options → Wired Zone Resistor Values (EOL Type) → EOL Resistor Configuration**. It applies to all wired zones. When you replace an older panel, choose the set that matches the resistors already installed, and you won't need to change them in the detectors.

| Setting in the app | RT | R1 | R2 |
|---|---|---|---|
| 2k2+2k2+4k7 | 2.2 kΩ | 2.2 kΩ | 4.7 kΩ |
| 1k+1k+2k2 | 1 kΩ | 1 kΩ | 2.2 kΩ |
| 5k6+5k6+3k3 | 5.6 kΩ | 5.6 kΩ | 3.3 kΩ |
| 5k6+3k3+5k6 | 5.6 kΩ | 3.3 kΩ | 5.6 kΩ |
| 3k3+6k8+3k3 | 3.3 kΩ | 6.8 kΩ | 3.3 kΩ |
| 2k2+4k7+8k2 | 2.2 kΩ | 4.7 kΩ | 8.2 kΩ |
| 10k+10k+5k6 | 10 kΩ | 10 kΩ | 5.6 kΩ |
| 4k7+4k7+2k2 | 4.7 kΩ | 4.7 kΩ | 2.2 kΩ |

!!! question "To confirm"
    The order of the values follows the SP3 resistor table (RT, R1, R2). Check it for SP5, especially for the 10k+10k+5k6 set, which SP3 does not have.

**Tamper triggers trouble only (zone not activated).** When this is on, a tamper alarm on a zone reports a trouble but does not also trigger the zone. Use it so that a tamper on a fire zone is not reported as a fire.

### Connecting fire detectors

A 2-wire fire loop can be connected to IO9 or IO10. Turn on **2-wire fire on IO9** or **2-wire fire on IO10** in **System options → System Behavior**. The terminal then becomes a Fire zone and can't be used for anything else. A zone set to **Fire** gets a response time of 2000 ms.

!!! question "To confirm"
    Whether both IO9 and IO10 support the 2-wire fire loop (the app's terminal page says IO10 only), the end-of-line resistor and wiring for SP5, and how 4-wire detectors and fire sensor reset are wired.

### Connecting a siren

Connect the siren between **BELL+** and **BELL−**. The BELL output is supervised: the panel reports **Bell missing** and **BELL+ overcurrent**.

### Connecting outputs

- **REL:** relay output on the board, for example for a door lock or a gate. **[contact ratings to confirm]**
- **IO1–IO10 as outputs:** open-collector outputs, up to 0.1 A each. Use an external relay for larger loads.

### Connecting keypads

Connect keypads in parallel to the keypad bus: **AUX+**, **AUX−**, **GRN** and **YEL** **[as on "FLEXi" SP3; to confirm]**. Up to 16 keypads. Each keypad has one zone input; set its type in **Zones** (NO, NC or EOL).

### Connecting RS485 expanders and wireless receivers

Connect RS485 devices in parallel to **AUX+**, **AUX−**, **A** and **B**. Each device must have a unique RS485 address (1–64). The panel recognises the modules; you then configure them in **Devices & Interfaces → Expanders** or **Wireless**.

### Connecting RFID readers (Wiegand 26/34)

Up to 2 readers. Reader 1 connects to IO1 and IO2, reader 2 to IO3 and IO4. Power the readers from AUX. **[D0/D1 order to confirm; on SP3, D0 goes to IO1 and D1 to IO2]**

!!! question "To confirm"
    Whether Wiegand readers work in firmware 1.00 and how they are enabled in the app.

### Connecting temperature, voltage and resistance sensors

Any terminal IO1–IO10 can measure:

- **Temperature:** an NTC 10K resistive sensor.
- **Voltage:** an external DC voltage, 0–12 V **[the app also mentions 0–30 V "if IO8": the IO8 terminal or the iO-8 expander? to confirm]**.
- **Resistance:** the resistance of an external element.

Assign the function in **Terminals** and set the alarm limits in **Devices & Interfaces → Sensors**.

### SIM card, antennas and LAN

Insert an activated nano-SIM card with the PIN code disabled, or enter the PIN in **Communication → Connection → SIM**. Connect the cellular and WiFi antennas **[connector positions to confirm]** and, if used, the LAN cable.

## First power-up and adding the panel to Protegus

### Turning on the panel

Connect the backup battery, then switch on the main power supply.

!!! question "To confirm"
    The LED indication after power-up and how to read the cellular signal level.

### Adding the panel to Protegus

1.  Open the Protegus app and sign in with your installer account.
2.  Tap **Add new system** and enter the panel's **Unique ID/IMEI** (on the packaging sticker), or scan its QR code.
3.  Follow the steps to name the system and finish.

### Opening the configurator

1.  Open the system and go to **Settings → Advanced settings**.
2.  The first time, the app shows **Proceed with Caution**. Tap **Accept the risk and continue**.

    ![Protegus app, Advanced settings warning page with the 'Accept the risk and continue' button.](./protegus-app/sp5-advanced-intro-phone.webp){ .trik-mob-img }

3.  In a desktop browser the configurator reads the panel's settings by itself and opens the **Dashboard**. On a phone, tap **Read**.

    ![Protegus app, SP5 configurator menu on a phone: the panel name SP5_1E7LWB.0, Write and Read buttons, Programming mode: Full access, and the menu items System options, Communication, Areas and zones, Terminals, Devices & Interfaces, Users and System events.](./protegus-app/sp5-menu-phone.webp){ .trik-mob-img }

4.  Change the settings, then tap **Write** to save them to the panel.

The settings reference describes every page of the configurator: [SP5 settings in the Protegus app](settings.md).

### If the panel does not connect

The **Dashboard → Connectivity** card shows the state of each connection.

| What you see | What to check |
|---|---|
| SIM: no SIM card | The nano-SIM is inserted the right way and is activated |
| SIM: PIN error | Disable the SIM PIN, or enter it in **Communication → Connection → SIM** |
| SIM: cannot register on the network | Signal strength and antenna; operator coverage |
| SIM: no mobile data | The APN in **Communication → Connection → SIM**; the data plan |
| LAN: no cable | The LAN cable and the switch port |
| LAN: DHCP problem | DHCP on the router, or set a static IP address |
| LAN: DNS problem | The DNS servers in the LAN settings |
| WiFi: not connected | SSID and password in **Communication → Connection → WiFi**; 2.4 GHz network |

## Quick configuration

Do these steps in order. Each links to its page in the settings reference.

1.  **System options:** set the **Account ID**, the **Object Name**, the **EOL Resistor Configuration** and the time zone.
2.  **Areas (Partitions):** add the areas and set their entry and exit times.
3.  **Zones:** add a zone for each detector: terminal, area, definition and type.
4.  **Users:** add the users, their codes and the areas they can control.
5.  **Communication → CMS reporting:** set the monitoring station's address, protocol, account number and encryption key.
6.  **Communication → Connection:** set which connection (SIM, LAN, WiFi) carries the reports to the monitoring station and to Protegus.
7.  Tap **Write**, then test: trigger each zone, arm and disarm, and check that the events reach the monitoring station.

## Commissioning and handover

- Trigger every zone and check its zone number and event code at the monitoring station.
- Check the tamper of every detector, keypad and the enclosure.
- Disconnect the mains and check that **AC fault** is reported and the system keeps running on the battery.
- Send a test report and check the periodic test interval.
- Show the user how to arm and disarm, and add them to the system in the Protegus app.

## Maintenance

!!! question "To confirm"
    Firmware update procedure (USB, Protegus or both), factory reset, and the recommended battery replacement interval.

## Troubleshooting

| What you see | Likely cause | What to do |
|---|---|---|
| Keypad zone does not work with EOL_T, ATZ, ATZ_T or 3EOL | Keypad inputs support only NO, NC and EOL (EOL_T on some keypads) | Change the zone type |
| A tamper on a fire zone is reported as a fire | Tamper also triggers the zone | Turn on **Tamper triggers trouble only (zone not activated)** |
| A terminal can't be assigned to a zone | It is already used as an output or a sensor | Remove it from **Terminals** or **Sensors** first |
| The CMS receives no events | Channel, protocol, account number or encryption key | Check **Communication → CMS reporting**, then the connection |
| Changes are not saved | The settings were not written | Tap **Write** after changing settings |

## Appendix: system events and Contact ID codes

Event codes read from a test panel. Each event can be turned on or off and have its code changed in **System events**.

| Event | Contact ID |
|---|---|
| Low battery | 302 |
| Missing battery | 311 |
| AC fault | 301 |
| Periodic test | 602 |
| AUX+ overcurrent | 312 |
| BELL+ overcurrent | 321 |
| Bell missing | 321 |
| Tamper alarm | 144 |
| Zone bypassed | 570 |
| RS485 device fault | 333 |
| Communication path lost | 358 |
| Fire loop trouble | 370 |
| Fire alarm | 110 |
| Medical alarm | 100 |
| Panic alarm | 120 |
| Antimasking alarm | 389 |
| Keyswitch arm/disarm | 409 |
| Keyswitch Stay | 442 |
| Keyswitch Sleep | 442 |
| Arm/disarm | 401 |
| Partial Arm | 456 |
| Automatic Arm | 403 |
| STAY arm | 441 |
| SLEEP arm | 480 |
| Remote arm/disarm | 407 |
| Duress alarm | 121 |
| Wireless low battery | 384 |
| Wireless device lost | 381 |
| High temperature | 158 |
| Low temperature | 159 |
| Sensor fault | 380 |
| Low voltage | 784 |
| High voltage | 785 |
| Low humidity | 169 |
| High humidity | 168 |
| Auto arm failed | 455 |
| Zone/door opened | 426 |

!!! question "To confirm"
    Factory default codes. These are the values on a test panel; testers may have changed some (on the test panel, Low battery was off with code 0000).
