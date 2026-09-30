# Security control panel “FLEXi” SP3

<div style="text-align: center;">
  <img src="./sp3-product.webp" alt="FLEXi SP3" width="400">
</div>

**Common questions**

??? question "How do I set up a single Wiegand reader (no keypad) to pulse a door output?"

    --8<-- "en/faq/index.md:sp3-wiegand-reader-door-output-body"

    See the full section: [Linking RFID key fobs (cards)](#linking-rfid-key-fobs-cards).

Don't see your question? Contact [support@trikdis.lt](mailto:support@trikdis.lt).

## Description

**The *„FLEXi“ SP3* control panel** is a processor part of intrusion and fire alarm system. It comes with a built-in WiFi module and 2G/4G cellular modem. The „FLEXi“ SP3 allows grouping of 64 wired and wireless zones into an 8 partition system. Users can switch protection modes of different areas of the premises remotely and with ease (with mobile app Protegus2, SMS or phone call) or with devices that support personal identification (wired and wireless keypads, electronic keys, RFID cards, etc.). Any triggered system event is reported to the central monitoring station (CMS) and to Protegus cloud via WiFi and (or) via cellular network if a SIM card is inserted.

**When it’s recommended to choose the *„FLEXi“ SP3* control panel?**

- For securing small or medium sized premises which will be monitored by a security company. The „FLEXi“ SP3 supports both wired and wireless zones. The panel can provide remote control and system information to both end-users and the security company.

- As a replacement for existing intrusion alarm panel. „FLEXi“ SP3 allows to set a different resistor value to the type used with the old alarm panel. This saves a lot of time during installation, as then there is no need to change resistors in each sensor.

- When the alarm system needs to perform more functions than just protection of the premises. For example: opening the doors and gates, watering the lawn, lighting, heating, ventilation, cooling, controlling as well as many other automatic start and stop functions.

### Features

**Reporting to the security company‘s central monitoring station (CMS):**

- Event reporting either via the built-in WiFi module or cellular 2G/4G modem.

- Additional modules to send reports via Ethernet or VHF/UHF radio waves or Sigfox with chosen priority.

- Any CMS can receive reports, as long as they have TRIKDIS software/IP receiver or any other manufacturer’s IP receiver supporting SIA DC-09 IP protocol.

- Design based on two decades of experience in transmitting reports to main and backup central monitoring station receivers, which allows security companies to provide the highest level of protection to premises


- A setting for necessity to send to CMS, to mandatorily send reports to CMS first, and only then to customers.
- Possibility to send event reports to CMS of two different security companies.

- Multitude number of message transmission channels and multiple transmission priority settings.

**Reporting to user:**

- Via Protegus2 mobile app, which gives warnings about alarm system events using push and special sound notifications.

- Event reporting via SMS messages to 8 cellular numbers.

- Reporting about events using pre-recorded voice notifications (up to 8 cellular numbers. For сontrol panel SP3_12xx with firmware version up to 1.13 inclusive.).

- Remote control of selected premises’ protection mode (Arm/Disarm/Stay/Sleep).

- Remote control of connected devices (lighting system, automatic gates, ventilation, heating, watering systems, etc.).
- Remote temperature measuring.

**Inputs and outputs:**

- 10 I/O terminals, each one can be set as an input (IN) or output (OUT). Input (IN) types: ATZ, EOL, NC, NO. Different parameters of resistors can be used in EOL and ATZ type circuits. The number of inputs IN can be expanded to 64 by using keypads, iO, iO-8, iO8-LORA, iO- LORA and iO-WL expander modules.

- The board has 2 dedicated outputs: the bell and the LED. The bell is to control the siren, and the LED is to control indicator lights. The number of outputs can be expanded to 16 by using iO, iO-8, iO8-LORA, iO- LORA and iO-WL expander modules.

- Seven output operational settings. Each output can be assigned with an operational logic, a preset operation schedule or qualities, for example, thermostat mode.

- One-wire data bus (“1-Wire”) is designated to connect temperature sensors (up to 8), a temperature and humidity sensor (1) or a key fob (“iButton”) reader.

- The GRN-YEL data bus is designated to connect 8 keypads of the same type.

- The RS485 data bus connects iO series expander modules; RF-SH, RF-LORA, RF-S8, RF-HW radio wave wireless sensor transceivers, E485 Ethernet module, T16 VHF or UHF radio wave transmitter, **Sigfox** module.

**Control of alarm system**

- 4-digit or 6-digit long control codes (40 in total), which may be used as a coercion code as well. In such scenario, entering the user code will disarm the alarm, yet a special report will be sent to the CMS indicating that the alarm was disarmed as a result of coercion.

- Control using keypads: SK-LED TouchPad (Protegus SK232LED W), SK-LCD TouchPad (FLEXi SK232LCD), SK LCD Button, SK LED Button; Paradox K636, K10H(V) K32+LED, K32LED, K32LCD+, K35, TM50, TM70; Crow keypad CR16, CR-LCD; CZ-Dallas electronic (“iButton”) key reader; TM17 electronic key reader, RFID reader (Wiegand 26/34).

- Remote control via Protegus2 mobile app, phone call or SMS.

**Simple installation:**

- Multiple sizes of „FLEXi“ SP3 mounting kits that include a decorative white metal housing with a built-in step-down transformer or impulse power supply.

- Default „FLEXi“ SP3 operational settings are based on many years of experience. That allows to install the system in 7 out of 10 small and medium-sized premises without the need to change the default settings.

- The „FLEXi“ SP3 control panel allows to replace the previous panel without changing the resistors in each wired sensor.

- Settings can be saved as a file to be used later.

- Device configuration via USB cable or remotely by using TrikdisConfig software.

- Remote connection via TrikdisConfig software allows not only altering „FLEXi“ SP3 parameters but monitoring the operation of the panel as well.
- Two access levels for parameter settings: installer and administrator.

### Technical specifications 

| Parameter | Description |
|-----------|-------------|
| Power supply voltage [AC /​ DC] | 16 V AC or 16-24 V DC, 2,5 A |
| Current consumption | Up to 50 mA (stand-by), /​ Up to 200 mA (short-term, while sending) |
| Backup power source [BAT] | 12 V lead – acid battery, 4 Ah/​7 Ah |
| Battery charge current | Up to 500 mA |
| Power voltage and current for external devices [AUX] | 12 V DC, up to 1 A |
| Siren output [BELL] | 1 A |
| Output [LED] | 0,1 A |
| PGM output | 0,1 A |
| WiFi module | Yes, built-in |
| WiFi frequency, protocol, encryption type | 2,4 GHz, 802.11 b/​g/​n, WPA, WPA2, WPA mixed |
| WiFi network configuration type | DHCP or manual |
| SIM card | 1, NANO size |
| GSM/​GPRS modem frequencies | 850 /​ 900 /​ 1800 /​ 1900 MHz |
| 4G modem frequencies „FLEXi” SP3_14E /​ „FLEXi” SP3_24E /​ EMEA/​Thailand | B1/​B3/​B7/​B8/​B20/​B28 |
| 4G modem frequencies „FLEXi” SP3_24S /​ Latin America/​Australia/​New Zealand | B1/​B3/​B4/​B5/​B7/​B8/​B28 |
| 4G modem frequencies „FLEXi” SP3_24A /​ North America | B2/​B4/​B12 |
| Report transmission directions | To main and backup receivers of 2 different security companies;​ To Protegus cloud, to iOS/​Android Protegus2 mobile apps;​ To 8 mobile phones via SMS messages. Calls 8 mobile phones. If a user answers the call, announces what happened using voice (For сontrol panel SP3_12xx with firmware version up to 1.13 inclusive). |
| Event reporting transmission channels | GPRS or 4G, WiFi, LAN (with module E485), SMS, Voice call (up to 8 cellular numbers. For сontrol panel SP3_12xx with firmware version up to 1.13 inclusive), VHF/​UHF radio waves (with transmitter T16) |
| Protocols for connection to CMS | TCP /​ IP or UDP /​ IP, or SMS |
| Event encoding | Contact ID codes |
| Report encryption | TRK AES 128, SIA IP AES 128 |
| Internal clock | Yes |
| Buffer memory capacity | 60 events |
| Events log memory | Up to 1000 events. Oldest entries deleted automatically. |
| User codes | 40 (4-digit or 6-digit long codes) |
| Duress code | Two code entry methods can be chosen during programming |
| Dual purpose terminals [I/​O] | 10;​ IN or OUT function selected during programming. When IN is selected, available types: NC, NO, EOL, EOL_T, 3EOL, ATZ, ATZ_T. When OUT is selected, the terminal becomes open collector (OC) type with up to 100 mA current |
| No. of partitions | 8 |
| No. of zones | 10 (20 zones if using ATZ), (can be expanded to 64 zones using expanders) |
| No. of PGM outputs | 2 (can be 12 if IO terminals are set as outputs. Can be expanded to 16 outputs with expanders) |
| Max. number of connected keypads | 8 |
| Supported keypads | SK-LED TouchPad (Protegus SK232 LED W) /​ SK-LCD TouchPad (FLEXi SK232LCD) /​ SK LCD Button /​ SK LED Button /​ Paradox K636 /​ Paradox K10H(V) /​ Paradox K32 LED /​ Paradox K32+ LED /​ Paradox K32LCD+ /​ Paradox K35 /​ Paradox TM50 /​ Paradox TM70 /​ Crow CR16 /​ Crow CR-LCD |
| Max. number of RFID readers (Wiegand 26/​34) | 2 |
| 1-Wire data bus length [1 WIRE] | Up to 30 m |
| Compatible temperature sensors | Maxim®/​Dallas® DS18S20, DS18B20;​ AM2301 series |
| Max. number of temperature sensors connected to 1-Wire data bus | 8 (Dallas) or 1 (if an AM2301 series sensor is used) |
| Compatible electronic (iButton) keys [1 WIRE] | Maxim®/​Dallas® DS1990A |
| Max.number of electronic (iButton) keys | 40 |
| RS485 data bus length | Up to 100 m |
| Max. no. of devices connected to RS485 data bus | 8 |
| Supported modules | iO-8 – expander module;​ /​ iO – expander module;​ /​ iO-MOD – iO-WL radio wave transceiver;​ /​ iO-WL – wireless expander module;​ /​ RF-SH – radio wave receiver for wireless sensors;​ /​ RF-HW - transceiver for wireless sensors;​ /​ RF-S8 - transceiver for wireless sensors;​ /​ RF-LORA - transceiver for LORA wireless sensors;​ /​ E485 – module for connecting to Ethernet network;​ /​ TM17 – iButton key reader;​ /​ CZ-Dallas – iButton key reader;​ /​ T16 – VHF or UHF radio wave transmitter;​ /​ iO-LORA - expander module;​ /​ iO8-LORA - expander module;​ /​ PB-LORA – panic button;​ /​ REL-LORA – relay module;​ /​ RFID reader. |
| Operating environment | Temperature from -10 °C to +50 °C, relative humidity 80% at +20°C, no condensation. |
| Dimensions of the control panel | 117x79x25 mm |
| Weight | 0,1 kg |

### List of compatible modules 

| **Module name** | **Current** |
|----|----|
| Keypad SK-LED TouchPad (Protegus SK232 LED W) | Min 60 mA, max 150 mA |
| Keypad SK-LCD TouchPad (FLEXi SK232LCD) | Min. 25 mA, max. 60 mA |
| Keypad SK LCD Button | Max. 70 mA |
| Keypad SK LED Button | Max. 70 mA |
| Keypad Paradox K636 | Min 40 mA, max 70 mA |
| Keypad Paradox K10H(V) | Min 44 mA, max 72 mA |
| Keypad Paradox K32 LED | Min 49 mA, max 148 mA |
| Keypad Paradox K32+ LED | Min 49 mA, max 148 mA |
| Keypad Paradox K32LCD+ | Min 70 mA, max 150 mA |
| Keypad Paradox K35 | Min 30 mA, max 70 mA |
| Keypad Paradox ТМ50 | Мin 100 mA, max 230 mA |
| Keypad Paradox ТМ70 | Min 200 mA, max 330 mA |
| Keypad Crow CR16 | Min 40 mA, max 75 mA |
| Keypad Crow CR-LCD | Min 40 mA, max 75 mA |
| iO-8 expander module | Max 20 mA |
| iO expander module | Max 50 mA |
| iO-MOD – iO-WL radio wave transceiver | Min 50 mA, max 150 mA |
| iO-WL wireless expander module | Max 200 mA |
| RF-SH transceiver for wireless sensors (Crow) | Max 100 mA |
| E485 Ethernet communicator | Min 50 mA, max 150 mA |
| TM17 iButton key reader | Max 50 mA |
| CZ-Dallas iButton key reader | Max 25 mА |
| T16 (VHF or UHF) radio wave transmitter | Min 100 mA, max 1,2 A |
| RFID reader (Wiegand 26/​34) | Max 100 mA |
| RF-LORA transceiver for LORA wireless sensors and LORA modules | Min. 50 mA, маx. 150 mA |
| iO-LORA expander module | Max 50 mА |
| iO8-LORA expander module | Max 50 mА |
| PB-LORA panic button | Battery 3V, CR123A |
| REL-LORA relay module | Max. 45 mA |
| RF-S8 transceiver for wireless sensors (S8) | Up to 100 mA |
| RF-HW transceiver for wireless sensors (Honeywell)) | Up to 100 mA |

### Purpose of external terminals

<img alt="FLEXi SP3 board: 1. Connectivity and operation indicator lights; 2. Backup power supply terminal block; 3. Main power supply terminal block; 4. External terminal block; 5. 1-WIRE data bus terminal block; 6. SMA screw-on type connector for WiFi antenna; 7. Nano-SIM card holder; 8. SMA screw-on type connector for Cellular antenna; 9. USB Mini-B connector for configuring the control panel’s settings." src="./image4.webp" style="width:5.480010936132984in;height:3.826674321959755in" />

1.  Connectivity and operation indicator lights.
2.  Backup power supply terminal block.
3.  Main power supply terminal block.
4.  External terminal block.
5.  1-WIRE data bus terminal block.
6.  SMA screw-on type connector for WiFi antenna.
7.  Nano-SIM card holder.
8.  SMA screw-on type connector for Cellular antenna.
9.  USB Mini-B connector for configuring the control panel’s settings.

| **Terminal** | **Description** |
|----|----|
| Power terminal | Power supply terminal (16 V AC or positive 16-24 V DC) |
| Power terminal | Power supply terminal (16 V AC or negative 16-24 V DC) |
| BAT+ | Backup power supply positive terminal 12 V |
| BAT- | Backup power supply negative terminal 12 V |
| AUX+ | Positive 12 V power terminal for external devices |
| AUX- | Common negative terminal |
| GRN | Keypad data bus |
| YEL | Keypad data bus |
| A 485 | Terminal A of *RS485* data bus |
| B 485 | Terminal B of *RS485* data bus |
| IO1 – IO9 | Input/​output terminals (default setting – input) |
| IO10 | Input/​output terminal (default setting – PGM output, Fire Sensor Reset) |
| C | Common negative terminal |
| LED | PGM output (default setting – System State) |
| +5 V | Positive 5 V power terminal for *1-Wire* devices |
| 1 WIRE | *1-Wire* data bus terminal |
| C | Common negative terminal |

