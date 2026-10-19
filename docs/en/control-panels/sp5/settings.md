# SP5 settings in the Protegus app

!!! warning "Draft for internal review, not published"
    Built from the Protegus app's configurator (beta front-end) for SP5 firmware 1.00. Items marked **[to confirm]** need a check with the firmware designer before publishing.

To open the configurator, open the system in the Protegus app and go to **Settings → Advanced settings**. In a desktop browser the configurator reads the panel's settings by itself; on a phone, tap **Read** first. Changes are saved to the panel only when you tap **Write**. Depending on your access level, pages and fields you are not allowed to change are hidden or read-only (see **Access & Permissions** under **System options**). For wiring, first power-up and adding the panel to Protegus, see the [installation manual](index.md).

!!! note
    In number boxes, a value above the maximum is changed to the maximum when you leave the box, and a value below the minimum (or an empty box) to the minimum. On a phone, lists are shown as cards: use **Edit** to change an item.

## Dashboard

The Dashboard shows the panel's identity, owner and connection state at a glance. It is available in the desktop view only. You can drag the cards into a different order, and the browser remembers it.

![Protegus app, SP5 configurator in a desktop browser with the menu on the left and the Dashboard open. Panel info card: Programming mode, Connection Via Protegus2 cloud, Last configured 2026-10-06 12:30, Unique ID/IMEI, Serial number 000123, Firmware v1.00 Up to date, Bootloader 1.00. System information card: Account ID 1234, Address Sample street 1, Owner Sample Owner, a phone number and an e-mail address. Connectivity card with an Edit link: LAN Active, SIM Standby with 80 % signal, WiFi Disabled.](./protegus-app/sp5-dashboard-desktop-content.webp)

### Panel info

| Field | Shows |
|---|---|
| Programming mode | That the configurator is connected to the panel in programming mode. |
| Connection | How the app reaches the panel: **Via Protegus2 cloud** or **Via USB**. |
| Last configured | The date and time of the last **Write**. Shown when you are signed in to Protegus and the panel holds this time. |
| Unique ID/IMEI | The panel's Unique ID. Click it to copy it. |
| Serial number | The panel's serial number. |
| Firmware v… | The firmware version, and **Up to date** or the newer version available. |
| Bootloader | The bootloader version, if the panel reports one. |

### System information

| Field | Shows |
|---|---|
| Account ID | The CMS account number, as set in **System options**. **N/A** if it is empty. |
| Address | The system's address in Protegus. |
| Owner | The first owner's name. |
| Phone number | The first owner's phone number. |
| E-mail address | The first owner's e-mail address. |

**Address**, **Owner**, **Phone number** and **E-mail address** appear only when the system has been added to Protegus. Otherwise the card shows **This system is not added to Protegus2.**

### Connectivity

| Field | Shows |
|---|---|
| LAN | The status of the LAN connection. |
| SIM | The status of the cellular connection and its signal strength in %. |
| WiFi | The status of the WiFi connection and its signal strength in %. |
| Edit | Opens **Communication → Connection**. |

The status is read from the panel when you open the Dashboard or the Connection page. The same status values are used on both pages:

| Status | Meaning |
|---|---|
| Disabled | The connection is switched off in the settings. |
| Fault | The connection is not working. The **Fault** column on the Connection page says why. |
| Active | Working, and carrying reports to both Protegus and the CMS. |
| CMS | Working, and carrying reports to the CMS. |
| Cloud | Working, and carrying reports to Protegus. |
| Standby | Working, but not carrying reports at the moment. |
| N/A | The status could not be read. |

## System options

System options holds the panel's identity and general behaviour, the access codes, the clock and the troubles that block arming. On desktop the page heading reads **System Options**.

![Protegus app, SP5 System Options page in a desktop browser, with four cards. System Identity & Behavior: Account ID 1234, Object Name Sample system, Clear buffer events after reboot and the two 2-wire fire switches off, Power failure delay 300, Call attempts to user 3, Text encoding English, Hang-up call after 30, Prevent event flooding on with 3 repeats within 30 s and resume after 30 min, EOL Resistor Configuration 2k2+2k2+4k7. Access & Permissions: masked Full access, Limited access and SMS programming codes, Account ID permission on, and the other Limited access permissions set to Editable. Time Settings: Time zone UTC +02:00, Time synchronization SIM and LAN, Daylight saving time on, NTP server pool.ntp.org, Panel current time 2026-10-07 12:00:00 and a Set from PC button. Arming Restrictions: 13 trouble switches, some on.](./protegus-app/sp5-systemoptions-desktop-content.webp)

### System Identity & Behavior

| Setting | What it does | Values |
|---|---|---|
| Account ID | The object's account number at the monitoring station (CMS). For **Limited access** it is read-only unless the **Account ID** permission is on. | up to 6 characters |
| Object Name | The system's name. Every SMS from the panel starts with it. | up to 31 characters |
| Clear buffer events after reboot | Deletes events not yet sent when the panel restarts. **[to confirm: meaning taken from the label only]** | on / off |
| 2-wire fire on IO9 | Turns terminal IO9 into a 2-wire fire loop input. IO9 can then only be a zone and is listed as **SP5 9 I/O - 2-wire fire zone**. A zone already on IO9 stays on it; if its type was ATZ, it changes to EOL and the second ATZ zone is released. **[to confirm: whether both IO9 and IO10 support the 2-wire fire loop]** | on / off |
| 2-wire fire on IO10 | The same for terminal IO10 (**SP5 10 I/O - 2-wire fire zone**). Set independently of IO9. | on / off |
| Power failure delay | How long mains (AC) power must be missing before the panel reports a power failure. **[to confirm: meaning taken from the label only]** | 0–999 s |
| Call attempts to user | How many times the panel calls a user. **[to confirm: meaning taken from the label only]** | 0–99 |
| Text encoding | The character set the panel uses for object, area and zone names. Choose the one that matches the language of your names. | English, Baltic, Cyrillic alphabet, Central European, Greek, Turkish, Hebrew, Arabic, Vietnamese |
| Hang-up call after | Under **Incomming Call Handling**. How long the panel keeps an incoming call before it hangs up. **[to confirm: meaning taken from the label only]** | 0–99 s |
| Prevent event flooding (Suspend reporting) | Stops reporting an event that repeats too often. The next two settings set the limits. | on / off |
| Suspend if the same event repeats more than … within … | Reporting of an event is suspended when it repeats more than this many times within this time. | 0–99 times; 0–99 s |
| Resume reporting automatically after | When reporting of a suspended event starts again. | 0–99 min |
| EOL Resistor Configuration | The resistor set for all wired zones with EOL types. See **Resistor values** in the [installation manual](index.md) for each resistor. | 2k2+2k2+4k7, 1k+1k+2k2, 5k6+5k6+3k3, 5k6+3k3+5k6, 3k3+6k8+3k3, 2k2+4k7+8k2, 10k+10k+5k6, 4k7+4k7+2k2 |
| Tamper triggers trouble only (zone not activated) | A tamper on a zone reports a trouble but does not trigger the zone. Use it so that a tamper on a fire zone is not reported as a fire. | on / off |

### Access & Permissions

These codes protect direct configuration of the panel over USB, Bluetooth and Protegus2. The **Limited access permissions** below them set what a user signed in with the **Limited access** code can do on each page. Only a **Full access** user can change them.

| Setting | What it does | Values |
|---|---|---|
| Full access | The administrator code. Gives access to every setting. Hidden when you are signed in with **Limited access**. | up to 6 characters |
| Limited access | The installer code. What it allows is set by the permissions below. | up to 6 characters |
| SMS programming | The code for configuring the panel by SMS commands. | up to 6 characters |
| Account ID | Lets **Limited access** change the **Account ID**. | on / off |
| Communication | Access to **Connection** and **CMS Reporting**. | Editable / Visible / Hidden |
| Areas and zones | Access to **Areas (Partitions)** and **Zones**. **Visible** also makes **Terminals** read-only. | Editable / Visible / Hidden |
| Devices & Interfaces | Access to **Keypads**, **Expanders**, **Wireless**, **Temperature sensors** and **Thermostats**. | Editable / Visible / Hidden |
| Users | Access to **User list**, **Groups** and **Black list**. | Editable / Visible / Hidden |
| System events | Access to **System events**. With **Hidden**, the **Periodic test** switch on **CMS Reporting** is not shown either. | Editable / Visible / Hidden |

!!! note
    **Editable**: the installer can change the page. **Visible**: the page is read-only. **Hidden**: the page is removed from the menu and its settings are not read.

### Time Settings

| Setting | What it does | Values |
|---|---|---|
| Time zone | The panel's time zone. | UTC -12:00 to UTC +14:00, 38 zones including half-hour offsets |
| Time synchronization | Where the panel takes the time from. Select one or more sources. | WiFi, SIM, LAN, Cloud application, CMS1, CMS2 |
| Daylight saving time | Applies daylight saving time to the panel's clock. | on / off |
| NTP Server Address (LAN or WiFi) | The time server used when the time is synchronised over LAN or WiFi. | up to 31 characters |
| Panel current time | Shows the panel's clock, read when the page opens. **N/A** if it can't be read. | read-only |
| Set from PC | Sets the panel's clock to your computer's time. | button |

!!! note
    **Set from PC** sends the time to the panel immediately. It does not wait for **Write**.

### Arming Restrictions

Turn on each trouble that should prevent the system from being armed.

