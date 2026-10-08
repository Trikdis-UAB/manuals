# GT+ GSM komunikatorius

<div style="text-align: center;">
  <img src="./image1.webp" alt="GT+ GSM komunikatoriaus nuotrauka: priekyje NETWORK, DATA, POWER, TROUBLE ir BAND būsenos indikatoriai, TRIKDIS logotipas ir gnybtų kaladėlė su žymomis +12/24 VDC, -12/24 VDC, TIP, RING, CLK, DATA, 1 I/O, 2 I/O, A 485, B 485." width="400">
</div>

## Aprašymas

Komunikatorius GT+ skirtas perduoti įvykių pranešimus iš centralės į CSP ir Protegus2 programėlę.

GT+ komunikatorių galima tiesiogiai prijungti prie centralės klaviatūros magistralės arba nuosekliosios magistralės (DSC, Paradox, UTC Interlogix (CADDX), Texecom, Innerrange, Honeywell) arba prie centralės telefono komunikatoriaus (kuris palaiko DTMF tonais perduodamą Contact ID ryšio protokolą).

Komunikatorius perduoda visą informaciją apie įvykius į saugos tarnybos stebėjimo pulto (CSP) imtuvą.

Komunikatorius GT+ taip pat veikia su Protegus2 programėle. Su Protegus2 vartotojai gali nuotoliniu būdu valdyti signalizaciją ir gauti pranešimus apie apsaugos sistemos įvykius. Programėlė Protegus2 suderinama su visomis įvairių gamintojų centralėmis, kuriuos palaiko GT+ komunikatorius. Komunikatorius gali perduoti pranešimus apie įvykius į saugos tarnybos centrini stebėjimo pultą (CSP) ir vienu metu dirbti su Protegus2.

**Savybės**

Komunikatorius gali būti prijungtas prie centralės duomenų magistralės arba klaviatūros magistralės arba prie centralės telefono komunikatoriaus.

Siunčia įvykius į stebėjimo pulto imtuvą:

- Siunčia įvykius į TRIKDIS programinius arba aparatūrinius imtuvus, kurie dirba su bet kuria stebėjimo programa.

- Gali siųsti įvykius į SIA DC-09 imtuvus. Priede yra kodų (Contact ID į SIA) keitimo lentelė.

- Gali siųsti įvykius į SUR-GARD imtuvus.

- Ryšio stebėjimas siunčiant PING užklausą į IP imtuvą kas 30 sekundžių (arba kitu nustatytu periodu).

- Atsarginis kanalas, kuris bus naudojamas nutrūkus ryšiui pirminiu kanalu.

- Įgalinus lygiagrečius ryšio kanalus, įvykiai bus siunčiami į du imtuvus vienu metu.

- Kai įjungta *Protegus* paslauga, įvykiai visų pirma siunčiami į CSP ir tik po to programėlės naudotojams.

Veikia su Protegus2 programėle:

- “*Push*” ir specialūs garso įspėjimai apie įvykius.

- Nuotolinis sistemos įjungimas/išjungimas.


- Nuotolinis prijungtų įrenginių valdymas (šviesų, vartų, kondicionieriaus, šildymo, pievutės laistymo ir kt.).

- Skirtingos vartotojų teisės administratoriui, instaliuotojui ir vartotojui.

**Informuoja vartotojus:**

- Vartotojus apie įvykius galima informuoti su Protegus2 programėle, su SMS žinutėmis bei skambučiu.

**Valdomi išėjimai ir įėjimai:**

- 2 universalus I/O gnybtai, kurios galima nustatyti kaip įėjimo (IN) arba išėjimo (OUT) gnybtą.

- Išėjimai valdomi su Protegus2 programėle ir SMS žinutėmis.

- Pridėkite papildomų įėjimų ir valdomų išėjimų su iO-8 plėtikliais.

**Greitai sukonfigūruojamas:**

- Nustatymai gali būti išsaugoti į failą ir greitai įrašyti į kitus komunikatorius.

- Du prieigos prie nustatymų lygiai: instaliuotojui ir CSP administratoriui.

- Nuotolinis konfigūravimas ir programinės įrangos atnaujinimas.

### Suderinamų centralių sąrašas

| Gamintojas | Modelis |
|------------|---------|
| DSC® | <u>PC585</u>, PC1404, <u>PC1565</u>, <u>PC1616</u>, <u>PC1832</u>, <u>PC1864</u>, PC5020 |
| PARADOX® | <u>SPECTRA SP4000</u>, <u>SP5500</u>, <u>SP6000</u>, <u>SP7000</u>, <u>SP65</u>, <u>SP5500+</u>, <u>SP6000+</u>, <u>SP7000+</u> |
| PARADOX® | <u>MAGELLAN MG5000</u>, <u>MG5050</u>, <u>MG5050E</u>, <u>MG5075</u>, <u>MG5050+</u> |
| PARADOX® | <u>DIGIPLEX</u> EVO48, <u>EVO192</u>, <u>EVOHD</u>, <u>EVOHD+</u> |
| PARADOX® | SPECTRA 1727, 1728, 1738 |
| PARADOX® | ESPRIT E55 |
| UTC Interlogix® | <u>NetworX (Caddx) NX-4v2</u>, <u>NX-6v2</u>, <u>NX-8v2</u>, <u>NX-8e</u> |
| Texecom® | <u>Premier 24</u>, <u>48</u>, <u>88</u>, <u>168</u>, <u>640</u> /​ <u>Premier Elite 12</u>, <u>24</u>, <u>48</u>, <u>64</u>, <u>88</u>, <u>168</u>, <u>640</u> |
| Innerrange® | Inception, Integriti |
| Honeywell® | <u>Ademco Vista-15</u>, <u>Ademco Vista-20</u>, <u>Ademco Vista-48</u> |

\***<u>Pabraukta</u>** – centralės, tiesiogiai valdomos su GT+. Tiesiogiai valdomų PARADOX centralių veikimo programos versija turi būti ne žemesnė nei V.4.

\*Kitų gamintojų centralės prie GT+ komunikatoriaus jungiasi per centralės TIP/RING gnybtus (kuris palaiko DTMF tonais perduodamą Contact ID ryšio protokolą).

### Komunikatoriaus modelio tipas

Ši instrukcija skirta 4G komunikatoriaus modeliams.

### Techniniai parametrai

| Parametras | Aprašymas |
|------------|-----------|
| Jungimas prie centralės | Nuoseklioji magistralė arba klaviatūros magistralė arba fiksuotojo ryšio gnybtai (TIP/​RING komunikatoriaus gnybtai) |
| Universalus įėjimas/​išėjimas [I/​O] | 2 vnt., nustatomas kaip įėjimas IN, kurio tipas: NC;​ NO;​ NC/​EOL;​ NO/​EOL;​ NC/​DEOL;​ NO/​DEOL. (2,2 kΩ);​ arba išėjimas OUT: atviro kolektoriaus (OC) tipas, iki 0,15 A, 30 V DC maks. /​ Galima praplėsti su iO-8 plėtikliais |
| Modem EG915U-EU /​ (Europa) | LTE FDD: B1/​B3/​B5/​B7/​B8/​B20/​B28 |
| Modem EG915U-EU /​ (Europa) | GSM: B2/​B3/​B5/​B8 |
| Modem EG915U-LA /​ (Lotynų Amerika) | LTE FDD: B2/​B3/​B4/​B5/​B7/​B8/​B28/​B66 |
| Modem EG915U-LA /​ (Lotynų Amerika) | GSM: B2/​B3/​B5/​B8 |
| Modem BG95-M5 (Cat M1) | LTE-FDD: B1/​B2/​B3/​B4/​B5/​B8/​B12/​B13/​B18/​B19/​B20/​B25/​B26/​B27/​B28/​B66/​B85 |
| Modem BG95-M5 (Cat M1) | EGPRS: 850/​900/​1800/​1900 MHz |
| Maitinimo įtampa | 10-32 V nuolatinės srovės |
| Naudojama srovė | 125 mA |
| Perdavimo protokolai | TRK8, DC-09_2007, DC-09_2012, TL150 |
| Pranešimo šifravimas | AES 128 |
| Atmintis | Iki 60 pranešimų |
| Veikimo konfigūravimas | Su kompiuterine programa TrikdisConfig nuotoliniu būdu arba lokaliai per USB-С. |
| Darbo aplinkos sąlygos | Temperatūra nuo -10 °C iki +50 °C, santykinė drėgmė – iki 80%, prie +20 °C. |
| Komunikatoriaus matmenys | 92 x 62 x 25 mm |
| Svoris | 80 g |

### Komunikatoriaus elementai

1.  GSM antenos SMA jungtis.

2.  Šviesos indikatoriai.

3.  Priekinio dangtelio atidarymo plyšys.

4.  Gnybtai laidų prijungimui.

5.  USB-C jungtis komunikatoriui programuoti.

6.  „RESET“ mygtukas.

7.  SIM kortelės laikiklis.

<img alt="GT+ komunikatoriaus elementai su numeruotomis nuorodomis. Kairėje uždarytas korpusas: 1 GSM antenos SMA jungtis, 2 šviesos indikatoriai, 3 priekinio dangtelio atidarymo plyšys. Dešinėje atidarytas korpusas su plokšte: 4 gnybtai laidų prijungimui, 5 USB-C jungtis programavimui, 6 RESET mygtukas, 7 SIM kortelės laikiklis." src="./image4.webp" style="width:4.630009842519685in;height:3.11000656167979in" />

### Išorinių kontaktų paskirtis

| Gnybtas | Aprašymas |
|---------|-----------|
| +12 /​ 24 VDC | maitinimo gnybtas (10-32 V nuolatinės srovės teigiamas gnybtas) |
| -12 /​ 24 VDC | maitinimo gnybtas (0 V nuolatinės srovės neigiamas gnybtas) |
| TIP | Gnybtas sujungiamas su apsaugos centralės TIP gnybtu |
| RING | Gnybtas sujungiamas su apsaugos centralės RING gnybtu |
| CLK | Klaviatūros arba nuosekliosios magistralės gnybtai tiesioginiam prijungimui prie centralės |
| I/​O 1 | 1as įėjimo/​išėjimo gnybtas (gamyklinis nustatymas – IN, NO grandinė) |
| I/​O 2 | 2as įėjimo/​išėjimo gnybtas (gamyklinis nustatymas – IN, NO grandinė) |
| A 485 | RS485 gnybtai skirti prijungti iO-8 įėjimų ir išėjimų plėtikliams |

### Šviesinė veikimo indikacija

| Indikatorius | Būklė | Aprašymas |
|--------------|-------|-----------|
| NETWORK | Nešviečia | Nėra ryšio su GSM tinklu. |
| NETWORK | Geltonas mirksi | Jungiasi prie GSM tinklo. |
| NETWORK | Šviečia žalia ir mirksi geltona | Komunikatorius prisijungė prie mobilaus ryšio tinklo. Pakankamas 4G mobilaus ryšio signalo stiprumas yra 3 lygis (trys geltoni sumirksėjimai). |
| DATA | Nešviečia | Nėra neišsiųstų įvykių pranešimų. |
| DATA | Šviečia žaliai | Yra neišsiųstų pranešimų. |
| DATA | Mirksi žaliai | (konfigūravimo režimas) duomenys perkeliami į komunikatorių arba iš jo. |
| POWER | Nešviečia | Nėra maitinimo. |
| POWER | Šviečia žalia | Maitinimo įtampa yra pakankama. |
| POWER | Šviečia geltona | Maitinimo įtampa yra nepakankama (≤11.5 V). |
| POWER | Šviečia žalia ir mirksi geltona | (konfigūravimo režimas) komunikatorius parengtas konfigūravimui. |
| POWER | Šviečia geltona | (konfigūravimo režimas) nėra ryšio su kompiuteriu. |
| TROUBLE | Nešviečia | Komunikatorius veikia gerai, be nesklandumų. |
| TROUBLE | 1 raudonas mirksnis | SIM kortelė neaptikta. |
| TROUBLE | 2 raudoni mirksniai | Problemos su SIM kortelės PIN kodu (neteisingas PIN kodas). |
| TROUBLE | 3 raudoni mirksniai | Programavimo problemos (nėra APN). |
| TROUBLE | 4 raudoni mirksniai | Prisijungimo prie GSM tinklo problemos. |
| TROUBLE | 5 raudoni mirksniai | Prisijungimo prie mobiliojo duomenų tinklo problemos. |
| TROUBLE | 6 raudoni mirksniai | Nėra ryšio su imtuvu. |
| TROUBLE | 7 raudoni mirksniai | Dingo ryšys su centrale. |
| TROUBLE | 8 raudoni mirksniai | Įvestas ICCID numeris nesutampa su SIM kortelės ICCID numeriu |
| TROUBLE | Mirksi raudona | (konfigūravimo režimas) atminties klaida. |
| TROUBLE | Šviečia raudona | (konfigūravimo režimas) programinės įrangos klaida. |
| BAND | 1 žalias mirksnis | Nėra ryšio |
| BAND | 2 žali mirksniai | Ryšys GSM |
| BAND | 3 žali mirksniai | Ryšys GPRS |
| BAND | 4 žali mirksniai | Ryšys EDGE |
| BAND | 5 žali mirksniai | Ryšys HSDPA, HSUPA, HSPA+, WCDMA |
| BAND | 6 žali mirksniai | Ryšys LTE TDD, LTE FDD |

### GSM komunikatoriaus GT+ panaudojimo struktūrinė schema

<img alt="GT+ panaudojimo struktūrinė schema: apsaugos centralė prijungta prie LTE komunikatoriaus. Komunikatorius per GSM siunčia skambučius ir SMS į telefoną su PROTEGUS programėle, o per LTE jungiasi prie interneto. Iš interneto PROTEGUS serveris pasiekia tą patį telefoną; dvikryptis ryšys jungia internetą su imtuvu saugos tarnybos stebėjimo pulte, iš kurio duomenys perduodami į monas ms stebėjimo programinę įrangą." src="./image5.webp" style="width:7.086614173228346in;height:3.0118110236220472in" />

