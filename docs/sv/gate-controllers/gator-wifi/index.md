# GATOR WiFi – WiFi-styrenhet för port

<div style="text-align: center;">
  <img src="./image1.webp" alt="Framsidan av styrenheten GATOR WiFi med indikeringarna NETWORK, DATA och STATUS. Kapslingen är märkt 9–32 V DC, 0,15 A max. Plintblocket längst ned har beteckningarna +DC, -DC, 1 I/O, 2 I/O, 3 I/O, 4 I/O, +AUX, NC, C, NO, A RS485 och B RS485; NC, C och NO är märkta 5 OUT." width="400">
</div>


##  Beskrivning 

WiFi-styrenheten GATOR WiFi är avsedd för fjärrstyrning av en automatisk dörr (eller annan elektrisk utrustning).

GATOR WiFi kan styras med appen Protegus2. I styrenheten kan upp till 1 000 användare läggas in (användarens e-postadress måste anges). Med GATOR WiFi kan du ställa in ett styrschema för användare och en räknare för hur många gånger en användare får styra systemet. Styrenheten kan skicka meddelanden om att ingångar och utgångar aktiveras och återställs till larmcentralens (CMS) mottagare och till appen Protegus2.

### Funktioner

**Fjärrstyrning**

- Med mobilappen *Protegus2*.

**Meddelanden till användare**

- Skickar meddelanden om händelser till appen *Protegus2*.

**Meddelanden till larmbolaget**

- Skickar händelser med Contact ID-koder till TRIKDIS programvaru- och hårdvarumottagare, som fungerar med all larmcentralsprogramvara.

- Kan skicka händelsemeddelanden till larmbolagets mottagare och samtidigt arbeta med appen *Protegus2*.

- Om anslutningen till huvudmottagaren bryts skickas meddelandena automatiskt till en backupmottagare.

**Ingångar och utgångar**

- 4 universella ingångar/utgångar. Driftläget ställs in som ingång (NO, NC, EOL) eller som utgång.

- 1 utgång (OUT), relä.


- Med utbyggnadsmodulen iO-LORA kan du lägga till en ingång och en utgång (reläkontakt). Sammanlagt kan du lägga till 8 utbyggnadsmoduler iO-LORA (upp till 8 extra ingångar och 8 extra utgångar).

**Inställningar och installation**

- Snabb och enkel installation.

- Nya användare kan läggas till och befintliga användare tas bort med appen Protegus2 (vid inloggning med administratörsbehörighet) eller med programvaran TrikdisConfig.

- Enheten kan konfigureras antingen via en USB Mini-B-kabel eller på distans med programvaran TrikdisConfig.

- Fjärruppdatering av firmware.

### Tekniska data 

| Parameter | Beskrivning |
|:---|----|
| Matningsspänning | 9–32 V DC |
| Strömförbrukning | 150 mA |
| Universella ingångar/utgångar | 4, kan ställas in antingen som ingång IN med typ NC, NO, EOL=10 kΩ eller som utgång OUT (utgång med öppen kollektor (OC), 50 mA) |
| Utgång | 1 st., relä, 1 A 30 V DC, 0,5 A 125 V AC |
| Anslutning till larmcentralen (CMS) | TCP/IP eller UDP/IP via WiFi |
| Protokoll för händelseöverföring | TRK_TCP eller TRK_UDP |
| Krypteringsnyckel | Krypteringsnyckel med 6 tecken |
| WiFi-frekvens | 2,4 GHz |
| WiFi-protokoll | 802.11 b/g/n |
| Säkerhetsläge | WPA, WPA2, WPA mixed |
| Typ av nätverkskonfigurering | DHCP eller manuell nätverkskonfigurering (med telefon eller bärbar dator) |
| Minne för osända händelser | Upp till 60 händelser |
| Händelseloggens minne | Upp till 5 000 händelser |
| Användare som har behörighet att styra | 1 000  |
| Moduler som stöds | iO-LORA – utbyggnadsmodul (när iO-LORA används måste en radiotransceiver RF-LORA vara ansluten till GATOR WiFi) |
| Driftmiljö | Temperatur från –10 °C till +50 °C, relativ luftfuktighet upp till 80 % vid +20 °C |
| Mått | 88 × 62 × 26 mm |
| Vikt | 80 g |

### Styrenhetens delar 

1.  Lysdioder.

2.  Öppningsskåra på kapslingens framsida.

3.  USB Mini-B-port för programmering av styrenheten.

4.  Plintblock för externa anslutningar.

5.  Knapp för att aktivera modulens WiFi-konfigureringsläge.

<img alt="Styrenheten GATOR WiFi med numrerade delar. Vänster bild, framsidan: 1 Lysdioder; 2 Öppningsskåra på kapslingens framsida. Höger bild, med locket borttaget: 3 USB Mini-B-port för programmering av styrenheten; 4 Plintblock för externa anslutningar; 5 Knapp för att aktivera modulens WiFi-konfigureringsläge." src="./image4.webp" style="width:4.853343175853018in;height:2.8366721347331585in" />

### Plintarnas funktion 

| Plint | Beskrivning                                    |
|----------|:-----------------------------------------------|
| +DC      | Matningsplint (9–32 V DC plus)            |
| -DC      | Matningsplint (9–32 V DC minus)            |
| 1 I/O    | Ingång/utgång (fabriksinställning: ingång, NO)      |
| 2 I/O    | Ingång/utgång (fabriksinställning: ingång, NO)      |
| 3 I/O    | Ingång/utgång (fabriksinställning: utgång av typen OC) |
| 4 I/O    | Ingång/utgång (fabriksinställning: utgång av typen OC) |
| +AUX     | Matningsplint plus för externa enheter   |
| NC       | Reläplint NC                              |
| C        | Reläplint C                               |
| NO       | Reläplint NO                              |
| A RS485  | Ledare A på *RS485*-bussen                         |
| B RS485  | Ledare B på *RS485*-bussen                         |

### Lysdiodernas indikering 

