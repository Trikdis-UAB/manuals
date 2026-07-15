# S8/S9 belaidžių jutiklių pridėjimas prie FLEXi SP3

![FLEXi SP3 apsaugos centralė, RF-S8 imtuvas ir per Protegus susieti S8 jutikliai](./sp3-s8-hero.jpg){ .trik-hero-img }

> [!NOTE]
> **Ekrano vaizdų kalba:** šiame vadove „Protegus“ ir „TrikdisConfig“ sąsajos rodomos anglų kalba. Veiksmuose paryškinti mygtukų ir meniu pavadinimai atitinka ekrane rodomus angliškus užrašus.

Susiekite S8 belaidžius jutiklius (PIR, durų ir langų magnetinius kontaktus, dūmų jutiklius, sirenas ir pultelius) su apsaugos centrale FLEXi SP3. Pasirinkite konfigūravimo būdą.

> [!IMPORTANT]
> **Programinės įrangos reikalavimas:** norint naudoti S8 belaidžius jutiklius, FLEXi SP3 turi veikti su 4 redakcijos programine įranga (`SP3_xxx4_0122.fw`, 1.22 ar naujesne versija).

> [!NOTE]
> **Aparatinės įrangos reikalavimas:** prieš susiedami jutiklius prijunkite RF-S8 imtuvą prie SP3 RS485 magistralės – žr. [FLEXi SP3 vadovo 3.13 skyrių „RF-S8 prijungimo schema“](index.md) – ir programos TrikdisConfig lange „Moduliai“ jį užregistruokite.

**Prieš pradedant – paruoškite jutiklius** (taikoma visiems būdams):

- Jei jutiklis anksčiau buvo susietas su bet kuria centrale, pirmiausia jį atsiekite: **5 sekundes** palaikykite nuspaudę jutiklio **mokymosi mygtuką**, tada atleiskite, kai indikatorius **tris kartus sumirksi žaliai**.
- Įdėkite baterijas į visus jutiklius, kuriuos ketinate susieti.
- Susiejimo metu RF-S8 imtuvą laikykite **mažiausiai 1 m atstumu** nuo jutiklių.

---