!!! note "Pastaba"
    Prieš pradėdami įrengimą, įsitikinkite, kad turite:
    
    1.  USB-C tipo kabelį, reikalingas konfigūravimui.
    
    2.  Mažiausiai 4 gyslų kabelį komunikatoriaus prijungimui prie apsaugos
        centralės.
    
    3.  CRP2.4 kabelį Paradox centralių prijungimui prie nuosekliojo prievado.
    
    4.  Plokščią 2,5 mm atsuktuvą.
    
    5.  Išorinę GSM anteną, jeigu vietoje silpnas ryšys.
    
    6.  Aktyvuotą SIM kortelę (PIN kodo reikalavimas gali būti išjungtas).
    
    7.  Apsaugos centralės instrukcija, prie kurios bus jungiamas
        komunikatorius.
    
    Reikalingas medžiagas galite užsisakyti iš vietinio platintojo.
## Greitas konfigūravimas su programa *TrikdisConfig*

1.  Parsisiųskite konfigūravimo programą TrikdisConfig iš [www.trikdis.lt](http://www.trikdis.lt) (programą rasite paieškos lauke surinkę „TrikdisConfig“), ir ją įdiekite*.*

2.  Plokščiu atsuktuvu nuimkite GT+ dangtelį kaip parodyta žemiau:

    <img alt="Brėžinys, rodantis, kaip plokščiu atsuktuvu atidaryti komunikatoriaus korpusą: įkišti jį į viršutinį tarpą prie antenos ir atlenkti į išorę, tada įkišti į apatinį tarpą ir atlenkti žemyn. Atskirame vaizde parodyta USB-C jungties vieta plokštės krašte." src="./image6.webp" style="width:6.543346456692913in;height:1.7866699475065617in" />

3.  Su USB-C kabeliu sujunkite GT+ su kompiuteriu.

4.  Paleiskite TrikdisConfig. Programa automatiškai atpažins prijungtą gaminį ir atidarys GT+ konfigūravimo langą.

5.  Spustelkite programos mygtuką **Skaityti [F4]**, kad ji pateiktų esamas GT+ veikimo parametrų reikšmes. Jei atsivers administratoriaus arba instaliatoriaus kodo įvedimo reikalavimo langelis, įveskite 6 skaitmenų kodą.

Žemiau aprašome nustatymus, kuriuos reikia pakeisti, kad komunikatorius pradėtų siųsti pranešimus į Stebėjimo pultą ir kad apsaugos centralę būtų galima valdyti su Protegus2 programėle.

### Nustatymai ryšiui su Protegus2 programėle

**Lange „Centralės sąsaja“:**

<img alt="TrikdisConfig GT+_M150 langas Centralės sąsaja. Tip/Ring sąsajos lauke Komunikacijos protokolas raudonai pažymėta reikšmė 2. AUTO." src="./image7.webp" style="width:7.086614173228346in;height:1.594488188976378in" />

1.  Jei komunikatorius prijungtas prie centralės TIP/RING gnybtų, tuomet reikia nustatyti „**AUTO**“.

<img alt="TrikdisConfig langas „Centralės sąsaja“, skiltis „Data/CLK sąsaja“: pažymėtas laukas „Centralės modelis“, pasirinkta „5. PARADOX SP/MG se“; pažymėtas varnele pažymėtas laukas „Nuotolinis centralės valdymas“; pažymėtas laukas „Centralės PC download slaptažodis“. Skiltyje „Tip/Ring sąsaja“ laukas „Komunikacijos protokolas“ rodo „1. DISABLED“." src="./image8.webp" style="width:7.086614173228346in;height:1.9803149606299213in" />

Komunikatorius yra prijungtas prie centralės klaviatūros magistralės arba nuosekliosios magistralės.

2. Pasirinkite „**Centralės modelį**“, kuris bus prijungtas prie komunikatoriaus.

2.  Pažymėkite varnele „**Nuotolinis centralės valdymas“**, jei norite, kad vartotojai galėtų valdyti centralę Protegus2 programėlėje su savo klaviatūros kodu. Šis nustatymas rodomas tiesiogiai valdomoms centralėms.

3.  Paradox ir Texecom centralių tiesioginiam valdymui įveskite „**Centralės PC download slaptažodį**“. Jis turi sutapti su slaptažodžiu, kuris įvestas centralėje.

!!! note "Pastaba"
    Kad veiktų tiesioginis centralės valdymas, reikės pakeisti centralės
    nustatymus. Kaip tai padaryti aprašyta skyriuje **4 „Apsaugos centralių
    programavimas"**. Šiame skyriuje aprašyta ir kaip pakeisti centralės PC
    download/UDL slaptažodį.
**Lango „Pranešimai vartotojui“ kortelėje „PROTEGUS servisas“:**

<img alt="TrikdisConfig GT+_M150 lango Pranešimai vartotojui kortelė PROTEGUS servisas. Pažymėtas langelis Leisti prisijungti; lauke PROTEGUS Cloud prieigos kodas parodyta pavyzdinė reikšmė 123456." src="./image9.webp" style="width:7.086614173228346in;height:1.704724409448819in" />

4. Pažymėkite varnele „**Leisti prisijungti**“ prie Protegus serviso.

2.  Pakeiskite prisijungimo prie „**PROTEGUS Cloud prieigos kodą“**, jeigu norite, kad vartotojų prašytų jį suvesti pridedant sistemą Protegus2 programėlėje (gamyklinis – 123456). Svarbu: jei pakeisite kodą naudodami TrikdisConfig, turėsite jį pakeisti ir programėlėje Protegus2.

**Lange „Tinklo nustatymai“:**

<img alt="TrikdisConfig langas „Tinklo nustatymai“, kortelė „SIM1“: pažymėtas laukas „SIM kortelės PIN kodas“; pažymėtas laukas „APN“, įrašyta „internet“; pažymėti tušti laukai „DNS 1“ ir „DNS 2“." src="./image10.webp" style="width:7.086614173228346in;height:3.0196850393700787in" />

3. Įveskite „**SIM kortelės PIN kodą**“.

2.  Pakeiskite **APN** vardą. **APN** rasite SIM operatoriaus interneto puslapyje. „Internet” yra universalus ir veikia daugelio operatorių tinkluose.

3.  Gamykliškai nustatytas Google DNS serverio adresas. Nepriklausomai nuo IP nustatymų, įsitikinkite, kad DNS adresai atitinka tuos, kuriuos palaiko jūsų interneto tiekėjas.

4.  Gamykliškai nustatytas Google DNS serverio adresas. Nepriklausomai nuo IP nustatymų, įsitikinkite, kad DNS adresai atitinka tuos, kuriuos palaiko jūsų interneto tiekėjas.

Baigę konfigūravimą paspauskite mygtuką **Įrašyti [F5]** ir atjunkite USB kabelį.

!!! note "Pastaba"
    Plačiau apie kitus GT+ nustatymus TrikdisConfig žr. **6
    „TrikdisConfig langų aprašymas"**.
### Nustatymai ryšiui su Stebėjimo pultu

**Lange „Sistemos parinktys“:**

<img alt="TrikdisConfig GT+_M150 langas Sistemos parinktys. Skiltyje Pagrindinės raudonai pažymėtas laukas Objekto numeris su pavyzdine reikšme 561234." src="./image11.webp" style="width:7.086614173228346in;height:1.6023622047244095in" />

1.  Įrašykite **Objekto numerį (Nenaudokite FFFE, FFFF objekto numerių**.**)**.

<img alt="TrikdisConfig GT+_M150 langas Centralės sąsaja. Tip/Ring sąsajos lauke Komunikacijos protokolas raudonai pažymėta reikšmė 2. AUTO." src="./image12.webp" style="width:7.086614173228346in;height:1.5866141732283465in" />

1.  Jei komunikatorius prijungtas prie centralės TIP/RING gnybtų, tuomet reikia nustatyti „**AUTO**“.

<img alt="TrikdisConfig langas „Centralės sąsaja“, skiltis „Data/CLK sąsaja“: pažymėtas laukas „Centralės modelis“, pasirinkta „5. PARADOX SP/MG se“. Skiltyje „Tip/Ring sąsaja“ laukas „Komunikacijos protokolas“ rodo „1. DISABLED“." src="./image13.webp" style="width:7.086614173228346in;height:1.984251968503937in" />

2. Komunikatorius yra prijungtas prie centralės klaviatūros magistralės arba nuosekliosios magistralės. Pasirinkite „**Centralės modelį**“, kuris bus prijungtas prie komunikatoriaus.

Lange „Pranešimai į CSP“, parinkčių grupėje „Pirminis ryšio kanalas“:

<img alt="TrikdisConfig langas „Pranešimai į CSP“, kortelė „CSP nustatymai“, skiltis „Pirminis ryšio kanalas“: pažymėti laukai „Ryšio būdas“ („Išjungtas“), „Protokolas“, „Šifravimo raktas“, „Domenas arba IP“, „Prievadas“ ir „TCP ar UDP“ („TCP“). Žemiau taip pat pažymėta „Atsarginio kanalo režimas“ laukų grupė su tais pačiais nustatymais." src="./image14.webp" style="width:7.086614173228346in;height:3.374015748031496in" />

3. **Ryšio būdas** – pasirinkite **IP** ryšio būdą.

2.  **Protokolas** – pasirinkite, kuria koduote turėtų būti siunčiami pranešimai: **TRK8** (į TRIKDIS imtuvus), **DC-09_2007** arba **DC-09_2012** (į universalius imtuvus), **TL150** (į SUR-GARD imtuvus).

3.  **Šifravimo raktas** – įrašykite šifravimo raktą, kuris yra nustatytas imtuve.

4.  **Domenas arba IP** – įrašykite imtuvo domeno arba IP adresą.

5.  **Prievadas** – įrašykite imtuvo prievado (*angl. port*) numerį tinkle.

6.  **TCP arba UDP** – pasirinkite, kuriuo protokolu (TCP arba UDP) turėtų būti siunčiami pranešimai.

7.  (Rekomenduojama) Sukonfigūruokite **Atsarginio kanalo režimo** nustatymus.

**Lange „Tinklo nustatymai“:**

<img alt="TrikdisConfig langas „Tinklo nustatymai“, kortelė „SIM1“: pažymėtas laukas „SIM kortelės PIN kodas“; pažymėtas laukas „APN“, įrašyta „internet“; pažymėti tušti laukai „DNS 1“ ir „DNS 2“." src="./image15.webp" style="width:7.086614173228346in;height:3.043307086614173in" />

11. Įveskite **SIM kortelės PIN** **kodą**.

12. Pakeiskite **APN** vardą. Jį rasite SIM operatoriaus interneto puslapyje. „Internet” yra universalus ir veikia daugelio operatorių tinkluose.

13. Gamykliškai nustatytas Google DNS serverio adresas. Nepriklausomai nuo IP nustatymų, įsitikinkite, kad DNS adresai atitinka tuos, kuriuos palaiko jūsų interneto tiekėjas.

14. Gamykliškai nustatytas Google DNS serverio adresas. Nepriklausomai nuo IP nustatymų, įsitikinkite, kad DNS adresai atitinka tuos, kuriuos palaiko jūsų interneto tiekėjas.

Baigę konfigūravimą paspauskite mygtuką **Įrašyti [F5]** ir atjunkite USB kabelį.

!!! note "Pastaba"
    Plačiau apie kitus GT+ nustatymus TrikdisConfig žr. **6
    „TrikdisConfig langų aprašymas"**.
## Sujungimų schemos, įrengimas ir paleidimas veikti

### Tvirtinimas

1.  Nuimkite viršutinį dangtelį, ištraukite kontaktinių kaladėlių kištukinę dalį.

2.  Įstatykite nano-SIM kortelę.

3.  Išimkite plokštę iš korpuso pagrindo.

4.  Korpuso pagrindą savisriegiais pritvirtinkite pageidaujamoje vietoje.

5.  Įstatykite plokštę į korpuso pagrindą ir įstatykite kontaktines kaladėles.

6.  Prisukite GSM anteną.

7.  Uždarykite viršutinį dangtį.

<img alt="" src="./image16.webp" style="width:3.937007874015748in;height:2.015748031496063in" />

<img alt="Plokštės SIM kortelės laikiklio brėžinys su rodykle, rodančia nano-SIM kortelės įstatymą į laikiklį." src="./image17.webp" style="width:2.2913385826771653in;height:0.984251968503937in" />

!!! note "Pastaba"
    Įsitikinkite, kad SIM kortelė yra aktyvuota. / Įsitikinkite, kad įjungta
    mobilaus interneto paslauga, jei bus naudojama Protegus2
    programėlė arba ryšys su pultu IP kanalu. / Jei norite išvengti PIN kodo
    įvedimo TrikdisConfig, įdėkite SIM kortelę į telefoną ir išjunkite
    PIN kodo užklausos funkciją.
### Apsaugos centralių prijungimo schemos su komunikatoriumi

Sujunkite komunikatorių su centrale pagal vieną iš žemiau pateiktų prijungimo schemų.

<!-- terminal-label-note -->

!!! note "Pastaba"
    Žemiau pateiktose schemose **+DC** ir **−DC** yra komunikatoriaus gnybtai, pažymėti **+12/24 VDC** ir **−12/24 VDC**, o **A RS485** / **B RS485** yra gnybtai, pažymėti **A 485** / **B 485**.

#### DSC

<img class="wiring-diagram" alt="Prijungimo schema: DSC centralės klaviatūros magistralė prijungta prie GT+. RED jungiamas prie +DC, BLK – prie -DC, YEL – prie CLK, GRN – prie DATA." src="./wiring-dsc.webp" width="541" height="480" />

#### PARADOX

<img class="wiring-diagram" alt="Prijungimo schema: PARADOX centralės nuoseklusis jungtis prijungta prie GT+ atskirai užsakomu kabeliu EX-CRP2.4. R (raudonas) laidas jungiamas prie +DC, B (juodas) – prie -DC, Y (geltonas) – prie CLK, G (žalias) – prie DATA." src="./wiring-paradox.webp" width="650" height="480" />

#### CADDX

<img class="wiring-diagram" alt="Prijungimo schema: CADDX centralės klaviatūros magistralė prijungta prie GT+. POS jungiamas prie +DC, COM – prie -DC, DATA – prie DATA; TIP, RING ir CLK neprijungti." src="./wiring-caddx.webp" width="535" height="479" />

#### TEXECOM

<img class="wiring-diagram" alt="Prijungimo schema: TEXECOM centralės nuoseklusis jungtis prijungta prie GT+ atskirai užsakomu kabeliu EX-CRP4. R (raudonas) laidas jungiamas prie +DC, B (juodas) – prie -DC, BL (mėlynas) – prie CLK, W (baltas) – prie DATA." src="./wiring-texecom.webp" width="661" height="479" />

#### INNERRANGE INCEPTION

<img class="wiring-diagram" alt="Prijungimo schema: INNERRANGE INCEPTION centralė prijungta prie GT+. VOUT + (+12V) jungiamas prie +DC, VOUT 0V – prie -DC; iš centralės USB jungties per USB kabelį juodas laidas jungiamas prie 0V/-DC linijos, žalias – prie CLK, baltas – prie DATA." src="./wiring-innerrange-inception.webp" width="634" height="459" />

#### INNERRANGE INTEGRITI

<img class="wiring-diagram" alt="Prijungimo schema: Innerrange Integriti Port 0 prijungtas prie GT+ Inner Range kabeliu, kodas INTG-996795. +DET (+13V) prijungtas prie +DC, GND 5 – prie -DC, Rx 3 – prie CLK, Tx 2 – prie DATA." src="./wiring-innerrange-integriti.webp" width="563" height="459" />

#### Honeywell Vista-15, Vista-20, Vista-48

<img class="wiring-diagram" alt="Prijungimo schema: Honeywell Vista-15, Vista-20, Vista-48 centralės klaviatūros magistralė prijungta prie GT+. Gnybtas 5 prijungtas prie +DC (+12V), gnybtas 4 – prie -DC, gnybtas 7 – prie CLK, gnybtas 6 – prie DATA." src="./wiring-honeywell-vista.webp" width="575" height="479" />

#### Centralė (telefoninis komunikatorius, TIP/RING)

<img class="wiring-diagram" alt="Prijungimo schema: centralė prijungta prie GT+. +AUX prijungtas prie +DC (+12 V), -AUX – prie -DC, TIP – prie TIP, RING – prie RING (telefoninio komunikatoriaus gnybtai)." src="./wiring-control-panel-tip-ring.webp" width="675" height="479" />

### Komunikatoriaus prijungimo schema su PARADOX SP/SP+/MG/MG+ centralemis prie klaviatūros magistralės ir centralės telefono komunikatoriaus (TIP/RING gnybtų)

<img alt="Prijungimo schema: PARADOX SP/SP+/MG/MG+ centralė prie GT+. Klaviatūros magistralė: +AUX (+12V) į + DC, -AUX į - DC, GRN į DATA, YEL į CLK. Telefoninio komunikatoriaus gnybtai: TIP į TIP, RING į RING. Susikertantys laidai ties susikirtimais nesujungti." src="./image23.webp" style="width:3.4766732283464568in;height:2.746672134733158in" />

Kai komunikatorius prijungtas prie centralės klaviatūros magistralės ir TIP/RING gnybtų, tuomet GT+ reikia nustatyti:

1.  Pasirinkite „**AUTO**“.

2.  Pasirinkite „**7. Paradox SP+/MG+ series KeyBus**“ apsaugos centralės modelį.

3.  Pasirinkite „**Nuotolinis centralės valdymas**“, jei norite, kad vartotojai galėtų valdyti centralę su programėle Protegus2 naudodami savo klaviatūros kodą.

4.  Norėdami tiesiogiai valdyti centralę, įveskite „**Centralės PC download slaptažodį**“. Jis turi sutapti su slaptažodžiu, įvestu centralėje.

<img alt="TrikdisConfig langas „Centralės sąsaja“: pažymėtas laukas „Komunikacijos protokolas“, pasirinkta „2. AUTO“; pažymėtas laukas „Centralės modelis“, kuriame matoma „5. PARADOX SP/MG se“; pažymėtas pasirinkimas „Nuotolinis centralės valdymas“ su varnele; pažymėtas laukas „Centralės PC download slaptažodis“." src="./image24.webp" style="width:7.086614173228346in;height:1.984251968503937in" />

Centralė Paradox turi būti užprogramuota perduoti pranešimus stebėjimo pultui ir nuotoliniam valdymui iš Protegus2.

| **Ląstelė** |   **Duomenys**   | **Ląstelė** | **Duomenys** |
|:-----------:|:----------------:|:-----------:|:------------:|
|     801     | \*\*\*\*\*\*\*\* |     815     |    123456    |
|     811     |       1111       |     911     |     1234     |
|     812     |       2222       |             |              |

### GT+ prijungimo schema prie centralės jungiklio (angl. keyswitch) zonos

Vadovaukitės šia schema, jei apsaugos centralė bus valdoma su GT+ PGM išėjimu įjungiant/išjungiant centralės jungiklio (angl. keyswitch) zoną.

!!! note "Pastaba"
    GT+ komunikatorius turi 2 universalius įėjimo/išėjimo gnybtus,
    kuriems galima nustatyti išėjimo OUT (PGM) veikimo režimą. Išėjimai gali
    valdyti dvi apsaugos sistemos sritis. Valdant šiuo būdu,
    TrikdisConfig lange „**Centralės sąsaja**" turi būti nuimta
    varnelė prie „**Nuotolinis centralės valdymas"**. Programėlėje
    Protegus2 reikia padaryti nustatymus, kurie aprašyti
    p. 5.2 „Papildomi nustatymai sistemos įjungimui/išjungimui su jungiklio
    zoną".
Komunikatorius prijungtas prie centralės klaviatūros magistralės arba nuosekliosios magistralės. / Apsaugos įjungimas/išjungimas per jungiklio zoną

<img alt="Prijungimo schema: centralė prie GT+. Klaviatūros magistralė arba nuoseklioji jungtis: RED (+12V) į + DC, BLK į - DC, YEL į CLK, GRN į DATA. Zona (įjungimo raktas): 1-a Sritis į 1 I/O, 2-a Sritis į 2 I/O." src="./image25.webp" style="width:3.5033409886264217in;height:2.5866721347331585in" />

Komunikatorius yra prijungtas prie centralės telefono komunikatoriaus (TIP/RING gnybtų). / Apsaugos įjungimas / išjungimas per jungiklio zoną.

<img alt="Prijungimo schema: centralė prie GT+. Maitinimas: +AUX (+12 V) į + DC, -AUX į - DC. Telefoninio komunikatoriaus gnybtai: TIP į TIP, RING į RING. Zona (įjungimo raktas): 1-a Sritis į 1 I/O, 2-a Sritis į 2 I/O." src="./image26.webp" style="width:3.7433409886264215in;height:2.533338801399825in" />

### Įėjimo prijungimo schemos

Komunikatorius turi 2 universalius įėjimo/išėjimo gnybtus, kuriems galima nustatyti įėjimo IN veikimo režimą. Prie įėjimo gnybto galima prijungti NC, NO, NO/EOL, NC/EOL, NO/DEOL, NC/DEOL tipo grandines. Gamyklinis nustatymas: ; **I/O 1** įėjimo nustatymas – NO; **I/O 2** įėjimo nustatymas – NO. Kitą įėjimo tipą galima nustatyti TrikdisConfig lange „**IN/OUT**“ **-> Tipas**.

NC, NO, NO/EOL, NC/EOL, NO/DEOL, NC/DEOL tipo grandinių laidinių sujungimų schemos:

<img alt="Trys įėjimo grandinės tarp COM ir INx. Normaliai atvira (NO): NO kontaktas; Short – Alarm, Open – Restore. Normaliai uždara (NC): NC kontaktas; Short – Restore, Open – Alarm. NC/EOL 2,2k: NC kontaktas ir nuoseklus 2,2k rezistorius linijos gale; Short – Alarm, Open – Alarm, 2,2k – Restore." src="./image27.webp" style="width:4.921259842519685in;height:1.5590551181102361in" />

<img alt="Trys įėjimo grandinės tarp COM ir INx. NO/EOL 2,2k: rezistorius lygiagrečiai NO kontaktui; Short – Alarm, Open – Alarm, 2,2k – Restore. NO/DEOL: Tamper kontaktas ir nuoseklus 2,2k rezistorius, o kitas 2,2k rezistorius lygiagrečiai NO kontaktui; Short – Tamper, Open – Tamper, 2,2k – Alarm, 3,3k–5,5k – Restore. NC/DEOL: tokia pati rezistorių jungtis su NC kontaktu; Short – Tamper, Open – Tamper, 2,2k – Restore, 3,3k–5,5k – Alarm." src="./image28.webp" style="width:4.921259842519685in;height:1.905511811023622in" />

!!! note "Pastaba"
    Jei reikia, kad komunikatorius turėtų daugiau įėjimų IN arba išėjimų
    OUT, prijunkite TRIKDIS iO-8 įėjimų ir išėjimų plėtiklį.
### Relės prijungimo schema

Nuotoliniu būdu su relės kontaktais galima valdyti (įjungti/išjungti) įvairius elektrinius prietaisus. Komunikatoriaus universaliam įėjimo/išėjimo gnybtui turi būti nustatytas išėjimo „OUT“ veikimo režimas.

<img alt="Prijungimo schema: GT+ gnybtai +DC ir x I/O prijungti prie relės ritės; relės kontaktai pažymėti NC, C ir NO." src="./image29.webp" style="width:2.3300043744531935in;height:0.9100021872265966in" />

### iO-8 plėtimo modulių prijungimo schema

Jei reikia, kad komunikatorius turėtų daugiau įėjimų IN arba išėjimų OUT, prijunkite laidinį TRIKDIS *iO-8* įėjimų ir išėjimų plėtiklį. *GT+* konfigūravimas su plėtimo moduliais aprašytas p. 6.8. „Langas „RS485 moduliai“.

<img alt="Prijungimo schema: centralė prie GT+ komunikatoriaus ir iO-8 plėtimo modulio. Maitinimas: centralės +AUX (+12 V) į abiejų įrenginių +DC, -AUX į abiejų -DC. RS485: GT+ A RS485 į iO-8 A (RS485), GT+ B RS485 į iO-8 B (RS485)." src="./image30.webp" style="width:3.35000656167979in;height:2.05667104111986in" />

### Komunikatoriaus paleidimas veikti

Norint paleisti veikti komunikatorių, reikia įjungti apsaugos centralės maitinimo šaltinį. Turi užsidegti ši GT+ komunikatoriaus šviesinė indikacija:

- Diodas „POWER“ turi šviesti žaliai (pakankama maitinimo įtampa);

- Diodas „NETWORK“ turi šviesti žaliai ir mirksi geltonai, kai prisiregistravęs prie mobilaus ryšio tinklo.

!!! note "Pastaba"
    Pakankamas 4G signalo lygis - 3 (trys „NETWORK" indikatoriaus geltoni
    mirksniai). / Jeigu suskaičiuojate mažiau geltonų „NETWORK" diodo
    mirksnių, tai GSM signalo lygis nepakankamas. Rekomenduojame arba
    pasirinkti kitą komunikatoriaus įrengimo vietą, arba naudoti jautresnę
    GSM anteną. / Jei šviesinė indikacija kitokia, kad nustatytumėte, kas
    nutikę žiūrėkite skyrių **1.6 „Šviesinė veikimo indikacija".** / Jei
    GT+ indikacija visai nešviečia, patikrinkite maitinimo šaltinį ir
    sujungimus.
## Apsaugos centralių programavimas

### Apsaugos centralių programavimas kai komunikatorius prijungtas prie klaviatūros arba nuosekliosios magistralės

Žemiau aprašome, kaip reikia programuoti apsaugos centrales, kad komunikatorius GT+ galėtų nuskaityti centralės pranešimus ir ją tiesiogiai valdyti nuotoliniu būdu.

Jei norite įgalinti nuotolinį centralės valdymą, įsitikinkite, kad yra uždėta varnelė prie „**Nuotolinis centralės valdymas**“ TrikdisConfig lange **Langas „Sistemos parinktys**“.

#### DSC

DSC centralių programuoti nereikia.

#### PARADOX

Paradox centrales reikia programuoti tik tiesioginiam valdymui su Protegus2. Pranešimų nuskaitymui Paradox centralių programuoti nereikia.

Nuotoliniam Paradox centralių valdymui reikia nustatyti PC prisijungimo slaptažodį (angl. „*PC download password*“). Šis slaptažodis turi sutapti su slaptažodžiu, kurį nustatėte TrikdisConfig lange **Langas „Sistemos parinktys“** uždėjus varnelę „**Nuotolinis centralės valdymas**“ atsiradusiame lauke.

Norėdami nustatyti šį slaptažodį, su prie apsaugos centralės prijungta klaviatūrą:

- MAGELLAN, SPECTRA serijose: eikite į ląstelę 911 ir įveskite 4 skaičių PC prisijungimo slaptažodį.

- DIGIPLEX EVO serijai: eikite į ląstelę 3012 ir įveskite 4 skaičių PC prisijungimo slaptažodį.


#### TEXECOM

Texecom centrales reikia programuoti tiek pranešimų nuskaitymui, tiek ir nuotoliniam valdymui.

Reikia nustatyti Texecom centralės **UDL** **passcode**. Šis slaptažodis turi sutapti su slaptažodžiu, kurį nustatėte TrikdisConfig lange **Langas „Sistemos parinktys“** uždėjus varnelę „**Nuotolinis centralės valdymas**“ atsiradusiame lauke.

Centralę galite programuoti su Texecom programine įranga Wintex. Įveskite „**UDL passcode**“ (4 skaičių kodas) lange „**Communication Option**“, skirtuke „**Options**“.

Taip pat galite programuoti ir su prie apsaugos centralės prijungta klaviatūra:

1.  Įveskite 4 skaitmenų instaliuotojo kodą ir paspauskite [Menu] mygtuką, kad įeitumėte į programavimo meniu.

2.  Iškart po to paspauskite mygtuką [9].

3.  Paspauskite [7][6], ir tada [2]. Įveskite 4 skaitmenų “**UDL** **passcode**“ („**UDL passcode**“ turi sutapti su GT+ komunikatoriaus „**PC prisijungimo slaptažodžiu**“).

4.  Paspauskite [Yes] ir išeikite iš programavimo rėžimo paspaudę [Menu].

#### UTC INTERLOGIX(CADDX)

Prie centralės prijungtoje klaviatūroje:

1.  Paspauskite [\*][8] ir įveskite instaliuotojo kodą (gamyklinis 9713).

2.  Įveskite įrenginio numerį, kuris priskirtas prijungtam komunikatoriui (gamyklinis – 0).

3.  Nustatykite žemiau kiekvienoje eilutėje nurodytus nustatymus. Iš eilės paspauskite vietos, segmento skaičius ir įveskite reikiamą nustatymą. Paspaudus [\*] (žvaigždutę) jus sugrąžins į vietos įvedimo lauką.

| Vieta | Segmentas | Nustatymas |
|-------|-----------|------------|
| 23 | 3 | 12345678 |
| 37 (nebūtina) | 3 | 12345678 |
| 37 (nebūtina) | 4 | 1234567* |
| 90 | 3 | 12345678 |
| 93 | 3 | 12345678 |
| 96 | 3 | 12345678 |
| 99 | 3 | 12345678 |
| 102 | 3 | 12345678 |
| 105 | 3 | 12345678 |
| 108 | 3 | 12345678 |

Suprogramavę visus nurodytus laukus, paspauskite [Exit] du kartus, kad išeitumėte iš programavimo režimo.

#### INNERRANGE

**Innerrange Inception** centralės programinės įrangos versija turi būti **2.3.0.3507-r0** arba aukštesnė.

Centralę turi būti prijungta prie interneto. Prisijunkite prie **Innerrange Inception** centralės surinkę: <https://skytunnel.com.au/inception/SERIALNUMBER>, kur SERIALNUMBER – įvedamas valdiklio serijinis numeris, kuris nurodytas ant centralės korpuso.

Atidarykite langus **Configuration>General>Alarm Reporting**. Parinkčių grupėje **3rd Party Device Reporting** reikia nustatyti:

<img alt="Inception programos langas Alarm Reporting, skiltis 3rd Party Device Configuration. Pažymėta: 1 – įjungtas Enable 3rd Party Device Reporting; 2 – 3rd Party Device Type nustatyta Trikdis; 3 – Serial Port nustatyta Serial Port 1 (Plugged In, In Use By 3rd Party Device)." src="./image31.webp" style="width:6.625984251968504in;height:3.2125984251968505in" />

1.  **Enable 3rd Party Device Reporting** – pažymėti šį lauką.

2.  **3rd Party Device Type** – nustatyti „Trikdis“.

3.  **Serial port** – nustatyti „Serial Port 1 (Plugged In, In Use By 3rd Party Device)“.

4.  Išsaugoti nustatymus ir išeiti iš programos.

#### HONEYWELL ADEMCO VISTA

Programavimas skirtas centralėms **Honeywell Ademco Vista-20** ir **Honeywell Ademco Vista-48**. **Centralės veikimo programos versija turi būti ne žemesnė nei V5.3**. Prie centralės prijungtoje klaviatūroje:

1.  Įeiti į programavimo režimą. Įveskite instaliuotojo kodą [4] [1] [1] [2] ir po to [8] [0] [0] . Arba įjunkite centralės maitinimą. 50 sek. bėgyje, po maitinimo įjungimo, nuspauskite kartu mygtukus [\*] ir [#] (šis metodas taikomas, kai buvo išeita iš programavimo režimo nuspaudžiant klaviatūroje [\*][9][8] ).

2.  Įjunkite CID siuntimą per LRR. Klaviatūroje nuspauskite [\*][2][9][1][#] .

3.  Naudojant „**Nuotolinis centralės valdymas**“ funkcija, leiskite naudoti 2-ą AUI adresą. Klaviatūroje nuspauskite [\*][1][8][9][1][1][#] .

4.  Išeikite iš programavimo režimo. Klaviatūroje nuspauskite [\*][9][9] .

### Apsaugos centralių programavimas kai komunikatorius prijungtas prie centralės gnybtų TIP/RING

Kad apsaugos centralė siųstų įvykius per telefoninį komunikatorių, jis turi būti įjungtas ir tinkamai sukonfigūruotas. Vadovaudamiesi tam tikros apsaugos centralės programavimo vadovu, nustatykite centralės telefoninį komunikatorių:

1.  Įjunkite centralės PSTN telefoninį komunikatorių.

2.  Įveskite pulto imtuvo telefono numerį (galite naudoti bet kokį ne trumpesnį nei 4 skaitmenų skaičių. GT+ atsilieps centralei skambinant bet kuriuo numeriu).

3.  Pasirinkite DTMF režimą.

4.  Pasirinkite Contact ID ryšio formatą.

5.  Įveskite centralės 4 skaitmenų objekto numerį.

Nustatykite centralės zonos, prie kurios prijungtas GT+ išėjimas OUT, tipą į jungiklio (angl. keyswitch) zoną apsaugos centralei įjungti/išjungti nuotoliniu būdu.

!!! note "Pastaba"
    Jungiklio zonos tipas gali būti impulsas arba lygis. GT+ valdomas
    išėjimas OUT numatytai veiks 3 sekundžių impulsiniu režimu. Galite
    pakeisti impulso trukmę arba pakeisti išėjimo režimą į lygis
    Protegus2 nustatymuose. Žr. skyrių 5.2 „Papildomi nustatymai
    sistemos įjungimui/išjungimui su jungiklio zoną".
**Honeywell Vista centralės telefoninio komunikatoriaus programavimas**

Naudodami centralės klaviatūrą, eikite į nurodytas sekcijas ir nustatykite jas taip, kaip nurodyta:

- \*41 - įveskite pulto imtuvo telefono numerį;

- \*43 - įveskite centralės objekto numerį;

- \*47 - nustatykite Toninį rinkimą į [1] ir įveskite numerio rinkimo bandymų kartų skaičių;

- \*48 – Contact ID. Naudojamas numatytasis nustatymas, \*48 turi būti nustatyta 7;

- \*49 - Split / Dual pranešimas. \*49, turi būti nustatyta 5;

- \*50 – Pranešimo apie įsilaužimą siuntimo delsa (neprivaloma). Numatytoji reikšmė yra [2,0], dėl kurios 30 sekundžių bus uždelstas pranešimo apie įvykį siuntimas. Jei norite, kad pranešimas apie įvykį būtų išsiųstas nedelsiant, nustatykite [0,0].

**Išeiti iš programavimo režimo**.

Kai visi reikalingi nustatymai padaryti būtina išeiti iš programavimo režimo. Klaviatūroje surinkite [\*][9][9].

**"Honeywell Vista 48" centralės specialieji nustatymai**

Jei norite naudoti GT+ su "**Honeywell Vista 48**" centrale, atlikite toliau nurodytus nustatymus, kaip nurodyta lentelėje:

| **Skyrius** | **Duomenys** | **Skyrius** | **Duomenys** | **Skyrius** | **Duomenys** |
|:--:|----|:--:|:--:|:--:|:--:|
| \*41 | 1111 (imtuvo telefono numeris) | \*60 | 1 | \*69 | 1 |
| \*42 | 1111 | \*61 | 1 | \*70 | 1 |
| \*43 | 1234 (centralės objekto numeris) | \*62 | 1 | \*71 | 1 |
| \*44 | 1234 | \*63 | 1 | \*72 | 1 |
| \*45 | 1111 | \*64 | 1 | \*73 | 1 |
| \*47 | 1 | \*65 | 1 | \*74 | 1 |
| \*48 | 7 | \*66 | 1 | \*75 | 1 |
| \*50 | 1 | \*67 | 1 | \*76 | 1 |
| \*59 | 0 | \*68 | 1 |  |  |

Kai visi reikalingi nustatymai padaryti, būtina išeiti iš programavimo režimo. Klaviatūroje surinkite [\*][9][9].

#### UTC INTERLOGIX(CADDX)

Centralės **Interlogix NX-4V2 (NX-6V2, NX-8V2)** programavimas, kai komunikatorius prijungtas prie centralės TIP/RING gnybtų.

|  | Klaviatūros įvestis | Aprašymas |
|--|---------------------|-----------|
|  | *89713 | Įeikite į programavimo režimą |
|  | 0# |  |
| Location 0 | 0# |  |
| Location 0 | 1*2*3*4*# |  |
| Location 1 | 1# |  |
| Location 1 | 1*2*3*4*# |  |
| Location 2 | 2# |  |
| Location 2 | 1*# |  |
| Location 4 | 4# | Visų zonų LED dega (segment 1) |
| Location 4 | 12345678* | Visų zonų LED dega (segment 2) |
| Location 4 | 12345678*# |  |
| Location 23 | 23# | Visų zonų LED dega (segment 3) |
| Location 23 | ** | Visų zonų LED dega (segment 3) |
| Location 23 | 12345678*# | Visų zonų LED dega (segment 3) |
| Location 37 | 37# | Visų zonų LED dega (segment 3) |
| Location 37 | ** | Visų zonų LED dega (segment 4) |
| Location 37 | 12345678* |  |
| Location 37 | 12345678*# |  |
|  | EXIT EXIT | Išeikite iš programavimo režimo |

## Nuotolinis valdymas

### Apsaugos sistemos pridėjimas Protegus2 programėlėje

Su Protegus2 vartotojai galės valdyti savo apsaugos sistemą nuotoliniu būdu. Jie taip pat matys sistemos būseną ir gaus pranešimus apie sistemos įvykius.

1.  Parsisiųskite ir paleiskite Protegus2 programėlę arba naudokite versiją naršyklėje [www.protegus.app](https://www.protegus.app):

    <div style="margin: 20px 0; text-align: center;">
      <a href="https://play.google.com/store/apps/details?id=lt.apps.protegus2" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-android.webp" alt="Get it on Google Play" style="height:50px;">
      </a>
      <a href="https://www.protegus.app" target="_blank" style="display: inline-block; margin-right: 10px;">
        <img src="./protegus-web.webp" alt="Open Web App" style="height:50px;">
      </a>
      <a href="https://apps.apple.com/us/app/protegus-2/id1555450252" target="_blank" style="display: inline-block;">
        <img src="./protegus-ios.webp" alt="Download on the App Store" style="height:50px;">
      </a>
    </div>

2.  Registruokitės ir susikurkite naują paskyrą arba prisijunkite savo vartotojo vardu ir slaptažodžiu.

!!! note "Pastaba"
    Pridėjimo prie Protegus2 metu GT+ turi būti:
    
    1.  Įstatyta aktyvuota SIM kortelė ir įvestas arba išjungtas PIN kodas;
    
    2.  Įjungta „Protegus servisas" paslauga. Žr. **6.5 Langas
        „Pranešimai vartotojui"**;
    
    3.  Įjungtas maitinimas („POWER" LED šviečia žaliai);
    
    4.  Prisiregistravęs prie tinklo („NETWORK" LED šviečia žaliai ir mirksi
        geltonai).
3. Paspauskite “**Pridėti sistemą**” ir įveskite GT+ „IMEI/Unikalus ID“ numerį. Jį rasite ant gaminio ir pakuotės lipduko. Įvedę, paspauskite „**Toliau**“.

<img alt="Protegus2 ekranas „Nuskaityti QR kodą“: įveskite IMEI į lauką „Unikalus ID“ arba spauskite „Nuskaityti QR kodą“. Paaiškinime nurodyta, kad kodą galima rasti ant pakuotės, valdiklio plokštės arba programoje TrikdisConfig kaip Unikalų ID; apačioje yra „Toliau“." src="./image35.webp" style="width:3.0in;height:3.673228346456693in" />

4. Įveskite sistemos „**Pavadinimą**“. Spustelėkite „**Toliau**".

<img alt="Protegus2 langas Pridėti sistemą: Pavadinimas – GT+, Fonas – mėlynas, Laiko juosta – Europe/Vilnius. Apačioje mygtukai Atšaukti ir Toliau." src="./image36.webp" style="width:2.220472440944882in;height:2.263779527559055in" />

### Papildomi nustatymai sistemos įjungimui/išjungimui su jungiklio zoną

!!! note "Pastaba"
    Centralės zonai, prie kurios prijungtas GT+ išėjimas OUT, turi
    būti nustatytas zonos tipas - jungiklis (angl. keyswitch).
Sekite nurodymus žemiau, jei apsaugos centralė bus valdoma su GT+ PGM išėjimu įjungiant/išjungiant centralės jungiklio (angl. keyswitch) zoną.

1.  Paspauskite „**Tęsti**“.

<img alt="Protegus2 pranešimas „Sistema nėra valdoma nuotoliniu būdu“. Paaiškinime nurodyta prijungti išvestį prie apsaugos sistemos įvesties terminalo ir sukonfigūruoti Protegus2 Europe, kad būtų galima įjungti arba išjungti apsaugos sistemą; apačioje yra „Tęsti“." src="./image37.webp" style="width:2.220472440944882in;height:3.559055118110236in" />

2. Įveskite „**Srities pavadinimas**“. Įgalinkite PGM išėjimo valdymą naudodami Protegus2 programą.

2.  Pasirinkite "**Impulsas**" arba "**Lygis**", priklausomai nuo to, kaip sukonfigūruotas centralės jungiklio zonos tipas. Jei reikia, galite pakeisti „**Impulso**“ intervalą.
3. Paspauskite „**Išsaugoti**“.

<img alt="Protegus2 ekranas „Pridėti naują sritį“: srities numeris 1, pavadinimas „Sritis1“, įjungta „Valdyti naudojant Protegus2 Europe“, priskirtas išėjimas PGM1. Pasirinktas „Impulsas“, jo trukmė 3 sekundės; apačioje yra „Išsaugoti“." src="./image38.webp" style="width:2.220472440944882in;height:3.4960629921259843in" />

4. Jei apsaugos sistemoje yra kita sritis, tuomet reikia spustelėti „**Spustelėkite, kad pridėtumėte sritį**“. PGM išvesties nustatymas yra panašus į aprašytą aukščiau.

2.  Atlikę nustatymus, spustelėkite mygtuką „**Praleisti**“.

<img alt="Protegus2 ekranas „Sritys“: pridėta „Sritis1“, valdoma su PGM1. Po sričių sąrašu yra pridėjimo mygtukas su pliusu, o apačioje – „Praleisti“ ir „Toliau“." src="./image39.webp" style="width:2.220472440944882in;height:2.031496062992126in" />

### Sistemos įjungimas/išjungimas su *Protegus2*

1.  Pagrindiniame lange spustelėkite būsenos piktogramą „Išjungti“.
1.  *Protegus2* gaus pranešimą apie pasikeitusią apsaugos sistemos būseną ir būsenos piktograma pakeis jos būseną.

<img alt="Protegus2 programėlės GT+ pagrindinis langas: rodoma būsena „Prijungtas“. Skiltyje „Sritis1“ rodoma būsena „Nežinoma“ ir mygtukai „Įjungti“ bei „Išjungti“; apačioje yra PGM2 išėjimo valdymo mygtukas." src="./image40.webp" style="width:2.220472440944882in;height:2.7125984251968505in" />

### Komunikatoriaus valdymas SMS žinutėmis

Komunikatorių nuotoliniu būdu galima valdyti SMS pranešimais.

SMS pranešimo struktūra: Slaptažodis `[tarpas]` Komanda `[tarpas]` Duomenys

Kaip slaptažodį naudokite **Administratoriaus kodą** (gali įvykdyti *INFO, RESET, OUTPUTx* komandas) arba **Instaliatoriaus kodą** (gali įvykdyti *INFO, OUTPUTx* komandas).

#### SMS komandų sąrašas

| Komanda | Duomenys | Aprašymas |
|---------|----------|-----------|
| INFO |  | Informacijos apie įrenginį užklausa. Į atsakymą bus įtraukti: įrenginio tipas, IMEI numeris, serijos numeris ir programinės įrangos versija. Pvz.: 123456 INFO |
| RESET |  | Prietaiso paleidimas veikti iš naujo. Pvz.: 123456 RESET |
| OUTPUTx | ON | x – GT+ išėjimo numeris (1, 2) |
| OUTPUTx | OFF | Įjungti išėjimą OUTPUT1. Pvz.: 123456 OUTPUT1 ON |
| OUTPUTx | PULSE=tttt | Išjungti išėjimą OUTPUT1. Pvz.: 123456 OUTPUT1 OFF |
| OUTPUTx |  | Įjungti išėjimą OUTPUT2 tam tikram laikui. “tttt” yra impulso trukmė sekundėmis, nurodoma keturiais skaitmenimis. Pvz.: 123456 OUTPUT2 PULSE=0002 |

## TrikdisConfig langų aprašymas

### *TrikdisConfig* būsenos juostos aprašymas

Prijungus GT+ TrikdisConfig būsenų juostoje pateiks informaciją apie prijungtą gaminį.

<img alt="TrikdisConfig būsenos juosta: matomi laukai IMEI/Unikalus ID ir SN, Būsena – skaitymas baigtas, Įrenginys – GT+_M150, BL – 1.00, FW – 1.30, HW – 0.00." src="./image41.webp" style="width:7.086614173228346in;height:0.5866141732283464in" />

| Pavadinimas | Aprašymas |
|-------------|-----------|
| IMEI/​Unikalus ID | Gaminio IMEI numeris |
| Būsena | Darbinė būsena |
| Įrenginys | Gaminio tipas (turi rodyti GT+) |
| SN | Gaminio serijinis numeris |
| BL | Paleidyklės versija |
| FW | Gaminio programinės įrangos versija |
| HW | Gaminio aparatinės įrangos versija |
| Būsena | Sujungimo su programa būdas (per USB arba nuotolinis) |
| Administratorius | Prieigos lygis (rodomas po to, kai patvirtintas prieigos kodas) |

Paspaudus mygtuką **Skaityti [F4]**, programa nuskaitys ir parodys nustatymus, kurie yra įrašyti GT+. Su TrikdisConfig, nustatykite reikiamus nustatymus pagal žemiau pateiktus programos langų aprašymus.

### Langas „Sistemos parinktys“

<img alt="TrikdisConfig langas „Sistemos parinktys“ (GT+_M150). Grupėje „Pagrindinės“ rodomi laukai „Objekto numeris“ ir „Module ID“, o „Laiko nustatymas“ pasirinkta „Pirmas kanalas“. Grupėje „Prisijungimas“ rodomi administratoriaus ir montuotojo kodų laukai; „„Atkurti“ gali tik administratorius“ pažymėta. Montuotojui leisti keisti „Objekto numeris“, „Pranešimai į CSP“, „Pranešimai vartotojui“, „SIM kortelė“ ir „Įvykių aprašas“ – visi šie pasirinkimai pažymėti." src="./image42.webp" style="width:7.086614173228346in;height:2.763779527559055in" />

Parinkčių grupė „Pagrindinės“

- **Objekto numeris** – jei pranešimai bus siunčiami į CSP (centralizuoto stebėjimo pultą), įrašykite CSP suteiktą objekto numerį (6 simbolių šešioliktainis numeris, 0-9, A-F. **Nenaudokite FFFE, FFFF objekto numerių**.).

- **Modulio ID** – įveskite modulio ID numerį.

- **Laiko nustatymas** - pasirinkite, kurį serverį naudoti laiko sinchronizacijai.

Parinkčių grupė „Prisijungimas“

- **Administratoriaus kodas** – leidžia prieiti prie visų konfigūravimo funkcijų (gamyklinis kodas – 123456).

- **Instaliuotojo kodas** – leidžia ribotai keisti komunikatoriaus konfigūraciją (gamyklinis kodas – 654321).

- **„Atkurti” gali tik administratorius** – uždėjus varnelę, gaminiui atkurti gamyklinius parametrus bus leidžiama tik įvedus administratoriaus kodą.

**Pastaba**: jei laukelis „**„Atkurti“ gali tik administratorius**“ pažymėtas, o administratoriaus kodo nežinote, gamyklinius parametrus galės atkurti tik gamintojas – UAB „Trikdis“. Paslauga mokama.

- **Instaliuotojui leisti keisti** – administratorius gali nustatyti, kuriuos parametrus galės keisti instaliuotojas.

### Langas “Centralės sąsaja”

**Parinkčių grupė „Tip/Ring sąsaja“**

<img alt="TrikdisConfig langas Centralės sąsaja, grupė Tip/Ring sąsaja: atvertame lauko Komunikacijos protokolas meniu matomos reikšmės 1. DISABLED, 2. AUTO ir 3. MANUAL; pasirinkta 1. DISABLED." src="./image43.webp" style="width:7.086614173228346in;height:3.5236220472440944in" />

Kai komunikatorius prijungtas prie centralės TIP/RING gnybtų, reikia atlikti šiuos nustatymus.

- **Komunikacijos protokolas** – įjungti/išjungti komunikatoriaus telefoninės linijos „DTMF“ sąsają.

- **Naudoti centralės obj. Nr.** – paskyros ID nustatomas centralėje ir perduodamas į GT+.

- **Laukti patvirtinimo iš CSP –** jei langelis pažymėtas varnele, tai po kiekvieno įvykio pranešimo išsiuntimo komunikatorius lauks patvirtinimo iš IP imtuvo, kad jis pranešimą sėkmingai priėmė. Jei komunikatorius negaus patvirtinimo signalo, jis neformuos ryšio pabaigos (kiss-off) signalo. Nesulaukęs ryšio pabaigos signalo, centralės telefoninis komunikatorius pakartotinai transliuos įvykio pranešimą.

- **Dial tone dažnis** - dažnis, kuriuo GT+ palaiko ryšį su centrale per telefoninį komunikatorių.

**Parinkčių grupė „Data/CLK sąsaja“**

<img alt="TrikdisConfig langas Centralės sąsaja, grupė Data/CLK sąsaja: Įvykių protokolas – CID; Centralės modelis – matoma reikšmės dalis 5. PARADOX SP/MG se; Nuotolinis centralės valdymas ir Įvykiai pažymėti, Centralės PC download slaptažodis užpildytas." src="./image44.webp" style="width:7.086614173228346in;height:2.12992125984252in" />

Kai komunikatorius yra prijungtas prie centralės klaviatūros magistralės arba nuosekliosios magistralės, reikia atlikti šiuos nustatymus.

- **Centralės protokolas** – nurodykite duomenų perdavimo protokolą.

- Pasirinkite **Centralės modelį**, kurį jungsite prie komunikatoriaus.

- **Nuotolinis centralės valdymas** – kai langelį pažymėsite varnele, GT+ komunikatorius centralę valdys tiesiogiai nuotoliniu būdu. Šis nustatymas rodomas tiesiogiai valdomoms centralėms. Tiesioginiam centralės valdymui reikia pakeisti apsaugos centralės nustatymus, tai aprašyta skyriuje **4 „Apsaugos centralių programavimas*“***.

- **Centralės PC download slaptažodis** - Paradox ir Texecom centralių tiesioginiam valdymui reikia suvesti PC/UDL slaptažodį. Jis turi sutapti su slaptažodžiu, kuris įvestas centralėje. Kaip pakeisti šį slaptažodį centralėje aprašyta skyriuje **4* „*Apsaugos centralių programavimas*“****.*

### Langas “Pranešimai į CSP”

**Skirtukas „CSP nustatymai“**

<img alt="TrikdisConfig langas Pranešimai į CSP, skirtukas CSP nustatymai: pirminio ir lygiagrečiojo ryšio kanalų Ryšio būdas – Išjungtas; Atsarginio kanalo režimas – Išjungtas. Pirminiam ir atsarginiam kanalams lauke TCP ar UDP pasirinkta TCP; matomi protokolo, domeno arba IP, prievado ir šifravimo rakto laukai." src="./image45.webp" style="width:7.086614173228346in;height:3.37007874015748in" />

Konfigūruokite „Pirminių“ ir „Atsarginių“ ryšio kanalų parametrus, jei komunikatorius siųs pranešimus į CSP.

Pranešimai gali būti siunčiami keliais ryšio kanalais. Pirmas ir antras (lygiagretusis) ryšio kanalai gali veikti lygiagrečiai, taip komunikatorius gali siųsti įvykius tuo pačiu metu į du imtuvus. Tiek pirmam, tiek ir antram kanalui galima priskirti atsarginį ryšio kanalą, kuris bus naudojamas nutrūkus ryšiui pirminiu kanalu.

Pranešimai į stebėjimo pultą perduodami užkoduoti ir apsaugoti slaptažodžiu. Pranešimams priimti ir perduoti į stebėjimo programą reikalingas TRIKDIS imtuvas:

- IP pranešimams – priėmimo programa IPcom Windows/Linux, aparatinis IP/SMS imtuvas RL14 arba daugiakanalis imtuvas RM14.

Parinkčių grupė „Pirminis ryšio kanalas”

- **Ryšio būdas** – pasirinkite ryšio su stebėjimo pulto imtuvu būdą (IP).

- **Protokolas** – **TRK8** protokolu perduodamus įvykių pranešimus priims Trikdžio IP imtuvai; o **SIA DC-09** protokolais – IP imtuvai, gebantys priimti SIA DC-09 protokolais perduodamus įvykių pranešimus; **TL150** protokolu perduodamus įvykių pranešimus priims SUR-GARD IP imtuvai.

- **Šifravimo raktas** – pranešimų šifravimo raktas. Į komunikatorių įrašytas šifravimo raktas turi būti toks, koks įrašytas į imtuvą, t.y. turi sutapti, būti vienodas.

- **Domenas arba IP** – įrašykite imtuvo domeno arba IP adresą.

- **Prievadas** – įrašykite imtuvo prievado (*angl. port*) numerį tinkle.

- **TCP arba UDP** – pasirinkite įvykių perdavimo protokolą (TCP arba UDP).

Parinkčių grupė „Lygiagretusis ryšio kanalas”

Šio kanalu pranešimai perduodami lygiagrečiai su pirmu kanalu. Įgalinus antrą kanalą pranešimai gali būti siunčiami vienu metu į du imtuvus (pvz., į lokalų ir į centralizuotą stebėjimo pultus). Lygiagretaus ryšio kanalo nustatymo laukai tokie patys kaip aprašyta aukščiau.

Parinkčių grupės „Atsarginio kanalo režimas”

Įgalinkite atsarginio kanalo režimą, kad, nutrūkus ryšiui, įvykiai būtų siunčiami atsarginiu kanalu. Sukonfigūruokite atsarginį kanalą, nustatymo laukai tokie patys kaip aprašyta aukščiau.

**Skirtukas „Parametrai“**

<img alt="TrikdisConfig lango „Pranešimai į CSP“ skirtukas „Parametrai“ (GT+_M150): „Testo periodas“ įjungtas, nustatyta 24 val ir 0 min; papilkintame „IP ping periodas“ nustatyta 0 min ir 30 s; „Pereiti į atsarginį po“ – 2 bandymų; „Grįžti iš atsarginio po“ – 1 min ir 30 s; „Linijos Nr.“ – 1; „Imtuvo Nr.“ – 1." src="./image46.webp" style="width:7.086614173228346in;height:2.562992125984252in" />

Parinkčių grupė „Parametrai“

- **Testo periodas** – ryšio tikrinimo TEST pranešimų periodas. Jie siunčiami kaip Contact ID pranešimai ir perduodami į stebėjimo programą.

- **IP ping periodas** – vidinių PING ryšio tikrinimo signalų siuntimo periodas. Šie pranešimai siunčiami tik IP kanalu. Jų imtuvas neperduoda į stebėjimo programą, taip jos neapkraudamas. Į stebėjimo programą perduodama tik tada, kai imtuvas negauna PING pranešimo iš įrenginio per nustatytą laiką.

  Numatytai imtuvas perduos „*Connection lost*” prarasto ryšio pranešimą į stebėjimo programą praėjus trigubai ilgesniam laikui nei nustatytas komunikatoriaus PING pranešimo periodas. Pvz., jei nustatytas 3 minučių PING, imtuvas perduos prarasto ryšio pranešimą negavęs PING per 9 minutes.

  Kartu PING pranešimai palaiko aktyvią ryšio sesiją tarp įrenginio ir imtuvo. Aktyvi sesija reikalinga, kad komunikatorių būtų galima konfigūruoti ir valdyti nuotoliniu būdu. Rekomenduojame nustatyti ne ilgesnį nei 5 minučių PING periodą.

- **Pereiti į atsarginį po** - nurodomas nesėkmingų bandymų perduoti pranešimą Pagrindiniu kanalu skaičius. Nepavykus perduoti nustatytą skaičių kartų, įrenginys jungsis perduoti pranešimus Atsarginiu kanalu.

- **Grįžti iš atsarginio po** - laikas, kuriam pasibaigus, GT+ bandys atstatyti ryšį ir perduoti pranešimus Pagrindiniu kanalu.

  - **Linijos Nr**. – įveskite linijos numerį imtuve.

  - **Imtuvo Nr.** – įveskite imtuvo numerį.

### Langas „Pranešimai vartotojui”

**Skirtukas “Protegus servisas”**

<img alt="TrikdisConfig lango „Pranešimai vartotojui“ skirtukas „PROTEGUS servisas“ (GT+_M150): „Leisti prisijungti“ pažymėta, rodomas „PROTEGUS Cloud prieigos kodas“ laukas, „Lygiagretus siuntimas“ nepažymėta." src="./image47.webp" style="width:7.086614173228346in;height:1.9488188976377954in" />

Protegus paslauga leidžia vartotojams nuotoliniu būdu stebėti ir valdyti komunikatorių. Daugiau informacijos apie Protegus paslaugą rasite [www.protegus.app](https://www.protegus.app).

**Parinkčių grupė „Protegus servisas“**

- **Leisti prisijungti** – Protegus serviso įjungimas, GT+ galės keistis duomenimis su Protegus2 programėle ir bus galima su TrikdisConfig atlikti konfigūravimą nuotoliniu būdu.

- **PROTEGUS Cloud prieigos kodas** - prisijungimo su Protegus2 6 skaitmenų kodas (gamyklinis kodas - 123456).

- **Lygiagretus siuntimas** – pažymėkite langelį ir bus leidžiama vienu metu perduoti pranešimus pagrindiniu kanalu (į CSP) ir į Protegus2.

  **Skirtukas “SMS ir skambučiai”**

  <img alt="TrikdisConfig lango „Pranešimai vartotojui“ skirtukas „SMS ir skambučiai“ (GT+_M150): „Objekto pavadinimas“ – „Account Name“, „SMS kalba“ – „LITHUANIAN“. Rodomos telefono numerių, sričių pavadinimų (01 „Area 1“, 02 „Area 2“), vartotojų vardų (001 „User 1“, 002 „User 2“) ir zonų pavadinimų (001 „Zone 1“, 002 „Zone 2“) lentelės. CID įvykių sąraše matomi E100 „MEDICAL PANIC ALARM“, E110 „FIRE PANIC ALARM“, E120 „PANIC ALARM“, E121 „DURESS ALARM“ ir E130 su kartojamu „ALARM“ tekstu; Tel 1–4 yra SMS ir skambučių žymimieji langeliai." src="./image48.webp" style="width:7.086614173228346in;height:4.047244094488189in" />

Galite nustatyti, kad vartotojai apie įvykius būtų informuojami SMS pranešimais arba skambučiu.

- **Objekto pavadinimas** – suteikite pavadinimą sistemai, prie kurios prijungtas komunikatorius. Kiekvienas SMS pranešimas bus perduodamas su objekto pavadinimu.

- **SMS kalba** - parinkite SMS pranešimų kalbą (SMS pranešimai gali būti siunčiami įvairiais rašmenimis).

- **“Telefono numeris SMS/skambučio pranešimams” lentelė** – įrašykite iki 4 vartotojų telefono numerius, kuriems bus siunčiami pranešimai arba skambinama. Telefono numeriai turi būti su šalies kodu, pavyzdžiui, +370xxxxxxxx, 00370xxxxxxxx ar 370xxxxxxxx.

- **„Srities pavadinimas”, „Vartotojo vardas”, „Zonos pavadinimas” lentelės** – kiekvienam vartotojui, zonai ar sričiai gali būti suteiktas pavadinimas, kuris bus naudojamas SMS pranešimuose. Į atitinkamą lentelę įrašykite vartotojo, zonos arba srities eilės numerį ir greta numerio įrašykite pavadinimą.

- **CID įvykių lentelė** – galite pakeisti, į kuriuos telefono numerius bus siunčiami SMS pranešimai arba skambinama apie kiekvieną iš įrašytų įvykių.

Galite pakeisti įvykių SMS žinučių tekstus, pakeisti Contact ID (CID) kodus, ir įrašyti naujus įvykius bei jų aprašymus.

**Skirtukas “Valdymas SMS žinutėmis”**

<img alt="TrikdisConfig langas Pranešimai vartotojui, skirtukas Valdymas SMS žinutėmis: SMS atsakymų lentelėje matomi tekstai Command OK, Wrong Access Code, Wrong Command ir Wrong Data. Dešinėje – keturi laukai Tel 1–Tel 4 telefono numeriams nuotoliniam valdymui." src="./image49.webp" style="width:7.086614173228346in;height:1.9448818897637796in" />

Galite į komunikatorių nusiųsti SMS komandą, kuri suvaldys išėjimą arba atsius informaciją apie gaminį. SMS komandas rasite skyriuje **5.4 „Komunikatoriaus valdymas SMS žinutėmis“.**

- **SMS atsakymo žinutės tekstas** – SMS tekstas, kurį vartotojas gauna po SMS komandos išsiuntimo. SMS žinutės tekstą galima redaguoti.

- **Telefono numeriai nuotoliniam valdymui** – galite įrašyti telefono numerius, iš kurių siunčiamas komandas įrenginys priims ir vykdys.

!!! note "Pastaba"
    Jeigu nebus įrašytas nei vienas telefono numeris, įrenginys priims
    komandas iš bet kurio telefono numerio. Bet kuriuo atveju saugumą
    užtikrina reikalavimas į SMS komandą įvesti administratoriaus arba
    instaliuotojo slaptažodį.
### Langas “Tinklo nustatymai”

!!! note "Pastaba"
    1\. Prieš naudodami SIM kortelę, įsitikinkite, ar ji aktyvuota. / 2. Jei
    bus naudojamas mobilusis interneto ryšys pranešimams perduoti IP kanalu
    į saugos tarnybos imtuvą arba į Protegus2, patikrinkite, ar
    įjungta mobiliųjų duomenų perdavimo paslauga.
**Skirtukas “SIM1”**

<img alt="TrikdisConfig langas „Tinklo nustatymai“, skirtukas „SIM1“ (GT+_M150): lauke „SIM kortelės PIN kodas“ įvesta reikšmė, „APN“ – internet; laukai „Vartotojas“, „Slaptažodis“, „SIM ICCID“, „DNS 1“, „DNS 2“ ir „Numatytasis operatorius“ tušti, „ICCID užrakinimas!“ nepažymėtas." src="./image50.webp" style="width:7.086614173228346in;height:3.0196850393700787in" />

Parinkčių grupė „SIM kortelė“

- **SIM kortelės PIN kodas** – įveskite SIM kortelės PIN kodą. Šį kodą galite išjungti įdėdami SIM kortelę į mobilų telefoną ir išjungdami šią užklausą. Jei PIN kodo užklausą SIM kortelėje išjungėte, laukelyje palikite gamyklos įvestą reikšmę.

- **APN** – įveskite APN (angl. Access Point Name). Jis reikalingas, kad komunikatorius galėtų prisijungti prie interneto. APN rasite SIM operatoriaus interneto puslapyje. „Internet” yra universalus ir veikia daugelio operatorių tinkluose.

- **Vartotojas, slaptažodis** – jei reikia, įveskite vardą ir slaptažodį prisijungimui prie APN.

- **SIM ICCID** - įveskite SIM kortelės ICCID numerį, jei norite, kad centralė veiktų tik su šia SIM kortele.
- **DNS1, DNS2** – (angl. Domain Name System) nurodomas serveris, kuris nurodo domeno IP adresą. Naudojamas, kai ryšio kanalo „**Domenas arba IP**“ lauke nurodytas ne IP adresas, o domenas. Gamykliškai nustatyti Google DNS serverių adresai. Nepriklausomai nuo IP nustatymų, įsitikinkite, kad DNS adresai atitinka tuos, kuriuos palaiko jūsų interneto tiekėjas.

- **Numatytasis operatorius** – įvedus mobilaus tinklo operatoriaus kodą, komunikatorius jungsis tik prie pasirinkto operatoriaus tinklo. Mobilaus tinklo operatoriaus kodas susideda iš MCC ir MNS kodų.

- **ICCID užrakinimas** – pažymėjus lauką ir perkrovus komunikatorių, jis bus griežtai pririštas prie nurodyto SIM ICCID kodo.

Parinkčių grupė „Connection Type“

<img alt="TrikdisConfig langas „Tinklo nustatymai“, skirtukas „Connection Type“ (GT+_M150): „Connection Type“ – LTE CAT-M1, „Select all“ pažymėtas; pažymėtos visos parodytos dažnių juostos: B1, B2, B3, B4, B5, B8, B12, B13, B18, B19, B20, B25, B26, B27, B28, B66 ir B85." src="./image51.webp" style="width:7.086614173228346in;height:3.5393700787401574in" />

Šie nustatymai galioja komunikatoriams su CAT-M1 modemu. Galite nurodyti dažnius, kuriais veiks komunikatoriaus modemas.

### Langas „IN/OUT“

<img alt="TrikdisConfig langas „IN/OUT“ (GT+_M150): 1 gnybtas – OUT; 2 gnybtas – IN, tipas NO. Contact ID lentelėje IN2_ALARM įvykio kodai CID 130, SIA BA, atsistatymo – CID 130, SIA BH; IN2_TAMPER įvykio kodai CID 144, SIA TA, atsistatymo – CID 144, SIA TR. Abiem įvykiams nurodyta sritis 99 ir zona 002." src="./image52.webp" style="width:7.086614173228346in;height:2.4606299212598426in" />

Komunikatorius turi 2 universalius (įėjimo/išėjimo) gnybtus. Lentelėje galima nustatyti gnybtui veikimo režimą (Išjungta, IN, OUT). Įėjimui reikia nurodyti prijungiamos grandinės tipą NC, NO, NO/EOL, NC/EOL, NO/DEOL, NC/DEOL.

Prie komunikatoriaus įėjimų galima prijungti papildomus jutiklius. Suveikus jutikliui komunikatorius išsius pranešimą apie įvykį. Įėjimui priskiriamas Contact ID kodas, kuris bus išsiustas į CSP ir Protegus2.

- **Įgalinti** – pažymėkite įvykių laukus, kuriu pranešimai bus siunčiami į CSP ir Protegus2.

- **Į/A** – nurodykite komunikatoriaus vidinio įvykio siuntimo sąlyga (Įvykis arba Atsistatymas).

- **CID** – įvykio kodas. Įveskite arba palikite numatytąją reikšmę. Įvykio kodas bus išsiųstas į CSP ir Protegus2.

- **SIA** - įvykio kodas. Įveskite arba palikite numatytąją reikšmę. Įvykio kodas bus išsiųstas į CSP ir Protegus2.

- **Srit.** – įrašykite srities numerį, kuris bus siunčiamas įvykus vidiniam įvykiui ir atsistačius sistemai.

- **Zona** - įrašykite zonos numerį, kuris bus siunčiamas įvykus vidiniam įvykiui ir atsistačius sistemai.

### Langas „RS485 moduliai“

Prie komunikatoriaus galima prijungti iO-8 plėtiklius (kuriais pridėsite papildomus įėjimus, valdomus išėjimus). Prijungti moduliai turi būti įtraukti į „**Modulių sąrašo**“ lentelę.

<img alt="TrikdisConfig langas „RS485 moduliai“, skirtukas „Modulių sąrašas“ (GT+_M150): 1–3 moduliai pažymėti „Nenaudojamas“; atvertame 4 modulio sąraše matomi pasirinkimai „Nenaudojamas“ ir „Plėtiklis iO-8“." src="./image53.webp" style="width:7.086614173228346in;height:1.9488188976377954in" />

Parinkčių grupė „Modulių sąrašas“

- **Nr** – modulio eilės numeris.

- **Modulio tipas** – iš sąrašo išrinkite prie komunikatoriaus RS485 magistralės prijungtą modulį.

- **Serijos numeris** – įveskite prijungto modulio serijinį numerį (6 skaitmenys). Numerį rasite ant lipduko, užklijuoto ant prijungto modulio arba jo įpakavimo dėžutės.

Išrinkus prijungtą modulį ir nurodžius jo serijos numerį, pereikite prie **RS485 moduliai → Modulis1.**

**Skirtukai „Modulis1“**

Prie komunikatoriaus pridėjus plėtiklį kaip aprašyta aukščiau, **RS485 moduliai** lange atsiras naujas skirtukas su šio modulio nustatymais. Skirtukui suteikiamas eilės numeris. Žemiau aprašome nustatymų laukus iO-8 plėtikliams.

**iO-8 plėtiklio nustatymų langas**

<img alt="TrikdisConfig langas „RS485 moduliai“, skirtukas „Modulis 1“: plėtiklio iO-8 nustatymai (GT+_M150). Lauke „Serijos numeris“ įvesta reikšmė, „Įėjimų skaičius“ – 3, „Rodyti Objekto numerį“ nepažymėtas. Contact ID lentelėje BUS_FAULT kodai CID 333, SIA ET/ER; INPUT1 kodai CID 130, SIA BA/BH, zona 001; INPUT2 – zona 002; INPUT3 – zona 003. Visų įvykių sritis 91." src="./image54.webp" style="width:7.086614173228346in;height:2.543307086614173in" />

Plėtiklis iO-8 turi 8 universalius (įėjimo/išėjimo) gnybtus. Prie komunikatoriaus galima prijungti keturis iO-8 plėtiklius.

- **Įėjimų** **skaičius** - pasirinkite, kiek gnybtų priskirti įėjimo (IN) režimui. Likę kontaktai taps valdomais išėjimais (OUT).

Valdomų išėjimų nustatymai (priskirti išėjimą apsaugos sistemos įjungimui/išjungimui arba naudoti nuotoliniam įrenginių valdymui) atliekami tiesiogiai Protegus2 programėlėje.

Lentelėje įėjimams (INPUT) galima priskirti Contact ID (SIA) įvykių ir atsistatymo kodus. Suveiksminus įėjimą, komunikatorius išsiųs pranešimą su nurodytu įvykio kodu į stebėjimo pulto imtuvą ir į Protegus2 programėlę.

**Contact ID įvykio kodas**:

- **Įgalinti** – leisti pranešimo siuntimą, kai suveiksminamas įėjimas.

- **Į/A** – galima pasirinkti, kokio tipo pranešimas bus siunčiamas suveiksminus įėjimą – **Įvykis** arba **Atsistatymas**.

- **CID** – įėjimui priskiriamas Contact ID suveikimo kodas.

- **SIA** - įėjimui priskiriamas SIA suveikimo kodas.

- **Sritis** – nurodoma sritis, kuriai priskirtas įėjimas. Nusistato automatiškai: jei modulis Nr. 1, tai sritis 91; jei modulis Nr. 4, tai sritis 94.

- **Zona** – įėjimui priskiriamas zonos numeris, kuris bus įrašytas pranešime.

**Contact ID atsistatymo kodas**:

- **Įgalinti** - leisti pranešimo siuntimą, kai įvyksta atsistatymas.

- **Į/A** - galima pasirinkti, kokio tipo pranešimas bus siunčiamas įėjimui atsistačius – **Atsistatymas** arba **Įvykis**.

- **CID** – įėjimui priskiriamas Contact ID suveikimo kodas.

- **SIA** - įėjimui priskiriamas SIA suveikimo kodas.

- **Sritis** - nurodoma sritis, kuriai priskirti įėjimai. Nusistato automatiškai, jei modulis Nr. 1, tai sritis 91. Jei modulis Nr. 4, tai sritis 94.

- **Zona** - įėjimui priskiriamas zonos numeris, kuris bus įrašytas pranešime.

- **Objekto ID** – įėjimui (IN) gali būti priskirtas objekto numeris, kuris skirsis nuo komunikatoriaus GT+ objekto numerio.

- **Įėjimo tipas** – nurodomas įėjimo tipas (NO, NC arba EOL).

### Langas „Įvykių aprašas”

Šiame lange galima įjungti, išjungti ir pakeisti įrenginio siunčiamus vidinius pranešimus. Išjungus vidinį pranešimą šiame lange, jis nebus siunčiamas nepriklausomai nuo kitų nustatymų.

<img alt="TrikdisConfig langas „Įvykių aprašas“ (GT+_M150): COMMUNICATION įvykio kodai CID 350, SIA YC, atsistatymo – CID 350, SIA YK; POWER įvykio kodai CID 302, SIA YT, atsistatymo – CID 302, SIA YR; REMOTE_FINISHED – CID 412, SIA RS; REMOTE_STARTED – CID 411, SIA RB; START – CID 700, SIA RR; TEST – CID 602, SIA RP. Visų įvykių sritis 99 ir zona 999." src="./image55.webp" style="width:7.086614173228346in;height:2.141732283464567in" />

- **COMMUNICATION** – pranešimas apie ryšio sutrikimą tarp centralės ir GT+.

- **POWER** – pranešimas apie žemą maitinimo įtampą.

- **REMOTE_FINISHED** – pranešimas apie atsijungimą nuo nuotolinio konfigūravimo su TrikdisConfig.

- **REMOTE_STARTED** – pranešimas apie nuotolinį prisijungimą konfigūruoti GT+ su TrikdisConfig.

- **TEST** – periodinis testo pranešimas.

!!! note "Pastaba"
    Norėdami įjungti periodinius TEST pranešimus ir nustatyti laikotarpį,
    eikite į langą / „**Pranešimai į CSP" langas „Pranešimai į
    CSP"→ Parametrai → Testo periodas**
- **Įgalinti** – pažymėjus varnele, įgalinamas pranešimo siuntimas.

Galite pakeisti kiekvieno įvykio Contact ID, SIA kodą, taip pat su pranešimu nurodomą zonos ir srities numerį.

### Gamyklinių nustatymų atstatymas

Norint atkurti komunikatoriaus gamyklinius nustatymus, reikia nuspausti programos TrikdisConfig mygtuką „**Atkurti“.**

<img alt="TrikdisConfig lango grupėje „Gamintojo parametrai“ raudonu rėmeliu pažymėtas gamykliniams nustatymams atkurti skirtas mygtukas „Atkurti“." src="./image56.webp" style="width:7.086614173228346in;height:1.0039370078740157in" />

Kitas būdas atkurti gamyklinius nustatymus.

Komunikatoriaus maitinimas įjungtas. Paspauskite ir palaikykite mygtuką „RESET“ komunikatoriaus plokštėje. Laikykite nuspaustą „RESET“ mygtuką 10 sekundžių, kol LED indikatoriai („NETWORK“, „POWER“, „TROUBLE“) išsijungs ir užsidegs indikatorius „POWER“. Atleiskite mygtuką "RESET". Komunikatoriaus gamykliniai nustatymai atkurti.

1.  <span id="_Toc208219746"></span>**Nuotolinis veikimo parametrų nustatymas**

!!! note "Pastaba"
    Nuotolinis konfigūravimas veiks tik tuomet, kai GT+:
    
    1.  Įstatyta aktyvuota SIM kortelė ir įvestas arba išjungtas PIN kodas.
    
    2.  Įjungta Protegus servisas paslauga. Žr. **6.5 Langas
        „Pranešimai vartotojui".**
    
    3.  Įjungtas maitinimas („POWER" LED šviečia žaliai).
    
    4.  Prisiregistravęs prie tinklo („NETWORK" LED šviečia žaliai ir mirksi
        geltonai).
2. Kompiuteryje paleiskite konfigūravimo programą TrikdisConfig.

2.  Lauke „**Nuotolinė prieiga“** įveskite komunikatoriaus „*IMEI/Unikalus ID“* numerį. Šį numerį rasite ant įrenginio pakuotės ir nugarėlės lipduko.

<img alt="TrikdisConfig pradinis langas, skiltis Nuotolinė prieiga: raudonai pažymėti tuščias Unikalus ID laukas ir mygtukas Konfigūravimas. Šalia yra Sistemos pavadinimas laukas ir mygtukas Valdymas." src="./image57.webp" style="width:7.086614173228346in;height:2.267716535433071in" />

3. (Nebūtina) Langelyje „**Sistemos pavadinimas“** įveskite norimą komunikatoriaus pavadinimą.

2.  Paspauskite „**Konfigūravimas“**.

3.  Atsidariusiame lange paspauskite **Skaityti [F4]**. Programai paprašius, įveskite administratoriaus arba instaliuotojo kodą.

4.  Nustatykite norimus nustatymus ir pabaigę nuspauskite **Įrašyti [F5]**.

## GSM komunikatoriaus *GT+* testavimas

Kai konfigūravimas ir instaliavimas baigtas, atlikite sistemos patikrą:

1.  Sugeneruokite įvykį:

- įjungdami/išjungdami saugojimo režimą su apsaugos centralės klaviatūra;

- suveiksmindami centralės zoną esant įjungtam saugojimo režimui.

1.  Patikrinkite, ar įvykiai buvo gauti Centriniame stebėjimo pulte ir/arba Protegus2 programėlėje.

2.  Norėdami išbandyti komunikatoriaus įėjimą, suveiksminkite jį ir patikrinkite, ar gavėjai gauna teisingus pranešimus.

3.  Norėdami išbandyti komunikatoriaus išėjimus, juos įjunkite nuotoliniu būdu ir patikrinkite jų veikimą.

4.  Jei bus naudojamas nuotolinis centralės valdymas, įjunkite bei išjunkite centralės saugojimo režimą nuotoliniu būdu su Protegus2 programėle.

## Programinės įrangos atnaujinimas

!!! note "Pastaba"
    Prijungus komunikatorių prie TrikdisConfig, programa automatiškai
    pasiūlys atnaujinti įrenginio veikimo programą, jeigu yra atnaujinimų.
    Šiam veikimui reikalingas interneto ryšys. Antivirusinė programa,
    ugniasienė arba griežti prieigos prie tinklo nustatymai gali blokuoti
    automatinių atnaujinimų funkciją. Šiuo atveju turėsite perkonfigūruoti
    savo antivirusinę programą.
Komunikatoriaus veikimo programą galima atnaujinti ar pakeisti ir rankiniu būdu. Po atnaujinimo išlieka visi ankstesni komunikatoriaus nustatymai. Veikimo programą įrašant rankiniu būdu, ją galima pakeisti į naujesnę arba senesnę versiją. Atlikite šiuos žingsnius:

1.  Paleiskite ***TrikdisConfig**.*

2.  Prijunkite komunikatorių per USB-С kabelį prie kompiuterio arba prisijunkite prie komunikatoriaus nuotoliniu būdu.

    - Jei yra naujesnė gamyklinė programinė įranga, programa pasiūlys įdiegti naujesnės gamyklinės programinės įrangos versiją.

3.  Parinkite programos TrikdisConfig meniu „**Programos naujinimas**“.

<img alt="TrikdisConfig langas „Programos atnaujinimas“ (GT+_M150): laukas „Atverti“ tuščias, matomas mygtukas „Atverti failą“, neaktyvus mygtukas „Naujinti (F12)“ ir 0 % eigos juosta." src="./image58.webp" style="width:7.086614173228346in;height:2.5039370078740157in" />

4. Paspauskite mygtuką „**Atverti failą**“ ir parinkite reikiamą programinės įrangos bylą.

2.  Paspauskite atnaujinimo mygtuką **Naujinti [F12]**.

3.  Palaukite, kol bus atlikti atnaujinimai.

## Saugos reikalavimai

Komunikatorių turi įrengti ir prižiūrėti kvalifikuoti specialistai.

Prieš instaliavimą prašome atidžiai perskaityti šį vadovą, kad išvengtumėte klaidų, dėl kurių galimi įrangos darbo sutrikimai ar net rimti gedimai.

Prieš jungdami bet kokius elektros kontaktus atjunkite elektros tiekimą.

Dėl bet kokių pakeitimų, modernizavimo ar remonto, kurie atlikti be gamintojo sutikimo, bus nutraukiamas teisės į garantiją galiojimas.

<img alt="Perbrauktos ratukinės atliekų dėžės simbolis (WEEE), nurodantis, kad prietaisą reikia šalinti atskirai nuo buitinių atliekų." src="./image2.webp" style="width:0.3937007874015748in;height:0.4448818897637795in" />Įrenginys pasibaigus eksploatacijai turi būti utilizuojamas pagal vietinius galiojančius teisės aktus ir jo bei jį sudarančių komponentų negalima išmesti kaip buitinių atliekų.

## Priedas

Komunikatorius gali dirbti su SUR-GARD imtuvu. Komunikatorius, gautus iš signalizacijos centralės, Contact ID kodus konvertuoja į SIA kodus.

**Contact ID į SIA kodus konvertavimo lentelė**

| **Sistemos įvykis** | **CID kodas** | **SIA kodas** |
|----|:--:|:--:|
| Medicininis pavojus | E100 | "MA" |
| Asmeninis pavojus | E101 | "QA" |
| Gaisro aliarmas zonoje: <z> | E110 | "FA" |
| Nuspaustas gaisro pavojaus mygtukas zonoje <z> | E115 | "FA" |
| Vandens nuotėkis zonoje <z> | E113 | "SA" |
| Užpuolimas zonoje: <z> | E120 | "PA" |
| Užpultas vartotojas <v> | E121 | "HA" |
| Užpuolimas zonoje: <z> | E122 | "PA" |
| Užpuolimas zonoje: <z> | E123 | "PA" |
| Užpuolimas zonoje: <z> | E124 | "HA" |
| Užpuolimas zonoje: <z> | E125 | "HA" |
| Aliarmas zonoje: <z> | E130 | "BA" |
| Aliarmas zonoje: <z> | E131 | "BA" |
| Aliarmas zonoje: <z> | E132 | "BA" |
| Aliarmas zonoje: <z> | E133 | "BA" |
| Aliarmas zonoje: <z> | E134 | "BA" |
| Aliarmas zonoje: <z> | E135 | "BA" |
| Pažeista elektroninė apsauga | E137 | "TA" |
| Įsibrovimo į zoną <z> patvirtinimas | E139 | "BV" |
| Aliarmas zonoje: <z> | E140 | "UA" |
| Sistemos gedimas (143) | E143 | "ET" |
| Išardytas signalizacijos įrenginys zonoje <z> | E144 | "TA" |
| Išardytas signalizacijos įrenginys zonoje <z> | E145 | "TA" |
| Aliarmas zonoje: <z> | E146 | "BA" |
| Aliarmas zonoje: <z> | E150 | "UA" |
| Zonoje <z> aptiktas dujų nuotėkis | E151 | "GA" |
| Zonoje <z> aptiktas vandens nuotėkis | E154 | "WA" |
| Folijos trūkis zonoje: <z> | E155 | "BA" |
| Per aukšta sensoriaus <n> temperatūra | E158 | "KA" |
| Per žema sensoriaus <n> temperatūra | E159 | "ZA" |
| Zonoje <z> viršyta CO dujų norma | E162 | "GA" |
| Gaisro gedimas zonoje: <z> | E200 | "FS" |
| Aliarmo stebėjimas | E220 | "BA" |
| Sistemos gedimas (300) | E300 | "YP" |
| Sutriko maitinimas kintama įtampa | E301 | "AT" |
| Išsikrovė akumuliatorius | E302 | "YT" |
| Sistemos gedimas (304) | E304 | "YF" |
| Sistema pasileido veikti iš naujo | E305 | "RR" |
| Pasikeitė sistemos programavimas | E306 | "YG" |
| Sistema nustojo funkcionuoti | E308 | "RR" |
| Akumuliatoriaus gedimas (309) | E309 | "YT" |
| Įžeminimo gedimas | E310 | "US" |
| Akumuliatorius nebeveikia | E311 | "YM" |
| Suveikė maksimalios srovės apsauga | E312 | "YP" |
| Vartotojas <v> perkrovė sistemą (313) | E313 | "RR" |
| Sirenos gedimas | E320 | "RC" |
| Sistemos gedimas (321) | E321 | "YA" |
| Sistemos gedimas (330) | E330 | "ET" |
| Sistemos gedimas (332) | E332 | "ET" |
| Sistemos gedimas (333) | E333 | "ET" |
| Sistemos gedimas (336) | E336 | "VT" |
| Sistemos gedimas (338) | E338 | "ET" |
| Sistemos gedimas (341) | E341 | "ET" |
| Sistemos gedimas (342) | E342 | "ET" |
| Sistemos gedimas (343) | E343 | "ET" |
| Sistemos gedimas (344) | E344 | "XQ" |
| Sistemos ryšio klaida (350) | E350 | "YC" |
| Sistemos ryšio klaida (351) | E351 | "LT" |
| Sistemos ryšio klaida (352) | E352 | "LT" |
| Sistemos gedimas (353) | E353 | "YC" |
| Sistemos ryšio klaida (354) | E354 | "YC" |
| Sistemos gedimas (355) | E355 | "UT" |
| Gaisro gedimas zonoje: <z> | E373 | "FT" |
| Gedimas zonoje: <z> | E374 | "EE" |
| Gedimas zonoje: <z> | E378 | "BG" |
| Gedimas zonoje: <z> | E380 | "UT" |
| Nėra ryšio su bevieliu zonos <z> jutikliu | E381 | "US" |
| Belaidžio modulio gedimas (382) | E382 | "UY" |
| Pažeista elektroninė apsauga | E383 | "TA" |
| Išsikrovė baterija belaidėje zonoje: <z> | E384 | "XT" |
| Gedimas zonoje: <z> (389) | E389 | "ET" |
| Gedimas zonoje: <z> (391) | E391 | "NA" |
| Gedimas zonoje: <z> (393) | E393 | "NC" |
| Vartotojas <v> išjungė sistemą | E400 | "OP" |
| Vartotojas <v> išjungė sistemą | E401 | "OP" |
| Automatinis išjungimas | E403 | "OA" |
| Atidėtas išjungimas. Vartotojas <v> | E405 | "OR" |
| Vartotojas <v> atšaukė aliarmą | E406 | "BC" |
| Nuotolinis išjungimas <v> kodu | E407 | "OP" |
| Greitas išjungimas | E408 | "OP" |
| Nuotoliniu būdu įjungta Nesaugoma | E409 | "OS" |
| Užklausa, kurią pateikė CSP | E411 | "RB" |
| Įvykdytas duomenų atsisiuntimas | E412 | "RS" |
| Vartotojui <v> įėjimas uždraustas | E421 | "JA" |
| Vartotojui <v> leistas įėjimas | E422 | "DG" |
| Priverstinė prieiga zonoje <z> | E423 | "DF" |
| Vartotojui <v> išėjimas uždraustas | E424 | "DD" |
| Vartotojui <v> leistas išėjimas | E425 | "DR" |
| Ankstyvas išjungimas <v> kodu | E451 | "OK" |
| Vėlyvas įjungimas <v> kodu | E452 | "OJ" |
| Vartotojui <v> nepavyko išjungti sistemos | E453 | "CT" |
| Vartotojui <v> nepavyko įjungti sistemos | E454 | "CI" |
| Automatinis įjungimas nepavyko | E455 | "CI" |
| Dalinis įjungimas kodu: <v> | E456 | "CG" |
| Išėjimo pažeidimas. Vartotojas <v> | E457 | "EE" |
| Išjungimas po aliarmo, vartotojas: <v> | E458 | "OR" |
| Recent arm <v> user | E459 | "CR" |
| Klaviatūra surinktas negaliojantis signalizacijos valdymo kodas | E461 | "JA" |
| Vartotojas <v> prailgino automatinio įjungimo laiką | E464 | "CE" |
| Įrenginys išjungtas (501) | E501 | "RL" |
| Įrenginys įjungtas (520) | E520 | "RO" |
| Belaidis jutiklis zonoje: <z> išjungtas (552) | E552 | "YS" |
| Zonos <z> stebėjimas laikinai išjungtas | E570 | "UB" |
| Zonos <z> stebėjimas laikinai išjungtas | E571 | "FB" |
| Zonos <z> stebėjimas laikinai išjungtas | E572 | "MB" |
| Zonos <z> stebėjimas laikinai išjungtas | E573 | "BB" |
| <v> laikinai išjungė zonos stebėjimą | E574 | "CG" |
| Zonos <z> stebėjimas laikinai išjungtas | E576 | "UB" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | E577 | "UB" |
| Vent zonos stebėjimas laikinai išjungtas | E579 | "UB" |
| Rankinis testavimo pranešimas | E601 | "RX" |
| Periodinis testavimo pranešimas | E602 | "RP" |
| Sisteminis įvykis (605) | E605 | "JL" |
| Sisteminis įvykis (606) | E606 | "LF" |
| Vartotojas <v> aktyvavo jutiklių patikrą | E607 | "TS" |
| Periodinis testavimo pranešimas su gedimu | E608 | "RY" |
| Sisteminis įvykis (622) | E622 | "JL" |
| Sisteminis įvykis (623) | E623 | "JL" |
| Vartotojas <v> nustatė naują sistemos laiką | E625 | "JT" |
| Netikslus Laikas/Data | E626 | "JT" |
| Pradėtas sistemos programavimas | E627 | "LB" |
| Sistemos programavimas baigtas | E628 | "LS" |
| Sisteminis įvykis (631) | E631 | "JS" |
| Sisteminis įvykis (632) | E632 | "JS" |
| Sistema neaktyvi (654) | E654 | "CD" |
| Medicininis pavojus atsistatė | R100 | "MH" |
| Asmeninis pavojus atsistatė | R101 | "QH" |
| Nebėra gaisro aliarmo zonoje: <z> | R110 | "FH" |
| Vandens nuotėkio jutiklis po pavojaus atsistatė | R113 | "SH" |
| Užpuolimas zonoje: <z> atsistatė | R120 | "PH" |
| Užpuolimo signalą atšaukė vartotojas <v> | R121 | "HH" |
| Užpuolimas zonoje: <z> atsistatė | R122 | "PH" |
| Užpuolimas zonoje: <z> atsistatė | R123 | "PH" |
| Užpuolimas zonoje: <z> atsistatė | R124 | "HH" |
| Užpuolimas zonoje: <z> atsistatė | R125 | "HH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R130 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R131 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R132 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R133 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R134 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R135 | "BH" |
| Elektroninės apsaugos grandinė po pažeidimo atsistatė | R137 | "TA" |
| Zonos <z> jutiklis po pavojaus atsistatė | R140 | "UH" |
| Nebėra sistemos gedimo (143) | R143 | "ER" |
| Zonos <z> jutiklis po sabotažo pavojaus atsistatė | R144 | "TR" |
| Zonos <z> jutiklis po sabotažo pavojaus atsistatė | R145 | "TR" |
| Zonos <z> jutiklis po sabotažo pavojaus atsistatė | R146 | "BH" |
| Zonos <z> jutiklis po pavojaus atsistatė | R150 | "UH" |
| Dujų jutiklis po pavojaus atsistatė | R151 | "GH" |
| Vandens nuotėkio jutiklis po pavojaus atsistatė | R154 | "WH" |
| Atsistatymas: Folijos trūkis zonoje: <z> | R155 | "BH" |
| Sensoriaus <n> temperatūra normalizavosi | R158 | "KH" |
| Sensoriaus <n> temperatūra normalizavosi | R159 | "ZH" |
| CO dujų jutiklis po pavojaus atsistatė | R162 | "GH" |
| Nebėra gaisro gedimo zonoje: <z> | R200 | "FV" |
| Aliarmo atkūrimo stebėjimas | R220 | "BH" |
| Nebėra sistemos gedimo (300) | R300 | "YQ" |
| Maitinimas kintama įtampa atsikūrė | R301 | "AR" |
| Akumuliatorius įkrautas | R302 | "YR" |
| Nebėra sistemos gedimo (304) | R304 | "YG" |
| Sistemos atstatymas atkurtas zonoje: <z> | R305 | "RR" |
| Akumuliatoriaus gedimas atsistatė (309) | R309 | "YR" |
| Nebėra įžeminimo gedimo | R310 | "UR" |
| Akumuliatorius po gedimo vėl veikia | R311 | "YR" |
| Įjungta apsauga nuo viršsrovių | R312 | "YQ" |
| Sirenos gedimas atsistatė (320) | R320 | "RO" |
| Nebėra sistemos gedimo (321) | R321 | "YH" |
| Nebėra sistemos gedimo (330) | R330 | "ER" |
| Nebėra sistemos gedimo (332) | R332 | "ER" |
| Nebėra sistemos gedimo (333) | R333 | "ER" |
| Nebėra sistemos gedimo (336) | R336 | "VR" |
| Nebėra sistemos gedimo (338) | R338 | "ER" |
| Nebėra sistemos gedimo (341) | R341 | "ER" |
| Nebėra sistemos gedimo (342) | R342 | "ER" |
| Nebėra sistemos ryšio klaidos (350) | R350 | "YK" |
| Nebėra sistemos gedimo (344) | R344 | "XH" |
| Nebėra sistemos ryšio klaidos (351) | R351 | "LR" |
| Nebėra sistemos ryšio klaidos (352) | R352 | "LR" |
| Nebėra sistemos gedimo (353) | R353 | "YK" |
| Nebėra sistemos ryšio klaidos (354) | R354 | "YK" |
| Nebėra sistemos gedimo (355) | R355 | "UJ" |
| Nebėra gaisro gedimo zonoje: <z> | R373 | "FJ" |
| Nebėra gedimo zonoje: <z> | R374 | "EA" |
| Nebėra gedimo zonoje: <z> | R380 | "UJ" |
| Atkurtas ryšys su bevieliu zonos <z> jutikliu | R381 | "UR" |
| Nebėra belaidžio modulio gedimo (382) | R382 | "BR" |
| Elektroninės apsaugos grandinė po pažeidimo atsistatė | R383 | "TR" |
| Atsistatė baterija belaidėje zonoje: <z> | R384 | "XR" |
| Nebėra gedimo zonoje: <z> (391) | R391 | "NS" |
| Nebėra gedimo zonoje: <z> (393) | R393 | "NS" |
| Vartotojas <v> įjungė sistemą | R400 | "CL" |
| Vartotojas <v> įjungė sistemą | R401 | "CL" |
| Automatinis įjungimas | R403 | "CA" |
| Nuotolinis įjungimas <v> kodu | R407 | "CL" |
| Greitas įjungimas | R408 | "CL" |
| Nuotoliniu būdu įjungta Saugoma | R409 | “CS” |
| Vartotojas <v> įjungė STAY režimą | R441 | "CG" |
| Ankstyvas įjungimas <v> kodu | R451 | “CK” |
| Vėlyvas išjungimas <v> kodu | R452 | “CJ” |
| Vartotojui <v> nepavyko išjungti sistemos | R454 | “CI” |
| Dalinis įjungimas kodu: <v> | R456 | "CG" |
| Įrenginys įjungtas (501) | R501 | "RG" |
| Įrenginys įjungtas (520) | R520 | "RC" |
| Recent disarm <v> user | R459 | “CR” |
| Belaidis jutiklis zonoje: <z> įjungtas (552) | R552 | "YK" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R570 | "UU" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R571 | "FU" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R572 | "MU" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R573 | "BU" |
| <v> zonos stebėjimą po išjungimo vėl įjungė | R574 | "CF" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R576 | "UU" |
| Zonos <z> stebėjimas po išjungimo vėl įjungtas | R577 | "UU" |
| Vent zonos stebėjimas po išjungimo vėl įjungtas | R579 | "UU" |
| Vartotojas <v> išjungė jutiklių patikrą | R607 | "TE" |
| Vartotojas <v> nustatė naują sistemos laiką | R625 | "JT" |
| Sistema aktyvi (654) | R654 | "CD" |
