# Handover: finish alt text for the manual images

**For:** the agent taking over the sitewide alt-text job. **From:** Andrius (drafted 2026-09-28).
Read this file, then `agents.md` (it wins on any conflict), before touching anything.

## Goal
Every image in the manuals gets alt text. The job covers three things:
- **Screen readers.** Visitors who can't see the image get its content.
- **Joy, the docs-site support assistant.** She answers installers from the published manuals. She can open the pictures, but her automatic fact check reads text only. So a connection or a value printed only inside a diagram can't be verified, and her reply gets held back.
- **Search.** Alt text is indexed.

For **wiring diagrams**, alt text must list the actual connections, not just name the diagram. "E16 Innerrange Integriti panel connection diagram" tells nobody which wire goes where.

## Where it stands (2026-09-28, after wave 4)
- **Done:**
  - CG17 pilot (PR #14);
  - wave 2: the FLEXi/TouchPad keypad pair, iO-8 and RF-LORA (PR #15);
  - wave 3: the rest of GT, and all of GT+ and GET, 152 images (PR #22).
- **In review, don't redo:**
  - PR #21: the GT manual's 5 panel wiring diagrams (`docs/en/alarm-communicators/cellular/gt/`, image18–image22). Use it as the pattern for wiring diagrams.
  - wave 4: G16 and G16T, 90 images (the G16 PR).
- **Remaining** (counted as if the open PRs are merged; GT's 5 are #21's):

  "Needs alt" counts empty alt, a missing alt attribute, empty Markdown alt and the pipeline placeholder "Product Image". The first version of this file counted only `alt=""` and missed about 100 English images.

  | Language | Needs alt | Total |
  |---|---|---|
  | EN | 796 | 1,343 |
  | LT | 1,160 | 1,345 |
  | ES | 1,148 | 1,327 |
  | RU | 1,175 | 1,329 |

- **Largest English gaps:**

  | Manual | Needs alt | Total |
  |---|---|---|
  | FIRECOM | 107 | 111 |
  | SP3 | 96 | 100 |
  | SK-LCD (button) | 79 | 79 |
  | G17F | 70 | 73 |
  | GATOR | 65 | 68 |
  | GATOR WiFi | 57 | 60 |
  | SP3 Paradox RTX3 | 41 | 42 |
  | E16 | 40 | 43 |
  | SK-LED (button) | 38 | 38 |
  | T16 | 30 | 30 |
  | E16T | 28 | 31 |

  Regenerate the list before you start. Run this from the repo root:

  ```bash
  python3 projects/alt-text/scripts/alt_status.py en
  ```

- **Scripts** (`projects/alt-text/scripts/`, all deterministic):
  - `alt_status.py`: what still needs alt text, per language or per manual.
  - `extract_image_context.py <page>`: one JSON item per image needing alt, with its path, heading trail, the text around it, and Joy's OCR of the picture as a spelling hint for printed labels. OCR is noisy, so the picture itself is the source of truth.
  - `apply_alt_text.py <page> <drafts.json>`: writes `[{"src", "alt"}]` into the page, strips double quotes, and refuses to write anything unless every draft lands and the count drops by exactly that many.

**Order:**
1. English first, highest-traffic products first: communicators (G17F, FIRECOM, E16, E16T, T16; GT, GT+, GET, G16 and G16T are done or in review), then SP3, then the GATOR controllers.
2. Then LT, ES and RU. Each language has its own image files, and the alt text is written in that page's language.

## The process (proven on CG17 and wave 2, keep it)
1. **Gather context without a model.** `extract_image_context.py` collects each image's heading trail and the text around it.
2. **Draft per manual.** Look at each image directly and write one or two sentences, grounded in that context.
3. **Flag complexity at draft time:** `COMPLEXITY: simple | high`. "High" means either:
   - a diagram connecting 3 or more components; or
   - any wiring diagram where a line could plausibly be read as going to more than one terminal (crossings, junction dots, diagonals); or
   - any photo or drawing with numbered callouts. Map each number to the page's own numbered list by name, and note which of two photos it sits on. In #22 a "simple" callout photo had a wrong item, and callout 4 turned out to be on the right-hand photo in all three manuals.
4. **Re-verify every "high" image yourself,** zoomed in (crop and enlarge the crossing regions). Where it's still ambiguous, get a second opinion (Codex).
   - Across roughly 280 checked images, the real errors were on "high" diagrams and on one numbered-callout photo. Don't re-verify everything, and never skip the "high" ones.
   - The drafter can be confidently wrong on a crossing. In #22 it traced a Paradox diagram "pixel by pixel" and got GRN/YEL and TIP/RING swapped. A plain crossing without a junction dot is a pass-over. When your reading and the drafter's differ, get Codex's independent read, and ask neutrally without giving either answer.
   - Codex CLI: `-i` takes every following argument as an image, so put the prompt before `-i`.
5. **Batching that worked (#22, G16):** deduplicate byte-identical pictures across the manuals in a wave (by content hash), and reuse the already-shipped alt text of any picture that is byte-identical to one done before. Then give one Sonnet subagent each batch of about 20 to 23 pictures. Each subagent writes JSON, and `apply_alt_text.py` runs per page.
   - **Keep work files in `projects/alt-text/work/`** (listed in `.git/info/exclude`, never committed), not the session scratchpad. The scratchpad was wiped when the session was interrupted and resumed, and the G16 drafts had to be rebuilt from the subagents' transcripts.
   - **Re-read reused alt text for the new page.** A GT alt text called a generic app illustration "the GT unit"; reused on G16 that was visibly wrong, and it was wrong on GT too.
6. **Shortcut for mirrored pages.** `flexi-sk-lcd` = `sk-lcd-touchpad` and `flexi-sk-led` = `sk-led-touchpad`. Draft once and keep the pairs in sync.

## Alt text rules
- **Wiring diagrams use one format:** `Wiring diagram: <panel or device> to <device>. <group>: <terminal> to <terminal>, …`. For example, from PR #21:
  > Wiring diagram: PARADOX SP, SP+, MG or MG+ panel to GT. Keypad bus: +AUX (+12 V) to +DC, -AUX to -DC, GRN to DATA, YEL to CLK. Telephone communicator: panel TIP to GT TIP, panel RING to GT RING.
- **Copy terminal names exactly as printed** (`+DC`, `A RS485`, `OUT1`). Include every value the diagram prints: supply voltage and current, cable part numbers (EX-CRP2.4, INTG-996795), maximum distances ("up to 100 m"), sensor models.
- **Two diagrams in one image:** describe both, left then right, and name each.
- **Screenshots:** say what window it is and what the highlighted setting or button is, using the UI's own labels.
- **Photos:** say what the device is and what's labelled. For numbered callouts, use the names from the page's numbered list.
- **Leave out device-specific identifiers** that happen to be in a screenshot (IMEI, serial numbers). Keep the manual's example values that the steps refer to (Object ID 561234, PIN 1111).
- **No double quotes inside `alt="…"`.** Use plain text. Keep a single diagram under about 400 characters where you can. Completeness beats brevity for wiring.
- **Describe only what the image shows.** If an image contradicts the text, don't fix the text silently: list it in the PR description.

## How to ship
- **Work in your own worktree:** `~/.claude/tools/agent-worktree.sh ~/Projects/TRIKDIS/manuals <name> origin/main`. Andrius's own checkout (`~/Projects/TRIKDIS/manuals`) often has uncommitted work of his, so never edit, switch or pull it.
- **Open a PR, don't push to `main`.** Connections read from pictures are inferred facts (`agents.md`, "Direct to main, or open a PR?"), and installers act on wiring. Use one PR per manual, or per small group of manuals.
- **Put the "high" images in each PR description** (file names plus one line each), so the reviewer knows where to look.
- **Before each PR:** run `mkdocs build --strict`. Then check that the empty-alt count actually dropped by the number you meant, and diff a sample.
  - An earlier apply script had a regex group bug and silently replaced 0 of N. "No error" doesn't mean it worked. `apply_alt_text.py` now checks this itself; if you write your own, make it check too.
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
