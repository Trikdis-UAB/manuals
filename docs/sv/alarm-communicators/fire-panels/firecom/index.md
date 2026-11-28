# Larmsändaren FIRECOM för brandlarmcentraler

<div style="text-align: center;">

<img src="./image1.webp" alt="Framsidan på larmsändaren FIRECOM med platserna för lysdioderna POWER, DATA och TROUBLE på den röda frontpanelen." width="400">

</div>

## Beskrivning

Larmsändaren ***FIRECOM*** uppfyller kraven i standarden EN 54-21:2006 och EN 54-4:1997/AC:1999/A1:2002/A2:2006.

Produkten uppfyller prestandakraven i bilaga A till standarden EN54-21 för överföringssystem av typ 1.

Certifikatnummer för larmsändaren ***FIRECOM***: 1922-CPR-2083. Branddetekterings- och brandlarmsystem. Larmöverförings- och felvarningsutrustning. Strömförsörjningsutrustning.

Produkten är certifierad av det anmälda certifieringsorganet för produkter nr 1922 ”Dedal”, Nesebar Mladost str. 50, Bulgarien, 8230.

Kontaktuppgifter till Trikdis tekniska support: support@trikdis.lt, +37067422877.

***FIRECOM*** används för att överföra meddelanden från brandlarmcentralen via LAN och/eller mobilnät till larmcentralens mottagare.

Funktionsprincip. När en ingång (sektion) på larmsändaren påverkas skickar ***FIRECOM*** ett händelsemeddelande till larmcentralens mottagare eller till appen ***Protegus2*** via mobilt internet och/eller LAN. Larmsändaren kan också skicka SMS och ringa upp. Larmsändaren finns med 4G-modem.

### Funktioner

**Meddelanden till larmbolaget**

- Skickar händelser via den inbyggda LAN-modulen eller 4G-modemet.

- Händelser skickas via tillgängliga kommunikationskanaler med den valda prioriteten.

- Alla larmcentraler kan ta emot rapporter, förutsatt att de har en programvaru- eller IP-mottagare från TRIKDIS, eller en IP-mottagare från en annan tillverkare som stöder IP-protokollet SIA DC-09.

- Händelser till larmcentralen prioriteras: meddelanden skickas först till larmcentralen och först därefter till ***Protegus2***.


- Möjlighet att skicka händelserapporter till larmcentralerna hos två olika larmbolag.

- Händelsemeddelanden skickas som Contact ID- eller SIA-koder.

**Meddelanden till användare**

- Ringer upp valda telefonnummer (upp till 8 användare).

- Skickar SMS om händelser.

- ”Push”-aviseringar och särskilda ljud som informerar om händelser i appen ***Protegus2***.

- Temperaturövervakning på distans.

**Fjärrstyrning av utgångar**

- Med appen ***Protegus2***.

- Genom att ringa upp enhetens telefonnummer.

- Med SMS.

**Inställningar och installation**

- Snabb och enkel installation.

- Enheten konfigureras antingen med USB-kabel eller på distans med programvaran ***TrikdisConfig***.

- Fjärruppdatering av firmware.

- Två behörighetsnivåer (kontotyper) för inställning av parametrar: för installatören och för administratören.

**Ingångar och utgångar**

- 3 reläutgångar (1 A, 30 V DC).

- Ingången ”**FLOOP**” är avsedd för anslutning av 2-tråds branddetektorer.

- 10 I/O-plintar som var och en kan ställas in som ingång (IN) eller utgång (OUT). Valbara ingångstyper (IN): NC, NO, EOL, EOL-T, ATZ, ATZ-T. Motstånd med olika värden kan användas i EOL- och ATZ-kretsar.

- Med utbyggnadsmodulerna ***iO*** kan antalet ingångar (IN) utökas till 32 och antalet utgångar (OUT) till 16.

- RS485-bussen används för att ansluta utbyggnadsmoduler i serien ***iO***.

- RS485 2-bussen används för att ansluta brandlarmcentraler.

### Specifikationer

| Parameter | Beskrivning |
|----|----|
| LTE-modemets frekvenser: / EU (Europa) / LA (Latinamerika) | LTE-FDD: B1/B3/B5/B7/B8/B20/B28 / LTE-FDD: B2/B3/B4/B5/B7/B8/B28/B66 |
| Matningsspänning | 15–32 V DC, 2,5 A |
| Strömförbrukning | Upp till 50 mA (i viloläge). / Upp till 300 mA (vid sändning). / Upp till 2,5 A (när den största möjliga belastningen med externa enheter är ansluten). |
| Reservbatteri [BAT] | 12 V blybatteri, 4 Ah/7 Ah |
| Batteriets laddström | Upp till 500 mA |
| Matningsspänning och ström för externa enheter [AUX] | 12 V DC, upp till 1 A |
| Överföringsprotokoll | TRK, SIA DC-09_2007, SIA DC-09_2012, SIA DC-09_IPcom, TL150 |
| Krypteringsnyckel | Krypteringsnyckel med 6 tecken. |
| Anslutning till larmcentralen | TCP/IP eller UDP/IP |
| Händelsekoder | Contact ID, SIA-koder. |
| LAN-modul | Ja, inbyggd |
| Konfigurering av LAN-nätverket | DHCP eller manuell |
| SIM-kort | 2, storlek NANO |
| Sändningsriktningar för rapporter | Till primär och sekundär mottagare hos 2 olika larmbolag; Till molntjänsten ***Protegus2*** och till mobilapparna ***Protegus2*** för iOS/Android; Till 8 mobiltelefoner med SMS. Ringer upp 8 mobiltelefoner. |
| Överföringskanaler för händelserapportering | 4G, Ethernet (LAN), SMS, samtal |
| Meddelandekryptering | Ja |
| Inbyggd klocka | Ja |
| Användare | 40 |
| Plintar med dubbel funktion [I/O] | 10; funktionen IN eller OUT väljs vid programmeringen. När IN är valt kan följande typer användas: NC, NO, EOL, EOL_T, ATZ, ATZ_T. När OUT är valt blir plinten en utgång med öppen kollektor (OC) för en ström på upp till 100 mA |
| Antal grupper | 8 |
| Antal sektioner | 10 (20 sektioner med ATZ), (kan utökas till 32 sektioner med utbyggnadsmoduler) |
| Antal PGM-utgångar | 3 relä (1 A, 30 V DC). (kan bli 13 om I/O-plintarna ställs in som utgångar. Kan utökas till 16 utgångar med utbyggnadsmoduler) |
| Buffertminnets kapacitet | 60 händelser |
| Händelseloggens minne | Upp till 1 000 händelser. De äldsta posterna raderas automatiskt. |
| Konfigurering | På distans med programvaran ***TrikdisConfig*** eller lokalt via USB Type-C. |
| Längd på 1-Wire-databussen [1 WIRE] | Upp till 30 m |
| Kompatibla temperaturgivare | Maxim®/Dallas® DS18S20, DS18B20; AM2301-serien |
| Största antal temperaturgivare på 1-Wire-databussen | 8 (Dallas) eller 1 (om en givare i AM2301-serien används) |
| RS485-buss | 2 |
| RS485-bussens längd | Upp till 100 m |
| Moduler och enheter som stöds | **iO-8** – utbyggnadsmodul; / **iO-MO** – radiotransceiver **iO-WL**; / **iO-LORA** – utbyggnadsmodul; / **iO8-LORA** – utbyggnadsmodul; / **PB-LORA** – överfallsknapp; / **REL-LORA** – utbyggnadsmodul; / Brandlarmcentral med protokollet **ESPA 4.4.4**; / **NSC Solution** – brandlarmcentral; / **INIM Smartline** – brandlarmcentral; / **C-TEC Cast ZFP** – brandlarmcentral; / **Polon-Alfa 3000** – brandlarmcentral. |
| Driftmiljö | Temperatur från -10 °C till +50 °C, relativ luftfuktighet upp till 80 % vid +20 °C. |
| Mått | 235 × 205 × 92 mm |
| Vikt | 1,35 kg |

### Delar på larmsändaren *FIRECOM*

<img src="./image4.webp" alt="Delar på larmsändaren FIRECOM" style="width: 7.0in; height:in;" />

1. Lysdiodsindikeringar för anslutning och drift
2. Knapp. Används inte
3. Plintblock för reservbatteri
4. Plintblock för huvudmatning
5. Knappen RESET
6. Plintblock för externa anslutningar
7. Plintblock för 1-Wire
8. LAN-kontakt
9. Plintblock för reläutgångar
10. Kortplatser för SIM-kort
11. Kontakt för mobilantenn
12. USB Type-C-kontakt


### Plintarnas funktion

| Plint              | Beskrivning                                            |
|--------------------|--------------------------------------------------------|
| Matningsplint ”+”  | Plint för matning (positiv plint för 15–32 V DC)       |
| Matningsplint ”-”  | Plint för matning (negativ plint för 15–32 V DC)       |
| BAT+               | Positiv plint för reservbatteri, 12 V                  |
| BAT-               | Negativ plint för reservbatteri, 12 V                  |
| AUX+               | Positiv 12 V-plint för matning av externa enheter      |
| AUX-               | Gemensam negativ plint                                 |
| A1 RS485           | RS485-buss för anslutning av utbyggnadsmoduler iO      |
| A2 RS485           | RS485-buss för anslutning av brandlarmcentral          |
| IO1 – IO10         | Plintar för ingång/utgång (förval – ingång)            |
| C                  | Gemensam negativ plint                                 |
| AUX+               | Positiv 12 V-plint för matning av externa enheter      |
| FLOOP              | Plint för anslutning av en 2-tråds branddetektor       |
| +5 V               | Positiv 5 V-plint, 0,2 A, för matning av 1-Wire-enheter |
| 1 WIRE             | Plint för databussen ”1-Wire”                          |
| C                  | Gemensam negativ plint                                 |
| NO1/C1/NC1         | Plintar för PGM-reläutgång 1                           |
| NO2/C2/NC2         | Plintar för PGM-reläutgång 2                           |
| NO3/C3/NC3         | Plintar för PGM-reläutgång 3                           |

### Lysdiodsindikering vid drift

| Indikator | Lysdiodens läge | Beskrivning |
|----|----|----|
| SIM | Släckt | Ingen anslutning till mobilnätet |
|     | Blinkar grönt | SIM-kortet registreras i mobilnätet. |
|     | Fast grönt sken | SIM-kortet är registrerat i mobilnätet. |
|     | Fast grönt sken med gult blinkande | Larmsändaren är ansluten till mobilnätet. Tillräcklig mobil signalstyrka för 4G är nivå 3 (tre gula blinkningar). |
| ETH | Blinkar grönt | LAN-kabeln är bortkopplad eller problem med DHCP. |
|     | Fast grönt sken | Ansluten till LAN-nätverket. |
| DAT / DATA | Släckt | Alla händelsemeddelanden är skickade |
|            | Fast grönt sken | Ett meddelande skickas |
|            | Fast gult sken (DAT) | Osända händelsemeddelanden finns i buffertminnet |
| STA / TROUBLE | Blinkar grönt (STA) | Inga driftproblem |
|  | Släckt (TROUBLE) | Inga driftproblem |
|  | 1 röd blinkning | Inget SIM-kort är isatt |
|  | 2 röda blinkningar | SIM-kortets PIN-kod är felaktig |
|  | 3 röda blinkningar | Det går inte att ansluta till mobilnätet |
|  | 4 röda blinkningar | Det går inte att ansluta till IP-mottagaren via primärkanalen |
|  | 5 röda blinkningar | Det går inte att ansluta till IP-mottagaren via sekundärkanalen |
|  | 6 röda blinkningar | Ingen DC-matning |
|  | 7 röda blinkningar | Fel på AUX-utgången (överström eller överspänning) |
|  | 8 röda blinkningar | Batterifel |
|  | 9 röda blinkningar | LAN-kabeln är bortkopplad |
|  | 10 röda blinkningar | Problem med DHCP i LAN |
| FPS / POWER | Släckt | Matningen är inte ansluten |
|  | Fast grönt sken | Inga problem med matningen |
|  | 1 grön blinkning | Ingen nätspänning |
|  | 2 gröna blinkningar | Otillräcklig spänning från reservbatteriet |

### Komponenter som behövs för installationen

Innan du börjar installationen, se till att du har följande:

1.  USB Type-C-kabel för konfigurering.

2.  Minst 4-ledarkabel för att ansluta larmsändaren till brandlarmcentralen.

3.  Spårskruvmejsel 2,5 mm.

4.  Extern mobilantenn om nättäckningen i området är dålig.

5.  Aktiverat nano-SIM-kort (PIN-kodsbegäran kan vara avstängd).

6.  Manualen för den brandlarmcentral som larmsändaren ska anslutas till.

Beställ nödvändiga komponenter separat från din lokala distributör.

## Matning av larmsändaren

### Huvudmatning

Larmsändaren måste matas från en DC-källa. Ett reservbatteri på 12 V måste vara anslutet till systemet för att matningen ska vara oavbruten.

### Reservmatning