| Setting | What it does | Values |
|---|---|---|
| AC Fault | Mains power failure. | on / off |
| Battery Trouble | A backup battery trouble. | on / off |
| Aux Trouble | A trouble on the AUX power output. | on / off |
| Bell Missing | No siren connected to the BELL output. | on / off |
| Bell Overcurrent | Overcurrent on the BELL output. | on / off |
| CMS Communication Trouble | The panel can't reach the monitoring station. | on / off |
| RS485 Module Fault | A module on the RS485 bus is faulty or lost. | on / off |
| Wireless Device Lost | A wireless device has sent nothing for the **Sensor lost after** time (see **Wireless**). | on / off |
| Wireless Device Low Battery | A wireless device's battery is low. | on / off |
| Fire Loop Trouble | A trouble on a fire loop. | on / off |
| Tamper Fault | An open tamper. | on / off |
| 2-Wire Fire Sensors in Alarm | A 2-wire fire loop is in alarm. | on / off |
| Antimasking fault | A detector reports masking. | on / off |

## Connection

Menu **Communication → Connection**. Here you choose which connections carry the reports to the monitoring station and to Protegus, and set up the SIM, WiFi and Ethernet connections.

![Protegus app, SP5 Connection page in a desktop browser. Status table: LAN Active, IP 192.168.1.50, DHCP Enabled, gateway 192.168.1.1; SIM Standby, IP 10.64.12.7, operator Sample Mobile, 80 % signal; WiFi Disabled. Reporting to CMS and Reporting to Cloud cards, both with Main path Ethernet, Back up SIM, Fallback back up OFF and Switch back to Main path after 10 min. Cloud settings card with Enable cloud service and Report in parallel with CMS on and a masked Cloud access code. SIM card with APN internet, an empty SIM PIN and an Advanced settings link. WiFi card with SSID Sample-WiFi, a masked password, DNS 8.8.8.8 and DHCP on. Ethernet card with DNS 1 8.8.8.8, DNS 2 1.1.1.1, Show trouble if any on and DHCP on.](./protegus-app/sp5-communication-connection-desktop-content.webp)

### Connectivity

A read-only table, one row per connection. On a narrow screen it becomes a card with one block per connection.

| Field | Shows |
|---|---|
| Connectivity | The connection: **LAN**, **SIM** or **WiFi**. |
| Status | The connection's status. See the status values under **Dashboard**. |
| IP Address | The current IP address; 0.0.0.0 when there is none. |
| DHCP | **Enabled** (address obtained by DHCP), **No IP obtained**, or **Disabled** (static IP). |
| Gateway | The gateway address, static or obtained by DHCP. |
| Operator/SSID | The mobile operator for SIM; the network name for WiFi. |
| Signal | Signal strength in %, or **N/A**. |
| Fault | Why the connection is not working. SIM: **No SIM**, **PIN error**, **LTE issues**, **Unable to register to network**, **Unknown error**. WiFi: **No SSID**, **Not connected to SSID**, **No internet**, **Method not selected**. LAN: **No LAN cable**, **DHCP trouble**, **DNS trouble**, **No voltage**. |

### Reporting to CMS

| Setting | What it does | Values |
|---|---|---|
| Main path | The connection the panel uses first to reach the monitoring station. | OFF / SIM / Ethernet / WiFi |
| Back up | The connection used when the main path fails. | OFF / SIM / Ethernet / WiFi |
| Fallback back up | The connection used when the backup path also fails. | OFF / SIM / Ethernet / WiFi |
| Switch back to Main path after … min. | How long the panel stays on a backup path before it returns to the main path. | 0–999 min **[to confirm: the panel may accept only up to 255 min]** |

### Reporting to Cloud

The same paths for reporting to Protegus2. The card is greyed out while **Enable cloud service** is off.

| Setting | What it does | Values |
|---|---|---|
| Main path | The connection the panel uses first to reach Protegus2. | OFF / SIM / Ethernet / WiFi |
| Back up | The connection used when the main path fails. | OFF / SIM / Ethernet / WiFi |
| Fallback back up | The connection used when the backup path also fails. | OFF / SIM / Ethernet / WiFi |
| Switch back to Main path after … min. | How long the panel stays on a backup path before it returns to the main path. | as in **Reporting to CMS** |

### Cloud settings

| Setting | What it does | Values |
|---|---|---|
| Enable cloud service | Turns on reporting to Protegus2. Off greys out **Reporting to Cloud**. | on / off |
| Cloud access code | The panel's access code for the Protegus2 cloud. | up to 8 characters |
| Report in parallel with CMS | Sends events to Protegus2 at the same time as to the CMS, not only after the CMS has received them. | on / off |

### SIM

**APN** and **SIM PIN** are always shown; the other settings are under **Advanced settings**.

| Setting | What it does | Values |
|---|---|---|
| APN | The mobile data access point name from your operator. | up to 28 characters |
| SIM PIN | The SIM card's PIN code, if its PIN request is on. | 4 digits |
| User | The APN user name, if the operator requires one. | up to 28 characters |
| Password | The APN password. | up to 28 characters |
| DNS 1 | DNS server for the mobile connection. | IPv4 address |
| DNS 2 | Second DNS server for the mobile connection. | IPv4 address |
| SIM ICCID Lock | Locks the panel to the SIM card whose ICCID is shown below. Off removes the lock. | on / off |
| ICCID | The SIM card's ICCID. The **Edit** link to change it appears while **SIM ICCID Lock** is on. | up to 24 characters |
| Preferred network | The preferred mobile network, as MCC (country code) and MNC (network code), for example 246 and 01. The operator's name is shown beside the boxes. | MCC 0–999, MNC 0–999 |
| Network database | Opens mcc-mnc.com, where you can look up the codes. | link |
| Hide SIM warning | Turns off the SIM trouble indication. | on / off |
| Use SMS/Calls with internet | **[to confirm: meaning not yet described]** | on / off |
| Disable SIM data | The panel does not use mobile data. | on / off |

### WiFi

| Setting | What it does | Values |
|---|---|---|
| SSID | The WiFi network name. The panel works with 2.4 GHz networks. | up to 40 characters **[to confirm: the panel may store only 39]** |
| Password | The WiFi password. | up to 55 characters |
| DNS | DNS server for WiFi. | IPv4 address |
| DHCP | On: the panel gets its address from the router. Off: enter the three settings below. | on / off |
| IP Address | The panel's static IP address. Shown when **DHCP** is off. | IPv4 address |
| Subnet mask | Shown when **DHCP** is off. | IPv4 address |
| Gateway address | Shown when **DHCP** is off. | IPv4 address |

### Ethernet

| Setting | What it does | Values |
|---|---|---|
| DNS 1 | DNS server for the LAN connection. | IPv4 address |
| DNS 2 | Second DNS server for the LAN connection. | IPv4 address |
| Show trouble if any | Indicates LAN connection troubles. | on / off |
| DHCP | On: the panel gets its address from the router. Off: enter the three settings below. | on / off |
| IP Address | The panel's static IP address. Shown when **DHCP** is off. | IPv4 address |
| Subnet mask | Shown when **DHCP** is off. | IPv4 address |
| Gateway address | Shown when **DHCP** is off. | IPv4 address |

## CMS Reporting

Menu **Communication → CMS Reporting**. The panel can report to two monitoring stations at the same time, through the **Primary channel** and the **Parallel channel**. Each channel has its own backup channel and SMS fallback.

![Protegus app, SP5 CMS Reporting page in a desktop browser. Primary channel on: Communication method Network, Communication type TCP/IP, Domain or IP receiver.example.com, Port 55555, Protocol TRK8, a masked Encryption key and a Backup channel link. Parallel channel off and greyed out. Receiver card: Number 1, Line 1. Under Behavior, the Fallback card: Switch to backup after 3 attempts, Switch back to primary after 5 minutes. Under Testing: Periodic test on with Test period 1 day and Start test on at 12 h 0 min; Network (IP) Ping on with Period 120 seconds; SMS Ping off; Communication path test on, every 24 hours.](./protegus-app/sp5-communication-cmsreporting-desktop-content.webp)

### Primary channel

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the channel on or off. Off greys out the card. | on / off |
| Communication method: | How the panel reports to this CMS. **SMS** replaces the network settings with **Phone number** and **Encryption key**. **[to confirm: how the panel works with SMS as the channel method]** | Network / SMS |
| Communication type | The transport. Choosing **SMS** here is the same as the SMS method. With protocol **TL150**, only **UDP/IP** is offered. | TCP/IP, UDP/IP, SMS |
| Domain or IP | The CMS receiver's address. | up to 36 characters |
| Port | The receiver's port. | 0–65535 |
| Protocol | The reporting protocol. Choosing **TL150** switches the type to UDP/IP. | TRK, SIA DC-09_2012, SIA DC-09_2007, SIA DC-09_IPcom, TL150, TRK8 |
| Message format | The event code format inside SIA DC-09 messages. Shown for **SIA DC-09_2012** and **SIA DC-09_2007** only. | CID / SIA |
| Encryption key | The key the receiver uses to decrypt the reports. For **SIA DC-09_2012** and **SIA DC-09_2007**, an empty key means no encryption. | TRK: up to 6 characters. Other protocols: up to 16 characters, or exactly 32 hex digits with **Key is HEX** |
| Key is HEX | Enter the key as hexadecimal digits (0–9, A–F). Shown for **SIA DC-09_2012** and **SIA DC-09_2007** only. | on / off |
| Phone number | SMS method only. The CMS phone number for SMS reports. It is the same number as the SMS fallback number of this channel. | digits with an optional leading +, up to 23 |
| Encryption key | SMS method only. The key for SMS reports, shared with the SMS fallback. | up to 16 characters |
| Backup channel | Opens the backup channel settings. Not available while the channel is off or set to SMS. | — |
| Enable backup channel | Turns on the backup channel, which has its own address, port and protocol. Off greys out its settings. | on / off |
| Communication method:, Communication type, Domain or IP, Port, Protocol, Message format, Encryption key, Key is HEX | The backup channel's settings. They work as described above. | as above |
| Enable fallback SMS channel | Sends the reports by SMS when the network channels fail. Shown when the backup channel's method is **Network**. | on / off |
| Phone number | The phone number for SMS fallback reports. If the backup channel's method is **SMS**, this is the backup channel's number. | digits with an optional leading +, up to 23 |
| Encryption key | The key for SMS fallback reports. | up to 16 characters |

