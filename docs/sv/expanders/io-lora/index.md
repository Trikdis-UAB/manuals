# Trådlös utbyggnadsmodul iO-LORA

<div style="text-align: center;">
  <img src="./image3.webp" alt="Framsidan av den trådlösa utbyggnadsmodulen TRIKDIS iO-LORA med indikatorerna NETWORK, OUTPUT och POWER. På kapslingen är märkningen 9-26 V, 0,1 A max och plintarna +DC, -DC, D0, D1, +5V, 1 Wire/OUT wgd, COM, IN1, NC, C och NO tryckta." width="200">
</div>

## Beskrivning 

Trådlösa utbyggnadsmoduler iO-LORA med radiotransceivern RF-LORA ökar antalet ingångar och utgångar i centralapparaten ”FLEXi” SP3 med hjälp av dubbelriktad radiokommunikation.


Kompatibel med centralapparaten [SP3](../../control-panels/sp3/index.md) för inbrottslarm samt styrenheterna för port och dörr [GATOR Cellular](../../gate-controllers/gator/index.md) och [GATOR WiFi](../../gate-controllers/gator-wifi/index.md).
Till utbyggnadsmodulen iO-LORA kan en temperaturgivare (1 st.) och läsare för kontaktnycklar (”iButton”) anslutas. Utbyggnadsmodulens PGM-utgång (relä) kan användas för att fjärrstyra (slå på/stänga av) olika elektriska enheter. iO-LORA har en digital ingång.

### Funktioner

**Kommunikation:**

- Trådlös räckvidd i fri sikt upp till 5000 m.

- Upp till 8 trådlösa utbyggnadsmoduler *iO-LORA* kan anslutas till centralapparaten *”FLEXi” SP3*.

- Produkter från HW-versionen iO-LO_x30x_7_230418 levereras med en standardantenn som passar de flesta tillämpningar. <u>Om kommunikationen måste vara av hög kvalitet på största möjliga avstånd ska en antenn med högre förstärkning av radiosignalen användas (AX-ANT-KIT – 433 MHz, AX-ANT01S SF – 868 MHz)</u>.

**Ingångar och utgångar:**

- Bussen ”1-Wire” är avsedd för anslutning av en temperaturgivare (1 st.) och läsare för kontaktnycklar (”iButton”).
- 1 ingång med valbar typ: NC, NO.

- 1 utgång (relä).

Anslutning:
- Den trådlösa utbyggnadsmodulen iO-LORA ansluts till centralapparaten ”FLEXi” SP3 via radiotransceivern RF-LORA.

### Specifikationer 

| Parameter | Beskrivning |
|----|----|
| Sändningsfrekvens | Utförande 4F: 433,3–434,7 MHz / utförande 8F: 867–869 MHz |
| Modulationstyp | LORA |
| Matningsspänning | 9–26 V DC |
| Strömförbrukning | Upp till 50 mA (vänteläge) / upp till 100 mA (kortvarigt, vid sändning) |
| Kryptering av meddelanden | Ja |
| Räckvidd i öppen miljö | Upp till 5000 m |
| Ingång | 1, valbar typ: NC, NO |
| Utgång | 1, relä, 250 V AC, 4 A |
| Temperaturgivare | 1, Maxim®/Dallas® DS18S20, DS18B20 |
| Driftmiljö | Temperatur från –20 °C till +50 °C, relativ luftfuktighet upp till 80 % vid +20 °C |
| Mått | 62 × 77 × 25 mm |
| Vikt | 80 g |

### Utbyggnadsmodulens delar 

<img alt="Två foton av iO-LORA, med stängd kapsling till vänster och synligt kretskort till höger. Till vänster: 1, lysindikatorer (NETWORK, OUTPUT, POWER); 2, öppningsspår på kapslingens framsida, vid högra kanten. Till höger: 3, plint för externa anslutningar; 4, knappen SW2 för inlärning av enheten och kontroll av förbindelsen; 5, DIP-switchen SW1." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 600px; height: auto;" />

1. Lysindikatorer.
2. Öppningsspår på kapslingens framsida.
3. Plint för externa anslutningar.
4. Knappen ”SW2” för inlärning av enheten och kontroll av förbindelsen.
5. DIP-switchen ”SW1”.

!!! note "Inställningar för DIP-switchen 'SW1'"
    För produkter med HW-version iO-LO_x30x_7_230418:

    1. Radiofrekvens (`OFF` - RF1; `ON` - RF2). Används för att byta radiokanal om den aktuella kanalen är hårt belastad.
    2. Modulationstyp (`OFF` - snabb; `ON` - långsam). Läget `ON` ökar kommunikationsavståndet ungefär 2 gånger (beroende på omgivningen). Om förbindelsen är god i läget `OFF` rekommenderas det läget. I läget `ON` minskar systemets prestanda.

    **OBS!** I enheterna iO-LORA och RF-LORA måste lägena för switchen `SW1` vara desamma! Annars fungerar inte radiokommunikationen!

