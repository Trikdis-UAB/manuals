# Parallel Manual Conversion — Agent Architecture Spec

_For Claude Code. Covers the goal, repo context, agent roles, worktree strategy, tester checklist, and the conversion loop._

---

## Goal

Convert TRIKDIS product DOCX manuals to MkDocs-compatible Markdown at scale using parallel agents, with a tester-in-the-loop quality gate before anything reaches human review. No output is pushed to the public site automatically — all output lands in `manuals` for human sign-off first.

---

## Repo & Pipeline Context

### Three locations involved

| Path | Repo | Purpose |
|------|------|---------|
| `/Users/local/projects/knowledgebase-conversion-pipeline/` | `git@github.com:andrius-tr/knowledgebase-conversion-pipeline.git` | The DOCX → Markdown pipeline |
| `/Users/local/projects/trikdis-docs/manuals/` | `git@github.com:Trikdis-UAB/manuals.git` | Working files — conversion output lands here |
| `/Users/local/projects/trikdis-docs/manuals/` | `git@github.com:Trikdis-UAB/manuals.git` | Public site — **do not touch during automated conversion** |

### DOCX source files

Source DOCX files are provided by the team and placed in a temporary staging directory:

```
/Users/andriaus/Projects/TRIKDIS/knowledgebase-conversion-pipeline/temp-source-docs/
```

Before starting a batch, verify the required DOCX files are present in this directory. If a DOCX is missing, escalate to the user — do not attempt to find or download it yourself.

For products not yet staged, the canonical source is the network drive at `/Volumes/TRIKDIS/PRODUKTAI/`. Use the helper script to locate the latest version:
```bash
cd /Users/local/projects/trikdis-docs
./find-latest-manual.sh "/Volumes/TRIKDIS/PRODUKTAI/<product-folder>"
```

### Conversion command

```bash
cd /Users/local/projects/knowledgebase-conversion-pipeline
./convert-single.sh "docx temp-source-docs/<filename>.docx"
# Output: docs/<manual-slug>/index.md + image*.png
```

### Where output goes after conversion

```bash
# Copy from pipeline output into darbiniai working branch
cp -r /Users/local/projects/knowledgebase-conversion-pipeline/docs/<manual-slug>/ \
      /Users/local/projects/trikdis-docs/manuals/docs/<category>/<manual-slug>/
```

### MkDocs nav entry format

**Important:** The `manuals/` repo uses the `i18n` plugin with per-language nav sections — the root `nav: []` is empty and each language defines its own nav under the i18n plugin config. Check `manuals/mkdocs.yml` before writing nav entries — it may follow the same pattern or may use a simpler flat structure.

**`manuals/` repo format (i18n plugin — for reference):**
```yaml
plugins:
  - i18n:
      languages:
        - locale: en
          name: English
          default: true
          nav:
            - Home: index.md
            - Communicators:
                - Cellular:
                    - Product Name: en/alarm-communicators/cellular/product-slug/index.md
```

**Before adding a nav entry:** Read the existing `mkdocs.yml` in the darbiniai worktree to understand the exact structure, then add your entry in the matching format and position. Do not assume a format — check first.

---

## Priority Queue — What to Convert

These are the confirmed documentation gaps from `docs-coverage-analysis.md`, in recommended batch order:

### Batch 1 — LoRa Ecosystem (up to 5 in parallel; iO-8 may already be in progress)
- iO-LORA
- iO8-LoRa
- RF-LoRa
- RF-S8
- PB-LoRa
- iO-8 _(check if already completed by another agent before starting)_

### Batch 2 — Hardware Receivers (7 manuals)
- RL14, RFH11, R11, RF11, RT2, RR-IP12, RTH2

### Batch 3 — S8 Wireless Sensors (3 manuals, do in parallel)
- Smart Plug S8
- Smart Smoke Detector S8
- SOS S8

### Batch 4 — M4 Wireless Sensors (3 manuals)
- Curtain mini, Curtain mini PRO, Corner PIR

### Batch 5 — Low-Priority Accessories (3 manuals, defer until Batches 1–4 complete)
- AX-ANT-KIT (433 MHz antenna kit)
- AX-ANT01S_SF (antenna accessory)
- SMA–SMF / 50/01 (antenna extension cable)

These are simple accessories that may not need full conversion — confirm with team whether a brief product sheet is sufficient.

---

## Agent Architecture

### Overview