Om det blir problem med huvudmatningen skapas en händelserapport ”**DC Fault**” och enheten växlar automatiskt till reservbatteriet på 12 V. Om batteriets spänning sjunker till 11,5 V skapas en händelserapport ”**Low Battery**”. Batteriet kopplas bort om spänningen sjunker under 9,5 V. När DC-spänningen är åter skapas en rapport ”**DC Restore**” och batteriet börjar laddas automatiskt. När batteriets spänning stiger till 12,6 V skapas en händelserapport ”**Battery Restore**”.

### Larmsändarens leveransomfattning

| Benämning | Antal |
|----|:--:|
| Kretskort för larmsändaren ***FIRECOM*** med antenn, inbyggt i en metallkapsling | 1 st. |
| Metallkapsling med switchat nätaggregat från Mean Well | 1 st. |
| Motstånd 10 kΩ | 20 st. |
| Ledning för anslutning av batteriet | 1 st. |
| Sabotagekontakt | 1 st. |
| Plintblock med 3,15 A säkring | 1 st. |
| Fästelement (skruvar – 4 st., nylonplugg – 4 st.). | 1 |

!!! note "Obs!"
    USB-kabel (Type-C) för programmering av larmsändaren säljs separat.

## Installation av systemet

Larmsändarens kretskort monteras i en monteringskapsling som redan har ett DC-nätaggregat med 3,15 A säkring och utrymme för ett reservbatteri.

**Mått på kretskortet FIRECOM**

Bilden nedan visar kretskortets mått och monteringshål (i millimeter) samt hålens placering.

<img alt="Kretskortet FIRECOM, layout och mått i millimeter. Kortet är 138 gånger 78,5 mm med fyra monteringshål Ø 4 mm på 93 mm avstånd horisontellt och 61 mm vertikalt; det nedre vänstra hålet sitter 5 mm från vänsterkanten och 10 mm från nederkanten. Beteckningar visar SIM1, SIM2, USB, GSM ANT, LAN, matning, RS485, IO1–IO10 och tre reläer." src="./image5.webp" style="width:6.080012029746282in;height:4.020007655293089in" />

### Ordning för anslutning av enheter

<img alt="Kopplingsschema: FIRECOM till SIM-kort, LAN, DC-nätaggregat och reservbatteri. Hänvisningar: 1 sätt i det aktiverade nano-SIM-kortet i SIM1; 2 anslut LAN-kabeln; 3 använd plintraden för branddetektorer, larmdon och styrda enheter; 4 anslut ~230 V via FU 500 mA, 250 V till DC-nätaggregatet märkt 15–32 V, 1,5 A och därefter dess + och − till kretskortets plintar + och −; 5 anslut reservbatteriet 12 V, 7 Ah till batteriplintarna med den polaritet som visas." src="./image6.webp" style="width:7.086805555555555in;height:3.696527777777778in" />

1.  Om du använder ett SIM-kort, sätt i det aktiverade SIM-kortet i kortplatsen.

2.  Om du använder LAN, anslut LAN-kabeln.

3.  Anslut branddetektorer, larmdon och styrda enheter enligt kopplingsschemana här och enligt kopplingsschemat för varje enhet som ska anslutas.

4.  Anslut ledningarna för nätspänningen till plintarna.

5.  Sätt ett reservbatteri i monteringskapslingen. Anslut batteriets plintar till plintarna BAT+ / BAT– på larmsändaren.

!!! note "Obs!"
    Batteriet ska väljas så att det laddas till 80 % av kapaciteten inom 24 timmar och att den återstående kapaciteten nås inom de följande 48 timmarna, för att uppfylla kraven i standarden EN54.

### Anslutning av detektorer

Larmsändarens kretskort har 10 plintar IO1–IO10 (ingångar) för anslutning av detektorkretsar. Antalet ingångar kan utökas till 32 med ingångsmoduler (***iO-8, iO-MO, iO-LORA, iO8-LORA**)*. Varje plint kan ställas in som ingång och tilldelas sektionsattribut: kretstyp (NO, NC, EOL, EOL_T, ATZ, ATZ_T); känslighet för tillfälliga kretshändelser; se avsnitt 6.6 (fönstret ”Zones”).

**Kopplingsscheman för anslutning av detektorer.**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image7.webp" alt="Kopplingsschema: FIRECOM, ingång IOx till gemensam plint C via en normalt öppen (NO) kontakt. Kontakten visas öppen; inget motstånd finns." style="width: 2.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image8.webp" alt="Kopplingsschema: FIRECOM, ingång IOx till gemensam plint C via en normalt sluten (NC) kontakt. Kontakten visas sluten; inget motstånd finns." style="width: 2.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image9.webp" alt="Tabell med motståndsvärden i kolumnerna RT, R1 och R2. Raderna i ordning: 2,2k, 2,2k, 4,7k; 1k, 1k, 2,2k; 5,6k, 5,6k, 3,3k; 5,6k, 3,3k, 5,6k; 3,3k, 6,8k, 3,3k; 2,2k, 4,7k, 8,2k; och 10k, 10k, 5,6k." style="width: 2.0in; height:in;" />
</figure>


</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image10.webp" alt="Kopplingsschema: FIRECOM, ingång IOx till gemensam plint C, normalt öppen med slutmotstånd (EOL). NO-kontakten och motståndet R1 är parallellkopplade mellan IOx och C." style="width: 2.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image11.webp" alt="Kopplingsschema: FIRECOM, ingång IOx till gemensam plint C, normalt sluten med slutmotstånd (EOL). NC-kontakten och motståndet R1 är seriekopplade." style="width: 2.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image12.webp" alt="Kopplingsschema: FIRECOM, ingång IOx till gemensam plint C, normalt sluten med slutmotstånd samt igenkänning av sabotage och ledningsfel (EOL_T). Från IOx är NC-sabotagekontakten och RT seriekopplade; efter RT är R1 parallellkopplat med en andra NC-kontakt som leder till C." style="width: 3.0in; height:in;" />
</figure>

</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image13.webp" alt="Kopplingsschema: FIRECOM, IOx till C via två detektorplintar. Normalt sluten utan slutmotstånd (ATZ): detektorplint 1 har en NC-kontakt parallellt med R1; detektorplint 2 har en NC-kontakt parallellt med R2. De två detektorkretsarna är seriekopplade." style="width: 2.5in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image14.webp" alt="Kopplingsschema: FIRECOM, IOx till C via två detektorplintar. Normalt sluten med slutmotstånd samt igenkänning av sabotage och ledningsfel (ATZ_T): detektorplint 1 har en NC-sabotagekontakt och RT i serie, följt av en NC-kontakt parallellt med R1; detektorplint 2 har en NC-sabotagekontakt i serie, följt av en NC-kontakt parallellt med R2." style="width: 4.5in; height:in;" />
</figure>


</div>

### Anslutning av rökdetektorer

Kopplingsschema för anslutning av 2-tråds rökdetektorer.

Kopplingsschema för anslutning av 2-tråds rökdetektorer till utgången ”**FLOOP**”. När detta kopplingsschema används måste ingångstypen ”**Input**” ställas in på ”**FC Fire sensor (FLOOP input)**” i fönstret ”Zones”. Branddetektorns larmström måste vara över 10 mA. Upp till 8 branddetektorer kan anslutas till utgången ”**FLOOP**”.

<img alt="Kopplingsschema: FIRECOM till två rökdetektorer. AUX+ till den första detektorns + IN; FLOOP till dess - IN. Varje detektors + och - OUT matar nästa detektors IN-plintar. Ett slutmotstånd på 2,2 kΩ ansluts mellan de sista + och - OUT-plintarna." src="./image15.webp" style="width:6.0in;height:in" />

Kopplingsscheman för 2-tråds rökdetektorer med relämodulen SM1. För att ansluta rökdetektorkretsen till den valda ingången måste ingången (IOx) aktiveras och kretstypen (NO, NC, EOL, EOL_T, ATZ, ATZ_T) ställas in (se avsnitt 6.6, fönstret ”Zones”). För att ansluta rökdetektorernas matningskrets till PGM-utgången (IO10) måste funktionen ”**Fire Sensor Reset**” tilldelas utgången (se avsnitt 6.7, fönstret ”PGM”).

\* Reläet används för att upptäcka kabelbrott och att en branddetektor har tagits bort. Om du inte använder ett relä (K1) måste kontakt K1 kortslutas.

<img alt="Kopplingsschema för FIRECOM med två rökdetektorer, relämodulen SM1 och reläet K1. AUX+ går till SM1 +12V och den första detektorns + IN; IO10 går till SM1 -12V och ena sidan av K1:s spole. SM1 R går till den första detektorns - IN. Båda OUT-ledningarna fortsätter från den första detektorn till den andra. Den andra detektorns + OUT går till andra sidan av K1:s spole; dess - OUT har ingen utgående ledning. För den övervakade ingången går IOx till SM1 C, medan SM1 NC går via K1-kontakten och slutmotståndet R1 i serie till FIRECOM C." src="./image16.webp" style="width:6.5in;height:in" />

Eller

<img alt="Alternativt kopplingsschema för FIRECOM med två rökdetektorer, relämodulen SM1 och reläet K1. AUX+ går till SM1 +12V och den första detektorns + IN; IO10 går till SM1 -12V och ena sidan av K1:s spole. SM1 R går till den första detektorns - IN. Båda OUT-ledningarna fortsätter till den andra detektorn. Dess + OUT går till andra sidan av K1:s spole; dess - OUT har ingen utgående ledning. IOx går till SM1 C och SM1 NO går till FIRECOM C. K1-kontakten och slutmotståndet R1 bildar en seriegren mellan IOx och C." src="./image17.webp" style="width:6.5in;height:in" />

Kopplingsschema för anslutning av 4-tråds rökdetektorer.

För att ansluta rökdetektorkretsen till den valda ingången måste ingången (IOx) aktiveras och kretstypen (NO, NC, EOL, EOL_T, ATZ, ATZ_T) ställas in (se avsnitt 6.6, fönstret ”Zones”). För att ansluta matningskretsen för en 4-tråds rökdetektor till PGM-utgången (IO10) måste funktionen ”**Fire Sensor Reset**” tilldelas utgången (se avsnitt 6.7, fönstret ”PGM”).

\* Reläet används för att upptäcka kabelbrott och att en branddetektor har tagits bort. Om du inte använder ett relä (K1) måste kontakt K1 kortslutas.

<img alt="Kopplingsschema: FIRECOM till två 4-tråds rökdetektorer och reläet K1. Matning: AUX+ till den första + IN och IO10 till den första - IN; deras OUT-plintar matar den andra detektorn, vars sista + och - OUT ansluts över K1:s spole. Larmslinga: IOx och C går till den första detektorns kontaktplintar IN och fortsätter till den andra detektorn. Varje detektorkontakt överbryggar larmparet; slutmotståndet R1 och K1-kontakten bildar en seriegren över det sista OUT-paret." src="./image18.webp" style="width:6.5in;height:in" />

### Kopplingsschema för anslutning av larmsändaren till en brandlarmcentral

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image19.webp" alt="Anslutning av brandlarmcentral till FIRECOM utan inbyggt nätaggregat. Centralens +24 V går till FIRECOM +DC och centralens GND till -DC. De övre plintarna på centralens utgångar PGM1, PGM2 och PGM3 går till FIRECOM IO1, IO2 respektive IO3. Deras nedre plintar förenas med FIRECOM C-ledningen. Ett motstånd R1 överbryggar övre och nedre plint på varje PGM-utgång; de mittersta PGM-plintarna har inga yttre ledningar i detta schema." style="width: 4.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image20.webp" alt="Anslutning av brandlarmcentral till FIRECOM med inbyggt nätaggregat. De övre plintarna på centralens utgångar PGM1, PGM2 och PGM3 går till FIRECOM IO1, IO2 respektive IO3. Deras nedre plintar förenas med FIRECOM C-ledningen. Ett motstånd R1 överbryggar övre och nedre plint på varje PGM-utgång; de mittersta PGM-plintarna har inga yttre ledningar i detta schema. Ingen matningsanslutning visas." style="width: 4.0in; height:in;" />
</figure>


</div>

Om du vill övervaka brandlarmcentralens status ansluter du dess motsvarande utgångar till ingångarna på ***FIRECOM***. Brandlarmcentralens utgångar (PGM1, PGM2, PGM3) måste konfigureras som statusutgångar (”Alarm”, ”Trouble” osv.).

### Kopplingsschema för anslutning av brandlarmcentral med protokollet ESPA4.4.4

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image21.webp" alt="Kopplingsschema: brandlarmcentral ESPA4.4.4 till FIRECOM utan nätaggregat. Matning: ESPA4.4.4 +24V till FIRECOM +DC, 0V till -DC. RS485: ESPA4.4.4 A till FIRECOM A2, B till B2." style="width: 3.5in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image22.webp" alt="Kopplingsschema: brandlarmcentral ESPA4.4.4 till FIRECOM med inbyggt nätaggregat. ESPA4.4.4 0V till FIRECOM C. RS485: ESPA4.4.4 A till FIRECOM A2, B till B2." style="width: 3.5in; height:in;" />
</figure>


</div>

Inställningar för larmsändaren ***FIRECOM*** i ***TrikdisConfig*** när en brandlarmcentral ansluts.

1.  Välj **ESPA4.4.4**.

2.  Välj anslutningstyp.

3.  Larmsändaren ***FIRECOM*** och brandlarmcentralen måste ha samma inställningar för dataöverföring.

