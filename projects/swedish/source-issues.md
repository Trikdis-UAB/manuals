# Problems in the English pages found while translating

Translators translate what the English says and list problems here; the English page is fixed
separately (then the Swedish follows). Fixed items are struck through with the date.

## Fixed

- ~~GET, GT, GT+: "chapter 1.6 LED indication of operation" points at Purpose of terminals; LED
  indication is 1.7.~~ Fixed 2026-11-27 in EN and SV.

## Open

### Facts or meaning (worth fixing)

- **DSC Neo quick setup, step 3:** says "Select security company"; the screenshot shows
  "Select the monitoring station" (Station 1 / Station 2). Swedish follows the screen.
- **DSC Neo quick setup, step 14:** "Choose PGM Output", screen label is **Assigned Output**.
- **DSC Neo quick setup, keypad table:** row `311` / `003*##`: unclear whether 003 is an option
  inside 311; row `001` under 310 has no description; `<1234##` has a stray `<`.
- **DSC Neo quick setup:** every step image's alt text is "Add new system" and the wiring
  image's alt is a Lithuanian file name (Swedish has real descriptions now). Same on the DSC PC
  and Paradox quick setups.
- ~~GT and GT+ status bar "BL = Browser version"~~: fixed 2026-11-27 to "Bootloader version" as on GET.
- **GT+ vs GET, needs a colleague's check:** (2) keyswitch note says untick **Remote Arm/Disarm** in
  "System settings" on GT+, "Panel settings" on GET (where the setting is); (3) Honeywell Vista
  keys: GT+ `[*][2][9][1][*]` and `[*][1][8][9][1][*]`, GET `[*][2][9][1][#]` and
  `[*][1][8][9][1][1][#]`. One page is wrong; keypad entries, so verify against Honeywell.
- **GT+:** steps headed "In 'SIM card' window" show the Network settings window (SIM1 tab);
  quick-config lists DNS twice (items 3 and 4); "USB-С" has a Cyrillic С; image6 alt says "GT case".
- **GATOR:** SMS command table says "UUSD"; should be USSD. DTMF example "turn on input 4 for
  pulse time" probably means output.
- **GATOR:** "Adding users on your phone" table has an empty second column; steps or images look
  lost in conversion.
- **GATOR WiFi:** "Unique ID (MAC)" in the text, Unique ID/IMEI in the screenshot and on GATOR.
  Specifications table has a Lithuanian leftover "1 vnt.". Terminal 2 I/O factory setting reads
  "input. NO".
- **GATOR LTE / WiFi with iO4R:** wiring diagram labels power "AC/+DC", "AC/-DC"; the note says
  use +DC and -DC.
- **iO-8:** link text "iO-8 page on trikdis.com" points at the site root. Compatibility list says
  "GATOR Cellular" while the iO4R page says GATOR LTE.
- **GET:** "MCC and MNS codes" should be MNC. Honeywell step has an unbalanced bracket
  "installer code 4][1][1][2]". "SUR-GARD" and "SUR-GUARD" both used.
- **Paradox quick setup, tip:** "YEl/GRN".

### Typos and form only

- GATOR: "bellow", "enabed", "boxed is ticked". GATOR WiFi: "Protegus2service", "Protegus2app",
  "Protegus2will", "enabed". GET: "Check 'Use DHCP' the box"; mixed quote glyphs („…“, “…”);
  zero-width spaces after "/" in tables. iO-8 step 8: broken bold `**Write [F5**]`.
- Numbered lists that restart mid-procedure (GATOR, GATOR WiFi) render oddly in every language.

### Wave 2 (2026-11-27)