```
Orchestrator
├── for each batch:
│   ├── spawn N Builder agents in parallel (one per manual)
│   ├── wait for all builders to finish
│   ├── spawn N Tester agents in parallel (one per manual)
│   ├── collect tester reports
│   │   ├── PASS → open PR to darbiniai main for human review
│   │   └── FAIL → route to fix loop (see below)
│   └── repeat until all pass or escalate to human
└── never touch manuals/ (public site)
```

### Worktree Strategy

Each manual gets **its own isolated worktree** in both the pipeline repo and darbiniai, on a dedicated branch. This prevents any two agents from touching shared files simultaneously.

**Pipeline worktrees** (one per manual being converted):
```bash
cd /Users/local/projects/knowledgebase-conversion-pipeline
git worktree add worktrees/convert-<manual-slug> -b convert/<manual-slug>
```

**Darbiniai worktrees** (one per manual, receives the converted output):
```bash
cd /Users/local/projects/trikdis-docs/manuals
git worktree add worktrees/convert-<manual-slug> -b convert/<manual-slug>
```

**Pipeline fix worktrees** (only created if a tester finds a systematic pipeline bug):
```bash
cd /Users/local/projects/knowledgebase-conversion-pipeline
git worktree add worktrees/fix-<issue-slug> -b fix/<issue-slug>
# Fix the filter/script here, test, then PR to pipeline main separately
# Re-run affected conversions after the fix merges
```

> **Important:** Pipeline fix branches must not be merged into pipeline main while other conversions are mid-run in their own worktrees, as they could invalidate in-flight results.

### Builder Agent

Responsibilities per manual:
1. Create pipeline worktree on `convert/<manual-slug>` branch
2. Create darbiniai worktree on `convert/<manual-slug>` branch
3. Run `./convert-single.sh` inside the pipeline worktree
4. Copy output (`index.md` + all `image*.png`) to darbiniai worktree
5. Add nav entry to `mkdocs.yml` in the darbiniai worktree
6. Commit both the content and the nav change
7. Signal completion to the orchestrator

### Tester Agent

Responsibilities per manual:
1. Read the committed `index.md` from the darbiniai worktree
2. Run all Tier 1 checks (see checklist below)
3. Run Tier 2 checks and flag warnings
4. Produce a structured report: `PASS` or `FAIL` with specific findings (check name, file, line number where applicable)
5. If `FAIL`: classify each failure as either _fixable in markdown_ or _pipeline bug_
6. Signal result to orchestrator

Builder and tester work on the **same branch** (`convert/<manual-slug>`) sequentially — tester reads what builder committed, then builder applies fixes if needed. They do not need separate branches from each other.

---

## Tester Checklist

### Tier 1 — Hard Fails (block PR, must fix before human review)

All checks are deterministic and automatable.

