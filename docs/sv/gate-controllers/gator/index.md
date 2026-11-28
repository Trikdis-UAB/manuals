# GATOR – mobilansluten styrenhet för port

<div style="text-align: center;">
  <img src="./image1.webp" alt="Styrenheten GATOR med indikeringarna NETWORK, DATA, POWER och TROUBLE på framsidan, en antennanslutning upptill och ett plintblock med skruvplintar längs underkanten." width="400">
</div>


##  Beskrivning 

Den mobilanslutna styrenheten kan fjärrstyra automatiska portar och annan utrustning.

Användare kan styra enheten med appen Protegus2, med telefonsamtal och med SMS. Styrenheten kan känna igen upp till 7 administratörer och 1 000 användare via deras telefonnummer. För styrenheten kan man ställa in ett styrschema för användare och en räknare för hur många gånger en viss användare får styra systemet. Styrenheten kan skicka SMS som meddelar när ingångar och utgångar aktiveras och återställs (SMS-texterna kan anpassas). Styrenheten kan skicka händelsemeddelanden till ett larmbolags mottagare. Om en WiFi-modul (W485) eller Ethernet-modul (E485) ansluts till styrenheten kan den skicka händelsemeddelanden och styras över trådlöst eller trådbundet internet, utan mobildata från ett SIM-kort. Genom att ansluta radiotransceivern RF-LORA kan den trådlösa utbyggnadsmodulen iO8-LORA (1 st.) och de trådlösa utbyggnadsmodulerna iO-LORA (upp till 8 st.) anslutas till styrenheten GATOR. RFID-läsare som är anslutna till de trådlösa utbyggnadsmodulerna iO-LORA kan styra upp till 8 PGM-utgångar (styrenhetens programversion från 2.13). En utbyggnadsmodul iO-LORA med RFID-läsare styr bara en PGM-utgång.

### Funktioner

**Fjärrstyrning**

- Med mobil-/internetappen *Protegus2*.

- Med SMS.

- Med telefonsamtal.

**Meddelanden till användare**

- Skickar meddelanden om händelser till appen *Protegus2* eller som SMS.

**Meddelanden till larmbolaget**

- Skickar händelser med Contact ID-koder till TRIKDIS programvaru- och hårdvarumottagare, som fungerar med all larmcentralsprogramvara.

- Kan skicka händelsemeddelanden till larmbolagets mottagare och samtidigt arbeta med appen *Protegus2*.

- Om anslutningen till huvudmottagaren bryts skickas meddelandena automatiskt till en backupmottagare.

**Ingångar och utgångar**

- 2 ingångar (IN) med valbar typ: NO, NC, EOL.


- 2 universella ingångar/utgångar. Driftläget ställs in som ingång eller utgång.

- 1 utgång (OUT), relä.

- Med utbyggnadsmodulen iO-LORA kan du lägga till en ingång och en PGM-utgång (relä). Sammanlagt kan du lägga till 8 utbyggnadsmoduler iO-LORA (upp till 8 extra ingångar och 8 PGM-utgångar).

- Fler ingångar och utgångar kan läggas till med utbyggnadsmodulen iO8 eller iO8-LORA. En utbyggnadsmodul iO8 eller iO8-LORA kan anslutas till styrenheten GATOR.

**Inställningar och installation**

- Snabb och enkel installation.

- Nya användare kan läggas till och befintliga användare tas bort med appen Protegus2 (vid inloggning med administratörsbehörighet), med SMS eller med programvaran TrikdisConfig.

- Enheten kan konfigureras antingen via en USB Mini-B-kabel eller på distans med programvaran TrikdisConfig.

- Fjärruppdatering av firmware.

- Två åtkomstnivåer för konfigurering av enheten: för installatören och för administratören.

### Tekniska data

| Parameter | Beskrivning |
|-----------|-------------|
| 2G-modemets frekvenser | 850 / 900 / 1 800 / 1 900 MHz |
| LTE-modemets frekvenser: EU (Europa) LA (Latinamerika) | LTE-FDD: B1/B3/B5/B7/B8/B20/B28 LTE-FDD: B2/B3/B4/B5/B7/B8/B28/B66 |
| Matningsspänning | 9–32 V DC 12–24 V AC |
| Strömförbrukning | 100 mA |
| Ingångar | 2, valbar typ: NC, NO, EOL=10 kΩ |
| Universella ingångar/utgångar | 2, kan ställas in antingen som ingång IN med typ NC, NO, EOL=10 kΩ eller som utgång OUT (utgång med öppen kollektor (OC), 50 mA) |
| Utgång | 1, relä, 1 A 30 V DC, 0,5 A 125 V AC |
| Minne för osända händelser | Upp till 60 händelser |
| Händelseloggens minne | Upp till 5 000 händelser |
| Användare som får meddelanden och har behörighet att styra | 7 |
| Användare som har behörighet att styra | 1 000 |
| Driftmiljö | Temperatur från –20 °C till +50 °C, relativ luftfuktighet upp till 80 % vid +20 °C |
| Mått | 92 × 62 × 26 mm |
| Vikt | 80 g |

### Styrenhetens delar

1.  Lysdioder.

2.  Öppningsskåra på kapslingens framsida.

3.  USB Mini-B-port för programmering av styrenheten.

4.  Plintblock för externa anslutningar.

5.  Fack för nano-SIM-kort.

6.  SMA-kontakt för mobilantennen.

<img alt="Styrenhetens delar GATOR. Vänster bild: 1 Lysdioder; 2 Öppningsskåra på kapslingens framsida. Höger bild: 3 USB Mini-B-port för programmering av styrenheten; 4 Plintblock för externa anslutningar; 5 Fack för nano-SIM-kort; 6 SMA-kontakt för mobilantennen." src="./image4.webp" style="width:4.606299212598425in;height:2.7874015748031496in" />

### Plintarnas funktion 

| **Plint** | **Beskrivning** |
|----|:---|
| AC/+DC | Matningsplint (9–32 V DC plus; 12–24 V AC) |
| AC/-DC | Matningsplint (9–32 V DC minus; 12–24 V AC) |
| 1 IN | Ingång 1, valbar typ NO, NC, EOL (fabriksinställning: NO) |
| 2 IN | Ingång 2, valbar typ NO, NC, EOL (fabriksinställning: Disabled) |
| COM | Gemensam plint |
| 3 I/O | Ingång/utgång (fabriksinställning: Disabled) |
| 4 I/O | Ingång/utgång (fabriksinställning: Disabled) |
| NC | Reläplint NC |
| C | Reläplint C |
| NO | Reläplint NO |
| A RS485 | Ledare A på *RS485*-bussen |
| B RS485 | Ledare B på *RS485*-bussen |

### Lysdiodernas indikering 

| Indikering | Lysdiodens status | Beskrivning |
|-----------|--------------|-------------|
| NETWORK | Fast grönt sken | Ansluten till mobilnätet |
| NETWORK | Blinkar gult | Indikering av mobilnätets signalstyrka från 0 till 5. Tillräcklig signalstyrka är 3. |
| DATA | Fast grönt sken | Ett meddelande skickas |
| DATA | Fast gult sken | Det finns osända händelsemeddelanden i databufferten |
| POWER | Blinkar grönt | Matningsspänningen är tillräcklig |
| POWER | Blinkar gult | Matningsspänningen är otillräcklig |
| POWER | Blinkar rött och gult | Konfigurationsläget är aktivt |
| TROUBLE | Släckt | Inga driftfel |
| TROUBLE | 1 blinkning | Inget SIM-kort isatt |
| TROUBLE | 2 blinkningar | SIM-kortets PIN-kod är felaktig |
| TROUBLE | 3 blinkningar | Det går inte att ansluta till mobilnätet |
| TROUBLE | 4 blinkningar | Det går inte att ansluta till GATOR eller till den primära IP-mottagaren |
| TROUBLE | 5 blinkningar | Det går inte att ansluta till backup-IP-mottagaren |
| TROUBLE | 6 blinkningar | Den interna klockan är inte inställd |
| TROUBLE | 7 blinkningar | Matningsspänningen är otillräcklig |

Om lysdioderna inte indikerar något, kontrollera matningen och anslutningarna.

!!! note "Obs!"
    Innan du börjar installationen, kontrollera att du har de nödvändiga
    komponenterna:
    
    1.  USB Mini-B-kabel för konfigurering.
    
    2.  Kabel med minst 4 ledare för anslutning av styrenheten.
    
    3.  Platt skruvmejsel, 2,5 mm.
    
    4.  Extern mobilantenn om mottagningen är svag i området.
    
    5.  Aktiverat nano-SIM-kort (PIN-kodsbegäran kan vara avstängd).
    
    6.  Instruktionsboken för den automatiska porten som den mobilanslutna styrenheten ska anslutas till.
    
    Beställ de nödvändiga komponenterna separat från din lokala återförsäljare.
### Leveransomfattning för den mobilanslutna styrenheten *GATOR* 

|  \- | Mobilansluten styrenhet GATOR   | 1 st.  |
|----:|-----------------------------------|--------|
|  \- | Mobilantenn                       | 1 st.  |
|  \- | Motstånd 10 kΩ                    | 3 st. |
|  \- | Dubbelhäftande tejp (5 cm) | 1 st.  |
|  \- | Skruv                             | 2 st. |

## Kopplingsscheman för den mobilanslutna styrenheten 

### Montering 

1.  Ta av locket. Dra ut plintblockets löstagbara del.

2.  Ta ut kretskortet.

3.  Fäst kapslingens bottendel på önskad plats med skruvar.

4.  Sätt tillbaka kretskortet och plintblocket.

5.  Skruva fast mobilantennen.

6.  Sätt i nano-SIM-kortet.

7.  Stäng locket.

<img alt="Två monteringsritningar. Vänster: kretskortets hållare är inringad, med en pil åt vänster för borttagning. Höger: två skruvhål i kapslingens bottendel är inringade." src="./image5.webp" style="width:3.4645669291338583in;height:1.7716535433070866in" />

<img alt="Ett nano-SIM-kort visas när det förs i pilens riktning in i facket på styrenhetens kretskort." src="./image6.webp" style="width:2.2913385826771653in;height:0.984251968503937in" />

### Anslutning av matningen 

Anslut styrenheten med ledare enligt schemat nedan.

