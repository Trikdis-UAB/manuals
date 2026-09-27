# Objektai

![Kortelės Objektai pilno ekrano vaizdas](../assets/screens/objects.webp)

**Paskirtis:** Peržiūrėti ir valdyti stebimų objektų (įrenginių) sąrašą, jų būseną ir ryšio duomenis.

## Kada naudoti

- Kai ieškote konkretaus įrenginio arba tikrinate jo online būseną.
- Kai eksportuojate įrenginių sąrašus arba audituojate ryšio problemas.

## Skiltys ir kodėl jos svarbios

### Veiksmai ir filtrai {#objects-actions-filters}

- `Refresh` iš naujo įkelia sąrašą, kad būtų parodytos naujausios įrenginių būsenos.
- `Delete all objects` pašalina visus objektus iš sąrašo ir turi būti naudojamas tik gavus aiškų patvirtinimą.
- `Export` atsisiunčia šiuo metu filtruotą sąrašą kaip kabliataškiais skiriamą CSV failą `objects.csv`: po eilutę kiekvienam įrenginiui, papildomos eilutės kiekvienam kanalui ir, jei rodomi, kiekvienam susijusiam objektui. Reikšmės rašomos dvigubose kabutėse, loginės reikšmės — `Yes`/`No`. Faile yra objektų ir įrenginių identifikatoriai — saugokite jį atitinkamai.
- `OID` ir `UID` filtravimo laukai padeda susiaurinti didelius sąrašus, o `+` pritaiko filtrą, `Clear` jį atstato.
- `Show Related Objects` išplečia sąrašą susijusiais įrašais.

![Kortelės Objektai veiksmų ir filtrų skiltis](../assets/screens/objects-sections/actions-and-filters.webp)

### Objektų sąrašo lentelė {#objects-object-list}

Pagrindiniai stulpeliai:

- Identifikavimas: `OID`, `UID` ir `ICCID` identifikuoja įrenginį bei SIM kortelę.
- Būsena: `Status` ir `Last Activity` rodo pasiekiamumą ir paskutinio atsiskaitymo laiką.
- Ryšys: `Ping`, `IP`, `Lvl` (signalo lygis), `Com Type` (GSM / WiFi / LAN) ir `Con` (TCP / UDP) parodo perdavimo būklę.
- Įrenginio versija: `HW` ir `FW` padeda susieti elgseną su programinės arba aparatinės įrangos leidimu.
- Maršrutizavimas: `RR ID` (imtuvo ID), `RR` (imtuvo numeris) ir `LL` (linijos numeris) rodo maršrutizavimo kontekstą; `Dev RR` ir `Dev LL` yra įrenginio pateiktos maršrutizavimo reikšmės.
- `OOVR` yra OID perrašymas: alternatyvus objekto numeris, pakeičiantis objekto savąjį OID, kad objektas atitiktų jūsų stebėjimo programos laukiamą abonento numerį. Tuščia reikšmė arba `0` reiškia, kad pakeitimas netaikomas.

Raudoni `X` indikatoriai stulpelyje `Ping` paprastai reiškia, kad neseniai nebuvo užfiksuotas ping.
Visas laukų reikšmes žr. `Žodynėlyje` IPcom navigacijoje.

![Kortelės Objektai objektų sąrašo lentelės skiltis](../assets/screens/objects-sections/object-list-table.webp)

### Veikimo patikros ir veiksmai {#objects-operational-checks}

Atlikite dvi greitas peržiūras: pirmiausia stebėkite objektų būsenos signalus laike, tada patikrinkite lentelės reikšmes pagal numatytą maršrutizavimą ir inventorių.

**Stebėkite vykdymo metu:**

- Atsitiktinius destruktyvius veiksmus (`Delete all objects`) eksploatacijos metu. Įspėjamasis požymis: staiga tuščias inventorius.
- Pasenusią filtro būseną. Įspėjamasis požymis: tikėti įrenginiai nerodomi dabartiniame vaizde.
- `Status` ir `Last Activity` išsiskyrimą. Įspėjamasis požymis: objektas rodomas online, bet veiklos laiko žyma pasenusi.
- Pasikartojančius `Ping` raudonus `X` toje pačioje perdavimo grupėje. Įspėjamasis požymis: kanalo arba kelio degradacija.
- Netikėtai pasikeitusios `OOVR` reikšmės. Įspėjamasis požymis: objektas susietas su kitu abonento numeriu, todėl jo įvykiai stebėjimo programoje ateis tuo numeriu.

**Patvirtinkite prieš naudojimą produkcijoje:**

- Prieš incidento analizės momentines kopijas naudojamas `Refresh`.
- Maršrutizavimo laukai (`RR ID`, `RR`, `LL`, `Dev RR`, `Dev LL`) atitinka imtuvų / išėjimų susiejimą.
- Aparatinės ir programinės įrangos laukai (`HW`, `FW`) pateikti tikėtiniems valdomų įrenginių tipams.
