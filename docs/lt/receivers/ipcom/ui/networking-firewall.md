# Tinklo ir ugniasienės gairės

Šiame puslapyje iš IT eksploatavimo perspektyvos apibendrinamos IPcom tinklo ribos.

## Srauto kryptys {#network-traffic-directions}

- Įeinantis srautas į IPcom: įrenginių srautas pasiekia sukonfigūruotus imtuvų listenerius (`TCP` / `UDP` / `COM` / modemo kelius).
- Išeinantis srautas iš IPcom: įvykiai ir būsenos srautas siunčiami į CMS / automatizavimo išėjimus.

## Ugniasienės planavimas {#network-firewall-planning}

- Įeinančių imtuvo listenerio prievadų prieigą leiskite tik iš patikimų įrenginių / šaltinių tinklų.
- Išeinantį srautą leiskite tik į patvirtintus CMS / automatizavimo paskirties IP adresus ir prievadus.
- Valdymo UI prieigą apribokite administratorių tinklais, jump host'ais arba VPN.
- Prieš keisdami listenerio prievadus kortelėje `Imtuvai`, peržiūrėkite NAT ir port-forwarding taisykles.

## IP leidžiamų adresų pastabos {#network-ip-allowlist}

- `IP Whitelist` laukai pateikiami tiek `Bendrieji nustatymai`, tiek `Išėjimai` kontekstuose.
- Krypties ir taikymo logiką būtina patikrinti jūsų diegime prieš remiantis šia funkcija segmentavimui. [REVIEW]

## Pakeitimų kontrolinis sąrašas {#network-change-checklist}

1. Ugniasienės ir NAT pakeitimus pritaikykite prieš keisdami produkcinius imtuvų / išėjimų nustatymus.
2. Patikrinkite ryšį naudodami kontroliuojamus testinius įvykius.
3. Stebėkite `Būsenos` buferius ir `Žurnalus`, ar nėra atmetimų arba ryšio klaidų.
4. Greitam atkūrimui paruoškite grąžinimo taisyklių rinkinį.
