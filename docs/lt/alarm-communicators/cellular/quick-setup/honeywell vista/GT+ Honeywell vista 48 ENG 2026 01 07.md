# Honeywell Vista-48 su GT/GT+/GET greitas paruošimas

Trumpi pajungimo ir programavimo žingsniai, skirti prijungti GT/GT+/GET komunikatorių prie Honeywell Ademco Vista-48 (Vista-20, Vista-15) centralės naudojant KeyBus, tada pridėti sistemą į Protegus2. Naudokite kartu su pilnais vadovais kitiems nustatymams. (Gnybtų pavadinimai GT/GT+/GET gali nežymiai skirtis, tačiau jungtys yra tokios pačios.)

!!! caution "Atsargiai"
    Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.

## Reikalavimai

1. GT/GT+/GET programinės įrangos versija 1.21, įdėta SIM kortelė, PIN išjungtas, aktyvus duomenų planas.
1. Honeywell Ademco Vista-48 (Vista-20, Vista-15) centralė su klaviatūros prieiga (yra montuotojo kodas).
1. CMS paskyros numeris, jei pranešimai siunčiami į CMS.
1. Protegus2 įmonės/montuotojo paskyra ir komunikatoriaus IMEI.

## Pajungimas

Vadovaukitės schema žemiau ir prijunkite komunikatorių prie centralės:

| **GT/GT+/GET gnybtas** | **Honeywell centralė** | **Pastabos**           |
| ---------------------- | ---------------------- | ---------------------- |
| +12V DC/-12V DC        | 5/4                    | Maitinimas komunikatoriui |
| CLK/DATA               | 7/8                    | KeyBus                 |


<img src="../GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.png" alt="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## Honeywell Ademco Vista-48 (Vista-20, Vista-15) signalizacijos centralės programavimas klaviatūra

Naudodami centralės klaviatūrą įveskite šias sekcijas ir nustatykite kaip nurodyta:

**Contact ID pranešimų įjungimas**

| **Klaviatūros įvedimas** | **Veiksmo aprašymas**                     |
| ------------------------ | ---------------------------------------- |
| *4112800 *               | Įeiti į programavimo režimą              |
| *591 *                   | Įjungti „Exit Error Report Code“.        |
| *601 *                   | Įjungti „Trouble Report Code“.           |
| *611 *                   | Įjungti „Bypass reporting Code“.         |
| *621 *                   | Įjungti „AC Mains Loss Report Code“.     |
| *631 *                   | Įjungti „Low Battery Report Code“.       |
| *641 *                   | Įjungti „Test Report Code“.              |
| *651 *                   | Įjungti „Open Report Code“.              |
| *661 *                   | Įjungti „Arm Away/Stay Report Code“.     |
| *671 *                   | Įjungti „RF Low Battery Report Code“.    |
| *681 *                   | Įjungti „Cancel Report Code“.            |
| *691 *                   | Įjungti „Alarm Restores“.                |
| *701 *                   | Įjungti „Alarm Restore Report Code“.     |
| *711 *                   | Įjungti „Trouble Restore Report Code“.   |
| *721 *                   | Įjungti „Bypass Restore Report Code“.    |
| *731 *                   | Įjungti „AC Mains Restore Report Code“.  |
| *741 *                   | Įjungti „Low Battery Restore Report Code“. |
| *751 *                   | Įjungti „RF Low Restore Code“.           |
| *761 *                   | Įjungti „Test Restore Report Code“.      |
| *291 *                   | Įjungti „ECP Contact ID Output for ACM“. |
| *1891 *                  | Įjungti „AUI Device 1 and 2 Enable“.     |
| *99                      | Išeiti iš programavimo režimo.           |

## Sistemos pridėjimas į Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Žingsnis 1.</strong> Paspauskite <strong>Pridėti naują sistemą</strong>.
        <img src="../GT+ honeywell vista 48 1 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>
  
 
  <div class="step-card">
        <strong>Žingsnis 2.</strong> Įveskite komunikatoriaus <strong>IMEI</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ honeywell vista 48 2 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 3.</strong> Pasirinkite apsaugos įmonę.
        <img src="../GT+ honeywell vista 48 3 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 4.</strong> Pasirinkite <strong>Honeywell</strong>.
        <img src="../GT+ honeywell vista 48 4 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>
  

  <div class="step-card">
        <strong>Žingsnis 5.</strong> Pasirinkite <strong>Vista 48 (Vista 20, Vista 15)</strong>.
        <img src="../GT+ honeywell vista 48 5 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 6.</strong> Įveskite <strong>Object ID</strong> ir <strong>Module ID</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ honeywell vista 48 6 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 7.</strong> Palaukite, kol įrašomi duomenys.
        <img src="../GT+ honeywell vista 48 7 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 8.</strong> Paspauskite <strong>Pridėti į Protegus2</strong>.
        <img src="../GT+ honeywell vista 48 8 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 9.</strong> Įveskite sistemos <strong>Pavadinimą</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ honeywell vista 48 9 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 10.</strong> Paspauskite <strong>Praleisti</strong>.
        <img src="../GT+ honeywell vista 48 10 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 11.</strong> Paspauskite ant sistemos.
        <img src="../GT+ honeywell vista 48 11 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 12.</strong> Palaukite 1 minutę, kol užbaigiama, ir paspauskite <strong>Perduoti</strong>.
        <img src="../GT+ honeywell vista 48 12 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 13.</strong> Įveskite naudotojo el. paštą, kuriam montuotojas perduos sistemą. Paspauskite <strong>Perduoti</strong>.
        <img src="../GT+ honeywell vista 48 13 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 14.</strong> Sistema atsiras Protegus naudotojo telefone.
        <img src="../GT+ honeywell vista 48 14 ENG 2026 01 05.png" alt="Pridėti naują sistemą">
  </div>




</div>

!!! tip "Patarimas"
    Baigę įrengimą ir nustatymus atlikite sistemos patikrą:

    1. Sukurkite įvykį:

       - įjunkite/išjunkite sistemą centralės klaviatūra.
       - sukelkite zonos aliarmą, kai apsaugos sistema įjungta.

    2. Įsitikinkite, kad įvykis pasiekia CMS (Central Monitoring Station) ir Protegus2 programėlę.
