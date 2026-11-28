# Snabbinstallation av Honeywell Vista med GT/GT+/GET

Korta anvisningar för inkoppling och programmering när larmsändaren GT/GT+/GET ansluts till centralapparater i Honeywell Vista (Ademco Vista-48, Vista-20, Vista-15) via KeyBus, följt av registrering av systemet i Protegus2. Använd anvisningen tillsammans med de fullständiga manualerna för alla övriga inställningar. (Plintarnas beteckningar skiljer sig något mellan GT, GT+ och GET, men anslutningarna är desamma.) 

!!! caution "Försiktighet"
    Installation och service får endast utföras av behörig personal. Koppla bort matningen innan du drar ledningarna. Obehöriga ändringar upphäver garantin.

## Förutsättningar

1. GT/GT+/GET med firmware 1.21, SIM-kort isatt, PIN-kodsbegäran avstängd och aktivt dataabonnemang.
1. Centralapparat Honeywell Vista (Ademco Vista-48, Vista-20, Vista-15) med tillgång till knappsatsen (installatörskoden finns tillgänglig).
1. Abonnentkod hos larmcentralen, om rapportering sker till larmcentral.
1. Protegus2-konto för larmbolag/installatör och larmsändarens IMEI.

## Inkoppling

Anslut larmsändaren till centralapparaten enligt kopplingsschemat nedan: 

| **Plint på GT/GT+/GET** | **Honeywell-centralapparat** | **Anmärkning**         |
| ----------------------- | ------------------- | ---------------------- |
| +12V DC/-12V DC         | 5/4                 | Matar larmsändaren     |
| CLK/DATA                | 7/8                 | KeyBus                 |


<img src="../GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.webp" alt="Kopplingsschema: larmsändarens plintar +12/24 VDC, –12/24 VDC, CLK och DATA kopplade till plintarna 5, 4, 7 och 6 på Honeywell Ademco Vista-48" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## Programmera centralapparaten Honeywell Ademco Vista-48 (Vista-20, Vista-15) från knappsatsen

Ange följande sekvenser på centralapparatens knappsats och ställ in dem enligt beskrivningen:

**Aktivera rapportering med Contact ID**

| **Knappsatsinmatning** | **Beskrivning** |
| ---------------- | ----------------------------------------- |
| *4112800 * | Gå in i programmeringsläget |
| *591 * | Aktivera ”Exit Error Report Code”. |
| *601 * | Aktivera ”Trouble Report Code”. |
| *611 * | Aktivera ”Bypass reporting Code”. |
| *621 * | Aktivera ”AC Mains Loss Report Code”. |
| *631 * | Aktivera ”Low Battery Report Code”. |
| *641 * | Aktivera ”Test Report Code”. |
| *651 * | Aktivera ”Open Report Code”. |
| *661 * | Aktivera ”Arm Away/Stay Report Code”. |
| *671 * | Aktivera ”RF Low Battery Report Code”. |
| *681 * | Aktivera ”Cancel Report Code”. |
| *691 * | Aktivera ”Alarm Restores”. |
| *701 * | Aktivera ”Alarm Restore Report Code”. |
| *711 * | Aktivera ”Trouble Restore Report Code”. |
| *721 * | Aktivera ”Bypass Restore Report Code”. |
| *731 * | Aktivera ”AC Mains Restore Report Code”. |
| *741 * | Aktivera ”Low Battery Restore Report Code”. |
| *751 * | Aktivera ”RF Low Restore Code”. |
| *761 * | Aktivera ”Test Restore Report Code”. |
| *291 * | Aktivera ”ECP Contact ID Output for ACM”. |
| *1891 * | Aktivera ”AUI Device 1 and 2 Enable”. |
| *99 | Lämna programmeringsläget. |

