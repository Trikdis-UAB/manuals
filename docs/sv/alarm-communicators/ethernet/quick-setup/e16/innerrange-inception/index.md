# Snabbinstallation av Innerrange Inception med E16

Korta anvisningar för att ansluta larmsändaren E16 till en centralapparat Innerrange Inception, konfigurera E16 för IP-rapportering och lägga till systemet i Protegus2. Använd anvisningen tillsammans med den fullständiga E16-manualen för alla övriga inställningar.

!!! caution "Försiktighet"
    Installation och service får endast utföras av behörig personal. Koppla bort matningen innan du drar ledningarna. Obehöriga ändringar upphäver garantin.

## Förutsättningar

- Larmsändaren E16 med ansluten LAN-kabel och en USB Mini-B-kabel för konfigureringen.
- Centralapparat Innerrange Inception med internetanslutning och firmware version **2.3.0.3507-r0** eller senare.
- USB-kabel från Inner Range, artikelnummer `993030USB`.
- Object ID (abonnentkod) hos larmcentralen, om rapportering sker till larmcentral.
- Protegus2-konto och larmsändarens MAC / Unique ID.

## Snabbkonfiguration med programmet *TrikdisConfig*

1. Ladda ned **TrikdisConfig** från [www.trikdis.com](http://www.trikdis.com) och installera det.
2. Öppna E16:s kapsling med en spårskruvmejsel.

![Två teckningar visar en spårskruvmejsel som sätts in i spåret för att öppna kapslingen på E16 och sedan förs nedåt för att lossa frontlocket. En separat detaljbild anger USB Mini-B-kontakten.](../../../../e16/image6.webp)

3. Anslut E16 till datorn med en USB Mini-B-kabel.
4. Starta **TrikdisConfig**. Programmet identifierar larmsändaren och öppnar konfigurationsfönstret.
5. Klicka på **Read [F4]** för att läsa in de aktuella inställningarna. Om du uppmanas, ange administratörs- eller installatörskoden (6 siffror).

Gå igenom det avsnitt som motsvarar installationen:

- **Appen Protegus2**, om användarna ska styra systemet på distans.
- **Larmcentralen**, om larmsändaren ska rapportera till larmcentralen.
- Gå igenom båda avsnitten om larmsändaren ska fungera både mot larmcentralen och mot Protegus2.

### Inställningar för anslutning till appen Protegus2

**I fönstret ”System settings”:**

![TrikdisConfig, fönstret System settings. Markering 1 anger Security panel model inställd på 4. PARADOX SP4000, S; markering 2 anger kryssrutan Remote Arm/Disarm markerad; markering 3 anger Security panel PC download password inställt på 4477.](../../../../e16/image7.webp)

1. Välj den **Security panel model** som ska anslutas till larmsändaren.
2. Markera **Remote Arm/Disarm** om användarna ska styra centralapparaten i Protegus2 med sin knappsatskod.
3. För direktstyrning av Paradox- och Texecom-centralapparater anger du **Security panel PC download password**. Det måste stämma överens med lösenordet som är angivet i centralapparaten.

!!! note "Obs!"
    För att direktstyrningen ska fungera måste centralapparaten också programmeras enligt avsnittet om programmering av centralapparaten nedan.

**I fönstret ”User reporting”, fliken ”PROTEGUS Cloud”:**

![TrikdisConfig, fönstret User reporting, fliken PROTEGUS Cloud. Markeringarna anger kryssrutan Enable connection markerad och fältet PROTEGUS Cloud access Code, som är maskerat.](../../../../e16/image8.webp)

4. Markera **Enable connection** för anslutning till Protegus Cloud.
5. Ändra **Protegus Cloud access Code** om användarna ska uppmanas att ange den när de lägger till systemet i appen Protegus2.

När konfigureringen är klar klickar du på **Write [F5]** och kopplar bort USB-kabeln.

### Inställningar för anslutning till larmcentralen

**I fönstret ”System settings”:**

![TrikdisConfig, fönstret System settings. Markering 1 anger Object ID inställt på 1122; markering 2 anger Security panel model inställd på 4. PARADOX SP4000, S.](../../../../e16/image9.webp)

1. Ange **Object ID** (abonnentkod) som du har fått från larmcentralen.
2. Välj den **Security panel model** som ska anslutas till larmsändaren.

**I fönstret ”CMS reporting”, inställningar för ”Primary channel”:**

![TrikdisConfig, fönstret CMS reporting. Primary channel: Communication type IP, Protocol TRK, maskerad TRK encryption key, Domain or IP 155.14.178.152, Port 55448, TCP or UDP inställd på TCP. Primary channel Backup: IP, TRK, maskerad nyckel, Domain or IP 160.12.15.180, Port 44558, TCP. Parallel channel: Communication type är Disable.](../../../../e16/image10.webp)

3. Ställ in **Communication type** på **IP**.
4. Välj det protokoll som mottagaren kräver: **TRK**, **DC-09_2007**, **DC-09_2012** eller **TL150**.
5. Ange mottagarens krypteringsnyckel om det valda protokollet kräver det.
6. Ange mottagarens **Domain or IP** och **Port**.
7. Välj **TCP** eller **UDP**.
8. Konfigurera backupkanal och parallellkanal om installationen kräver redundans.

!!! note "Obs!"
    Om du väljer ett **DC-09**-protokoll anger du dessutom objekt-, linje- och mottagarnummer på fliken **Settings** i fönstret **CMS reporting**.

När konfigureringen är klar klickar du på **Write [F5]** och kopplar bort USB-kabeln.

## Inkoppling

Anslut centralapparaten till E16 enligt kopplingsschemat nedan:

| E16-plint | Innerrange Inception-centralapparat / kabel | Anmärkning |
| --- | --- | --- |
| `+DC` | `VOUT +` | Matning från centralapparaten |
| `-DC` | `0V` och svart ledare från kabeln `993030USB` | Centralapparatens jord |
| `CLK` | Grön ledare från kabeln `993030USB` | Seriell anslutning |
| `DATA` | Vit ledare från kabeln `993030USB` | Seriell anslutning |

<img alt="Kopplingsschema: E16:s plintar +DC, –DC, CLK och DATA kopplade till VOUT +, 0V och USB-kabeln 993030USB (svart, grön och vit ledare) på Innerrange Inception; ledarna är märkta på litauiska i bilden; +12 V matas från centralapparaten" src="../images/innerrange-inception.webp" style="width:5.2in;max-width:100%;height:auto;" />

## Programmering av centralapparaten

1. Kontrollera att centralapparaten Innerrange Inception har firmware version **2.3.0.3507-r0** eller senare och är ansluten till internet.
2. Anslut med en webbläsare till `https://skytunnel.com.au/inception/SERIALNUMBER`, där `SERIALNUMBER` är serienumret som står på centralapparatens kapsling.
3. Öppna **Configuration > General > Alarm Reporting**.
4. I gruppen **3rd Party Device Configuration** ställer du in centralapparaten enligt bilden nedan.

![Programmet Innerrange Inception, sidan Alarm Reporting, gruppen 3rd Party Device Configuration: kryssrutan Enable 3rd Party Device Reporting markerad (utmärkt), 3rd Party Device Type inställd på Trikdis (utmärkt), Serial Port inställd på Serial Port 1 (Plugged In, In Use By 3rd Party Device) (utmärkt).](../../../../e16/image21.webp)

5. Markera **Enable 3rd Party Device Reporting**.
6. Ställ in **3rd Party Device Type** på **Trikdis**.
7. Ställ in **Serial port** på **Serial Port 1 (Plugged In, In Use By 3rd Party Device)**.
8. Spara inställningarna och avsluta programmet.

## Lägg till systemet i Protegus2

1. Öppna [Protegus2](https://www.protegus.app) och klicka på **Add new system**.
2. Ange E16:s **MAC / Unique ID**.
3. Ange systemets namn och slutför guiden.
4. Om du använder nyckelbrytarstyrning i stället för direktstyrning ansluter du `I/O 1` till centralapparatens nyckelbrytarsektion och konfigurerar `PGM1` i Protegus2.
5. Vänta tills systemet visas som online.

## Systemkontroll

1. Tillkoppla och frånkoppla systemet från knappsatsen eller användargränssnittet.
2. Utlös ett testlarm.
3. Kontrollera att händelserna når larmcentralen (CMS) och Protegus2.
