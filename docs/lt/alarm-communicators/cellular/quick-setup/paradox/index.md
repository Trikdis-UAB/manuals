# Paradox SP(+)/MG(+) su GT/GT+/GET greitas paruošimas

Trumpi pajungimo ir programavimo žingsniai, skirti prijungti GT/GT+/GET komunikatorių prie Paradox SP/SP+/MG/MG+ centralės naudojant TIP/RING ir KeyBus, tada pridėti sistemą į Protegus2. Naudokite kartu su pilnais vadovais kitiems nustatymams. (Gnybtų pavadinimai GT/GT+/GET gali nežymiai skirtis, tačiau jungtys yra tokios pačios.)

!!! caution "Atsargiai"
    Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.

## Reikalavimai

1. GT/GT+/GET programinės įrangos versija 1.21, įdėta SIM kortelė, PIN išjungtas, aktyvus duomenų planas.
1. Paradox SP/SP+/MG/MG+ centralė su klaviatūros prieiga (yra montuotojo kodas).
1. CMS paskyros numeris, jei pranešimai siunčiami į CMS.
1. Protegus2 įmonės/montuotojo paskyra ir komunikatoriaus IMEI.

## Pajungimas

Vadovaukitės schema žemiau ir prijunkite komunikatorių prie centralės:

| GT/GT+/GET gnybtas | Paradox centralė | Pastabos |
| --- | --- | --- |
| TIP / RING | TIP / RING | PSTN linijos emuliacijai (Contact ID). |
| CLK / DATA (KeyBus) | YEL / GRN (KeyBus) | Serijiniam magistralės valdymui. |
| +12V / GND | AUX + / GND | Maitinimas komunikatoriui. |

<style>
.wiring-diagram {
  max-width: 900px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

<img src="./wiring-diagram.svg" alt="Pajungimo schema" class="wiring-diagram">

## Paradox panelės programavimas (LCD klaviatūra)

Naudokite panelės klaviatūrą, kad įjungtumėte Contact ID ir nustatytumėte paskyrų numerius:

1. Įeikite į montuotojo programavimą: `[ENTER] 0000` (arba jūsų montuotojo kodas).
2. Skiltis 801: bendros telefoninės linijos parinktys → palikite numatytas, jei nereikia keisti.
3. Skiltis 811: įveskite 1 skaidinio paskyros numerį (pavyzdys `1111`; naudokite savo CMS reikšmę).
4. Skiltis 812: įveskite 2 skaidinio paskyros numerį (pavyzdys `2222`; naudokite savo CMS reikšmę).
5. Skiltis 815: įveskite telefono numerį pranešimams (pavyzdys `123456`; naudokite savo CMS reikšmę).
6. Skiltis 911: nustatykite PC slaptažodį (pavyzdys `1234`; nustatykite pagal politiką).
7. Paspauskite `[CLEAR]`, kad išeitumėte iš programavimo.

Jei jūsų klaviatūros kodai skiriasi, vadovaukitės pilnu Paradox vadovu.

## Sistemos pridėjimas į Protegus2 (mobiliajame įrenginyje arba naršyklėje)

<style>
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.step-card {
  padding: 8px;
  border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
  border-radius: 6px;
  background: var(--md-default-bg-color, #fff);
}
.step-card img {
  width: 100%;
  height: auto;
  display: block;
}
</style>

<div class="steps-grid">
  <div class="step-card">
    <strong>Žingsnis 1.</strong> Paspauskite <strong>Pridėti naują sistemą</strong>.
    <img src="./protegus-add-new-system.png" alt="Pridėti naują sistemą">
  </div>
  <div class="step-card">
    <strong>Žingsnis 2.</strong> Įveskite komunikatoriaus <strong>IMEI</strong>, paspauskite <strong>Toliau</strong>.
    <img src="./protegus-enter-imei.png" alt="Įvesti IMEI">
  </div>
  <div class="step-card">
    <strong>Žingsnis 3.</strong> Pasirinkite <strong>TIP RING</strong>, paspauskite <strong>Toliau</strong>.
    <img src="./protegus-select-tip-ring.png" alt="Pasirinkti TIP RING">
  </div>
  <div class="step-card">
    <strong>Žingsnis 4.</strong> Paspauskite <strong>Atgal</strong>.
    <img src="./protegus-back.png" alt="Atgal">
  </div>
  <div class="step-card">
    <strong>Žingsnis 5.</strong> Pasirinkite <strong>Serial BUS</strong>, paspauskite <strong>Toliau</strong>.
    <img src="./protegus-select-serial-bus.png" alt="Pasirinkti Serial BUS">
  </div>
  <div class="step-card">
    <strong>Žingsnis 6.</strong> Pasirinkite <strong>PARADOX</strong>.
    <img src="./protegus-select-paradox.png" alt="Pasirinkti Paradox">
  </div>
  <div class="step-card">
    <strong>Žingsnis 7.</strong> Pasirinkite <strong>PARADOX SP+/MG+ series KeyBus</strong>.
    <img src="./protegus-select-paradox-keybus.png" alt="Pasirinkti Paradox KeyBus">
  </div>
  <div class="step-card">
    <strong>Žingsnis 8.</strong> Įveskite <strong>Primary Object ID</strong>, paspauskite <strong>Toliau</strong>.
    <img src="./protegus-primary-object-id.png" alt="Įvesti Primary Object ID">
  </div>
  <div class="step-card">
    <strong>Žingsnis 9.</strong> Palaukite, kol įrašomi duomenys.
    <img src="./protegus-writing-data.png" alt="Duomenų įrašymas">
  </div>
  <div class="step-card">
    <strong>Žingsnis 10.</strong> Paspauskite <strong>Toliau</strong>.
    <img src="./protegus-press-next.png" alt="Toliau">
  </div>
  <div class="step-card">
    <strong>Žingsnis 11.</strong> Įveskite sistemos <strong>Pavadinimą</strong>, paspauskite <strong>Toliau</strong>.
    <img src="./protegus-enter-name.png" alt="Įvesti pavadinimą">
  </div>
  <div class="step-card">
    <strong>Žingsnis 12.</strong> Paspauskite <strong>Praleisti</strong> (jei dabar nepridedate naudotojų).
    <img src="./protegus-skip.png" alt="Praleisti">
  </div>
  <div class="step-card">
    <strong>Žingsnis 13.</strong> Palaukite ~1 minutę, kol užbaigiama.
    <img src="./protegus-wait.png" alt="Palaukite">
  </div>
  <div class="step-card">
    <strong>Žingsnis 14.</strong> Konfigūracija baigta.
    <img src="./protegus-finished.png" alt="Baigta">
  </div>
</div>

!!! tip "Patarimas"
    Jei Protegus2 negali užbaigti duomenų įrašymo, patikrinkite KeyBus (YEL/GRN) pajungimą, IMEI įvedimą ir ar CMS/Contact ID nustatymai išsaugoti panelėje.
