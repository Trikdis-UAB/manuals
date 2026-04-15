# Prisijungimas

**Paskirtis:** Autentifikuotis IPcom Control Web aplinkoje prieš pasiekiant stebėjimo ir administravimo korteles.

## Kada naudoti

- Kiekvienos administravimo arba stebėjimo sesijos pradžioje.
- Pasibaigus žetono / sesijos galiojimui arba atsijungus rankiniu būdu.

## Skiltys ir kodėl jos svarbios

### Prisijungimo forma

Surinka `Username` ir `Password` reikšmes ir, pasirinkus `Login`, pradeda sesiją.

### Versijos rodiklis

Šiame ekrane rodoma versija padeda operatoriams prieš atliekant pakeitimus patvirtinti, kad jie jungiasi prie numatyto diegimo.


## Svarbiausi stebimi laukai {#login-key-fields}

- `Username`: autentifikacijai ir auditui naudojamas subjektas. Įspėjamasis požymis: pasikartojantys prisijungimo nesėkmių atvejai galiojančioms paskyroms.
- `Password`: paskyros prieigos slaptažodis. Įspėjamasis požymis: blokavimai arba dažni slaptažodžio atkūrimo prašymai.
- `Login`: pateikia autentifikacijos užklausą. Įspėjamasis požymis: nėra atsako arba užklausa nuolat atmetama, nors tinklo ryšys veikia.
- `IPCCw Build`: prisijungimo lange rodoma diegimo / versijos identifikacija. Įspėjamasis požymis: netikėta versija po techninės priežiūros.
