# Frequently Asked Questions

Answers to real questions that came up during installations, gathered from support cases. If your question isn't here, contact [support@trikdis.lt](mailto:support@trikdis.lt).

## FLEXi SP3

<span id="sp3-wiegand-reader-door-output"></span>

<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "How do I set up a single Wiegand reader (no keypad) to pulse a door output?"

<!-- --8<-- [start:sp3-wiegand-reader-door-output-body] -->
    1. Wire the reader's data lines to the panel's **GRN**/**YEL** terminals.
    2. In TrikdisConfig, set **Keypad type = Wiegand reader** even though no physical keypad is connected ("Modules" window → "Keypads" tab → Keypad parameters).
    3. Give the target output **Output definition = Remote control** and a **Pulse time, s** (e.g. 5) in the **"PGM" window**.
    4. On the **"PGM" window's "Control" tab**, tick **En** for that reader, set **PGM** to the output number, and **PGM mode = Pulse**.

    !!! note
        RFID/Wiegand cards can't be enrolled by tapping the reader — enter each card's Tag code by hand, as a **decimal** number, under "Linking RFID key fobs (cards)".
<!-- --8<-- [end:sp3-wiegand-reader-door-output-body] -->
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->

See the [FLEXi SP3 manual](../control-panels/sp3/index.md) for full wiring diagrams and TrikdisConfig settings.
