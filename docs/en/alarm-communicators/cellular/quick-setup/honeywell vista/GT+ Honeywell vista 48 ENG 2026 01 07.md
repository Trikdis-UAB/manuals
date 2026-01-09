**Content**

[TOC]

**GT/GT+/GET with Honeywell Ademco Vista-48 (Vista-20, Vista-15), quick setup** 

Short wiring and programming steps to connect the **GT/GT+/GET** communicator to **Honeywell Ademco Vista-48 (Vista-20, Vista-15)** panel using KeyBus, then enroll the system in **Protegus2**. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between **GT/GT+/GET**, but the connections are the same.) 

| **CAUTION** | Install and service only by qualified personnel. Disconnect power  before wiring. Unauthorized changes void warranty. |
| ----------- | ------------------------------------------------------------ |

## **1.**   **Prerequisites** 

·    **GT/GT+/GET** firmware 1.21, SIM inserted, PIN disabled, data plan active.

·    **Honeywell Ademco Vista-48  (Vista-20, Vista-15)** panel with keypad access (installer code available).

·    CMS account number if reporting to CMS.

·    **Protegus2** company/installer account and communicator IMEI.

## **2.**   **Wiring** 

Follow the schematic below to connect the communicator to the panel: 

| **GT/GT+/GET terminal** | **Honeywell panel** | **Notes**              |
| ----------------------- | ------------------- | ---------------------- |
| +12V DC/-12V DC         | 5/4                 | Power the communicator |
| CLK/DATA                | 7/8                 | KeyBus                 |

<style>
.GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05 {
  max-width: 900px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

<img src="./GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.png" alt="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## **3.**   **Programming the Honeywell Ademco Vista-48 (Vista-20, Vista-15) Alarm Panel via Keypad** 

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

## **4.**   **Add system to Protegus2** 

**Step 1.** Tap **Add new system**. 

![image-20260107111526224](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111526224.png)

**Step 2.** Enter the communicator **IMEI**, tap **Next**. 

![image-20260107111531771](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111531771.png)

**Step 3.** Select security company. 

![image-20260107111539394](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111539394.png)

**Step 4.** Choose **Honeywell.** 

![image-20260107111550642](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111550642.png)

**Step 5.** Choose **Vista 48  (Vista-20, Vista-15)** . 

![image-20260107111604256](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111604256.png)

**Step 6.** Enter **Object ID** and **Module ID**, tap **Next**. 

![image-20260107111610389](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111610389.png)

**Step 7.** Wait while data is written. 

![image-20260107111618172](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111618172.png)

**Step 8.** Tap **Add to Protegus2**. 

![image-20260107111625443](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111625443.png)

**Step 9.** Enter system **Name**, tap **Next**. 

![image-20260107111633956](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111633956.png)

**Step 10.** Tap **Skip** (if you do not add users now). 

![image-20260107111641373](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111641373.png)

**Step 11.** Tap on system. 

![image-20260107111650869](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111650869.png)

**Step 12.** Wait 1 minute for completion and tap **Transfer**. 

![image-20260107111656987](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111656987.png)

**Step 13.** Enter the e-mail of the user to whom the installer will transfer the system. Tap **Transfer**.

![image-20260107111704567](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111704567.png)

**Step 14.** The system will appear in Protegus on the user's phone. 

![image-20260107111712691](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107111712691.png)

After completing the setup and installation perform a system check: 

1. Create an event: 

​	\- by arming/disarming the system with the control panel’s keypad; 

​	\- by triggering a zone alarm when the security system is armed. 


2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the **Protegus2** app. 
