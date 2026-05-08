# GT/GT+/GET universalus TIP/RING prijungimas prie apsaugos centralės

Naudokite šį vadovą, kai apsaugos centralė įvykius perduoda per PSTN telefoninį komunikatorių. GT/GT+/GET komunikatorius jungiamas prie centralės `TIP` / `RING` gnybtų, automatiškai priima Contact ID įvykius ir, jei reikia, gali nuotoliniu būdu įjungti / išjungti sistemą per Protegus2 valdomą jungiklio (keyswitch) zoną. Naudokite kartu su pilnu komunikatoriaus vadovu ir apsaugos centralės programavimo vadovu.

!!! caution "Atsargiai"
    Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.

## Reikalavimai

- GT/GT+/GET programinės įrangos versija 1.21, įdėta SIM kortelė, PIN išjungtas, aktyvus duomenų planas.
- Apsaugos centralė, kurioje yra PSTN telefoninis komunikatorius, palaikantis Contact ID per DTMF tonus.
- Protegus2 įmonės / montuotojo paskyra ir komunikatoriaus IMEI.
- Centralės montuotojo kodas ir centralės programavimo vadovas reikalingi tik tada, jei centralė dar neperduoda pranešimų per telefoninį komunikatorių, jei reikia pakeisti komunikatoriaus nustatymus arba jei bus pridedamas nuotolinis įjungimas / išjungimas per jungiklio (keyswitch) zoną.
- Laisva centralės zona reikalinga tik tada, jei reikia nuotolinio įjungimo / išjungimo. Ji turi būti programuojama kaip jungiklio (keyswitch) zona.

!!! note "Pastaba"
    Jei centralė anksčiau siuntė pranešimus per telefoninį komunikatorių, palikite centralės telefoninį komunikatorių įjungtą ir prijunkite TRIKDIS komunikatorių prie centralės `TIP` / `RING` gnybtų. Komunikatorius atsiliepia į centralės skambutį ir automatiškai priima Contact ID įvykius su bet kokiu centralės siunčiamu objekto numeriu. Centralės programavimą keiskite tik tada, jei centralė dar neskambina, telefoninio komunikatoriaus nustatymai neteisingi, objekto numeris turi atitikti CSP/CMS reikalavimą arba reikia pridėti jungiklio (keyswitch) zoną nuotoliniam įjungimui / išjungimui.

## Pajungimas

Prieš jungdami laidus atjunkite centralės ir komunikatoriaus maitinimą. Prijunkite komunikatorių prie centralės maitinimo, `TIP` / `RING` gnybtų ir jungiklio (keyswitch) zonos, kaip parodyta žemiau.

| GT/GT+/GET gnybtas | Apsaugos centralės gnybtas | Paskirtis |
| --- | --- | --- |
| `+12V` / `GND` | `AUX+` / `AUX-` | Komunikatoriaus maitinimas iš centralės pagalbinio išėjimo. |
| `TIP` / `RING` | `TIP` / `RING` | Contact ID įvykių priėmimas iš centralės telefoninio komunikatoriaus. |
| `OUT` / `I/O`, nustatytas kaip PGM | Jungiklio (keyswitch) zonos įėjimas | Nuotolinio įjungimo / išjungimo komandos iš Protegus2. |
| `GND` / `COM` | Zonos bendras gnybtas, jei reikalingas | Bendras atskaitos taškas jungiklio (keyswitch) zonos pajungimui. |

![Universali TIP/RING ir jungiklio zonos pajungimo schema](../../../../../images/quick-setup/generic-dial-capture.svg)

!!! warning "Įspėjimas"
    Jungiklio (keyswitch) zoną junkite tiksliai taip, kaip nurodyta centralės vadove. Kai kurios centralės naudoja normaliai atvirą įėjimą, normaliai uždarą įėjimą, EOL rezistorių, dvigubą EOL rezistorių arba atskirą bendrą gnybtą.

## Apsaugos centralės programavimas

