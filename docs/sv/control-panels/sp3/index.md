# Centralapparat ”FLEXi” SP3

<div style="text-align: center;">
  <img src="./sp3-product.webp" alt="Centralapparaten FLEXi SP3" width="400">
</div>

**Vanliga frågor**

??? question "Hur ansluter jag en enskild Wiegand-läsare (utan knappsats) för att pulsa en dörrutgång?"

    --8<-- "sv/faq/index.md:sp3-wiegand-reader-door-output-body"

    Se hela avsnittet: [Länka RFID-brickor (kort)](#541-lanka-rfid-brickor-kort).

Hittar du inte din fråga? Kontakta [support@trikdis.lt](mailto:support@trikdis.lt).

## Beskrivning

**Centralapparaten *FLEXi SP3*** är processordelen i ett inbrotts- och brandlarmsystem. Den har en inbyggd WiFi-modul och ett 2G/4G-mobilmodem. Med FLEXi SP3 kan 64 trådbundna och trådlösa sektioner grupperas i ett system med 8 områden. Användarna kan enkelt och på distans (med mobilappen Protegus2, SMS eller telefonsamtal) ändra skyddsläget i olika delar av lokalen, eller med enheter som stöder personlig identifiering (trådbundna och trådlösa knappsatser, elektroniska nycklar, RFID-kort m.m.). Alla händelser i systemet rapporteras till larmcentralen (CMS, Central Monitoring Station) och till molntjänsten Protegus Cloud via WiFi och/eller via mobilnätet om ett SIM-kort är isatt.

**När rekommenderas centralapparaten *FLEXi SP3*?**

- För att skydda små och medelstora lokaler som ska övervakas av ett larmbolag. FLEXi SP3 stöder både trådbundna och trådlösa sektioner. Centralapparaten kan ge både slutanvändare och larmbolag fjärrstyrning och systeminformation.

- Som ersättning för en befintlig inbrottslarmcentral. Med FLEXi SP3 kan du ställa in ett annat motståndsvärde, så att det motsvarar den typ som den gamla centralapparaten använde. Det sparar mycket tid vid installationen, eftersom motstånden i varje detektor inte behöver bytas.

- När larmsystemet ska göra mer än att skydda lokalen. Exempel: öppna dörrar och portar, vattna gräsmattan, styra belysning, värme, ventilation och kyla samt många andra automatiska start- och stoppfunktioner.

### Funktioner

**Rapportering till larmbolagets larmcentral (CMS):**

- Händelserapportering antingen via den inbyggda WiFi-modulen eller via 2G/4G-mobilmodemet.

- Extra moduler som skickar rapporter via Ethernet, VHF/UHF-radio eller Sigfox, med valfri prioritet.

- Alla larmcentraler kan ta emot rapporter, förutsatt att de har TRIKDIS programvaru-/IP-mottagare eller en IP-mottagare från en annan tillverkare som stöder protokollet SIA DC-09 IP.

- Konstruktionen bygger på två decenniers erfarenhet av att skicka rapporter till larmcentralens primära mottagare och backupmottagare, vilket gör att larmbolag kan ge lokalerna högsta möjliga skydd.

- En inställning för om sändning till larmcentralen krävs: rapporterna skickas obligatoriskt till larmcentralen först och därefter till kunderna.

- Möjlighet att skicka händelserapporter till larmcentralerna hos två olika larmbolag.

- Många kommunikationskanaler och flera inställningar för överföringsprioritet.

**Rapportering till användaren:**

- Via mobilappen Protegus2, som varnar för händelser i larmsystemet med push-aviseringar och särskilda ljud.

- Händelserapportering via SMS till 8 mobilnummer.

- Rapportering av händelser med förinspelade röstmeddelanden (upp till 8 mobilnummer; för centralapparat SP3_12xx med firmware upp till och med 1.13).

- Fjärrstyrning av skyddsläget i valda lokaler (tillkoppling/frånkoppling/hemmatillkoppling/tillkoppling i nattläge).

- Fjärrstyrning av anslutna enheter (belysning, automatiska portar, ventilation, värme, bevattning m.m.).

- Mätning av temperatur på distans.

**Ingångar och utgångar:**

- 10 I/O-plintar som var och en kan ställas in som ingång (IN) eller utgång (OUT). Typer för ingång (IN): ATZ, EOL, NC, NO. I EOL- och ATZ-kretsar kan olika motståndsvärden användas. Antalet ingångar (IN) kan utökas till 64 med knappsatser och utbyggnadsmodulerna iO, iO-8, iO8-LORA, iO-LORA och iO-WL.

- Kretskortet har 2 fasta utgångar: sirenutgången (BELL) och LED-utgången. Sirenutgången styr sirenen och LED-utgången styr indikeringslampor. Antalet utgångar kan utökas till 16 med utbyggnadsmodulerna iO, iO-8, iO8-LORA, iO-LORA och iO-WL.

- Sju driftinställningar för utgångar. Varje utgång kan tilldelas en driftlogik, ett förinställt driftschema eller en egenskap, till exempel termostatläge.

- En enkeltrådsbuss (”1-Wire”) för anslutning av temperaturgivare (upp till 8), en temperatur- och fuktgivare (1) eller en läsare för elektroniska nycklar (”iButton”).

- Databussen GRN-YEL är avsedd för anslutning av 8 knappsatser av samma typ.

- RS485-bussen ansluter utbyggnadsmoduler i serien iO, radiotransceivrar för trådlösa detektorer (RF-SH, RF-LORA, RF-S8, RF-HW), Ethernet-modulen E485, VHF/UHF-radiosändaren T16 och modulen **Sigfox**.

**Styrning av larmsystemet**

- Styrkoder med 4 eller 6 siffror (40 st. totalt), som också kan användas som tvångskod. I det fallet frånkopplar användarkoden larmet, men ett särskilt meddelande skickas till larmcentralen om att larmet frånkopplades under tvång.

- Styrning med knappsatser: SK-LED TouchPad (Protegus SK232LED W), SK-LCD TouchPad (FLEXi SK232LCD), SK LCD Button, SK LED Button; Paradox K636, K10H(V), K32+LED, K32LED, K32LCD+, K35, TM50, TM70; Crow-knappsats CR16, CR-LCD; elektronisk nyckelläsare (”iButton”) CZ-Dallas; elektronisk nyckelläsare TM17; RFID-läsare (Wiegand 26/34).

- Fjärrstyrning med mobilappen Protegus2, telefonsamtal eller SMS.

**Enkel installation:**

- FLEXi SP3 finns i flera monteringskit som innehåller en dekorativ vit metallkapsling med inbyggd nedtransformator eller switchad nätdel.

- Förvalda driftinställningar för FLEXi SP3 bygger på många års erfarenhet. Därför kan systemet installeras i 7 av 10 små och medelstora lokaler utan att förvalen behöver ändras.

- Centralapparaten FLEXi SP3 kan ersätta den tidigare centralapparaten utan att motstånden i varje trådbunden detektor behöver bytas.

- Inställningarna kan sparas som en fil för senare användning.

- Konfigurering via USB-kabel eller på distans med programmet TrikdisConfig.

- Fjärranslutning med TrikdisConfig gör det möjligt att inte bara ändra parametrarna i FLEXi SP3 utan också övervaka centralapparatens drift.

- Två åtkomstnivåer för parameterinställning: installatör och administratör.

### Tekniska data

| Parameter | Beskrivning |
|-----------|-------------|
| Matningsspänning [AC / DC] | 16 V AC eller 16–24 V DC, 2,5 A |
| Strömförbrukning | Upp till 50 mA (vänteläge) / upp till 200 mA (kortvarigt, vid sändning) |
| Reservströmkälla [BAT] | 12 V blybatteri, 4 Ah/7 Ah |
| Laddström för batteriet | Upp till 500 mA |
| Spänning och ström till externa enheter [AUX] | 12 V DC, upp till 1 A |
| Sirenutgång [BELL] | 1 A |
| Utgång [LED] | 0,1 A |
| PGM-utgång | 0,1 A |
| WiFi-modul | Ja, inbyggd |
| WiFi: frekvens, protokoll, krypteringstyp | 2,4 GHz, 802.11 b/g/n, WPA, WPA2, WPA mixed |
| WiFi: typ av nätverkskonfiguration | DHCP eller manuell |
| SIM-kort | 1, storlek NANO |
| Frekvenser för GSM/GPRS-modem | 850 / 900 / 1800 / 1900 MHz |
| Frekvenser för 4G-modem FLEXi SP3_14E / FLEXi SP3_24E / EMEA/Thailand | B1/B3/B7/B8/B20/B28 |
| Frekvenser för 4G-modem FLEXi SP3_24S / Latinamerika/Australien/Nya Zeeland | B1/B3/B4/B5/B7/B8/B28 |
| Frekvenser för 4G-modem FLEXi SP3_24A / Nordamerika | B2/B4/B12 |
| Mottagare av rapporter | Till primär mottagare och backupmottagare hos 2 olika larmbolag; till molntjänsten Protegus Cloud och till mobilapparna Protegus2 för iOS/Android; till 8 mobiltelefoner via SMS. Ringer upp 8 mobiltelefoner. Om en användare svarar meddelar centralapparaten med röst vad som har hänt (för centralapparat SP3_12xx med firmware upp till och med 1.13). |
| Kommunikationskanaler för händelserapportering | GPRS eller 4G, WiFi, LAN (med modulen E485), SMS, röstsamtal (upp till 8 mobilnummer; för centralapparat SP3_12xx med firmware upp till och med 1.13), VHF/UHF-radio (med sändaren T16) |
| Protokoll för anslutning till larmcentralen | TCP/IP eller UDP/IP, eller SMS |
| Kodning av händelser | Contact ID-koder |
| Kryptering av rapporter | TRK AES 128, SIA IP AES 128 |
| Intern klocka | Ja |
| Buffertminnets kapacitet | 60 händelser |
| Händelseloggens minne | Upp till 1 000 händelser. De äldsta posterna raderas automatiskt. |
| Användarkoder | 40 (koder med 4 eller 6 siffror) |
| Tvångskod | Två metoder för kodinmatning kan väljas vid programmeringen |
| Plintar med dubbel funktion [I/O] | 10; funktionen IN eller OUT väljs vid programmeringen. När IN är vald finns typerna NC, NO, EOL, EOL_T, 3EOL, ATZ, ATZ_T. När OUT är vald blir plinten en utgång med öppen kollektor (OC) för upp till 100 mA |
| Antal områden | 8 |
| Antal sektioner | 10 (20 sektioner med ATZ), (kan utökas till 64 sektioner med utbyggnadsmoduler) |
| Antal PGM-utgångar | 2 (kan bli 12 om IO-plintarna ställs in som utgångar. Kan utökas till 16 utgångar med utbyggnadsmoduler) |
| Max antal anslutna knappsatser | 8 |
| Knappsatser som stöds | SK-LED TouchPad (Protegus SK232 LED W) / SK-LCD TouchPad (FLEXi SK232LCD) / SK LCD Button / SK LED Button / Paradox K636 / Paradox K10H(V) / Paradox K32 LED / Paradox K32+ LED / Paradox K32LCD+ / Paradox K35 / Paradox TM50 / Paradox TM70 / Crow CR16 / Crow CR-LCD |
| Max antal RFID-läsare (Wiegand 26/34) | 2 |
| Längd på 1-Wire-bussen [1 WIRE] | Upp till 30 m |
| Kompatibla temperaturgivare | Maxim®/Dallas® DS18S20, DS18B20; serie AM2301 |
| Max antal temperaturgivare på 1-Wire-bussen | 8 (Dallas) eller 1 (om en givare i serien AM2301 används) |
| Kompatibla elektroniska nycklar (iButton) [1 WIRE] | Maxim®/Dallas® DS1990A |
| Max antal elektroniska nycklar (iButton) | 40 |
| Längd på RS485-bussen | Upp till 100 m |
| Max antal enheter på RS485-bussen | 8 |
| Moduler som stöds | iO-8 – utbyggnadsmodul; / iO – utbyggnadsmodul; / iO-MOD – radiotransceiver för iO-WL; / iO-WL – trådlös utbyggnadsmodul; / RF-SH – radiomottagare för trådlösa detektorer; / RF-HW – transceiver för trådlösa detektorer; / RF-S8 – transceiver för trådlösa detektorer; / RF-LORA – transceiver för trådlösa LORA-detektorer; / E485 – modul för anslutning till Ethernet-nätverk; / TM17 – läsare för iButton-nycklar; / CZ-Dallas – läsare för iButton-nycklar; / T16 – VHF/UHF-radiosändare; / iO-LORA – utbyggnadsmodul; / iO8-LORA – utbyggnadsmodul; / PB-LORA – överfallsknapp; / REL-LORA – reläkort; / RFID-läsare. |
| Driftmiljö | Temperatur från -10 °C till +50 °C, relativ luftfuktighet 80 % vid +20 °C, ingen kondens. |
| Centralapparatens mått | 117 × 79 × 25 mm |
| Vikt | 0,1 kg |

### Kompatibla moduler

| **Modulens namn** | **Ström** |
|----|----|
| Knappsats SK-LED TouchPad (Protegus SK232 LED W) | Min 60 mA, max 150 mA |
| Knappsats SK-LCD TouchPad (FLEXi SK232LCD) | Min 25 mA, max 60 mA |
| Knappsats SK LCD Button | Max 70 mA |
| Knappsats SK LED Button | Max 70 mA |
| Knappsats Paradox K636 | Min 40 mA, max 70 mA |
| Knappsats Paradox K10H(V) | Min 44 mA, max 72 mA |
| Knappsats Paradox K32 LED | Min 49 mA, max 148 mA |
| Knappsats Paradox K32+ LED | Min 49 mA, max 148 mA |
| Knappsats Paradox K32LCD+ | Min 70 mA, max 150 mA |
| Knappsats Paradox K35 | Min 30 mA, max 70 mA |
| Knappsats Paradox TM50 | Min 100 mA, max 230 mA |
| Knappsats Paradox TM70 | Min 200 mA, max 330 mA |
| Knappsats Crow CR16 | Min 40 mA, max 75 mA |
| Knappsats Crow CR-LCD | Min 40 mA, max 75 mA |
| Utbyggnadsmodul iO-8 | Max 20 mA |
| Utbyggnadsmodul iO | Max 50 mA |
| iO-MOD – radiotransceiver för iO-WL | Min 50 mA, max 150 mA |
| Trådlös utbyggnadsmodul iO-WL | Max 200 mA |
| Transceiver RF-SH för trådlösa detektorer (Crow) | Max 100 mA |
| Ethernet-larmsändare E485 | Min 50 mA, max 150 mA |
| Läsare för iButton-nycklar TM17 | Max 50 mA |
| Läsare för iButton-nycklar CZ-Dallas | Max 25 mA |
| Radiosändare T16 (VHF eller UHF) | Min 100 mA, max 1,2 A |
| RFID-läsare (Wiegand 26/34) | Max 100 mA |
| Transceiver RF-LORA för trådlösa LORA-detektorer och LORA-moduler | Min 50 mA, max 150 mA |
| Utbyggnadsmodul iO-LORA | Max 50 mA |
| Utbyggnadsmodul iO8-LORA | Max 50 mA |
| Överfallsknapp PB-LORA | Batteri 3 V, CR123A |
| Reläkort REL-LORA | Max 45 mA |
| Transceiver RF-S8 för trådlösa detektorer (S8) | Upp till 100 mA |
| Transceiver RF-HW för trådlösa detektorer (Honeywell) | Upp till 100 mA |

### Externa plintars funktion

<img alt="Kretskortet FLEXi SP3: 1. Indikeringar för anslutning och drift; 2. Plintblock för reservmatning; 3. Plintblock för huvudmatning; 4. Externt plintblock; 5. Plintblock för 1-WIRE-bussen; 6. SMA-kontakt med skruvfäste för WiFi-antenn; 7. Hållare för nano-SIM-kort; 8. SMA-kontakt med skruvfäste för mobilantenn; 9. USB Mini-B-kontakt för konfigurering av centralapparatens inställningar." src="./image4.webp" style="width:5.480010936132984in;height:3.826674321959755in" />

1.  Indikeringar för anslutning och drift.
2.  Plintblock för reservmatning.
3.  Plintblock för huvudmatning.
4.  Externt plintblock.
5.  Plintblock för 1-WIRE-bussen.
6.  SMA-kontakt med skruvfäste för WiFi-antenn.
7.  Hållare för nano-SIM-kort.
8.  SMA-kontakt med skruvfäste för mobilantenn.
9.  USB Mini-B-kontakt (USB Type-C på kretskort SP3_8xx) för konfigurering av centralapparatens inställningar.

| **Plint** | **Beskrivning** |
|----|----|
| Matningsplint | Plint för matning (16 V AC eller plus 16–24 V DC) |
| Matningsplint | Plint för matning (16 V AC eller minus 16–24 V DC) |
| BAT+ | Pluspol för reservmatning, 12 V |
| BAT- | Minuspol för reservmatning, 12 V |
| AUX+ | Pluspol 12 V för externa enheter |
| AUX- | Gemensam minuspol |
| GRN | Knappsatsbuss |
| YEL | Knappsatsbuss |
| A 485 | Plint A på *RS485*-bussen |
| B 485 | Plint B på *RS485*-bussen |
| IO1 – IO9 | In-/utgångsplintar (förval: ingång) |
| IO10 | In-/utgångsplint (förval: PGM-utgång, Fire Sensor Reset) |
| C | Gemensam minuspol |
| LED | PGM-utgång (förval: System State) |
| +5 V | Pluspol 5 V för *1-Wire*-enheter |
| 1 WIRE | Plint för *1-Wire*-bussen |
| C | Gemensam minuspol |

### Lysdiodernas indikering

| Lysdiod | Ljusstatus | Beskrivning |
|---------------|--------------|-------------|
| NET | Blinkar grönt | SIM-kortet registrerar sig i mobilnätet. |
| NET | Fast grönt sken | SIM-kortet är registrerat i mobilnätet. |
| NET | Blinkar gult | Visar mobilnätets signalstyrka från 0 till 5. 3 räcker. |
| DAT | Släckt | Inga osända händelsemeddelanden. |
| DAT | Fast grönt sken | Ett meddelande skickas. |
| DAT | Fast gult sken | Det finns osända händelsemeddelanden i buffertminnet. |
| MOD | Blinkar grönt | Ansluter till WiFi-nätverket. |
| MOD | Fast grönt sken | Ansluten till WiFi-nätverket. |
| PWR | Blinkar grönt | Inga driftproblem. |
| PWR | 1 rött blink | Inget SIM-kort hittades |
| PWR | 2 röda blink | SIM-kortets PIN-kod är felaktig |
| PWR | 3 röda blink | Det går inte att ansluta till mobilnätet |
| PWR | 4 röda blink | Det går inte att ansluta till larmcentralens mottagare på kanal 1 |
| PWR | 5 röda blink | Det går inte att ansluta till larmcentralens mottagare på kanal 2 |
| PWR | 6 röda blink | Den interna klockan är inte inställd |
| PWR | 7 röda blink | För låg spänning från reservmatningen |
| PWR | 8 röda blink | Ingen nätspänning |
| PWR | 9 röda blink | Det går inte att ansluta till WiFi-nätverket |

### Centralapparatens firmwareversioner

| **Firmware-revision** | **Trådlös mottagare** | **Trådlösa detektorer** | **Antal sektioner som stöds** | **Knappsatser som stöds** | **Moduler som stöds** |
|----|----|----|:--:|----|----|
| SP3_xxx0 | RF-SH, RF-LORA | CROW | 32 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-SH |
| SP3_xxx1 | RTX3, RF-LORA | PARADOX | 32 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA |
| SP3_xxx2 | RF-HW, RF-LORA | HONEYWELL | 64 | Flexi, Paradox, Crow CR Icon/LCD (ST) | iO, iO-8, iO-WL, iO-MO, TM17, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-HW |
| SP3_xxx4 | RF-LORA, RF-S8 | MAXIMUM, S8 | 64 | Flexi, Paradox | iO, iO-8, iO-WL, iO-MO, E485, T16, SF485, RF-LORA, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-S8 |

## Matning av centralapparaten

### Huvudmatning

Centralapparaten och hela larmsystemet kan matas från en växelströms- eller likströmskälla. I båda fallen måste en reservmatning, ett 12 V-batteri, vara ansluten till systemet så att matningen aldrig bryts. För att uppfylla kraven i EN 50131 måste reservbatteriet kunna driva systemet i 12 timmar för säkerhetsgrad II eller 60 timmar för säkerhetsgrad III efter att huvudmatningen har försvunnit. Ta hänsyn till den sammanlagda strömförbrukningen hos de extra anslutna modulerna. Varje moduls strömförbrukning anges i avsnitt 1.3 ”Kompatibla moduler”.

### Reservmatning

Om det blir problem med huvudmatningen genereras en händelserapport *AC Fault* och centralapparaten växlar automatiskt till reservbatteriet på 12 V. Om batterispänningen sjunker till 11,5 V genereras en händelserapport *Low Battery*. Batteriet kopplas bort om spänningen sjunker under 9,5 V. När nätspänningen kommer tillbaka genereras en rapport *AC Restore* och batteriet börjar laddas automatiskt. När batterispänningen stiger till 12,6 V genereras en händelserapport *Battery Restore*.

### Kit med centralapparat

#### Centralapparat *FLEXi SP3*

| Namn                                  | Antal |
|:--------------------------------------|:---------|
| Kretskort med centralapparat FLEXi SP3 | 1 st.    |
| Ledning för anslutning av batteri           | 1 st.    |
| Motstånd 2,2 kΩ                       | 20 st.  |
| Motstånd 4,7 kΩ                       | 10 st.  |
| Plastdistans (monteringsdelar)       | 4 st.    |
| Antenn ME301M med 2,5 m kabel  | 2 st.    |

#### Centralapparat *FLEXi SP3* KIT

| Namn                                                            | Antal |
|:----------------------------------------------------------------|:---------|
| Kretskort med centralapparat FLEXi SP3, inbyggt i metallkapsling | 1 st.    |
| Metallkapsling K01 med 40 VA-transformator                        | 1 st.    |
| Motstånd 2,2 kΩ                                                 | 20 st.  |
| Motstånd 4,7 kΩ                                                 | 10 st.  |
| Antenn ME301M med 2,5 m kabel                            | 2 st.    |
| Ledning för anslutning av batteri                                           | 1 st.    |
| Sabotagekontakt                                                   | 1 st.    |
| Plintblock med 0,5 A säkring                                  | 1 st.    |

#### Centralapparat *FLEXi SP3* KITi

| Namn                                                            | Antal |
|:----------------------------------------------------------------|:---------|
| Kretskort med centralapparat FLEXi SP3, inbyggt i metallkapsling | 1 st.    |
| Metallkapsling K02 med switchad nätdel från Mean Well           | 1 st.    |
| Motstånd 2,2 kΩ                                                 | 20 st.  |
| Motstånd 4,7 kΩ                                                 | 10 st.  |
| Antenn ME301M med 2,5 m kabel                            | 2 st.    |
| Ledning för anslutning av batteri                                           | 1 st.    |
| Sabotagekontakt                                                   | 1 st.    |
| Plintblock med 3,15 A säkring                                 | 1 st.    |

!!! note "Obs!"
    USB-kabel (typ Mini-B; typ Type-C för kretskort SP3_8xx) för programmering av centralapparaten säljs separat.

## Installation av systemet

### Rekommenderad installationsordning

**Planera systemet:**

- Rita en skiss över lokalen och markera var metallkapslingen med centralapparaten, knappsatserna, signalenheterna och den utrustning som ska styras automatiskt eller på distans av centralapparaten ska monteras.

- Efter att du har bedömt lokalen, skyddskraven och egenskaperna hos möjliga detektorer väljer du hur många detektorer som ska användas, vilka typer och var de ska monteras.

#### Montera centralapparaten i kapslingen

Centralapparatens kretskort kan monteras i en kapsling som redan har en nedtransformator med 500 mA säkring och utrymme för ett reservbatteri. Montera annars centralapparaten i en vald plast- eller metallkapsling med hjälp av plastdistanser. Om du väljer en metallkapsling, glöm inte att jorda den vid installationen. Den valda kapslingen måste uppfylla kraven i standarderna EN 60950 och EN 50131.

<img alt="Framsida och sidovy av en distans som fäster SP3-kretskortet ovanför kapslingens botten. Hålet i kretskortet är märkt Ø4 och hålet i kapslingen Ø4,8." src="./image5.webp" style="width:2.6766721347331583in;height:1.810003280839895in" />

**Mått på kretskortet FLEXi SP3**

Bilden nedan visar kretskortets mått och monteringshålens placering (i millimeter).

<img alt="Mått på kretskortet FLEXi SP3 i millimeter: 116,5 brett och 78,5 högt. Fyra monteringshål är märkta Ø4 mm; deras centrum ligger 93 mm från varandra i sidled och 61 mm i höjdled. De vänstra hålens centrum ligger 5 mm från vänsterkanten och de nedre hålens centrum 10 mm från nederkanten." src="./image6.webp" style="width:5.223344269466317in;height:3.9800076552930883in" />

#### Ordning för anslutning av enheter

<img alt="Kopplingsschema: matningskällor till FLEXi SP3. 1. GSM- och WiFi-antennerna ansluts till sina antennkontakter; 2. Nano-SIM-kortet sätts i SIM-hållaren; 3. Enheterna ansluts på det externa plintblocket; 4. Huvudmatningen ansluts till AC/DC-plintarna: en transformator ~230 V/16 V, 40 VA, 50 Hz med en säkring på 500 mA, 250 V på ~230 V-ingången, eller en DC-källa på 16–24 V, 2,5 A; 5. Ett reservbatteri på 12 V, 7 Ah ansluts med plus till BAT+ och minus till BAT–." src="./image7.webp" style="width:7.086805555555555in;height:3.292361111111111in" />

1.  Anslut GSM- och WiFi-antennerna till antennkontakterna.

2.  Sätt i ett aktiverat SIM-kort i SIM-hållaren. Inget SIM-kort behövs om centralapparaten ansluter via WiFi eller via modulen E485. Markera i så fall **Disable indication of the absence of a SIM card** (se avsnitt 5.3, fönstret ”Reporting to CMS”).

3.  Anslut dörr- och fönstermagnetkontakter, rörelse-, brand- och andra detektorer, signalenheter, knappsatser och styrda enheter enligt kopplingsschemana här och kopplingsschemat för varje enhet som ska anslutas. Anslut kapslingens dörr- och väggsabotagekontakter till centralapparatens plintar.

4.  Anslut huvudmatningens ledningar till centralapparatens AC/DC-plintar. Slå på huvudmatningen. FLEXi SP3 identifierar de knappsatser, utbyggnadsmoduler och gränssnitt som är rätt anslutna via databussarna 1-WIRE och YEL/GRN.

5.  Placera ett reservbatteri i kapslingen. Anslut batteriets poler till plintarna BAT+ / BAT– på centralapparaten.

!!! note "Obs!"
    Batteriet måste laddas upp på mindre än 72 timmar för att larmsystemet ska uppfylla larmklass II, eller på mindre än 24 timmar för larmklass III.

#### Rekommendationer för inställning av centralapparatens parametrar

1.  Se avsnitt 5 ”Inställning av parametrar” för hur du ansluter till centralapparaten för att konfigurera den.

2.  Systeminställningar:

    1.  **Områden.** Om du vill tillkoppla skyddet för vissa sektionsgrupper separat kan larmsystemet delas in i områden. Se avsnitt 5.2, fönstret ”System options”, för hur du delar in systemet och ställer in de områdesegenskaper som behövs.

    2.  **Sektioner.** Se avsnitt 5.7, fönstret ”Zones”, för hur du ställer in varje sektion efter detektorernas egenskaper och hur larmet ska fungera när en händelse inträffar i sektionen. Om larmsystemet är indelat i områden kan varje sektion tilldelas ett valfritt område.

    3.  **Användare.** Systemets *användare* måste skapas för att larmsystemet ska kunna styras med knappsats, iButton-nyckel eller telefonsamtal (SMS). Se avsnitt 5.4, fönstret ”Users & Reporting”, för hur du skapar *användare* och ger dem behörigheter.

3.  Sändning av meddelanden:

    1.  **Tidsinställning.** Centralapparatens tid måste vara inställd för att meddelandena ska få rätt tidsstämpel. Se avsnitt 5.2, fönstret ”System options”.

    2.  **Aktivera rapportsändning.** Med förvalen är funktionen för sändning av händelserapporter aktiverad för alla händelser. Om en händelse inträffar skickas rapporten till de inställda mottagarna via de inställda kanalerna. Se avsnitt 5.10, fönstret ”System events”, för hur du avaktiverar rapportering av vissa händelser.

    3.  **SIM-kortets parametrar.** Om meddelanden ska skickas via mobilnät måste du ställa in parametrarna för det SIM-kort som används (se avsnitt 5.2, fönstret ”System options”).

    4.  **Rapporter till larmcentralen.** Sändning av rapporter till larmcentralen är avaktiverad som förval. Se avsnitt 5.3, fönstret ”Reporting to CMS”, för hur du ställer in sändning av meddelanden till larmcentralen.

    5.  **Rapporter till användaren.** Kommunikationen med Protegus Cloud är aktiverad som förval, och sändning av rapporter via SMS och telefonsamtal är avaktiverad. Se avsnitt 5.10, fönstret ”System events”, för hur du ställer in sändning av rapporter till användarens mobiltelefon.

4.  Fjärrstyrning av systemet:

    1.  **Användaråtkomst.** Larmsystemet kan fjärrstyras (via telefonsamtal och/eller SMS) av användare vars telefonnummer finns i användarlistan. Se avsnitt 5.4, fönstret ”Users & Reporting”, för hur du anger telefonnummer.

    2.  **Styrning med telefonsamtal.** Med telefonsamtal kan du inte bara tillkoppla eller frånkoppla hela eller delar av larmsystemet, utan också styra (slå på och av) utrustning som är ansluten till PGM-utgångar. Se avsnitt 4.4 ”Styrning med telefonsamtal” för vilka parametrar som ska ändras för att telefonsamtal ska kunna ändra tillståndet för en vald PGM-utgång med en ansluten styrkrets för utrustning.

    3.  **Styrning med SMS.** Med SMS kan du ändra vissa av centralapparatens driftparametrar, tillkoppla eller frånkoppla hela eller delar av lokalen och styra (slå på och av) utrustning som är ansluten till PGM-utgångarna. Se listan över SMS-kommandon i avsnitt 4.3 ”Konfigurering och styrning med SMS”.

5.  Dessutom:

    1.  **Byt styrkoder.** Vi rekommenderar att du byter centralapparatens förvalda koder för larmstyrning och konfigurering mot koder som bara du känner till.

        - Användarkoden för **Master** kan ändras under **Users & Reporting** i programmets meny.

        - Koden för **fjärrstyrning med SMS** kan ändras i fönstret **System options** i programmets meny, i fältet **SMS Password** i avsnittet **Access**.

        - **Åtkomstkoderna för anslutning med TrikdisConfig** kan ändras i avsnittet **Access** under **System options** i programmets meny.

### Ansluta detektorer

Kretskortet har 10 plintar IO1–IO10 (ingångar) för anslutning av detektorkretsar. Antalet ingångar kan utökas till 64 med utbyggnadsmoduler för ingångar (***iO, iO8, iO-WL, RF-SH, iO-LORA, iO8-LORA**)*. Varje plint kan ställas in som ingång och tilldelas sektionsegenskaper: kretstyp (NO, NC, EOL, EOL_T, 3EOL, ATZ, ATZ_T), känslighet för tillfälliga händelser i kretsen och sektionsfunktion (Delay, Instant, Instant Stay, Interior, Interior Stay, Fire, Keyswitch, 24_hour, Silent, Silent 24h), se avsnitt 5.7, fönstret ”Zones”. Utbyggnadsmodulerna iO8 och iO8-LORA stöder alla typer av sektionsmotstånd (EOL-typer) som centralapparaten har.

#### Kopplingsscheman för anslutning av detektorer.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Detektorkrets, normalt öppen (NO): en NO-kontakt som sluter förbinder IOx med C när den påverkas." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Detektorkrets, normalt sluten (NC): en sluten NC-kontakt förbinder IOx med C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image10.webp" alt="Motståndstabell med kolumnerna RT, R1 och R2. De sju raderna är 2.2k, 2.2k, 4.7k; 1k, 1k, 2.2k; 5.6k, 5.6k, 3.3k; 5.6k, 3.3k, 5.6k; 3.3k, 6.8k, 3.3k; 2.2k, 4.7k, 8.2k; och 4.7k, 4.7k, 2.2k." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image11.webp" alt="Normalt öppen med slutmotstånd (EOL): mellan IOx och C ligger motståndet R1 parallellt med NO-kontakten." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image12.webp" alt="Normalt sluten med slutmotstånd (EOL): NC-kontakten och motståndet R1 ligger i serie mellan IOx och C." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image13.webp" alt="Normalt sluten med slutmotstånd och igenkänning av sabotage och ledningsfel (EOL_T): från IOx ligger sabotagekontakten (NC) och motståndet RT i serie; larmkontakten (NC) och motståndet R1 ligger parallellt mellan RT och C." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image14.webp" alt="Normalt sluten utan slutmotstånd (ATZ): två detektorkretsar ligger i serie mellan IOx och C. Detektorplint 1 har en NC-kontakt parallellt med R1; detektorplint 2 har en NC-kontakt parallellt med R2." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image15.webp" alt="Normalt sluten med slutmotstånd och igenkänning av sabotage och ledningsfel (ATZ_T): två detektorkretsar ligger i serie mellan IOx och C. Detektorplint 1 har en sabotagekontakt (NC) och RT i serie, följd av en NC-kontakt parallellt med R1. Detektorplint 2 har en sabotagekontakt (NC) i serie, följd av en NC-kontakt parallellt med R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Normalt sluten med slutmotstånd och igenkänning av sabotage och ledningsfel (3EOL): mellan IOx och C ligger en sabotagekontakt (NC) och RT i serie med två delar. Delen Alarm har en NC-kontakt parallellt med R1; delen Anti-masking har en NC-kontakt parallellt med R2." src="./image16.webp" style="width:3.15000656167979in;height:1.6633366141732283in" />

### Ansluta rökdetektorer

Upp till 5 tvåtrådsbranddetektorer kan anslutas till FLEXi SP3.

Kopplingsschema för anslutning av tvåtrådsrökdetektorer till PGM-utgångar (LED). När du använder det här schemat för att ansluta branddetektorer måste du markera fältet ”**LED out as 2Wire fire**” (se avsnitt 5.2, fönstret ”System options”).

<img alt="Kopplingsschema: SP3 till tvåtrådsrökdetektorer. AUX+ till den första detektorns + IN och LED till dess − IN; varje detektors + OUT och − OUT fortsätter till nästa detektors motsvarande IN-plintar. Ett slutmotstånd på 2,2 kΩ förbinder plus- och minusledningen efter den sista detektorn." src="./image17.webp" style="width:4.6266765091863515in;height:1.3666699475065618in" />

Kopplingsschema för anslutning av fyrtrådsrökdetektorer.

För att ansluta en rökdetektorkrets till en vald ingång måste ingången (IOx) tilldelas sektionsfunktionen Fire (se avsnitt 5.7, fönstret ”Zones”).

För att ansluta en fyrtrådsrökdetektorkrets till en vald PGM-utgång (IO10) måste utgången tilldelas funktionen Fire Sensor Reset (se avsnitt 5.8, fönstret ”PGM”). Reläet K1 används för att upptäcka kabelbrott och att en branddetektor har tagits bort.

<img alt="Kopplingsschema för fyrtrådsrökdetektorer och relä K1. Uppifrån och ned ansluts SP3:s AUX+, IOx, C och IO10 till den första detektorns plintar +, övre kontakt, nedre kontakt och − IN. Var och en av de fyra OUT-plintarna fortsätter till motsvarande IN-plint på nästa detektor. Efter den sista detektorn ligger K1-kontakten och slutmotståndet R1 i serie mellan ledningarna IOx och C. Reläet K1:s spole ansluts mellan ledningarna AUX+ och IO10." src="./image18.webp" style="width:5.560010936132984in;height:1.4533366141732282in" />

Kopplingsschema för anslutning av tvåtrådsrökdetektorer. Reläet K1 används för att upptäcka kabelbrott och att en branddetektor har tagits bort.

<img alt="Kopplingsschema: SP3 till SM1 och tvåtrådsrökdetektorer. AUX+ till SM1 +12V och detektorns + IN; IO10 till SM1 -12V och reläet K1:s spole; SM1 R till detektorns - IN. Detektorns IN- och OUT-plintar fortsätter längs kretsen; den sista + OUT ansluts till K1. Övervakningskrets: IOx till SM1 C; SP3 C via slutmotståndet R1 och K1-kontakten till SM1 NC." src="./image19.webp" style="width:5.8900120297462815in;height:2.0500043744531933in" />

Eller

<img alt="Kopplingsschema: alternativ anslutning av SP3 till SM1 och tvåtrådsrökdetektorer. AUX+ till SM1 +12V och detektorns + IN; IO10 till SM1 -12V och reläet K1:s spole; SM1 R till detektorns - IN. Detektorns IN- och OUT-plintar fortsätter längs kretsen; den sista + OUT ansluts till K1. Övervakningskrets: IOx till SM1 C; slutmotståndet R1 mellan SM1 C och NO; SP3 C via K1-kontakten till SM1 NO." src="./image20.webp" style="width:5.8900120297462815in;height:2.00667104111986in" />

### Kopplingsschema för anslutning av en siren

<img alt="Kopplingsschema: SP3 till siren. BELL + till sirenens röda ledning; BELL - till den svarta ledningen." src="./image21.webp" style="width:3.096673228346457in;height:1.2166688538932633in" />

<img alt="Kopplingsschema: SP3 till utomhussirenen MR100. BELL + (+12V) till Vdd; BELL - till S och L; AUX - till GND; C och IO9 till de två SAB-plintarna. Bygelanslutningar visas vid PL+, PS+, L-, S-, S1 och 4; övriga lägen är märkta PL-, PS-, L+, S+, S2, 1 och 16. JPS1 ON: R_SAB = 0 Ω; JPS1 OFF: R_SAB = 2,2 kΩ." src="./image22.webp" style="width:5.076676509186352in;height:1.8933377077865268in" />

Bilden visar anslutningen och inställningarna för utomhussirenen **MR100**. Om centralapparaten ska övervaka sirenens sabotagekrets (SAB-plintarna) med ett annat slutmotstånd (EOL; fabriksinställningen är 2,2 kΩ) måste du sluta kontakterna JPS1 och ansluta ett motstånd med motsvarande värde i serie med sabotagekretsen. Sektionstypen **24_hours** är fabriksinställd för ingången IO9.

### Kopplingsscheman för anslutning av knappsatser och RFID-läsare (Wiegand 26/34)

Upp till 8 enheter kan anslutas till knappsatsbussen. Typen av ansluten knappsats måste anges i programmet TrikdisConfig (se avsnitt 5.5, fönstret ”Modules”). Centralapparaten identifierar och länkar de anslutna enheterna automatiskt.

Hur du styr larmet med Protegus- eller Paradox-knappsatser, inklusive användarkoder, förbikoppling, iButton/RFID, samtal, SMS och PGM-utgångar, beskrivs i [SP3-användarhandboken för Protegus- och Paradox-knappsatser](paradox-user-guide/index.md).

<img alt="Två kopplingsscheman. SP3 till knappsats: AUX+ (+12V) till RED, AUX- till BLK, GRN till GRN, YEL till YEL; knappsatsens ZONE ansluts via en sektionsbrytare på knappsatsen till AUX-. Knappsatser som anges: SK-LED TouchPad, SK-LCD TouchPad, SK LCD Button, SK LED Button, Paradox K636, K10H(V), K32 LED, K32+ LED, K32LCD+, K35, TM50 och TM70. SP3 till knappsatsen Crow CR16 eller CR-LCD: AUX+ (+12V) till POS, AUX- till NEG, GRN till DATA, YEL till CLOCK." src="./image23.webp" style="width:7.016680883639545in;height:1.7333366141732283in" />

<img alt="Kopplingsschema: SP3 till knappsats och Wiegand 26/34-läsare för ingång. AUX+ (+12V) till knappsatsens RED och läsarens R, röd (+U); AUX- till knappsatsens BLK och läsarens B, svart (GND); GRN till knappsatsens GRN; YEL till knappsatsens YEL; IO1 till läsarens G, grön (D0); IO2 till läsarens W, vit (D1). Knappsatser som anges: SK-LED TouchPad, SK-LCD TouchPad, SK LCD Button, SK LED Button, Paradox K636, K10H(V), K32 LED, K32+ LED, K32LCD+, K35, TM50 och TM70." src="./image24.webp" style="width:4.100008748906387in;height:3.4566732283464567in" />

<img alt="Kopplingsschema: SP3 till knappsatsen Crow CR16 eller CR-LCD och Wiegand 26/34-läsare för ingång. AUX+ (+12V) till knappsatsens POS och läsarens R, röd (+U); AUX- till knappsatsens NEG och läsarens B, svart (GND); GRN till knappsatsens DATA; YEL till knappsatsens CLOCK; IO1 till läsarens G, grön (D0); IO2 till läsarens W, vit (D1)." src="./image25.webp" style="width:4.11334208223972in;height:3.12000656167979in" />

Upp till 2 RFID-läsare kan anslutas till centralapparaten. Om 2 RFID-läsare är anslutna kan inga knappsatser anslutas.

<img alt="Kopplingsschema: SP3 till Wiegand 26/34-RFID-läsare för ingång med knappsats. AUX+ (+12V) till R, röd ledning (+U); AUX- till B, svart ledning (GND); GRN till G, grön ledning (D0); YEL till W, vit ledning (D1)." src="./image26.webp" style="width:4.090008748906387in;height:1.7633366141732283in" />

<img alt="Kopplingsschema: SP3 till två Wiegand 26/34-RFID-läsare med knappsatser. Läsare för ingång: AUX+ (+12V) till R, röd (+U); AUX- till B, svart (GND); GRN till G, grön (D0); YEL till W, vit (D1). Läsare för utgång: gemensam AUX+ till R och AUX- till B; IO1 till G och IO2 till W." src="./image27.webp" style="width:4.090008748906387in;height:3.2233398950131233in" />

### Kopplingsscheman för anslutning av läsarna TM17 och CZ-Dallas

Läsaren **CZ-Dallas** för iButton-nycklar ansluts till FLEXi SP3 via databussen ”*1 Wire*”. Ledningarna till databussen får vara upp till 30 m långa:

<img alt="Kopplingsschema: SP3 till läsaren CZ-Dallas. AUX+ via separata motstånd på 1k till den bruna ledningen RED LED+ och den gröna ledningen GREEN LED+; LED ansluts också till den gröna ledningen efter dess motstånd. 1 W till den vita ledningen; C till den gula ledningen LED- och den grå ledningen. Ställ in LED-utgången på ’System state’: läsarens lampa är röd vid tillkoppling och gul vid frånkoppling." src="./image28.webp" style="width:4.896676509186352in;height:2.7000054680664918in" />

Läsaren **TM17** ansluts till FLEXi SP3 via databussen *RS485*. Ledningarna till *RS485*-databussen får vara upp till 100 m långa.

<img alt="Kopplingsschema: SP3 till läsaren TM17. AUX+ (+12V) till röd ledning; AUX- till blå ledning; 485 A till svart ledning; 485 B till vit ledning." src="./image29.webp" style="width:3.840007655293088in;height:2.04667104111986in" />

### Kopplingsschema för anslutning av en temperaturgivare

**Temperaturgivare** ska anslutas enligt schemat. Temperaturgivarna Maxim®/Dallas® DS18S20 och DS18B20 (upp till 8) eller temperatur- och fuktgivaren AM2301 (upp till 1) kan anslutas till centralapparaten FLEXi SP3.

Om en ledning längre än 0,5 meter används för att ansluta en temperaturgivare rekommenderar vi **partvinnad kabel (UTP4x2x0,5 eller STP4x2x0,5)**.

Plinten +5V på kretskortet matar enheter som är anslutna till 1-Wire-bussen med 5 V DC. Maximal utström är 0,2 A. Utgången är överlastskyddad. Om den högsta tillåtna strömmen överskrids stängs matningen automatiskt av. Centralapparaten identifierar och länkar anslutna enheter automatiskt.

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image30.webp" alt="Kopplingsschema: SP3 till temperaturgivaren DS18B20. +5V till +Vdd med röd ledning; 1 W till DQ med gul ledning; C till GND med svart ledning." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image31.webp" alt="Kopplingsschema: SP3 till temperatur- och fuktgivaren AM2301. +5V till +Vdd med röd ledning; 1 W till DQ med gul ledning; C till GND med svart ledning." style="width: 100%; height: auto;" />
  </figure>
</div>

### Kopplingsscheman för anslutning av ett relä och en LED-indikering

Med reläplintarna kan olika elektriska enheter styras (slås på och av) på distans. Centralapparatens universella I/O-plint måste vara inställd som utgång (OUT) och tilldelas definitionen Remote control.

<img alt="Två kopplingsscheman. Relä: SP3:s AUX+ och IOx ansluts över reläspolen; reläets kontaktplintar är NC, C och NO. LED-indikering: SP3:s AUX+ ansluts via ett motstånd på 2k2 och en lysdiod i serie till IOx." src="./image32.webp" style="width:3.984722222222222in;height:0.9652777777777778in" />

### Kopplingsschema för anslutning av Ethernet-larmsändaren E485

Modulen *E485* gör att centralapparaten kan skicka och ta emot styrkommandon via en kabelansluten internetanslutning. Om en *E485*-modul är ansluten till centralapparaten skickas rapporter till larmcentralen och till *Protegus2* via den kabelanslutna internetanslutningen, och mobil internetanslutning används inte. Om den kabelanslutna internetanslutningen bryts används mobil internetanslutning för att skicka rapporter till larmcentralen. När den kabelanslutna internetanslutningen kommer tillbaka slutar centralapparaten automatiskt använda mobil internetanslutning och återgår till att kommunicera med larmcentralen och mobilappen *Protegus2* via *E485*, alltså via den kabelanslutna internetanslutningen.

<img alt="Kopplingsschema: SP3 till Ethernet-larmsändaren E485. AUX+ (+12V) till + DC; AUX- till - DC; 485 A till A 485; 485 B till B 485. E485 ansluts till en LAN-kabel; RS485-anslutning upp till 100 m." src="./image33.webp" style="width:3.3033398950131234in;height:1.6066699475065618in" />

Se avsnitt 5.3, fönstret ”Reporting to CMS”, för hur du väljer prioritet för anslutningarna (SIM, WiFi, LAN(E485)). Hur FLEXi SP3 konfigureras för Ethernet-modulen E485 beskrivs i avsnitt 5.5, fönstret ”Modules”.

Om E485 är ansluten behövs inget SIM-kort i centralapparaten.

### Kopplingsschema för anslutning av RF-SH

Firmwareversionen i centralapparaten *FLEXi SP3* måste vara SP3_xxx0_0101.fw (firmwareversion 1.01 eller senare). Med den trådlösa detektormottagaren *RF-SH* ansluten kan *FLEXi SP3* arbeta med trådlösa detektorer (upp till 32), trådlösa sirener (upp till 16), fjärrkontroller (upp till 42) och trådlösa knappsatser (upp till 8) från ”Crow”.

<img alt="Kopplingsschema: SP3 till RF-SH. SP3:s AUX+ (+12 V) till RF-SH +DC, AUX- till -DC, 485 A till A RS 485 och 485 B till B RS485." src="./image34.webp" style="width:2.5466721347331585in;height:1.2500021872265967in" />

### Kopplingsschema för anslutning av RTX3

Firmwareversionen i centralapparaten *FLEXi SP3* måste vara SP3_xxx1_0112.fw (firmwareversion 1.12 eller senare). Med den trådlösa detektormottagaren RTX3 ansluten kan *FLEXi SP3* arbeta med trådlösa enheter från ”Paradox” (magnetkontakter, PIR-detektorer, glaskrossdetektorer (G550), rökdetektorer (SD360), fjärrkontroller (REM2, REM25), sirener (SR230, SR250), knappsatser (K37), PGM- och sektionsutbyggnadsmodul (2WPGM), repeater (RPT1)).

Firmware för RTX3, anslutning samt hur Paradox trådlösa enheter läggs till eller tas bort beskrivs i [Använda trådlösa Paradox-enheter med FLEXi SP3 (RTX3)](paradox-rtx3/index.md).

<img alt="Kopplingsschema: SP3 till RTX3. SP3:s AUX+ (+12V) till RTX3 RED, AUX- till BLK, GRN till GRN och YEL till YEL." src="./image35.webp" style="width:2.233337707786527in;height:1.23333552055993in" />

### Kopplingsschema för anslutning av RF-HW

Firmwareversionen i centralapparaten *FLEXi SP3* måste vara SP3_xxx2_0114.fw (firmwareversion 1.14 eller senare). Med den trådlösa detektormottagaren *RF-HW* ansluten är *FLEXi SP3* kompatibel med trådlösa detektorer, sirener, knappsatser och fjärrkontroller från ”Honeywell”.

<img alt="Kopplingsschema: SP3 till RF-HW. SP3:s AUX+ (+12 V) till RF-HW +DC, AUX- till -DC, 485 A till A 485 och 485 B till B 485." src="./image36.webp" style="width:2.6400054680664917in;height:1.2366688538932633in" />

### Kopplingsschema för anslutning av RF-S8

Firmwareversionen i centralapparaten *FLEXi SP3* måste vara SP3_xxx4_0122.fw (firmwareversion 1.22 eller senare). Med den trådlösa detektormottagaren *RF-S8* ansluten är *FLEXi SP3* kompatibel med trådlösa detektorer, sirener och fjärrkontroller från ”S8”.

<img alt="Kopplingsschema: SP3 till RF-S8. SP3:s AUX+ (+12 V) till RF-S8 +DC, AUX- till -DC, 485 A till A 485 och 485 B till B 485." src="./image37.webp" style="width:2.6400054680664917in;height:1.2200021872265967in" />

### Kopplingsschema för anslutning av RF-LORA

Firmwareversionen i centralapparaten *FLEXi SP3* måste vara SP3_xxx4_0122.fw (firmwareversion 1.22 eller senare). Med en trådlös detektormottagare *RF-LORA* ansluten kan *FLEXi SP3* arbeta med trådlösa detektorer (upp till 32), sirener (upp till 16) och fjärrkontroller (upp till 32) från företaget ”Maximum”. Hur FLEXi SP3 konfigureras med utbyggnadsmoduler beskrivs i avsnitt 5.5, fönstret ”Modules”.

<img alt="Kopplingsschema: SP3 till RF-LORA. SP3:s AUX+ (+12 V) till RF-LORA +DC, AUX- till -DC, 485 A till A 485 och 485 B till B 485." src="./image38.webp" style="width:2.8700054680664917in;height:1.2566688538932633in" />

### Kopplingsscheman för utbyggnadsmoduler i serien LORA

<img alt="Kopplingsschema: SP3:s AUX+ (+12 V), AUX-, 485 A och 485 B ansluts till RF-LORA +DC, -DC, A 485 respektive B 485. RF-LORA arbetar trådlöst, upp till 5 000 m, med iO-LORA, iO-8-LORA, PB-LORA och REL-LORA. REL-LORA L och N ansluts till 100–230 V AC; iO-8-LORA +DC och -DC ansluts till en matning på 12–26 V. PB-LORA visas utan ledningar. iO-LORA +DC och -DC ansluts till 12 V DC. Dess D0, D1, -DC och +DC ansluts till Wiegand 26/34-läsarens ledningar G, W, B respektive R. Dess 1-Wire ansluts till CZ-Dallas-läsarens vita ledning; COM ansluts till dess grå ledning och till LED- via den gula ledningen. Gränsen för 1-Wire-anslutningen är 30 m. iO-LORA C ansluts till +DC; NO ansluts via ett motstånd på 1k till RED LED+ via den bruna ledningen, och NC ansluts via ett motstånd på 1k till Green LED+ via den gröna ledningen. Ställ in xOUT på System State: vid larm lyser läsaren rött, utan larm lyser den grönt." src="./image39.webp" style="width:7.086805555555555in;height:5.3694444444444445in" />

### Kopplingsscheman för utbyggnadsmoduler i serien iO

Om centralapparaten FLEXi SP3 behöver fler ingångar IN eller utgångar OUT ansluter du en trådbunden eller trådlös TRIKDIS utbyggnadsmodul för ingångar och utgångar i serien iO. Hur FLEXi SP3 konfigureras för utbyggnadsmoduler beskrivs i avsnitt 5.5, fönstret ”Modules”.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; max-width: 66%;">
  <figure style="margin: 0;">
    <img src="./image40.webp" alt="Kopplingsschema: SP3 till iO-8. SP3:s AUX+ (+12 V) till iO-8 +DC, AUX- till -DC, 485 A till A och 485 B till B." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image41.webp" alt="Kopplingsschema: SP3 till iO-WL. SP3:s AUX+ (+12 V) till iO-WL +DC, AUX- till -DC, 485 A till A RS485 och 485 B till B RS485." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Kopplingsschema: SP3:s BAT+ och BAT- ansluts till ett 12 V-batteri. SP3:s AUX+ och AUX- ansluts med röda och blå ledningar till +DC och -DC på de trådbundna iO-MOD och iO; 485 A och 485 B ansluts med svarta och vita ledningar till deras A RS485 och B RS485. De två iO-MOD-modulerna som visas är var och en trådlöst länkad till en iO-WL, upp till 300 m. Den övre iO-WL och iO delar en matning på 12–28 V vid +DC och -DC; deras A RS485 och B RS485 ansluts via RS485 upp till 300 m. Den övre iO:s +5V, 1-Wire och COM ansluts till Vdd+, DQ och GND på en temperaturgivare DS18B20 eller DS18S20. Den nedre iO-WL har en matning på 12–28 V. Dess 1-Wire ansluts till CZ-Dallas-läsarens vita ledning; COM ansluts till dess grå ledning och till LED- via den gula ledningen. Gränsen för 1-Wire-anslutningen är 30 m. Den nedre iO-WL:s C ansluts till +DC; NO ansluts via ett motstånd på 1k till RED LED+ via den bruna ledningen, och NC ansluts via ett motstånd på 1k till Green LED+ via den gröna ledningen. Ställ in xOUT på System State: vid larm lyser läsaren rött, utan larm lyser den grönt. Schemat anger upp till 8 systemutbyggnadsmoduler och upp till 4 iO-MOD-moduler." src="./image42.webp" style="width:7.086805555555555in;height:4.539583333333334in" />

### Kopplingsscheman för anslutning av radiosändaren T16

Radiosändaren T16 används för att överföra centralapparatens händelsemeddelanden via TRIKDIS radionät. Sändaren kan skicka egna händelsemeddelanden och händelsemeddelanden som tas emot från centralapparater till larmcentralen (CMS), med möjlighet att vidarebefordra dem till slutanvändaren.

<img alt="Kopplingsschema: SP3 till T16. SP3:s AUX+ (+12 V) till T16 +DC, AUX- till -DC, 485 A till A 485 och 485 B till B 485." src="./image43.webp" style="width:2.27667104111986in;height:1.2566688538932633in" />

### Kopplingsscheman för anslutning av SF485

*SF485* fungerar som sekundär kanal för överföring av centralapparatens händelser till larmcentralen (CMS) eller mobilappen *Protegus2* över Sigfox-nätet när den primära kanalen fallerar. Händelserna överförs i formatet Contact ID.

<img alt="Kopplingsschema: SP3 till SF485. SP3:s AUX+ (+12 V) till SF485 +DC, AUX- till -DC, 485 A till A 485 och 485 B till B 485." src="./image44.webp" style="width:2.31667104111986in;height:1.2300021872265967in" />

### Mäta likspänning med FLEXi SP3

*FLEXi SP3* kan användas för att mäta likspänning. Spänning från 0 V till 30 V mäts (över 30 V skadas centralapparaten *FLEXi SP3*). Den spänning som ska mätas måste anslutas till plintarna ”IN1” och ”C”. ”IN1” är pluspol och ”C” är minuspol.

<img alt="Kopplingsschema: SP3 till utrustning vars spänning mäts. SP3:s IN1 ansluts till utrustningens +U och SP3:s C till utrustningens -U." src="./image45.webp" style="width:3.516674321959755in;height:0.8000010936132983in" />

Anslut FLEXi SP3 till en dator med en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C). Starta TrikdisConfig. Programmet identifierar automatiskt den anslutna FLEXi SP3 och öppnar ett fönster för konfigurering. I fönstret ”**Sensor**” anger du ”**In1 Voltage**” och anger också den spänning över vilken ett meddelande ska genereras.