=== "Protegus mobilioji programėlė"

    Telefone turi būti įdiegta programėlė Protegus, o SP3 sistema jau pridėta prie jūsų paskyros.

    1. Atidarykite Protegus programėlę ir pasirinkite sistemą **SP3 kit**. Viršutiniame dešiniajame kampe bakstelėkite **⋮**.

        ![Protegus mobilioji programėlė – SP3 kit pradžios ekranas, viršutiniame dešiniajame kampe pažymėtas trijų taškų meniu mygtukas](./mob-01-home.png){ .trik-mob-img }

    2. Bakstelėkite **System configuration**.

        ![Protegus mobilioji programėlė – išskleidžiamajame meniu pažymėta System configuration](./mob-02-system-config.png){ .trik-mob-img }

    3. Bakstelėkite **Devices**.

        ![Protegus mobilioji programėlė – Configure SP3 kit meniu pažymėta Devices](./mob-03-config-menu.png){ .trik-mob-img }

    4. Bakstelėkite mygtuką **+**, kad pridėtumėte naują jutiklį.

        ![Protegus mobilioji programėlė – tuščias Devices puslapis, apatiniame dešiniajame kampe pažymėtas mygtukas +](./mob-04-add-btn.png){ .trik-mob-img }

    5. Pasirinkite jutiklio tipą, kurį norite susieti (pvz., **Smart PET PIR detector**).

        ![Protegus mobilioji programėlė – Add wireless sensor tipo sąrašas, pažymėtas Smart PET PIR detector](./mob-05-sensor-categories.png){ .trik-mob-img }

    6. Programėlėje rodomas jutiklis **Learning** režimu ir mokymosi mygtuko schema. **Paspauskite ir palaikykite mokymosi mygtuką**, kol žalias indikatorius 2 sekundes švies nepertraukiamai.

        ![Protegus mobilioji programėlė – Smart PET PIR detector Learning režimas, raudona rodyklė rodo mokymosi mygtuką plokštėje](./mob-06-learning.png){ .trik-mob-img }

    7. Aptikus jutiklį rodomas patvirtinimas su jo serijos numeriu. Bakstelėkite **OK**.

        ![Protegus mobilioji programėlė – Smart PET PIR detector sėkmingai aptiktas, pažymėtas mygtukas OK](./mob-07-sensor-found.png){ .trik-mob-img }

    8. Jutiklis rodomas sąraše su žyma **NEW**. Bakstelėkite jutiklį, kad atidarytumėte jo nustatymus.

        ![Protegus mobilioji programėlė – susietas Smart PET PIR detector sąraše su pažymėta žyma NEW](./mob-08-sensor-in-list.png){ .trik-mob-img }

    **Sukonfigūruokite zonos nustatymus:**

    9. Bakstelėkite **Zone settings**, kad išskleistumėte skyrių.

        ![Protegus mobilioji programėlė – jutiklio nustatymų puslapis, pažymėtas Zone settings skyrius](./mob-09-zone-settings.png){ .trik-mob-img }

    10. Nustatykite **Definition** (pvz., 24 hours) ir **Type** (pvz., NO), tada bakstelėkite **Confirm**.

        ![Protegus mobilioji programėlė – išskleistas Zone settings, pažymėti Definition ir Type laukai bei mygtukas Confirm](./mob-10-zone-def-type.png){ .trik-mob-img }

    11. Norėdami pridėti kitą jutiklį, bakstelėkite **+** ir pakartokite 5–10 veiksmus. Susieję visus jutiklius, bakstelėkite **Next**.

        ![Protegus mobilioji programėlė – jutiklis sąraše, pažymėtas mygtukas Next](./mob-11-sensor-list-next.png){ .trik-mob-img }

    12. Sėkmės dialogo lange patvirtinamas susiejimas. Bakstelėkite **Close**.

        ![Protegus mobilioji programėlė – dialogo langas Wireless devices added successfully, pažymėtas mygtukas Close](./mob-12-success.png){ .trik-mob-img }

    **Patikrinkite zonos būseną:**

    13. Sistemos pradžios ekrane bakstelėkite plytelę **Area 1**.

        ![Protegus mobilioji programėlė – SP3 kit pradžios ekranas, pažymėta plytelė Area 1](./mob-13-zone-status1.png){ .trik-mob-img }

    14. Bakstelėkite **Zone statuses**.

        ![Protegus mobilioji programėlė – Area 1 puslapis, pažymėtas mygtukas Zone statuses](./mob-14-zone-status2.png){ .trik-mob-img }

    15. Ekrane **Zone status / bypass** pateikiamos visos zonos. Raudona įspėjimo piktograma reiškia, kad jutiklis šiuo metu yra atidarytas arba suveikęs. Bypass jungikliais galima laikinai išjungti atskiras zonas.

        ![Protegus mobilioji programėlė – Zone status/bypass sąrašas, pažymėta Zone 2 su įspėjimo piktograma](./mob-15-zone-status3.png){ .trik-mob-img }