<img alt="Kopplingsschema: matning och portstyrning till GATOR. Matning: ~230 V via säkring FU 125 mA, 250 V till en transformator ~230 V/16 V, 10 VA, 50 Hz; dess sekundärsida ansluts till AC/+ DC och AC/- DC. Ett alternativt DC-nätaggregat anges som 9–32 V, 0,2 A. Portstyrning: kontakterna C och NO på 5 OUT, märkdata 1 A / 30 V DC eller 0,5 A / 125 V AC." src="./image7.webp" style="width:4.0in;height:2.8464566929133857in" />

### Anslutning av ingångar 

Styrenheten har fyra ingångar IN (varav två är universella och kan fungera antingen som ingångar eller som utgångar) för anslutning av olika larmdetektorer. Ingångarna kan fungera i lägena NC, NO och EOL. Anslut ingångarna enligt den inställda ingångstypen (NC, NO, EOL) som i schemana nedan:

<img alt="Fyra ingångskretsar från COM till INx. Normalt öppen (NO): NO-kontakt; Short – Alarm, Open – Restore. Normalt sluten (NC): NC-kontakt; Short – Restore, Open – Alarm. Normalt sluten med slutmotstånd 10k (EOL): NC-kontakt och seriekopplat 10k-motstånd; Short – Alarm, Open – Alarm, 10k – Restore. Normalt öppen med slutmotstånd 10k (EOL): NO-kontakt och parallellkopplat 10k-motstånd; Short – Alarm, Open – Alarm, 10k – Restore." src="./image8.webp" style="width:5.417322834645669in;height:1.7007874015748032in" />

### Anslutning av reläet 

Ovan visas schemat för anslutning av reläet när styrenheten är ansluten till en DC-matning. Med reläets plintar kan man fjärrstyra (slå på/stänga av) olika elektriska enheter. Styrenhetens I/O-plint måste vara inställd på utgångsläge (OUT).

<img alt="Kopplingsschema: GATOR till ett externt relä. GATOR AC/+DC och xI/O ansluts till reläspolen; reläet har kontaktplintarna NC, C och NO." src="./image9.webp" style="width:2.4645669291338583in;height:0.8740157480314961in" />

### Anslutning av portautomatik till styrenheten 

<img alt="Kopplingsschema: portautomatikens styrenhet till GATOR via relä K1. Matning: portens 24 V till GATOR AC/+ DC, 0 V till AC/- DC. Portens läge: portens OUT och N till K1:s spole; K1:s kontakt mellan GATOR 1 IN och COM. Portstyrning: portens COM till GATOR 5 OUT C, portens IN till 5 OUT NO." src="./image10.webp" style="width:3.8858267716535435in;height:2.6692913385826773in" />

All inkoppling ska göras med matningen frånkopplad. / Portautomatikens plintars funktioner och spänningar beskrivs i detalj i portens instruktionsbok. / Portens plintar IN och COM används för att styra porten. / Portautomatiken har en utgång (OUT) för portens läge som visar när porten är stängd och när den är öppen. Utgången för portens läge kan vara en spänningsutgång eller en reläutgång. I schemat är relä K1 anslutet till portens spänningsutgång. Mellan portautomatikens spänningsutgångar OUT och N finns spänning (~230 V) när porten är öppen. Mellanreläet K1 är påslaget när porten är öppen och aktiverar styrenhetens ingång 1IN. Läget på styrenhetens ingång 1IN ger exakt information om portens läge (när porten är stängd och när den är öppen).

### Anslutning av RFID-läsare (Wiegand 26/34) 

Hur styrenheten konfigureras med en RFID-läsare beskrivs i avsnitt 5.3 ”Fönstret ”IN/OUT””.

Schema för anslutning av en RFID-läsare till styrenheten GATOR.

<img alt="Kopplingsschema: en RFID-läsare Wiegand 26/34 med knappsats och en utpasseringsknapp (Exit) till GATOR. DC-matning 9–16 V, 0,5 A till AC/+ DC och AC/- DC. Läsare: R röd (+U) till AC/+ DC, G grön (D0) till 1 IN, W vit (D1) till 2 IN, B svart (GND) till COM. Utpasseringsknappen mellan COM och 3 I/O. Portstyrning på 5 OUT C och NO, märkdata 1 A / 30 V DC eller 0,5 A / 125 V AC." src="./image11.webp" style="width:4.590009842519685in;height:3.9033409886264216in" />

I programmet TrikdisConfig ska du ange att en RFID-läsare och knappen ”**Exit**” används. När knappen ”**Exit**” trycks in aktiveras styrenhetens utgång 5OUT under den inställda pulstiden. När knappen ”**Exit**” inte är ansluten till styrenheten behöver du inte markera fältet ”**IO3** **as exit button**”.

<img alt="TrikdisConfig Gator, fönstret IN/OUT. Under Tag reader settings är Wiegand reader mode inställt på Single Reader och IO3 as exit button (5 OUT) är markerat." src="./image12.webp" style="width:7.086614173228346in;height:2.594488188976378in" />

Schema för anslutning av två RFID-läsare till styrenheten GATOR.

<img alt="Kopplingsschema: RFID-läsare Wiegand 26/34 för in- och utpassering, med knappsatser, till GATOR. DC-matning 9–16 V, 0,5 A till AC/+ DC och AC/- DC. Båda läsarna: R röd (+U) till AC/+ DC och B svart (GND) till COM. Inpasseringsläsarens G grön (D0) till 1 IN, W vit (D1) till 2 IN; utpasseringsläsarens G till 3 I/O, W till 4 I/O. Portstyrning på 5 OUT C och NO, märkdata 1 A / 30 V DC eller 0,5 A / 125 V AC." src="./image13.webp" style="width:4.830009842519685in;height:3.9000076552930882in" />

När två RFID-läsare ansluts till styrenheten ska du ange i programmet TrikdisConfig att två RFID-läsare används.

<img alt="TrikdisConfig Gator, fönstret IN/OUT. Under Tag reader settings är Wiegand reader mode inställt på Dual Reader." src="./image14.webp" style="width:7.086614173228346in;height:2.4448818897637795in" />

### Anslutning av WiFi-modulen W485 

Styrenhetens firmwareversion från 1.06. / Modulen *W485* skickar meddelanden till larmcentralen (CMS) och till appen *Protegus2* via en WiFi-router. När WiFi-anslutning finns skickar styrenheten händelsemeddelanden via modulen *W485*. Om WiFi-anslutningen avbryts skickar styrenheten meddelandena via GPRS. När WiFi-anslutningen är återupprättad går styrenheten tillbaka till att skicka meddelanden via *W485*. / Hur WiFi-modulen *W485* konfigureras för att fungera med styrenheten beskrivs i avsnitt 5.4 ”Fönstret ”Modules””. / Du behöver inget SIM-kort när du använder *W485* med styrenheten*.*

<img alt="Kopplingsschema: GATOR till W485. Matning 10–28 V DC, 0,5 A: plus till GATOR AC/+ DC och W485 + DC; minus till GATOR AC/- DC och W485 - DC, sammanförda i kopplingspunkter. RS485-anslutning upp till 100 m: GATOR A 485 till W485 A 485, B 485 till B 485." src="./image15.webp" style="width:3.141732283464567in;height:2.1496062992125986in" />

### Anslutning av Ethernet-modulen E485 

Styrenhetens firmwareversion från 1.06. / Modulen *E485* skickar meddelanden till larmcentralen (CMS) och till appen *Protegus2* via en trådbunden internetanslutning. När *E485* används med styrenheten skickas meddelanden till larmcentralen och *GATOR*-meddelanden över trådbundet internet, och mobilt internet används inte. Om den trådbundna internetanslutningen avbryts skickar styrenheten meddelandena via mobilt internet. När den trådbundna internetanslutningen är återupprättad börjar styrenheten skicka meddelanden via *E485* igen. / Hur modulen *E485* konfigureras för att fungera med styrenheten beskrivs i avsnitt 5.4 ”Fönstret ”Modules””. / Du behöver inget SIM-kort när du använder *E485* med styrenheten*.*

<img alt="Kopplingsschema: GATOR till E485. Matning 10–28 V DC, 0,5 A: plus till GATOR AC/+ DC och E485 + DC; minus till GATOR AC/- DC och E485 - DC, sammanförda i kopplingspunkter. RS485-anslutning upp till 100 m: GATOR A 485 till E485 A 485, B 485 till B 485." src="./image16.webp" style="width:3.141732283464567in;height:2.1496062992125986in" />

### Anslutning av utbyggnadsmodulen iO-LORA med RFID-läsare 

Styrenhetens firmwareversion från 2.13.

Anslut radiotransceivern RF-LORA till styrenheten GATOR. Därefter kan du använda utbyggnadsmodulen iO-LORA, som RFID-läsaren (Wiegand 26/34) är ansluten till. RFID-läsaren styr PGM-utgången på den utbyggnadsmodul iO-LORA som den är ansluten till.

<img alt="Kopplingsschema: GATOR till RF-LORA och utbyggnadsmoduler iO-LORA. Gemensam DC-matning 9–16 V, 0,5 A: GATOR AC/+ DC till RF-LORA + DC, AC/- DC till - DC; A RS485 till A RS485, B RS485 till B RS485. Trådlös förbindelse från RF-LORA till iO-LORA, upp till 5 000 m; modulerna 1* till 8* visas, var och en med 9–16 V matning. På iO-LORA 1*: RFID-läsare Wiegand 26/34, R röd (+U) till +DC, B svart (GND) till -DC, G grön (D0) till D0, W vit (D1) till D1. Utpasseringsknapp mellan COM och IN; portstyrning på C och NO, märkdata 2 A / 230 V AC." src="./image17.webp" style="width:7.086805555555555in;height:5.251388888888889in" />

Starta TrikdisConfig. Anslut GATOR till datorn med en USB Mini-B-kabel eller på distans. Klicka på knappen **Read [F4]** så visar TrikdisConfig styrenhetens aktuella inställningar. Ange vid behov administratörskoden eller installatörskoden (6 siffror) i fönstret som öppnas. Välj ”**iO-LORA controller**” i listan ”**Modules**”. Ange enhetens serienummer i fältet ”**Serial No.**”.

