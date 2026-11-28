# Ethernet-larmsändare E16

<div style="text-align: center;">
  <img src="./image1.webp" alt="Foto av framsidan på Ethernet-larmsändaren TRIKDIS E16. Lysdiodsindikeringarna är NETWORK, DATA, POWER och TROUBLE; plintarna är +DC, -DC, CLK, DATA, I/O 1, I/O 2, I/O 3, COM, A RS485 och B RS485. På märkningen för matning står 10–18 VDC, 0.25 A Max." width="400">
</div>


## Beskrivning

Ethernet-larmsändaren E16 kan anslutas direkt till centralapparater från DSC, Paradox, UTC Interlogix (CADDX), Innerrange, Texecom, Honeywell, Crow och Pyronix som stöds.

Larmsändaren överför fullständig händelseinformation till larmcentralen (CMS, Central Monitoring Station).

Larmsändaren fungerar också med appen Protegus2. Med Protegus2 kan användarna styra sitt larmsystem på distans och få aviseringar om händelser i larmsystemet. Appen Protegus2 fungerar med alla centralapparater från olika tillverkare som stöds av larmsändaren E16. Larmsändaren kan skicka händelseaviseringar till larmcentralen och arbeta med Protegus2 samtidigt.

För centralapparater från andra tillverkare används larmsändaren E16T.

### Funktioner

Skickar händelser till larmcentralens mottagare:

- Skickar händelser till TRIKDIS programvaru- eller maskinvarumottagare som fungerar med all programvara för larmcentraler.

- Kan skicka händelsemeddelanden till SIA DC-09-mottagare.

- Kan skicka händelsemeddelanden till SUR-GARD-mottagare. Bilagan innehåller en tabell för omvandling av Contact ID-koder till SIA-koder.

- Övervakning av anslutningen genom att en PING-förfrågan skickas till IP-mottagaren var 30:e sekund (eller med en period som användaren anger).

- Backupkanal som används om anslutningen via primärkanalen bryts.

- Med parallella kommunikationskanaler kan händelser skickas till två mottagare samtidigt.

- När tjänsten Protegus är aktiverad levereras händelserna först till larmcentralen och skickas därefter till appens användare.

**Fungerar med appen Protegus2:**

- ”*Push*”-aviseringar och särskilda ljud som informerar om händelser.

- Fjärrstyrd tillkoppling/frånkoppling av systemet.

- Fjärrstyrning av anslutna enheter (belysning, portar, ventilationssystem, värme, bevattning m.m.).


- Fjärrövervakning av temperatur (med utbyggnadsmodulerna iO eller iO-WL).

- Olika användarrättigheter för administratör och installatör.

**Meddelar användare:**

- Användarna kan få aviseringar om händelser via appen Protegus2.

**Styrbara utgångar och ingångar:**

- 3 plintar med dubbel funktion som kan ställas in antingen som ingång (IN) eller som styrbar utgång (OUT).

- Utgångarna styrs med appen Protegus2.

- Lägg till fler ingångar och styrbara utgångar med trådbundna och trådlösa utbyggnadsmoduler iO.

**Snabb installation:**

- Inställningarna kan sparas i en fil och snabbt skrivas till andra larmsändare.

- Två behörighetsnivåer för konfigurering av enheten: för larmcentralens administratör och för installatören.

- Fjärrkonfigurering och firmwareuppdateringar.

### Lista över kompatibla centralapparater

| Tillverkare | Modell |
|--------------|-------|
| DSC® | <u>PC585</u>, PC1404, <u>PC1565</u>, <u>PC1616</u>, <u>PC1832</u>, <u>PC1864</u>, PC5020 |
| PARADOX® | <u>SPECTRA SP4000</u>, <u>SP5500</u>, <u>SP6000</u>, <u>SP7000</u>, <u>SP65</u>, <u>SP5500+</u>, <u>SP6000+</u>, <u>SP7000+</u> |
| PARADOX® | <u>MAGELLAN MG5000</u>, <u>MG5050</u>, MG5050E, <u>MG5050+</u> |
| PARADOX® | <u>DIGIPLEX EVO192</u>, <u>EVOHD</u>, NE96, EVO48, EVO96 |
| PARADOX® | SPECTRA 1727, 1728, 1738 |
| PARADOX® | ESPRIT E55, 728ULT, 738ULT |
| UTC Interlogix® | <u>NetworX (Caddx) NX-4v2</u>, <u>NX-6v2</u>, <u>NX-8v2</u>, <u>NX-8E</u> |
| Texecom® | Premier 412, 816, 832, 832+ / <u>Premier 24</u>, <u>48</u>, <u>88</u>, <u>168</u> / <u>Premier Elite 12</u>, <u>24</u>, <u>48</u>, <u>64</u>, <u>88</u>, <u>168</u> |
| Pyronix® | MATRIX 424, MATRIX 832, MATRIX 832+, MATRIX 6, MATRIX 816 |
| Innerrange® | Inception, Integriti |
| Honeywell® | <u>Ademco Vista-15</u>, <u>Ademco Vista-20</u>, <u>Ademco Vista-48</u> |
| Crow® | Runner 4/8, Runner 8/16 |

**<u>Understruket</u>** - centralapparater som E16 styr direkt. Firmware i PARADOX-centralapparater som styrs direkt måste vara V.4 eller senare.

\* Anslut centralapparater från andra tillverkare till larmsändaren E16T.

### Specifikationer

| Parameter | Beskrivning |
|-----------|-------------|
| Plintar med dubbel funktion [IN/OUT] | 3, kan ställas in antingen som ingångar av typen NC, NO, NC/EOL, NO/EOL, NC/DEOL eller NO/DEOL (2,2 kΩ) eller som utgångar av typen öppen kollektor (OC) med en ström på upp till 0,15 A, max 30 V DC. Kan utökas med utbyggnadsmoduler i serien iO. |
| Matningsspänning | 10–18 V DC |
| Strömförbrukning | 100 mA (i viloläge) Upp till 250 mA (vid dataöverföring) |
| Ethernetanslutning | IEEE802.3, 10 Base-T, RJ45-uttag |
| Överföringsprotokoll | TRK, DC-09_2007, DC-09_2012, TL150 |
| Meddelandekryptering | AES 128 |
| Minne | Upp till 60 meddelanden |
| Ändring av inställningar | Med datorprogrammet TrikdisConfig, på distans eller lokalt via USB Mini-B-porten |
| Driftmiljö | Temperatur från -10 °C till 50 °C, relativ luftfuktighet upp till 80 % vid +20 °C |
| Larmsändarens mått | 88 × 62 × 26 mm |
| Vikt | 80 g |

### Larmsändarens delar

1.  Lysdiodsindikeringar.

2.  Spår för att öppna kapslingens framsida.

3.  Plintblock för externa anslutningar.

4.  USB Mini-B-port för programmering av larmsändaren.

5.  RJ45-uttag för Ethernetanslutning.

<img alt="Larmsändaren E16, framsidan till vänster och den öppnade baksidan till höger. Till vänster: 1 lysdiodsindikeringar, 2 spår för att öppna kapslingens framsida. Till höger: 3 plintblock för externa anslutningar, 4 USB Mini-B-port för programmering av larmsändaren, 5 RJ45-uttag för Ethernetanslutning." src="./image4.webp" style="width:4.750009842519685in;height:2.853338801399825in" />

### Plintarnas funktion

| Plint | Beskrivning |
|----------|-------------|
| +DC | Matning +10 V/+18 V |
| -DC | Matning 0 V |
| CLK | Plintar för seriell buss, för direkt anslutning till centralapparaten |
| I/O 1 | Första ingångs-/utgångsplinten |
| I/O 2 | Andra ingångs-/utgångsplinten |
| I/O 3 | Tredje ingångs-/utgångsplinten |
| COM | Gemensam plint (minus) |
| A RS485 | Kontakt A på RS485-bussen |
| B RS485 | Kontakt B på RS485-bussen |

### Lysdiodsindikering vid drift

| Indikator | Lysdiodens läge | Beskrivning |
|-----------|--------------|-------------|
| NETWORK | Släckt | Ingen anslutning till datornätverk |
| NETWORK | Fast grönt sken | Larmsändaren är ansluten till ett datornätverk |
| DATA | Släckt | Inga osända händelser |
| DATA | Fast grönt sken | Osända händelser finns lagrade i bufferten |
| DATA | Blinkar grönt | (Konfigurationsläge) Data överförs till/från larmsändaren |
| POWER | Släckt | Matningen är avstängd eller bortkopplad |
| POWER | Fast grönt sken | Matningen är på med tillräcklig spänning |
| POWER | Fast gult sken | Matningsspänningen är otillräcklig (≤11,5 V) |
| POWER | Fast grönt sken och gult blinkande | (Konfigurationsläge) Larmsändaren är klar för konfigurering |
| POWER | Fast gult sken | (Konfigurationsläge) Ingen anslutning till datorn |
| TROUBLE | Släckt | Inga driftproblem |
| TROUBLE | 1 röd blinkning | Anslutningsfel på den fysiska nivån (PHY Link status error), kontrollera LAN-kabeln |
| TROUBLE | 2 röda blinkningar | DHCP-fel |
| TROUBLE | 3 röda blinkningar | DNS-fel |
| TROUBLE | 6 röda blinkningar | Ingen anslutning till mottagaren |
| TROUBLE | 7 röda blinkningar | Förlorad anslutning till centralapparaten |
| TROUBLE | Blinkar rött | (Konfigurationsläge) Minnesfel |
| TROUBLE | Fast rött sken | (Konfigurationsläge) Firmware är skadad |

### Principschema för användning av larmsändaren *E16*

