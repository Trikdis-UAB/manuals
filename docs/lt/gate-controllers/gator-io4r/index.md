# GATOR LTE ir GATOR WiFi su iO4R greitas paruošimas

Trumpi prijungimo ir Protegus2 programavimo žingsniai, kaip prijungti iO4R plėtiklį prie GATOR LTE arba GATOR WiFi vartų valdiklio. Kitus montavimo ir konfigūravimo nustatymus rasite pilnuose [GATOR](../gator/index.md) ir [GATOR WiFi](../gator-wifi/index.md) vadovuose.

iO4R naudojamas pažangesniam vartų stebėjimui. Jis prideda stebimus apsaugos jutiklių Guard įėjimus ir leidžia įgaliotam specialistui laikinai apeiti jutiklio gedimą, kol bus atlikta techninė priežiūra. Protegus2 taip pat skaičiuoja pilnus vartų atidarymo ir uždarymo ciklus ir įspėja, kai reikia atlikti techninę priežiūrą. Tai padeda neplanuotus iškvietimus pakeisti suplanuotais aptarnavimo vizitais ir pasikartojančiomis priežiūros sutartimis.

!!! caution "Atsargiai"
    Montuoti ir prižiūrėti gali tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite tinklo ir žemos įtampos maitinimą. Laikykitės vartų automatikos gamintojo saugos instrukcijų ir vietinių elektros darbų reikalavimų.

## Būtinos sąlygos

- Paruoštas GATOR LTE arba GATOR WiFi vartų valdiklis. Jungiant laidus maitinimas turi būti atjungtas.
- iO4R plėtiklio serijos numeris.
- Protegus2 įmonės arba montuotojo paskyra ir valdiklio IMEI / Unique ID.
- Vartų būsenos jutiklis prijungtas prie valdiklio vartų padėties įėjimo.
- Vartų apsaugos jutikliai prijungti per iO4R plėtiklį, jeigu jie bus stebimi arba laikinai apeinami Protegus2 programoje.

## Laidų prijungimas

Prijunkite iO4R plėtiklį prie valdiklio RS485 magistralės ir maitinimo gnybtų, kaip parodyta žemiau.

!!! note "Pastaba"
    Schemoje parodyti GATOR LTE gnybtų pavadinimai. GATOR WiFi valdiklyje naudokite atitinkamus `+DC`, `-DC`, `A RS485` ir `B RS485` gnybtus iš GATOR WiFi vadovo.

<img src="./wiring-gator-io4r.webp" alt="GATOR LTE ir iO4R prijungimo schema">

Naudokite `3 I/O` kaip vartų padėties įėjimą ciklų skaičiavimui. Ciklas skaičiuojamas tik tada, kai vartai pilnai atsidaro ir pilnai užsidaro.

!!! important "Svarbu"
    Protegus2 stebėjimo sąrankoje `I/O 3` rezervuotas vartų padėčiai ir ciklų skaičiavimui. Jo neperkonfigūruokite. Įėjimai `IN1` ir `IN2` rezervuoti Wiegand.

## Valdiklio ir iO4R pridėjimas Protegus2 programoje

Prisijunkite prie Protegus2 naudodami įmonės arba montuotojo paskyrą, tada pridėkite valdiklį.

<div class="steps-grid">
  <div class="step-card">
    <strong>1 žingsnis.</strong> Paspauskite <strong>Add new system</strong>.
    <img src="./protegus-add-new-system.webp" alt="Protegus2 Add new system ekranas">
  </div>
  <div class="step-card">
    <strong>2 žingsnis.</strong> Įveskite valdiklio <strong>IMEI</strong>, tada paspauskite <strong>Next</strong>.
    <img src="./protegus-enter-imei.webp" alt="Protegus2 IMEI įvedimo ekranas">
  </div>
  <div class="step-card">
    <strong>3 žingsnis.</strong> Pasirinkite <strong>Advanced Gator Monitoring</strong>, tada paspauskite <strong>Next</strong>.
    <img src="./protegus-select-advanced-gator-monitoring.webp" alt="Protegus2 Advanced Gator Monitoring pasirinkimas">
  </div>
  <div class="step-card">
    <strong>4 žingsnis.</strong> Nustatykite <strong>Cycles</strong> skaičių, po kurio bus reikalinga techninė priežiūra, tada paspauskite <strong>Next</strong>.
    <img src="./protegus-set-cycles.webp" alt="Protegus2 vartų valdymo ir priežiūros ciklų ekranas">
  </div>
  <div class="step-card">
    <strong>5 žingsnis.</strong> Įjunkite kiekvieną iO4R išėjimą, kuris prijungtas prie stebimo apsaugos jutiklio arba būsenos grandinės.
    <img src="./protegus-io4r-enable-outputs.webp" alt="Protegus2 iO4R išėjimų įjungimo ekranas">
  </div>
  <div class="step-card">
    <strong>6 žingsnis.</strong> Įveskite iO4R <strong>Serial number</strong>, tada paspauskite <strong>OK</strong>.
    <img src="./protegus-io4r-enter-serial.webp" alt="Protegus2 iO4R serijos numerio įvedimas">
  </div>
  <div class="step-card">
    <strong>7 žingsnis.</strong> Kiekvienam įjungtam išėjimui nustatykite pavadinimą ir piktogramą, išėjimo <strong>Type</strong> palikite <strong>Guard</strong>, priskirkite atitinkamą iO4R įėjimą ir įėjimo <strong>Type</strong> nustatykite pagal laidų prijungimą. Pavyzdyje parodytas įėjimo tipas yra <strong>NO</strong>. Paspauskite <strong>Next</strong>.
    <img src="./protegus-io4r-output-settings.webp" alt="Protegus2 iO4R išėjimo ir priskirto įėjimo nustatymai">
  </div>
  <div class="step-card">
    <strong>8 žingsnis.</strong> Palaukite, kol Protegus2 įrašys duomenis.
    <img src="./protegus-writing-data.webp" alt="Protegus2 duomenų įrašymo ekranas">
  </div>
  <div class="step-card">
    <strong>9 žingsnis.</strong> Paspauskite <strong>Next</strong>.
    <img src="./protegus-press-next.webp" alt="Protegus2 Next ekranas">
  </div>
  <div class="step-card">
    <strong>10 žingsnis.</strong> Įveskite sistemos <strong>Name</strong>, tada paspauskite <strong>Next</strong>.
    <img src="./protegus-enter-system-name.webp" alt="Protegus2 sistemos pavadinimo įvedimas">
  </div>
  <div class="step-card">
    <strong>11 žingsnis.</strong> Paspauskite <strong>Skip</strong>, jeigu dabar nenorite pridėti vartotojų.
    <img src="./protegus-skip.webp" alt="Protegus2 Skip ekranas">
  </div>
  <div class="step-card">
    <strong>12 žingsnis.</strong> Palaukite apie 1 minutę, kol sąranka bus užbaigta.
    <img src="./protegus-wait-completion.webp" alt="Protegus2 užbaigimo laukimo ekranas">
  </div>