<img alt="TrikdisConfig Gator, skärmen Modules. Den markerade raden visar iO-LORA controller som Module; fältet Serial No. är markerat för inmatning." src="./image18.webp" style="width:7.086614173228346in;height:1.3700787401574803in" />

I listan ”**IN/OUT**” måste ”**EXIT button**” anges som funktion för ingången ”**6 IN**”. När knappen ”**Exit**” trycks in aktiveras utgången ”**7 OUT**” på iO-LORA under den inställda pulstiden.

<img alt="TrikdisConfig Gator, skärmen IN/OUT. Under Input/Output settings visar fältet Function för 6 IN värdet Exit butt; 7 OUT är inställd som Output med Type Pulse och en puls på 3 sekunder." src="./image19.webp" style="width:7.086614173228346in;height:2.283464566929134in" />

I listan ”**Users**” anger du RFID-brickans nummer och användarens namn, aktiverar behörigheten att styra PGM-utgången, anger vilken PGM-utgång användaren ska styra samt koden. När inställningarna är klara, klicka på **Write [F5]**. Vänta tills uppdateringen av styrenhetens inställningar är klar. Klicka på ”**Disconnect**” och koppla bort USB-kabeln.

<img alt="TrikdisConfig Gator, skärmen User list. En markerad användarrad har fälten E-mail address, Phone/RFID, Name och Code ifyllda, En markerat och utgång 7 markerad." src="./image20.webp" style="width:7.086614173228346in;height:2.9015748031496065in" />

Aktivera PGM-utgången med RFID-bricka eller kod. Tryck på knappen ”**Exit**” (PGM-utgången ska aktiveras under den inställda pulstiden).

### Anslutning av utbyggnadsmodulen iO8 eller iO8-LORA 

Styrenheten *GATOR* kan anslutas till en utbyggnadsmodul *iO8* eller *iO8-LORA* för att öka antalet ingångar (IN) och utgångar (OUT). En utbyggnadsmodul *iO8* eller *iO8-LORA* kan anslutas till styrenheten. / Kopplingsschema för utbyggnadsmodulen *iO8*.

<img alt="Kopplingsschema: GATOR till iO8. Matning (10–28 V DC, 0,5 A): plus till GATOR AC/+ DC och iO8 + DC; minus till GATOR AC/- DC och iO8 - DC, sammanförda i kopplingspunkter. RS485-anslutning (upp till 100 m): GATOR A RS485 till iO8 A, GATOR B RS485 till iO8 B." src="./image21.webp" style="width:3.346673228346457in;height:2.1333377077865268in" />

Kopplingsschema för utbyggnadsmodulen iO8-LORA.

<img alt="Kopplingsschema: GATOR till RF-LORA och trådlöst till iO8-LORA. GATOR till RF-LORA: AC/+ DC till + DC, AC/- DC till - DC, A RS485 till A 485, B RS485 till B 485. DC-matning (9–16 V, 0,5 A) ansluter till de två första förbindelserna i kopplingspunkter. RF-LORA till iO8-LORA: trådlös förbindelse upp till 5 000 m. Separat 9–16 V matning till iO8-LORA +DC och -DC." src="./image22.webp" style="width:5.936678696412948in;height:1.94667104111986in" />

## Snabbinstallation av styrenheten 

!!! note "Obs!"
    Styrenheten levereras fabriksinställd så att den fungerar direkt. Ett
    samtal från vilken telefon som helst till styrenhetens SIM-kortsnummer
    slår på reläutgången 5 OUT i 3 (tre) sekunder. Styrenheten kan
    installeras utan någon ytterligare konfigurering om det driftsätt är
    acceptabelt.
1.  Ett nano-SIM-kort måste sättas i styrenheten. Stäng av PIN-kodsbegäran för kortet innan du sätter i det i styrenheten.

2.  Anslut en matningskälla till styrenheten (se 2 ”Kopplingsscheman för den mobilanslutna styrenheten”).

3.  Slå på matningen till styrenheten. Då ska styrenhetens lysdioder visa följande:

- Indikeringen ”POWER” ska blinka grönt.

- Indikeringen ”NETWORK” ska ha fast grönt sken och blinka gult.

Med förvalda inställningar kan vem som helst styra styrenheten genom att ringa till telefonnumret för SIM-kortet i styrenheten.