### LED indication of operation 

| LED indicator | Light status | Description |
|---------------|--------------|-------------|
| NET | Green blinking | SIM card is registering on Cellular network. |
| NET | Green solid | SIM card registered on Cellular network. |
| NET | Yellow blinking | Indicates Cellular signal strength from 0 to 5. 3 is sufficient. |
| DAT | Off | No unsent event messages. |
| DAT | Green solid | Message is being sent. |
| DAT | Yellow solid | There are unsent event messages in buffer memory. |
| MOD | Green blinking | Connecting to WiFi network. |
| MOD | Green solid | Connected to WiFi network. |
| PWR | Green blinking | No operational problems. |
| PWR | 1 red flash | No SIM card detected |
| PWR | 2 red flashes | The PIN card of the SIM card is incorrect |
| PWR | 3 red flashes | Unable to connect to Cellular network |
| PWR | 4 red flashes | Unable to connect to CMS receiver using channel 1 |
| PWR | 5 red flashes | Unable to connect to CMS receiver using channel 2 |
| PWR | 6 red flashes | Internal clock not set |
| PWR | 7 red flashes | Insufficient backup power supply voltage |
| PWR | 8 red flashes | No AC power |
| PWR | 9 red flashes | Unable to connect to WiFi network |

### Control panel firmware versions 

| **Firmware revision** | **Wireless receiver** | **Wireless sensor** | **Supported number of zones** | **Supported keypads** | **Supported modules** |
|----|----|----|:--:|----|----|
| SP3_xxx0 | RF-SH, RF- LORA | CROW | 32 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-SH |
| SP3_xxx1 | RTX3, RF-LORA | PARADOX | 32 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA |
| SP3_xxx2 | RF-HW, RF- LORA | HONEYWELL | 64 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-HW |
| SP3_xxx4 | RF-LORA, RF-S8 | MAXIMUM, S8 | 64 | Flexi, Paradox | iO, iO-8, iO-WL, iO-MO, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-S8 |

## Powering the security control panel

### Main power supply

The control panel and the entire alarm system can be powered either from an alternating or a direct current source. In both cases, a backup power supply – a 12 V battery – must be connected to the system to ensure the supply of power is uninterrupted. To meet the demands of the EN50131 standard, the backup battery must be able to work for 12 hours for security Grade II or 60 hours for security Grade III after losing power from the main power supply. Take into account the total current consumption of the additional connected modules, the current consumption of individual modules is listed in chapter 1.2 “List of compatible modules”.

### Backup power supply

If there are problems with powering the system from the main power supply, an *AC Fault* event report will be generated and the panel will automatically switch to the backup 12 V battery. If the battery’s voltage falls to 11,5 V, a *Low* *Battery* event report will be generated. The battery will be disconnected if the voltage falls bellow 9,5 V. If AC network voltage is restored, an *AC Restore* report will be generated and the battery charging process will begin automatically. When the battery’s voltage rises to 12,6 V, a *Battery Restore* event report will be generated.

### Control panel kits

#### Control panel *„FLEXi“ SP3*  

| Name                                  | Quantity |
|:--------------------------------------|:---------|
| „FLEXi“ SP3 control panel board | 1 pc.    |
| Wire for connecting battery           | 1 pc.    |
| Resistor 2,2 kΩ                       | 20 pcs.  |
| Resistor 4,7 kΩ                       | 10 pcs.  |
| Plastic spacer (mounting parts)       | 4 pcs.   |
| Antenna ME301M with 2,5 m long cable  | 2 pcs.   |

#### Control panel *„FLEXi“ SP3* KIT

| Name                                                            | Quantity |
|:----------------------------------------------------------------|:---------|
| „FLEXi“ SP3 control panel board, built into metal housing | 1 pc.    |
| Metal housing K01 with 40 VA transformer                        | 1 pc.    |
| Resistor 2,2 kΩ                                                 | 20 pcs.  |
| Resistor 4,7 kΩ                                                 | 10 pcs.  |
| Antenna ME301M with 2,5 m long cable                            | 2 pcs.   |
| Wire for connecting battery                                     | 1 pc.    |
| Tamper sensor                                                   | 1 pc.    |
| Terminal block with 0,5 A fuse                                  | 1 pc.    |

#### Control panel *„FLEXi“ SP3* KITi

| Name                                                            | Quantity |
|:----------------------------------------------------------------|:---------|
| „FLEXi“ SP3 control panel board, built into metal housing | 1 pc.    |
| Metal housing K02 with Mean Well impulse power supply           | 1 pc.    |
| Resistor 2,2 kΩ                                                 | 20 pcs.  |
| Resistor 4,7 kΩ                                                 | 10 pcs.  |
| Antenna ME301M with 2,5 m long cable                            | 2 pcs.   |
| Wire for connecting battery                                     | 1 pc.    |
| Tamper sensor                                                   | 1 pc.    |
| Terminal block with 3,15 A fuse                                 | 1 pc.    |

!!! note
    USB wire (Mini-B type) for programming the control panel sold
    separately.
## Installation of the system

### Recommended order of installation

**Planning the system:**

- Sketch a plan of the premises and mark the areas where the metal housing with the control panel, keypad (-s), signallers, equipment automatically or remotely controlled by the control panel will be installed.

- After evaluating the premises, the demands raised for their protection and the characteristics of possible sensors, choose the number of sensors to use, their types, and the locations to install them.

#### Installing the control panel into the mounting housing 

The control panel’s board can be installed into a mounting housing that already has a step-down transformer with a 500 mA fuse installed and also has space intended for a backup battery. / Install the control panel into the chosen plastic or metal housing using plastic spacers. If you chose a metal housing, do not forget to ground it during installation. The chosen housing must meet demands described in the EN 60950 and EN 50131 standards.

<img alt="Front and side views of a spacer fixing the SP3 circuit board above the box housing. The board hole is marked Ø4; the housing hole is marked Ø4,8." src="./image5.webp" style="width:2.6766721347331583in;height:1.810003280839895in" />

**Dimensions of the „FLEXi“ SP3 board**

The picture below shows the dimensions of the board and its mounting holes (in millimeters), and also the locations of the holes.

<img alt="FLEXi SP3 board dimensions in millimeters: 116,5 wide and 78,5 high. Four mounting holes are marked Ø4 mm; their centers are 93 mm apart horizontally and 61 mm apart vertically. The left hole centers are 5 mm from the left edge, and the lower hole centers are 10 mm from the bottom edge." src="./image6.webp" style="width:5.223344269466317in;height:3.9800076552930883in" />

#### Order of connecting devices

<img alt="Wiring diagram: power sources to FLEXi SP3. 1. GSM and WiFi antennas connect to their antenna connectors; 2. Nano-SIM card goes in the SIM holder; 3. Devices connect at the external terminal block; 4. Main supply connects to the AC/DC terminals: a ~230 V/16 V, 40 VA, 50 Hz transformer with a 500 mA, 250 V fuse on its ~230 V feed, or a 16–24 V, 2,5 A DC source; 5. A 12 V, 7 Ah backup battery connects positive to BAT+ and negative to BAT–." src="./image7.webp" style="width:7.086805555555555in;height:3.292361111111111in" />

1.  Connect GSM and WiFi antennas to the antenna connectors.

2.  Insert an activated SIM card into the SIM card holder.

3.  Using the given connection schematics and the connection schematics for every device to be connected, connect the door and window magnetic contacts, motion, fire and other sensors, signallers, keypads and controlled devices. Connect the housing door and wall mounting tamper sensors to the panel’s terminals.

4.  Connect the wires of the main power supply to the control panel’s AC/DC terminals. Turn on the main power supply. The „FLEXi“ SP3 will recognize the keypads, expanders and interfaces that are correctly connected using 1-WIRE and YEL/GRN data busses.

5.  Insert a backup battery into the mounting housing. Connect the battery’s terminals to the BAT+ / BAT– terminals on the control panel.

!!! note
    The battery must recharge in less than 72 hours for the alarm system to
    meet security Class II or 24 hours to meet security Class III.
#### Recommendations for setting the control panel’s parameters 

1.  See chapter 5 “Setting parameters using TrikdisConfig” for information on how to connect to the panel to configure it.

2.  System settings:

    1.  **Partitions.** If you would like to turn on protection for specific zone groups separately, the alarm system can be divided into partitions. See chapter 5.2 ““System Options” window” on how to divide the system and set the required partition attributes.

    2.  **Zones.** See chapter 5.7 ““Zones” window” to set every zone according to the sensors’ characteristics and desired operation of the alarm after an event occurs in that zone. If the alarm system is divided into partitions, every zone can be assigned to a desired area.

    3.  **Users.** System *users* must be created to control the alarm system via keypad, iButton key or phone call (SMS message). See chapter 5.4 ““Users & Reporting” window” on how to create *users* and assign them permissions.

3.  Message sending:

    1.  **Time setting.** The control panel’s time must be set in order to receive messages with exact timestamps. See chapter 5.2 ““System Options” window”.

    2.  **Enable report sending.** Default settings enable the event report sending function for all events. If any event occurs, its report will be sent to the set recipients using the set channels. See chapter 5.10 ““System events” window” on how to disable reporting of chosen events.

    3.  **SIM card parameters.** If messages need to be sent using mobile networks, you must set parameters for the SIM card being used (see chapter 5.2 ““System Options” window”).

    4.  **Reports to central monitoring station.** Sending reports to the central monitoring station is disabled by default. See chapter 5.3 ““Reporting to CMS” window” on how to set parameters for sending messages to CMS.

    5.  **Reports to user.** Communication with Protegus cloud is enabled by default, and sending reports using SMS messages and phone calls is disabled. See chapter 5.10 ““System events” window” on how to set parameters for sending reports to the user’s mobile phone.

4.  Remote control of the system:

    1.  **User access.** The alarm system can be controlled remotely (via phone call and (or) SMS messages) by users whose phone numbers are entered into the User list. See chapter 5.4 ““Users & Reporting” window” on how to enter phone numbers.

    2.  **Control via phone call.** Phone calls allow not only to arm or disarm all or part of the security system, but also to control (turn on or off) equipment connected to PGM outputs. See chapter 4.4 “Control via phone call” on what parameters to change to allow phone calls to modify the state of a selected PGM output that has an equipment control circuit connected to it.

    3.  **Control via** **SMS** **messages.** With SMS messages, it is possible to change some of the control panel’s operational parameters, arm or disarm all or part of the premises, control (turn on or off) equipment connected to the PGM outputs. See the list of SMS commands on chapter 4.3 “Configuration and control via SMS messages”.

5.  Additionally:

    1.  **Changing control codes.** We recommend changing the panel’s default alarm control and configuration codes to something only You know.

        - The **Master** user code can be changed in the branch **Users & Reporting** of the program menu.

        - **The remote SMS control** code can be changed in the **System Options** window of the program menu, in the **SMS Password** field of the **Access** section.

        - **Access codes for connecting with TrikdisConfig** can be changed in the **Access** section of the **System Options** branch of the program menu.

### Connecting sensors 

There are 10 terminals IO1–IO10 (inputs) on the control panel board for connecting sensor circuits. The number of inputs can be expanded to 64 using input expanders (***iO, iO8, iO-WL, RF-SH, iO-LORA, iO8-LORA**)*. Any terminal can be set as an input and assigned zone attributes: circuit type (NO, NC, EOL, EOL_T, 3EOL, ATZ, ATZ_T); sensitivity to temporary circuit events; zone function (Delay, Instant, Instant Stay, Interior, Interior Stay, Fire, Keyswitch, 24_hour, Silent, Silent 24h), see chapter 5.7 ““Zones” window”. The iO8 and iO8-LORA expanders support all types of zone resistor (EOL types) of the control panel.

#### Schematics for connecting sensors.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Normally open (NO) sensor circuit: an open NO contact connects IOx to C when actuated." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Normally close (NC) sensor circuit: a closed NC contact connects IOx to C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image10.webp" alt="Resistor table with columns RT, R1 and R2. The seven rows are 2.2k, 2.2k, 4.7k; 1k, 1k, 2.2k; 5.6k, 5.6k, 3.3k; 5.6k, 3.3k, 5.6k; 3.3k, 6.8k, 3.3k; 2.2k, 4.7k, 8.2k; and 4.7k, 4.7k, 2.2k." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image11.webp" alt="Normally open with End of line resistor (EOL): between IOx and C, resistor R1 is in parallel with the NO contact." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image12.webp" alt="Normally closed with End of line resistor (EOL): the NC contact and resistor R1 are in series between IOx and C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image13.webp" alt="Normally closed with End of line resistor, with tamper and wire fault recognition (EOL_T): from IOx, the NC tamper contact and resistor RT are in series; the NC alarm contact and resistor R1 are in parallel between RT and C." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image14.webp" alt="Normally closed without EOL (ATZ): two detector circuits are in series between IOx and C. Detector terminal 1 has an NC contact in parallel with R1; detector terminal 2 has an NC contact in parallel with R2." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image15.webp" alt="Normally closed with EOL, with tamper and wire fault recognition (ATZ_T): two detector circuits are in series between IOx and C. Detector terminal 1 has an NC tamper contact and RT in series, followed by an NC contact in parallel with R1. Detector terminal 2 has an NC tamper contact in series, followed by an NC contact in parallel with R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Normally closed with End of line resistor, with tamper and wire fault recognition (3EOL): between IOx and C, an NC tamper contact and RT are in series with two sections. The Alarm section has an NC contact in parallel with R1; the Anti-masking section has an NC contact in parallel with R2." src="./image16.webp" style="width:3.15000656167979in;height:1.6633366141732284in" />

### Connecting smoke detectors 

Schematic for connecting two-wire smoke detectors to PGM (LED) outputs. When using this scheme for connecting fire detectors, it is necessary to mark the "**LED out as 2Wire fire**" field with a tick (see chapter5.2 “Window “System options””).

<img alt="Wiring diagram: SP3 to two-wire smoke detectors. AUX+ to the first detector + IN and LED to its − IN; each detector’s + OUT and − OUT continue to the next detector’s corresponding IN terminals. A 2.2kΩ End of line resistor bridges the + and − wires after the last detector." src="./image17.webp" style="width:4.6266765091863515in;height:1.3666699475065618in" />

Schematic for connecting four-wire smoke detectors.

To connect a smoke detector circuit to a selected input, the input (IOx) must be assigned the Fire zone function (see chapter 5.7 ““Zones” window”).

To connect a four-wire smoke detector circuit to a selected PGM output (IO10), the Fire Sensor Reset function must be assigned to the output (see chapter 5.8 ““PGM” window””). The relay K1 is used to detect a broken cable and removal of a fire detector.

<img alt="Wiring diagram for four-wire smoke detectors and relay K1. From top to bottom, SP3 AUX+, IOx, C, and IO10 connect to the first detector’s +, upper contact, lower contact, and − IN terminals. Each of the four OUT terminals continues to the corresponding IN terminal of the next detector. After the last detector, the K1 contact and end-of-line resistor R1 are in series between the IOx and C lines. Relay K1’s coil connects between the AUX+ and IO10 lines." src="./image18.webp" style="width:5.560010936132984in;height:1.4533366141732282in" />

