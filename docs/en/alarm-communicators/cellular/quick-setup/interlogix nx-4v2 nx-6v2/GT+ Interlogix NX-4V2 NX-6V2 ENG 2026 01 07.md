# Interlogix NX-4V2 / NX-6V2 with GT/GT+/GET quick setup

Short wiring and programming steps to connect the GT/GT+/GET communicator to Interlogix NX-4V2, Interlogix NX-6V2 panels using KeyBus, then enroll the system in Protegus2. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between GT/GT+/GET, but the connections are the same.) 

!!! caution
    Install and service only by qualified personnel. Disconnect power before wiring. Unauthorized changes void warranty.

## Prerequisites

1. GT/GT+/GET firmware 1.21, SIM inserted, PIN disabled, data plan active.
1. Interlogix NX-4V2 / NX-6V2 panel with keypad access (installer code available).
1. CMS account number if reporting to CMS.
1. Protegus2 company/installer account and communicator IMEI.

## Wiring

Follow the schematic below to connect the communicator to the panel: 

| **GT/GT+/GET terminal** | **Interlogix panel** | **Notes**              |
| ----------------------- | -------------------- | ---------------------- |
| +12V DC/-12V DC         | POS/COM              | Power the communicator |
| DATA                    | DATA                 | KeyBus                 |


<img src="../GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31.png" alt="GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31" class="GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31">



<img src="../GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31.png" alt="GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31" class="GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31">


## Programming the Interlogix NX-4V2, Interlogix NX-6V2 Alarm Panel via the LCD Keypad

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
| Enter location       | EXIT EXIT        | Press “EXIT” twice to exit programming mode.                 |

## Programming the Interlogix NX-4V2, Interlogix NX-6V2 Alarm Panel via the LED Keypad

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
| Service LED blinks, Armed LED steady ON | EXIT EXIT        | Press “EXIT” twice to exit programming mode.                 |

## Add system to Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Step 1.</strong> Tap <strong>Add new system</strong>.
        <img src="../GT+ interlogix nx 4v2 1 ENG 2025 12 31.png" alt="Add new system">
  </div>
  
 
  <div class="step-card">
        <strong>Step 2.</strong> Enter the communicator <strong>IMEI</strong>, tap <strong>Next</strong>.    
        <img src="../GT+ interlogix nx 4v2 2 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 3.</strong> Select security company. 
        <img src="../GT+ interlogix nx 4v2 3 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 4.</strong> Choose <strong>Interlogix</strong>.
        <img src="../GT+ interlogix nx 4v2 4 ENG 2025 12 31.png" alt="Add new system">
  </div>
  

  <div class="step-card">
        <strong>Step 5.</strong> Choose <strong>NX-4</strong> (<strong>NX-6</strong>).
        <img src="../GT+ interlogix nx 4v2 5 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 6.</strong> Enter <strong>Object ID</strong> and <strong>Module ID</strong>, tap <strong>Next</strong>.
        <img src="../GT+ interlogix nx 4v2 6 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 7.</strong> Wait while data is written.
        <img src="../GT+ interlogix nx 4v2 7 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 8.</strong> Tap <strong>Add to Protegus2</strong>.
        <img src="../GT+ interlogix nx 4v2 8 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 9.</strong> Enter system <strong>Name</strong>, tap <strong>Next</strong>.
        <img src="../GT+ interlogix nx 4v2 9 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 10.</strong> Tap <strong>Skip</strong>.
        <img src="../GT+ interlogix nx 4v2 10 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 11.</strong> Tap on system.
        <img src="../GT+ interlogix nx 4v2 11 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 12.</strong> Wait 1 minute for completion and tap <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 4v2 12 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 13.</strong> Enter the e-mail of the user to whom the installer will transfer the system. Tap <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 4v2 13 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 14.</strong> The system will appear in Protegus on the user's phone.
        <img src="../GT+ interlogix nx 4v2 14 ENG 2025 12 31.png" alt="Add new system">
  </div>






</div>

!!! tip
    After completing the setup and installation perform a system check:

    1. Create an event:

       - by arming/disarming the system with the control panel’s keypad.
       - by triggering a zone alarm when the security system is armed.

    2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the Protegus2 app.