<img alt="TrikdisConfig 1.66.60, Program, Modules, RS485 2 interface. Hänvisning 1, välj ESPA 4.4.4 i Interface type; hänvisning 2, välj RS485 i Connection; hänvisning 3, anpassa inställningarna för dataöverföring: Baudrate 9600, 8 bits, None parity, 1 stop bit, Delay 0 ms." src="./image23.webp" style="width:7.0in;height:in" />

4.  Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***.

<img alt="TrikdisConfig 1.66.60, Program, Users & Reporting, Users. Hänvisning 4 markerar en användarrad med fälten Name, Tel number och Email för mottagarna; rutorna PGM, ACK och FWD är markerade." src="./image24.webp" style="width:7.0in;height:in" />

5.  Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**).

<img alt="TrikdisConfig 1.66.60, Program, System events, SMS & Call reporting. Hänvisning 5 markerar inställningarna för User 1 vid händelse 19, ESPA 4.4.4 text: SMS är markerat och Call är inte markerat." src="./image25.webp" style="width:7.0in;height:in" />

6.  Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare. Händelsemeddelandena överförs med protokollet SIA DC-09.

<img alt="TrikdisConfig 1.66.60, Program, Reporting to CMS, Reporting. Hänvisning 6 markerar Primary channel: Communication type Disabled, Domain or IP tomt, Port 0, Protocol TRK och Encryption Key dold. Communication type för Parallel channel är Disabled." src="./image26.webp" style="width:7.0in;height:in" />

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från ***FIRECOM*** skickas till larmcentralen (CMS, Central Monitoring Station) och till ***Protegus2***.

### Kopplingsschema för anslutning av brandlarmcentralen NSC Solution

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image27.webp" alt="Kopplingsschema: brandlarmcentral NSC Solution till FIRECOM utan nätaggregat. Matning: NSC Solution +24V till FIRECOM +DC, 0V till -DC. RS485: NSC Solution A till FIRECOM A2, B till B2." style="width: 4.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image28.webp" alt="Kopplingsschema: brandlarmcentral NSC Solution till FIRECOM med inbyggt nätaggregat. RS485 och gemensam plint: centralens 0V till FIRECOM C, A till A2, B till B2." style="width: 4.0in; height:in;" />
</figure>



</div>

Inställningar för larmsändaren ***FIRECOM*** i ***TrikdisConfig*** när brandlarmcentralen **NSC Solution** ansluts.

1.  Välj brandlarmcentralen **NSC solution**.

2.  ”**NSC slave address**” får inte vara samma som adressen på någon av de modulerna som är anslutna till brandlarmcentralen.

<img alt="TrikdisConfig, skärmen Modules. I RS485 2 interface är Interface type NSC solution och NSC slave address 10." src="./image29.webp" style="width:7.0in;height:in" />

3.  Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***.

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken Users. Hänvisning 3 markerar en användarrad med fälten Name, Tel number och Email och markerade rutor PGM, ACK och FWD." src="./image30.webp" style="width:7.0in;height:in" />

4.  Användarna får SMS och samtal om de händelser som är markerade. Du kan lägga till fler CID-händelsekoder i kolumnen **CID**. Du måste ange **SMS text** bredvid nya koder. Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**).

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken SMS for Panel events. För User 1 är SMS markerat och Call inte markerat för de synliga händelserna: E110 Fire alarm, E118 Fire pre-alarm state, E380 Detector fault, E323 Line fault, E301 AC loss, E302 Low battery och E311 Missing battery." src="./image31.webp" style="width:7.0in;height:in" />

5.  Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare.

<img alt="TrikdisConfig, skärmen Reporting to CMS, fliken Reporting. Den markerade Primary channel visar Communication type Disabled, ett tomt fält Domain or IP, Port 0, Protocol TRK och en dold Encryption Key. Communication type för Parallel channel är Disabled." src="./image32.webp" style="width:7.0in;height:in" />

När du har ställt in larmsändaren ***FIRECOM*** slår du på brandlarmcentralens matning. Vänta tills brandlarmcentralens programvara har laddats. Modulerna som är anslutna till RS485-bussen måste skannas i brandlarmcentralen. Tryck på brandlarmcentralen: **PROG.\>INSTALLER\>(ange installatörskoden) 00000 OK\>(välj) SETTINGS\>ENTER\>(välj) SCAN RS485\>ENTER**. Vänta tills skanningen är klar. Återgå till huvudskärmen genom att trycka på ”**CANCEL**” två gånger.

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från ***FIRECOM*** skickas till larmcentralen (CMS, Central Monitoring Station) och till ***Protegus2***.

### Kopplingsschema för anslutning av brandlarmcentralen INIM SMARTLINE

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image33.webp" alt="Kopplingsschema: brandlarmcentral INIM Smartline till FIRECOM utan nätaggregat. Matning: centralens 13 +24 till FIRECOM +DC, 16 GND till -DC. RS485: centralens 15 +RS485 till FIRECOM A2, 14 -RS485 till B2. De korsande ledningarna har inga skarvpunkter." style="width: 4.5in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image34.webp" alt="Kopplingsschema: brandlarmcentral INIM Smartline till FIRECOM med inbyggt nätaggregat. RS485 och gemensam plint: centralens 16 GND till FIRECOM C, 15 +RS485 till A2, 14 -RS485 till B2. De korsande ledningarna har inga skarvpunkter." style="width: 4.5in; height:in;" />
</figure>


</div>

Läget **Slave** måste ställas in på brandlarmcentralen **INIM Smartline** när den ansluts till larmsändaren ***FIRECOM*** via RS485-bussen.

<img alt="SmartLeague, fönstret RS485 Bus Programming. Under Master/Slave Settings är Configure as Slave valt och Assign address är 1." src="./image35.webp" style="width:7.0in;height:in" />

!!! note "Obs!"
    Du kan inte ansluta ***FIRECOM*** via RS485-bussen om repeaterenheter är anslutna till brandlarmcentralen **INIM Smartline**. / Utbyggnadsmodulerna **iO** stöds inte när ***FIRECOM*** är ansluten till brandlarmcentralen **INIM Smartline** via RS485-bussen. Inställningar för larmsändaren ***FIRECOM*** i ***TrikdisConfig*** när brandlarmcentralen **INIM SMARTLINE** ansluts.

1.  Välj brandlarmcentralen **Inim Smartline**.

<img alt="TrikdisConfig, skärmen Modules. I RS485 2 interface är Interface type INIM smartline." src="./image36.webp" style="width:7.0in;height:in" />

2.  Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***.

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken Users. Hänvisning 2 markerar en användarrad med fälten Name, Tel number och Email och markerade rutor PGM, ACK och FWD." src="./image37.webp" style="width:7.0in;height:in" />

3.  Användarna får SMS och samtal om de händelser som är markerade. Du kan lägga till fler CID-händelsekoder i kolumnen **CID**. Du måste ange **SMS text** bredvid nya koder. Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**).

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken SMS for Panel events. För User 1 är SMS markerat och Call inte markerat för de synliga händelserna: E110 Fire alarm, E118 Fire pre-alarm state, E380 Detector fault, E323 Line fault, E301 AC loss, E302 Low battery och E311 Missing battery." src="./image38.webp" style="width:7.0in;height:in" />

4.  Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare.

<img alt="TrikdisConfig, skärmen Reporting to CMS, fliken Reporting. Den markerade Primary channel visar Communication type Disabled, ett tomt fält Domain or IP, Port 0, Protocol TRK och en dold Encryption Key. Communication type för Parallel channel är Disabled." src="./image39.webp" style="width:7.0in;height:in" />

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från ***FIRECOM*** skickas till larmcentralen (CMS, Central Monitoring Station) och till ***Protegus2***.

### Kopplingsschema för anslutning av brandlarmcentralen C-TEC Cast ZFP

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image40.webp" alt="Kopplingsschema: brandlarmcentral C-TEC Cast ZFP till FIRECOM utan nätaggregat. Matning: centralens +24V till FIRECOM +DC, 0V till -DC; den positiva ledningen är märkt +24 V. ABUS RS485: centralens A till FIRECOM A2, B till B2." style="width: 4.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image41.webp" alt="Kopplingsschema: brandlarmcentral C-TEC Cast ZFP till FIRECOM med inbyggt nätaggregat. ABUS RS485 och gemensam plint: centralens 0V till FIRECOM C, A till A2, B till B2." style="width: 4.0in; height:in;" />
</figure>


</div>

Inställningar för larmsändaren ***FIRECOM*** i ***TrikdisConfig*** när brandlarmcentralen **C-TEC Cast ZFP** ansluts.

1.  Välj brandlarmcentralen **C-TEC Cast ZFP**.

<img alt="TrikdisConfig, skärmen Modules. I RS485 2 interface är Interface type C-TEC Cast ZFP." src="./image42.webp" style="width:7.0in;height:in" />

2.  Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***.

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken Users. Hänvisning 2 markerar en användarrad med fälten Name, Tel number och Email och markerade rutor PGM, ACK och FWD." src="./image37.webp" style="width:7.0in;height:in" />

3.  Användarna får SMS och samtal om de händelser som är markerade. Du kan lägga till fler CID-händelsekoder i kolumnen **CID**. Du måste ange **SMS text** bredvid nya koder. Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**).

<img alt="TrikdisConfig, skärmen Users & Reporting, fliken SMS for Panel events. För User 1 är SMS markerat och Call inte markerat för de synliga händelserna: E110 Fire alarm, E118 Fire pre-alarm state, E380 Detector fault, E323 Line fault, E301 AC loss, E302 Low battery och E311 Missing battery." src="./image43.webp" style="width:7.0in;height:in" />

4.  Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare.

<img alt="TrikdisConfig, skärmen Reporting to CMS, fliken Reporting. Den markerade Primary channel visar Communication type Disabled, ett tomt fält Domain or IP, Port 0, Protocol TRK och en dold Encryption Key. Communication type för Parallel channel är Disabled." src="./image39.webp" style="width:7.0in;height:in" />

Installera programmet **ZFPtools** på datorn. Starta programmet **ZFPtools**. Slå på brandlarmcentralens matning. Vänta tills brandlarmcentralens programvara har laddats. Anslut brandlarmcentralen till datorn med en USB2.0 A-B-kabel.

1.  Öppna fliken ”**Node View**”.

<img alt="ZFP Programming Tools, fönstret Site Details. Fliken Node View är markerad för val." src="./image44.webp" style="width:7.0in;height:in" />

2.  Ladda ned brandlarmcentralens inställningar till datorn.

<img alt="ZFP Programming Tools, Node View för Panel 1. Knappen Retrieve All Data är markerad." src="./image45.webp" style="width:7.0in;height:in" />

3.  Ange koden (förvald kod – 4444).

4.  Klicka på ”**OK**”.

<img alt="ZFP Programming Tools, fönstret Panel Log In. Texten Enter Access Level 3 Code står ovanför fyra tomma kodrutor; den gröna bockknappen bekräftar inmatningen." src="./image46.webp" style="width:3.5in;height:in" />

5.  Välj ”**BMS Interface**”.

6.  Klicka på den lediga ikonen.

<img alt="ZFP Programming Tools, Node View, Devices. BMS Interface är valt i Device Palette och knappen Edit Devices är markerad." src="./image47.webp" style="width:7.0in;height:in" />

7.  Klicka på ”**Edit Devices**”.

<img alt="ZFP Programming Tools, Node View, Devices. Ett BMS Interface upptar enhetsplats 16 och knappen Edit Devices är markerad." src="./image48.webp" style="width:7.0in;height:in" />

8.  På fliken ”**Device**” anger du systemets namn.

<img alt="ZFP Programming Tools, Node View, Devices, Device Properties för enhet 16. På fliken Device är Name FIRECOM och Device Type BMS Interface." src="./image49.webp" style="width:7.0in;height:in" />

9.  På fliken ”**Properties**” anger du systemets namn.

10. Ange den buss ”**ABUS RS485**” som larmsändaren ***FIRECOM*** är ansluten till.

11. Konfigurera meddelandena.

12. Skriv inställningarna till brandlarmcentralen.

<img alt="ZFP Programming Tools, Device Properties för BMS Interface. Name är FIRECOM; Connection är ABUS RS485; BAUD Rate är 57600; Response Timeout är 250; Max Retries är 5. Zone Disablements rapporterar Zone; Input Group Disablements, Output Group Disablements och Group Actions rapporterar Group. Knappen Send All Data är markerad." src="./image50.webp" style="width:7.0in;height:in" />

13. Ange koden (förvald kod – 4444).

14. Klicka på ”**OK**”.

<img alt="ZFP Programming Tools, fönstret Panel Log In. Texten Enter Access Level 3 Code står ovanför fyra tomma kodrutor; den gröna bockknappen bekräftar inmatningen." src="./image51.webp" style="width:3.5in;height:in" />

Brandlarmcentralen är programmerad. Koppla bort USB2.0 A-B-kabeln från brandlarmcentralen.

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från ***FIRECOM*** skickas till larmcentralen (CMS, Central Monitoring Station) och till ***Protegus2***.

### Kopplingsschema för anslutning av brandlarmcentralen Polon-Alfa 3000

**Larmsändaren FIRECOM ansluts till Polon-Alfa 3000 via RS485-bussen**