=== "Protegus žiniatinklis"

    Darbalaukio naršyklėje atidarykite [web.protegus.app](https://web.protegus.app). SP3 sistema jau turi būti pridėta prie jūsų paskyros.

    1. Kairiajame skydelyje pasirinkite SP3 sistemą, tada sistemos meniu spustelėkite **Devices**.

        ![Protegus žiniatinklio programa – kairiajame skydelyje pasirinktas SP3 kit, pažymėtas meniu punktas Devices](./web-01-sp3-devices.png)

    2. Spustelėkite mygtuką **+**, kad pridėtumėte naują belaidį jutiklį.

        ![Protegus žiniatinklio programa – Devices puslapis, apatiniame dešiniajame kampe pažymėtas mygtukas +](./web-02-add-sensor-btn.png)

    3. Atidaromas skydelis **Add wireless sensor** su visais palaikomais jutiklių tipais. Spustelėkite jutiklio tipą, kurį norite susieti (pvz., **Smart PET PIR detector**).

        ![Protegus žiniatinklio programa – Add wireless sensor skydelis, pažymėtas Smart PET PIR detector](./web-03-sensor-categories.png)

    4. Programėlė persijungia į **Learning** režimą ir parodo jutiklį su schema, nurodančia mokymosi mygtuko vietą.

        **Paspauskite ir palaikykite mokymosi mygtuką**, kol žalias indikatorius 2 sekundes švies nepertraukiamai (maždaug 4–5 sekundes).

        ![Protegus žiniatinklio programa – Smart PET PIR detector susiejimo režimas, raudona rodyklė rodo mokymosi mygtuko vietą](./web-04-learning-mode.png)

    5. Centralei aptikus jutiklį rodomas patvirtinimas su jo serijos numeriu. Spustelėkite **OK**.

        ![Protegus žiniatinklio programa – Smart PET PIR detector sėkmingai aptiktas, patvirtintas serijos numeris, pažymėtas mygtukas OK](./web-05-sensor-found.png)

    6. Jutiklis rodomas sąraše su žyma **NEW**. Norėdami pridėti kitą jutiklį, spustelėkite **+** ir pakartokite 3–5 veiksmus. Susieję visus jutiklius, spustelėkite **Next**.

        ![Protegus žiniatinklio programa – susietas jutiklis sąraše su žyma NEW ir pažymėtu mygtuku Next](./web-06-sensor-in-list.png)

    7. Sėkmės dialogo lange patvirtinamas susiejimas. Spustelėkite **Close**.

        ![Protegus žiniatinklio programa – dialogo langas Wireless devices added successfully, pažymėtas mygtukas Close](./web-07-success.png)

    **Sukonfigūruokite zonos nustatymus:**

    8. Sąraše **Devices** spustelėkite susietą jutiklį, kad atidarytumėte jo nustatymus. Spustelėkite **Zone settings**, kad išskleistumėte skyrių.

        ![Protegus žiniatinklio programa – jutiklio informacijos puslapis, pažymėtas Zone settings skyrius](./web-08-zone-settings.png)

    9. Zonoje nustatykite **Definition** (pvz., Instant) ir **Type** (pvz., NO).

        ![Protegus žiniatinklio programa – išskleistas Zone settings, rodomi Definition ir Type laukai](./web-09-zone-def-type.png)

    **Patikrinkite zonos būseną:**

    10. Pradžios ekrane spustelėkite plytelę **Area 1**.

        ![Protegus žiniatinklio programa – pradžios ekranas su pažymėta plytele Area 1](./web-10-zone-status1.png)

    11. Spustelėkite **Zone statuses**.

        ![Protegus žiniatinklio programa – Area 1 skydelis su pažymėtu mygtuku Zone statuses](./web-11-zone-status2.png)

    12. Skydelyje **Zone status / bypass** pateikiamos visos zonos. Raudona zonos įspėjimo piktograma reiškia, kad jutiklis šiuo metu yra atidarytas arba suveikęs. Bypass jungikliais galima laikinai išjungti atskiras zonas.

        ![Protegus žiniatinklio programa – Zone status/bypass skydelis, pažymėta Zone 9 su įspėjimo piktograma, rodančia atidarytą būseną](./web-12-zone-status3.png)

=== "TrikdisConfig"

    Galimi du būdai: **nuotolinis** (per tinklą) arba **vietinis** (per USB, tinklo nereikia).

    #### Nuotolinis susiejimas

    Reikalavimai: aktyvinta SIM kortelė su išjungtu PIN, SIM kortelėje įjungtas mobilusis internetas, įjungta Protegus debesijos paslauga, SP3 įjungta (**PWR** šviesos diodas mirksi žaliai), SP3 yra prisijungusi prie tinklo (**NET** šviesos diodas šviečia žaliai ir mirksi geltonai).

    > [!WARNING]
    > Neregistruokite ir neatsiekite jutiklių, kai centralė veikia kitos operacijos mokymosi režimu. Prieš susiejimą kiekvieną jutiklį atsiekite: 5 sekundes palaikykite mokymosi mygtuką, kol jis tris kartus sumirksės žaliai. **Jei jutiklis netyčia atsiejamas, jis neveiks, kol nebus susietas iš naujo.**

    1. Atidarykite TrikdisConfig. Skyriuje **Remote access** įveskite centralės **Unique ID** (jis nurodytas įrenginio etiketėje), tada spustelėkite **Configure**.

        ![TrikdisConfig – Remote access skyrius, pažymėti Unique ID laukas ir mygtukas Configure](./tc-01-remote-access.png)

    2. Spustelėkite **Read [F4]**. Jei būsite paraginti, įveskite administratoriaus arba montuotojo kodą.

    3. Atidarykite **Wireless sensors** ir spustelėkite **Learn sensors**.

        ![TrikdisConfig – Wireless sensors skirtukas su pažymėtu mygtuku Learn sensors](./tc-02-learn-sensors.png)

    4. Atidaromas **Learning mode** dialogo langas. Kiekvienam jutikliui 5 sekundes palaikykite mokymosi mygtuką, kol jis **keturis kartus sumirksės žaliai**.

        ![Schema su jutikliu ir rodykle į mokymosi mygtuką: Press and hold the learning button for 5 seconds](./tc-03-sensor-learn-diagram.png)

        ![TrikdisConfig – Learning mode dialogas: Learning mode started. Insert the batteries into the new sensor and wait for it to complete initialization; mygtukas Stop learning](./tc-04-learning-mode.png)

    5. Aptikus jutiklį atidaromas dialogo langas **New device was found**. Nustatykite **Zone number** ir **Zone definition** (pvz., Instant), tada spustelėkite **Save**.

        ![TrikdisConfig – New device was found dialogas, pažymėti Zone number ir Zone definition laukai bei mygtukas Save](./tc-05-new-device-dialog.png)

    6. Learning mode būsenos eilutėje patvirtinama, kad įrenginys užregistruotas. Kiekvienam papildomam jutikliui pakartokite 4–5 veiksmus.

        ![TrikdisConfig – Learning mode, rodoma New device was found: ID:1 S8 Door/Window Sensor, UID: …; pažymėtas mygtukas Stop learning](./tc-06-device-detected.png)

    7. Spustelėkite **Stop learning**. Kai būsite paraginti išsaugoti naujus parametrus, spustelėkite **Yes**.

        ![TrikdisConfig – dialogas Save configuration, kuriame prašoma išsaugoti naujus parametrus; pažymėtas mygtukas Yes](./tc-07-save-config.png)

    8. Spustelėkite **Read [F4]**. Skirtuke **Wireless sensors** dabar pateikiami visi užregistruoti jutikliai su jų serijos numeriais.

        ![TrikdisConfig – Wireless sensors skirtuke rodomas užregistruotas S8 Door/Window Sensor su serijos numeriu](./tc-09-wireless-sensors.png)

    9. Atidarykite skirtuką **Zones**. Patvirtinkite zonų ir sričių priskyrimą. Nustatykite **Type** į `EOL-T`, kad įjungtumėte apsaugą nuo sabotavimo. Spustelėkite **Write [F5]**.

        ![TrikdisConfig – Zones nustatymų lentelė su zonų priskyrimu ir sričių konfigūracija](./tc-10-zones.png)

    #### Vietinis susiejimas (be tinklo)

    RF-S8 imtuvo plokštėje yra mygtukas **LEARN** – juo galima įjungti ir išjungti mokymosi režimą nenaudojant kompiuterio.

    ![RF-S8 imtuvo plokštė su pažymėtu mygtuku Learn](./tc-11-rfs8-photo.png)

    1. Patvirtinkite, kad RF-S8 užregistruotas prie SP3 (jis rodomas modulių sąraše po programinės įrangos paruošimo).
    2. Įjunkite SP3 maitinimą.
    3. Nuimkite RF-S8 dangtelį.
    4. Laikykite nuspaudę RF-S8 mygtuką **LEARN**, kol NETWORK šviesos diodas pradės mirksėti žaliai/raudonai. Atleiskite mygtuką.
    5. Susiekite kiekvieną jutiklį: 5 sekundes palaikykite mokymosi mygtuką, kol indikatorius keturis kartus sumirksės žaliai. Po kiekvieno sėkmingo susiejimo NETWORK šviesos diodas trumpam šviečia žaliai.
    6. Baigę laikykite nuspaudę RF-S8 mygtuką **LEARN**, kol NETWORK šviesos diodas nustos mirksėti. Atleiskite mygtuką – imtuvas išeis iš mokymosi režimo.
    7. Prijunkite USB Mini-B prie SP3. Atidarykite TrikdisConfig → **Read [F4]**.
    8. Skirtuke **Wireless sensors** patvirtinkite serijos numerius.
    9. Skirtuke **Zones** priskirkite zonas ir sritis → **Write [F5]**.

    #### Belaidžio jutiklio pašalinimas

    1. Prisijunkite prie SP3 (per USB arba nuotoliniu būdu) → **Read [F4]**.
    2. Skirtuke **Wireless sensors** nustatykite jutiklio **Device type** į `Disabled`.
    3. Spustelėkite **Write [F5]**.

---

## RF-S8 imtuvo šviesos diodų reikšmės

| LED | Būsena | Reikšmė |
|-----|--------|---------|
| NETWORK | Mirksi žaliai/raudonai | Aktyvus mokymosi režimas |
| NETWORK | Šviečia žaliai (5 s) | Jutiklis sėkmingai užregistruotas |
| POWER | Išjungtas | Nėra maitinimo įtampos |
| POWER | Mirksi žaliai | Normalus veikimas |
| POWER | Mirksi geltonai | Žema maitinimo įtampa (≤ 11,5 V) |
| POWER | Šviečia geltonai | Nėra RS485 ryšio su SP3 |
