# Using Paradox wireless devices with FLEXi SP3 (RTX3)

<div style="text-align: center;">
  <img src="./image1.jpeg" alt="FLEXi SP3 and RTX3 wireless receiver" width="400">
</div>


## Control panel firmware replacement

The control panel firmware must be changed with firmware, which will ensure the operation of Paradox wireless sensors. The firmware file can be downloaded as a registered user from [www.trikdis.com](http://www.trikdis.com).

#### Compatibility table for control panel modification and firmware version

| Control panel modification | Firmware version compatible with the control panel |
|:--:|:--:|
| <img alt="Product label with QR code: SP3_4G/E, FW 1.12. The S/N modification code SP3_14E0 is highlighted." src="./image2.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_1xx1_0112.fw |
| <img alt="Product label with QR code: SP3_ETH, FW 1.12. The S/N modification code SP3_3E00 is highlighted." src="./image4.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_3xx1_0112.fw |
| <img alt="Product label with QR code: SP3_4G/E, FW 1.12. The S/N modification code SP3_44E0 is highlighted." src="./image5.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_4xx1_0112.fw |
| <img alt="Product label with QR code: SP3_2G, FW 1.12. The S/N modification code SP3_5200 is highlighted." src="./image6.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_5xx1_0112.fw |

Follow the steps below to replace the firmware:

1.  Launch ***TrikdisConfig**.*

2.  Connect the „FLEXi“ SP3 to a computer using a USB Mini-B cable.

3.  Open the TrikdisConfig window **„Firmware”.**

4.  Click the **„Open firmware”** button and choose the required firmware file.

5.  Click the **Update [F12]** button.

6.  Wait for the updates to finish.

7.  Click the **„Disconnect”** button and disconnect the USB cable.

Connect the wires of the main power supply to the control panel’s AC/DC terminals. Connect the *RTX3* module to the control panel.

<img alt="Wiring diagram: SP3 to RTX3. Keypad bus: AUX+ (+12V) to RED, AUX- to BLK, GRN to GRN, YEL to YEL." src="./image7.png" style="width:2.2433377077865266in;height:1.2266688538932633in" />

Insert an activated SIM card into the SIM card holder. Turn on the main power supply. Wait a few minutes. Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3 control panel. The TrikdisConfig*** status bar displays information about the version of the installed firmware (1). In the **„Modules” / „Keypads”** window, the table contains the RTX3 module (2) that is connected to the control panel.

<img alt="TrikdisConfig Modules  Keypads window: callout 1 highlights the final digit of the Device field in the status bar; FW shows 1.12 nearby. Callout 2 highlights row 1, whose Keypad type is RTX3 transceiver." src="./image8.png" style="width:7.082677165354331in;height:4.066929133858268in" />

After connecting the RTX3 module, the **„*FLEXi” SP3*** control panel can work in wireless sensors from Paradox (magnetic contacts, motion detectors, glass break detector (G550), smoke detector (SD360), remote control (REM2, REM25), sirens (SR230, SR250), keypads (K37), expansion module (2 WPGM), repeater (RPT1)).

## Linking a wireless sensors

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel. Insert the batteries into the wireless sensor and wait until the LED indicators stop blinking.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.

<img alt="TrikdisConfig Wireless window: the Learn sensors button is highlighted above the wireless device table." src="./image9.png" style="width:7.078740157480315in;height:1.610236220472441in" />

5.  Select the type of device: **„Sensors”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode dialog: Sensors is selected as the device type to learn, and the Start button is highlighted." src="./image10.png" style="width:3.074803149606299in;height:1.937007874015748in" />

7.  Press the sensor **„Tamper”** button.

<img alt="TrikdisConfig Learning mode dialog: learning mode has started and the message asks for a short press of the device tamper. A Stop learning button appears below." src="./image11.png" style="width:3.7244094488188977in;height:2.1929133858267718in" />

8.  Wait a few seconds. The control panel will detect the sensor.

9.  The **„UID”** number must match the serial number of the sensor shown on the sticker on the sensor board.

10. The sensor must be assigned a **„Zone Number”** and a **„Zone definition”**.

11. Click **„Save”**.

<img alt="TrikdisConfig New device was found dialog: a Magnetic contact was detected and its UID is displayed. Zone number is 10, Zone definition is Interior, and Save is highlighted." src="./image12.png" style="width:3.0866141732283463in;height:2.515748031496063in" />

12. Wireless sensor added to the list of wireless devices.

13. The **„UID”** number must match the serial number of the sensor, which can be found on the sticker on the sensor board.

14. Click **„Stop learning”** to complete the registration of wireless sensors.

<img alt="TrikdisConfig Learning mode dialog: the new device message shows ID 1, Magnetic contact, and a UID. The Stop learning button is highlighted." src="./image13.png" style="width:3.7244094488188977in;height:2.661417322834646in" />

15. Click **„Yes”** for the sensor to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. The Yes button is highlighted." src="./image14.png" style="width:3.0078740157480315in;height:1.2322834645669292in" />

16. A new wireless sensor will be added to the list of **„Wireless”** devices.

<img alt="TrikdisConfig Wireless window: row 1 is highlighted and shows Device type Magnetic contact with a Serial No. entry." src="./image15.png" style="width:7.082677165354331in;height:1.5669291338582678in" />

17. You must assign the sensors to **„Zones”** and **„Area”** of the security control panel (**„Zones”** window).

<img alt="TrikdisConfig Zones window, Zones settings table: the highlighted Zone 10 row shows Input beginning Wireless Magne, Area 1, Definition Interior, and Type NO." src="./image16.png" style="width:7.086614173228346in;height:2.6692913385826773in" />

18. Click **Write [F5]** after making the changes.

19. The wireless sensor is now successfully linked to the system.

!!! note
    To delete wireless sensors from the „FLEXi" SP3's memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the **„Wireless
        sensor"** that you wish to delete and click **Write [F5]**. The
        wireless sensor is now removed from the „FLEXi" SP3's memory.
## Linking a wireless remote controller (keyfob)

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.
5.  Select the type of device: **„Pendants”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode window: device type set to Pendants, with the Start button highlighted." src="./image17.png" style="width:3.106299212598425in;height:1.8976377952755905in" />

7.  Press and hold any button on the remote controller to turn on the LED on the remote control. Release the button.

8.  Wait a few seconds. The control panel will detect the keyfob.

9.  The **„UID”** number must match the serial number of the remote control, which is indicated on the sticker on the back of the remote controller.

10. In the **„Partition”** field, specify the partition of the security system that the console will control (Arm / Disarm).

11. In the **„User”** field, enter the user number to which the keyfob will be assigned.

12. Click **„Save”**.

<img alt="TrikdisConfig New device was found dialog: a keyfob and its UID are shown. Area is set to 1, User is set to 1, and Save is highlighted." src="./image18.png" style="width:3.0984251968503935in;height:2.5236220472440944in" />

13. Wireless pendant is included in the list of sensors.

14. The **„UID”** number must match the serial number of the keyfob, which can be found on the back of the remote controller.

15. Click **„Stop learning”** to complete the registration of wireless pendant.

<img alt="TrikdisConfig Learning mode window: a keyfob has been found with ID 1 and a UID. The Stop learning button is highlighted." src="./image19.png" style="width:3.720472440944882in;height:2.661417322834646in" />

16. Click **„Yes”** for the pendant to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. Yes is highlighted." src="./image20.png" style="width:3.0039370078740157in;height:1.2440944881889764in" />

17. The wireless keyfob has been added to the list of **„Wireless”** devices.
18. You can assign additional functions to the controller’s buttons 3 and 4 (Arm, Disarm; Silent alarm; Panic alarm; PGM control).

<img alt="Keyfob drawing with four numbered buttons: 1 is the upper closed padlock, 2 the lower open padlock, 3 the left power symbol, and 4 the right arrow." src="./image21.png" style="width:1.6933366141732284in;height:2.06667104111986in" />

<img alt="TrikdisConfig Wireless window: the highlighted keyfob row shows ID 1, Area 1, User 1, Key 3 set to Panic, and Key 4 set to Silent panic." src="./image22.png" style="width:7.082677165354331in;height:1.562992125984252in" />

19. Click **Write [F5]** after making the changes.

20. The wireless controller is now successfully linked to the system.

!!! note
    To delete wireless keyfob from the „FLEXi" SP3's memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the **„Keyfob"**
        that you wish to delete and click **Write [F5]**. The keyfob is
        now removed from the „FLEXi" SP3's memory.
## Linking a wireless siren

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel. Insert the batteries into the wireless siren.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.
5.  Select the type of device: **„Sirens”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode window: device type set to Sirens, with the Start button highlighted." src="./image23.png" style="width:3.0826771653543306in;height:1.921259842519685in" />

7.  Press and hold the **„LEARN”** button on the siren board for 3 seconds. The LED on the siren will start flashing. Release the button.

8.  Wait a few seconds. The security panel will detect the siren.

9.  The **„UID”** number must match the siren serial number, which is indicated on the sticker on the siren board.

10. In the **„Area”** field, specify the section of the security system, activation of which will trigger the siren.

11. Click **„Save”**.

<img alt="TrikdisConfig New device was found dialog: a siren and its UID are shown. Area is set to 1, and Save is highlighted." src="./image24.png" style="width:3.0826771653543306in;height:2.177165354330709in" />

12. Wireless siren is included in the list of wireless devices.

13. The **„UID”** number must match the serial number of the siren, which can be found on the sticker on the siren board.

14. Click **„Stop learning”** to complete the registration of wireless siren.

<img alt="TrikdisConfig Learning mode window instructs the user to shortly press the tamper on the device. It reports a new device: ID 1, Siren. Stop learning is highlighted." src="./image25.png" style="width:3.7283464566929134in;height:2.673228346456693in" />

15. Click **Yes** for the siren to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. Yes is highlighted." src="./image26.png" style="width:3.0118110236220472in;height:1.2401574803149606in" />

16. The wireless siren added to the list of **„Wireless”** devices.

<img alt="TrikdisConfig Wireless window: the highlighted siren row shows ID 1 and Area 1. User, Key 3, and Key 4 show N/A." src="./image27.png" style="width:7.078740157480315in;height:1.5551181102362204in" />

17. Click **Write [F5]** after making the changes.

18. The wireless siren is now successfully linked to the system.

!!! note
    To delete wireless siren from the „FLEXi" SP3's memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the **„Siren"**
        that you wish to delete and click **Write [F5]**. The wireless
        siren is now removed from the „FLEXi" SP3's memory.
## Linking a wireless keypad

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel. Insert the batteries into the wireless keypad.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.
5.  Select the type of device: **„Keypads”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode window: device type set to Keypads, with the Start button highlighted." src="./image28.png" style="width:3.074803149606299in;height:1.8976377952755905in" />

7.  Simultaneously press and hold the **[** <img alt="Power symbol button." src="./image29.png" style="width:0.12992125984251968in;height:0.14173228346456693in" /> **]** and **[BYP]** buttons on the keypad for 3 seconds. The keypad will beep several times. Release the buttons.

8.  Wait a few seconds. The security panel will detect the keypad.

9.  The UID number must match the serial number of the keypad, which can be found on the sticker on the back of the keypad’s casing.

10. In the field, specify the **Area** of the security system that will control the keypad.

11. Click **Save**.

<img alt="TrikdisConfig New device was found dialog: a keypad and its UID are shown. Area is set to 1, and Save is highlighted." src="./image30.png" style="width:3.106299212598425in;height:2.1850393700787403in" />

12. Wireless keypad is included in the list of wireless devices.

13. The **„UID”** number must match the serial number of the keypad, which can be found on the back of the keypad’s casing.

14. Click **„Stop learning”** to complete the registration of wireless keypad.

<img alt="TrikdisConfig Learning mode window instructs the user to shortly press the tamper on the device. It reports a new device: ID 1, Keypad. Stop learning is highlighted." src="./image31.png" style="width:3.7283464566929134in;height:2.6692913385826773in" />

15. Click **„Yes”** for the keypad to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. Yes is highlighted." src="./image32.png" style="width:2.9921259842519685in;height:1.220472440944882in" />

16. The wireless keypad has been added to the list of **„Wireless”** devices.

<img alt="TrikdisConfig SP3, Wireless window: row 1 lists Device type Keypad and Area 1. The Serial No. field is populated, and Write (F5) is available." src="./image33.png" style="width:7.078740157480315in;height:1.5748031496062993in" />

17. Click **Write [F5]** after making the changes.

18. The wireless keypad is now successfully linked to the system.

!!! note
    To delete wireless keypad from the „FLEXi" SP3's memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the **„Keypad"**
        that you wish to delete and click **Write [F5]**. The keypad is
        now removed from the „FLEXi" SP3's memory.
## Linking a 2-way wireless PGM 2WPGM

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel. Switch on the power on the module 2WPGM.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.
5.  Select the type of device: **„PGM device”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode window: device type is set to PGM devices, with Start highlighted." src="./image34.png" style="width:3.078740157480315in;height:1.9094488188976377in" />

7.  Remove jumper JP2 on the 2WPGM module and put jumper back in it after a few seconds.

8.  Wait a few seconds. The security panel will detect the module.

9.  The **„UID”** number must match the serial number of the module, which is indicated on the sticker on the module board.

10. In the **„Select output”** field, specify the PGM output number that you want to assign to the module.

11. Click **„Save”**.

<img alt="TrikdisConfig New device was found window: a 2WPGM PGM device was found. Select output is set to 4, and Save is highlighted." src="./image35.png" style="width:3.0826771653543306in;height:2.177165354330709in" />

12. Wireless module 2WPGM is included in the list of wireless devices.

13. The **„UID”** number must match the serial number of the 2WPGM, which can be found on the sticker on the module board.

14. Click **„Stop learning”** to complete the registration of wireless module 2WPGM.

<img alt="TrikdisConfig Learning mode window reports a newly found 2WPGM PGM device and instructs the user to shortly press the device tamper. Stop learning is highlighted." src="./image36.png" style="width:3.720472440944882in;height:2.6692913385826773in" />

15. Click **„Yes”** for the wireless module 2WPGM to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. Yes is highlighted." src="./image37.png" style="width:3.0in;height:1.220472440944882in" />

16. The 2WPGM wireless module has been added to the list of **„Wireless”** devices.

<img alt="TrikdisConfig SP3, Wireless window: row 1 lists Device type 2WPGM PGM. The Serial No. field is populated, and Write (F5) is available." src="./image38.png" style="width:7.0875in;height:1.561887576552931in" />

17. PGM output can be renamed.

<img alt="TrikdisConfig SP3, PGM Outputs tab: row 4 shows Name Gate, PGM output 2WPGM ID1, Output definition Remote Control, and Pulse Time 20 s." src="./image39.png" style="width:7.086614173228346in;height:1.921259842519685in" />

18. Click **Write [F5]** after making the changes.

19. The wireless 2WPGM is now successfully linked to the system.

!!! note
    To delete wireless module 2WPGM from the „FLEXi" SP3's
    memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the 2WPGM
        that you wish to delete and click **Write [F5]**. The 2WPGM
        is now removed from the „FLEXi" SP3's memory.
## Linking a wireless repeater RPT1

1.  Make sure the **„*FLEXi” SP3 has enrolled the RTX3*** wireless sensor receiver.

2.  Switch on the power supply on the control panel. Switch on the power on the module RPT1.

3.  Using TrikdisConfig, remotely connect to the **„*FLEXi” SP3*** control panel.

4.  In TrikdisConfig, in the **„Wireless”** window, click the **„Learn sensors”** button.
5.  Select the type of device: **„Repeater”**.

6.  Press the **„Start”** button.

<img alt="TrikdisConfig Learning mode window: device type is set to Repeaters, with Start highlighted." src="./image40.png" style="width:3.074803149606299in;height:1.8976377952755905in" />

7.  Press the **„LEARN”** button on the RPT1 repeater.

8.  Wait a few seconds. The security panel will detect the RPT1 repeater.

9.  The **„UID”** number must match the serial number of the repeater, which is indicated on the sticker on the repeater board.

10. Click **„Stop learning”** to complete the registration of wireless repeaters.

<img alt="TrikdisConfig Learning mode window reports a newly found Repeater and instructs the user to shortly press the device tamper. Stop learning is highlighted." src="./image41.png" style="width:3.720472440944882in;height:2.7007874015748032in" />

11. Click **„Yes”** for the wireless repeater RPT1 to be written to the **„*FLEXi” SP3*** control panel.

<img alt="TrikdisConfig Save configuration dialog asks whether to save new parameters to the module. Yes is highlighted." src="./image42.png" style="width:2.984251968503937in;height:1.220472440944882in" />

12. The wireless repeater RPT1 has been added to the list of **„Wireless”** devices.

<img alt="TrikdisConfig SP3, Wireless window: row 1 lists Device type Repeater. The Serial No. field is populated, and Write (F5) is available." src="./image43.png" style="width:7.078740157480315in;height:1.5590551181102361in" />

13. Click **Write [F5]** after making the changes.

14. The wireless repeater RPT1 is now successfully linked to the system.

!!! note
    To delete wireless repeater RPT1 from the „FLEXi" SP3's
    memory:

    1.  Connect a USB Mini-B cable to the „FLEXi" SP3.

    2.  Launch TrikdisConfig, click the **Read [F4]** button.

    3.  In the TrikdisConfig window **„Wireless"**, in the column
        **„Device type"**, select **„Disabled"** instead of the
        **„Repeater"** that you wish to delete and click **Write [F5]**.
        The repeater RPT1 is now removed from the ***„FLEXi*"
        *SP3***'s memory.