- **Max** – när spänningen är högre än den här inställningen genereras ett händelsemeddelande. För att ett händelsemeddelande ska genereras måste rutan ”**High**” vara markerad.

- **Min** – när spänningen är lägre än den här inställningen genereras ett händelsemeddelande. För att ett händelsemeddelande ska genereras måste rutan ”**Low**” vara markerad.

<img alt="TrikdisConfig, fönstret Sensors. Den markerade raden ID 1 har Module type In1 Voltage, Sensor name Sensor 1, Max 15, Min 6, High och Low markerade samt Delay, min 0." src="./image46.webp" style="width:7.086614173228346in;height:2.106299212598425in" />

PGM-utgången kan styras när en spänning över eller under ett inställt värde mäts. I TrikdisConfig väljer du PGM-utgången och ställer in driftläget ”**Remote Control**”.

<img alt="TrikdisConfig, fönstret PGM, fliken Outputs. Den markerade PGM No 3 har Name PGM 3, PGM output SP3 10 I/O, Output definition Remote Control och Pulse Time, s 20." src="./image47.webp" style="width:7.086614173228346in;height:1.9173228346456692in" />

Gå till fliken ”**Set Action**”.

<img alt="TrikdisConfig, fönstret PGM, fliken Set Action. Den markerade raden ID 1 har Enable markerad, PGM No. PGM3 - SP3 10 I/O, Action PGM ON, Pulse Time, s 0, Factor Sensor, Factor No. S1, Start when Higher than set och Set value 13." src="./image48.webp" style="width:7.086614173228346in;height:1.9173228346456692in" />

