# iO-8 Įėjimų ir išėjimų plėtiklis

<div style="text-align: center;">
  <img src="./cover.webp" alt="Žalios iO-8 išplėtimo modulio plokštės nuotrauka: kairėje yra +DC, -DC, A, B ir AUX maitinimo gnybtai, apačioje – aštuoni sunumeruoti įėjimų ir bendrieji gnybtai, nuo 1 iki 8, su C tarp kiekvienų gretimų numerių." width="400">
</div>

Su plėtikliu iO-8 jus galite padidinti įėjimų ir išėjimu skaičių suderinamuose **TRIKDIS** įrenginiuose.

iO-8 turi 8 įėjimo/išėjimo gnybtus, kuriuos galima nustatyti kaip įėjimo arba išėjimo gnybtus.

Apsilankykite iO-8 tinklalapyje trikdis.com, kur rasite prietaiso specifikaciją ir naujausią suderintų **TRIKDIS** įrenginių sąrašą.

Suderinamas su [SP3](../../control-panels/sp3/index.md), [CG17](../../control-panels/cg17/index.md), [GT+](../../alarm-communicators/cellular/gt-plus/index.md), [GT](../../alarm-communicators/cellular/gt/index.md), [G16](../../alarm-communicators/cellular/g16/index.md), [G16T](../../alarm-communicators/cellular/g16t/index.md), [G17F](../../alarm-communicators/fire-panels/g17f/index.md), [E16](../../alarm-communicators/e16/index.md), [E16T](../../alarm-communicators/e16t/index.md), [GATOR Cellular](../../gate-controllers/gator/index.md) ir [GATOR WiFi](../../gate-controllers/gator-wifi/index.md).

**Atlikite sekančius žingsnius su iO-8, kad jį parengti darbui:**

1.  Prijunkite iO-8 prie suderinamo **TRIKDIS** įrenginio, kaip parodyta:

<img alt="Prijungimo schema: TRIKDIS įrenginio +DC, -DC, 485 A ir 485 B gnybtai keturiais lygiagrečiais laidais, pažymėtais (+12 V), sujungti su atitinkamais iO-8 modulio +DC, -DC, A ir B gnybtais." src="./image1.webp" style="display: block; margin: 1rem auto; max-width: 350px; height: auto;" />

2.  Sujunkite įėjimus, kaip parodyta:

<img alt="Prijungimo schema: iO-8 įėjimas prie NO, NC ir EOL grandinių. Normaliai atvira (NO): xIN per NO kontaktą į C. Normaliai uždara (NC): xIN per NC kontaktą į C. Normaliai uždara/atvira grandinė su rezistoriumi linijos gale (EOL): xIN per NC kontaktą į mazgą; nuo jo NO kontaktas ir 2,2k (10k) rezistorius lygiagrečiai sujungti su C." src="./image2.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

Įėjimų jungimo schemas ir rezistorių dydžius nustato pagrindinis įrenginys, prie kurio prijungtas iO-8 modulis.

3.  Sujunkite išėjimus, kaip parodyta:

<img alt="Prijungimo schema: dviejose schemose iO-8 gnybtai AUX+ ir xOUT prijungti prie relės ritės, kurios kontaktai pažymėti NC, C ir NO, ir atskirai prie nuosekliai su LED sujungto 2k2 rezistoriaus." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 530px; height: auto;" />

4.  Prijunkite USB kabelį prie pagrindinio **TRIKDIS** įrenginio ir atidarykite programą TrikdisConfig. Paspauskite **Skaityti [F4]**.

5.  Eikite į **Modulių** langą ir spustelėkite laisvą eilutę **RS485 modulių** srityje. Išskleidžiamajame sąraše pasirinkite **iO-8 plėtiklis**, kaip parodyta:

<img alt="TrikdisConfig lange pasirinkta Modulių skiltis. RS485 moduliai sąraše atvertas Modulis laukas, kuriame paryškintas pasirinkimas iO-8 plėtiklis." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

6.  Laukelyje dešinėje įveskite iO-8 serijos numerį (tik skaičius). Šį numerį rasite ant iO-8 lipduko.

7.  Išplečiamojo meniu languose **Zonų įėjimai** ir **PGM išėjimai** dabar matysite iO-8 įėjimus ir išėjimus, kuriuos galite įjungti:

    <img alt="TrikdisConfig lange pasirinkta Zonų įėjimai skiltis. Lentelės Įėjimas lauke atvertas sąrašas su Išjungta ir RS485 Expander ID1, IO1–IO8 pasirinkimais; matomų zonų Sritis reikšmė yra 1." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

Sąranka gali skirtis priklausomai nuo pagrindinio **TRIKDIS** prietaiso. Konfigūruokite **Zonų** ir **PGM išėjimų** nustatymus pagal pagrindinio įrenginio instrukciją.

8.  Nustatykite norimus nustatymus ir pabaigę paspauskite **Įrašyti [F5]** ir atjunkite USB kabelį.

9.  Suveikdinkite įėjimus ir įjunkite išėjimus, kad išbandytumėte įrenginį.
