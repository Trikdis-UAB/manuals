# Vanliga frågor

Svar på verkliga frågor som dykt upp under installationer, hämtade från supportärenden. Hittar du inte din fråga? Kontakta [support@trikdis.lt](mailto:support@trikdis.lt).

## FLEXi SP3

<span id="sp3-wiegand-reader-door-output"></span>

<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "Hur ansluter jag en enskild Wiegand-läsare (utan knappsats) för att pulsa en dörrutgång?"

<!-- --8<-- [start:sp3-wiegand-reader-door-output-body] -->
    1. Anslut läsarens dataledningar till centralapparatens plintar **GRN**/**YEL**.
    2. Ställ in **Keypad type = Wiegand reader** i TrikdisConfig, även om ingen fysisk knappsats är ansluten (fönstret ”Modules” → fliken ”Keypads” → Keypad parameters).
    3. Ge målutgången **Output definition = Remote control** och en **Pulse time, s** (t.ex. 5) i **fönstret ”PGM”**.
    4. På **fliken ”Control” i fönstret ”PGM”**: markera **En** för den läsaren, ställ in **PGM** på utgångens nummer och **PGM mode = Pulse**.

    !!! note
        RFID-/Wiegand-kort kan inte läras in genom att hålla dem mot läsaren. Ange varje korts Tag code manuellt, som ett **decimaltal**, under ”Länka RFID-brickor (kort)”.
<!-- --8<-- [end:sp3-wiegand-reader-door-output-body] -->
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->

Se [manualen för FLEXi SP3](../control-panels/sp3/index.md) för fullständiga kopplingsscheman och inställningar i TrikdisConfig.
