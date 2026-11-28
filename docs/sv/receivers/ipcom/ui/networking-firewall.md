# Guide för nätverk och brandvägg

Den här sidan sammanfattar nätverksgränserna för IPCom ur ett IT-driftsperspektiv.

## Trafikriktningar {#network-traffic-directions}

- Inkommande till IPCom: enheternas trafik når de konfigurerade mottagarlyssnarna (`TCP`/`UDP`/`COM`/modem).
- Utgående från IPCom: händelser och statustrafik skickas till utgångar mot CMS/automation.

## Planering av brandvägg {#network-firewall-planning}

- Tillåt inkommande trafik till mottagarnas lyssnarportar endast från betrodda enhets- eller källnätverk.
- Tillåt utgående trafik endast till godkända IP-adresser och portar för CMS/automation.
- Begränsa åtkomsten till hanteringsgränssnittet till administratörsnätverk, hoppservrar eller VPN.
- Granska reglerna för NAT och portvidarebefordran innan du ändrar lyssnarportar i `Receivers`.

## Om IP-tillåtelselistan {#network-ip-allowlist}

- `IP Whitelist` gäller de utgångstyper där IPCom lyssnar efter en inkommande anslutning: `JSON Server` och `TCP Server`. Ställ in den per utgång i fliken `Outputs`.
- Den filtrerar efter källa: bara de adresser du anger får ansluta till den lyssnaren. Den begränsar inte vart IPCom skickar utgående trafik, så utgångstyper som ansluter utåt påverkas inte av den.

## Checklista för ändringar {#network-change-checklist}

1. Gör ändringar i brandvägg och NAT innan du ändrar inställningar för mottagare eller utgångar i produktion.
2. Verifiera anslutningen med kontrollerade testhändelser.
3. Följ buffertarna i `Status` och `Logs` för avvisade eller misslyckade anslutningar.
4. Ha en uppsättning regler för att gå tillbaka, så att du snabbt kan återställa.
