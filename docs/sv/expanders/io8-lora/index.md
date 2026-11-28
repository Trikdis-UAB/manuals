# Trådlös utbyggnadsmodul iO8-LoRa

<div style="text-align: center;">
  <img src="./image1.webp" alt="Foto av kretskortet på utbyggnadsmodulen iO8-LoRa med plintar, indikeringslysdioder, knappen SW1 och DIP-switchen SW2." width="400">
</div>

## Beskrivning 

Trådlösa utbyggnadsmoduler iO-8-LORA med radiotransceivern RF-LORA ökar antalet ingångar och utgångar i centralapparaten ”FLEXi” SP3 med hjälp av dubbelriktad radiokommunikation.


Kompatibel med centralapparaten [SP3](../../control-panels/sp3/index.md) för inbrottslarm och styrenheten för port och dörr [GATOR Cellular](../../gate-controllers/gator/index.md).
Den trådlösa utbyggnadsmodulen iO-8-LORA har 8 I/O-plintar som kan ställas in var och en som ingång (IN) eller utgång (OUT).

### Funktioner

**Kommunikation:**

- Trådlös räckvidd i fri sikt upp till 5000 m.

- Upp till 8 trådlösa utbyggnadsmoduler *iO-8-LORA* kan anslutas till centralapparaten *”FLEXi” SP3*.

- Produkter från HW-versionen iO8_x5xx_7_230419 levereras med en standardantenn som passar de flesta tillämpningar. <u>Om kommunikationen måste vara av hög kvalitet på största möjliga avstånd ska en antenn med högre förstärkning av radiosignalen användas (AX-ANT-KIT – 433 MHz, AX-ANT01S SF – 868 MHz)</u>.

Ingångar och utgångar:
- 8 I/O-plintar som kan ställas in var och en som ingång (IN) eller utgång (OUT). Ingångstyper (IN): ATZ, EOL, NC, NO. Motstånd med olika värden kan användas i kretsar av typen EOL och ATZ.

**Anslutning:**

- Den trådlösa utbyggnadsmodulen iO-8-LORA ansluts till centralapparaten ”FLEXi” SP3 via radiotransceivern RF-LORA.

### Specifikationer 

| Parameter | Beskrivning |
|----|----|
| Sändningsfrekvens | Utförande 4F: 433,3–434,7 MHz / utförande 8F: 867–869 MHz |
| Modulationstyp | LORA |
| Matningsspänning | 10–26 V DC |
| Strömförbrukning | Upp till 50 mA (vänteläge) / upp till 120 mA (kortvarigt, vid sändning) |
| Kryptering av meddelanden | Ja |
| Räckvidd i öppen miljö | Upp till 5000 m |
| Plintar med dubbel funktion [I/O] | 8, funktionen IN eller OUT väljs vid programmeringen. När IN väljs är följande typer tillgängliga: NC, NO, EOL, EOL_T, 3EOL, ATZ, ATZ_T. När OUT väljs blir plinten en utgång med öppen kollektor (OC) för upp till 100 mA |
| Driftmiljö | Temperatur från –20 °C till +50 °C, relativ luftfuktighet upp till 80 % vid +20 °C |
| Mått | 65 × 90 × 12 mm |
| Vikt | 80 g |

### Utbyggnadsmodulens delar 

<img alt="Numrerat foto av kretskortet på iO8-LoRa till vänster. Hänvisning 1 markerar lysindikatorerna; 2 markerar plintarna för externa anslutningar; 3 markerar knappen SW1 för inlärning av enheten och kontroll av förbindelsen; 4 markerar DIP-switchen SW2. De numrerade benämningarna finns i en lista till höger." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 860px; height: auto;" />

!!! note "Inställningar för DIP-switchen 'SW2'"
    För produkter med HW-version iO8_x5xx_7_230419:

    1. Radiofrekvens (`OFF` - RF1; `ON` - RF2). Används för att byta radiokanal om den aktuella kanalen är hårt belastad.
    2. Modulationstyp (`OFF` - snabb; `ON` - långsam). Läget `ON` ökar kommunikationsavståndet ungefär 2 gånger (beroende på omgivningen). Om förbindelsen är god i läget `OFF` rekommenderas det läget. I läget `ON` minskar systemets prestanda.

    **OBS!** I enheterna iO8-LORA och RF-LORA måste lägena för switchen `SW` vara desamma! Annars fungerar inte radiokommunikationen!

