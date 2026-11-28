# Glossary-SV.md: Swedish terminology for TRIKDIS manuals

**Status:** draft for native review, written 2026-11-27. Not yet checked by a Swedish speaker. Companion file: `style-guide-sv.md`.

**Method.** Terms are chosen by how the Swedish security industry really writes, not by translating from English. The evidence is five Swedish manuals sent by our distributor Teletec (support technician Erik Haversten); for each term the table shows how often each manual uses it. Where the samples say nothing, the row is marked **⚠ no sample evidence, standard term**, so a reviewer can find the weak spots quickly (about a third of the rows). Where an earlier machine-translated G17F draft (May 2026) disagrees with the samples, the samples win and the disagreement is noted in the row and listed below.

**Source codes in the evidence column** (counts are word-form matches, so *tillkoppla* also counts *tillkopplad*; the number shows relative weight, not an exact census):

| Code | Document |
|---|---|
| NEO | Teletec, *Installationsguide PowerSeries Neo*, edition 9 (2025-02-07). Newest and Teletec's own text; the strongest evidence for how Teletec names IP/GSM transmitters |
| IG16 | *Installationsguide* DSC PowerSeries PC1616/PC1864 (Swedish edition). Text layer of the PDF is garbled, so counts come from OCR and are slightly noisy |
| IM864 | *Installationsanvisning* Power864 / PC5020 v3.2 |
| PM864 | *Programmeringsmanual* Power864 / PC5020 v3.x. Mostly programming tables, so LED-state words (*släckt*) and *sektion* are inflated |
| UM16 | *Handhavarinstruktion* (user manual) PC1616/PC1864. Text layer garbled, counts from OCR |

The DSC samples are burglar-alarm panels. They say nothing about fire panels, gate controllers, SIM cards or cloud apps, so those sections lean on standard Swedish (flagged rows).

---

## Teletec's own web pages (checked 2026-11-27)

Teletec's page about our products, [Trikdis larmsändare](https://solutions.teletec.se/trikdis-larmsandare), confirms the main choices:

- **larmsändare** about 15 times ("universell larmsändare"); *kommunikator* once or twice. Product heading "TRIKDIS Communicator GET".
- **larmcentral(er)** for the monitoring station; **larmmottagare** for receivers (their category name).
- For the panel the marketing text says **larmpaneler**, and *DSC PowerSeries-centraler*. Their technical manuals say *centralapparat*. We keep **centralapparat** in manuals (installer text), and ask Erik (open question 16).
- Dual path: **failover** ("automatisk failover mellan LAN och 4G"), *dubbel uppkoppling*, *PSTN-backup*. Other words: *SIM-kort*, *M2M-abonnemang*, *fjärrstyrning*, *fjärrkonfiguration*, *pushnotiser*, *installatör*, *larmöverföring*, *uppkoppling*.
- Nothing about GATOR on teletec.se, so the gate terms still have no Swedish evidence.

## Read this first: the dangerous pairs

### 1. centralapparat (the panel) is not larmcentral (the monitoring station)

This is our most dangerous confusion, the same trap as *centralė* versus *pultas* in the Lithuanian glossary.

| Meaning | Swedish | Teletec evidence |
|---|---|---|
| The **control panel** we or the customer installs on site | **centralapparat** | 55 hits in the Neo guide, 178 in the Power864 install manual |
| The **monitoring station** (ARC, CMS) that receives the reports | **larmcentral** | 57 hits in the Neo guide, 47 in IM864; the user manual says *bemannad larmcentral* |
| The **receiver** (the box or server at the station) | **mottagare** / **larmmottagare** | Neo guide: *Mottagare 1-4* |

Rules:

- Never write *central* alone. It could be read as either end of the system.
- Never write *kontrollpanel*, *larmpanel* or *styrenhet* for an alarm panel. *Styrenhet* is reserved for the gate controller (section 11).
- Our own "CMS" labels in TrikdisConfig and the app stay in English. In prose, write *larmcentralen*, and say *larmcentralens mottagare* when the receiver is meant.
- **Fire trap.** In Swedish a *brandlarmcentral* is the fire alarm **panel**, while *larmcentral* is the monitoring station. A sentence like "the fire panel reports to the larmcentral" is correct Swedish and has two different *central* words; keep both fully spelled out.

### 2. larmsändare, not kommunikator

All five samples contain **0** occurrences of *kommunikator*. Teletec names its IP/GSM units **IP-larmsändare** (TL280, TL280LE, LE2080; 47 occurrences of *larmsändare* in the Neo guide, plus 70 of *sändare* including compounds). So the English "communicator" becomes **larmsändare**. The May 2026 G17F draft used *kommunikator* 62 times: change it.

### 3. detektor vs givare (detector vs sensor)

Same distinction as *daviklis* vs *jutiklis* in the Lithuanian glossary. Security detectors (smoke, motion, door contact, glass break) are **detektor**. Measurement or state sensors (temperature, humidity, gate position) are **givare**. Our English pages say "sensor" for both, so decide by function, not by the English word. *Larmgivare* appears in the samples for detectors on one zone and is acceptable.

### 4. sektion, not zon

About 2,200 word forms of *sektion* across the samples against 4 of *zon*. Our communicators have only *inputs* (*ingångar*); use *sektion* only where the product itself speaks of zones (panels, event codes about "zone Z").

### 5. tillkoppla / frånkoppla for arm / disarm

Not *larma på/av* (one incidental hit) and not *aktivera/avaktivera*, which are for enabling features.

---

## Disagreements with the May 2026 G17F draft

The samples win. The draft should not be reused as a style source.

| Draft | Samples | Use |
|---|---|---|
| kommunikator (62 x) | larmsändare, 0 x kommunikator | larmsändare |
| expansionsmodul (14 x) | utbyggnadsmodul / utbyggnadskort | utbyggnadsmodul |
| zon / sektion mixed (10 / 18) | sektion only | sektion |
| brandlarmscentral (39 x) | no sample; standard spelling has no *s* | brandlarmcentral (to be confirmed) |
| reservkanal | backup / primär / sekundär | backupkanal (open question) |
| kontonummer | abonnentkod | abonnentkod |
| indikatorlampor | lysdiod, indikering | lysdiod / indikering |
| styrenhet for the alarm panel | centralapparat | centralapparat |
| topplock | no sample | lock |
| tvåfunktionsplint | no sample | universell ingång/utgång (IN/OUT) |

---


## 1. Equipment

