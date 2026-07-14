# Dažniausiai užduodami klausimai

Atsakymai į realius klausimus, kilusius instaliacijos metu – surinkti iš klientų aptarnavimo užklausų. Jei čia neradote atsakymo į savo klausimą, susisiekite el. paštu [support@trikdis.lt](mailto:support@trikdis.lt).

## FLEXi SP3

<span id="sp3-wiegand-reader-door-output"></span>

<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "Kaip nustatyti pavienį Wiegand skaitytuvą (be klaviatūros), kad jis impulsu suveiktų durų išėjimą?"

<!-- --8<-- [start:sp3-wiegand-reader-door-output-body] -->
    1. Prijunkite skaitytuvo duomenų linijas prie centralės **GRN**/**YEL** gnybtų.
    2. Programoje TrikdisConfig nustatykite **Klaviatūros tipas = Wiegand skaitytuvas**, net jei fizinė klaviatūra neprijungta (langas „Moduliai“ → skirtukas „Klaviatūros“ → Klaviatūros parametrai).
    3. Lange „PGM išėjimai“ norimam išėjimui priskirkite **Išėjimo aprašymas = Nuotolinis valdymas** ir nustatykite **Impulso trukmė, s** (pvz., 5).
    4. Lango „PGM išėjimai“ skirtuke „Valdymas“ pažymėkite **Įj.** tam skaitytuvui, laukelyje **Išėjimas** nurodykite išėjimo numerį ir nustatykite **Režimas = Impulsas**.

    !!! note
        RFID/Wiegand kortelių negalima priregistruoti priglaudžiant jas prie skaitytuvo – kiekvienos kortelės **Pakabuko kodą** įveskite rankiniu būdu, **dešimtainiu** skaičiumi, skyriuje „RFID pakabukų (kortelių) registravimas“.
<!-- --8<-- [end:sp3-wiegand-reader-door-output-body] -->
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->

Žr. [„FLEXi“ SP3 vadovą](../control-panels/sp3/index.md) – ten rasite pilnas prijungimo schemas ir TrikdisConfig nustatymus.