- **Enable** – aktiverar PGM:en.

- **PGM No.** – ange den PGM-utgång som ingången ”**IN1**” ska styra.

- **Action** – ställ in PGM-utgångens driftläge:
- **PGM OFF** – stänger av PGM-utgången.

- **PGM ON** – aktiverar PGM-utgången.

- **Pulse OFF -** stänger av PGM-utgången under pulstiden (efter att ha tagit emot kommandot stängs utgången av under pulstiden och slås sedan på)**.**

- **Pulse ON** – slår på PGM-utgången under pulstiden (efter att ha tagit emot kommandot slås utgången på under pulstiden och stängs sedan av).
- **Pulse time, s** – ställ in pulstiden från 0 till 9999 sekunder.
- **Factor** – ställ in givare.

- **Factor No.** – tilldela en ingång för spänningsmätning ”**IN1**”.

- **Start when** – ställ in ett extra villkor för att aktivera PGM-utgången.

- **Set value** – ange den spänning (V) som centralapparaten ska övervaka och styra PGM-utgången efter.

### Slå på centralapparaten

För att slå på centralapparaten slår du först på dess matning. Centralapparatens lysdioder måste fungera på följande sätt:

- Lysdioden PWR ska blinka grönt – det visar att matningsspänningen är tillräcklig;

- Lysdioden NET ska lysa fast grönt och regelbundet blinka gult minst 3 gånger – grönt betyder att SIM-kortet har registrerats i mobilnätet, och antalet gula blink visar mobilsignalens styrka.

!!! note "Obs!"
    Tillräcklig mobilsignal är 3 (tre gula blink från lysdioden NET). Om du ser färre gula blink från NET-lysdioden är mobilsignalen för svag. Vi rekommenderar att du väljer en annan plats för centralapparaten, flyttar antennen eller använder en känsligare mobilantenn. Om lysdiodernas indikering är en annan, se avsnitt 1.5 ”Lysdiodernas indikering” för orsaken. Om alla indikeringar på FLEXi SP3 är släckta kontrollerar du matningen och anslutningarna.

## Fjärrstyrning

### Länka FLEXi SP3 till en användares Protegus2-konto

Med Protegus2 kan användarna styra larmsystemet på distans. De kan också se systemets status och ta emot händelserapporter från systemet.

