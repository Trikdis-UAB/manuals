# Interlogix NX-8V2 su GT/GT+/GET greitas paruošimas

Trumpi pajungimo ir programavimo žingsniai, skirti prijungti GT/GT+/GET komunikatorių prie Interlogix NX-8V2 centralės naudojant KeyBus, tada pridėti sistemą į Protegus2. Naudokite kartu su pilnais vadovais kitiems nustatymams. (Gnybtų pavadinimai GT/GT+/GET gali nežymiai skirtis, tačiau jungtys yra tokios pačios.)

!!! caution "Atsargiai"
    Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.

## Reikalavimai

1. GT/GT+/GET programinės įrangos versija 1.21, įdėta SIM kortelė, PIN išjungtas, aktyvus duomenų planas.
1. Interlogix NX-8V2 centralė su klaviatūros prieiga (yra montuotojo kodas).
1. CMS paskyros numeris, jei pranešimai siunčiami į CMS.
1. Protegus2 įmonės/montuotojo paskyra ir komunikatoriaus IMEI.

## Pajungimas

Vadovaukitės schema žemiau ir prijunkite komunikatorių prie centralės:

| **GT/GT+/GET gnybtas** | **Interlogix centralė** | **Pastabos**           |
| ---------------------- | ----------------------- | ---------------------- |
| +12V DC/-12V DC        | POS/COM                 | Maitinimas komunikatoriui |
| DATA                   | DATA                    | KeyBus                 |


<img src="../GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30.png" alt="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30" class="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30">

## Interlogix NX-8V2 signalizacijos centralės programavimas LCD klaviatūra

Naudodami centralės klaviatūrą įveskite šias sekcijas ir nustatykite kaip nurodyta:

**Contact ID pranešimų įjungimas**

| **LCD klaviatūra** | **Klaviatūros įvedimas** | **Veiksmo aprašymas**                                             |
| ------------------ | ------------------------ | ----------------------------------------------------------------- |
| Sistema paruošta   | *89713                   | Įeiti į programavimo režimą                                       |
| Įveskite įrenginio adresą | 0#               | Pereiti į pagrindinį panelės programavimo meniu                   |
| Įveskite vietą     | 4#                       | Pereiti į „Phone1 events reported“ perjungimų meniu               |
| Loc#4 Seg#1        | 12345678*                | Visi perjungimai turi būti įjungti. * išsaugoti ir eiti į kitą meniu |
| Loc#4 Seg#2        | 12345678*                | Visi perjungimai turi būti įjungti. * išsaugoti ir grįžti atgal.  |
| Įveskite vietą     | 23#                      | Pereiti į „Partition features“ meniu.                             |
| Loc#23 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#23 Seg#3       | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 37#                      | Pereiti į „Siren and system supervision“ meniu.                   |
| Loc#37 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#37 Seg#3       | 12345678*                | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti.       |
| Loc#37 Seg#4       | 12345678*#               | 4 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 90#                      | Pereiti į „Partition 2 features“ meniu.                           |
| Loc#90 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#90 Seg#3       | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 93#                      | Pereiti į „Partition 3 features“ meniu.                           |
| Loc#93 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#93 Seg#3       | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 96#                      | Pereiti į „Partition 4 features“ meniu.                           |
| Loc#96 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#96 Seg#3       | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 99#                      | Pereiti į „Partition 5 features“ meniu.                           |
| Loc#99 Seg#1       | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#99 Seg#3       | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 102#                     | Pereiti į „Partition 6 features“ meniu.                           |
| Loc#102 Seg#1      | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#102 Seg#3      | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 105#                     | Pereiti į „Partition 7 features“ meniu.                           |
| Loc#105 Seg#1      | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#105 Seg#3      | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | 108#                     | Pereiti į „Partition 8 features“ meniu.                           |
| Loc#108 Seg#1      | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Loc#108 Seg#3      | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Įveskite vietą     | EXIT EXIT                | Paspauskite „EXIT“ du kartus, kad išeitumėte iš programavimo režimo. |

## Interlogix NX-8V2 signalizacijos centralės programavimas LED klaviatūra

Naudodami centralės klaviatūrą įveskite šias sekcijas ir nustatykite kaip nurodyta:

**Contact ID pranešimų įjungimas**