<img alt="Kopplingsschema: Polon-Alfa 3000 MSO-30 och MK-30 till FIRECOM. Matning: MSO-30 Z1 24V ZEW + till FIRECOM 15-32V/DC 2,5A +, Z1 - till FIRECOM -. RS485: MK-30 Z1 RS485 A till FIRECOM RS485 A2, B till B2. MK-30 GND visas oansluten." src="./image98.webp" style="width:7.0in;height:in" />

Konfigurera larmsändaren ***FIRECOM*** med ***TrikdisConfig***. 

1.	Välj **Polon-Alfa 3000**.
	
2.	Välj anslutningstyp **RS485**. 

<img alt="TrikdisConfig FC, Modules, RS485 2 interface. Hänvisning 1: Interface type är Polon-Alfa 3000. Hänvisning 2: Connection är RS485." src="./image99.webp" style="width:7.0in;height:in" />

3.	Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***. 

<img alt="TrikdisConfig FC, Users & Reporting, Users. Hänvisning 3 markerar användare 1A med namn, telefonnummer och e-postadress ifyllda; PGM, ACK och FWD är markerade." src="./image100.webp" style="width:7.0in;height:in" />

4.	Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**). 

<img alt="TrikdisConfig FC, System events, SMS & Call reporting. Hänvisning 4: för User 1 har 10 Event SMS och Call markerade; 10 Restore har SMS markerat och Call inte markerat." src="./image101.webp" style="width:7.0in;height:in" />

5.	Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare. 

<img alt="TrikdisConfig FC, Reporting to CMS, Reporting. Hänvisning 5 markerar Primary channel: Communication type Disabled, Domain or IP och Port tomma, Protocol TRK, Encryption Key tom. Communication type för Parallel channel är Disabled." src="./image102.webp" style="width:7.0in;height:in" />

Brandlarmcentralen **POLON-ALFA 3000** med modulen **MK-30** måste konfigureras med programmet **POLON Studio** för att fungera via protokollet Modbus RTU (RS485). 

<img alt="Modulfönstret MK-30 (1). Modbus Interface är RS-485; Modbus RTU Bitrate är 115200, Parity None, Stop Bits 1 och Address 1." src="./image111.webp" style="width:3.5in;height:in" /> 

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från ***FIRECOM*** skickas till larmcentralen (CMS, Central Monitoring Station) och till ***Protegus2***. 

***FIRECOM*** **och brandlarmcentralen Polon-Alfa 3000 ansluts till samma LAN**

<img alt="Kopplingsschema: Polon-Alfa 3000 MSO-30/MK-30 till FIRECOM via en ROUTER. LAN: MK-30 LAN till ROUTER LAN, och en andra LAN-port på routern till FIRECOM LAN, med LAN-kablar." src="./image103.webp" style="width:7.0in;height:in" />

Konfigurera larmsändaren ***FIRECOM*** med TrikdisConfig. 

1.	Välj **Polon-Alfa 3000**.

2.	Välj anslutningstyp **TCP**.
	
3.	Ange IP-adressen till brandlarmcentralen **Polon-AlfA 3000**.

<img alt="TrikdisConfig FC, Modules, RS485 2 interface. Hänvisning 1: Interface type Polon-Alfa 3000. Hänvisning 2: Connection TCP. Hänvisning 3: IP address 192.168.1.2." src="./image104.webp" style="width:7.0in;height:in" />

4.	Markera rutan ”**DHCP**” (automatiskt registreringsläge) så att larmsändaren ***FIRECOM*** automatiskt läser nätverksinställningarna (nätmask, gateway) och tilldelas en IP-adress. 

<img alt="TrikdisConfig FC, Reporting to CMS, Settings, LAN network parameters. Hänvisning 4 markerar DHCP som markerat; Static IP, Subnet mask och Default gateway är tomma och inaktiva." src="./image105.webp" style="width:7.0in;height:in" />

5.	Ange telefonnummer och e-postadresser för de användare som ska få meddelanden från ***FIRECOM***. 

<img alt="TrikdisConfig FC, Users & Reporting, Users. Hänvisning 5 markerar användare 1A med namn, telefonnummer och e-postadress ifyllda; PGM, ACK och FWD är markerade." src="./image106.webp" style="width:7.0in;height:in" />

6.	Om användaren ska få meddelanden (eller samtal) om händelser, markera rutan **SMS** (eller **Call**). 

<img alt="TrikdisConfig FC, System events, SMS & Call reporting. Hänvisning 6: för User 1 har 10 Event SMS och Call markerade; 10 Restore har SMS markerat och Call inte markerat." src="./image107.webp" style="width:7.0in;height:in" />

7.	Konfigurera kommunikationskanalen om meddelanden ska skickas till larmcentralens mottagare. 

<img alt="TrikdisConfig FC, Reporting to CMS, Reporting. Hänvisning 7 markerar Primary channel: Communication type Disabled, Domain or IP och Port tomma, Protocol TRK, Encryption Key tom. Communication type för Parallel channel är Disabled." src="./image108.webp" style="width:7.0in;height:in" />

Brandlarmcentralen **Polon-Alfa 3000** med modulen **MK-30** måste konfigureras med programmet **Polon Studio** för att fungera via LAN. IP-adresserna för LAN måste anges enligt dina nätverksinställningar. 

<img alt="Modulfönstret MK-30 (1). Modbus TCP IP är 192.168.1.2, Modbus TCP Mask 255.255.255.0, Modbus TCP Gate 192.168.1.1 och Modbus TCP Port 502." src="./image112.webp" style="width:3.5in;height:in" />

Testa systemet. Utlös ett brandlarm och kontrollera att meddelanden från **_FIRECOM_** skickas till larmcentralen (CMS, Central Monitoring Station) och till **_Protegus2_**. 

### Kopplingsschema för anslutning av en temperaturgivare

<img alt="Kopplingsschema: FIRECOM till temperaturgivaren DS18B20. Röd ledning: +5V till +Vdd. Gul ledning: 1 W till DQ. Svart ledning: C till GND." src="./image52.webp" style="width:4.5in;height:in" /> / <img alt="Kopplingsschema: FIRECOM till givaren för temperatur och fukt AM2301. Röd ledning: +5V till +Vdd. Gul ledning: 1 W till DQ. Svart ledning: C till GND." src="./image53.webp" style="width:3.616674321959755in;height:1.3200021872265966in" />

Anslut temperaturgivarna enligt kopplingsschemat. Temperaturgivare av typ Maxim®/Dallas® DS18S20, DS18B20 (upp till 8) eller en givare för fukt och temperatur AM2301 (upp till 1) kan anslutas till larmsändaren ***FIRECOM***. 
Om en ledning längre än 0,5 meter används för att ansluta en temperaturgivare rekommenderar vi partvinnad kabel (UTP4x2x0,5 eller STP4x2x0,5). 
Plinten ”**+5V**” på kretskortet är avsedd för 5 V DC matning av enheter som är anslutna till databussen ”**1-Wire**”. Största utström är 0,2 A. Utgången är överlastskyddad. Om den största tillåtna strömmen överskrids stängs matningen av automatiskt. Larmsändaren känner automatiskt igen anslutna enheter och kopplar ihop dem. 


### Kopplingsscheman för anslutning av ett relä och en lysdiodsindikator

<img alt="Kopplingsschema: FIRECOM till ett externt relä. Spole: AUX+ till ena spolplinten, IOx till den andra. Reläkontakterna är märkta NC, C och NO." src="./image54.webp" style="width:3.5in;height:in" /> / <img alt="Kopplingsschema: FIRECOM till en lysdiod som indikator. AUX+ ansluts via ett motstånd på 2k2 och lysdioden i serie till IOx." src="./image55.webp" style="width:2.09667104111986in;height:0.9066688538932633in" />

Med reläplintarna kan du styra (slå på/av) olika elektriska apparater på distans. Larmsändarens universella ”**I/O**”-plint måste vara inställd som utgång (OUT) och ha definitionen ”**Remote control**” tilldelad. 

### Kopplingsscheman för anslutning av brandlarmcentralens ingångar till larmsändaren

Enligt standarden EN54 måste brandlarmcentralen få information från larmsändaren om att kommunikationen med larmcentralen har fallerat och om att meddelanden har tagits emot av larmcentralen. Larmsändarens PGM-utgångar (till exempel ”**Relay1**” och ”**Relay2**”) måste anslutas till brandlarmcentralens särskilda ingångar. PGM-utgången ”**Relay1**” måste ställas in på ”**CMS fail**”. PGM-utgången ”**Relay2**” måste ställas in på ”**ACK received**”. Utgången ”**Relay1**” aktiveras när kommunikationskanalen till larmcentralen är bruten. Utgången ”**Relay2**” aktiveras i 5 sekunder när ett meddelande har skickats till larmcentralen.

<img alt="Kopplingsschema: brandlarmcentral till FIRECOM. Relay1: centralens C till C1, IN1 till NO1, med R1 parallellt över C1 och NO1. Relay2: centralens C till C2, IN2 till NO2, med ett andra R1 parallellt över C2 och NO2. IN3, NC1 och NC2 har inga visade anslutningar." src="./image56.webp" style="width:4.5in;height:in" />

### Kopplingsscheman för anslutning av utbyggnadsmoduler i serien iO

Om larmsändaren ***FIRECOM*** behöver fler ingångar (IN) eller utgångar (OUT), anslut en trådbunden eller trådlös utbyggnadsmodul för ingångar och utgångar i serien TRIKDIS ***iO***. Hur ***FIRECOM*** konfigureras för utbyggnadsmoduler beskrivs i avsnitt 6.5 (fönstret ”Modules”).

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
<figure style="margin: 0;">
<img src="./image57.webp" alt="Kopplingsschema: FIRECOM till iO-8. Matning: AUX+ (+12 V) till +DC, AUX- till -DC. RS485: A1 till A, B1 till B." style="width: 4.0in; height:in;" />
</figure>

<figure style="margin: 0;">
<img src="./image58.webp" alt="Kopplingsschema: FIRECOM till iO-MO. Matning: AUX+ (+12 V) till +DC, AUX- till -DC. RS485: A1 till A RS485, B1 till B RS485." style="width: 4.0in; height:in;" />
</figure>


</div>

Kopplingsscheman för anslutning av **LORA**-moduler.

<img alt="FIRECOM ansluts till RF-LORA: AUX+ (+12 V) till +DC, AUX− till −DC, RS485 A1 till A RS485 och B1 till B RS485. RF-LORA arbetar trådlöst, upp till 5000 m, med 1* iO-LORA, 2* iO-8-LORA, 3* PB-LORA och 8* REL-LORA. iO-LORA och iO-8-LORA har var sin separata matning på 12–26 V ansluten till +DC och −DC; REL-LORA har 100–230 V AC ansluten till L och N." src="./image59.webp" style="width:7.0in;height:in" />

### Starta larmsändaren

Slå på larmsändaren genom att först slå på dess matning. Lysdiodsindikeringarna på larmsändaren ska fungera på följande sätt:

- Lysdioden ”**STA**” ska blinka grönt – det visar att matningsspänningen är tillräcklig;

- Lysdioden ”**SIM**” ska lysa fast grönt och periodvis blinka gult minst 3 gånger – grönt betyder att SIM-kortet är registrerat i mobilnätet och antalet gula blinkningar anger mobilsignalens styrka. Indikeringen ”**ETH**” lyser grönt när larmsändaren är ansluten till LAN-nätverket.

!!! note "Obs!"
    Tillräcklig 4G-signalstyrka är nivå 3 (tre gula blinkningar på lysdioden ”**SIM**”). / Om du ser färre gula blinkningar på lysdioden ”**SIM**” är mobilnätets signalstyrka otillräcklig. Vi rekommenderar att du väljer en annan plats för larmsändaren, flyttar antennen eller använder en känsligare mobilantenn. / Om du ser en annan lysdiodsindikering, se avsnitt 1.5 ”Lysdiodsindikering vid drift” för att ta reda på orsaken. / Om alla indikeringar på FIRECOM är släckta, kontrollera matningen och anslutningarna.


## Snabbkonfiguration med programvaran *TrikdisConfig*

