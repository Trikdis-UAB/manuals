# Universali apsaugos centralė su GT/GT+/GET greitas paruošimas

Trumpi žingsniai, kaip prijungti GT/GT+/GET komunikatorių prie apsaugos centralės, kuri perduoda pranešimus per PSTN telefono rinkiklį, priimti Contact ID įvykius per `TIP` / `RING` ir valdyti įjungimą / išjungimą iš Protegus2 per centralės raktinio jungiklio zoną. Naudokite kartu su pilnu komunikatoriaus vadovu ir apsaugos centralės programavimo vadovu.

!!! caution "Atsargiai"
    Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.

## Reikalavimai

- GT/GT+/GET programinės įrangos versija 1.21, įdėta SIM kortelė, PIN išjungtas, aktyvus duomenų planas.
- Apsaugos centralė su PSTN telefono rinkikliu, palaikančiu Contact ID per DTMF tonus.
- Protegus2 įmonės / montuotojo paskyra ir komunikatoriaus IMEI.
- Centralės montuotojo kodas ir centralės programavimo vadovas reikalingi tik tada, jei centralė dar neskambina per telefono rinkiklį, jei reikia pakeisti rinkiklio nustatymus arba jei bus pridedamas nuotolinis įjungimas / išjungimas per raktinio jungiklio zoną.
- Laisva centralės zona, kurią galima suprogramuoti kaip raktinio jungiklio zoną, reikalinga tik tada, jei reikia nuotolinio įjungimo / išjungimo.

!!! note "Pastaba"
    Jei centralė anksčiau siuntė pranešimus per telefono rinkiklį, palikite centralės rinkiklį įjungtą ir prijunkite komunikatorių prie centralės `TIP` / `RING` gnybtų. Komunikatorius atsiliepia į centralės skambutį ir automatiškai priima Contact ID įvykius su bet kokiu centralės siunčiamu paskyros ID. Centralės programavimą keiskite tik tada, jei centralė dar neskambina, rinkiklio nustatymai neteisingi, paskyros ID turi atitikti ARC/CMS reikalavimą arba reikia pridėti raktinio jungiklio zoną nuotoliniam įjungimui / išjungimui.

## Pajungimas

Prieš jungdami laidus atjunkite centralės ir komunikatoriaus maitinimą. Prijunkite komunikatorių prie centralės maitinimo, `TIP` / `RING` gnybtų ir raktinio jungiklio zonos, kaip parodyta žemiau.

| GT/GT+/GET gnybtas | Apsaugos centralės gnybtas | Paskirtis |
| --- | --- | --- |
| `+12V` / `GND` | `AUX+` / `AUX-` | Komunikatoriaus maitinimas iš centralės pagalbinio išėjimo. |
| `TIP` / `RING` | `TIP` / `RING` | Contact ID įvykių priėmimas iš centralės telefono rinkiklio. |
| `OUT` / `I/O`, nustatytas kaip PGM | Raktinio jungiklio zonos įėjimas | Įjungimo / išjungimo komandos iš Protegus2. |
| `GND` / `COM` | Zonos bendras gnybtas, jei reikalingas | Bendras atskaitos taškas raktinio jungiklio zonos pajungimui. |

![Universali TIP/RING ir raktinio jungiklio pajungimo schema](../../../../../images/quick-setup/generic-dial-capture.svg)

!!! warning "Įspėjimas"
    Raktinio jungiklio zoną junkite tiksliai taip, kaip nurodyta centralės vadove. Kai kurios centralės naudoja normaliai atvirą įėjimą, normaliai uždarą įėjimą, EOL rezistorių, dvigubą EOL rezistorių arba atskirą bendrą gnybtą.

## Apsaugos centralės programavimas

Praleiskite šį skyrių, jei centralė jau skambina per telefono rinkiklį ir nuotolinis įjungimas / išjungimas nereikalingas. Programavimo kodai skiriasi pagal gamintoją ir modelį. Naudokite apsaugos centralės programavimo vadovą tik tiems punktams, kuriuos reikia pakeisti.

1. Įjunkite centralės PSTN telefono rinkiklį.
2. Pasirinkite toninį / DTMF rinkimą.
3. Pasirinkite Contact ID pranešimų formatą.
4. Nustatykite imtuvo telefono numerį. Jei centralė jau siuntė pranešimus į stebėjimo pultą per telefono liniją, esamą numerį paprastai galima palikti nepakeistą. Naujam dial-capture pajungimui įveskite bet kokį imtuvo numerį, ilgesnį nei 4 skaitmenys, nebent centralės vadovas reikalauja kito formato.
5. Jei reikalingas perdavimas į ARC/CMS, nustatykite centralės paskyros ID pagal stebėjimo pulto pateiktą reikšmę. Komunikatorius gali perduoti centralės siunčiamą paskyros ID, todėl baziniam dial-capture pajungimui atskiras komunikatoriaus Object ID nereikalingas.
6. Įjunkite įvykius, kurie turi būti perduodami: aliarmus, atsistatymus, gedimus, sabotažus ir įjungimo / išjungimo įvykius, kai jų reikia.
7. Zoną, prijungtą prie komunikatoriaus išėjimo, suprogramuokite kaip raktinio jungiklio zoną tik tada, jei reikalingas nuotolinis įjungimas / išjungimas iš Protegus2.
8. Pasirinkite raktinio jungiklio tipą, atitinkantį komunikatoriaus išėjimo režimą: momentinis / impulsinis arba palaikomas / lygio.
9. Priskirkite raktinio jungiklio zoną teisingai sričiai arba daliai, tada išsaugokite ir išeikite iš programavimo.

