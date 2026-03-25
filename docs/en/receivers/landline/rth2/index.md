# RTH2 Telephone Line Receiver

<div style="text-align: center;">
  <img src="./image1.png" alt="" width="400">
</div>

## Content

## About telephone line receiver

**Telephone line Receiver RTH2** receives event reports from security control panel’s telephone communicator. Received events are processed and transferred to the monitoring software.

**Note:** We configure the receiver with preset settings on client’s request.

## Technical parameters

|                         |                                                |
|-------------------------|------------------------------------------------|
| Name                    | Description                                    |
| Communication channel   | telephone lines- tonal or pulse                |
| Receiving formats       | contact ID, SIA, Ademco Express 4+2 and others |
| Primary power supply    | 100 – 240 V (50 /​ 60 Hz) AC network            |
| RS232 data output ports | 1 x DB9                                        |
| Operating temperature   | From 0°C, to +55°C                             |
| Dimensions              | 225 x 235 x 115 mm                             |
| Weight                  | 1.21kg, with cables                            |

### Report receiving technology

| Name | Description |
|:---|----|
| 1\. SIA Protocol format | Standard SIA DC-03-1990.01 |
| 2\. Contact ID | Standard SIA DC-05-1999.09 |
| 3\. Ademco Express 4+2 formats | Standard SIA DC-05-1999.09, 4+2 format with checksum – 4 digit account code, 2 digit event code, 1 digit checksum |
| 4\. Pulse protocols 3/​1, 4/​1, 4/​2, which use 2300 Hz HSK signals | Operating at the speed of 10... 40 bauds and by using 2300 Hz HSK and kissoff signals |
| 5\. Pulse protocols 3/​1, 4/​1, 4/​2, which use 1400 Hz HSK signals | Operating at the speed of 10... 40 bauds and by using 1400 Hz HSK and kissoff signals |

**Note:** *SPROG-1 or UP2* cables for receiver programming are not included.

|                              |       |
|:-----------------------------|:------|
| Receiver                     | 1 pc. |
| 1.5 m power supply cable     | 1 pc. |
| 1.8 m RS232 Null Modem cable | 1 pc. |

## Power supply

The receiver is powered with the alternating current (AC) source. To ensure an uninterrupted operation the receiver should be connected to a 12 V, 7Ah battery, providing backup power supply for 12 hours.

**1**

**4**

**3**

**2**

**7**

**5**

**6**

| 1\. | Light indication | 6\. | Backup battery connection |
|:---|:---|:---|:---|
| 2\. | RESET button of the device | 7\. | AC cable connector and turn on/off button |
| 3\. | Earth connection |  |  |
| 4\. | Connector telephone line input |  |  |
| 5\. | RS232 data output port |  |  |

### Light indication

| LED indicator | Operation | Value |
|---------------|-----------|-------|
| “LINE” yellow / Telephone line operation | Off | Telephone line not connected or not available |
| “HOOK” red Headset lift | Lights up | Handset is lifted |
| “DATA” yellow / Data reception | Flashing yellow | During data reception from a peripheral device |
| “WDG” green / Power supply status | Flashes in short periods | Power supply voltage during standby and operation |
|  |  |  |

##  System installation

### Equipment installation steps

**Note:** 1) *SPROG-1 or UP2* cables for receiver programming are not included with the receiver.

