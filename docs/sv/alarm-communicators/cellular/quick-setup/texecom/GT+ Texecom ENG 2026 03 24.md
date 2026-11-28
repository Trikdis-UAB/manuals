# Snabbinstallation av Texecom med GT/GT+/GET

Korta anvisningar för inkoppling och programmering när larmsändaren GT/GT+/GET ansluts till centralapparaterna Texecom Premier och Premier Elite via seriell buss, följt av registrering av systemet i Protegus2. Använd anvisningen tillsammans med de fullständiga manualerna för alla övriga inställningar. (Plintarnas beteckningar skiljer sig något mellan GT, GT+ och GET, men anslutningarna är desamma.)

!!! caution "Försiktighet"
    Installation och service får endast utföras av behörig personal. Koppla bort matningen innan du drar ledningarna. Obehöriga ändringar upphäver garantin.

## Förutsättningar

1. GT/GT+/GET med firmware 1.21, SIM-kort isatt, PIN-kodsbegäran avstängd och aktivt dataabonnemang.
1. Centralapparat Texecom Premier / Premier Elite med installatörsbehörighet.
1. Texecom EX-CRP4-kabel för seriell anslutning.
1. Abonnentkod hos larmcentralen, om rapportering sker till larmcentral.
1. Protegus2-konto för larmbolag/installatör och larmsändarens IMEI.

## Inkoppling

Anslut larmsändaren till centralapparaten enligt kopplingsschemat nedan:

| **Plint på GT/GT+/GET** | **Ledare på Texecom EX-CRP4** | **Anmärkning** |
| ----------------------- | ------------------------ | --------- |
| +12V DC                 | R                        | +12 V-matning |
| -12V DC                 | B                        | Centralapparatens jord |
| CLK                     | BL                       | Seriell buss |
| DATA                    | W                        | Seriell buss |

<img src="../GT+ Texecom prijungimo schema ENG 2026 03 24.webp" alt="Kopplingsschema: larmsändarens plintar +DC, –DC, CLK och DATA kopplade via kabeln EX-CRP4 (R röd, B svart, BL blå, W vit) till den seriella kontakten på Texecom-centralapparaten; +12 V matas från centralapparaten" class="GT+ Texecom prijungimo schema ENG 2026 03 24">

## Programmera centralapparaten Texecom

Texecom-centralapparater måste programmeras både för avläsning av händelser och för fjärrstyrning.

1. Öppna **Communication Options** i **Wintex** och gå till fliken **Options**.
2. Ange den fyrsiffriga **UDL passcode**.
3. Kontrollera att **UDL passcode** är samma som larmsändarens **PC login password**, som används för fjärrstyrning.
4. Vid programmering från en knappsats: ange den fyrsiffriga installatörskoden och tryck på **[Menu]** för att gå in i programmeringsläget.
5. Tryck på **[9]**, därefter **[7][6][2]**, och ange den fyrsiffriga **UDL passcode**.
6. Tryck på **[Yes]** och lämna programmeringsläget genom att trycka på **[Menu]**.

<!-- MISSING-SCREENSHOT: gt-texecom-programming -->

## Lägg till systemet i Protegus2

<div class="steps-grid">
  <div class="step-card">
        <strong>Steg 1.</strong> Tryck på <strong>Add new system</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 1 ENG 2026 01 06.webp" alt="Protegus2-appen, systemlistan är tom; plusknappen nere till höger är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 2.</strong> Ange larmsändarens <strong>IMEI</strong> och tryck på <strong>Next</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 2 ENG 2026 01 06.webp" alt="Fältet för unikt ID/IMEI och knappen Next är markerade">
  </div>

  <div class="step-card">
        <strong>Steg 3.</strong> Välj larmcentral.
        <img src="../../dsc pc/GT+ dsc pc585 3 ENG 2026 01 06.webp" alt="Lista med två stationer; Station 1 är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 4.</strong> Välj <strong>Texecom</strong>.
        <!-- MISSING-SCREENSHOT: gt-texecom-protegus-brand -->
  </div>

  <div class="step-card">
        <strong>Steg 5.</strong> Välj motsvarande modell, <strong>Premier / Premier Elite</strong>.
        <!-- MISSING-SCREENSHOT: gt-texecom-protegus-model -->
  </div>

  <div class="step-card">
        <strong>Steg 6.</strong> Ange <strong>Object ID</strong> och <strong>Module ID</strong> och tryck på <strong>Next</strong>.
        <!-- MISSING-SCREENSHOT: gt-texecom-protegus-object-module -->
  </div>

  <div class="step-card">
        <strong>Steg 7.</strong> Vänta medan data skrivs.
        <img src="../../dsc pc/GT+ dsc pc585 7 ENG 2026 01 06.webp" alt="Skärmen Writing configuration medan konfigurationen skrivs till enheten">
  </div>

  <div class="step-card">
        <strong>Steg 8.</strong> Tryck på <strong>Add to Protegus2</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 8 ENG 2026 01 06.webp" alt="Enhetens avancerade inställningar; knappen Add to Protegus2 nere till vänster är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 9.</strong> Ange systemets <strong>Name</strong> och tryck på <strong>Next</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 9 ENG 2026 01 06.webp" alt="Formuläret för nytt system med det markerade namnfältet och knappen Next">
  </div>

  <div class="step-card">
        <strong>Steg 10.</strong> Tryck på <strong>Skip</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 10 ENG 2026 01 06.webp" alt="Bekräftelsen System added successfully; knappen Skip är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 11.</strong> Tryck på systemet.
        <img src="../../dsc pc/GT+ dsc pc585 11 ENG 2026 01 06.webp" alt="Systemlistan med det nya systemet GT+ DSC markerat och online">
  </div>

  <div class="step-card">
        <strong>Steg 12.</strong> Vänta 1 minut tills det är klart och tryck på <strong>Transfer</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 12 ENG 2026 01 06.webp" alt="Systemvyn med meddelandet att det kan ta upp till 1 minut; knappen Transfer är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 13.</strong> Ange e-postadressen till den användare som installatören ska överföra systemet till. Tryck på <strong>Transfer</strong>.
        <img src="../../dsc pc/GT+ dsc pc585 13 ENG 2026 01 06.webp" alt="Skärmen Transfer system med det markerade e-postfältet och knappen Transfer">
  </div>

  <div class="step-card">
        <strong>Steg 14.</strong> Systemet visas i Protegus på användarens telefon.
        <img src="../../dsc pc/GT+ dsc pc585 14 ENG 2026 01 06.webp" alt="Systemvyn på användarens telefon med området frånkopplat (Disarmed)">
  </div>

</div>

## Systemkontroll

!!! tip "Tips"
    Utför en systemkontroll när inställningarna och installationen är klara:

    1. Skapa en händelse:

       - genom att tillkoppla/frånkoppla systemet med centralapparatens knappsats.
       - genom att utlösa ett sektionslarm medan systemet är tillkopplat.

    2. Kontrollera att händelsen når larmcentralen (CMS) och Protegus2-appen.