| Indikering | Lysdiodens status | Beskrivning |
|-----------|--------------|-------------|
| NETWORK | Fast grönt sken | Ansluten till WiFi-nätverket |
| NETWORK | Blinkar grönt | Försöker ansluta till WiFi-nätverket |
| NETWORK | Blinkar gult | Indikering av WiFi-signalens styrka från 0 till 5. |
| NETWORK | Blinkar snabbt grönt och gult | WiFi-konfigureringsläge |
| DATA | Fast grönt sken | Ett meddelande skickas |
| DATA | Fast gult sken | Det finns osända händelsemeddelanden i databufferten |
| STATUS | Blinkar grönt | Inga driftfel |
| STATUS | 1 röd blinkning | Det går inte att ansluta till WiFi-nätverket |
| STATUS | 2 röda blinkningar | Svag WiFi-signal |
| STATUS | 3 röda blinkningar | Det går inte att ansluta till IP-mottagaren via primärkanalen |
| STATUS | 4 röda blinkningar | Det går inte att ansluta till Protegus2-servern |
| STATUS | 5 röda blinkningar | Det går inte att ansluta till någon av mottagarens båda kanaler |
| STATUS | 6 röda blinkningar | Den interna klockan i GATOR WiFi är inte inställd |
| STATUS | 7 röda blinkningar | Matningsspänningen är otillräcklig |

Om lysdioderna inte indikerar något, kontrollera matningen och anslutningarna.

!!! note "Obs!"
    Innan du börjar installationen, kontrollera att du har de nödvändiga
    komponenterna:
    
    1.  USB Mini-B-kabel för konfigurering.
    
    2.  Kabel med minst 4 ledare för anslutning av styrenheten.
    
    3.  Platt skruvmejsel, 2,5 mm.
    
    Beställ de nödvändiga komponenterna separat från din lokala återförsäljare.
### Leveransomfattning för styrenheten *GATOR WiFi* 

|  \- | Styrenhet GATOR WiFi       | 1 st.  |
|----:|-----------------------------------|--------|
|  \- | Motstånd 10 kΩ                    | 3 st. |
|  \- | Dubbelhäftande tejp (5 cm) | 1 st.  |
|  \- | Skruv                             | 2 st. |

## Kopplingsscheman för styrenheten *GATOR WiFi* 

### Montering 

1.  Ta av locket. Dra ut plintblockets löstagbara del.

2.  Ta ut kretskortet.

3.  Fäst kapslingens bottendel på önskad plats med skruvar.

4.  Sätt tillbaka kretskortet och plintblocket.

5.  Stäng locket.

<img alt="Monteringsritningar. Vänster bild: en sidoflik som håller fast locket är inringad, med en pil som pekar utåt. Höger bild: två skruvhål i kapslingens bottendel är inringade." src="./image5.webp" style="width:3.937007874015748in;height:2.0551181102362204in" />

### Anslutning av matningen 

Anslut styrenheten GATOR WiFi med ledare enligt schemat nedan.

<img alt="Kopplingsschema: DC-matning till GATOR WiFi och 5 OUT till dörrstyrning. Matning (9–32 V, 0,2 A): plus till +DC, minus till -DC. Dörrstyrning: kontakterna C och NO på 5 OUT, märkdata 1 A / 30 V DC eller 0,5 A / 125 V AC." src="./image6.webp" style="width:3.47500656167979in;height:2.657505468066492in" />

### Anslutning av RFID-läsare (Wiegand 26/34) 

Hur styrenheten konfigureras med en RFID-läsare beskrivs i avsnitt 5.3 ”Fönstret ”IN/OUT””. Bara utgången 5 OUT kan styras med en RFID-läsare.

Schema för anslutning av en RFID-läsare till styrenheten GATOR WiFi.

<img alt="Kopplingsschema: RFID-läsare med knappsats (Wiegand 26/34) till GATOR WiFi. Matning (9–16 V, 0,5 A) och läsarens R röd (+U) till +DC; matningens minus och B svart (GND) till -DC. G grön (D0) till 1 I/O; W vit (D1) till 2 I/O. Utpasseringsknapp (Exit) mellan -DC och 3 I/O. Portstyrning på 5 OUT C och NO, märkdata 1 A / 30 V DC eller 0,5 A / 125 V AC." src="./image7.webp" style="width:4.362508748906387in;height:3.777507655293088in" />

I programmet TrikdisConfig måste fältet ”**Wiegand reader mode**” markeras. När knappen ”**Exit**” trycks in aktiveras styrenhetens utgång ”**5OUT**” under den inställda pulstiden.

<img alt="TrikdisConfig WP17, fönstret IN/OUT: Wiegand reader mode är markerat. Raden 5 OUT är inställd på Output, Pulse, med en puls på 3 sekunder." src="./image8.webp" style="width:7.086614173228346in;height:2.3897637795275593in" />

### Anslutning av utbyggnadsmodulen iO-LORA med RFID-läsare 

Styrenhetens firmwareversion från 1.21.

Anslut radiotransceivern RF-LORA till styrenheten GATOR WiFi. Därefter kan du använda utbyggnadsmodulen iO-LORA, som RFID-läsaren (Wiegand 26/34) är ansluten till. RFID-läsaren styr PGM-utgången på den utbyggnadsmodul iO-LORA som den är ansluten till. GATOR WiFi och åtta anslutna utbyggnadsmoduler iO-LORA kan styra nio olika dörrar.

<img alt="Kopplingsschema: GATOR WiFi till RF-LORA. +DC till +DC, -DC till -DC, A RS485 till A RS485, B RS485 till B RS485; gemensam DC-matning 9–16 V, 0,5 A. RF-LORA har trådlös förbindelse upp till 5 000 m med iO-LORA. Den övre modulen iO-LORA 1 och den nedre modulen iO-LORA 8 är var och en ansluten till en matning på 9–16 V vid +DC och -DC; läsare R röd (+U) till +DC, B svart (GND) till -DC, G grön (D0) till D0, W vit (D1) till D1; utpasseringsknapp (Exit) mellan COM och IN; portstyrning på C och NO, märkdata 2 A / 230 V AC." src="./image9.webp" style="width:6.889763779527559in;height:6.409448818897637in" />

Starta TrikdisConfig. Anslut GATOR WiFi till datorn med en USB Mini-B-kabel eller på distans. Klicka på knappen **Read [F4]** så visar TrikdisConfig styrenhetens aktuella inställningar. Ange vid behov administratörskoden eller installatörskoden (6 siffror) i fönstret som öppnas. Välj ”**iO-LORA controller**” i listan ”**Modules**”. Ange enhetens serienummer i fältet ”**Serial No.**”.