!!! note
    When **SMS** is the primary channel's method, a backup channel is not available. SMS is one-way and can't carry the two-way traffic needed to supervise the connection.

### Parallel channel

The parallel channel reports the same events to a second CMS, at the same time as the primary channel. It has the same settings as **Primary channel**, with its own backup channel and SMS fallback.

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the parallel channel on or off. | on / off |
| All other settings | As in **Primary channel**, for the second CMS. The expandable section is also labelled **Backup channel**. | as in Primary channel |

### Receiver

| Setting | What it does | Values |
|---|---|---|
| Number | The receiver number at the CMS. | up to 6 digits |
| Line | The receiver line number at the CMS. | up to 6 digits |

### Fallback

Under **Behavior**.

| Setting | What it does | Values |
|---|---|---|
| Switch to backup after | How many failed attempts on a channel before the panel moves to its backup channel. | 0–9 attempts |
| Switch back to primary after | How long the panel stays on the backup channel before it returns to the primary. Not to be confused with **Switch back to Main path** on the Connection page, which is about SIM, Ethernet and WiFi. | 0–99 minutes |

### Periodic test

Under **Testing**.

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the periodic test report on or off. It is the same setting as the **Periodic test** event on **System events**. | on / off |
| Test period | How often the panel sends a test report. | 0–255 hours; with **Start test** on, 0–10 day(s) |
| Start test | Sends the test at a fixed time of day. Off: no fixed time. | on / off |
| h, min (two boxes) | The time of day for the test. Editable only with **Start test** on. | 0–23 h, 0–59 min |

!!! note
    Turning on **Start test** changes the **Test period** unit to days and rounds the period down to whole days: 30 hours becomes 1 day, and less than 24 hours becomes 0.

### Network (IP) Ping

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the network ping to the CMS on or off. | on / off |
| Period | How often the panel pings the CMS over the network. | 0–990 seconds, in steps of 10 |

### SMS Ping

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the SMS ping to the CMS on or off. | on / off |
| Period | How often the panel sends an SMS ping. | 0–4095 minutes; 1 minute is the shortest useful period |

### Communication path test

| Setting | What it does | Values |
|---|---|---|
| (switch in the card header) | Turns the communication path test on or off. | on / off |
| Test every | How often the test runs, in the unit chosen beside it. | 0–99 |
| (unit) | The unit of **Test every**. | hours / day(s) |

## Areas (Partitions)

Menu **Areas and zones → Areas (Partitions)**. An area is a part of the site that is armed and disarmed on its own. The panel has up to 16 areas; only the enabled ones are listed.

![Protegus app, SP5 Areas (Partitions) page in a desktop browser: a Refresh status link, a + Add areas button and a table of two areas. 01 Home, Disarmed, entry delays 30 s and 15 s, exit delay 45 s, bell time 180 s, zones 0/10. 02 Garage, Armed, entry delays 20 s and 10 s, exit delay 30 s, bell time 120 s, zones 0/3. Each row has an Edit link.](./protegus-app/sp5-areas-desktop-content.webp)

### Area list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the area and zone states from the panel again. | button |
| + Add areas | Opens **Add areas**. | button |
| Status | The area's live state. | Armed, Staying, Sleeping, Disarmed, Arming…, Disarming…, -- |
| Number | The area number. | 01–16 |
| Area name | The area's name. Edit it in the cell. | see the area popup |
| Entry delay 1 (s) | Edit in the cell. See the area popup. | 0–999 s |
| Entry delay 2 (s) | Edit in the cell. See the area popup. | 0–999 s |
| Exit delay (s) | Edit in the cell. See the area popup. | 0–999 s |
| Bell time (s) | Edit in the cell. See the area popup. | 0–999 s |
| Zones (Violated/Total) | How many of the area's zones are violated now, and how many zones the area has. | n/m |
| Edit | Opens the area popup. | link |

### Add areas (popup)

| Setting | What it does | Values |
|---|---|---|
| (tick box per area) | Tick an area to enable it; untick it to disable it. The list shows all 16 areas with their ID and name. | on / off |

!!! note
    If you disable or remove an area that is still in use, the app asks you to confirm. It then removes the area from every zone, output, keypad, wireless device, user, group and from other areas' **Conditional arming**.

### Area popup

Opens from **Edit**. The title shows the area's name and number. **Remove area** at the bottom disables the area.

| Setting | What it does | Values |
|---|---|---|
| Number | The area number. Changing it opens that area's settings and discards unsaved changes. | 1–16 |
| Area name | The area's name. Required. | up to 19 characters **[to confirm: the panel stores 19 characters; the app accepts more]** |
| Assigned zone | The zones in this area. Ticking a zone adds this area to that zone. **+ Add new zone** creates a zone in this area when a free zone and a free terminal exist. | zones with a terminal |
| Entry delay 1 | Time to disarm after a **Delay** zone is triggered. | 1–999 s |
| Entry delay 2 | Time to disarm after a **Delay 2** zone is triggered. | 1–999 s |
| Exit delay | Time to leave after arming. | 1–999 s |
| Tamper action | What a tamper in this area does. **No area alarm**: reports only, no siren. **Alarm when armed**: the siren sounds only while the area is armed. **Always alarm**: the siren sounds even when disarmed. | No area alarm / Alarm when armed / Always alarm |
| Keyswitch mode | Whether a **Keyswitch** zone in this area works by level or by pulse. | Level / Pulse |
| Bell time | How long the siren sounds. | 1–999 s |

### Advanced

The collapsed section at the bottom of the area popup.

| Setting | What it does | Values |
|---|---|---|
| Re-ARM | Arms the area again automatically after it was disarmed from the app or by phone, if no zone was violated. | on / off |
| Auto-arm | Arms the area automatically after the **Auto-arm time**, regardless of any conditions. **[to confirm: it may instead re-arm the area after a disarm if no door was opened]** | on / off |
| Auto-arm time | The time for **Auto-arm**. 0 means off. Editable while **Auto-arm** is on. | 0–999 min |
| Arm mode if no exit | If nobody leaves during the exit delay, the area arms in this mode instead of away. | Arm away / Stay / Sleep |
| Intellizone delay | For zones with **Intelli zone** on: an alarm needs at least two such zones to trigger within this time. | 0–999 s **[to confirm: the panel may accept only 1–255 s]** |
| Squawk | The siren chirps briefly when the area is armed or disarmed. | on / off |
| Conditional arming | Other areas that must be armed for this area to be armed automatically. If they are not armed, this area stays disarmed. **[to confirm: how the panel applies this]** | the other enabled areas |

When you remove an area, the app resets it to: **Entry delay 1** 30 s, **Entry delay 2** 45 s, **Exit delay** 30 s, **Bell time** 120 s, **Intellizone delay** 20 s, **Tamper action** No area alarm, **Keyswitch mode** Level, **Arm mode if no exit** Stay, and the other options off. An area you add again starts from these values.

## Zones

Menu **Areas and zones → Zones**. A zone is one detector input with its area, definition and circuit type. The panel has up to 192 zones; only zones with a terminal are listed.

![Protegus app, SP5 Zones page in a desktop browser: a Refresh status link, a search box, a + Add button with a drop-down arrow, and a table of 12 zones, all OK. Examples: 01 Front door, area Home, definition Delay, input SP5 1 I/O, type EOL; 03 Kitchen smoke, Fire, SP5 3 I/O; 06 Garage door, area Garage, input RS485 Garage iO8, 1 I/O; 08 Back door on Keypad 1 IN; 13 Terrace door on Magnet Wireless LV ID1; 15 Outdoor siren tamper, areas Home and Garage, 24 Hour, Wireless siren tamper ID3; 16 Boiler room leak, Smart Water leakage sensor ID4. Each row has an Edit link.](./protegus-app/sp5-zones-desktop-content.webp)

### Zone list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the zone states from the panel again. | button |
| Search | Filters the list by zone name. | text |
| + Add | Opens the zone popup on the first free zone. The arrow beside it opens **Add ATZ zone** (needs two free zones) and **Add multiple zones**. | button |
| Status | The zone's live state. | OK, Trouble, Violated, Bypassed, -- |
| Number | The zone number. | 01–192 |
| Name | The zone's name. Edit it in the cell. | up to 23 characters |
| Area | The zone's areas. A zone with no area shows **Not assigned** and a list to assign one. | enabled areas |
| Definition | How the zone reacts. Edit it in the cell. See **Zone definitions** below. | 12 definitions |
| Input | The terminal the zone uses. Change it in the zone popup. | terminal name, or Disabled |
| Type | The circuit type. Edit it in the cell. **N/A** for the second zone of an ATZ pair. | the types the terminal allows |
| Edit | Opens the zone popup. | link |

!!! note
    Changing **Definition** in the list does not change the zone's **Delay** or **CID code**. Change the definition in the zone popup if you want those updated too.

### Zone popup

Opens from **Edit**, from **+ Add**, from **Terminals → Assign function → Assign zone input**, and from **+ Add new zone** in the area popup. **Reset I/O terminal** at the bottom frees the terminal.