Praleiskite šį skyrių, jei centralės PSTN telefoninis komunikatorius jau perduoda pranešimus ir nuotolinis įjungimas / išjungimas nereikalingas. Programavimo kodai skiriasi pagal gamintoją ir modelį. Naudokite apsaugos centralės programavimo vadovą tik tiems punktams, kuriuos reikia pakeisti.

1. Įjunkite centralės PSTN telefoninį komunikatorių.
2. Pasirinkite toninį / DTMF rinkimą.
3. Pasirinkite Contact ID pranešimų formatą.
4. Nustatykite imtuvo telefono numerį. Jei centralė jau siuntė pranešimus į stebėjimo pultą per telefono liniją, esamą numerį paprastai galima palikti nepakeistą. Naujam TIP/RING signalų priėmimui įveskite bet kokį imtuvo numerį, ilgesnį nei 4 skaitmenys, nebent centralės vadovas reikalauja kito formato.
5. Jei reikalingas perdavimas į CSP/CMS, centralės objekto numeris turi būti nustatytas pagal stebėjimo pulto pateiktą reikšmę. Bazinis TIP/RING signalų priėmimas nereikalauja atskiro komunikatoriaus Object ID, nes komunikatorius gali perduoti centralės siunčiamą objekto numerį.
6. Įjunkite įvykius, kurie turi būti perduodami: aliarmus, atsistatymus, gedimus, sabotažus ir įjungimo / išjungimo įvykius, kai jų reikia.
7. Zoną, prijungtą prie komunikatoriaus išėjimo, suprogramuokite kaip jungiklio (keyswitch) zoną tik tada, jei reikalingas nuotolinis įjungimas / išjungimas iš Protegus2.
8. Pasirinkite jungiklio zonos tipą, atitinkantį komunikatoriaus išėjimo režimą: momentinis / impulsas arba palaikomas / lygis.
9. Priskirkite jungiklio zoną teisingai sričiai arba daliai, tada išsaugokite ir išeikite iš programavimo.

!!! important "Svarbu"
    Nuotolinis įjungimas / išjungimas iš Protegus2 veikia tik tada, kai prijungta centralės zona suprogramuota kaip jungiklio (keyswitch) zona. Programėlės būsena taip pat priklauso nuo centralės siunčiamų įjungimo ir išjungimo įvykių per telefoninį komunikatorių.

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
    <strong>Žingsnis 12.</strong> Pasirinkite prijungtą PGM išėjimą. Pasirinkite <strong>Impulsas</strong> arba <strong>Lygis</strong>, kad atitiktų centralės jungiklio (keyswitch) zoną, tada paspauskite <strong>Išsaugoti</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 14 ENG 2026 01 02.webp" alt="Pasirinkti PGM išėjimą">
  </div>
</div>

!!! tip "Patarimas"
    Jei reikalingas tik įvykių perdavimas, nejunkite išėjimo į jungiklio (keyswitch) zoną ir Protegus2 palikite nuotolinį įjungimą / išjungimą išjungtą.

## Sistemos tikrinimas

- [ ] Įjunkite ir išjunkite centralę klaviatūra.
- [ ] Sukelkite bandomąjį aliarmą, kai sistema įjungta.
- [ ] Patikrinkite, ar įvykiai pasiekia Protegus2. Jei naudojamas perdavimas į CSP/CMS, patikrinkite, ar stebėjimo pultas gauna įvykius su reikiamu objekto numeriu.
- [ ] Įjunkite ir išjunkite sistemą iš Protegus2, jei jungiklio (keyswitch) zona prijungta.
- [ ] Patikrinkite, ar centralė įvykdo programėlės komandą ir tada perduoda įjungimo / išjungimo įvykį atgal į Protegus2.
- [ ] Jei įvykiai negaunami, patikrinkite centralės telefoninio komunikatoriaus įjungimą, DTMF rinkimą, Contact ID formatą, telefono numerį, `TIP` / `RING` pajungimą ir objekto numerį tik tada, jei tikimasi perdavimo į CSP/CMS.