Names of devices and parts. Product names (GT, GT+, GET, G16, G17F, SP3, FLEXi, CG17, Gator, iO-8 and so on) are never translated, only the generic noun after them.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| control panel / alarm panel / security panel | **centralapparat** | kontrollpanel, larmpanel, styrenhet, central (alone) | NEO 55 · IG16 50 · IM864 178 · PM864 2 · UM16 6. The product on the wall that has the zones and the keypad. Teletec uses it for every DSC panel. Never the monitoring station, see the warning above. |
| communicator / alarm communicator | **larmsändare** | kommunikator, larmkommunikator | NEO 47. No sample uses *kommunikator* (0 hits). *Kommunikationsenheter* appears twice in NEO, only as a generic phrase in a standards list. Teletec names its IP/GSM units *IP-larmsändare* (TL280, LE2080). After first use the short form *sändare* is fine. Contradicts the May 2026 G17F draft (62 x *kommunikator*). |
| IP communicator / IP/cellular communicator | **IP-larmsändare** | IP-kommunikator | NEO 21. Teletec's own wording for the integrated unit in PowerSeries Neo. |
| cellular communicator (GT, GET, G16, G17F) | **larmsändare med mobilanslutning** (4G/LTE) | GSM-kommunikator | NEO 3. Neo guide: units with *only mobile (SIM card)* and 4G function; use the network name only if the product is limited to it. Short name in titles: *LTE-larmsändare G17F*. |
| transmitter (T16 VHF/UHF) | **radiosändare** | radiolarmsändare | IG16 1. Radio-only unit. Do not use for our IP/GSM devices. |
| hand-held transmitter / key fob | **handsändare** / **fjärrkontroll** | — | NEO 12 · IG16 62 · IM864 9 · UM16 7. *handsändare* in the Power864 text for the wireless transmitter; *fjärrkontroll* for the user-facing remote. |
| receiver (at the monitoring station: TRIKDIS RL14, IPcom, SIA receiver) | **mottagare** (*larmcentralens mottagare*) | mottagning, larmmottagning | NEO 132 · IG16 19 · IM864 34 · PM864 8. Neo guide: *Mottagare 1-4*, *primära larmmottagaren*, *SIA-mottagare*. Keep distinct from the station: the receiver is the box, *larmcentral* is the organisation. |
| receiver (alarm receiver, formal) | **larmmottagare** | — | NEO 15 · IG16 2 · IM864 3. Used by Teletec when it talks about where the panel sends alarms. |
| radio receiver (RF receiver for wireless sensors) | **radiomottagare** | RF-mottagare | IG16 14 · IM864 25 · PM864 8. Power864 guides (PC5132). |
| transceiver (RF-LORA, RF-S8, RF-SH) | **radiotransceiver** | sändtagare | NEO 15. Neo guide (HSM2HOST). |
| keypad | **knappsats** | kodpanel, manöverpanel, tangentbord | NEO 113 · IG16 132 · IM864 257 · PM864 72 · UM16 49. Lead term in every sample; *manöverpanel* appears only for a Skydd wireless product. |
| LCD keypad | **knappsats med LCD-display** | LCD-tangentbord | NEO 22 · IG16 8 · IM864 68 · PM864 24 · UM16 8. Samples describe keypads by display type (*lysdioder*, *symboldisplay*, *LCD*). |
| LED keypad | **knappsats med lysdioder** | — | IM864 6. Power864 guide: *knappsats med lysdioder*. |
| touchscreen keypad / touchpad keypad | **knappsats med pekskärm** | — | ⚠ no sample evidence, standard term. The Neo guide lists the DSC touchscreen only as a table row, so the phrase is standard Swedish, not sampled. |
| expander / expansion module | **utbyggnadsmodul** | expansionsmodul, expander | NEO 6 · IM864 7. Teletec: *utbyggnadsmodul*, *utbyggnadskort*. Disagrees with the G17F draft (14 x *expansionsmodul*). Product names such as iO-8, IO-LORA stay as they are. |
| input/output expander | **utbyggnadsmodul för ingångar och utgångar** | — | composed from attested parts. Built from the attested pattern *utbyggnadsmodul*. |
| zone expander module | **sektionskort** (DSC term) / utbyggnadsmodul för sektioner | — | NEO 34 · IG16 15 · IM864 24 · PM864 10 · UM16 1. *Sektionskort*, *utgångskort*, *matningskort* are DSC module names. |
| output module | **utgångskort** | — | NEO 15 · IG16 1 · IM864 7 · PM864 5. DSC module name. |
| module (generic) | **modul** | — | NEO 204 · IG16 39 · IM864 48 · PM864 10. Frequent in the Neo guide. |
| power supply (device) | **nätaggregat** | strömförsörjning, nätdel | ⚠ no sample evidence, standard term. No sample uses it; the DSC guides talk about *matningskort* (supply module) and *transformator*. Standard Swedish term. |
| power supply module (DSC) | **matningskort** | — | NEO 16 · IG16 6 · IM864 12 · PM864 6. DSC module only. |
| siren | **siren** | sirén, larmsignal | NEO 78 · IG16 41 · IM864 27 · PM864 27 · UM16 1. |
| siren output (BELL) | **sirenutgång** | — | NEO 12 · IG16 51 · IM864 22 · PM864 2 · UM16 2. |
| detector | **detektor** | — | NEO 57 · IG16 27 · IM864 74 · PM864 9 · UM16 34. Security detectors: smoke, motion, door contact. See the detector/sensor warning. |
| smoke detector | **rökdetektor** | — | NEO 15 · IG16 13 · IM864 27 · PM864 3 · UM16 5. |
| heat detector | **värmedetektor** | — | ⚠ no sample evidence, standard term. Neo guide shows only a combined smoke/heat label; standard term. |
| motion detector | **rörelsedetektor** | — | NEO 4. |
| magnetic (door/window) contact | **magnetkontakt** | magnetbrytare | NEO 4 · IM864 13 · PM864 1. |
| glass break detector | **glaskrossdetektor** | — | NEO 1 · IG16 1 · IM864 4 · UM16 2. Samples use *glaskross* as a short name. |
| sensor (temperature, humidity, voltage, state) | **givare** | sensor | NEO 15 · IM864 12. *temperaturgivare* in the Neo guide. See warning. |
| temperature sensor | **temperaturgivare** | temperatursensor | NEO 3. Neo guide: *låg temperaturgivare*. |
| humidity sensor | **fuktgivare** | — | ⚠ no sample evidence, standard term. Standard term. |
| remote control (user) | **fjärrkontroll** | — | NEO 12 · IG16 62 · IM864 8 · UM16 7. |
| panic button / pendant (PB-LORA) | **överfallsknapp** / nödknapp | panikknapp | NEO 11 · IG16 17 · IM864 37 · PM864 21 · UM16 4. Samples: *nödknappar*, *överfallslarm*. *Panikknapp* is in the G17F draft but not in the samples. |
| key switch | **nyckelbrytare** | — | NEO 1. Rare in samples; standard. |
| RFID card / tag / pendant | **RFID-tagg** / RFID-kort | — | NEO 5. Neo guide says *proxtag* for a DSC product; for ours use the technology name. |
| RFID reader | **RFID-läsare** | — | ⚠ no sample evidence, standard term. No sample evidence, standard term. |
| iButton key / reader | **iButton-nyckel** / iButton-läsare | — | ⚠ no sample evidence, standard term. Keep *iButton* as a name. |
| Wiegand reader | **Wiegand-läsare** | — | ⚠ no sample evidence, standard term. Name stays. |
| relay | **relä** | — | NEO 2 · IG16 2 · IM864 5 · PM864 1. |
| battery | **batteri** | ackumulator | NEO 80 · IG16 76 · IM864 55 · PM864 11 · UM16 8. |
| backup battery | **reservbatteri** | backup-batteri | ⚠ no sample evidence, standard term (searched, 0 hits). No sample uses the word (they say *batteri*); standard. |
| transformer | **transformator** | — | NEO 5 · IG16 14 · IM864 6 · PM864 1. |
| enclosure / housing / casing | **kapsling** | hölje, låda | NEO 9 · IG16 14 · IM864 31. |
| cover / lid | **lock** | topplock | ⚠ no sample evidence, standard term. G17F draft says *topplock*; use plain *lock*. |
| PCB / board | **kretskort** | plåt | NEO 4 · IG16 1 · IM864 6. |
| terminal block | **plintblock** | — | NEO 1 · IG16 1 · IM864 2. |
| terminal | **plint** | terminal, anslutning (as a noun for the part) | NEO 5 · IM864 4. Neo guide: *plint*, *kopplingsplint*. |
| antenna | **antenn** | — | NEO 2 · IM864 1 · PM864 1. |
| cable | **kabel** | — | NEO 18 · IG16 14 · IM864 10. |
| twisted pair cable | **partvinnad kabel** | — | ⚠ no sample evidence, standard term. No sample evidence, standard term. |
| jumper (pin header) | **bygel** / stiftbygel | — | IG16 2 · IM864 3. |
| fuse | **säkring** | — | NEO 3 · IG16 1 · IM864 6. Power864: PTC fuse (*PTC-säkring*). |
| LED | **lysdiod** | indikatorlampa, diod | NEO 4 · IG16 12 · IM864 25 · PM864 5 · UM16 7. *LED* is accepted in compounds (*LED-indikering*) as the samples do. |
| buzzer | **summer** | ljudgivare, pipare | NEO 10 · IG16 56 · IM864 58 · PM864 14 · UM16 24. Keypad buzzer. |
| display | **display** | skärm (for keypads) | NEO 4 · IG16 5 · IM864 38 · PM864 11 · UM16 6. |
| button | **knapp** | — | NEO 119 · IG16 152 · IM864 271 · PM864 73 · UM16 47. |
| key (on a keypad) | **tangent** | — | NEO 9 · IG16 14 · IM864 44 · PM864 11 · UM16 2. *tryck på valfri tangent*. |
| router | **router** | — | ⚠ no sample evidence, standard term. No sample evidence, standard term. |
| mounting plate | **monteringsplåt** | — | NEO 2. |
| standoff (plastic spacer) | **plastdistans** | — | NEO 4 · IG16 1 · IM864 4. |
| tamper switch | **sabotagekontakt** | — | NEO 1 · IM864 4 · PM864 1. |