1.  Om du ännu inte har ett eget konto i Protegus Cloud öppnar du sidan [www.protegus.app](https://www.protegus.app) i en webbläsare och skapar ett konto genom att klicka på länken ”*Sign up*”.

    <div style="margin: 20px 0; text-align: center;">
      <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-android.webp" alt="Hämta på Google Play" style="height:50px;">
      </a>
      <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-web.webp" alt="Öppna webbappen" style="height:50px;">
      </a>
      <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;">
        <img src="./protegus-ios.webp" alt="Ladda ned på App Store" style="height:50px;">
      </a>
    </div>

2.  Klicka på länken i e-postmeddelandet du får för att aktivera kontot.

3.  Ladda ned och installera mobilappen Protegus2 på din smartphone.
4. Starta mobilappen Protegus2 på din smartphone och logga in med ditt användarnamn och lösenord.

!!! warning "Viktigt"
    När du lägger till FLEXi SP3 i Protegus2:

    1.  Ett aktiverat SIM-kort måste vara isatt och PIN-koden måste vara angiven eller avstängd, eller så måste centralapparaten vara ansluten till ett WiFi-nätverk;

    2.  Molntjänsten Protegus Cloud måste vara aktiverad. Se avsnitt 5.4 ”Users & Reporting” (fliken **Protegus**);

    3.  Matningen måste vara påslagen (lysdioden ”POWER” ska lysa fast grönt);

    4.  Centralapparaten måste vara ansluten till nätverket (lysdioden ”NET” ska lysa fast grönt vid anslutning till mobilnätet och/eller lysdioden ”MOD” ska lysa fast grönt vid anslutning till WiFi-nätverket).
5. Klicka på ”Add new system” och ange numret ”*Unique ID/IMEI*” för *FLEXi SP3*. Du hittar det på etiketten på förpackningen. När du har angett ID:t klickar du på ”Next”.

<img alt="Protegus2, skärmen Scan QR code med fältet Unique ID/IMEI, knappen Scan QR code och Next. En förklaring anger att IMEI-numret finns på förpackningen, på centralapparaten eller i TrikdisConfig som Unique ID." src="./image50.webp" style="width:2.811023622047244in;height:3.8464566929133857in" />

### Tillkoppla och frånkoppla systemet med Protegus2

1.  Öppna Protegus2 för att styra systemet.

2.  Klicka på knappen ”Armed” (eller ”Disarmed”) i Protegus2. Ange centralapparatens användarkod i fönstret som öppnas.

3.  Om programmet inte svarar på dina kommandon eller om programfönstrens utseende är helt annorlunda går du till  
    *Settings* -> *System configuration* -> System out of sync? och klickar på knappen ”Sync”.

<img alt="Protegus2, systemskärmen med två områden: Sritis 1 är tillkopplat (Armed) och Sritis 2 är frånkopplat (Disarmed). Varje område har reglagen Arm och Disarm." src="./image51.webp" style="width:2.220472440944882in;height:3.279527559055118in" />

### Konfigurering och styrning med SMS

Centralapparaten FLEXi SP3 kan styras och konfigureras på distans med SMS.

SMS-meddelandets uppbyggnad: Kommando `[mellanslag]` Lösenord `[mellanslag]` Data

Centralapparatens förvalda SMS-lösenord är **123456**. Av säkerhetsskäl rekommenderar vi att du byter det mot något som bara du känner till, och att du inte glömmer lösenordet!

#### Lista över SMS-kommandon

| **Kommando** | **Data** | **Beskrivning** |
|----|----|----|
| *INFO* |  | Begär information om centralapparaten. Svaret innehåller objektnamn, områdenas status, IMEI-nummer, mobilsignalens styrka, firmwareversion och serienummer. T.ex.: INFO 123456 |
| *RESET* |  | Starta om enheten. T.ex.: RESET 123456 |
| *OUTPUTx* | *ON* | Slå på en utgång, ”x” är utgångens nummer. T.ex.: OUTPUT1 123456 ON |
|  | *OFF* | Stäng av en utgång, ”x” är utgångens nummer. T.ex.: OUTPUT1 123456 OFF |
|  | *PULSE=ttt* | Slå på en utgång under en angiven tid – ”x” är utgångens OUT-nummer och ”ttt” är ett tresiffrigt tal som anger pulstiden i sekunder. T.ex.: OUTPUT1 123456 PULSE=002 |
| *PSW* | *New password* | Byt lösenord. T.ex.: PSW 123456 654123 |
| *TIME* | *YYYY/MM/DD,12:00:00* | Ställ in datum och tid. T.ex.: TIME 123456 2025/05/09,10:02:00 |
| *TXTA* | *Object name* | Ange objektnamn. T.ex.: TXTA 123456 Namas |
| *RDR* | *PhoneNR#SMStext* | Vidarebefordrar SMS till det angivna numret. Telefonnumret måste börja med ett ”+” och landskoden. T.ex.: RDR 123456 +37061234567#forwarded text |
| *ASKI* |  | Skicka ett SMS med ingångarnas (IN) status. T.ex.: ASKI 123456 |
| *ASKO* |  | Skicka ett SMS med utgångarnas (OUT) status. T.ex.: ASKO 123456 |
| *ASKA* |  | Skicka ett SMS med områdenas status. T.ex.: ASKA 123456 |
| *ASKT* |  | Skicka ett SMS med värdena från alla temperaturgivare. T.ex.: ASKT 123456 |
| *DISARM* | *SYS:x* | Frånkoppla larmet, ”x” är områdets nummer (1–8). T.ex.: DISARM 123456 SYS:1 |
| *ARM* | *SYS:x* | Tillkoppla larmet, ”x” är områdets nummer (1–8). T.ex.: ARM 123456 SYS:1 |
| *STAY* | *SYS:x* | Tillkoppla område ”x” i hemmaläge, ”x” är områdets nummer (1–8). T.ex.: STAY 123456 SYS:1 |
| *SLEEP* | *SYS:x* | Tillkoppla område ”x” i nattläge, ”x” är områdets nummer (1–8). T.ex.: SLEEP 123456 SYS:1 |
| *FRS* |  | Återställer branddetektorns utgång om utgången OUT har funktionen ”Fire sensor reset”. T.ex.: FRS 123456 |
| *SETN* | *PhoneX=PhoneNR#Name#email* | Lägg till ett telefonnummer och ett användarnamn och tilldela dem till användare ”x”. ”x” är telefonnumrets rad i listan. Telefonnumret måste börja med ett ”+” och landskoden. Telefonnumret och användarnamnet måste separeras med tecknet \#. T.ex.: SETN 123456 PHONE5=+37061234567#JOHN#john@peter.com |
|  | *PhoneX=DEL* | Ta bort telefonnummer och användarnamn från listan. T.ex.: SETN 123456 PHONE5=DEL |
| *UUSD* | *\*Uusd code#* | Skickar en UUSD-kod till operatören. T.ex.: ***UUSD 123456 \*245#*** |
| *CONNECT* | *Protegus=ON* | Anslut till molntjänsten Protegus Cloud. T.ex.: CONNECT 123456 PROTEGUS=ON |
|  | *Protegus=OFF* | Koppla från molntjänsten Protegus Cloud. T.ex.: CONNECT 123456 PROTEGUS=OFF |
|  | *Code=123456* | Åtkomstkod för molntjänsten Protegus Cloud. T.ex.: CONNECT 123456 CODE=123456 |
|  | *IP=0.0.0.0:8000* | Ange TCP-IP och port för huvudserverns anslutningskanal. T.ex.: CONNECT 123456 IP=0.0.0.0:8000 |
|  | *IP=0* | Stänger av huvudkanalen. T.ex.: CONNECT 123456 IP=0 |
|  | *ENC=123456* | Krypteringsnyckel för TRK. T.ex.: CONNECT 123456 ENC=123456 |
|  | *APN=Internet* | APN-namn. T.ex.: CONNECT 123456 APN=INTERNET |
|  | *USER=user* | APN-användare. T.ex.: CONNECT 123456 USER=User |
|  | *PSW=password* | APN-lösenord. T.ex.: CONNECT 123456 PSW=Password |

### Styrning med telefonsamtal

!!! note "Obs!"
    Systemadministratören kan styra FLEXi SP3 med SMS och telefonsamtal. Om du vill att andra ska kunna styra systemet med telefonsamtal anger du deras identifieringsuppgifter med TrikdisConfig eller med SMS-kommandon. **<u>Styrning med telefonsamtal fungerar inte med centralapparater *SP3_хх7х*. Centralapparat *SP3_12xx* har inget röstmeddelande med firmware 1.14 och senare.</u>**

**Kommandon för styrning av FLEXi SP3 med telefonsamtal**

Styra utgångar OUT och larmsystemets områden med telefonsamtal:

1.  Om användaren har behörighet att styra utgångar OUT och utgången OUT har typen ”Remote control” (i TrikdisConfig), eller om säkerhetssystemet FLEXi SP3 är indelat i 1 eller flera områden: ring upp telefonnumret till FLEXi SP3:s SIM-kort***. FLEXi SP3*** svarar på samtalet och du kan slå kommandon med telefonens sifferknappar (se tabellen nedan).

#### Lista över kommandon med mobiltelefonens knappsats

| **Knappar** | **Funktion** | **Beskrivning** |
|----|----|----|
| *[1][områdesnr][#]* | Tillkoppla valt område i larmsystemet | T.ex. (tillkoppla område 2): 12# |
| *[2][ områdesnr][#]* | Frånkoppla valt område i larmsystemet | T.ex. (frånkoppla område 2): 22# |
| *[3][utgångsnr][#][läge]* | Styr vald utgång OUT | Styr en angiven utgång OUT. / Läge: / *[0]* – utgången avstängd; / *[1]* – utgången påslagen; / *[2]* – avstängd under pulstiden; / *[3]* – påslagen under pulstiden; / (pulstiden anges med programmet TrikdisConfig, i fönstret ”PGM”) / T.ex. (sätt utgång 1OUT i läge ”på”): 31#1 / T.ex. (sätt utgång 2OUT i läge ”på” under **Pulse time** enligt tabellen ”PGM” i TrikdisConfig): 32#3 |
| *[4][#][inspelningsnr][#]* | Starta inspelning av vald ljudfil | T.ex. (starta röstinspelning 1): 4#1# |
| *[5]* | Lyssna (1–5) på den röstinspelning som just gjorts | T.ex.: ***5*** |
| *[6]* | Spara röstinspelningen | T.ex.: ***6*** |

En ljudsignal markerar början och slutet av inspelningen av ljudfilen. Inspelningstiden för ljudfilen är 15 sekunder. En ljudsignal markerar slutet av uppspelningen. Inspelningen är klar när du hör ett pip. Andra åtgärder kan bara utföras när pipet hörs.

## Inställning av parametrar <span id="5-setting-parameters-using-trikdisconfig-software"></span>

De flesta inställningarna som beskrivs nedan kan ändras i Protegus-appen eller i TrikdisConfig. Vad varje inställning gör beskrivs en gång; där ett avsnitt har en växlare Protegus app | TrikdisConfig visas stegen för båda verktygen, med appens namn där de skiljer sig åt. Inställningar och åtgärder som bara finns i det ena verktyget är markerade. Bara TrikdisConfig kan återställa förvalen, uppdatera firmware, ställa in SMS- och samtalsrapportering till användare för sektioner, PGM-utgångar och händelser, redigera händelsernas SMS-texter och ställa in SMS-ping.

=== "Protegus app"

    **Innan du konfigurerar i appen.** Centralapparaten måste vara online och tillagd i ett Protegus2-konto (se [Länka FLEXi SP3 till en användares Protegus2-konto](#41-lanka-flexi-sp3-till-en-anvandares-protegus2-konto)), och dess firmware måste vara 1.12 eller senare: med äldre firmware säger appen att versionen inte stöds och visar ingen knapp **Read**. En centralapparat som ännu inte är online ställs först in via USB i TrikdisConfig. När en centralapparat läggs till i mobilappen och appen inte hittar den online erbjuder appen att ställa in centralapparatens WiFi från telefonen, men bara för revisioner som börjar på 1, 2, 3E eller 52.

    1. Öppna systemet i Protegus-appen och gå till **Settings → Advanced settings**. Första gången varnar appen för att felaktiga inställningar kan göra att systemet slutar fungera; bekräfta för att gå vidare.
    2. Tryck på **Read** för att läsa centralapparatens inställningar. Om centralapparaten inte använder den förvalda administratörskoden ber appen om åtkomstkoden.
    3. Ändra inställningarna, gå sedan tillbaka till **Advanced settings** och tryck på **Write** för att spara dem i centralapparaten.

    Överst på varje skärm visas den anslutna centralapparaten: **Unique ID**, versionen (**SP3_1E74**: revision 1E74), **Serial**, **Boot** och **Firmware**.

    ![Protegus-appen, Advanced settings för FLEXi SP3: enhetskort med Unique ID, SP3_1E74, serienummer 000123, boot 1.02 och firmware 1.23; knapparna Read och Write; menyalternativen System options, Reporting to CMS, Users & Reporting, Modules, Wireless, Zones, PGM, Sensors, System events och Events log.](./protegus-app/sp3-menu-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    1.  Ladda ned konfigurationsprogrammet TrikdisConfig från [www.trikdis.com/](http://www.trikdis.com/lt) (skriv ”TrikdisConfig” i sökfältet) och installera det.

    2.  Anslut FLEXi SP3 till en dator med en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C).

        **Obs!** Om du ansluter FLEXi SP3 till en dator med USB-kabel medan den är påslagen och i drift slutar FLEXi SP3 att fungera som centralapparat och går över i programmeringsläge.

    3.  Starta konfigurationsprogrammet TrikdisConfig. Programmet identifierar automatiskt den anslutna enheten och öppnar automatiskt konfigurationsfönstret för FLEXi SP3.

    4.  Klicka på **Read [F4]** för att se FLEXi SP3:s aktuella parametrar. Om ett popup-fönster visas anger du *administratörs*- eller *installatörskoden*.

    5.  Ändra inställningarna och klicka sedan på **Write [F5]** för att spara dem i FLEXi SP3.

### Statusfältet i TrikdisConfig

När FLEXi SP3 är ansluten visar TrikdisConfig information om den anslutna enheten i statusfältet.

<img alt="Statusfältet i TrikdisConfig med fältet IMEI/Unique ID, Status: reading done, fälten för enhet och serienummer, BL: 1.02, FW: 1.23, State: USB och Role: Administrator." src="./image52.webp" style="width:7.086614173228346in;height:0.5905511811023622in" />

| **Namn** | **Beskrivning** |
|----|----|
| IMEI/Unique ID | Enhetens IMEI-nummer |
| Status | Driftstatus |
| Device | Enhetstyp (måste visa SP3_xxxx) |
| SN | Enhetens serienummer |
| BL | Bootloader-version |
| FW | Enhetens firmwareversion |
| HW | Enhetens maskinvaruversion |
| State | Typ av anslutning till programmet (USB eller fjärr) |
| Role | Visar åtkomstnivån (visas efter att en åtkomstkod har angetts) |

När du klickar på knappen **Read [F4]** läser och visar programmet de inställningar som för närvarande finns lagrade i FLEXi SP3. Ändra önskade inställningar i TrikdisConfig enligt beskrivningarna av programfönstren nedan.

### Fönstret ”System options” <span id="52-system-options-window"></span>

**System general**

=== "Protegus app"

    Öppna **System options → System general**.

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, System options, System general, övre delen: enhetskort; gruppen General med Account No. 0001, System name SP3 security77, Test period 1 day(s) 0 h, Start test at 13:30, Clear events after reset på, Text language Cyrillic alphabet, Suspend event reporting 10 same events per 10 s, Restore event reporting after 1 min, EOL type 2k2+2k2+4k7, Communication path test 1 day(s), LED out for 2Wire fire sensor av, AC failure delay 300 s." src="./protegus-app/sp3-systemoptions-general-1-phone.webp" /><span class="trik-mob-pair__caption">General</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, System general, nedre delen: gruppen SIM med Preferred carrier tomt, SIM card PIN 1234, APN internet samt Login, Password och Locked ICCID tomma; gruppen Time settings med knapparna Read time och Set time, Module time N/A, Time zone +2 h 0 min, Update time through GSM modem, Daylight saving time på." src="./protegus-app/sp3-systemoptions-general-2-phone.webp" /><span class="trik-mob-pair__caption">SIM, Time settings</span></span>
    </span>


    **System name** kan vara upp till 19 tecken i appen, och **AC failure delay** finns i gruppen General. Tryck på **Set time** för att skicka telefonens aktuella tid till centralapparaten direkt. Gruppen **SIM** visas på revisioner som börjar på 1, 2, 52, 4 eller 6, men inte 10 eller 20; **Preferred carrier** kräver firmware 1.21 eller senare. **Areas in test SMS** och **Call** finns inte i appen.

=== "TrikdisConfig"

    **Fliken ”System general”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken System general. Grupperna General, SIM och Time settings visar bland annat fälten Object ID, APN inställt på internet, EOL Type inställt på 2k2+2k2+4k7, tidszon inställd på +2 och Power failure delay inställt på 300 sekunder." src="./image53.webp" style="width:7.086614173228346in;height:4.062992125984252in" />

**Inställningsgruppen ”General”**

- Om rapporter ska skickas till larmcentralen anger du <span class="trik-term"><span class="trik-term-app"><strong>Account No.</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Object ID</strong><span class="trik-term-note">)</span></span></span> (abonnentkoden: ett hexadecimalt tal med 4 tecken, 0–9, A–F. **Använd inte FFFE eller FFFF.**) som du har fått av larmcentralen.

- <span class="trik-term"><span class="trik-term-app"><strong>System name</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Object name</strong><span class="trik-term-note">)</span></span></span> – tas med i rapporter som skickas via SMS (upp till 20 tecken i TrikdisConfig, 19 i appen; bokstäver och siffror kan användas).

- **Test period** – periodiska testrapporter skickas med den inställda perioden, om inte **Start test at** är inställd.

- **Start test at** – den tid på dygnet då testrapporter skickas.

- **Areas in test SMS** – de angivna områdenas aktuella skyddslägen tas med i den periodiska testrapporten. *Finns bara i TrikdisConfig.*

- **Clear Events after reset** – om den är påslagen raderas alla osända händelserapporter i buffertminnet när centralapparaten återställs.

- **Text language** – särskilda tecken för det valda språket används i SMS.

- <span class="trik-term"><span class="trik-term-app"><strong>Suspend event reporting</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Suspend event reporting when ...</strong><span class="trik-term-note">)</span></span></span> – rapporteringen av en händelse upphör när samma händelse inträffar det inställda antalet gånger inom det inställda antalet sekunder.

- <span class="trik-term"><span class="trik-term-app"><strong>Restore event reporting</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Restore event reporting after</strong><span class="trik-term-note">)</span></span></span> – ställ in efter hur lång tid avstängningen av händelserapporteringen upphävs. Tiden kan vara från 0 till 999 minuter.

- **Call** – när en händelse inträffar ringer FLEXi SP3 upp användaren/användarna det inställda antalet gånger. Om samtalet avvisas eller besvaras slutar FLEXi SP3 att ringa. Ett samtal varar i 20 sekunder. *Finns bara i TrikdisConfig.*

- **EOL Type** – ange värdena på de motstånd som är anslutna till detektorerna (EOL – End Of Line, slutmotstånd. RT + R1 + R2. Motstånd RT – sabotage; motstånd R1 – detektor nr 1; motstånd R2 – detektor nr 2). Alternativen är 2k2+2k2+4k7, 1k+1k+2k2, 5k6+5k6+3k3, 5k6+3k3+5k6, 3k3+6k8+3k3 och 2k2+4k7+8k2, och från firmware 1.19 även 4k7+4k7+2k2.

- **Communication path test** – ange det tidsintervall efter vilket centralapparaten kontrollerar backupkanalerna genom att skicka meddelanden till larmcentralen. När meddelandena har skickats på backupkanalerna går centralapparaten tillbaka till primärkanalen.

- **LED out for 2Wire fire sensor** – aktivera den när tvåtrådsbranddetektorn är ansluten till LED-utgången.

**Inställningsgruppen ”SIM”**

- Ange **SIM card PIN.** Om PIN-kodsbegäran är avstängd för just det SIM-kortet ändrar du inte förvalet.

  - **APN** – namnet på mobiloperatörens åtkomstpunkt för mobilt internet. Du måste ange APN om händelsemeddelanden ska skickas till Protegus Cloud eller till larmcentralen via mobilt internet.
- Om mobiloperatören kräver det anger du användarnamn och lösenord för APN i fälten **Login** och **Password**.

- **Locked ICCID** – ange SIM-kortets ICCID-nummer om du vill att centralapparaten bara ska fungera med just det SIM-kortet.

- <span class="trik-term"><span class="trik-term-app"><strong>Preferred carrier</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Preferred operator</strong><span class="trik-term-note">)</span></span></span> – när du har angett mobiloperatörens kod ansluter larmsändaren bara till den valda operatörens nät. Mobiloperatörens kod består av MCC- och MNC-koderna. Firmware 1.21 eller senare.

**Inställningsgruppen ”Time settings”**

Du kan ställa in tiden med knappen <span class="trik-term"><span class="trik-term-app"><strong>Set time</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Set PC time</strong><span class="trik-term-note">)</span></span></span>. Om **Disabled** är valt i <span class="trik-term"><span class="trik-term-app"><strong>Update time through</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Time synchronization</strong><span class="trik-term-note">)</span></span></span> behåller centralapparaten den tid som ställdes in med den knappen: datorns tid i TrikdisConfig, telefonens tid i appen. Om ett modem eller en server är valt i <span class="trik-term"><span class="trik-term-app"><strong>Update time through</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Time synchronization</strong><span class="trik-term-note">)</span></span></span> synkroniserar centralapparaten sin tid mot det modemet eller den servern.

- <span class="trik-term"><span class="trik-term-app"><strong>Time zone</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Time zone (Hours)</strong><span class="trik-term-note">)</span></span></span> – ange tidszonen för ditt land. Om centralapparaten till exempel ska installeras i Litauen anger du **+2**.

- <span class="trik-term"><span class="trik-term-app"><strong>Update time through</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Time set</strong><span class="trik-term-note">)</span></span></span> – ange en server som ***FLEXi SP3**:s* interna klocka ska synkroniseras mot. Synkroniseringen sker efter att centralapparaten har spänningssatts.

- **Daylight saving time** – om den är påslagen ställs centralapparatens interna klocka automatiskt om till sommar- eller vintertid.

- <span class="trik-term"><span class="trik-term-app"><strong>AC failure delay</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Power failure delay</strong><span class="trik-term-note">)</span></span></span> – om huvudmatningen försvinner skickas en avisering om spänningsbortfall efter den angivna fördröjningen. När matningsspänningen kommer tillbaka skickas en avisering om att spänningen är återställd efter den angivna fördröjningen.

**Areas**

=== "Protegus app"

    Öppna **System options → Areas** och tryck sedan på ett område.

    ![Protegus-appen, System options, Areas: Areas enabled 8 och listan Area 1 till Area 8.](./protegus-app/sp3-systemoptions-areas-phone.webp){ .trik-mob-img }

    ![Protegus-appen, skärmen Area: Area name Area 1, Entry delay 10, Exit delay 45, Bell time 300, Squawk av, Re-ARM av, Force-ARM av, Keyswitch mode Level, Tamper action Always audible.](./protegus-app/sp3-systemoptions-area-phone.webp){ .trik-mob-img }


    På revisioner som börjar på 4 eller 6, med firmware 1.15 eller senare, visar appen också **Arm after**, en tid i minuter: systemet tillkopplar sig självt så många minuter efter att det har frånkopplats (med 2, två minuter senare). 0 betyder att det aldrig tillkopplar sig självt.

=== "TrikdisConfig"

    **Fliken ”Partitions”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken Partitions, med Partitions enabled inställt på 8. Tabellen listar Areas 1–8 med inställningarna Entry, Exit, Bell, Squawk, Re-ARM, Force-ARM, Keyswitch och Tamper." src="./image54.webp" style="width:7.086614173228346in;height:2.8070866141732282in" />

- <span class="trik-term"><span class="trik-term-app"><strong>Areas enabled</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Partitions enabled</strong><span class="trik-term-note">)</span></span></span> – ange hur många oberoende delar larmsystemet ska delas in i.

- <span class="trik-term"><span class="trik-term-app"><strong>Area name</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Partition name</strong><span class="trik-term-note">)</span></span></span> – ange områdets namn.

- <span class="trik-term"><span class="trik-term-app"><strong>Entry delay</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Entry</strong><span class="trik-term-note">)</span></span></span> – inpasseringstid: tid för att komma in genom en sektion av typen *Delay*, gå till en knappsats och frånkoppla larmsystemet. Tiden kan vara från 0 till 999 sekunder.

- <span class="trik-term"><span class="trik-term-app"><strong>Exit delay</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Exit</strong><span class="trik-term-note">)</span></span></span> – utpasseringstid: tid för att lämna lokalen genom en sektion av typen *Delay* efter att du har angett tillkopplingskoden på en knappsats. Tiden kan vara från 0 till 999 sekunder. Om larmsystemet tillkopplas på distans, till exempel med mobilappen Protegus2, räknar systemet inte med <span class="trik-term"><span class="trik-term-app"><strong>Exit delay</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Exit</strong><span class="trik-term-note">)</span></span></span> utan tillkopplas direkt.

- <span class="trik-term"><span class="trik-term-app"><strong>Bell time</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Bell</strong><span class="trik-term-note">)</span></span></span> – hur länge sirenen ljuder när larmet har utlösts. Tiden kan vara från 0 till 999 sekunder.

- **Squawk** – sirenen ger ett kort ljud en gång vid tillkoppling och två gånger vid frånkoppling.

- **Re-ARM** – aktivera den om du vill att systemet automatiskt ska tillkoppla larmsystemet igen efter att det har frånkopplats på distans, men sektionen av typen *Delay* inte påverkades under den inställda inpasseringstiden.

- **Force-ARM** – gör att systemet kan tillkopplas även om sektioner av typen *Stay* är påverkade, så länge sektionen av typen *Entry* inte är påverkad.

- <span class="trik-term"><span class="trik-term-app"><strong>Keyswitch mode</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Keyswitch</strong><span class="trik-term-note">)</span></span></span> – välj på vilket sätt, *Pulse* eller *Level*, en nyckelbrytarsektion (*Keyswitch*) måste påverkas för att systemet ska tillkoppla eller frånkoppla skyddet av lokalen*.*

- <span class="trik-term"><span class="trik-term-app"><strong>Tamper action</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Tamper</strong><span class="trik-term-note">)</span></span></span> – välj reaktionstyp (Silent, Audible when armed, Always Audible) när systemet upptäcker sabotage av en detektor. ”Silent” – mottagarna får händelserapporter men sirenen slås inte på; ”Audible when armed” – mottagarna får händelserapporter men sirenen slås bara på om sabotaget inträffar när systemet är tillkopplat; ”Always audible” – mottagarna får händelserapporter och sirenen slås på även när larmsystemet är frånkopplat.

**Schedulers**

=== "Protegus app"

    Öppna **System options → Schedulers**. Tryck på ett schemas tid för att ändra den, och på dess pil för att öppna inställningarna för område, åtgärd och helgdagar samt dagknapparna.

    ![Protegus-appen, System options, Schedulers, de första raderna i listan: 22:00, på, mån till fre, Arm; 07:00, på, mån till fre, Disarm; därefter rader med 00:00, av, Disarm.](./protegus-app/sp3-systemoptions-schedulers-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”Scheduler”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken Scheduler. Schematabellen har kolumnerna Enable, Partition, Time, Not Armed, Action, veckodagar, Holiday och Holiday group; de synliga raderna visar område 1, 00:00, Disarm, Holiday Disabled och gruppen Any." src="./image55.webp" style="width:7.086614173228346in;height:1.921259842519685in" />

I den här tabellen kan du ställa in scenarier för automatisk tillkoppling och frånkoppling av säkerhetssystemet genom att välja olika veckodagar och ta med helgdagar.

- **Enable** – aktivera schemat för när systemet automatiskt ska tillkopplas och frånkopplas.

- <span class="trik-term"><span class="trik-term-app"><strong>Area</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Partition</strong><span class="trik-term-note">)</span></span></span> – det område som schemat gäller.

- **Time** – ange den tid då åtgärden ska utföras.

- <span class="trik-term"><span class="trik-term-app"><strong>Enabled only when not armed</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Not Armed</strong><span class="trik-term-note">)</span></span></span> – schemats åtgärd utförs bara om centralapparaten inte är tillkopplad i läget AWAY (bortatillkoppling). Firmware 1.15 eller senare.

- **Action** – ange det skyddsläge (Disarm/Arm/Sleep/Stay) som systemet automatiskt ska växla till vid den angivna tiden.

- **Monday, ... Sunday** – de veckodagar då det inställda skyddsläget och den inställda tiden gäller.

- **Holiday** – ange hur schemat ska bete sig under helgdagar (Disabled/Ignore on holidays/Additional when holidays/Only holidays). Disabled – inga helgdagar. Ignore on holidays – utför inte schemat under helgdagar. Additional when holidays – utför en extra åtgärd under helgdagar. Only holidays – utför schemat under helgdagar.

- **Holiday group** – ange en helgdagsgrupp (Any/1/2/3/4) som schemat ska betrakta som helgdagar. Om ”Any” väljs arbetar schemat i helgdagsläge under varje aktiv helgdag.

**Holidays**

=== "Protegus app"

    Öppna **System options → Holidays**. Tryck på ett datum för att ändra det, och på pilen för att öppna raden och välja **Group** 1 till 4.

    ![Protegus-appen, System options, Holidays, de första raderna i listan: 26-12-24 till 26-12-26, på, Group: 1; därefter rader med 00-01-01 till 00-01-01, på, Group: none.](./protegus-app/sp3-systemoptions-holidays-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”Holidays”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken Holidays. De synliga helgdagsraderna är aktiverade, har samma startdatum och slutdatum 01.01.2000 och har omarkerade rutor för Groups 1–4." src="./image56.webp" style="width:7.086614173228346in;height:1.9291338582677164in" />

- **Enable** – slår på helgdagen.

- **Start date** – ange helgdagens startdatum.

- **Stop date** – ange helgdagens slutdatum. Om helgdagen bara är en dag lång ska det här datumet vara detsamma som **Start date**.

- <span class="trik-term"><span class="trik-term-app"><strong>Group</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Group 1, Group 2, Group 3, Group 4</strong><span class="trik-term-note">)</span></span></span> – kombinera helgdagar i grupper.

**System troubles**

=== "Protegus app"

    Öppna **System options → System troubles**.

    ![Protegus-appen, System options, System troubles: fel 1 till 13 från AC Fault till Antimasking Fault, var och en med en omkopplare Restrict ARM, alla av.](./protegus-app/sp3-systemoptions-troubles-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”System troubles”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken System troubles. En tabell listar fel från AC Fault till Antimasking Fault, var och en med en omarkerad ruta Restrict ARM." src="./image57.webp" style="width:7.086614173228346in;height:2.9881889763779528in" />

Om tillkoppling är begränsad för ett fel kan centralapparaten inte tillkopplas så länge felet finns.

**Access**

=== "Protegus app"

    Öppna **System options → Access**.

    ![Protegus-appen, System options, Access: Administrator code, SMS code och Installer code, koderna maskerade; Installer permissions: Can change Account No. på; Area settings och menyerna Users & Reporting, Modules, Zones, PGM, Reporting to CMS och System events alla Editable.](./protegus-app/sp3-systemoptions-access-phone.webp){ .trik-mob-img }


    **Can change Account No.** är en omkopplare; **Area settings** och varje meny är **Editable**, **Visible** (skrivskyddad) eller **Hidden**. Appen visar **Administrator code** och **SMS code** bara för administratören. Installatörens behörighet för **SIM card** ställs bara in i TrikdisConfig.

=== "TrikdisConfig"

    **Fliken ”Access”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System Options på fliken Access. Åtkomstkoderna är Administrator Code 123456, SMS password och Installer Code; Installer permissions visar Object ID och SIM card markerade, med Area Settings och de synliga menyerna inställda på Editable." src="./image58.webp" style="width:7.086614173228346in;height:3.1102362204724407in" />

**Inställningsgruppen ”Access codes”**

- **Administrator Code** – *(förvald kod 123456)* ger full åtkomst till konfigurationen (koden måste vara 6 tecken lång; den kan bestå av latinska bokstäver och/eller siffror).

- <span class="trik-term"><span class="trik-term-app"><strong>SMS code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>SMS password</strong><span class="trik-term-note">)</span></span></span> – *(förvalt lösenord 123456)* används för att styra systemet säkert med SMS. Byt det av säkerhetsskäl mot ett lösenord med 6 tecken som bara du känner till.

