# Lägga till trådlösa S8/S9-detektorer i FLEXi SP3

![Centralapparaten FLEXi SP3, radiotransceivern RF-S8 och S8-detektorer som är inlärda via Protegus](./sp3-s8-hero.jpg){ .trik-hero-img }

Lär in trådlösa S8-detektorer (PIR-detektorer, magnetkontakter för dörr och fönster, rökdetektorer, sirener, fjärrkontroller) i centralapparaten FLEXi SP3. Välj konfigurationsmetod.

> [!IMPORTANT]
> **Krav på firmware:** FLEXi SP3 måste ha firmware av revision 4 (`SP3_xxx4_0122.fw`, version 1.22 eller senare) för att stödja trådlösa S8-detektorer.

> [!NOTE]
> **Förutsättning för hårdvaran:** Innan du lär in detektorer måste radiotransceivern RF-S8 vara ansluten till SP3:s RS485-buss (se [3.13 Kopplingsschema för anslutning av RF-S8](index.md#313-kopplingsschema-for-anslutning-av-rf-s8)) och registrerad i TrikdisConfig på fliken Modules (se [5.5 Fönstret ”Modules”](index.md#55-fonstret-modules)).

**Innan du börjar: förbered detektorerna** (gäller alla metoder):

- Om en detektor tidigare har lärts in i någon centralapparat måste du först ta bort inlärningen: håll detektorns **inlärningsknapp nedtryckt i 5 sekunder** och släpp den när indikeringen blinkar **grönt tre gånger**.
- Sätt i batterier i alla detektorer som du ska lära in.
- Håll radiotransceivern RF-S8 **minst 1 m från** detektorerna under inlärningen.

---

=== "Protegus mobilapp"

    Appen Protegus måste vara installerad i telefonen och SP3-systemet måste redan vara tillagt i ditt konto.

    1. Öppna appen Protegus och välj systemet **SP3 kit**. Tryck på **⋮** uppe i det högra hörnet.

        ![Protegus mobilapp: startskärmen för SP3 kit, med menyknappen med tre punkter markerad uppe till höger](./mob-01-home.png){ .trik-mob-img }

    2. Tryck på **System configuration**.

        ![Protegus mobilapp: rullgardinsmenyn med System configuration markerad](./mob-02-system-config.png){ .trik-mob-img }

    3. Tryck på **Devices**.

        ![Protegus mobilapp: menyn Configure SP3 kit med Devices markerad](./mob-03-config-menu.png){ .trik-mob-img }

    4. Tryck på knappen **+** för att lägga till en ny detektor.

        ![Protegus mobilapp: tom sida Devices, med knappen + markerad nere till höger](./mob-04-add-btn.png){ .trik-mob-img }

    5. Välj den detektortyp du vill lära in (t.ex. **Smart PET PIR detector**).

        ![Protegus mobilapp: listan Add wireless sensor över detektortyper, med Smart PET PIR detector markerad](./mob-05-sensor-categories.png){ .trik-mob-img }

    6. Appen visar detektorn i läget **Learning** med en bild av inlärningsknappen. **Håll inlärningsknappen nedtryckt** tills den gröna indikeringen lyser med fast sken i 2 sekunder.

        ![Protegus mobilapp: läget Learning för Smart PET PIR detector, med en röd pil som pekar på inlärningsknappen på kretskortet](./mob-06-learning.png){ .trik-mob-img }

    7. När detektorn har hittats visas en bekräftelse med dess serienummer. Tryck på **OK**.

        ![Protegus mobilapp: Smart PET PIR detector har hittats, med knappen OK markerad](./mob-07-sensor-found.png){ .trik-mob-img }

    8. Detektorn visas i listan med märket **NEW**. Tryck på detektorn för att öppna dess inställningar. 

        ![Protegus mobilapp: den inlärda detektorn Smart PET PIR detector i listan, med märket NEW markerat](./mob-08-sensor-in-list.png){ .trik-mob-img }

    **Konfigurera sektionsinställningarna:**

    9. Tryck på **Zone settings** för att fälla ut avsnittet.

        ![Protegus mobilapp: sidan Sensor settings, med avsnittet Zone settings markerat](./mob-09-zone-settings.png){ .trik-mob-img }

    10. Ställ in **Definition** (t.ex. 24 hours) och **Type** (t.ex. NO) och tryck sedan på **Confirm**.

        ![Protegus mobilapp: Zone settings utfällda, med fälten Definition och Type samt knappen Confirm markerade](./mob-10-zone-def-type.png){ .trik-mob-img }

    11. Om du vill lägga till en detektor till trycker du på **+** och upprepar steg 5–10. När alla detektorer är inlärda trycker du på **Next**.

        ![Protegus mobilapp: detektor i listan, med knappen Next markerad](./mob-11-sensor-list-next.png){ .trik-mob-img }

    12. En dialogruta bekräftar att inlärningen lyckades. Tryck på **Close**.

        ![Protegus mobilapp: dialogrutan ”Wireless devices added successfully”, med knappen Close markerad](./mob-12-success.png){ .trik-mob-img }

    **Kontrollera sektionernas status:**

    13. Tryck på rutan **Area 1** på systemets startskärm.

        ![Protegus mobilapp: startskärmen för SP3 kit, med rutan Area 1 markerad](./mob-13-zone-status1.png){ .trik-mob-img }

    14. Tryck på **Zone statuses**.

        ![Protegus mobilapp: sidan för Area 1, med knappen Zone statuses markerad](./mob-14-zone-status2.png){ .trik-mob-img }

    15. Skärmen **Zone status / bypass** listar alla sektioner. En röd varningsikon betyder att detektorn är öppen eller har utlösts just nu. Med reglagen för förbikoppling (bypass) kan du tillfälligt avaktivera enskilda sektioner.

        ![Protegus mobilapp: listan Zone status/bypass, med Zone 2 och varningsikonen markerade](./mob-15-zone-status3.png){ .trik-mob-img }

=== "Protegus webbapp"

    Öppna [web.protegus.app](https://web.protegus.app) i en webbläsare på en dator. SP3-systemet måste redan vara tillagt i ditt konto.

    1. Välj SP3-systemet i panelen till vänster och klicka sedan på **Devices** i systemmenyn.

        ![Protegus webbapp: SP3 kit är valt i panelen till vänster, med menyalternativet Devices markerat](./web-01-sp3-devices.png)

    2. Klicka på knappen **+** för att lägga till en ny trådlös detektor.

        ![Protegus webbapp: sidan Devices, med knappen + markerad nere till höger](./web-02-add-sensor-btn.png)

    3. Panelen **Add wireless sensor** öppnas med alla detektortyper som stöds. Klicka på den detektortyp du vill lära in (t.ex. **Smart PET PIR detector**).

        ![Protegus webbapp: panelen Add wireless sensor, med Smart PET PIR detector markerad](./web-03-sensor-categories.png)

    4. Appen växlar till läget **Learning** och visar detektorn med en bild som anger var inlärningsknappen sitter.

        **Håll inlärningsknappen nedtryckt** tills den gröna indikeringen lyser med fast sken i 2 sekunder (ca 4–5 sekunder).

        ![Protegus webbapp: inlärningsläget är aktivt för Smart PET PIR detector, med en röd pil som pekar på inlärningsknappens plats](./web-04-learning-mode.png)

    5. När centralapparaten har hittat detektorn visas en bekräftelse med dess serienummer. Klicka på **OK**.

        ![Protegus webbapp: Smart PET PIR detector har hittats och serienumret är bekräftat, med knappen OK markerad](./web-05-sensor-found.png)

    6. Detektorn visas i listan med märket **NEW**. Om du vill lägga till en detektor till klickar du på **+** och upprepar steg 3–5. När alla detektorer är inlärda klickar du på **Next**.

        ![Protegus webbapp: inlärd detektor i listan med märket NEW, med knappen Next markerad](./web-06-sensor-in-list.png)

    7. En dialogruta bekräftar att inlärningen lyckades. Klicka på **Close**.

        ![Protegus webbapp: dialogrutan ”Wireless devices added successfully”, med knappen Close markerad](./web-07-success.png)

    **Konfigurera sektionsinställningarna:**

    8. Klicka på en inlärd detektor i listan **Devices** för att öppna dess inställningar. Klicka på **Zone settings** för att fälla ut avsnittet.

        ![Protegus webbapp: detektorns detaljsida, med avsnittet Zone settings markerat](./web-08-zone-settings.png)

    9. Ställ in **Definition** (t.ex. Instant) och **Type** (t.ex. NO) för sektionen.

        ![Protegus webbapp: Zone settings utfällda, med fälten Definition och Type markerade](./web-09-zone-def-type.png)

    **Kontrollera sektionernas status:**

    10. Klicka på rutan **Area 1** på startskärmen.

        ![Protegus webbapp: startskärmen, med rutan Area 1 markerad](./web-10-zone-status1.png)

    11. Klicka på **Zone statuses**.

        ![Protegus webbapp: panelen för Area 1, med knappen Zone statuses markerad](./web-11-zone-status2.png)

    12. Panelen **Zone status / bypass** listar alla sektioner. En röd varningsikon vid en sektion betyder att detektorn är öppen eller har utlösts just nu. Med reglagen för förbikoppling (bypass) kan du tillfälligt avaktivera enskilda sektioner.

        ![Protegus webbapp: panelen Zone status/bypass, med Zone 9 och varningsikonen för öppet läge markerade](./web-12-zone-status3.png)

=== "TrikdisConfig"

    Det finns två metoder: **på distans** (via nätverk) eller **lokalt** (USB, inget nätverk behövs).

    #### Inlärning på distans

    Krav: ett aktiverat SIM-kort med PIN-kodsbegäran avstängd, mobildata på SIM-kortet, molntjänsten Protegus aktiverad, SP3 påslagen (lysdioden **PWR** blinkar grönt) och SP3 ansluten till nätet (lysdioden **NET** lyser fast grönt och blinkar gult).

    > [!WARNING]
    > Lär aldrig in eller ta bort inlärning av detektorer medan centralapparaten är i inlärningsläge för en annan åtgärd. Ta bort inlärningen av varje detektor innan du lär in den: håll inlärningsknappen nedtryckt i 5 s, tills den blinkar grönt tre gånger. **Om en detektors inlärning tas bort av misstag fungerar den inte förrän den har lärts in igen.**

    1. Öppna TrikdisConfig. Ange centralapparatens **Unique ID** (finns på enhetens etikett) i avsnittet **Remote access** och klicka sedan på **Configure**.

        ![TrikdisConfig: avsnittet Remote access, med fältet Unique ID och knappen Configure markerade](./tc-01-remote-access.png)

    2. Klicka på **Read [F4]**. Ange administratörs- eller installatörskoden om du uppmanas att göra det.

    3. Gå till **Wireless sensors** och klicka på **Learn sensors**.

        ![TrikdisConfig: fliken Wireless sensors, med knappen Learn sensors markerad](./tc-02-learn-sensors.png)

    4. Dialogrutan **Learning mode** öppnas. Håll inlärningsknappen på varje detektor nedtryckt i 5 sekunder tills den blinkar **grönt fyra gånger**.

        ![Bild av en detektor med en pil som pekar på inlärningsknappen: ”Press and hold the learning button for 5 seconds”](./tc-03-sensor-learn-diagram.png)

        ![TrikdisConfig: dialogrutan Learning mode med texten ”Learning mode started. Insert the batteries into the new sensor and wait for it to complete initialization” och knappen Stop learning](./tc-04-learning-mode.png)

    5. När en detektor har hittats öppnas dialogrutan **New device was found**. Ange **Zone number** och **Zone definition** (t.ex. Instant) och klicka sedan på **Save**.

        ![TrikdisConfig: dialogrutan New device was found, med fälten Zone number och Zone definition samt knappen Save markerade](./tc-05-new-device-dialog.png)

    6. Statusraden i Learning mode bekräftar att enheten har registrerats. Upprepa steg 4–5 för varje ytterligare detektor.

        ![TrikdisConfig: Learning mode med texten ”New device was found: ID:1 S8 Door/Window Sensor, UID: …” och knappen Stop learning markerad](./tc-06-device-detected.png)

    7. Klicka på **Stop learning**. När du får frågan om de nya parametrarna ska sparas klickar du på **Yes**.

        ![TrikdisConfig: dialogrutan Save configuration som frågar om de nya parametrarna ska sparas, med knappen Yes markerad](./tc-07-save-config.png)

    8. Klicka på **Read [F4]**. På fliken **Wireless sensors** visas nu alla registrerade detektorer med sina serienummer.

        ![TrikdisConfig: fliken Wireless sensors med en registrerad S8 Door/Window Sensor och dess serienummer](./tc-09-wireless-sensors.png)

    9. Öppna fliken **Zones**. Kontrollera att sektioner och områden är rätt tilldelade. Ställ in **Type** på `EOL-T` för att aktivera sabotageövervakning. Klicka på **Write [F5]**.

        ![TrikdisConfig: tabellen Zones settings med sektionstilldelningar och områdesinställningar](./tc-10-zones.png)

    #### Lokal inlärning (inget nätverk)

    Radiotransceivern RF-S8 har en knapp, **LEARN**, på kretskortet. Med den slår du på och av inlärningsläget utan att ansluta en dator.

    ![Kretskortet i radiotransceivern RF-S8, med knappen Learn märkt](./tc-11-rfs8-photo.png)

    1. Kontrollera att RF-S8 är registrerad i SP3 (syns i listan Modules efter firmwareinställningen).
    2. Slå på matningen till SP3.
    3. Ta bort locket på RF-S8.
    4. Håll knappen **LEARN** på RF-S8 nedtryckt tills lysdioden NETWORK blinkar grönt/rött. Släpp knappen.
    5. Lär in varje detektor: håll inlärningsknappen nedtryckt i 5 s tills den blinkar grönt fyra gånger. Lysdioden NETWORK lyser kort fast grönt efter varje lyckad inlärning.
    6. När du är klar håller du knappen **LEARN** på RF-S8 nedtryckt tills lysdioden NETWORK slutar blinka. Släpp knappen. Radiotransceivern lämnar inlärningsläget.
    7. Anslut en USB-kabel (Mini-B) till SP3. Öppna TrikdisConfig och klicka på **Read [F4]**.
    8. Kontrollera serienumren på fliken **Wireless sensors**.
    9. Tilldela sektioner och områden på fliken **Zones** och klicka på **Write [F5]**.

    #### Ta bort en trådlös detektor

    1. Anslut till SP3 (USB eller på distans) och klicka på **Read [F4]**.
    2. Ställ in detektorns **Device type** på `Disabled` under **Wireless sensors**.
    3. Klicka på **Write [F5]**.

---

## Lysdiodsindikering: radiotransceivern RF-S8

| Lysdiod | Tillstånd | Betydelse |
|-----|-------|---------|
| NETWORK | Blinkar grönt/rött | Inlärningsläget är aktivt |
| NETWORK | Fast grönt sken (5 s) | Detektorn är inlärd |
| POWER | Släckt | Ingen matningsspänning |
| POWER | Blinkar grönt | Normal drift |
| POWER | Blinkar gult | Matningsspänningen är låg (≤ 11,5 V) |
| POWER | Fast gult sken | Ingen RS485-kommunikation med SP3 |