## 2. Zones, areas and arming

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| zone (alarm input) | **sektion** | zon | NEO 281 · IG16 720 · IM864 588 · PM864 562 · UM16 87. About 2,200 word forms across the samples against 4 for *zon*. Disagrees with the G17F draft (10 x *zon*, 18 x *sektion*, mixed). |
| zone input (wired) | **sektionsingång** | — | NEO 12 · IG16 4 · IM864 8. |
| zone type | **sektionstyp** | — | NEO 56 · IG16 13 · IM864 78 · PM864 31. |
| wired zone | **trådbunden sektion** | — | NEO 5 · IG16 3 · IM864 4 · PM864 1. |
| instant zone | **direktlarmande sektion** | omedelbar zon | NEO 9 · IG16 11 · IM864 6 · PM864 4. Neo guide: *Direktlarmad*. |
| delayed (entry/exit) zone | **fördröjd sektion** | — | NEO 17 · IG16 48 · IM864 31 · PM864 13 · UM16 3. |
| interior / follower zone | **passersektion** | — | NEO 5 · IG16 10 · IM864 4 · PM864 4. Neo guide type 004. |
| 24-hour zone | **24-timmarssektion** | — | NEO 2 · IG16 4 · IM864 1 · PM864 1 · UM16 1. Samples write *24-timmars drift*. |
| fire zone | **brandsektion** | — | NEO 6 · IG16 23 · IM864 25 · PM864 9. |
| partition / area | **område** | partition, delsystem, zon | NEO 106 · IG16 156 · IM864 128 · PM864 121 · UM16 31. About 540 word forms. One word for both of our EN terms *area* and *partition*. |
| arm | **tillkoppla** | larma på, aktivera (for arming), slå på | NEO 31 · IG16 48 · IM864 95 · PM864 10 · UM16 20. Verb in all five samples; *larma på* occurs once, incidentally, in IG16. |
| arming | **tillkoppling** | — | NEO 33 · IG16 153 · IM864 93 · PM864 87 · UM16 48. |
| disarm | **frånkoppla** | larma av, avaktivera (for disarming) | NEO 7 · IG16 13 · IM864 63 · UM16 10. |
| disarming | **frånkoppling** | — | NEO 30 · IG16 71 · IM864 68 · PM864 51 · UM16 19. |
| armed | **tillkopplad** | — | NEO 3 · IG16 6 · IM864 12 · PM864 3. |
| disarmed | **frånkopplad** | — | NEO 3 · IM864 8. |
| away arming | **bortatillkoppling** | — | NEO 1 · IG16 16 · IM864 9 · PM864 3 · UM16 4. Alternative in the samples: *bortatillslag* (1 hit). |
| stay (home) arming | **hemmatillkoppling** | — | NEO 4 · IG16 23 · IM864 11 · PM864 5 · UM16 10. Samples also say *hemmatillslag* (IM864 6, IG16 more); choose *-tillkoppling* for consistency with the verb. |
| away mode / stay mode (state) | **bortaläge** / **hemmaläge** | — | NEO 5 · IG16 4 · IM864 5. Neo guide: *Tillkopplat i bortaläge / hemmaläge*. |
| night mode | **nattläge** | — | UM16 1. |
| quick exit | **snabbutgång** | — | NEO 3 · IG16 11 · IM864 9 · PM864 5 · UM16 3. |
| bypass (verb) | **förbikoppla** | bypassa, överbrygga, koppla bort | NEO 14 · IG16 43 · IM864 69 · PM864 9 · UM16 21. |
| bypass (noun) | **förbikoppling** | bypass | NEO 6 · IG16 23 · IM864 40 · PM864 7 · UM16 31. |
| bypassed | **förbikopplad** | — | NEO 6 · IG16 14 · IM864 17 · PM864 2 · UM16 11. |
| bypass cancelled / re-engaging | **återinkoppling** | — | UM16 2. User manual: *återinkoppling av sektioner*. |
| tamper | **sabotage** | tamper | NEO 37 · IG16 67 · IM864 52 · PM864 22 · UM16 5. Both for the tamper switch and the alarm: *sabotagelarm*. |
| tamper alarm | **sabotagelarm** | — | NEO 1 · IG16 3 · IM864 1 · PM864 1. |
| entry delay | **inpasseringstid** | ingångsfördröjning | NEO 4 · IG16 34 · IM864 2 · UM16 1. Neo guide and PC1616/1864 guide use *inpasseringstid*; Power864 guides use *ingångsfördröjning* (23 hits). Newest Teletec text wins. |
| exit delay | **utpasseringstid** | utgångsfördröjning | NEO 4 · IG16 30 · IM864 10 · UM16 5. As above. |
| alarm | **larm** | — | NEO 103 · IG16 115 · IM864 108 · PM864 19 · UM16 19. |
| burglar alarm | **inbrottslarm** | — | NEO 7 · IG16 8 · IM864 4 · PM864 1 · UM16 3. |
| panic alarm | **överfallslarm** | panikalarm | NEO 5 · IG16 1 · IM864 3 · UM16 2. |
| emergency alarm (medical/help) | **nödlarm** | — | NEO 4 · IG16 1 · UM16 2. Neo guide system keys: Brand, Nöd, Överfall. |
| fire alarm | **brandlarm** | — | NEO 12 · IG16 19 · IM864 12 · PM864 5 · UM16 19. |
| silent alarm | **tyst larm** | — | ⚠ no sample evidence, standard term. No sample evidence, standard term. |
| alarm memory | **larmminne** | — | NEO 4 · IG16 7 · IM864 8 · PM864 2 · UM16 9. |
| alarm restored / restore | **återställning** | — | NEO 26 · IG16 83 · IM864 144 · PM864 46 · UM16 5. Event vocabulary: larm / återställning. |
| ready (to arm) | **driftklar** | redo | NEO 6 · IG16 21 · IM864 20 · PM864 1 · UM16 6. Keypad status in all guides. |
| trouble / fault (indication) | **fel** | problem, trouble | NEO 7 · IG16 12 · IM864 14 · PM864 2 · UM16 3. User manual: *Felindikeringar*. |
| system failure | **systemfel** | — | NEO 2 · IG16 6 · IM864 4 · PM864 2 · UM16 1. |
| communication failure | **kommunikationsfel** | — | NEO 3 · IG16 10 · IM864 8 · PM864 2 · UM16 1. Neo guide. |
| supervision / monitoring of a device | **övervakning** | supervision | NEO 39 · IG16 23 · IM864 31 · PM864 8 · UM16 3. |
| supervised (against tamper/cut) | **övervakad** | — | NEO 3 · IG16 5 · IM864 4. |
| chime | **ding-dong** | — | NEO 10 · IG16 11 · IM864 13 · PM864 18 · UM16 6. User manual keeps the word. |
| walk test | **gångtest** | — | NEO 12 · IG16 15 · IM864 16 · PM864 8 · UM16 7. |
| holiday (schedule exception) | **helgdag** | — | NEO 11 · IG16 100. Neo guide: *Helgdagar för automatisk frånkoppling*. |
| schedule / timer | **schema** | tidsschema (not in samples) | NEO 9 · IM864 2 · PM864 2. |
| security class (Class II, III) | **larmklass** | — | IG16 2 · IM864 2. PC1616/1864 and Power864 guides: *larmklass 2*, *miljöklass II* per SSF 1014. Use *larmklass* wherever EN 50131 grade or insurance class is meant; EN 50131 *Grade* itself needs a native check (see open questions). |
| environmental class | **miljöklass** | — | IG16 1 · IM864 1. |