- **Installer Code** – (*förvald kod 654321*) ger installatörer åtkomst till konfigurering av systemet. Byt den av säkerhetsskäl mot en kod med 6 tecken som bara du känner till.

!!! note "Obs!"
    Om den förvalda *administratörskoden* (123456) är inställd visar TrikdisConfig omedelbart enhetens aktuella driftparametrar utan att fråga efter koden när du har klickat på **Read [F4]**.

**Inställningsgruppen ”Installer permissions”**

- Anger vad installatören får ändra: <span class="trik-term"><span class="trik-term-app"><strong>Can change Account No.</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Object ID</strong><span class="trik-term-note">)</span></span></span>, inställningarna för **SIM card** (*bara i TrikdisConfig*) samt varje område eller meny, som kan vara redigerbar, skrivskyddad eller dold.

### Fönstret ”Reporting to CMS” <span id="53-reporting-to-cms-window"></span>

**Reporting**

=== "Protegus app"

    Öppna **Reporting to CMS → Reporting**. Slå på en kanal med dess omkopplare **Enabled**. Gruppen **Backup channel** visas när primärkanalen är påslagen, och **Parallel backup channel** när den parallella kanalen är påslagen.

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Reporting to CMS, Reporting, övre delen: enhetskort; Primary channel enabled, Communication type TCP/IP, Domain or IP receiver.example.com, Port 55555, Protocol SIA DC-09_2012, SIA DCS på, Enable encryption på, Encryption key maskerad, Key is HEX av." src="./protegus-app/sp3-reporting-1-phone.webp" /><span class="trik-mob-pair__caption">Primary channel</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Reporting, nedre delen: Backup channel och Parallel channel, båda med Enabled av, Port 0, Protocol TRK och Encryption key maskerad." src="./protegus-app/sp3-reporting-2-phone.webp" /><span class="trik-mob-pair__caption">Backup och parallel channel</span></span>
    </span>


    **Communication type** har alternativen TCP/IP och UDP/IP; med protokollet **TL150** bara UDP/IP. **Protocol** har alternativen TRK, SIA DC-09_2012, SIA DC-09_2007, SIA DC-09_IPcom och, från firmware 1.14, TL150. Med TRK har **Encryption key** 6 tecken. Med något annat protokoll visar appen **Enable encryption**, **Encryption key** och **Key is HEX**: när kryptering är påslagen har nyckeln 16 tecken, eller 32 hexadecimala tecken när **Key is HEX** är påslagen, och en kortare nyckel fylls ut med nollor. Med ett SIA DC-09-protokoll visar appen också **SIA DCS**: när den är påslagen skickar centralapparaten SIA-meddelanden till larmcentralen. Det kräver en SIA- eller IPcom-mottagare. SMS-rapportering till larmcentralen och numren för **Backup channel 2** ställs bara in i TrikdisConfig.

=== "TrikdisConfig"

    **Fliken ”Reporting”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Reporting to CMS på fliken Reporting. Primary channel och Backup channel har Communication type inställt på Disabled; Parallel channel och Parallel backup channel visar TCP/IP. Dessa fyra paneler har fälten Domain or IP, Port, Protocol, Phone number och Encryption Key. De separata panelerna Backup channel 2 och Parallel backup channel 2 visar bara fälten Phone number." src="./image59.webp" style="width:7.086614173228346in;height:3.87007874015748in" />

Centralapparaten skickar händelser till larmcentralen över en IP-anslutning (mobildata, WiFi eller Ethernet, beroende på revision) eller via SMS (ställs bara in i TrikdisConfig).

Händelser kan skickas över flera kommunikationskanaler. Primärkanalen och den parallella kanalen kan arbeta samtidigt, så att centralapparaten kan skicka händelser till två mottagare på en gång. Backupkanaler kan tilldelas både primärkanalen och den parallella kanalen och används när anslutningen via primärkanalen eller den parallella kanalen bryts.

Med protokollet **TRK** är kommunikationen krypterad och lösenordsskyddad, och en TRIKDIS-mottagare krävs för att ta emot händelserna och vidarebefordra dem till larmcentralens programvara:

• För anslutning över IP – programvarumottagaren IPcom för Windows/Linux, IP/SMS-maskinvarumottagaren RL14 eller flerkanalsmottagaren RM14.

• För mottagning av SMS – IP/SMS-maskinvarumottagaren RL14, flerkanalsmottagaren RM14 eller SMS-mottagaren GM14.

SMS-kommunikation är särskilt användbar som backupkanal, eftersom den fungerar även när det inte finns någon mobil internetanslutning. Vi rekommenderar inte SMS som primärkanal.

**Inställningsgrupperna ”Primary channel” och ”Backup channel”**

- **Communication type** – välj protokoll för kommunikation med mottagaren (TCP/IP, UDP/IP eller SMS i TrikdisConfig).

- **Domain or IP** – ange mottagarens domän eller IP-adress.

- **Port** – ange mottagarens nätverksport.

- **Protocol** – **TRK** för dataöverföring med TRIKDIS-mottagare, **SIA DC-09** för IP-mottagare som kan ta emot händelserapporter som överförs med SIA DC-09-protokoll.

- **Phone number** – (bara för SMS; *finns bara i TrikdisConfig*) ange telefonnumret till en TRIKDIS SMS-mottagare. Telefonnumret måste börja med landskoden (t.ex. 370xxxxxxxx).

- **Encryption key** – med **TRK** en nyckel med 6 siffror som måste stämma överens med larmcentralsmottagarens krypteringsnyckel.

Om parametrar ställs in för den parallella kanalen skickas rapporter samtidigt över båda kanalerna. Båda kanalerna kan inte konfigureras för samma mottagare. När den parallella kanalen är aktiverad kan händelser skickas samtidigt till två mottagare (t.ex. en lokal och en central larmcentral).

**Rapporteringsnumret för ”Backup channel 2” och ”Parallel backup channel 2”** *Finns bara i TrikdisConfig.*

Backup-SMS skickas när meddelanden inte kan överföras via primärkanalen, den parallella kanalen och backupkanalerna. Det är särskilt användbart eftersom det fungerar även när mobiloperatörens nät saknar IP-anslutning.

Den här kanalen fungerar bara när IP-läge är inställt för den första kanalen och dess backupkanal.

SMS-aviseringar skickas till larmcentralens SMS-mottagare: 1) direkt första gången centralapparaten börjar fungera; och 2) om TCP/IP- eller UDP/IP-anslutningen bryts i den första kanalen och dess backupkanal.

- **Phone number** – ange telefonnumret till TRIKDIS SMS-mottagare hos larmcentralen (CMS, Central Monitoring Station). Telefonnumret måste börja med landskoden (t.ex. 370xxxxxxxx).

**Settings**

=== "Protegus app"

    Öppna **Reporting to CMS → Settings**.

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Reporting to CMS, Settings, övre delen: enhetskort; gruppen Settings med Return to primary after 5 min, IP Ping enabled på, IP Ping period 60 s, Backup reporting after 3 attempts, DNS1 8.8.8.8, DNS2 1.1.1.1, Account No. in SIA DC-09 0001, SIA DC-09 receiver No. 1, SIA DC-09 line No. 1, Local time in SIA av." src="./protegus-app/sp3-reporting-settings-1-phone.webp" /><span class="trik-mob-pair__caption">Settings</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Settings, nedre delen: Reporting mode med CMS och Protegus2, vardera med Main type WiFi, Backup type SIM och Backup type 2 Disabled; Radio T16 (RS485) av; Return to main (both channels) 10 min; WiFi network parameters med WiFi SSID name Sample-WiFi, lösenord, DHCP mode på samt Static IP, Subnet mask och Default gateway 0.0.0.0." src="./protegus-app/sp3-reporting-settings-2-phone.webp" /><span class="trik-mob-pair__caption">Reporting mode, WiFi network parameters</span></span>
    </span>


    **IP Ping enabled** slår på ping. I **Reporting mode** beror alternativen på centralapparatens revision:

    - 10 och 20: inget SIM.
    - 3E och 3L: **LAN (ethernet)** i stället för SIM; 3E har inget **LAN (RS485)** och 3L inget WiFi.
    - 4 och 6: **LAN (ethernet)** i stället för WiFi.

    WiFi-namnet och lösenordet finns i **WiFi network parameters** (revisioner som börjar på 1, 2, 3E eller 5), tillsammans med inställningarna för DHCP och IP. Revisioner som börjar på 3E, 3L, 4 eller 6 har en grupp **LAN parameters** med DHCP- och IP-inställningarna för det kabelanslutna nätverket och en omkopplare **LAN trouble indication** i gruppen **Settings**. När den är påslagen visar en lysdiod på centralapparatens kretskort ett LAN-fel. Händelsen LAN-fel skickas oavsett om omkopplaren är påslagen eller avstängd. **SMS Ping period** och **SIM parameters** finns inte i appen.

=== "TrikdisConfig"

    **Fliken ”Settings”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Reporting to CMS på fliken Settings. Return to Primary after är 5 minuter, IP Ping period är aktiverad på 60 sekunder, DHCP mode är markerad, och både CMS och Protegus använder WiFi som Main type och SIM som Backup type." src="./image60.webp" style="width:7.086614173228346in;height:3.8818897637795278in" />

**Inställningsgruppen ”Settings”**

- **Return to primary after** – den tid, i minuter, efter vilken FLEXi SP3 försöker återfå anslutningen via *primärkanalen*.

- **IP Ping period** – hur ofta PING-signaler skickas för att kontrollera IP-anslutningen (mobildata, WiFi eller Ethernet), i sekunder. Slå på dem för att de ska skickas.

- **SMS Ping period** – hur ofta PING-signaler skickas för att kontrollera förbindelsen på SMS-kanalen, i minuter. Slå på dem för att de ska skickas. *Finns bara i TrikdisConfig.*

- **Backup reporting after** – ange hur många misslyckade försök att skicka meddelanden via *primärkanalen* som ska göras innan centralapparaten växlar till *backupkanalen*.

- **DNS1, DNS2** – adresser till DNS-servrar.

- <span class="trik-term"><span class="trik-term-app"><strong>Account No. in SIA DC-09</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Object ID in SIA DC-09</strong><span class="trik-term-note">)</span></span></span> – abonnentkoden som används i SIA DC-09-meddelanden.

- **SIA DC-09 receiver No.** – ange mottagarnumret.

- <span class="trik-term"><span class="trik-term-app"><strong>SIA DC-09 line No.</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Line No.</strong><span class="trik-term-note">)</span></span></span> – ange linjenumret.

- **Local time in SIA** – när den är påslagen anger meddelandena som skickas till larmcentralen (CMS) den tid som är inställd i modulen.

!!! warning "Viktigt"
    Oavsett IP-inställningar ska du kontrollera att DNS-adresserna stämmer med de som din internetleverantör stöder.

**Inställningsgruppen ”Reporting mode”**

Här ställer du in hur centralapparaten ska kommunicera med larmcentralens kanaler och med Protegus2. Anslutningstyperna anges i ordning. Om centralapparaten inte kan ansluta med anslutningstypen **Main type** växlar den till **Backup type**, och så vidare. Om backupanslutningen lyckades överföra meddelandet till larmcentralen görs ett nytt försök med anslutningstypen **Return to main** efter det angivna tidsintervallet.

- **Main type** – välj anslutningstyp (SIM, WiFi, <span class="trik-term"><span class="trik-term-app"><strong>LAN (RS485)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>LAN(E485)</strong><span class="trik-term-note">)</span></span></span>) mot larmcentralens mottagare och Protegus2.

- **Backup type** – välj anslutningstyp (SIM, WiFi, <span class="trik-term"><span class="trik-term-app"><strong>LAN (RS485)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>LAN(E485)</strong><span class="trik-term-note">)</span></span></span>) mot larmcentralens mottagare och Protegus2.

- **Backup type 2** – välj anslutningstyp (SIM, WiFi, <span class="trik-term"><span class="trik-term-app"><strong>LAN (RS485)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>LAN(E485)</strong><span class="trik-term-note">)</span></span></span>) mot larmcentralens mottagare och Protegus2.

- <span class="trik-term"><span class="trik-term-app"><strong>Radio T16 (RS485)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Radio T16/SF485</strong><span class="trik-term-note">)</span></span></span> – slå på den när sändaren T16 används för att överföra information. Sändaren T16 fungerar som backupkanal om minst en av de andra anslutningsmetoderna (SIM, WiFi, <span class="trik-term"><span class="trik-term-app"><strong>LAN (RS485)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>LAN(E485)</strong><span class="trik-term-note">)</span></span></span>) används. Om det inte finns några andra anslutningsmetoder är den huvudkanalen. T16 kan bara användas för att skicka rapporter till larmcentralen.
- <span class="trik-term"><span class="trik-term-app"><strong>Return to main (both channels)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Return to main (both channel)</strong><span class="trik-term-note">)</span></span></span> – den tid, i minuter, efter vilken FLEXi SP3 försöker återfå anslutningen via *primärkanalen* om den körde en backupkanal.

**Inställningsgruppen ”Communicator network settings”**

- **DHCP mode** – läge för registrering i WiFi-nätverket (manuellt eller automatiskt). När det är påslaget läser centralapparaten FLEXi SP3 automatiskt nätverksinställningarna (nätmask, gateway) och tilldelas automatiskt en IP-adress (automatiskt registreringsläge).

- **Static IP** – statisk IP-adress för manuellt registreringsläge.

- **Subnet mask** – nätmask för manuellt registreringsläge.

- **Default gateway** – gateway för manuellt registreringsläge.

- **WiFi SSID name** – namnet på WiFi-nätverket (som centralapparaten FLEXi SP3 ska ansluta till).

- **WiFi SSID password** – lösenord till WiFi-nätverket.

**Inställningsgruppen ”SIM parameters”** *Finns bara i TrikdisConfig.*

- **Disable indication of the absence of a SIM card** – när den är påslagen visar centralapparaten FLEXi SP3 ingen indikering om att inget SIM-kort är isatt. Slå på den när centralapparaten arbetar utan SIM-kort.

- **Use dial and SMS when the working over internet module** – om den slås på kan centralapparaten styras med telefonsamtal och SMS. Om den är avstängd och ett WiFi-nätverk finns tillgängligt används varken SMS eller telefonsamtal. Om den är avstängd och inget WiFi-nätverk finns kan FLEXi SP3 ändå styras med telefonsamtal och SMS. FLEXi SP3 skickar SMS till användaren.

- **Disable the use of SIM card mobile data** – om den slås på används inte SIM-kortets mobildata. Data skickas då bara via WiFi. Om ett WiFi-nätverk tillfälligt inte är tillgängligt lagrar FLEXi SP3 data i minnet. När WiFi-nätverket är återställt skickar FLEXi SP3 data via WiFi.

<a id="Users_window"></a>

### Fönstret ”Users & Reporting” <span id="54-users-reporting-window"></span>

**Users**

=== "Protegus app"

    Öppna **Users & Reporting → Users** och tryck sedan på en användare. Användare 1 till 8 är markerade med **A** i listan: det är de som får rapporter via SMS och samtal, och därför är det bara de som har **Readdress SMS messages from unknown sender**.

    ![Protegus-appen, Users & Reporting, användarlistan: 1A John Smith, 2A Emma Jones, 3A Cleaner, 4A till 8A tomma på grå bakgrund, därefter användare 9 till 13 tomma.](./protegus-app/sp3-users-phone.webp){ .trik-mob-img }

    ![Protegus-appen, användaren John Smith med knappen Delete: Name John Smith, Phone number +447700900123, Email john.smith@example.com, Keypad code maskerad, Tag code 000000000000, Can control areas 1,2 samt Can ARM system, Can DISARM system, Can remotely control PGM, User get response messages from module och Readdress SMS messages from unknown sender, alla på.](./protegus-app/sp3-user-phone.webp){ .trik-mob-img }


    **Name** kan vara upp till 18 tecken och **Tag code** upp till 12 hexadecimala tecken. **Keypad code** har 4 siffror; med firmware 1.24 eller senare och **6-digit user code** påslagen i **Modules → Keypads** har den 6. Om e-postadressen redan används av en annan användare säger appen det. **Delete** rensar användarens namn, telefonnummer, e-postadress, knappsatskod, tagg-kod och områden, och slår av **Can ARM system**, **Can DISARM system** och **Can remotely control PGM**. **User get response messages from module** och **Readdress SMS messages from unknown sender** behåller sina värden: kontrollera dem när du återanvänder platsen.

=== "TrikdisConfig"

    **Fliken ”Users”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Users & Reporting på fliken Users. Tabellen Users & Reporting to User har fälten Name, Tel number, Email, Code, Tag code och Areas, följda av rutor för rapporteringsalternativ." src="./image61.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

**Inställningsgruppen ”Users & Reporting to User”**

- **Name** – användarens namn. Namnen används i händelse-SMS.

- <span class="trik-term"><span class="trik-term-app"><strong>Phone number</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Tel number</strong><span class="trik-term-note">)</span></span></span> – användarens telefonnummer, som används för att fjärrstyra larmsystemet och som tar emot SMS. Numren måste börja med landskoden. De första 8 telefonnumren får rapporter via meddelanden och telefonsamtal.

- **Email** – ange användarens e-postadress så att användaren bjuds in till Protegus2 för att styra systemet.

- <span class="trik-term"><span class="trik-term-app"><strong>Keypad code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Code</strong><span class="trik-term-note">)</span></span></span> – den kod för tillkoppling och frånkoppling av larmsystemet som är tilldelad användaren.

- **Tag code** – ange identifieringsnumret för ett RFID-kort, en RFID-bricka eller en elektronisk nyckel (iButton).

- <span class="trik-term"><span class="trik-term-app"><strong>Can control areas</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Areas</strong><span class="trik-term-note">)</span></span></span> – de områden som den aktuella användaren kan styra.

- <span class="trik-term"><span class="trik-term-app"><strong>Can ARM system</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>A</strong><span class="trik-term-note">)</span></span></span> – gör att användaren kan tillkoppla larmet.

- <span class="trik-term"><span class="trik-term-app"><strong>Can DISARM system</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>D</strong><span class="trik-term-note">)</span></span></span> – gör att användaren kan frånkoppla larmet.

- <span class="trik-term"><span class="trik-term-app"><strong>Can remotely control PGM</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen kan användaren ringa upp FLEXi SP3 och slå på och av önskade utgångar OUT med DTMF-toner.

- <span class="trik-term"><span class="trik-term-app"><strong>User get response messages from module</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>ACK</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickar FLEXi SP3 SMS till användaren med **SMS answer text** om att mottagna kommandon har utförts.

- <span class="trik-term"><span class="trik-term-app"><strong>Readdress SMS messages from unknown sender</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>FWD</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen vidarebefordras SMS som tas emot från andra än systemets användare (t.ex. besked om SIM-kortets saldo eller slumpmässiga reklammeddelanden) till användaren.

#### Länka RFID-brickor (kort)

=== "Protegus app"

    Ange RFID-brickans (kortets) ID-nummer i användarens **Tag code** (**Users & Reporting → Users** och sedan användaren) och tryck sedan på **Advanced settings → Write**.

=== "TrikdisConfig"

    Du kan lägga till RFID-brickor (kort) genom att ange deras ID-nummer i fältet Tag code i *TrikdisConfig*. Klicka på knappen Write [F5] för att skriva listan över RFID-brickor (kort) till centralapparaten.


--8<-- "sv/faq/index.md:sp3-wiegand-reader-door-output"

<img alt="RFID-kort med det tryckta ID-numret markerat med rött nära nederkanten." src="./image62.webp" style="width:2.3833377077865268in;height:1.5166699475065617in" />

#### Länka elektroniska nycklar (iButton)

Länka elektroniska nycklar med läsaren TM17.

1.  Om listan **Tag code** är tom ska den första nyckeln som läggs till skrivas på den första raden i listan och blir **Master key.**

2.  För att slå på länkningsläget för kontaktnycklar håller du **Master key** mot nyckelläsarens ”öga” i minst 10 sekunder. När länkningsläget är på börjar nyckelläsaren TM17:s lysdiod *State* blinka grönt.

3.  För att länka användarnycklar håller du dem mot nyckelläsarens ”öga” en i taget. 3 ljudsignaler från läsaren visar att nyckeln har länkats till systemet.

4.  När du har länkat användarnas elektroniska nycklar (*iButton*) håller du **Master key** mot nyckelläsaren igen för att stänga av länkningsläget. När länkningsläget är avstängt slutar lysdioden *State* på nyckelläsaren TM17 att blinka*.*

5.  För att radera alla nycklar (inklusive huvudnyckeln) håller du **Master key** mot läsaren i minst 20 sekunder.

Länka elektroniska nycklar med läsaren CZ-Dallas.

1.  Om listan **Tag code** är tom ska den första nyckeln som läggs till skrivas på den första raden i listan och blir **Master key.**

2.  För att slå på länkningsläget för kontaktnycklar håller du **Master key** mot nyckelläsarens ”öga” i minst 10 sekunder.

3.  För att länka användarnycklar håller du dem mot nyckelläsarens ”öga” en i taget.

4.  När du har länkat användarnas elektroniska nycklar (*iButton*) håller du **Master key** mot nyckelläsaren igen för att stänga av länkningsläget.

5.  För att radera alla nycklar (inklusive huvudnyckeln) håller du **Master key** mot läsaren i minst 20 sekunder.

!!! warning "Viktigt"
    Master key är avsedd för att länka andra elektroniska nycklar. Om du använder Master key för kommandon för tillkoppling och frånkoppling utförs de med fördröjning.

**Protegus2**

=== "Protegus app"

    Öppna **Users & Reporting → Protegus2**.

    ![Protegus-appen, Users & Reporting, Protegus2: Enable Protegus2 cloud service på, Enable parallel reporting på, Protegus2 cloud access code maskerad.](./protegus-app/sp3-users-cloud-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”Protegus”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Users & Reporting på fliken Protegus. I Cloud application är Enable cloud service och Parallel reporting markerade, och Cloud Access Code är 123456." src="./image63.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

**Inställningsgruppen ”Cloud application”**

- <span class="trik-term"><span class="trik-term-app"><strong>Enable Protegus2 cloud service</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Enable cloud service</strong><span class="trik-term-note">)</span></span></span> – aktivera molntjänsten Protegus Cloud; då kan FLEXi SP3 utbyta data med appen Protegus2 och centralapparaten kan konfigureras på distans med TrikdisConfig.

- <span class="trik-term"><span class="trik-term-app"><strong>Enable parallel reporting</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Parallel reporting</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickas meddelanden samtidigt via primärkanalen (till larmcentralen) och till Protegus2.

- <span class="trik-term"><span class="trik-term-app"><strong>Protegus2 cloud access code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Cloud access code</strong><span class="trik-term-note">)</span></span></span> – kod med 6 siffror för anslutning till Protegus2 (förval 123456).

**SMS answer texts**