Om du bara vill låta vissa personer styra styrenheten, skicka ett SMS-kommando med telefonnumren till de behöriga användarna (exempel på SMS-kommando: ***SETU 123456 +370xxxxxxxx#Peter#peter@trikdis.com**).* Efter att ha tagit emot kommandot reagerar styrenheten bara på telefonnumren i listan. Styrenheten ignorerar inkommande samtal från andra nummer.

!!! note "Obs!"
    Om du vill ändra de förvalda inställningarna eller slå på andra
    funktioner i styrenheten, se avsnitt 5 ”Ställa in parametrar med
    programvaran TrikdisConfig”.
## Fjärrstyrning 

### Styrning med telefonsamtal 

!!! note "Obs!"
    Den som först ringer till styrenheten (eller skickar ett SMS till den)
    blir systemets administratör och är den enda som kan administrera och
    styra styrenheten med SMS-kommandon.
Ring till numret för SIM-kortet i styrenheten. Styrenheten avvisar samtalet automatiskt och slår på *reläutgången 5 OUT* i *3 (tre)* sekunder. Med förvalda inställningar kan vem som helst styra genom att ringa till numret för SIM-kortet i styrenheten.

### Styrning med telefonens knappsats 

Styrenheten svarar och låter användaren styra utgångarna med ett telefonsamtal om användaren har behörighet att styra flera utgångar OUT:

1.  Ring till numret för styrenhetens SIM-kort. Styrenheten besvarar samtalet.

2.  Slå styrkommandot på telefonens knappsats (exempel på kommandon finns i tabellen **DTMF-styrkommandon**).

#### DTMF-styrkommandon (fungerar inte med modulerna GV17_2E70 och GV17_2S70)

| DTMF-kod | Funktion | Beskrivning |
|-----------|----------|-------------|
| OUTPUT*STATE# | Styrning av utgång | Kommando för att styra en utgång (slå på/stänga av; slå på/stänga av under pulstiden). OUTPUT – numret på utgången som styrs. STATE – styrkommando: 0 – stänga av utgången; 1 – slå på utgången; 2 – stänga av utgången under pulstiden; 3 – slå på utgången under pulstiden; (utgångens pulstid kan ställas in med programmet TrikdisConfig, i tabellen Input/Output settings) # – tecken som avslutar kommandot. T.ex. (slå på utgång 5): 5*1# T.ex. (slå på ingång 4 under pulstiden): 4*3# |
| # | Tecken som avslutar kommandot | Om du gjorde ett misstag när du slog kommandot, slå # och ange styrkommandot på nytt. |

### Styrning med molntjänsten *Protegus2* Cloud 

Med molntjänsten Protegus2 kan användarna fjärrstyra styrenheten. De kan också se systemets status och ta emot alla systemets händelsemeddelanden.

1.  Ladda ned och starta appen Protegus2 eller använd webbversionen av Protegus2 på [www.protegus.app](https://www.protegus.app).

    <div style="margin: 20px 0; text-align: center;">
      <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-android.webp" alt="Hämta på Google Play" style="height:50px;">
      </a>
      <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-web.webp" alt="Öppna webbappen" style="height:50px;">
      </a>
      <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;">
        <img src="./protegus-ios.webp" alt="Hämta på App Store" style="height:50px;">
      </a>
    </div>

2.  Logga in med ditt användarnamn och lösenord, eller registrera dig och skapa ett nytt konto.

!!! warning "Viktigt"
    När du lägger till styrenheten i appen Protegus2:

    1.  Tjänsten Protegus måste vara aktiverad. Hur tjänsten aktiveras
        beskrivs i avsnitt 5.5 ”Fönstret ”IP reporting””;

    2.  Matningen måste vara påslagen (lysdioden ”POWER” måste blinka
        grönt);

    3.  Styrenheten måste vara registrerad på nätet (lysdioden ”NETWORK”
        måste ha fast grönt sken och blinka gult).
3. Välj ”**Add new system**”.

<img alt="Sidomenyn i appen Protegus2 med Add new system markerat." src="./image27.webp" style="width:2.7559055118110236in;height:2.5826771653543306in" />

4. Ange styrenhetens ”Unique ID (IMEI)”, som finns på produkten eller på etiketten på förpackningen. Tryck på ”**Next**”.

<img alt="Protegus2, skärmen Scan QR code. Fältet Unique ID/IMEI, QR-koden på en exempeletikett och knappen Next är markerade; en knapp Scan QR code finns också." src="./image28.webp" style="width:2.7559055118110236in;height:4.606299212598425in" />

5. Ange systemets namn. Tryck på ”**Next**”.

<img alt="Protegus2, skärmen Add new system. Name är satt till Gator, Time zone visar Europe/Kaliningrad och Next är markerat." src="./image29.webp" style="width:2.7559055118110236in;height:2.7598425196850394in" />

6. Tryck på ”**Skip**”.

<img alt="Protegus2, skärmen System added successfully. Den erbjuder Personalize för att ändra standardnamnen och har Skip markerat för att ändra dem senare." src="./image30.webp" style="width:2.7559055118110236in;height:3.8464566929133857in" />

7. Vänta 1 minut.

<img alt="Protegus2, systemskärmen Gator med statusen Online och en reglerruta Output5. En banderoll anger att det kan ta upp till 1 minut innan systemet är helt driftklart." src="./image31.webp" style="width:2.7559055118110236in;height:2.405511811023622in" />

8. Aktivera PGM-utgången genom att trycka på ikonen ”**Output5**”.

<img alt="Protegus2, systemskärmen Gator med statusen Online; reglerrutan Output5 är markerad." src="./image32.webp" style="width:2.7559055118110236in;height:2.0in" />

### Lägga till en widget på telefonen 

Widgeten för portstyrning kan läggas på telefonens startskärm. Styrenheten måste vara registrerad i molntjänsten Protegus2. Logga in i appen Protegus2 på telefonen. Stäng fönstret för Protegus2.

Tryck på skärmen med fingret och håll kvar. En inställningsrad visas.

1.  Tryck på ”**Widgets**”**.**

<img alt="Androids startskärm i redigeringsläge. Markering 1 pekar ut Widgets i inställningsraden längst ned." src="./image33.webp" style="width:2.7559055118110236in;height:3.02755905511811in" />

Leta upp Protegus2 i inställningsraden.

2. Välj ”Protegus2”.

<img alt="Androids widgetväljare. Markering 2 pekar ut widgetgruppen Protegus 2." src="./image34.webp" style="width:2.7559055118110236in;height:3.0708661417322833in" />

3. Tryck på ”**Switch** **Protegus2**”.

<img alt="Androids widgetväljare med widgetar för Protegus 2. Markering 3 pekar ut widgeten Switch Protegus 2." src="./image35.webp" style="width:2.7559055118110236in;height:3.0708661417322833in" />

4. Välj styrenhetens utgång ”**Gator Output5**”.

5.  Tryck på ”**ADD WIDGET**”.

<img alt="Protegus, skärmen för val av utgång till widgeten. Markering 4 visar det valda alternativet Gator Output5; markering 5 pekar ut ADD WIDGET." src="./image36.webp" style="width:2.7559055118110236in;height:2.2755905511811023in" />

6. En ikon visas på telefonens skärm.

<img alt="Markering 6 visar strömknappswidgeten Output5 i widgetväljaren för Protegus 2. Nedanför visas Switch Protegus 2 som en widget på 1 x 1." src="./image37.webp" style="width:2.7559055118110236in;height:3.1141732283464565in" />

7. Gå tillbaka till startskärmen. Tryck på ikonen.

<img alt="Telefonens startskärm med markering 7 runt den grå strömknappswidgeten Output5, bredvid appikonen för Protegus 2." src="./image38.webp" style="width:2.7559055118110236in;height:1.6456692913385826in" />

En cirkel som visar när PGM-utgången är påslagen visas på skärmen.

<img alt="Telefonens startskärm med den grå widgeten Output5 bredvid appikonen för Protegus 2. En stor vit cirkel med en grå strömknapp och en liten uppdateringssymbol visas under." src="./image39.webp" style="width:2.7559055118110236in;height:2.8818897637795278in" />

8. När styrenheten är ansluten till portautomatik med indikering av portens läge visar ikonen om porten är öppen eller stängd.

<img alt="Telefonens startskärm med markering 8 runt widgeten Output5, vars strömknapp är grön." src="./image40.webp" style="width:2.7559055118110236in;height:1.5393700787401574in" />

### Lägga till användare på telefonen 

| Starta appen Protegus2 på telefonen. Logga in med ditt användarnamn och lösenord. 1. Tryck på ”Settings”. |  |
|-----------------------------------------------------------------------------------------------------------|--|
| Tryck på ”System configuration”. |  |
| Tryck på ”Users”. |  |
| Tryck på ”Add new user”. |  |
| Ange användarens e-postadress. Ange användarens namn. Ange användarens telefonnummer. Välj den PGM-utgång som användaren ska styra. Tryck på ”Add user”. |  |
| Den nya användaren visas i användarlistan. Klicka på ”Back” för att återgå till huvudfönstret. |  |

### Styrning med SMS 

Styr reläutgången OUT5 med dessa SMS-kommandon:

> #### OUTPUT5 xxxxxx ON
>
> #### OUTPUT5 xxxxxx OFF
>
> #### OUTPUT5 xxxxxx PULSE=002

| xxxxxx | Administratörens lösenord, 6 tecken (förval: 123456). |
|----|----|
| ON | Slå på utgången. |
| OFF | Stäng av utgången. |
| PULSE=ttt | Slå på utgången under en angiven tid. ”ttt” är pulstiden i sekunder. |

Du kan styra andra utgångar med SMS, men först måste de aktiveras i TrikdisConfig.

Lista över SMS-styrkommandon

| Kommando | Data | Beskrivning |
|---------|------|-------------|
| OUTPUTx | ON | Slå på utgången. ”x” – utgångens nummer. T.ex.: OUTPUT5 123456 ON |
| OUTPUTx | OFF | Stäng av utgången. ”x” – utgångens nummer. T.ex.: OUTPUT5 123456 OFF |
| OUTPUTx | PULSE=ttt | Slå på utgången under en viss tid. ”ttt” är pulstiden i sekunder, från 1 till 999. T.ex.: OUTPUT5 123456 PULSE=002 |

### Konfigurering med SMS 

1.  **Ändra administratörens lösenord**

Ändra det förvalda administratörslösenordet av säkerhetsskäl. Skicka ett SMS i detta format:

#### PSW 123456 xxxxxx

| 123456 | Förvalt administratörslösenord.      |
|--------------|--------------------------------------|
| xxxxxx | Nytt administratörslösenord, 6 tecken. |

1.  **Låt bara behöriga användare styra systemet**

Du kan låta bara vissa personer styra systemet. Skicka SMS med användarnas telefonnummer och namn från en administratörs telefon:

#### SETU xxxxxx +PHONENO#NAME#EMAIL

| xxxxxx  | Administratörens lösenord, 6 tecken. |
|---------------|----------------------------------|
| PHONENO | Användarens telefonnummer.             |
| NAME    | Användarens namn.                     |
| EMAIL   | Användarens e-postadress.                   |

När det första numret har lagts till i styrenhetens lista över användarnas telefonnummer reagerar styrenheten bara på samtal från numren i listan. Styrenheten ignorerar samtal från andra nummer.

1.  **Ge administratörsbehörighet till en annan användare**

Du kan ge andra personer administratörsbehörighet. De får då systemets informationsmeddelanden och kan lägga till användare. Skicka ett SMS i detta format:

#### SETA xxxxxx Nox=+PHONENO#NAME#EMAIL

| xxxxxx | Administratörens lösenord, 6 tecken. |
|----|:---|
| Nox | x – administratörens nummer i listan. (Om du skriver **1** överför du din administratörsbehörighet till en annan användare.) |
| PHONENO | administratörens telefonnummer. |
| NAME | administratörens namn eller e-postadress. |
| EMAIL | administratörens e-postadress. |

Lista över SMS-konfigureringskommandon

| Kommando | Data | Beskrivning |
|---------|------|-------------|
| INFO |  | Begär information om styrenheten. Svaret innehåller: styrenhetens typ, IMEI-nummer, mobilnätets signalstyrka, matningsspänning, programvaruversion, serienummer, datum och tid. T.ex.: INFO 123456 |
| ASKI |  | Förfrågan om ingångarnas status. T.ex.: ASKI 123456 |
| ASKO |  | Förfrågan om utgångarnas status. T.ex.: ASKO 123456 |
| SETA | NoX=phoneno#name#email | Lägg till en administratör i listan (administratörens nummer från 1A till 7A). Lägger till telefonnummer, namn och e-postadress på den angivna raden. Numret måste skiljas från namnet med ett brädgårdstecken (#). Numret måste börja med ”+” och landskoden. / T.ex.: SETA 123456 No3=+37061234567#John#john_M@trikdis.com |
| SETA | NoX=DEL | Tar bort telefonnummer och namn från den angivna raden. / T.ex.: SETA 123456 No2=DEL |
| SETU | phoneno#name#email | Lägg till en ny användare (användarnummer från 11 till 1010). Lägger till telefonnummer, namn och e-postadress i listan. Numret måste skiljas från namnet med ett brädgårdstecken (#). Numret måste börja med ”+” och landskoden. / T.ex.: SETU 123456 +37061234567#Peter#peter@trikdis.com |
| DELU | phoneno | Ta bort användaren med det angivna telefonnumret. T.ex.: DELU 123456 +37061234567 |
| DELU | name | Ta bort användaren med det angivna namnet. T.ex.: DELU 123456 Peter |
| SETB | Email/phoneNo | Lägg till en post i spärrlistan (e-postadress; telefonnummer). / T.ex.: SETB 123456 john_S@trikdis.com / T.ex.: SETB 123456 +37060123456 |
| DELB | ALL | Ta bort hela spärrlistan. T.ex.: DELB 123456 ALL |
| DELB | Email/phoneNo | Ta bort en viss post från spärrlistan (i e-postfältet har stora och små bokstäver betydelse). / T.ex.: DELB 123456 john_S@trikdis.com / T.ex.: DELB 123456 +37060123456 |
| RESET |  | Starta om styrenheten. T.ex.: RESET 123456 |
| PSW | New password | Ändra lösenordet. T.ex.: PSW 123456 654123 |
| TXTA | Object name | Ange anläggningens namn. T.ex.: TXTA 123456 House |
| TXTE | N1= / …… / N5= | Ange SMS-text om aktivering av en ingång eller utgång. N1…N5 är numret på kontakten på plintblocket. / T.ex.: TXTE 123456 N1=Alarm in the living room |
| TXTR | N1= / …… / N5= | Ange SMS-text om återställning av en ingång eller utgång. N1…N5 är numret på kontakten på plintblocket. / T.ex.: TXTR 123456 N5=Relay turn off |
| SETD | IDx=yy | Ange inaktivitetstid för ingång ”x”. ”yy” är inaktivitetstiden i minuter, från 0 till 2880. När ingången aktiveras skickar styrenheten en avisering och reagerar inte på fler avbrott i slingan under den inställda inaktivitetstiden. Om 0 anges är inaktivitetstiden avstängd. T.ex.: SETD 123456 ID1=30 |
| RESD | IDx | Återställer inaktivitetstiden för ingång ”x” om nedräkningen har startat. / T.ex.: RESD 123456 ID1 |
| TIME | YYYY/MM/DD, / HH:mm:ss | Ställ in datum och tid. / T.ex.: TIME 123456 2025/05/09,10:03:00 |
| RDR | PhoneNO#SMStext | Vidarebefordrar SMS-texten till det angivna numret. / T.ex.: RDR 123456 +37061234567#Refill account by 10EUR |
| HELLO | ON | Aktivera funktionen som med SMS informerar en ny användare om att han eller hon har lagts till i styrenheten GATOR via appen Protegus2 eller med SMS. / T.ex.: HELLO 123456 ON |
| HELLO | OFF | Avaktivera funktionen som med SMS informerar en ny användare om att han eller hon har lagts till i styrenheten GATOR via appen Protegus2 eller med SMS. / T.ex.: HELLO 123456 OFF |
| NATH | ON | Aktivera driftläget ”Not authorized” utan att ändra några andra parametrar. / T.ex.: NATH 123456 ON / Om styrenheten styr flera PGM-utgångar blir SMS:et så här (aktiverar ”Not authorized” och de angivna PGM-utgångarna och avaktiverar resten): / T.ex.: NATH 123456 ON=5,7,22 |
| NATH | OFF | Avaktivera läget ”Not authorized”. / T.ex.: NATH 123456 OFF |
| UUSD | *UUSD code# | Skickar en UUSD-kod till mobiloperatören. Operatörens UUSD-koder används för att kontrollera eller fylla på SIM-kortets saldo och för liknande åtgärder. / T.ex.: UUSD 123456 *245# |
| CONNECT | Protegus=ON | Anslut till molntjänsten Protegus. T.ex.: CONNECT 123456 PROTEGUS=ON |
| CONNECT | Protegus=OFF | Koppla från molntjänsten Protegus. T.ex.: CONNECT 123456 PROTEGUS=OFF |
| CONNECT | APN=Internet | APN-namn. T.ex.: CONNECT 123456 APN=INTERNET |
| CONNECT | USER=user | APN-användarnamn. T.ex.: CONNECT 123456 USER=User |
| CONNECT | PSW=password | APN-lösenord. T.ex.: CONNECT 123456 PSW=password |
| CONNECT | Code=password | Ändra inloggningslösenordet till Protegus Cloud. / T.ex.: CONNECT 123456 Code=123456 |

## Ställa in parametrar med programvaran *TrikdisConfig* 

Med TrikdisConfig kan du ändra styrenhetens inställningar (om de förvalda inställningarna inte räcker) enligt beskrivningarna av programfönstren nedan.

1.  Ladda ned konfigurationsprogrammet TrikdisConfig från [www.trikdis.com/lt](http://www.trikdis.com/lt)/ (skriv ”TrikdisConfig” i sökfältet) och installera det.

2.  Ta av styrenhetens lock med en platt skruvmejsel enligt bilden nedan:

<img alt="Tre ritningar, från vänster till höger: håll styrenheten och för in en platt skruvmejsel i spåret i locket; för skruvmejseln nedåt för att lossa locket; leta upp USB Mini-B-kontakten." src="./image47.webp" style="width:5.905511811023622in;height:1.562992125984252in" />

1.  Anslut styrenheten till en dator med en USB Mini-B-kabel.

2.  Starta konfigurationsprogrammet TrikdisConfig. Programmet identifierar den anslutna enheten automatiskt och öppnar styrenhetens konfigurationsfönster automatiskt.

3.  Klicka på **Read [F4]** för att se styrenhetens aktuella parametrar. Ange vid uppmaning administratörens eller installatörens kod i fönstret som öppnas.

!!! note "Obs!"
    Knappen **Read [F4]** gör att programmet läser och visar de
    inställningar som för tillfället är sparade i enheten. / Knappen
    **Write [F5]** sparar de inställningar som gjorts i programmet i
    enheten. / Knappen **Save [F9]** sparar inställningarna i en
    konfigurationsfil. Du kan senare ladda de sparade inställningarna till
    andra enheter. Då kan du snabbt konfigurera flera enheter med samma
    inställningar. / Knappen **Open [F8]** låter dig välja en
    konfigurationsfil och öppna sparade inställningar. / Om du vill
    återgå till de förvalda inställningarna, klicka på knappen
    ”**Restore**” längst ned till vänster i fönstret.
### Statusfältet i TrikdisConfig 

När styrenheten har anslutits till programvaran TrikdisConfig visar programvaran information om den anslutna enheten i statusfältet:

<img alt="Statusfältet i TrikdisConfig med fältet IMEI/Unique ID, Status: reading done, Device: GV17_2200, ett fält för serienumret, BL: 2.02, FW: 2.16, fältet State och USB-anslutning." src="./image48.webp" style="width:7.086614173228346in;height:0.6614173228346457in" />

| Namn           | Beskrivning                                               |
|----------------|-----------------------------------------------------------|
| IMEI/Unique ID | Enhetens IMEI-nummer                                  |
| State          | Driftstatus                                               |
| Device         | Enhetstyp (måste visa GV17_xxxx)                   |
| SN             | Enhetens serienummer                                      |
| BL             | Version av starthanteraren                                |
| FW             | Enhetens firmwareversion                                  |
| HW             | Enhetens hårdvaruversion                                  |
| State          | Typ av anslutning till programvaran (med USB eller på distans) |
| Role           | Åtkomstnivå (visas när åtkomstkoden har godkänts)         |

När du klickar på knappen **Read [F4]** läser och visar programmet de inställningar som för tillfället är sparade i styrenheten. Justera de inställningar du behöver i TrikdisConfig enligt beskrivningarna av programfönstren nedan.

### Fönstret ”System Options” 

<img alt="TrikdisConfig Gator, fönstret System Options. General settings visar Object ID 0000, Object name GV17, Time set till GSM modem, Administrator Code 123456, Text language Baltic och Modem reboot avstängd. SIM settings visar APN internet med Auto markerat. Tidszonen är +2 timmar med sommartid markerat; Periodical Test är avstängd." src="./image49.webp" style="width:7.086614173228346in;height:4.188976377952756in" />

**Inställningsgruppen ”General”**

- **Object ID** – ange abonnentkoden (hexadecimalt tal med 4 tecken, 0–9, A–F) som larmcentralen har tilldelat (**använd inte FFFE eller FFFF som Object ID**).

- **Object name** – varje händelse skickas med anläggningens namn.

- **Time set** – välj källa för att ställa in tiden.

- **SMS time synchronization** – markera kryssrutan och ange telefonnumret till styrenhetens SIM-kort. Telefonnumret måste anges med landskod.

- **Administrator Code** – med den här koden kan alla styrenhetens parametrar ändras.

- **Text language** – SMS skickas med tecken för det valda språket.

- **Hang-up after** – styrenheten avvisar samtalet efter den angivna tiden.

- **Modem reboot** – du kan ställa in att modemet startas om vid en angiven tidpunkt.

**Inställningsgruppen ”Periodical test”**

- **Test Enable** – om kryssrutan är markerad är periodiska testmeddelanden aktiverade.

- **Test period** – inställning av tidsperioden mellan testsändningarna.

- **Start test at** – inställning av starttid för testet.

- **Test SMS text** – ange texten i test-SMS:et.

- **To mobile application** – om kryssrutan är markerad skickas testmeddelandet till appen Protegus2.

**Inställningsgruppen ”SIM”**

- **SIM card PIN** – ange SIM-kortets PIN-kod.

- **APN** – ange APN-namnet. **Auto** – om kryssrutan är markerad söker SIM-kortet automatiskt efter en APN utifrån den interna listan. Den interna listan innehåller APN för flera globala mobiloperatörer och APN för inhemska mobiloperatörer i flera länder. Om mobiloperatören inte hittas används det APN-värde som angetts i fältet.

- **Login** – ange användarnamn om det krävs.

- **Password** – ange lösenord om det krävs.

- **Preferred operator** – om en kod anges i fältet ansluter styrenheten bara till den valda mobiloperatören. Mobiloperatörens kod består av koderna MCC + MNC. Den här inställningen är relevant för globala SIM-kort.

**Inställningsgruppen ”Time zone”**

I GATOR kan du ställa in aktuell tid för ditt land. Ange då landets ”**Time zone**” och om landet byter till sommartid (”**Daylight saving time**”).

- **Time zone (hours)** – markera kryssrutan och ange ditt lands tidszon.

- **Daylighting saving time** – markera kryssrutan om ditt land byter till sommartid.

**Inställningsgruppen ”SMS ack texts”**

Texten i de SMS som användaren får efter att ha skickat SMS-kommandon.

- **Force greeting message** – markera kryssrutan för att skicka ett SMS till en ny användare som har lagts till i styrenheten med SMS eller med appen Protegus2. (Funktionen kan stängas av med SMS (HELLO 123456 OFF).)

###  Fönstret ”IN/OUT” 

**Fliken ”IN/OUT”**

<img alt="TrikdisConfig Gator, fönstret IN/OUT, fliken IN/OUT. Tabellen Input/Output settings visar plint 1 IN som Input, plint 2 IN och plintarna 3 och 4 I/O som Disabled och plint 5 OUT som Output med namnet PGM5_5, Type Pulse och en puls på 5 sekunder. Tag reader settings och Work status settings visas nedanför." src="./image50.webp" style="width:7.086614173228346in;height:3.015748031496063in" />

**Inställningsgruppen ”Input/Output settings”**

- **Terminal** – styrenhetens plintnummer för ingångar och utgångar.

- **Function** – plintens typ (ingång, utgång, avstängd).

- **Name** – ange namnet på ingången IN eller utgången OUT.

- **SMS event text** – ange SMS-text för händelsen.

- **SMS restore text** – ange SMS-text för när plinten återställs.

- **Type** – ange ingångstyp (NC, NO, EOL=10 kΩ).

- **Inactive** – ingången är inaktiv under den angivna tiden efter första aktiveringen. Ange 0 om du vill stänga av funktionen.

- **Delay** – ingångens (sektionens) reaktionstid, ms.

- **CMS** – om kryssrutan är markerad skickas meddelandet till larmcentralen (CMS) och till appen Protegus2.

- **No rest.** – skicka inte återställningshändelsen.
- **Pulse** – tiden som utgången är påslagen när utgången är inställd på typen ”**Pulse**”.

- **Sched** – tilldela ett schemanummer för styrning av utgången.

- **Assign IN** – tilldela en ingång (IN) till utgången för att se enhetens verkliga läge beroende på ingångens status.

- **CID** – Contact ID-kod.

- **Confirm** – ange numret på den ingång som, när den utlöses, aktiverar styrningen av utgången (OUT).

- **CTRL by IN** – den valda ingången aktiverar utgången.

  **Inställningsgruppen ”Tag reader settings”**

- **Wiegand reader mode** – ange antalet RFID-läsare av typen Wiegand som är anslutna till styrenheten.

- **IO3 as exit button (5 OUT)** – markera kryssrutan om knappen ”Exit” är ansluten till styrenhetens ingång IO3 och aktivering av ingången IO3 ska utlösa utgången (5OUT) under den inställda pulstiden.

- **Low voltage reader** – markera kryssrutan så aktiveras läget för läsare med låg spänning.

- **Disable reader filter** – markera kryssrutan så avaktiveras enhetens interna filter för läsare som skickar korta pulser.

  **Inställningsgruppen ”Work status”**

- **Enable “work status” feature** – genom att markera kryssrutan aktiverar du indikeringen ”**Work status**” i appen Protegus2.

- **Entry/Exit event with output** – om fältet markeras skickas händelsemeddelanden om in- och utpassering när utgången fjärrstyrs.

- **Auto end of work** – du kan ange när tidsregistreringen ska avslutas.

- **End work at/after** – ange när tidsregistreringen av arbetstiden ska avslutas. Beroende på föregående inställning anges antingen en viss tid på dygnet eller ett tidsintervall.

  **Fliken ”Scheduler”**

  Utgångar kan styras automatiskt enligt ett inställt schema.

  <img alt="TrikdisConfig Gator, fönstret IN/OUT, fliken Scheduler. Schematabellen har kolumner för att aktivera, låsa, utgångsläge, helgdagar samt start- och sluttider per veckodag. Första raden visar Output Level, Start time 09:25 och End time 09:28." src="./image51.webp" style="width:7.086614173228346in;height:2.1811023622047245in" />

- **Name** – ange schemats namn.

- **Enable** – aktivera tidsschemat för när styrenheten ska styra utgången.

- **Lock** – markera kryssrutan för att hindra att utgången styrs på annat sätt när den utlöses enligt det angivna schemat.

- **MANUAL** – markera kryssrutan för att hindra schemaläggaren från att aktivera utgången vid start. Schemat börjar köras först när användaren aktiverar utgången.

- **Output mode** – ange PGM-utgångens driftsätt: ”**Level**” – utgången är aktiverad under den angivna tidsperioden; ”**Pulse**” **–** utgången aktiveras vid schemats början och slut under den inställda pulstiden.

- **Holiday mode** – ange hur tidsschemat ska fungera när helgdagar infaller.

- **Hol** – markera kryssrutan för att använda helgdagstider när helgdagar infaller.

- **Start time** – ange tidpunkt och veckodagar från när utgången ska vara påslagen.

- **End time** – ange tidpunkt och veckodagar till när utgången ska vara påslagen.

  Om PGM-utgångens läge är inställt på ”**Level**” och bara ”**End time**” anges i tabellen ”**Scheduler**”, avaktiveras PGM-utgången vid den angivna tiden om den var aktiverad. Ett styrschema för utgången måste tilldelas en PGM-utgång.

  **Fliken ”Holidays”**

Ange de kalenderhelgdagar då det ska vara möjligt att ställa in den extra aktivering av PGM-utgången som anges i tabellen Scheduler.

<img alt="TrikdisConfig Gator, fönstret IN/OUT, fliken Holidays. Det första helgdagsintervallet är aktiverat, med Start date 12.06.2025 och Stop date 13.06.2025. Start time on holidays är 09:30 och Stop time on holidays är 09:33." src="./image52.webp" style="width:7.086614173228346in;height:2.0984251968503935in" />

- **En.** – markera kryssrutan för att ange ett visst helgdagsintervall.

- **Start date** – ange helgdagarnas startdatum.

- **Stop date** – ange helgdagarnas slutdatum.

- **Annual** – markera kryssrutan för att aktivera helgdagsdatum som återkommer varje år. Styrenheten kontrollerar då bara helgdagsdatumen (månad och dag).

- **Start time on holidays** – ange helgdagarnas starttid.

- **Stop time on holidays** – ange helgdagarnas sluttid.

### Fönstret ”Modules”

**Fliken ”Modules”**

Följande moduler kan anslutas till styrenheten GATOR: iO-LORA, W485, ***E485**, **iO8, iO8-LORA***.

Genom att ansluta radiotransceivern RF-LORA kan den trådlösa utbyggnadsmodulen iO8-LORA (1 st.) och de trådlösa utbyggnadsmodulerna iO-LORA (upp till 8 st.) anslutas till styrenheten GATOR. RFID-läsare som är anslutna till de trådlösa utbyggnadsmodulerna iO-LORA kan styra upp till 8 PGM-utgångar till (styrenhetens firmwareversion från 2.13). En utbyggnadsmodul iO-LORA med RFID-läsare styr bara en PGM-utgång.

Bara en utbyggnadsmodul iO8 eller iO8-LORA kan anslutas till styrenheten GATOR.

Om det finns trådlöst internet (WiFi) eller trådbundet internet på platsen där styrenheten installeras kan WiFi-modulen W485 eller Ethernet-modulen E485 anslutas till styrenheten. Modulen kan då överföra data till molntjänsten Protegus2 och till larmcentralen (CMS) via internet. När en modul (W485 eller E485) används med styrenheten: 1) används inte mobilt internet, och styrenhetens dataöverföring via GPRS kan också avaktiveras; 2) kan du använda styrenheten utan SIM-kort (styrning med appen Protegus2).

<img alt="TrikdisConfig Gator, fönstret Modules. Rullgardinslistan Module är öppen med alternativen W485 (W17u) module, E485 communicator, iO-LORA controller, IO-8, IO8-Lora och AP-IO4R. Tabellen har även kolumnerna Serial No., Name och Firmware version." src="./image53.webp" style="width:7.086614173228346in;height:2.2755905511811023in" />

- **Modules** – välj i listan den modul som är ansluten till styrenheten via RS485.

- **Serial No.** – ange modulens serienummer (6 siffror), som anges på etiketterna på modulens kapsling och förpackning.

När du har valt den anslutna modulen och angett dess serienummer, gå till **Modules** → **Parameters.**

**Fliken ”Parameters”**

**Inställningsfönster för WiFi-modulen W485**

<img alt="TrikdisConfig Gator, fönstret Modules, fliken Parameters. Communicator network settings visar DHCP mode markerat, Static IP, Subnet mask och Default gateway alla 0.0.0.0 samt WiFi SSID name TRIKDIS. Under SIM parameters är Use dial and SMS when working over internet module markerat; de två andra alternativen är inte markerade." src="./image54.webp" style="width:7.086614173228346in;height:2.7007874015748032in" />

**Inställningsgruppen ”Communicator network settings”**

- **DHCP mode** – WiFi-modulens sätt att registrera sig på nätverket (manuellt eller automatiskt). Markera kryssrutan (automatiskt registreringsläge) så läser WiFi-modulen automatiskt av nätverksinställningarna (nätmask, gateway) och tilldelas en IP-adress.

  - **Static IP** – statisk IP-adress för när manuellt registreringsläge är inställt.

  - **Subnet mask** – nätmask för när manuellt registreringsläge är inställt.

  - **Default gateway** – gatewayadress för när manuellt registreringsläge är inställt.

  - **Wifi SSID name** – namnet på det WiFi-nätverk som W485 ansluter till.

- **Wifi SSID password** – lösenordet till WiFi-nätverket.

**Inställningsgruppen ”SIM parameters”**

- **Disable indication of the absence of a SIM card** – om kryssrutan markeras avaktiveras indikeringen av att SIM-kort saknas i styrenheten.

- **Use dial and SMS when working over internet module** – om kryssrutan markeras aktiveras styrning av styrenheten med samtal och SMS. Om fältet inte är markerat och det finns ett WiFi-nätverk används inte samtal och SMS. Om fältet inte är markerat och det inte finns något WiFi-nätverk kan styrenheten styras med samtal och SMS. Styrenheten skickar SMS till användaren.

- **Disable the use of SIM card mobile data** – om kryssrutan markeras avaktiveras användningen av mobildata från SIM-kortet. Data skickas då bara via modulen W485. Om WiFi-nätverket kopplas bort lagrar styrenheten data i minnet. När WiFi-nätverket har återställts skickar styrenheten de sparade data via WiFi-modulen W485.

**Inställningsfönster för Ethernet-modulen E485**

<img alt="TrikdisConfig Gator, fönstret Modules, fliken Parameters. Communicator network settings visar DHCP mode markerat samt Static IP, Subnet mask och Default gateway alla 0.0.0.0. Under SIM parameters är Use dial and SMS when working over internet module markerat; de två andra alternativen är inte markerade." src="./image55.webp" style="width:7.086614173228346in;height:2.094488188976378in" />

**Inställningsgruppen ”Communicator network settings”**

- **DHCP mode** – Ethernet-modulens sätt att registrera sig på nätverket (manuellt eller automatiskt).

- **Static IP** – statisk IP-adress för när manuellt registreringsläge är inställt.

- **Subnet mask** – nätmask för när manuellt registreringsläge är inställt.

- **Default gateway** – gatewayadress för när manuellt registreringsläge är inställt.

**Inställningsgruppen ”SIM parameters”**

- **Disable indication of the absence of a SIM card** – om kryssrutan markeras avaktiveras indikeringen av att SIM-kort saknas i styrenheten.

- **Use dial and SMS when working over internet module** – om kryssrutan markeras aktiveras styrning av styrenheten med samtal och SMS. Om fältet inte är markerat och det finns internet används inte SMS och samtal. Om fältet inte är markerat och det inte finns internet kan styrenheten styras med samtal och SMS. Styrenheten skickar SMS till användaren.

- **Disable the use of SIM card mobile data** – om kryssrutan markeras avaktiveras användningen av mobildata från SIM-kortet. Data skickas då bara via modulen E485. Om internetanslutningen försvinner lagrar styrenheten data i minnet. När internetanslutningen har återställts skickar styrenheten de sparade data via Ethernet-modulen E485.

### Fönstret ”IP Reporting” 

<img alt="TrikdisConfig Gator, fönstret IP Reporting. Communication type för Primary channel och Backup channel är Disabled. Settings visar Return to Primary after 5 min, IP Ping period 60 s, SMS Ping period 10 min, Backup reporting after 3 attempts, DNS1 8.8.8.8 och DNS2 1.1.1.1. Enable cloud service är inte markerat; Cloud Access Code är 123456." src="./image56.webp" style="width:7.086614173228346in;height:3.4960629921259843in" />

Styrenheten kan skicka meddelanden till larmbolagets mottagare för larmcentralen (CMS).

**Inställningsgruppen ”Primary channel”**

- **Communication type** – välj typ av kommunikation (IP, SMS) med larmcentralens (CMS) mottagare.

- **Domain or IP** – ange mottagarens domän eller IP-adress.

- **Port** – ange mottagarens nätverksport.

- **Phone number** – telefonnummer till en larmcentralsmottagare som kan ta emot SMS (t.ex. 370xxxxxxxx), när den valda **Communication type** är SMS.

- **Encryption Key** – krypteringsnyckel för meddelanden, 6 siffror, som måste stämma överens med larmcentralsmottagarens krypteringsnyckel.

**Inställningsgruppen ”Backup channel”**

Inställningarna är identiska med inställningarna för primärkanalen.

**Inställningsgruppen ”Settings”**

- **Return to primary after** – tidsperioden efter vilken styrenheten försöker återupprätta anslutningen till primärkanalen.

- **IP Ping period** – aktivera sändning av PING-signal och ställ in dess periodlängd.

- **SMS Ping period** – aktivera sändning av PING-signal och ställ in dess periodlängd.

- **Backup reporting after** – ange antal anslutningsförsök mot huvudkanalen efter vilka styrenheten automatiskt ansluter till backupkanalen.

- **DNS1 and DNS2** – IP-adresser till DNS-servrar.

**Inställningsgruppen ”Backup channel 2”**

- **Phone number** – telefonnummer till en larmcentralsmottagare som kan ta emot SMS (t.ex. 370xxxxxxxx). SMS-backupkanalen används när meddelanden inte kan skickas varken via primärkanalen eller backupkanalen. Den är mycket användbar eftersom den fungerar även när IP-anslutningen i mobiloperatörens nät är störd. Kanalen fungerar bara när GPRS-läget är inställt för både primärkanalen och backupkanalen. SMS skickas till larmcentralens SMS-mottagare: 1) så snart styrenheten aktiveras för första gången; 2) efter bortfall av TCP/IP- eller UDP/IP-anslutningen i primärkanalen och backupkanalen.

