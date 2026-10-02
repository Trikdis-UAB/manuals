# GET Cellular Communicator

<div style="text-align: center;">
  <img src="./image1.webp" alt="Photo of the GET communicator's front panel: TRIKDIS logo, an antenna connector at the top, LED labels NETWORK LTE, NETWORK LAN, DATA, POWER, TROUBLE and INTERFACE, and screw terminals labelled +12 VDC, -12 VDC, CLK, DATA, 1 I/O, 2 I/O, COM, A 485, B 485, plus separate LAN and TIP, RING terminal blocks." width="400">
</div>

## Description 

The communicator is designed to transmit event messages from the control panel to the CMS (Central Monitoring Station) and the Protegus2 application.

Cellular/Ethernet communicator GET can be directly connected to DSC, Paradox, UTC Interlogix (CADDX), Texecom, Innerrange, Honeywell control panels. The communicator can also be connected to the telephone communicators (which supports the Contact ID communication protocol transmitted by DTMF tones) of control panels.

Communicator transmits full event information to the Central Monitoring Station.

Communicator works with Protegus2 application. With Protegus2 users can control their alarm system remotely and get notifications about security system events. The Protegus2 app works with all security alarm panels from various manufacturers to which the GET communicator is connected. Communicator can transmit event notifications to the Central Monitoring Station and work with Protegus2 simultaneously.

### Features

**Connects to the control panel's serial or keyboard bus or telephone line (TIP/RING).**

Sends events to monitoring station receiver:

- Sends events to *TRIKDIS* software or hardware receivers that work with any monitoring software.

- Can send event messages to SIA DC-09 receivers.

- Can send event messages to SUR-GARD receivers. The annex has a table for converting Contact ID codes to SIA codes.

- Monitoring the connection by sending a PING request to the IP receiver every 30 seconds (or by user defined period).

- Backup channel, that will be used if connection with the primary channel is lost.

- With parallel communication channel events can be sent to two receivers at same time.

- When *Protegus2* service is enabled, events are first delivered to CMS, and only then are sent to app users.

**Works with Protegus2 app:**

- “*Push*” and special sound notifications informing about events.

- Remote system Arm/Disarm.

- Remote control of connected devices (lights, gates, ventilation systems, heating, sprinklers, etc.).

- Different user rights for administrator, installer and user.

**Notifies users:**

- Users can be notified about events with Protegus2 app.

**Controllable outputs and inputs:**

- 2 double I/O terminals that can be set either as input (IN) or controllable output (OUT) terminals.

- Outputs controlled by the Protegus2 app.

**Quick setup:**

- Settings can be saved to file and quickly written to other communicators.

- Two access levels for configuring the device for CMS administrator and for installer.

- Remote configuration and firmware updates.

### List of compatible control panels 

| Manufacturer | Model |
|--------------|-------|
| DSC® | <u>PC585</u>, <u>PC1404</u>, <u>PC1565</u>, <u>PC1616</u>, <u>PC1832</u>, <u>PC1864</u>, <u>PC5020</u> |
| PARADOX® | <u>SPECTRA SP4000</u>, <u>SP5500</u>, <u>SP6000</u>, <u>SP7000</u>, <u>SP65</u>, <u>SP5500+</u>, <u>SP6000+</u>, <u>SP7000+</u> |
| PARADOX® | <u>MAGELLAN MG5000</u>, <u>MG5050</u>, <u>MG5050E</u>, <u>MG5050+</u>, <u>MG5075</u> |
| PARADOX® | <u>DIGIPLEX</u> EVO48, <u>EVO192</u>, <u>EVOHD</u>, <u>EVOHD+</u> |
| PARADOX® | SPECTRA 1727, 1728, 1738 |
| PARADOX® | ESPRIT E55 |
| UTC Interlogix® | <u>NetworX (Caddx) NX-4v2</u>, <u>NX-6v2</u>, <u>NX-8v2</u>, <u>NX-8e</u> |
| Texecom® | <u>Premier 24</u>, <u>48</u>, <u>88</u>, <u>168</u>, <u>640</u> /​ <u>Premier Elite 12</u>, <u>24</u>, <u>48</u>, <u>64</u>, <u>88</u>, <u>168</u>, <u>640</u> |
| Innerrange® | Inception, Integriti |
| Honeywell® | <u>Ademco Vista-15</u>, <u>Ademco Vista-20</u>, <u>Ademco Vista-48</u> |

**<u>Underlined</u>** - Control panels directly controlled by communicator***.*** Firmware PARADOX control panels, which are directly controlled, must be V.4 or higher.

\* Connect control panels from other manufacturers to the GET communicator using the TIP RING terminals of the control panel.

### Communicator model types 

This manual is for LTE communicators.

### Specifications 

| Parameter | Description |
|-----------|-------------|
| Network connectivity | LTE /​ Ethernet |
| Connection to control panel | Serial bus, Keypad bus or TIP RING |
| Dual purpose terminals [IN/​OUT] | 2, can be set as either NC;​ NO;​ NC/​EOL;​ NO/​EOL;​ NC/​DEOL;​ NO/​DEOL (2,2 kΩ) type inputs or open collector (OC) type outputs with current up to 0,15 A, 30 VDC max. |
| Modem EG915U-EU /​ (Europe) | LTE FDD: B1/​B3/​B5/​B7/​B8/​B20/​B28 |
| Modem EG915U-EU /​ (Europe) | GSM: B2/​B3/​B5/​B8 |
| Modem EG915U-LA /​ (Latin America) | LTE FDD: B2/​B3/​B4/​B5/​B7/​B8/​B28/​B66 |
| Modem EG915U-LA /​ (Latin America) | GSM: B2/​B3/​B5/​B8 |
| Modem BG95-M5 (Cat M1) | LTE-FDD: B1/​B2/​B3/​B4/​B5/​B8/​B12/​B13/​B18/​B19/​B20/​B25/​B26/​B27/​B28/​B66/​B85 |
| Modem BG95-M5 (Cat M1) | EGPRS: 850/​900/​1800/​1900 MHz |
| Power supply voltage | 10-18 V DC |
| Current consumption | 175 mA |
| Transmission protocols | TRK8, DC-09_2007, DC-09_2012, TL150 |
| Message encryption | AES 128 |
| Buffer memory capacity | 60 events |
| Changing settings | With TrikdisConfig computer program remotely or locally via USB-C port |
| Operating environment | Temperature from -10 °C to 50 °C, relative humidity - up to 80% at +20 °C |
| Communicator dimensions | 113 x 70 x 25 mm |
| Weight | 110 g |

### Communicator elements 

1.  Cellular antenna SMA connector

2.  Light indicators

3.  Frontal case opening slot

4.  Terminal for external connections

5.  “RESET” button.

6.  SIM2 card slot

7.  SIM1 card slot

8.  USB-C port for communicator programming

9.  Ethernet connection RJ45 socket

<img alt="GET communicator elements with numbered callouts. Left, the closed case: 1 cellular antenna SMA connector, 2 light indicators, 3 frontal case opening slot. Right, the open case with the circuit board: 4 terminals for external connections, 5 RESET button, 6 SIM2 card slot, 7 SIM1 card slot, 8 USB-C port for programming, 9 Ethernet RJ45 socket." src="./image4.webp" style="width:4.926676509186351in;height:3.24000656167979in" />

### Purpose of terminals 

| Terminal | Description |
|----------|-------------|
| +12 VDC | +10 V/​+18 V DC power supply |
| -12 VDC | 0 V DC power supply |
| CLK | Serial bus terminals for direct connection to control panel |
| I/​O 1 | 1st input/​output terminal (default setting – OUT) |
| I/​O 2 | 2nd input/​output terminal (default setting – OUT) |
| COM | Common (negative) terminal |
| A 485 | Not used |
| LAN | Ethernet connection RJ45 socket |
| TIP | Terminal to connect with control panel TIP terminal |
| RING | Terminal to connect with control panel RING terminal |

### LED indication of operation 

| Indicator | Light status | Description |
|-----------|--------------|-------------|
| NETWORK LTE | Off | No connection to cellular network |
| NETWORK LTE | Yellow blinking | Connecting to cellular network |
| NETWORK LTE | Green solid with yellow blinking | Communicator is connected to cellular network. / Sufficient cellular signal strength for 4G level 3 (three yellow flashes) |
| NETWORK LAN | Off | No connection to a computer network |
| NETWORK LAN | Green solid | Communicator is connected to a computer network |
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
| TROUBLE | 2 red blinks | SIM1 card error |
| TROUBLE | 3 red blinks | SIM2 card error |
| TROUBLE | 7 red blinks | Lost connection with control panel (serial bus) |
| INTERFACE | - | Not used |

### Structural schematic of using the GET communicator 

<img alt="Block diagram of GET use: alarm panel to the LTE communicator (GET). The communicator reaches the Internet two ways: over LTE, or through a router. From the Internet, the Protegus server reaches a phone with Protegus software, and a two-way link connects to the receiver at the monitoring station in the security company, which feeds the Monas MS monitoring software." src="./image5.webp" style="width:7.0875in;height:2.9in" />

