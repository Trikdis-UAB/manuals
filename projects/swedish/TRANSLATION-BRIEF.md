# Brief for translating a TRIKDIS manual page into Swedish

You translate one English page of docs.trikdis.com into Swedish. Readers are Swedish
security installers (Teletec's customers): practical people with a screwdriver in one hand.
The page must read as if a Swedish technical writer at a Nordic distributor wrote it.

## Read first, every time

1. `projects/swedish/glossary-sv.md`: the terms. Use the "SV — use" column, never the
   "Do not use" one. A term that is not there: pick the established Swedish industry term
   and list it at the end of your report as a glossary candidate.
2. `projects/swedish/style-guide-sv.md`: register, steps, notes, numbers, UI labels.
3. The English page in full before writing anything.

## Files

- Source: `docs/en/<path>`. Target: `docs/sv/<path>`, same folder and file name.
- Run `projects/swedish/scripts/prepare_page.sh "<path>"` first: it copies the images.
- Build only into your own folder: `/Users/andriaus/Projects/TRIKDIS/manuals/.venv/bin/mkdocs build -q -d <your scratch dir>/site`
  (about 30 s). Never into `site/`, never `mkdocs serve`.
- Translate from English only. The lt/es/ru pages were converted from different source
  documents and differ in content (NOTES/agent-lessons/language-versions-differ.md).

## Change the words, nothing else

- Keep every heading, at the same level and in the same order. The site numbers sections
  from them; one missing or added heading shifts every number after it.
- Keep Markdown and HTML exactly: tables (same rows and columns), lists, `> [!NOTE]` and
  other admonition markers, `{#id}` and `{: ...}` attribute blocks, `<div>`, `<span>`,
  `<img>`, `<br>`, tabs (`=== "..."`), code blocks and inline code untouched.
- Translate: headings, prose, table cells, list items, admonition content, image `alt`
  text and Markdown image descriptions, tab titles (`=== "Protegus app"` keeps product
  names), `title:`/`description:` values in front matter (not the keys).
- Do not translate: product and model names (GET, GT+, FLEXi SP3, GATOR, iO-8, RF-LoRa),
  software names (TrikdisConfig, Protegus, Protegus2, IPcom), protocol and standard names
  (SIA DC-09, Contact ID, EN 50131, EN 54-21), terminal and LED labels printed on the device
  (TIP, RING, NETWORK, TROUBLE, +12 VDC, CLK), file names, URLs, e-mail addresses, keypad key
  sequences, codes and values.
- Software UI labels (TrikdisConfig, Protegus app) stay exactly as the software shows them,
  in bold as in the source. Where it helps, add a short Swedish explanation after the first
  occurrence. Never translate a label the reader has to find on screen.
- Numbers: keep every value. Decimal comma in prose (5,6 kΩ, 0,5 A); IP addresses,
  version numbers (v1.37, 2.03) and codes keep their dots.
- Links: keep every URL as is. A link to a section (`#...` fragment) must point at the
  Swedish heading's id after build: build, read the id from the built HTML, put it in the
  link (NOTES/agent-lessons/section-anchor-links.md). A link to another manual page keeps
  its relative `.md` path if that page exists in `docs/sv/`. If it doesn't exist yet, write a
  site-absolute link to the English page: `/en/alarm-communicators/cellular/get/` (with
  `#<english-id>` if it had a fragment). A relative `../en/...md` path is NOT rewritten by the
  build and breaks silently (tested 2026-11-27). List these links in your report so they can be
  switched when the Swedish page appears. Then run
  `python3 projects/swedish/scripts/check_anchors.py <your scratch dir>/site sv`.
- Keypad tables (DSC, Paradox, etc.): keep the key entries (`*85555`, `001*`) exactly; translate
  the description column, using the Swedish names the panel shows (glossary §13). Don't rewrite
  entries into the `[*][8][5555]` notation of style guide §6: that notation is for new prose only.
- When the text contradicts its screenshot (the screen says "monitoring station", the step says
  "security company"), follow the screenshot and list it under "Problems in the English source".
  The screen is what the installer sees.
- An app label that appears only inside a step needs no Swedish explanation.
- Alt text: say what the screen or drawing shows ("Protegus2, skärmen för att lägga till system:
  fältet IMEI är markerat"). Replace useless alt text (a file name, the same text on every step)
  with a true one; view the image with the Read tool.
- Long pages: write the file in parts (Write the first chapters, then append with Edit) rather
  than one huge Write, and run the checker at the end.
- Don't add, drop, merge or reorder content. If the English is wrong or unclear, translate
  what it says and report the problem; do not fix facts in translation.

## Check before reporting

1. `python3 projects/swedish/scripts/check_structure.py "docs/en/<path>" "docs/sv/<path>"`
   must show no FAIL. Look at each WARN and fix or explain it.
2. Read your Swedish once more as a Swedish installer would: stiff word order, English
   calques ("klicka på knappen Spara" is fine; "utföra en konfiguration av" is not),
   inconsistent terms.

## Report back

- Files written, checker result (paste the summary lines).
- Glossary candidates: `EN | SV chosen | why`.
- Places where you were unsure of the meaning or the term, with the English sentence.
- Problems found in the English source.
