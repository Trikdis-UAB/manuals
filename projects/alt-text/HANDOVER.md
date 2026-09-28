# Handover: finish alt text for the manual images

**For:** the agent taking over the sitewide alt-text job. **From:** Andrius (drafted 2026-09-28).
Read this file, then `agents.md` (it wins on any conflict), before touching anything.

## Goal
Every image in the manuals gets alt text. The job covers three things:
- **Screen readers.** Visitors who can't see the image get its content.
- **Joy, the docs-site support assistant.** She answers installers from the published manuals. She can open the pictures, but her automatic fact check reads text only. So a connection or a value printed only inside a diagram can't be verified, and her reply gets held back.
- **Search.** Alt text is indexed.

For **wiring diagrams**, alt text must list the actual connections, not just name the diagram. "E16 Innerrange Integriti panel connection diagram" tells nobody which wire goes where.

## Where it stands (published `main`, 2026-09-28)
- **Done:**
  - CG17 pilot (PR #14);
  - wave 2: the FLEXi/TouchPad keypad pair, iO-8 and RF-LORA (PR #15).
- **In review, don't redo:** PR #21 covers the GT manual's 5 panel wiring diagrams (`docs/en/alarm-communicators/cellular/gt/`, image18–image22). Use it as the pattern for wiring diagrams.
- **Remaining, images with empty alt:**

  | Language | Empty | Total |
  |---|---|---|
  | EN | 939 | 1,263 |
  | LT | 1,094 | 1,291 |
  | ES | 1,071 | 1,268 |
  | RU | 1,089 | 1,249 |

- **Largest English gaps:**

  | Manual | Empty | Total |
  |---|---|---|
  | FIRECOM | 107 | 111 |
  | SP3 | 96 | 100 |
  | G17F | 70 | 73 |
  | GATOR | 65 | 68 |
  | GATOR WiFi | 57 | 60 |
  | GT+ | 52 | 56 |
  | SK-LCD (button) | 51 | 79 |
  | GT | 51 | 55 |
  | GET | 51 | 55 |
  | G16 | 46 | 50 |
  | G16T | 41 | 45 |
  | SP3 Paradox RTX3 | 41 | 42 |

  Regenerate the list before you start. Run this from the repo root:

  ```bash
  for f in $(find docs/en -name index.md); do e=$(grep -o 'alt=""' $f | wc -l | tr -d ' '); t=$(grep -o '<img ' $f | wc -l | tr -d ' '); [ "$t" -gt 0 ] && [ "$e" -gt 0 ] && echo "$e/$t $f"; done | sort -t/ -k1 -n -r
  ```

**Order:**
1. English first, highest-traffic products first: communicators (GT, GT+, GET, G16, G16T, G17F, FIRECOM), then SP3, then the GATOR controllers.
2. Then LT, ES and RU. Each language has its own image files, and the alt text is written in that page's language.

## The process (proven on CG17 and wave 2, keep it)
1. **Gather context without a model.** For each image, a script collects its heading trail and the paragraph around it.
2. **Draft per manual.** Look at each image directly and write one or two sentences, grounded in that context.
3. **Flag complexity at draft time:** `COMPLEXITY: simple | high`. "High" means either:
   - a diagram connecting 3 or more components; or
   - any wiring diagram where a line could plausibly be read as going to more than one terminal (crossings, junction dots, diagonals).
4. **Re-verify every "high" image yourself,** zoomed in (crop and enlarge the crossing regions). Where it's still ambiguous, get a second opinion (Codex).
   - Across roughly 130 checked images, every real error was on a "high" diagram. Simple images were always right. Don't re-verify everything, and never skip the "high" ones.
5. **Shortcut for mirrored pages.** `flexi-sk-lcd` = `sk-lcd-touchpad` and `flexi-sk-led` = `sk-led-touchpad`. Draft once and keep the pairs in sync.

## Alt text rules
- **Wiring diagrams use one format:** `Wiring diagram: <panel or device> to <device>. <group>: <terminal> to <terminal>, …`. For example, from PR #21:
  > Wiring diagram: PARADOX SP, SP+, MG or MG+ panel to GT. Keypad bus: +AUX (+12 V) to +DC, -AUX to -DC, GRN to DATA, YEL to CLK. Telephone communicator: panel TIP to GT TIP, panel RING to GT RING.
- **Copy terminal names exactly as printed** (`+DC`, `A RS485`, `OUT1`). Include every value the diagram prints: supply voltage and current, cable part numbers (EX-CRP2.4, INTG-996795), maximum distances ("up to 100 m"), sensor models.
- **Two diagrams in one image:** describe both, left then right, and name each.
- **Screenshots:** say what window it is and what the highlighted setting or button is, using the UI's own labels.
- **Photos:** say what the device is and what's labelled.
- **No double quotes inside `alt="…"`.** Use plain text. Keep a single diagram under about 400 characters where you can. Completeness beats brevity for wiring.
- **Describe only what the image shows.** If an image contradicts the text, don't fix the text silently: list it in the PR description.

## How to ship
- **Work in your own worktree:** `~/.claude/tools/agent-worktree.sh ~/Projects/TRIKDIS/manuals <name> origin/main`. Andrius's main checkout sits on a draft branch with uncommitted work, so never edit or switch it.
- **Open a PR, don't push to `main`.** Connections read from pictures are inferred facts (`agents.md`, "Direct to main, or open a PR?"), and installers act on wiring. Use one PR per manual, or per small group of manuals.
- **Put the "high" images in each PR description** (file names plus one line each), so the reviewer knows where to look.
- **Before each PR:** run `mkdocs build --strict`. Then check that the empty-alt count actually dropped by the number you meant, and diff a sample.
  - An earlier apply script had a regex group bug and silently replaced 0 of N. "No error" doesn't mean it worked. Match `<img alt="" src="./imageN.webp"` exactly, and assert each one occurs exactly once.
- **Don't touch** image files, `mkdocs.yml`, heading numbering or page text. This job is alt attributes only.

## Already noticed (report in the PR, don't fix silently)
- The GT manual's Paradox SP diagram (image22) has a Russian label, "Шина клавиатуры" (keypad bus), in the English manual.
- The GT manual's text lists a "CRP2 cable" for the Paradox serial port, but the diagram (image18) says "EX-CRP2.4".

## Done means
- Every image in the manuals you took on has non-empty alt text.
- Every wiring diagram lists its connections and printed values.
- Every "high" image was re-verified zoomed in.
- The PRs are open and the strict build passes.
- The remaining list is updated at the top of this file.
