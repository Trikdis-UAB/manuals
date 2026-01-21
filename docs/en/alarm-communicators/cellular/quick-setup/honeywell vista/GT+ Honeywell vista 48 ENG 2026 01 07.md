**Content**


**GT/GT+/GET with Honeywell Ademco Vista-48 (Vista-20, Vista-15), quick setup** 

Short wiring and programming steps to connect the **GT/GT+/GET** communicator to **Honeywell Ademco Vista-48 (Vista-20, Vista-15)** panel using KeyBus, then enroll the system in **Protegus2**. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between **GT/GT+/GET**, but the connections are the same.) 

| **CAUTION** | Install and service only by qualified personnel. Disconnect power  before wiring. Unauthorized changes void warranty. |
| ----------- | ------------------------------------------------------------ |

## Prerequisites

·    **GT/GT+/GET** firmware 1.21, SIM inserted, PIN disabled, data plan active.

·    **Honeywell Ademco Vista-48  (Vista-20, Vista-15)** panel with keypad access (installer code available).

·    CMS account number if reporting to CMS.

·    **Protegus2** company/installer account and communicator IMEI.

## Wiring

Follow the schematic below to connect the communicator to the panel: 

| **GT/GT+/GET terminal** | **Honeywell panel** | **Notes**              |
| ----------------------- | ------------------- | ---------------------- |
| +12V DC/-12V DC         | 5/4                 | Power the communicator |
| CLK/DATA                | 7/8                 | KeyBus                 |


<img src="./GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.png" alt="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## Programming the Honeywell Ademco Vista-48 (Vista-20, Vista-15) Alarm Panel via Keypad

Using the control panel‘s keypad enter these sections and set them as described:

**Enable Contact ID reporting**

| **Keypad Entry** | **Action Description**                    |
| ---------------- | ----------------------------------------- |
| *4112800 *       | Enter programming mode                    |
| *591 *           | Enable “Exit Error Report Code”.          |
| *601 *           | Enable “Trouble Report Code”.             |
| *611 *           | Enable “Bypass reporting Code”.           |
| *621 *           | Enable “AC Mains Loss Report Code”.       |
| *631 *           | Enable “Low Battery Report Code”.         |
| *641 *           | Enable “Test Report Code”.                |
| *651 *           | Enable “Open Report Code”.                |
| *661 *           | Enable “Arm Away/Stay Report Code”.       |
| *671 *           | Enable “RF Low Battery Report Code”.      |
| *681 *           | Enable “Cancel Report Code”.              |
| *691 *           | Enable “Alarm Restores”.                  |
| *701 *           | Enable “Alarm Restore Report Code”.       |
| *711 *           | Enable “Trouble Restore Report Code”.     |
| *721 *           | Enable “Bypass Restore Report Code”.      |
| *731 *           | Enable “AC Mains Restore Report Code”.    |
| *741 *           | Enable “Low Battery Restore Report Code”. |
| *751 *           | Enable “RF Low Restore Code”.             |
| *761 *           | Enable “Test Restore Report Code”.        |
| *291 *           | Enable “ECP Contact ID Output for ACM”.   |
| *1891 *          | Enable “AUI Device 1 and 2 Enable”.       |
| *99              | Exit programming mode.                    |

## Add system to Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Step 1.</strong> Tap <strong>Add new system</strong>.
        <img src="./GT+ honeywell vista 48 1 ENG 2026 01 05.png" alt="Add new system">
  </div>
  
 
  <div class="step-card">
        <strong>Step 2.</strong> Enter the communicator <strong>IMEI</strong>, tap <strong>Next</strong>.    
        <img src="./GT+ honeywell vista 48 2 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 3.</strong> Select security company. 
        <img src="./GT+ honeywell vista 48 3 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 4.</strong> Choose <strong>Honeywell</strong>.
        <img src="./GT+ honeywell vista 48 4 ENG 2026 01 05.png" alt="Add new system">
  </div>
  

  <div class="step-card">
        <strong>Step 5.</strong> Choose <strong>Vista 48 (Vista 20, Vista 15)</strong>.
        <img src="./GT+ honeywell vista 48 5 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 6.</strong> Enter <strong>Object ID</strong> and <strong>Module ID</strong>, tap <strong>Next</strong>.
        <img src="./GT+ honeywell vista 48 6 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 7.</strong> Wait while data is written.
        <img src="./GT+ honeywell vista 48 7 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 8.</strong> Tap <strong>Add to Protegus2</strong>.
        <img src="./GT+ honeywell vista 48 8 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 9.</strong> Enter system <strong>Name</strong>, tap <strong>Next</strong>.
        <img src="./GT+ honeywell vista 48 9 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 10.</strong> Tap <strong>Skip</strong>.
        <img src="./GT+ honeywell vista 48 10 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 11.</strong> Tap on system.
        <img src="./GT+ honeywell vista 48 11 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 12.</strong> Wait 1 minute for completion and tap <strong>Transfer</strong>.
        <img src="./GT+ honeywell vista 48 12 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 13.</strong> Enter the e-mail of the user to whom the installer will transfer the system. Tap <strong>Transfer</strong>.
        <img src="./GT+ honeywell vista 48 13 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 14.</strong> The system will appear in Protegus on the user's phone.
        <img src="./GT+ honeywell vista 48 14 ENG 2026 01 05.png" alt="Add new system">
  </div>


After completing the setup and installation perform a system check: 

1. Create an event: 

​	\- by arming/disarming the system with the control panel’s keypad; 

​	\- by triggering a zone alarm when the security system is armed. 


2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the **Protegus2** app. 


