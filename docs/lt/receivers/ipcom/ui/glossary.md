# IPcom UI žodynėlis

Naudokite šį žodynėlį peržiūrėdami korteles `Būsena`, `Gaunami įvykiai` ir `Objektai`.

## Pagrindiniai ID

- `OID` - Objekto ID IPcom sistemoje.
- `PUID` - Dalinis UID (sutrumpintas įrenginio UID, rodomas įvykių sąrašuose).
- `UID` - Unikalus įrenginio identifikatorius.
- `ICCID` - Korinio ryšio SIM kortelės identifikatorius.
- `OOVR` - OID perrašymas. Alternatyvus objekto numeris, pakeičiantis objekto savąjį OID; naudojamas objektui susieti su tuo abonento numeriu, kurio tikisi jūsų stebėjimo programa. Tuščia reikšmė arba `0` reiškia, kad pakeitimas netaikomas.

## Ryšys ir perdavimas

- `Com` / `Com Type` - Įrenginio naudojamas ryšio kanalas (pvz., `GSM`, `WiFi`, `LAN`).
- `Con` - Ryšio protokolas (pvz., `TCP`, `UDP`).
- `Lvl` - Signalo lygio indikatorius.
- `Ping` - Keepalive arba pasiekiamumo indikatorius.
- `SMS Ping` - Keepalive per SMS perdavimo kanalą.

## Maršrutizavimo laukai {#glossary-routing-fields}

- `RR ID` - Imtuvo ID.
- `RR` - Imtuvo numeris.
- `LL` - Linijos numeris.
- `Dev RR` - Imtuvo numeris, kurį nurodo pats įrenginys.
- `Dev LL` - Linijos numeris, kurį nurodo pats įrenginys.

## Įvykio duomenų laukai

- `Reg?` - Žymi, ar konkretus įvykis yra registracijos įvykis. Apibūdina įvykį, o ne esamą įrenginio būseną.
- `Seq` - Įvykio sekos numeris.
- `Code` - Įvykio kodas, siunčiamas į paskirties sistemas.
- `Group` - Įvykio grupės reikšmė.
- `Zone` - Įvykio zonos reikšmė.
- `Type` / `SubType` - Įvykio kategorija ir subkategorija.
- `P` - Skirsnio reikšmė (jei naudojama panelės protokole).

## Veikimo būsenos

- `Online` - Įrenginys aktyviai komunikuoja neviršydamas priežiūros slenksčių.
- `Offline` - Įrenginys praleido priežiūros slenksčius.
- `Untracked` - Įrenginys yra sistemoje, bet šiuo metu nėra prižiūrimas stebėjimo logikos.
