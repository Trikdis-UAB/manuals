# RF-LoRa Belaidis Plėtiklis

<div style="text-align: center;">
  <img src="./image1.webp" alt="Balto RF-LORA bevielio išplėtimo modulio korpuso vaizdas iš priekio: viršuje yra SMA antenos jungtis, matomi DATA/TROUBLE ir POWER indikatoriai bei žalia prisukama gnybtų kaladėlė, pažymėta +DC, -DC, A 485, B 485, IO1, COM, IO2, IO3, COM, IO4." width="200">
</div>

## Aprašymas

Transiveris RF-LORA su belaidžiais plėtikliais iO-LORA ir iO-8-LORA padidina apsaugos centralės "FLEXi" SP3 įėjimų ir išėjimų skaičių naudojant dvipusį belaidį RF ryšį.


Suderinamas su [SP3](../../control-panels/sp3/index.md) apsaugos centralize, [GATOR Cellular](../../gate-controllers/gator/index.md) ir [GATOR WiFi](../../gate-controllers/gator-wifi/index.md) vartų ir durų prieigos valdikliais.
Prie apsaugos centralės "FLEXi" SP3 per transiverį RF-LORA galima prijungti iki 8 modulių LORA (iO-LORA, iO-8-LORA, PB-LORA).

**Savybės**

Ryšys:

- Belaidžio ryšio veikimo atstumas tiesioginio matomumo zonoje iki 5000 m.

- Prie apsaugos centralės "*FLEXi*" *SP3* galima prijungti vieną transiverį *RF-LORA*.

- Gaminys komplektuojamas su standartine antena, tinkančia daugumoje atvejų. <u>Tais atvejais kai reikia užtikrinti kokybišką ryšį kuo didesniu atstumu, reikia naudoti anteną (AX-ANT-KIT – 433 MHz, AX-ANT01S_SF – 868 MHz) su didesniu radijo signalo stiprinimu</u>.

Prijungimas:

- Transiveris *RF-LORA* prie apsaugos centralės "*FLEXi*"* SP3* prijungiamas per RS485 šyną.
### Techniniai parametrai 

| Parametras | Aprašymas |
|----|----|
| Perdavimo dažnis | 8F modifikacija: 867-869 MHz /​ 4F modifikacija: 433,3-434,7 MHz |
| Moduliacijos tipas | LORA |
| Maitinimo įtampa | 9-26 V DC |
| Naudojama srovė | Iki 50 mA (budėjimo režime) /​ Iki 150 mA (duomenų siuntimo metu) |
| Pranešimo šifravimas | Taip |
| Veikimo atstumas atviroje erdvėje | Iki 5000 m |
| Darbo aplinkos sąlygos | Temperatūra nuo -10 °C iki +50 °C, santykinė drėgmė – iki 80%, prie +20 °C. |
| Matmenys | 62 x 82 x 25 mm |
| Svoris | 80 g |

### Transiverio elementai

<img alt="Anotuota RF-LORA išplėtimo modulio priekio ir atidaryto korpuso schema su septyniais sunumeruotais elementais: 1 – antenos SMA jungtis, 2 – DATA/TROUBLE ir POWER šviesos indikatoriai, 3 – šoninis fiksatorius, 4 – gnybtų kaladėlė, 5 – mini-USB jungtis, 6 – trumpiklis, pažymėtas SW1, 7 – mygtukas šalia antenos jungties." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

1. RF antenos SMA jungtis.
2. Šviesos indikatoriai.
3. Dangtelio nuėmimo anga.
4. Gnybtai laidų prijungimui.
5. USB Mini-B jungtis skirta programinės įrangos atnaujinimui.
6. DIP jungiklis „SW“.
7. Mygtukas „DJ1“ LORA modulių primokymo režimui įjungti/išjungti.

!!! note "DIP jungiklio „SW“ nustatymai"
    1. Radijo dažnis ("OFF" - RF1; "ON" - RF2). Skirtas radijo kanalo pakeitimui, jei esamas kanalas yra labai apkrautas.
    2. Moduliacijos pobūdis (“Off” – greita; “On” – lėta). “On” padėtis leidžia padidinti ryšio atstumą apie 2 kartus (priklauso nuo aplinkos sąlygų). Bet jei kokybiškas ryšys yra užtikrinamas naudojant “Off” padėtį, rekomenduojama ją ir naudoti.

    **PASTABA:** RF-LORA ir kitų LORA įrenginiuose „SW“ jungiklio padėtys būtinai turi sutapti! Priešingu atveju radijo ryšys neveiks!

### Išorinių kontaktų paskirtis 

| Gnybtas | Aprašymas                                                      |
|---------|----------------------------------------------------------------|
| +DC     | Maitinimo gnybtas (9-26 V nuolatinės srovės teigiamas gnybtas) |
| -DC     | Maitinimo gnybtas (9-26 V nuolatinės srovės neigiamas gnybtas) |
| A 485   | *RS485* magistralės A kontaktas                                |
| B 485   | *RS485* magistralės B kontaktas                                |
| IO1-IO4 | Nenaudojamas                                                   |
| COM     | Nenaudojamas                                                   |

### Šviesinė veikimo indikacija 

