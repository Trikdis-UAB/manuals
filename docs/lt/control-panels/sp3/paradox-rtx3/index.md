# Paradox belaidžiai įrenginiai su „FLEXi“ SP3 (RTX3)

<div style="text-align: center;">
  <img src="./image1.jpeg" alt="FLEXi SP3 and RTX3 wireless receiver" width="400">
</div>


## Apsaugos centralės programinės įrangos pakeitimas

Centralės veikimo programą reikia pakeisti į programą, kuri veikia su bevieliais Paradox firmos jutikliais. Programinės įrangos bylą galite parsisiųsti <u>kaip registruotas vartotojas</u> iš [www.trikdis.com](http://www.trikdis.com), pagal „FLEXi” SP3 parsisiuntimo sekciją.

#### Centralės modifikacijos ir programinės versijos suderinamumo lentelė

| Centralės modifikacija | Programos versija suderinama su centralės modifikacija |
|:--:|:--:|
| <img alt="" src="./image2.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_1xx1_0112.fw |
| <img alt="" src="./image4.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_3xx1_0112.fw |
| <img alt="" src="./image5.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_4xx1_0112.fw |
| <img alt="" src="./image6.png" style="width:2.437007874015748in;height:1.0984251968503937in" /> | SP3_5xx1_0112.fw |

Atlikite šiuos žingsnius įrašant veikimo programą rankiniu būdu:

1.  Paleiskite ***TrikdisConfig**.*

2.  Prijunkite „FLEXi” SP3 per USB Mini-B kabelį prie kompiuterio arba prisijunkite prie „FLEXi” SP3 nuotoliniu būdu.

3.  Parinkite gamyklinės programinės įrangos submeniu **„Programos naujinimas“**.

4.  Paspauskite gamyklinės programinės įrangos atidarymo langelį **„Atverti failą“** ir parinkite reikiamą gamyklinės programinės įrangos bylą.

5.  Paspauskite atnaujinimo mygtuką **Naujinti [F12]**.

6.  Palaukite, kol bus atlikti atnaujinimai.

7.  Paspauskite **„Atsijungti“** ir atjunkite USB kabelį.

Prie centralės prijunkite maitinimo laidus. Prijunkite belaidžių zonų išplėtimo modulį *RTX3*.

<img alt="" src="./image7.png" style="width:2.2433377077865266in;height:1.2266688538932633in" />

Į SIM kortelės laikiklį įdėkite prie mobiliojo tinklo jau priregistruotą SIM kortelę. Įjunkite maitinimą centralei. Palaukite kelias minutes. Prisijunkite su TrikdisConfig prie „FLEXi” SP3 nuotoliniu būdu. Programoje TrikdisConfig būsenos juostoje yra pateikta informacija apie įdiegtos veikimo programos versija ( 1 ). Langė **„Moduliai“**, lentelėje yra įtrauktas modulis RTX3 ( 2 ), kuris prijungtas prie centralės.

<img alt="" src="./image8.png" style="width:7.082677165354331in;height:4.05511811023622in" />

Prijungus belaidžių zonų išplėtimo modulį RTX3 „FLEXi“ SP3 gali dirbti su firmos Paradox belaidžiais jutikliais (magnetiniais kontaktais, PIR jutikliais, stiklo dūžio jutikliais(G550), dūmų jutikliais (SD360), nuotolinio valdymo pulteliais (REM2, REM25), sirenomis (SR230, SR250), klaviatūromis (K37), PGM ir zonos išplėtimo moduliu (2WPGM), kartotuvas (RPT1)).

## Belaidžių jutiklių registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą. Įdėkite baterijas į jutiklį, palaukite kol nustos mirksėti LED indikatoriai.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.

<img alt="" src="./image9.png" style="width:7.082677165354331in;height:1.7755905511811023in" />

5.  Pasirinkite primokomo jutiklio tipą: **„Jutikliai“**.

6.  Nuspauskite mygtuką **„Pradėti“**.

<img alt="" src="./image10.png" style="width:3.094488188976378in;height:1.9645669291338583in" />

7.  Trumpam nuspauskite jutiklio Tamper mygtuką.

<img alt="" src="./image11.png" style="width:3.7401574803149606in;height:2.4803149606299213in" />

8.  Palaukite kelias sekundes. Centralė aptiks jutiklį.

9.  **„UID“** numeris turi sutapti su jutiklio serijos numeriu, kuris užrašytas ant jutiklio plokštės lipduko.

10. Reikia priskirti jutikliui **„Zonos numerį“** ir **„Zonos paskirtį“**.

11. Nuspauskite **„Išsaugoti“**.

<img alt="" src="./image12.png" style="width:3.094488188976378in;height:2.838582677165354in" />

12. Naujas jutiklis įtrauktas į belaidžių įrenginių sąrašą.

13. **„UID“** numeris turi sutapti su jutiklio serijos numeriu, kuris yra užrašytas ant jutiklio plokštės lipduko.

14. Norint užbaigti belaidžių jutiklių registravimą nuspauskite **„Sustabdyti“**.

<img alt="" src="./image13.png" style="width:3.7401574803149606in;height:2.795275590551181in" />

15. Nuspauskite **„Yes“** ir jutiklis bus įrašytas į centralę „FLEXi“ SP3.

<img alt="" src="./image14.png" style="width:2.751968503937008in;height:1.2716535433070866in" />

16. **„Belaidžių“** įrenginių sąraše bus įrašytas naujas belaidis jutiklis.

<img alt="" src="./image15.png" style="width:7.082677165354331in;height:1.5669291338582678in" />

17. **„Zonų įėjimų“** lentelėje jutiklį būtina priskirti **„Sričiai“**, suteikti zonai **„Pavadinimą“**, nustatyti zonos **„Paskirtį“**.

<img alt="" src="./image16.png" style="width:7.090551181102362in;height:1.9291338582677164in" />

18. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

19. Belaidis jutiklis pilnai priregistruotas.

!!! note
    Belaidžių jutiklių ištrynimas iš „FLEXi" SP3 atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruotas **belaidis
        jutiklis**, nurodykite **„Išjungtas"** ir paspauskite
        **Įrašyti [F5]**. Belaidis jutiklis ištrintas iš „FLEXi" SP3
        atminties.
## Belaidžio valdymo pultelio registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.
5.  Pasirinkite primokomo įrenginio tipą: **„Pulteliai“**.

6.  Nuspauskite mygtuką **„Pradėti“.**

<img alt="" src="./image17.png" style="width:3.0826771653543306in;height:1.9330708661417322in" />

7.  Valdymo pultelyje turi būti įdėta baterija. Nuspauskite ir palaikykite pultelio bet kurį mygtuką, kad pultelyje užsidegtu LED indikatorius. Atleiskite mygtuką.

8.  Palaukite kelias sekundes. Centralė aptiks pultelį.

9.  **„UID“** numeris turi sutapti su pultelio serijos numeriu, kuris yra užrašytas ant korpuso.

10. Lauke **„Sritis“** nurodykite apsaugos sistemos sritį, kurią valdys (įjungs/išjungs) pultelis.

11. Lauke **„Vartotojas“** nurodykite vartotojo numerį, kuriam bus priskirtas valdymo pultelis.

12. Nuspauskite **„Išsaugoti“.**

<img alt="" src="./image18.png" style="width:3.078740157480315in;height:2.5in" />

13. Naujas pultelis įtrauktas į belaidžių įrenginių sąrašą.

14. Norint užbaigti belaidžių pultelių registravimą nuspauskite **„Sustabdyti“.**

<img alt="" src="./image19.png" style="width:3.7283464566929134in;height:2.7440944881889764in" />

15. Nuspauskite **„Yes“** ir pultelis bus įrašytas į centralę „FLEXi“ SP3.

<img alt="" src="./image20.png" style="width:2.748031496062992in;height:1.279527559055118in" />

16. Belaidis pultelis įtrauktas į belaidžių įrenginių sąrašą.
17. Pultelio klavišams 3 ir 4 galite priskirti papildomas funkcijas (Išjungti, Įjungti sritį; Tylus aliarmas; Panikos aliarmas; PGM valdymas).

<img alt="" src="./image21.png" style="width:1.6933366141732284in;height:2.06667104111986in" />

<img alt="" src="./image22.png" style="width:7.082677165354331in;height:1.5669291338582678in" />

18. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

19. Belaidis valdymo pultelis pilnai priregistruotas.

!!! note
    Belaidžio valdymo pultelio ištrynimas iš „FLEXi" SP3 atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruotas **belaidis
        pultelis**, nurodykite **„Išjungtas"** ir paspauskite
        **Įrašyti [F5]**. Belaidis jutiklis ištrintas iš „FLEXi" SP3
        atminties.
## Belaidės sirenos registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą. Įdėkite į sireną baterija.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.
5.  Pasirinkite primokomo įrenginio tipą: **„Sirenos“**.

6.  Nuspauskite mygtuką **„Pradėti“.**

<img alt="" src="./image23.png" style="width:3.0708661417322833in;height:1.9330708661417322in" />

7.  Sirenos plokštėje nuspauskite ir palaikykite 3 sekundes „**LEARN“** mygtuką, sirenoje pradės mirksėti LED blykstė. Atleiskite mygtuką.

8.  Palaukite kelias sekundes. Centralė aptiks sireną.

9.  **„UID“** numeris turi sutapti su sirenos serijos numeriu, kuris yra užrašytas ant sirenos plokštės lipduko.

10. Lauke **„Sritis“** nurodykite apsaugos sistemos sritis, kurių aktyvavimas įjungs sirenos veikimą.

11. Nuspauskite **„Išsaugoti“.**

<img alt="" src="./image24.png" style="width:3.0708661417322833in;height:2.173228346456693in" />

12. Belaidė sirena įtraukta į belaidžių įrenginių sąrašą.

13. Norint užbaigti belaidžių sirenų registravimą nuspauskite **„Sustabdyti“.**

<img alt="" src="./image25.png" style="width:3.716535433070866in;height:2.7440944881889764in" />

14. Nuspauskite **„Yes“** ir sirena bus įrašyta į centralę „FLEXi“ SP3.

<img alt="" src="./image26.png" style="width:2.7440944881889764in;height:1.2322834645669292in" />

15. Belaidė sirena įtraukta į belaidžių įrenginių sąrašą.

<img alt="" src="./image27.png" style="width:7.0875in;height:1.6562948381452318in" />

16. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

17. Belaidė sirena pilnai priregistruota.

!!! note
    Belaidės sirenos ištrynimas iš „FLEXi" SP3 atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruota **belaidė sirena**,
        nurodykite **„Išjungtas"** ir paspauskite **Įrašyti [F5]**.
        Belaidė sirena ištrinta iš „FLEXi" SP3 atminties.
## Belaidės klaviatūros registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą. Įdėkite į klaviatūrą baterijas.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.
5.  Pasirinkite primokomo įrenginio tipą: **„Klaviatūros“**.

6.  Nuspauskite mygtuką **„Pradėti“.**

<img alt="" src="./image28.png" style="width:3.0826771653543306in;height:1.9409448818897639in" />

7.  Nuspauskite kartu ir palaikykite 3 sekundes klaviatūros mygtukus <img alt="" src="./image29.png" style="width:0.12992125984251968in;height:0.14173228346456693in" /> ir [BYP]. Klaviatūra kelis kartus pyptelės. Atleiskite mygtukus.

8.  Palaukite kelias sekundes. Centralė aptiks klaviatūrą.

9.  **„UID“** numeris turi sutapti su klaviatūros serijos numeriu, kuris yra užrašytas ant klaviatūros korpuso.

10. Lauke **„Sritis“** nurodykite apsaugos sistemos sritį, kurią valdys klaviatūra.

11. Nuspauskite **„Išsaugoti“.**

<img alt="" src="./image30.png" style="width:3.078740157480315in;height:2.1653543307086616in" />

12. Belaidė klaviatūra įtraukta į belaidžių įrenginių sąrašą.

13. Norint užbaigti belaidžių klaviatūrų registravimą nuspauskite **„Sustabdyti“.**

<img alt="" src="./image31.png" style="width:3.732283464566929in;height:2.7559055118110236in" />

14. Nuspauskite **„Yes“** ir klaviatūra bus įrašyta į centralę „FLEXi“ SP3.

<img alt="" src="./image32.png" style="width:2.7559055118110236in;height:1.2322834645669292in" />

15. Belaidė klaviatūra įtraukta į belaidžių įrenginių sąrašą.

<img alt="" src="./image33.png" style="width:7.082677165354331in;height:1.5511811023622046in" />

16. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

17. Belaidė klaviatūra pilnai priregistruota.

!!! note
    Belaidės klaviatūros ištrynimas iš „FLEXi" SP3 atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruota **belaidė
        klaviatūra**, nurodykite **„Išjungtas"** ir paspauskite
        **Įrašyti [F5]**. Belaidė klaviatūra ištrinta iš „FLEXi" SP3
        atminties.
## Belaidžio dvipusio ryšio PGM modulio 2WPGM registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą. Įjunkite maitinimą belaidžiui dvipusio ryšio PGM moduliui.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.
5.  Pasirinkite primokomo įrenginio tipą: **„PGM įrenginys“**.

6.  Nuspauskite mygtuką **„Pradėti“.**

<img alt="" src="./image34.png" style="width:3.0826771653543306in;height:1.9330708661417322in" />

7.  Belaidžio dvipusio ryšio PGM modulyje nuimkite trumpiklį JP2 po kelių sekundžių uždėkite trumpiklį JP2 atgal.

8.  Palaukite kelias sekundes. Centralė aptiks modulį.

9.  **„UID“** numeris turi sutapti su modulio serijos numeriu, kuris yra užrašytas ant modulio lipduko.

10. Lauke **„Pasirinkite išėjimą“** nurodykite PGM išėjimo numerį.

11. Nuspauskite **„Išsaugoti“.**

<img alt="" src="./image35.png" style="width:3.0826771653543306in;height:2.1850393700787403in" />

12. Belaidis dvipusio ryšio bevielis PGM modulis įtrauktas į belaidžių įrenginių sąrašą.

13. Norint užbaigti belaidžių modulių **2WPGM** registravimą nuspauskite **„Sustabdyti“.**

<img alt="" src="./image36.png" style="width:3.7283464566929134in;height:2.673228346456693in" />

14. Nuspauskite **„Yes“** ir modulis **2WPGM** bus įrašytas į centralę „FLEXi“ SP3.

<img alt="" src="./image37.png" style="width:2.7598425196850394in;height:1.2440944881889764in" />

15. Belaidis modulis **2WPGM** įtrauktas į belaidžių įrenginių sąrašą.

<img alt="" src="./image38.png" style="width:7.082677165354331in;height:1.547244094488189in" />

16. PGM išėjimui galima priskirti **„Pavadinimą“**.

<img alt="" src="./image39.png" style="width:7.094488188976378in;height:1.9133858267716535in" />

17. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

18. Belaidis įrenginys **2WPGM** pilnai priregistruotas.

!!! note
    Belaidžio dvipusio ryšio PGM modulio **2WPGM** ištrynimas iš ***„FLEXi"
    SP3*** atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruotas **modulis 2WPGM**,
        nurodykite **„Išjungtas"** ir paspauskite **Įrašyti [F5]**.
        Belaidis modulis **2WPGM** ištrintas iš „FLEXi" SP3 atminties.
## Belaidžio ryšio kartotuvo RPT1 registravimas

1.  Prie centralės turi būti priregistruotas modulis RTX3.

2.  Įjunkite centralės maitinimą. Įjunkite maitinimą kartotuvui RPT1.

3.  Prisijunkite su TrikdisConfig prie centralės „FLEXi” SP3 nuotoliniu būdu.

4.  Programoje TrikdisConfig lange **„Belaidžiai“** nuspauskite **„Jutiklių primokymas“**.
5.  Pasirinkite primokomo įrenginio tipą: **„Kartotuvai“**.

6.  Nuspauskite mygtuką **„Pradėti“.**

<img alt="" src="./image40.png" style="width:3.078740157480315in;height:1.9330708661417322in" />

7.  Trumpam nuspauskite ***RPT1* „LEARN“** mygtuką.

8.  Palaukite kelias sekundes. Centralė aptiks kartotuvą RPT1.

9.  **„UID“** numeris turi sutapti su kartotuvo serijos numeriu, kuris yra užrašytas ant plokštės lipduko.

10. Norint užbaigti belaidžių kartotuvų registravimą nuspauskite **„Sustabdyti“.**

<img alt="" src="./image41.png" style="width:3.736220472440945in;height:2.7086614173228347in" />

11. Nuspauskite **„Yes“** ir RPT1 bus įrašytas į centralę „FLEXi“ SP3.

<img alt="" src="./image42.png" style="width:2.7598425196850394in;height:1.2401574803149606in" />

12. Belaidis ryšio kartotuvas RPT1 įtrauktas į belaidžių įrenginių sąrašą.

<img alt="" src="./image43.png" style="width:7.082677165354331in;height:1.5511811023622046in" />

13. Atlikus pakeitimus nuspauskite **Įrašyti [F5]**.

14. Belaidis ryšio kartotuvas pilnai priregistruotas.

!!! note
    Belaidžio ryšio kartotuvo RPT1 ištrynimas iš „FLEXi" SP3
    atminties:

    1.  Paleiskite TrikdisConfig.

    2.  Prijunkite „FLEXi" SP3 per USB Mini-B kabelį prie kompiuterio
        arba prisijunkite prie „FLEXi" SP3 nuotoliniu būdu.
        Nuspauskite mygtuką **Skaityti [F4]**.

    3.  Programoje TrikdisConfig, lango **„Belaidžiai"** lauke
        **„Įrenginio tipai"**, kur buvo priregistruotas **kartotuvas
        *RPT1***, nurodykite **„Išjungtas"** ir paspauskite
        **Įrašyti [F5]**. Belaidis kartotuvas ištrintas iš ***„FLEXi"
        SP3*** atminties.
