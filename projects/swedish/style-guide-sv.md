# Style-guide-SV.md: how TRIKDIS manuals are written in Swedish

**Status:** draft for native review, written 2026-11-27. Companion file: `glossary-sv.md` (terms, with evidence).

**Where the rules come from.** The five Swedish manuals from Teletec (DSC PowerSeries Neo installation guide, PC1616/1864 installation guide and user manual, Power864/PC5020 install and programming manuals), plus standard Swedish technical-writing practice where the samples are silent or inconsistent. Where the samples contradict current Swedish standards (they write "5,6KΩ" and "700mA" without a space), we follow the standard, not the samples. Rules marked **(sample)** are confirmed by the samples; the rest are standard practice for a reviewer to check.

---

## 1. Register and form of address

- **Steps are imperative, no pronoun.** *Anslut batteriet. Tryck på **Write [F5]**.* This is how all five samples write instructions.
- **Explanatory sentences may use "du".** The Neo guide (Teletec's own and newest text) uses *du* about 90 times and *ni* 3 times **(sample)**. Use *du*, lower case, sparingly: *Innan du installerar enheten ...*. Never *ni*.
- **Describe the product impersonally.** *Larmsändaren skickar ...*, *Enheten kan anslutas till ...*. Older DSC texts use *man* (*genom att man slår in ...*); avoid it, rewrite as imperative or passive.
- **Tone:** plain and factual. No marketing adjectives, no exclamation marks except in the *OBS!* label. Short sentences; one instruction per step.
- **Do not translate word for word.** English "The communicator is connected to the keypad bus" is *Larmsändaren är ansluten till knappsatsbussen*. If a sentence is hard to read in Swedish, rewrite it; do not mirror English passive stacks.
- **Gender-neutral nouns for people:** *installatör*, *användare*, *administratör*.

## 2. Instruction verbs

| Action | Swedish | Example (own wording) |
|---|---|---|
| Click a button, link or menu item in software | **Klicka på** | *Klicka på **Read [F4]**.* |
| Press a physical button or a keypad key | **Tryck på** | *Tryck på knappen på enhetens sida.* |
| Choose from a list | **Välj** | *Välj **Protocol**.* |
| Type or set a value | **Ange** | *Ange den sexsiffriga koden.* |
| Tick a check box | **Markera** (kryssrutan) | *Markera **Enable cloud service**.* |
| Untick | **Avmarkera** | |
| Turn a feature on / off in software | **Aktivera** / **avaktivera** | |
| Switch a device on / off | **Slå på** / **stäng av** | |
| Check a condition | **Kontrollera att** | |
| Connect / disconnect a wire, cable | **Anslut** / **koppla bort** | |

Numbered steps stay numbered (Markdown `1.` lists). Keep the structure of the English page: same step order, same number of steps, so that screenshots and cross-references still match.

## 3. Notes, warnings, and admonitions

Samples introduce notes in running text with **OBS!** (capitals, exclamation mark) and use *Varning*, *Viktigt*, *Tips* for the rest **(sample: OBS! 34 times in the Neo guide)**.

Our Markdown syntax does not change, only the content:

- `!!! note "Title"`, `!!! warning "Title"`, `!!! caution "Title"`, `!!! tip "Title"`: keep the keyword, **translate the quoted title**, exactly as the Lithuanian and Spanish pages do (`!!! note "Pastaba"`, `!!! note "Nota"`).
- `> [!NOTE]`, `> [!WARNING]` and the other callout types: keep as is, translate only the text under them.

Suggested titles (no sample uses a boxed title, so the last two need a native check):

| Syntax | English title | Swedish title |
|---|---|---|
| `note` | Note | **Obs!** |
| `important` / `warning "Important"` | Important | **Viktigt** |
| `warning` | Warning | **Varning** |
| `caution` | Caution | **Försiktighet** |
| `tip` | Tip | **Tips** |

Inside the box write full sentences without repeating the label (no *OBS! OBS!*). **To check at first build:** the `> [!NOTE]` callout extension generates its heading in English; Lithuanian and Spanish pages have the same behaviour, so check how it renders before deciding anything.

## 4. Numbers, units, dates

- **Decimal separator is a comma:** *5,6 kΩ*, *0,5 mm²*, *11,5 V*. Not a point. Samples agree on the comma **(sample)**.
- **Thousands:** non-breaking space, *1 000 händelser*, *2 400 baud*. No separator inside four-digit numbers if the English page has none (years, ports: *port 8080*).
- **Space between number and unit:** *12 V*, *100 mA*, *5,6 kΩ*, *50 °C*, *850 MHz*, *92 x 62 x 25 mm* (use the multiplication sign ×). The samples write *700mA*, *5,6KΩ*, *16-18V AC*; that is sloppy and we do not copy it.
- **Prefixes and symbols:** *kΩ* with a small k; *V DC* and *V AC* (with a space) or *DC*/*AC* after the value; *mA*, *Ah*, *mm²*. Ranges with an en dash and no spaces around it: *9–32 V DC*.
- **Date:** ISO, *2026-11-27* **(sample: 2025-02-07)**. In screenshots from TrikdisConfig the software's own format stays.
- **Time:** 24 hours, *09:30*. Durations written out: *30 sekunder*, *5 minuter*, *72 timmar*. The samples abbreviate (*30 sek*, *5 min*); abbreviations are fine in tables.
- **Percent:** *80 %* with a space.
- **Phone numbers:** keep the format in the English page; international form with +, *+46 ...*, for Swedish examples.
- **Digits vs words:** digits for values, settings, step numbers and quantities; words for 1–9 in running prose only when they are not settings (*en kabel*, *två SIM-kort*).

## 5. Headings, capitalisation and typography

- **Sentence case in headings:** *Anslutning till larmcentralen*, not *Anslutning Till Larmcentralen* **(sample: numbered headings in the Neo guide are sentence case)**. Capital only for the first word and for proper names (TrikdisConfig, Protegus).
- **Keep the English heading structure and numbering.** The site numbers headings automatically from H2; do not type numbers into Swedish headings. Section references use **avsnitt**, not *kapitel*: *se avsnitt 5.2* **(sample: *avsnitt* about 270 times, *kapitel* 0)**.
- **Quotation marks:** Swedish uses the same mark on both sides, ”så här”, or none. The samples use ”...” **(sample)**. Do not use „...“ (the old G17F draft does).
- **Lists:** end items with a full stop only if they are full sentences. Samples use a dash as the bullet; in Markdown we keep `-`.
- **Compounds are written as one word**, with a hyphen only after an abbreviation or product name: *SIM-kort*, *USB-kabel*, *IP-adress*, *PGM-utgång*, *RS485-buss*, *G17F-larmsändaren*. Avoid compounds longer than three parts; split with *för*, *till* or *av*. Shared-head compounds take a hanging hyphen: *installatörs- eller administratörskoden*.
- **Definite form:** introduce the product as *larmsändaren G17F* (noun first) and afterwards just *G17F* or *larmsändaren*. Use *-n/-t/-na* consistently: *larmsändaren*, *centralapparaten*, *knappsatsen*.
- **Abbreviations:** *t.ex.* (for example), *dvs.* (that is), *bl.a.*, *ca* (about), *osv.* Write *t.ex.* with full stops and no space.
- **Never translate:** product names (GT, GT+, GET, G16, G17F, SP3, FLEXi, CG17, Gator, iO-8, RL14), software (TrikdisConfig, Protegus, Protegus2, Protegus Cloud, IPcom), protocols and formats (TRK, SIA DC-09, Contact ID, CID, SIA, ESPA 4.4.4), and standards.

## 6. Keypad sequences and menu paths

- **Keypad sequences** on a host panel keep the notation Teletec uses: each key in square brackets, no spaces: `[*][8][5555]`, `[001]`, `[#][#][#]` **(sample)**. Put them in code formatting. A value to be replaced is in italics or capitals inside the brackets: `[*][8][installatörskod]`.
- **Menu paths in software and in the app** use the arrow that our English pages use: **Settings → Advanced settings → Panel settings**. Every element is bold and keeps the label as the software shows it (see section 7).
- **Numeric strings** such as SMS commands (`PSW 123456 xxxxxx`, `CONNECT ...`) stay exactly as written in code format. Never translate a command word.
- **Function keys** stay as `[F4]`, `[F5]`.

## 7. Software labels (TrikdisConfig and the Protegus app)

**Rule: labels shown in TrikdisConfig and in the Protegus app are kept exactly as the software shows them, in bold. The software has no Swedish interface as far as we know.**

- Copy the label letter for letter: capitals, spaces, brackets, trailing colons. Example: **Reporting to CMS**, **Cloud access code**, **Read [F4]**, **Write [F5]**.
- **On first use** (per page) a Swedish explanation may follow in parentheses, in plain text: **Reporting to CMS** (rapportering till larmcentralen). Do not repeat the explanation after later mentions, and do not put the Swedish in bold.
- **Never translate a label inside bold**, and never mix: not **Rapportering till CMS** if the screen says **Reporting to CMS**.
- Window names, tab names, group names, button names and field names all follow the same rule.
- **Words around the label are Swedish:** *Markera **Enable cloud service**.* / *I fönstret **System Options**, i inställningsgruppen **SIM**:*
- **Text printed on the product** (POWER, NETWORK, DATA, TROUBLE, BAT+) is treated the same way: kept as printed, in quotation marks or bold.
- **Screenshots stay as they are** (English UI). The alt text and the caption are Swedish. When the app or software gains a Swedish interface, this section is the only place that changes: update it and the glossary together.
- A Swedish term for a function that has a label goes in plain text: *funktionen för fjärrstyrd tillkoppling (**Remote Arm/Disarm**)*.

## 8. Mandatory choices that touch every page

These are decided in the glossary, with evidence. Repeated here because they are the ones a translator is most likely to get wrong:

| English | Swedish | Never |
|---|---|---|
| control panel | **centralapparat** | central, kontrollpanel, styrenhet |
| monitoring station / ARC / CMS | **larmcentral** | central, övervakningscentral |
| communicator | **larmsändare** | kommunikator |
| zone | **sektion** | zon |
| partition / area | **område** | partition |
| arm / disarm | **tillkoppla / frånkoppla** | larma på/av |
| detector (security) / sensor (measurement) | **detektor / givare** | mixing them |
| fire panel | **brandlarmcentral** | larmcentral |

## 9. Sentence patterns

Typical sentences from our English pages and the Swedish to use. Written fresh, not taken from the samples.

| # | English pattern | Swedish |
|---|---|---|
| 1 | Click **Write [F5]** and disconnect the USB cable. | Klicka på **Write [F5]** och koppla bort USB-kabeln. |
| 2 | The communicator sends event messages to the monitoring station receiver. | Larmsändaren skickar händelsemeddelanden till larmcentralens mottagare. |
| 3 | Tick the box if users should receive notifications in the Protegus app. | Markera kryssrutan om användarna ska få aviseringar i Protegus-appen. |
| 4 | Enter the 6-digit installer or administrator code. | Ange installatörs- eller administratörskoden (sex siffror). |
| 5 | If the communicator is connected to the TIP/RING terminals, set **Security panel model** to **AUTO**. | Om larmsändaren är ansluten till TIP/RING-plintarna ställer du in **Security panel model** på **AUTO**. |
| 6 | Make sure the SIM card is activated and the PIN request is turned off. | Kontrollera att SIM-kortet är aktiverat och att PIN-kodsbegäran är avstängd. |
| 7 | Solid green: connected to the cellular network. | Fast grönt sken: ansluten till mobilnätet. |
| 8 | "TROUBLE" blinks 3 times: cannot connect to the cellular network. | Lysdioden "TROUBLE" blinkar 3 gånger: det går inte att ansluta till mobilnätet. |
| 9 | The default value is 123456. Change it for security reasons. | Förvalet är 123456. Ändra det av säkerhetsskäl. |
| 10 | Check the cellular signal strength at the mounting location before installation. | Kontrollera mobilnätets signalstyrka på monteringsplatsen innan du installerar enheten. |
| 11 | Connect the control panel's PGM output to input IN1 of the communicator. | Anslut centralapparatens PGM-utgång till larmsändarens ingång IN1. |
| 12 | Up to 8 keypads can be connected to the bus. | Upp till 8 knappsatser kan anslutas till bussen. |
| 13 | Disconnect the power supply before wiring. | Koppla bort matningen innan du drar ledningarna. |
| 14 | Do not use FFFE or FFFF as **Object ID**. | Använd inte FFFE eller FFFF som **Object ID**. |
| 15 | A message is sent when the zone is triggered. | Ett meddelande skickas när sektionen påverkas. |
| 16 | The output can be controlled by SMS, phone call or the app. | Utgången kan styras med SMS, telefonsamtal eller appen. |
| 17 | See chapter 5.2 for details. | Se avsnitt 5.2 för mer information. |
| 18 | The panel's date and time must be set to receive exact timestamps. | Centralapparatens datum och tid måste vara inställda för att meddelandena ska få rätt tidsstämpel. |

Notes on the patterns: pattern 15 uses *påverkas* (the samples say *vid påverkan* for a triggered zone), not a literal *violated*; pattern 13 says *matningen* for the power supply connection, *nätaggregat* only for the device.

## 10. Checklist before a Swedish page goes to review

1. Every English label is still bold and unchanged, and the Swedish explanation (if any) is only on first use.
2. No *kommunikator*, *zon*, *central* alone, *larma på/av*.
3. Numbers: comma decimals, a space before units, ISO dates.
4. Admonition keywords unchanged, titles translated.
5. Links and image paths unchanged; only link text and alt text translated.
6. Step count and order identical to the English page.

---

## Open questions for a native reviewer

For Erik at Teletec: each can be answered in a line. Ordered by how many pages the answer touches.

| # | Question | Options | My recommendation, and why |
|---|---|---|---|
| 1 | ~~What do you call our IP/GSM unit ("communicator")?~~ | | **Settled 2026-11-27: larmsändare.** Teletec's own web page is titled *Trikdis larmsändare* and uses the word about 15 times. |
| 2 | Spelling of the fire panel: *brandlarmcentral* or *brandlarmscentral*? And is there a risk of confusing *larmcentral* (station) with *brandlarmcentral* (panel) in a sentence about fire reporting? | brandlarmcentral / brandlarmscentral / brandcentral | **brandlarmcentral**; standard EN 54 term, but none of your samples covers fire panels, so unverified. |
| 3 | Primary and spare communication path: *backupkanal* or *reservkanal*? | backupkanal / reservkanal / sekundär kanal | **backupkanal**, because your Neo guide writes *backup Mobil*, and our software label says *Backup channel*. *Reserv-* stays for battery (*reservdrift*). |
| 4 | Entry and exit delay: which pair do installers expect? | inpasseringstid / utpasseringstid (Neo, PC1616/1864) / ingångsfördröjning / utgångsfördröjning (Power864) | **inpasseringstid / utpasseringstid**, the newer text. |
| 5 | The code that identifies the site at the station (our *account number* / *Object ID*). | abonnentkod / objekt-ID / kontonummer / kundnummer | **abonnentkod** in prose, keep **Object ID** as the software label, explained once as *objekt-ID (abonnentkod)*. |
| 6 | End-of-line resistor in running text. | slutmotstånd (EOL) / EOL-motstånd / avslutningsmotstånd / slingmotstånd | **slutmotstånd (EOL)** on first use, then *EOL-motstånd*. Your texts say *motstånd 5,6 kΩ* and *enkelbalanserad* and rarely the abstract word. |
| 7 | Expander modules (iO-8 and friends). | utbyggnadsmodul / expansionsmodul / expander | **utbyggnadsmodul**, your Neo guide's word. |
| 8 | User-facing wording for arming in the Protegus app: do end users say *tillkoppla* or *larma på*? Installer text says *tillkoppla* everywhere. | tillkoppla / larma på / aktivera | **tillkoppla/frånkoppla** in manuals for installers; if consumer apps in Sweden use *larma på/av*, the user guides for the app may want that. Please advise by audience. |
| 9 | "Security company" (installer or alarm company, EN *security company*, *safety company*). | larmbolag / säkerhetsföretag / bevakningsföretag / installatör | **larmbolag**, no sample evidence. |
| 10 | Security grade (EN 50131 *Grade 2*, *Class II*). | larmklass / säkerhetsgrad / grad | **larmklass** for the SSF 1014 class your guides state (*larmklass 2*); for the EN 50131 *Grade*, wording not in samples. |
| 11 | Admonition titles in boxed notes. | Obs! / Observera / Anmärkning; Försiktighet / Se upp | **Obs!**, **Viktigt**, **Varning**, **Försiktighet**, **Tips**; no sample uses boxed titles. |
| 12 | Communication path in general (EN *channel*). | kommunikationskanal / kommunikationsväg / överföringsväg | **kommunikationskanal**; your Neo guide has only *kommunikationsval*. |
| 13 | Gate controllers (GATOR): is *port* + *portautomatik* + *styrenhet* the right trio, and *grind* only for pedestrian gates? | port / grind / bom | **port**; nothing in the samples covers gates. |
| 14 | *Programvara* or *mjukvara* for software (your Neo guide uses both, 75 vs 10 times). | programvara / mjukvara | **programvara**, the majority in your own text. |
| 15 | *Användarkod* (Neo) or *handhavarkod* (older DSC guides) for user code? | användarkod / handhavarkod | **användarkod**, the newer guide. |

For the translators: where an answer comes back different from my recommendation, change the glossary row first, then the pages, and record the date in the glossary header.
| 16 | Control panel: your web page says *larmpaneler*, your installation guides *centralapparat*. Which should an installer manual use? | centralapparat / larmpanel / larmcentral (no) | **centralapparat**, the word in your own technical manuals. |