!!! note
    Before you begin, make sure that you have the necessary:
    
    1.  USB-C cable for configuration.
    
    2.  At least 4-wire cable for connecting communicator to control panel.
    
    3.  CRP2.4 cable for connecting to Paradox panel\`s serial port.
    
    4.  Flat-head 2,5 mm screwdriver.
    
    5.  Sufficient gain cellular antenna if network coverage in the area is
        poor.
    
    6.  Activated SIM card (PIN code request can be turned off).
    
    7.  Particular security control panel\`s installation manual.
    
    Order the necessary components separately from your local distributor.
## Quick configuration

Below we describe what settings need to be set for the communicator to begin sending events to the Central Monitoring Station (CMS) and to allow the security system to be controlled with the Protegus2 app.

You can make these settings in the Protegus app or in TrikdisConfig. Choose your tool once below; every section on this page follows your choice.

=== "Protegus app"

    The communicator must be online and added to your Protegus account (see [Adding the security system to Protegus2 app](#adding-the-security-system-to-protegus2-app)). If it can't connect yet, for example because the SIM card needs a PIN or a different APN, make these settings with TrikdisConfig first.

    1.  In the Protegus app, open the system and go to **Settings → Advanced settings**.

    2.  The first time, the app shows **Proceed with Caution**. Tap **Accept the risk and continue**. Tick **Do not show this again.** to skip it next time.

        ![Protegus app, Advanced settings: 'Proceed with Caution' warning that these settings are for professionals only, with a 'Do not show this again.' checkbox and the 'Accept the risk and continue' button.](./protegus-app/get-advanced-intro-phone.webp){ .trik-mob-img }

    3.  The app reads the communicator's settings. If it asks for the **Service Access code**, enter the communicator's Protegus Cloud access code (default 123456).

    4.  Change the settings described below, then tap **Write** to save them to the communicator.

    !!! note
        The Protegus app supports GET firmware 1.08 or later.

=== "TrikdisConfig"

    1.  Download **TrikdisConfig** configuration software from [www.trikdis.com](http://www.trikdis.com) (type “TrikdisConfig” in the search field) and install it.

    2.  Open the casing of the communicator with a flat-head screwdriver as shown below:

        <img alt="Line drawing showing how to open the GT case with a flat-head screwdriver: insert it at the top seam near the antenna and pry outward, then insert it at the bottom seam and pry downward. A detail view shows the USB-C port location on the PCB edge." src="./image6.webp" style="width:6.543346456692913in;height:1.7866699475065617in" />

    3.  Using a USB-C cable connect the communicator to the computer.

    4.  Run TrikdisConfig. The software will automatically recognize the connected communicator and will open a window for configuration.

    5.  Click **Read [F4]** to read the communicator’s settings. If requested, enter the Administrator or Installer 6-digit code in the pop-up window.

### Settings for connection with Protegus2 app 

=== "Protegus app"

    In the Protegus app, open **Settings → Advanced settings** and set:

    1.  **Panel settings → TLF** (communicator connected to the TIP/RING terminals of the control panel): set **Security panel model** to **AUTO**.

    2.  **Panel settings → Serial Bus** (communicator connected to the keypad bus or serial bus): select the **Security panel model**.

    3.  On the same screen, turn on **Remote Arm/Disarm** if users should control the panel in the Protegus app with their keypad code. This setting is only shown for directly controlled panels.

    4.  For direct control of Paradox panels, enter the **PC download password**; for Texecom panels, the UDL passcode. It must match the password entered in the control panel.

    5.  **User reporting → Cloud**: turn on **Enabled**, and change the **Cloud access code** if users should be asked for it when adding the system to the Protegus app (default 123456).

    6.  **Network settings → LAN** (communicator connected to a LAN network): turn on **Use DHCP**.

    7.  **Network settings → SIM** and **SIM2** (for each inserted SIM card): enter the **SIM card PIN** and the **APN**. Check that **DNS1** and **DNS2** match those supported by your ISP.

    8.  **Reporting to CMS → CMS settings → Reporting mode**: set **Main type**, **Backup type** and **Backup type 2**, the order in which the communicator uses **LAN**, **SIM** (SIM1) and **SIM2**.

    9.  Tap **Write**.

    !!! note
        For direct panel control to work, you will need to change the panel settings. How to do this is described in chapter 4.1 "Programming of control panels when the communicator is connected to the keypad bus or serial bus".

=== "TrikdisConfig"

    In TrikdisConfig, set:

    **In “Panel settings” window:**

    <img alt="TrikdisConfig software, Panel settings window, TLC section. Communication protocol dropdown (highlighted, labelled 1) set to '2. AUTO'." src="./image7.webp" style="width:7.086614173228346in;height:1.5984251968503937in" />

    1.  If the communicator is connected to the TIP/RING terminals of the control panel, then you need to make the “**AUTO**” setting.

    <img alt="TrikdisConfig software, Panel settings window, Serial Bus section, three highlighted fields: Security panel model (2) set to '6. PARADOX SP+/MG+', Remote Arm/Disarm (3) checkbox ticked, Security panel PC download password (4) set to 1234." src="./image8.webp" style="width:7.086614173228346in;height:2.0118110236220472in" />

    The communicator is connected to the keypad bus or serial bus of the control panel.

    2. Select “**Security panel model”** that will be connected to the communicator.

    2.  Select “**Remote Arm/Disarm”** if you want users to be able to control the panel in Protegus2 app with their keypad code. This setting is only shown for directly controlled panels.

    3.  For the direct control of Paradox and Texecom panels enter “**Security panel PC download password”**. It must match the password that is entered in the control panel.

    !!! note
        For the direct panel control to work, you will need to change the panel
        settings. How to do this is described in chapter 4.1 "Programming of
        control panels when the communicator is connected to the keypad bus or
        serial bus". In this section you will find information on how to change
        the "**PC download/UDL password**".
    **In “User reporting” window, “PROTEGUS Cloud” tab:**

    <img alt="TrikdisConfig software, User reporting window, PROTEGUS Cloud tab, two highlighted fields: Enable connection (5) checkbox ticked, PROTEGUS Cloud access Code (6) set to 123456." src="./image9.webp" style="width:7.086614173228346in;height:1.9606299212598426in" />

    4. Tick the checkbox “**Enable connection”** to the Protegus Cloud.

    2.  Change the “**PROTEGUS Cloud access Code”** for logging in to Protegus2 if you want users to be asked to enter it when adding the system to Protegus2 app (default password – 123456).

    **In “Network settings” window:**

    <img alt="TrikdisConfig software, Network settings window, LAN tab, Ethernet settings. Use DHCP checkbox (highlighted, labelled 7) is ticked." src="./image10.webp" style="width:7.086614173228346in;height:1.8070866141732282in" />

    These settings must be made if the communicator is connected to a LAN network.

    3. Check “**Use DHCP”** the box so that the communicator automatically reads the computer network settings (subnet mask, gateway) and is assigned an IP address.

    <img alt="TrikdisConfig software, Network settings window, SIM1 tab, four highlighted fields: SIM card PIN (8) set to 1111, APN (9) set to 'internet', DNS 1 (10) and DNS 2 (11) left blank." src="./image11.webp" style="width:7.086614173228346in;height:2.9173228346456694in" />

    These settings must be made if the SIM (or two SIM cards) card is inserted into the communicator.

    4. Enter “**SIM card PIN”** code.

    2.  Change “**APN”** name. “**APN”** can be found on the website of the SIM card operator (“internet” is universal and works in many operator networks).

    3.  **DNS1, DNS2**: Google DNS server is set by default. **Regardless of IP settings, make sure the DNS addresses match those supported by your ISP**.

    **In “CMS reporting” window:**

    <img alt="TrikdisConfig software, CMS reporting window, Settings tab, Reporting mode section (highlighted, labelled 12): Main type LAN, Backup type SIM1, Backup type 2 Disable." src="./image12.webp" style="width:7.086614173228346in;height:2.562992125984252in" />

    12. In the group of options "**Reporting mode**", the order of communication channels is set, how the communicator will send messages to CMS and to Protegus2. The connection types are specified in order. If the communicator fails to connect using the “**Main type”** connection , it switches to the “**Backup type”**, and so on. If the backup connection type was successful in transmitting the message to the CMS, then the Return to main connection type will be attempted after the specified time interval.

    After finishing configuration, click the button **Write [F5]** and disconnect the USB cable.

!!! note
    For a description of all GET settings, see [Communicator settings](#communicator-settings).

### Settings for connection with Central Monitoring Station 

=== "Protegus app"

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

=== "TrikdisConfig"

    In TrikdisConfig, set:

    **In “System settings” window:**

    <img alt="TrikdisConfig software, System settings window. Object ID field (highlighted, labelled 1) set to 561234. Also visible: Module ID 0123456789, Administrator code 123456, Installer code 654321." src="./image13.webp" style="width:7.086614173228346in;height:1.4173228346456692in" />

    1.  Enter “**Object ID”** (account) number provided by the Central Monitoring Station (characters, 0-9, A-F. **Do not use FFFE, FFFF Object ID**).

    **In “Panel settings” window:**

    <img alt="TrikdisConfig software, Panel settings window, TLC section. Communication protocol dropdown (highlighted, labelled 2) set to '2. AUTO'." src="./image14.webp" style="width:7.086614173228346in;height:1.5866141732283465in" />

    2. If the communicator is connected to the TIP/RING terminals of the control panel, then you need to make the “**AUTO**” setting.

    <img alt="TrikdisConfig software, Panel settings window, Serial Bus section. Security panel model dropdown (highlighted, labelled 3) set to '6. PARADOX SP+/MG+'." src="./image15.webp" style="width:7.086614173228346in;height:1.9763779527559056in" />

    3. Select “**Security panel model”** that will be connected to the communicator.

    **In “CMS reporting” window settings for “Primary channel”:**

    <img alt="TrikdisConfig CMS reporting window, CMS settings tab. Primary channel fields highlighted and numbered 4 to 9: Communication type (Disable), Protocol, Encryption key (0123456789ABCDEF), Domain or IP, Port, TCP or UDP (TCP). The Primary channel Backup group is highlighted as 10. The Parallel channel and Parallel channel Backup show Communication type IP, Protocol TRK8, the same encryption key and TCP." src="./image16.webp" style="width:7.086614173228346in;height:3.3976377952755907in" />

    4. **Communication type** - select the **IP** connection method.

    2.  **Protocol** - select the protocol type for event messages: **TRK8** (to TRIKDIS receivers), **DC-09_2007** or **DC-09_2012** (to universal receivers), **TL150** (to SUR-GUARD receivers).

    3.  **Encryption key** - enter the encryption key that is set in the receiver.

    4.  **Domain or IP** - enter the receiver’s Domain or IP address.

    5.  **Port** - enter receiver’s network port number.

    6.  **TCP or UDP** - choose event transmission protocol (**TCP** or **UDP**) in which events should be sent.

    7.  (Recommended) Configure “**Primary channel Backup”** settings.

    <img alt="TrikdisConfig software, CMS reporting window, Settings tab, Reporting mode section (highlighted, labelled 11): Main type LAN, Backup type SIM1, Backup type 2 Disable." src="./image17.webp" style="width:7.086614173228346in;height:2.5511811023622046in" />

    11. In the group of options "**Reporting mode**", the order of communication channels is set, how the communicator will send messages to CMS and to Protegus2. The connection types are specified in order. If the communicator fails to connect using the “**Main type”** connection , it switches to the “**Backup type”**, and so on. If the backup connection type was successful in transmitting the message to the CMS, then the return to main connection type will be attempted after the specified time interval.

    **In “Network settings” window:**

    <img alt="TrikdisConfig software, Network settings window, LAN tab, Ethernet settings. Use DHCP checkbox (highlighted, labelled 12) is ticked." src="./image18.webp" style="width:7.086614173228346in;height:1.7913385826771653in" />

    These settings must be made if the communicator is connected to a LAN network.

    12. Check “**Use DHCP”** the box so that the communicator automatically reads the computer network settings (subnet mask, gateway) and is assigned an IP address.

    <img alt="TrikdisConfig software, Network settings window, SIM tab, four highlighted fields: SIM card PIN (13) set to 1111, APN (14) set to 'internet', DNS 1 (15) and DNS 2 (16) left blank." src="./image19.webp" style="width:7.086614173228346in;height:2.858267716535433in" />

    If a SIM card (or two SIM cards) is inserted in the communicator, the following settings must be made.

    13. Enter “**SIM card PIN”** code.

    14. Change the “**APN”** name. “**APN”** can be found on the website of the SIM card operator (“internet” is universal and works in many operator networks).

    15. **DNS1, DNS2**: Google DNS server is set by default. **Regardless of IP settings, make sure the DNS addresses match those supported by your ISP**.

    After finishing configuration, click **Write [F5]** and disconnect the USB cable.

!!! note
    For a description of all GET settings, see [Communicator settings](#communicator-settings).

## Installation and wiring 

### Installation process 

1.  Remove the top cover and pull out the contact terminal.

2.  Insert SIM card into the holder.

3.  Remove the PCB board from the bottom part of the case.

4.  Fix the bottom part to a suitable place with screws.

5.  Place the PCB board back into case, insert contact terminal.

6.  Screw cellular antenna on.

7.  Close the top cover.

8.  If the LAN network will be used to transmit events to the CMS, a LAN cable must be connected to the communicator.

<img alt="Line drawing: left, the PCB assembly being released from the case, with a circled tab near the antenna connector and an arrow showing the release direction; right, the empty case back showing two circled mounting screw posts." src="./image20.webp" style="width:3.937007874015748in;height:2.015748031496063in" />

<img alt="Top view line drawing of the GET communicator board showing the SIM card slot locations: SIM1 slot near the centre and SIM2 slot at the left edge, each with an arrow showing the card's insertion direction." src="./image21.webp" style="width:2.5366721347331582in;height:1.4066699475065616in" />

!!! note
    One or two SIM cards can be inserted into the communicator. / Ensure
    that the SIM card is activated. / Ensure that mobile internet service
    (mobile data) is enabled if connected via IP channel. / To avoid
    entering the PIN code in TrikdisConfig, insert the SIM card into
    your mobile phone and turn off the PIN request function.
### Installation in intrusion control panel enclosure panel 

The GET communicator must be installed inside the intrusion control panel enclosure, which is protected by a lid tamper. It is mounted on the internal rear surface of the enclosure using the supplied industrial-grade double-sided acrylic foam mounting tape. The tape must be applied to a clean, dry surface with firm pressure to ensure reliable adhesion.

If the host enclosure does not allow secure installation as described above, the communicator may be installed in a separate tampered enclosure.

### Schematics for wiring the communicator to a security control panel 

Following one of the schematics provided below, connect communicator to the control panel.

<img alt="Two wiring diagrams. DSC panel keypad bus to GET: RED to +DC (+12V), BLK to -DC, YEL to CLK, GRN to DATA. PARADOX panel serial port to GET through the EX-CRP2.4 cable (ordered separately): R (red, +12V) to +DC, B (black) to -DC, Y (yellow) to CLK, G (green) to DATA." src="./image22.webp" style="width:6.743347550306212in;height:2.8466721347331583in" />

<img alt="Two wiring diagrams. CADDX panel keypad bus to GET: POS to +DC (+12V), COM to -DC, DATA to DATA (CLK not used). TEXECOM panel serial port to GET through the EX-CRP4 cable (ordered separately): R (red, +12V) to +DC, B (black) to -DC, BL (blue) to CLK, W (white) to DATA." src="./image23.webp" style="width:6.803347550306212in;height:2.9000054680664915in" />

<img alt="Two wiring diagrams. Inner Range Inception to GET: VOUT + (+12V) to +DC and VOUT 0V to -DC, and from the panel's USB port through Inner Range cable 993030USB: black wire to the 0V/-DC line, green wire to CLK, white wire to DATA. Inner Range Integriti Port 0 to GET through Inner Range cable INTG-996795: +DET (+13V) to +DC, GND 5 to -DC, Rx 3 to CLK, Tx 2 to DATA." src="./image24.webp" style="width:6.996680883639545in;height:2.8066721347331582in" />

<img alt="Two wiring diagrams. Honeywell Vista-15, Vista-20, Vista-48 panel keypad bus to GET: terminal 4 to -DC, terminal 5 to +DC (+12V), terminal 6 to DATA, terminal 7 to CLK. Generic control panel to GET: +AUX to +DC (+12V), -AUX to -DC; telephone line communicator terminals: panel TIP to GET TIP, panel RING to GET RING." src="./image25.webp" style="width:6.996680883639545in;height:3.28000656167979in" />

### Schematic for wiring of the communicator to the keypad bus and telephone communicator (TIP/RING terminals) of the PARADOX SP/SP+/MG/MG+ control panel 

<img alt="Wiring diagram: PARADOX SP, SP+, MG or MG+ panel to GET. Keypad bus: +AUX (+12V) to +DC, -AUX to -DC, GRN to DATA, YEL to CLK. Telephone communicator: panel TIP to GET TIP, panel RING to GET RING." src="./image26.webp" style="width:3.37000656167979in;height:3.0333398950131234in" />

When connecting the communicator to the keypad bus and the TIP/RING terminals of the control panel, you must make the following settings for the GET communicator:

1.  Select “**AUTO**”.

2.  Select the control panel model “**7. Paradox SP+/MG+ series KeyBus**“.

3.  Select “**Remote Arm/Disarm**” if you want users to be able to control the panel using the Protegus2 app using their own keypad code.

4.  To directly control the security panel, enter the “**Security panel PC download password**”. It must match the password entered in the security panel.

<img alt="TrikdisConfig software, Panel settings window, four highlighted fields: Communication protocol (1) set to '2. AUTO', Security panel model (2) set to '7. PARADOX SP+/MG+', Remote Arm/Disarm (3) checkbox ticked, Security panel PC download password (4) set to 1234." src="./image27.webp" style="width:7.086614173228346in;height:2.0196850393700787in" />

The Paradox control panel must be programmed to transmit events to the CMS and for remote control from the Protegus2 application.

| **Cell** |     **Data**     | **Cell** | **Data** |
|:--------:|:----------------:|:--------:|:--------:|
|   801    | \*\*\*\*\*\*\*\* |   815    |  123456  |
|   811    |       1111       |   911    |   1234   |
|   812    |       2222       |          |          |

### Schematic for wiring the communicator to the control panel keyswitch zone 

Follow this schematic if the control panel will be armed/disarmed with a communicator PGM output turning on/off the panel’s keyswitch zone.

!!! note
    GET communicator has 2 universal input / output terminals that can
    be set to the OUT (PGM) operating mode. The outputs (OUT) can control
    two areas of the security system. If you want to control the system in
    this way, in TrikdisConfig, in the "**Panel settings**" window,
    uncheck "**Remote Arm/Disarm"**. The Protegus2 apps must be
    configured with the settings described in chapter 5.2 "Additional
    settings to arm/disarm the system using the control panel's keyswitch
    zone".
The communicator is connected to the keypad bus or serial bus of the control panel. / Arming/disarming the panel via keyswitch zone.

<img alt="Wiring diagram: control panel to GET, arming through the keyswitch zones. Keypad bus or serial port: RED (+12V) to +DC, BLK to -DC, YEL to CLK, GRN to DATA. Zone (keyswitch): 1-st Area to I/O 1, 2-nd Area to I/O 2. GET COM, RS485, TIP and RING terminals are not connected." src="./image28.webp" style="width:3.313339895013123in;height:2.4466721347331584in" />

The communicator is connected to the telephone communicator (TIP/RING terminals) of the control panel. / Arming/disarming the panel via the keyswitch zone.

<img alt="Wiring diagram: control panel to GET, arming through the keyswitch zones. Power: +AUX (+12 V) to +DC, -AUX to -DC. Telephone line communicator terminals: TIP to TIP, RING to RING. Zone (keyswitch): 1-st Area to I/O 1, 2-nd Area to I/O 2. GET CLK, DATA, COM and RS485 terminals are not connected." src="./image29.webp" style="width:3.46000656167979in;height:2.903338801399825in" />

### Schematics for input connection 

The communicator has 2 universal input / output terminals that can be set to input IN mode. NC, NO, NO / EOL, NC / EOL, NO / DEOL, NC / DEOL circuits can be connected to the input terminal. The input type can be changed in the TrikdisConfig window „**IN/OUT” -> “Type”**, or in the Protegus app under **Advanced settings → IN/OUT**, terminal **1** or **2** **→ Type**.

Connect the input according to the selected input type (NO, NC, NC/EOL, NO/EOL, NO/DEOL, NC/DEOL), as shown in the schemes below:

<img alt="Six input wiring schematics, each from COM to INx. NO: Short - Alarm, Open - Restore. NC: Short - Restore, Open - Alarm. NC with a 2,2k end of line resistor in series (EOL 2,2k): Short - Alarm, Open - Alarm, 2,2k - Restore. NO with a 2,2k EOL resistor in parallel: Short - Alarm, Open - Alarm, 2,2k - Restore. NO with tamper recognition (DEOL): tamper switch and a 2,2k resistor in series, then the NO contact with a second 2,2k resistor across it; Short - Tamper, Open - Tamper, 2,2k - Alarm, 3,3k-5,5k - Restore. NC with tamper recognition (DEOL): the same with an NC contact; Short - Tamper, Open - Tamper, 2,2k - Restore, 3,3k-5,5k - Alarm." src="./image30.webp" style="width:5.169291338582677in;height:4.003937007874016in" />

### Schematics for wiring a relay 

With relay contacts you can control (turn on/off) various electric appliances. The I/O terminal of the communicator must be set to an output (OUT) mode.

<img alt="Wiring diagram: GET to Relay. Coil: +DC to one relay coil terminal, I/O x to the other coil terminal. Relay switch contacts (for the connected appliance): NC, C, NO." src="./image31.webp" style="width:2.1133377077865267in;height:0.92333552055993in" />

### Turn on the communicator 

To start the communicator, turn on the security control panel’s power supply. This LED indication on the GET communicator must show:

- “POWER” LED illuminates green when the power is on;

- “NETWORK LTE” LED illuminates green and blinks yellow when the communicator is registered to the cellular network.

!!! note
    Sufficient strength of LTE signal is level three (three "NETWORK LTE"
    indicator flashes in yellow color). / If you count less yellow "NETWORK
    LTE" LED flashes, the network signal strength is insufficient. We
    recommend to select a different place to install the communicator, or to
    use a more sensitive cellular antenna. / If you see a different LED
    indication, it indicates a certain malfunction. Diagnose it by following
    the LED indication table in chapter 1.6 "LED indication of
    operation". / If the GET indication does not illuminate at all,
    check the power supply and connections.
## Programming the control panel 

### Programming of control panels when the communicator is connected to the keypad bus or serial bus 

Below it is described how to program the security control panel so that the GET communicator could read events from the panel and control it remotely.

To enable remote control of the security panel, make sure that the checkbox “**Remote Arm/Disarm”** is selected in the TrikdisConfig window **“Panel settings”.**

#### DSC

DSC panels do not need to be programmed.

#### PARADOX

Paradox control panels need to be programmed only for direct control with Protegus2. You do not need to program Paradox panels for reading events.

For remote control of Paradox panels, you need to set up a PC download password. This password must match the password which was set in the TrikdisConfig window **“Panel settings”**, when the checkbox next to “**Remote Arm/Disarm”** was selected.

To set this password, with the keyboard connected to the security control panel:

- For MAGELLAN, SPECTRA series: go to cell 911 and enter 4-digit PC download password.

- For DIGIPLEX EVO series: go to cell 3012 and enter 4-digit PC download password.

#### TEXECOM

Texecom control panels need to be programmed for both reading events and remote control.

You need to set the Texecom panel’s “**UDL** **passcode”**. This password must match the password which was set in the TrikdisConfig window **“Panel settings”,** when the box next to “**Remote Arm/Disarm”** was selected.

The security control panel can be programmed with Texecom software - Wintex. Enter “**UDL passcode”** (4-digit code) in the “**Communication Options”** window, “**Options”** tab.

Also, you can program with a keypad connected to the security control panel:

1.  Enter the 4-digit installer’s code and press the [Menu] button to enter the programming menu.

2.  Press the [9] key immediately afterwards.

3.  Press [7][6], and then [2]. Enter the 4-digit “**UDL** **passcode”** (“**UDL passcode”** must match the GET communicator’s “**PC login password”).**

4.  Press [Yes] and leave the programming mode by pressing [Menu].

#### UTC INTERLOGIX (CADDX)

With the keyboard connected to the security control panel:

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

#### INNERRANGE

**Innerrange Inception** security control panel version must be **2.3.0.3507-r0** or higher.

The control panel must be connected to the internet. Connect to **Innerrange Inception** by entering: <https://skytunnel.com.au/inception/SERIALNUMBER>, where SERIALNUMBER is the number of the controller that you can find on the panel’s enclosure.

Open **Configuration > General > Alarm Reporting**. In the **3rd Party Device Configuration** settings group you need to enter:

<img alt="Innerrange Inception software, Alarm Reporting page, 3rd Party Device Configuration group: 'Enable 3rd Party Device Reporting' checkbox ticked (highlighted), '3rd Party Device Type' set to Trikdis (highlighted), 'Serial Port' set to 'Serial Port 1 (Plugged In, In Use By 3rd Party Device)' (highlighted)." src="./image32.webp" style="width:6.625984251968504in;height:3.2125984251968505in" />

1.  **Enable 3rd Party Device Reporting** - select this checkbox.

2.  **3rd Party Device Type** - set “Trikdis”.

3.  **Serial port** - set “Serial Port 1 (Plugged In, In Use By 3rd Party Device)”.

4.  Save settings and exit the application.

#### HONEYWELL ADEMCO VISTA

Follow these steps for **Honeywell Ademco Vista-20** and **Honeywell Ademco Vista-48** panels. **The panel’s firmware version must be V5.3 or higher.** With a keypad that is connected to the panel:

1.  Enter the programming mode. Enter the installer code 4][1][1][2] and after that [8][0][0] . Alternatively, turn on the panel‘s power supply. In 50 seconds after the power supply is turned on, press the buttons [\*] and [#] at the same time (this method can be used when programming mode was exited by pressing in keypad [\*][9][8] ).

2.  Turn on the sending of Contact ID events via LRR. Press [\*][2][9][1][#] in keypad.

3.  When using the „Remote Arm/Disarm“ function, allow to use the 2nd AUI address. In keypad press [\*][1][8][9][1][1][#] .

Exit the programming mode. In keypad press [\*][9][9].

### Programming of control panels when the communicator is connected to the TIP/RING terminals of the control panel 

For the control panel to send events via the landline dialer, it must be turned on and properly set up. Following the panel’s programming manual, configure the control panel’s landline dialer:

1.  Turn on the panel’s PSTN landline dialer.

2.  Enter the monitoring station receiver’s telephone number (you can use any number longer than 4 digits. The GET communicator will pick up and answer when the panel calls to any phone number).

3.  Choose DTMF mode.

4.  Select Contact ID communication protocol.

5.  Enter the panel’s 4 digit account number.

The control panel zone to which the GET output OUT is connected should be set to keyswitch zone for arming/disarming the control panel remotely.

!!! note
    Keyswitch zone can be momentary (pulse) or level. By default, the
    GET controllable output OUT is set to 3 second pulse mode. You can
    change the impulse duration or change to level mode in Protegus2
    settings. See chapter **5**.2 "Additional settings to arm/disarm the
    system using the control panel's keyswitch zone".
#### PROGRAMMING HONEYWELL VISTA LANDLINE DIALER

Using the control panel’s keypad enter these sections and set them as described:

- \*41 – enter monitoring station receiver telephone number;

- \*43 – enter control panel’s account number;

- \*47 – set the Tone dial to [1] and enter the number of dial attempts;

- \*48 – use default setting, \*48 must be set to 7;

- \*49 – Split/Dual message. \*49 must be set to 5;

- \*50 – delay for sending burglary alarm events (optional). Default value is [2,0]. With it the event message transmission will be delayed for 30 seconds. If you want the message to be sent immediately, set [0,0].

When all required settings are set, it is necessary to exit programming mode. Enter \*99 in keypad.

#### SPECIAL SETTINGS FOR HONEYWELL VISTA 48 PANEL

If you want to use GET communicator with Honeywell Vista 48 panel, set the following sections as described:

| Section | Data                             | Section | Data | Section | Data |
|:-------:|----------------------------------|:-------:|:----:|:-------:|:----:|
|  \*41   | 1111 (receiver telephone number) |  \*60   |  1   |  \*69   |  1   |
|  \*42   | 1111                             |  \*61   |  1   |  \*70   |  1   |
|  \*43   | 1234 (panel account number)      |  \*62   |  1   |  \*71   |  1   |
|  \*44   | 1234                             |  \*63   |  1   |  \*72   |  1   |
|  \*45   | 1111                             |  \*64   |  1   |  \*73   |  1   |
|  \*47   | 1                                |  \*65   |  1   |  \*74   |  1   |
|  \*48   | 7                                |  \*66   |  1   |  \*75   |  1   |
|  \*50   | 1                                |  \*67   |  1   |  \*76   |  1   |
|  \*59   | 0                                |  \*68   |  1   |         |      |

When all required settings are set, it is necessary to exit programming mode. Enter \*99 in keypad.

#### UTC INTERLOGIX(CADDX)

Programming of the **Interlogix NX-4V2** (**NX-6V2, NX-8V2**) control panel when the communicator is connected to the TIP/RING terminals of the control panel.

|  | Keypad Entry | Description |
|--|--------------|-------------|
|  | *89713 | Enter programming mode |
|  | 0# |  |
| Location 0 | 0# |  |
| Location 0 | 1*2*3*4*# |  |
| Location 1 | 1# |  |
| Location 1 | 1*2*3*4*# |  |
| Location 2 | 2# |  |
| Location 2 | 1*# |  |
| Location 4 | 4# | All zones LEDs are ON (segment 1) |
| Location 4 | 12345678* | All zones LEDs are ON (segment 2) |
| Location 4 | 12345678*# |  |
| Location 23 | 23# | All zones LEDs are ON (segment 3) |
| Location 23 | ** | All zones LEDs are ON (segment 3) |
| Location 23 | 12345678*# | All zones LEDs are ON (segment 3) |
| Location 37 | 37# | All zones LEDs are ON (segment 3) |
| Location 37 | ** | All zones LEDs are ON (segment 4) |
| Location 37 | 12345678* |  |
| Location 37 | 12345678*# |  |
|  | EXIT EXIT | Exit programming mode |

## Remote control 

### Adding the security system to Protegus2 app 

With Protegus2 users will be able to control their alarm system remotely. They will see the status of the system and receive notifications about system events.

1.  Download and launch the Protegus2 application or use the browser version: [<u>www.protegus.app</u>](https://www.protegus.app/login).

    <div style="margin: 20px 0; text-align: left;">
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
    When adding the GET communicator to Protegus2 check if:

    1.  The inserted SIM card is activated and the PIN code is either
        entered or disabled;

    2.  Or a LAN cable is connected.

    3.  "Protegus cloud" is enabled. See [User reporting](#user-reporting);

    4.  Power supply is connected ("POWER" LED illuminates green);

    5.  Registered to the network ("NETWORK LTE" LED illuminates green and
        blinks yellow).
3. Click “**Add new system”** and enter the GET’s “*IMEI/Unique ID*” number. This number can be found on the device and the packaging sticker. Click “**Next”**.

<img alt="Protegus2 app 'Scan QR code' screen for adding a system, with the Unique ID/IMEI field and a callout reading: Enter the IMEI code, you can find it here - on the package, on the back of the communicator housing, or in TrikdisConfig as a Unique ID. Below, an example product label highlights the QR code next to the IMEI/ID and SN fields. Buttons: Scan QR code, Cancel, Next." src="./image39.webp" style="width:2.858267716535433in;height:3.704724409448819in" />

4. Enter the system „**Name**”. Click "**Next**".

<img alt="Protegus2 app 'Add new system' screen with the Name field set to GET, a Background colour picker, and Time zone set to Europe/Vilnius. Buttons: Cancel, Next." src="./image40.webp" style="width:2.220472440944882in;height:2.220472440944882in" />

### Additional settings to arm/disarm the system using the control panel’s keyswitch zone 

!!! warning "Important"
    The control panel zone to which the GET output OUT is connected to
    has to be set to keyswitch mode.
Follow the instructions below if the security control panel will be controlled with a GET PGM output, turning on/off the control panel keyswitch zone.

1.  Click „**Continue**“.

<img alt="Protegus2 app screen titled 'The system is not controlled remotely': an illustration of a communicator with NETWORK, DATA, POWER and TROUBLE LEDs and terminals +DC, -DC, CLK, DATA, A485, B485, COM, IN, OUT1, OUT2, beside a puzzled person. Text below: You must connect the output to the security system input terminal and configure Protegus2 Europe to enable or disable your security system. Continue button." src="./image41.webp" style="width:2.220472440944882in;height:3.4803149606299213in" />

2. Enter “**Area name**”. Enable PGM output control using the Protegus2 application.
3. Select “**Pulse**” or “**Level**”, depending on how the keyswitch zone type is configured. If necessary, you can change the "**Pulse**" interval.

2.  Click „**Save**“.

<img alt="Protegus2 app 'Add new area' screen: Area number 1, Area name '1 Area', 'Control with Protegus2 Europe' toggle on, Assigned Output PGM1, Pulse option selected with Pulse interval in seconds set to 3, Level option unselected, Cancel and Save buttons." src="./image42.webp" style="width:2.220472440944882in;height:3.5118110236220472in" />

3. If there is another Area for the security system, then you need to click “**Click to add an area**”. Setting up the PGM output is similar to that described above.

2.  After completing the settings, click the “**Skip**” button.

<img alt="Protegus2 app 'Areas' screen: list showing '1 Area, Controlled with: PGM1' with a remove (X) button, a plus button and 'Click to add an area' text below, and Skip / Next buttons." src="./image43.webp" style="width:2.2244094488188977in;height:2.0078740157480315in" />

### Arming/disarming the alarm system with Protegus2 

1.  In the “System Home Screen” window, click on the “Disarm” status icon.

2.  *Protegus2* will receive a message about a change in the status of the security system and the status icon will change its state.

<img alt="Protegus2 app System Home Screen for GET, showing Online status with signal strength, '1 Area' with Unknown status, Arm and Disarm buttons, and a PGM2 output button." src="./image44.webp" style="width:2.220472440944882in;height:2.661417322834646in" />

## Communicator settings

All GET settings described below can be changed in the Protegus app or in TrikdisConfig. What each setting does is described once; each section shows where to find it in the tool you chose. Names in brackets are the Protegus app's labels where they differ from TrikdisConfig's.

### Connecting to the communicator

=== "Protegus app"

    Open the system in the Protegus app and go to **Settings → Advanced settings** (see [Quick configuration](#quick-configuration)). The top of each screen shows the connected device: **Unique ID** (IMEI), **Serial**, **Firmware** and **Boot** version.

    The settings are grouped in the menu as **System options**, **Panel settings**, **Reporting to CMS**, **User reporting**, **Network settings**, **IN/OUT** and **System events**. After changing settings, tap **Write** to save them to the communicator. **Read** loads the current settings from the communicator again.

    ![Protegus app, Advanced settings menu for GET: device card with Unique ID, serial number, boot and firmware 1.35 versions; Read and Write buttons; menu items System options, Panel settings, Reporting to CMS, User reporting, Network settings, IN/OUT and System events.](./protegus-app/get-menu-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    After connecting the GET communicator and clicking **Read [F4], *TrikdisConfig*** will provide information about the connected device in the status bar:

    <img alt="TrikdisConfig status bar after reading the device: IMEI/Unique ID, Status (reading done), Device (GET_S170), SN, BL, FW, HW, State and access level (Administrator), explained in the table below." src="./image45.webp" style="width:7.086614173228346in;height:0.6062992125984252in" />

    | Object | Description |
    |--------|-------------|
    | IMEI/​Unique ID | Device IMEI number |
    | Status | Operating condition |
    | Device | Device type (GET should be shown) |
    | SN | Device serial number |
    | BL | Bootloader version |
    | FW | Device firmware version |
    | HW | Device hardware version |
    | State | Connection to program type (via USB or remote) |
    | Administrator | Access level (shown after access code is approved) |

    After pressing **Read [F4]**, the program will read and show the settings which are set in the ***GET*.** Set the necessary settings according to the TrikdisConfig window descriptions given below.

### System settings

=== "Protegus app"

    In the Protegus app: **Advanced settings → System options → System general** (account numbers, time set) and **System options → Access** (codes and installer permissions).

    Depending on the firmware and hardware version, **Account No.** and **Device account No.** are either in **System general**, or (firmware 1.31 or later on newer hardware versions) per channel in **Reporting to CMS → CMS settings → Primary channel** (**Primary Account no.**) and in **Reporting to CMS → Settings** (**Device account No.**).

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, System options, System general on GET hardware x1x1 with firmware 1.35: only Time set (First channel); the account numbers are in the CMS settings." src="./protegus-app/get-systemoptions-general-x1x1-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x1</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, System options, System general on GET hardware x1x0: Account No. 561234, Device account No. 0123456789, Time set First channel." src="./protegus-app/get-systemoptions-general-x1x0-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x0</span></span>
    </span>

    ![Protegus app, System options, Access: Administrator code and Installer code (masked), Only an administrator can restore on, and under Allow installer to change: Account number, CMS reporting, User reporting, SIM card and Event summary, all on.](./protegus-app/get-systemoptions-access-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **System settings** window.

    <img alt="TrikdisConfig 'System settings' window. General group: Object ID 561234, Module ID 0123456789, Time set First channel. Access group: Administrator code 123456, Installer code 654321, Only an administrator can restore checked; Allow installer to change: Account number, CMS reporting, User reporting, SIM card and Event summary all checked." src="./image46.webp" style="width:7.086614173228346in;height:2.767716535433071in" />

**“General” settings group**

- **Object ID** (**Account No.**) – if the events will be sent to the CMS (Central Monitoring Station), enter the account number provided by the CMS (6 characters hexadecimal number, 0-9, A-F. **Do not use FFFE, FFFF Object ID**).

- **Module ID** (**Device account No.**) – enter the identification number of the module.

- **Time set** - select which server to use for time synchronization.

**“Access” settings group**

When setting up the communicator GET there are two levels of access for, the administrator and the installer:

- **Administrator code -** allows you to access all configuration fields (default code - 123456).

- **Installer code** - limited access for configuring the communicator (default code - 654321).

- **Only an administrator can restore** - if the box is checked, factory settings can be restored only by entering the administrator code.

- **Allow installer to change** – the administrator can specify which settings can be changed by the installer: **Account number**, **CMS reporting**, **User reporting**, **SIM card** and **Event summary**.

!!! note "Installer access in the Protegus app"
    When the communicator is opened with the installer code, the Protegus app hides **Administrator code** and **Only an administrator can restore**, and shows the settings the administrator did not allow as read-only. In the app, the **SIM card** permission also covers the **LAN** settings.

### Panel settings

=== "Protegus app"

    In the Protegus app: **Advanced settings → Panel settings → TLF** (TIP/RING connection) and **Panel settings → Serial Bus** (keypad or serial bus connection).

    ![Protegus app, Panel settings, TLF: Security panel model 2. AUTO, First HSK tone Dual Tone, Second HSK tone SIA FSK, Use security panel account ID off, Wait acknowledgment from CMS off, Dial tone enabled on, Dial tone frequency 425 Hz.](./protegus-app/get-panel-tlf-phone.webp){ .trik-mob-img }

    ![Protegus app, Panel settings, Serial Bus: Protocol CID, Security panel model 6. PARADOX SP+/MG+, Remote Arm/Disarm on, Event on but greyed out, PC download password (masked).](./protegus-app/get-panel-serial-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **Panel settings** window.

    <img alt="TrikdisConfig 'Panel settings' window. TLC group: Communication protocol 2. AUTO, First HSK tone Dual Tone, Second HSK tone SIA FSK, Use security panel account ID unchecked, Wait acknowledgment from CMS unchecked, Dial tone frequency enabled at 425 Hz. Serial Bus group (greyed out): Event coding protocol CID, Security panel model 1. DISABLED." src="./image47.webp" style="width:7.086614173228346in;height:4.043307086614173in" />

    <img alt="TrikdisConfig 'Panel settings' window. TLC group: Communication protocol 1. DISABLED. Serial Bus group: Event coding protocol CID, Security panel model 6. PARADOX SP+/MG+, Remote Arm/Disarm checked, Event checked, Security panel PC download password 1234." src="./image48.webp" style="width:7.086614173228346in;height:1.952755905511811in" />

**“TLC” settings group**

The communicator is connected to the TIP RING terminals of the telephone communicator of the control panel.

- **Communication protocol** (**Security panel model**) – enable/disable DTMF landline interface on the communicator.

- **First HSK tone / Second HSK tone** – handshake tone of control panel.

- **Use security panel account ID** – if the box is marked with a check mark, the communicator will not send the value set in the "**Object ID**" field, but the object number entered in the control panel.

- **Wait acknowledgment from CMS –** if the box is marked with a check mark, after sending each event message, the communicator will wait for confirmation from the IP receiver that it has successfully received the message. If the communicator does not receive a confirmation signal, it will not generate a “kiss-off” signal. If the communication end signal is not received, the control panel's telephone communicator will repeat the event message.

- **Dial tone frequency** - the frequency at which the communicator communicates with the control panel through the telephone communicator.

    In the Protegus app, the **TLF** screen also has **Dial tone enabled**, which turns the dial tone on or off; **Dial tone frequency** can only be changed while it is on.

**“Serial bus” settings group**

The communicator is connected to the control panel via a Serial Bus.

- **Event coding protocol** (**Protocol**) – select the event reporting protocol (CID or SIA).

- **Security panel model** – select the control panel model that will be connected to the communicator.

- **Remote Arm/Disarm** – when the checkbox is selected, the GET will directly control the control panel remotely. This setting will be visible only for directly controlled panels. For direct control of the control panels you need to change the panel settings, as described in section 4.1 “Programming of control panels when the communicator is connected to the keypad bus or serial bus”.

- **Event** – check the box so that the communicator sends events to the CMS and to Protegus2. In the Protegus app this switch is shown but cannot be changed.

- **Security panel PC download password** (**PC download password**; for Texecom, the UDL passcode) - for the direct control of Paradox and Texecom control panels you need to enter the PC/UDL password. It must match the password that was entered in the control panel. How to change this password is described in section 4.1 “Programming of control panels when the communicator is connected to the keypad bus or serial bus”*.*

### CMS reporting

Events can be sent over several channels of communication. The primary and parallel communication channels can operate simultaneously, this way the communicator can send events to two receivers at the same time. Backup channels can be assigned for both primary and parallel channels, which will be used when the connection via the primary or parallel channel is interrupted.

Communication is encoded and password protected. A TRIKDIS receiver is required for receiving and sending event information to the monitoring programs:

- **For connection over IP** - software receiver IPcom Windows/Linux, hardware IP/SMS receiver RL14 or multichannel receiver RM14.

#### Receiver channels

=== "Protegus app"

    In the Protegus app: **Advanced settings → Reporting to CMS → CMS settings**, then **Primary channel**, **Backup channel** or **Parallel channel** (**Parallel primary channel**, **Parallel backup channel**). Turn on **Enabled** to show the channel's settings.

    ![Protegus app, Reporting to CMS, CMS settings: Primary channel, Backup channel, Parallel channel and Reporting mode.](./protegus-app/get-reporting-cms-phone.webp){ .trik-mob-img }

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, Primary channel on GET hardware x1x1: Enabled on, Primary Account no. 561234, Communication type IP, Domain or IP receiver.example.com, Port 55555, TCP or UDP TCP/IP; Protocol TRK8 with TRK encryption key (masked)." src="./protegus-app/get-reporting-cms-primary-x1x1-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x1</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, Primary channel on GET hardware x1x0: Enabled on, Communication type IP, Domain or IP receiver.example.com, Port 55555, TCP or UDP TCP/IP; Protocol TRK8 with TRK encryption key (masked)." src="./protegus-app/get-reporting-cms-primary-x1x0-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x0</span></span>
    </span>

=== "TrikdisConfig"

    In TrikdisConfig, open the **CMS reporting** window, **CMS settings** tab.

    <img alt="TrikdisConfig 'CMS reporting' window, CMS settings tab. Primary channel: Communication type Disable (Protocol and Domain/IP empty); Primary channel Backup: Disable. Parallel channel: Communication type IP, Protocol TRK8, Encryption key 0123456789ABCDEF, TCP or UDP TCP; Parallel channel Backup: IP, Protocol TRK8, Encryption key 0123456789ABCDEF, TCP or UDP TCP." src="./image49.webp" style="width:7.086614173228346in;height:3.3976377952755907in" />

**“Primary channel” settings group**

- **Communication type** - select the method of communication with the monitoring station receiver (**IP).**

- **Protocol** - select in which coding the events should be sent: **TRK8** (to TRIKDIS receivers), **DC-09_2007** or **DC-09_2012** (to universal receivers), **TL150** (to SUR-GUARD receivers).

- **Encryption key** (**TRK encryption key**; for DC-09 protocols, **Enable encryption key** and **DC-09 encryption key**, with **HEX** for a key in hexadecimal) - 6-digit message encryption key. The key written to the communicator must match the receiver’s key.

- **Domain or IP** - enter the domain or IP address of the receiver.

- **Port** - enter the network port number of the receiver.

- **TCP or UDP** - select in which protocol (TCP or UDP) the events should be sent.

**“Primary channel Backup” settings group**

Enable the backup channel mode to send events via backup channel if connection via primary channel is lost. Backup channel settings are same as described above.

**“Parallel channel” settings group**

Events are transmitted in parallel with the primary channel through this channel. When the second channel is enabled, events can be sent simultaneously to two receivers (e.g., local and centralized monitoring stations). Parallel channel settings are the same as described above.

#### Test, ping and reporting mode

=== "Protegus app"

    In the Protegus app: **Advanced settings → Reporting to CMS → Settings** (test, ping, backup timing, receiver and line numbers) and **Reporting to CMS → CMS settings → Reporting mode** (connection order).

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, Reporting to CMS, Settings on GET hardware x1x1: Enable test on, Test period 24 h 0 min, Enable ping on, IP ping period 3 min 0 s, Backup reporting after 3 attempts, Return from Backup after 1 min 0 s, Device account No. 0123456789, Receiver No. 01, Line No. 1." src="./protegus-app/get-reporting-settings-x1x1-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x1</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus app, Reporting to CMS, Settings on GET hardware x1x0: Enable test on, Test period 24 h 0 min, Enable ping on, IP ping period 3 min 0 s, Backup reporting after 3 attempts, Return from Backup after 1 min 0 s, Receiver No. 01, Line No. 1." src="./protegus-app/get-reporting-settings-x1x0-phone.webp" /><span class="trik-mob-pair__caption">Hardware x1x0</span></span>
    </span>

    ![Protegus app, CMS settings, Reporting mode: Main type LAN, Backup type SIM, Backup type 2 Disabled, Test enabled on, Communication path test 1 day(s) 0 h.](./protegus-app/get-reporting-cms-reportingmode-phone.webp){ .trik-mob-img }

    The app has an on/off switch next to each period: **Enable test** for **Test period**, **Enable ping** for **IP ping period**, and **Test enabled** for **Communication path test**. In **Reporting mode**, the connection types are named **LAN**, **SIM** (SIM1) and **SIM2**.

=== "TrikdisConfig"

    In TrikdisConfig, open the **CMS reporting** window, **Settings** tab.

    <img alt="TrikdisConfig 'CMS reporting' window, Settings tab. Settings group: Test period 24 h 0 min, IP ping period 0 min 30 s, Backup reporting after 2 fails, Return from Backup after 1 min 30 s, Line No. 1, Receiver No. 1. Reporting mode group: Main type LAN, Backup type SIM1, Backup type 2 Disable, Communication path test Disabled." src="./image50.webp" style="width:7.086614173228346in;height:2.562992125984252in" />

**“Settings” settings group**

- **Test period** - TEST event period for testing the connection. Test events are sent as Contact ID messages and forwarded to the monitoring software.

- **IP ping period** – period for sending internal PING heartbeats. These messages are only sent via IP channel. The receiver will not forward PING messages to the monitoring software to avoid overloading it. Notifications will only be sent to the monitoring software if the receiver fails to receive PING messages from the device within the set time.

  By default, the “*Connection lost”* notification will be transmitted to the monitoring software if the PING message is not received by the receiver over a time period three times longer than set in the device. E.g. if the PING period is set for 3 minutes, the receiver will transfer the *“Connection lost”* notification if a PING message is not received within 9 minutes.

  PING messages keep the active communication session between the device and the receiver. An active session is required for remote connection, control and configuration of the device. We recommend setting the PING period for no more than 5 minutes.

- **Backup reporting after** - indicates the number of unsuccessful attempts to send the message via “**Primary**” channel. If device fails to transmit specified number of times, the device will connect to transmit the messages via “**Backup**” channel.

- **Return from backup after** - time after which the communicator GET will attempt to reconnect and transmit messages via the Primary channel.

- **Line No.** - enter line number of the receiver.

- **Receiver No.** - enter the receiver number.

**“Reporting mode” settings group**

For setting parameters on how the control panel will communicate with the CMS channels and with Protegus2. The connection types are specified in order. If the control panel fails to connect using the “**Main type”** connection , it switches to the “**Backup type”**, and so on. If the backup connection type was successful in transmitting the message to the CMS, then the “**Return to main”** connection type will be attempted after the specified time interval.

- **Main type** – select a connection type (LAN, SIM1, SIM2) with the CMS receiver and Protegus2.

- **Backup type** – select a connection type (LAN, SIM1, SIM2) with the CMS receiver and Protegus2.

- **Backup type 2** – select a connection type (LAN, SIM1, SIM2) with the CMS receiver and Protegus2.

- **Communication path test** – specify the time period for which the selected connection types should be tested (LAN, SIM1, SIM2).

<span id="_Ref526770803"></span>

### User reporting

Protegus2 service allows users to remotely monitor and control the communicator. For more information about Protegus2 service, visit [www.protegus.eu](http://www.protegus.eu).

=== "Protegus app"

    In the Protegus app: **Advanced settings → User reporting → Cloud**.

    ![Protegus app, User reporting, Cloud: Enabled on, Parallel reporting off, Cloud access code (masked).](./protegus-app/get-userreporting-cloud-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **User reporting** window, **PROTEGUS cloud** tab.

    <img alt="TrikdisConfig 'User reporting' window, PROTEGUS Cloud tab: Enable connection checked, PROTEGUS Cloud access Code 123456, Parallel reporting unchecked." src="./image51.webp" style="width:7.086614173228346in;height:1.9448818897637796in" />

**“Protegus Cloud” settings group**

- **Enable connection** (**Enabled**) – enable the Protegus2 service, the GET communicator will be able to exchange data with Protegus2 app and to be remotely configured via ***TrikdisConfig*.**

- **Protegus Cloud access Code** (**Cloud access code**) - 6-digit code for connecting to the Protegus2 app (default - 123456).

- **Parallel reporting** (shown in the app when the firmware supports it) – allow parallel report sending using the *primary channel* and to Protegus2. Reports will only be sent to Protegus2 and to users after they’ve been sent to the security company.

### Network settings

#### LAN

**These settings must be made if the communicator is connected to a LAN network.**

=== "Protegus app"

    In the Protegus app: **Advanced settings → Network settings → LAN**. **Static IP**, **Subnet mask**, **Default gateway**, **DNS1** and **DNS2** can only be changed while **Use DHCP** is off.

    ![Protegus app, Network settings, LAN (Ethernet screen): Use DHCP on; Static IP 192.168.1.100, Subnet mask 255.255.255.0, Default gateway 192.168.1.1, DNS1 8.8.8.8 and DNS2 8.8.4.4 greyed out.](./protegus-app/get-network-lan-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **Network settings** window, **LAN** tab.

    <img alt="TrikdisConfig 'Network settings' window, LAN tab, Ethernet settings: Use DHCP checked, Static IP 0.0.0.0, Subnet mask 255.255.255.0, Default gateway 0.0.0.0, DNS 1 8.8.8.8, DNS 2 8.8.4.4." src="./image52.webp" style="width:7.086614173228346in;height:2.3188976377952755in" />

**“Ethernet settings” settings group**

- **Use DHCP** - check the box to have the communicator automatically register to the network. If the auto-register fails, you will need to enter it manually:
- **Static IP** – static IP address for when manual registering mode is set.

- **Subnet mask** – subnet mask for when manual registering mode is set.

- **Default gateway** – gateway address for when manual registering mode is set.
- **DNS1, DNS2** - (Domain Name System) identifies the server that specifies the IP address of the domain. Used when domain is set in the communication channel “**Domain or IP”** field (not IP address). Google DNS server is set by default. **Regardless of IP settings, make sure the DNS addresses match those supported by your ISP.**

#### SIM1 and SIM2

**These settings must be made for each SIM card inserted into the communicator.** The SIM1 and SIM2 slots have the same settings.

!!! warning "Important"
    1\. Ensure that the SIM card is activated and working before using
    it. / 2. Ensure that mobile data service is enabled.

=== "Protegus app"

    In the Protegus app: **Advanced settings → Network settings → SIM** (SIM1) or **SIM2**.

    ![Protegus app, Network settings, SIM (SIM card screen): SIM card PIN, APN internet, Login, Password, SIM ICCID, DNS1, DNS2, and Forbid connection when roaming detected off.](./protegus-app/get-network-sim-phone.webp){ .trik-mob-img }

    The Protegus app has no **Preferred operator** field; this screen has a **Forbid connection when roaming detected** switch instead.

=== "TrikdisConfig"

    In TrikdisConfig, open the **Network settings** window, **SIM1** or **SIM2** tab.

    <img alt="TrikdisConfig 'Network settings' window, SIM1 tab, SIM card group: SIM card PIN 1111, APN internet; Login, Password, SIM ICCID, DNS 1, DNS 2 and Preferred operator left blank." src="./image53.webp" style="width:7.086614173228346in;height:2.877952755905512in" />

    <img alt="TrikdisConfig 'Network settings' window, SIM2 tab, SIM card group: SIM card PIN 1111, APN internet; Login, Password, SIM ICCID, DNS 1, DNS 2 and Preferred operator left blank." src="./image54.webp" style="width:7.086614173228346in;height:2.874015748031496in" />

**“SIM card” settings group**

- **SIM card PIN** - enter the SIM card PIN code. This code can be disabled by inserting the SIM card into a mobile phone and disabling the request. If you disabled the SIM card PIN request, leave the default value in this field.

- **APN** - enter APN (Access Point Name). It is required for connecting the communicator to the internet. APN can be found on the website of the SIM card operator (“internet” is universal and works in the networks of many operators).

- **Login, Password** - if required, enter the user name (login) and password for connection to the internet.

- **SIM ICCID** - enter the ICCID number of the SIM card if you want the communicator to work only with this SIM card.

- **DNS1, DNS2** - (Domain Name System) identifies the server that specifies the IP address of the domain. Used when domain is set in the communication channel Domain or IP field (not IP address). Google DNS server is set by default. **Regardless of IP settings, make sure the DNS addresses match those supported by your ISP.**
- **Preferred operator** – after entering the mobile network operator code, the communicator will connect only to the network of the selected operator. The mobile operator code consists of MCC and MNS codes. *Only in TrikdisConfig.*

### IN/OUT

The communicator has 2 universal (input / output) terminals. The table can set the terminal operating mode (Disabled, IN, OUT). The input must specify the type of circuit to be connected NC, NO, NO / EOL, NC / EOL, NO / DEOL, NC / DEOL.

Additional sensors can be connected to the communicator inputs. When the sensor is triggered, the communicator will send an event message. The input is assigned a Contact ID (SIA) code, which will be sent to CMS and Protegus2.

=== "Protegus app"

    In the Protegus app: **Advanced settings → IN/OUT**, then select terminal **1** or **2**. Set **Function** (**Disabled**, **IN**, **OUT**) and, for an input, **Type**. The **Alarm** and **Tamper** sections hold the event and restore messages sent when the input is triggered.

    ![Protegus app, IN/OUT, terminal 1: Function IN, Type NO; Alarm event: Enabled on, Classificator Event, CID code 130, Sia code BA, Partition number 99, Zone number 001. The screen continues with the alarm restore and the tamper event and restore.](./protegus-app/get-inout-terminal-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **IN/OUT** window.

    <img alt="TrikdisConfig 'IN/OUT' window. Terminal table: Terminal 1 Function IN Type NO, Terminal 2 Function OUT. Event table: IN1_ALARM enabled, Event CID 130 SIA BA Part 99 Zone 001, Restore CID 130 SIA BH Part 99 Zone 001; IN1_TAMPER enabled, Event CID 144 SIA TA Part 99 Zone 001, Restore CID 144 SIA TR Part 99 Zone 001." src="./image55.webp" style="width:7.086614173228346in;height:2.4488188976377954in" />

- **Enable** (**Enabled**) – checked event fields where messages will be sent to CMS and Protegus2.

- **E/R** (**Classificator**) – choose what type of event will be sent when input is triggered – “**Event”** or “**Restore”**.

- **CID** (**CID code**) – enter the event code or leave the default value. Upon entering the event, the event code will be sent to Protegus2 and CMS.

- **SIA** (**Sia code**, shown when a SIA protocol is used) – enter the event code or leave the default value. Upon entering the event, the event code will be sent to Protegus2 and CMS.

- **Part.** (**Partition number**) – enter the partition (area) number that will be sent when an internal event occurs and the system is restored.

- **Zone** (**Zone number**) - enter the zone number that will be sent when an internal event occurs and the system is restored.

### Event summary

Here you can enable, disable and modify internal messages sent by your device. Disabling an internal message here will prevent it from being sent regardless of other settings.

=== "Protegus app"

    In the Protegus app: **Advanced settings → System events**. Events are listed under **Event** and **Restore**; select one to change it.

    ![Protegus app, System events. Event list, all enabled: COMMUNICATION E350, LAN_FAILURE E358, POWER E302, REMOTE_FINISHED E412, REMOTE_STARTED E411, SIM1_FAILURE E358, SIM2_FAILURE E358, TEST E602. Restore list: COMMUNICATION R350, LAN_FAILURE R358, POWER R302, SIM1_FAILURE R358, SIM2_FAILURE R358.](./protegus-app/get-events-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    In TrikdisConfig, open the **Event summary** window.

    <img alt="TrikdisConfig 'Event summary' window listing default Contact ID/SIA event and restore codes (Partition 99): COMMUNICATION event 350 YC / restore 350 YK, zone 999; LAN_FAILURE event 358 YC / restore 358 YK, zone 903; POWER event 302 YT / restore 302 YR, zone 999; REMOTE_FINISHED event 412 RS, zone 999, no restore; REMOTE_STARTED event 411 RB, zone 999, no restore; SIM1_FAILURE event 358 YC / restore 358 YK, zone 901; SIM2_FAILURE event 358 YC / restore 358 YK, zone 905; TEST event 602 RP, zone 999, no restore." src="./image56.webp" style="width:7.086614173228346in;height:2.1338582677165356in" />

- **COMMUNICATION** – message about connection error between the control panel and communicator.

- **LAN_FAILURE** - LAN communication failure message.

- **POWER** – message about low power supply voltage.

- **REMOTE_FINISHED** – message about disconnection from remote configuration with TrikdisConfig.

- **REMOTE_STARTED** – message about remote connection to configure GET with TrikdisConfig.

- **SIM1_FAILURE** - mobile communication failure message.

- **SIM2_FAILURE** - mobile communication failure message.

- **TEST** – periodic test message.

!!! note
    To enable periodic TEST messages and set their period, see **Test period** in [Test, ping and reporting mode](#test-ping-and-reporting-mode).
- **Enable** (**Enabled**) – when selected, the sending of messages is enabled.

You can change the Contact ID (SIA) code for each event, and also the zone and partition number.

### Restoring factory settings

The Protegus app cannot restore factory settings. Use TrikdisConfig or the RESET button.

To restore the communicator's factory settings, you need to click the “**Restore”** button in the TrikdisConfig window.

<img alt="TrikdisConfig window with the Restore button highlighted in the Default settings group, used to restore factory settings." src="./image57.webp" style="width:7.086614173228346in;height:0.9645669291338582in" />

Another way to restore factory settings.

Power supply is connected to the communicator. Press and hold the “RESET” button on the communicator PCB board. Hold the “RESET” button pressed for 10 seconds until the LED indicators ("NETWORK", "POWER", "TROUBLE") turn off and the LED "POWER" indicator lights up. Release the "RESET" button. The communicator's factory settings have been restored.

## Remote configuration 

!!! warning "Important"
    Remote configuration will work only if:

    1.  The inserted SIM card is activated and the PIN code is either
        entered or disabled;

    2.  Or a LAN cable is connected.

    3.  "Protegus cloud" is enabled. How to enable cloud is
        described in section 6.5 "User reporting" window;

    4.  Power supply is connected ("POWER" LED illuminates green);

    5.  Registered to the cellular network ("NETWORK LTE" LED illuminates
        green and blinks yellow).
1.  Start the configuration program TrikdisConfig.

2.  In the “**Remote access”** section enter the communicator’s “**IMEI/Unique ID”** number. This number can be found on the device and the packaging sticker.

<img alt="TrikdisConfig main window, Open (F8) tab active. USB configuration group with a Configuration program dropdown and OK button. Remote access group below, with the Unique ID field and the Configure button both highlighted, next to a System Name field and a Control button." src="./image58.webp" style="width:7.086614173228346in;height:2.8346456692913384in" />

3. (Optional) in the “**System name”** field, enter the desired name for the communicator with this Unique ID.

2.  Press “**Configure”**.

3.  In the newly opened window click **Read [F4]**. If required, enter the administrator or installer code*.* To save the password, select **“Remember password”**.

4.  Set the necessary settings and when finished, click **Write [F5]**.

## Test communicator performance 

When the configuration and installation is complete, perform a system check:

1.  Generate an event:

- by arming/disarming the system with the control panel’s keypad;

- by triggering a zone alarm when the security system is armed.

1.  Make sure that the event arrives to the CMS (Central Monitoring Station) and/or is received in the Protegus2 application.

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

3.  Select the menu branch “**Firmware”**.

<img alt="TrikdisConfig 'Firmware' window with an Open field and Open firmware button to select a firmware file, an Update (F12) button, and a 0% progress bar." src="./image59.webp" style="width:7.086614173228346in;height:2.543307086614173in" />

4. Press “**Open firmware”** and select the required firmware file.

2.  Press **Update [F12]**.

3.  Wait for the update to complete.

## Safety requirements

The communicator should be installed and maintained by qualified personnel.

Prior to installation, please read this manual carefully in order to avoid mistakes that can lead to malfunction or even damage to the equipment.

Disconnect the power supply before making any electrical connections.

Changes, modifications or repairs not authorized by the manufacturer shall void your rights under the warranty.

<img alt="Crossed-out wheeled bin symbol (WEEE), indicating the device must be disposed of separately from household waste." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Please act according to your local rules and do not dispose of your unusable alarm system or its components with other household waste.

## Annex

The communicator converts Contact ID codes received from the alarm control panel into SIA codes.

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
| Call back request made by CMS | E411 | "RB" |
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
| No more system failure (143) | R143 | "ER" |
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
| No more system failure (300) | R300 | "YQ" |
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
