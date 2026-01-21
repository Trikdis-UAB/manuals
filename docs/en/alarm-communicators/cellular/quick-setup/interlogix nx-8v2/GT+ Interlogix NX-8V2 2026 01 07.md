**Content**


**GT/GT+/GET with Interlogix NX-8V2, quick setup** 

Short wiring and programming steps to connect the **GT/GT+/GET** communicator to **Interlogix NX-8V2** panel using KeyBus, then enroll the system in **Protegus2**. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between **GT/GT+/GET**, but the connections are the same.) 

| **CAUTION** | Install and service only by qualified personnel. Disconnect power  before wiring. Unauthorized changes void warranty. |
| ----------- | ------------------------------------------------------------ |

## Prerequisites

·    **GT/GT+/GET** firmware 1.21, SIM inserted, PIN disabled, data plan active.

·    **Interlogix NX-8V2** panel with keypad access (installer code available).

·    CMS account number if reporting to CMS.

·    **Protegus2** company/installer account and communicator IMEI.

## Wiring

Follow the schematic below to connect the communicator to the panel: 

| **GT/GT+/GET terminal** | **Interlogix panel** | **Notes**              |
| ----------------------- | -------------------- | ---------------------- |
| +12V DC/-12V DC         | POS/COM              | Power the communicator |
| DATA                    | DATA                 | KeyBus                 |


<img src="./GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30.png" alt="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30" class="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30">

## Programming the Interlogix NX-8V2 Alarm Panel via the LCD Keypad

Using the control panel‘s keypad enter these sections and set them as described:

**Enable Contact ID reporting**

| **LCD keypad**       | **Keypad Entry** | **Action Description**                                       |
| -------------------- | ---------------- | ------------------------------------------------------------ |
| System ready         | *89713           | Enter programming mode                                       |
| Enter device address | 0#               | To go to main panel programming menu                         |
| Enter location       | 4#               | To go to “Phone1 events reported” toggle menu                |
| Loc#4 Seg#1          | 12345678*        | All toggle options should be enabled. * to save and go to next menu |
| Loc#4 Seg#2          | 12345678*        | All toggle options should be enabled. * to save and go back. |
| Enter location       | 23#              | To go to “Partition features” menu.                          |
| Loc#23 Seg#1         | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#23 Seg#3         | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 37#              | To go to “Siren and system supervision” menu.                |
| Loc#37 Seg#1         | **               | Press * twice to go to segment 3 toggle options menu.        |
| Loc#37 Seg#3         | 12345678*        | Segment 3. All toggle options should be enabled press * to save. |
| Loc#37 Seg#4         | 12345678*#       | Segment 4. All toggle options should be enabled press * to press and  then # to save and # to go back to the main menu. |
| Enter location       | 90#              | To go to “Partition 2 features” menu.                        |
| Loc#90 Seg#1         | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#90 Seg#3         | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 93#              | To go to “Partition 3 features” menu.                        |
| Loc#93 Seg#1         | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#93 Seg#3         | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 96#              | To go to “Partition 4 features” menu.                        |
| Loc#96 Seg#1         | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#96 Seg#3         | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 99#              | To go to “Partition 5 features” menu.                        |
| Loc#99 Seg#1         | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#99 Seg#3         | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 102#             | To go to “Partition 6 features” menu.                        |
| Loc#102 Seg#1        | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#102 Seg#3        | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 105#             | To go to “Partition 7 features” menu.                        |
| Loc#105 Seg#1        | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#105 Seg#3        | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | 108#             | To go to “Partition 8 features” menu.                        |
| Loc#108 Seg#1        | **               | Press * twice to go to section 3 toggle options menu.        |
| Loc#108 Seg#3        | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Enter location       | EXIT EXIT        | Press “EXIT” twice to exit programming mode.                 |

## Programming the Interlogix NX-8V2 Alarm Panel via the LED Keypad

Using the control panel’s keypad enter these sections and set them as described: 

**Enable Contact ID reporting** 