Schematic for connecting two-wire smoke detectors. The relay K1 is used to detect a broken cable and removal of a fire detector.

<img alt="Wiring diagram: SP3 to SM1 and two-wire smoke detectors. AUX+ to SM1 +12V and the detector + IN; IO10 to SM1 -12V and relay K1 coil; SM1 R to detector - IN. Detector IN and OUT terminals continue along the circuit; the final + OUT connects to K1. Monitoring circuit: IOx to SM1 C; SP3 C through R1 end of line resistor and K1 contact to SM1 NC." src="./image19.webp" style="width:5.8900120297462815in;height:2.0500043744531933in" />

Or

<img alt="Wiring diagram: alternative SP3 connection to SM1 and two-wire smoke detectors. AUX+ to SM1 +12V and detector + IN; IO10 to SM1 -12V and relay K1 coil; SM1 R to detector - IN. Detector IN and OUT terminals continue along the circuit; the final + OUT connects to K1. Monitoring circuit: IOx to SM1 C; R1 end of line resistor between SM1 C and NO; SP3 C through K1 contact to SM1 NO." src="./image20.webp" style="width:5.8900120297462815in;height:2.00667104111986in" />

### Schematic for connecting a siren 

<img alt="Wiring diagram: SP3 to siren. BELL + to the siren red wire; BELL - to the black wire." src="./image21.webp" style="width:3.096673228346457in;height:1.2166688538932633in" />

<img alt="Wiring diagram: SP3 to MR100 outdoor siren. BELL + (+12V) to Vdd; BELL - to S and L; AUX - to GND; C and IO9 to the two SAB terminals. Shunts are shown at PL+, PS+, L-, S-, S1 and 4; other positions are labeled PL-, PS-, L+, S+, S2, 1 and 16. JPS1 ON: R_SAB = 0 Ω; JPS1 OFF: R_SAB = 2,2 kΩ." src="./image22.webp" style="width:5.076676509186352in;height:1.8933377077865268in" />

The diagram shows the connection and settings of the **MR100** outdoor siren. If the control panel will use a different method for monitoring the EOL (factory setting is 2.2 kOhm EOL) of the siren tamper (SAB terminals) circuit, it is necessary to close the JPS1 contacts and connect a resistor of the corresponding rating in series to the tamper circuit. The **24_hours** zone type is factory set for IO9 input.

### Schematics for connecting keypads and RFID readers (Wiegand 26/34) 

Up to 8 devices can be connected to the keypad data bus. The type of the connected keypad must be specified using TrikdisConfig software (see chapter 5.5 ““Modules” window”). The control panel will automatically recognize and link the connected devices.

For operating the alarm with Protegus or Paradox keypads, including user codes, bypass, iButton/RFID, calls, SMS and PGM outputs, see the [SP3 user guide for Protegus and Paradox keypads](paradox-user-guide/index.md).

<img alt="Two wiring diagrams. SP3 to keypad: AUX+ (+12V) to RED, AUX- to BLK, GRN to GRN, YEL to YEL; keypad ZONE connects through a keypad zone switch to AUX-. Listed keypads: SK-LED TouchPad, SK-LCD TouchPad, SK LCD Button, SK LED Button, Paradox K636, K10H(V), K32 LED, K32+ LED, K32LCD+, K35, TM50 and TM70. SP3 to Crow CR16 or CR-LCD keypad: AUX+ (+12V) to POS, AUX- to NEG, GRN to DATA, YEL to CLOCK." src="./image23.webp" style="width:7.016680883639545in;height:1.7333366141732283in" />

<img alt="Wiring diagram: SP3 to keypad and Wiegand 26/34 entry reader. AUX+ (+12V) to keypad RED and reader R, red (+U); AUX- to keypad BLK and reader B, black (GND); GRN to keypad GRN; YEL to keypad YEL; IO1 to reader G, green (D0); IO2 to reader W, white (D1). Listed keypads: SK-LED TouchPad, SK-LCD TouchPad, SK LCD Button, SK LED Button, Paradox K636, K10H(V), K32 LED, K32+ LED, K32LCD+, K35, TM50 and TM70." src="./image24.webp" style="width:4.100008748906387in;height:3.4566732283464567in" />

<img alt="Wiring diagram: SP3 to Crow CR16 or CR-LCD keypad and Wiegand 26/34 entry reader. AUX+ (+12V) to keypad POS and reader R, red (+U); AUX- to keypad NEG and reader B, black (GND); GRN to keypad DATA; YEL to keypad CLOCK; IO1 to reader G, green (D0); IO2 to reader W, white (D1)." src="./image25.webp" style="width:4.11334208223972in;height:3.12000656167979in" />

Up to 2 RFID readers can be connected to the control panel. If 2 RFID readers are connected to the control panel, no keypads can be connected.

<img alt="Wiring diagram: SP3 to Wiegand 26/34 RFID entry reader with keypad. AUX+ (+12V) to R, red wire (+U); AUX- to B, black wire (GND); GRN to G, green wire (D0); YEL to W, white wire (D1)." src="./image26.webp" style="width:4.090008748906387in;height:1.7633366141732283in" />

<img alt="Wiring diagram: SP3 to two Wiegand 26/34 RFID readers with keypads. Entry reader: AUX+ (+12V) to R, red (+U); AUX- to B, black (GND); GRN to G, green (D0); YEL to W, white (D1). Exit reader: shared AUX+ to R and AUX- to B; IO1 to G and IO2 to W." src="./image27.webp" style="width:4.090008748906387in;height:3.2233398950131233in" />

### Schematics for connecting TM17, CZ-Dallas readers 

The **CZ-Dallas** iButton key reader connects to the „FLEXi“ SP3 using the “*1 Wire*” data bus. The length of the wires connecting to the data bus can be up to 30 m:

<img alt="Wiring diagram: SP3 to CZ-Dallas reader. AUX+ through separate 1k resistors to brown wire RED LED+ and green wire GREEN LED+; LED also joins the green wire after its resistor. 1 W to white wire; C to yellow wire LED- and gray wire. Set the LED output to 'System state': the reader light is red when armed and yellow when disarmed." src="./image28.webp" style="width:4.896676509186352in;height:2.7000054680664918in" />

The **TM17** reader connects to the „FLEXi“ SP3 using the *RS485* data bus. The length of the wires connecting to the *RS485* data bus can be up to 100 m.

<img alt="Wiring diagram: SP3 to TM17 reader. AUX+ (+12V) to red wire; AUX- to blue wire; 485 A to black wire; 485 B to white wire." src="./image29.webp" style="width:3.840007655293088in;height:2.04667104111986in" />

### Schematic for connecting a temperature sensor

**Temperature sensors** should be connected according to the given schematic. Maxim®/Dallas® DS18S20, DS18B20 temperature sensors (up to 8) or AM2301 humidity and temperature sensor (up to 1) can be connected to the „FLEXi" SP3 control panel.

If a wire longer than 0,5 meters is used to connect a temperature sensor, we recommend using **twisted pair cable (UTP4x2x0,5 or STP4x2x0,5)**.

The +5V terminal on the board is for supplying devices connected to the 1-Wire data bus with 5 V DC voltage. The maximum output current is 0,2 A. The output is protected from overload. If the maximum allowed current is exceeded, the power will automatically be switched off. The control panel automatically recognizes and links connected devices.

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image30.webp" alt="Wiring diagram: SP3 to DS18B20 temperature sensor. +5V to +Vdd by red wire; 1 W to DQ by yellow wire; C to GND by black wire." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image31.webp" alt="Wiring diagram: SP3 to AM2301 temperature and humidity sensor. +5V to +Vdd by red wire; 1 W to DQ by yellow wire; C to GND by black wire." style="width: 100%; height: auto;" />
  </figure>
</div>

### Schematics for connecting a relay and an LED indicator 

Using the relay terminals, it is possible to remotely control (turn on/off) various electrical devices. The panel’s universal I/O terminal must be configured as an output (OUT) and must have the definition Remote control assigned.

<img alt="Two wiring diagrams. Relay: SP3 AUX+ and IOx connect across the relay coil; the relay contact terminals are NC, C and NO. LED indicator: SP3 AUX+ connects through a 2k2 resistor and LED in series to IOx." src="./image32.webp" style="width:3.984722222222222in;height:0.9652777777777778in" />

###  Schematic for connecting Ethernet communicator E485 

The *E485* module allows the control panel to send and receive control commands using a wired internet connection. If an *E485* module is connected to the control panel, reports to the CMS and to *Protegus2* will be sent using wired internet and mobile internet will not be used. If wired internet connectivity is lost, mobile internet will be used for sending reports to the CMS. If wired internet connectivity is restored, the control panel will automatically stop using mobile internet and will switch to communicating with CMS and *Protegus2* mobile app using the *E485*, i.e. wired internet.

<img alt="Wiring diagram: SP3 to E485 Ethernet communicator. AUX+ (+12V) to + DC; AUX- to - DC; 485 A to A 485; 485 B to B 485. The E485 connects to a LAN cable; RS485 connection up to 100 m." src="./image33.webp" style="width:3.3033398950131234in;height:1.6066699475065618in" />

See chapter 5.3 ““Reporting to CMS” window” on how to choose connectivity priority (SIM, WiFi, LAN(E485)). The „FLEXi“ SP3’s configuration for the E485 Ethernet module is described in chapter 5.5. ““Modules” window”.

If the E485 is connected, a SIM card is not necessary for the control panel.

### Schematic for connecting RF-SH 

The firmware version of the *"FLEXi" SP3* control panel must be SP3_xxx0_0101.fw (firmware version 1.01 or higher). When connected to the *RF-SH* wireless sensor receiver, the *"FLEXi" SP3* can work with wireless sensors (up to 32), wireless sirens (up to 16), key fobs (up to 42), and wireless keypads (up to 8) from "Crow".

<img alt="Wiring diagram: SP3 to RF-SH. SP3 AUX+ (+12 V) to RF-SH +DC, AUX- to -DC, 485 A to A RS 485, and 485 B to B RS485." src="./image34.webp" style="width:2.5466721347331585in;height:1.2500021872265967in" />

### Schematic for connecting RTX3 

The firmware version of the *"FLEXi" SP3* control panel must be: SP3_xxx1_0112.fw (firmware version 1.12 and higher). When connecting the RTX3 wireless sensor receiver, *"FLEXi" SP3* can work with wireless sensors from "Paradox" (magnetic contacts, PIR sensors, glass break sensors (G550), smoke detectors (SD360), key fobs (REM2, REM25), sirens (SR230, SR250), keypads (K37), PGM and zone expansion module (2WPGM), repeater (RPT1)).

For RTX3 firmware, connection and Paradox wireless-device enrollment or removal, see [Using Paradox wireless devices with FLEXi SP3 (RTX3)](paradox-rtx3/index.md).

<img alt="Wiring diagram: SP3 to RTX3. SP3 AUX+ (+12V) to RTX3 RED, AUX- to BLK, GRN to GRN, and YEL to YEL." src="./image35.webp" style="width:2.233337707786527in;height:1.23333552055993in" />

### Schematic for connecting RF-HW 

The *"FLEXi" SP3* control panel firmware version must be SP3_xxx2_0114.fw (firmware version 1.14 or higher). When connected to the *RF-HW* wireless sensor receiver, the *"FLEXi" SP3* will be compatible with "Honeywell" wireless sensors, sirens, keypads and key fobs.

<img alt="Wiring diagram: SP3 to RF-HW. SP3 AUX+ (+12 V) to RF-HW +DC, AUX- to -DC, 485 A to A 485, and 485 B to B 485." src="./image36.webp" style="width:2.6400054680664917in;height:1.2366688538932633in" />

### Schematic for connecting RF-S8 

The *"FLEXi" SP3* control panel firmware version must be SP3_xxx4_0122.fw (firmware version 1.22 or higher). When connected to the *RF-S8* wireless sensor receiver, the *"FLEXi" SP3* will be compatible with "S8" wireless sensors, sirens, and key fobs.

<img alt="Wiring diagram: SP3 to RF-S8. SP3 AUX+ (+12 V) to RF-S8 +DC, AUX- to -DC, 485 A to A 485, and 485 B to B 485." src="./image37.webp" style="width:2.6400054680664917in;height:1.2200021872265967in" />

### Schematic for connecting RF-LORA 

The *„FLEXi“ SP3* control panel firmware version must be SP3_xxx4_0122.fw (firmware version 1.22 or higher). When connected to an *RF-LORA* wireless sensor receiver, the *„FLEXi“ SP3* can work with wireless sensors (up to 32), sirens (up to 16), and key fobs (up to 32) from company „Maximum“. / Configuring the *„FLEXi“ SP3* using expansion modules is described in Section 5.5. "The 'Modules' Window."

<img alt="Wiring diagram: SP3 to RF-LORA. SP3 AUX+ (+12 V) to RF-LORA +DC, AUX- to -DC, 485 A to A 485, and 485 B to B 485." src="./image38.webp" style="width:2.8700054680664917in;height:1.2566688538932633in" />

### Schematics for connecting for LORA series expanders 

<img alt="Wiring diagram: SP3 AUX+ (+12 V), AUX-, 485 A and 485 B connect to RF-LORA +DC, -DC, A 485 and B 485 respectively. RF-LORA has wireless links up to 5000 m to iO-LORA and REL-LORA. REL-LORA L and N connect to 100–230 V AC; iO-8-LORA +DC and -DC connect to a 12–26 V supply. PB-LORA is shown without wiring. iO-LORA +DC and -DC connect to 12 V DC. Its D0, D1, -DC and +DC connect to the Wiegand 26/34 entry reader’s G, W, B and R wires respectively. Its 1-Wire connects to the CZ-Dallas reader’s white wire; COM connects to its gray wire and LED- via the yellow wire. The 1-Wire connection limit is 30 m. iO-LORA C connects to +DC; NO connects through a 1k resistor to RED LED+ via the green wire, and NC connects through a 1k resistor to Green LED+ via the brown wire. Set xOUT to System State: alarm on lights the reader red, and alarm off lights it green." src="./image39.webp" style="width:7.086805555555555in;height:5.3694444444444445in" />

### Schematics for connecting iO series expander modules 

If the security control panel „FLEXi“ SP3 needs to have more inputs IN or outputs OUT, connect a wired or wireless TRIKDIS iO series input and output expander. The „FLEXi“SP3’s configuration for expander modules is described in chapter 5.5 ““Modules” window”.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; max-width: 66%;">
  <figure style="margin: 0;">
    <img src="./image40.webp" alt="Wiring diagram: SP3 to iO-8. SP3 AUX+ (+12 V) to iO-8 +DC, AUX- to -DC, 485 A to A, and 485 B to B." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image41.webp" alt="Wiring diagram: SP3 to iO-WL. SP3 AUX+ (+12 V) to iO-WL +DC, AUX- to -DC, 485 A to A RS485, and 485 B to B RS485." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Wiring diagram: SP3 BAT+ and BAT- connect to a 12 V battery. SP3 AUX+ and AUX- connect by red and blue wires to +DC and -DC on the wired iO-MOD and iO; 485 A and 485 B connect by black and white wires to their A RS485 and B RS485. The two iO-MOD modules shown each link wirelessly to an iO-WL, up to 300 m. The upper iO-WL and iO share a 12–28 V supply at +DC and -DC; their A RS485 and B RS485 connect over RS485 up to 300 m. The upper iO +5V, 1-Wire and COM connect to Vdd+, DQ and GND on a DS18B20 or DS18S20 temperature sensor. The lower iO-WL has a 12–28 V supply. Its 1-Wire connects to the CZ-Dallas reader’s white wire; COM connects to its gray wire and LED- via the yellow wire. The 1-Wire connection limit is 30 m. The lower iO-WL C connects to +DC; NO connects through a 1k resistor to RED LED+ via the green wire, and NC connects through a 1k resistor to Green LED+ via the brown wire. Set xOUT to System State: alarm on lights the reader red, and alarm off lights it green. The diagram states up to 8 system expansion modules and up to 4 iO-MOD modules." src="./image42.webp" style="width:7.086805555555555in;height:4.539583333333334in" />

