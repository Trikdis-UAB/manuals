# iO8-LoRa Belaidis plėtiklis

<div style="text-align: center;">
  <img src="./image1.webp" alt="iO8-LoRa išplėtimo modulio plokštės nuotrauka su gnybtų kaladėlėmis, LED indikatoriais, mygtuku SW1 ir DIP jungikliu SW2." width="400">
</div>

## Aprašymas 

iO-8-LORA belaidžiai plėtikliai su RF-LORA moduliu padidina apsaugos centralės "FLEXi" SP3 įėjimų ir išėjimų skaičių naudojant dvipusį belaidį RF ryšį.


Suderinamas su [SP3](../../control-panels/sp3/index.md) apsaugos centralize ir [GATOR Cellular](../../gate-controllers/gator/index.md) vartų ir durų prieigos valdikliu.
iO-8-LORA belaidis plėtiklis turi 8 universalius I/O kontaktus. Kiekvieną I/O kontaktą galima nustatyti veikti kaip įėjimą (IN) arba išėjimą (OUT).

**Savybės**

Ryšys:

- Belaidžio ryšio veikimo atstumas tiesioginio matomumo zonoje iki 5000 m.

- Prie apsaugos centralės "*FLEXi*" *SP3* galima prijungti iki 8vnt. belaidžių plėtiklių *iO-8-LORA*.

- Gaminiai nuo HW iO8_x5xx_7_230419 versijos komplektuojami su standartine antena, tinkančia daugumoje atvejų. <u>Tais atvejais kai reikia užtikrinti kokybišką ryšį kuo didesniu atstumu, reikia naudoti anteną (AX-ANT-KIT – 433 MHz, AX-ANT01S_SF – 868 MHz) su didesniu radijo signalo stiprinimu</u>.

Įėjimai ir išėjimai:
- 8 I/O kontaktai, iš kurių kiekvieną galima nustatyti kaip įėjimo (IN) arba išėjimo (OUT) kontaktą. Įėjimo (IN) tipai: ATZ, EOL, NC, NO. EOL ir ATZ grandinėse galima naudoti skirtingų nominalų rezistorius.

**Prijungimas:**

- Belaidis plėtiklis iO-8-LORA prie apsaugos centralės "FLEXi" SP3 prijungiamas per transiverį RF-LORA.

### Techniniai parametrai 

| Parametras | Aprašymas |
|----|----|
| Perdavimo dažnis | 4F modifikacija: 433,3 – 434,7 MHz /​ 8F modifikacija: 867 - 869 MHz |
| Moduliacijos tipas | LORA |
| Maitinimo įtampa | 10-26 V DC |
| Naudojama srovė | Iki 50 mA (budėjimo režime) /​ Iki 120 mA (duomenų siuntimo metu) |
| Pranešimo šifravimas | Taip |
| Veikimo atstumas atviroje erdvėje | Iki 5000 m |
| Dvigubos paskirties kontaktai [I/​O] | 8\. Konfigūruojant nustatoma IN arba OUT funkcija. Kai nustatyta IN, galima priskirti tipą: NC, NO, EOL, EOL_T, 3EOL, ATZ, ATZ_T. Kai nustatyta OUT, kontaktas tampa atvirojo kolektoriaus (OC) tipo išvadų, komutuojančiu iki 100 mA srovę |
| Darbo aplinkos sąlygos | Temperatūra nuo -10 °C iki +50 °C, santykinė drėgmė – iki 80%, prie +20 °C. |
| Matmenys | 65 x 90 x 12 mm |
| Svoris | 80 g |

### Plėtiklio elementai 

<img alt="Kairėje – numeruota iO8-LoRa plėtiklio plokštės nuotrauka. 1 žymi šviesos indikatorius; 2 – išorinių kontaktų jungtis; 3 – įrenginio primokymo bei ryšio tikrinimo mygtuką „SW1“; 4 – DIP jungiklį „SW2“. Numerių reikšmės išvardytos dešinėje." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 860px; height: auto;" />

!!! note "DIP jungiklio „SW2“ nustatymai"
    Nuo HW iO8_x5xx_7_230419 versijos:

    1. Radijo dažnis (`OFF` - RF1; `ON` - RF2). Skirtas pakeisti radijo ryšio kanalą, jei esamas kanalas yra stipriai apkrautas.
    2. Moduliacijos pobūdis (`Off` - greita; `On` - lėta). `On` padėtis leidžia padidinti komunikacijos atstumą apie 2 kartus (priklausomai nuo aplinkos sąlygų). Bet jei kokybiškas ryšys užtikrinamas naudojant `Off` padėtį, rekomenduojama ją ir naudoti. `On` padėtyje mažėja sistemos veikimo greitis.

    **PASTABA:** iO8-LORA ir RF-LORA įrenginiuose `SW` jungiklio padėtys būtinai turi sutapti! Priešingu atveju radijo ryšys neveiks!

### Išorinių kontaktų paskirtis

