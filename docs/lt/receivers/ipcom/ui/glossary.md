# IPcom UI žodynėlis

Naudokite šį žodynėlį peržiūrėdami korteles `Būsena`, `Gaunami įvykiai` ir `Objektai`.

## Pagrindiniai ID

- `OID` - Objekto ID IPcom sistemoje.
- `PUID` - Dalinis UID (sutrumpintas įrenginio UID, rodomas įvykių sąrašuose).
- `UID` - Unikalus įrenginio identifikatorius.
- `ICCID` - Korinio ryšio SIM kortelės identifikatorius.

## Ryšys ir perdavimas

- `Com` / `Com Type` - Įrenginio naudojamas ryšio kanalas (pvz., `GSM`, `WiFi`, `LAN`).
- `Con` - Ryšio protokolas (pvz., `TCP`, `UDP`).
- `Lvl` - Signalo lygio indikatorius.
- `Ping` - Keepalive arba pasiekiamumo indikatorius.
- `SMS Ping` - Keepalive per SMS perdavimo kanalą.

## Maršrutizavimo laukai {#glossary-routing-fields}

- `RR ID` - Imtuvo maršrutizavimo identifikatorius. [REVIEW]
- `RR` - Imtuvo numeris, naudojamas įvykių maršrutizavimui. [REVIEW]
- `LL` - Linijos numeris, naudojamas įvykių maršrutizavimui. [REVIEW]
- `Dev RR` - Įrenginio pateikta imtuvo reikšmė. [REVIEW]
- `Dev LL` - Įrenginio pateikta linijos reikšmė. [REVIEW]
- `Reg?` - Įrenginio registracijos būsenos vėliavėlė. [REVIEW]

## Įvykio duomenų laukai

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

## Priežiūros laukai {#glossary-supervision-fields}

- `OOVR` - Objekto priežiūros / override laukas, rodomas kortelėje `Objektai`. Tiksli reikšmė kol kas [REVIEW].