### Schematics for connecting RF transmitter T16 

RF transmitter T16 used for transmitting security control panel event messages via TRIKDIS radio networks. / The transmitter can send its own event messages and event messages received from security control panels to the CMS (central monitoring station) with the possibility to forward to the end user.

<img alt="Wiring diagram: SP3 to T16. SP3 AUX+ (+12 V) to T16 +DC, AUX- to -DC, 485 A to A 485, and 485 B to B 485." src="./image43.webp" style="width:2.27667104111986in;height:1.2566688538932633in" />

### Schematics for connecting SF485 

*SF485* works as secondary channel for security panel events transmission to CMS (Central Monitoring Station) or *Protegus2* mobile app over the SigFox network, when primary channel fails. Events are transmitted in Contact ID format.

<img alt="Wiring diagram: SP3 to SF485. SP3 AUX+ (+12 V) to SF485 +DC, AUX- to -DC, 485 A to A 485, and 485 B to B 485." src="./image44.webp" style="width:2.31667104111986in;height:1.2300021872265967in" />

### DC Voltage measurement with „FLEXi“ SP3 

The *„FLEXI“ SP3* can be used to measure DC voltage. Voltage from 0 V to 30 V is measured (exceeding 30 V will cause damage to the control panel *„FLEXI“ SP3*). The measured voltage must be connected to terminals “IN1” and “C”. “IN1” - positive terminal. “C” - negative terminal.

<img alt="Wiring diagram: SP3 to equipment whose voltage is measured. SP3 IN1 connects to equipment +U, and SP3 C connects to equipment -U." src="./image45.webp" style="width:3.516674321959755in;height:0.8000010936132983in" />

Connect the „FLEXI“ SP3 to a computer with a USB Type-C cable. Run TrikdisConfig. The software will automatically recognize the connected „FLEXI“ SP3 and will open a window for configuration. In the “**Sensor**” window, specify the “**In1 Voltage**” and also specify the amount of voltage above which a message will be generated.

- **Max** – when the voltage is higher than this setting, an event message will be generated. For an event message to be generated, the “**High**” box must be ticked.

- **Min** – when the voltage is lower than this setting, an event message will be generated. For an event message to be generated, the “**Low**” box must be ticked.

<img alt="TrikdisConfig Sensors window. Highlighted row ID 1 has Module type In1 Voltage, Sensor name Sensor 1, Max 15, Min 6, High and Low checked, and Delay, min 0." src="./image46.webp" style="width:7.086614173228346in;height:2.106299212598425in" />

The PGM output can be controlled when measuring a voltage above a set value or below a set value. In TrikdisConfig you need to select the PGM output and set it to “**Remote Control**” operation mode.

<img alt="TrikdisConfig PGM window, Outputs tab. Highlighted PGM No 3 has Name PGM 3, PGM output SP3 10 I/O, Output definition Remote Control, and Pulse Time, s 20." src="./image47.webp" style="width:7.086614173228346in;height:1.9173228346456692in" />

Go to the “**Set Action**” tab.

<img alt="TrikdisConfig PGM window, Set Action tab. Highlighted row ID 1 has Enable checked, PGM No. PGM3 - SP3 10 I/O, Action PGM ON, Pulse Time, s 0, Factor Sensor, Factor No. S1, Start when Higher than set, and Set value 13." src="./image48.webp" style="width:7.086614173228346in;height:1.9173228346456692in" />

- **Enable** – enables the PGM.

- **PGM No.** – specify the PGM output that the “**IN1**” input will control.

- **Action** - set the operating mode of the PGM output:
- **PGM OFF** – turn off PGM output.

- **PGM ON** – enable PGM output.

- **Pulse OFF -** turning off the PGM output for the duration of the pulse (after receiving the command, the output turns off for the duration of the pulse and then turns on)**.**

- **Pulse ON** – turn on the PGM output for the duration of the pulse (after receiving the command, the output turns on for the duration of the pulse and then turns off).
- **Pulse time, s** – set the pulse time anywhere from 0 to 9999 seconds.
- **Factor** – set sensor.

- **Factor No.** – assign a voltage measuring input “**IN1**”.

- **Start when** – set an additional condition for activating the PGM output.

- **Set value** – specify the voltage (V) that the controller will monitor and control the PGM output.

### Turning on the control panel 

To turn on the control panel, first you need to turn on its power supply. The control panel’s LED indicators must operate in the following way:

- The PWR diode must blink in green – this indicates that the power supply voltage is sufficient;

- The NET diode must be green solid and periodically blink in yellow no less than 3 times – the green color indicates that the SIM card is successfully registered on the mobile network, while the number of green flashes indicate the mobile signal strength.

!!! note
    Sufficient mobile network strength is 3 (three yellow flashes of the NET
    indicator). / If you see fewer yellow flashes of the NET diode, the
    strength of the mobile network is insufficient. We recommend choosing a
    different place for installing the control panel, changing the location
    of the antenna or using a more sensitive mobile antenna. / If the light
    indication is different, see chapter 1.4 "LED indication of operation"
    to find out the reason. / If all of the „FLEXi" SP3 indicator
    lights are off, check the power supply and connections.
## Remote control 

### Linking the *„FLEXi“ SP3* to a user’s *Protegus2* account 

With Protegus2, users can control the alarm system remotely. They can also see the system state and receive system event reports.