1.  Ladda ned konfigurationsprogrammet ***TrikdisConfig*** från [www.trikdis.com](http://www.trikdis.com) (skriv ”TrikdisConfig” i sökfältet) och installera det*.*

2.  Anslut ***FIRECOM*** till datorn med en USB Type-C-kabel.

3.  Starta ***TrikdisConfig***. Programmet identifierar automatiskt den anslutna enheten och öppnar automatiskt konfigurationsfönstret för ***FIRECOM***.

4.  Klicka på knappen **Read [F4]** för att se de aktuella parametrarna för ***FIRECOM***. Om ett fönster öppnas som begär administratörs- eller installatörskoden, ange den 6-siffriga koden.

Nedan beskrivs vilka inställningar som behöver ändras för att larmsändaren ska skicka händelser till appen ***Protegus2*** eller till larmcentralen.

### Inställningar för anslutning till appen Protegus2

**I fönstret ”System options”, inställningsgruppen ”SIM”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret System Options, fliken System general. I gruppen SIM markerar hänvisning 1 de två PIN-fälten för SIM-kort, båda med 1234. Hänvisning 2 markerar de två APN-fälten, båda med internet." src="./image60.webp" style="width:7.0in;height:in" />

1.  Ange koden ”**SIM card PIN**”.

2.  Ändra ”**APN**”. ”**APN**” hittar du på SIM-kortsoperatörens webbplats. ”**Internet**” är universellt och fungerar i de flesta operatörers nät.

**I fönstret ”Users & Reporting”, inställningsgruppen ”Cloud application”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret Users & Reporting, fliken Protegus. I gruppen Cloud application markerar hänvisning 3 den markerade rutan Enable cloud service; hänvisning 4 markerar Cloud Access Code 123456. Parallel reporting är också markerat." src="./image61.webp" style="width:7.0in;height:in" />

3.  Markera rutan ”**Enable cloud service**”.

4.  Ändra ”**Cloud access Code**” för ***Protegus2*** om användarna ska uppmanas att ange den när de lägger till systemet i appen ***Protegus2*** (förvalt lösenord – 123456).

**I fönstret ”Reporting to CMS”, fliken ”Settings”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret Reporting to CMS, fliken Settings. Hänvisning 5 markerar DHCP som markerat. Hänvisning 6 markerar rapporteringsläget för Protegus: Main type Ethernet (LAN), Backup type SIM och Backup type 2 Disabled." src="./image62.webp" style="width:7.0in;height:in" />

5.  Om en LAN-kabel är ansluten till larmsändaren, markera rutan ”**DHCP**” (automatiskt registreringsläge) så att larmsändaren ***FIRECOM*** automatiskt läser nätverksinställningarna (nätmask, gateway) och tilldelas en IP-adress.

6.  Ange parametrarna för hur larmsändaren ska skicka meddelanden till ***Protegus2***. Anslutningstyperna anges i ordning. Om anslutningen med den primära anslutningstypen misslyckas växlar larmsändaren till nästa, och så vidare. Om backupanslutningstypen lyckas skicka meddelandet till ***Protegus2*** görs ett nytt försök med anslutningstypen ”**Return to Primary**” efter ett inställt tidsintervall.

**I fönstret ”Zones”, fliken ”Zones settings”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret Zones, fliken Zones settings. Hänvisning 7 markerar kolumnen Prot. Rutorna är markerade för de helt synliga sektionerna 1 till 5." src="./image63.webp" style="width:7.0in;height:in" />

7.  Markera rutorna om användarna ska få aviseringar i ***Protegus2*** om ändringar i sektionernas tillstånd.

**I fönstret ”PGM”, fliken ”Outputs”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret PGM, fliken Outputs. Hänvisning 8 markerar kolumnen Prot.; rutorna är inte markerade för de synliga PGM-utgångarna 1 till 4. PGM 1, 2 och 3 använder RELAY 1, 2 och 3; PGM 4 är inställd på Disable. Varje synlig rad visar Remote Control och en pulstid på 20 sekunder." src="./image64.webp" style="width:7.0in;height:in" />

8.  Markera rutorna om användarna ska få aviseringar i ***Protegus2*** om ändringar i PGM-utgångarnas tillstånd.

**I fönstret ”System events”, fliken ”Events”:**

<img alt="TrikdisConfig, fönstret System events, fliken Events. Hänvisning 9 omger kolumnen Prot., med markerade rutor för de sju synliga händelserna: Low Battery, Periodic test, Battery missing, RS485 fault, High temperature, Low temperature och Temp. sensor lost." src="./image65.webp" style="width:7.0in;height:in" />

9.  Markera rutorna om användarna ska få aviseringar i ***Protegus2*** om ändringar i tillstånden för larmsändarens interna händelser.

När konfigureringen är klar klickar du på knappen **Write [F5]** och kopplar bort USB-kabeln.

!!! note "Obs!"
    Mer information om övriga inställningar för ***FIRECOM*** i ***TrikdisConfig*** finns i avsnitt 6 ”Beskrivning av TrikdisConfig-fönstren”.

### Inställningar för anslutning till larmcentralen

**I fönstret ”System Options”, fliken ”System general”:**

<img alt="TrikdisConfig, fönstret System Options, fliken System general. Hänvisning 1 markerar Object ID 0001. Hänvisning 2 markerar de två PIN-fälten för SIM-kort, båda med 1234. Hänvisning 3 markerar de två APN-fälten, båda med internet." src="./image66.webp" style="width:7.0in;height:in" />

1.  Ange numret i ”**Object ID**” (abonnentkod) som du har fått från larmcentralen (4 tecken, 0–9, A–F. **Använd inte FFFE, FFFF som Object ID**).

2.  Ange ”**SIM card PIN**”.

3.  Ändra ”**APN**”. ”**APN**” hittar du på SIM-kortsoperatörens webbplats. ”**Internet**” är universellt och fungerar i de flesta operatörers nät.

**I fönstret ”Reporting to CMS”, fliken ”Settings”:**

<img alt="TrikdisConfig, konfiguration av FIRECOM, fönstret Reporting to CMS, fliken Settings. Hänvisning 4 markerar DHCP som markerat. Hänvisning 5 markerar rapporteringsläget för larmcentralen: Main type Ethernet (LAN), Backup type SIM och Backup type 2 Disabled." src="./image67.webp" style="width:7.0in;height:in" />

4.  Om en LAN-kabel är ansluten till larmsändaren, markera rutan ”**DHCP**” (automatiskt registreringsläge) så att larmsändaren ***FIRECOM*** automatiskt läser nätverksinställningarna (nätmask, gateway) och tilldelas en IP-adress.

5.  Ange parametrarna för hur larmsändaren ska skicka meddelanden till larmcentralen. Anslutningstyperna anges i ordning. Om anslutningen med den primära anslutningstypen misslyckas växlar larmsändaren till nästa, och så vidare. Om backupanslutningstypen lyckas skicka meddelandet till larmcentralen görs ett nytt försök med anslutningstypen ”Return to Primary” efter ett inställt tidsintervall.

**I fönstret ”Reporting to CMS”, fliken ”Reporting”:**

<img alt="TrikdisConfig, fönstret Reporting to CMS, fliken Reporting. Hänvisningarna 6–10 markerar fälten i Primary channel: Communication type Disabled, tomt Domain or IP, Port 0, Protocol TRK och Encryption Key 123456. Hänvisning 11 omger Backup channel med samma visade värden. Hänvisning 12 omger Parallel channel: Communication type TCP/IP, tomt Domain or IP, Port 0, Protocol TRK och Encryption Key 123456. Parallel backup channel visar också TCP/IP, ett tomt Domain or IP, Port 0, Protocol TRK och Encryption Key 123456." src="./image68.webp" style="width:7.0in;height:in" />

6.  **Communication type** – välj kommunikationstyp (TCP eller UDP).

7.  **Domain or IP** – ange mottagarens domän eller IP-adress.

8.  **Port** – ange mottagarens nätverksportnummer.

9.  **Protocol** – välj vilket överföringsprotokoll som ska användas för att skicka meddelanden: **TRK** (till TRIKDIS-mottagare), **DC-09_2007** eller **DC-09_2012** (till universella mottagare), **TL150** (till SUR-GARD-mottagare).

10.  **Encryption Key** – ange mottagarens krypteringsnyckel.

!!! note "Obs!"
    Om du har valt **DC-09** som överföringsprotokoll anger du dessutom objekt-, linje- och mottagarnummer i inställningsgruppen ”**Settings**” i fönstret ”**Reporting to CMS**”.

11. (Rekommenderas) Konfigurera inställningarna för ”**Backup channel**”. 

12. Konfigurera ”**Parallel channel**” om meddelanden ska skickas till larmcentralens andra mottagare.

När konfigureringen är klar klickar du på knappen **Write [F5]** och kopplar bort USB-kabeln.

!!! note "Obs!"
    Mer information om övriga inställningar för ***FIRECOM*** i ***TrikdisConfig*** finns i avsnitt 6 ”Beskrivning av TrikdisConfig-fönstren”.

## Fjärrstyrning

### Lägga till larmsändaren i appen Protegus2

Med ***Protegus2*** kan användarna se systemets status och få aviseringar om systemhändelser.

1.  Ladda ned och starta appen ***Protegus2*** eller använd webbversionen [www.protegus.app](https://www.protegus.app):

    <div style="margin: 20px 0; text-align: center;">

    <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;"> <img src="./protegus-android.webp" alt="Hämta på Google Play" style="height:50px;"> </a> <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;"> <img src="./protegus-web.webp" alt="Öppna webbappen" style="height:50px;"> </a> <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;"> <img src="./protegus-ios.webp" alt="Ladda ned i App Store" style="height:50px;"> </a>

    </div>

2.  Logga in med ditt användarnamn och lösenord, eller skapa ett nytt konto.

!!! warning "Viktigt"
    När du lägger till systemet i ***Protegus2***, kontrollera att larmsändaren ***FIRECOM***:

    1.  Har ett isatt och aktiverat SIM-kort där PIN-koden är angiven eller
        avstängd;
    
    2.  Har tjänsten ***Protegus2*** aktiverad. Se avsnitt 6.4 (fönstret
        ”Users & Reporting”);
    
    3.  Är påslagen (lysdioden ”**STA**” ska blinka grönt);
    
    4.  Är ansluten till ett nätverk (lysdioden ”**SIM**” ska lysa fast grönt
        och blinka gult; och/eller lysdioden ”**ETH**” lyser grönt när
        larmsändaren är ansluten till LAN-nätverket).

3.  Klicka på ”**Add new system**” och ange numret ”**Unique ID**” för ***FIRECOM***. Numret finns på enheten och på etiketten på förpackningen. När du har angett ”**Unique ID**” klickar du på knappen ”**Next**”.

<img alt="Kommenterad skärmbild av sidan ”Scan QR code” i appen Protegus2: en hänvisning pekar på fältet Unique ID/IMEI och förklarar att IMEI-koden finns på förpackningen, på enheten och i TrikdisConfig som Unique ID. En röd ruta markerar QR-kodens plats på en exempeletikett nedanför. Knappar: Scan QR code, Cancel, Next." src="./image72.webp" style="width:3.5in;height:in" />

### Konfigurering och styrning med SMS

**1.  Ändra administratörslösenordet**

Av säkerhetsskäl bör du ändra det förvalda SMS-lösenordet för administratören. Skicka ett SMS i följande format:

​	**PSW 123456 xxxxxx**

**123456**	Förvalt administratörslösenord

**xxxxxx**	Nytt administratörslösenord med 6 tecken

**2.  Ge andra användare behörighet att styra**

Bara telefonnummer som finns i användarlistan kan styra systemet med SMS eller telefonsamtal. Skicka från administratörens telefon SMS med andra personers telefonnummer och namn för att ge dem behörighet att styra systemet:

​	**SETN xxxxxx PHONEx=+PHONENR#NAME#EMAIL**

**xxxxxx**		Administratörslösenord med 6 tecken

**x**			Användarens nummer i listan. (Om du anger 1 som användarnummer överför du dina administratörsrättigheter till den andra användaren.)

**PHONENR**	Användarens telefonnummer

**NAME**		Användarens namn

**EMAIL**		Användarens e-postadress



**Lista över SMS-kommandon**

| Kommando | Data | Beskrivning |
|----|----|----|
| INFO |  | Begär information om larmsändaren. Svaret innehåller objektnamn, områdets status, IMEI-nummer, mobilsignalstyrka, firmwareversion och serienummer. T.ex.: **INFO 123456** |
| RESET |  | Starta om enheten. T.ex.: **RESET 123456** |
| OUTPUTx | ON | Slå på en utgång, ”x” är utgångens nummer. T.ex.: **OUTPUT1 123456 ON** |
|  | OFF | Slå av en utgång, ”x” är utgångens nummer. T.ex.: **OUTPUT1 123456 OFF** |
|  | PULSE=ttt | Slå på en utgång under några sekunder – ”x” är numret på utgången OUT och ”ttt” är ett tresiffrigt tal som anger pulstiden i sekunder.  T.ex.: **OUTPUT1 123456 PULSE=002** |
| PSW | Nytt lösenord | Ändra lösenord. T.ex.: **PSW 123456 654123** |
| TIME | YYYY/MM/DD,12:00:00 | Ställ in datum och tid. T.ex.: **TIME 123456 2026/05/09,10:02:00** |
| TXTA | Objektnamn | Ange ett objektnamn. T.ex.: **TXTA 123456 House** |
| RDR | PhoneNR#SMStext | Vidarebefordra SMS till det angivna numret. Telefonnumret måste börja med ett ”+” och landskoden. T.ex.: **RDR 123456 +37061234567#forwarded text** |
| ASKI |  | Begär ett SMS med status för ingångarna IN. T.ex.: **ASKI 123456** |
| ASKO |  | Begär ett SMS med status för utgångarna OUT. T.ex.: **ASKO 123456** |
| ASKT |  | Skicka ett SMS med värdena från alla temperaturgivare.  T.ex.: **ASKT 123456** |
| FRS |  | Återställer branddetektorns utgång, om utgången OUT har funktionen ”Fire sensor reset” tilldelad. T.ex.: **FRS 123456** |
| SETN | PhoneX=PhoneNR#Name#email | Lägg till ett telefonnummer, ett användarnamn och en e-postadress och tilldela dem användare ”x”. ”x” är telefonnumrets rad i listan. Telefonnumret måste börja med ett ”+” och landskoden. Telefonnumret och användarnamnet måste skiljas åt med tecknet ”#”.  T.ex.: **SETN 123456 PHONE5=+37061234567#JOHN#jonas@trikdis.lt** |
|  | PhoneX=DEL | Ta bort användarens telefonnummer och namn från systemet.  T.ex.: **SETN 123456 PHONE5=DEL** |
| UUSD | \*Uusd code# | Skicka en UUSD-kod till operatören. T.ex.: **UUSD 123456 \*245#** |
| CONNECT | Protegus=ON | Anslut till molntjänsten Protegus. T.ex.: **CONNECT 123456 PROTEGUS=ON** |
|  | Protegus=OFF | Koppla från molntjänsten Protegus.  T.ex.: **CONNECT 123456 PROTEGUS=OFF** |
|  | Code=123456 | Kod för molntjänsten Protegus. T.ex.: **CONNECT 123456 CODE=123456** |
|  | IP=0.0.0.0:8000 | Ange TCP IP-adress och port för huvudserverns anslutningskanal.  T.ex.: **CONNECT 123456 IP=0.0.0.0:8000** |
|  | IP=0 | För att stänga av huvudkanalen. T.ex.: **CONNECT 123456 IP=0** |
|  | ENC=123456 | TRK-krypteringsnyckel. T.ex.: **CONNECT 123456 ENC=123456** |
|  | APN=Internet | APN-namn. T.ex.: **CONNECT 123456 APN=INTERNET** |
|  | USER=user | APN-användare. T.ex.: **CONNECT 123456 USER=User** |
|  | PSW=password | APN-lösenord. T.ex.: **CONNECT 123456 PSW=Password** |

### Styra PGM-utgångar med telefonsamtal

Gör så här om du vill styra en PGM-utgång på distans:

- Användaren måste ha behörighet att styra utgångar (OUT) och utgången (OUT) måste ha typen ”Remote control” tilldelad (med ***TrikdisConfig***).

- Ring upp numret till SIM-kortet i ***FIRECOM***. ***FIRECOM*** svarar på samtalet och du kan slå in kommandon med telefonens knappsats (se tabellen).

**Kommandolista för mobiltelefonens knappsats**

| Knappar | Funktion | Beskrivning |
|----|----|----|
| [utgångsnr]*[tillståndsnr]# | Styr vald utgång OUT | Styr den angivna PGM-utgången. Tillstånd:                    |
|  |  | [**0**] – utgången är avstängd;                                 |
|  |  | [**1**] – utgången är påslagen;                                  |
|                         |  | [**2**] – avstängd under pulstiden; |
|  |  | [**3**] – påslagen under pulstiden; (pulstiden anges i programvaran ***TrikdisConfig***, tabellen ”PGM”); |
|  |  | [*****] – denna symbol visar slutet på kommandot.                                 |
|  |  | T.ex. (slå på utgång 1): **1*1#** |
|  |  | T.ex. (slå av utgång 1): **1*0#** |
|  |  | T.ex. (slå på utgång 2 under ”Pulse time” enligt tabellen ”PGM” i ***TrikdisConfig***): **2\*3#** |
| # | Ange kommandot på nytt | Om du har gjort ett misstag när du angav kommandot trycker du på ”#” på telefonens knappsats och anger kommandot igen. |

## Beskrivning av *TrikdisConfig*-fönstren

### Beskrivning av statusfältet i TrikdisConfig

När ***FIRECOM*** har anslutits visar ***TrikdisConfig*** information om den anslutna enheten i statusfältet.

<img alt="Statusfältet i TrikdisConfig för FC_E170: fälten IMEI/Unique ID och SN visas, Status är Ready, BL är 1.02, FW är 1.07, State är USB och Role är Administrator." src="./image73.webp" style="width:7.0in;height:in" />

| Namn           | Beskrivning                                         |
| -------------- | --------------------------------------------------- |
| IMEI/​Unique ID | Enhetens IMEI-nummer                                |
| Status         | Driftstillstånd                                     |
| Device         | Enhetstyp (ska visa **FC_xxxx**)                    |
| SN             | Enhetens serienummer                                |
| BL             | Bootloader-version                                  |
| FW             | Enhetens firmwareversion                            |
| HW             | Enhetens maskinvaruversion                          |
| State          | Typ av anslutning till programmet (USB eller på distans) |
| Role           | Behörighetsnivå (visas när åtkomstkoden har godkänts) |

När du klickar på knappen **Read [F4]** läser programmet in och visar de inställningar som är sparade i ***FIRECOM***. Ange de parametrar som behövs i ***TrikdisConfig*** enligt beskrivningarna av programfönstren nedan.

### Fönstret ”System Options”

<img alt="TrikdisConfig FC_E170, System Options, System general. Under General visas Object ID 0001, Object name Fire communicator, Test period markerat med 1 day och 0 h, Start test at markerat för 13:30, Clear Events after reset markerat, Text language English, avbryt rapportering efter 10 likadana händelser per 10 s, återuppta rapportering efter 1 min, Call 2 times, EOL Type 10k+10k+5k6 och Communication path test 1 day. Under SIM visas PIN 1234 och APN internet i båda kolumnerna. Under Time settings visas modulens tid 2026/06/05 09:39:03, tidszon +2 h 0 min, Time set GSM modem, sommartid markerat och power failure delay 300 s." src="./image74.webp" style="width:7.0in;height:in" />

**Fliken ”System general”** **Inställningsgruppen ”General”**

- **Object ID** – om händelserna ska skickas till larmcentralen, ange det Object ID (hexadecimalt tal med 4 tecken, 0–9, A–F. **Använd inte FFFE, FFFF som Object ID**) som du har fått från larmcentralen.

- **Object name** – namnet på det objekt som används i SMS som skickas till användaren.

- **Test period** - när rutan är markerad skickas ”**Test**”-meddelanden med det inställda intervallet.

- **Start test at** - markera rutan och ange vid vilken tid testrapporterna ska skickas.

- **Clear Events after reset** – alla osända händelsemeddelanden raderas vid omstart.

- **Text language** – välj önskat språk så används språkets specialtecken i SMS.

- Du kan avbryta händelserapporteringen (**Suspend event reporting when …**) när ett visst antal likadana händelser per … s (**same events per … s**) inträffar.

- **Restore event reporting after …** – ange efter hur lång tid som avbrottet i händelserapporteringen ska upphävas. Tiden kan vara mellan 0 och 999 minuter.

- **Call –** när en händelse inträffar ringer ***FIRECOM*** upp användaren eller användarna så många gånger som är inställt. Om samtalet avvisas eller besvaras slutar ***FIRECOM*** att ringa. Ett samtal varar i 20 sekunder.

- **EOL Type** - ange värdena på de motstånd som är anslutna till detektorerna (EOL – End Of Line, slutmotstånd. **RT + R1 + R2**. Motståndet **RT** - sabotage; motståndet **R1** - detektor nr 1; motståndet **R2** - detektor nr 2).

- **Communication path test** - ange det tidsintervall efter vilket larmsändaren kontrollerar backupkommunikationskanalerna genom att skicka meddelanden till larmcentralen. När meddelandena har skickats via backupkanalerna återgår larmsändaren till primärkanalen.

**Inställningsgruppen ”SIM”**

- Ange koden ”**SIM card PIN**”. 

- **APN** – namnet på mobiloperatörens åtkomstpunkt för mobilt internet. Du måste ange **APN** om händelsemeddelanden ska skickas till appen ***Protegus2*** eller till larmcentralen via GPRS.

- Om GPRS-operatören kräver det, ange användarnamn och lösenord för **APN** i fälten **Login** och **Password**.

- **Locked ICCID** - ange SIM-kortets ICCID-nummer om du vill att larmsändaren bara ska fungera med just det SIM-kortet.

- **Preferred operator** - när du har angett mobiloperatörens kod ansluter larmsändaren bara till den valda operatörens nät. Mobiloperatörens kod består av MCC- och MNS-koder.

**Inställningsgruppen ”Time settings”**

Du kan ställa in tiden genom att klicka på knappen ”**Set PC time**”. Om ”**Disabled**” är valt i fältet ”**Time set**” ställs datorns tid in i larmsändaren. Om ett modem eller en server är valt i fältet ”**Time set**” synkroniserar larmsändaren sin tid mot det modemet eller den servern.

- **Time zone (hours)** – ange ditt lands tidszon. Om larmsändaren till exempel ska installeras i Litauen, ange **+2**.

- **Time set** – ange en server som ***FIRECOM***:s interna klocka ska synkroniseras mot. Synkroniseringen sker när larmsändaren har slagits på.

- **Daylight saving time** – om du markerar rutan växlar larmsändarens interna klocka automatiskt till sommar- eller vintertid.

- **Power failure delay** - vid strömavbrott i huvudmatningen skickas en avisering om strömavbrottet efter den angivna fördröjningen. När matningsspänningen är åter skickas en avisering om att spänningen är återställd efter den angivna fördröjningen.

**Fliken ”Groups”**

<img alt="TrikdisConfig FC_E170, System Options, Groups: grupptabellen visar ID 1 med Group name Group 1." src="./image75.webp" style="width:7.0in;height:in" />

Sektioner kan tilldelas grupper. Namnet på varje grupp kan ändras. **Group**-namnen visas i ***Protegus2***.

**Fliken ”Access”**

<img alt="TrikdisConfig FC_E170, System Options, Access. De åtkomstkoder som visas är Administrator Code 123456, SMS password 123456 och Installer Code 654321. Installer permissions för Object ID och SIM card är markerade. Area Settings och de synliga menybehörigheterna för Users & Reporting, Modules, Zones, PGM, Reporting to CMS och System events är inställda på Editable." src="./image76.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”Access codes”**

- **Administrator Code** – ger full åtkomst till konfigureringsfunktionerna (förvald kod – 123456).

- **SMS password** – lösenord för fjärrstyrning och programmering med SMS (förvald kod – 123456).

- **Installer Code** – ger begränsad åtkomst för att ändra larmsändarens konfiguration (förvald kod – 654321).

!!! note "Obs!"
    Om den förvalda administratörskoden (123456) är inställd visar programmet de aktuella driftparametrarna för enheten direkt när du har klickat på **Read [F4]**, utan att fråga efter koden. 

**Inställningsgruppen ”Installer permissions”**

Administratören kan ange vilka parametrar som installatören får ändra.

### Fönstret ”Reporting to CMS”

**Fliken ”Reporting”**

<img alt="TrikdisConfig FC_E170, Reporting to CMS, Reporting. Primary channel och Backup channel har Communication type Disabled; Parallel channel och Parallel backup channel har Communication type TCP/IP. Alla fyra kanaler visar Port 0, Protocol TRK och Encryption Key 123456. Fälten Domain or IP är tomma." src="./image77.webp" style="width:7.0in;height:in" />

Larmsändaren skickar meddelanden till larmcentralen via internet (IP).

Du kan tilldela primärkanalen en backupkanal. Den används när anslutningen via primärkanalen bryts.

Meddelanden som skickas till larmcentralen är kodade och lösenordsskyddade. En TRIKDIS-mottagare krävs för att ta emot meddelandena och skicka dem vidare till larmcentralens programvara:

- För IP-meddelanden – programvarumottagaren IPcom för Windows/Linux, maskinvarumottagaren IP/SMS RL14 eller flerkanalsmottagaren RM14.

**Inställningsgruppen ”Primary channel” (”Parallel channel”)**

- **Communication type** – välj metod för anslutning till larmcentralens mottagare.

- **Domain or IP** – ange mottagarens domän eller IP-adress.

- **Port** – ange mottagarens nätverksportnummer.

- **Protocol** – välj med vilken kodning händelserna ska skickas: **TRK** (till TRIKDIS-mottagare), **DC-09_2007** eller **DC-09_2012** (till universella mottagare. Genom att välja protokollet SIA DC kan du välja meddelandeformatet SIA-DCS.), **TL150** (till SUR-GARD-mottagare).

- **Encryption Key** – krypteringsnyckel för meddelanden, 6 siffror. Larmsändarens krypteringsnyckel måste stämma överens med mottagarens.

Om parametrar är inställda för den parallella kanalen skickas rapporter via båda kanalerna samtidigt. Båda kanalerna kan inte konfigureras för samma mottagare.

**Inställningsgruppen ”Backup channel” (”Parallel backup channel”)**

Aktivera backupkanalläget så att meddelanden kan skickas via backupkanalen om anslutningen störs. Konfigurera backupkanalen med samma inställningar som beskrivits ovan.

**Fliken ”Settings”**

<img alt="TrikdisConfig FC_E170, Reporting to CMS, Settings: Return to Primary after 5 min, IP Ping period aktiverat med 60 s, Backup reporting after 3 attempts, DNS1 8.8.8.8 och DNS2 1.1.1.1. DHCP är markerat; CMS och Protegus använder Ethernet (LAN) som Main type, SIM som Backup type och Disabled som Backup type 2." src="./image78.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”Settings”**

- **Return to Primary after** – tid efter vilken ***FIRECOM*** försöker återfå anslutningen via ”**Primary channel**”.
- **IP PING period** – period för sändning av interna PING-signaler för att kontrollera anslutningen. Dessa meddelanden skickas bara via IP-kanal. Mottagaren vidarebefordrar inte dessa signaler till larmcentralens programvara och överbelastar därför inte programvaran. Programvaran får bara en avisering när mottagaren inte får något PING-meddelande från enheten under en förinställd tid.

Som förval skickar mottagaren meddelandet ”**Connection lost**” till larmcentralens programvara efter en tid som är tre gånger längre än larmsändarens PING-period. Om IP PING-perioden till exempel är 3 minuter skickar mottagaren ett meddelande om förlorad anslutning om den inte får någon PING på 9 minuter.

PING-meddelanden upprätthåller också en aktiv session mellan enheten och mottagaren. En aktiv session krävs för att konfigurera och styra larmsändaren på distans. Vi rekommenderar att PING-perioden ställs in på högst 5 minuter.

- **Backup reporting after** – ange antalet misslyckade försök att skicka ett meddelande via ”**Primary channel**”. Om meddelandet inte kan skickas efter det angivna antalet försök sänder enheten via ”**Backup channel**”.

- **DNS1, DNS2** – (Domain Name System) server som anger domänens IP-adress. Den används när en domän anges i fältet ”**Domain or IP**” för kommunikationskanalen (i stället för en IP-adress). Förval – adresserna till Googles DNS-servrar.

Följande inställningar visas bara när protokollet **DC-09_2007** eller **DC-09_2012** är valt i fältet **Protocol** för kommunikationskanalen.

- **Object ID in SIA DC-09** – <u>ange objektnumret. Om du har valt protokollet DC-09 används det objektnummer som anges i detta fält</u>. Du kan ange ett hexadecimalt tal med 3–16 tecken som du har fått från larmcentralen.

- **SIA DC-09 receiver No.** – ange mottagarens nummer.

- **SIA DC-09 line No.** – ange linjenumret i mottagaren.

- **Local time in SIA -** markera rutan så att meddelandena till larmcentralen anger den tid som är inställd i modulen.

**Inställningsgruppen ”Reporting mode”**

Här ställs det in hur larmsändaren ska kommunicera via kanalerna till larmcentralen och med ***Protegus2***. Anslutningstyperna anges i ordning. Om larmsändaren inte kan ansluta med anslutningstypen ”**Main type**” växlar den till ”**Backup type**”, och så vidare. Om backupanslutningstypen lyckas skicka meddelandet till larmcentralen görs ett nytt försök med anslutningstypen ”**Return to main**” efter det angivna tidsintervallet.

- **Main type** – välj anslutningstyp (SIM, Ethernet (LAN)) mot larmcentralens mottagare och ***Protegus2***.

- **Backup type** – välj anslutningstyp (SIM, Ethernet (LAN)) mot larmcentralens mottagare och ***Protegus2***.

- **Backup type 2** – välj anslutningstyp (SIM, Ethernet (LAN)) mot larmcentralens mottagare och ***Protegus2***.

- **Dual path for CMS** - dual path-läget gör att larmcentral 1 (CMS1) arbetar över LAN och larmcentral 2 (CMS2) över SIM. De två kanalerna och kommunikationsvägarna arbetar parallellt. 

- **Return to main (both channel)** – tid efter vilken ***FIRECOM*** försöker återfå anslutningen via *primärkanalen*, om en backupkanal användes, min.

**Inställningsgruppen ”LAN network parameters”**

- **DHCP mode** – läge för registrering i LAN-nätverket (manuellt eller automatiskt). Markera rutan så läser larmsändaren ***FIRECOM*** automatiskt nätverksinställningarna (nätmask, gateway) och tilldelas automatiskt en IP-adress (automatiskt registreringsläge).

- **Static IP** – statisk IP-adress för manuellt registreringsläge.

- **Subnet mask** – nätmask för manuellt registreringsläge.

- **Default gateway** – gateway för manuellt registreringsläge.

- **LAN Trouble indication** – markera rutan så att lysdioden på larmsändaren tänds när LAN-förbindelsen bryts.

**Inställningsgruppen ”SIM parameters”**

- **Disable indication of the absence of a SIM card** – när rutan är markerad visar larmsändaren ***FIRECOM*** ingen indikering för att SIM-kort saknas.

- **Use dial and SMS when working over internet module** – om du markerar rutan kan larmsändaren styras med telefonsamtal och SMS. Om rutan inte är markerad och ett LAN-nätverk finns tillgängligt används varken SMS eller telefonsamtal. Om rutan inte är markerad och inget LAN-nätverk finns kan ***FIRECOM*** ändå styras med telefonsamtal och SMS. ***FIRECOM*** skickar SMS till användaren.

- **Disable the use of SIM card mobile data** – om du markerar rutan avaktiveras användningen av SIM-kortets mobildata. Data skickas då bara via LAN. Om LAN-nätverket tillfälligt inte är tillgängligt lagrar ***FIRECOM*** data i minnet. När LAN-nätverket är åter skickar ***FIRECOM*** data via LAN.

### Fönstret ”Users & Reporting”

**Fliken ”Users”**

<img alt="TrikdisConfig FC_E170, Users & Reporting, Users: tabellen Users & Reporting to User visar en konfigurerad användare på rad 1A med fälten Name, Tel number och Email. Den radens rutor PGM, ACK och FWD är markerade; de följande synliga raderna är tomma." src="./image79.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”Users & Reporting to User”**

- **ID** – användarens nummer i listan.

- **Name** – användarens namn. Namnen används i SMS om händelser och i appen.

- **Tel number** – användarens telefonnummer som tar emot SMS. Numren måste börja med landskod. De första 8 telefonnumren får rapporter via meddelanden och telefonsamtal.

- **E-mail** - ange användarens e-postadress så att användaren bjuds in till ***Protegus2*** för att styra systemet.

- **PGM** – om rutan är markerad kan användaren styra utgångar på distans (samtal, SMS).

- **ACK** – om rutan är markerad skickar ***FIRECOM*** ett SMS med ”**SMS answer text**” till användaren efter varje mottaget SMS-kommando.

- **FWD** – om rutan är markerad vidarebefordras SMS från avsändare som inte är användare i systemet till användaren (t.ex. saldo på SIM-kortet, slumpmässiga reklammeddelanden osv.).

**Fliken ”Protegus”**

<img alt="TrikdisConfig FC_E170, Users & Reporting, Protegus: i Cloud application är Enable cloud service och Parallel reporting markerade, och Cloud Access Code visar 123456." src="./image80.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”Cloud application”**

- **Enable cloud service** – aktivera tjänsten ***Protegus*** 2 så att ***FIRECOM*** kan utbyta data med appen ***Protegus2*** och konfigureras på distans med ***TrikdisConfig***.

- **Parallel reporting** – aktivera parallell sändning av meddelanden via ”**Primary channel**” och till ***Protegus2***.

- **Cloud access code** – 6-siffrig kod för inloggning i ***Protegus2*** (förval – 123456).

**Fliken ”SMS answer texts”**

<img alt="TrikdisConfig FC_E170, Users & Reporting, SMS answer texts: kolumnerna Answer och SMS text visar Command done, Wrong password, Wrong data och Wrong command med matchande texter; Zone alarm använder Alarm!!, Zone restore använder Alarm restored, Output ON använder OUT ON och Output OFF använder OUT OFF." src="./image81.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”SMS answer texts”**

Texten för svar på kommandon som skickas med SMS kan anpassas i kolumnen ”**SMS text**”. Här finns också texterna för de SMS som används när ingångar eller utgångar aktiveras.

### Fönstret ”Modules”

**Fliken ”RS485 modules”**

<img alt="TrikdisConfig FC_E170, Modules, RS485 modules: rullgardinslistan Module erbjuder Not available, iO-8 expander, iO-MO expander, iO-LORA expander, iO8-LORA expander, PB-LORA Panic button och REL-LORA expander. Tabellen har kolumnerna ID, Module, Serial No., Name och Firmware version." src="./image82.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”RS485 modules”**

- **ID** – modulens nummer i listan.

- **Module** – välj den modul som används (modulerna ***iO-8***, ***iO-MO***, ***iO-LORA***, ***iO8-LORA***, ***PB-LORA***, ***REL-LORA***) i modullistan.

- **Serial No**. – obligatoriskt 6-siffrigt nummer som finns på modulens kapsling och förpackning.

- **Name** – du kan ge modulen ett namn.

- **Firmware version** – firmwareversionen visas när ***FIRECOM*** hittar den anslutna modulen.

<img alt="TrikdisConfig FC_E170, Modules, RS485 modules: rullgardinslistan Interface type för RS485 2 interface erbjuder Disabled, ESPA 4.4.4, NSC solution, INIM smartline, C-TEC Cast ZFP och Polon-Alfa 3000." src="./image83.webp" style="width:7.0in;height:in" />

**Inställningsgruppen ”RS485 2 modules”**

Brandlarmcentraler (med protokollet **ESPA4.4.4**, **NSC solution**, **INIM smartline**, **C-TEC Cast ZFP**, **Polon-Alfa 3000**) kan anslutas till RS485 2-bussen på larmsändaren ***FIRECOM***. Kopplingsschemat för brandlarmcentralen och inställningarna visas i avsnitt 3.5–3.9.

### Fönstret ”Zones”

**Fliken ”Zones settings”**

<img alt="TrikdisConfig FC_E170, Zones, Zones settings: de synliga sektionerna 1–5 använder ingångarna FC 1 I/O till FC 5 I/O, Group 1, Type EOL och Delay 800. Deras rutor CMS och Prot. är markerade." src="./image84.webp" style="width:7.0in;height:in" />

- **Zone No** – sektionens nummer i listan.

- **Name** - sektionen kan ges ett namn som används i SMS och i appen.

- **Input** – välj vilken ingång IN på ***FIRECOM*** eller på en utbyggnadsmodul som ska tilldelas sektionen.

- **Group** - tilldela sektionen en grupp.

- **Type** – välj i en lista typen av krets som är ansluten till sektionsingången IN: **NC** – normalt sluten; **NO** – normalt öppen; **EOL** – med slutmotstånd; **EOL_T** – med slutmotstånd och sabotageövervakning; **ATZ** – krets med två sektioner, normalt sluten, med slutmotstånd, utan sabotageövervakning (för att använda denna typ, välj den andra ATZ-sektionen i ingångslistan); **ATZ_T** – krets med två sektioner, normalt sluten, med slutmotstånd, med sabotageövervakning (för att använda denna typ, välj den andra ATZ-sektionen i ingångslistan).

- **CMS** – om rutan är markerad skickas meddelanden om sektionshändelser till larmcentralen (CMS, Central Monitoring Station).

- **Prot**. – om rutan är markerad skickas aviseringar om sektionshändelser till appen ***Protegus2***.

- **Delay** – reaktionstid för sektionsingången IN i millisekunder.

**Fliken ”SMS & Call reporting”**

<img alt="TrikdisConfig FC_E170, Zones, SMS & Call reporting: tabellen User 1 har kolumnerna SMS och Call för sektionshändelser och återställningar. De synliga rutorna för Zone 1 Event, Zone 1 Restore och Zone 2 Event är tomma." src="./image85.webp" style="width:7.0in;height:in" />

**Detta fönster visas bara om minst ett telefonnummer för en användare har lagts till i fönstret ”Users & Reporting”.**

- **Zn** – sektionsnummer med ett ord som identifierar händelsen. Kan vara ”**Event**” eller ”**Restore**”.

- **User SMS/Call** – välj hur användarna ska informeras om varje sektionshändelse – via SMS och/eller samtal.

**Fliken ”Zone’s codes”**

<img alt="TrikdisConfig FC_E170, Zones, Zone's codes: för Zone 1 är larmrapportering aktiverad med E/R E, CID 110, SIA TA, Group 1, Zone 001; dess återställningsrapportering är aktiverad med E/R R, CID 110, SIA TR, Group 1, Zone 001. De synliga sektionerna 2–5 använder SIA FA för larm och FH för återställningar." src="./image86.webp" style="width:7.0in;height:in" />

När sektionen påverkas skickar larmsändaren ett händelsemeddelande. Ingången tilldelas en Contact ID-kod (SIA-kod) som skickas till larmcentralen och ***Protegus2***.

- **Enable** – markerade händelsefält för vilka meddelanden skickas till larmcentralen och ***Protegus2***.

- **E/R** – välj vilken typ av händelse som ska skickas när ingången löser ut – ”**Event**” (E) eller ”**Restore**” (R).

- **CID** – ange händelsekoden eller lämna förvalt värde.

- **SIA** - SIA-händelsekoder.

- **Group** – ange det gruppnummer som skickas när en händelse inträffar.

- **Zone** - ange det sektionsnummer som skickas när en händelse inträffar.

### Fönstret ”PGM”

**Fliken ”Outputs”**

<img alt="TrikdisConfig FC_E170, PGM, Outputs: PGM 1, 2 och 3 motsvarar RELAY 1, 2 och 3; PGM 4 visar Disable. Alla fyra synliga rader har Output definition Remote Control och Pulse Time 20 s; deras rutor CMS och Prot. är tomma." src="./image87.webp" style="width:7.0in;height:in" />

- **PGM No** – PGM-utgångens nummer i listan.

- **Name** - ange namnet på PGM-utgången.

- **PGM output** – tilldela PGM en utgång OUT på ***FIRECOM*** eller på en extern enhet.

- **Output definition** – välj driftläge för en utgång OUT.

- **Pulse time, s** – ange hur länge OUT ska vara påslagen, från 0 till 9999 sekunder.

- **CMS** – om rutan är markerad skickas meddelanden om valda händelser till larmcentralen.

- **Prot**. – om rutan är markerad skickas aviseringar om utgångshändelser till appen ***Protegus2***.

**Fliken ”Set Action”**

<img alt="TrikdisConfig, fönstret PGM, fliken Set Action. De synliga raderna har Enable inte markerat, PGM No. inställt på N/A, Action inställt på PGM OFF, Pulse Time inställt på 0 s, Factor inställt på SMS received, Factor No. och Start when inställda på N/A och Set value visar SMS text." src="./image88.webp" style="width:7.0in;height:in" />

- **ID** – utgångens nummer i listan.

- **Enable** – aktiverar algoritmen för PGM-funktionen.

- **PGM No.** – välj den PGM-utgång OUT som ska styras efter att den händelse som beskrivs i kolumnerna ”**Factor**”, ”**Factor No.**”, ”**Start when**” och ”**Set value**” inträffar.

- **Action**:

- **PGM OFF** – utgång OUT har läget ”**Off**”.

- **PGM ON** – utgång OUT har läget ”**On**”.

- **Pulse OFF** – utgång OUT har utgångsläget ”**On**”. Efter kommandot blir OUT-läget ”**Off**” under ”**Pulse time**” och återgår därefter automatiskt till utgångsläget ”**On**”.

- **Pulse ON** – utgång OUT har utgångsläget ”**Off**”. Efter kommandot blir OUT-läget ”**On**” under ”**Pulse time**” och återgår därefter automatiskt till utgångsläget ”**Off**”.

- **Pulse time, s** – du kan ställa in pulstiden mellan 0 och 9999 sekunder.

- **Factor/Factor No.** – välj vilken händelse (Zone, SMS received, Zone tamper) som ska slå på utgången OUT.

- **Start when** – du kan ange ett extra villkor för när utgången OUT ska slås på, beroende på händelsen i ”**Factor**”.

- **Set value** – beroende på villkoret som valts i kolumnen ”**Factor**” kan ett värde (texten i ett mottaget SMS) anges. Om detta värde identifieras utförs åtgärden (som valts i kolumnen ”**Action**”). SMS-texten kan avgränsas med tecknet **%**. Tecknen **%** används för att skilja ut det nyckelord som ändrar en PGM-utgångs läge från hela det mottagna SMS:et.

**%…..%** - en del av texten i det mottagna SMS:et måste stämma överens med texten som anges mellan %-tecknen (t.ex. **%hoUSe%**. Texten i ett SMS måste innehålla ”**hoUSe**”. Exempel på SMS: **VacationhoUSe25864**).

**…..%** - början av det mottagna SMS:et måste stämma överens med texten som anges före %-tecknet (t.ex. **hoUSe%**. SMS:et måste börja med texten **”hoUSe”**. Exempel på SMS: **hoUSeddss**).

**%…..** – slutet av det mottagna SMS:et måste stämma överens med texten som anges efter %-tecknet. (t.ex. **%hoUSe**. SMS:et måste sluta med texten **”hoUSe”**. Exempel på SMS: **1144hoUSe**).

SMS-texten är skiftlägeskänslig.

**Fliken ”Scheduler”**

<img alt="TrikdisConfig, fönstret PGM, fliken Scheduler. Schematabellen har fälten Start time och Stop time, vart och ett med kryssrutor för måndag till söndag; de synliga tiderna är 00:00 och kryssrutorna är tomma." src="./image89.webp" style="width:7.0in;height:in" />

- **ID** – schemats nummer i listan.

- **Enable** – aktivera schemat.

- **Start time** – ange tiden då OUT ska slås på (schemats starttid).

- **Stop time** – ange tiden då OUT ska slås av (schemats sluttid).

- **Mon – Sun** – du kan markera de veckodagar då OUT ska slås på/av.

**Fliken ”SMS & Call reporting”**

<img alt="TrikdisConfig, fönstret PGM, fliken SMS & Call reporting. Tabellen visar raderna Event och Restore för PGM 1, 2 och 3, med tomma kryssrutor för SMS och Call för User 1." src="./image90.webp" style="width:7.0in;height:in" />

**Den här fliken visas bara om det finns minst ett telefonnummer för en användare i fönstret ”Users & Reporting”**. Dessa inställningar kan bara göras för de 8 första användarna.

- **PGM** – numret på utgången OUT och typen av händelse när den slås på/av (”**Event**” – händelsen när OUT slås på och ”**Restore**” – händelsen när OUT slås av).

- **User SMS/Call** – välj vilka användare som ska informeras via SMS och/eller samtal när en utgång OUT slås på/av.

### Fönstren ”Sensors”

<img alt="TrikdisConfig, fönstret Sensors. Åtta givarrader visar Module type Disable, givarnamnen Sensor 1 till Sensor 8, Max 30, Min 2, High och Low markerade och Delay 0 min. Menyn Sensor type erbjuder Dallas 1-Wire och Humidity & Temperature (AM23xx series)." src="./image91.webp" style="width:7.0in;height:in" />

- **ID** – temperaturgivarens nummer i listan.

- **Module type** – välj den temperaturgivare som ska tilldelas ID.

- **Serial No.** - serienumret på temperaturgivaren som larmsändaren har läst av.

- **Sensor name** – ge temperaturgivaren ett namn.

- **Max** – när temperaturen är högre än denna inställning skapas en händelserapport. För att ett händelsemeddelande ska skapas måste rutan ”**High**” vara markerad.

- **Min** – när temperaturen är lägre än denna inställning skapas en händelserapport. För att ett händelsemeddelande ska skapas måste rutan ”**Low**” vara markerad.

- **Delay** - en händelse skickas om det värde som givaren mäter (**Max** eller **Min**) överskrids inom den angivna tiden. Fördröjningen anges i minuter.

- **Sensor type** – välj typ av ansluten temperaturgivare (Dallas 1Wire – upp till 8 temperaturgivare av denna typ kan anslutas. Om Dallas-givare väljs kopplas de ihop automatiskt; Humidity & Temperature – en temperatur- och fuktgivare AM2301 kan anslutas. Om givaren Humidity & Temperature används måste den tilldelas manuellt i kolumnen ”**Module type**”).

### Fönstret ”System events”

**Fliken ”Events”**

<img alt="TrikdisConfig, fönstret System events, fliken Events. Tabellen visar Low Battery (CID 302), Periodic test (602), Battery missing (311), RS485 fault (333), High temperature (158), Low temperature (159) och Temp. sensor lost (380), med Enable, CMS och Prot. markerade. Den visar också fälten för SMS-text vid händelse och återställning." src="./image92.webp" style="width:7.0in;height:in" />

- **ID** – händelsens nummer i listan.

- **Event name** – händelsens namn.

- **Enable** – aktivera igenkänning av händelsen.

- **CMS** – meddelanden om valda händelser skickas till larmcentralen.

- **Prot**. – aviseringar om valda händelser skickas till appen ***Protegus*** 2.

- **CID Code** – händelsens Contact ID-kod.

- **SMS event text** – texten i händelsens SMS.

- **SMS restore text** - texten i SMS för händelsens återställning.

**Fliken ”SMS & Call reporting”**

<img alt="TrikdisConfig, fönstret System events, fliken SMS & Call reporting. SMS-texterna för händelser omfattar Battery low, Battery restore, Periodic test, Battery missing och Battery restore; de synliga rutorna SMS och Call för User 1 är tomma." src="./image93.webp" style="width:7.0in;height:in" />

**Den här fliken visas bara om det finns minst ett telefonnummer för en användare i fönstret ”Users & Reporting”**

- **ID** – händelsens nummer och identifierande ord (**Event**, **Restore**).

- **Event SMS text** – text som används i SMS om händelser.

- **User SMS/Call** – välj hur användarna ska informeras om varje händelse – SMS och/eller telefonsamtal.

### Fönstret ”Events Log”

<img alt="TrikdisConfig, fönstret Events Log. Knapparna Read Log och Clear Log finns ovanför en tabell med kolumnerna Event No., Time, CID och Event definition. Den första synliga posten är Main power failure med CID 301:00:000." src="./image94.webp" style="width:7.0in;height:in" />

- Knappen **Read Log** – för att läsa händelseloggen från enhetens minne.

- Knappen **Clear Log** – för att radera händelseloggens poster från enhetens minne.

- I tabellen finns ”**Event No.**”, ”**Time**”, koden ”**CID**” och ”**Event definition**”. Händelseloggen kan visa upp till 1 000 händelser som är lagrade i ***FIRECOM***:s minne.

### Återställa fabriksinställningarna

För att återställa larmsändarens fabriksinställningar klickar du på knappen ”**Restore**” i ***TrikdisConfig***.

<img alt="Området för förvalda inställningar i TrikdisConfig, med knappen Restore omringad med rött. Statusfältet visar Ready, State USB och Role Administrator." src="./image95.webp" style="width:7.0in;height:in" />

## Fjärrkonfigurering

!!! warning "Viktigt"
    Fjärrkonfigurering fungerar bara om ***FIRECOM***:

    1.  Har ett isatt och aktiverat SIM-kort där PIN-koden är angiven eller
        avstängd.
    
    2.  Har tjänsten Protegus aktiverad. Se avsnitt **6.4 (fönstret
        ”Users & Reporting”)**.
    
    3.  Är påslagen (lysdioden ”**STA**” ska blinka grönt);
    
    4.  Är ansluten till ett nätverk (lysdioden ”**SIM**” ska lysa fast grönt
        och blinka gult; och/eller lysdioden ”**ETH**” lyser grönt när
        larmsändaren är ansluten till LAN-nätverket).
    
    Om ”**SIM**” lyser fast gult eller ”**DAT**” lyser fast gult kan
    enheten inte ansluta till GSM och/eller ***Protegus2***.

1.  Starta konfigurationsprogrammet ***TrikdisConfig*** på datorn.

2.  I fönstret ”**Remote access**” anger du larmsändarens nummer ”**Unique ID**”. Numret finns på baksidan av enheten och på enhetens förpackning.

<img alt="TrikdisConfig, startfönstret, avsnittet Remote access. Det tomma fältet Unique ID och knappen Configure är omringade med rött; ett fält System Name och en knapp Control finns bredvid." src="./image96.webp" style="width:7.0in;height:in" />

3.  (Valfritt) Ange önskat namn på larmsändaren i fältet ”**System Name**”.

4.  Klicka på ”**Configure**”.

5.  I fönstret som öppnas klickar du på **Read [F4]**. Ange administratörs- eller installatörskoden om du uppmanas.

6.  När du har angett önskade parametrar klickar du på **Write [F5]**. Om du är klar med ***TrikdisConfig*** klickar du på ”**Disconnect**”.

## Testa larmsändarens funktion

När konfigureringen och installationen är klara, gör en systemkontroll:

1.  För att testa en ingång på larmsändaren, aktivera den. Kontrollera att händelserna har tagits emot av larmcentralen (CMS) och/eller i appen ***Protegus2***.

2.  För att testa larmsändarens utgångar, slå på dem på distans och kontrollera att de fungerar. Kontrollera att händelserna har tagits emot av larmcentralen (CMS) och/eller i appen ***Protegus2***.

3.  Utlös ett brandlarm som test och kontrollera att larmcentralen tar emot händelserna korrekt.

## Firmwareuppdatering

!!! note "Obs!"
    När larmsändaren har anslutits till ***TrikdisConfig*** erbjuder programmet automatiskt att uppdatera firmware om det finns uppdateringar. Internetanslutning krävs för den här funktionen. Antivirusprogram, brandvägg eller strikta inställningar för internetåtkomst kan blockera den automatiska uppdateringen. I så fall måste du konfigurera om antivirusprogrammet. Larmsändarens firmware kan också uppdateras eller bytas manuellt. Alla tidigare inställningar i larmsändaren finns kvar efter en uppdatering. Om firmware installeras manuellt kan den bytas till en nyare eller äldre version. Gör så här:

1.  Starta ***TrikdisConfig**.*

2.  Anslut larmsändaren till datorn med en USB Type-C-kabel eller anslut till larmsändaren på distans.

3.  Om en nyare firmwareversion finns erbjuder programmet automatiskt att installera den.

4.  Öppna fönstret ”**Firmware**” i ***TrikdisConfig***.

<img alt="TrikdisConfig, fönstret Firmware. Fältet Open firmware file är tomt, knappen Open firmware är tillgänglig, Update (F12) är inaktiverad och förloppsindikatorn visar 0 %." src="./image97.webp" style="width:7.0in;height:in" />

5.  Klicka på knappen ”**Open firmware**” och välj den firmwarefil som behövs.

6.  Klicka på knappen **Update [F12]**.

7.  Vänta tills uppdateringen är klar.

## Säkerhetskrav

Larmsändaren ska installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla bort matningen innan du gör några elektriska anslutningar.

Ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Symbol med överkryssad soptunna på hjul (WEEE), som anger att enheten ska kasseras skilt från hushållsavfall." src="./image2.webp" style="width:0.39375in;height:0.44513888888888886in" />Följ de lokala reglerna för avfallssortering och släng inte denna utrustning eller dess komponenter bland vanligt hushållsavfall.