### Plintarnas funktion 

| Plint | Beskrivning                           |
|----------|---------------------------------------|
| +DC      | Matningsplint (10–26 V DC, plus)      |
| -DC      | Matningsplint (10–26 V DC, minus)     |
| A        | Plint A på databussen *RS485*         |
| B        | Plint B på databussen *RS485*         |
| 1- 8     | Ingångs-/utgångsplintar               |
| C        | Gemensam minusplint                   |

### Lysdiodsindikering vid drift 

| Indikator | Ljussignal | Beskrivning |
|-----------|--------------|-------------|
| NETWORK | Släckt | Ingen RF-signal |
| NETWORK | Blinkar grönt | RF-signalnivå från 0 till 10. Tillräcklig signalstyrka är 3 |
| POWER | Släckt | Ingen matningsspänning |
| POWER | Blinkar grönt | Normal matningsspänning |
| POWER | Blinkar gult | Låg matningsspänning (≤11,5 V) |

## Kopplingsscheman 

### Kopplingsschema för anslutning av matningen 

<img alt="Kopplingsschema: nätaggregat till iO-8-LORA. Matning: +12V till +DC, 0V till -DC; den positiva ledaren är märkt (+12 V)." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Kopplingsscheman för anslutning av ingångar 

På kretskortet i utbyggnadsmodulen iO-8-LORA finns 8 plintar IO1–IO8 (ingångar) för anslutning av detektorkretsar. Varje plint kan ställas in som ingång och tilldelas sektionsegenskaper: kretstyp (NO, NC, EOL, EOL_T, 3EOL, ATZ, ATZ_T), känslighet för tillfälliga händelser i kretsen och sektionsfunktion (Delay, Instant, Instant Stay, Interior, Interior Stay, Fire, Keyswitch, 24_hour, Silent, Silent 24h).

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image5.webp" alt="Ingångskrets av typen normalt öppen (NO): en NO-kontakt kopplar IOx till C när den är sluten. Inget motstånd visas." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image6.webp" alt="Ingångskrets av typen normalt sluten (NC): en NC-kontakt kopplar IOx till C. Inget motstånd visas." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image7.webp" alt="Tabell med motståndsvärden i kolumnerna RT, R1, R2. De sex raderna är 2,2k, 2,2k, 4,7k; 1k, 1k, 2,2k; 5,6k, 5,6k, 3,3k; 5,6k, 3,3k, 5,6k; 3,3k, 6,8k, 3,3k samt 2,2k, 4,7k, 8,2k." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Ingångskrets av typen normalt öppen med slutmotstånd (EOL): IOx och C är förbundna via motståndet R1, med en NO-kontakt parallellt över R1." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Ingångskrets av typen normalt sluten med slutmotstånd (EOL): IOx är förbunden med C via en NC-kontakt i serie med motståndet R1." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image10.webp" alt="Kopplingsschema: normalt sluten ingång av typen EOL_T mellan IOx och C. Sabotagekontakten (NC) och motståndet RT sitter i serie; detektorkontakten (NC) och motståndet R1 sitter parallellt mellan RT och C." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image11.webp" alt="Kopplingsschema: normalt sluten ingång utan slutmotstånd (ATZ) mellan IOx och C. Detektorplint 1 har en NC-kontakt parallellt med R1; detektorplint 2 har en NC-kontakt parallellt med R2. De två detektorkretsarna sitter i serie." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image12.webp" alt="Kopplingsschema: normalt sluten ingång av typen ATZ_T mellan IOx och C. Detektorplint 1 har en sabotagekontakt (NC) i serie med RT, följd av en NC-kontakt parallellt med R1. Detektorplint 2 har en sabotagekontakt (NC) i serie, följd av en NC-kontakt parallellt med R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Kopplingsschema: normalt sluten ingång av typen 3EOL mellan IOx och C. En sabotagekontakt (NC) och RT sitter i serie med larm- och maskeringsskyddskretsarna. Larmkontakten (NC) sitter parallellt med R1; maskeringsskyddets kontakt (NC) sitter parallellt med R2." src="./image13.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Kopplingsschema för anslutning av ett relä 

