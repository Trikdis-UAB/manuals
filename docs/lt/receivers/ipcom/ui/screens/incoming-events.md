# Gaunami įvykiai

![Kortelės Gaunami įvykiai pilno ekrano vaizdas](../assets/screens/incoming-events.webp)

**Paskirtis:** Stebėti gaunamus įrenginių įvykius ir ping'us realiuoju laiku bei filtruoti juos pagal įrenginį arba imtuvą.

## Kada naudoti

- Kai tikrinate, ar įrenginiai siunčia įvykius.
- Kai šalinate maršrutizavimo, ryšio arba įvykių dekodavimo triktis.

## Skiltys ir kodėl jos svarbios

### Filtrai ir veiksmai {#incoming-events-filters}

- `Show events` ir `Show pings` perjungia, kokie pranešimų tipai rodomi.
- `OID`, `UID` ir `Receiver` filtrai susiaurina srautą iki konkretaus įrenginio arba instancijos.
- `Apply filter` atnaujina vaizdą, `Clear` išvalo filtro laukus, o `Clear events` išvalo dabartinį sąrašą.

Filtrai yra būtini didelės apimties imtuvams, kur žaliavinio srauto slinkimas yra nepraktiškas.

![Kortelės Gaunami įvykiai filtrų ir veiksmų skiltis](../assets/screens/incoming-events-sections/filters-and-actions.webp)

### Gaunamų įvykių lentelė {#incoming-events-table}

Lentelė yra plati ir sugrupuota pagal paskirtį:

- Identifikavimas: `Time`, `OID`, `PUID`, `UID`, `ICCID` identifikuoja įrenginį.
- Ryšys: `Signal`, `Com` (ryšio tipas), `Con` (protokolas), `IP`, `Ping`, `SMS Ping` rodo perdavimo būklę.
- Įrenginio versija: `HW` ir `FW` padeda susieti elgseną su aparatinės arba programinės įrangos leidimais.
- Maršrutizavimas: `RR ID` (maršruto identifikatorius), `RR` (imtuvo maršruto reikšmė) ir `LL` (linijos reikšmė) rodo maršrutizavimo kontekstą; `Dev RR` ir `Dev LL` yra įrenginio pateiktos maršrutizavimo reikšmės. `Reg?` nurodo registracijos būseną.
- Įvykio detalės: `Seq`, `C`, `Code`, `Group`, `Zone`, `Type`, `SubType`, `P` apibrėžia įvykio duomenis.

Naudokite šiuos stulpelius patvirtinti, kad įvykiai teisingai dekoduojami ir maršrutizuojami į numatytą išėjimą.
Visas laukų reikšmes žr. `Žodynėlyje` IPcom navigacijoje.

### Veikimo patikros ir veiksmai {#incoming-events-operational-checks}

Incidento tyrimo metu atlikite dvi greitas peržiūras: pirmiausia įsitikinkite, kad srauto vaizdas patikimas, tada patikrinkite maršrutizavimo ir duomenų laukus.

**Stebėkite vykdymo metu:**

- Netikėtai aktyvią filtro būseną. Įspėjamasis požymis: operatoriai praleidžia įvykius, nes vaizdas per daug susiaurintas.
- `Time` dreifą ir uždelstas eilutes. Įspėjamasis požymis: delsos šuolis nuo įrenginio iki imtuvo.
- `RR/LL` neatitikimą numatytam imtuvo keliui. Įspėjamasis požymis: įvykiai pasirodo neteisingame maršruto kontekste.
- Pasikartojančius neteisingus `Code/Group/Zone` derinius. Įspėjamasis požymis: dekodavimo / parsingo neatitikimas po konfigūracijos pakeitimų.

**Patvirtinkite prieš naudojimą produkcijoje:**

- `Clear` grąžina lentelę į tikėtiną pilną srautą prieš atliekant platesnę incidento analizę.
- Identifikavimo laukai (`OID`, `UID`, `PUID`) atitinka žinomus objektus.
- Perdavimo laukai (`Con`, `IP`, `Ping`, `SMS Ping`) dera su įrenginio ryšio režimu.