<img alt="TrikdisConfig WP17, fönstret Modules: rad 1 har iO-LORA controller som Module; fälten Module och Serial No. är markerade." src="./image10.webp" style="width:7.086614173228346in;height:1.4173228346456692in" />

I listan ”**IN/OUT**” måste ”**EXIT button**” anges som funktion för ingången ”**6 IN**”. När knappen ”**Exit**” trycks in aktiveras utgången ”**7 OUT**” på iO-LORA under den inställda pulstiden.

<img alt="TrikdisConfig WP17, fönstret IN/OUT: 6 IN är markerad med Function Exit button, Name IN6 och typen NO. 5 OUT och 7 OUT är utgångar med en puls på 3 sekunder, och Wiegand reader mode är markerat." src="./image11.webp" style="width:7.086614173228346in;height:2.6929133858267716in" />

I listan ”**Users**” anger du RFID-brickans nummer och användarens namn, aktiverar behörigheten att styra PGM-utgången, anger vilken PGM-utgång användaren ska styra samt koden. När inställningarna är klara, klicka på **Write [F5]**. Vänta tills uppdateringen av styrenhetens inställningar är klar. Klicka på ”**Disconnect**” och koppla bort USB-kabeln.

<img alt="TrikdisConfig WP17, fönstret User list, fliken Users: fältet RFID Code är markerat i en användarrad. Två användare har utgång 5 markerad, och deras Code-poster är markerade." src="./image12.webp" style="width:7.086614173228346in;height:1.9015748031496063in" />

Aktivera PGM-utgången med RFID-bricka eller kod. Tryck på knappen ”**Exit**” (PGM-utgången ska aktiveras under den inställda pulstiden).

### Anslutning av ingångar 

GATOR WiFi har fyra universella I/O-plintar (ingångar/utgångar), som kan fungera antingen som ingångar eller som utgångar. Ingångarna kan fungera i lägena NC, NO och EOL. Anslut ingångarna enligt den inställda ingångstypen (NC, NO, EOL) som i schemana nedan:

<img alt="Fyra kopplingsscheman: GATOR WiFi -DC till xI/O. Normalt öppen (NO): NO-kontakt i serie. Normalt sluten (NC): NC-kontakt i serie. Normalt sluten med slutmotstånd 10 kΩ (EOL): NC-kontakt och 10k-motstånd i serie. Normalt öppen med slutmotstånd 10 kΩ (EOL): NO-kontakt och 10k-motstånd parallellt." src="./image13.webp" style="width:6.050012029746282in;height:1.500003280839895in" />

### Anslutning av reläet 

Med reläets kontakt kan man fjärrstyra (slå på/stänga av) olika elektriska enheter. Utgångsläget (”Output”) måste vara inställt för plinten xI/O.

<img alt="Kopplingsschema: GATOR WiFi till ett relä. Reläspole: +AUX till ena spolplinten, xI/O till den andra. Reläets kontaktplintar har beteckningarna NC, C och NO." src="./image14.webp" style="width:2.5450054680664915in;height:0.8875021872265967in" />

### Anslutning av lysdioden 

Utgångsläget (”Output”) måste vara inställt för plinten xI/O.

<img alt="Kopplingsschema: GATOR WiFi till en lysdiod. +AUX ansluts via ett motstånd på 2k2 och lysdioden i serie till xI/O." src="./image15.webp" style="width:2.0925043744531933in;height:0.7475010936132983in" />

## Styrning med appen *Protegus2* 

Med appen Protegus2 kan användarna fjärrstyra styrenheten. De kan också se systemets status och ta emot alla systemets händelsemeddelanden.

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

    1.  Matningen måste vara påslagen (lysdioden ”**STATUS**” måste blinka
        grönt);

    2.  Styrenheten måste vara registrerad på nätet (lysdioden ”**NETWORK**”
        måste ha fast grönt sken och blinka gult).
Välj ”**Add new system**”.

<img alt="Menyn i appen Protegus2 med Add new system markerat." src="./image22.webp" style="width:2.7559055118110236in;height:2.6141732283464565in" />

Ange styrenhetens ”Unique ID (MAC)”, som finns på produkten eller på etiketten på förpackningen. Tryck på ”**Next**”.

<img alt="Protegus2, skärmen Scan QR code. Fältet Unique ID/IMEI, QR-koden på produktetiketten och knappen Next är markerade som sätt att identifiera och lägga till enheten." src="./image23.webp" style="width:2.7559055118110236in;height:4.9015748031496065in" />

Tryck på ”**Start WiFi configuration WP17**”.

<img alt="Protegus2, skärmen Check device, som anger att enheten är offline (Device is offline). Start WiFi configuration for WP17 är markerat under enhetskontrollerna och knappen Retry." src="./image24.webp" style="width:2.7559055118110236in;height:4.539370078740157in" />

Ta av GATOR WiFis lock med en platt skruvmejsel. Håll knappen ”**PAIR**” nedtryckt i 3 sekunder. Indikeringen ”**NETWORK**” börjar snabbt blinka grönt och gult. Släpp knappen. Styrenheten GATOR WiFi har nu gått in i läget för registrering på WiFi-nätverket.

<img alt="Protegus2, skärmen Scan nearby devices med texten Scanning nearby WP17. Den anger att man ska hålla knappen på enheten nedtryckt tills indikeringen NETWORK blinkar grönt och gult; en pil pekar på knappens plats i enhetsritningen." src="./image25.webp" style="width:2.7559055118110236in;height:4.003937007874016in" />

Vänta tills styrenheten GATOR WiFi (WP17) har hittats. Klicka på ”**OK**”.

<img alt="Protegus2, skärmen Device bekräftar Found WP17, med knappen OK markerad." src="./image26.webp" style="width:2.7559055118110236in;height:2.661417322834646in" />

Välj det WiFi-nätverk som GATOR WiFi ska anslutas till.

<img alt="Protegus2, skärmen WiFi configuration visar nätverket Trikdis2 under WiFi connections, med raden markerad för val." src="./image27.webp" style="width:2.7559055118110236in;height:2.1023622047244093in" />

