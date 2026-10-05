# Ethernet communicator E16

<div style="text-align: center;">
  <img src="./image1.webp" alt="Front of the TRIKDIS E16 Ethernet communicator. Indicators are NETWORK, DATA, POWER and TROUBLE; terminals are +DC, -DC, CLK, DATA, I/O 1, I/O 2, I/O 3, COM, A RS485 and B RS485. Power label: 10–18 VDC, 0.25 A Max." width="400">
</div>


## Description

“Ethernet” communicator E16 directly connects to supported DSC, Paradox, UTC Interlogix (CADDX), Innerrange, Texecom, Honeywell, Crow and Pyronix alarm panels.

Communicator transmits full event information to the Central Monitoring Station.

Communicator also works with Protegus2 application. With Protegus2 users can control their alarm system remotely and get notifications about security system events. Protegus2 app is compatible with all security alarm panels from various manufacturers that are supported by the E16 communicator. Communicator can transmit event notifications to the Central Monitoring Station and work with Protegus2 simultaneously.

For panels from other manufacturers use the E16T communicator.

### Features

Sends events to monitoring station receiver:

- Sends events to TRIKDIS software or hardware receivers that work with any monitoring software.

- Can send event messages to SIA DC-09 receivers.

- Can send event messages to SUR-GARD receivers. The annex has a table for converting Contact ID codes to SIA codes.

- Connection supervision by polling to IP receiver every 30 seconds (or by user defined period).

- Backup channel, that will be used if connection with the primary channel is lost.

- With parallel communication channels events can be sent to two receivers at same time.

- When Protegus service is enabled, events are first delivered to CMS, and only then are sent to app users.

**Works with Protegus2 app:**

- “*Push*” and special sound notifications informing about events.

- Remote system Arm/Disarm.

- Remote control of connected devices (lights, gates, ventilation systems, heating, sprinklers, etc.).


- Remote temperature monitoring (with iO or iO-WL expanders).

- Different user rights for administrator and installer.

**Notifies users:**

- Users can be notified about events with Protegus2 app.

**Controllable outputs and inputs:**

- 3 double I/O terminals that can be set either as input (IN) or controllable output (OUT) terminals.

- Outputs controlled by the Protegus2 app.

- Add additional inputs and controllable outputs with wired and wireless iO expanders.

**Quick setup:**

- Settings can be saved to file and quickly written to other communicators.

- Two access levels for configuring the device for CMS administrator and for installer.

- Remote configuration and firmware updates.

### List of compatible control panels

| Manufacturer | Model |
|--------------|-------|
| DSC® | <u>PC585</u>, PC1404, <u>PC1565</u>, <u>PC1616</u>, <u>PC1832</u>, <u>PC1864</u>, PC5020 |
| PARADOX® | <u>SPECTRA SP4000</u>, <u>SP5500</u>, <u>SP6000</u>, <u>SP7000</u>, <u>SP65</u>, <u>SP5500+</u>, <u>SP6000+</u>, <u>SP7000+</u> |
| PARADOX® | <u>MAGELLAN MG5000</u>, <u>MG5050</u>, MG5050E, <u>MG5050+</u> |
| PARADOX® | <u>DIGIPLEX EVO192</u>, <u>EVOHD</u>, NE96, EVO48, EVO96 |
| PARADOX® | SPECTRA 1727, 1728, 1738 |
| PARADOX® | ESPRIT E55, 728ULT, 738ULT |
| UTC Interlogix® | <u>NetworX (Caddx) NX-4v2</u>, <u>NX-6v2</u>, <u>NX-8v2</u>, <u>NX-8E</u> |
| Texecom® | Premier 412, 816, 832, 832+ /​ <u>Premier 24</u>, <u>48</u>, <u>88</u>, <u>168</u> /​ <u>Premier Elite 12</u>, <u>24</u>, <u>48</u>, <u>64</u>, <u>88</u>, <u>168</u> |
| Pyronix® | MATRIX 424, MATRIX 832, MATRIX 832+, MATRIX 6, MATRIX 816 |
| Innerrange® | Inception, Integriti |
| Honeywell® | <u>Ademco Vista-15</u>, <u>Ademco Vista-20</u>, <u>Ademco Vista-48</u> |
| Crow® | Runner 4/​8, Runner 8/​16 |

**<u>Underlined</u>** - Control panels directly controlled by E16. Firmware PARADOX security panels, which are directly controlled, must be V.4 or higher.

\*Connect control panels from other manufacturers to the E16T communicator.

### Specifications

| Parameter | Description |
|-----------|-------------|
| Dual purpose terminals [IN/​OUT] | 3, can be set as either NC;​ NO;​ NC/​EOL;​ NO/​EOL;​ NC/​DEOL;​ NO/​DEOL (2,2 kΩ) type inputs or open collector (OC) type outputs with current up to 0,15 A, 30 VDC max. Expandable with iO series expanders. |
| Power supply voltage | 10-18 V DC |
| Current consumption | 100 mA (on standby) Up to 250 mA (while sending data) |
| Ethernet connection | IEEE802.3, 10 Base-T, RJ45 socket |
| Transmission protocols | TRK, DC-09_2007, DC-09_2012, TL150 |
| Message encryption | AES 128 |
| Memory | Up to 60 messages |
| Changing settings | With TrikdisConfig computer program remotely or locally via USB Mini-B port |
| Operating environment | Temperature from -10 °C to 50 °C, relative humidity - up to 80% at +20 °C |
| Communicator dimensions | 88 x 62 x 26 mm |
| Weight | 80 g |

### Communicator elements

1.  Light indicators.

2.  Frontal case opening slot.

3.  Terminal for external connections.

4.  USB Mini-B port for communicator programming.

5.  Ethernet connection RJ45 socket.

<img alt="E16 communicator, front view on the left and opened rear view on the right. Left: 1 light indicators; 2 frontal case opening slot. Right: 3 terminal for external connections; 4 USB Mini-B port for communicator programming; 5 Ethernet connection RJ45 socket." src="./image4.webp" style="width:4.750009842519685in;height:2.853338801399825in" />

### Purpose of terminals

| Terminal | Description |
|----------|-------------|
| +DC | +10 V/​+18 V power supply |
| -DC | +10 V/​+18 V power supply |
| CLK | Serial bus terminals for direct connection to control panel |
| I/​O 1 | 1st input/​output terminal |
| I/​O 2 | 2nd input/​output terminal |
| I/​O 3 | 3rd input/​output terminal |
| COM | Common (negative) terminal |
| A RS485 | RS485 bus A contact |
| B RS485 | RS485 bus B contact |

### LED indication of operation

| Indicator | Light status | Description |
|-----------|--------------|-------------|
| NETWORK | Off | No connection to a computer network |
| NETWORK | Green solid | Communicator is connected to a computer network |
| DATA | Off | No unsent events |
| DATA | Green solid | Unsent events are stored in buffer |
| DATA | Green blinking | (Configuration mode) Data is being transferred to/from communicator |
| POWER | Off | Power supply is off or disconnected |
| POWER | Green solid | Power supply is on with sufficient voltage |
| POWER | Yellow solid | Power supply voltage is insufficient (≤11.5V) |
| POWER | Green solid and yellow blinking | (Configuration mode) Communicator is ready for configuration |
| POWER | Yellow solid | (Configuration mode) No connection with computer |
| TROUBLE | OFF | No operation problems |
| TROUBLE | 1 red blink | Connection error at the "physical" level (PHY Link status error), check LAN cable |
| TROUBLE | 2 red blinks | DHCP error |
| TROUBLE | 3 red blinks | DNS error |
| TROUBLE | 6 red blinks | No connection with the receiver |
| TROUBLE | 7 red blinks | Lost connection with control panel |
| TROUBLE | Red blinking | (Configuration mode) Memory fault |
| TROUBLE | Red solid | (Configuration mode) Firmware is corrupted |