Med reläplintarna kan olika elektriska enheter fjärrstyras (slås på/av). Den universella I/O-plinten på den trådlösa utbyggnadsmodulen *iO-8-LORA* måste konfigureras som utgång (OUT) och tilldelas definitionen ”Remote control”.

<img alt="Kopplingsschema: iO-8-LORA till ett relä. AUX+ och IOx är anslutna till reläspolen. Reläet har kontakterna NC, C och NO." src="./image14.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### Kopplingsschema för anslutning av utbyggnadsmoduler iO-8-LORA till centralapparaten ”FLEXi” SP3 

<img alt="Kopplingsschema: SP3 till RF-LORA och upp till åtta utbyggnadsmoduler iO-8-LORA. SP3 AUX+ (+12 V) till RF-LORA +DC, AUX- till -DC, 485 A till A RS 485 och 485 B till B RS485. RF-LORA är trådlöst förbunden med utbyggnadsmodulerna över upp till 5000 m. Varje iO-8-LORA har en egen matning på 12-26 V ansluten till +DC och -DC." src="./image15.webp" style="display: block; margin: 1rem auto; max-width: 760px; height: auto;" />

!!! note
    En radiotransceiver RF-LORA måste vara ansluten till centralapparaten ”FLEXi”
    SP3. Därefter kan upp till 8 trådlösa utbyggnadsmoduler
    iO-8-LORA anslutas.

## Centralapparaten ”FLEXi” SP3

1.  En radiotransceiver RF-LORA måste vara ansluten till centralapparaten ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten ”FLEXi” SP3.

3.  Slå på matningen till den trådlösa utbyggnadsmodulen iO-8-LORA.

4.  Starta ***TrikdisConfig**.*

5.  Anslut ”FLEXi” SP3 till en dator med en USB Mini-B-kabel eller anslut till ”FLEXi” SP3 på distans.

6.  Klicka på knappen **Read [F4]** så att programmet läser de parametrar som är inställda i centralapparaten ”FLEXi” SP3. Om ett fönster för administratörskoden öppnas, ange den sexsiffriga administratörskoden.

7.  Välj ”**iO-8-LORA expander**” i listan ”**Modules**”.

8.  Ange iO-8-LORA-modulens serienummer i fältet ”**Serial No.**”.

<img alt="TrikdisConfig SP3, fönstret Modules, fliken RS485 modules. Rad 1 visar en iO8-LORA expander med serienummer ifyllt, Area 1 och Name Expander ID1. Rad 2 visar Not available, Area 1 och Name Expander ID2." src="./image16.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  Ställ in expanderns ingångar på fliken ”**Zones**”.

<img alt="TrikdisConfig SP3, fönstret Zones, fliken Zones settings. Den öppna listan Input innehåller Disable, SP3 10 I/O samt ingångarna IO1, IO2 och IO3 på RS485 Expander ID1; RS485 Expander ID1, IO1 är markerad för en sektion." src="./image17.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. Konfigurera expanderns PGM-utgångar på fliken ”**PGM**”.

<img alt="TrikdisConfig SP3, fönstret PGM, fliken Outputs. Kolumnen PGM output visar BELL för PGM 1 och RS485 Expander ID1, IO2 för PGM 222. PGM 222 har Output definition Remote Control och Pulse Time, s på 10." src="./image18.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. Klicka på knappen **Write [F5]** när konfigurationen är klar.

12. Vänta tills uppdateringen är klar.

13. Klicka på knappen ”**Disconnect**” och koppla bort USB-kabeln.

## Säkerhetskrav 

Den trådlösa utbyggnadsmodulen iO-8-LORA ska installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla alltid bort matningen innan du gör några elektriska anslutningar.

Ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Symbol med överkryssad soptunna på hjul, som anger att produkten inte får kasseras tillsammans med hushållsavfall." src="./image2.webp" style="display: inline; height: 1.2em; vertical-align: middle;" />Följ dina lokala bestämmelser för avfallssortering och släng inte utrustningen eller dess komponenter bland vanligt hushållsavfall.
