# Använda trådlösa Paradox-enheter med FLEXi SP3 (RTX3)

<div style="text-align: center;">
  <img src="./image1.jpeg" alt="FLEXi SP3 och den trådlösa mottagaren RTX3" width="400">
</div>


## Byte av centralapparatens firmware

Centralapparatens firmware måste bytas mot en firmware som gör att trådlösa Paradox-detektorer fungerar. Firmwarefilen kan laddas ned av registrerade användare från [www.trikdis.com](http://www.trikdis.com).

#### Kompatibilitetstabell för centralapparatens utförande och firmwareversion

| Centralapparatens utförande | Firmwareversion som är kompatibel med centralapparaten |
|:--:|:--:|
| <img alt="Produktetikett med QR-kod: SP3_4G/E, FW 1.12. Utförandekoden SP3_14E0 i serienumret är markerad." src="./image2.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_1xx1_0112.fw |
| <img alt="Produktetikett med QR-kod: SP3_ETH, FW 1.12. Utförandekoden SP3_3E00 i serienumret är markerad." src="./image4.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_3xx1_0112.fw |
| <img alt="Produktetikett med QR-kod: SP3_4G/E, FW 1.12. Utförandekoden SP3_44E0 i serienumret är markerad." src="./image5.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_4xx1_0112.fw |
| <img alt="Produktetikett med QR-kod: SP3_2G, FW 1.12. Utförandekoden SP3_5200 i serienumret är markerad." src="./image6.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_5xx1_0112.fw |

Byt firmware så här:

1.  Starta ***TrikdisConfig**.*

2.  Anslut ”FLEXi” SP3 till en dator med en USB-kabel (Mini-B).

3.  Öppna fönstret **”Firmware”** i TrikdisConfig.

4.  Klicka på knappen **”Open firmware”** och välj den firmwarefil som behövs.

5.  Klicka på knappen **Update [F12]**.

6.  Vänta tills uppdateringen är klar.

7.  Klicka på knappen **”Disconnect”** och koppla bort USB-kabeln.

Anslut ledningarna från huvudmatningen till centralapparatens plintar AC/DC. Anslut modulen *RTX3* till centralapparaten.

<img alt="Kopplingsschema SP3 till RTX3. Knappsatsbuss: AUX+ (+12V) till RED, AUX- till BLK, GRN till GRN, YEL till YEL." src="./image7.png" style="width:2.2433377077865266in;height:1.2266688538932633in" />

Sätt i ett aktiverat SIM-kort i SIM-kortshållaren. Slå på huvudmatningen. Vänta några minuter. Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig. I statusfältet i TrikdisConfig visas information om den installerade firmwareversionen (1). I fönstret **”Modules” / ”Keypads”** finns modulen RTX3 (2), som är ansluten till centralapparaten, i tabellen.

<img alt="TrikdisConfig, fönstret Modules, fliken Keypads: markering 1 pekar på den sista siffran i fältet Device i statusfältet, och FW visar 1.12 i närheten. Markering 2 pekar på rad 1, där Keypad type är RTX3 transceiver." src="./image8.png" style="width:7.082677165354331in;height:4.066929133858268in" />

När modulen RTX3 är ansluten kan centralapparaten ”FLEXi” SP3 arbeta med trådlösa enheter från Paradox (magnetkontakter, rörelsedetektorer, glaskrossdetektor (G550), rökdetektor (SD360), fjärrkontroller (REM2, REM25), sirener (SR230, SR250), knappsatser (K37), utbyggnadsmodul (2 WPGM), repeater (RPT1)).

## Lära in en trådlös detektor

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten. Sätt i batterierna i den trådlösa detektorn och vänta tills lysdioderna slutar blinka.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.

<img alt="TrikdisConfig, fönstret Wireless: knappen Learn sensors är markerad ovanför tabellen med trådlösa enheter." src="./image9.png" style="width:7.078740157480315in;height:1.610236220472441in" />

5.  Välj enhetstyp: **”Sensors”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, dialogrutan Learning mode: Sensors är vald som enhetstyp att lära in, och knappen Start är markerad." src="./image10.png" style="width:3.074803149606299in;height:1.937007874015748in" />

7.  Tryck på detektorns sabotagekontakt (**”Tamper”**).

<img alt="TrikdisConfig, dialogrutan Learning mode: inlärningsläget har startat och meddelandet ber om en kort tryckning på enhetens sabotagekontakt. Under det finns knappen Stop learning." src="./image11.png" style="width:3.7244094488188977in;height:2.1929133858267718in" />

8.  Vänta några sekunder. Centralapparaten hittar detektorn.

9.  Numret **”UID”** måste stämma överens med detektorns serienummer, som finns på etiketten på detektorns kretskort.

10. Detektorn måste tilldelas ett **”Zone Number”** (sektionsnummer) och en **”Zone definition”** (sektionstyp).

11. Klicka på **”Save”**.

<img alt="TrikdisConfig, dialogrutan New device was found: en magnetkontakt (Magnetic contact) har hittats och dess UID visas. Zone number är 10, Zone definition är Interior och Save är markerad." src="./image12.png" style="width:3.0866141732283463in;height:2.515748031496063in" />

12. Den trådlösa detektorn läggs till i listan över trådlösa enheter.

13. Numret **”UID”** måste stämma överens med detektorns serienummer, som finns på etiketten på detektorns kretskort.

14. Klicka på **”Stop learning”** för att slutföra registreringen av trådlösa detektorer.

<img alt="TrikdisConfig, dialogrutan Learning mode: meddelandet om den nya enheten visar ID 1, Magnetic contact och ett UID. Knappen Stop learning är markerad." src="./image13.png" style="width:3.7244094488188977in;height:2.661417322834646in" />

15. Klicka på **”Yes”** så att detektorn skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Knappen Yes är markerad." src="./image14.png" style="width:3.0078740157480315in;height:1.2322834645669292in" />

16. En ny trådlös detektor läggs till i listan över enheter i fönstret **”Wireless”**.

<img alt="TrikdisConfig, fönstret Wireless: rad 1 är markerad och visar Device type Magnetic contact med ett värde i Serial No." src="./image15.png" style="width:7.082677165354331in;height:1.5669291338582678in" />

17. Du måste tilldela detektorerna **”Zones”** (sektioner) och **”Area”** (område) i centralapparaten (fönstret **”Zones”**).

<img alt="TrikdisConfig, fönstret Zones, tabellen Zones settings: den markerade raden Zone 10 visar Input som börjar med Wireless Magne, Area 1, Definition Interior och Type NO." src="./image16.png" style="width:7.086614173228346in;height:2.6692913385826773in" />

18. Klicka på **Write [F5]** när du har gjort ändringarna.

19. Den trådlösa detektorn är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort trådlösa detektorer ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för **”Wireless
        sensor”** på den detektor du vill ta bort, och klickar på **Write [F5]**. Den
        trådlösa detektorn är nu borttagen ur minnet i ”FLEXi” SP3.
## Lära in en trådlös fjärrkontroll

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.
5.  Välj enhetstyp: **”Pendants”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, fönstret Learning mode: enhetstypen är Pendants och knappen Start är markerad." src="./image17.png" style="width:3.106299212598425in;height:1.8976377952755905in" />

7.  Håll valfri knapp på fjärrkontrollen nedtryckt tills lysdioden på fjärrkontrollen tänds. Släpp knappen.

8.  Vänta några sekunder. Centralapparaten hittar fjärrkontrollen.

9.  Numret **”UID”** måste stämma överens med fjärrkontrollens serienummer, som finns på etiketten på fjärrkontrollens baksida.

10. Ange i fältet **”Partition”** vilket område i säkerhetssystemet som fjärrkontrollen ska styra (tillkoppla/frånkoppla).

11. Ange i fältet **”User”** numret på den användare som fjärrkontrollen ska tilldelas.

12. Klicka på **”Save”**.

<img alt="TrikdisConfig, dialogrutan New device was found: en fjärrkontroll (keyfob) och dess UID visas. Area är 1, User är 1 och Save är markerad." src="./image18.png" style="width:3.0984251968503935in;height:2.5236220472440944in" />

13. Den trådlösa fjärrkontrollen läggs till i listan över enheter.

14. Numret **”UID”** måste stämma överens med fjärrkontrollens serienummer, som finns på fjärrkontrollens baksida.

15. Klicka på **”Stop learning”** för att slutföra registreringen av den trådlösa fjärrkontrollen.

<img alt="TrikdisConfig, fönstret Learning mode: en fjärrkontroll (keyfob) har hittats med ID 1 och ett UID. Knappen Stop learning är markerad." src="./image19.png" style="width:3.720472440944882in;height:2.661417322834646in" />

16. Klicka på **”Yes”** så att fjärrkontrollen skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Yes är markerad." src="./image20.png" style="width:3.0039370078740157in;height:1.2440944881889764in" />

17. Den trådlösa fjärrkontrollen har lagts till i listan över enheter i fönstret **”Wireless”**.
18. Du kan tilldela fjärrkontrollens knappar 3 och 4 ytterligare funktioner (tillkoppla/frånkoppla, tyst larm, överfallslarm, PGM-styrning).

<img alt="Teckning av en fjärrkontroll med fyra numrerade knappar: 1 är det övre slutna hänglåset, 2 det nedre öppna hänglåset, 3 strömsymbolen till vänster och 4 pilen till höger." src="./image21.png" style="width:1.6933366141732284in;height:2.06667104111986in" />

<img alt="TrikdisConfig, fönstret Wireless: den markerade raden för fjärrkontrollen visar ID 1, Area 1, User 1, Key 3 inställd på Panic och Key 4 inställd på Silent panic." src="./image22.png" style="width:7.082677165354331in;height:1.562992125984252in" />

19. Klicka på **Write [F5]** när du har gjort ändringarna.

20. Den trådlösa fjärrkontrollen är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort en trådlös fjärrkontroll ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för **”Keyfob”**
        på den fjärrkontroll du vill ta bort, och klickar på **Write [F5]**. Fjärrkontrollen
        är nu borttagen ur minnet i ”FLEXi” SP3.
## Lära in en trådlös siren

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten. Sätt i batterierna i den trådlösa sirenen.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.
5.  Välj enhetstyp: **”Sirens”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, fönstret Learning mode: enhetstypen är Sirens och knappen Start är markerad." src="./image23.png" style="width:3.0826771653543306in;height:1.921259842519685in" />

7.  Håll knappen **”LEARN”** på sirenens kretskort nedtryckt i 3 sekunder. Lysdioden på sirenen börjar blinka. Släpp knappen.

8.  Vänta några sekunder. Centralapparaten hittar sirenen.

9.  Numret **”UID”** måste stämma överens med sirenens serienummer, som finns på etiketten på sirenens kretskort.

10. Ange i fältet **”Area”** den sektion i säkerhetssystemet vars påverkan ska få sirenen att larma.

11. Klicka på **”Save”**.

<img alt="TrikdisConfig, dialogrutan New device was found: en siren och dess UID visas. Area är 1 och Save är markerad." src="./image24.png" style="width:3.0826771653543306in;height:2.177165354330709in" />

12. Den trådlösa sirenen läggs till i listan över trådlösa enheter.

13. Numret **”UID”** måste stämma överens med sirenens serienummer, som finns på etiketten på sirenens kretskort.

14. Klicka på **”Stop learning”** för att slutföra registreringen av den trådlösa sirenen.

<img alt="TrikdisConfig, fönstret Learning mode ber användaren trycka kort på enhetens sabotagekontakt. Det rapporterar en ny enhet: ID 1, Siren. Stop learning är markerad." src="./image25.png" style="width:3.7283464566929134in;height:2.673228346456693in" />

15. Klicka på **Yes** så att sirenen skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Yes är markerad." src="./image26.png" style="width:3.0118110236220472in;height:1.2401574803149606in" />

16. Den trådlösa sirenen har lagts till i listan över enheter i fönstret **”Wireless”**.

<img alt="TrikdisConfig, fönstret Wireless: den markerade raden för sirenen visar ID 1 och Area 1. User, Key 3 och Key 4 visar N/A." src="./image27.png" style="width:7.078740157480315in;height:1.5551181102362204in" />

17. Klicka på **Write [F5]** när du har gjort ändringarna.

18. Den trådlösa sirenen är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort en trådlös siren ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för **”Siren”**
        på den siren du vill ta bort, och klickar på **Write [F5]**. Den trådlösa
        sirenen är nu borttagen ur minnet i ”FLEXi” SP3.
## Lära in en trådlös knappsats

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten. Sätt i batterierna i den trådlösa knappsatsen.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.
5.  Välj enhetstyp: **”Keypads”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, fönstret Learning mode: enhetstypen är Keypads och knappen Start är markerad." src="./image28.png" style="width:3.074803149606299in;height:1.8976377952755905in" />

7.  Håll knapparna **[** <img alt="Knapp med strömsymbol." src="./image29.png" style="width:0.12992125984251968in;height:0.14173228346456693in" /> **]** och **[BYP]** på knappsatsen nedtryckta samtidigt i 3 sekunder. Knappsatsen piper flera gånger. Släpp knapparna.

8.  Vänta några sekunder. Centralapparaten hittar knappsatsen.

9.  UID-numret måste stämma överens med knappsatsens serienummer, som finns på etiketten på baksidan av knappsatsens kapsling.

10. Ange i fältet **Area** vilket område i säkerhetssystemet som knappsatsen ska styra.

11. Klicka på **Save**.

<img alt="TrikdisConfig, dialogrutan New device was found: en knappsats och dess UID visas. Area är 1 och Save är markerad." src="./image30.png" style="width:3.106299212598425in;height:2.1850393700787403in" />

12. Den trådlösa knappsatsen läggs till i listan över trådlösa enheter.

13. Numret **”UID”** måste stämma överens med knappsatsens serienummer, som finns på baksidan av knappsatsens kapsling.

14. Klicka på **”Stop learning”** för att slutföra registreringen av den trådlösa knappsatsen.

<img alt="TrikdisConfig, fönstret Learning mode ber användaren trycka kort på enhetens sabotagekontakt. Det rapporterar en ny enhet: ID 1, Keypad. Stop learning är markerad." src="./image31.png" style="width:3.7283464566929134in;height:2.6692913385826773in" />

15. Klicka på **”Yes”** så att knappsatsen skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Yes är markerad." src="./image32.png" style="width:2.9921259842519685in;height:1.220472440944882in" />

16. Den trådlösa knappsatsen har lagts till i listan över enheter i fönstret **”Wireless”**.

<img alt="TrikdisConfig SP3, fönstret Wireless: rad 1 visar Device type Keypad och Area 1. Fältet Serial No. är ifyllt och Write (F5) är tillgänglig." src="./image33.png" style="width:7.078740157480315in;height:1.5748031496062993in" />

17. Klicka på **Write [F5]** när du har gjort ändringarna.

18. Den trådlösa knappsatsen är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort en trådlös knappsats ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för **”Keypad”**
        på den knappsats du vill ta bort, och klickar på **Write [F5]**. Knappsatsen
        är nu borttagen ur minnet i ”FLEXi” SP3.
## Lära in en trådlös tvåvägs-PGM 2WPGM

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten. Slå på matningen till modulen 2WPGM.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.
5.  Välj enhetstyp: **”PGM device”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, fönstret Learning mode: enhetstypen är PGM devices och Start är markerad." src="./image34.png" style="width:3.078740157480315in;height:1.9094488188976377in" />

7.  Ta bort bygeln JP2 på modulen 2WPGM och sätt tillbaka den efter några sekunder.

8.  Vänta några sekunder. Centralapparaten hittar modulen.

9.  Numret **”UID”** måste stämma överens med modulens serienummer, som finns på etiketten på modulens kretskort.

10. Ange i fältet **”Select output”** numret på den PGM-utgång som du vill tilldela modulen.

11. Klicka på **”Save”**.

<img alt="TrikdisConfig, fönstret New device was found: en PGM-enhet av typen 2WPGM har hittats. Select output är 4 och Save är markerad." src="./image35.png" style="width:3.0826771653543306in;height:2.177165354330709in" />

12. Den trådlösa modulen 2WPGM läggs till i listan över trådlösa enheter.

13. Numret **”UID”** måste stämma överens med 2WPGM:s serienummer, som finns på etiketten på modulens kretskort.

14. Klicka på **”Stop learning”** för att slutföra registreringen av den trådlösa modulen 2WPGM.

<img alt="TrikdisConfig, fönstret Learning mode rapporterar en nyfunnen PGM-enhet 2WPGM och ber användaren trycka kort på enhetens sabotagekontakt. Stop learning är markerad." src="./image36.png" style="width:3.720472440944882in;height:2.6692913385826773in" />

15. Klicka på **”Yes”** så att den trådlösa modulen 2WPGM skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Yes är markerad." src="./image37.png" style="width:3.0in;height:1.220472440944882in" />

16. Den trådlösa modulen 2WPGM har lagts till i listan över enheter i fönstret **”Wireless”**.

<img alt="TrikdisConfig SP3, fönstret Wireless: rad 1 visar Device type 2WPGM PGM. Fältet Serial No. är ifyllt och Write (F5) är tillgänglig." src="./image38.png" style="width:7.0875in;height:1.561887576552931in" />

17. PGM-utgången kan döpas om.

<img alt="TrikdisConfig SP3, fliken PGM Outputs: rad 4 visar Name Gate, PGM output 2WPGM ID1, Output definition Remote Control och Pulse Time 20 s." src="./image39.png" style="width:7.086614173228346in;height:1.921259842519685in" />

18. Klicka på **Write [F5]** när du har gjort ändringarna.

19. Den trådlösa modulen 2WPGM är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort den trådlösa modulen 2WPGM ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för 2WPGM
        på den modul du vill ta bort, och klickar på **Write [F5]**. 2WPGM
        är nu borttagen ur minnet i ”FLEXi” SP3.
## Lära in en trådlös repeater RPT1

1.  Kontrollera att radiomottagaren **RTX3** för trådlösa detektorer har lärts in i ”FLEXi” SP3.

2.  Slå på matningen till centralapparaten. Slå på matningen till modulen RPT1.

3.  Anslut till centralapparaten ”FLEXi” SP3 på distans med TrikdisConfig.

4.  Klicka på knappen **”Learn sensors”** i fönstret **”Wireless”** i TrikdisConfig.
5.  Välj enhetstyp: **”Repeater”**.

6.  Tryck på knappen **”Start”**.

<img alt="TrikdisConfig, fönstret Learning mode: enhetstypen är Repeaters och Start är markerad." src="./image40.png" style="width:3.074803149606299in;height:1.8976377952755905in" />

7.  Tryck på knappen **”LEARN”** på repeatern RPT1.

8.  Vänta några sekunder. Centralapparaten hittar repeatern RPT1.

9.  Numret **”UID”** måste stämma överens med repeaterns serienummer, som finns på etiketten på repeaterns kretskort.

10. Klicka på **”Stop learning”** för att slutföra registreringen av trådlösa repeatrar.

<img alt="TrikdisConfig, fönstret Learning mode rapporterar en nyfunnen repeater (Repeater) och ber användaren trycka kort på enhetens sabotagekontakt. Stop learning är markerad." src="./image41.png" style="width:3.720472440944882in;height:2.7007874015748032in" />

11. Klicka på **”Yes”** så att den trådlösa repeatern RPT1 skrivs till centralapparaten ”FLEXi” SP3.

<img alt="TrikdisConfig, dialogrutan Save configuration frågar om de nya parametrarna ska sparas i modulen. Yes är markerad." src="./image42.png" style="width:2.984251968503937in;height:1.220472440944882in" />

12. Den trådlösa repeatern RPT1 har lagts till i listan över enheter i fönstret **”Wireless”**.

<img alt="TrikdisConfig SP3, fönstret Wireless: rad 1 visar Device type Repeater. Fältet Serial No. är ifyllt och Write (F5) är tillgänglig." src="./image43.png" style="width:7.078740157480315in;height:1.5590551181102361in" />

13. Klicka på **Write [F5]** när du har gjort ändringarna.

14. Den trådlösa repeatern RPT1 är nu inlärd i systemet.

!!! note "Obs!"
    Så här tar du bort den trådlösa repeatern RPT1 ur minnet i ”FLEXi” SP3:

    1.  Anslut en USB-kabel (Mini-B) till ”FLEXi” SP3.

    2.  Starta TrikdisConfig och klicka på knappen **Read [F4]**.

    3.  I fönstret **”Wireless”** i TrikdisConfig väljer du **”Disabled”** i kolumnen
        **”Device type”** i stället för
        **”Repeater”** på den repeater du vill ta bort, och klickar på **Write [F5]**.
        Repeatern RPT1 är nu borttagen ur minnet i ”FLEXi” SP3.