| # | Check | How to verify |
|---|-------|--------------|
| T1-1 | `index.md` exists in output directory | File existence check |
| T1-2 | All images referenced in `index.md` exist on disk | Parse all `![...](./<file>)` links, check each path |
| T1-3 | No images on disk are unreferenced (orphaned files) | List all `image*.png` in dir, compare against references in `index.md` |
| T1-4 | All image paths use `./imageN.png` relative format | Regex: no absolute paths, no bare filenames without `./` |
| T1-5 | An H1 heading is present | Regex: at least one `^# ` line |
| T1-6 | No skipped heading levels (e.g. H1 → H3 without H2) | Parse heading sequence, check no level jumps by more than 1 |
| T1-7 | No unclosed fenced code blocks | Count opening/closing ` ``` ` fences — must be even |
| T1-8 | All tables have consistent column counts per table | Parse each table block, verify every row has same `\|` count |
| T1-9 | GitHub alert callouts render correctly | The site uses `markdown-callouts` extension, which renders `> [!NOTE]` syntax natively. Verify that any callouts present use the correct format: `> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]` — with the `>` blockquote prefix on every continuation line. Malformed callouts (missing `>` on subsequent lines, wrong type keyword) are failures; correctly formatted `> [!NOTE]` blocks are **not** failures. |
| T1-10 | No unconverted `<u>` HTML tags remaining | Regex: no `<u>` or `</u>` |
| T1-11 | `mkdocs build --strict` passes with manual included | Run `mkdocs build --strict` in darbiniai worktree; exit code 0 required |

### Tier 2 — Soft Warnings (flag for human, do not block)

| # | Check | Threshold |
|---|-------|-----------|
| T2-1 | Tables with excessive column count | Flag any table with >8 columns |
| T2-2 | Numbered lists that restart at 1 after an image | Detect `1.` appearing after an image line in what appears to be a continuing list |
| T2-3 | Headings with no content between them | Two consecutive heading lines with no body text |
| T2-4 | Images with no surrounding text (possible lost caption) | Image line with no text within 2 lines above or below |

### Tier 3 — Human Review Only (cannot automate)

These are explicitly out of scope for the tester agent. They go to human review after Tier 1 passes:

- Content accuracy against the source DOCX
- Image quality and relevance
- Whether the manual reads logically end-to-end
- Whether the product name and H1 title are correct

---

## The Fix Loop

```
Tester reports FAIL
│
├── All failures are "fixable in markdown"?
│   └── Builder agent patches index.md directly in the worktree, re-commits
│       → Tester re-runs
│
├── Any failure is a "pipeline bug" (systematic, affects the filter/script)?
│   ├── Create pipeline fix worktree: fix/<issue-slug>
│   ├── Fix the relevant filter or script
│   ├── Re-run conversion for affected manual in its existing worktree
│   ├── Tester re-runs
│   └── Pipeline fix branch → separate PR to pipeline main (human reviews separately)
│
└── After 3 failed fix attempts on same manual → escalate to human with full report
```

---

## Output & Handoff

When a manual passes all Tier 1 checks:

1. The darbiniai worktree branch (`convert/<manual-slug>`) is ready for human review
2. Open a PR from `convert/<manual-slug>` → `main` in `manuals`
3. PR description should include:
   - Manual name and product category
   - Tester report summary (all checks passed, any Tier 2 warnings)
   - Number of conversion passes required
   - Any pipeline fixes that were applied
4. Human reviews the PR, checks rendered output via `mkdocs serve`, merges when satisfied
5. After human merge to `manuals`, a separate step (outside this pipeline) copies to `manuals/` for public deployment — **do not automate this step**

---

## Checker Script

The Tier 1 and Tier 2 checks should be implemented as a standalone Python script:

```
/Users/local/projects/knowledgebase-conversion-pipeline/check_conversion.py
```

Usage:
```bash
python3 check_conversion.py /path/to/darbiniai/worktree/docs/en/category/manual-slug/
# Exits 0 on PASS, 1 on FAIL
# Outputs structured JSON report to stdout
```

The tester agent runs this script and parses its JSON output to determine pass/fail and route failures.

---

## Worktree Cleanup

After a manual's PR is merged (or abandoned), clean up its worktrees to avoid accumulating stale checkouts:

```bash
# Remove pipeline worktree
cd /Users/local/projects/knowledgebase-conversion-pipeline
git worktree remove worktrees/convert-<manual-slug>
git branch -d convert/<manual-slug>

# Remove darbiniai worktree
cd /Users/local/projects/trikdis-docs/manuals
git worktree remove worktrees/convert-<manual-slug>
git branch -d convert/<manual-slug>
```

The orchestrator should track which worktrees are active and clean up after each batch completes. With 22 manuals, leaving all worktrees in place would create 44+ directories and branches.

---

## What NOT to Do

- **Do not push to `manuals/` (public site) at any point during automated conversion**
- **Do not commit directly to `main` in either repo** — all work goes via worktree branches and PRs
- **Do not merge pipeline fix branches while other conversions are in-flight** in worktrees that branched from the pre-fix pipeline main
- **Do not run `mkdocs build` against `manuals/`** — only test against `manuals/`
- **Do not edit Markdown manually as a substitute for fixing the pipeline** — if a pattern fails conversion repeatedly, fix the pipeline filter so all future conversions benefit

---

## Reference Files

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | `manuals/CLAUDE.md` | Full project context, MkDocs config, pipeline commands |
| `docs-coverage-analysis.md` | `manuals/docs-coverage-analysis.md` | Full list of 22 missing manuals with categories and priority |
| `convert-single.sh` | `knowledgebase-conversion-pipeline/` | Main conversion script |
| `temp-source-docs/` | `knowledgebase-conversion-pipeline/temp-source-docs/` | Staged DOCX source files provided by team |
| `find-latest-manual.sh` | `trikdis-docs/` | Locates latest DOCX on the network drive |
| `mkdocs.yml` | `manuals/mkdocs.yml` | Nav structure to update — **read format before editing** |
| `requirements.txt` | `manuals/requirements.txt` | Pinned MkDocs dependencies — do not change versions |