| Setting | What it does | Values |
|---|---|---|
| Name | The zone's name. Required. | up to 23 characters |
| Assign terminal | The input the zone uses. Only free input terminals are listed: not used by another zone, not used as an output, and not measuring temperature or voltage. If the terminal doesn't support the current **Type**, Type changes to EOL. | free input terminals |
| Assign area | The areas the zone belongs to. **+ Add new area** opens **Add areas**. | enabled areas |
| Definition | How the zone reacts. Changing it also sets **Delay** and **CID code** to the new definition's values, unless you changed them by hand. | 12 definitions |
| Type | The circuit type. See **Zone types** below. | the types the terminal allows |
| Delay | The zone's response time: how long the input must be violated before the zone triggers. | 0–9999 milliseconds **[to confirm: the app shows milliseconds; the panel may use a different unit]** |
| Intelli zone | An alarm needs at least two zones with this option to trigger within the area's **Intellizone delay**. | on / off |
| Inactivity time | How long the zone ignores repeated triggers. Shown only if the panel supplies the value. | 0–65535 min |

### Zone Behavior

The collapsed section at the bottom of the zone popup.

| Setting | What it does | Values |
|---|---|---|
| Chime (Entry alert) | The keypad beeps when the zone is triggered. | on / off |
| Can be bypassed | Users can bypass the zone. | on / off |
| Auto bypass on arm (force arm) | A zone that is violated when the area is armed is bypassed automatically. | on / off |
| Violation reminder | Gives a reminder while the zone stays violated. Turning it on sets **Reminder interval** to 10. | on / off |
| Reminder interval | How often the reminder repeats. 0 turns the reminder off. | 0–9999 s **[to confirm: the app shows seconds; may be minutes]** |
| CID code | The Contact ID event code the zone reports. | 3 hex characters |
| Report | Turns reporting of this zone on or off. Sets both boxes below. | on / off |
| CMS (Central monitoring station) | Reports the zone's alarm and restore to the CMS. | on / off |
| Protegus2 | Reports the zone's alarm and restore to Protegus2. | on / off |

Which supervisors receive a zone's alarms by SMS is set in **User list → Edit user → SMS reporting**.

!!! note
    To free a zone's terminal, use **Reset I/O terminal**: **Not assigned** can't be picked in **Assign terminal**. The reset also returns the zone to basic settings (name Zone *n*, **Instant**, **NO**, the first enabled area, CID code 130, **Delay** 400, **Can be bypassed** on). Press **Save** to apply it.

### ATZ Zone properties (popup)

Opens from **+ Add → Add ATZ zone**. Sets up two zones, A and B, on one terminal. Required: both names and a terminal. After saving, each zone is edited in the normal zone popup; **Intelli zone** is set there.

| Setting | What it does | Values |
|---|---|---|
| Assign terminal | The terminal for both zones. Zone B is placed on the paired "- ATZ" terminal. | on-board IO1–IO10, and I/O 1–8 of iO8 and iO8-Lora expanders |
| Type | The circuit type, shared by both zones. | ATZ / ATZ_T |
| Name | Zone A and zone B each have their own name. Required. | up to 23 characters |
| Assign area | For each zone. | enabled areas |
| Definition | For each zone, as in the zone popup. | 12 definitions |
| Delay | For each zone, as in the zone popup. | as in the zone popup |
| Inactivity time | For each zone, as in the zone popup. | as in the zone popup |
| Zone Behavior A, Zone Behavior B | The **Zone Behavior** settings for each zone. | as in the zone popup |

### Add multiple zones (popup)

Creates several zones at once with the same settings. When it opens, the app sets the first enabled area, **24 Hour**, **NO** and **Delay** 400. The new zones are named Zone *n* and get the CID code of the chosen definition.

| Setting | What it does | Values |
|---|---|---|
| Assign terminal | The terminals to create zones on. The counter shows how many free zones remain. | free input terminals, except the second terminal of ATZ pairs |
| Assign area | The areas of the new zones. | enabled areas |
| Definition | The definition of the new zones. Also sets **Delay**. | 12 definitions |
| Type | The circuit type. Only types that all the selected terminals support are offered. | allowed types |
| Delay | The zones' response time. | 0–9999 milliseconds |

### Zone definitions

The descriptions follow "FLEXi" SP3 **[to confirm for SP5]**. The last column shows the **Delay** and **CID code** the app sets when you choose the definition in a popup.

| Definition | What it does | Delay, CID code |
|---|---|---|
| 24 Hour | Always active, armed or not. For glass-break and tamper detectors. | 400, 133 |
| Keyswitch | Arms and disarms the zone's areas from a switch. See **Keyswitch mode** in the area popup. | 400, 409 |
| Instant | Alarm at once when the area is armed. | 400, 130 |
| Fire | Always active, for fire detectors. Alarm at once. | 2000, 110 |
| Delay | Starts **Entry delay 1** when triggered while armed. For entry doors. | 400, 134 |
| Interior | Alarm at once when armed, but waits for the entry delay if a Delay zone was triggered first. For motion detectors near the entrance. | 400, 132 |
| Silent | Reports an alarm when armed, without the siren. | 400, 146 |
| Silent 24h | Reports an alarm at any time, without the siren. For panic buttons. | 400, 122 |
| Interior Stay | As **Interior**, but not protected when the area is armed in Stay mode. | 400, 132 |
| Instant Stay | As **Instant**, but not protected when the area is armed in Stay mode. | 400, 130 |
| Delay 2 | As **Delay**, using **Entry delay 2**. | 400, 134 |
| Mimic | **[to confirm: what this definition does]** | 400, CID code unchanged |

### Zone types

The wiring of each type is shown under **Connecting detectors** in the [installation manual](index.md). The resistor values are set in **System options → EOL Resistor Configuration**.

| Zone source | Name in terminal lists | Types allowed |
|---|---|---|
| On-board terminals IO1–IO10 | SP5 1 I/O … SP5 10 I/O | NO, NC, EOL, EOL_T, ATZ, ATZ_T, 3EOL |
| Second zone of an on-board ATZ pair | SP5 *n* I/O - ATZ | the pair's ATZ type (shown as N/A) |
| IO9 or IO10 as a 2-wire fire loop | SP5 9 I/O - 2-wire fire zone, SP5 10 I/O - 2-wire fire zone | NO, NC, EOL, EOL_T, 3EOL |
| iO8 and iO8-Lora expanders, I/O 1–8 | RS485 *expander name*, *n* I/O (second ATZ zone: … - ATZ) | NO, NC, EOL, EOL_T, ATZ, ATZ_T, 3EOL |
| iO, iO-WL, iO-MO and iO-LO expanders | RS485 *expander name* IN | NO, NC, EOL, EOL_T, 3EOL |
| Wireless devices | e.g. Magnet Wireless LV ID1, Wireless siren tamper ID3, Wireless keypad tamper ID5 | NO, NC, EOL, EOL_T, 3EOL **[to confirm: the panel may allow fewer EOL types on wireless and keypad inputs]** |
| Keypad inputs | Keypad *n* IN | NO, NC, EOL; also EOL_T on keypads with a serial starting 1D, 1E, 51 or 52 |

## Terminals

Menu **Terminals**. Lists every terminal of the panel, the RS485 expanders, the wireless devices and the keypads, and what each one is used for. Use it to give a free terminal its function: zone, output or sensor.

![Protegus app, SP5 Terminals page in a desktop browser: an Add filter link, a Terminals button with a drop-down arrow and the terminal list. SP5 1 I/O to SP5 5 I/O are zones such as Front door and Hall PIR, status OK; SP5 7 I/O Heating and SP5 8 I/O Garden lights are outputs, ON; SP5 9 I/O Living room temperature is a temperature sensor; SP5 6 I/O and SP5 10 I/O are free, with an Assign function link; BELL- Siren and REL Garage gate are outputs, OFF. Further down are group rows for the Garage iO8 expander, Wireless with an RF-S8 receiver, and the Hall and Garage keypads, all Online, each followed by its terminals and Zone settings, Output settings or Sensor settings links.](./protegus-app/sp5-terminals-desktop-content.webp)

### Terminal list

The on-board terminals come first, then a group for each RS485 expander, the wireless devices and each keypad, with its status.

| Setting | What it does | Values |
|---|---|---|
| Add filter | Shows only terminals of the ticked kinds. You can tick several. | Inputs / Outputs / Zones / -- Available terminal -- |
| Terminals → Scan for new devices | Reads the expanders and keypads from the panel again and rebuilds the list. | menu item |
| Terminals → Print list | Prints the terminal list with the panel's Unique ID. | menu item |
| Terminal | The terminal's name. | — |
| Name | The name of the zone, output or sensor on the terminal. Edit it in the cell. **+ Add name** when it has none. | up to 20 characters |
| Type | What the terminal is used for. A second pill shows a sensor that shares the terminal. | Zone, Output, Sensor, Temperature, Voltage, Resistance, Humidity |
| Status | Zone: its state. Output: whether it is on. Otherwise --. | OK, Trouble, Violated, Bypassed; ON, OFF |
| Zone settings | Opens the zone popup (see **Zones**). | link |
| Output settings | Opens the output popup (see **Outputs (PGM)**). | link |
| Sensor settings | Opens the sensor popup (see **Temperature sensors**). | link |
| Assign function | Shown for a free terminal. Opens **Assign terminal function**. | link |

!!! note
    A terminal can have only one function: zone, output or sensor. The exception is a resistance sensor, which can measure a terminal that is also a zone. To reuse a terminal, free it first: **Reset I/O terminal** in the zone or output popup, or **Reset sensor** in the sensor popup.

### Assign terminal function (popup)

The popup offers only the functions the terminal supports. The sensor functions are under **More functions** when a zone or output is also offered. A resistance sensor is assigned on **Temperature sensors**, because it can share a terminal with a zone.