- **Keypads, SK-LCD TouchPad / FLEXi SK LCD:** "Make sure all areas are not damaged" (likely "no zone is
  violated", as on the LED pages); BYPASS deactivation says "Repeat the same actions as in deactivation"
  (activation meant); key 1 is "Panic" here but "Police" on the other three pages; administrator code
  123456 here vs master code 1234 on the LED TouchPad, not explained.
- **Keypads, LED pages:** "Exit the premises within time delayed"; heading "Entering or changing / User or
  Master codes" has a stray slash.
- **🔴 Honeywell Vista wiring, needs a colleague (Jaroslav):** the tables and drawings disagree on two
  pages. GT+ quick setup: table CLK/DATA → 7/8, drawing CLK → 7, DATA → 6. E16 quick setup: table
  CLK → 6, DATA → 7, drawing CLK → 7, DATA → 6. Both drawings agree with each other. Swedish follows
  the English tables for now; fix English and Swedish together once confirmed.
  Evidence (2026-11-28): Honeywell's own wiring is 4 = ground, 5 = +12 V AUX, 6 = Data In (green),
  7 = Data Out (yellow), and all five main manuals (GET, GT, GT+, G16, E16) draw 7 → CLK, 6 → DATA,
  so the quick-setup tables look wrong (GT+ even names terminal 8). Asked Vytautas and Igoris by
  email 2026-11-28 ("Honeywell Vista: CLK ir DATA gnybtai greito paruošimo puslapiuose").
- **Texecom, Inner Range Inception and Integriti quick setups (GT+):** the wiring diagrams label the
  communicator "E16"; Inception's diagram has Lithuanian wire labels (Juodas, Žalias, Baltas laidas);
  steps 4–6 have no screenshots and other steps borrow the DSC PC images (system name "GT+ DSC").
- **Interlogix NX quick setups:** LED table header says "LCD keypad" over LED states; "section 3" and
  "Segment 3" for the same thing.
- **T16:** path "Reports → Inputs" but the screen is Events → Inputs; "First test delay" vs screen
  "First test after"; "Main Setting" vs "MainSetting"; typos "Contract ID", "eternal circuits",
  "settins", "DHPC"; Cyrillic "к" in "кΩ" in the specifications; "Master key" and "Main key" for the
  same key.
- **LoRa/RF expanders:** RF-LoRa called "Wireless Expander" in the title, "transceiver" in the body;
  DIP switch named SW1 / SW / SW2 inconsistently (iO-LORA, iO8-LORA, RF-LoRa); RF-S8 "Radio signal
  strength 25 mW" is transmit power; RF-S8 firmware steps say "according to the diagram" with no
  diagram; PB-LoRa LED table rows mismatched; "enrolled / unlinked / unpaired / registered" used for
  the same thing.
- ~~"SUR-GUARD" in prose on GET, GT, GT+, G16, FireCom~~: fixed 2026-11-27 to SUR-GARD (EN and SV).
- ~~E16: "chapter 1.5 LED indication" (is 1.6), "chapter 6.6 RS485 modules" (is 6.7), BL "Browser
  version"~~: fixed 2026-11-27 in EN and SV.
- **E16:** status bar table lists "Status" twice (second should be State, as on GET); IN/OUT text says
  modes "(Off, IN, OUT)", the screen says Disabled; CMS reporting "Settings" tab shows a "Receiver and
  line number" row the text doesn't describe.
- ~~G16: link text "[1.6]" to LED indication (is 1.7); "CSP" for CMS (twice); E485 called a "WiFi
  module"~~: fixed 2026-11-27 in EN and SV.
- **G16:** step 1 "Select Panel type", screen says Security panel model; SMS CONNECT table's last three
  rows are shifted by one; Object ID is 4 characters on G16 but 6 on GT+ (check which is right).
- **RR-IP12:** "Fig. 2. General view" caption with no image; "Applied currency" (current), "capacitance"
  (capacity). **RFH11:** "Milcol-D" and "Milcold-D"; Attachment A example differs from R11's. **R11:**
  "1234 = object number (8191)" doesn't match.
- ~~FireCom: "FIREMCOM" in the description; "chapter 1.4 LED indication" (is 1.5)~~: fixed 2026-11-27
  in EN and SV.
- **FireCom:** LED table "Overvoltage0"; "bellow 9,5 V"; "the panel will switch to the backup battery"
  means the communicator; Cyrillic "е" in "slavе address" (NSC); INIM note swallows the next steps'
  heading; C-TEC steps 8 and 9 both "enter the system name"; "Polon-AlfA 3000"; "SIA-DC09" / "DC- 09".
- **RL14:** "Sugard MRL-DG" vs "Surgard MLR2-DG"; "TCP/UPD"; step 8 refers to a non-existent "item A";
  Power LED blue in step 11 but green in the table; "110-220 V" vs spec 100–240 V; default IP
  192.168.100.3 in text, 192.168.1.58 on the screenshot; event table E752/R752 empty, ☑/☒ artefacts;
  SIM slot "image not available in digital version".
- **RTH2:** supported OS only up to Windows 7; GProg2 download at trikdis.com in one place, trikdis.lt
  in another; Annex A "concentrator" undefined.
- **IPcom:** "IPCom", "IPcom" and footer "IPCCw Build" mixed; RL25 capacity "50,000 per 1 GB RAM";
  `token_time` range "1..5,256,000" easy to misread.
- ~~SP3: "chapter 1.2 List of compatible modules" (is 1.3), "chapter 1.4 LED indication" (is 1.5);
  E16T: BL "Browser version", "TrikgisConfig"~~: fixed 2026-11-28 in EN (SV was written correct).
- **E16T:** "chapter 6.4 User reporting window" points at the wrong window (Protegus settings are in
  7.3 Reporting; SV says 7.3); Protegus screenshot reused from the cellular page (Unique ID/IMEI) while
  the step asks for the MAC; screenshot callout numbers don't match the steps; "Encription enabled"
  label typo (in the software?).
- **SP3:** time zone example "Lithuania, +2"; "PIN card of the SIM card"; Cyrillic letters in
  "SP3_хх7х", "ТМ50", "mА", "сontrol panel"; "iO-MO" vs "iO-MOD"; area names "Sritis 1/2" in a
  screenshot.
- **SP3 Paradox user guide:** broken heading structure (stray headings "### **Name**", "### 1[partition
  no][#]", empty "Viewing partition statuses"); TRB vs TBL; duplicated "(PGM table)" text; "must me
  enabled"; control codes "four digits" vs 6-digit admin code; `3[output no][#][stay no]` probably
  [state]; SETN row duplicated; "keyboard indicator ARM".
- **SP3 RTX3:** steps 9/13 repeat; "Partition" in text vs "Area" on screen; "console" for remote.
- **SP3 add S8/S9:** title says S8/S9, page covers S8 only.
- ~~G17F: "chapter 1.4 LED indication" (is 1.5)~~: fixed 2026-11-28 in EN (SV written correct).
- **G17F:** POWER LED "green blinking = voltage sufficient" in the table, but the text says green solid;
  Users tab shows FWD, alt texts say FW; text lists a PGM column the screen doesn't have; "SAI E" for
  SIA E; alt texts say "G16 casing" (image5) and "CG17" (image13); a note mentions "NETWORK yellow
  solid", not in the LED table.
- ~~G16T: "chapter 1.5 LED indication" (is 1.6), BL "Browser version", E485 "WiFi module", "CSP", E485
  note says W485~~: fixed 2026-11-28 in EN (SV written correct).
- **G16T:** "DC-09 obj. No." vs screen "Object ID in DC-09"; event summary lists IN_ALARM/IN_TAMPER,
  screen IN1_/IN2_; SMS example OUTPUT2 on a one-output device; `CP=` description contradicts its
  example; "G16_3M10" probably G16T_3M10; status bar second "Status" is State on screen.
- ~~CG17: "see 3.10" fuel sensor (is 3.12), "chapter 5.5 Setting parameters remotely" (is 5.4), E485
  "WiFi module"~~: fixed 2026-11-28 in EN (SV written correct).
- **CG17:** window names differ from screen ("System option" → System Options, "User reporting" →
  Users & Reporting, "Sensor window" → Sensors, "Cloud application" tab is a group); SMS table cells
  shifted (PULSE, TXTE, RDR, CONNECT/SETHx); signal level 3 in the LED table vs 5 in Testing;
  "Strela RS485" / "STRELA S485", "RH-SH" (RF-SH); empty "Components" list and "Contents" heading.
