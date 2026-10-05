# iO-LORA Wireless Expander

<div style="text-align: center;">
  <img src="./image3.webp" alt="Front of the TRIKDIS iO-LORA wireless expander, showing NETWORK, OUTPUT and POWER indicators. The case prints a 9-26 V, 0.1 A Max rating and terminal labels +DC, -DC, D0, D1, +5V, 1 Wire/OUT wgd, COM, IN1, NC, C and NO." width="200">
</div>

## Description 

iO-LORA wireless expanders with RF-LORA transceiver increase the number of inputs and outputs of the "FLEXi" SP3 control panel using two-way RF communication.


Compatible with the [SP3](../../control-panels/sp3/index.md) security control panel, [GATOR Cellular](../../gate-controllers/gator/index.md) and [GATOR WiFi](../../gate-controllers/gator-wifi/index.md) gate & door access controllers.
Temperature sensor (1 pcs.) and readers of contact ("iButton") keys can be connected to the iO-LORA expander. The PGM output (relay) of the expander can be remotely controlled (on/off) by various electrical devices. iO-LORA has one digital input.

### Features

**Communication:**

- Line-of-sight wireless range up to 5000 m.

- Up to 8 *iO-LORA* wireless expanders can be connected to the *"FLEXi" SP3* control panel.

- Products from HW iO-LO_x30x_7_230418 version come with a standard antenna suitable for most applications. <u>In cases where it is necessary to provide high-quality communication at the maximum possible distance, an antenna (AX-ANT-KIT – 433 MHz, AX-ANT01S SF – 868 MHz) with a higher radio signal gain should be used</u>.

**Inputs and outputs:**

- Bus "1-Wire" is intended for connection of temperature sensor (1 pcs.) and readers of contact ("iButton") keys.
- 1 input, of selectable type: NC, NO.

- 1 output (relay).

Connection:
- The iO-LORA wireless expander is connected to the "FLEXi" SP3 control panel via the RF-LORA transceiver.

### Specifications 

| Parameter | Description |
|----|----|
| Transmission frequency | 4F modification: 433,3 - 434,7 MHz /​ 8F modification: 867 - 869 MHz |
| Modulation type | LORA |
| Power supply voltage | 9-26 V DC |
| Current consumption | Up to 50 mA (stand-by) /​ Up to 100 mA (short-term, while sending) |
| Report encryption | Yes |
| Range in open space | Up to 5000 m |
| Input | 1, selectable type: NC, NO |
| Output | 1, relay, 250 V AC, 4 A |
| Temperature sensor | 1, Maxim®/​Dallas® DS18S20, DS18B20 |
| Operating environment | Temperature from –20 °C to +50 °C, relative humidity – up to 80% at +20 °C |
| Dimensions | 62 x 77 x 25 mm |
| Weight | 80 g |

### Expander elements 

<img alt="Two photos of the iO-LORA expander, closed on the left and with its PCB exposed on the right. Callouts: 1, NETWORK indicator on the left; 2, side opening on the left; 3, terminal blocks on the right; 4, SW2 push button on the right; 5, SW1 DIP switch on the right." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 600px; height: auto;" />

!!! note "DIP switch 'SW1' settings"
    For product HW iO-LO_x30x_7_230418 version:

    1. Radio frequency (`OFF` - RF1; `ON` - RF2). Intended for changing the radio channel if the current channel is heavily loaded.
    2. Modulation type (`OFF` - fast; `ON` - slow). The `ON` position allows you to increase the communication distance by about 2 times (depending on the environmental conditions). But if a quality connection is ensured using the `OFF` position, it is recommended to use it. In the `ON` position, system performance decreases.

    **NOTE:** In iO-LORA and RF-LORA devices, the positions of the `SW1` switch must match! Otherwise, the radio communication will not work!

### Purpose of terminals 