| Setting | What it does | Values |
|---|---|---|
| Zone input | The terminal becomes a detector input. Opens the zone popup on the first free zone. | button **Assign zone input** |
| PGM output | The terminal drives an external device: a relay, lock, gate motor or indicator light. Opens the output popup on the first free output. If an on-board terminal is measured by a sensor, the app first asks to remove it from the sensor. | button **Assign PGM output** |
| Temperature | Measures temperature with an NTC 10K sensor. Opens the sensor popup. | button **Assign temperature input** |
| Voltage | Measures an external DC voltage, 0–12 V **[to confirm: the app also mentions 0–30 V on IO8]**. Opens the sensor popup. | button **Assign voltage input** |

### Which terminals offer which functions

Temperature and voltage on an on-board terminal need a terminal with no zone, output or other sensor.

| Terminal | Zone input | PGM output | Temperature | Voltage |
|---|---|---|---|---|
| SP5 1 I/O … SP5 10 I/O | yes | yes | yes | yes |
| SP5 9 I/O / SP5 10 I/O - 2-wire fire zone | yes | — | — | — |
| BELL- | — | yes | — | — |
| REL | — | yes | — | — |
| RS485 *name* IN (iO, iO-WL, iO-MO, iO-LO) | yes | — | — | — |
| RS485 *name* OUT (iO, iO-WL, iO-MO, iO-LO) | — | yes | — | — |
| RS485 *name* 1W (iO, iO-LO) | — | — | yes | — |
| RS485 *name*, *n* I/O (iO8, iO8-Lora) | yes | yes | — | — |
| Wireless detectors, repeaters, siren and keypad tamper inputs | yes | — | yes, except HEYI devices | yes |
| Crow SH AC plug (… IN and … OUT) | IN | OUT | yes | yes |
| HEYI Smart Socket | — | yes | — | yes |
| Keypad *n* IN | yes | — | — | — |
| Keypad Temperature (keypads with a serial starting 1D) | — | — | yes | — |

## Keypads

Menu **Devices & Interfaces → Keypads**. Lists the keypads on the keypad bus (up to 16), their areas and utility keys, and the settings shared by all keypads.

![Protegus app, SP5 Keypads page in a desktop browser: a Refresh status link, a Scan for new keypads button and two online keypads: Hall keypad, serial 52A1C3F0, areas Home and Garage; Garage keypad, serial 51B20417, area Garage. Each has an Edit link and a bin icon. Below, Global Keypad Parameters: Security & Access with Duress code type Disabled, Lock keypad for 5 min after 5 incorrect codes, ARM without code and 6-digit user code on; Emergency Alarms with Panic Alarm Audible, Medical Alarm Silent and Fire Alarm Audible; Technical Settings with Custom Entry Beep, Enable Fingerprint Support and Do Not Change Charset off.](./protegus-app/sp5-keypads-desktop-content.webp)

### Keypad list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the keypads' online status again. | button |
| Scan for new keypads | Reads the keypads connected to the keypad bus and updates the list. | button |
| Status | The keypad's live state. | Online, Lost, Alarm, Unknown, N/A |
| Name | The keypad's name, used by the app only. Edit it in the cell. | up to 20 characters |
| Serial | The keypad's serial number. The first two characters identify the model (see **Keypad serial prefixes**). | 8 hex characters |
| Assign area | The areas the keypad controls. | enabled areas: up to 2 on keypads with a serial starting 51 or 1E, up to 16 on others |
| Edit | Opens the keypad popup. | link |
| (bin icon) | Removes the keypad at once, without asking. The zone on its input is reset, and its temperature sensor is reset and unlinked from thermostats. | button |

### Keypad popup

Opens from **Edit**. The header shows the keypad's name and serial.

| Setting | What it does | Values |
|---|---|---|
| Name | The keypad's name. Required. | up to 20 characters |
| Assign area | As in the list. | as in the list |
| Utility key 1 | On keypads with a serial starting 1D, 1B or 52, it switches an output like keys 2–6. On all other keypads it shows **Area status (fixed)** and can't be changed. | Not assigned, or an output |
| Utility key 2 … Utility key 6 | Each key switches one output. Only outputs with the **Remote control** definition are listed, with their terminal. | Not assigned, or an output |

### Security & Access

Under **Global Keypad Parameters**: these settings apply to all connected keypads.

| Setting | What it does | Values |
|---|---|---|
| Duress code type | How a user forms a duress code: their own code with the last digit one higher, or with 0 instead of the first digit. The panel then reports a **Duress alarm**. | Disabled / Higher last digit / Zero instead of first digit |
| Lock keypad for … min, after … incorrect codes. | Locks the keypad for this long after this many wrong codes. | 0–99 min; 0–20 codes |
| ARM without code | Users can arm without entering a code. | on / off |
| 6-digit user code | User codes have 6 digits; off, 4 digits. The **Keypad code** of each user follows this. | on / off |

### Emergency Alarms

How the system reacts to the emergency key combinations on a keypad.

| Setting | What it does | Values |
|---|---|---|
| Panic Alarm | **Audible**: reports the alarm and sounds the siren. **Silent**: reports without sound. **Disabled**: the keys do nothing. | Disabled / Silent / Audible |
| Medical Alarm | As **Panic Alarm**, for the medical keys. | Disabled / Silent / Audible |
| Fire Alarm | As **Panic Alarm**, for the fire keys. | Disabled / Silent / Audible |

### Technical Settings

| Setting | What it does | Values |
|---|---|---|
| Custom Entry Beep | **[to confirm: meaning not yet described]** | on / off |
| Enable Fingerprint Support | **[to confirm: meaning not yet described]** | on / off |
| Do Not Change Charset | **[to confirm: meaning not yet described]** | on / off |

### Keypad serial prefixes

The app shows only a keypad's serial; the first two characters decide what it allows. **[to confirm: the model names for each prefix]**

| Serial starts with | Keypad | Areas | Utility key 1 | Zone types on its input |
|---|---|---|---|---|
| 1D | K32LCD; also has a temperature sensor (**Keypad Temperature**) | up to 16 | free | NO, NC, EOL, EOL_T |
| 1B | TM50, TM70 | up to 16 | free | NO, NC, EOL |
| 52 | FLEXi LCD Button | up to 16 | free | NO, NC, EOL, EOL_T |
| 1E | Protegus 32LED | up to 2 | Area status (fixed) | NO, NC, EOL, EOL_T |
| 51 | FLEXi LED Button | up to 2 | Area status (fixed) | NO, NC, EOL, EOL_T |
| 11, 12, 13, 14, 1C, 1F | K636, K10V(H), K32LED, K32+LED, K35, Protegus 16LED | up to 16 | Area status (fixed) | NO, NC, EOL |
| other 1… and 5… | other keypads | up to 16 | Area status (fixed) | NO, NC, EOL |
| 20, 21, 3B | Crow CR16 Icon, Crow CR-LCD, RTX3 transceiver | up to 16 | Area status (fixed) | no zone input |

## Expanders

Menu **Devices & Interfaces → Expanders**. Lists the modules on the RS485 bus: input/output expanders, wireless receivers and communicators. The panel recognises connected modules; add them to the list with a scan.

![Protegus app, SP5 Expanders page in a desktop browser: a Refresh status link, an Expanders button with a drop-down arrow, and two online modules. ID 1, iO8 expander named Garage iO8, serial 0A1B2C, firmware 1.04, 13.7 V. ID 2, RF-S8 named Wireless receiver, serial 1B7C40, firmware 1.02, 13.6 V. RSSI is N/A for both. Each row has a bin icon.](./protegus-app/sp5-expanders-desktop-content.webp)

### Expander list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the modules' status, signal and supply voltage again. | button |
| Expanders → Scan for new expanders | Reads the RS485 modules the panel has detected. | menu item |
| Expanders → Add manually | Opens **Add manually**. | menu item |
| Status | The module's live state. | Online, Lost, Alarm, Unknown, N/A |
| ID | The module's RS485 address. | 1–64 |
| Type | The module type. | see **RS485 module types** |
| Name | The module's name. Edit it in the cell. | up to 24 characters |
| Serial number | The module's serial number. | hex |
| Firmware | The module's firmware version. | — |
| RSSI, % | Signal strength of radio modules. | 1–100 %, or N/A |
| Voltage, V | The module's supply voltage. | volts |
| (bin icon) | Removes the module at once, without asking. | button |

### Add manually (popup)

Use it only when the scan does not find a module. A module added here connects over RS485 once registered. Button: **Add expander**.

| Setting | What it does | Values |
|---|---|---|
| Device type | The module type. Required. RF-Lora, RF-SH, RF-S8, T16 communicator and T16v2 communicator can be added only once per system. | iO-LO expander, iO8 expander, T16 communicator, RF-Lora, RF-SH, iO8-Lora expander, PB-Lora, T16v2 communicator, RF-S8 |
| Serial number | Printed on the device label. Required. | hex, e.g. A3F012 **[to confirm: the app accepts up to 16 characters; the panel uses 6 hex characters]** |
| Name | The module's name. If left empty, the slot keeps its current name. | up to 24 characters |

### RS485 module types

Modules marked "—" under **Add manually** are recognised when the panel reports them. Other module types the panel may report are shown by name only. **[to confirm: which modules are supported with SP5 firmware 1.00]**

| Type shown | Add manually | Once per system | Terminals it adds |
|---|---|---|---|
| iO-LO expander | yes | — | 1 input (IN), 1 output (OUT), 1 temperature input (1W) |
| iO expander | — | — | IN, OUT, 1W |
| iO-WL radio expander | — | — | IN, OUT |
| iO-MO expander | — | — | IN, OUT |
| iO8 expander | yes | — | 8 I/O, each a zone or an output; ATZ possible |
| iO8-Lora expander | yes | — | as iO8 expander |
| RF-Lora | yes | yes | none; enables **Wireless** |
| RF-Lora_PIN | — | — | none; enables **Wireless** |
| RF-SH | yes | yes | none; enables **Wireless** |
| RF-SH_PIN | — | — | none; enables **Wireless** |
| RF-S8 | yes | yes | none; enables **Wireless** |
| T16 communicator | yes | yes | none |
| T16v2 communicator | yes | yes | none |
| PB-Lora | yes | — | none |