</div>

## Sistemos perdavimas vartotojui

Baigę sąranką, perduokite sistemą vartotojo Protegus2 paskyrai.

<div class="steps-grid">
  <div class="step-card">
    <strong>13 žingsnis.</strong> Paspauskite <strong>Menu</strong>.
    <img src="./protegus-open-menu.webp" alt="Protegus2 meniu mygtukas">
  </div>
  <div class="step-card">
    <strong>14 žingsnis.</strong> Paspauskite <strong>Settings</strong>.
    <img src="./protegus-settings.webp" alt="Protegus2 Settings meniu punktas">
  </div>
  <div class="step-card">
    <strong>15 žingsnis.</strong> Paspauskite <strong>Transfer system</strong>.
    <img src="./protegus-transfer-system.webp" alt="Protegus2 Transfer system punktas">
  </div>
  <div class="step-card">
    <strong>16 žingsnis.</strong> Įveskite vartotojo el. pašto adresą, tada paspauskite <strong>Transfer</strong>.
    <img src="./protegus-enter-user-email.webp" alt="Protegus2 vartotojo el. pašto perdavimo ekranas">
  </div>
</div>

## Vartų stebėjimo ir valdymo patikra

Po perdavimo vartotojas turi prisijungti prie Protegus2 naudodamas savo paskyrą.

!!! warning "Įspėjimas"
    Vartų apsaugos jutiklio apėjimas gali išjungti saugos apsaugą. Apėjimą naudokite tik kaip laikiną, įgaliotą techninės priežiūros veiksmą ir prieš palikdami įrenginį naudoti atkurkite normalų jutiklio veikimą.

<div class="steps-grid">
  <div class="step-card">
    <strong>17 žingsnis.</strong> Paspauskite <strong>Gate control</strong>, kad matytumėte vartų ciklų skaitiklį.
    <img src="./protegus-gate-control.webp" alt="Protegus2 Gate control mygtukas">
  </div>
  <div class="step-card">
    <strong>18 žingsnis.</strong> Peržiūrėkite <strong>Total cycles</strong> ir <strong>Cycles to maintenance</strong>. Jei įgaliotas montuotojas turi patikrinti apsaugos jutiklių būseną, paspauskite <strong>Input status</strong>.
    <img src="./protegus-gate-cycles-input-status.webp" alt="Protegus2 vartų ciklų ir įėjimų būsenos ekranas">
  </div>
  <div class="step-card">
    <strong>19 žingsnis.</strong> <strong>Input status / bypass</strong> naudokite tik tada, kai apsaugos jutiklis patikrintas ir apėjimas reikalingas laikinai.
    <img src="./protegus-input-status-bypass.webp" alt="Protegus2 Input status bypass ekranas">
  </div>
  <div class="step-card">
    <strong>20 žingsnis.</strong> Paspauskite vartų valdymo piktogramą, kad atidarytumėte vartus.
    <img src="./protegus-open-gate.webp" alt="Protegus2 vartų atidarymo valdymo ekranas">
  </div>
</div>

## Sistemos patikra

1. Pilnai atidarykite ir uždarykite vartus, tada patikrinkite, ar ciklų skaitiklis pasikeičia kaip tikėtasi.
2. Suaktyvinkite kiekvieną stebimą iO4R įėjimą ir patikrinkite, ar įėjimo būsena pasikeičia Protegus2 programoje.
3. Patikrinkite vartų valdymo piktogramą ir įsitikinkite, kad vartų automatika reaguoja tinkamai.