| Gnybtas | Aprašymas                                                       |
|---------|-----------------------------------------------------------------|
| +DC     | Maitinimo gnybtas (10-26 V nuolatinės srovės teigiamas gnybtas) |
| -DC     | Maitinimo gnybtas (10-26 V nuolatinės srovės neigiamas gnybtas) |
| A       | *RS485* magistralės A kontaktas                                 |
| B       | *RS485* magistralės B kontaktas                                 |
| 1- 8    | Įėjimo/​išėjimo gnybtai                                          |
| C       | Bendras neigiamas gnybtas                                       |

### Šviesinė veikimo indikacija 

| Indikatorius | Būklė | Aprašymas |
|--------------|-------|-----------|
| NETWORK / (Tinklas) | Nešviečia | Nėra RF signalo. |
| NETWORK / (Tinklas) | Mirksi žaliai | RF signalo stiprumas nuo 0 – 10. Pakankamas 3. |
| POWER / (Maitinimas) | Nešviečia | Nėra maitinimo. |
| POWER / (Maitinimas) | Mirksi žaliai | Maitinimo įtampa yra normali. |
| POWER / (Maitinimas) | Mirksi geltona | Maitinimo įtampa yra žema (≤11.5 V). |

## Įrengimas, sujungimų schemos 

### Maitinimo šaltinio prijungimo schema 

<img alt="Prijungimo schema: maitinimo šaltinis į iO-8-LORA. +12V gnybtas jungiamas prie +DC, 0V gnybtas – prie -DC; schemoje pažymėta (+12 V)." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Įėjimų prijungimo schemos 

iO-8-LORA plokštėje yra 8 kontaktai IO1–IO8 (įėjimai) jutiklių grandinėms prijungti. Bet kurį kontaktą galima nustatyti kaip įėjimą ir priskirti zonos atributus: grandinės tipą (NO, NC, EOL, EOL_T, 3EOL, ATZ, ATZ_T); jautrumą į trumpalaikius grandinės įvykius; zonos funkciją („Delay“, „Instant“, „Instant Stay“, „Interior“, „Interior Stay“, „Fire“, „Keyswitch“, „24_hour“, „Silent“, „Silent 24h“).

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image5.webp" alt="Normaliai atviros (NO) įėjimo grandinės schema: tarp ZNx ir C pavaizduotas atviras NO kontaktas. Rezistoriaus nėra." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image6.webp" alt="Prijungimo schema: normaliai uždaros (NC) įėjimo grandinės NC kontaktas jungia ZNx su C. Rezistorius nepavaizduotas." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image7.webp" alt="Rezistorių verčių lentelė su stulpeliais RT, R1 ir R2. Šešios eilutės: 2.2k, 2.2k, 4.7k; 1k, 1k, 2.2k; 5.6k, 5.6k, 3.3k; 5.6k, 3.3k, 5.6k; 3.3k, 6.8k, 3.3k; 2.2k, 4.7k, 8.2k." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Prijungimo schema: normaliai atvira grandinė su rezistoriumi linijos gale (EOL). Tarp ZNx ir C NO kontaktas prijungtas lygiagrečiai rezistoriui R1." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Prijungimo schema: normaliai uždara grandinė su rezistoriumi linijos gale (EOL). Tarp ZNx ir C NC kontaktas ir rezistorius R1 sujungti nuosekliai." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image10.webp" alt="Prijungimo schema: normaliai uždara grandinė su rezistoriumi linijos gale ir tamperio stebėjimu (EOL_T). Nuo ZNx iki C nuosekliai eina Tamper NC kontaktas ir RT; toliau NC kontaktas prijungtas lygiagrečiai R1." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image11.webp" alt="Prijungimo schema: normaliai uždara grandinė be rezistoriaus linijos gale (ATZ). Tarp ZNx ir C nuosekliai sujungti 1 jutiklio ir 2 jutiklio gnybtai: pirmojo NC kontaktas lygiagretus R1, antrojo NC kontaktas lygiagretus R2." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image12.webp" alt="Prijungimo schema: normaliai uždara ATZ_T grandinė tarp ZNx ir C. 1 jutiklio gnybtų dalyje nuosekliai sujungti NC tamperio kontaktas ir RT, po jų – NC kontaktas, lygiagrečiai sujungtas su R1. 2 jutiklio gnybtų dalyje yra nuoseklus NC tamperio kontaktas, po jo – NC kontaktas, lygiagrečiai sujungtas su R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Prijungimo schema: normaliai uždara grandinė su rezistoriumi linijos gale ir tamperio stebėjimu (3EOL). Nuo ZNx iki C nuosekliai eina Tamper NC kontaktas ir RT, Aliarmo NC kontaktas lygiagrečiai R1, tada Antimaskingo NC kontaktas lygiagrečiai R2." src="./image13.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Relės prijungimo schema 