## Wireless

Menu **Devices & Interfaces → Wireless** (page heading **Wireless devices**). Lists the wireless devices learned by the panel, up to 42. The page works only with a wireless receiver on the RS485 bus (RF-Lora, RF-SH, RF-S8, RF-SH_PIN or RF-Lora_PIN); without one it shows **There is no wireless sensor receiver in the system**.

![Protegus app, SP5 Wireless devices page in a desktop browser: a Refresh status link, a gear button, a Scan for new devices button and four online devices, each with a zone. 1 Magnet Wireless LV, Terrace door, area Home, 86 %, 3.1 V. 2 VIP Wireless LV, Living room PIR, area Home, 72 %, 3.05 V. 3 Siren Wireless LV, Outdoor siren tamper, areas Home and Garage, 64 %, 3.2 V. 4 Smart Water leakage sensor, Boiler room leak, area Home, 78 %, 2.9 V. Each row shows a serial number, a device picture and an Edit link.](./protegus-app/sp5-wireless-desktop-content.webp)

### Wireless device list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the devices' status, signal and battery again. | button |
| (gear icon) | Opens **Wireless settings**. | button |
| Scan for new devices | Puts the panel into learning mode to add devices. | button |
| Status | The device's live state. | Online, Lost, Alarm, Unknown, N/A |
| ID | The device's number, used in its terminal name (e.g. Magnet Wireless LV ID1). | number |
| Type | The device model. | see **Receivers and device families** |
| Name | The name of the zone or output assigned to the device. Edit it in the cell. | text |
| Serial number | The device's serial number. | — |
| Assign area | The areas of the device's zone and output. | read-only |
| RSSI, % | Signal strength. | 1–100 %, or N/A |
| Battery, V | Battery voltage. | volts, or N/A |
| Edit | Opens **Configuration**. | link |

### Wireless settings (popup)

| Setting | What it does | Values |
|---|---|---|
| Sensor lost after | A wireless device that sends nothing for this long is reported lost. Applies to all wireless devices. Whether a lost device blocks arming is set in **System options → Arming Restrictions**. | 1–2880 min |

### Scan for new devices (popup)

The panel listens for new devices. Press the device's pairing key as its instructions say, until its green light stays on for 2 seconds. All areas must be disarmed and the system must have no faults.

| Setting | What it does | Values |
|---|---|---|
| Status: Scanning | Devices found appear in the list, marked **NEW** (learned now) or **CONFIGURED** (already registered). | — |
| Scanning time | The time since learning started. | m:ss |
| Done | Stops learning and shows the result. Closing the popup also stops learning. | button |
| Scan Complete: … New Device(s) Added | The devices that were paired. Click a device to open its **Configuration**. | list |

When a device is learned, the app sets it up:

- A detector or siren gets the first free zone that is not a Fire zone. The definition is **24 Hour** for Maximum Security and HEYI devices, **Fire** for Crow smoke detectors and **Instant** for other Crow devices. The zone gets area 1 if it had none.
- The HEYI Smart Socket and Crow SH AC plug get the first free output with the **Remote control** definition.
- Keyfobs get area 1 and user 1. The HEYI Smart SOS button also gets **Key 4 action** set to **Panic**.

### Configuration: zone

Opens from **Edit**, or from a device in the scan result. The header shows the device type, serial number, signal and battery. Which sections appear depends on the device. **Delete Sensor** at the bottom removes the device, resets its zone and releases its output.

| Setting | What it does | Values |
|---|---|---|
| Name | The name of the device's zone. Required. | up to 23 characters |
| Assign area | The zone's areas. **+ Add new area** opens **Add areas**. | enabled areas |
| Definition | The zone definition (see **Zones**). | 12 definitions |
| Delay | The zone's response time, as on **Zones**. | 0–9999 milliseconds |
| Zone Behavior | The same settings as **Zone Behavior** on **Zones**. **Type** and **Intelli zone** are set on the Zones page only. | as on Zones |

### Configuration: output

For the HEYI Smart Socket and the Crow SH AC plug. The settings work as in the output popup (see **Outputs (PGM)**).

| Setting | What it does | Values |
|---|---|---|
| Name | The output's name. Required. | up to 23 characters |
| Assign area | Shown for the siren, **System state**, **Flash** and **Strobe** definitions. | enabled areas |
| Definition | What drives the output. | 11 definitions |
| Mode | **Level** or **Pulse**. Shown for **Remote control** only. Same as **Type** in the output popup. | Level / Pulse |
| Pulse time | How long a pulse lasts. Shown for **Pulse**. | 0–9999 s |
| Need code in Keypad | See **Outputs (PGM)**. Shown for **Remote control** only. | on / off |
| CMS (Central monitoring station) | Under **Output Behavior**. Reports the output switching on and off to the CMS. | on / off |
| Protegus2 | Under **Output Behavior**. Reports it to Protegus2. | on / off |

### Configuration: area, user and keys

For sirens, keyfobs, the HEYI Smart SOS button and the Crow wireless keypad.

| Setting | What it does | Values |
|---|---|---|
| Assign area | Sirens: the areas the siren serves (several). Keyfobs, SOS button and wireless keypad: the one area they arm and disarm. | enabled areas |
| Assigned user | Keyfobs only. Events from the keyfob are logged as this user. | None, or an enabled user |
| Key 3 action | Keyfobs, except the HEYI Smart SOS button: what key 3 does. | see the list below |
| Key 4 action | Keyfobs: what key 4 does. Fixed to **Panic** on the HEYI Smart SOS button. | see the list below |

Key actions: **None**; **Disarm**, **Arm**, **Stay** and **Sleep** for each enabled area; **Panic**; **Silent panic**; **Output level:** and **Output pulse:** for each output with the **Remote control** definition. **[to confirm: whether Output level toggles the output on and off]**

### Device settings

For Maximum Security detectors and sirens only. Each setting appears only on models that have it. At 0 a slider shows **Disabled**. If the device's DIP switch 2 is off, the app shows a warning and the settings are greyed out; set the switch to ON to configure the device.

| Setting | What it does | Values |
|---|---|---|
| Enable LED | Turns the detector's LED on or off. | on / off |
| Sleep time | **[to confirm: meaning and unit]** | 0–9999 s |
| PIR1 sensitivity | Sensitivity of the first PIR sensor. | 0–20 |
| PIR1 pulses count | How many pulses the first PIR sensor counts before an alarm. | 0–10 |
| PIR2 sensitivity | Sensitivity of the second PIR sensor, on dual-PIR models. | 0–20 |
| PIR2 pulses count | How many pulses the second PIR sensor counts before an alarm. | 0–10 |
| Sensitivity | Sensitivity of the Vibration LV detector. | 0–20 |
| Microwave sensitivity | Sensitivity of the microwave sensor, on models that have one. | 0–20 |
| Microwave pulses count | How many pulses the microwave sensor counts before an alarm. | 0–20 |
| Antimask sensitivity | Sensitivity of the anti-masking function. | 0–10 |
| Siren soundness | Siren loudness (Siren, Siren Wireless LV). | 0–4 |

### Receivers and device families

**[to confirm: which device families are supported with SP5; the RF-SH family is not yet confirmed for SP5]**

| Receiver | Device family | Devices |
|---|---|---|
| RF-Lora, RF-Lora_PIN | Maximum Security | Curtain Pir, Curtain Pir mini, Magnet, VIP PIR, Curtain Slim, Curtain Pro Pir, GUARD, Corner Pir, OUT Smart PIR, Curtain Pro MW Pir, Flood, Smoke, Curtain Wireless LV, Curtain Wireless mini LV, Magnet Wireless LV, VIP Wireless LV, Curtain Slim Wireless LV, Corner AM LV, Guard Wireless LV, Corner Wireless LV, Flood Wireless LV, Vibration LV, Remote control, Remote control LV, Siren, Siren Wireless LV |
| RF-S8 | HEYI | Smart Keyfob, Smart SOS button, Smart Door/Window sensor, Smart PIR detector, Smart Smoke detector, Smart Water leakage sensor, Smart Indoor siren, Smart Outdoor siren, Smart Vibration detector, Smart Socket, Smart PET PIR detector, Smart Curtain PIR detector, Smart Repeater |
| RF-SH, RF-SH_PIN | Crow / ShockSensor (SH) | PIR detector, Magnetic contact, Smoke detector, Glass detector, Flood detector, Vibration detector, SH Magnetic Gate, SH Smoke and heat detector, Smoke SFW2, SH Smoke H, SH Emergency button, SH PIR2, SH Siren2, Siren, ShockSensor siren, SH AC plug, Keyfob, Wireless keypad, SH Repeater |

## Temperature sensors

Menu **Devices & Interfaces → Temperature sensors**. Lists up to 20 sensors measuring temperature, voltage or resistance, with their alarm limits. A temperature sensor can also drive a thermostat.

![Protegus app, SP5 Temperature sensors page in a desktop browser: a Refresh status link, a + Add button and two sensors with status Ok. Living room temperature, type Temperature (zone), 21.5 °C, assigned to SP5 9 I/O. Hall PIR temperature, type Wireless Living room PIR, 22.0 °C, assigned to VIP Wireless LV ID2. Each row has an Edit link.](./protegus-app/sp5-sensors-desktop-content.webp)

