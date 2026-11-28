# Snabbinstallation av Interlogix NX-8v2 med GT/GT+/GET

Korta anvisningar för inkoppling och programmering när larmsändaren GT/GT+/GET ansluts till centralapparaten Interlogix NX-8v2 via KeyBus, följt av registrering av systemet i Protegus2. Använd anvisningen tillsammans med de fullständiga manualerna för alla övriga inställningar. (Plintarnas beteckningar skiljer sig något mellan GT, GT+ och GET, men anslutningarna är desamma.) 

!!! caution "Försiktighet"
    Installation och service får endast utföras av behörig personal. Koppla bort matningen innan du drar ledningarna. Obehöriga ändringar upphäver garantin.

## Förutsättningar

1. GT/GT+/GET med firmware 1.21, SIM-kort isatt, PIN-kodsbegäran avstängd och aktivt dataabonnemang.
1. Centralapparat Interlogix NX-8v2 med tillgång till knappsatsen (installatörskoden finns tillgänglig).
1. Abonnentkod hos larmcentralen, om rapportering sker till larmcentral.
1. Protegus2-konto för larmbolag/installatör och larmsändarens IMEI.

## Inkoppling

Anslut larmsändaren till centralapparaten enligt kopplingsschemat nedan: 

| **Plint på GT/GT+/GET** | **Interlogix-centralapparat** | **Anmärkning**         |
| ----------------------- | -------------------- | ---------------------- |
| +12V DC/-12V DC         | POS/COM              | Matar larmsändaren     |
| DATA                    | DATA                 | KeyBus                 |


<img src="../GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30.webp" alt="Kopplingsschema: larmsändarens plintar +12/24 VDC, –12/24 VDC och DATA kopplade till plintarna POS, COM och DATA på Interlogix NX-8V2" class="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30">


## Programmera centralapparaten Interlogix NX-8v2 via LCD-knappsatsen

Ange följande sekvenser på centralapparatens knappsats och ställ in dem enligt beskrivningen:

**Aktivera rapportering med Contact ID**

| **LCD-knappsats**    | **Knappsatsinmatning** | **Beskrivning** |
| -------------------- | ---------------- | ------------------------------------------------------------ |
| System ready | *89713 | Gå in i programmeringsläget |
| Enter device address | 0# | Gå till centralapparatens programmeringsmeny |
| Enter location | 4# | Gå till menyn med av/på-alternativ ”Phone1 events reported” |
| Loc#4 Seg#1 | 12345678* | Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara och gå till nästa meny. |
| Loc#4 Seg#2 | 12345678* | Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara och gå tillbaka. |
| Enter location | 23# | Gå till menyn ”Partition features”. |
| Loc#23 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#23 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 37# | Gå till menyn ”Siren and system supervision”. |
| Loc#37 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#37 Seg#3 | 12345678* | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara. |
| Loc#37 Seg#4 | 12345678*# | Segment 4. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 90# | Gå till menyn ”Partition 2 features”. |
| Loc#90 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#90 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 93# | Gå till menyn ”Partition 3 features”. |
| Loc#93 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#93 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 96# | Gå till menyn ”Partition 4 features”. |
| Loc#96 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#96 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 99# | Gå till menyn ”Partition 5 features”. |
| Loc#99 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#99 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 102# | Gå till menyn ”Partition 6 features”. |
| Loc#102 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#102 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 105# | Gå till menyn ”Partition 7 features”. |
| Loc#105 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#105 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | 108# | Gå till menyn ”Partition 8 features”. |
| Loc#108 Seg#1 | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Loc#108 Seg#3 | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Enter location | EXIT EXIT | Tryck på ”EXIT” två gånger för att lämna programmeringsläget. |

## Programmera centralapparaten Interlogix NX-8v2 via LED-knappsatsen

Ange följande sekvenser på centralapparatens knappsats och ställ in dem enligt beskrivningen: 

**Aktivera rapportering med Contact ID** 

| **LCD-knappsats**                       | **Knappsatsinmatning** | **Beskrivning** |
| --------------------------------------- | ---------------- | ------------------------------------------------------------ |
| Lysdioderna Ready och Power lyser med fast sken | *89713 | Gå in i programmeringsläget |
| Lysdioden Service blinkar | 0# | Gå till centralapparatens programmeringsmeny |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 4# | Gå till menyn med av/på-alternativ ”Phone1 events reported” |
| Alla sektionslysdioder lyser | 12345678* | Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara och gå till nästa meny. |
| Alla sektionslysdioder lyser | 12345678* | Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara och gå tillbaka. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 23# | Gå till menyn ”Partition features and reporting selection”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 37# | Gå till menyn ”Siren and system supervision”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678* | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 4. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 90# | Gå till menyn ”Partition 2 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 93# | Gå till menyn ”Partition 3 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 96# | Gå till menyn ”Partition 4 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 99# | Gå till menyn ”Partition 5 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 102# | Gå till menyn ”Partition 6 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 105# | Gå till menyn ”Partition 7 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | 108# | Gå till menyn ”Partition 8 features”. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | ** | Tryck på * två gånger för att gå till menyn med av/på-alternativ i segment 3. |
| Lysdioden Service blinkar, lysdioden Ready lyser med fast sken | 12345678*# | Segment 3. Alla av/på-alternativ ska vara aktiverade. Tryck på * för att spara, sedan på # för att spara och på # för att gå tillbaka till huvudmenyn. |
| Lysdioden Service blinkar, lysdioden Armed lyser med fast sken | EXIT EXIT | Tryck på ”EXIT” två gånger för att lämna programmeringsläget. |