=== "Protegus app"

    Öppna **Users & Reporting → SMS answer texts** och tryck sedan på ett svar för att ändra dess text.

    ![Protegus-appen, Users & Reporting, SMS answer texts: Command done, Wrong password, Wrong command och Wrong data, alla med samma text.](./protegus-app/sp3-users-sms-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”SMS answer texts”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Users & Reporting på fliken SMS answer texts. Tabellen kopplar svarstyper till redigerbara SMS-texter, bland annat Command done, Wrong password, Wrong data, Wrong command, Zone alarm, Zone restore, Output ON och Output OFF." src="./image64.webp" style="width:7.086614173228346in;height:2.645669291338583in" />

    Ändra texterna i kolumnen **SMS text**.

**Inställningsgruppen ”SMS answer texts”**

- Texterna i svaren på kommandon som skickas via SMS kan ändras. Appen har de fyra första svaren: **Command done**, **Wrong password**, **Wrong data** och **Wrong command**; **Zone alarm**, **Zone restore**, **Output ON** och **Output OFF** ställs bara in i TrikdisConfig.

### Fönstret ”Modules” <span id="55-modules-window"></span>

**Keypads**

=== "Protegus app"

    Öppna **Modules → Keypads**. Gruppen **Keypad settings** finns överst; listan **Keypads** under den visar varje knappsats som centralapparaten har hittat, med typ och serienummer. Tryck på en knappsats för att välja vilka områden den styr, eller på **Delete** för att ta bort den.

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Modules, Keypads, övre delen: enhetskort; Keypad settings med Keypad type Paradox/Protegus, Additional Wiegand on 1IO/2IO av, Duress code type 0 instead of first digit, Quick ARM på, Incorrect codes until lockout 3 attempts, Lockout timer 1 min, Panic, Medical och Fire alarm type Silent, Low voltage reader (1IO/2IO) av och nedtonad, Use fingerprint, Do not change charset och Custom entry beep av." src="./protegus-app/sp3-keypads-1-phone.webp" /><span class="trik-mob-pair__caption">Keypad settings</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Keypads, nedre delen: listan Keypads med Keypad FLEXi LCD Button 52001A3C och sju tomma platser 00000000." src="./protegus-app/sp3-keypads-2-phone.webp" /><span class="trik-mob-pair__caption">Listan Keypads</span></span>
    </span>

    ![Protegus-appen, Keypad FLEXi LCD Button med knappen Delete: Serial 52001A3C, Area 1 och Area 2 på, Area 3 till 8 av, och en knapp Ok.](./protegus-app/sp3-keypad-phone.webp){ .trik-mob-img }


    I appen är knappsatstyperna **Disabled**, **Paradox/Protegus**, **Wiegand reader** och **Crow CR Icon/LCD (ST)**; Crow erbjuds inte på revisioner som slutar på 4 med firmware 1.18 eller senare. En knappsats områdesomkopplare visas när knappsatstypen är Crow, eller, på revisioner som slutar på 4 med firmware 1.19 eller senare, för knappsatser vars serienummer börjar med 52, 51, 1E eller 1D. **6-digit user code** kräver firmware 1.24 eller senare; **Low voltage reader (1IO/2IO)**, **Use fingerprint** och **Do not change charset** kräver 1.15, och **Custom entry beep** 1.17. **Low voltage reader (1IO/2IO)** kan bara ändras när **Additional Wiegand on 1IO/2IO** är påslagen.

=== "TrikdisConfig"

    **Fliken ”Keypads”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Modules, fliken Keypads. Knappsatstabellen har kolumnerna Serial, Keypad type, Areas och Remove. Panelen Keypad parameters visar Quick ARM markerad, Incorrect codes until lockout inställt på 3 och Lockout timer inställt på 1 min." src="./image65.webp" style="width:7.086614173228346in;height:3.716535433070866in" />

    För att ta bort en knappsats kan du också ange nollor i **Serial**.

- **Serial** – knappsatsens serienummer, som centralapparaten identifierar automatiskt. För att ta bort en knappsats använder du <span class="trik-term"><span class="trik-term-app"><strong>Delete</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Remove</strong><span class="trik-term-note">)</span></span></span>.

- **Keypad type** – knappsatstypen, som centralapparaten identifierar automatiskt.

- **Areas** – du kan ange vilka områden knappsatsen ska kunna styra (gäller bara följande knappsatser: FLEXi SK LCD, FLEXi SK LED, SK LCD Button, SK LED Button).

- <span class="trik-term"><span class="trik-term-app"><strong>Delete</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Remove</strong><span class="trik-term-note">)</span></span></span> – när du trycker på knappen tas knappsatsen bort från listan.

<strong>Inställningsgruppen ”</strong><span class="trik-term"><span class="trik-term-app"><strong>Keypad settings</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Keypad parameters</strong><span class="trik-term-note">)</span></span></span><strong>”</strong>

- **Keypad type** – ange typen av knappsats (Crow CR16, Paradox LED, Wiegand reader) som är ansluten till centralapparaten (plintarna GRN, YEL).

- **Additional Wiegand on 1IO/2IO** – slå på den om en extra RFID-läsare är ansluten. En extra läsare kan anslutas till plintarna IO1 och IO2, som i så fall inte kan användas som ingångar eller utgångar.

- <span class="trik-term"><span class="trik-term-app"><strong>6-digit user code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>6 digits user code</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen har användarkoden som slås på knappsatsen 6 siffror. Om den nuvarande koden hade 4 siffror läggs de första två siffrorna i den nuvarande koden till användarkoden (1234 blir 123412). Alla användarkoder med 4 siffror ändras enligt den beskrivna metoden.

- **Duress code type** – välj typ av tvångskod. Om du tvingas att tillkoppla eller frånkoppla larmsystemet och anger tvångskoden tillkopplar eller frånkopplar systemet larmet och skickar omedelbart en tyst varning till larmcentralen (CMS).

- **Quick ARM** – knapparna ARM, STAY och SLEEP kan användas för att snabbt tillkoppla säkerhetssystemet utan att ange en kod.

- **Incorrect codes until lockout** – ange hur många felaktiga koder som tillåts innan knappsatsen spärras.

- **Lockout timer** – ange hur länge knappsatsen ska vara spärrad.

- **Panic alarm type** – ange vad larmet ska ge för ljud (**Audible** / **Silent** / **Disabled**) om funktionsknapparna **Panic alarm** på knappsatsen trycks in. När larmet är **Audible** skickas larmmeddelanden till Protegus2 och larmcentralen (CMS), och centralapparaten ger ett hörbart larm på knappsatsen och slår på sirenen. När larmet är **Silent** skickas larmmeddelanden till Protegus2 och larmcentralen, och centralapparaten stänger av de hörbara larmen. Om det är inställt på Disabled skickas inget larmmeddelande till Protegus2 och larmcentralen.

- **Medical alarm type** – ange vad larmet ska ge för ljud (**Audible** / **Silent** / **Disabled**) om funktionsknapparna **Medical alarm** på knappsatsen trycks in. När larmet är **Audible** skickas larmmeddelanden till Protegus2 och larmcentralen, och centralapparaten ger ett hörbart larm på knappsatsen och slår på sirenen. När larmet är **Silent** skickas larmmeddelanden till Protegus2 och larmcentralen, och centralapparaten stänger av de hörbara larmen. Om det är inställt på **Disabled** skickas inga larmmeddelanden till Protegus2 och larmcentralen.

- **Fire alarm type** – ange vad larmet ska ge för ljud (**Audible** / **Silent** / **Disabled**) om funktionsknapparna **Fire alarm** på knappsatsen trycks in. När larmet är **Audible** skickas larmmeddelanden till Protegus2 och larmcentralen, och centralapparaten ger ett hörbart larm på knappsatsen och slår på sirenen. När larmet är **Silent** skickas larmmeddelanden till Protegus2 och larmcentralen, och centralapparaten stänger av de hörbara larmen. Om det är inställt på **Disabled** skickas inga larmmeddelanden till Protegus2 och larmcentralen.

- **Low voltage reader (1IO/2IO)** – slå på den för att ändra kommunikationsprotokollet mellan centralapparaten och läsaren om den anslutna RFID-läsaren inte fungerar.

- **Use fingerprint** – slå på den om en fingeravtrycksläsare med protokollet Wiegand 26/34 ska anslutas.

- **Do not change charset** – slå på den om du inte vill ändra textkodningen för sektions- och områdesnamn på knappsatsen SK-LCD TouchPad.

- **Custom entry beep** – när den är påslagen är pipet för inpasseringstid på knappsatsen intermittent.

**RS485 modules**

=== "Protegus app"

    Öppna **Modules → RS485 modules** och tryck sedan på en modul, eller på **&lt;Add module&gt;** för en ledig plats. Med firmware 1.23 eller senare trycker du på **Update** för att visa varje moduls signalstyrka och matningsspänning.

    ![Protegus-appen, Modules, RS485 modules: knappen Update; RF-LORA 0A13F7 med 92 % signal och 12.1 V; utbyggnadsmodul iO-8 0B2C51 med 78 % och 12 V; larmsändare E485 0C3D82 med signal N/A och 12 V; fem lediga platser märkta Add module.](./protegus-app/sp3-rs485-phone.webp){ .trik-mob-img }

    ![Protegus-appen, Module 2: Module iO-8 expander, Firmware version 1.10, Serial number 0B2C51, Expander name Garage och en knapp Ok.](./protegus-app/sp3-rs485-module-phone.webp){ .trik-mob-img }


    Vilka moduler som kan väljas beror på centralapparatens revision och firmware; larmsändarna E485, SF485, RF-S8/S9 och PSTN kan vardera läggas till bara en gång. **Assigned area** visas bara för läsaren TM17.

=== "TrikdisConfig"

    **Fliken ”RS485 modules”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Modules, fliken RS485 modules. Rullgardinslistan Module är öppen och visar alternativ som iO expander, E485 communicator och RF-LORA transceiver." src="./image66.webp" style="width:7.086614173228346in;height:3.641732283464567in" />

**Inställningsgruppen ”RS485 modules”**

- **ID** – modulens nummer i listan.

- **Module** – välj den modul som används (modulerna iO, iO-WL, TM17, iO-8, RF-SH, E485 T16, SF485, iO-MO, iO-LORA, iO8-LORA, PB-LORA, REL-LORA, RF-LORA, RF-HW, RF-S8) i modullistan.

- <span class="trik-term"><span class="trik-term-app"><strong>Serial number</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Serial No.</strong><span class="trik-term-note">)</span></span></span> – obligatoriskt serienummer i hexadecimal form (0–9, A–F), som anges på etiketterna på modulens kapsling och förpackning.

- <span class="trik-term"><span class="trik-term-app"><strong>Assigned area</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Area</strong><span class="trik-term-note">)</span></span></span> – tilldela modulen ett område (TM17 visar status för det område den är tilldelad, och även status för de sektioner som är tilldelade samma område).

- <span class="trik-term"><span class="trik-term-app"><strong>Expander name</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Name</strong><span class="trik-term-note">)</span></span></span> – du kan ge modulen ett namn.

- **Firmware version** – när FLEXi SP3 hittar den anslutna modulen visas versionen av dess firmware.

**E485 settings**

=== "Protegus app"

    I appen finns nätverksinställningarna för E485 på E485-larmsändarens egen skärm: öppna **Modules → RS485 modules** och tryck på E485.

    ![Protegus-appen, Module 3: Module E485 communicator, Firmware version 1.02, Serial number 0C3D82, Expander name E485, DHCP mode på, Static IP, Subnet mask och Default gateway 0.0.0.0, och en knapp Ok.](./protegus-app/sp3-rs485-e485-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”E485 settings”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Modules, fliken E485 settings. Under Communicator network settings är DHCP mode markerad; Static IP, Subnet mask och Default gateway visar vardera 0.0.0.0." src="./image67.webp" style="width:7.086614173228346in;height:2.1141732283464565in" />

- **DHCP mode** – läge för registrering i LAN (manuellt eller automatiskt). När det är påslaget läser centralapparaten FLEXi SP3 automatiskt nätverksinställningarna (nätmask, gateway) och tilldelas automatiskt en IP-adress (automatiskt registreringsläge).

- **Static IP** – statisk IP-adress för manuellt registreringsläge.

- **Subnet mask** – nätmask för manuellt registreringsläge.

- **Default gateway** – gateway för manuellt registreringsläge.

### Fönstret ”Wireless” <span id="56-wireless-window"></span>

**Wireless sensors**

=== "Protegus app"

    Öppna **Wireless**. Listan visar varje trådlös enhet med batterispänning och signalstyrka; tryck på en enhet för att se dess inställningar. Tryck på **Update** för att läsa av aktuella nivåer för batteri och signal (inte på revisioner som slutar på 1).

    ![Protegus-appen, Wireless, Sensors: ett meddelande ”Settings have been changed press Write to save them.”, knapparna Learn och Update, därefter 1 Corner Pir 403117 3.05 V 86 %, 2 Magnet 403542 3.10 V 72 %, 3 Smoke 404018 3.00 V 64 %, 4 Remote control 405233 2.95 V 78 % och platserna 5 till 11 Disabled.](./protegus-app/sp3-wireless-phone.webp){ .trik-mob-img }

    ![Protegus-appen, enheten Corner Pir: Device Corner Pir, Serial number 403117, RSSI 86 %, Battery 3.05 V, Enable LED på, Sleep time 10 s, PIR1 sensitivity 10, PIR1 pulses count 3 och en knapp Ok.](./protegus-app/sp3-wireless-device-phone.webp){ .trik-mob-img }


    **Update** läser bara av dessa nivåer. Appen kan därefter säga att inställningarna har ändrats, men inget behöver skrivas. Vilka inställningar en enhet har beror på dess typ. På revisioner som slutar på 4 med firmware 1.19 eller senare visar appen också **Supervision time (min)**, 30 till 2 880 minuter. Om centralapparaten inte hör något från en trådlös detektor under den tiden skickar den felhändelsen *RF device lost* (Contact ID 381), och *RF device restore* när detektorn är tillbaka.

=== "TrikdisConfig"

    <img alt="TrikdisConfig, fönstret Wireless sensors. Tabellen Sensors visar Device type som Disabled i de synliga raderna, med kolumnerna Serial No., Area, User, Key 3, Key 4 och Configure." src="./image68.webp" style="width:7.086614173228346in;height:1.9251968503937007in" />

FLEXi SP3 kan med en ansluten RF-LORA-modul använda trådlösa detektorer, sirener och fjärrkontroller från företaget ”Maximum”.

#### Registrera mottagaren RF-LORA för trådlösa detektorer i centralapparaten FLEXi SP3

Centralapparaten FLEXi SP3 har firmware-revision 4 SP3_xxx**4**\_0121.fw (firmwareversion 1.21 eller senare), som gör att trådlösa detektorer från ”Maximum” fungerar. Den trådlösa transceivern RF-LORA måste vara ansluten till centralapparaten.

=== "Protegus app"

    1.  Slå på matningen till FLEXi SP3 och vänta 1 minut.
    2.  Öppna **Settings → Advanced settings** i Protegus-appen och tryck på **Read**.
    3.  Öppna **Modules → RS485 modules**. Om **RF-LORA** finns i listan trycker du på den: om den visar en **Firmware version** är den redan länkad och du kan sluta här.
    4.  Tryck på **&lt;Add module&gt;**, välj **RF-LORA** under **Module**, ange RF-LORA:s **Serial number** (finns på enheten och på etiketten på förpackningen) och tryck på **Ok**.
    5.  Tryck på **Advanced settings → Write**.
    6.  Vänta 1 minut tills FLEXi SP3 och RF-LORA har länkats ihop och tryck sedan på **Read**.
    7.  Tryck på raden för RF-LORA i **Modules → RS485 modules**: en **Firmware version** visar att den är länkad.

=== "TrikdisConfig"

    1. Slå på matningen till centralapparaten FLEXi SP3.

    2. Vänta 1 minut.

    3. Starta ***TrikdisConfig**.*

    4. Anslut FLEXi SP3 till en dator med en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C).

    5. Modullistan ska visa ”**RF-LORA transceiver**” samt serienummer och firmwareversion. Om du ser firmwareversionen för transceivern RF-LORA är den redan länkad: fortsätt från ”RF-LORA-modulen är nu länkad”.

        <img alt="TrikdisConfig, fönstret Modules, fliken RS485 modules. Den markerade raden visar RF-LORA transceiver under Module, ett ifyllt fält Serial No. och RF-Lora 433 02.39 under Firmware version." src="./image69.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

    6. Om listan inte visar ”**RF-LORA transceiver**” måste du välja ”**RF-LORA transceiver**” i listan.

    7. Ange serienumret för RF-LORA-modulen i fältet ”**Serial No.**”. Serienumret finns på enheten och på etiketten på förpackningen.

        <img alt="TrikdisConfig, fönstret Modules, fliken RS485 modules. Den markerade raden RF-LORA transceiver har ett ifyllt fält Serial No. och ett tomt fält Firmware version." src="./image70.webp" style="width:7.086614173228346in;height:1.5826771653543308in" />

    8. Klicka på **Write [F5]**.

    9. Koppla bort USB-kabeln.

    10. Vänta 1 minut tills FLEXi SP3 och RF-LORA har länkats ihop.

    11. Anslut en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C) till FLEXi SP3.

    12. Klicka på **Read [F4]**.

    13. Firmwareversionen för RF-LORA visas i fönstret ”**Modules**”.

        <img alt="TrikdisConfig, fönstret Modules, fliken RS485 modules. Den markerade raden visar RF-LORA transceiver under Module, ett ifyllt fält Serial No. och RF-Lora 433 02.39 under Firmware version." src="./image69.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

    14. RF-LORA-modulen är nu länkad till FLEXi SP3.

    15. Koppla bort USB-kabeln.

    16. Klicka på ”**Disconnect**”.

        <img alt="TrikdisConfig, fönstret Modules, fliken RS485 modules. Raden RF-LORA transceiver visar en firmwareversion och knappen Disconnect är markerad." src="./image71.webp" style="width:7.086614173228346in;height:1.562992125984252in" />

    17. Vänta 1 minut.

#### Länka trådlösa detektorer på distans

=== "Protegus app"

    Appen ansluter alltid på distans, så centralapparaten måste vara online.

    1.  Sätt i batterier i de trådlösa detektorerna. Håll RF-LORA minst 1 m från detektorerna.
    2.  Öppna **Wireless** och tryck på **Learn**. Appen visar **Learning mode**, och lysdioden ”**DATA/TROUBLE**” på RF-LORA blinkar grönt/rött. Om appen säger att åtgärden avbröts kontrollerar du att alla områden är frånkopplade och att systemet inte har några fel, och försöker sedan igen.
    3.  Tryck på knappen ”**TAMPER**” på detektorn.

        <img alt="Teckning av baksidan på en öppen trådlös detektor. En röd pil märkt Tamper pekar på den fjäderbelastade sabotagekontakten nära övre vänstra hörnet." src="./image76.webp" style="width:1.7733366141732283in;height:2.37667104111986in" />

    4.  När appen hittar detektorn (”New device was found”) väljer du en oanvänd sektion i **Select zone** och sektionens definition i **Select zone definition**. Andra enheter, till exempel en siren eller en fjärrkontroll, kan i stället fråga efter en utgång, ett område eller en användare.
    5.  För att lägga till nästa detektor trycker du på dess ”**TAMPER**”-knapp och väljer dess sektion och definition på samma sätt.
    6.  Tryck på **Stop learning** och sedan på **Advanced settings → Write**.
    7.  Kontrollera i **Zones** att detektorerna är tilldelade rätt sektioner och områden.

    För att ta bort en trådlös enhet öppnar du den i **Wireless**, ställer in **Device** på **Disabled**, trycker på **Ok** och sedan på **Advanced settings → Write**.

=== "TrikdisConfig"

    Anslut på distans till centralapparaten FLEXi SP3 med TrikdisConfig.

    !!! warning "Viktigt"
        Fjärrkonfigurering fungerar bara när FLEXi SP3:

        1.  Ett aktiverat SIM-kort måste vara isatt och PIN-koden måste vara angiven eller avstängd, eller så måste centralapparaten vara ansluten till ett WiFi-nätverk.

        2.  Om ett SIM-kort används är mobilt internet aktiverat på det.

        3.  Molntjänsten Protegus Cloud måste vara aktiverad.

        4.  Matningen måste vara påslagen (lysdioden ”**PWR**” ska blinka grönt).

        5.  Centralapparaten måste vara ansluten till nätverket (lysdioden ”**NET**” ska lysa fast grönt och blinka gult).
    I avsnittet ”**Remote access**” anger du centralapparatens nummer ”**IMEI/Unique ID**”. Numret finns på enheten och på etiketten på förpackningen.

    <img alt="TrikdisConfig, avsnittet Remote access. Fältet Unique ID och knappen Configure är markerade för anslutning till en centralapparat." src="./image72.webp" style="width:7.086614173228346in;height:2.141732283464567in" />

    Klicka på ”**Configure**”.

    Klicka på **Read [F4]** i det nya fönstret som öppnas. Ange administratörs- eller installatörskoden om det behövs.

    Gå till fönstret ”**Wireless sensors**”.

    <img alt="TrikdisConfig, fönstret Wireless sensors. Tabellen Sensors visar avaktiverade enheter, med knapparna Learn sensors och Update ovanför." src="./image73.webp" style="width:7.086614173228346in;height:1.7480314960629921in" />

    Klicka på knappen ”**Learn sensors**”.

    <img alt="TrikdisConfig, fönstret Wireless sensors. Knappen Learn sensors ovanför tabellen Sensors är markerad." src="./image74.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

    Alla trådlösa detektorer kan länkas samtidigt. Sätt i batterier i de trådlösa detektorerna (PIR, magnetkontakt, vattenläckagedetektor, rökdetektor, siren).

    När detektorerna registreras måste modulen *RF-LORA* vara minst 1 m från detektorerna.

    1. Lysdioden ”**DATA/TROUBLE**” på RF-LORA-modulen blinkar grönt/rött.

    2. RF-LORA-modulen växlar till inlärningsläge. TrikdisConfig öppnar fönstret för koppling av detektorer.

        <img alt="TrikdisConfig, fönstret Learning mode. Det uppmanar användaren att sätta i batterier i den nya detektorn och vänta på initiering; knappen Stop learning finns under." src="./image75.webp" style="width:3.7401574803149606in;height:2.322834645669291in" />

    3. Tryck på knappen ”**TAMPER**” på detektorn.

        <img alt="Teckning av baksidan på en öppen trådlös detektor. En röd pil märkt Tamper pekar på den fjäderbelastade sabotagekontakten nära övre vänstra hörnet." src="./image76.webp" style="width:1.7733366141732283in;height:2.37667104111986in" />

    4. På RF-LORA-modulen blinkar lysdioden ”**DATA/TROUBLE**” grönt en kort stund (det visar att detektorn är registrerad). Efter några sekunder börjar indikeringen ”**DATA/TROUBLE**” blinka grönt/rött igen.

    5. TrikdisConfig öppnar ett nytt fönster där du måste tilldela den trådlösa detektorn ett ”**Zone Number**” och en ”**Zone Definition**”.

    6. Klicka på ”**Save**”.

        <img alt="TrikdisConfig, fönstret New device was found för en Corner PIR-detektor. De markerade inställningarna är Zone number 1 och Zone definition Instant, följda av den markerade knappen Save." src="./image77.webp" style="width:3.0708661417322833in;height:1.9724409448818898in" />

    7. Den trådlösa detektorn läggs till i listan över detektorer.

    8. Om du behöver lägga till nästa detektor trycker du på knappen ”**TAMPER**” på detektorn och gör inställningarna som beskrivs ovan.

    9. Klicka på ”**Stop learning**” för att slutföra registreringen av trådlösa detektorer.

        <img alt="Fönstret Learning mode uppmanar användaren att sätta i batterierna i den nya detektorn och vänta på initiering. Ett markerat meddelande anger: New device was found: ID 1 Corner PIR. Knappen Stop learning är markerad." src="./image78.webp" style="width:3.7401574803149606in;height:2.645669291338583in" />

    10. Klicka på ”**Yes**” för att skriva detektorerna till centralapparaten FLEXi SP3, eller på ”**No**” om du vill justera parametrarna ytterligare.

        <img alt="Dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Knappen Yes är markerad; No finns också." src="./image79.webp" style="width:2.7559055118110236in;height:1.1614173228346456in" />

    Vänta några minuter. Klicka på **Read [F4].**

    TrikdisConfig visar en lista över registrerade trådlösa detektorer i fönstret ”**Wireless sensors**”. Serienumret anges i fältet ”**Serial No.**”.

    <img alt="TrikdisConfig, fönstret Wireless sensors, fliken Sensors. En registrerad rad Corner PIR är markerad, inklusive fältet Serial No.; serienumret är utelämnat." src="./image80.webp" style="width:7.086614173228346in;height:1.5590551181102361in" />

    Kontrollera att detektorerna är rätt tilldelade centralapparatens ”**Zones**” och ”**Areas**” (fönstret ”**Zones**”).

    <img alt="TrikdisConfig, fönstret Zones, fliken Zones settings. Den markerade raden Zone 1 har en Input som börjar med Wireless Corner, Area 1, Definition Instant och Type EOL_T." src="./image81.webp" style="width:7.086614173228346in;height:1.736220472440945in" />

    Om du ställer in sektionens ”**Type**” på EOL-T aktiveras övervakning av detektorns sabotage.

    Klicka på **Write [F5]** efter att du har gjort ändringar.

    !!! note "Obs!"
        Så här tar du bort trådlösa detektorer från FLEXi SP3:s minne:

        1.  Starta ***TrikdisConfig**.*

        2.  Anslut FLEXi SP3 till en dator med en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C) eller anslut till FLEXi SP3 på distans. Klicka på knappen **Read [F4]**.

        3.  I TrikdisConfig-fönstret ”**Wireless sensors**” väljer du ”**Disabled**” i kolumnen ”**Device type**” för den trådlösa detektor du vill ta bort och klickar på **Write [F5]**. Den trådlösa detektorn är nu borttagen från FLEXi SP3:s minne.