**Inställningsgruppen ”Cloud application”**

- **Enable cloud service** – genom att markera kryssrutan aktiverar du molntjänsten. Styrenheten kan då kommunicera med appen Protegus2, och det blir möjligt att konfigurera styrenheten på distans med programmet TrikdisConfig.

- **Parallel reporting** – meddelandena skickas samtidigt till larmcentralen (CMS), appen Protegus2 och användarna. När funktionen inte är aktiverad skickas meddelanden till appen Protegus2 och användarna först efter att de har skickats till larmcentralen.

- **Cloud Access Code** – kod med 6 siffror för anslutning till Protegus2 (förval: 123456).

### Fönstret ”User list” 

**Fliken ”Users”**

<img alt="TrikdisConfig Gator, fönstret User list, fliken Users. Ovanför användartabellen finns knapparna Register RFID och Clear users. Tabellen har kolumnerna ID, E-mail address, Phone/RFID, Name, En, GRE, Schedule, Dial och More Settings; en rad är markerad Not authorized." src="./image57.webp" style="width:7.086614173228346in;height:1.9015748031496063in" />

- **ID** – användarens löpnummer. Nummer med bokstaven ”A” (1A till 7A) är administratörsnummer, som kan göra inställningar i styrenheten, styra utgångar och ta emot meddelanden från styrenheten. Övriga användarnummer (11 till 1010) kan styra utgångar.