Nuotoliniu būdu su relės kontaktais galima valdyti (įjungti/išjungti) įvairius elektrinius prietaisus. *iO-8-LORA* plėtiklio universaliam įėjimo/išėjimo (I/O) gnybtui turi būti nustatytas išėjimo (OUT) veikimo režimas ir priskirtas veikimo tipas "Nuotolinis valdymas".

<img alt="Prijungimo schema: iO-8-LORA gnybtai AUX+ ir IOx prijungti prie relės ritės. Relės kontaktai pažymėti NC, C ir NO." src="./image14.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### iO-8-LORA plėtimo modulių prijungimo schema 

<img alt="Prijungimo schema: SP3 sujungta su RF-LORA ir iki aštuonių iO-8-LORA plėtimo modulių. SP3 AUX+ (+12 V) prijungtas prie RF-LORA +DC, AUX- – prie -DC, 485 A – prie A RS 485, 485 B – prie B RS485. RF-LORA su plėtimo moduliais palaiko bevielį ryšį iki 5000 m atstumu. Kiekvienas iO-8-LORA turi atskirą 12-26V maitinimo šaltinį, prijungtą prie +DC ir -DC." src="./image15.webp" style="display: block; margin: 1rem auto; max-width: 760px; height: auto;" />

!!! note
    Prie apsaugos centralės "FLEXi" SP3 turi būti prijungtas
    transiveris RF-LORA ir gali būti prijungti iki 8 vnt.
    iO-8-LORA bevielių plėtiklių.

## Apsaugos centralė “FLEXi” SP3

1.  Prie apsaugos centralės "FLEXi" SP3 turi būti prijungtas transiveris RF-LORA.

2.  Įjunkite maitinimą centralėi "FLEXi" SP3.

3.  Įjunkite maitinimą belaidžiui plėtikiui iO-8-LORA.

4.  Paleiskite ***TrikdisConfig**.*

5.  Prijunkite "FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio arba nuotoliniu būdu.

6.  Spustelkite programos TrikdisConfig mygtuką **Skaityti [F4]**, kad ji pateiktų esamas "FLEXi" SP3 veikimo parametrų reikšmes. Jei programa pareikalaus, iššokusiame langelyje įveskite administratoriaus arba montuotojo kodą.

7.  "**Modulių**" sąraše išsirinkite "**iO-8-LORA plėtiklis**".

8.  Lauke "**Serijos Nr.**" įrašykite iO-8-LORA serijos numerį.

<img alt="TrikdisConfig SP3 langas „Moduliai“, skirtukas „RS485 moduliai“. Pirmoje eilutėje nurodytas „iO8-LORA plėtiklis“, užpildytas „Serijos Nr.“ laukas, „Sritis“ 1 ir „Pavadinimas“ „Expander ID1“. Antroje eilutėje – „Nenaudojamas“, „Sritis“ 1 ir „Pavadinimas“ „Expander ID2“." src="./image16.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  "**Zonų įėjimo**" sąraše atlikite nustatymus plėtiklio zonoms.

<img alt="TrikdisConfig langas Zonų įėjimai. Pirmos zonos lauke Įėjimas atvertas pasirinkimų sąrašas, kuriame matomi Išjungta, SP3 I/O ir RS485 Expander įėjimai." src="./image17.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. "**PGM išėjimų**" sąraše atlikite nustatymus plėtiklio PGM išėjimams.

<img alt="TrikdisConfig SP3 langas „PGM išėjimai“, skirtukas „Išėjimai“. PGM 1 eilutės „Išėjimas“ yra BELL, o PGM 222 eilutės – „RS485 Expander ID1, IO2“. PGM 222 „Išėjimo aprašymas“ yra nuotolinis valdymas, „Impulso trukmė, s“ – 10." src="./image18.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

12. Palaukite, kol bus atlikti atnaujinimai.

13. Nuspauskite "**Atsijungti**" ir atjunkite USB kabelį.

## Saugos reikalavimai

Apsaugos signalizacijos sistemos modulius turi įrengti ir prižiūrėti kvalifikuoti specialistai.

Prieš instaliavimą prašome atidžiai perskaityti šį vadovą, kad išvengtumėte klaidų, dėl kurių galimi įrangos darbo sutrikimai ar net rimti gedimai.

Prieš jungdami bet kokius elektros kontaktus atjunkite elektros tiekimą.

Dėl bet kokių pakeitimų, modernizavimo ar remonto, kurie atlikti be gamintojo sutikimo, bus nutraukiamas teisės į garantiją galiojimas.

<img alt="Perbrauktos šiukšlių dėžės su ratukais simbolis, reiškiantis, kad gaminio negalima išmesti su buitinėmis atliekomis." src="./image2.webp" style="display: inline; height: 1.2em; vertical-align: middle;" />Įrenginys pasibaigus eksploatacijai turi būti utilizuojamas pagal vietinius galiojančius teisės aktus ir jo bei jį sudarančių komponentų negalima išmesti kaip buitinių atliekų.