| Terminal        | Description                                               |
|-----------------|-----------------------------------------------------------|
| +DC             | Power terminal (9-26 V DC positive)                       |
| -DC             | Power terminal (9-26 V DC negative)                       |
| D0              | Not used                                                  |
| D1              | Not used                                                  |
| +5V             | Positive 5 V power terminal for "**1-Wire**" devices      |
| 1Wire /​ OUT wgd | "**1-Wire**" data bus terminal („**OUT wgd**“ – not used) |
| COM             | Common negative terminal                                  |
| IN1             | 1 input, of selectable type NO, NC (factory setting: NO)  |
| NC              | Relay terminal NC                                         |
| C               | Relay terminal C                                          |
| NO              | Relay terminal NO                                         |

### LED indication of operation 

| Indicator | Light status | Description |
|-----------|--------------|-------------|
| NETWORK | Off | No RF signal |
| NETWORK | Green blinking | RF signal level from 0 to 10. Sufficient strength is 4. |
| OUTPUT/KEY | Green solid | Relay output activated |
| OUTPUT/KEY | Yellow solid | Dallas contact key activated |
| POWER | Off | No supply voltage |
| POWER | Green blinking | Normal supply voltage level |
| POWER | Yellow blinking | Low supply voltage level (≤11.5 V) |

## Wiring schematics 

### Fastening 

1.  Remove the top lid.

<img alt="Two drawings showing how to remove the iO-LORA top lid. Left: insert a screwdriver into the slot at the top edge. Right: press the screwdriver handle downward to release the lid." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 750px; height: auto;" />

2.  Remove the PCB board.

3.  Fasten the base of the case in the desired place using screws.

4.  Reinsert the board.

5.  Close the top lid.

<img alt="Drawing of the iO-LORA case: the right view shows the base and its mounting holes; the left view shows the PCB at the case edge, with a circled retaining point and an arrow pointing outward." src="./image6.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

### Schematic for connecting the power supply 

<img alt="Wiring diagram: power supply to iO-LORA. Power supply: +12V to +DC, 0V to -DC; the supply is labelled +12 V." src="./image7.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### Schematic for connecting input 

iO-LORA has one input. Input type can be set: NC, NO.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Normally open (NO) input circuit: the open NO contact is between IN and COM." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Normally closed (NC) input circuit: the closed NC contact is between IN and COM." style="width: 100%; height: auto;" />
  </figure>
</div>

### Schematic for connecting a temperature sensor 

Temperature sensors should be connected according to the given schematic. Maxim®/Dallas® DS18S20, DS18B20 temperature sensor (1 pcs.) can be connected to the *iO-LORA* wireless expander. If a wire longer than 0,5 meters is used to connect a temperature sensor, we recommend using twisted pair cable (UTP4x2x0,5 or STP4x2x0,5). The „+5V” terminal on the board is for supplying devices connected to the "1-Wire" data bus with 5 V DC voltage.

<img alt="Wiring diagram: iO-LORA to DS18B20 temperature sensor. Red wire: +5V to +Vdd. Yellow wire: 1 Wire to DQ. Black wire: C to GND." src="./image10.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

The maximum output current is 0,2 A. The output is protected from overload. If the maximum allowed current is exceeded, the power will automatically be switched off. The "FLEXi" SP3 control panel automatically recognizes and links connected temperature sensor.

### Schematics for connecting CZ-Dallas reader 

The **CZ-Dallas** iButton key reader connects to the iO-LORA using the "**1 Wire**" data bus. The length of the wires connecting to the data bus can be up to 30 m.

<img alt="Wiring diagram: iO-LORA to CZ-Dallas reader. Power supply: 12-26V + to +DC, - to -DC. Reader: white wire from 1-Wire to reader; gray wire from COM to reader, joined to yellow LED- wire. C joins +DC; NO feeds RED LED+ through a 1k resistor and NC feeds Green LED+ through a 1k resistor. The green and brown LED wires are labelled. 1-Wire connection up to 30 m. Set xOUT to 'System State': alarm on shows red, alarm off shows green." src="./image11.webp" style="display: block; margin: 1rem auto; max-width: 750px; height: auto;" />

### Schematics for connecting iO-LORA modules 