| **LED klaviatūra**                      | **Klaviatūros įvedimas** | **Veiksmo aprašymas**                                             |
| --------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| Paruošta LED, Maitinimo LED šviečia     | *89713                   | Įeiti į programavimo režimą                                       |
| Service LED mirksi                      | 0#                       | Pereiti į pagrindinį panelės programavimo meniu                   |
| Service LED mirksi, Armed LED šviečia   | 4#                       | Pereiti į „Phone1 events reported“ perjungimų meniu               |
| Visos zonų LED šviečia                  | 12345678*                | Visi perjungimai turi būti įjungti. * išsaugoti ir eiti į kitą meniu |
| Visos zonų LED šviečia                  | 12345678*                | Visi perjungimai turi būti įjungti. * išsaugoti ir grįžti atgal.  |
| Service LED mirksi, Armed LED šviečia   | 23#                      | Pereiti į „Partition features and reporting selection“ meniu.     |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 37#                      | Pereiti į „Siren and system supervision“ meniu.                   |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*                | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti.       |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 4 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 90#                      | Pereiti į „Partition 2 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 93#                      | Pereiti į „Partition 3 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 96#                      | Pereiti į „Partition 4 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 99#                      | Pereiti į „Partition 5 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 102#                     | Pereiti į „Partition 6 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 105#                     | Pereiti į „Partition 7 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | 108#                     | Pereiti į „Partition 8 features“ meniu.                           |
| Service LED mirksi, Ready LED šviečia   | **                       | Paspauskite * du kartus, kad pereitumėte į 3 sekcijos perjungimų meniu. |
| Service LED mirksi, Ready LED šviečia   | 12345678*#               | 3 sekcija. Visi perjungimai turi būti įjungti, * išsaugoti, tada # išsaugoti ir # grįžti į pagrindinį meniu. |
| Service LED mirksi, Armed LED šviečia   | EXIT EXIT                | Paspauskite „EXIT“ du kartus, kad išeitumėte iš programavimo režimo. |

## Sistemos pridėjimas į Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Žingsnis 1.</strong> Paspauskite <strong>Pridėti naują sistemą</strong>.
        <img src="../GT+ interlogix nx 8v2 1 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>
  
 
  <div class="step-card">
        <strong>Žingsnis 2.</strong> Įveskite komunikatoriaus <strong>IMEI</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ interlogix nx 8v2 2 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 3.</strong> Pasirinkite apsaugos įmonę.
        <img src="../GT+ interlogix nx 8v2 3 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 4.</strong> Pasirinkite <strong>Interlogix</strong>.
        <img src="../GT+ interlogix nx 8v2 4 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>
  

  <div class="step-card">
        <strong>Žingsnis 5.</strong> Pasirinkite <strong>NX-8</strong>.
        <img src="../GT+ interlogix nx 8v2 5 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 6.</strong> Įveskite <strong>Object ID</strong> ir <strong>Module ID</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ interlogix nx 8v2 6 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 7.</strong> Palaukite, kol įrašomi duomenys.
        <img src="../GT+ interlogix nx 8v2 7 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 8.</strong> Paspauskite <strong>Pridėti į Protegus2</strong>.
        <img src="../GT+ interlogix nx 8v2 8 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 9.</strong> Įveskite sistemos <strong>Pavadinimą</strong>, paspauskite <strong>Toliau</strong>.
        <img src="../GT+ interlogix nx 8v2 9 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 10.</strong> Paspauskite <strong>Praleisti</strong>.
        <img src="../GT+ interlogix nx 8v2 10 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 11.</strong> Paspauskite ant sistemos.
        <img src="../GT+ interlogix nx 8v2 11 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 12.</strong> Palaukite 1 minutę, kol užbaigiama, ir paspauskite <strong>Perduoti</strong>.
        <img src="../GT+ interlogix nx 8v2 12 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 13.</strong> Įveskite naudotojo el. paštą, kuriam montuotojas perduos sistemą. Paspauskite <strong>Perduoti</strong>.
        <img src="../GT+ interlogix nx 8v2 13 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>


  <div class="step-card">
        <strong>Žingsnis 14.</strong> Sistema atsiras Protegus naudotojo telefone.
        <img src="../GT+ interlogix nx 8v2 14 ENG 2025 12 29.png" alt="Pridėti naują sistemą">
  </div>




</div>

!!! tip "Patarimas"
    Baigę įrengimą ir nustatymus atlikite sistemos patikrą:

    1. Sukurkite įvykį:

       - įjunkite/išjunkite sistemą centralės klaviatūra.
       - sukelkite zonos aliarmą, kai apsaugos sistema įjungta.

    2. Įsitikinkite, kad įvykis pasiekia CMS (Central Monitoring Station) ir Protegus2 programėlę.