## 3. Inputs, outputs and wiring

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| input | **ingång** | — | NEO 10 · IG16 6 · IM864 30 · PM864 17 · UM16 2. In our communicators there are only inputs, no *sektioner*; say *ingång*, and *sektion* only where the product itself calls it a zone. |
| output | **utgång** | — | NEO 261 · IG16 172 · IM864 218 · PM864 95 · UM16 4. |
| PGM output | **PGM-utgång** | programmerbar utgång (only as an explanation) | NEO 91 · IG16 147 · IM864 98 · PM864 102. |
| programmable output | **programmerbar utgång** | — | NEO 1 · IG16 1 · IM864 6. Neo guide table: *Programmerbara utgångar*. |
| universal input/output (IN/OUT terminal) | **universell ingång/utgång (IN/OUT)** | tvåfunktionsplint (draft) | ⚠ no sample evidence, standard term. The draft invented *tvåfunktionsplint*; samples say nothing. Standard wording. |
| open collector output (OC) | **utgång med öppen kollektor (OC)** | — | ⚠ no sample evidence, standard term. Standard term. |
| normally open (NO) | **normalt öppen (NO)** | — | ⚠ no sample evidence, standard term. No sample uses the long form; keep *NO*/*NC* abbreviations in diagrams and tables. |
| normally closed (NC) | **normalt sluten (NC)** | normalt stängd | ⚠ no sample evidence, standard term. Standard term. |
| end-of-line (EOL) resistor | **slutmotstånd** (EOL) | avslutningsmotstånd | IM864 2 · PM864 1. Weak sample evidence (IM864 2, PM864 1); samples mostly say *motstånd 5,6 kΩ*. Write *slutmotstånd (EOL)* on first use, then *EOL-motstånd* is acceptable. |
| resistor | **motstånd** | — | NEO 16 · IG16 30 · IM864 44 · PM864 9. |
| single balanced (one EOL resistor) | **enkelbalanserad** | — | NEO 7 · IG16 7 · IM864 20 · PM864 2. |
| double balanced (two resistors) | **dubbelbalanserad** | — | NEO 11 · IG16 11 · IM864 28 · PM864 3. |
| unbalanced | **obalanserad** | — | NEO 2 · IG16 10 · IM864 11 · PM864 1. |
| short circuit | **kortslutning** | — | NEO 4 · IG16 12 · IM864 12 · PM864 1. |
| open circuit / break | **avbrott** | — | NEO 12 · IG16 11 · IM864 28 · PM864 8. |
| loop (zone wiring) | **slinga** | krets | NEO 10 · IG16 20 · IM864 18 · PM864 3. |
| loop response time | **slingrespons** | — | NEO 1 · IG16 22 · IM864 1 · PM864 18. |
| wiring diagram / schematic | **kopplingsschema** | ledningsdiagram, schema (alone) | IG16 4 · IM864 3 · PM864 1. |
| connect (to a terminal) | **ansluta** | koppla till | NEO 73 · IG16 45 · IM864 154 · PM864 13 · UM16 2. Neo guide imperative: *Anslut*. |
| connection (the act of wiring) | **inkoppling** | — | NEO 16 · IG16 16 · IM864 17 · PM864 2 · UM16 2. |
| connection (port, link) | **anslutning** | — | NEO 26 · IG16 12 · IM864 52 · PM864 7 · UM16 1. |
| common terminal (COM) | **gemensam plint (COM)** | — | ⚠ no sample evidence, standard term. Keep *COM* as printed. |
| ground / earth | **jord** | — | NEO 3 · IG16 4 · IM864 2. |
| supply voltage | **matningsspänning** | — | NEO 6 · IG16 3 · IM864 12 · PM864 1. Matches *spänningsmatning* in the samples. |
| current | **ström** | — | NEO 8 · IG16 3 · IM864 15. |
| current consumption | **strömförbrukning** | — | NEO 2 · IG16 6 · IM864 9. |
| max current draw (from a terminal) | **strömuttag** | — | NEO 9 · IG16 5 · IM864 6. |
| voltage drop | **spänningsfall** | — | NEO 3 · IM864 2. |
| cable cross-section | **kabelarea** | kabeltjocklek | NEO 2 · IG16 3 · IM864 1. |
| wire / conductor | **ledare** | tråd | NEO 5 · IM864 8. *4-ledare*, *ledningspar*. |
| polarity (+ / -) | **polaritet** (plus / minus) | — | NEO 3 · IM864 4. |
| in parallel / in series | **parallellt** / **seriellt** | — | NEO 19 · IG16 5 · IM864 16 · PM864 1. Neo guide. |
| bus | **buss** | — | ⚠ no sample evidence, standard term. Samples say *datakommunikation* for CORBUS; no standalone *buss*. Standard term. |
| RS485 bus | **RS485-buss** | — | ⚠ no sample evidence, standard term. Name stays. |
| keypad bus | **knappsatsbuss** | — | ⚠ no sample evidence, standard term. Standard compound. |
| serial bus | **seriell buss** | — | ⚠ no sample evidence, standard term. Standard term. |
| TIP/RING terminals (landline) | **TIP/RING-plintar** | — | NEO 11 · IG16 5 · IM864 4. Neo guide labels *RING-TIP*. |
| landline / PSTN | **analog telelinje (PSTN)** | fast telefon | NEO 37 · IG16 2 · IM864 7 · PM864 5. |
| dialer | **uppringare** | uppringningsenhet | NEO 2 · IG16 28 · IM864 49 · PM864 31 · UM16 1. DSC term for the panel's built-in dialer. |
| phone number | **telefonnummer** | — | NEO 13 · IG16 41 · IM864 42 · PM864 32 · UM16 3. |
| relay contact | **reläkontakt** | — | NEO 2 · IM864 2. |
| to apply power | **spänningssätta** | — | NEO 6 · IG16 3 · IM864 3. Neo guide: *spänningssätt systemet*. |
| disconnect (power, cable) | **koppla bort** / koppla ur | — | NEO 2 · IG16 18 · IM864 6 · PM864 1 · UM16 1. |

## 4. Communication, reporting and the monitoring station

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| monitoring station / ARC / alarm receiving centre | **larmcentral** | central, övervakningscentral, larmmottagning, mottagningscentral | NEO 57 · IG16 27 · IM864 47 · UM16 14. User manual: *bemannad larmcentral*. 0 hits for *larmmottagning*. |
| CMS (as an abbreviation in our UI) | **larmcentral (CMS)** | — | UI label stays. Write *CMS* only where it is a UI label or in diagrams; in prose use *larmcentralen*. |
| monitoring software | **larmcentralens programvara** | övervakningsprogram | ⚠ no sample evidence, standard term. G17F draft says *larmcentralprogramvara*; either is fine, but avoid the long compound. |
| security company / installer company | **larmbolag** | säkerhetsföretag (acceptable), bevakningsbolag | ⚠ no sample evidence, standard term. Gator EN text calls the ARC *safety company*. No sample evidence; confirm with Teletec. |
| primary receiver / secondary receiver | **primär mottagare** / **sekundär mottagare** | — | NEO 43 · IG16 13 · IM864 6 · PM864 6. Neo guide; in our manuals *backup channel* is separate (below). |
| event | **händelse** | — | NEO 37 · IG16 53 · IM864 106 · PM864 9 · UM16 18. |
| event message | **händelsemeddelande** | — | composed; draft uses it 71 x with *händelse*. |
| event code (Contact ID code) | **larmkod** | händelsekod | NEO 5 · IG16 21 · IM864 97 · PM864 15. Teletec: *larmkod* for the code sent to the station (IM864 97). *Händelsekod* is acceptable for non-alarm events if the sentence needs it. |
| event format (Contact ID, SIA) | **larmformat** | händelseformat, protokoll | NEO 6 · IG16 16 · IM864 7 · PM864 11. Teletec: *larmformat*. Keep separate from the transmission *protokoll* (TRK, SIA DC-09); same distinction as in the LT glossary. |
| protocol (transmission) | **protokoll** | — | ⚠ no sample evidence, standard term. 0 hits in the samples because DSC speaks of *format*; standard word for TRK, DC-09. |
| event memory / buffer (device) | **händelseminne** | händelsebuffert | NEO 8 · IG16 13 · IM864 35 · PM864 4 · UM16 6. |
| event log (software, app) | **händelselogg** | — | NEO 7 · IG16 1 · IM864 2 · PM864 1. Samples: *logg* (NEO 7). |
| report (to the station) | **rapportera** | — | NEO 1 · IG16 18 · IM864 2 · UM16 3. Samples prefer *sända* / *överföra*; both are fine. |
| reporting (noun) | **rapportering** | — | IG16 10. Heading *Reporting to CMS* is a UI label and stays; prose: *rapportering till larmcentralen*. |
| transmission | **överföring** | — | NEO 17 · IG16 4 · IM864 5 · PM864 2 · UM16 1. *Överföring till larmcentral* (user manual). |
| send | **skicka** | — | NEO 11 · IG16 7 · IM864 3 · UM16 1. Modern everyday verb for SMS, messages. Samples use *sända* (48 in IM864), also acceptable for alarm transmission. |
| send (alarm transmission) | **sända** | — | NEO 26 · IG16 1 · IM864 48 · UM16 1. |
| test signal / test message | **testsändning** | testsignal, testmeddelande, testrapport | NEO 4 · IG16 1 · IM864 12 · PM864 1. Neo guide: *testsändningstid*, *begränsad testsändning*. |
| periodic test | **periodisk testsändning** | — | NEO 8 · IG16 22 · IM864 13 · PM864 9. Neo guide: *Periodisk test*. |
| test period | **testperiod** | — | ⚠ no sample evidence, standard term. UI label *Test period* stays. |
| ping / heartbeat | **PING-signal** | — | ⚠ no sample evidence, standard term. Keep PING. |
| communication channel | **kommunikationskanal** | kommunikationsväg, överföringsväg | ⚠ no sample evidence, standard term. No sample evidence; standard term. Teletec also says *kommunikationsval*. |
| primary channel | **primärkanal** | huvudkanal | NEO 24 · IG16 6 · IM864 3 · PM864 3. Teletec uses *primär* for receivers and for Ethernet. |
| backup channel | **backupkanal** | reservkanal (option, see open questions) | NEO 8 · IM864 1 · PM864 1. Teletec writes *backup Mobil*, *backup-nummer*; our UI label says *Backup channel* so prose matches the label. G17F draft used *reservkanal* (6). |
| backup channel 2 | **backupkanal 2** | — | composed. |
| redundancy | **redundans** | — | NEO 1. Neo guide: use mobile *för redundans*. |
| dual SIM | **två SIM-kort** (dual SIM) | dubbla SIM | ⚠ no sample evidence, standard term. Standard wording; Neo guide only knows one SIM. |
| account number (CID) | **abonnentkod** | kontonummer, kundnummer | NEO 10 · IG16 29 · IM864 11 · PM864 4. DSC/Teletec word for the code the station identifies the site by; G17F draft says *kontonummer*. |
| object ID / object number (TRIKDIS) | **Object ID** (objekt-ID) | — | ⚠ no sample evidence, standard term. UI label stays; explain on first use as *objekt-ID (abonnentkod hos larmcentralen)*. Flagged for a native check. |
| line number / receiver number (DC-09) | **linjenummer** / **mottagarnummer** | — | ⚠ no sample evidence, standard term. Standard terms. |
| encryption | **kryptering** | — | NEO 1. Neo guide uses it once. |
| encryption key | **krypteringsnyckel** | — | ⚠ no sample evidence, standard term (searched, 0 hits). |
| SMS (message) | **SMS** | textmeddelande | NEO 14. |
| call (reporting by calling) | **uppringning** | — | NEO 8 · IG16 50 · IM864 95 · PM864 21 · UM16 3. |
| push notification | **pushnotis** | push-meddelande | ⚠ no sample evidence, standard term. No sample evidence, standard. |
| notification | **avisering** | notifikation | ⚠ no sample evidence, standard term. |
| cloud / Protegus Cloud | **molntjänst** / *Protegus Cloud* | — | ⚠ no sample evidence, standard term. Product name stays. |
| remote control (remote operation) | **fjärrstyrning** | — | ⚠ no sample evidence, standard term. |
| remote arm / disarm | **fjärrstyrd till-/frånkoppling** | — | NEO 5 · IG16 9 · IM864 2 · UM16 9. User manual: *Till-/frånkoppling*. |
| remote configuration / remote service | **fjärrkonfigurering** / fjärrservice | — | NEO 4 · IG16 58 · IM864 58 · PM864 20 · UM16 8. Teletec says *fjärrservice* for DLS/AlarmInstall. |
| registering mode (communicator) | **registreringsläge** | — | ⚠ no sample evidence, standard term. Standard compound. |
| unique ID (UID) | **unikt ID-nummer** | — | ⚠ no sample evidence, standard term. |
| IMEI | **IMEI** | — | ⚠ no sample evidence, standard term. |
| connection lost | **anslutningen bruten** | — | ⚠ no sample evidence, standard term. Standard phrase. |
| signal strength | **signalstyrka** | — | NEO 2. Neo guide. |
| network coverage | **nättäckning** | — | ⚠ no sample evidence, standard term. Standard term. |
| jamming detection | **detektering av störsändning** | — | ⚠ no sample evidence, standard term. From the G17F draft, not sampled; standard. |
| image verification | **bildverifiering** | — | NEO 8. Neo guide. |

## 5. SIM card and mobile network

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| SIM card | **SIM-kort** | simkort | NEO 15. |
| nano-SIM | **nano-SIM-kort** | — | ⚠ no sample evidence, standard term. |
| SIM PIN | **SIM-kortets PIN-kod** | — | NEO 3. Neo guide: *SIM Pin låst*. |
| APN | **APN** | — | NEO 6. Neo guide. |
| mobile network | **mobilnät** | — | ⚠ no sample evidence, standard term. |
| mobile operator | **mobiloperatör** | — | ⚠ no sample evidence, standard term. |
| mobile (Internet) connection | **mobilanslutning** | — | ⚠ no sample evidence, standard term. Neo guide says *Mobil*. |
| cellular antenna | **mobilantenn** | GSM-antenn | ⚠ no sample evidence, standard term. |
| IP address | **IP-adress** | — | NEO 27. |
| subnet mask | **nätmask** | — | ⚠ no sample evidence, standard term. |
| static IP address | **statisk IP-adress** | — | ⚠ no sample evidence, standard term. |
| port (network) | **port** | — | NEO 14 · IM864 2. |
| Ethernet | **Ethernet** | — | NEO 33. |
| firewall | **brandvägg** | — | NEO 1. |

## 6. Power

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| mains power / AC | **nätspänning** | — | NEO 10 · IG16 1 · IM864 9 · UM16 1. |
| mains failure | **nätfel** | AC-fel (for prose) | IG16 38 · IM864 11 · PM864 6 · UM16 2. DSC trouble name. |
| power outage | **strömavbrott** | — | NEO 6 · IM864 1. |
| battery fault / low battery | **batterifel** / **låg batterispänning** | — | NEO 13 · IG16 31 · IM864 23 · PM864 6 · UM16 5. |
| battery charging | **laddning** | — | NEO 20 · IG16 8 · IM864 5 · PM864 4. |
| standby operation (on battery) | **reservdrift** | — | NEO 2. Neo guide: 24-hour *reservdrift*. |

## 7. Installation and mounting

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| install (mount) | **montera** | — | NEO 9 · IG16 7 · IM864 30 · UM16 2. |
| install (set up the system) | **installera** | — | ⚠ no sample evidence, standard term. Used for software and systems. |
| mounting / installation | **montering** / **installation** | — | NEO 64 · IG16 10 · IM864 22 · PM864 8. |
| installer | **installatör** | montör | NEO 49 · IG16 37 · IM864 56 · PM864 22 · UM16 35. |
| end user | **slutanvändare** | slutkund (for the person, not the buyer) | NEO 6 · IM864 1. Neo guide says *slutkund* 5 times; *slutanvändare* once. Pick *slutanvändare* for the person who uses the system. |
| user | **användare** | — | NEO 30 · IG16 25 · IM864 33 · PM864 3 · UM16 3. |
| premises | **lokal** | — | ⚠ no sample evidence, standard term. User manual: *lokalerna*. |
| site / installation site | **anläggning** | objekt (for the site) | NEO 3 · IG16 1 · IM864 14 · PM864 3. Power864: *anläggning*. |
| default (value) | **förval** | standard, default | NEO 46. Teletec's marker in programming tables (46 hits in Neo). *Standardinställning* acceptable where a sentence needs it. |
| factory settings | **fabriksinställningar** | — | NEO 3 · IG16 24 · IM864 68 · PM864 11 · UM16 2. |
| factory reset | **fabriksåterställning** | — | IG16 1 · IM864 8. |
| operating temperature | **driftstemperatur** | — | ⚠ no sample evidence, standard term. No sample evidence, standard. |
| relative humidity | **relativ luftfuktighet** | — | NEO 2 · IG16 2 · IM864 1. |
| screwdriver (flat-head) | **skruvmejsel** | — | ⚠ no sample evidence, standard term. |
| screw | **skruv** | — | NEO 2 · IG16 1 · IM864 3. |
| label / sticker | **etikett** | — | NEO 3 · IG16 1 · IM864 2. |
| package contents | **leveransomfattning** | — | ⚠ no sample evidence, standard term. |
| signal level (network) | **signalnivå** | — | ⚠ no sample evidence, standard term. |

## 8. Configuration software and app

Names (TrikdisConfig, Protegus, Protegus2, IPcom, Protegus Cloud) never change. See the style guide for UI labels.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| configuration (software) | **konfiguration** | — | NEO 3. Use for TrikdisConfig/app. For the DSC panel programmed from the keypad Teletec says *programmering*. |
| configure | **konfigurera** | — | NEO 2. |
| program (a panel) | **programmera** / **programmering** | — | NEO 115 · IG16 314 · IM864 555 · PM864 106 · UM16 49. Used for keypad programming of host panels: 1,100+ hits. |
| programming mode | **programmeringsläge** | — | NEO 29 · IG16 23 · IM864 42 · PM864 2 · UM16 3. |
| settings | **inställningar** | — | ⚠ no sample evidence, standard term. |
| setting group | **inställningsgrupp** | — | ⚠ no sample evidence, standard term. |
| parameter | **parameter** | — | ⚠ no sample evidence, standard term. |
| check box | **kryssruta** | — | ⚠ no sample evidence, standard term. |
| tick / check (a box) | **markera** | kryssa i | ⚠ no sample evidence, standard term. *Markera kryssrutan ...* |
| untick | **avmarkera** | — | ⚠ no sample evidence, standard term. |
| drop-down list | **rullgardinslista** | — | ⚠ no sample evidence, standard term. |
| software | **programvara** | mjukvara | NEO 75 · IM864 7. Neo guide 75 x *programvara*, 10 x *mjukvara*. Disagreement inside Teletec's own text: majority wins. |
| firmware | **firmware** | — | NEO 3. Neo guide: *Firmware uppdatering*. |
| firmware update | **firmwareuppdatering** | — | NEO 3. |
| remote update (over the air) | **fjärruppdatering** | — | ⚠ no sample evidence, standard term. |
| USB cable (Mini-B) | **USB-kabel (Mini-B)** | — | ⚠ no sample evidence, standard term. |
| save | **spara** | — | NEO 5 · IG16 14 · IM864 16 · PM864 1 · UM16 6. |
| administrator | **administratör** | — | ⚠ no sample evidence, standard term. No sample evidence for this role word, standard. |
| administrator code | **administratörskod** | — | ⚠ no sample evidence, standard term. |
| installer code | **installatörskod** | — | NEO 28 · IG16 19 · IM864 33 · PM864 14 · UM16 1. Default 5555 in DSC; ours is 6 digits. |
| master code | **masterkod** | huvudkod | NEO 14 · IG16 31 · IM864 67 · PM864 17 · UM16 30. |
| user code | **användarkod** | handhavarkod (older DSC wording) | NEO 5 · IG16 3 · UM16 5. Neo guide (newest) says *användarkod*; older DSC texts say *handhavarkod* (IG16, IM864, PM864, UM16). |
| PIN code (user keypad code) | **PIN-kod** | — | ⚠ no sample evidence, standard term. |
| access code | **åtkomstkod** | — | ⚠ no sample evidence, standard term. UI labels like *Cloud access code* stay in English. |
| password | **lösenord** | — | NEO 6. |
| user name / log in | **användarnamn** / **logga in** | — | NEO 1. |
| app | **app** | applikation | NEO 35 · IG16 1. |
| mobile app | **mobilapp** | — | NEO 9. |
| add new system (in the app) | **lägga till ett nytt system** | — | ⚠ no sample evidence, standard term. |
| template (device setup) | **mall** | — | ⚠ no sample evidence, standard term. |
| download / upload | **ladda ned** / **ladda upp** | — | NEO 2. |
| serial number | **serienummer** | — | NEO 11. |
| learn / enrol (wireless device) | **lära in** | — | NEO 36. Neo guide: *lär in*, *inlärning*. |
| learning mode | **inlärningsläge** | — | NEO 19. |
| range test | **räckviddstest** | — | NEO 7 · IG16 6 · PM864 2. |
| repeater | **repeater** | — | NEO 39. |
| restart | **starta om** | — | NEO 1 · IM864 1. |
| reset (settings, device) | **återställa** | — | NEO 50 · IG16 129 · IM864 179 · PM864 50 · UM16 9. |
| date and time / clock | **datum och tid** / klocka | — | NEO 7 · IG16 6 · IM864 14 · PM864 1 · UM16 2. Samples: *Tid och datum*. |

## 9. LED indicators and states

Words printed on the housing (POWER, NETWORK, DATA, TROUBLE) are kept as printed and put in quotation marks or bold, like UI labels.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| indicator / indication | **indikering** | indikator, indikeringslampa | NEO 20 · IG16 25 · IM864 57 · PM864 6 · UM16 16. |
| LED blinks | **lysdioden blinkar** | — | NEO 4 · IG16 2 · IM864 2 · UM16 1. |
| steady (solid) light | **fast sken** / lyser fast | konstant ljus | ⚠ no sample evidence, standard term (searched, 0 hits). Draft uses *fast grönt sken*, a good fit with the Teletec tables. |
| off | **släckt** | av | IG16 263 · IM864 25 · PM864 402 · UM16 1. Programming tables list LED states as *Släckt*. |
| lit / on | **tänd** | — | NEO 25 · IG16 202 · IM864 58 · PM864 180 · UM16 11. |
| flashes N times | **blinkar N gånger** | — | ⚠ no sample evidence, standard term. Neo guide: LED blinks 1, 2 or 3 times. |
| green / red / yellow / orange | **grön** / **röd** / **gul** / **orange** | — | ⚠ no sample evidence, standard term. |
| blinking yellow | **blinkar gult** | — | ⚠ no sample evidence, standard term. |
| fast / slow blink | **snabb** / **långsam blinkning** | — | ⚠ no sample evidence, standard term. |
| beep | **pip** | — | NEO 5 · IG16 6 · IM864 20 · PM864 5 · UM16 2. |
| short beeps | **korta pip** | — | ⚠ no sample evidence, standard term. |
| network LED | **nätverksindikeringen** ("NETWORK") | — | ⚠ no sample evidence, standard term. Printed name stays. |

## 10. Fire-specific

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| fire alarm control panel (fire panel) | **brandlarmcentral** | brandlarmscentral, brandcentral, brandpanel | ⚠ no sample evidence, standard term. Standard term (EN 54-2 *brandlarmcentral*); no sample evidence since the samples cover burglar panels. The G17F draft spelled it *brandlarmscentral* (39 x). Never abbreviate to *central*. |
| fire alarm system | **brandlarmsanläggning** | — | ⚠ no sample evidence, standard term. Standard. |
| fire detector | **branddetektor** | — | ⚠ no sample evidence, standard term. Samples say *rökdetektor* for the concrete case. |
| manual call point | **brandlarmsknapp** | — | ⚠ no sample evidence, standard term. Standard; verify with a fire-industry reviewer. |
| two-wire / four-wire smoke detector | **tvåtrådsdetektor** / **fyrtrådsdetektor** | — | NEO 6 · IG16 9 · IM864 11 · PM864 6. Neo guide: *2-tråds rökdetektor*. |
| fire alarm transmission equipment (EN 54-21) | **larmöverföringsutrustning** | — | ⚠ no sample evidence, standard term. Standard; reviewer to confirm EN 54-21 Swedish title. |
| fault warning | **felvarning** | — | ⚠ no sample evidence, standard term. |
| evacuation | **utrymning** | — | NEO 2 · IM864 1 · UM16 18. User manual: *utrymningsplan*. |
| fire brigade (rescue service) | **räddningstjänsten** | brandkåren | ⚠ no sample evidence, standard term. Standard modern term. |

## 11. Gate-controller specific

Nothing in the Teletec samples covers gates. Everything in this section is standard Swedish and needs a native check.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| gate | **port** | grind (only for a pedestrian swing gate) | ⚠ no sample evidence, standard term. Sliding gate *skjutport*, swing gate *slagport*, barrier *bom*. |
| gate controller | **styrenhet för port** | — | ⚠ no sample evidence, standard term. *Styrenhet* only for gate controllers, never for an alarm panel. |
| automatic gate opener / operator | **portautomatik** | — | ⚠ no sample evidence, standard term. |
| gate state (open/closed) | **portens läge** | — | ⚠ no sample evidence, standard term. |
| open / close / stop (gate) | **öppna** / **stänga** / **stopp** | — | ⚠ no sample evidence, standard term. |
| pulse / pulse time (output) | **puls** / **pulstid** | — | ⚠ no sample evidence, standard term. |
| control by phone call | **styrning med telefonsamtal** | — | ⚠ no sample evidence, standard term. |
| RFID pendant (key fob) | **RFID-bricka** | — | ⚠ no sample evidence, standard term. |
| authorised user | **behörig användare** | — | ⚠ no sample evidence, standard term. |
| counter (limit on uses) | **räknare** | — | ⚠ no sample evidence, standard term. |
| inactivity time | **inaktivitetstid** | — | ⚠ no sample evidence, standard term. |
| limit switch | **ändlägesbrytare** | — | ⚠ no sample evidence, standard term. |
| photocell | **fotocell** | — | ⚠ no sample evidence, standard term. |
| gate position sensor | **lägesgivare** | — | ⚠ no sample evidence, standard term. Sensor not detector, see warning. |
| schedule / holidays (for access) | **schema** / **helgdagar** | — | NEO 11 · IG16 100. |

## 12. General interface and instruction verbs

Imperative, second person singular implied. See the style guide.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| click | **klicka på** | — | ⚠ no sample evidence, standard term. |
| press (a button, a key) | **tryck på** | — | NEO 113 · IG16 102 · IM864 41 · PM864 3 · UM16 82. Samples: *Tryck [*][8]...*. |
| select / choose | **välj** | — | NEO 61 · IG16 9 · IM864 34 · PM864 4 · UM16 10. |
| enter (a value, a code) | **ange** | skriv in (ok for free text) | NEO 47 · IG16 43 · IM864 4 · PM864 3 · UM16 9. Neo guide: *ange ny kod*. |
| enable | **aktivera** | — | NEO 72 · IG16 148 · IM864 105 · PM864 11 · UM16 28. |
| disable | **avaktivera** | inaktivera, deaktivera | NEO 3 · IG16 21 · IM864 22 · PM864 2 · UM16 3. Teletec uses *avaktiverad* and *deaktiveras* both; pick one. |
| turn on / turn off (a device) | **slå på** / **stäng av** | — | ⚠ no sample evidence, standard term. |
| connect / disconnect | **anslut** / **koppla bort** | — | NEO 73 · IG16 45 · IM864 154 · PM864 13 · UM16 2. |
| insert / remove | **sätt i** / **ta bort** | — | ⚠ no sample evidence, standard term. |
| wait | **vänta** | — | NEO 9 · IG16 19 · IM864 8 · PM864 2. |
| confirm | **bekräfta** | — | NEO 15 · IG16 9 · IM864 7 · PM864 1 · UM16 2. |
| cancel | **avbryt** | — | NEO 2 · IG16 9 · IM864 1 · UM16 5. |
| scroll / browse | **bläddra** | — | NEO 10 · IG16 9 · IM864 4 · UM16 17. |
| go back (step back in a menu) | **backa** | — | NEO 5. |
| tap (on a touch screen, in the app) | **tryck på** | knacka på, tappa | Same verb as for a physical button; Swedish apps say *tryck på*. Added after the pilot, 2026-11-27. |
| step (Step 1., Step 2.) | **Steg** | — | *Steg 1.* Added after the pilot. |
| press and hold | **håll nedtryckt** | — | ⚠ no sample evidence, standard term. |
| release (a button) | **släpp** | — | NEO 3 · IG16 2. |
| note | **OBS!** | Notera | NEO 33 · IG16 12 · IM864 26 · PM864 6 · UM16 19. In prose. Admonition title: **Obs!** (style guide §3). |
| warning | **Varning** | — | NEO 13 · IG16 3 · IM864 4 · PM864 1 · UM16 2. |
| important | **Viktigt** | — | NEO 5 · IG16 2 · IM864 2 · UM16 2. |
| tip | **Tips** | — | NEO 3 · IG16 1 · IM864 1. |
| see section / chapter N | **se avsnitt N** | kapitel | NEO 38 · IG16 29 · IM864 124 · PM864 82 · UM16 1. 0 hits for *kapitel* in the samples, 270+ for *avsnitt*. |
| required / mandatory | **obligatorisk** | — | ⚠ no sample evidence, standard term. |
| optional | **valfri** | — | ⚠ no sample evidence, standard term. |
| recommended | **rekommenderas** | — | ⚠ no sample evidence, standard term. |
| supported | **stöds** | — | ⚠ no sample evidence, standard term. |
| compatible | **kompatibel** | — | ⚠ no sample evidence, standard term. |

## 13. Added from translated pages

Terms settled while translating. Translators add candidates in their report; the supervisor adds them here.

| EN | SV — use | Do not use | Evidence / note |
|---|---|---|---|
| programming section (DSC keypad, e.g. [001], [301]) | **sekvens** | sektion (that is a zone) | NEO: *sekvens [001]*. Pilot 2026-11-27. |
| zone type (DSC [001]) | **sektionstyp** | zontyp | NEO. |
| Momentary keyswitch (DSC zone type 066) | **Till-/Frånkoppling (puls)** | — | NEO's name for 066. |
| Phone Number (DSC [301]) | **Telefonnummer** | — | NEO. |
| Account Codes (DSC [310]) | **Abonnentkoder** | — | NEO. |
| Communicator Formats (DSC [350]) | **Larmformat** | — | NEO. |
| Y / N in a DSC option list | **J / N** | Y | Swedish panels show J. |
| qualified personnel | **behörig personal** | kvalificerad personal | Standard wording. |
| void the warranty | **upphäver garantin** | — | Standard wording. |
| Contact ID format | **Contact ID-format** | — | Hyphen after a name (style guide §5). |
| enter / exit programming mode | **gå in i / lämna programmeringsläget** | — | NEO. |
| gate controller (GATOR) | **styrenhet för port**, then *styrenheten* | portstyrning (that is the wiring/function) | GATOR page. ⚠ native check (open question 13). |
| cellular (device type) | **mobilansluten** | — | *mobilansluten styrenhet för port*. |
| gate state (open/closed) | **portens läge** | — | GATOR. |
| pulse time | **pulstid** | — | GATOR. |
| intermediate relay | **mellanrelä** | — | GATOR. |
| RFID pendant / reader | **RFID-bricka** / **RFID-läsare** | — | GATOR. |
| black list | **spärrlista** | svartlista | GATOR. ⚠ native check. |
| counter (limit on uses) | **räknare** | — | GATOR. |
| schedule / holidays | **schema** / **helgdagar** | — | GATOR. |
| inactivity time | **inaktivitetstid** | — | GATOR. |
| widget | **widget** | — | Swedish apps use the English word. |
| keyswitch zone | **nyckelbrytarsektion** | — | DSC PC quick setup. |
| momentary / maintained (keyswitch) | **momentan (puls)** / **bibehållen (nivå)** | — | App labels **Pulse** / **Level** stay. |
| gate safety sensor | **säkerhetsgivare** | säkerhetsdetektor | *givare* rule. |
| intrusion alarm panel | **centralapparat för inbrottslarm** | — | |
| dial capture | **uppfångning av uppringning** | — | Generic TIP/RING page. ⚠ native check. |
| tone dialling (DTMF) | **tonval (DTMF)** | — | |
| KeyBus (DSC) | **KeyBus** (name kept) | — | Teletec guides only say *datakommunikation (YEL/GRN)*. |
| mains / low voltage | **nätspänning** / **lågspänning** | — | |
| unplanned call-out | **oplanerad utryckning** | — | iO4R page. |

| Stay / Sleep / Away (arming modes) | **hemmaläge / nattläge / bortaläge** (hemmatillkoppling, bortatillkoppling) | — | SP3 page, 2026-11-28. Key labels STAY/SLEEP stay as printed. |
| duress code | **tvångskod** | — | SP3; PC1616 table has *Tvångs-*. |
| administrator code | **administratörskod** | — | SP3, keypads. |
| key fob (remote) | **fjärrkontroll** | — | SP3. |
| security grade (EN 50131) / environmental class | **säkerhetsgrad** / **miljöklass** | — | SP3. ⚠ open question 10. |
| fire detector / smoke detector | **branddetektor** / **rökdetektor** | — | FireCom. |
| two-wire / four-wire detector | **2-tråds / 4-tråds** detektor | tvåtråds | FireCom, Neo pattern. |
| sounders / signalers | **larmdon** | — | FireCom. |
| fault warning (EN 54-21) | **felvarning** | — | FireCom; glossary §10. |
| alarm transmission and fault warning routing equipment | **larmöverförings- och felvarningsutrustning** | — | FireCom (EN 54 title). |
| notified certification body | **anmält certifieringsorgan** | — | FireCom. ⚠ native check. |
| RF transmitter (T16) | **radiosändare** | — | T16. |
| output power / attenuation / line of sight | **sändningseffekt / dämpning / fri sikt** | — | T16. |
| radio repeater | **radiorepeater** (pl. repeatrar) | — | T16, receivers. |
| sleep mode / stand-by (power) | **strömsparläge / viloläge** | — | T16 (kept apart). |
| transceiver | **radiotransceiver** | sändtagare | LoRa pages, Neo. |
| enrol / unenrol (wireless device) | **lära in / radera inlärningen**; learning mode **inlärningsläge** | parkoppla | LoRa pages, Neo. |
| DIP switch | **DIP-switch** | — | LoRa pages. |
| parallel channel | **parallellkanal** | — | E16 quick setups. |
| transmission module | **överföringsmodul** | — | Radio receivers. |
| deaf time / time filter | **spärrtid** (labels stay English) | — | R11. |
| allowlist (prose) | **tillåtelselista** (label **IP Whitelist** stays) | vitlista | IPcom. |
| tenant (monitoring context) | **kund** | hyresgäst | IPcom, supervisor 2026-11-28. |
| jump host / hardening | **hoppserver / härdning** | — | IPcom. |
| handset lifted (LINE LED) | **luren är lyft** | — | RTH2, E16T. |
| loop (fire panel) / loop number | **slinga** / **slingnummer** | — | G17F. ⚠ native check. |
| contact (iButton) key / key reader | **elektronisk nyckel (iButton)** / **nyckelläsare** | — | CG17, T16 (*kontaktnyckel*). |
| fuel level sensor | **bränslenivågivare** | — | CG17. |
| siren flash | **blixtljus** | — | CG17. |
| emergency call buttons (keypad) | **nödlarmsknappar** | — | SP3 user guide. |