### Plintarnas funktion 

| Plint           | Beskrivning                                               |
|-----------------|-----------------------------------------------------------|
| +DC             | Matningsplint (9–26 V DC, plus)                           |
| -DC             | Matningsplint (9–26 V DC, minus)                          |
| D0              | Används inte                                              |
| D1              | Används inte                                              |
| +5V             | Plint för 5 V plus till enheter på ”**1-Wire**”           |
| 1Wire / OUT wgd | Plint för databussen ”**1-Wire**” (”**OUT wgd**” används inte) |
| COM             | Gemensam minusplint                                       |
| IN1             | 1 ingång med valbar typ NO, NC (fabriksinställning: NO)   |
| NC              | Reläplint NC                                              |
| C               | Reläplint C                                               |
| NO              | Reläplint NO                                              |

### Lysdiodsindikering vid drift 

| Indikator | Ljussignal | Beskrivning |
|-----------|--------------|-------------|
| NETWORK | Släckt | Ingen RF-signal |
| NETWORK | Blinkar grönt | RF-signalnivå från 0 till 10. Tillräcklig signalstyrka är 4. |
| OUTPUT/KEY | Fast grönt sken | Reläutgången är aktiverad |
| OUTPUT/KEY | Fast gult sken | Dallas-kontaktnyckeln är aktiverad |
| POWER | Släckt | Ingen matningsspänning |
| POWER | Blinkar grönt | Normal matningsspänning |
| POWER | Blinkar gult | Låg matningsspänning (≤11,5 V) |

## Kopplingsscheman 

### Montering 

1.  Ta bort locket.

<img alt="Två teckningar som visar hur locket på iO-LORA tas bort. Till vänster: skruvmejseln förs in i spåret vid överkanten. Till höger: skruvmejselns skaft trycks nedåt så att locket lossnar." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 750px; height: auto;" />

2.  Ta ut kretskortet.

3.  Fäst kapslingens bottendel på önskad plats med skruvar.

4.  Sätt tillbaka kretskortet.

5.  Sätt tillbaka locket.

<img alt="Teckning av iO-LORA-kapslingen: högra vyn visar bottendelen med monteringshål, vänstra vyn visar kretskortet vid kapslingens kant med en ringmarkerad hållpunkt och en pil som pekar utåt." src="./image6.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

### Kopplingsschema för anslutning av matningen 

<img alt="Kopplingsschema: nätaggregat till iO-LORA. Nätaggregat: +12V till +DC, 0V till -DC; aggregatet är märkt +12 V." src="./image7.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### Kopplingsschema för anslutning av ingången 

iO-LORA har en ingång. Ingångens typ kan ställas in: NC, NO.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Ingångskrets av typen normalt öppen (NO): den öppna NO-kontakten sitter mellan IN och COM." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Ingångskrets av typen normalt sluten (NC): den slutna NC-kontakten sitter mellan IN och COM." style="width: 100%; height: auto;" />
  </figure>
</div>

### Kopplingsschema för anslutning av en temperaturgivare 

Temperaturgivare ska anslutas enligt schemat. En temperaturgivare (1 st.) av typen Maxim®/Dallas® DS18S20 eller DS18B20 kan anslutas till den trådlösa utbyggnadsmodulen *iO-LORA*. Om en ledning längre än 0,5 meter används för att ansluta temperaturgivaren rekommenderar vi partvinnad kabel (UTP4x2x0,5 eller STP4x2x0,5). Plinten ”+5V” på kretskortet matar enheter som är anslutna till databussen ”1-Wire” med 5 V DC.

<img alt="Kopplingsschema: iO-LORA till temperaturgivaren DS18B20. Röd ledare: +5V till +Vdd. Gul ledare: 1 Wire till DQ. Svart ledare: C till GND." src="./image10.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

Den maximala utgångsströmmen är 0,2 A. Utgången är överlastskyddad. Om den högsta tillåtna strömmen överskrids kopplas matningen bort automatiskt. Centralapparaten ”FLEXi” SP3 känner automatiskt igen och lär in den anslutna temperaturgivaren.

### Kopplingsscheman för anslutning av läsaren CZ-Dallas 

iButton-läsaren **CZ-Dallas** ansluts till iO-LORA via databussen ”**1 Wire**”. Ledningarna till databussen kan vara upp till 30 m långa.