Ange WiFi-nätverkets lösenord. Klicka på ”**OK**”.

<img alt="Protegus2, skärmen WiFi configuration visar en dialogruta för WiFi-lösenordet med ett maskerat lösenordsfält och knappen OK markerad." src="./image28.webp" style="width:2.7559055118110236in;height:2.559055118110236in" />

Klicka på ”**Connect**”.

<img alt="Protegus2, skärmen Connecting to WP17 med frågan Connect to device?. Den förklarar att Protegus2 använder ett tillfälligt WiFi-nätverk, och Connect är markerat." src="./image29.webp" style="width:2.7559055118110236in;height:3.6850393700787403in" />

Vänta tills styrenheten har anslutit.

<img alt="Protegus2, anslutningsskärmen visar 00:49 kvar, Waiting for device to come online och Connecting to WP17." src="./image30.webp" style="width:2.7559055118110236in;height:2.5551181102362204in" />

Ange systemets namn. Tryck på ”**Next**”.

<img alt="Protegus2, skärmen Add new system. Name är satt till WP17 och Time zone till Europe/Vilnius, med Next markerat." src="./image31.webp" style="width:2.7559055118110236in;height:2.6811023622047245in" />

Tryck på ”**Skip**”.

<img alt="Protegus2 bekräftar System added successfully. Skärmen erbjuder Personalize för att ändra standardnamnen, eller det markerade alternativet Skip." src="./image32.webp" style="width:2.7559055118110236in;height:3.7755905511811023in" />

Vänta 1 minut. Styrenheten GATOR WiFi går själv ur registreringsläget efter några minuter (eller håll knappen ”**PAIR**” nedtryckt i 3 sekunder tills indikeringen ”**NETWORK**” slutar blinka snabbt grönt och gult).

<img alt="Protegus2, systemskärmen för WP17 visar Online och en kontroll för Output5. Ett orange meddelande anger att det kan ta upp till 1 minut innan systemet är fullt fungerande." src="./image33.webp" style="width:2.7559055118110236in;height:2.377952755905512in" />

Aktivera PGM-utgången genom att trycka på ikonen ”**Output5**”.

<img alt="Protegus2, systemskärmen för WP17 visar Online, med kontrollen Output5 markerad." src="./image34.webp" style="width:2.7559055118110236in;height:1.9133858267716535in" />

## Lägga till en widget på telefonen 

Widgeten för portstyrning kan läggas på telefonens startskärm. Styrenheten måste vara registrerad i molntjänsten Protegus2. Logga in i appen Protegus2 på telefonen. Stäng fönstret för Protegus2.

Tryck på skärmen med fingret och håll kvar. En inställningsrad visas.

1.  Tryck på ”**Widgets**”**.**

<img alt="Androids startskärm i redigeringsläge. Markering 1 pekar på Widgets i inställningsraden längst ned." src="./image35.webp" style="width:2.7559055118110236in;height:3.02755905511811in" />

Leta upp Protegus2 i inställningsraden.

2. Välj ”Protegus2”.

<img alt="Androids widgetväljare. Markering 2 pekar på widgetgruppen Protegus 2." src="./image36.webp" style="width:2.7559055118110236in;height:3.0708661417322833in" />

3. Tryck på ”**Switch** **Protegus2**”.

<img alt="Androids widgetväljare med widgetar för Protegus 2. Markering 3 pekar på widgeten Switch Protegus 2." src="./image37.webp" style="width:2.7559055118110236in;height:3.0708661417322833in" />

4. Välj styrenhetens utgång ”**WP17 Output5**”.

5.  Tryck på ”**ADD WIDGET**”.

<img alt="Widgetskärmen för Protegus: markering 4 pekar på styrenhetens utgång WP17 Output5; markering 5 pekar på knappen ADD WIDGET." src="./image38.webp" style="width:2.7559055118110236in;height:2.145669291338583in" />

6. En ikon visas på telefonens skärm.

<img alt="Markering 6 pekar på widgeten Output5 med strömknapp i widgetväljaren för Protegus 2. Nedanför visas Switch Protegus 2 som en widget i storlek 1 × 1." src="./image39.webp" style="width:2.7559055118110236in;height:3.1141732283464565in" />

7. Gå tillbaka till startskärmen. Tryck på ikonen.

<img alt="Telefonens startskärm med markering 7 runt den grå widgeten Output5 med strömknapp, bredvid ikonen för appen Protegus 2." src="./image40.webp" style="width:2.7559055118110236in;height:1.6456692913385826in" />

En cirkel som visar när PGM-utgången är påslagen visas på skärmen.

<img alt="Telefonens startskärm med den grå widgeten Output5 bredvid ikonen för appen Protegus 2. Nedanför visas en stor vit cirkel med en grå strömknapp och en liten uppdateringssymbol." src="./image41.webp" style="width:2.7559055118110236in;height:2.8818897637795278in" />

8. När styrenheten är ansluten till portautomatik med indikering av portens läge visar ikonen om porten är öppen eller stängd.

<img alt="Telefonens startskärm med markering 8 runt widgeten Output5, vars strömknapp är grön." src="./image42.webp" style="width:2.7559055118110236in;height:1.5393700787401574in" />

## Ställa in parametrar med programvaran *TrikdisConfig* 

Med TrikdisConfig kan du ändra inställningarna för GATOR WiFi enligt beskrivningarna av programfönstren nedan.

