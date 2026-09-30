# Brief: alt text for TRIKDIS manual images (for Codex)

You write accessibility alt text for pictures in TRIKDIS installation manuals (security alarm
communicators, fire panels, controllers). The manuals are public at docs.trikdis.com. The alt
text is read by screen readers, by search engines, and by Joy, an AI support assistant whose fact
check reads text only: a wire connection or value that exists only inside a picture cannot be
verified. So for diagrams the alt text must carry the facts.

The pictures are attached to this message in the order of the item list below. Look at each one
carefully; zoom mentally into crossings and small labels. Never describe a picture you cannot see.

## Rules
- **Wiring diagrams, one format:** `Wiring diagram: <panel or device> to <device>. <group>: <terminal> to <terminal>, ...`
  Verified examples:
  - "Wiring diagram: PARADOX SP, SP+, MG or MG+ panel to GT. Keypad bus: +AUX (+12 V) to +DC, -AUX to -DC, GRN to DATA, YEL to CLK. Telephone communicator: panel TIP to GT TIP, panel RING to GT RING."
  - "Two wiring diagrams. DSC panel keypad bus to GT: RED to +DC, BLK to -DC, YEL to CLK, GRN to DATA. PARADOX panel serial port to GT through the EX-CRP2.4 cable (ordered separately): red wire to +DC, black to -DC, yellow to CLK, green to DATA."
  - "Wiring diagram: control panel to G16T and W485. Power supply (12 V DC, 0,5 A) to +DC and -DC of both, joined at junction dots. RS485 connection (up to 100 m): G16T A 485 to W485 A 485, B 485 to B 485."
- **Reading crossings:** where two lines cross with NO junction dot they pass over each other and
  each keeps going straight; they are not connected and do not swap. A dot means joined. A plain
  '+' crossing is never two corners touching. (A previous drafter shipped GRN/YEL and TIP/RING
  swapped by treating a crossing as a turn.)
- **Copy terminal names exactly as printed** (+DC, A RS485, OUT1, Z1, IN2). Include every value
  the diagram prints: voltages, currents, resistor values as printed (2,2k), cable part numbers,
  maximum distances, device and sensor models. Name wire colours only if shown or labelled.
- **Two diagrams in one image:** describe both, left then right (or top then bottom), name each.
- **Resistor/input schematics:** give each circuit's name as printed, series vs parallel
  resistor, and every printed state (Short - Alarm, Open - Restore, 2,2k - ...).
- **Numbered callouts (photos or drawings):** use the NAMES from the page's own numbered list
  (given in the item's context) for each number, and say which photo (left/right) each number is on.
- **Screenshots:** which program and window, then the highlighted or relevant fields with their
  values, using the UI's own labels. Never copy device-specific identifiers (IMEI, serial numbers,
  ICCID, passwords) or personal details in example rows (names, phone numbers, email addresses);
  name the field instead. Keep the manual's example values that the steps use
  (Object ID 561234, PIN 1111, codes 123456).
- **Block diagrams:** only the links the arrows show; never add a link that is not drawn.
- **Small inline icons:** just the meaning, e.g. "Read button".
- No double quotes in the alt text (use single quotes or none), no line breaks. Do not start with
  "Image of". Simple images 1-2 sentences; diagrams: completeness beats brevity (aim < 400 chars
  per diagram).
- **Describe only what the image shows.** If it contradicts the page text (cable name, terminal,
  value), has a label in another language, or is unreadable, say so in `note`; do not fix it in the alt.
- **Complexity:** `high` = a diagram with 3+ components, any wiring with crossings, junction dots,
  diagonals or many parallel wires, any numbered-callout picture, or anything you are not sure of.
  Otherwise `simple`.

## Output
Reply with ONLY a JSON array, one object per item, same order, no prose, no code fence:
`[{"id": "...", "alt": "...", "complexity": "simple|high", "kind": "wiring|diagram|screenshot|photo|icon|other", "note": ""}]`
