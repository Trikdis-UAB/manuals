# IPcom v5 imtuvo apžvalga

![IPcom Control apžvalgos viršelis su Debian amd64, Windows 11 ir RL25 diegimo variantais](./ui/assets/screens/overview.webp)

IPcom v5 yra imtuvas, skirtas apsaugos sistemų įvykiams rinkti, apdoroti, maršrutizuoti ir stebėti. Jis pateikia žiniatinklio sąsają darbui ir administravimui.

Toliau pateikti leidimai yra tas pats IPcom v5 produktas su skirtingais diegimo modeliais:

- Diegimas į Windows
- Diegimas į Linux (aparatinė įranga arba VM)
- RL25 aparatinis imtuvas

## Diegimo variantai

| Variantas | Ką tai reiškia | Tipinis naudojimas |
| --- | --- | --- |
| Diegimas į Windows | IPcom v5 įdiegtas Windows aplinkoje | Mažesnės arba į Windows orientuotos aplinkos |
| Diegimas į Linux (aparatinė įranga arba VM) | IPcom v5 įdiegtas Linux serveryje arba virtualiojoje mašinoje | Plečiami diegimai ir serverinė infrastruktūra |
| RL25 aparatinis imtuvas | IPcom v5 dedikuotoje RL25 aparatinėje įrangoje | Appliance tipo diegimas su iš anksto paruošta Linux aplinka |

## Galimybių palyginimas pagal diegimo būdą

Funkciniai skirtumai tarp leidimų:

| Funkcija | Diegimas į Windows | Diegimas į Linux (aparatinė įranga arba VM) | Linux diegimas RL25 |
| --- | --- | --- | --- |
| Prižiūrimų įrenginių skaičius | Iki 500 objektų (galima padidinti) | Iki 50 000 vienam 1 GB RAM | Iki 50 000 vienam 1 GB RAM |
| Protegus 2 programa (perdavimas per imtuvą) | Ne | Taip | Taip |

`Perdavimas per imtuvą` reiškia, kad įrenginių įvykiai ir būsenos per IPcom persiunčiami į Protegus 2, o palaikomi veiksmai gali būti siunčiami atgal į įrenginius taip pat per IPcom.

## Aparatinės įrangos reikalavimai

Planuodami naujus diegimus vadovaukitės šiomis pradinėmis rekomendacijomis.

### Linux diegimas (aparatinė įranga arba VM)

Linux platformos reikalavimai:

- IPcom v5 Linux leidimas palaikomas tik `amd64` (`x86_64`) architektūroje.
- Rekomenduojama bazinė OS yra Debian Stable (`amd64`).
- Debian `netinst` nuorodos rodo į dabartinį Stable leidimą ir laikui bėgant gali keistis.
- Kontroliuojamiems diegimams tikslų Debian ISO failo pavadinimą ir versiją fiksuokite diegimo dokumentacijoje.
- Ne `amd64` platformos (pavyzdžiui, `arm64` / `aarch64`) IPcom v5 Linux diegimui nepalaikomos.
- Jei aparatinė įranga nėra `amd64`, naudokite palaikomą alternatyvą, pvz., diegimą į Windows arba RL25 aparatūrą.

| Diegimo dydis | RAM | Saugykla |
| --- | --- | --- |
| Bazinis diegimas | 4 GB | 128 GB SSD |
| Didelė objektų apkrova (apie 100 000 objektų) | 8 GB | 128 GB SSD |
| Didelė objektų apkrova su įjungta duomenų baze | 8 GB | 256 GB enterprise SSD |

Pastabos:

- Diegimuose, kuriuose daug naudojama duomenų bazė, 256 GB enterprise SSD rekomendacija pirmiausia siejama su ištverme (didesniu DWPD), o ne vien talpa.
- Suplanuokite papildomos laisvos vietos diskui žurnalams, atsarginėms kopijoms ir atnaujinimų grąžinimo failams.

### Diegimas į Windows

Mažiausia rekomenduojama konfigūracija:

- Windows 11 Pro arba Windows 11 Enterprise
- 2 branduolių CPU
- 8 GB RAM
- 128 GB HDD / SSD (pageidautina SSD)

### RL25 aparatinis imtuvas

- RL25 tiekiamas su iš anksto įdiegtais SSD ir RAM.
- Rinkitės RL25, kai svarbus appliance tipo diegimas ir iš anksto patikrinta aparatinė įranga.