### Sensor list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the live readings again. | button |
| + Add | Opens the sensor popup on the first free sensor. | button |
| Status | The sensor's state. **Alarm**: the reading is outside the limits. | Ok, Lost, Alarm, Unknown, N/A |
| Name | The sensor's name. Edit it in the cell. | up to 23 characters |
| Type | The sensor's source. | Temperature (zone), Voltage (IN), Resistance (IN), RS485 *expander name*, Wireless *zone name*, Keypad *keypad name* |
| Live Reading | The current value. | °C, V, Ω or %; -- if none |
| Assigned to | The terminal or device measured. | terminal name, or N/A |
| Edit | Opens the sensor popup. | link |

### Sensor (popup)

**Reset sensor** at the bottom clears the sensor and unlinks it from its thermostat.

| Setting | What it does | Values |
|---|---|---|
| Type | What the sensor measures. Changing it clears **Terminal**. | Temperature / Voltage / Resistance |
| Name | The sensor's name. Required. | up to 23 characters |
| Terminal | The source to measure. A source used by another sensor is not listed. | Disabled, or a free source (see **Sensor sources**) |
| Assign thermostat | Makes this sensor the trigger of a thermostat. | Disabled, or a thermostat |
| Min | The lower limit. | one decimal **[to confirm: the unit for voltage and resistance sensors; the app shows °C for every type]** |
| Notify when below | Alarm when the value falls below **Min**. | on / off |
| Max | The upper limit. | one decimal |
| Notify when above | Alarm when the value rises above **Max**. | on / off |
| Delay | The delay before the alarm. | 0 min or more |
| B Constant | The NTC thermistor's B constant, usually 3950 or 4000. Shown for **Temperature (zone)** only. | whole number |
| NTC R0 | The NTC thermistor's nominal resistance, e.g. 10000 or 4700. Shown for **Temperature (zone)** only. | Ω, in steps of 100 |

### Sensor sources

| Source | Name in the Terminal list | Type | Condition |
|---|---|---|---|
| On-board IO1–IO10, NTC 10K thermistor | Temperature (zone) - IN *n* | Temperature | The terminal is not a zone or an output |
| On-board IO1–IO10, voltage | Voltage (IN) - IN *n* | Voltage | The terminal is not a zone or an output |
| On-board IO1–IO10, resistance | Resistance (IN) - IN *n* | Resistance | The terminal is not an output; it can also be a zone |
| iO or iO-LO expander, 1-Wire input | RS485 *expander name* | Temperature | The expander is connected |
| Wireless device | Wireless Temperature - ID *n* | Temperature | Devices other than HEYI |
| Wireless device | Wireless Voltage - ID *n* | Voltage | Any wireless device |
| Keypad with a serial starting 1D | Keypad Temperature - *keypad name* | Temperature | — |

## Thermostats

Menu **Devices & Interfaces → Thermostats**. A thermostat switches an output when a sensor's temperature crosses a threshold. Up to 8 thermostats; only those switched on are listed.

![Protegus app, SP5 Thermostats page in a desktop browser: a Refresh status link, a + Add button and one thermostat: Living room heating, mode Heating, sensor Living room temperature, Target temp. < 21.5 °C, with the Active sensor switch on and an Edit link.](./protegus-app/sp5-thermostats-desktop-content.webp)

### Thermostat list

| Setting | What it does | Values |
|---|---|---|
| Refresh status | Reads the thermostat states again. | button |
| + Add | Opens the thermostat popup on the first free thermostat. | button |
| Name | The thermostat's name. Edit it in the cell. | up to 24 characters |
| Mode | Heating or cooling. | Heating / Cooling |
| Details | The sensor, the target temperature (< for heating, > for cooling) and the output. | — |
| Active sensor | Switches the thermostat on or off. A thermostat switched off leaves the list after the next refresh; open it again with **+ Add**. | on / off |
| Edit | Opens the thermostat popup. | link |

### Thermostat (popup)

**Remove thermostat** at the bottom clears the thermostat. Saving the popup always switches the thermostat on; to switch it off, use **Active sensor** in the list.

| Setting | What it does | Values |
|---|---|---|
| Name | The thermostat's name. Required. | up to 24 characters |
| When | Under **IF**: the sensor that triggers the thermostat. | Not set, or a sensor |
| is below / is above | The threshold temperature. **is below** for Heating, **is above** for Cooling. | °C, one decimal |
| Mode: | Under **THEN**. **Heating**: switches the output on when the temperature falls below the threshold. **Cooling**: when it rises above it. | Heating / Cooling |
| Output: | The output to switch. Only outputs with the **Remote control** or **Thermostat** definition are listed. | Not set, or an output |

## Outputs (PGM)

Outputs have no menu page. The output popup opens from **Terminals**: **Assign function → Assign PGM output** on a free terminal, or **Output settings** on a terminal that already has an output. For a wireless output device (HEYI Smart Socket, Crow SH AC plug), the same settings are in its **Configuration** popup on **Wireless**. The panel has up to 64 outputs.

Terminals that can be outputs: IO1–IO10 (except a 2-wire fire zone), BELL-, REL, the OUT terminal of iO, iO-WL, iO-MO and iO-LO expanders, I/O 1–8 of iO8 and iO8-Lora expanders, the HEYI Smart Socket and the Crow SH AC plug.

### Output popup

The title shows the output's name. **Reset I/O terminal** at the bottom (existing outputs only) frees the terminal. When you add an output, the app sets **Siren**, **Level**, a pulse time of 10, the first enabled area, and **CMS** and **Protegus2** on.

| Setting | What it does | Values |
|---|---|---|
| Name | The output's name. Required. | up to 23 characters |
| Definition | What drives the output. See **Output definitions** below. | 11 definitions |
| Type | **Level**: the output stays on until it is switched off. **Pulse**: it switches off after **Pulse time**. Shown for **Remote control** only; other definitions work as Level. | Level / Pulse |
| Pulse time | How long a pulse lasts. Shown for **Pulse**. | 0–9999 seconds |
| Need code in Keypad | Shown for **Remote control** only. **[to confirm: meaning not yet described]** | on / off |
| Assign area | The areas the output follows. One area for **System state** and **Flash**; several for the sirens and **Strobe**. | enabled areas |
| Report | Turns reporting of this output on or off. Sets both boxes below. | on / off |
| CMS (Central monitoring station) | Reports the output switching on and off to the CMS. | on / off |
| Protegus2 | Reports the output switching on and off to Protegus2. | on / off |

!!! note
    Users, groups, call control, keypad utility keys and keyfob keys can switch only outputs with the **Remote control** definition. Thermostats accept **Remote control** and **Thermostat**. If you change an output's definition, the app removes it from the places where it no longer fits.

### Output definitions

The descriptions follow "FLEXi" SP3 **[to confirm for SP5]**.

| Definition | What it does | Extra settings |
|---|---|---|
| Siren | For a siren. Sounds on alarms in its areas. | Assign area (several) |
| Remote control | For external devices switched by users, by phone call, by keypad utility keys, keyfob keys and thermostats. | Type, Pulse time, Need code in Keypad |
| Fire sensor reset | Resets fire detectors after an alarm. | — |
| System state | Shows whether an area is armed, for example on an indicator LED. | Assign area (one) |
| Flash | On while the area is armed, pulsing when an alarm is triggered, off when disarmed. | Assign area (one) |
| Thermostat | Switched by a thermostat. | — |
| Buzzer | Repeats the keypad's sound signals. | — |
| Fire reset (inverted) | As **Fire sensor reset**, with the output state inverted. | — |
| Siren (security) | A siren for intrusion alarms only. | Assign area (several) |
| Siren (fire) | A siren for fire alarms only. | Assign area (several) |
| Strobe | For a strobe light. | Assign area (several) |

## User list

Menu **Users → User list**. The panel's users: their codes, cards, phone numbers, permissions and SMS notifications. Up to 1000 users, of whom up to 8 can be supervisors. The users are read from the panel when the page opens.

![Protegus app, SP5 User list page in a desktop browser. Summary cards: Total users 4/1000, Supervisors 1/8 with 7 of 8 available, App users 1, Inactive users 1. Below, a search box, a + Add user button, filter chips All, Supervisor, Standard, Temporary and Inactive, and four users. 1 Admin, Supervisor, Code and App, Not assigned, All areas, Active. 2 Sample user 1, Standard, Code and RFID, group Family, All areas, Active. 3 Sample user 2, Temporary, valid until 2026-12-31 14:00, Code, group Cleaning staff, area Home, Active. 4 Sample user 3, Standard, Code, group Family, Inactive. Each row has an Edit link.](./protegus-app/sp5-users-list-desktop-content.webp)

!!! note
    The panel keeps only users who have at least one of a keypad code, an RFID card, a phone number or an email.

### Summary cards

| Field | Shows |
|---|---|
| Total users | Users in the panel, out of 1000. **[to confirm: the specification says 999 users]** |
| Supervisors | Supervisors, out of 8, and how many are still available. |
| App users | Users with an email, connected to Protegus2. |
| Inactive users | Users switched to **Inactive**. |

### User table

| Setting | What it does | Values |
|---|---|---|
| Search | Finds users by name, email or phone number. | text |
| + Add user | Opens the user popup with the lowest free user number. | button |
| All, Supervisor, Standard, Temporary, Inactive | Shows only users of that kind. | one at a time |
| No. | The user number. | 1–1000 |
| Name | The user's name, with their email or phone number, or a note such as **Valid until** a date or **Setup pending** (no code or card yet). | — |
| Profile | The user's profile. **Temporary** when a **Valid until** date is set. | Supervisor / Standard / Temporary |
| Credentials | How the user identifies. **App** means the user has an email. | Code, App, RFID |
| Groups | The user's groups. | group names, or Not assigned |
| Permissions | The areas the user can control; taken from the groups if the user is in any. | area names, or All areas |
| Status | Whether the user is active. | Active / Inactive |
| Edit | Opens the user popup. | link |