<img alt="Wiring diagram: SP3 to RF-LORA, then wirelessly to iO-LORA modules 1 through 8, up to 5000 m. SP3 AUX+ (+12 V) to RF-LORA +DC, AUX- to -DC, 485 A to A RS 485, 485 B to B RS485. Module 1: 12-26V to +DC and -DC; +5V, 1-Wire and COM to temperature sensor Vdd+, DQ and GND (DS18B20 or DS18S20). Module 8: 12-26V to +DC and -DC; 1-Wire to CZ-Dallas reader white wire, COM to gray and yellow LED- wires; C joins +DC, NO feeds RED LED+ through 1k, and NC feeds Green LED+ through 1k. Reader 1-Wire connection up to 30 m; set xOUT to 'System State' for red when alarm is on and green when off." src="./image12.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

!!! note
    An RF-LORA transceiver must be connected to the "FLEXi"
    SP3 control panel and then up to 8 pcs. can be connected
    iO-LORA wireless expanders. It is recommended to use a twisted
    pair cable (UTP4x2x0.5 or STP4x2x0.5) to connect the temperature
    sensor. **CZ-Dallas** iButton key readers and temperature sensor must
    be connected to the "**1-Wire**" bus.

## Security control panel “FLEXi” SP3

1.  An RF-LORA transceiver must be connected to the "FLEXi" SP3 control panel.

2.  Turn on the power supply of the "FLEXi" SP3 control panel.

3.  Turn on the power supply to the iO-LORA wireless expander.

4.  Launch ***TrikdisConfig**.*

5.  Connect the "FLEXi" SP3 to a computer using a USB Mini-B cable or connect to the "FLEXi" SP3 remotely.

6.  Click the button **Read [F4]** for the program to read the parameters currently set for the "FLEXi" SP3 control panel. If a window for entering the Administrator code opens, enter the six-symbol administrator code.

7.  In the "**Modules**" list, select "**iO-LORA expander**".

8.  In the "**Serial No.**" field, enter the serial number of the module iO-LORA.

<img alt="TrikdisConfig SP3, Modules window, RS485 modules tab. Row ID 1 has Module set to iO-LORA expander, a filled Serial No. field, Area 1 and Name Expander ID1." src="./image13.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  In the "**Zones**" tab, make settings for the expander's input.

<img alt="TrikdisConfig SP3, Zones window, Zones settings tab. The Input dropdown lists RS485 Expander ID1, IN1 for assigning the expander input to a zone; the table also shows Area, Definition, Type and reporting settings." src="./image14.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. In the "**PGM**" tab, configure the expander's PGM output.

<img alt="TrikdisConfig SP3, PGM window, Outputs tab. PGM 2 has PGM output set to RS485 Expander ID1, OUT1, Output definition set to Remote Control and Pulse Time set to 10 s." src="./image15.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. Temperature sensors will be included in the "**Sensors**" list if a temperature sensor is connected to the iO-LORA expander.

<img alt="TrikdisConfig SP3, Sensors window. Sensor ID 1 has Module type RS485 Expander ID1 and fields for Serial No., Sensor name, Max, Min, High, Low and Delay, min; the example shows Max 30, Min 20, High and Low checked, and Delay 0." src="./image16.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

12. Once configuration is complete, click the **Write [F5]** button.

13. Wait for the updates to finish.

14. Click the "**Disconnect**" button and disconnect the USB cable.

## Safety precautions 

The iO-LORA wireless expander should only be installed and maintained by qualified personnel.

Please read this manual carefully prior to installation in order to avoid mistakes that can lead to malfunction or even damage to the equipment.

Always disconnect the power supply before making any electrical connections.

Any changes, modifications or repairs not authorized by the manufacturer shall render the warranty void.

<img alt="Crossed-out wheeled trash bin symbol indicating the product must not be disposed of with household waste." src="./image2.webp" style="display: inline; height: 1.2em; vertical-align: middle;" />Please adhere to your local waste sorting regulations and do not dispose of this equipment or its components with other household waste.
