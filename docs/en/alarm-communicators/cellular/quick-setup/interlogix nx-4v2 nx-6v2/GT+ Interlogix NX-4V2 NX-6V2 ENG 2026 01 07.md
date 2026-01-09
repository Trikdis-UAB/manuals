**Content**

[TOC]

**GT/GT+/GET with Interlogix NX-4V2 or Interlogix NX-6V2, quick setup** 

Short wiring and programming steps to connect the **GT/GT+/GET** communicator to **Interlogix NX-4V2, Interlogix NX-6V2** panels using KeyBus, then enroll the system in **Protegus2**. Use this alongside the full manuals for all other settings. (Terminal labels differ slightly between **GT/GT+/GET**, but the connections are the same.) 

| **CAUTION** | Install and service only by qualified personnel. Disconnect power  before wiring. Unauthorized changes void warranty. |
| ----------- | ------------------------------------------------------------ |

## **1.**   **Prerequisites** 

·    **GT/GT+/GET** firmware 1.21, SIM inserted, PIN disabled, data plan active.

·    **Interlogix NX-4V2, Interlogix NX-6V2** panels with keypad access (installer code available).

·    CMS account number if reporting to CMS.

·    **Protegus2** company/installer account and communicator IMEI.

## **2.**   **Wiring** 

Follow the schematic below to connect the communicator to the panel: 

| **GT/GT+/GET terminal** | **Interlogix panel** | **Notes**              |
| ----------------------- | -------------------- | ---------------------- |
| +12V DC/-12V DC         | POS/COM              | Power the communicator |
| DATA                    | DATA                 | KeyBus                 |

<style>
.GT+ interlogix nx 4v2 prijungimo schema ENG 2025 12 31 {
  max-width: 900px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

<img src="./GT+ interlogix nx 4v2 prijungimo schema ENG 2025 12 31.png" alt="GT+ interlogix nx 4v2 prijungimo schema ENG 2025 12 31" class="GT+ interlogix nx 4v2 prijungimo schema ENG 2025 12 31">

## **3.**   **Programming the Interlogix NX-4V2, Interlogix NX-6V2 Alarm Panel via the LCD Keypad** 

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

## **4.**   **Programming the Interlogix NX-4V2, Interlogix NX-6V2 Alarm Panel via the LED Keypad** 

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

## **5.**   **Add system to Protegus2** 

**Step 1.** Tap **Add new system**. 

![image-20260107102532032](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107102532032.png)

**Step 2.** Enter the communicator **IMEI**, tap **Next**. 

![image-20260107102540690](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107102540690.png)

**Step 3.** Select security company. 

![image-20260107102548968](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107102548968.png)

**Step 4.** Choose **Interlogix.** 

![image-20260107102555561](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107102555561.png)

**Step 5.** Choose **NX-4** or **NX-6**. 

![image-20260107102603640](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107102603640.png)

**Step 6.** Enter **Object ID** and **Module ID**, tap **Next**.

![image-20260107104148132](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104148132.png)

**Step 7.** Wait while data is written. 

![image-20260107104156355](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104156355.png)

**Step 8.** Tap **Add to Protegus2**. 

![image-20260107104202542](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104202542.png)

**Step 9.** Enter system **Name**, tap **Next**. 

![image-20260107104211693](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104211693.png)

**Step 10.** Press **Skip** (if you do not add users now). 

![image-20260107104218660](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104218660.png)

**Step 11.** Press on system. 

![image-20260107104227674](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104227674.png)

**Step 12.** Wait 1 minute for completion and tap **Transfer**. 

![image-20260107104234698](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104234698.png)

**Step 13.** Enter the e-mail of the user to whom the installer will transfer the system. Tap **Transfer**.

![image-20260107104244006](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104244006.png)

**Step 14.** The system will appear in Protegus on the user's phone. 

![image-20260107104249819](C:\Users\i.simkevic\AppData\Roaming\Typora\typora-user-images\image-20260107104249819.png)

After completing the setup and installation perform a system check: 

1. Create an event: 

​	\- by arming/disarming the system with the control panel’s keypad; 

​	\- by triggering a zone alarm when the security system is armed. 


2. Make sure that the event arrives to the CMS (Central Monitoring Station) and the **Protegus2** app. 