| Indikatorius | Būklė | Aprašymas |
|--------------|-------|-----------|
| DATA/TROUBLE | Mirksi/dega raudonai | Ryšio sutrikimas su moduliu |
| DATA/TROUBLE | Mirksi žalia/raudona | Modulių LORA primokymo režimas |
| DATA/TROUBLE | Užsidegė žalia 3 sek. | Primokytas LORA modulis (primokymo režime) |
| POWER | Nešviečia | Nėra maitinimo. |
| POWER | Mirksi žaliai | Maitinimo įtampa yra normali. |
| POWER | Mirksi geltona | Maitinimo įtampa yra žema (≤11.5 V). |
| POWER | Šviečia geltonai | Nėra ryšio su centrale "FLEXi" SP3 per RS485 |

## Įrengimas, sujungimų schemos 

### Tvirtinimas 

1.  Nuimkite viršutinį dangtelį.

<img alt="Dvi linijinės iliustracijos: rankos atsuktuvu atkabina korpuso šoną, tada iškelia plokštę." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 780px; height: auto;" />

2.  Išimkite plokštę iš korpuso pagrindo.

3.  Korpuso pagrindą savisriegiais pritvirtinkite pageidaujamoje vietoje.

4.  Įstatykite plokštę į korpuso pagrindą.

5.  Uždarykite viršutinį dangtį.

<img alt="Linijinė plokštės iliustracija su rodykle, nukreipta į tvirtinimo fiksatorių jos krašte; šalia atskirai pavaizduota galinė korpuso plokštelė su varžtų angomis ir tvirtinimo prie sienos plyšiu." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

### Transiverio RF-LORA prijungimas prie apsaugos centralės "FLEXi" SP3 

<img alt="Prijungimo schema: SP3 centralės gnybtai AUX+, AUX-, 485 A ir 485 B atitinkamai sujungti pažymėtomis +12V / duomenų linijomis su RF-LORA išplėtimo modulio gnybtais +DC, -DC, A RS485 ir B RS485." src="./image6.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### LORA plėtimo modulių prijungimo schema 

<img alt="Prijungimo schema: centralės SP3 gnybtai AUX+, AUX-, 485 A ir 485 B atitinkamai sujungti su transiverio RF-LORA gnybtais +DC, -DC, A RS 485 ir B RS485. RF-LORA bevieliu ryšiu iki 5000 m atstumu susietas su iO-LORA ir iO-8-LORA moduliais. Kiekvieno modulio +DC ir -DC gnybtai prijungti prie atskiro 12-26V maitinimo šaltinio." src="./image7.webp" style="display: block; margin: 1rem auto; max-width: 780px; height: auto;" />

## Konfigūracija naudojant TrikdisConfig

1.  Prie apsaugos centralės "FLEXi" SP3 turi būti prijungtas transiveris RF-LORA.

2.  Įjunkite maitinimą centralėi "FLEXi" SP3.

3.  Įjunkite maitinimą belaidžiams plėtikiams iO-LORA ir/arba iO-8-LORA.

4.  Paleiskite ***TrikdisConfig**.*

5.  Prijunkite "FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio arba nuotoliniu būdu.

6.  Spustelkite programos TrikdisConfig mygtuką **Skaityti [F4]**, kad ji pateiktų esamas "FLEXi" SP3 veikimo parametrų reikšmes. Jei programa pareikalaus, iššokusiame langelyje įveskite administratoriaus arba montuotojo kodą.

7.  "**Modulių**" sąraše išsirinkite "**iO-LORA plėtiklis**" ("**iO-8-LORA plėtiklis**")**.**

8.  Lauke "**Serijos Nr.**" įrašykite gaminio serijos numerį.

<img alt="TrikdisConfig „Moduliai“  „RS485 moduliai“. Lentelėje pateikti „iO-LORA plėtiklis“ ir „iO8-LORA plėtiklis“ bei jų „ID“, „Serijos Nr.“, „Sritis“ ir „Pavadinimas“ laukai." src="./image8.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  "**Zonų įėjimo**" sąraše atlikite nustatymus plėtiklio zonoms**.**

<img alt="" src="./image9.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. "**PGM išėjimų**" sąraše atlikite nustatymus plėtiklio PGM išėjimams**.**

<img alt="" src="./image10.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. "Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

12. Palaukite, kol bus atlikti atnaujinimai.

13. Nuspauskite "**Atsijungti**" ir atjunkite USB kabelį.

14. Suveikdinkite įėjimus ir įjunkite išėjimus, kad išbandytumėte įrenginį.

## Saugos reikalavimai

Apsaugos signalizacijos sistemos modulius turi įrengti ir prižiūrėti kvalifikuoti specialistai.

Prieš instaliavimą prašome atidžiai perskaityti šį vadovą, kad išvengtumėte klaidų, dėl kurių galimi įrangos darbo sutrikimai ar net rimti gedimai.

Prieš jungdami bet kokius elektros kontaktus atjunkite elektros tiekimą.

Dėl bet kokių pakeitimų, modernizavimo ar remonto, kurie atlikti be gamintojo sutikimo, bus nutraukiamas teisės į garantiją galiojimas.

<img alt="Perbrauktos šiukšlių dėžės su ratukais simbolis, reiškiantis, kad gaminio negalima išmesti su buitinėmis atliekomis." src="./image2.webp" style="height: 1.2em; vertical-align: middle;" />Įrenginys pasibaigus eksploatacijai turi būti utilizuojamas pagal vietinius galiojančius teisės aktus ir jo bei jį sudarančių komponentų negalima išmesti kaip buitinių atliekų.