1.  Ladda ned konfigurationsprogrammet TrikdisConfig från [www.trikdis.com/lt](http://www.trikdis.com/lt)/ (skriv ”TrikdisConfig” i sökfältet) och installera det.

2.  Ta av locket på GATOR WiFi med en platt skruvmejsel enligt bilden nedan:

<img alt="Två ritningar visar en platt skruvmejsel som förs in vid lockets övre kant på GATOR WiFi. Den högra ritningen visar skruvmejseln som rör sig nedåt; den vänstra visar locket som flyttas åt vänster. En USB Mini-B-kontakt är markerad bredvid enheten." src="./image43.webp" style="width:6.881889763779528in;height:1.8503937007874016in" />

1.  Anslut GATOR WiFi till en dator med en USB Mini-B-kabel.

2.  Starta konfigurationsprogrammet TrikdisConfig. Programmet identifierar den anslutna enheten automatiskt och öppnar konfigureringsfönstret för GATOR WiFi automatiskt.

3.  Klicka på **Read [F4]** för att se aktuella parametrar för GATOR WiFi. Ange vid uppmaning administratörens kod i fönstret som öppnas.

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

När GATOR WiFi har anslutits till programvaran TrikdisConfig visar programvaran information om den anslutna enheten i statusfältet:

<img alt="Statusfältet i TrikdisConfig med fältet MAC/Unique ID, Status: reading done, Device: WP17_3001, starthanterarversion 1.08, firmwareversion 1.21 och State: USB." src="./image44.webp" style="width:7.086614173228346in;height:0.5275590551181102in" />

| Namn           | Beskrivning                                               |
|----------------|-----------------------------------------------------------|
| MAC/Unique ID | Enhetens MAC-nummer                                   |
| State          | Driftstatus                                               |
| Device         | Enhetstyp (måste visa WP17_xxxx)                   |
| SN             | Enhetens serienummer                                      |
| BL             | Version av starthanteraren                                |
| FW             | Enhetens firmwareversion                                  |
| HW             | Enhetens hårdvaruversion                                  |
| State          | Typ av anslutning till programvaran (med USB eller på distans) |

När du klickar på knappen **Read [F4]** läser och visar programmet de inställningar som för tillfället är sparade i GATOR WiFi. Justera de inställningar du behöver i TrikdisConfig enligt beskrivningarna av programfönstren nedan.

### Fönstret ”System options” 

<img alt="TrikdisConfig, fönstret System Options. General visar Object ID 0001, Time set NTP server, Time zone +0, DST region Europe, Administrator Code 123456 och User list language Baltic. Communicator network settings visar DHCP mode markerat, Static IP 192.168.0.6, Subnet mask 255.255.255.0 och Default gateway 192.168.0.1. Periodical Test visar Test Enable avmarkerat, en testperiod på 1 dag och 0 timmar samt Start test at 12:00." src="./image45.webp" style="width:7.086614173228346in;height:4.043307086614173in" />

**Inställningsgruppen ”General”**

- **Object ID** – ange abonnentkoden (hexadecimalt tal med 4 tecken, 0–9, A–F) (**använd inte FFFE eller FFFF som Object ID**).

- **Time set** – välj källa för att ställa in tiden.

- **Time zone** – anges när en NTP-server för tidssynkronisering har angetts.

- **Daylight saving time** – om kryssrutan markeras ändras tiden automatiskt på våren och hösten.

- **DST region** – välj den region som ditt land tillhör.

- **Administrator Code** – med den här koden kan alla styrenhetens parametrar ändras.

- **User list language** – välj språk (användarlistan kan skrivas med tecken för det valda språket).

**Inställningsgruppen ”Periodic test”**

- **Test Enable** – om kryssrutan är markerad är periodiska testmeddelanden aktiverade.

- **Test period** – inställning av tidsperioden mellan testsändningarna.

- **Start test at** – inställning av starttid för testet.

- **To mobile application** – om kryssrutan är markerad skickas testmeddelandet till appen Protegus2.

**Inställningsgruppen ”Communicator network settings”**

- **DHCP mode** – styrenhetens sätt att registrera sig på nätverket (manuellt eller automatiskt).

- **Static IP** – statisk IP-adress för när manuellt registreringsläge är inställt.

- **Subnet mask** – nätmask för när manuellt registreringsläge är inställt.

- **Default gateway** – gatewayadress för när manuellt registreringsläge är inställt.

- **Wifi SSID name** – ange namnet på det WiFi-nätverk som styrenheten GATOR WiFi ska ansluta till.
- **Wifi SSID password** – ange lösenordet till WiFi-nätverket.

### Fönstret ”IN/OUT” 

**Fliken ”IN/OUT”**

<img alt="TrikdisConfig, fliken IN/OUT: plintarna 1–4 är Disabled; plint 5 OUT har namnet Output5, med Type Pulse, Inactive 0, Delay 400 och No rest. Pulse 3 s. Under Tag reader settings är Low voltage reader markerat." src="./image46.webp" style="width:7.086614173228346in;height:2.9448818897637796in" />

Inställningsfönstret för ingångar och utgångar.

**Inställningsgruppen ”Input/Output settings”**

- **Terminal** – styrenhetens plintnummer för ingångar och utgångar.

- **Function** – plintens typ (ingång, utgång, avstängd).

- **Name** – ange namnet på ingången IN eller utgången OUT.

- **Type** – ange ingångstyp (NC, NO, EOL=10 kΩ).

- **Inactive** – ingången är inaktiv under den angivna tiden efter första aktiveringen. Ange 0 om du vill stänga av funktionen.

- **Delay** – ingångens (sektionens) reaktionstid, ms.

- **CMS** – om kryssrutan är markerad skickas meddelandet till larmcentralen (CMS) och till Protegus2.

- **No rest.** – skicka inte återställningshändelsen.
- **Pulse** – tiden som utgången är påslagen när utgången är inställd på typen ”**Pulse**”.

- **Sched** – tilldela ett schemanummer för styrning av utgången.

- **Assign IN** – tilldela en ingång (IN) till utgången för att se enhetens verkliga läge beroende på ingångens status.

- **Confirm** – ange numret på den ingång som, när den utlöses, aktiverar styrningen av utgången (OUT).

- **CTRL by IN** – den valda ingången aktiverar utgången.

  **Inställningsgruppen ”Tag reader settings”**
- **Wiegand reader mode** – markera kryssrutan om en RFID-läsare (Wiegand 26/34) ska anslutas till styrenheten GATOR WiFi.

- **Entry/Exit event with output** – markera kryssrutan så skickas händelsemeddelanden om in- och utpassering när utgången styrs via Protegus.

- **Disable reader filter** – markera kryssrutan så avaktiveras enhetens interna filter för läsare som skickar korta pulser.

- **Low voltage reader** – markera kryssrutan om du använder läsare med låg spänning.

**Fliken ”Scheduler”**

Utgångar kan styras automatiskt enligt ett inställt schema.

<img alt="TrikdisConfig, fliken Scheduler under IN/OUT visar fyra schemarader. Varje rad har Output inställd på Level, Holiday på Disabled, Start time och End time på 00:00, och inga veckodagar markerade." src="./image47.webp" style="width:7.086614173228346in;height:2.0039370078740157in" />

Utgången OUT kan aktiveras enligt ett inställt schema. Du måste ange tidpunkt och veckodagar, aktivera schemat och tilldela schemat till utgången (”Output”).

- **Name** – ange schemats namn.

- **Enable** – aktivera tidsschemat för när styrenheten ska styra utgången.

- **Lock** – markera kryssrutan för att hindra att utgången styrs på annat sätt när den utlöses enligt det angivna schemat.

- **MANUAL** – markera kryssrutan för att hindra schemaläggaren från att aktivera utgången vid start. Schemat börjar köras först när användaren aktiverar utgången.

- **Output mode** – ange PGM-utgångens driftsätt: ”**Level**” – utgången är aktiverad under den angivna tidsperioden; ”**Pulse**” **–** utgången aktiveras vid schemats början och slut under den inställda pulstiden.

- **Holiday mode** – ange hur tidsschemat ska fungera när helgdagar infaller.

- **Hol** – markera kryssrutan för att använda helgdagstider när schemat utlöses på helgdagar.

- **Start time** – ange tidpunkt och veckodagar från när utgången ska vara påslagen.

- **End time** – ange tidpunkt och veckodagar till när utgången ska vara påslagen.

- Om PGM-utgångens läge är inställt på ”**Level**” och bara ”**End time**” anges i tabellen ”**Scheduler**”, avaktiveras PGM-utgången vid den angivna tiden om den var aktiverad. Ett styrschema för utgången måste tilldelas en PGM-utgång.

  **Fliken ”Holidays”**

Ange de kalenderhelgdagar då det ska vara möjligt att ställa in den extra aktivering av PGM-utgången som anges i tabellen Scheduler.

<img alt="TrikdisConfig, fliken Holidays under IN/OUT visar fem avmarkerade helgdagsintervall, alla med Start date och Stop date inställda på 01.04.2022. Start time on holidays är 15:25 och Stop time on holidays är 16:44." src="./image48.webp" style="width:7.086614173228346in;height:1.9291338582677164in" />

- **En.** – markera kryssrutan för att ange ett visst helgdagsintervall.

- **Start date** – ange helgdagarnas startdatum.

- **Stop date** – ange helgdagarnas slutdatum.

- **Start time on holidays** – ange helgdagarnas starttid.

- **Stop time on holidays** – ange helgdagarnas sluttid.

### Fönstret ”Modules”

**Fliken ”Modules”**

Utbyggnadsmoduler av typen iO-LORA kan anslutas till styrenheten GATOR WiFi.

Genom att ansluta radiotransceivern RF-LORA kan upp till 8 trådlösa utbyggnadsmoduler iO-LORA anslutas till styrenheten GATOR WiFi. RFID-läsare som är anslutna till de trådlösa utbyggnadsmodulerna iO-LORA kan styra upp till 8 dörrar till (styrenhetens firmwareversion från 1.21). En utbyggnadsmodul iO-LORA med en RFID-läsare styr bara en dörr.

<img alt="TrikdisConfig, fönstret Modules visar åtta platser för utbyggnadsmoduler, alla med Not available. Den öppna rullgardinslistan Module erbjuder Not available och iO-LORA controller." src="./image49.webp" style="width:7.086614173228346in;height:2.547244094488189in" />

- **Modules** – välj i listan den modul som är ansluten till styrenheten.

- **Serial No.** – ange modulens serienummer (6 siffror), som anges på etiketterna på modulens kapsling och förpackning.

### Fönstret ”IP reporting” 

<img alt="TrikdisConfig, fönstret IP Reporting: Primary channel och Backup channel har Communication type Disabled. Settings visar Return to Primary after 5 min, IP Ping period 60 s markerat och Backup reporting after 3 attempts. Cloud application har Enable cloud service och Parallel reporting markerade, med Cloud Access Code 123456." src="./image50.webp" style="width:7.086614173228346in;height:3.2244094488188977in" />

**Inställningsgruppen ”Primary channel”**

Styrenheten kan skicka meddelanden till larmcentralen (CMS). För det måste kommunikationskanaler till larmcentralens mottagare ställas in.

- **Communication type** – välj typ av kommunikation (TCP/IP, UDP/IP) med larmcentralens (CMS) mottagare.

- **Domain or IP** – ange mottagarens domän eller IP-adress.

- **Port** – ange mottagarens nätverksport.

- **Encryption Key** – krypteringsnyckel för meddelanden, 6 siffror, som måste stämma överens med larmcentralsmottagarens krypteringsnyckel.

**Inställningsgruppen ”Backup channel”**

Inställningarna är identiska med inställningarna för primärkanalen.

**Inställningsgruppen ”Settings”**

- **Return to primary after** – tidsperioden efter vilken styrenheten försöker återupprätta anslutningen till primärkanalen.

- **IP Ping period** – aktivera sändning av PING-signal och ställ in dess periodlängd.

- **Backup reporting after** – ange antal anslutningsförsök mot huvudkanalen efter vilka styrenheten automatiskt ansluter till backupkanalen.

**Inställningsgruppen ”Cloud application”**

- **Enable cloud service** – genom att markera kryssrutan aktiverar du molntjänsten Protegus2. GATOR WiFi kan då utbyta data med appen Protegus2, och det blir också möjligt att konfigurera på distans med TrikdisConfig.

- **Parallel reporting** – meddelandena skickas samtidigt till larmcentralen (CMS) och Protegus. När funktionen inte är aktiverad skickas meddelanden till Protegus2 först efter att de har skickats till larmcentralen.

- **Cloud Access Code** – kod med 6 siffror för anslutning till Protegus2 (förval: 123456).

### Fönstret ”User list” 

**Fliken ”User list”**

<img alt="TrikdisConfig, fönstret User list, fliken Users, med knapparna Register RFID och Clear users ovanför en tabell med E-mail address, RFID Code, Name, En, Schedule, utgång 5 och More Settings." src="./image51.webp" style="width:7.086614173228346in;height:2.0in" />

- **E-mail address** – ange användarens e-postadress.

- **RFID code** – ange ID-numret på användarens RFID-kort (bricka) om en RFID-läsare är ansluten till styrenheten och användaren har ett RFID-kort (en bricka).

- **Name** – ange användarens namn.

- **En** – om kryssrutan är markerad får användaren styra utgångarna OUT.

- **Sched.** – tilldela ett schema (ange ett schemanummer) för när användaren får styra utgångarna OUT.

- **Outputs** – markera numret på den utgång som användaren ska styra.

- **Code** – ange användarkoden för RFID-läsaren med knappsats. När en RFID-läsare med knappsats (Wiegand 26/34) är ansluten till styrenheten kan användaren få en styrkod med fyra siffror.

- **More settings** – när du klickar på knappen ”**More settings**” öppnas ett fönster med ytterligare användarinställningar.

  **Användarinställningar (nummer från 11 till 1010)**
- Enabled – om rutan är markerad får användaren styra utgångarna OUT.

- Name – ange användarens namn.

- E-mail address – ange användarens e-postadress.

- RFID code – när en RFID-läsare med knappsats (Wiegand 26/34) är ansluten till styrenheten kan ID-numret på RFID-kortet (brickan) tilldelas användaren.

- Keypad code – när en RFID-läsare med knappsats (Wiegand 26/34) är ansluten till styrenheten kan användaren tilldelas en användarkod.

- Assign scheduler – tilldela ett schema (ange ett schemanummer) för när användaren får styra utgångarna OUT.

- Valid from – ange datum och tid från när användaren får styra styrenheten.

<img alt="TrikdisConfig, fönstret User settings för användare med ID 11. Enabled är avmarkerat; Valid from och Valid until visar 24.01.2025 och 25.01.2025 kl. 00:00 med avmarkerade kryssrutor. Enable counter och Can control outputs OUT5 är avmarkerade; Set counter och Current counter är 0." src="./image52.webp" style="width:4.366141732283465in;height:3.468503937007874in" />

- **Valid until** – ange datum och tid till när användaren får styra styrenheten.

- **Enable counter** – markera kryssrutan för att aktivera räknaren.

- **Set counter** – ange hur många gånger användaren får styra styrenheten under den valda tiden.

- **Current counter** – aktuellt antal styrningar.

- **Can control outputs** – markera numret på den utgång som användaren ska styra.

- **Can control iO-LORA outputs** – markera numret på den iO-LORA-utgång som användaren ska styra.

#### Registrera RFID-bricka (kort) 

Anslut RFID-läsaren till styrenheten (se avsnitt 2.3 ”Anslutning av RFID-läsare (Wiegand 26/34)”). Slå på matningen till styrenheten. Anslut USB Mini-B-kabeln till styrenheten. Markera fältet ”**Wiegand reader mode**” i TrikdisConfig-fönstret ”IN / OUT”.

<img alt="TrikdisConfig WP17, fönstret IN/OUT: Wiegand reader mode är markerat. Raden 5 OUT är inställd på Output, Pulse, med en puls på 3 sekunder." src="./image8.webp" style="width:7.086614173228346in;height:2.3897637795275593in" />

Klicka på ”**Register RFID**” i fönstret ”**User list**”.

<img alt="TrikdisConfig, fönstret User list, fliken Users, med knappen Register RFID inringad i rött." src="./image53.webp" style="width:7.086614173228346in;height:2.0in" />

Fönstret för registrering av RFID-brickor (kort) öppnas.

<img alt="TrikdisConfig, fönstret RFID registration mode med texten Add RFID tag/card to reader och en knapp STOP registration." src="./image54.webp" style="width:2.8346456692913384in;height:2.3858267716535435in" />

Håll RFID-brickan (kortet) mot RFID-läsaren. När läsaren har läst av brickan (kortet) öppnas ett nytt fönster. Ange ”**Enter user name**” där och välj ”**User can control PGM Output 5**”. Klicka på knappen ”**ADD**”. / Upprepa stegen ovan för att lägga till fler RFID-brickor (kort).

<img alt="TrikdisConfig, fönstret RFID registration mode visar ett hittat kort eller en hittad bricka och ett ifyllt fält Enter user name. User can control PGM Output 5 är markerat, och knappen ADD är inringad i rött." src="./image55.webp" style="width:2.8346456692913384in;height:2.4173228346456694in" />

När alla RFID-brickor (kort) har registrerats, klicka på knappen ”**STOP registration**”. / Klicka på knappen **Write [F5]** för att spara listan över RFID-brickor i styrenheten.

<img alt="TrikdisConfig, fönstret RFID registration mode visar User added och markerar knappen STOP registration." src="./image56.webp" style="width:2.8346456692913384in;height:2.34251968503937in" />

<img alt="TrikdisConfig WP17, User list, fliken Users. En användarrad är inringad med fälten RFID Code och Name, En. markerat och utgång 5 markerad. Knappen Write (F5) syns." src="./image57.webp" style="width:7.086614173228346in;height:2.0354330708661417in" />

RFID-brickor (kort) kan registreras i TrikdisConfig genom att man anger deras ID-nummer i fältet ”**RFID code**”. Ange ett namn (”**Name**”) för användaren, markera fältet ”**En.**” och fyll i fältet ”**Outputs**” för de utgångar som ska styras. Klicka på knappen **Write [F5]** för att spara listan över RFID-brickor (kort) i styrenheten.

**Fliken ”Scheduler”**

<img alt="TrikdisConfig WP17, User list, fliken Scheduler. Fyra scheman har kryssrutor för Enable, fälten Start time och Stop time inställda på 00:00 samt kryssrutor för veckodagar vid varje tid." src="./image58.webp" style="width:7.086614173228346in;height:2.0in" />

Ett schema kan skapas för användaren, med angivna tider och veckodagar då användaren får styra utgången.

- **Name** – ange ett namn för schemat.

- **Enable** – aktivera tidsschemat för när användaren får styra styrenhetens utgångar.

- **Start time** – ange tidpunkt och veckodagar från när användaren får styra styrenhetens utgångar.

- **Stop time** – ange tidpunkt och veckodagar till när användaren får styra styrenhetens utgångar.

**Fliken ”Black list”**

<img alt="TrikdisConfig WP17, User list, fliken Black list. En tom tabell har kolumnen E-mail/RFID code." src="./image59.webp" style="width:7.086614173228346in;height:1.720472440944882in" />

Spärrlistan (”**Black list**”) innehåller e-postadresser för användare och ID-nummer på RFID-kort som är förbjudna att styra GATOR WiFi.

Det finns ett enkelt sätt att lägga till användare i spärrlistan (”**Black List**”) direkt från händelseloggen (”**Events Log**”). Högerklicka på ”**Name**” eller ID-numret på RFID-kortet i ”**Events Log**” och välj ”**Add to Black List**”.

### Fönstret ”Event Log” 

<img alt="TrikdisConfig WP17, fönstret Events Log. Knapparna Read Log och Clear Log finns ovanför en tabell med kolumnerna Event No., Name / E-mail, User code, Time och Event definition. Synliga händelser är Output ON och Output OFF för OUT 5." src="./image60.webp" style="width:7.086614173228346in;height:1.9645669291338583in" />

Klicka på knappen ”**Read Log**”. Händelseloggen (”**Events Log**”) läses från styrenhetens minne. ”**Events log**” ger information om styrenhetens åtgärder och interna händelser.

### Återställa förvalda inställningar 

Anslut GATOR WiFi till datorn med en USB Mini-B-kabel. Om du vill återställa förvalda inställningar i GATOR WiFi, klicka på knappen ”**Restore**” i fönstret i TrikdisConfig.

<img alt="TrikdisConfig, avsnittet Default settings med knappen Restore inringad. Etiketten MAC/Unique ID och dess värde visas under den, med enhetens statusinformation längst ned." src="./image61.webp" style="width:7.086614173228346in;height:0.8700787401574803in" />

## Ställa in parametrar på distans 

!!! warning "Viktigt"
    Fjärrkonfigurering fungerar bara när:

    1.  Tjänsten Protegus2 är aktiverad. Hur tjänsten aktiveras
        beskrivs i avsnitt 5.5 ”Fönstret ”IP reporting””;

    2.  Styrenheten är ansluten till nätet (lysdioden ”**NETWORK**” har fast
        grönt sken och blinkar gult).
1.  Ladda ned programmet TrikdisConfig från [www.trikdis.com](http://www.trikdis.com).

2.  Kontrollera att styrenheten är ansluten till internet och att anslutningen till Protegus2 är aktiverad***.***

3.  Starta konfigurationsprogrammet TrikdisConfig och ange styrenhetens ”**MAC**” i fältet ”**Unique ID**” i avsnittet ”**Remote access**” (MAC-numret anges på etiketterna på enhetens kapsling nedtill och på förpackningen).

<img alt="TrikdisConfig, avsnittet Remote access. Det tomma fältet Unique ID och knappen Configure är inringade; ett fält System Name finns mellan dem." src="./image62.webp" style="width:7.086614173228346in;height:2.090551181102362in" />

4. I fältet ”**System Name**” kan du ge styrenheten valfritt namn. Klicka på ”**Configure**”.

2.  Styrenhetens konfigurationsfönster öppnas. Klicka på knappen **Read [F4]** så läser programmet de parametrar som för tillfället är inställda för styrenheten. Om ett fönster för administratörskoden (*Administrator code*) öppnas, ange den sexsiffriga *administratörskoden*. För att programmet ska komma ihåg koden, markera rutan bredvid ”**Remember password**” och klicka på knappen **Write [F5]**.

3.  Ställ in önskade inställningar för styrenheten och klicka sedan på **Write [F5]**. För att koppla från styrenheten, klicka på ”**Disconnect**” och avsluta programmet TrikdisConfig.

## Test av styrenheten GATOR WiFi 

När konfigurering och installation är klara, testa systemet:

1.  Kontrollera att matningen är påslagen.

2.  Kontrollera nätverksanslutningen (indikeringen ”**NETWORK**” ska ha fast grönt sken och blinka gult).

3.  Testa GATOR WiFis ingångar genom att utlösa dem och kontrollera att mottagarna får rätt meddelanden.

4.  Testa GATOR WiFis utgångar genom att slå på dem på distans och kontrollera att mottagarna får rätt meddelanden och att utgångarna aktiveras som de ska.

## Uppdatera firmware manuellt 

!!! note "Obs!"
    När GATOR WiFi är ansluten till TrikdisConfig erbjuder programmet
    att uppdatera enhetens firmware om det finns uppdateringar.
    Uppdateringar kräver en internetanslutning. / Om det finns antivirusprogram
    installerat på datorn kan det blockera den automatiska
    firmwareuppdateringen. I så fall måste du ändra antivirusprogrammets
    inställningar.
GATOR WiFis firmware kan också uppdateras och bytas manuellt. Alla tidigare parametrar i GATOR WiFi behålls efter uppdateringen. Vid manuell skrivning kan firmware ändras till en äldre eller en nyare version. Gör så här:

1.  Starta ***TrikdisConfig**.*

2.  Anslut GATOR WiFi till en dator med en USB Mini-B-kabel eller anslut till GATOR WiFi på distans. Om en nyare firmwareversion finns erbjuder programmet att installera den.

3.  Välj menygrenen ”**Firmware**”.

4.  Klicka på knappen ”**Open firmware**” och välj den firmwarefil du behöver.

    <img alt="TrikdisConfig WP17, fönstret Firmware: ett tomt fält Open firmware file, knapparna Open firmware och Start update (F12) samt en förloppsindikator på 0 %." src="./image63.webp" style="width:7.086614173228346in;height:2.4763779527559056in" />

5.  Klicka på knappen **Start update [F12]**.

6.  Vänta tills uppdateringen är klar.

## Säkerhetsanvisningar

Styrenheten får endast installeras och underhållas av behörig personal.

Läs den här manualen noggrant före installationen för att undvika misstag som kan leda till funktionsfel eller till och med skador på utrustningen.

Koppla alltid bort matningen innan du gör elektriska anslutningar.

Alla ändringar, modifieringar eller reparationer som inte har godkänts av tillverkaren upphäver garantin.

<img alt="Överkryssad soptunna på hjul (WEEE), som visar att enheten ska kasseras separat från hushållsavfall." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Följ lokala bestämmelser för avfallssortering och släng inte den här utrustningen eller dess delar i hushållsavfallet.
