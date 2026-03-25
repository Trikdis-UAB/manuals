# Innerrange Integriti with GT/GT+/GET quick setup

Short wiring and programming steps to connect the GT/GT+/GET communicator to an Innerrange Integriti panel using TTL Port-0, then enroll the system in Protegus2. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between GT/GT+/GET, but the connections are the same.)

!!! caution
    Install and service only by qualified personnel. Disconnect power before wiring. Unauthorized changes void warranty.

## Prerequisites

1. GT/GT+/GET firmware 1.21, SIM inserted, PIN disabled, data plan active.
1. Innerrange Integriti panel with firmware version **19.1.0.36608** or higher.
1. Innerrange professional software version **19.1.0.15396** or higher.
1. Inner Range cable, part number `INTG-996795`.
1. CMS account number if reporting to CMS.
1. Protegus2 company/installer account and communicator IMEI.

## Wiring

Follow the schematic below to connect the communicator to the panel:

| **GT/GT+/GET terminal** | **Innerrange Integriti panel** | **Notes** |
| ----------------------- | ------------------------------ | --------- |
| +12V DC                 | +DET                           | +13V supply |
| -12V DC                 | GND 5                          | TTL Port-0 ground |
| CLK                     | Rx 3                           | TTL Port-0 |
| DATA                    | Tx 2                           | TTL Port-0 |

<img src="../GT+ Innerrange Integriti prijungimo schema ENG 2026 03 24.png" alt="GT+ Innerrange Integriti wiring diagram" class="GT+ Innerrange Integriti prijungimo schema ENG 2026 03 24">

## Programming the Innerrange Integriti Alarm Panel

1. Make sure the Innerrange Integriti panel firmware is **19.1.0.36608** or higher and the professional software version is **19.1.0.15396** or higher.
2. In the Integriti configuration program, specify the **Trikdis** communication protocol.
3. Set the reporting data format to **Contact ID**.
4. Configure the panel port connected to the communicator as **TTL Port-0** with settings **19200, 8, N, 1**.
5. Save the settings and exit the program.

<!-- MISSING-SCREENSHOT: gt-innerrange-integriti-programming -->

## Add system to Protegus2

<div class="steps-grid">
  <div class="step-card">
        <strong>Step 1.</strong> Tap <strong>Add new system</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 1 ENG 2026 01 06.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Step 2.</strong> Enter the communicator <strong>IMEI</strong>, tap <strong>Next</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 2 ENG 2026 01 06.png" alt="Enter communicator IMEI">
  </div>


  <div class="step-card">
        <strong>Step 3.</strong> Select security company.
        <img src="../../dsc pc/GT+ dsc pc585 3 ENG 2026 01 06.png" alt="Select security company">
  </div>


  <div class="step-card">
        <strong>Step 4.</strong> Choose <strong>Innerrange</strong>.
        <!-- MISSING-SCREENSHOT: gt-innerrange-integriti-protegus-brand -->
  </div>


  <div class="step-card">
        <strong>Step 5.</strong> Choose <strong>Integriti</strong>.
        <!-- MISSING-SCREENSHOT: gt-innerrange-integriti-protegus-model -->
  </div>


  <div class="step-card">
        <strong>Step 6.</strong> Enter <strong>Object ID</strong> and <strong>Module ID</strong>, tap <strong>Next</strong>.
        <!-- MISSING-SCREENSHOT: gt-innerrange-integriti-protegus-object-module -->
  </div>


  <div class="step-card">
        <strong>Step 7.</strong> Wait while data is written.
        <img src="../../dsc pc/GT+ dsc pc585 7 ENG 2026 01 06.png" alt="Wait while data is written">
  </div>


  <div class="step-card">
        <strong>Step 8.</strong> Tap <strong>Add to Protegus2</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 8 ENG 2026 01 06.png" alt="Add to Protegus2">
  </div>


  <div class="step-card">
        <strong>Step 9.</strong> Enter system <strong>Name</strong>, tap <strong>Next</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 9 ENG 2026 01 06.png" alt="Enter system name">
  </div>


  <div class="step-card">
        <strong>Step 10.</strong> Tap <strong>Skip</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 10 ENG 2026 01 06.png" alt="Skip user setup">
  </div>


  <div class="step-card">
        <strong>Step 11.</strong> Tap on system.
        <img src="../../dsc pc/GT+ dsc pc585 11 ENG 2026 01 06.png" alt="Open the added system">
  </div>


  <div class="step-card">
        <strong>Step 12.</strong> Wait 1 minute for completion and tap <strong>Transfer</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 12 ENG 2026 01 06.png" alt="Transfer system">
  </div>


  <div class="step-card">
        <strong>Step 13.</strong> Enter the e-mail of the user to whom the installer will transfer the system. Tap <strong>Transfer</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 13 ENG 2026 01 06.png" alt="Enter user e-mail">
  </div>


  <div class="step-card">
        <strong>Step 14.</strong> The system will appear in Protegus on the user's phone.
        <img src="../../dsc pc/GT+ dsc pc585 14 ENG 2026 01 06.png" alt="System added in Protegus2">
  </div>
</div>

## System check

!!! tip
    After completing the setup and installation perform a system check:

    1. Create an event:

       - by arming/disarming the system with the control panel's keypad.
       - by triggering a zone alarm when the security system is armed.

    2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the Protegus2 app.