> 2\) To set the parameters you need to install GProg2 software. To download GProg2 installation file go to [http://www.trikdis.com/](http://www.trikdis.com/%20)

1.  Connect receiver to computer using RS232 cable to forward events to the monitoring software.

2.  Set up your monitoring software to display receiver messages. Please follow instructions in your monitoring software documentation.

3.  Connect AC power supply cable.

4.  Turn on the receiver. Receiver is working properly when LED named “*WDG” is* flashing.

5.  Press RESET button.

6.  Check if your monitoring software are displaying messages from RTH2 receiver.

**Note:** The integrated receiving module generates service messages, indicated in annex A.

<table>
<tbody>
<tr>
<td><h2 id="setting-of-exploitation-parameters">Setting of exploitation parameters </h2>
<h3 id="exploitation-parameters-of-the-receiver">Exploitation parameters of the receiver</h3></td>
</tr>
<tr>
<td>Title</td>
<td>Permissible range</td>
<td>Set value</td>
</tr>
<tr>
<td>Number of rings until handset of the module will be lifted</td>
<td>1 - 8</td>
<td>2</td>
</tr>
<tr>
<td>Telephonic line control on/off</td>
<td>enable / disable</td>
<td>enable</td>
</tr>
<tr>
<td>Time from handset lift till start of HSK signal</td>
<td>500 ms – 4000 ms</td>
<td>2000</td>
</tr>
<tr>
<td>Duration Kissoff (and confirmation) signals</td>
<td>500 ms – 8000 ms</td>
<td>900</td>
</tr>
<tr>
<td>Time period between HSK signals</td>
<td>1 s – 16 s</td>
<td>4</td>
</tr>
<tr>
<td>Permissible duration of message reception</td>
<td>2 s – 16 s</td>
<td>2</td>
</tr>
<tr>
<td>SIA HSK duration</td>
<td>500 ms – 2000 ms</td>
<td>900</td>
</tr>
<tr>
<td>Common time limit for a single communication session</td>
<td>15 s – 255 s</td>
<td>60 s</td>
</tr>
<tr>
<td>Output protocol</td>
<td>Surgard or Radionics D6600</td>
<td>Surgard</td>
</tr>
<tr>
<td>Time limit for reception of SIA blocks</td>
<td>1 – 32 s</td>
<td>8 s</td>
</tr>
<tr>
<td>HSK order (priority of reception protocols)</td>
<td>SIA FSK HSK<br>Dual tone HSK (1400+2300 Hz)<br>3/1, 4/1, 4/2<br>3/1, 4/1, 4/2</td>
<td>SIA FSK HSK<br>Dual tone HSK (1400+2300 Hz)<br>2300 Hz<br>1400 Hz</td>
</tr>
</tbody>
</table>

### Setting RTH2 exploitation parameters with GProg2

**Note:** The software GProg2 should be installed into PC, operating OS MS *Windows* 2000/XP/Vista/Win 7.

#### Connecting to computer

1.  Open the RTH2 housing and take out the module (do not forget to disconnect backup battery).

2.  Connect the module to power supply.

3.  Connect the module to a computer with *SPROG-1* or *UP2* programmer.

#### Installing USB driver

USB drivers must be installed on the computer. When the module connects to a computer for the first time, MS Windows OS should open the window *Found New Hardware Wizard* for installing USB drivers.

1.  Download the USB driver file *\*.inf* for MS Windows OS from the website www.trikdis.lt.

2.  In the wizard window select the function [*Yes, this time only*] and press the button [*Next*].

3.  When the window *Please choose your search and installation options* opens, press the button [*Browse*] and select the place where the file *\*.inf* was saved.

4.  Follow the remaining wizard instructions to finish the USB driver installation.

#### Starting GProg2

1.  Start program by clicking GProg2 icon<img alt="" src="./image4.png" style="width:0.22916666666666666in;height:0.22916666666666666in" />, then in Settings window specify serial port (e.g.: COM3).

2.  <img alt="" src="./image5.wmf" style="width:0.18125in;height:0.21875in" />In menu bar choose command [*Devices*] and select RT2.

3.  Press the icon in toolbar to connect receiver.

4.  <img alt="" src="./image6.wmf" style="width:0.22916666666666666in;height:0.21875in" />To read the operational parameters stored in the internal memory of device, press the button.

Menu bar

Toolbar

Settings

#### Toolbar icons description 

**[Open]** – icon for opening saved file with extension “.tcfg”

<img alt="" src="./image9.wmf" style="width:0.23958333333333334in;height:0.21875in" />

**[Save]** – icon for saving established parameters file with extension “.tcfg”

<img alt="" src="./image10.png" style="width:0.22916666666666666in;height:0.22916666666666666in" />

**[Connect]** – icon for connecting to serial port

<img alt="" src="./image5.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Disconnect]** – icon for disconnecting from serial port

<img alt="" src="./image11.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Receive config]** – icon for reading parameters of the device

<img alt="" src="./image6.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Send config]** – icon for writing the new parameters into device memory

<img alt="" src="./image12.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Generate configuration report]** – icon for printing established parameters report

<img alt="" src="./image13.jpeg" style="width:0.22916666666666666in;height:0.21875in" />

#### Setting parameters

1.  In branch Main window set Surgard protocol.

2.  If necessary, you can change parameters in branch Communication settings, the recommended values are shown in **7.1 Exploitation parameters of the receiver**.

3.  <img alt="" src="./image14.jpeg" style="width:0.1701388888888889in;height:0.20833333333333334in" />To save parameters go to [*File/Write device*] in menu bar or press icon

4.  To save set parameters in your computer, go to [*File/Save as*]. File name, place to save may be selected freely. It can be used later as a template to configure other modules.

Main window

Communication settings

<table>
<colgroup>
<col style="width: 0%" />
<col style="width: 0%" />
<col style="width: 0%" />
</colgroup>
<tbody>
<tr>
<td colspan="3"><h2 id="a-annex"><strong>A Annex</strong> </h2>
<p><strong>Service messages of telephonic communication receiver</strong></p>
<p><img alt="" src="./image17.png" style="width:3.741739938757655in;height:2.8125in" /></p></td>
</tr>

<tr>
<td style="text-align: center;"><strong>Message</strong></td>
<td style="text-align: center;"><strong>Code</strong></td>
<td style="text-align: center;"><strong>Description</strong></td>
</tr>
<tr>
<td>COM TROUBLE</td>
<td style="text-align: center;">05</td>
<td>communication failure between the device and concentrator</td>
</tr>
<tr>
<td>COM RESTORE</td>
<td style="text-align: center;">06</td>
<td>Communication with the concentrator restored</td>
</tr>
<tr>
<td>TEL LINE ERROR</td>
<td style="text-align: center;">20</td>
<td>Telephone line failure or disconnection</td>
</tr>
<tr>
<td>TEL LINE OK</td>
<td style="text-align: center;">30</td>
<td>Telephone line restored</td>
</tr>
<tr>
<td>MODULE DISCONNECT</td>
<td style="text-align: center;">C0</td>
<td>Device disconnected</td>
</tr>
<tr>
<td>MODULE CONNECT</td>
<td style="text-align: center;">C1</td>
<td>Device connected</td>
</tr>
<tr>
<td>RECEIVER RESET</td>
<td style="text-align: center;">D0</td>
<td>RESET button of receiver is pressed</td>
</tr>
</tbody>
</table>