!!! important "Svarbu"
    Nuotolinis įjungimas / išjungimas iš Protegus2 veikia tik tada, kai prijungta centralės zona suprogramuota kaip raktinio jungiklio zona. Programėlės būsena taip pat priklauso nuo centralės siunčiamų įjungimo ir išjungimo įvykių per rinkiklį.

## Sistemos pridėjimas į Protegus2

<div class="steps-grid">
  <div class="step-card">
    <strong>Žingsnis 1.</strong> Paspauskite <strong>Pridėti naują sistemą</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 1 ENG 2026 01 02.webp" alt="Pridėti naują sistemą">
  </div>
  <div class="step-card">
    <strong>Žingsnis 2.</strong> Įveskite komunikatoriaus <strong>IMEI</strong>, paspauskite <strong>Toliau</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 2 ENG 2026 01 02.webp" alt="Įvesti komunikatoriaus IMEI">
  </div>
  <div class="step-card">
    <strong>Žingsnis 3.</strong> Pasirinkite apsaugos įmonę.
    <img src="../dsc neo hs/GT+ neo hs2016 3 ENG 2026 01 02.webp" alt="Pasirinkti apsaugos įmonę">
  </div>
  <div class="step-card">
    <strong>Žingsnis 4.</strong> Pasirinkite <strong>TIP RING</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 4 ENG 2026 01 02.webp" alt="Pasirinkti TIP RING">
  </div>
  <div class="step-card">
    <strong>Žingsnis 5.</strong> Pasirinkite <strong>Mode</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 5 ENG 2026 01 02.webp" alt="Pasirinkti Mode">
  </div>
  <div class="step-card">
    <strong>Žingsnis 6.</strong> Pasirinkite <strong>AUTO</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 6 ENG 2026 01 02.webp" alt="Pasirinkti AUTO">
  </div>
  <div class="step-card">
    <strong>Žingsnis 7.</strong> Įveskite <strong>Object ID</strong>, jei to reikalauja vedlys arba stebėjimo pulto nustatymai, įveskite <strong>Module ID</strong>, tada paspauskite <strong>Toliau</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 8 ENG 2026 01 02.webp" alt="Įvesti Object ID ir Module ID">
  </div>
  <div class="step-card">
    <strong>Žingsnis 8.</strong> Palaukite, kol duomenys bus įrašyti.
    <img src="../dsc neo hs/GT+ neo hs2016 9 ENG 2026 01 02.webp" alt="Duomenų įrašymas">
  </div>
  <div class="step-card">
    <strong>Žingsnis 9.</strong> Paspauskite <strong>Add to Protegus2</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 10 ENG 2026 01 02.webp" alt="Pridėti į Protegus2">
  </div>
  <div class="step-card">
    <strong>Žingsnis 10.</strong> Įveskite sistemos <strong>pavadinimą</strong>, paspauskite <strong>Toliau</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 11 ENG 2026 01 02.webp" alt="Įvesti sistemos pavadinimą">
  </div>
  <div class="step-card">
    <strong>Žingsnis 11.</strong> Įveskite <strong>srities pavadinimą</strong>. Įjunkite <strong>Control with Protegus2</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 13 ENG 2026 01 02.webp" alt="Įjungti valdymą su Protegus2">
  </div>
  <div class="step-card">
    <strong>Žingsnis 12.</strong> Pasirinkite prijungtą PGM išėjimą. Pasirinkite <strong>Pulse</strong> arba <strong>Level</strong>, kad atitiktų centralės raktinio jungiklio zoną, tada paspauskite <strong>Išsaugoti</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 14 ENG 2026 01 02.webp" alt="Pasirinkti PGM išėjimą">
  </div>
</div>

!!! tip "Patarimas"
    Jei reikalingas tik įvykių perdavimas, nejunkite raktinio jungiklio išėjimo ir Protegus2 palikite nuotolinį įjungimą / išjungimą išjungtą.

## Sistemos tikrinimas

- [ ] Įjunkite ir išjunkite centralę klaviatūra.
- [ ] Sukelkite bandomąjį aliarmą, kai sistema įjungta.
- [ ] Patikrinkite, ar įvykiai pasiekia Protegus2. Jei naudojamas perdavimas į ARC/CMS, patikrinkite, ar stebėjimo pultas gauna įvykius su reikiamu paskyros ID.
- [ ] Įjunkite ir išjunkite sistemą iš Protegus2, jei raktinio jungiklio zona prijungta.
- [ ] Patikrinkite, ar centralė įvykdo programėlės komandą ir tada perduoda įjungimo / išjungimo įvykį atgal į Protegus2.
- [ ] Jei įvykiai negaunami, patikrinkite centralės rinkiklio įjungimą, DTMF rinkimą, Contact ID formatą, telefono numerį, `TIP` / `RING` pajungimą ir paskyros ID tik tada, jei tikimasi perdavimo į ARC/CMS.