<img alt="Blockschema: centralapparat till Ethernet-larmsändaren E16 till router till internet. Från internet går en väg till Protegus-servern och vidare till en telefon med Protegus; en annan går till en mottagare och vidare till övervakningsprogrammet på larmbolagets larmcentral." src="./image5.webp" style="width:7.0875in;height:2.975in" />

!!! note "Obs!"
    Innan du börjar, se till att du har följande:
    
    1.  USB-kabel (Mini-B) för konfigurering.
    
    2.  Minst 4-ledarkabel för att ansluta larmsändaren till centralapparaten.
    
    3.  CRP2.4-kabel för anslutning till Paradox-centralapparatens seriella port.
    
    4.  Spårskruvmejsel 2,5 mm.
    
    5.  Installationsmanualen för den aktuella centralapparaten.
    
    Beställ nödvändiga komponenter separat från din lokala distributör.
## Snabbkonfiguration med programmet *TrikdisConfig* 

1.  Ladda ned konfigurationsprogrammet **TrikdisConfig** från [www.trikdis.com](http://www.trikdis.com) (skriv ”TrikdisConfig” i sökfältet) och installera det.

2.  Öppna E16:s kapsling med en spårskruvmejsel enligt bilden nedan:

    <img alt="Två teckningar visar en spårskruvmejsel som sätts in i spåret för att öppna kapslingen på E16 och sedan förs nedåt för att lossa frontlocket. En separat detaljbild anger USB Mini-B-kontakten." src="./image6.webp" style="width:6.876680883639545in;height:1.850003280839895in" />

3.  Anslut E16 till datorn med en USB Mini-B-kabel.

4.  Starta TrikdisConfig. Programmet identifierar automatiskt den anslutna larmsändaren och öppnar ett fönster för konfigurering.

5.  Klicka på **Read [F4]** för att läsa larmsändarens inställningar. Om du uppmanas, ange administratörs- eller installatörskoden (6 siffror) i dialogrutan.

Nedan beskrivs vilka inställningar som behövs för att larmsändaren ska börja skicka händelser till larmcentralen (CMS, Central Monitoring Station) och för att säkerhetssystemet ska kunna styras med appen Protegus2.

### Inställningar för anslutning till appen Protegus2 

**I fönstret ”System settings”:**

<img alt="TrikdisConfig, fönstret System settings. Markering 1 anger Security panel model inställd på 4. PARADOX SP4000, S; markering 2 anger kryssrutan Remote Arm/Disarm markerad; markering 3 anger Security panel PC download password inställt på 4477." src="./image7.webp" style="width:7.086614173228346in;height:1.763779527559055in" />

1.  Välj den **Security panel model** som ska anslutas till larmsändaren.

2.  Markera **Remote Arm/Disarm** om användarna ska kunna styra centralapparaten i appen Protegus2 med sin knappsatskod. Inställningen visas bara för centralapparater som styrs direkt.

3.  För direktstyrning av Paradox- och Texecom-centralapparater anger du **Security panel** **PC download password**. Det måste stämma överens med lösenordet som är angivet i centralapparaten.

!!! note "Obs!"
    För att direktstyrningen av centralapparaten ska fungera måste du ändra
    centralapparatens inställningar. Hur du gör beskrivs i avsnitt **4 ”Programmering av
    centralapparaten”**. I det avsnittet finns information om hur du
    ändrar **Security panel PC download/UDL password**.
**I fönstret ”User reporting”, fliken ”PROTEGUS Cloud”:**

<img alt="TrikdisConfig, fönstret User reporting, fliken PROTEGUS Cloud. Markeringarna anger kryssrutan Enable connection markerad och fältet PROTEGUS Cloud access Code, som är maskerat." src="./image8.webp" style="width:7.082677165354331in;height:1.7677165354330708in" />

4. Markera kryssrutan **Enable connection** till Protegus Cloud.

2.  Ändra **Protegus Cloud access Code** för inloggning i Protegus2 om användarna ska uppmanas att ange den när de lägger till systemet i appen Protegus2 (förvalt lösenord – 123456).

När konfigureringen är klar klickar du på knappen **Write [F5]** och kopplar bort USB-kabeln.

!!! note "Obs!"
    En beskrivning av alla övriga inställningar för E16 i
    TrikdisConfig finns i avsnitt **6 ”Beskrivning av fönstren i TrikdisConfig”**.
### Inställningar för anslutning till larmcentralen 

**I fönstret ”System settings”:**

<img alt="TrikdisConfig, fönstret System settings. Markering 1 anger Object ID inställt på 1122; markering 2 anger Security panel model inställd på 4. PARADOX SP4000, S." src="./image9.webp" style="width:7.086614173228346in;height:1.763779527559055in" />

1.  Ange numret i **Object ID** (abonnentkod) som du har fått från larmcentralen (4 tecken, 0–9, A–F. **Använd inte FFFE, FFFF som Object ID.**).

2.  Välj den **Security panel model** som ska anslutas till larmsändaren.

**I fönstret ”CMS reporting”, inställningar för ”Primary channel”:**

<img alt="TrikdisConfig, fönstret CMS reporting. Primary channel: Communication type IP, Protocol TRK, maskerad TRK encryption key, Domain or IP 155.14.178.152, Port 55448, TCP or UDP inställd på TCP. Primary channel Backup: IP, TRK, maskerad nyckel, Domain or IP 160.12.15.180, Port 44558, TCP. Parallel channel: Communication type är Disable." src="./image10.webp" style="width:7.082677165354331in;height:3.5393700787401574in" />

3. **Communication type** - välj anslutningsmetoden **IP**.

2.  **Protocol** - välj protokolltyp för händelsemeddelandena: **TRK** (till TRIKDIS-mottagare), **DC-09_2007** eller **DC-09_2012** (till universella mottagare), **TL150** (till SUR-GARD-mottagare).

3.  **TRK encryption key** - ange den krypteringsnyckel som är inställd i mottagaren.

4.  **Domain or IP** - ange mottagarens domän eller IP-adress.

5.  **Port** - ange mottagarens nätverksportnummer.

6.  **TCP or UDP** - välj det överföringsprotokoll (**TCP** eller **UDP**) som händelserna ska skickas med.

!!! note "Obs!"
    Om du har valt protokollet **DC-09** anger du dessutom objekt-, linje-
    och mottagarnummer på fliken **Settings** i fönstret **CMS reporting**.
7. (Rekommenderas) Konfigurera inställningarna för **Primary channel Backup**.

2.  (Rekommenderas) Konfigurera **Parallel Channel** och dess **Parallel Channel** **Backup**.

När konfigureringen är klar klickar du på **Write [F5]** och kopplar bort USB-kabeln.

!!! note "Obs!"
    En beskrivning av alla övriga inställningar för E16 i
    TrikdisConfig finns i avsnitt **6 ”Beskrivning av fönstren i TrikdisConfig”**.
## Installation och inkoppling

### Kopplingsscheman för inkoppling av larmsändaren till en centralapparat

Anslut larmsändaren till centralapparaten enligt något av kopplingsschemana nedan.

#### DSC

<img class="wiring-diagram" alt="Kopplingsschema: DSC-centralapparatens knappsatsbuss till E16. RED (+12V) till +DC, BLK till -DC, YEL till CLK, GRN till DATA." src="./wiring-dsc.webp" width="546" height="481" />

!!! note "Obs!"
    Enbart med knappsatsbussen får larmsändaren sektionernas allmänna tillstånd från centralapparaten och kan inte avgöra sektionstypen (brand, inbrott, vattenläckage osv.). Alla larm rapporteras som ett allmänt larm, Contact ID E130, och en del larmcentraler hanterar dessa händelser på ett annat sätt än den sektionstyp som faktiskt löstes ut. E16 har inga TIP/RING-plintar. För att rapportera händelser med centralapparatens egna Contact ID-koder (till exempel E110 för brandlarm), använd en larmsändare som ansluts både till knappsatsbussen och till centralapparatens TIP/RING-plintar: GT, GT+ eller GET.

#### PARADOX

<img class="wiring-diagram" alt="Kopplingsschema: PARADOX-centralapparatens seriella port till E16 via kabeln EX-CRP2.4 (beställs separat). R (röd, +12V) till +DC, B (svart) till -DC, Y (gul) till CLK, G (grön) till DATA." src="./wiring-paradox.webp" width="650" height="456" />

#### CADDX

<img class="wiring-diagram" alt="Kopplingsschema: CADDX-centralapparatens knappsatsbuss till E16. POS (+12V) till +DC, COM till -DC, DATA till DATA; CLK används inte." src="./wiring-caddx.webp" width="547" height="481" />

#### TEXECOM

<img class="wiring-diagram" alt="Kopplingsschema: TEXECOM-centralapparatens seriella port till E16 via kabeln EX-CRP4 (beställs separat). R (röd, +12V) till +DC, B (svart) till -DC, BL (blå) till CLK, W (vit) till DATA." src="./wiring-texecom.webp" width="650" height="463" />

#### INNERRANGE INCEPTION

<img class="wiring-diagram" alt="Kopplingsschema: Inner Range Inception till E16. VOUT + (+12V) till +DC; VOUT 0V till -DC, ihopkopplad med den svarta ledaren i USB-kabeln 993030USB; kabelns gröna ledare till CLK och vita ledare till DATA." src="./wiring-innerrange-inception.webp" width="627" height="467" />

#### INNERRANGE INTEGRITI

<img class="wiring-diagram" alt="Kopplingsschema: Inner Range Integriti till E16 via kabeln INTG-996795. +DET (+13V) till +DC, Port 0 GND 5 till -DC, Rx 3 till CLK, Tx 2 till DATA." src="./wiring-innerrange-integriti.webp" width="555" height="454" />

#### Crow Runner 4/8, Runner 8/16

<img class="wiring-diagram" alt="Kopplingsschema: knappsatsbussen på centralapparaten Crow Runner 4/8 eller Runner 8/16 till E16. POS (+12V) till +DC, NEG till -DC, CLK till CLK, DATA till DATA." src="./wiring-crow-runner.webp" width="548" height="505" />

#### Pyronix

<img class="wiring-diagram" alt="Kopplingsschema: Pyronix-centralapparatens knappsatsbuss till E16. +AUX (+12V) till +DC, -AUX till -DC, KD till DATA; CLK används inte." src="./wiring-pyronix.webp" width="597" height="504" />

#### Honeywell Vista-20, Vista-48

<img class="wiring-diagram" alt="Kopplingsschema: knappsatsbussen på Honeywell Vista-20 eller Vista-48 till E16. Plint 5 (+12V) till +DC, plint 4 till -DC, plint 7 till CLK, plint 6 till DATA." src="./wiring-honeywell-vista.webp" width="564" height="474" />

### Kopplingsschema för inkoppling av larmsändaren till centralapparatens nyckelbrytarsektion

Följ detta schema om centralapparaten ska tillkopplas/frånkopplas med en PGM-utgång på E16 som slår på/av centralapparatens nyckelbrytarsektion.

!!! note "Obs!"
    E16-larmsändaren har 3 universella ingångs-/utgångsplintar som kan
    ställas in i driftläget OUT (PGM). Utgångarna (OUT) kan styra
    tre områden i säkerhetssystemet. Om du vill styra systemet på
    detta sätt avmarkerar du **Remote Arm/Disarm** i TrikdisConfig, i fönstret
    ”**System settings**”. Apparna Protegus2 måste
    konfigureras med de inställningar som beskrivs i avsnitt 5.2 ”Ytterligare
    inställningar för tillkoppling/frånkoppling av systemet med centralapparatens
    nyckelbrytarsektion”.
<img alt="Kopplingsschema: centralapparat till E16. Knappsatsbuss eller seriell port: RED (+12V) till +DC, BLK till -DC, YEL till CLK, GRN till DATA. Sektioner (nyckelbrytare): 1-st Area till I/O 1, 2-nd Area till I/O 2, 3-rd Area till I/O 3." src="./image16.webp" style="width:3.22250656167979in;height:2.720005468066492in" />

### Kopplingsscheman för anslutning av ingång

Larmsändaren har 3 universella ingångs-/utgångsplintar som kan ställas in i ingångsläget IN. Kretsar av typerna NC, NO, NO / EOL, NC / EOL, NO / DEOL och NC / DEOL kan anslutas till ingångsplinten. Förval för ingångsinställningen – NO. Ingångstypen kan ändras i TrikdisConfig i fönstret **IN/OUT -> Type.**

Anslut ingången enligt den valda ingångstypen (NO, NC, NC/EOL, NO/EOL, NO/DEOL, NC/DEOL), som i schemana nedan:

#### Normalt öppen (NO)

<img class="wiring-diagram" alt="Kopplingsschema för ingång: normalt öppen kontakt (NO) mellan COM och INx. Short - Alarm, Open - Restore." src="./wiring-input-no.webp" width="296" height="256" />

#### Normalt sluten (NC)

<img class="wiring-diagram" alt="Kopplingsschema för ingång: normalt sluten kontakt (NC) mellan COM och INx. Short - Restore, Open - Alarm." src="./wiring-input-nc.webp" width="311" height="256" />

#### Normalt sluten med slutmotstånd 2,2k (EOL 2,2k)

<img class="wiring-diagram" alt="Kopplingsschema för ingång: NC-kontakt med ett slutmotstånd på 2,2k i serie mellan COM och INx (EOL 2,2k). Short - Alarm, Open - Alarm, 2,2k - Restore." src="./wiring-input-nc-eol.webp" width="324" height="356" />

#### Normalt öppen med slutmotstånd 2,2k (EOL 2,2k)

<img class="wiring-diagram" alt="Kopplingsschema för ingång: NO-kontakt med ett slutmotstånd på 2,2k parallellt mellan COM och INx (EOL 2,2k). Short - Alarm, Open - Alarm, 2,2k - Restore." src="./wiring-input-no-eol.webp" width="315" height="430" />

#### Normalt öppen med slutmotstånd 2,2k och sabotageindikering (DEOL)

<img class="wiring-diagram" alt="Kopplingsschema för ingång med sabotageindikering (DEOL): mellan COM och INx en sabotagekontakt och ett motstånd på 2,2k i serie, därefter NO-kontakten med ett andra motstånd på 2,2k över sig. Short - Tamper, Open - Tamper, 2,2k - Alarm, 3,3k-5,5k - Restore." src="./wiring-input-no-deol.webp" width="399" height="442" />

#### Normalt sluten med slutmotstånd 2,2k och sabotageindikering (DEOL)

<img class="wiring-diagram" alt="Kopplingsschema för ingång med sabotageindikering (DEOL): mellan COM och INx en sabotagekontakt och ett motstånd på 2,2k i serie, därefter NC-kontakten med ett andra motstånd på 2,2k över sig. Short - Tamper, Open - Tamper, 2,2k - Restore, 3,3k-5,5k - Alarm." src="./wiring-input-nc-deol.webp" width="398" height="442" />

!!! note "Obs!"
    Om fler ingångar eller utgångar behöver anslutas till larmsändaren,
    anslut en trådbunden eller trådlös utbyggnadsmodul i serien TRIKDIS iO.
    Hur den ansluts beskrivs i manualen för iO och i
    avsnitt **3.6 ”Kopplingsscheman för inkoppling av utbyggnadsmoduler i serien iO”**.
### Anslut LAN-kabeln

<img alt="Teckning som visar en LAN-kabelkontakt riktad mot larmsändaren E16." src="./image18.webp" style="width:2.7975054680664915in;height:2.2525043744531934in" />

### Kopplingsscheman för anslutning av ett relä

Med reläkontakter kan du styra (slå på/av) olika elektriska apparater. Larmsändarens I/O-plint måste vara inställd på ett utgångsläge (OUT).

<img alt="Kopplingsschema: E16 till relä. Spole: +DC till ena spolplinten, I/O x till den andra. Reläets kontaktplintar är märkta NC, C och NO." src="./image19.webp" style="width:2.552505468066492in;height:0.9575021872265966in" />

### Kopplingsscheman för inkoppling av utbyggnadsmoduler i serien iO

Om fler ingångar eller utgångar behöver anslutas till larmsändaren, eller om du vill ansluta en temperaturgivare, anslut en trådbunden eller trådlös utbyggnadsmodul i serien TRIKDIS iO. Konfigureringen av de utbyggnadsmoduler som är anslutna till E16 beskrivs i avsnitt 6.7 (fönstret ”RS485 modules”).

<img alt="Kopplingsschema: centralapparat till E16, iO, iO-8 och iO-MOD. Matning (+12 V): +AUX till varje +DC; -AUX till varje -DC. RS485: E16:s A RS485 till varje A (RS485); B RS485 till varje B (RS485). Trådlöst: iO-MOD till iO-WL, upp till 300 m. Separat matning på 12–28 V DC, 0,5 A till iO-WL:s +DC och -DC. Givare DS18B20 eller DS18S20: Vdd+ till +5 V, DQ till 1-Wire, COM till COM." src="./image20.webp" style="width:7.0875in;height:3.4944444444444445in" />

### Starta larmsändaren

Starta larmsändaren genom att slå på centralapparatens matning. Lysdiodsindikeringen på E16-larmsändaren ska visa följande:

- Lysdioden ”POWER” lyser grönt när matningen är på;

- Lysdioden ”NETWORK” lyser grönt när larmsändaren är ansluten till nätverket.

!!! note "Obs!"
    Om du ser en annan lysdiodsindikering tyder det på ett visst fel.
    Felsök med hjälp av tabellen över lysdiodsindikeringar i
    avsnitt 1.6 ”Lysdiodsindikering vid drift”. / Om E16:s indikeringar
    inte lyser alls, kontrollera matningen och anslutningarna.
## Programmering av centralapparaten

Nedan beskrivs hur du programmerar centralapparaten så att larmsändaren E16 kan läsa händelser från centralapparaten och styra den på distans.

För att aktivera fjärrstyrning av centralapparaten, kontrollera att kryssrutan **Remote Arm/Disarm** är markerad i TrikdisConfig-fönstret **”System settings”.**

### DSC

DSC-centralapparater behöver inte programmeras.

### PARADOX

Paradox-centralapparater behöver programmeras bara för direktstyrning med Protegus. Du behöver inte programmera Paradox-centralapparater för att läsa händelser.

För fjärrstyrning av Paradox-centralapparater måste du ställa in ett PC download password. Lösenordet måste stämma överens med det som angavs i TrikdisConfig-fönstret **”System settings”**, när kryssrutan vid **Remote Arm/Disarm** markerades.

Så här ställer du in lösenordet, med knappsatsen ansluten till centralapparaten:

- För serierna MAGELLAN och SPECTRA: gå till cell 911 och ange ett PC download password på 4 siffror.

- För serien DIGIPLEX EVO: gå till cell 3012 och ange ett PC download password på 4 siffror.

### TEXECOM

Texecom-centralapparater måste programmeras både för att läsa händelser och för fjärrstyrning.

Du måste ställa in Texecom-centralapparatens **UDL** **passcode**. Lösenordet måste stämma överens med det som angavs i TrikdisConfig-fönstret **”System settings”,** när kryssrutan vid **Remote Arm/Disarm** markerades.

Centralapparaten kan programmeras med Texecoms programvara Wintex. Ange **UDL passcode** (4-siffrig kod) i fönstret **Communication Options**, fliken **Options**.

Du kan också programmera med en knappsats ansluten till centralapparaten:

1.  Ange installatörskoden (4 siffror) och tryck på knappen [Menu] för att gå in i programmeringsmenyn.

2.  Tryck direkt därefter på tangenten [9].

3.  Tryck på [7][6] och sedan [2]. Ange den 4-siffriga **UDL** **passcode** (**UDL passcode** måste stämma överens med E16-larmsändarens **PC login password).**

4.  Tryck på [Yes] och lämna programmeringsläget genom att trycka på [Menu].

### UTC INTERLOGIX (CADDX)

Centralapparatens version måste vara **V2** eller senare. Med knappsatsen ansluten till centralapparaten:

1.  Tryck på [\*][8] och ange installatörskoden (förval - 9713).

2.  Ange det enhetsnummer som är tilldelat den anslutna larmsändaren (förval - 0).

3.  Ställ in inställningarna nedan för varje rad. Ange i tur och ordning positionen, segmentnumret och den önskade inställningen. Om du trycker på [\*] (asterisk) kommer du tillbaka till det lokala inmatningsfältet.

| Position | Segment | Inställning |
|----------|---------|---------|
| 23 | 3 | 12345678 |
| 37 (behövs inte) | 3 | 12345678 |
| 37 (behövs inte) | 4 | 1234567* |
| 90 | 3 | 12345678 |
| 93 | 3 | 12345678 |
| 96 | 3 | 12345678 |
| 99 | 3 | 12345678 |
| 102 | 3 | 12345678 |
| 105 | 3 | 12345678 |
| 108 | 3 | 12345678 |

När alla angivna fält är programmerade, tryck två gånger på [Exit] för att lämna programmeringsläget.

### INNERRANGE

Versionen på **Innerrange Inception**-centralapparaten måste vara **2.3.0.3507-r0** eller senare.

Centralapparaten måste vara ansluten till internet. Anslut till **Innerrange Inception** genom att ange: <https://skytunnel.com.au/inception/SERIALNUMBER>, där SERIALNUMBER är numret på styrenheten, som du hittar på centralapparatens kapsling.

Öppna **Configuration > General > Alarm Reporting**. I inställningsgruppen **3rd Party Device Configuration** ska du ange:

<img alt="Programmet Innerrange Inception, sidan Alarm Reporting, gruppen 3rd Party Device Configuration: kryssrutan ”Enable 3rd Party Device Reporting” markerad (utmärkt), ”3rd Party Device Type” inställd på Trikdis (utmärkt), ”Serial Port” inställd på ”Serial Port 1 (Plugged In, In Use By 3rd Party Device)” (utmärkt)." src="./image21.webp" style="width:6.625984251968504in;height:3.2125984251968505in" />

1.  **Enable 3rd Party Device Reporting** - markera denna kryssruta.

2.  **3rd Party Device Type** - ange ”Trikdis”.

3.  **Serial port** - ange ”Serial Port 1 (Plugged In, In Use By 3rd Party Device)”.

4.  Spara inställningarna och stäng programmet.

Versionen på **Innerrange Integriti**-centralapparaten måste vara **19.1.0.36608** eller senare, och programvaran i professionell version **19.1.0.15396** eller senare.

Ange kommunikationsprotokollet Trikdis i centralapparatens konfigurationsprogram. Dataformat: Contact ID. Centralapparatens port (TTL Port-0), som larmsändaren E16 är ansluten till, har inställningarna 19200, 8, N, 1. Spara inställningarna och stäng programmet.

### Honeywell Ademco Vista

Följ dessa steg för centralapparaterna **Honeywell Ademco Vista-20** och **Honeywell Ademco Vista-48**. **Centralapparatens firmwareversion måste vara V5.3 eller senare.** Med en knappsats som är ansluten till centralapparaten:

1.  Gå in i programmeringsläget. Ange installatörskoden 4][1][1][2] och därefter [8][0][0] . Alternativt kan du slå på centralapparatens matning. Tryck på knapparna [\*] och [#] samtidigt inom 50 sekunder efter att matningen slagits på (den här metoden kan användas när programmeringsläget lämnades genom att trycka [\*][9][8] på knappsatsen).

2.  Aktivera sändning av Contact ID-händelser via LRR. Tryck [\*][2][9][1][#] på knappsatsen.

3.  När funktionen „Remote Arm/Disarm“ används, tillåt användning av den andra AUI-adressen. Tryck [\*][1][8][9][1][1][#] på knappsatsen.

Lämna programmeringsläget. Tryck [\*][9][9] på knappsatsen.

**Crow**

Det behövs ingen programmering av centralapparaterna Crow Runner 4/8 och Runner 8/16.

## Fjärrstyrning

### Lägga till säkerhetssystemet i appen Protegus2

Med Protegus2 kan användarna styra sitt larmsystem på distans. De ser systemets status och får aviseringar om systemhändelser.

1.  Ladda ned och starta appen Protegus2 eller använd webbversionen: [www.protegus.app](https://www.protegus.app).

    <div style="margin: 20px 0; text-align: center;">
      <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-android.webp" alt="Hämta på Google Play" style="height:50px;">
      </a>
      <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-web.webp" alt="Öppna webbappen" style="height:50px;">
      </a>
      <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;">
        <img src="./protegus-ios.webp" alt="Ladda ned i App Store" style="height:50px;">
      </a>
    </div>

2.  Logga in med ditt användarnamn och lösenord, eller registrera dig och skapa ett nytt konto.

!!! warning "Viktigt"
    När du lägger till E16 i Protegus2, kontrollera att:

    1.  ”Protegus cloud” är aktiverat. Se avsnitt 6.4 (fönstret ”User reporting”);

    2.  Matningen är ansluten (lysdioden ”POWER” lyser grönt);

    3.  Larmsändaren är registrerad i nätverket (lysdioden ”NETWORK” lyser grönt).
3. Klicka på ”Add new system” och ange E16:s nummer ”*MAC*”. Numret finns på enheten och på etiketten på förpackningen. Klicka på ”Next”.

![Protegus2-appen, sidan ”Scan QR code” för att lägga till ett system: tomt fält Unique ID/IMEI, texten OR, knappen Scan QR Code, anvisningen ”Scan the QR code or fill in the text field.” och en teckning av produktetiketten med QR-koden markerad. Knappar: Cancel, Next.](./protegus-app/e16-add-system-qr-phone.webp){ .trik-mob-img }

4.  Ange systemets ”Name”. Klicka på ”Next”.

![Protegus2-appen, sidan ”Add new system”: Name E16, en cirkel för Background colour och Time zone Europe/Vilnius. Knappar: Cancel, Next.](./protegus-app/e16-add-system-details-phone.webp){ .trik-mob-img }

### Ytterligare inställningar för tillkoppling/frånkoppling av systemet med centralapparatens nyckelbrytarsektion

!!! warning "Viktigt"
    Den sektion i centralapparaten som E16-utgången OUT är ansluten till
    måste vara inställd på nyckelbrytarläge.
Följ anvisningarna nedan om centralapparaten ska styras med en PGM-utgång på E16 som slår på/av centralapparatens nyckelbrytarsektion.

1.  Klicka på „**Continue**“.

![Protegus2-appen, sidan ”The system is not controlled remotely”: en teckning av en larmsändare bredvid en fundersam person, ”What do you need to know!” och anmärkningen att utgången måste anslutas till säkerhetssystemets ingångsplint och att Protegus2 måste konfigureras för att tillkoppla eller frånkoppla systemet. Knapp: Continue.](./protegus-app/e16-add-system-indirect-phone.webp){ .trik-mob-img }

2. Ange ”**Area name**”. Aktivera styrning av PGM-utgången med appen Protegus2.
3. Välj ”**Pulse**” eller ”**Level**”, beroende på hur nyckelbrytarsektionens typ är konfigurerad. Vid behov kan du ändra intervallet för ”**Pulse**”.

4.  Klicka på „**Save**“.

![Protegus2-appen, sidan ”Add new area”: Area number 1, Area name Home, ”Autoarm this area when arming area” Not used, ”Autodisarm when disarming area” av, ”Control with Protegus2” på, Assigned Output PGM1, Pulse vald med Pulse interval in seconds 3, Level inte vald. Knappar: Cancel, Save.](./protegus-app/e16-add-system-area-phone.webp){ .trik-mob-img }

5. Om säkerhetssystemet har ett område till måste du klicka på ”**Click to add an area**”. PGM-utgången ställs in på liknande sätt som beskrivits ovan.

6.  När inställningarna är klara klickar du på knappen ”**Skip**”.

![Protegus2-appen, sidan ”Areas”: området Home, ”Controlled with: PGM1”, med en borttagningsknapp; under det en plusknapp och ”Click to add an area”. Knappar: Skip, Next.](./protegus-app/e16-add-system-area-list-phone.webp){ .trik-mob-img }

### Tillkoppling/frånkoppling av larmsystemet med Protegus2

1.  I fönstret ”System Home Screen” klickar du på statusikonen ”Disarm”.

2.  *Protegus2* får ett meddelande om att säkerhetssystemets status har ändrats och statusikonen byter läge.

![Protegus2-appens startskärm för E16-systemet: Online, området Home med status Unknown och knapparna Arm och Disarm samt en knapp för utgången PGM2.](./protegus-app/e16-add-system-dashboard-phone.webp){ .trik-mob-img }

## Beskrivning av fönstren i TrikdisConfig

### Beskrivning av statusfältet i *TrikdisConfig*

När du har anslutit E16 och klickat på **Read [F4], *TrikdisConfig*** visar programmet information om den anslutna enheten i statusfältet:

<img alt="TrikdisConfigs statusfält visar fälten MAC/Unique ID, Status: reading done, Device: E16_1000, BL: 1.00, FW: 1.10 och HW: 0.01. Det visar också fält för SN, State, HID och Administrator." src="./image33.webp" style="width:7.070866141732283in;height:0.5905511811023622in" />

| Objekt        | Beskrivning                                        |
|---------------|----------------------------------------------------|
| MAC/Unique ID | Enhetens MAC-nummer                                |
| Status        | Driftstillstånd                                    |
| Device        | Enhetstyp (E16 ska visas)                          |
| SN            | Enhetens serienummer                               |
| BL            | Bootloader-version                                 |
| FW            | Enhetens firmwareversion                           |
| HW            | Enhetens maskinvaruversion                         |
| Status        | Typ av anslutning till programmet (via USB eller på distans) |
| Administrator | Behörighetsnivå (visas när åtkomstkoden har godkänts) |

När du har tryckt på **Read [F4]** läser programmet in och visar de inställningar som är gjorda i ***E16*.** Ange de inställningar som behövs enligt beskrivningarna av TrikdisConfig-fönstren nedan.

### Fönstret ”System settings”

<img alt="TrikdisConfig, fönstret System settings. Gruppen General visar Object ID 1122, centralapparatmodellen ”4. PARADOX SP4000, S” (avkortad i fältet), Remote Arm/Disarm markerad, Security panel PC download password 4477 och Time set Cloud application. Gruppen Access visar Administrator code 123456, Installer code 654321, Only an administrator can restore markerad och alla fem Allow installer to change markerade." src="./image34.webp" style="width:7.082677165354331in;height:3.062992125984252in" />

**Inställningsgruppen ”General”**

- **Object ID** – om händelserna ska skickas till larmcentralen (CMS, Central Monitoring Station), ange den abonnentkod som du har fått från larmcentralen (hexadecimalt tal med 4 tecken, 0–9, A–F. **Använd inte FFFE, FFFF som Object ID.**).

- Välj den **Security Panel model** som ska anslutas till larmsändaren.

- **Remote Arm/Disarm** - när kryssrutan är markerad styr E16 centralapparaten direkt på distans. Inställningen visas bara för centralapparater som styrs direkt. För direktstyrning av centralapparaterna måste du ändra centralapparatens inställningar, enligt beskrivningen i avsnitt 4 ”Programmering av centralapparaten”.

  - **Security panel PC download password** - för direktstyrning av Paradox- och Texecom-centralapparater måste du ange PC/UDL-lösenordet. Det måste stämma överens med lösenordet som är angivet i centralapparaten. Hur du ändrar lösenordet beskrivs i avsnitt 4 ”Programmering av centralapparaten”*.*

- **Time set -** välj vilken server som ska användas för tidssynkronisering.

Inställningsgruppen ”Access”

När du ställer in larmsändaren E16 finns det två behörighetsnivåer: administratör och installatör:

- **Administrator code -** ger åtkomst till alla konfigurationsfält (förvald kod - 123456).

- **Installer code** - begränsad åtkomst för konfigurering av larmsändaren (förvald kod - 654321).

- **Only an administrator can restore** - om rutan är markerad kan fabriksinställningarna bara återställas genom att administratörskoden anges.

- **Allow installer to change** – administratören kan ange vilka inställningar som installatören får ändra.

### Fönstret ”CMS reporting”

**Fliken ”CMS settings”**

<img alt="TrikdisConfig, fönstret CMS reporting, fliken CMS settings. Primary channel och Primary channel Backup är inställda på Disable; Parallel channel och Parallel channel Backup är inställda på IP med Protocol TRK. Alla fyra kanalgrupperna visar TCP under TCP or UDP, maskerade TRK encryption key och tomma fält för Domain or IP och Port." src="./image35.webp" style="width:7.082677165354331in;height:4.019685039370079in" />

Larmsändaren skickar händelser till larmcentralen via en trådbunden internetanslutning (IP).

Händelser kan skickas över flera kommunikationskanaler. Primärkanalen och den parallella kommunikationskanalen kan arbeta samtidigt, så att larmsändaren kan skicka händelser till två mottagare samtidigt. Backupkanaler kan tilldelas både primärkanalen och den parallella kanalen och används när anslutningen via primärkanalen eller den parallella kanalen bryts.

Kommunikationen är kodad och lösenordsskyddad. En TRIKDIS-mottagare krävs för att ta emot händelseinformationen och skicka den vidare till larmcentralens program:

- **För anslutning över IP** - programvarumottagaren IPcom för Windows/Linux, maskinvarumottagaren IP/SMS RL14 eller flerkanalsmottagaren RM14.

**Inställningsgruppen ”Primary channel”**

- **Communication type** - välj metod för kommunikation med larmcentralens mottagare (IP).

- **Protocol** - välj med vilken kodning händelserna ska skickas: **TRK** (till TRIKDIS-mottagare), **DC-09_2007** eller **DC-09_2012** (till universella mottagare), **TL150** (till SUR-GARD-mottagare).

- **TRK encryption key** - 6-siffrig krypteringsnyckel för meddelanden. Nyckeln som skrivs till larmsändaren måste stämma överens med mottagarens nyckel.

- **Domain or IP** - ange mottagarens domän eller IP-adress.

- **Port** - ange mottagarens nätverksportnummer.

- **TCP or UDP** - välj med vilket protokoll (TCP eller UDP) händelserna ska skickas.

Inställningsgruppen ”Primary channel Backup”

Aktivera backupkanalläget för att skicka händelser via backupkanalen om anslutningen via primärkanalen bryts. Backupkanalens inställningar är desamma som beskrivits ovan.

Inställningsgruppen ”Parallel channel”

Händelser överförs parallellt med primärkanalen via denna kanal. När den andra kanalen är aktiverad kan händelser skickas samtidigt till två mottagare (t.ex. en lokal och en central larmcentral). Den parallella kanalens inställningar är desamma som beskrivits ovan.

<img alt="TrikdisConfig, fönstret CMS reporting, fliken Settings. Test period är aktiverad på 24 h 0 min; IP ping period är aktiverad på 0 min 30 s. Receiver and line number visar 00 RR och 0 L; Backup reporting after är 2 fails; Return from Backup after är 1 min 30 s. DC-09 Settings visar Object ID 123456, line No 1 och receiver No 1." src="./image36.webp" style="width:7.078740157480315in;height:2.3661417322834644in" />

****Fliken ”Settings”** Inställningsgruppen ”Settings”**

- **Test period** - period för TEST-händelser som testar anslutningen. Testhändelserna skickas som Contact ID-meddelanden och vidarebefordras till larmcentralens programvara.

- **IP ping period** – period för sändning av interna PING-signaler (heartbeat). Dessa meddelanden skickas bara via IP-kanal. Mottagaren vidarebefordrar inte PING-meddelanden till larmcentralens programvara, för att inte överbelasta den. Meddelanden skickas till programvaran bara om mottagaren inte får PING-meddelanden från enheten inom den inställda tiden.

  Som förval skickas meddelandet ”*Connection lost*” till larmcentralens programvara om mottagaren inte får något PING-meddelande under en tidsperiod som är tre gånger längre än den som är inställd i enheten. Om PING-perioden t.ex. är inställd på 3 minuter skickar mottagaren meddelandet *”Connection lost”* om inget PING-meddelande tas emot inom 9 minuter.

  PING-meddelanden upprätthåller den aktiva kommunikationssessionen mellan enheten och mottagaren. En aktiv session krävs för fjärranslutning, fjärrstyrning och fjärrkonfigurering av enheten. Vi rekommenderar att PING-perioden ställs in på högst 5 minuter.

- **Backup reporting after** - anger antalet misslyckade försök att skicka meddelandet via kanalen ”Primary channel”. Om enheten misslyckas att sända det angivna antalet gånger ansluter den för att skicka meddelandena via kanalen ”Backup channel”.

- **Return from backup after** - tid efter vilken E16 försöker ansluta igen och skicka meddelanden via primärkanalen.

Inställningsgruppen ”DC-09 settings”

Inställningarna visas när protokollet **DC-09_2007** eller **DC-09_2012** är valt i kommunikationskanalens fält **Protocol** för att skicka händelser till universella mottagare.

- **Object ID in DC-09** - ange objektnumret. <u>Objektnumret i det här fältet används om DC-09-kodning är vald</u>. Du kan ange ett hexadecimalt tal på 3 till 16 tecken. Numret får du från larmcentralen (CMS, Central Monitoring Station).

- **DC-09-line No**. - ange mottagarens linjenummer.

- **DC-09 receiver No.** - ange mottagarnumret.

### Fönstret ”User reporting”

**Fliken ”PROTEGUS Cloud”**

<img alt="TrikdisConfig, fönstret User reporting, fliken PROTEGUS Cloud. Enable connection är markerad och fältet PROTEGUS Cloud access Code är ifyllt." src="./image37.webp" style="width:7.082677165354331in;height:1.7677165354330708in" />

Tjänsten Protegus gör det möjligt för användarna att övervaka och styra larmsändaren på distans. Mer information om tjänsten Protegus finns på [www.protegus.app](https://www.protegus.app).

**Inställningsgruppen ”Protegus Cloud”**

- **Enable connection** – aktivera tjänsten Protegus; E16 kan då utbyta data med appen Protegus2 och konfigureras på distans via ***TrikdisConfig*.**

- **Protegus Cloud access Code -** 6-siffrig kod för anslutning till appen Protegus2 (förval - 123456).

### Fönstret ”Ethernet settings”

<img alt="TrikdisConfig, fönstret Ethernet settings. Use DHCP är markerad. Static IP 0.0.0.0, Subnet mask 255.255.255.0, Default gateway 0.0.0.0, DNS 1 8.8.8.8 och DNS 2 8.8.4.4." src="./image38.webp" style="width:7.086614173228346in;height:2.2283464566929134in" />

**Inställningsgruppen ”Ethernet settings”**

- **Use DHCP** - markera rutan så att larmsändaren registrerar sig automatiskt i nätverket. Om den automatiska registreringen misslyckas måste du ange uppgifterna manuellt:
- **Static IP** – statisk IP-adress när manuellt registreringsläge är inställt.

- **Subnet mask** – nätmask när manuellt registreringsläge är inställt.

- **Default gateway** – gateway-adress när manuellt registreringsläge är inställt.
- **DNS1, DNS2** - (Domain Name System) anger den server som tar fram IP-adressen för en domän. Används när en domän är angiven i kommunikationskanalens fält **Domain or IP** (inte en IP-adress). Googles DNS-server är förinställd.

### Fönstren ”IN/OUT”

<img alt="TrikdisConfig, fönstret IN/OUT. Plint 1 är Disabled; plint 2 är IN med Type NO; för plint 3 är rullgardinslistan Function öppen med OUT vald. Raderna IN2_ALARM och IN2_TAMPER har rapportering av händelse och återställning aktiverad, med Contact ID-koderna 130 respektive 144, Part. 99 och Zone 002." src="./image39.webp" style="width:7.086614173228346in;height:2.452755905511811in" />

Larmsändaren har 3 universella (ingångs-/utgångs-)plintar. I tabellen kan plintens driftläge ställas in (Disabled, IN, OUT). För ingången måste du ange typen av krets som ska anslutas: NC, NO, NO / EOL, NC / EOL, NO / DEOL, NC / DEOL.

Ytterligare detektorer kan anslutas till larmsändarens ingångar. När detektorn löser ut skickar larmsändaren ett händelsemeddelande. Ingången tilldelas en Contact ID-kod som skickas till larmcentralen och Protegus2.

- **Enable** – markerade händelsefält för vilka meddelanden skickas till larmcentralen och Protegus2.

- **E/R** – välj vilken typ av händelse som ska skickas när ingången löser ut – **Event** eller **Restore**.

- **CID** – ange händelsekoden eller lämna förvalt värde. När händelsen inträffar skickas händelsekoden till Protegus2 och larmcentralen.

- **Part**. – ange det områdesnummer som skickas när en intern händelse inträffar och när systemet återställs.

- **Zone** - ange det sektionsnummer som skickas när en intern händelse inträffar och när systemet återställs.

### Fönstret ”RS485 modules”

**Fliken ”Modules list”**

Utbyggnadsmoduler i serien iO kan anslutas till larmsändaren för att lägga till fler ingångar, utgångar och seriella bussar för temperaturgivare. Anslutna utbyggnadsmoduler måste läggas till i tabellen **Modules list**.

<img alt="TrikdisConfig, fönstret RS485 modules, fliken Modules list. Tabellen har kolumnerna ID, Module Type och Serial No. Rullgardinslistan Module Type är öppen med Expander iO-8 markerad." src="./image40.webp" style="width:7.078740157480315in;height:2.141732283464567in" />

- **Module type** – välj i listan den modul som är ansluten till larmsändaren via RS485.

- **Serial No –** ange modulens serienummer (6 siffror), som anges på etiketterna på modulens kapsling och förpackning.

Gå till **RS485 modules** → **Module.**

**Flikarna ”Module”**

När du har lagt till utbyggnadsmodulen i larmsändaren enligt ovan visas en ny flik i fönstret **RS485 modules** med modulens inställningar. Fliken får ett nummer. Nedan beskrivs inställningarna för utbyggnadsmodulerna iO-8 och iO.

**Inställningsfönstret för utbyggnadsmodulen iO-8**

<img alt="TrikdisConfig, fönstret RS485 modules, fliken Module 1 för Expander iO-8. Input Count är 3 och Show Object ID är avmarkerad. BUS_FAULT har Contact ID-koden 333; INPUT1, INPUT2 och INPUT3 har koden 130, Part. 91 och Zone 001, 002 respektive 003. Rapportering av händelse och återställning är aktiverad för alla fyra rader; ingångarna visar Object Input type NO." src="./image41.webp" style="width:7.082677165354331in;height:2.52755905511811in" />

Utbyggnadsmodulen iO-8 har 8 universella (ingångs-/utgångs-)plintar. Upp till fyra utbyggnadsmoduler iO-8 kan anslutas.

- **Input Count** – välj hur många av plintarna som ska ställas in i ingångsläge (IN). Övriga plintar blir utgångar (OUT).

Inställningarna för styrbara utgångar görs direkt i appen Protegus2. Där kan du tilldela en utgång för tillkoppling/frånkoppling av larmsystemet eller för fjärrstyrning av enheter.

I tabellen kan ingångarna tilldelas Contact ID-koder för händelse och återställning. När ingången löser ut skickar larmsändaren en händelse med den inställda händelsekoden till larmcentralens mottagare och till appen Protegus2.

**Contact ID-händelsekod:**

- **Enable** – tillåt sändning av meddelande när ingången löser ut.

- **E/R** – välj vilken typ av händelse som ska skickas när ingången löser ut – **Event** eller **Restore**.

- **CID** – tilldela ingången en Contact ID-händelsekod.

- **Part.** – tilldela ingången området. Det ställs in automatiskt: om modulnumret är 1 är området 91, om modulnumret är 4 är området 94.

- **Zone** – ange ingångens sektionsnummer.

****Contact ID-återställningskod**:**

- **Enable** – tillåt sändning av meddelande när ingången återställs.

- **E/R** – välj vilken typ av händelse som ska skickas när ingången återställs – **Restore** eller **Event**.

- **CID** – tilldela ingången Contact ID-återställningskoden.

- **Part.** – tilldela ingången området. Det ställs in automatiskt: om modulnumret är 1 är området 91, om modulnumret är 4 är området 94.

- **Zone** – ange ingångens sektionsnummer.

- **Input type** – välj ingångens typ (NO eller NC).

**Inställningsfönstret för utbyggnadsmodulen iO**

<img alt="TrikdisConfig, fönstret RS485 modules, fliken Module 1 för Expander iO. Input IN1 type är NO, Max °C(T1) är 30 och Min °C(T2) är 15. Relay control lyder If TT1 AND None then OFF for 0 h 0 min 0 s. Rapportering av händelse och återställning är aktiverad för INPUT, HIGH_TEMPERATURE, LOW_TEMPERATURE och BUS_FAULT, med Contact ID-koderna 130, 158, 159 respektive 333. Varje rad visar Part. 91 och Zone 001." src="./image42.webp" style="width:7.086614173228346in;height:3.2283464566929134in" />

Utbyggnadsmodulen iO har plintar för 1 ingång och 1 utgång (reläkontakter) samt en seriell 1-Wire-buss för anslutning av temperaturgivare.

Reläutgången kan styras enligt logiska villkor (AND, OR, XOR).

- **Input IN1 type** – ange ingångens typ (NO eller NC).

- **Max <sup>◦</sup>C(T1)** – när temperaturen är högre än denna inställning genereras ett händelsemeddelande. För att ett händelsemeddelande ska genereras måste det vara aktiverat i tabellen.

- **Min <sup>◦</sup>C(T2)** – när temperaturen är lägre än denna inställning genereras ett händelsemeddelande. För att ett händelsemeddelande ska genereras måste det vara aktiverat i tabellen.

- **Relay control** – ange de logiska villkor (AND, OR, XOR) som reläutgången ska styras efter.

I tabellen kan ingångarna tilldelas Contact ID-koder för händelse och återställning. När en ingång löser ut skickar larmsändaren en händelse med den inställda händelsekoden till larmcentralens mottagare och till appen Protegus2. Ställ in enligt beskrivningen ovan under **Inställningsfönstret för utbyggnadsmodulen iO-8**.

### Fönstret ”Event summary”

Här kan du aktivera, avaktivera och ändra de interna meddelanden som enheten skickar. Om du avaktiverar ett internt meddelande här skickas det inte alls, oavsett andra inställningar.

<img alt="TrikdisConfig, fönstret Event summary. COMMUNICATION event och restore är avaktiverade, kod 350. POWER event och restore är aktiverade, kod 302. REMOTE_FINISHED, REMOTE_STARTED, START och TEST events är aktiverade med koderna 412, 411, 700 och 602. Part. som visas är 99 och Zone är 999." src="./image43.webp" style="width:7.090551181102362in;height:1.9448818897637796in" />

- **COMMUNICATION** – meddelande om anslutningsfel mellan centralapparaten och E16.

- **POWER** – meddelande om låg matningsspänning.

- **REMOTE_STARTED** – meddelande om fjärranslutning för att konfigurera E16 med TrikdisConfig.

- **REMOTE_FINISHED** – meddelande om att fjärrkonfigureringen med TrikdisConfig har avslutats.

- **START** – meddelande om att E16 ansluter till nätverket.

- **TEST** – meddelande om periodisk testsändning.

!!! note "Obs!"
    Information om hur du aktiverar periodiska TEST-meddelanden och ställer in deras period finns under **CMS
    reporting -> Settings -> Test period**.
- **Enable** – när den är markerad är sändning av meddelandena aktiverad.

Du kan ändra Contact ID-koden för varje händelse, samt sektions- och områdesnummer.

### Återställa fabriksinställningarna

För att återställa larmsändarens fabriksinställningar klickar du på knappen **Restore** i TrikdisConfig-fönstret.

<img alt="TrikdisConfig, avsnittet Default settings med knappen Restore omringad med rött. Fältet MAC/Unique ID och enhetens status visas under." src="./image44.webp" style="width:7.086614173228346in;height:0.9803149606299213in" />

## Fjärrkonfigurering

!!! warning "Viktigt"
    Fjärrkonfigurering fungerar bara om:

    1.  ”Protegus cloud” är aktiverat. Hur du aktiverar molntjänsten
        beskrivs i avsnitt 6.4 (fönstret ”User reporting”);

    2.  Matningen är ansluten (lysdioden ”POWER” lyser grönt);

    3.  Larmsändaren är registrerad i nätverket (lysdioden ”NETWORK” lyser grönt).
1.  Starta konfigurationsprogrammet TrikdisConfig.

2.  I avsnittet **Remote access** anger du larmsändarens nummer **MAC**. Numret finns på enheten och på etiketten på förpackningen.

<img alt="TrikdisConfig, avsnittet Remote access. Fältet Unique ID och knappen Configure är omringade med rött; fältet System Name finns bredvid." src="./image45.webp" style="width:7.0078740157480315in;height:1.0393700787401574in" />

3. (Valfritt) Ange önskat namn på E16 med detta Unique ID i fältet **System name**.

2.  Klicka på **Configure**.

3.  I det nya fönstret som öppnas klickar du på **Read [F4]**. Ange vid behov administratörs- eller installatörskoden*.* För att spara lösenordet markerar du **”Remember password”**.

4.  Ange de inställningar som behövs och klicka på **Write [F5]** när du är klar.

## Testa larmsändarens funktion

När konfigureringen och installationen är klara, gör en systemkontroll:

1.  Generera en händelse:

- genom att tillkoppla/frånkoppla systemet med centralapparatens knappsats;

- genom att utlösa ett sektionslarm när säkerhetssystemet är tillkopplat.

1.  Kontrollera att händelsen kommer fram till larmcentralen (CMS, Central Monitoring Station) och/eller tas emot i appen Protegus2.

2.  För att testa larmsändarens ingång, utlös den och kontrollera att rätt händelse tas emot.

3.  För att testa larmsändarens utgångar, aktivera dem på distans och kontrollera att de fungerar.

4.  Om centralapparaten ska styras på distans, tillkoppla/frånkoppla säkerhetssystemet på distans med appen Protegus2.

## Firmwareuppdatering

!!! note "Obs!"
    När larmsändaren är ansluten till TrikdisConfig erbjuder programmet
    automatiskt att uppdatera enhetens firmware om det finns
    uppdateringar. Uppdateringar kräver en internetanslutning. Antivirusprogram,
    brandvägg eller strikta inställningar för internetåtkomst kan blockera de automatiska
    firmwareuppdateringarna. I så fall måste du konfigurera om
    antivirusprogrammet.
Larmsändarens firmware kan också uppdateras eller bytas manuellt. Efter en uppdatering finns alla tidigare gjorda inställningar kvar oförändrade. Vid manuell skrivning av firmware kan den bytas till en nyare eller äldre version. Så här uppdaterar du:

1.  Starta ***TrikdisConfig**.*

2.  Anslut larmsändaren till datorn med USB-kabel eller anslut till larmsändaren på distans.

    - Om det finns en nyare firmwareversion erbjuder programmet att ladda ned filen med den nyare firmwareversionen.

3.  Välj menygrenen **Firmware**.

<img alt="TrikdisConfig, fönstret Firmware för E16_1000. Firmware är valt i menyn; filsökvägen är tom, Open firmware är tillgänglig, Update (F12) är avaktiverad och förloppet är 0 %." src="./image46.webp" style="width:7.086614173228346in;height:3.1653543307086616in" />

4. Klicka på **Open firmware** och välj den firmwarefil som behövs. Om du inte har filen kan den senaste firmwarefilen laddas ned av <u>registrerade användare</u> från [www.trikdis.com](http://www.trikdis.com), under nedladdningsavsnittet för larmsändaren E16.

2.  Klicka på **Update [F12]**.

3.  Vänta tills uppdateringen är klar.

## Säkerhetskrav

Larmsändaren ska installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla bort matningen innan du gör några elektriska anslutningar.

Ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Symbol med överkryssad soptunna på hjul (WEEE), som anger att enheten ska kasseras skilt från hushållsavfall." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Följ dina lokala bestämmelser och släng inte ett oanvändbart larmsystem eller dess komponenter bland vanligt hushållsavfall.

<div style="text-align: center;">
  <img src="./image1.webp" alt="Foto av framsidan på Ethernet-larmsändaren TRIKDIS E16. Lysdiodsindikeringarna är NETWORK, DATA, POWER och TROUBLE; plintarna är +DC, -DC, CLK, DATA, I/O 1, I/O 2, I/O 3, COM, A RS485 och B RS485. På märkningen för matning står 10–18 VDC, 0.25 A Max." width="400">
</div>

## Bilaga

Larmsändaren kan arbeta med en SUR-GARD-mottagare. Larmsändaren omvandlar Contact ID-koder som tas emot från centralapparaten till SIA-koder.

**Tabell för omvandling av Contact ID-koder till SIA-koder**

| **Systemhändelse** | **CID-rapportkod** | **SIA-rapportkod** |
|----|:--:|:--:|
| Medicinskt nödlarm | E100 | "MA" |
| Personligt nödlarm | E101 | "QA" |
| Brand i sektion: <z> | E110 | "FA" |
| Vattenflöde upptäckt i sektion: <z> | E113 | "SA" |
| Larm från brandlarmsknapp i sektion: <z> | E115 | "FA" |
| Överfall i sektion: <z> | E120 | "PA" |
| Överfallslarm av användare: <v> | E121 | "HA" |
| Överfallslarm i sektion: <z> | E122 | "PA" |
| Överfallslarm i sektion: <z> | E123 | "PA" |
| Överfallslarm i sektion: <z> | E124 | "HA" |
| Överfallslarm i sektion: <z> | E125 | "HA" |
| Larm aktivt i sektion: <z> | E130 | "BA" |
| Larm aktivt i sektion: <z> | E131 | "BA" |
| Larm aktivt i sektion: <z> | E132 | "BA" |
| Larm aktivt i sektion: <z> | E133 | "BA" |
| Larm aktivt i sektion: <z> | E134 | "BA" |
| Larm aktivt i sektion: <z> | E135 | "BA" |
| Sabotage aktivt i sektion: <z> | E137 | "TA" |
| Inbrott verifierat i sektion: <z> | E139 | "BV" |
| Larm aktivt i sektion: <z> | E140 | "UA" |
| Systemfel (143) | E143 | "ET" |
| Sabotage aktivt i sektion: <z> | E144 | "TA" |
| Sabotage aktivt i sektion: <z> | E145 | "TA" |
| Larm aktivt i sektion: <z> | E146 | "BA" |
| Larm aktivt i sektion: <z> | E150 | "UA" |
| Gas upptäckt i sektion: <z> | E151 | "GA" |
| Vattenläckage upptäckt i sektion: <z> | E154 | "WA" |
| Foliebrott upptäckt i sektion: <z> | E155 | "BA" |
| Hög temperatur vid givare: <n> | E158 | "KA" |
| Låg temperatur vid givare: <n> | E159 | "ZA" |
| CO upptäckt i sektion: <z> | E162 | "GA" |
| Brandfel i sektion: <z> | E200 | "FS" |
| Övervakat larm | E220 | "BA" |
| Systemfel (300) | E300 | "YP" |
| Nätfel | E301 | "AT" |
| Låg batterispänning | E302 | "YT" |
| Systemfel (304) | E304 | "YF" |
| Systemomstart i sektion: <z> | E305 | "RR" |
| Centralapparatens programmering ändrad | E306 | "YG" |
| Systemavstängning | E308 | "RR" |
| Batterifel (309) | E309 | "YT" |
| Jordfel | E310 | "US" |
| Batterifel (311) | E311 | "YM" |
| Överström i matningen (312) | E312 | "YP" |
| Installatörsåterställning av användare: <v> (313) | E313 | "RR" |
| Fel på siren/relä | E320 | "RC" |
| Systemfel (321) | E321 | "YA" |
| Systemfel (330) | E330 | "ET" |
| Systemfel (332) | E332 | "ET" |
| Systemfel (333) | E333 | "ET" |
| Systemfel (336) | E336 | "VT" |
| Systemfel (338) | E338 | "ET" |
| Systemfel (341) | E341 | "ET" |
| Systemfel (342) | E342 | "ET" |
| Systemfel (343) | E343 | "ET" |
| Systemfel (344) | E344 | "XQ" |
| Kommunikationsfel i systemet (350) | E350 | "YC" |
| Kommunikationsfel i systemet (351) | E351 | "LT" |
| Kommunikationsfel i systemet (352) | E352 | "LT" |
| Systemfel (353) | E353 | "YC" |
| Kommunikationsfel i systemet (354) | E354 | "YC" |
| Systemfel (355) | E355 | "UT" |
| Fel i brandsektion: <z> | E373 | "FT" |
| Fel i sektion: <z> | E374 | "EE" |
| Fel i sektion: <z> | E378 | "BG" |
| Fel i sektion: <z> | E380 | "UT" |
| Fel på trådlös sektion: <z> | E381 | "US" |
| Fel på trådlös modul (382) | E382 | "UY" |
| Sabotage aktivt i sektion: <z> | E383 | "TA" |
| Låg batterispänning i trådlös sektion: <z> | E384 | "XT" |
| Fel i sektion: <z> (389) | E389 | "ET" |
| Fel i sektion: <z> (391) | E391 | "NA" |
| Fel i sektion: <z> (393) | E393 | "NC" |
| Användare <v> frånkopplade systemet | E400 | "OP" |
| Användare <v> frånkopplade systemet | E401 | "OP" |
| Automatisk frånkoppling | E403 | "OA" |
| Uppskjuten frånkoppling av användare <v> | E405 | "OR" |
| Larm avbrutet av användare: <v> | E406 | "BC" |
| Användare <v> frånkopplade på distans | E407 | "OP" |
| Snabbfrånkoppling | E408 | "OP" |
| Fjärrfrånkoppling | E409 | "OS" |
| Återuppringningsbegäran från larmcentralen | E411 | "RB" |
| Lyckad nedladdning av data | E412 | "RS" |
| Inpassering nekad för användare <v> | E421 | "JA" |
| Inpassering av användare <v> | E422 | "DG" |
| Forcerad åtkomst i sektion <z> | E423 | "DF" |
| Utpassering nekad för användare <v> | E424 | "DD" |
| Utpassering av användare <v> | E425 | "DR" |
| Användare <v> frånkopplade för tidigt | E451 | "OK" |
| Användare <v> tillkopplade för sent | E452 | "OJ" |
| Användare <v> lyckades inte frånkoppla | E453 | "CT" |
| Användare <v> lyckades inte tillkoppla | E454 | "CI" |
| Automatisk tillkoppling misslyckades | E455 | "CI" |
| Delvis tillkoppling av användare: <v> | E456 | "CG" |
| Utpasseringsfel av användare: <v> | E457 | "EE" |
| Systemet frånkopplat efter larm av användare: <v> | E458 | "OR" |
| Nyligen tillkopplat av användare <v> | E459 | "CR" |
| Felaktig kod angiven | E461 | "JA" |
| Tiden för automatisk tillkoppling förlängd av användare: <v> | E464 | "CE" |
| Enhet avaktiverad (501) | E501 | "RL" |
| Enhet avaktiverad (520) | E520 | "RO" |
| Trådlös detektor avaktiverad i sektion: <z> (552) | E552 | "YS" |
| Sektion <z> förbikopplad | E570 | "UB" |
| Sektion <z> förbikopplad | E571 | "FB" |
| Sektion <z> förbikopplad | E572 | "MB" |
| Sektion <z> förbikopplad | E573 | "BB" |
| Gruppförbikoppling av användare: <v> | E574 | "CG" |
| Sektion <z> förbikopplad | E576 | "UB" |
| Förbikoppling av sektion <z> upphävd | E577 | "UB" |
| Förbikoppling av ventilationssektion | E579 | "UB" |
| Gångtest aktiverat av användare: <v> | E607 | "TS" |
| Manuell testsändning | E601 | "RX" |
| Periodisk testsändning | E602 | "RP" |
| Systemhändelse (605) | E605 | "JL" |
| Systemhändelse (606) | E606 | "LF" |
| Periodisk testsändning med fel | E608 | "RY" |
| Systemhändelse (622) | E622 | "JL" |
| Systemhändelse (623) | E623 | "JL" |
| Tid/datum omställda av användare <v> | E625 | "JT" |
| Felaktig tid/datum | E626 | "JT" |
| Systemprogrammering startad | E627 | "LB" |
| Systemprogrammering avslutad | E628 | "LS" |
| Systemhändelse (631) | E631 | "JS" |
| Systemhändelse (632) | E632 | "JS" |
| Systemet inte aktivt (654) | E654 | "CD" |
| Medicinskt nödlarm återställt | R100 | "MH" |
| Personligt nödlarm återställt | R101 | "QH" |
| Brandlarm återställt i sektion: <z> | R110 | "FH" |
| Vattenflödeslarm återställt i sektion: <z> | R113 | "SH" |
| Överfallslarm återställt i sektion: <z> | R120 | "PH" |
| Överfallslarm avbrutet av användare: <v> | R121 | "HH" |
| Överfallslarm återställt i sektion: <z> | R122 | "PH" |
| Överfallslarm återställt i sektion: <z> | R123 | "PH" |
| Överfallslarm återställt i sektion: <z> | R124 | "HH" |
| Överfallslarm återställt i sektion: <z> | R125 | "HH" |
| Larm återställt i sektion: <z> | R130 | "BH" |
| Larm återställt i sektion: <z> | R131 | "BH" |
| Larm återställt i sektion: <z> | R132 | "BH" |
| Larm återställt i sektion: <z> | R133 | "BH" |
| Larm återställt i sektion: <z> | R134 | "BH" |
| Larm återställt i sektion: <z> | R135 | "BH" |
| Sabotage återställt i sektion: <z> | R137 | "TA" |
| Larm återställt i sektion: <z> | R140 | "UH" |
| Systemfel (143) återställt | R143 | "UR" |
| Sabotage återställt i sektion: <z> | R144 | "TR" |
| Sabotage återställt i sektion: <z> | R145 | "TR" |
| Larm återställt i sektion: <z> | R146 | "BH" |
| Larm återställt i sektion: <z> | R150 | "UH" |
| Gaslarm återställt i sektion: <z> | R151 | "GH" |
| Vattenläckagelarm återställt i sektion: <z> | R154 | "WH" |
| Foliebrott återställt i sektion: <z> | R155 | "BH" |
| Temperaturen har normaliserats vid givare: <n> | R158 | "KH" |
| Temperaturen har normaliserats vid givare: <n> | R159 | "ZH" |
| CO-larm återställt i sektion: <z> | R162 | "GH" |
| Brandfel återställt i sektion: <z> | R200 | "FV" |
| Övervakat larm återställt | R220 | "BH" |
| Systemfel (300) återställt | R300 | "YA" |
| Nätspänning OK | R301 | "AR" |
| Batteri OK | R302 | "YR" |
| Systemfel (304) återställt | R304 | "YG" |
| Systemomstart återställd i sektion: <z> | R305 | "RR" |
| Batterifel (309) återställt | R309 | "YR" |
| Jordfel återställt | R310 | "UR" |
| Batterifel (311) återställt | R311 | "YR" |
| Överström i matningen (312) återställd | R312 | "YQ" |
| Fel på siren/relä återställt | R320 | "RO" |
| Systemfel (321) återställt | R321 | "YH" |
| Systemfel (330) återställt | R330 | "ER" |
| Systemfel (332) återställt | R332 | "ER" |
| Systemfel (333) återställt | R333 | "ER" |
| Systemfel (336) återställt | R336 | "VR" |
| Systemfel (338) återställt | R338 | "ER" |
| Systemfel (341) återställt | R341 | "ER" |
| Systemfel (342) återställt | R342 | "ER" |
| Systemfel (344) återställt | R344 | "XH" |
| Kommunikationsfel i systemet (350) återställt | R350 | "YK" |
| Kommunikationsfel i systemet (351) återställt | R351 | "LR" |
| Kommunikationsfel i systemet (352) återställt | R352 | "LR" |
| Systemfel (353) återställt | R353 | "YK" |
| Kommunikationsfel i systemet (354) återställt | R354 | "YK" |
| Systemfel (355) återställt | R355 | "UJ" |
| Fel i brandsektion: <z> återställt | R373 | "FJ" |
| Fel i sektion: <z> återställt | R374 | "EA" |
| Fel i sektion: <z> återställt | R380 | "UJ" |
| Fel på trådlös sektion: <z> återställt | R381 | "UR" |
| Fel på trådlös modul (382) återställt | R382 | "BR" |
| Sabotage återställt i sektion: <z> | R383 | "TR" |
| Batteri OK i trådlös sektion: <z> | R384 | "XR" |
| Fel i sektion: <z> (391) återställt | R391 | "NS" |
| Fel i sektion: <z> (393) återställt | R393 | "NS" |
| Användare <v> tillkopplade systemet | R400 | "CL" |
| Användare <v> tillkopplade systemet | R401 | "CL" |
| Automatisk tillkoppling | R403 | "CA" |
| Användare <v> tillkopplade på distans | R407 | "CL" |
| Snabbtillkoppling | R408 | "CL" |
| Fjärrtillkoppling | R409 | “CS” |
| Användare <v> tillkopplade i hemmaläge | R441 | "CG" |
| Användare <v> tillkopplade för tidigt | R451 | “CK” |
| Användare <v> frånkopplade för sent | R452 | “CJ” |
| Användare <v> lyckades inte frånkoppla | R454 | “CI” |
| Delvis tillkoppling av användare: <v> | R456 | "CG" |
| Nyligen frånkopplat av användare <v> | R459 | “CR” |
| Enhet aktiverad (501) | R501 | "RG" |
| Enhet aktiverad (520) | R520 | "RC" |
| Trådlös detektor aktiverad i sektion: <z> (552) | R552 | "YK" |
| Förbikoppling av sektion <z> upphävd | R570 | "UU" |
| Förbikoppling av sektion <z> upphävd | R571 | "FU" |
| Förbikoppling av sektion <z> upphävd | R572 | "MU" |
| Förbikoppling av sektion <z> upphävd | R573 | "BU" |
| Gruppförbikoppling av användare: <v> upphävd | R574 | "CF" |
| Förbikoppling av sektion <z> upphävd | R576 | "UU" |
| Förbikoppling av sektion <z> upphävd | R577 | "UU" |
| Förbikoppling av ventilationssektion upphävd | R579 | "UU" |
| Gångtest avaktiverat av användare <v> | R607 | "TE" |
| Tid/datum omställda av användare <v> | R625 | "JT" |
| Systemet aktivt (654) | R654 | "CD" |