## Lägg till systemet i Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Steg 1.</strong> Tryck på <strong>Add new system</strong>.
        <img src="../GT+ interlogix nx 8v2 1 ENG 2025 12 29.webp" alt="Protegus2-appen, systemlistan är tom; plusknappen nere till höger är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 2.</strong> Ange larmsändarens <strong>IMEI</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ interlogix nx 8v2 2 ENG 2025 12 29.webp" alt="Fältet för unikt ID/IMEI och knappen Next är markerade">
  </div>

  <div class="step-card">
        <strong>Steg 3.</strong> Välj larmcentral.
        <img src="../GT+ interlogix nx 8v2 3 ENG 2025 12 29.webp" alt="Lista med två stationer; Station 1 är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 4.</strong> Välj <strong>Interlogix</strong>.
        <img src="../GT+ interlogix nx 8v2 4 ENG 2025 12 29.webp" alt="Val av centralapparat; alternativet Interlogix är markerat">
  </div>

  <div class="step-card">
        <strong>Steg 5.</strong> Välj <strong>NX-8</strong>.
        <img src="../GT+ interlogix nx 8v2 5 ENG 2025 12 29.webp" alt="Lista över Interlogix-modeller; NX-8 är markerat">
  </div>

  <div class="step-card">
        <strong>Steg 6.</strong> Ange <strong>Object ID</strong> och <strong>Module ID</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ interlogix nx 8v2 6 ENG 2025 12 29.webp" alt="Enhetsinställningar med de markerade fälten Object ID och Module ID samt knappen Next">
  </div>

  <div class="step-card">
        <strong>Steg 7.</strong> Vänta medan data skrivs.
        <img src="../GT+ interlogix nx 8v2 7 ENG 2025 12 29.webp" alt="Skärmen Writing configuration medan konfigurationen skrivs till enheten">
  </div>

  <div class="step-card">
        <strong>Steg 8.</strong> Tryck på <strong>Add to Protegus2</strong>.
        <img src="../GT+ interlogix nx 8v2 8 ENG 2025 12 29.webp" alt="Enhetens avancerade inställningar; knappen Add to Protegus2 nere till vänster är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 9.</strong> Ange systemets <strong>Name</strong> och tryck på <strong>Next</strong>.
        <img src="../GT+ interlogix nx 8v2 9 ENG 2025 12 29.webp" alt="Formuläret för nytt system med det markerade namnfältet och knappen Next">
  </div>

  <div class="step-card">
        <strong>Steg 10.</strong> Tryck på <strong>Skip</strong>.
        <img src="../GT+ interlogix nx 8v2 10 ENG 2025 12 29.webp" alt="Bekräftelsen System added successfully; knappen Skip är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 11.</strong> Tryck på systemet.
        <img src="../GT+ interlogix nx 8v2 11 ENG 2025 12 29.webp" alt="Systemlistan med det nya systemet GT+ interlogix markerat och online">
  </div>

  <div class="step-card">
        <strong>Steg 12.</strong> Vänta 1 minut tills det är klart och tryck på <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 8v2 12 ENG 2025 12 29.webp" alt="Systemvyn med meddelandet att det kan ta upp till 1 minut; knappen Transfer är markerad">
  </div>

  <div class="step-card">
        <strong>Steg 13.</strong> Ange e-postadressen till den användare som installatören ska överföra systemet till. Tryck på <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 8v2 13 ENG 2025 12 29.webp" alt="Skärmen Transfer system med det markerade e-postfältet och knappen Transfer">
  </div>

  <div class="step-card">
        <strong>Steg 14.</strong> Systemet visas i Protegus på användarens telefon.
        <img src="../GT+ interlogix nx 8v2 14 ENG 2025 12 29.webp" alt="Systemvyn på användarens telefon med området frånkopplat (Disarmed)">
  </div>

</div>

!!! tip "Tips"
    Utför en systemkontroll när inställningarna och installationen är klara:

    1. Skapa en händelse:

       - genom att tillkoppla/frånkoppla systemet med centralapparatens knappsats.
       - genom att utlösa ett sektionslarm medan systemet är tillkopplat.

    2. Kontrollera att händelsen når larmcentralen (CMS) och Protegus2-appen.