## Lägg till systemet i Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Steg 1.</strong> Tryck på <strong>Add new system</strong>.
        <img src="../GT+ honeywell vista 48 1 ENG 2026 01 05.webp" alt="Protegus2-appen, systemlistan är tom; plusknappen nere till höger är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 2.</strong> Ange larmsändarens <strong>IMEI</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 2 ENG 2026 01 05.webp" alt="Fältet för unikt ID/IMEI och knappen Next är markerade">
  </div>

  <div class="step-card">
        <strong>Steg 3.</strong> Välj larmcentral.
        <img src="../GT+ honeywell vista 48 3 ENG 2026 01 05.webp" alt="Lista med två stationer; Station 1 är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 4.</strong> Välj <strong>Honeywell</strong>.
        <img src="../GT+ honeywell vista 48 4 ENG 2026 01 05.webp" alt="Val av centralapparat; alternativet Honeywell är markerat">
  </div>

  <div class="step-card">
        <strong>Steg 5.</strong> Välj <strong>Vista 48 (Vista 20, Vista 15)</strong>.
        <img src="../GT+ honeywell vista 48 5 ENG 2026 01 05.webp" alt="Lista över Honeywell-modeller; VISTA 48 är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 6.</strong> Ange <strong>Object ID</strong> och <strong>Module ID</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 6 ENG 2026 01 05.webp" alt="Enhetsinställningar med de markerade fälten Object ID och Module ID samt knappen Next">
  </div>

  <div class="step-card">
        <strong>Steg 7.</strong> Vänta medan data skrivs.
        <img src="../GT+ honeywell vista 48 7 ENG 2026 01 05.webp" alt="Skärmen Writing configuration medan konfigurationen skrivs till enheten">
  </div>

  <div class="step-card">
        <strong>Steg 8.</strong> Tryck på <strong>Add to Protegus2</strong>.
        <img src="../GT+ honeywell vista 48 8 ENG 2026 01 05.webp" alt="Enhetens avancerade inställningar; knappen Add to Protegus2 nere till vänster är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 9.</strong> Ange systemets <strong>Name</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 9 ENG 2026 01 05.webp" alt="Formuläret för nytt system med det markerade namnfältet och knappen Next">
  </div>

  <div class="step-card">
        <strong>Steg 10.</strong> Tryck på <strong>Skip</strong>.
        <img src="../GT+ honeywell vista 48 10 ENG 2026 01 05.webp" alt="Bekräftelsen System added successfully; knappen Skip är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 11.</strong> Tryck på systemet.
        <img src="../GT+ honeywell vista 48 11 ENG 2026 01 05.webp" alt="Systemlistan med det nya systemet GT+ Honeywell markerat och online">
  </div>

  <div class="step-card">
        <strong>Steg 12.</strong> Vänta 1 minut tills det är klart och tryck på <strong>Transfer</strong>.
        <img src="../GT+ honeywell vista 48 12 ENG 2026 01 05.webp" alt="Systemvyn med meddelandet att det kan ta upp till 1 minut; knappen Transfer är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 13.</strong> Ange e-postadressen till den användare som installatören ska överföra systemet till. Tryck på <strong>Transfer</strong>.
        <img src="../GT+ honeywell vista 48 13 ENG 2026 01 05.webp" alt="Skärmen Transfer system med det markerade e-postfältet och knappen Transfer">
  </div>

  <div class="step-card">
        <strong>Steg 14.</strong> Systemet visas i Protegus på användarens telefon.
        <img src="../GT+ honeywell vista 48 14 ENG 2026 01 05.webp" alt="Systemvyn på användarens telefon med området frånkopplat (Disarmed)">
  </div>

</div>

!!! tip "Tips"
    Utför en systemkontroll när inställningarna och installationen är klara:

    1. Skapa en händelse:

       - genom att tillkoppla/frånkoppla systemet med centralapparatens knappsats.
       - genom att utlösa ett sektionslarm medan systemet är tillkopplat.

    2. Kontrollera att händelsen når larmcentralen (CMS) och Protegus2-appen.
