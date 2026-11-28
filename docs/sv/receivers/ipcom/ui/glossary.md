# Ordlista för IPCom-gränssnittet

Använd den här ordlistan när du går igenom flikarna `Status`, `Incoming events` och `Objects`.

## Centrala ID

- `OID` (objekt-ID) - objekt-ID i IPCom.
- `PUID` - delvis UID (förkortat enhets-UID som visas i händelselistor).
- `UID` - unikt enhets-ID.
- `ICCID` - SIM-kortets ID för mobilanslutna enheter.
- `OOVR` (överstyrt OID) - överstyrt OID. Ett alternativt objektnummer som ersätter objektets eget OID och används för att byta ut ett objekt mot den abonnentkod som larmcentralens programvara förväntar sig. Tomt eller `0` betyder att ingen överstyrning används.

## Anslutning och transport

- `Com` / `Com Type` - kommunikationskanalen som enheten använder (till exempel `GSM`, `WiFi`, `LAN`).
- `Con` - anslutningsprotokoll (till exempel `TCP`, `UDP`).
- `Lvl` - indikator för signalnivå.
- `Ping` - indikator för att anslutningen hålls vid liv eller går att nå.
- `SMS Ping` - samma sak över SMS-transport.

## Fält för vidarebefordran {#glossary-routing-fields}

- `RR ID` - mottagar-ID.
- `RR` - mottagarnummer.
- `LL` - linjenummer.
- `Dev RR` - mottagarnummer som enheten själv rapporterar.
- `Dev LL` - linjenummer som enheten själv rapporterar.

## Fält i händelsens innehåll

- `Reg?` - visar om just den här händelsen är en registreringshändelse. Det beskriver händelsen, inte enhetens aktuella tillstånd.
- `Seq` - händelsens sekvensnummer.
- `Code` - händelsekod som skickas till efterföljande system.
- `Group` - värde för händelsegrupp.
- `Zone` - värde för händelsens sektion.
- `Type` / `SubType` - händelsens kategori och underkategori.
- `P` - värde för område (om centralapparatens protokoll använder det).

## Driftstatus

- `Online` - enheten kommunicerar aktivt inom övervakningsgränserna.
- `Offline` - enheten har missat övervakningsgränserna.
- `Untracked` - enheten finns men övervakas för tillfället inte av spårningsfunktionen.