1.  If you do not yet have a personal Protegus cloud account, open the page [www.protegus.app](https://www.protegus.app) using a web browser and create an account by clicking the “*Sign up”* link.

    <div style="margin: 20px 0; text-align: center;">
      <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-android.webp" alt="Get it on Google Play" style="height:50px;">
      </a>
      <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-web.webp" alt="Open Web App" style="height:50px;">
      </a>
      <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;">
        <img src="./protegus-ios.webp" alt="Download on the App Store" style="height:50px;">
      </a>
    </div>

2.  Click on the link you receive in your e-mail to activate your account.

3.  Download and install Protegus2 mobile app into your smartphone.
4. Launch the Protegus2 mobile app on your smartphone and log in using your username and password.

!!! warning "Important"
    When adding the „FLEXi" SP3 to Protegus2:

    1.  An activated SIM card must be inserted and the PIN code must be
        entered or disabled;

    2.  Protegus cloud service must be enabled. See chapter 5.4 "Users
        & Reporting" (**Protegus** tab);

    3.  The power must be switched on ("POWER" LED must be green solid);

    4.  Must be connected to network ("NET" LED must be green solid when
        connected to Cellular network; and/or "MOD" LED must be green solid when
        connected to WiFi network).
5. Click „Add new system” and enter the *„FLEXi“ SP3*’s “*Unique ID/IMEI*” number. You can find it on the packaging sticker. After entering the ID, click “Next”.

<img alt="Protegus2 Scan QR code screen with a Unique ID/IMEI field, a Scan QR code button and Next. A callout says the IMEI can be found on the package, on the controller or in TrikdisConfig as a Unique ID." src="./image50.webp" style="width:2.811023622047244in;height:3.8464566929133857in" />

### Arming/disarming the system using *Protegus2* 

1.  To control the system, go to the *Protegus2*.

2.  In *Protegus2*, click on the “Armed” (or “Disarmed”) button. In the window that opens, enter the control panel user code.

3.  If the program does not respond to Your commands or the program window views are entirely different, go to  
    *Settings* -> *System configuration* -> System out of sync? and click the button “Sync”.

<img alt="Protegus2 system screen showing two areas: Sritis 1 is Armed and Sritis 2 is Disarmed. Each area has Arm and Disarm controls." src="./image51.webp" style="width:2.220472440944882in;height:3.279527559055118in" />

### Configuration and control via SMS messages 

The „FLEXi“ SP3 security control panel can be controlled and configured remotely using SMS messages.

Structue of SMS message: Command `[space]` Password `[space]` Data

The control panel’s default SMS password is **123456**. For safety reasons we recommend changing it to something only You know and not forgetting Your password!

#### SMS command list

| **Command** | **Data** | **Description** |
|----|----|----|
| *INFO* |  | Request information about the control panel. Object name, partition state, IMEI number, Cellular signal strength, firmware version and serial number will be included in the reply. E. g.: INFO 123456 |
| *RESET* |  | Reset the device. E.g.: RESET 123456 |
| *OUTPUTx* | *ON* | Turn on an output, “x” is the output number. E.g.: OUTPUT1 123456 ON |
|  | *OFF* | Turn off an output, “x” is the output number. E.g.: OUTPUT1 123456 OFF |
|  | *PULSE=ttt* | Turn on an output for a specified time - “x” is the output OUT number and “ttt” is a three-digit number that specifies pulse time in seconds. / E.g.: OUTPUT1 123456 PULSE=002 |
| *PSW* | *New password* | Change password. E.g.: PSW 123456 654123 |
| *TIME* | *YYYY/MM/DD,12:00:00* | Set date and time. E.g.: TIME 123456 2025/05/09,10:02:00 |
| *TXTA* | *Object name* | Specify object name. E.g.: TXTA 123456 Namas |
| *RDR* | *PhoneNR#SMStext* | Forwards SMS messages to the specified number. The phone number must start with a "+" symbol and the international country code. / E.g.: RDR 123456 +37061234567#forwarded text |
| *ASKI* |  | Send SMS message with statuses of inputs IN. E.g.: ASKI 123456 |
| *ASKO* |  | Send SMS message with statuses of outputs OUT. E.g.: ASKO 123456 |
| *ASKA* |  | Send SMS message with statuses of areas. E.g.: ASKA 123456 |
| *ASKT* |  | Send SMS message with values of all temperature sensors. / E.g.: ASKT 123456 |
| *DISARM* | *SYS:x* | Disarm the alarm, “x” is the partition number (1-8). E.g.: DISARM 123456 SYS:1 |
| *ARM* | *SYS:x* | Arm the alarm, “x” is the partition number (1-8). E.g.: ARM 123456 SYS:1 |
| *STAY* | *SYS:x* | Arm area “x” in Stay mode, “x” is the partition number (1-8). / E.g.: STAY 123456 SYS:1 |
| *SLEEP* | *SYS:x* | Arm area “x” in Sleep mode, “x” is the partition number (1-8). / E.g.: SLEEP 123456 SYS:1 |
| *FRS* |  | Resets the fire sensor’s output, if the output OUT is assigned the function “Fire sensor reset”. E.g.: FRS 123456 |
| *SETN* | *PhoneX=PhoneNR#Name#email* | Add a phone number, username and assign it to user “x”. “x” is the phone number’s line on the list. The phone number must start with a "+" symbol and international country code. The phone number and username must be separated by a \# symbol. / E.g.: SETN 123456 PHONE5=+37061234567#JOHN#john@peter.com |
|  | *PhoneX=DEL* | Delete phone number and username from the list. / E.g.: SETN 123456 PHONE5=DEL |
| *UUSD* | *\*Uusd code#* | Sends a UUSD code to the operator. E.g.: ***UUSD 123456 \*245#*** |
| *CONNECT* | *Protegus=ON* | Connect to Protegus cloud service. E.g.: CONNECT 123456 PROTEGUS=ON |
|  | *Protegus=OFF* | Disconnect from Protegus cloud service. E.g.: CONNECT 123456 PROTEGUS=OFF |
|  | *Code=123456* | Protegus cloud service code. E.g.: CONNECT 123456 CODE=123456 |
|  | *IP=0.0.0.0:8000* | Specify the main server’s connection channel’s TCP IP and Port. / E.g.: CONNECT 123456 IP=0.0.0.0:8000 |
|  | *IP=0* | For turning off the main channel. E.g.: CONNECT 123456 IP=0 |
|  | *ENC=123456* | TRK encryption key. E.g.: CONNECT 123456 ENC=123456 |
|  | *APN=Internet* | APN name. E.g.: CONNECT 123456 APN=INTERNET |
|  | *USER=user* | APN user. E.g.: CONNECT 123456 USER=User |
|  | *PSW=password* | APN passwod. E.g.: CONNECT 123456 PSW=Password |

### Control via phone call 

!!! note
    The system administrator can control the „FLEXi" SP3 by SMS
    messages and phone calls. / If you want to allow others to control the
    system using phone calls, enter their identification data using
    TrikdisConfig software or SMS commands. / **<u>Control via phone
    call does not work with control panels *SP3_хх7х*. Control panel
    *SP3_12xx* does not have a voice message with firmware 1.14 and
    higher.</u>**
**„FLEXi“ SP3 phone call control commands**

Controlling outputs OUT and alarm system partitions using phone calls:

1.  If the user is assigned the right to control outputs OUT and the output OUT is assigned the type “Remote control” (using TrikdisConfig), or the security system „FLEXi“ SP3 is partitioned into 1 or more areas: call the phone number of the „FLEXi“ SP3’s SIM card***. The „FLEXi“ SP3*** will answer the call and you can dial commands using the phone’s numeric keypad (see table below).

#### Mobile phone keypad command list

| **Keypad buttons** | **Function** | **Description** |
|----|----|----|
| *[1][area no][#]* | Arm selected alarm system area | E.g. (arm area 2): 12# |
| *[2][ area no][#]* | Disarm selected alarm system area | E.g. (disarm area 2): 22# |
| *[3][output no][#][stay no]* | Control selected output OUT | Controls a specified output OUT. / State: / *[0]* – output turned off; / *[1]* – output turned on; / *[2]* – turned off for pulse time; / *[3]* – turned on for pulse time; / (pulse time is specified using TrikdisConfig software, in the “PGM” window) / E.g. (set output 1OUT to “on” state): 31#1 / E.g. (set output 2OUT to “on” state for **Pulse time** specified in the TrikdisConfig “PGM” table): 32#3 |
| *[4][#][recording number][#]* | Start recording of selected sound file | E.g. (start voice recording 1): 4#1# |
| *[5]* | Listen (1-5) to the voice recording just made | E.g.: ***5*** |
| *[6]* | Save the voice recording | E.g.: ***6*** |

An audio signal accompanies the beginning and end of the audio file recording. Audio file recording time 15 sec. An audio signal accompanies the end of audio playback. Recording is complete when you hear a beep. Other actions can only be taken when the beep is heard.

## Setting parameters using TrikdisConfig software 

1.  Download the configuration software TrikdisConfig from [www.trikdis.com/](http://www.trikdis.com/lt) (enter “TrikdisConfig” in the search field) and install it.

2.  Connect the „FLEXi“ SP3 to a computer using a USB Mini-B cable.

    **Note:** If you connect the „FLEXi“ SP3 to a computer using a USB cable while it is powered on and operating, the „FLEXi“ SP3 will stop performing its control panel functions and will switch to programming mode.

3.  Launch the configuration software TrikdisConfig. The program will automatically recognize the connected device and will automatically open the „FLEXi“ SP3 configuration window.

4.  Click **Read [F4]** to see current „FLEXi“ SP3 parameters. If a pop-up window appears, enter the *administrator* or *installer* code.

### Description of TrikdisConfig status bar 

When the „FLEXI“ SP3 is connected, TrikdisConfig will show information about the connected device in the status bar.

<img alt="TrikdisConfig status bar showing the IMEI/Unique ID field, Status: reading done, device and serial number fields, BL: 1.02, FW: 1.23, State: USB and Role: Administrator." src="./image52.webp" style="width:7.086614173228346in;height:0.5905511811023622in" />

| **Name** | **Description** |
|----|----|
| IMEI/​Unique ID | IMEI number of the device |
| Status | Operational status |
| Device | Device type (must show SP3_xxxx) |
| SN | Device serial number |
| BL | Bootloader version |
| FW | Device firmware version |
| HW | Device hardware version |
| State | Type of connection with the program (USB or remote) |
| Role | Shows the access level (shown after entering an access code) |

When the **Read [F4]** button is clicked, the program will read and display the settings currently stored inside the „FLEXi“ SP3. With TrikdisConfig, alter the desired settings according to the program window descriptions given below.

### “System Options” window 

**“System general” tab**

<img alt="TrikdisConfig System Options window on the System general tab. The General, SIM and Time settings groups show fields including Object ID, APN set to internet, EOL Type set to 2k2+2k2+4k7, time zone set to +2 and Power failure delay set to 300 seconds." src="./image53.webp" style="width:7.086614173228346in;height:4.062992125984252in" />

**Settings group “General”**

- If reports will be sent to CMS, enter the **Object ID** (4 symbol hexadecimal number, 0-9, A-F. **Do not use FFFE, FFFF Object ID.**) given by the CMS.

- **Object name** – will be included in reports sent via SMS messages (up to 20 symbols, letters and numbers can be used).

- **Test period** – if the box is ticked, periodic test reports will be sent every set period, unless **Start test at** is ticked and a time is set.

- **Start test at** – tick the box and specify a time when test reports should be sent.

- **Areas in test SMS** – the current protection modes of the specified areas will be included into the periodic test report.

- **Clear Events after reset** – if the box is ticked, all unsent event reports in buffer memory will be deleted if the control panel is reset.

- **Text language** – specific symbols of the selected language will be used in SMS messages.

- It is possible to **Suspend event reporting when ...** a number of **same events per ... s** happen**.**

- **Restore event reporting after** – set the time after which suspending of event reporting will be cancelled. The time can be anywhere from 0 to 999 minutes.

- **Call** – when an event occurs, the „FLEXi“ SP3 will call user(-s) as many times as is set. If the call is declined or answered, the „FLEXi“ SP3 will stop calling. Duration of a call is 20 seconds.

- **EOL Type** – specify the nominals of the resistors connected to the sensors (EOL – End Of Line. RT + R1 + R2. Resistor RT - tamper; resistor R1 - sensor No 1; resistor R2 - sensor No 2).

- **Communication path test** – specify the time interval after which the control panel will check the Backup communication channels by sending messages to the CMS. After sending the messages on the Backup communication channels, the control panel will return to the Primary communication channel.

- **LED out as 2Wire fire** - check the box when you connect the two-wire fire detector to the LED output.

**Settings group “SIM”**

- Enter the **SIM card PIN.** If the PIN code is disabled for the specific SIM card, do not change the the default code.

  - **APN** – network service provider’s mobile internet access point name. You must enter the APN if event messages will have to be sent to Protegus cloud or to the CMS using mobile internet.
- If required by the GPRS network service provider, enter the APN username and password in the fields **Login** and **Password**.

- **Locked ICCID** - enter the ICCID number of the SIM card if you want the control panel to work only with this SIM card.

- **Preferred operator** – after entering the mobile network operator code, the communicator will connect only to the network of the selected operator. The mobile operator code consists of MCC and MNS codes.

**Settings group “Time settings”**

You can set the time by clicking the **Set PC time** button. If **Disabled** is chosen in the **Time synchronization** field, the computer’s time will be set for the control panel. If a modem or a server is chosen in the **Time synchronization** field, the control panel will synchronize its time according to that modem or server.

- **Time zone (Hours)** – specify your country’s time zone. For example, if the control panel will be installed in Lithuania, enter **+3**.

- **Time set** – specify a server to synchronize the ***„FLEXi“ SP3**’s* internal clock with. Synchronization occurs after the control panel is powered on.

- **Daylight saving time** – if you check the box, the control panel's internal clock will be automatically switched to summer or winter time.

- **AC failure delay** - in the event of a power failure in the main power supply, a power failure notification will be sent after the specified time delay. When the supply voltage is restored, a notification of the supply voltage recovery will be sent after the specified time delay.

**“Partitions” tab**

<img alt="TrikdisConfig System Options window on the Partitions tab, with Partitions enabled set to 8. The table lists Areas 1–8 with Entry, Exit, Bell, Squawk, Re-ARM, Force-ARM, Keyswitch and Tamper settings." src="./image54.webp" style="width:7.086614173228346in;height:2.8070866141732282in" />

- **Partitions enabled** – enter the number of independent parts that the alarm system will be divided into.

- **Partition name** – enter the partition name.

- **Entry** – time for entering through a *Delay* zone, walking to a keypad and disarming the alarm system. Time can be anywhere between 0 and 999 seconds.

- **Exit** – time for leaving the premises through a *Delay* zone after entering the alarm system arm code using a keypad. Time can be anywhere between 0 and 999 seconds. If the alarm system is armed remotely, e.g. via Protegus2 mobile app, the system will not count **Exit time** and will arm immediately.

- **Bell** – duration of siren operation once the alarm is triggered. Time can be anywhere between 0 and 999 seconds.

- **Squawk** - the siren will make a short sound once when the alarm is armed and twice when it is disarmed.

- **Re-ARM** – tick this box if you want the system to automatically re-arm the alarm system after the system was disarmed remotely, but the *Delay* zone was not violated during the set entry time.

- **Force-ARM** – tick this box to allow to switch the system to protection (ARM) mode even if *Stay* zones are violated, as long as the *Entry* zone is not violated.

- **Keyswitch** – choose in what way – *Pulse* or *Level* – a Keyswitch zone must be triggered for the system to enable or disable premise protection*.*

- **Tamper** – choose the reaction type (Silent, Audible when armed, Always Audible) when the system detects a sensor tamper event. “Silent” – recipients will receive event reports, but the siren will not switch on; „Audible when protected“ - recipients will receive event reports, but the siren will switch on only if the tamper event happens when the system is armed; „Always audible“ - recipients will receive event reports and the siren will will switch on even when the alarm system is disarmed.

**“Scheduler” tab**

<img alt="TrikdisConfig System Options window on the Scheduler tab. The schedule table has columns for Enable, Partition, Time, Not Armed, Action, days of the week, Holiday and Holiday group; visible rows show partition 1, 00:00, Disarm, Holiday Disabled and group Any." src="./image55.webp" style="width:7.086614173228346in;height:1.921259842519685in" />

In this table, you can arrange scenarios for automatically arming and disarming the security system by choosing different days of the week and including public holidays.

- **Enable** – enable the schedule for when the system will automatically arm and disarm.

- **Partition** – specify the partition affected by the specific schedule.

- **Time** – set the time when the specific action must be done.

- **Not Armed** - check the box and the schedule action will be performed only if the control panel is not armed in AWAY mode.

- **Action** – set the protection mode (Disarm/Arm/Sleep/Stay) that the system will switch to automatically at the specified time.

- **Monday, ... Sunday** – tick the days of the week that the set protection mode and time will be valid on.

- **Holiday** – set how the schedule behaves during holidays (Disabled/Ignore on holidays/Additional when holidays/Only holidays). Disabled – there are no holidays. Ignore on holidays – do not carry out the schedule during holidays. Additional when holidays – perform an additional action during holidays. Only holidays – carry out the schedule during holidays.

- **Holiday group** – specify a holiday group (Any/1/2/3/4) that the schedule will consider to be holidays. If “Any” is chosen, the schedule will operate in holiday mode during any active holiday.

**“Holidays” tab**

<img alt="TrikdisConfig System Options window on the Holidays tab. The visible holiday rows are enabled, show matching start and stop dates of 01.01.2000, and have unchecked boxes for Groups 1–4." src="./image56.webp" style="width:7.086614173228346in;height:1.9291338582677164in" />

- **Enable** – Tick this box to enable the holiday.

- **Start date** – set the start date of the holiday.

- **Stop date** – set the end date of the holiday. If the holiday is only one day long, this date should match the **Start date**.

- **Group 1, Group 2, Group 3, Group 4** – combine holidays into groups.

**“System troubles” tab**

<img alt="TrikdisConfig System Options window on the System troubles tab. A table lists faults from AC Fault through Antimasking Fault, each with an unchecked Restrict ARM box." src="./image57.webp" style="width:7.086614173228346in;height:2.9881889763779528in" />

If at least one control panel internal fault field is checked, then the control panel will not be able to be Armed if this fault is present.

**“Access” tab**

<img alt="TrikdisConfig System Options window on the Access tab. Access codes include Administrator Code 123456, SMS password and Installer Code fields; Installer permissions show Object ID and SIM card checked, with Area Settings and the visible menus set to Editable." src="./image58.webp" style="width:7.086614173228346in;height:3.1102362204724407in" />

**Settings group “Access codes”**

- **Administrator Code** – *(default code - 123456)* gives full access to configuration (the code must be 6 symbols long; it can consist of latin letters and/or numbers).

- **SMS password** – *(default password - 123456)* is used for controlling the system safely using SMS messages. For safety purposes, change it into a 6-symbol password only You know.

- **Installer Code** – (*default code - 654321*) gives installers access to configuring the system. For safety purposes, change it into a 6-symbol code only You know.

!!! note
    If the default *administrator code* is set (123456), after pressing
    **Read [F4]** the program will immediately show the current
    operational parameters of the device without asking for the code.
**Settings group “Installer permissions”**

- Specifies the installer’s permissions.

### “Reporting to CMS” window 

**“Reporting” tab**

<img alt="TrikdisConfig Reporting to CMS window on the Reporting tab. Primary and backup channels have Communication type set to Disabled; parallel and parallel backup channels show TCP/IP. These four panels have Domain or IP, Port, Protocol, Phone number and Encryption Key fields. Separate Backup channel 2 and Parallel backup channel 2 panels show only Phone number fields." src="./image59.webp" style="width:7.086614173228346in;height:3.87007874015748in" />

The control panel sends events to the monitoring station via cellular internet (IP) or with SMS messages.

Events can be sent over several channels of communication. The primary and parallel communication channels can operate simultaneously, this way the control panel can send events to two receivers at the same time. Backup channels can be assigned for both primary and parallel channels, which will be used when the connection via the primary or parallel channel is interrupted.

Communication is encoded and password protected. A TRIKDIS receiver is required for receiving and sending event information to the monitoring programs:

• For connection over IP - software receiver IPcom Windows/Linux, hardware IP/SMS receiver RL14 or multichannel receiver RM14.

• To receive SMS messages - hardware IP/SMS receiver RL14, multichannel receiver RM14 or SMS receiver GM14.

SMS communication is particularly useful as a backup channel, because it works even when there is no mobile internet connection. We do not recommend SMS as a primary channel.

**Settings groups “Primary channel” and “Backup channel”**

- **Communication type** – choose a protocol for communicating with the receiver (TCP/IP, UDP/IP, SMS).

- **Domain or IP** - enter the receiver’s domain or IP address.

- **Port** – enter the receiver’s network port number.

- **Protocol** – **TRK** for data transfer using Trikdis receivers, **SIA DC-09** for IP receivers capable of receiving event reports transmitted in SIA DC-09 protocols.

- **Phone number** – (only for SMS messages) enter the phone number of a TRIKDIS SMS receiver. The telephone number must start with the international country code (e.g. 370xxxxxxxx).

- **Encryption key** – 6-digit encryption key that must match the encryption key of the CMS receiver.

If parameters are set for the parallel channel, reports will be sent using both channels simultaneously. Both channels cannot be configured for the same receiver. When the parallel channel is enabled, events can be sent simultaneously to two receivers (e.g., local and centralized monitoring stations).

**“Backup channel 2” and “Parallel backup channel 2” SMS reporting number**

Backup SMS messages are sent when they cannot be transmitted via the primary, parallel and backup channels. It is especially useful because it works even when there is no IP connection in the mobile operator network.

This channel is operational only when IP mode is set for the first channel and its backup channel.

SMS notifications will be sent to the Central Monitoring Station SMS receiver: 1) immediately after the first time when control panel starts operating; and 2) if the TCP / IP or UDP / IP connection is interrupted in the first channel and its backup channel.

- **Phone number** - enter the phone number for TRIKDIS CMS (Central Monitoring Station) SMS receiver. Phone number must begin with the country code (e.g., 370xxxxxxxx).

**“Settings” tab**

<img alt="TrikdisConfig Reporting to CMS window on the Settings tab. Return to Primary after is 5 minutes, IP Ping period is enabled at 60 seconds, DHCP mode is checked, and both CMS and Protegus use WiFi as Main type and SIM as Backup type." src="./image60.webp" style="width:7.086614173228346in;height:3.8818897637795278in" />

**Settings group “Settings”**

- **Return to primary after** – time period after which the „FLEXi“ SP3 will attempt to regain connection using the *primary* channel, in minutes.

- **IP Ping period** – period for sending PING signals for checking connectivity on the GPRS channel, in seconds. To enable these signals, tick the box.

- **SMS Ping period** – period for sending PING signals for checking connectivity on the SMS channel, in minutes. To enable these signals, tick the box.

- **Backup reporting after** – enter how many failed attempts to send messages using the *primary* channel should take place before switching to the *backup* channel.

- **DNS1, DNS2** – DNS server addresses.

- **Object ID in SIA DC-09** –specify the object number.

- **SIA DC-09 receiver No.** – specify the receiver number.

- **SIA DC-09 line No.** – specify the line number.

- **Local time in SIA** - check the box so that the messages sent to the CMS (central monitoring station) will indicate the time set in the module.

!!! warning "Important"
    Regardless of IP settings, make sure the DNS addresses match those
    supported by your ISP.
**Settings group “Reporting mode”**

For setting parameters on how the control panel will communicate with the CMS channels and with Protegus2. The connection types are specified in order. If the control panel fails to connect using the **Main type** connection , it switches to the **Backup type**, and so on. If the backup connection type was successful in transmitting the message to the CMS, then the **Return to main** connection type will be attempted after the specified time interval.

- **Main type** – select a connection type (SIM, WiFi, LAN(E485)) with the CMS receiver and Protegus2.

- **Backup type** – select a connection type (SIM, WiFi, LAN(E485)) with the CMS receiver and Protegus2.

- **Backup type 2** – select a connection type (SIM, WiFi, LAN(E485)) with the CMS receiver and Protegus2.

- **Radio T16 (SF485)** – tick this box, when the T16 transmitter will be used for transmitting information. The T16 transmitter operates as a backup connectivity channel if at least one of the other connection methods (SIM, WiFi, LAN(E485)) is used. If there are no other connection methods, it is the main one. The T16 can only be used to send reports to the CMS.
- **Return to main (both channel)** – time period after which the „FLEXi“ SP3 will attempt to regain connection using the *primary* channel, if it was running a backup channel, min.

**Settings group “Communicator network settings”**

- **DHCP mode** – mode for registering on the WiFi network (manual or automatic). Tick the box and the „FLEXi“ SP3 control panel will automatically read the network settings (subnet mask, gateway) and will automatically be assigned an IP address (automatic registration mode).

- **Static IP** – static IP address for manual registration mode.

- **Subnet mask** – subnet mask for manual registration mode.

- **Default gateway** – gateway for manual registration mode.

- **WiFi SSID name** – name of the WiFi network (that the „FLEXi“ SP3 control panel will connect to).

- **WiFi SSID password** – WiFi network password.

**Settings group “SIM parameters”**

- **Disable indication of the absence of a SIM card** – when the box is ticked, the „FLEXi“ SP3 control panel will not display an indication that there is no SIM card inserted.

- **Use dial and SMS when the working over internet module** – ticking this box will enable controlling the panel using phone calls and SMS messages. If the box is not ticked and there is a WiFi network available, then SMS and phone calls are not used. If the box is not ticked and there is no WiFi network, the „FLEXi“ SP3 can still be controlled using phone calls and SMS messages. The „FLEXi“ SP3 will send SMS messages to the user.

- **Disable the use of SIM card mobile data** – ticking the box will disable the usage of the SIM card’s mobile data. Data will only be sent using WiFi. If a WiFi network is temporarily unavailable, the „FLEXi“ SP3 will store data in memory. When the WiFi network is restored, the „FLEXi“ SP3 will send data using WiFi.

<a id="Users_window"></a>
### “Users & Reporting” window 

**“Users” tab**

<img alt="TrikdisConfig Users & Reporting window on the Users tab. The Users & Reporting to User table has fields for Name, Tel number, Email, Code, Tag code and Areas, followed by reporting option checkboxes." src="./image61.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

**Settings group “Users & Reporting to User”**

- **Name** – name of the user. These names will be used in event SMS messages.

- **Tel number** – the user’s telephone number that will be used to control the alarm system remotely and will receive SMS messages. The numbers must start with the international country code. The first 8 telephone numbers will receive reports using messages and phone calls.

- **Email** – enter the user’s email, so that the user would be invited to Protegus2 to control the system.

- **Code** – the alarm system arm and disarm code assigned to the user.

- **Tag code** – enter the identification number of an RFID card, RFID key fob, or iButton electronic key.

- **Areas** – the areas that the specific user can control.

- **A** – tick the box if you want to allow the user to ARM the alarm.

- **D** – tick the box if you want to allow the user to DISARM the alarm.

- **PGM** – if the box is ticked, the user can call the „FLEXi“ SP3 and turn on or off desired outputs OUT using DTMF tones.

- **ACK** – if the box Is ticked, the „FLEXi“ SP3 will send the user SMS messages with **SMS answer text** about the completion of received commands.

- **FWD** – if the box is ticked, SMS messages received from non-users of the system (e.g. SIM card account balance, random promotional messages, etc.) will be forwarded to the user.

#### Linking RFID key fobs (cards) 

You can add RFID key fobs (cards) by entering their ID numbers into the Tag code field in *TrikdisConfig*. Click the Write [F5] button to write the RFID key fob (card) list into the control panel.

--8<-- "en/faq/index.md:sp3-wiegand-reader-door-output"

<img alt="RFID card with its printed ID number outlined in red near the lower edge." src="./image62.webp" style="width:2.3833377077865268in;height:1.5166699475065617in" />

#### Linking electronic (iButton) keys 

Linking electronic keys using the TM17 reader.

1.  If the **Tag code** list is empty, the first added key should be written to the first line of the list and becomes the **Master key.**

2.  To turn on contact key linking mode, hold the **Master key** against the “eye” of the key reader for at least 10 seconds. When linking mode is on, the TM17 key reader’s LED indicator *State* will start to blink in green.

3.  To link user keys, hold them against the “eye” of the key reader one by one. 3 sound signals from the reader will indicate that the key has been linked to the system.

4.  When you finish linking the user electronic (*iButton*) keys, hold the **Master key** against the key reader again to disable linking mode. When the linking mode is turned off, the *State* LED indicator of the TM17 key reader will stop blinking*.*

5.  To delete all keys (including the master key), hold the **Master key** against the reader for at least 20 seconds.

Linking electronic keys using the CZ-Dallas reader.

1.  If the **Tag code** list is empty, the first added key should be written to the first line of the list and becomes the **Master key.**

2.  To turn on contact key linking mode, hold the **Master key** against the “eye” of the key reader for at least 10 seconds.

3.  To link user keys, hold them against the „eye” of the key reader one by one.

4.  When you finish linking the user electronic (*iButton*) keys, hold the **Master key** against the key reader again to disable linking mode.

5.  To delete all keys (including the master key), hold the **Master key** against the reader for at least 20 seconds.

!!! warning "Important"
    The purpose of the Master key is to link other electronic keys. If you
    use the Master key for ARM/DISARM commands, their execution will have a
    delay.
**“Protegus” tab**

<img alt="TrikdisConfig Users & Reporting window on the Protegus tab. In Cloud application, Enable cloud service and Parallel reporting are checked, and Cloud Access Code is 123456." src="./image63.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

**Settings group “Cloud application”**

- **Enable cloud service** – enable Protegus cloud service, the „FLEXi“ SP3 will be able to exchange data with Protegus2 app and it will be possible to configure the control panel remotely using TrikdisConfig.

- **Parallel reporting** – check the box and messages will be sent simultaneously via the primary channel (to CMS) and to Protegus2.

- **Cloud access code** – 6-digit code for connecting with Protegus2 (default - 123456).

**“SMS answer texts” tab**

<img alt="TrikdisConfig Users & Reporting window on the SMS answer texts tab. The table pairs answer types with editable SMS text, including Command done, Wrong password, Wrong data, Wrong command, Zone alarm, Zone restore, Output ON and Output OFF." src="./image64.webp" style="width:7.086614173228346in;height:2.645669291338583in" />

**Settings group “SMS answer texts”**

- The text for answers to commands sent using SMS messages can be customized in the column **SMS text**.

### “Modules” window

**“Keypads” tab**

<img alt="TrikdisConfig Modules window, Keypads tab. The keypad table has Serial, Keypad type, Areas and Remove columns. The Keypad parameters panel shows Quick ARM checked, Incorrect codes until lockout set to 3 and Lockout timer set to 1 min." src="./image65.webp" style="width:7.086614173228346in;height:3.716535433070866in" />

- **Serial** – the keypad’s serial number automatically detected by the control panel. To delete a keypad, enter zeros or click on the **Remove** button.

- **Keypad type** – keypad type, automatically detected by the control panel.

- **Areas** - you can specify which areas the keypad will be able to control (only valid for the following keypads: FLEXi SK LCD, FLEXi SK LED, SK LCD Button, SK LED Button).

- **Remove** – pressing the button will remove the keypad from the list.

**Settings group “Keypad parameters”**

- **Keypad type** – specify the keypad type (Crow CR16, Paradox LED, Wiegand reader) connected to the control panel (GRN, YEL terminals).

- **Additional Wiegand on 1IO/2IO** – tick the box if an additional RFID card reader will be connected. An additional reader can be connected to the terminals IO1 and IO2, which cannot be used as inputs or outputs in this case.

- **6 digits user code** - check this box, and the user code entered from the keypad will be 6 digits long. If the current code was 4 digits long, the first two digits of the current code will be added to the user code (1234 becomes 123412). All 4-digit user codes will be changed according to the described method.

- **Duress code type** – choose a duress code type. If you are forced to arm or disarm the alarm system and enter the duress code, the system will arm or disarm the system and will immediately send a silent warning to the CMS (central monitoring station).

- **Quick ARM** – the buttons ARM, STAY, SLEEP can be used to quickly arm the security system without entering a code.

- **Incorrect codes until lockout** – enter the number of incorrect codes allowed before blocking the keypad.

- **Lockout timer** – enter the time for how long the keypad will be blocked.

- **Panic alarm type** – specify what the alarm will sound (**Audible** / **Silent** / **Disabled**) if the **Panic alarm** function keys on the keypad are pressed. When an **Audible** alarm is set, alarm messages are sent to the Protegus2 and the CMS (central monitoring station) and the control panel will sound an audible alarm on the keypad and turn on the siren. When the **Silent** alarm is set, alarm messages are sent to the Protegus2 and the CMS, and the control panel will turn off the audible alarms. If set to Disabled, no alarm message is sent to Protegus2 and CMS.

- **Medical alarm type** – specify what the alarm will sound (**Audible** / **Silent** / **Disabled**) if the **Medical alarm** function keys on the keypad are pressed. When the **Audible** alarm is set, alarm messages are sent to the Protegus2 and the CMS, and the control panel will sound an audible alarm on the keypad and turn on the siren. When the **Silent** alarm is set, alarm messages are sent to the Protegus2 and the CMS, and the control panel will turn off the audible alarms. If set to **Disabled** alarm messages are not sent to Protegus2 and CMS.

- **Fire alarm type** - specify what the alarm will sound (**Audible** / **Silent** / **Disabled**) if the **Fire alarm** function keys on the keypad are pressed. When the **Audible** alarm is set, alarm messages are sent to the Protegus2 and the CMS, and the control panel will sound an audible alarm on the keypad and turn on the siren. When the **Silent** alarm is set, alarm messages are sent to the Protegu2s and the CMS, and the control panel will turn off the audible alarms. If set to **Disabled** alarm messages are not sent to Protegus2 and CMS.

- **Low voltage reader (1IO/2IO)** – check the box to change the communication protocol between the control panel and the reader if the connected RFID reader is not working.

- **Use fingerprint** – check the box if a fingerprint reader with Wiegand 26/34 protocol will be connected.

- **Do not change charset** - check the box if you do not want to change the text encoding of zone and partition names for the SK-LCD TouchPad keypad.

- **Custom entry beep** - check the box and the entry delay beep on the keypad will be intermittent.

**“RS485 modules” tab**

<img alt="TrikdisConfig Modules window, RS485 modules tab. The Module dropdown is open, showing choices including iO expander, E485 communicator and RF-LORA transceiver." src="./image66.webp" style="width:7.086614173228346in;height:3.641732283464567in" />

**Settings group “RS485 modules”**

- **ID** – module’s number on the list.

- **Module** – choose the module being used (modules iO, iO-WL, TM17, iO-8, RF-SH, E485 T16, SF485, iO-MO, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-LORA, RF-HW, RF-S8) from the module list.

- **Serial No.** – mandatory 6-digit number that is given on stickers on the module’s casing and packaging.

- **Area** – assign the module to an area (the TM17 will display the status of the area it is assigned to, and also the states of the zones assigned to the same area).

- **Name** – you can give the module a name.

- **Firmware version** – when the „FLEXi“ SP3 finds the connected module, the version of its firmware will be shown.

**“E485 settings” tab**

<img alt="TrikdisConfig Modules window, E485 settings tab. Under Communicator network settings, DHCP mode is checked; Static IP, Subnet mask and Default gateway each show 0.0.0.0." src="./image67.webp" style="width:7.086614173228346in;height:2.1141732283464565in" />

- **DHCP mode** – mode for registering on the LAN network (manual or automatic). Tick the box and the „FLEXi“ SP3_3E control panel will automatically read the network settings (subnet mask, gateway) and will automatically be assigned an IP address (automatic registration mode).

- **Static IP** – static IP address for manual registration mode.

- **Subnet mask** – subnet mask for manual registration mode.

- **Default gateway** – gateway for manual registration mode.

### “Wireless” window 

<img alt="TrikdisConfig Wireless sensors window. The Sensors table shows Device type as Disabled in the visible rows, with columns for Serial No., Area, User, Key 3, Key 4 and Configure." src="./image68.webp" style="width:7.086614173228346in;height:1.9251968503937007in" />

“FLEXI” SP3, with a connected RF-LORA module, can use wireless sensors, sirens, and key fobs from the company “Maximum”.

#### Registration of the RF-LORA receiver of wireless sensors to the FLEXi SP3 control panel 

The „FLEXi“ SP3 control panel is equipped with firmware revision 4 SP3_xxx**4**\_0121.fw (firmware version 1.21 or higher), which will ensure the operation of “Maximum” wireless sensors. The RF-LORA wireless transceiver must be connected to the control panel.

1.  Switch on the power supply to the “FLEXi” SP3 control panel.

2.  Wait 1 minute.

3.  Launch ***TrikdisConfig**.*

4.  Connect the “FLEXi” SP3 to a computer using a USB Mini-B cable.

5.  The list of modules should show "**RF-LORA transceiver**", as well as the serial number and firmware version. If you see the firmware version of the RF-LORA transceiver, you can skip steps 6-13.

<img alt="TrikdisConfig Modules window, RS485 modules tab. The highlighted row shows RF-LORA transceiver under Module, a populated Serial No. field and RF-Lora 433 02.39 under Firmware version." src="./image69.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

6. If the list does not indicate "**RF-LORA transceiver**", then you must select "**RF-LORA transceiver**" from the list.

2.  In the “**Serial No.**” field, enter the serial number of the RF-LORA module. This serial number can be found on the device and the packaging sticker.

<img alt="TrikdisConfig Modules window, RS485 modules tab. The highlighted RF-LORA transceiver row has a populated Serial No. field and an empty Firmware version field." src="./image70.webp" style="width:7.086614173228346in;height:1.5826771653543308in" />

3. Click **Write [F5]**.

2.  Disconnect the USB Mini-B cable.

3.  Wait 1 minute for the “FLEXi” SP3 and RF-LORA to link together.

4.  Connect a USB Mini-B cable to the “FLEXi” SP3.

5.  Click **Read [F4]**.

6.  The firmware version of the RF-LORA will appear in the “**Modules**” window.

<img alt="TrikdisConfig Modules window, RS485 modules tab. The highlighted row shows RF-LORA transceiver under Module, a populated Serial No. field and RF-Lora 433 02.39 under Firmware version." src="./image69.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

14. The RF-LORA module is now linked to the “FLEXi” SP3.

15. Disconnect the USB Mini-B cable.

16. Click “**Disconnect**”.

<img alt="TrikdisConfig Modules window, RS485 modules tab. The RF-LORA transceiver row shows a firmware version, and the Disconnect button is highlighted." src="./image71.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

17. Wait 1 minute.

#### Remote linking of wireless sensors 

Using TrikdisConfig, remotely connect to the “FLEXi” SP3 control panel.

!!! warning "Important"
    Remote configuration will only work when "FLEXi" SP3:

    1.  An activated SIM card must be inserted and the PIN code must be
        entered or disabled.

    2.  Mobile internet is activated on the SIM card.

    3.  Protegus cloud service must be enabled.

    4.  The power must be switched on ("**PWR**" LED must be green
        blinking).

    5.  Must be connected to network ("**NET**" LED must be green solid and
        yellow blinking).
In the “**Remote access**” section enter the control panel “**IMEI/Unique ID**” number. This number can be found on the device and the packaging sticker.

<img alt="TrikdisConfig Remote access section. The Unique ID field and Configure button are highlighted for connecting to a control panel." src="./image72.webp" style="width:7.086614173228346in;height:2.141732283464567in" />

Click “**Configure**”.

In the newly opened window click **Read [F4]**. If required, enter the administrator or installer code.

Go to the “**Wireless sensors**” window.

<img alt="TrikdisConfig Wireless sensors window. The Sensors table shows disabled devices, with Learn sensors and Update buttons above it." src="./image73.webp" style="width:7.086614173228346in;height:1.7480314960629921in" />

Click the “**Learn sensors**” button.

<img alt="TrikdisConfig Wireless sensors window. The Learn sensors button above the Sensors table is highlighted." src="./image74.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

All wireless sensors can be linked simultaneously. Insert batteries into the wireless sensors (PIR, magnetic contact, flood detector, smoke detector, siren).

When enrolling sensors, the *RF-LORA* module must be at least 1 m from the sensors.

1.  The “**DATA/TROUBLE**” LED on the RF-LORA module will flash green/red.

2.  RF-LORA module - switches to learning mode. TrikdisConfig will open the sensor binding window.

<img alt="TrikdisConfig Learning mode window. It instructs the user to insert batteries into the new sensor and wait for initialization; a Stop learning button is below." src="./image75.webp" style="width:3.7401574803149606in;height:2.322834645669291in" />

3. Press the "**TAMPER**" button on the sensor.

<img alt="Drawing of the back of an open wireless sensor. A red arrow labelled Tamper points to the spring-loaded tamper switch near the upper left." src="./image76.webp" style="width:1.7733366141732283in;height:2.37667104111986in" />

4. On the RF-LORA module, the “**DATA/TROUBLE**” LED will flash green for a short time (this indicates that the sensor is enrolled). After a few seconds, the “**DATA/TROUBLE**” indicator will start flashing green/red again.

2.  TrikdisConfig will open a new window in which you need to assign a “**Zone Number**” and “**Zone Definition**” to the wireless sensor.

3.  Click “**Save**”.

<img alt="TrikdisConfig New device was found window for a Corner PIR sensor. The highlighted settings are Zone number 1 and Zone definition Instant, followed by the highlighted Save button." src="./image77.webp" style="width:3.0708661417322833in;height:1.9724409448818898in" />

4. Wireless sensor is included in the list of sensors.

2.  If you need to add the next sensor, you need to press the “**TAMPER**” button on the sensor. And make the settings described above.

3.  Click “**Stop learning**” to complete the registration of wireless sensors.

<img alt="Learning mode window instructs the user to insert the batteries into the new sensor and wait for initialization. A highlighted message reports: New device was found: ID 1 Corner PIR. The Stop learning button is highlighted." src="./image78.webp" style="width:3.7401574803149606in;height:2.645669291338583in" />

10. Click “**Yes**” for the sensors to be written to the “FLEXi” SP3 control panel or "**No**" if you want to adjust the parameters additionally.

<img alt="Save configuration dialog asks whether to save new parameters to the module. The Yes button is highlighted; No is also available." src="./image79.webp" style="width:2.7559055118110236in;height:1.1614173228346456in" />

Wait a few minutes. Click **Read [F4].**

TrikdisConfig will display a list of registered wireless sensors in the “**Wireless sensors**” window. The “**Serial No.**” field will list the serial number.

<img alt="TrikdisConfig Wireless sensors window, Sensors tab. A registered Corner PIR row is highlighted, including its Serial No. field; the serial number is omitted." src="./image80.webp" style="width:7.086614173228346in;height:1.5590551181102361in" />

Check that the sensors are correctly assigned to the “**Zones”** and “**Areas**” of the control panel (“**Zones**” window).

<img alt="TrikdisConfig Zones window, Zones settings tab. The highlighted Zone 1 row has an Input beginning Wireless Corner, Area 1, Definition Instant and Type EOL_T." src="./image81.webp" style="width:7.086614173228346in;height:1.736220472440945in" />

If you set zone **“Type”** EOL-T, then the sensor tamper monitoring mode will be enabled.

After making changes, press **Write [F5]**..

!!! note
    To delete wireless sensors from the "FLEXi" SP3's memory:
    
    1.  Launch ***TrikdisConfig**.*
    
    2.  Connect the „FLEXi" SP3 to a computer using a USB Mini-B cable
        or connect to the „FLEXi" SP3 remotely. Click the
        **Read [F4]** button.
    
    3.  In the TrikdisConfig window "**Wireless sensors**", in the
        column "**Device type**", select "**Disabled**" instead of the
        wireless sensor that you wish to delete and click **Write [F5]**.
        The wireless sensor is now removed from the "FLEXi"
        SP3's memory.
#### Linking wireless sensors without remote access 

All wireless sensors can be linked simultaneously. Insert batteries into the wireless sensors (PIR, magnetic contact, flood detector, smoke detector, siren). **When enrolling sensors, the *RF-LORA* module must be at least 1 m from the sensors.**

1.  Make sure that the RF-LORA transceiver is registered with the „FLEXi“ SP3 security panel.

2.  Switch on the power supply to the “FLEXi” SP3 control panel.

3.  Remove the cover from the RF-LORA transceiver.

4.  Press and hold the "**LEARN**" button on the RF-LORA module until the "**DATA/TROUBLE**" indicator starts flashing green/red.

5.  Release the "**LEARN**" button.

6.  The flashing "**DATA/TROUBLE**" indicator indicates that the RF-LORA is in the wireless device registration mode.
1.  Press the "TAMPER" button on the sensor.

<img alt="Drawing of the back of an open wireless sensor. A red arrow labelled Tamper points to the spring-loaded tamper switch near the upper left." src="./image76.webp" style="width:1.7733366141732283in;height:2.37667104111986in" />

2. On the RF-LORA module, the “**DATA/TROUBLE**” LED will flash green for a short time (this indicates that the sensor is enrolled).

2.  After a few seconds, the “**DATA/TROUBLE**” indicator will start flashing green/red again.

3.  If you need to add the next sensor, you need to press the “**TAMPER**” button on the sensor.

4.  To complete the registration of wireless sensors, press and hold the "**LEARN**" button until the "**DATA/TROUBLE**" indicator stops flashing green/red. Release the "**LEARN**" button. The RF-LORA transceiver has exited the registration mode.

5.  Connect a USB Mini-B cable to the “FLEXi” SP3.

6.  Launch TrikdisConfig. Press the **Read [F4]** button.

7.  TrikdisConfig window "**Wireless sensors**" will contain a list of registered wireless devices. In the field "**Serial No.**" 7- digit serial numbers will be written.

<img alt="TrikdisConfig Wireless sensors window, Sensors tab. A registered Corner PIR row is highlighted, including its Serial No. field; the serial number is omitted." src="./image80.webp" style="width:7.086614173228346in;height:1.5590551181102361in" />

15. Check that the sensors are correctly assigned to the “**Zones”** and “**Areas**” of the control panel (“**Zones**” window).

<img alt="TrikdisConfig Zones window, Zones settings tab. The highlighted Zone 1 row has an Input beginning Wireless Corner, Area 1, Definition Instant and Type EOL_T." src="./image81.webp" style="width:7.086614173228346in;height:1.736220472440945in" />

16. After making changes, press **Write [F5]**.

17. Wireless sensors registered.

### “Zones” window 

**“Zones settings” tab**

<img alt="TrikdisConfig Zones window, Zones settings tab. The table lists each zone’s Name, Input, Area, Definition, Type, reporting options, Delay and CID Code; Zone 1 uses SP3 1 I/O, Area 1, Instant and EOL_T." src="./image82.webp" style="width:7.086614173228346in;height:1.9330708661417322in" />

- **Zone No** – the zone’s number on the list.

- **Name** - enter the name of the zone.

- **Input** – you can select which „FLEXi“ SP3 or expander module input IN to assign to the zone.

- **Area** – assign the zone to an area.

- **Definition** – every zone can be assigned one of these zone functions:

  - **Delay** – for connecting a magnetic entrance door contact. You can set entry and exit times for this type of zone.

After the alarm is armed, the violation of the “Delay” zone is allowed within the exit time. If the zone is still violated when the time is up, outputs OUT “Siren” and “Flash” are turned on and alarm reports are sent.

When the alarm is armed, a violation of the “Delay” zone starts the entry time counter, during which the alarm must be disarmed. If the alarm is still not disarmed when the time is up, outputs OUT “Siren” and “Flash” are turned on and alarm reports are sent.

- **Interior** – for connecting a motion sensor to the entry door.

If the alarm system is armed and the “Interior” zone is triggered, output signals for “Siren” and “Flash” are turned on and a report about the triggering of the alarm system is sent.

If the alarm system is armed and the “Delay” zone is triggered first, the “Interior” zone can also be triggered during the set entry time. If the alarm is not disarmed during the set entry time, output signals for “Siren” and “Flash” are turned on and a report about the triggering of the alarm system is sent.

- **Interior Stay** – for connecting a motion sensor to the entry door.

If the alarm system is armed and the “Interior Stay” zone is violated, output signals for “Siren” and “Flash” are turned on and a report about the triggering of the alarm system is sent.

If the alarm system is armed and the “Delay” zone is triggered first, the “Interior Stay” zone can also be triggered during the set entry time. If the alarm is not disarmed during the set entry time, output signals for “Siren” and “Flash” are turned on and a report about the triggering of the alarm system is sent.

When the alarm system is armed in STAY mode, “Interior Stay” zones are not protected.

- **Instant** – for connecting motion sensors. If the “Instant” zone is violated when the alarm is armed, OUT outputs “Siren” and “Flash” are turned on and a message about the alarm being triggered is sent.

- **Instant Stay** – for connecting motion sensors. If an “Instant Stay” zone is violated when the alarm is armed, OUT outputs “Siren” and “Flash” are turned on and a message about the alarm being triggered is sent. When the alarm system is armed in STAY mode, “Instant Stay” zones are not protected.

- **Fire** – for connecting fire sensors. If this zone is violated, OUT outputs “Siren” and “Flash” are turned on immediately and an event report is sent.

  - **Keyswitch** – for connecting a keypad or other switch. If the switch triggers this zone the security alarm will be armed or disarmed. The alarm will be armed after the set **Exit time** passes.

  - **24_hour** – for connecting glass break and tamper detectors. If this zone is violated, OUT outputs “Siren” and “Flash” are turned on immediately and an event report is sent.

  - **Silent** – if the alarm is armed and this zone is violated, an event report will immediately be sent, but “Siren” and “Flash” output signals will not be generated.

  - **Silent 24h** – for connecting panic buttons. If this zone is violated, an event report will immediately be sent regardless of the state of the security system, but “Siren” and “Flash” output signals will not be formed.
- **Type** – choose the type of circuit connected to the zone input IN from a list: NC – normally closed; NO – normally open; EOL – with an end of line resistor; EOL_T – with an end of line resistor and tamper monitoring; ATZ – two zone normally closed circuit with end of line resistors, without tamper monitoring function (to use this type, choose the second ATZ zone in the input list); ATZ_T – two zone normally closed circuit with end of line resistors, with tamper monitoring function (to use this type, choose the second ATZ zone in the input list); 3EOL - with an end of line resistor and tamper monitoring (this setting is for when motion detection with anti masking function is used).

- **Chime** - checking the box will enable the zone chime feature. When the zone is activated, the keypad will beep.

- **Bypass** – tick this box if you want to allow this zone to be bypassed and ignored when it is triggered.

- **Force** – tick this box if you want to allow arming the security system with the zone open. When the alarm is armed, open zones set to “Force” mode will be temporarily disconnected. After zone restore, they will be turned on and monitored again. A violation of this zone will trigger an alarm.

- **CMS** – if the box is ticked, zone event reports will be sent to the central monitoring station (CMS).

- **Prot.** – if the box is ticked, zone event reports will be sent to Protegus cloud.

- **Delay** – input IN zone reaction time, in milliseconds.
- **CID code** – event contact ID codes. This code will be filled in automatically after selecting a definition for the zone.

- **Sound** – specify the number of the voice recording that will be played back to the user when the „FLEXi“ SP3 control panel calls during an alarm (this function is valid for SP3_12xx control panel with firmware version up to 1.13 inclusive).

**“SMS & Call reporting” tab**

<img alt="TrikdisConfig Zones window, SMS & Call reporting tab. A table lists zone Event and Restore rows with SMS and Call checkboxes under User 1; the visible boxes are clear." src="./image83.webp" style="width:7.086614173228346in;height:1.921259842519685in" />

This tab will only be shown if there is at least one user phone number in the *[„Users & Reporting"](#Users_window)* window*.*

- **Zn** – zone number with the event identification word. Can be *“Event”* or “Restore”.

- **User / SMS and Call** – choose how users will be informed about events in every individual zone – using SMS messages or/and phone calls.

### “PGM” window

**“Outputs tab”**

<img alt="TrikdisConfig PGM window, Outputs tab. PGM 1 uses BELL with output definition Siren; PGM 2 uses LED with System State; PGM 3 uses SP3 10 I/O with Fire Sensor Reset. Each visible row has Pulse Time 20 s." src="./image84.webp" style="width:7.086614173228346in;height:2.094488188976378in" />

- **PGM No** – specifies the PGM output’s number on the list.

- **Name** - enter PGM output name.

- **PGM output** – assign the outputs OUT of the „FLEXi“ SP3 or an external device to the PGM.

- **Area** – assign the output OUT to an area.

- **Output definition** – choose the operational mode of the output OUT.
- **Siren** – for connecting a siren.

- **Remote control** – for controlling external electric devices.

- **Fire Sensor Reset** – for resetting a fire sensor after triggering.

- **System State** – for connecting a security system state indicator. E.g., an LED can display when the alarm is armed / disarmed.

- **Flash** – if the alarm is armed a line signal is generated, if it is triggered – a pulse type signal. The signal is cut off when the alarm is disarmed.

- **Thermostat** – this setting will make the PGM output operate in thermostat mode. A temperature sensor must be connected to the „FLEXi“ SP3. The PGM output must have thermostat mode set and the temperature that it must maintain has to be specified.

- **Buzzer** – for repeating the sound signals from a keypad.
- **Pulse time, s** – you can set the desired OUT turn on duration from 0 to 9999 seconds.

- **CMS** – if this box is ticked, PGM output turn on/off reports will be sent to the central monitoring station (CMS).

- **Prot.** – if the box is ticked, PGM output turn on/off reports will be sent to Protegus cloud.

**“Set Action” tab**

<img alt="TrikdisConfig PGM window, Set Action tab. The table has Enable, PGM No., Action, Pulse Time, Factor, Factor No., Start when and Set value columns. Visible rows are disabled and show PGM No. N/A, Action PGM OFF and Factor Arm." src="./image85.webp" style="width:7.086614173228346in;height:2.106299212598425in" />

- **ID** – output’s number on the list.
- **Enable** – enables the PGM operation algorithm.

- **PGM No.** – select the desired PGM output OUT that will be controlled after the event described in columns **Factor**, **Factor No.**, **Start when**, **Set value** occurs.

- **Action**:
- **PGM OFF** – state of output OUT – “Off”.

- **PGM ON** – state of output OUT – “On”.

- **Pulse OFF** – initial state of output OUT – “On”. After the command the OUT state will become “Off” for the duration of the **Pulse time**, and later it will automatically return to the initial “On” state**.**

- **Pulse ON** – initial state of output OUT – “Off”. After the command the OUT state will become “On” for the duration of the **Pulse time**, and later it will automatically return to the initial “Off” state**.**
- **Pulse time, s** – you can set the pulse time anywhere from 0 to 9999 seconds.

- **Factor/Factor No.** – choose what event (Zone, Sensor, Jamming, Sensor lost, iButton, Arm, Disarm, SMS received, Zone(follow), Stay, Sleep, AC lost, Low battery, Zone tamper) will turn on the output OUT.

  - Schedules can be assign to an output OUT. The schedule shows when the output should be turned on. Up to 10 different schedules can be prepared in the **Scheduler tab**.

- **Start when** – you can set an additional condition when to turn on the output OUT depending on the **Factor** event.

- **Set value** – depending on the condition chosen in the **Factor** column (SMS received, Temperature) a value (text of received SMS message, voltage or temperature) can be specified. If this value is identified, the action (chosen in the **Action** column) will be performed. The text of the SMS message can be separated by using % symbols. % symbols are used for separating the keyword that will change the state of a PGM output from the entire received SMS message.

**%.....%** - part of the received SMS message text must match with the text entered between % symbols (e.g. **%hoUSe%**. The text in an SMS message must include the text “**hoUSe**”. Example of an SMS message: **VacationhoUSe25864**).

**.....%** - the beginning of the received SMS message must match the text entered until the % symbol (e.g. **hoUSe%**. The SMS message must start with the text **“hoUSe”**. Example of an SMS message: **hoUSeddss**).

**%.....** – the ending of the received SMS message must match with the text entered after the % symbol. (e.g. **%hoUSe**. The SMS message must end with the text **“hoUSe”**. Example of an SMS message: **1144hoUSe**).

The SMS message text is case-sensitive.

**“Control” tab**

<img alt="TrikdisConfig PGM window, Control tab. Entry/Exit control lists iButton, Wiegand 1 (G/Y) and Wiegand 2 (IO) readers. Paradox keypad control shows Utility key 1 (1+2) set to Area statuses; the other visible utility keys are set to None and Pulse." src="./image86.webp" style="width:7.086614173228346in;height:2.5118110236220472in" />

**Settings group “Entry/Exit control”**

- **Reader** – the readers that can be connected to the security panel are indicated.

- **En –** check the box to enable the reader to control the PGM output.

- **Code -** by checking the field, you will be able to perform an action (activate PGM output or control the control panel) with the user code.

- **PGM –** specify the PGM output that the reader will control. PGM output must be set to **Remote control** mode.

- **PGM mode –** set the PGM output triggering mode (**Pulse** or **Level**).

- **Area action -** indicate the change in the security mode of the security panel when an iButton key or RFID card is attached to the reader.

**Settings group “Paradox keypad control”**

- **Utility key** – pressing and holding the utility keys for 3 seconds will trigger the PGM output. The PGM output will activate for the duration of the pulse (if the operating mode is **Pulse**) or the level of the PGM output signal will change (if the operating mode is **Level**).

**“Scheduler” tab**

<img alt="TrikdisConfig PGM window, Scheduler tab. Each schedule has Enable, Start time and Stop time fields with separate Monday through Sunday checkboxes. The visible times are 00:00 and the checkboxes are clear." src="./image87.webp" style="width:7.086614173228346in;height:2.1141732283464565in" />

- **ID** – schedule’s number on the list.

- **Enable** – enable the schedule.

- **Start time** – set the time when OUT will be turned on (schedule start time).

- **Stop time** – set the time when OUT will be turned off (schedule end time).
- **Mon – Sun** – you can mark the days of the week when OUT will have to be turned on/off.

**“Thermostat” tab**

<img alt="TrikdisConfig PGM window, Thermostat tab. The table shows ID, PGM No., Action, Active, Sensor No. and Temperature. Visible thermostats have PGM No. N/A, Action Heat, no active sensors and Temperature 0." src="./image88.webp" style="width:7.086614173228346in;height:3.4173228346456694in" />

- **ID** – thermostat’s number on the list.

- **PGM No.** – specify the number of the PGM output that the thermostat will control.

- **Action** – set the thermostat’s operation mode: heating or cooling.

- **Active** – if the box is ticked, the thermostat will work with the selected temperature sensor according to the set temperature.

- **Sensor No –** assign a temperature sensor to the thermostat.

- **Temperature –** set the temperature that the thermostat will maintain.

**“SMS & Call reporting” tab**

<img alt="TrikdisConfig PGM window, SMS & Call reporting tab. PGM 1 Event, PGM 1 Restore and subsequent output events have SMS and Call checkboxes for User 1; the visible boxes are clear." src="./image89.webp" style="width:7.086614173228346in;height:2.1023622047244093in" />

**This tab will only be shown if there is at least one user phone number in the** ***[“Users & Reporting”](#Users_window)* window*.*** These settings can only be made for the first 8 users.

- **PGM** – shows the output OUT number and turn on/off event type (“Event” – output OUT turn on event and “Restore” – output OUT turn off event).

- **User / SMS and Call** – choose which users to inform using SMS messages and/or phone calls when the output OUT is turned on/off.

### “Sensors” window 

<img alt="TrikdisConfig Sensors window. The sensor table includes Module type, Serial No., Sensor name, Max, Min, High, Low and Delay. The open Sensor type menu offers Dallas 1-Wire and Humidity & Temperature (AM23xx series)." src="./image90.webp" style="width:7.086614173228346in;height:2.8622047244094486in" />

- **ID** – temperature sensor’s number on the list.

- **Module type** – choose a temperature sensor to assign to the ID.

- **Serial No.** - serial number of the temperature sensor that is connected to the сontrol panel.

- **Sensor name** – give the temperature sensor a name.

- **Max** – when the temperature is higher than this setting, an event report will be generated. For an event message to be generated, the **High** box must be ticked.

- **Min** – when the temperature is lower than this setting, an event report will be generated. For an event message to be generated, the **Low** box must be ticked.

- **Delay** - an event will be sent if the measured value (Max or Min) by the sensor is exceeded within the set time. Delay time is entered in minutes.

- **Sensor type** – choose the type of the connected temperature sensor (Dallas 1Wire – up to 8 temperature sensors of this type can be connected. If Dallas sensors are chosen, they will be linked automatically; Humidity & Temperature – one AM2301 temperature and humidity sensor can be connected. If the Humidity & Temperature sensor will be used, it must be manually assigned in the **Module type** column).

### “System events” window 

**“Events” tab**

<img alt="TrikdisConfig System events window, Events tab. The table lists Event name, Enable, CMS, Prot., CID Code, SMS event text and SMS restore text. Visible events include Low Battery, Periodic test, Arm/Disarm, RS485 fault, High temperature and Low temperature." src="./image91.webp" style="width:7.086614173228346in;height:2.468503937007874in" />

- **ID** – event’s number on the list.

- **Event name** – event name.

- **Enable** – enable event recognition and report generation.

- **CMS / Prot.** – reports on selected events will be sent to CMS and/or to Protegus cloud.

- **CID Code** – Contact ID code of the event.

- **SMS event text** – event SMS message text.

- **SMS restore text** – restore event SMS message text.

**“SMS & Call reporting” tab**

<img alt="TrikdisConfig System events window, SMS & Call reporting tab. Event and Restore rows, including Battery low and Battery restore, have SMS and Call checkboxes for User 1; the visible boxes are clear." src="./image92.webp" style="width:7.086614173228346in;height:2.4606299212598426in" />

This tab will only be shown if there is at least one user phone number in the “[*Users & Reporting*”](#Users_window) window*.*

- **ID** – number and identification word (*Event*, *Restore*) of the event.

- **Event SMS text** – text that will be used in event SMS messages.

- **User / SMS and Call** – choose the ways users will be informed about each event – SMS message and/or phone call.

### “Events log” window

<img alt="TrikdisConfig Events Log window. Read Log and Clear Log buttons sit above a table with Event No., Time, CID and Event definition columns. Visible entries include WiFi trouble, AC fault, SIM trouble and input alarms." src="./image93.webp" style="width:7.086614173228346in;height:2.645669291338583in" />

- **Read Log** button – command for reading the events log from the device’s memory.

- **Clear Log** – command for clearing the events log entries from the device’s memory.

- In the table, you can find the **Event No.**, **Time**, **CID** code, **Event definition**. The events log can show up to 1000 events stored in the „FLEXi“ SP3’s memory.

### Restore default settings 

To restore the control panel’s default settings, click the TrikdisConfig button **Restore**.

<img alt="TrikdisConfig Default settings area with the Restore button highlighted. The IMEI/Unique ID field and device status bar are visible; device-specific identifiers are omitted." src="./image94.webp" style="width:7.086614173228346in;height:1.1023622047244095in" />

### Remote configuration 

!!! warning "Important"
    Remote configuration will work only if:

    1.  The inserted SIM card is activated and the PIN code is either
        entered or disabled , or the device is connected to a WiFi network;

    2.  "Protegus cloud" is enabled. How to enable cloud is
        described in section 5.4 ""User & Reporting" windows";

    3.  Power supply is connected ("**PWR**" LED blinks green);

    4.  Registered to the network ("**NET**" LED must be green solid when
        connected to mobile network; and/or "**MOD**" LED must be green
        solid when connected to WiFi network).
1.  Start the configuration program TrikdisConfig.

2.  In the “**Remote access**” section enter the “**IMEI/Unique ID**” number of the control panel. This number can be found on the device and the packaging sticker.

<img alt="TrikdisConfig Remote access section. The Unique ID field and Configure button are highlighted for connecting to a control panel." src="./image72.webp" style="width:7.086614173228346in;height:2.141732283464567in" />

3. (Optional) in the “**System name**” field, enter the desired name for the “FLEXi” SP3 with this Unique ID.

2.  Press “**Configure**”.

3.  In the newly opened window click **Read [F4]**. If required, enter the administrator or installer code*.* To save the password, select “**Remember password**”.

4.  Set the necessary settings and when finished, click **Write [F5]**.

### Test control panel performance 

When the configuration and installation is complete, perform a system check:

1\. Generate an event:

\- by arming/disarming the system with the control panel’s keypad;

\- by triggering a zone alarm when the security system is armed.

2\. Make sure that the event arrives to the CMS (Central Monitoring Station) and/or is received in the Protegus2 application.

3\. To test the control panel outputs, activate them remotely and check their operation.

4\. If the security control panel will be controlled remotely, arm/disarm the security system remotely by using the Protegus2 app.

### Updating firmware

!!! note
    After connecting the „FLEXi" SP3 to TrikdisConfig, the
    program will automatically offer to update the firmware if any updates
    are available. An internet connection is needed for this feature. / If
    antivirus software is installed on your computer, it may block the
    automatic firmware update function. In this case, you will have to
    reconfigure your antivirus software.
The „FLEXi“ SP3’s firmware can also be updated or changed manually. All prior settings of the „FLEXi“ SP3 remain unchanged after an update. If the firmware is installed manually, it can be changed to a newer or an older version.

Perform these steps:

1.  Launch ***TrikdisConfig**.*

2.  Connect the „FLEXi“ SP3 to a computer using a USB Mini-B cable or connect to the „FLEXi“ SP3 remotely. If a newer version of firmware is available, the program will automatically offer to install it.

3.  Open the TrikdisConfig window **Firmware**.

<img alt="TrikdisConfig Firmware window: the Open firmware file field is blank, with an Open firmware button and a disabled Update (F12) button. The progress bar shows 0%." src="./image95.webp" style="width:7.086614173228346in;height:2.940944881889764in" />

4. Click the **Open firmware** button and choose the required firmware file.

2.  Click the **Update [F12]** button.

3.  Wait for the updates to finish.

Once configuration is complete, click the **Write [F5]** button and disconnect the USB cable.

## Warranty and limitation of liability

The control panel is given a 24-month warranty effective from the date of sale-purchase. For the duration of the warranty period, free repairs are guaranteed for faults caused by the manufacturer.

The warranty is valid if the control panel was installed by qualified personnel following the instructions in this document and the applicable regulations for installing electrical equipment and operated following the instructions in this document and the applicable regulations for safe operation of electrical equipment.

The control panel must be submitted for repairs in the manufacturer‘s packaging along with a defect report stating the nature of the malfunction.

Once the warranty has expired, the control panel‘s technical maintenance and repairs are performed at the buyer‘s expense.

The warranty can be terminated prematurely if:

- Unauthorized personnel repaired or tried to repair the control panel;

- The panel was used for anything other than its intended purpose;

- The panel was stored and (or) installed in unsuitable premises that had incompatible climate conditions or an aggressive chemical environment;

- The panel was mechanically broken and (or) intentionally damaged;

- The panel was damaged by *force majeure* circumstances (lightning discharge etc.).

The manufacturer is not responsible for:

- the control panel‘s malfunctions if the panel is installed or used not according to its manual.

- the control panel‘s malfunctions if the cause is a malfunction or loss of GSM/GPRS/Internet connectivity or malfunctions in the operator‘s network.

- restrictions or termination of GSM/GPRS/Internet connectivity services to the panel‘s buyer or user, and shall not compensate the panel‘s buyer or user for any property or non-property damages suffered from this.

- restrictions or termination of electricity supply service to the panel‘s buyer or user, and shall not compensate the panel‘s buyer or user for any property or non-property damages suffered from this.

- robbery, fire of the premises or any other losses suffered by the panel‘s buyer or user, and shall not compensate the panel‘s buyer or user for any property or non-property damages suffered from these events.

## Safety precautions

Read this manual carefully before using the control panel.

The „FLEXi“ SP3 control panel is an electrical device, which means it must be installed and serviced only by qualified personnel following the instructions in this document and applicable regulations for installing electrical equipment.

Power to the panel must be switched off during installation!

The control panel must be installed in a limited access location inside the premises and maintaining a safe distance from sensitive electronic equipment. The panel is not resistant to vibrations, other mechanical effects, humidity and aggressive chemical environments. The control panel complies with the demands applicable to Class II environmental specification of the EN 50131 standard.

!!! warning

    The casings, transformers, batteries and programming equipment used must
    meet the safety requirements of the EN 60950 standard.
    
    The device is powered from a 230 V voltage 50 Hz frequency power grid
    through a Class II step-down transformer that reduces the voltage to 16
    -- 18 V or from a 16 -- 24 V DC power supply. A 12 V battery with at
    least 7 Ah capacity is used as a backup power supply. The current
    consumption depends on the power of the connected external devices.
    
    A two-pole automatic safety switch must be installed in the power supply
    circuit for protection. The gap between switch off contacts must be at
    least 3mm. The safety switch must be installed in a location known to
    the specialists servicing the control panel.
    
    To disconnect the control panel from the power network:
    
    - from the AC network -- switch off the automatic safety switch;
    
    - from the battery -- disconnect the terminals.
