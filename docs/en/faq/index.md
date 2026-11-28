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

## Protegus app

Questions about the Protegus app (Protegus2): the phone apps and [web.protegus.app](https://web.protegus.app).

<span id="protegus-incorrect-keypad-code"></span>

<!-- --8<-- [start:protegus-incorrect-keypad-code] -->
??? question "Arming from the Protegus app fails with “Incorrect keypad code”. How do I fix it?"

<!-- --8<-- [start:protegus-incorrect-keypad-code-body] -->
    The panel rejected the user code the app sent. This usually happens when the code was saved in the app with **Remember** and has since been changed in the panel.

    1. Open the area in the Protegus app and tap **Forget PIN**. The button is there only while a code is saved for that area, and it clears only the code saved for your own account.
    2. Arm or disarm again. The app asks for the code: enter a user code that the panel accepts for that area.
    3. Tick **Remember** only if you want the app to keep sending this code without asking.
<!-- --8<-- [end:protegus-incorrect-keypad-code-body] -->
<!-- --8<-- [end:protegus-incorrect-keypad-code] -->

<span id="protegus-installer-restrictions"></span>

<!-- --8<-- [start:protegus-installer-restrictions] -->
??? question "I limited what the installer can change, but in the Protegus app I can still change every setting. Why?"

<!-- --8<-- [start:protegus-installer-restrictions-body] -->
    **Advanced settings** reads the device with its configuration access code. The app tries the default administrator code first (123456). If the device accepts it, the app opens with full administrator access, and the **Allow installer to change** limits don't apply.

    The limits apply only when the device is opened with the **installer code**. To make them work:

    1. Change the **Administrator code** from its default (**System options → Access**, in the Protegus app or TrikdisConfig) and keep it to yourself.
    2. Give the installer the installer code. When the app asks for the **Configuration access code**, they enter it, and the settings you didn't allow are shown read-only.
<!-- --8<-- [end:protegus-installer-restrictions-body] -->
<!-- --8<-- [end:protegus-installer-restrictions] -->

<span id="protegus-company-tags"></span>

<!-- --8<-- [start:protegus-company-tags] -->
??? question "Can I give an installer access to all the systems at one site with a tag, instead of adding them one by one?"

<!-- --8<-- [start:protegus-company-tags-body] -->
    Yes. In the company account, open **Tags**, create a tag, and under **Assignments** add the site's systems and the installer.

    The installer's role must also have **View** on the **All systems** permission (**Roles** → edit the role). The installer then sees the systems that carry the tag. Without that permission, an installer sees only the tagged systems they installed themselves.
<!-- --8<-- [end:protegus-company-tags-body] -->
<!-- --8<-- [end:protegus-company-tags] -->

<span id="protegus-company-support-email"></span>

<!-- --8<-- [start:protegus-company-support-email] -->
??? question "What is the company's “Support e-mail” for? Where do Help requests go?"

<!-- --8<-- [start:protegus-company-support-email-body] -->
    Support tickets sent from **Help → Support ticket** in the Protegus app about one of your company's systems go to your company's **Support e-mail**, not to TRIKDIS. Users also see this address as your company's support contact.
<!-- --8<-- [end:protegus-company-support-email-body] -->
<!-- --8<-- [end:protegus-company-support-email] -->