#### Länka trådlösa detektorer utan fjärråtkomst

Alla trådlösa detektorer kan länkas samtidigt. Sätt i batterier i de trådlösa detektorerna (PIR, magnetkontakt, vattenläckagedetektor, rökdetektor, siren). **När detektorerna registreras måste modulen *RF-LORA* vara minst 1 m från detektorerna.**

1. Kontrollera att transceivern RF-LORA är registrerad i centralapparaten FLEXi SP3.

2. Slå på matningen till centralapparaten FLEXi SP3.

3. Ta bort locket från transceivern RF-LORA.

4. Håll knappen ”**LEARN**” på RF-LORA-modulen nedtryckt tills indikeringen ”**DATA/TROUBLE**” börjar blinka grönt/rött.

5. Släpp knappen ”**LEARN**”.

6. Den blinkande indikeringen ”**DATA/TROUBLE**” visar att RF-LORA är i registreringsläge för trådlösa enheter.

7. Tryck på knappen ”TAMPER” på detektorn.

    <img alt="Teckning av baksidan på en öppen trådlös detektor. En röd pil märkt Tamper pekar på den fjäderbelastade sabotagekontakten nära övre vänstra hörnet." src="./image76.webp" style="width:1.7733366141732283in;height:2.37667104111986in" />

8. På RF-LORA-modulen blinkar lysdioden ”**DATA/TROUBLE**” grönt en kort stund (det visar att detektorn är registrerad).

9. Efter några sekunder börjar indikeringen ”**DATA/TROUBLE**” blinka grönt/rött igen.

10. Om du behöver lägga till nästa detektor trycker du på knappen ”**TAMPER**” på detektorn.

11. För att slutföra registreringen av trådlösa detektorer håller du knappen ”**LEARN**” nedtryckt tills indikeringen ”**DATA/TROUBLE**” slutar blinka grönt/rött. Släpp knappen ”**LEARN**”. Transceivern RF-LORA har lämnat registreringsläget.

Kontrollera sedan resultatet:

=== "Protegus app"

    1. Tryck på **Advanced settings → Read** (centralapparaten måste vara online).
    2. Öppna **Wireless**: de registrerade enheterna finns i listan.
    3. Kontrollera i **Zones** att detektorerna är tilldelade rätt sektioner och områden.
    4. Tryck på **Advanced settings → Write** efter att du har gjort ändringar.

=== "TrikdisConfig"

    1. Anslut en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C) till FLEXi SP3.

    2. Starta TrikdisConfig. Klicka på knappen **Read [F4]**.

    3. TrikdisConfig-fönstret ”**Wireless sensors**” innehåller en lista över registrerade trådlösa enheter. I fältet ”**Serial No.**” står serienummer med 7 siffror.

        <img alt="TrikdisConfig, fönstret Wireless sensors, fliken Sensors. En registrerad rad Corner PIR är markerad, inklusive fältet Serial No.; serienumret är utelämnat." src="./image80.webp" style="width:7.086614173228346in;height:1.5590551181102361in" />

    4. Kontrollera att detektorerna är rätt tilldelade centralapparatens ”**Zones**” och ”**Areas**” (fönstret ”**Zones**”).

        <img alt="TrikdisConfig, fönstret Zones, fliken Zones settings. Den markerade raden Zone 1 har en Input som börjar med Wireless Corner, Area 1, Definition Instant och Type EOL_T." src="./image81.webp" style="width:7.086614173228346in;height:1.736220472440945in" />

    5. Klicka på **Write [F5]** efter att du har gjort ändringar.

    6. De trådlösa detektorerna är registrerade.


### Fönstret ”Zones” <span id="57-zones-window"></span>

**Zones settings**

=== "Protegus app"

    Öppna **Zones** och tryck sedan på en sektion. Listan visar varje sektion med ingång, områden, definition och typ; en sektion utan ingång visar **Disabled**.

    ![Protegus-appen, Zones settings för FLEXi SP3, de första raderna i listan: Zone 1 SP3 1 I/O, Area 1, Instant, EOL_T; Zone 2 SP3 2 I/O, Area 1, Interior, EOL; Zone 3 till 7 SP3 3 till 7 I/O, Area 1, Instant, EOL; Zone 8 till 10 Disabled; Zone 11 Wireless Corner Pir ID1, Instant; Zone 12 Wireless Magnet ID2, Delay; Zone 13 Wireless Smoke ID3, Fire, alla NC i Area 1.](./protegus-app/sp3-zones-phone.webp){ .trik-mob-img }

    ![Protegus-appen, Zone settings för Zone 1: Input SP3 1 I/O, Assigned areas Area 1, Definition Instant, Type EOL_T, Enable chime av, Can be bypassed på, Force ARM av, Report to CMS på, Report to Protegus2 cloud på, Reaction time 400 ms, Zone event CID code 130.](./protegus-app/sp3-zone-phone.webp){ .trik-mob-img }


    I appen har ingångar på utbyggnadsmodulerna iO, iO-WL, iO-MO, iO-LORA och PB-LORA bara typerna NO och NC.

=== "TrikdisConfig"

    **Fliken ”Zones settings”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret Zones, fliken Zones settings. Tabellen listar varje sektions Name, Input, Area, Definition, Type, rapporteringsalternativ, Delay och CID Code; Zone 1 använder SP3 1 I/O, Area 1, Instant och EOL_T." src="./image82.webp" style="width:7.086614173228346in;height:1.9330708661417322in" />

- **Zone No** – sektionens nummer i listan.

- <span class="trik-term"><span class="trik-term-app"><strong>Zone name</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Name</strong><span class="trik-term-note">)</span></span></span> – ange sektionens namn.

- **Input** – du kan välja vilken ingång IN på FLEXi SP3 eller på en utbyggnadsmodul som ska tilldelas sektionen.

- <span class="trik-term"><span class="trik-term-app"><strong>Assigned areas</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Area</strong><span class="trik-term-note">)</span></span></span> – tilldela sektionen ett område.

- **Definition** – varje sektion kan tilldelas en av dessa sektionsfunktioner:

  - **Delay** – för anslutning av en magnetkontakt på ytterdörren. För den här sektionstypen kan du ställa in inpasseringstid och utpasseringstid.

Efter att larmet har tillkopplats är det tillåtet att påverka sektionen ”Delay” under utpasseringstiden. Om sektionen fortfarande är påverkad när tiden har gått slås utgångarna OUT ”Siren” och ”Flash” på och larmrapporter skickas.

När larmet är tillkopplat startar en påverkan på sektionen ”Delay” inpasseringstiden, under vilken larmet måste frånkopplas. Om larmet fortfarande inte är frånkopplat när tiden har gått slås utgångarna OUT ”Siren” och ”Flash” på och larmrapporter skickas.

- **Interior** – för anslutning av en rörelsedetektor vid ytterdörren.

Om larmsystemet är tillkopplat och sektionen ”Interior” utlöses slås utsignalerna ”Siren” och ”Flash” på och en rapport om att larmsystemet har utlösts skickas.

Om larmsystemet är tillkopplat och sektionen ”Delay” utlöses först kan sektionen ”Interior” också utlösas under den inställda inpasseringstiden. Om larmet inte frånkopplas under den inställda inpasseringstiden slås utsignalerna ”Siren” och ”Flash” på och en rapport om att larmsystemet har utlösts skickas.

- **Interior Stay** – för anslutning av en rörelsedetektor vid ytterdörren.

Om larmsystemet är tillkopplat och sektionen ”Interior Stay” påverkas slås utsignalerna ”Siren” och ”Flash” på och en rapport om att larmsystemet har utlösts skickas.

Om larmsystemet är tillkopplat och sektionen ”Delay” utlöses först kan sektionen ”Interior Stay” också utlösas under den inställda inpasseringstiden. Om larmet inte frånkopplas under den inställda inpasseringstiden slås utsignalerna ”Siren” och ”Flash” på och en rapport om att larmsystemet har utlösts skickas.

När larmsystemet är tillkopplat i hemmaläge (STAY) är sektionerna ”Interior Stay” inte skyddade.

- **Instant** – för anslutning av rörelsedetektorer. Om sektionen ”Instant” påverkas när larmet är tillkopplat slås utgångarna OUT ”Siren” och ”Flash” på och ett meddelande om att larmet har utlösts skickas.

- **Instant Stay** – för anslutning av rörelsedetektorer. Om en sektion ”Instant Stay” påverkas när larmet är tillkopplat slås utgångarna OUT ”Siren” och ”Flash” på och ett meddelande om att larmet har utlösts skickas. När larmsystemet är tillkopplat i hemmaläge (STAY) är sektionerna ”Instant Stay” inte skyddade.

- **Fire** – för anslutning av branddetektorer. Om den här sektionen påverkas slås utgångarna OUT ”Siren” och ”Flash” på omedelbart och en händelserapport skickas.

  - **Keyswitch** – för anslutning av en knappsats eller en annan brytare. Om brytaren utlöser den här sektionen tillkopplas eller frånkopplas larmet. Larmet tillkopplas när den inställda utpasseringstiden (**Exit time**) har gått.

  - <span class="trik-term"><span class="trik-term-app"><strong>24 hours</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>24_hour</strong><span class="trik-term-note">)</span></span></span> – för anslutning av glaskross- och sabotagedetektorer. Om den här sektionen påverkas slås utgångarna OUT ”Siren” och ”Flash” på omedelbart och en händelserapport skickas.

  - **Silent** – om larmet är tillkopplat och den här sektionen påverkas skickas en händelserapport omedelbart, men utsignalerna ”Siren” och ”Flash” genereras inte.

  - **Silent 24h** – för anslutning av överfallsknappar. Om den här sektionen påverkas skickas en händelserapport omedelbart oavsett säkerhetssystemets tillstånd, men utsignalerna ”Siren” och ”Flash” genereras inte.
- **Type** – välj typen av krets som är ansluten till sektionens ingång IN i en lista: NC – normalt sluten; NO – normalt öppen; EOL – med slutmotstånd; EOL_T – med slutmotstånd och sabotageövervakning; ATZ – tvåsektionskrets, normalt sluten, med slutmotstånd, utan sabotageövervakning (för att använda den här typen väljer du den andra ATZ-sektionen i ingångslistan); ATZ_T – tvåsektionskrets, normalt sluten, med slutmotstånd, med sabotageövervakning (för att använda den här typen väljer du den andra ATZ-sektionen i ingångslistan); 3EOL – med slutmotstånd och sabotageövervakning (inställningen används när rörelsedetektion med anti-masking-funktion används).

- <span class="trik-term"><span class="trik-term-app"><strong>Enable chime</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Chime</strong><span class="trik-term-note">)</span></span></span> – om den slås på aktiveras ding-dong-funktionen för sektionen. När sektionen aktiveras piper knappsatsen.

- <span class="trik-term"><span class="trik-term-app"><strong>Can be bypassed</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Bypass</strong><span class="trik-term-note">)</span></span></span> – gör att den här sektionen kan förbikopplas och ignoreras när den utlöses.

- <span class="trik-term"><span class="trik-term-app"><strong>Force ARM</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Force</strong><span class="trik-term-note">)</span></span></span> – gör att säkerhetssystemet kan tillkopplas med sektionen öppen. När larmet är tillkopplat kopplas öppna sektioner som är inställda på läget ”Force” tillfälligt bort. Efter att sektionen har återställts slås de på och övervakas igen. En påverkan på den här sektionen utlöser ett larm.

- <span class="trik-term"><span class="trik-term-app"><strong>Report to CMS</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>CMS</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickas händelserapporter för sektionen till larmcentralen (CMS).

- <span class="trik-term"><span class="trik-term-app"><strong>Report to Protegus2 cloud</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Prot.</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickas händelserapporter för sektionen till Protegus Cloud.

- <span class="trik-term"><span class="trik-term-app"><strong>Reaction time</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Delay</strong><span class="trik-term-note">)</span></span></span> – reaktionstid för sektionen på ingången IN, i millisekunder.
- <span class="trik-term"><span class="trik-term-app"><strong>Zone event CID code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>CID code</strong><span class="trik-term-note">)</span></span></span> – händelsekoder i Contact ID. Koden fylls i automatiskt när du har valt en definition för sektionen.

- **Sound** – ange numret på den röstinspelning som spelas upp för användaren när centralapparaten FLEXi SP3 ringer upp vid ett larm (funktionen gäller centralapparat SP3_12xx med firmware upp till och med 1.13). *Finns bara i TrikdisConfig.*

**Fliken ”SMS & Call reporting”** *Finns bara i TrikdisConfig.*

<img alt="TrikdisConfig, fönstret Zones, fliken SMS & Call reporting. En tabell listar raderna Event och Restore för sektionerna med rutorna SMS och Call under User 1; de synliga rutorna är omarkerade." src="./image83.webp" style="width:7.086614173228346in;height:1.921259842519685in" />

Den här fliken visas bara om det finns minst ett användartelefonnummer i fönstret *[”Users & Reporting”](#Users_window)*.

- **Zn** – sektionsnummer med ett ord som anger händelsen. Kan vara *”Event”* eller ”Restore”.

- **User / SMS and Call** – välj hur användarna ska informeras om händelser i varje enskild sektion: via SMS och/eller telefonsamtal.

### Fönstret ”PGM” <span id="58-pgm-window"></span>

**Outputs**

=== "Protegus app"

    Öppna **PGM → Outputs** och tryck sedan på en utgång.

    ![Protegus-appen, PGM, listan Outputs: 1 PGM 1 BELL, Siren, Area 1; 2 PGM 2 LED, System state, Area 1; 3 PGM 3 SP3 10 I/O, Fire sensor reset; 4 Garden lights SP3 9 I/O, Remote control; 5 Heating SP3 8 I/O, Thermostat; de övriga synliga raderna, PGM 6 till PGM 15, Disabled.](./protegus-app/sp3-outputs-phone.webp){ .trik-mob-img }

    ![Protegus-appen, utgången Garden lights: Name Garden lights, Output SP3 9 I/O, Definition Remote control, Pulse time 20 s, Report to CMS av, Report to Protegus2 cloud på och en knapp Ok.](./protegus-app/sp3-output-phone.webp){ .trik-mob-img }


    **Pulse time** visas för utgångar av typen **Remote control**. Med firmware 1.19 eller senare listar appen också definitionen **Fire reset (inverted)**, som fungerar tvärtom jämfört med **Fire sensor reset**.

=== "TrikdisConfig"

    **Fliken ”Outputs”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret PGM, fliken Outputs. PGM 1 använder BELL med output definition Siren; PGM 2 använder LED med System State; PGM 3 använder SP3 10 I/O med Fire Sensor Reset. Varje synlig rad har Pulse Time 20 s." src="./image84.webp" style="width:7.086614173228346in;height:2.094488188976378in" />

- **PGM No** – anger PGM-utgångens nummer i listan.

- **Name** – ange PGM-utgångens namn.

- <span class="trik-term"><span class="trik-term-app"><strong>Output</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM output</strong><span class="trik-term-note">)</span></span></span> – tilldela PGM:en utgångarna OUT på FLEXi SP3 eller på en extern enhet.

- <span class="trik-term"><span class="trik-term-app"><strong>Assigned area(s)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Area</strong><span class="trik-term-note">)</span></span></span> – tilldela utgången OUT ett område.

- <span class="trik-term"><span class="trik-term-app"><strong>Definition</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Output definition</strong><span class="trik-term-note">)</span></span></span> – välj driftläge för utgången OUT.
- **Siren** – för anslutning av en siren.

- **Remote control** – för styrning av externa elektriska enheter.

- <span class="trik-term"><span class="trik-term-app"><strong>Fire sensor reset</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Fire Sensor Reset</strong><span class="trik-term-note">)</span></span></span> – för att återställa en branddetektor efter utlösning.

- <span class="trik-term"><span class="trik-term-app"><strong>System state</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>System State</strong><span class="trik-term-note">)</span></span></span> – för anslutning av en statusindikering för säkerhetssystemet. Till exempel kan en lysdiod visa när larmet är tillkopplat/frånkopplat.

- **Flash** – om larmet är tillkopplat genereras en jämn signal, om det har utlösts en pulserande signal. Signalen bryts när larmet frånkopplas.

- **Thermostat** – den här inställningen gör att PGM-utgången arbetar i termostatläge. En temperaturgivare måste vara ansluten till FLEXi SP3. PGM-utgången måste vara inställd på termostatläge och den temperatur som den ska hålla måste anges.

- **Buzzer** – för att upprepa knappsatsens ljudsignaler.
- <span class="trik-term"><span class="trik-term-app"><strong>Pulse time</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Pulse time, s</strong><span class="trik-term-note">)</span></span></span> – du kan ställa in hur länge utgången OUT ska vara påslagen, från 0 till 9999 sekunder.

- <span class="trik-term"><span class="trik-term-app"><strong>Report to CMS</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>CMS</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickas rapporter om att PGM-utgången slås på och av till larmcentralen (CMS).

- <span class="trik-term"><span class="trik-term-app"><strong>Report to Protegus2 cloud</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Prot.</strong><span class="trik-term-note">)</span></span></span> – när den är påslagen skickas rapporter om att PGM-utgången slås på och av till Protegus Cloud.

**Set action**

=== "Protegus app"

    Öppna **PGM → Set action**. Varje rad har en omkopplare som slår på den, utgången och dess åtgärd, och villkoret under. Tryck på en rad för att ställa in villkoret (**If**) samt utgången och åtgärden (**Then**).

    ![Protegus-appen, PGM, Set action: Garden lights - SP3 9 I/O ON, If Arm Area 1, på; Garden lights - SP3 9 I/O OFF, If Disarm Area 1, på; de övriga raderna N/A och av.](./protegus-app/sp3-actions-phone.webp){ .trik-mob-img }


    Under **If** omfattar villkoret också när det gäller (till exempel larm eller återställning) och ett eventuellt värde. Åtgärderna är **OFF**, **ON**, **Pulse OFF**, **Pulse ON** och, med firmware 1.20 eller senare, **Toggle**. Villkoren **AC lost**, **Low battery** och **Zone tamper** kräver firmware 1.20 eller senare.

=== "TrikdisConfig"

    **Fliken ”Set Action”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret PGM, fliken Set Action. Tabellen har kolumnerna Enable, PGM No., Action, Pulse Time, Factor, Factor No., Start when och Set value. De synliga raderna är avaktiverade och visar PGM No. N/A, Action PGM OFF och Factor Arm." src="./image85.webp" style="width:7.086614173228346in;height:2.106299212598425in" />

- **ID** – utgångens nummer i listan.
- **Enable** – aktiverar PGM:ens driftalgoritm.

- <span class="trik-term"><span class="trik-term-app"><strong>Then</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM No.</strong><span class="trik-term-note">)</span></span></span> – den utgång OUT som styrs när villkoret inträffar.

- **Action**:
- <span class="trik-term"><span class="trik-term-app"><strong>OFF</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM OFF</strong><span class="trik-term-note">)</span></span></span> – utgången OUT är avstängd (”Off”).

- <span class="trik-term"><span class="trik-term-app"><strong>ON</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM ON</strong><span class="trik-term-note">)</span></span></span> – utgången OUT är påslagen (”On”).

- **Pulse OFF** – utgången OUT är från början påslagen (”On”). Efter kommandot blir utgångens tillstånd ”Off” under **Pulse time** och återgår därefter automatiskt till det ursprungliga tillståndet ”On”**.**

- **Pulse ON** – utgången OUT är från början avstängd (”Off”). Efter kommandot blir utgångens tillstånd ”On” under **Pulse time** och återgår därefter automatiskt till det ursprungliga tillståndet ”Off”**.**

- **Toggle** – när villkoret är uppfyllt växlar utgången OUT till motsatt tillstånd.
- <span class="trik-term"><span class="trik-term-app"><strong>Pulse time</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Pulse time, s</strong><span class="trik-term-note">)</span></span></span> – du kan ställa in pulstiden från 0 till 9999 sekunder.

- <span class="trik-term"><span class="trik-term-app"><strong>If</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Factor/Factor No.</strong><span class="trik-term-note">)</span></span></span> – välj vilken händelse (Zone, Sensor, Jamming, Sensor lost, iButton, Arm, Disarm, SMS received, Zone(follow), Stay, Sleep, AC lost, Low battery, Zone tamper) som ska slå på utgången OUT.

  - Scheman kan tilldelas en utgång OUT. Schemat visar när utgången ska slås på. Upp till 10 olika scheman kan förberedas i <span class="trik-term"><span class="trik-term-app"><strong>Schedulers</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Scheduler tab</strong><span class="trik-term-note">)</span></span></span>.

- **Start when** – ett extra villkor för att slå på utgången OUT, beroende på händelsen.