## Bendros galimybės (visiems variantams)

### Pagrindinis priėmimas ir valdymas

- IP imtuvas, SMS imtuvas (pasirinktinai / GM14 / SMPP) ir priėmimas per RS232.
- Nuotolinis TRIKDIS konfigūravimas ir nuotolinis TRIKDIS valdymas.
- Priežiūra, pranešimų maršrutizavimas ir radijo pranešimų filtravimas.
- Imtuvo valdymas per žiniatinklio puslapį (HTTP / HTTPS).

### Protokolai ir integracijos

- Palaikomi protokolai: Trikdis (TCP / UDP / COM / SMS).
- CMS / automatizavimo protokolai: Split / Multi-Port Reporting.
- CMS formatai: Ademco 685, Monas3, Surgard MLR2, MLR2000, SIA DC-09.
- CMS / automatizavimo perdavimo tipai: TCP Client / Server, RS232, JSON, Webhook.
- SQL DB sąsaja ir objektų informacijos eksportas.

### UI ir eksploatacinės funkcijos

- Redaguojama naudotojo sąsaja.
- Paskyros perrašymas imtuvo lygiu ir susietos paskyros (panelės) rodymas.
- Galimybė ignoruoti pirminius pranešimus.
- Įrenginių blokavimas pagal ID (planuojama).
- Nustatymų keitimo žurnalas.
- Imtuvo sistemos apžvalgos skydelis.
- Nuotolinis atnaujinimas.
- Kelių lygių naudotojų sąrašas.

## Eksploatavimo sritis

### Prieiga ir sauga

- Prisijungimas naršyklėje pagal IP adresą arba domeną su nurodomu prievadu.
- HTTP / HTTPS valdymo sąsaja, su SSL naudojimu saugiai prieigai.
- Naudotojų sąrašas, administratoriaus paskyra, teisių priskyrimas ir sesijos / žetono valdymas.

Žingsnis po žingsnio prieigos būdai (Web ir Windows `.exe`) aprašyti puslapyje [Prieiga ir prisijungimas](./ui/access-and-login.md).
Naudotojų kūrimo, slaptažodžių, teisių ir žetonų procedūros aprašytos puslapyje [Naudotojų kortelė](./ui/screens/users.md).

Eksploatacinės saugos bazė:

- Valdymo UI prieigą ribokite pagal leidžiamų tinklų sąrašą arba VPN.
- Visoms administratoriaus sesijoms naudokite HTTPS su galiojančiais sertifikatais.
- `administrator` palikite avariniam naudojimui; kasdieniam darbui naudokite vardines mažiausių teisių paskyras.
- Reguliariai keiskite kredencialus ir integracijų paslaptis.

### Stebėjimas ir eksploatavimas

- Sistemos ir objektų būsenos skydelis.
- Online / offline / untracked stebėsena ir įvykių statistika.
- Sistemos ir sesijų žurnalai operaciniam matomumui užtikrinti.

### Įvykiai, maršrutizavimas ir protokolų apdorojimas

- Įvykių sąrašo apdorojimas su filtravimo ir paieškos galimybėmis.
- Ping / heartbeat apdorojimas ryšio priežiūrai.
- Maršrutizavimas ir išėjimų valdymas CMS / automatizavimo srautams.

### Integracijos ir duomenys

- SQL pagrindu veikiantys operaciniai duomenys ir objektų eksportas.
- API / integracijų palaikymas per JSON ir webhook transportą.

### Diegimas ir gyvavimo ciklas

- Diegimas Windows ir Linux platformose.
- Konfigūracijos importo / eksporto ir nuotolinio atnaujinimo procesai.
- Licencijavimo ir serverio pusės eksploataciniai aspektai.

## Greita prieiga

Naudokite šiuos puslapius kaip pagrindinius įėjimo taškus:

- Prieigos būdai ir trikčių šalinimas: [Prieiga ir prisijungimas](./ui/access-and-login.md)
- Eksploatacinis veikimas ekranas po ekrano: [Būsenos kortelė](./ui/screens/status.md) (ir kiti `Naudotojo sąsajos` puslapiai)
- Naudotojų ir teisių procedūros: [Naudotojų kortelė](./ui/screens/users.md)