- **E-mail address** – ange användarens e-postadress.

- **Phone/RFID** – ange administratörens telefonnummer (t.ex. +370xxxxxxxx).

- **Name** – ange användarens namn.

- **En** – markera kryssrutan för att aktivera användaren.

- **GRE** – markera kryssrutan för att skicka ett SMS till användaren av GATOR.

- **Scheduler** – välj numret på det schema som avgör när användaren får styra styrenheten.

- **Output** – markera numret på den utgång som användaren ska styra.

- **Code** – om en RFID-läsare med knappsats (Wiegand 26/34) är ansluten till styrenheten kan användaren ange styrkoden.

- **Dial** – markera de utgångar som aktiveras automatiskt när användaren ringer (om användaren har flera utgångar OUT tilldelade), varefter samtalet avvisas.

- **More settings** – när du klickar på knappen ”**More settings**” öppnas ett fönster med ytterligare användarinställningar.

!!! note "Obs!"
    Om rutan ”**En.**” är avmarkerad för användaren ”**No.10**” med namnet
    ”**Not authorized**” är användare som inte finns i användarlistan
    förbjudna att styra styrenheten med telefonsamtal.
**Administratörsinställningar (nummer från 1A till 7A)**

- ID – administratörens nummer.

- Enabled – om rutan är markerad får användaren styra utgångarna OUT.

