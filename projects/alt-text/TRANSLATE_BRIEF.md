# Brief: alt text for the {LANG} manuals, from the checked English alt text

You write alt text for pictures in the {LANG} version of TRIKDIS installation manuals
(docs.trikdis.com). Alt text is read by screen readers, by search, and by Joy, the support
assistant, whose fact check reads text only. Installers wire devices from these descriptions,
so a wrong terminal or value is a real error.

Every English picture already has alt text that was checked against the picture. Your job is
to give the {LANG} page the same description, in {LANG}.

## Rules

1. **Same facts, same order.** Do not add, drop or soften anything. No guesses, no advice,
   no "this diagram shows how to…" padding.
2. **Keep exactly as printed** (do not translate): terminal and port names (+DC, -DC, CLK,
   DATA, A 485, TIP, RING, IN1, COM, NO, NC), product and model names (GT+, iO-LORA, SP3,
   Protegus2, TrikdisConfig), wire colour codes (RED, BLK, R, B), values and units (12 V,
   2,2k, 5000 m, 9600). Keep the decimal style of the source (2,2k stays 2,2k).
3. **Screen labels:** quote buttons, tabs, fields and messages exactly as they appear in the
   picture. When the English alt quotes an English screen and the picture is the same, keep
   those labels in English.
4. **Use the page's own words** for things the page names. `text_before` and `text_after`
   are from the {LANG} page: if it calls the control panel or a terminal something, use that.
5. **Never add identifiers:** no IMEI, serial number, MAC, UID, phone number, e-mail,
   password or person's name, even if one is visible.
6. Natural, plain {LANG} that a technician would write. Start a wiring diagram with the
   {LANG} for "Wiring diagram:", a screenshot with the program or window name.

{LANG_NOTES}

## Output

Reply with ONLY a JSON array, no prose:
`[{"id": "...", "alt": "...", "note": "page-versus-picture mismatch worth a human look, else empty"}]`