### Structural schematic with *E16* usage

<img alt="Block diagram: alarm panel to Ethernet communicator E16 to router to internet. From the internet, one path goes to the Protegus server and then to a phone with Protegus software; another goes to a receiver and then to monitoring software at a security company monitoring station." src="./image5.webp" style="width:7.0875in;height:2.975in" />

!!! note
    Before you begin, make sure that you have the necessary:
    
    1.  USB cable (Mini-B type) for configuration.
    
    2.  At least 4-wire cable for connecting communicator to control panel.
    
    3.  CRP2.4 cable for connecting to Paradox panel\`s serial port.
    
    4.  Flat-head 2,5 mm screwdriver.
    
    5.  Particular security control panel\`s installation manual.
    
    Order the necessary components separately from your local distributor.
## Quick configuration with *TrikdisConfig* software 

1.  Download **TrikdisConfig** configuration software from [www.trikdis.com](http://www.trikdis.com) (type “TrikdisConfig” in the search field) and install it.

2.  Open the casing of the E16 with a flat-head screwdriver as shown below:

    <img alt="Two drawings show a flat-head screwdriver inserted into the E16 case opening slot, then moved downward to release the front cover. A separate detail labels the USB Mini-B connector." src="./image6.webp" style="width:6.876680883639545in;height:1.850003280839895in" />

3.  Using a USB Mini-B cable connect the E16 to the computer.

4.  Run TrikdisConfig. The software will automatically recognize the connected communicator and will open a window for configuration.

5.  Click **Read [F4]** to read the communicator’s settings. If requested, enter the Administrator or Installer 6-digit code in the pop-up window.

Below we describe what settings need to be set for the communicator to begin sending events to the CMS (central monitoring station) and to allow the security system to be controlled with the Protegus2 app.

### Settings for connection with Protegus2 app 

**In “System settings” window:**

<img alt="TrikdisConfig System settings window. Callout 1 marks Security panel model set to 4. PARADOX SP4000, S; callout 2 marks Remote Arm/Disarm checked; callout 3 marks Security panel PC download password set to 4477." src="./image7.webp" style="width:7.086614173228346in;height:1.763779527559055in" />

1.  Select **Security panel model** that will be connected to the communicator.

2.  Select **Remote Arm/Disarm** if you want users to be able to control the panel in Protegus2 app with their keypad code. This setting is only shown for directly controlled panels.

3.  For the direct control of Paradox and Texecom panels enter **Security panel** **PC download password**. It must match the password that is entered in the control panel.

!!! note
    For the direct panel control to work, you will need to change the panel
    settings. How to do this is described in chapter **4 "Programming the
    control panel"**. In this section you will find information on how to
    change the **Security panel PC download/UDL password**.
**In “User reporting” window, “PROTEGUS Cloud” tab:**

<img alt="TrikdisConfig User reporting window, PROTEGUS Cloud tab. Callouts mark Enable connection checked and the masked PROTEGUS Cloud access Code field." src="./image8.webp" style="width:7.082677165354331in;height:1.7677165354330708in" />

4. Tick the checkbox **Enable connection** to the Protegus Cloud.

2.  Change the **Protegus Cloud access Code** for logging in to Protegus2 if you want users to be asked to enter it when adding the system to Protegus2 app (default password – 123456).

After finishing configuration, click the button **Write [F5]** and disconnect the USB cable.

!!! note
    For more information about other E16 settings in
    TrikdisConfig, see chapter **6 "TrikdisConfig window
    description"**.
### Settings for connection with Central Monitoring Station 

**In “System settings” window:**

<img alt="TrikdisConfig System settings window. Callout 1 marks Object ID set to 1122; callout 2 marks Security panel model set to 4. PARADOX SP4000, S." src="./image9.webp" style="width:7.086614173228346in;height:1.763779527559055in" />

1.  Enter **Object ID** (account) number provided by the Central Monitoring Station (4 characters, 0-9, A-F. **Do not use FFFE, FFFF Object ID.**).

2.  Select **Security panel model** that will be connected to the communicator.

**In “CMS reporting” window settings for “Primary channel”:**

<img alt="TrikdisConfig CMS reporting window. Primary channel: Communication type IP, Protocol TRK, masked TRK encryption key, Domain or IP 155.14.178.152, Port 55448, TCP or UDP set to TCP. Primary channel Backup: IP, TRK, masked key, Domain or IP 160.12.15.180, Port 44558, TCP. Parallel channel Communication type is Disable." src="./image10.webp" style="width:7.082677165354331in;height:3.5393700787401574in" />

3. **Communication type** - select the **IP** connection method.

2.  **Protocol** - select the protocol type for event messages: **TRK** (to TRIKDIS receivers); **DC-09_2007** or **DC-09_2012** (to universal receivers); **TL150** (to SUR-GARD receivers).

3.  **TRK encryption key** - enter the encryption key that is set in the receiver.

4.  **Domain or IP** - enter the receiver’s Domain or IP address.

5.  **Port** - enter receiver’s network port number.

6.  **TCP or UDP** - choose event transmission protocol (**TCP** or **UDP**) in which events should be sent.

!!! note
    If you selected the **DC-09** protocol, additionally enter object, line
    and receiver numbers in the **Settings** tab of the **CMS reporting**
    window.
7. (Recommended) Configure **Primary channel Backup** settings.

2.  (Recommended) Configure **Parallel Channel** and its **Parallel Channel** **Backup** settings.

After finishing configuration, click **Write [F5]** and disconnect the USB cable.

!!! note
    For more information about other E16 settings in
    TrikdisConfig, see chapter **6 "TrikdisConfig window
    description"**.
## Installation and wiring

### Schematics for wiring the communicator to a security control panel

Following one of the schematics provided below, connect communicator to the control panel.

#### DSC

<img class="wiring-diagram" alt="Wiring diagram: DSC panel keypad bus to E16. RED (+12V) to +DC, BLK to -DC, YEL to CLK, GRN to DATA." src="./wiring-dsc.webp" width="546" height="481" />

#### PARADOX

<img class="wiring-diagram" alt="Wiring diagram: PARADOX panel serial port to E16 through the EX-CRP2.4 cable, ordered separately. R (red, +12V) to +DC, B (black) to -DC, Y (yellow) to CLK, G (green) to DATA." src="./wiring-paradox.webp" width="650" height="456" />

#### CADDX

<img class="wiring-diagram" alt="Wiring diagram: CADDX panel keypad bus to E16. POS (+12V) to +DC, COM to -DC, DATA to DATA; CLK is unused." src="./wiring-caddx.webp" width="547" height="481" />

#### TEXECOM

<img class="wiring-diagram" alt="Wiring diagram: TEXECOM panel serial port to E16 through the EX-CRP4 cable, ordered separately. R (red, +12V) to +DC, B (black) to -DC, BL (blue) to CLK, W (white) to DATA." src="./wiring-texecom.webp" width="650" height="463" />

#### INNERRANGE INCEPTION

<img class="wiring-diagram" alt="Wiring diagram: Inner Range Inception to E16. VOUT + (+12V) to +DC; VOUT 0V to -DC, joined to the black wire of USB cable 993030USB; cable green wire to CLK and white wire to DATA." src="./wiring-innerrange-inception.webp" width="627" height="467" />

#### INNERRANGE INTEGRITI

<img class="wiring-diagram" alt="Wiring diagram: Inner Range Integriti to E16 through cable INTG-996795. +DET (+13V) to +DC, Port 0 GND 5 to -DC, Rx 3 to CLK, Tx 2 to DATA." src="./wiring-innerrange-integriti.webp" width="555" height="454" />

#### Crow Runner 4/8, Runner 8/16

<img class="wiring-diagram" alt="Wiring diagram: Crow Runner 4/8 or Runner 8/16 panel keypad bus to E16. POS (+12V) to +DC, NEG to -DC, CLK to CLK, DATA to DATA." src="./wiring-crow-runner.webp" width="548" height="505" />

#### Pyronix

<img class="wiring-diagram" alt="Wiring diagram: Pyronix panel keypad bus to E16. +AUX (+12V) to +DC, -AUX to -DC, KD to DATA; CLK is unused." src="./wiring-pyronix.webp" width="597" height="504" />

#### Honeywell Vista-20, Vista-48

<img class="wiring-diagram" alt="Wiring diagram: Honeywell Vista-20 or Vista-48 panel keypad bus to E16. Terminal 5 (+12V) to +DC, terminal 4 to -DC, terminal 7 to CLK, terminal 6 to DATA." src="./wiring-honeywell-vista.webp" width="564" height="474" />

### Schematic for connecting to panel keyswitch zone 

Follow this schematic if the control panel will be armed/disarmed with a E16 PGM output turning on/off the panel’s keyswitch zone.

!!! note
    E16 communicator has 3 universal input / output terminals that can
    be set to the OUT (PGM) operating mode. The outputs (OUT) can control
    three areas of the security system. If you want to control the system in
    this way, in TrikdisConfig, in the "**System settings**" window,
    uncheck **Remote Arm/Disarm**. The Protegus2 apps must be
    configured with the settings described in chapter 5.2 "Additional
    settings to arm/disarm the system using the control panel's keyswitch
    zone".
<img alt="Wiring diagram: control panel to E16. Keypad bus or serial: RED (+12V) to +DC, BLK to -DC, YEL to CLK, GRN to DATA. Zones (keyswitch): 1-st Area to I/O 1, 2-nd Area to I/O 2, 3-rd Area to I/O 3." src="./image16.webp" style="width:3.22250656167979in;height:2.720005468066492in" />

### Schematics for input connection 

The communicator has 3 universal input / output terminals that can be set to input IN mode. NC, NO, NO / EOL, NC / EOL, NO / DEOL, NC / DEOL circuits can be connected to the input terminal. Default input setting – NO. The input type can be changed in the TrikdisConfig window **IN/OUT -> Type.**

Connect the input according to the selected input type (NO, NC, NC/EOL, NO/EOL, NO/DEOL, NC/DEOL), as shown in the schemes below:

#### Normally open (NO)

<img class="wiring-diagram" alt="Input wiring schematic: normally open (NO) contact between COM and INx. Short - Alarm, Open - Restore." src="./wiring-input-no.webp" width="296" height="256" />

#### Normally closed (NC)

<img class="wiring-diagram" alt="Input wiring schematic: normally closed (NC) contact between COM and INx. Short - Restore, Open - Alarm." src="./wiring-input-nc.webp" width="311" height="256" />

#### Normally closed with 2,2k end-of-line resistor (EOL 2,2k)

<img class="wiring-diagram" alt="Input wiring schematic: NC contact with a 2,2k end of line resistor in series between COM and INx (EOL 2,2k). Short - Alarm, Open - Alarm, 2,2k - Restore." src="./wiring-input-nc-eol.webp" width="324" height="356" />

#### Normally open with 2,2k end-of-line resistor (EOL 2,2k)

<img class="wiring-diagram" alt="Input wiring schematic: NO contact with a 2,2k end of line resistor in parallel between COM and INx (EOL 2,2k). Short - Alarm, Open - Alarm, 2,2k - Restore." src="./wiring-input-no-eol.webp" width="315" height="430" />

#### Normally open with 2,2k end-of-line resistor and tamper recognition (DEOL)

<img class="wiring-diagram" alt="Input wiring schematic with tamper recognition (DEOL): between COM and INx, a tamper switch and a 2,2k resistor in series, then the NO contact with a second 2,2k resistor across it. Short - Tamper, Open - Tamper, 2,2k - Alarm, 3,3k-5,5k - Restore." src="./wiring-input-no-deol.webp" width="399" height="442" />

#### Normally closed with 2,2k end-of-line resistor and tamper recognition (DEOL)

<img class="wiring-diagram" alt="Input wiring schematic with tamper recognition (DEOL): between COM and INx, a tamper switch and a 2,2k resistor in series, then the NC contact with a second 2,2k resistor across it. Short - Tamper, Open - Tamper, 2,2k - Restore, 3,3k-5,5k - Alarm." src="./wiring-input-nc-deol.webp" width="398" height="442" />

!!! note
    If more inputs or outputs need to be connected to the communicator,
    connect the TRIKDIS iO series wired or wireless output
    expander. Connection method is described in the iO manual and
    chapter **3.6 "Schematics for connecting iO series expansion modules"**.
### Connect LAN cable

<img alt="Diagram showing a LAN cable plug directed toward the E16 communicator." src="./image18.webp" style="width:2.7975054680664915in;height:2.2525043744531934in" />

### Schematics for wiring a relay 

With relay contacts you can control (turn on/off) various electronic appliances. The I/O terminal of the communicator must be set to an output (OUT) mode.

<img alt="Wiring diagram: E16 to relay. Coil: +DC to one coil terminal, I/O x to the other. Relay contact terminals are labelled NC, C and NO." src="./image19.webp" style="width:2.552505468066492in;height:0.9575021872265966in" />

### Schematics for connecting iO series expansion modules

If more inputs or outputs need to be connected to the communicator, or if you want to connect a temperature sensor, connect the TRIKDIS iO series wired or wireless output expander. Configuration of expander modules connected to the E16 is described in chapter 6.6 ““RS485 modules” window”.

<img alt="Wiring diagram: control panel to E16, iO, iO-8 and iO-MOD. Power (+12 V): +AUX to each +DC; -AUX to each -DC. RS485: E16 A RS485 to each A (RS485); B RS485 to each B (RS485). Wireless: iO-MOD to iO-WL, up to 300 m. Separate 12-28 V DC, 0,5 A supply to iO-WL +DC and -DC. DS18B20 or DS18S20 sensor: Vdd+ to +5 V, DQ to 1-Wire, COM to COM." src="./image20.webp" style="width:7.0875in;height:3.4944444444444445in" />

### Turn on the communicator 

To start the communicator, turn on the security control panel’s power supply. This LED indication on the E16 communicator must show:

- “POWER” LED illuminates green when the power is on;

- “NETWORK” LED illuminates green, when the communicator is connected to the network.

!!! note
    If you see a different LED indication, it indicates a certain
    malfunction. Diagnose it by following the LED indication table in
    chapter 1.5 "LED indication of operation". / If the E16 indication
    does not illuminate at all, check the power supply and connections.
## Programming the control panel 

Below it is described how to program the security control panel so that the E16 communicator could read events from the panel and control it remotely.

To enable remote control of the security panel, make sure that the checkbox **Remote Arm/Disarm** is selected in the TrikdisConfig window **“System settings”.**

### DSC

DSC panels do not need to be programmed.

### PARADOX

Paradox control panels need to be programmed only for direct control with Protegus. You do not need to program Paradox panels for reading events.

For remote control of Paradox panels, you need to set up a PC download password. This password must match the password which was set in the TrikdisConfig window **“System settings”**, when the checkbox next to **Remote Arm/Disarm** was selected.

To set this password, with the keyboard connected to the security control panel:

- For MAGELLAN, SPECTRA series: go to cell 911 and enter 4-digit PC download password.

- For DIGIPLEX EVO series: go to cell 3012 and enter 4-digit PC download password.

### TEXECOM

Texecom control panels need to be programmed for both reading events and remote control.

You need to set the Texecom panel’s **UDL** **passcode**. This password must match the password which was set in the TrikdisConfig window **“System settings”,** when the box next to **Remote Arm/Disarm** was selected.

The security control panel can be programmed with Texecom software - Wintex. Enter **UDL passcode** (4-digit code) in the **Communication Options** window, **Options** tab.

Also, you can program with a keypad connected to the security control panel:

1.  Enter the 4-digit installer’s code and press the [Menu] button to enter the programming menu.

2.  Press the [9] key immediately afterwards.

3.  Press [7][6], and then [2]. Enter the 4-digit **UDL** **passcode** (**UDL passcode** must match the E16 communicator’s **PC login password).**

4.  Press [Yes] and leave the programming mode by pressing [Menu].

### UTC INTERLOGIX (CADDX)

Security control panel version must be **V2** or higher With the keyboard connected to the security control panel:

1.  Press [\*][8] and enter the installer’s code (default - 9713).

2.  Enter the device number assigned to the connected communicator (default - 0).

3.  Set the settings below for each row. In sequence, enter the position, segment number and the required setting. Clicking [\*] (asterisk) will return you to the local input field.

| Position | Segment | Setting |
|----------|---------|---------|
| 23 | 3 | 12345678 |
| 37 (not necessary) | 3 | 12345678 |
| 37 (not necessary) | 4 | 1234567* |
| 90 | 3 | 12345678 |
| 93 | 3 | 12345678 |
| 96 | 3 | 12345678 |
| 99 | 3 | 12345678 |
| 102 | 3 | 12345678 |
| 105 | 3 | 12345678 |
| 108 | 3 | 12345678 |

After having programmed all the fields listed, press [Exit] twice to exit the programming mode.

### INNERRANGE

**Innerrange Inception** security control panel version must be **2.3.0.3507-r0** or higher.

The control panel must be connected to the internet. Connect to **Innerrange Inception** by entering: <https://skytunnel.com.au/inception/SERIALNUMBER>, where SERIALNUMBER is the number of the controller that you can find on the panel’s enclosure.

Open **Configuration > General > Alarm Reporting**. In the **3rd Party Device Configuration** settings group you need to enter:

<img alt="Innerrange Inception software, Alarm Reporting page, 3rd Party Device Configuration group: 'Enable 3rd Party Device Reporting' checkbox ticked (highlighted), '3rd Party Device Type' set to Trikdis (highlighted), 'Serial Port' set to 'Serial Port 1 (Plugged In, In Use By 3rd Party Device)' (highlighted)." src="./image21.webp" style="width:6.625984251968504in;height:3.2125984251968505in" />

1.  **Enable 3rd Party Device Reporting** - select this checkbox.

2.  **3rd Party Device Type** - set “Trikdis”.

3.  **Serial port** - set “Serial Port 1 (Plugged In, In Use By 3rd Party Device)”.

4.  Save settings and exit the application.

**Innerrange Integriti** security control panel version must be **19.1.0.36608** or higher, the professional software version **19.1.0.15396** or higher.

Specify the Trikdis communication protocol in the control panel configuration program. Contact ID data format. The port (TTL Port-0) of the security panel, to which the E16 communicator is connected, has the settings 19200, 8, N, 1. Save the settings and exit the program.

### Honeywell Ademco Vista

Follow these steps for **Honeywell Ademco Vista-20** and **Honeywell Ademco Vista-48** panels. **The panel’s firmware version must be V5.3 or higher.** With a keypad that is connected to the panel:

1.  Enter the programming mode. Enter the installer code 4][1][1][2] and after that [8][0][0] . Alternatively, turn on the panel‘s power supply. In 50 seconds after the power supply is turned on, press the buttons [\*] and [#] at the same time (this method can be used when programming mode was exited by pressing in keypad [\*][9][8] ).

2.  Turn on the sending of Contact ID events via LRR. Press [\*][2][9][1][#] in keypad.

3.  When using the „Remote Arm/Disarm“ function, allow to use the 2nd AUI address. In keypad press [\*][1][8][9][1][1][#] .

Exit the programming mode. In keypad press [\*][9][9]

**Crow**

There is no need to program Crow Runner 4/8 and Runner 8/16 panels.

## Remote control 

### Adding the security system to Protegus2 app 

With Protegus2 users will be able to control their alarm system remotely. They will see the status of the system and receive notifications about system events.

1.  Download and launch the Protegus2 application or use the browser version: [www.protegus.app](https://www.protegus.app).

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

2.  Log in with your user name and password or register and create new account.

!!! warning "Important"
    When adding the E16 to Protegus2 check if:

    1.  Protegus cloud is enabled. See chapter 6.4 ""User
        reporting" windows";

    2.  Power supply is connected ("POWER" LED illuminates green);

    3.  Registered to the network ("NETWORK" LED illuminates green).
3. Click “Add new system” and enter the *E16*’s “*MAC*” number. This number can be found on the device and the packaging sticker. Click “Next”.

2.  Enter the system „Name”. Click "Next".

<img alt="Protegus2 Scan QR code screen. Enter the MAC address in the Unique ID/IMEI field or tap Scan QR code; the device label shows where to scan. A callout says the MAC address is on the package, PCB board or in TrikdisConfig as a Unique ID. Cancel and Next appear below." src="./image28.webp" style="width:2.858267716535433in;height:3.704724409448819in" />

### Additional settings to arm/disarm the system using the control panel’s keyswitch zone 

!!! warning "Important"
    The control panel zone to which the E16 output OUT is connected to
    has to be set to keyswitch mode.
Follow the instructions below if the security control panel will be controlled with a E16 PGM output, turning on/off the control panel keyswitch zone.

1.  Click „**Continue**“.

<img alt="Protegus2 app screen titled 'The system is not controlled remotely': an illustration of a communicator with NETWORK, DATA, POWER and TROUBLE LEDs and terminals +DC, -DC, CLK, DATA, A485, B485, COM, IN, OUT1, OUT2, beside a puzzled person. Text below: You must connect the output to the security system input terminal and configure Protegus2 Europe to enable or disable your security system. Continue button." src="./image29.webp" style="width:2.220472440944882in;height:3.4803149606299213in" />

2. Enter “**Area name**”. Enable PGM output control using the Protegus2 application.
3. Select “**Pulse**” or “**Level**”, depending on how the keyswitch zone type is configured. If necessary, you can change the "**Pulse**" interval.

2.  Click „**Save**“.

<img alt="Protegus2 app 'Add new area' screen: Area number 1, Area name '1 Area', 'Control with Protegus2 Europe' toggle on, Assigned Output PGM1, Pulse option selected with Pulse interval in seconds set to 3, Level option unselected, Cancel and Save buttons." src="./image30.webp" style="width:2.220472440944882in;height:3.5118110236220472in" />

3. If there is another Area for the security system, then you need to click “**Click to add an area**”. Setting up the PGM output is similar to that described above.

2.  After completing the settings, click the “**Skip**” button.

<img alt="Protegus2 app 'Areas' screen: list showing '1 Area, Controlled with: PGM1' with a remove (X) button, a plus button and 'Click to add an area' text below, and Skip / Next buttons." src="./image31.webp" style="width:2.2244094488188977in;height:2.0078740157480315in" />

### Arming/disarming the alarm system with Protegus2

1.  In the “System Home Screen” window, click on the “Disarm” status icon.

2.  *Protegus2* will receive a message about a change in the status of the security system and the status icon will change its state.

<img alt="Protegus2 E16 system home screen shows Online, 1 Area with status Unknown, Arm and Disarm buttons, and a PGM2 control." src="./image32.webp" style="width:2.220472440944882in;height:2.65748031496063in" />

## TrikdisConfig window description

### *TrikdisConfig* status bar description

After connecting the E16 and clicking **Read [F4], *TrikdisConfig*** will provide information about the connected device in the status bar:

<img alt="TrikdisConfig status bar shows the MAC/Unique ID field, Status: reading done, Device: E16_1000, BL: 1.00, FW: 1.10 and HW: 0.01. It also shows fields for SN, State, HID and Administrator." src="./image33.webp" style="width:7.070866141732283in;height:0.5905511811023622in" />

| Object        | Description                                        |
|---------------|----------------------------------------------------|
| MAC/​Unique ID | Device MAC number                                  |
| Status        | Operating condition                                |
| Device        | Device type (E16 should be shown)            |
| SN            | Device serial number                               |
| BL            | Browser version                                    |
| FW            | Device firmware version                            |
| HW            | Device hardware version                            |
| Status        | Connection to program type (via USB or remote)     |
| Administrator | Access level (shown after access code is approved) |

After pressing **Read [F4]**, the program will read and show the settings which are set in the ***E16*.** Set the necessary settings according to the TrikdisConfig window descriptions given below.

### “System settings” window

<img alt="TrikdisConfig System settings window. General shows Object ID 1122, security panel model “4. PARADOX SP4000, S” (truncated in the field), Remote Arm/Disarm checked, security panel PC download password 4477, and Time set to Cloud application. Access shows administrator code 123456, installer code 654321, Only an administrator can restore checked, and all five Allow installer to change options checked." src="./image34.webp" style="width:7.082677165354331in;height:3.062992125984252in" />

**“General” settings group**

- **Object ID** – if the events will be sent to the CMS (Central Monitoring Station), enter the account number provided by the CMS (4 characters hexadecimal number, 0-9, A-F. **Do not use FFFE, FFFF Object ID.**).

- Select the **Security Panel model** that will be connected to the communicator.

- **Remote Arm/Disarm** - when the checkbox is selected, the E16 will directly control the control panel remotely. This setting will be visible only for directly controlled panels. For direct control of the control panels you need to change the panel settings, as described in section 4 “Programming the control panel”.

  - **Security panel PC download password** - for the direct control of Paradox and Texecom control panels you need to enter the PC/UDL password. It must match the password that was entered in the control panel. How to change this password is described in section 4 “Programming the control panel”*.*

- **Time set -** select which server to use for time synchronization.

“Access” settings group

When setting up the communicator E16 there are two levels of access for, the administrator and the installer:

- **Administrator code -** allows you to access all configuration fields (default code - 123456).

- **Installer code** - limited access for configuring the communicator (default code - 654321).

- **Only an administrator can restore** - if the box is checked, factory settings can be restored only by entering the administrator code.

- **Allow installer to change** – the administrator can specify which settings can be changed by the installer.

### “CMS reporting” window

**“CMS settings” tab**

<img alt="TrikdisConfig CMS reporting window, CMS settings tab. Primary channel and Primary channel Backup are set to Disable; Parallel channel and Parallel channel Backup are set to IP with Protocol TRK. All four channel groups show TCP under TCP or UDP, masked TRK encryption keys, and blank Domain or IP and Port fields." src="./image35.webp" style="width:7.082677165354331in;height:4.019685039370079in" />

The communicator sends events to the monitoring station via a wired internet (IP) connection.

Events can be sent over several channels of communication. The primary and parallel communication channels can operate simultaneously, this way the communicator can send events to two receivers at the same time. Backup channels can be assigned for both primary and parallel channels, which will be used when the connection via the primary or parallel channel is interrupted.

Communication is encoded and password protected. A TRIKDIS receiver is required for receiving and sending event information to the monitoring programs:

- For connection over IP - software receiver IPcom Windows/Linux, hardware IP/SMS receiver RL14 or multichannel receiver RM14.

**“Primary channel” settings group**

- **Communication type** - select which method for connecting to the monitoring station receiver will be used (IP).

- **Protocol** - select in which coding the events should be sent: **TRK** (to TRIKDIS receivers); **DC-09_2007** or **DC-09_2012** (to universal receivers); **TL150** (to SUR-GARD receivers).

- **TRK encryption key** - 6-digit message encryption key. The key written to the communicator must match the receiver’s key.

- **Domain or IP** - enter the domain or IP address of the receiver.

- **Port** - enter the network port number of the receiver.

- **TCP or UDP** - select in which protocol (TCP or UDP) the events should be sent.

“Primary channel Backup” settings group

Enable the backup channel mode to send events via backup channel if connection via primary channel is lost. Backup channel settings are same as described above.

“Parallel channel” settings group

Events are transmitted in parallel with the first channel through this channel. When the second channel is enabled, events can be sent simultaneously to two receivers (e.g., local and centralized monitoring stations). Parallel channel settings are the same as described above.

<img alt="TrikdisConfig CMS reporting window, Settings tab. Test period is enabled at 24 h 0 min; IP ping period is enabled at 0 min 30 s. Receiver and line number shows 00 RR and 0 L; Backup reporting after is 2 fails; Return from Backup after is 1 min 30 s. DC-09 Settings shows Object ID 123456, line No 1 and receiver No 1." src="./image36.webp" style="width:7.078740157480315in;height:2.3661417322834644in" />

****“Settings” tab** “Settings” settings group**

- **Test period** - TEST event period for testing the connection. Test events are sent as Contact ID messages and forwarded to the monitoring software.

- **IP ping period** – period for sending internal PING heartbeats. These messages are only sent via IP channel. The receiver will not forward PING messages to the monitoring software to avoid overloading it. Notifications will only be sent to the monitoring software if the receiver fails to receive PING messages from the device within the set time.

  By default, the “*Connection lost”* notification will be transmitted to the monitoring software if the PING message is not received by the receiver over a time period three times longer than set in the device. E.g. if the PING period is set for 3 minutes, the receiver will transfer the *“Connection lost”* notification if a PING message is not received within 9 minutes.

  PING heartbeats keep the active communication session between the device and the receiver. An active session is required for remote connection, control and configuration of the device. We recommend setting the PING period for no more than 5 minutes.

- **Backup reporting after** - indicates the number of unsuccessful attempts to send the message via Primary channel. If device fails to transmit specified number of times, the device will connect to transmit the messages via Backup channel.

- **Return from backup after** - time after which the E16 will attempt to reconnect and transmit messages via the Primary channel.

“DC-09 settings” settings group

The settings are displayed when the **DC-09_2007** or **DC-09_2012** protocol is set in the communication channel **Protocol** field for sending events to universal receivers.

- **Object ID in DC-09** - enter the object number. <u>The object number entered in this field will be used if DC-09 encoding is selected</u>. A hexadecimal number from 3 to 16 characters can be entered. This Number is provided by the CMS (central monitoring station).

- **DC-09-line No**. - enter line number of the receiver.

- **DC-09 receiver No.** - enter the receiver number.

### “User reporting” window

**“PROTEGUS Cloud” tab**

<img alt="TrikdisConfig User reporting window, PROTEGUS Cloud tab. Enable connection is checked, and the PROTEGUS Cloud access Code field is filled." src="./image37.webp" style="width:7.082677165354331in;height:1.7677165354330708in" />

Protegus service allows users to remotely monitor and control the communicator. For more information about Protegus service, visit [www.protegus.app](https://www.protegus.app).

**“Protegus Cloud” settings group**

- **Enable connection** – enable the Protegus service, the E16 will be able to exchange data with Protegus2 app and to be remotely configured via ***TrikdisConfig*.**

- **Protegus Cloud access Code -** 6-digit code for connecting to the Protegus2 app (default - 123456).

### “Ethernet settings” window

<img alt="TrikdisConfig Ethernet settings window. Use DHCP is checked. Static IP is 0.0.0.0, Subnet mask 255.255.255.0, Default gateway 0.0.0.0, DNS 1 8.8.8.8 and DNS 2 8.8.4.4." src="./image38.webp" style="width:7.086614173228346in;height:2.2283464566929134in" />

**“Ethernet settings” settings group**

- **Use DHCP** - check the box to have the communicator automatically register to the network. If the auto-register fails, you will need to enter it manually:
- **Static IP** – static IP address for when manual registering mode is set.

- **Subnet mask** – subnet mask for when manual registering mode is set.

- **Default gateway** – gateway address for when manual registering mode is set.
- **DNS1, DNS2** - (Domain Name System) identifies the server that specifies the IP address of the domain. Used when domain is set in the communication channel **Domain or IP** field (not IP address). Google DNS server is set by default.

### “IN/OUT” windows

<img alt="TrikdisConfig IN/OUT window. Terminal 1 is Disabled; terminal 2 is IN with Type NO; terminal 3 has its Function menu open with OUT selected. The IN2_ALARM and IN2_TAMPER rows have event and restore reporting enabled, with Contact ID codes 130 and 144 respectively, Part. 99 and Zone 002." src="./image39.webp" style="width:7.086614173228346in;height:2.452755905511811in" />

The communicator has 3 universal (input / output) terminals. The table can set the terminal operating mode (Off, IN, OUT). The input must specify the type of circuit to be connected NC, NO, NO / EOL, NC / EOL, NO / DEOL, NC / DEOL.

Additional sensors can be connected to the communicator inputs. When the sensor is triggered, the communicator will send an event message. The input is assigned a Contact ID code, which will be sent to CMS and Protegus2.

- **Enable** – checked event fields where messages will be sent to CMS and Protegus2.

- **E/R** – choose what type of event will be sent when input is triggered – **Event** or **Restore**.

- **CID** – enter the event code or leave the default value. Upon entering the event, the event code will be sent to Protegus2 and CMS.

- **Part**. – enter the partition (area) number that will be sent when an internal event occurs and the system is restored.

- **Zone** - enter the zone number that will be sent when an internal event occurs and the system is restored.

### “RS485 modules” window

**“Modules list” tab**

iO series expanders can be connected to the communicator to add additional inputs, outputs and serial buses for temperature sensors. Connected expanders must be added to the **Modules list** table.

<img alt="TrikdisConfig RS485 modules window, Modules list tab. The table has ID, Module Type and Serial No columns. The Module Type menu is open with Expander iO-8 highlighted." src="./image40.webp" style="width:7.078740157480315in;height:2.141732283464567in" />

- **Module type** – select the module that is connected to the communicator via RS485 from the list.

- **Serial No –** enter the module serial number (6 digits), which is indicated on stickers on the module’s case and packaging.

Go to **RS485 modules** → **Module.**

**“Module” tabs**

After adding the expander to the communicator as described above, in the **RS485 modules** window a new tab will appear with this module’s settings. The tab will be given a number. Bellow we describe the settings for iO-8 and iO series expanders.

**iO-8 expander settings window**

<img alt="TrikdisConfig RS485 modules window, Module 1 tab for Expander iO-8. Input Count is 3 and Show Object ID is unchecked. BUS_FAULT has Contact ID code 333; INPUT1, INPUT2 and INPUT3 have code 130, Part. 91 and Zones 001, 002 and 003. Event and restore reporting are enabled for all four rows; the inputs show Object Input type NO." src="./image41.webp" style="width:7.082677165354331in;height:2.52755905511811in" />

Expander iO-8 has 8 universal (input/output) terminal contacts. Up to four iO-8 expanders can be connected.

- **Input Count** – select what number of terminal contacts should be set to input (IN) mode. The rest of the terminal contacts will become outputs (OUT).

Settings for controllable outputs are set directly in Protegus2 app. There you can assign an output for arming/disarming the alarm system or for remote control of devices.

In the table inputs can be assigned Contact ID event and restore codes. After input is triggered, the communicator will send an event with set event code to monitoring station receiver, Protegus2 app.

**Contact ID event code:**

- **Enable** – allow message transmission, when the input is triggered.

- **E/R** – choose what type of event will be sent when input is triggered – **Event** or **Restore**.

- **CID** – assign a Contact ID event code to the input.

- **Part.** – assign the partition (area) to the input. It is set automatically: if the module no. is 1, then the area is 91; if the module no. is 4, then the area is 94.

- **Zone** – set the zone number for the input.

****Contact ID restore code**:**

- **Enable** – allow message transmission when the input is restored.

- **E/R** – choose what type of event will be sent when input is restored – **Restore** or **Event**.

- **CID** – assign the Contact ID restore code to the input.

- **Part.** – assign the partition (area) to the input. It is set automatically: if the module no. is 1, then the area is 91; if the module no. is 4, then the area is 94.

- **Zone** – set the zone number for the input.

- **Input type** – select the type of the input (NO or NC).

**iO expander settings window**

<img alt="TrikdisConfig RS485 modules window, Module 1 tab for Expander iO. Input IN1 type is NO, Max °C(T1) is 30 and Min °C(T2) is 15. Relay control reads If TT1 AND None then OFF for 0 h 0 min 0 s. Event and restore reporting are enabled for INPUT, HIGH_TEMPERATURE, LOW_TEMPERATURE and BUS_FAULT, with Contact ID codes 130, 158, 159 and 333 respectively. Each row shows Part. 91 and Zone 001." src="./image42.webp" style="width:7.086614173228346in;height:3.2283464566929134in" />

Expander iO has: terminals for 1 input, 1 output (relay contacts) and 1-Wire serial bus for connecting temperature sensors.

Relay output can be controlled according to logical (AND, OR, XOR) conditions.

- **Input IN1 type** – set the input type (NO or NC).

- **Max <sup>◦</sup>C(T1)** – when the temperature is higher than this setting, an event message will be generated. For an event message to be generated, it must be enabled in the table.

- **Min <sup>◦</sup>C(T2)** – when the temperature is lower than this setting, an event message will be generated. For an event message to be generated, it must be enabled in the table.

- **Relay control** – set logical (AND, OR, XOR) conditions, upon which the relay output will be controlled.

In the table inputs can be assigned Contact ID event and restore codes. After an input is triggered, the communicator will send an event with the set event code to the monitoring station receiver and to Protegus2 app. Set as described in the previous page about **iO-8 expander settings window**.

### “Event summary” window 

This window allows you to turn on, off, and modify internal messages sent by your device. Disabling an internal message in this window will prevent it from being sent regardless of other settings.

<img alt="TrikdisConfig Event summary window. COMMUNICATION event and restore are disabled, code 350. POWER event and restore are enabled, code 302. REMOTE_FINISHED, REMOTE_STARTED, START and TEST events are enabled with codes 412, 411, 700 and 602. The shown Part. is 99 and Zone is 999." src="./image43.webp" style="width:7.090551181102362in;height:1.9448818897637796in" />

- **COMMUNICATION** – message about connection error between the control panel and E16.

- **POWER** – message about low power supply voltage.

- **REMOTE_STARTED** – message about remote connection to configure E16 with TrikdisConfig.

- **REMOTE_FINISHED** – message about disconnection from remote configuration with TrikdisConfig.

- **START** – message about E16 connecting to the network.

- **TEST** – periodic test message.

!!! note
    To enable periodic TEST messages and set their period, go to **CMS
    reporting -> Settings -> Test period**.
- **Enable** – when selected, the sending of messages is enabled.

You can change the Contact ID code for each event, and also the zone and partition number.

### Restoring factory settings

To restore the communicator's factory settings, you need to click the **Restore** button in the TrikdisConfig window.

<img alt="TrikdisConfig Default settings section with the Restore button outlined in red. The MAC/Unique ID field and device status appear below." src="./image44.webp" style="width:7.086614173228346in;height:0.9803149606299213in" />

## Remote configuration

!!! warning "Important"
    Remote configuration will work only if:

    1.  Protegus cloud is enabled. How to enable cloud is
        described in section 6.4 ""User reporting" window";

    2.  Power supply is connected ("POWER" LED illuminates green);

    3.  Registered to the network ("NETWORK" LED illuminates green).
1.  Start the configuration program TrikdisConfig.

2.  In the **Remote access** section enter the communicator’s **MAC** number. This number can be found on the device and the packaging sticker.

<img alt="TrikdisConfig Remote access section. The Unique ID field and Configure button are outlined in red; the System Name field is beside them." src="./image45.webp" style="width:7.0078740157480315in;height:1.0393700787401574in" />

3. (Optional) in the **System name** field, enter the desired name for the E16 with this Unique ID.

2.  Press **Configure**.

3.  In the newly opened window click **Read [F4]**. If required, enter the administrator or installer code*.* To save the password, select **“Remember password”**.

4.  Set the necessary settings and when finished, click **Write [F5]**.

## Test communicator performance

When the configuration and installation is complete, perform a system check:

1.  Generate an event:

- by arming/disarming the system with the control panel’s keypad;

- by triggering a zone alarm when the security system is armed.

1.  Make sure that the event arrives to the CMS (central monitoring station) and/or is received in the Protegus2 application.

2.  To test communicator input, trigger it and make sure to receive the correct event.

3.  To test the communicator outputs, activate them remotely and check their operation.

4.  If the security control panel will be controlled remotely, arm/disarm the security system remotely by using the Protegus2 app.

## Firmware update 

!!! note
    When the communicator is connected to TrikdisConfig, the program
    will automatically offer to update the device's firmware if updates are
    present. Updates require an internet connection. Antivirus software,
    firewall or strict access to internet settings can block the automatic
    firmware updates. In this case, you will need to reconfigure your
    antivirus program.
The communicator’s firmware can also be updated or changed manually. After an update, all previously set settings will remain unchanged. When writing firmware manually, it can be changed to a newer or older version. To update:

1.  Run ***TrikdisConfig**.*

2.  Connect the communicator via USB cable to the computer or connect to the communicator remotely.

    - If a newer firmware version exists, the software will offer to download the newer firmware version file.

3.  Select the menu branch **Firmware**.

<img alt="TrikdisConfig Firmware window for E16_1000. Firmware is selected in the menu; the file path is empty, Open firmware is available, Update (F12) is disabled, and progress is 0%." src="./image46.webp" style="width:7.086614173228346in;height:3.1653543307086616in" />

4. Press **Open firmware** and select the required firmware file. If you do not have the file, the newest firmware file can be downloaded by <u>registered users</u> from [www.trikdis.com](http://www.trikdis.com) , under the download section of the E16 communicator.

2.  Press **Update [F12]**.

3.  Wait for the update to complete.

## Safety requirements

The communicator should be installed and maintained by qualified personnel.

Prior to installation, please read this manual carefully in order to avoid mistakes that can lead to malfunction or even damage to the equipment.

Disconnect the power supply before making any electrical connections.

Changes, modifications or repairs not authorized by the manufacturer shall void your rights under the warranty.

<img alt="Crossed-out wheeled bin symbol (WEEE), indicating the device must be disposed of separately from household waste." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Please act according to your local rules and do not dispose of your unusable alarm system or its components with other household waste.

<div style="text-align: center;">
  <img src="./image1.webp" alt="Front of the TRIKDIS E16 Ethernet communicator. Indicators are NETWORK, DATA, POWER and TROUBLE; terminals are +DC, -DC, CLK, DATA, I/O 1, I/O 2, I/O 3, COM, A RS485 and B RS485. Power label: 10–18 VDC, 0.25 A Max." width="400">
</div>

## Annex

The communicator can work with a SUR-GARD receiver. The communicator converts Contact ID codes received from the alarm control panel into SIA codes.

**Contact ID to SIA code conversion table**

| **System Event** | **CID Report Code** | **SIA Report Code** |
|----|:--:|:--:|
| Medical alarm | E100 | "MA" |
| Personal emergency | E101 | "QA" |
| Fire in zone: <z> | E110 | "FA" |
| Water flow detected in zone: <z> | E113 | "SA" |
| Pull station alarm in zone: <z> | E115 | "FA" |
| Panic in zone: <z> | E120 | "PA" |
| Panic alarm by user: <v> | E121 | "HA" |
| Panic alarm in zone: <z> | E122 | "PA" |
| Panic alarm in zone: <z> | E123 | "PA" |
| Panic alarm in zone: <z> | E124 | "HA" |
| Panic alarm in zone: <z> | E125 | "HA" |
| Alarm active in zone: <z> | E130 | "BA" |
| Alarm active in zone: <z> | E131 | "BA" |
| Alarm active in zone: <z> | E132 | "BA" |
| Alarm active in zone: <z> | E133 | "BA" |
| Alarm active in zone: <z> | E134 | "BA" |
| Alarm active in zone: <z> | E135 | "BA" |
| Tamper active in zone: <z> | E137 | "TA" |
| Intrusion verified in zone: <z> | E139 | "BV" |
| Alarm active in zone: <z> | E140 | "UA" |
| System failure (143) | E143 | "ET" |
| Tamper active in zone: <z> | E144 | "TA" |
| Tamper active in zone: <z> | E145 | "TA" |
| Alarm active in zone: <z> | E146 | "BA" |
| Alarm active in zone: <z> | E150 | "UA" |
| Gas detected in zone: <z> | E151 | "GA" |
| Water leakage detected in zone: <z> | E154 | "WA" |
| Foil break detected in zone: <z> | E155 | "BA" |
| High temperature at sensor: <n> | E158 | "KA" |
| Low temperature at sensor: <n> | E159 | "ZA" |
| CO detected in zone: <z> | E162 | "GA" |
| Fire failure in zone: <z> | E200 | "FS" |
| Monitored alarm | E220 | "BA" |
| System failure (300) | E300 | "YP" |
| AC power supply loss | E301 | "AT" |
| Low battery | E302 | "YT" |
| System failure (304) | E304 | "YF" |
| System reset in zone: <z> | E305 | "RR" |
| Panel programming changed | E306 | "YG" |
| System shutdown | E308 | "RR" |
| Battery failure (309) | E309 | "YT" |
| Ground fault | E310 | "US" |
| Battery failure (311) | E311 | "YM" |
| Power supply overcurrent (312) | E312 | "YP" |
| Engineer reset by user: <v> (313) | E313 | "RR" |
| Sounder/Relay failure | E320 | "RC" |
| System failure (321) | E321 | "YA" |
| System failure (330) | E330 | "ET" |
| System failure (332) | E332 | "ET" |
| System failure (333) | E333 | "ET" |
| System failure (336) | E336 | "VT" |
| System failure (338) | E338 | "ET" |
| System failure (341) | E341 | "ET" |
| System failure (342) | E342 | "ET" |
| System failure (343) | E343 | "ET" |
| System failure (344) | E344 | "XQ" |
| System communication failure (350) | E350 | "YC" |
| System communication failure (351) | E351 | "LT" |
| System communication failure (352) | E352 | "LT" |
| System failure (353) | E353 | "YC" |
| System communication failure (354) | E354 | "YC" |
| System failure (355) | E355 | "UT" |
| Fire trouble in zone: <z> | E373 | "FT" |
| Trouble in zone: <z> | E374 | "EE" |
| Trouble in zone: <z> | E378 | "BG" |
| Trouble in zone: <z> | E380 | "UT" |
| Wireless zone fault: <z> | E381 | "US" |
| Wireless module failure (382) | E382 | "UY" |
| Tamper active in zone: <z> | E383 | "TA" |
| Low battery in wireless zone: <z> | E384 | "XT" |
| Trouble in zone: <z> (389) | E389 | "ET" |
| Trouble in zone: <z> (391) | E391 | "NA" |
| Trouble in zone: <z> (393) | E393 | "NC" |
| User <v> disarmed the system | E400 | "OP" |
| User <v> disarmed the system | E401 | "OP" |
| Automatic disarm | E403 | "OA" |
| Deferred disarm <v> user | E405 | "OR" |
| Alarm cancelled by user: <v> | E406 | "BC" |
| User <v> disarmed remotely | E407 | "OP" |
| Quick disarm | E408 | "OP" |
| Remote disarm | E409 | "OS" |
| Callback request made by CMS | E411 | "RB" |
| Successful data download | E412 | "RS" |
| Entry access denied for user <v> | E421 | "JA" |
| Entry by user <v> | E422 | "DG" |
| Forced Access <z> zone | E423 | "DF" |
| Exit access denied for user <v> | E424 | "DD" |
| Exit by user <v> | E425 | "DR" |
| User <v> disarmed too early | E451 | "OK" |
| User <v> armed too late | E452 | "OJ" |
| User <v> Failed to Disarm | E453 | "CT" |
| User <v> Failed to Arm | E454 | "CI" |
| Auto arm failed | E455 | "CI" |
| Partial arm by user: <v> | E456 | "CG" |
| Exit violation by user: <v> | E457 | "EE" |
| System disarmed after alarm by user: <v> | E458 | "OR" |
| Recent arm <v> user | E459 | "CR" |
| Wrong code entered | E461 | "JA" |
| Auto-arm time extended by user: <v> | E464 | "CE" |
| Device disabled (501) | E501 | "RL" |
| Device disabled (520) | E520 | "RO" |
| Wireless sensor disabled in zone:<z> (552) | E552 | "YS" |
| Zone <z> bypassed | E570 | "UB" |
| Zone <z> bypassed | E571 | "FB" |
| Zone <z> bypassed | E572 | "MB" |
| Zone <z> bypassed | E573 | "BB" |
| Group bypass by user: <v> | E574 | "CG" |
| Zone <z> bypassed | E576 | "UB" |
| Zone <z> bypass cancelled | E577 | "UB" |
| Vent zone bypass | E579 | "UB" |
| Walk test activated by user:<v> | E607 | "TS" |
| Manual test report | E601 | "RX" |
| Periodic test report | E602 | "RP" |
| System event (605) | E605 | "JL" |
| System event (606) | E606 | "LF" |
| Periodic test report with trouble | E608 | "RY" |
| System event (622) | E622 | "JL" |
| System event (623) | E623 | "JL" |
| Time/Date was reset by user <v> | E625 | "JT" |
| Inaccurate Time/Date | E626 | "JT" |
| System programming started | E627 | "LB" |
| System programming finished | E628 | "LS" |
| System event (631) | E631 | "JS" |
| System event (632) | E632 | "JS" |
| System not active (654) | E654 | "CD" |
| Medical alarm restored | R100 | "MH" |
| Personal emergency restored | R101 | "QH" |
| No more fire alarm in zone :<z> | R110 | "FH" |
| No more water flow alarm in zone:<z> | R113 | "SH" |
| Panic alarm restored in zone:<z> | R120 | "PH" |
| Panic alarm cancelled by user: <v> | R121 | "HH" |
| Panic alarm restored in zone:<z> | R122 | "PH" |
| Panic alarm restored in zone: <z> | R123 | "PH" |
| Panic alarm restored in zone: <z> | R124 | "HH" |
| Panic alarm restored in zone: <z> | R125 | "HH" |
| No more alarm in zone: <z> | R130 | "BH" |
| No more alarm in zone: <z> | R131 | "BH" |
| No more alarm in zone: <z> | R132 | "BH" |
| No more alarm in zone: <z> | R133 | "BH" |
| No more alarm in zone: <z> | R134 | "BH" |
| No more alarm in zone: <z> | R135 | "BH" |
| No more tamper in zone: <z> | R137 | "TA" |
| No more alarm in zone:<z> | R140 | "UH" |
| No more system failure (143) | R143 | "UR" |
| No more tamper in zone: <z> | R144 | "TR" |
| No more tamper in zone: <z> | R145 | "TR" |
| No more alarm in zone: <z> | R146 | "BH" |
| No more alarm in zone: <z> | R150 | "UH" |
| No more gas alarm in zone:<z> | R151 | "GH" |
| No more water leakage alarm in zone: <z> | R154 | "WH" |
| Foil break restored in zone: <z> | R155 | "BH" |
| Temperature has normalized at sensor: <n> | R158 | "KH" |
| Temperature has normalized at sensor: <n> | R159 | "ZH" |
| No more CO alarm in zone: <z> | R162 | "GH" |
| No more fire failure in zone: <z> | R200 | "FV" |
| Monitored restore alarm | R220 | "BH" |
| No more system failure (300) | R300 | "YA" |
| AC power supply OK | R301 | "AR" |
| Battery OK | R302 | "YR" |
| No more system failure (304) | R304 | "YG" |
| System reset restored in zone: <z> | R305 | "RR" |
| No more battery failure (309) | R309 | "YR" |
| Restore ground fault | R310 | "UR" |
| No more battery failure (311) | R311 | "YR" |
| Restore power supply overcurrent (312) | R312 | "YQ" |
| No more sounder/Relay failure | R320 | "RO" |
| No more system failure (321) | R321 | "YH" |
| No more system failure (330) | R330 | "ER" |
| No more system failure (332) | R332 | "ER" |
| No more system failure (333) | R333 | "ER" |
| No more system failure (336) | R336 | "VR" |
| No more system failure (338) | R338 | "ER" |
| No more system failure (341) | R341 | "ER" |
| No more system failure (342) | R342 | "ER" |
| No more system failure (344) | R344 | "XH" |
| No more system communication failure (350) | R350 | "YK" |
| No more system communication failure (351) | R351 | "LR" |
| No more system communication failure (352) | R352 | "LR" |
| No more system failure (353) | R353 | "YK" |
| No more system communication failure (354) | R354 | "YK" |
| No more system failure (355) | R355 | "UJ" |
| Fire trouble restored in zone: <z> | R373 | "FJ" |
| No more trouble in zone: <z> | R374 | "EA" |
| No more trouble in zone: <z> | R380 | "UJ" |
| No more wireless zone fault: <z> | R381 | "UR" |
| No more wireless module failure (382) | R382 | "BR" |
| No more tamper in zone: <z> | R383 | "TR" |
| Battery OK in wireless zone: <z> | R384 | "XR" |
| No more trouble in zone: <z> (391) | R391 | "NS" |
| No more trouble in zone: <z> (393) | R393 | "NS" |
| User <v> armed the system | R400 | "CL" |
| User <v> armed the system | R401 | "CL" |
| Automatic arm | R403 | "CA" |
| User <v> armed remotely | R407 | "CL" |
| Quick arm | R408 | "CL" |
| Remote arm | R409 | “CS” |
| User <v> armed to Stay mode | R441 | "CG" |
| User <v> armed too early | R451 | “CK” |
| User <v> disarmed too late | R452 | “CJ” |
| User <v> Failed to Disarm | R454 | “CI” |
| Partial Arm by user: <v> | R456 | "CG" |
| Recent disarm <v> user | R459 | “CR” |
| Device enabled (501) | R501 | "RG" |
| Device enabled (520) | R520 | "RC" |
| Wireless sensor enabled in zone: <z> (552) | R552 | "YK" |
| Zone <z> bypass cancelled | R570 | "UU" |
| Zone <z> bypass cancelled | R571 | "FU" |
| Zone <z> bypass cancelled | R572 | "MU" |
| Zone <z> bypass cancelled | R573 | "BU" |
| Group bypass by user: <v> cancelled | R574 | "CF" |
| Zone <z> bypass cancelled | R576 | "UU" |
| Zone <z> bypass cancelled | R577 | "UU" |
| Vent zone bypass cancelled | R579 | "UU" |
| Walk test deactivated by user <v> | R607 | "TE" |
| Time/Date was reset by user <v> | R625 | "JT" |
| System active (654) | R654 | "CD" |