- Name – ange administratörens namn.

- E-mail address – ange administratörens e-postadress.

- Phone or RFID code – ange administratörens telefonnummer eller ID-numret på RFID-brickan (kortet).

- Keypad code – om en RFID-läsare med knappsats (Wiegand 26/34) är ansluten till styrenheten kan användaren ange styrkoden.

- ACK for SMS message – administratören får svars-SMS när han eller hon styr och konfigurerar styrenheten med SMS.

- Receive test SMS – markera kryssrutan så får administratören testmeddelanden.

<img alt="TrikdisConfig, fönstret User settings. Enabled är markerat. SMS notification för IN1 och OUT5 är markerat; ACK for SMS message, Receive test SMS, Forward unknown SMS och Can control outputs OUT5 är inte markerade." src="./image58.webp" style="width:4.330708661417323in;height:3.4803149606299213in" />

- **Forward unknown SMS** – vidarebefordring av SMS från okända nummer.

- **SMS notification for** – ange vilka händelser (IN1, IN2, OUT3, OUT4, OUT5) som administratören får SMS-aviseringar om.

- **Can control output** – markera numret på den utgång som administratören ska styra.

- **Greetings** – markera kryssrutan för att styrenheten GATOR ska skicka ett välkomst-SMS till användaren**.**

- **Automatic call control** – markera de utgångar som aktiveras automatiskt vid ett samtal (om användaren har flera utgångar OUT tilldelade), varefter samtalet avvisas.

  **Användarinställningar (nummer från 11 till 1010)**
- ID – användarens nummer.

- Enabled – om rutan är markerad får användaren styra utgångarna OUT.

- Name – ange användarens namn.

- E-mail address – ange användarens e-postadress.

- Phone or RFID code – ange användarens telefonnummer eller ID-numret på RFID-brickan (kortet).

- Keypad code – ange användarkoden för RFID-läsaren med knappsats.

- Assign schedule – tilldela ett schema (ange de nödvändiga schemanumren) för när användaren får styra utgångarna OUT.

- Valid from – ange datum och tid från när användaren får styra styrenheten.

- Valid until – ange datum och tid till när användaren får styra styrenheten.

<img alt="TrikdisConfig, fönstret User settings. Assign schedule är tomt. Valid from visar 13.10.2025 00:00 och Valid until visar 14.10.2025 00:00, med båda datumrutorna avmarkerade. Enable counter är avmarkerat; Set counter och Current counter visar båda 0." src="./image59.webp" style="width:4.330708661417323in;height:3.9763779527559056in" />

- **Enable counter** – markera kryssrutan för att aktivera räknaren.

- **Set counter** – ange hur många gånger användaren får styra styrenheten under den valda tiden.

- **Current counter** – aktuellt antal styrningar.

- **Can control outputs** – markera numret på den utgång som användaren ska styra.

- **Greetings** – markera kryssrutan för att styrenheten GATOR ska skicka ett välkomst-SMS till användaren**.**

- **Automatic call control** – markera de utgångar som aktiveras automatiskt vid ett samtal (om användaren har flera utgångar OUT tilldelade), varefter samtalet avvisas.

#### Registrera RFID-bricka (kort) 

1.  Anslut RFID-läsaren till styrenheten (se avsnitt 2.6 ”Anslutning av RFID-läsare (Wiegand 26/34)”). Slå på matningen till styrenheten. Anslut USB Mini-B-kabeln till styrenheten. Ange i TrikdisConfig-fönstret ”IN / OUT” hur många RFID-läsare som är anslutna.

<img alt="TrikdisConfig, fönstret IN/OUT. Menyn Wiegand reader mode är öppen med Dual Reader vald och Single Reader tillgänglig." src="./image60.webp" style="width:7.086614173228346in;height:2.97244094488189in" />

Klicka på ”**Register RFID**” i fönstret ”User list”.

<img alt="TrikdisConfig, fönstret User list med knappen Register RFID markerad ovanför tabellen Users." src="./image61.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

Fönstret för registrering av RFID-brickor (kort) öppnas.

<img alt="TrikdisConfig, fönstret RFID registration mode uppmanar till Add RFID tag/card to reader och visar en knapp STOP registration." src="./image62.webp" style="width:2.854330708661417in;height:2.3070866141732282in" />

Håll RFID-brickan (kortet) mot RFID-läsaren. När läsaren har läst av brickan (kortet) öppnas ett nytt fönster. Ange ”**Enter user name**” där och välj ”**User can control PGM Output 5**”. Klicka på knappen ”**ADD**”. / Upprepa stegen ovan för att lägga till fler RFID-brickor (kort). När alla RFID-brickor (kort) har registrerats, klicka på knappen ”**STOP registration**”. / Klicka på knappen **Write [F5]** för att spara listan över RFID-brickor i styrenheten.

<img alt="TrikdisConfig, fönstret RFID registration mode när ett kort har hittats. Enter user name är ifyllt, User can control PGM Output 5 och Device administrator är markerade och knappen ADD är markerad." src="./image63.webp" style="width:2.858267716535433in;height:2.6653543307086616in" />

RFID-brickor (kort) kan registreras i *TrikdisConfig* genom att man anger deras ID-nummer i fältet ”Phone/RFID”. Ange ett namn för användaren, markera fältet ”En.” och fyll i fältet ”Outputs” för de utgångar som ska styras. Klicka på knappen Write [F5] för att spara listan över RFID-brickor (kort) i styrenheten.

<img alt="RFID-kort med det tryckta ID-numret markerat längs nederkanten." src="./image64.webp" style="width:2.3818897637795278in;height:1.515748031496063in" />