- <span class="trik-term"><span class="trik-term-app"><strong>Value</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Set value</strong><span class="trik-term-note">)</span></span></span> – beroende på villkoret (SMS received, Temperature) kan ett värde anges (texten i ett mottaget SMS, spänning eller temperatur). Om det här värdet identifieras utförs åtgärden. SMS-texten kan avgränsas med %-tecken. %-tecknen används för att skilja ut det nyckelord som ändrar tillståndet för en PGM-utgång från hela det mottagna SMS:et.

**%.....%** – en del av det mottagna SMS:ets text måste stämma överens med texten som anges mellan %-tecknen (t.ex. **%hoUSe%**. Texten i ett SMS måste innehålla texten ”**hoUSe**”. Exempel på ett SMS: **VacationhoUSe25864**).

**.....%** – början av det mottagna SMS:et måste stämma överens med texten som anges före %-tecknet (t.ex. **hoUSe%**. SMS:et måste börja med texten ”**hoUSe**”. Exempel på ett SMS: **hoUSeddss**).

**%.....** – slutet av det mottagna SMS:et måste stämma överens med texten som anges efter %-tecknet (t.ex. **%hoUSe**. SMS:et måste sluta med texten ”**hoUSe**”. Exempel på ett SMS: **1144hoUSe**).

SMS-texten är skiftlägeskänslig.

**Control**

=== "Protegus app"

    Öppna **PGM → Control**.

    <span class="trik-mob-pair">
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, PGM, Control, övre delen: enhetskort; Entry/Exit control med iButton enabled, PGM Garden lights - SP3 9 I/O, PGM mode Pulse, Area action Arm/Disarm; Wiegand 1 och Wiegand 2 med Enabled och Code av, PGM None, PGM mode Pulse, Area action None." src="./protegus-app/sp3-control-1-phone.webp" /><span class="trik-mob-pair__caption">Entry/Exit control</span></span>
    <span class="trik-mob-pair__item"><img class="trik-mob-img" alt="Protegus-appen, Control, nedre delen: Paradox keypad control med Utility key 1 inställd på Area statuses; Utility key 2 med PGM Garden lights - SP3 9 I/O, PGM mode Pulse; Utility key 3 till 6 med PGM None, PGM mode Pulse." src="./protegus-app/sp3-control-2-phone.webp" /><span class="trik-mob-pair__caption">Paradox keypad control</span></span>
    </span>


    Med en Crow-knappsats visar appen **Crow keypad output control** i stället för Paradox-tangenterna.

=== "TrikdisConfig"

    **Fliken ”Control”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret PGM, fliken Control. Entry/Exit control listar läsarna iButton, Wiegand 1 (G/Y) och Wiegand 2 (IO). Paradox keypad control visar Utility key 1 (1+2) inställd på Area statuses; de övriga synliga utility keys är inställda på None och Pulse." src="./image86.webp" style="width:7.086614173228346in;height:2.5118110236220472in" />

**Inställningsgruppen ”Entry/Exit control”**

- **Reader** – de läsare som kan anslutas till centralapparaten anges.

- <span class="trik-term"><span class="trik-term-app"><strong>Enabled</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>En</strong><span class="trik-term-note">)</span></span></span> – låter läsaren styra PGM-utgången.

- **Code** – när den är påslagen kan du utföra en åtgärd (aktivera PGM-utgången eller styra centralapparaten) med användarkoden.

- **PGM –** ange den PGM-utgång som läsaren ska styra. PGM-utgången måste vara inställd på läget **Remote control**.

- **PGM mode –** ange hur PGM-utgången utlöses (**Pulse** eller **Level**).

- **Area action -** ange hur centralapparatens skyddsläge ändras när en iButton-nyckel eller ett RFID-kort hålls mot läsaren.

**Inställningsgruppen ”Paradox keypad control”**

- **Utility key** – om du håller in funktionstangenterna (utility keys) i 3 sekunder utlöses PGM-utgången. PGM-utgången aktiveras under pulstiden (om driftläget är **Pulse**) eller så ändras nivån på PGM-utgångens signal (om driftläget är **Level**).

**Schedulers**

=== "Protegus app"

    Öppna **PGM → Schedulers**. Tryck på ett schemas tid för att ändra den, på dess omkopplare för att slå på det och på dess pil för att välja dagar. Startdagarna och stoppdagarna väljs separat.

    ![Protegus-appen, PGM, Schedulers: första schemat 19:00 till 23:00, på, mån till sön; de övriga synliga scheman 00:00 till 00:00, av, dagar None.](./protegus-app/sp3-output-schedulers-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”Scheduler”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret PGM, fliken Scheduler. Varje schema har fälten Enable, Start time och Stop time med separata rutor för måndag till söndag. De synliga tiderna är 00:00 och rutorna är omarkerade." src="./image87.webp" style="width:7.086614173228346in;height:2.1141732283464565in" />

- **ID** – schemats nummer i listan.

- **Enable** – aktivera schemat.

- **Start time** – ange den tid då OUT ska slås på (schemats starttid).

- **Stop time** – ange den tid då OUT ska stängas av (schemats sluttid).
- **Mon – Sun** – du kan markera de veckodagar då OUT ska slås på/av.

**Thermostats**

=== "Protegus app"

    Öppna **PGM → Thermostats** och tryck sedan på en termostat.

    ![Protegus-appen, PGM, Thermostats: Heating - SP3 8 I/O, Living room - Heat - Temperature 21.50; tre rader None.](./protegus-app/sp3-thermostats-phone.webp){ .trik-mob-img }


    En termostats övriga inställningar visas när **Active** är påslagen.

=== "TrikdisConfig"

    **Fliken ”Thermostat”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret PGM, fliken Thermostat. Tabellen visar ID, PGM No., Action, Active, Sensor No. och Temperature. De synliga termostaterna har PGM No. N/A, Action Heat, inga aktiva givare och Temperature 0." src="./image88.webp" style="width:7.086614173228346in;height:3.4173228346456694in" />

- **ID** – termostatens nummer i listan.

- <span class="trik-term"><span class="trik-term-app"><strong>Assigned output</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>PGM No.</strong><span class="trik-term-note">)</span></span></span> – ange numret på den PGM-utgång som termostaten ska styra.

- **Action** – ange termostatens driftläge: värme eller kyla.

- **Active** – när den är påslagen arbetar termostaten med den valda temperaturgivaren enligt den inställda temperaturen.

- <span class="trik-term"><span class="trik-term-app"><strong>Assigned sensor</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Sensor No</strong><span class="trik-term-note">)</span></span></span> – tilldela termostaten en temperaturgivare.

- **Temperature –** ange den temperatur som termostaten ska hålla.

**Fliken ”SMS & Call reporting”** *Finns bara i TrikdisConfig.*

<img alt="TrikdisConfig, fönstret PGM, fliken SMS & Call reporting. PGM 1 Event, PGM 1 Restore och följande utgångshändelser har rutorna SMS och Call för User 1; de synliga rutorna är omarkerade." src="./image89.webp" style="width:7.086614173228346in;height:2.1023622047244093in" />

**Den här fliken visas bara om det finns minst ett användartelefonnummer i fönstret** ***[”Users & Reporting”](#Users_window)*.** Dessa inställningar kan bara göras för de första 8 användarna.

- **PGM** – visar utgångens OUT-nummer och typen av händelse när den slås på/av (”Event” – händelsen att utgången OUT slås på och ”Restore” – händelsen att utgången OUT stängs av).

- **User / SMS and Call** – välj vilka användare som ska informeras via SMS och/eller telefonsamtal när utgången OUT slås på/av.

### Fönstret ”Sensors” <span id="59-sensors-window"></span>

**Sensors**

=== "Protegus app"

    Öppna **Sensors**. **Sensor type** finns överst; tryck på en givare i listan för att ställa in den.

    ![Protegus-appen, Sensors: Sensor type Dallas 1-Wire; 1 Living room, Sensor on 1W input; givare 2 till 8 Disabled.](./protegus-app/sp3-sensors-phone.webp){ .trik-mob-img }

    ![Protegus-appen, Sensor: Name Living room, Module type Sensor on 1W input, Serial No. 28FF6A1B3C160452, Max. temp. 30, Send event when max reached av, Min. temp. 5, Send event when min reached av, Delay 0 min.](./protegus-app/sp3-sensor-phone.webp){ .trik-mob-img }


    **Delay** kräver firmware 1.15 eller senare.

=== "TrikdisConfig"

    <img alt="TrikdisConfig, fönstret Sensors. Givartabellen innehåller Module type, Serial No., Sensor name, Max, Min, High, Low och Delay. Den öppna menyn Sensor type erbjuder Dallas 1-Wire och Humidity & Temperature (AM23xx series)." src="./image90.webp" style="width:7.086614173228346in;height:2.8622047244094486in" />

- **ID** – temperaturgivarens nummer i listan.

- **Module type** – välj en temperaturgivare som ska tilldelas ID:t.

- **Serial No.** – serienumret för den temperaturgivare som är ansluten till centralapparaten.

- <span class="trik-term"><span class="trik-term-app"><strong>Name</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Sensor name</strong><span class="trik-term-note">)</span></span></span> – ge temperaturgivaren ett namn.

- <span class="trik-term"><span class="trik-term-app"><strong>Max. temp.</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Max</strong><span class="trik-term-note">)</span></span></span> – när det uppmätta värdet (temperatur, luftfuktighet eller spänning) är högre än den här inställningen genereras en händelserapport. För att ett händelsemeddelande ska genereras måste <span class="trik-term"><span class="trik-term-app"><strong>Send event when max reached</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>High</strong><span class="trik-term-note">)</span></span></span> vara påslagen.

- <span class="trik-term"><span class="trik-term-app"><strong>Min. temp.</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Min</strong><span class="trik-term-note">)</span></span></span> – när det uppmätta värdet är lägre än den här inställningen genereras en händelserapport. För att ett händelsemeddelande ska genereras måste <span class="trik-term"><span class="trik-term-app"><strong>Send event when min reached</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Low</strong><span class="trik-term-note">)</span></span></span> vara påslagen.

- <span class="trik-term"><span class="trik-term-app"><strong>Delay</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Delay, min</strong><span class="trik-term-note">)</span></span></span> – en händelse skickas om det värde (Max eller Min) som givaren mäter överskrids inom den inställda tiden. Fördröjningen anges i minuter.

- **Sensor type** – välj typ av ansluten temperaturgivare (Dallas 1Wire – upp till 8 temperaturgivare av den här typen kan anslutas. Om Dallas-givare väljs länkas de automatiskt; <span class="trik-term"><span class="trik-term-app"><strong>Humidity and temperature (AM23xx series)</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Humidity & Temperature</strong><span class="trik-term-note">)</span></span></span> – en temperatur- och fuktgivare AM2301 kan anslutas. Om givaren Humidity & Temperature ska användas måste den tilldelas manuellt i **Module type**).

### Fönstret ”System events” <span id="510-system-events-window"></span>

**Events**

=== "Protegus app"

    Öppna **System events**. Omkopplaren på en händelses rad slår på den; tryck på pilen för att öppna **Report to CMS**, **Report to cloud** och **CID code**.

    ![Protegus-appen, System events, de första händelserna: Low battery CID code 302, Periodic test 602, Arm/Disarm 401, RS485 fault 333, High temperature 158, Low temperature 159, Temperature sensor lost 380, GSM jamming 344, AC fault 301, Partial ARM 456, alla påslagna.](./protegus-app/sp3-events-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    **Fliken ”Events”**
    {: .trik-tab-title }

    <img alt="TrikdisConfig, fönstret System events, fliken Events. Tabellen listar Event name, Enable, CMS, Prot., CID Code, SMS event text och SMS restore text. De synliga händelserna är bland annat Low Battery, Periodic test, Arm/Disarm, RS485 fault, High temperature och Low temperature." src="./image91.webp" style="width:7.086614173228346in;height:2.468503937007874in" />

- **ID** – händelsens nummer i listan.

- **Event name** – händelsens namn.

- **Enable** – aktivera igenkänning av händelsen och skapande av rapporter.

- <span class="trik-term"><span class="trik-term-app"><strong>Report to CMS / Report to cloud</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>CMS / Prot.</strong><span class="trik-term-note">)</span></span></span> – rapporter om valda händelser skickas till larmcentralen och/eller till Protegus Cloud.

- <span class="trik-term"><span class="trik-term-app"><strong>CID code</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>CID Code</strong><span class="trik-term-note">)</span></span></span> – händelsens Contact ID-kod.

- **SMS event text** – texten i händelsens SMS. *Finns bara i TrikdisConfig.*

- **SMS restore text** – texten i SMS:et när händelsen återställs. *Finns bara i TrikdisConfig.*

**Fliken ”SMS & Call reporting”** *Finns bara i TrikdisConfig.*

<img alt="TrikdisConfig, fönstret System events, fliken SMS & Call reporting. Raderna Event och Restore, bland annat Battery low och Battery restore, har rutorna SMS och Call för User 1; de synliga rutorna är omarkerade." src="./image92.webp" style="width:7.086614173228346in;height:2.4606299212598426in" />

Den här fliken visas bara om det finns minst ett användartelefonnummer i fönstret [”*Users & Reporting*”](#Users_window)*.*

- **ID** – händelsens nummer och ord som anger typen (*Event*, *Restore*).

- **Event SMS text** – texten som används i händelse-SMS.

- **User / SMS and Call** – välj hur användarna ska informeras om varje händelse: via SMS och/eller telefonsamtal.

### Fönstret ”Events log” <span id="511-events-log-window"></span>

**Events log**

=== "Protegus app"

    Öppna **Events log** och tryck på **Read log**. Den senaste händelsen står överst, med kod och tid. Om centralapparaten inte använder den förvalda administratörskoden ber appen om den. **Clear log** visas bara för användare som får ändra inställningarna.

    ![Protegus-appen, Events log: knapparna Read log och Clear log; händelserna 8 till 1, nyaste först: System 1 disarmed. User No.1 vid 2026-10-07 07:40:55, Periodic test, Input restore. IN3, Alarm in input IN3, System 1 armed. User No.1, AC restore, AC fault och System 1 disarmed. User No.2 vid 2026-10-06 07:45:12.](./protegus-app/sp3-eventlog-phone.webp){ .trik-mob-img }

=== "TrikdisConfig"

    <img alt="TrikdisConfig, fönstret Events Log. Knapparna Read Log och Clear Log finns ovanför en tabell med kolumnerna Event No., Time, CID och Event definition. De synliga posterna är bland annat WiFi trouble, AC fault, SIM trouble och sektionslarm." src="./image93.webp" style="width:7.086614173228346in;height:2.645669291338583in" />

- Knappen <span class="trik-term"><span class="trik-term-app"><strong>Read log</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Read Log</strong><span class="trik-term-note">)</span></span></span> – kommando för att läsa händelseloggen från enhetens minne.

- <span class="trik-term"><span class="trik-term-app"><strong>Clear log</strong></span><span class="trik-term-tc"><span class="trik-term-note"> (i TrikdisConfig: </span><strong>Clear Log</strong><span class="trik-term-note">)</span></span></span> – kommando för att radera posterna i händelseloggen från enhetens minne.

- Varje post visar sitt nummer, händelsen, dess kod och tiden. Händelseloggen kan visa upp till 1 000 händelser som lagras i minnet i FLEXi SP3.

### Återställa förvalen

För att återställa centralapparatens förval klickar du på knappen **Restore** i TrikdisConfig.

<img alt="TrikdisConfig, området Default settings med knappen Restore markerad. Fältet IMEI/Unique ID och enhetens statusfält syns; enhetsspecifika identifierare är utelämnade." src="./image94.webp" style="width:7.086614173228346in;height:1.1023622047244095in" />

### Fjärrkonfigurering

!!! warning "Viktigt"
    Fjärrkonfigurering fungerar bara om:

    1.  Det isatta SIM-kortet är aktiverat och PIN-koden är angiven eller avstängd, eller enheten är ansluten till ett WiFi-nätverk;

    2.  ”Protegus cloud” är aktiverad. Hur du aktiverar molntjänsten beskrivs i avsnitt 5.4, fönstret ”Users & Reporting”;

    3.  Matningen är ansluten (lysdioden ”**PWR**” blinkar grönt);

    4.  Enheten är registrerad i nätverket (lysdioden ”**NET**” måste lysa fast grönt vid anslutning till mobilnätet och/eller lysdioden ”**MOD**” måste lysa fast grönt vid anslutning till WiFi-nätverket).
1.  Starta konfigurationsprogrammet TrikdisConfig.

2.  I avsnittet ”**Remote access**” anger du centralapparatens nummer ”**IMEI/Unique ID**”. Numret finns på enheten och på etiketten på förpackningen.

<img alt="TrikdisConfig, avsnittet Remote access. Fältet Unique ID och knappen Configure är markerade för anslutning till en centralapparat." src="./image72.webp" style="width:7.086614173228346in;height:2.141732283464567in" />

3. (Valfritt) Ange önskat namn för FLEXi SP3 med det här Unique ID i fältet ”**System name**”.

2.  Klicka på ”**Configure**”.

3.  Klicka på **Read [F4]** i det nya fönstret som öppnas. Ange administratörs- eller installatörskoden om det behövs*.* Markera ”**Remember password**” för att spara lösenordet.

4.  Gör de inställningar som behövs och klicka på **Write [F5]** när du är klar.

### Testa centralapparatens funktion

När konfigureringen och installationen är klar gör du en systemkontroll:

1\. Skapa en händelse:

\- genom att tillkoppla/frånkoppla systemet med centralapparatens knappsats;

\- genom att utlösa ett sektionslarm när säkerhetssystemet är tillkopplat.

2\. Kontrollera att händelsen kommer fram till larmcentralen (CMS, Central Monitoring Station) och/eller tas emot i appen Protegus2.

3\. För att testa centralapparatens utgångar aktiverar du dem på distans och kontrollerar att de fungerar.

4\. Om säkerhetssystemet ska fjärrstyras tillkopplar och frånkopplar du säkerhetssystemet på distans med appen Protegus2.

### Uppdatera firmware

!!! note "Obs!"
    När FLEXi SP3 har anslutits till TrikdisConfig erbjuder programmet automatiskt att uppdatera firmware om det finns några uppdateringar. En internetanslutning behövs för den här funktionen. Om antivirusprogram är installerat på datorn kan det blockera den automatiska firmwareuppdateringen. Du måste då ändra inställningarna i antivirusprogrammet.
Firmware i FLEXi SP3 kan också uppdateras eller bytas manuellt. Alla tidigare inställningar i FLEXi SP3 ligger kvar oförändrade efter en uppdatering. Om firmware installeras manuellt kan den bytas till en nyare eller en äldre version.

Gör så här:

1.  Starta ***TrikdisConfig**.*

2.  Anslut FLEXi SP3 till en dator med en USB Mini-B-kabel (kretskort SP3_8xx: USB Type-C) eller anslut till FLEXi SP3 på distans. Om en nyare firmwareversion finns erbjuder programmet automatiskt att installera den.

3.  Öppna TrikdisConfig-fönstret **Firmware**.

<img alt="TrikdisConfig, fönstret Firmware: fältet Open firmware file är tomt, med knappen Open firmware och en inaktiverad knapp Update (F12). Förloppsindikatorn visar 0 %." src="./image95.webp" style="width:7.086614173228346in;height:2.940944881889764in" />

4. Klicka på knappen **Open firmware** och välj den firmwarefil som behövs.

2.  Klicka på knappen **Update [F12]**.

3.  Vänta tills uppdateringarna är klara.

När konfigureringen är klar klickar du på knappen **Write [F5]** och kopplar bort USB-kabeln.

## Garanti och ansvarsbegränsning

Centralapparaten har 24 månaders garanti från och med försäljningsdatum. Under garantiperioden garanteras kostnadsfri reparation av fel som orsakats av tillverkaren.

Garantin gäller om centralapparaten har installerats av behörig personal enligt anvisningarna i det här dokumentet och gällande föreskrifter för installation av elektrisk utrustning, och har använts enligt anvisningarna i det här dokumentet och gällande föreskrifter för säker användning av elektrisk utrustning.

Centralapparaten ska lämnas in för reparation i tillverkarens förpackning tillsammans med en felrapport som anger felets art.

När garantin har gått ut utförs centralapparatens tekniska underhåll och reparationer på köparens bekostnad.

Garantin kan upphöra i förtid om:

- Obehörig personal har reparerat eller försökt reparera centralapparaten;

- Centralapparaten har använts för något annat än sitt avsedda ändamål;

- Centralapparaten har förvarats och/eller installerats i olämpliga lokaler med oförenliga klimatförhållanden eller aggressiv kemisk miljö;

- Centralapparaten har gått sönder mekaniskt och/eller skadats avsiktligt;

- Centralapparaten har skadats av omständigheter som utgör *force majeure* (blixtnedslag m.m.).

Tillverkaren ansvarar inte för:

- fel på centralapparaten om den har installerats eller använts på annat sätt än enligt manualen.

- fel på centralapparaten om orsaken är fel på eller förlust av anslutningen via GSM/GPRS/internet eller fel i operatörens nät.

- begränsningar i eller avbrott av tjänster för GSM/GPRS/internet-anslutning till centralapparatens köpare eller användare, och ersätter inte köparen eller användaren för skador på egendom eller andra skador som uppstår på grund av detta.

- begränsningar i eller avbrott av elförsörjningen till centralapparatens köpare eller användare, och ersätter inte köparen eller användaren för skador på egendom eller andra skador som uppstår på grund av detta.

- rån, brand i lokalen eller andra förluster som köparen eller användaren av centralapparaten drabbas av, och ersätter inte köparen eller användaren för skador på egendom eller andra skador som uppstår på grund av dessa händelser.

## Säkerhetsföreskrifter

Läs den här manualen noggrant innan du använder centralapparaten.

Centralapparaten FLEXi SP3 är en elektrisk enhet, vilket betyder att den får installeras och servas endast av behörig personal enligt anvisningarna i det här dokumentet och gällande föreskrifter för installation av elektrisk utrustning.

Matningen till centralapparaten måste vara avstängd under installationen!

Centralapparaten måste installeras på en plats med begränsad åtkomst inne i lokalen och på säkert avstånd från känslig elektronisk utrustning. Centralapparaten tål inte vibrationer, andra mekaniska påverkningar, fukt och aggressiv kemisk miljö. Centralapparaten uppfyller kraven för miljöklass II enligt standarden EN 50131.

!!! warning "Varning"

    Kapslingar, transformatorer, batterier och programmeringsutrustning som används måste uppfylla säkerhetskraven i standarden EN 60950.
    
    Enheten matas från ett 230 V-nät med frekvensen 50 Hz via en nedtransformator i klass II som sänker spänningen till 16–18 V, eller från en 16–24 V DC-matning. Ett 12 V-batteri med en kapacitet på minst 7 Ah används som reservmatning. Strömförbrukningen beror på effekten hos de anslutna externa enheterna.
    
    En tvåpolig automatsäkring måste installeras i matningskretsen som skydd. Avståndet mellan brytarens öppna kontakter måste vara minst 3 mm. Säkerhetsbrytaren måste placeras på en plats som är känd för de specialister som servar centralapparaten.
    
    För att koppla bort centralapparaten från elnätet:
    
    - från växelströmsnätet – slå av automatsäkringen;
    
    - från batteriet – koppla bort polerna.