### Edit user: General tab

The popup title is **Edit user:** and the user's name. The switch at the top makes the user **Active** or **Inactive**. **Delete user** at the bottom removes the user from the panel at the next **Write**. While a user is in a group, the group's permissions apply and individual permissions are locked on every tab except **SMS reporting**.

| Setting | What it does | Values |
|---|---|---|
| System profile | **Supervisor**: SMS and call control and user management, up to 8 users. **Standard**: access follows the assigned permissions. When you add a user, the app sets **Standard**. | Supervisor - SMS/call & user management / Standard - Regular user |
| Name | The user's name. | up to 51 characters |
| User number | Assigned automatically. **Change number** lets you pick any free number. | 1–1000 |
| Phone number | Used for call control and SMS. | up to 19 characters |
| Email | The user's email for the Protegus2 app. A user with an email counts as an **App** user. | up to 55 characters |
| Keypad code | The user's code for keypads. | 6 digits, or 4 when **6-digit user code** is off (see **Keypads**) |
| RFID / Card number | The number of the user's card or tag. | up to 16 hex characters |

### Edit user: Permissions tab

| Setting | What it does | Values |
|---|---|---|
| Allow arm | Under **Areas**. The user can arm the assigned areas. On for a new user. | on / off |
| Allow disarm | The user can disarm the assigned areas. On for a new user. | on / off |
| Assigned areas | The areas these permissions apply to. | enabled areas |
| Allow control | Under **Outputs**. The user can control outputs. | on / off |
| Assigned outputs | The outputs the user can control. Only outputs with the **Remote control** definition are listed. | outputs |

### Edit user: Groups tab

| Setting | What it does | Values |
|---|---|---|
| Assigned groups | The user's groups. The permissions of all groups combine: if any group allows an action, the user has it. Remove the user from all groups to set permissions individually. | enabled groups, up to 32 |
| Base permissions | The areas and outputs combined from the groups. | read-only |
| Edit groups | Opens **Users → Groups**. The user popup closes **without saving**. | link |

### Edit user: Validity tab

| Setting | What it does | Values |
|---|---|---|
| Limit access to a time period | Off: permanent access. On: the user is active only between the dates below. | on / off |
| Valid from | The start of the user's access. | date and time |
| Valid until | The end of the user's access. The user's profile then shows **Temporary**. | date and time |

### Edit user: Call and SMS tab

| Setting | What it does | Values |
|---|---|---|
| Automatic control targets | Outputs switched automatically when the user calls the panel; needs the user's phone number. With none selected, the panel waits for a DTMF code. Areas can't be controlled this way. | outputs with the Remote control definition |
| Command replies (ACK) | Sends the user an SMS confirming the action after they control the system. | on / off |
| Forward unknown SMS | Supervisors only. Forwards SMS from unknown numbers to this user. | on / off |
| Greeting SMS on new user | Sends a welcome SMS when the user is added. The text is set in **System events → SMS texts → Greeting SMS**. | on / off |

### Edit user: SMS reporting tab

Supervisors only. Choose which events this user receives by SMS. The words used in each SMS are set in **System events → SMS texts**.

| Setting | What it does | Values |
|---|---|---|
| Notify about | One choice for all groups below. **Custom** shows that the items differ; it can't be selected. | All events / Event only / Restore only / None / Custom |
| Zone alarms | **Event** and **Restore** SMS for the zones. **Customize per event** sets them per zone. | on / off |
| PGM / outputs | The same for outputs switching on and off. | on / off |
| System events | The same for system events. Events without a restore show —. | on / off |

## Groups

Menu **Users → Groups**. A group gives the same permissions to several users. Up to 32 groups.

![Protegus app, SP5 Groups page in a desktop browser: a search box, a + Add group button and two groups. Family: All areas, outputs Garage gate and Garden lights, Arm/Disarm and Dial, 2 assigned users. Cleaning staff: Home, Arm/Disarm, 1 assigned user. Each row has an Edit link.](./protegus-app/sp5-users-groups-desktop-content.webp)

### Group list

| Setting | What it does | Values |
|---|---|---|
| Search | Finds groups by name or permissions. | text |
| + Add group | Opens **Add groups**. | button |
| Name | The group's name. | — |
| Permissions summary | The group's areas, outputs, **Arm**/**Disarm** rights and **Dial**. | — |
| Assigned users | How many users are in the group. | number |
| Edit | Opens the group popup. | link |

### Add groups (popup)

| Setting | What it does | Values |
|---|---|---|
| (tick box per group) | Tick a group to enable it. Unticking disables the group but leaves its users assigned; **Delete group** in the group popup removes it from users. | groups 01–32 |

### Edit group: Permissions tab

The popup title is **Edit group:** and the group's name. Enter the **Group name** at the top (up to 23 characters). **Delete group** at the bottom disables the group and removes it from every user, without asking.

| Setting | What it does | Values |
|---|---|---|
| Allow arm | Under **Areas**. Members can arm the assigned areas. | on / off |
| Allow disarm | Members can disarm the assigned areas. | on / off |
| Assigned areas | The areas these permissions apply to. | enabled areas |
| Allow control | Under **Outputs**. Members can control outputs and doors. | on / off |
| Assigned outputs | The outputs members can control. Only outputs with the **Remote control** definition are listed. | outputs |

### Edit group: Validity tab

| Setting | What it does | Values |
|---|---|---|
| Limit access to a time period | Optional, for temporary groups. Off: permanent access. On: members are active only between the dates below. | on / off |
| Valid from | The start of access. A user in several groups gets the earliest start. | date and time |
| Valid until | The end of access. A user in several groups gets the latest end. | date and time |

### Edit group: Call control tab

| Setting | What it does | Values |
|---|---|---|
| Automatic control targets | Outputs switched automatically when a member calls the panel. With none set, the panel answers and waits for a DTMF command. Areas can't be controlled this way. | outputs with the Remote control definition |

## Black list

Menu **Users → Black list**. Phone numbers, emails and RFID cards the panel rejects. Up to 40 entries.

![Protegus app, SP5 Black list page in a desktop browser: a search box, a + Add button with a drop-down arrow and one entry: 01, Phone, +447700900999, with an Edit link.](./protegus-app/sp5-users-blacklist-desktop-content.webp)

### Black list table

| Setting | What it does | Values |
|---|---|---|
| Search | Finds entries by identifier. | text |
| + Add | Adds an entry of the type chosen from its arrow. | Email / Phone / RFID |
| No. | The entry number. | 01–40 |
| Type | The kind of identifier. | Phone / Email / RFID |
| Blocked identifier | The blocked phone number, email or card. | — |
| Edit | Opens the entry popup. | link |

### Add to black list / Edit black list entry (popup)

**Delete entry** at the bottom clears the entry.

| Setting | What it does | Values |
|---|---|---|
| Type | The kind of identifier. The panel checks it against phone numbers, emails and cards in any case; the type only sets how the app shows it. | Phone / Email / RFID |
| Blocked identifier | The phone number, email or card number to block. | up to 35 characters |

## System events

Menu **System events**. Turn each panel event on or off, set its Contact ID code and where it is reported, and edit the words used in SMS messages.

![Protegus app, SP5 System events page in a desktop browser, Events tab: a search box and a table of 37 events, from 01 Low battery with CID code 302 to 37 Zone/door opened with 426. Each event has its Enable event, Report to CMS and Report to Protegus2 switches on, and Add text in the Event text column. An SMS texts tab is next to the Events tab.](./protegus-app/sp5-panel-events-desktop-content.webp)

### Events tab

The events and their codes on a test panel are listed in the appendix of the [installation manual](index.md). These events have no restore: Periodic test, Medical alarm, Panic alarm, Keyswitch Stay, Keyswitch Sleep, Partial Arm, Automatic Arm, STAY arm, SLEEP arm, Remote arm/disarm, Duress alarm and Auto arm failed.

| Setting | What it does | Values |
|---|---|---|
| Search | Finds events by name. | text |
| Number | The event number. | 01–37 |
| Event name | The event. | — |
| CID code | The Contact ID code reported for the event. Edit it in the cell. | 3 hex characters |
| Enable event | Turns the event on or off. | on / off |
| Report to CMS | Reports the event and its restore to the CMS. | on / off |
| Report to Protegus2 | Reports the event and its restore to Protegus2. | on / off |
| Event text | A text for the event. **[to confirm: whether the panel uses this text]** | up to 28 characters |

!!! note
    The **Periodic test** event is the same setting as the **Periodic test** switch on **CMS Reporting**. Which supervisors receive an event by SMS is set in **User list → Edit user → SMS reporting**.

### SMS texts tab

The panel builds every SMS as the system name, an event word and the name of the zone, output, event or user. The name is added automatically, so there is nothing to set per zone or output.

| Setting | What it does | Values |
|---|---|---|
| System name prefix: | The **Object Name** from **System options**, added to every SMS. **Not set** if it is empty. | read-only |
| Zone alarm | The word for a zone alarm, followed by the zone's name. | up to 23 characters |
| Zone restore | The word for a zone restore, followed by the zone's name. | up to 23 characters |
| Output turned on | The word for an output switching on, followed by the output's name. | up to 23 characters |
| Output turned off | The word for an output switching off, followed by the output's name. | up to 23 characters |
| Event | The word for a system event, followed by the event's name. | up to 23 characters |
| Event restore | The word for a system event restore, followed by the event's name. | up to 23 characters |
| Disarm | The word for disarming, followed by the user's name. | up to 23 characters |
| Arm | The word for arming, followed by the user's name. | up to 23 characters |
| Greeting SMS | One message for the whole system, sent once to a new user if **Greeting SMS on new user** is on for them. No name is added. | up to 63 characters |