| **LCD keypad**                          | **Keypad Entry** | **Action Description**                                       |
| --------------------------------------- | ---------------- | ------------------------------------------------------------ |
| LEDs of Ready, Power steady ON          | *89713           | Enter programming mode                                       |
| Service LED blinks                      | 0#               | To go to main panel programming menu                         |
| Service LED blinks, Armed LED steady ON | 4#               | To go to “Phone1 events reported” toggle menu                |
| All zone LEDs are ON                    | 12345678*        | All toggle options should be enabled. * to save and go to next menu |
| All zone LEDs are ON                    | 12345678*        | All toggle options should be enabled. * to save and go back. |
| Service LED blinks, Armed LED steady ON | 23#              | To go to “Partition features and reporting selection” menu.  |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 37#              | To go to “Siren and system supervision” menu.                |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to segment 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*        | Segment 3. All toggle options should be enabled press * to save. |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 4. All toggle options should be enabled press * to press and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 90#              | To go to “Partition 2 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 93#              | To go to “Partition 3 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 96#              | To go to “Partition 4 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 99#              | To go to “Partition 5 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 102#             | To go to “Partition 6 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 105#             | To go to “Partition 7 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | 108#             | To go to “Partition 8 features” menu.                        |
| Service LED blinks, Ready LED steady ON | **               | Press * twice to go to section 3 toggle options menu.        |
| Service LED blinks, Ready LED steady ON | 12345678*#       | Segment 3. All toggle options should be enabled, press * to save and  then # to save and # to go back to the main menu. |
| Service LED blinks, Armed LED steady ON | EXIT EXIT        | Press “EXIT” twice to exit programming mode.                 |

## Add system to Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Step 1.</strong> Tap <strong>Add new system</strong>.
        <img src="./GT+ interlogix nx 8v2 1 ENG 2025 12 29.png" alt="Add new system">
  </div>
  
 
  <div class="step-card">
        <strong>Step 2.</strong> Enter the communicator <strong>IMEI</strong>, tap <strong>Next</strong>.    
        <img src="./GT+ interlogix nx 8v2 2 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 3.</strong> Select security company. 
        <img src="./GT+ interlogix nx 8v2 3 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 4.</strong> Choose <strong>Interlogix</strong>.
        <img src="./GT+ interlogix nx 8v2 4 ENG 2025 12 29.png" alt="Add new system">
  </div>
  

  <div class="step-card">
        <strong>Step 5.</strong> Choose <strong>NX-8</strong>.
        <img src="./GT+ interlogix nx 8v2 5 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 6.</strong> Enter <strong>Object ID</strong> and <strong>Module ID</strong>, tap <strong>Next</strong>.
        <img src="./GT+ interlogix nx 8v2 6 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 7.</strong> Wait while data is written.
        <img src="./GT+ interlogix nx 8v2 7 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 8.</strong> Tap <strong>Add to Protegus2</strong>.
        <img src="./GT+ interlogix nx 8v2 8 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 9.</strong> Enter system <strong>Name</strong>, tap <strong>Next</strong>.
        <img src="./GT+ interlogix nx 8v2 9 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 10.</strong> Tap <strong>Skip</strong>.
        <img src="./GT+ interlogix nx 8v2 10 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 11.</strong> Tap on system.
        <img src="./GT+ interlogix nx 8v2 11 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 12.</strong> Wait 1 minute for completion and tap <strong>Transfer</strong>.
        <img src="./GT+ interlogix nx 8v2 12 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 13.</strong> Enter the e-mail of the user to whom the installer will transfer the system. Tap <strong>Transfer</strong>.
        <img src="./GT+ interlogix nx 8v2 13 ENG 2025 12 29.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 14.</strong> The system will appear in Protegus on the user's phone.
        <img src="./GT+ interlogix nx 8v2 14 ENG 2025 12 29.png" alt="Add new system">
  </div>


After completing the setup and installation perform a system check: 

1. Create an event: 

​	\- by arming/disarming the system with the control panel’s keypad; 

​	\- by triggering a zone alarm when the security system is armed. 


2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the **Protegus2** app. 