<img alt="Kopplingsschema: iO-LORA till läsaren CZ-Dallas. Matning: 12-26V + till +DC, - till -DC. Läsare: vit ledare från 1-Wire till läsaren; grå ledare från COM till läsaren, ihopkopplad med den gula LED-ledaren. C kopplas till +DC; NO matar RED LED+ via ett motstånd på 1k och NC matar Green LED+ via ett motstånd på 1k. De gröna och bruna LED-ledarna är märkta. 1-Wire-anslutning upp till 30 m. Ställ in xOUT på 'System State': larm på visar rött, larm av visar grönt." src="./image11.webp" style="display: block; margin: 1rem auto; max-width: 750px; height: auto;" />

### Kopplingsscheman för anslutning av iO-LORA-moduler 

<img alt="Kopplingsschema: SP3 till RF-LORA och därefter trådlöst till iO-LORA-modulerna 1 till 8, upp till 5000 m. SP3 AUX+ (+12 V) till RF-LORA +DC, AUX- till -DC, 485 A till A RS 485, 485 B till B RS485. Modul 1: 12-26V till +DC och -DC; +5V, 1-Wire och COM till temperaturgivarens Vdd+, DQ och GND (DS18B20 eller DS18S20). Modul 8: 12-26V till +DC och -DC; 1-Wire till CZ-Dallas-läsarens vita ledare, COM till de grå och gula LED-ledarna; C kopplas till +DC, NO matar RED LED+ via 1k och NC matar Green LED+ via 1k. Läsarens 1-Wire-anslutning upp till 30 m; ställ in xOUT på 'System State' för rött när larmet är på och grönt när det är av." src="./image12.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

!!! note
    En radiotransceiver RF-LORA måste vara ansluten till centralapparaten ”FLEXi”
    SP3. Därefter kan upp till 8 trådlösa utbyggnadsmoduler iO-LORA
    anslutas. Vi rekommenderar partvinnad kabel (UTP4x2x0.5 eller STP4x2x0.5)
    för anslutning av temperaturgivaren. iButton-läsare av typen
    **CZ-Dallas** och temperaturgivaren måste
    anslutas till bussen ”**1-Wire**”.

## Centralapparaten ”FLEXi” SP3

1.  En radiotransceiver RF-LORA måste vara ansluten till centralapparaten ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten ”FLEXi” SP3.

3.  Slå på matningen till den trådlösa utbyggnadsmodulen iO-LORA.

4.  Starta ***TrikdisConfig**.*

5.  Anslut ”FLEXi” SP3 till en dator med en USB Mini-B-kabel eller anslut till ”FLEXi” SP3 på distans.

6.  Klicka på knappen **Read [F4]** så att programmet läser de parametrar som är inställda i centralapparaten ”FLEXi” SP3. Om ett fönster för administratörskoden öppnas, ange den sexsiffriga administratörskoden.

7.  Välj ”**iO-LORA expander**” i listan ”**Modules**”.

8.  Ange iO-LORA-modulens serienummer i fältet ”**Serial No.**”.

<img alt="TrikdisConfig SP3, fönstret Modules, fliken RS485 modules. På rad ID 1 är Module inställd på iO-LORA expander, fältet Serial No. är ifyllt, Area är 1 och Name är Expander ID1." src="./image13.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  Ställ in expanderns ingång på fliken ”**Zones**”.

<img alt="TrikdisConfig SP3, fönstret Zones, fliken Zones settings. Rullgardinslistan Input innehåller RS485 Expander ID1, IN1 för att koppla utbyggnadsmodulens ingång till en sektion; tabellen visar även Area, Definition, Type och rapporteringsinställningar." src="./image14.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. Konfigurera expanderns PGM-utgång på fliken ”**PGM**”.

<img alt="TrikdisConfig SP3, fönstret PGM, fliken Outputs. PGM 2 har PGM output inställd på RS485 Expander ID1, OUT1, Output definition på Remote Control och Pulse Time på 10 s." src="./image15.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. Temperaturgivare tas med i listan ”**Sensors**” om en temperaturgivare är ansluten till iO-LORA.

<img alt="TrikdisConfig SP3, fönstret Sensors. Sensor ID 1 har Module type RS485 Expander ID1 och fälten Serial No., Sensor name, Max, Min, High, Low och Delay, min; exemplet visar Max 30, Min 20, High och Low markerade samt Delay 0." src="./image16.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

12. Klicka på knappen **Write [F5]** när konfigurationen är klar.

13. Vänta tills uppdateringen är klar.

14. Klicka på knappen ”**Disconnect**” och koppla bort USB-kabeln.

## Säkerhetskrav 

Den trådlösa utbyggnadsmodulen iO-LORA ska installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla alltid bort matningen innan du gör några elektriska anslutningar.

Ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Symbol med överkryssad soptunna på hjul, som anger att produkten inte får kasseras tillsammans med hushållsavfall." src="./image2.webp" style="display: inline; height: 1.2em; vertical-align: middle;" />Följ dina lokala bestämmelser för avfallssortering och släng inte utrustningen eller dess komponenter bland vanligt hushållsavfall.