<img alt="TrikdisConfig, fönstret User list. En nyligen tillagd användarrad är markerad, med Phone/RFID och Name ifyllda, En markerat och utgång 5 markerad." src="./image65.webp" style="width:7.086614173228346in;height:1.9133858267716535in" />

2. Registrera RFID-bricka (kort) med appen Protegus2.

Välj ”Add New User” i appen *Protegus2*. Ange e-postadress, användarnamn, RFID-brickans (kortets) ID-nummer och användarens kod med 4 tecken (när en RFID-läsare med knappsats används). Markera den utgång som ska styras (”Output”). Tryck på ”NEXT”. Den nya användaren med RFID-bricka (kort) läggs till i användarlistan.

<img alt="Protegus2, skärmen Edit user. Fälten Email, Name, Phone number or RFID code och Code är markerade. Reglaget för Output5 är påslaget och Save är markerat." src="./image66.webp" style="width:2.7559055118110236in;height:5.6141732283464565in" />

**Fliken ”Scheduler”**

Användaren kan styra utgångarna enligt det inställda schemat. Ett schema måste tilldelas användaren.

<img alt="TrikdisConfig, fönstret User list, fliken Scheduler. Schedule 1 till Schedule 5 har var och en en kryssruta Enable, Start time med veckodagar och Stop time med veckodagar; de synliga tiderna är 00:00 och kryssrutorna är avmarkerade." src="./image67.webp" style="width:7.086614173228346in;height:2.2125984251968505in" />

- **Name** – ange ett namn för schemat.

- **Enable** – aktivera tidsschemat för när användaren får styra styrenhetens utgångar.

- **Start time** – ange tidpunkt och veckodagar från när användaren får styra styrenhetens utgångar.

- **Stop time** – ange tidpunkt och veckodagar till när användaren får styra styrenhetens utgångar.

**Fliken ”Black list”**

<img alt="TrikdisConfig, fönstret User list, fliken Black list med en tom tabell Email/Phone no." src="./image68.webp" style="width:7.086614173228346in;height:1.7401574803149606in" />

Spärrlistan (”**Black list**”) innehåller e-postadresser, telefonnummer och ID-nummer på RFID-brickor (kort) för användare som är förbjudna att styra styrenheten.

Det finns ett enkelt sätt att lägga till nya poster i spärrlistan direkt från händelseloggen. Högerklicka på ett telefonnummer, en e-postadress eller ett ID-nummer på en RFID-bricka (kort) och välj ”**Add to black list**”.

### Fönstret ”System events” 

<img alt="TrikdisConfig, fönstret System events. Tabellen listar händelsenamn och CID-koder, bland andra IPcom registration 700, Test 602, Output ON/OFF 780, Configuration changed 306, RS485 bus fault 333, Exit button 779, Access denied 421, Working start/end 786, Automatic work end 787 och Test when work status 601. Enabled, CMS och Cloud är markerade för varje synlig händelse." src="./image69.webp" style="width:7.086614173228346in;height:2.295275590551181in" />

Inställningar för att skicka styrenhetens händelser till larmcentralen (CMS) och till appen Protegus2.

- **ID** – händelsens nummer i listan.

- **Event name** – händelsens namn.

- **Enabled** – aktivera igenkänning av händelsen.

- **CMS** – meddelanden om de valda händelserna skickas till larmcentralen (CMS).

- **Cloud** – aviseringar om de valda händelserna skickas till appen Protegus2.

- **CID Code** – händelsens Contact ID-kod.

### Fönstret ”Events Log” 

<img alt="TrikdisConfig, fönstret Events Log med knapparna Read Log och Clear Log. Tabellen har kolumnerna Event No., Name / E-mail, Tel number, Time och Event definition; synliga poster är bland annat System start, Low Power och Output OFF, OUT 5." src="./image70.webp" style="width:7.086614173228346in;height:2.1141732283464565in" />

Klicka på knappen ”**Read Log**”. Händelseloggen läses från styrenhetens minne. ”**Events log**” ger information om styrenhetens åtgärder och interna händelser.

### Återställa förvalda inställningar 

Om du vill återställa styrenhetens förvalda inställningar, klicka på knappen ”**Restore**” i fönstret i TrikdisConfig.

<img alt="TrikdisConfig, avsnittet Default settings med knappen Restore markerad ovanför fältet IMEI/Unique ID." src="./image71.webp" style="width:7.086614173228346in;height:1.0118110236220472in" />

### Inställningar för indikering av portens läge 

Appen Protegus2 och widgeten kan visa portens aktuella läge (stängd eller öppen). För att detta ska fungera måste styrenhetens ingång IN1 vara ansluten till portautomatikens utgång för portens läge, som i avsnitt 2.5 ”Anslutning av portautomatik till styrenheten”.

I TrikdisConfig-fönstret ”**IN/OUT**” tilldelar du den anslutna ingången till den utgång på styrenheten som styr porten:

<img alt="TrikdisConfig, fönstret IN/OUT. Den markerade raden 1 IN har Function Input, Name Input1_1, SMS event Open, SMS restore Close, Type NO, Inactive 0 och Delay 400. På raden 5 OUT är Assign I satt till 1 IN." src="./image72.webp" style="width:7.086614173228346in;height:2.0826771653543306in" />

Om du vill ta emot SMS om att porten öppnas/stängs, ange SMS-texter för händelse/återställning på ingång 1IN.

Klicka på knappen ”**More settings**” i fönstret ”**Users**”.

<img alt="TrikdisConfig Gator, fliken Users: knappen More Settings är markerad för en användarrad." src="./image73.webp" style="width:7.086614173228346in;height:1.7440944881889764in" />

Markera rutan IN1 i fönstret ”User settings” om du vill att användaren ska få SMS om portens läge. Klicka på ”Save”.

<img alt="TrikdisConfig, fönstret User settings: under SMS notification for är IN1 och OUT5 markerade. Kryssrutan IN1 är markerad och Save finns nedanför." src="./image74.webp" style="width:4.330708661417323in;height:3.4606299212598426in" />

## Ställa in parametrar på distans 

!!! warning "Viktigt"
    Fjärrkonfigurering fungerar bara när:

    1.  Tjänsten Protegus är aktiverad. Hur tjänsten aktiveras
        beskrivs i avsnitt 5.5 ”Fönstret ”IP reporting””;

    2.  Matningen är påslagen (lysdioden ”POWER” blinkar grönt);

    3.  Styrenheten är ansluten till nätet (lysdioden ”NETWORK” har fast
        grönt sken och blinkar gult).
1.  Ladda ned programmet TrikdisConfig från [www.trikdis.com](http://www.trikdis.com).

2.  Kontrollera att styrenheten är ansluten till internet och att anslutningen till Protegus är aktiverad***.***

3.  Starta konfigurationsprogrammet TrikdisConfig och ange styrenhetens ”**IMEI/Unique ID**” i fältet ”**Unique ID**” i avsnittet ”**Remote access**” (IMEI-numret anges på etiketterna på enhetens kapsling nedtill och på förpackningen).

<img alt="TrikdisConfig, avsnittet Remote access: fältet Unique ID och knappen Configure är markerade, med fältet System Name mellan dem." src="./image75.webp" style="width:7.086614173228346in;height:2.043307086614173in" />

4. I fältet ”**System Name**” kan du ge styrenheten valfritt namn. Klicka på ”**Configure**”.

2.  Styrenhetens konfigurationsfönster öppnas. Klicka på knappen **Read [F4]** så läser programmet de parametrar som för tillfället är inställda för styrenheten. Om ett fönster för administratörskoden (*Administrator code*) öppnas, ange den sexsiffriga *administratörskoden*. För att programmet ska komma ihåg koden, markera rutan bredvid ”**Remember password**” och klicka på knappen **Write [F5]**.

3.  Ställ in önskade inställningar för styrenheten och klicka sedan på **Write [F5]**. För att koppla från styrenheten, klicka på ”**Disconnect**” och avsluta programmet TrikdisConfig.

## Test av den mobilanslutna styrenheten 

När konfigurering och installation är klara, testa systemet:

1.  Kontrollera att matningen är påslagen.

2.  Kontrollera nätverksanslutningen (indikeringen ”**NETWORK**” ska ha fast grönt sken och blinka gult).

3.  Testa styrenhetens ingångar genom att utlösa dem och kontrollera att mottagarna får rätt meddelanden.

4.  Testa styrenhetens utgångar genom att slå på dem på distans och kontrollera att mottagarna får rätt meddelanden och att utgångarna aktiveras som de ska.

## Uppdatera firmware manuellt 

!!! note "Obs!"
    När styrenheten är ansluten till TrikdisConfig erbjuder programmet
    att uppdatera enhetens firmware om det finns uppdateringar.
    Uppdateringar kräver en internetanslutning. / Om det finns antivirusprogram
    installerat på datorn kan det blockera den automatiska
    firmwareuppdateringen. I så fall måste du ändra antivirusprogrammets
    inställningar.
Styrenhetens firmware kan också uppdateras och bytas manuellt. Alla tidigare parametrar i styrenheten behålls efter uppdateringen. Vid manuell skrivning kan firmware ändras till en äldre eller en nyare version. Gör så här:

1.  Starta ***TrikdisConfig**.*

2.  Anslut styrenheten till en dator med en USB Mini-B-kabel eller anslut till styrenheten på distans. Om en nyare firmwareversion finns erbjuder programmet att installera den.

3.  Välj menygrenen ”**Firmware**”.

4.  Klicka på knappen ”**Open firmware**” och välj den firmwarefil du behöver.

    <img alt="TrikdisConfig Gator, fönstret Firmware: ett tomt fält Open firmware file, knappen Open firmware, knappen Start update (F12) och en förloppsindikator på 0 %." src="./image76.webp" style="width:7.086614173228346in;height:2.47244094488189in" />

5.  Klicka på knappen **Start update [F12]**.

6.  Vänta tills uppdateringen är klar.

## Säkerhetsanvisningar 

Den mobilanslutna styrenheten får endast installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla alltid bort matningen innan du gör elektriska anslutningar.

Alla ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Överkryssad soptunna på hjul (WEEE), som visar att enheten ska kasseras separat från hushållsavfall." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Följ lokala bestämmelser för avfallssortering och släng inte den här utrustningen eller dess delar i hushållsavfallet.
