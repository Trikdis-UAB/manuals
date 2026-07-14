# AGENTS.md (Parent) - Execution Protocol + Safety Rails

This file defines how the agent should operate across projects. Treat these instructions as the global baseline. Project-level `AGENTS.md` may add constraints or additional required commands, but may not weaken the safety or verification rules here. If any conflict exists, stop and ask the user. Higher-level system/developer/app instructions always take precedence; if that prevents compliance with this file, ask the user.

## 1) Core behavior (work independently, finish the job)
- Operate end-to-end: clarify the objective from repo docs/issues, plan the smallest complete change, implement, verify, and only then report completion.
- Keep going until you can verify the result is working as intended using evidence from the project's documented build/test commands and targeted checks you add.
- If verification cannot be completed due to missing tools, permissions, or environment limits, state what blocked it and provide the best available evidence.
- Default to proactive problem-solving: surface risks/unknowns early, but do not stop unless you are blocked by missing inputs, permissions, or a required tool install.

## 2) Research-first policy (avoid reinventing wheels)
- Before implementing anything non-trivial, do a short, focused pass (online + repo search) for the best existing approach.
- Timebox research by default (e.g., 5-15 minutes), but extend it when the task requires selecting a framework/tooling approach or evaluating tradeoffs.
- If network access is unavailable, state it and proceed with repo search only.
- Prefer reuse over novelty: use existing repo utilities, shared components, and established frameworks already in the stack.
- If adding a dependency, prefer mature, well-maintained packages with good docs and wide adoption.
- Document the chosen approach briefly in the handoff: what you used, why, and what alternatives you rejected.

## 3) Safety / permissions (network ok, installs require approval)
- Assume network access is allowed for research and fetching dependencies inside the project sandbox.
- If network access is restricted, state it and proceed with repo-only research.
- NEVER install anything system-wide without explicit user approval.
- If a tool is needed (e.g., Playwright for UI testing, linters, test runners), ask to install it first.
- Prefer project-local installs: `.venv`, `npm devDependencies`, etc.
- Avoid `sudo`, global `brew install`, or writes outside the repo unless the user explicitly approves.
- If a tool would be broadly useful across multiple projects, propose a global install as an option and explain the tradeoff.
- Global install advantages: reuse across projects, faster setup, consistent tooling.
- Global install risks: wider blast radius, version drift, unexpected interactions.
- Default to local install unless the user explicitly approves global.

### Credentials (local only)
- Fetch login details from macOS Keychain.
- When adding new credentials, store them in Keychain (not the repo).

```bash
security find-generic-password -w -s <service-name>
security add-generic-password -a "$USER" -s <service-name> -w "<value>"
```

## 4) Verification standard (no "seems fine")
- Every change must be verified with evidence.
- First run the project's official verification commands (from repo docs).
- Then add or extend a targeted check that proves the specific behavior you changed.
- Targeted checks can be: unit test, integration test, smoke script, lint rule, or a small reproducible harness.
- If there is no existing test framework, create a minimal check script under `Scripts/` or `tools/` and run it.
- For UI changes, verification must include at least one automated check or a reproducible browser-based evidence set (see section 8).
- Only conclude "fixed" when the official commands pass and the targeted check passes, and there are no new warnings/errors attributable to the change; list any pre-existing warnings.
- Example (docs sites): run the documented build command (e.g., `mkdocs build --strict`) plus a targeted check for the specific pages/features you changed.

## 5) Change hygiene (small diffs, predictable structure)
- Make the smallest coherent change that fully solves the problem.
- Keep diffs clean: avoid drive-by refactors unless they are necessary to complete the task safely.
- Prefer incremental commits locally; do not push unless asked.
- Update docs when behavior changes so README / docs / comments match reality after your change.

## 6) Proactive documentation maintenance (keep docs true)
- When you discover outdated, incomplete, or misleading documentation, proactively update it as part of the change.
- Documentation candidates: project `AGENTS.md`, README, CONTRIBUTING, docs pages, troubleshooting notes.
- When adding a new verification command, dependency, or workflow requirement, document it where it applies.
- Do not commit documentation-only changes if the user asked for "no commits"; otherwise keep doc updates small and aligned with the code change.

## 7) Reporting format (evidence-based handoff)
- In handoffs, include: what changed (1-3 bullets), commands run (exact), targeted checks added/updated (and where), documentation updates made (and where), evidence summary, remaining risks/follow-ups.

## 8) UI / browser debugging protocol (evidence, not vibes)
- When the task involves UI, CSS, layout, DOM behavior, console errors, network failures, or web performance, gather evidence with a browser automation/debugging tool when available.
- Produce artifacts under `artifacts/ui/` (do not commit unless requested).
- Artifacts include: screenshot (before/after), console errors/warnings export (before/after), network failures export (before/after), DOM snapshot (or outerHTML) of the relevant region, computed styles + box metrics for key selectors, and if performance-related a performance trace + metric(s) improved.
- Workflow: reproduce and collect artifacts (before), identify the exact cause, implement the minimal fix, re-check and collect artifacts (after), conclude "fixed" only when after-artifacts match expected behavior and no new errors appear.
- If the debugging tool is not available, fall back to Playwright (ask to install first) or manual reproduction with screenshots and console logs plus clear steps.

## 9) Automation mindset (script recurring fixes)
- If you perform the same edit pattern more than once, script it.
- Add a `Scripts/` tool (or equivalent) to normalize or automate the change.
- Re-run automation after conversions/migrations or repeated content generation to avoid regressions.

## 10) Tool registry (keep installed tools visible and up to date)

Location: `/Users/andriaus/.codex/AGENTS.md`

Purpose: Maintain a single, always-visible inventory of globally available tools and what they are used for, so the agent can reuse them across projects and avoid redundant installs.

Rules:
- Before asking to install a new tool, check this registry and reuse what exists.
- When a new tool is installed globally (or enabled system-wide), ask the user to update THIS file with tool name and version (if available), install method, primary purposes, typical commands, and important notes (auth, env vars, paths, constraints).
- If you propose installing a new global tool, include the exact registry entry you want the user to paste into this file.
- If a tool is installed locally in a repo, prefer documenting it in that repo's `AGENTS.md` (or README) instead of this global registry.

### Installed tools (global / system-wide)
- Chrome DevTools MCP. Purpose: UI inspection/debugging (DOM/CSS/console/network/performance) with evidence artifacts. Invocation: MCP server `chrome-devtools` (see `~/.codex/config.toml`).
- MkDocs MCP. Purpose: query MkDocs upstream documentation when working on MkDocs-based sites. Invocation: MCP server `mkdocs` (`npx -y @serverless-dna/mkdocs-mcp https://www.mkdocs.org`).

## 11) Manuals deploy workflow (Netlify)

Use this repo-specific deployment flow for docs updates.

- Production publish is triggered by Netlify from `main`.
- Do not expect production publish from feature branch pushes unless explicitly configured as branch/deploy previews in Netlify.
- `netlify.toml` and `Scripts/build_docs.sh` are the source of truth for production build behavior.

### Required release path

1. Push branch updates.
2. Open PR into `main`.
3. Merge PR.
4. Confirm the Netlify production deploy for `main` completes successfully.

### Standard `gh` commands

```bash
# Create PR from current branch to main
gh pr create --base main --head "$(git branch --show-current)"

# Merge PR (or enable auto-merge if checks are configured)
gh pr merge --merge

# Check latest GitHub workflow fallback runs if needed
gh run list --workflow "Fallback GitHub Pages deploy" --limit 5
```

### Fast verification after merge

```bash
# Verify published docs endpoint
curl -I https://docs.trikdis.com/en/receivers/ipcom/
```

Expected result: `HTTP/2 200`.

Expected headers after cutover: `server: Netlify` and `cache-control: public,max-age=0,must-revalidate`.

### IPcom deferred page pointer

- `docs/en/receivers/ipcom/ui/ha-cluster-backup.md` is intentionally kept in-repo but excluded from public deployment.
- Exclusion is controlled in `mkdocs.yml` via `exclude_docs`.
- When resuming HA documentation work, re-enable it by:
  1. Removing the exclude entry for that file.
  2. Adding it back to `IPcom` navigation in `mkdocs.yml` and `docs/_NAVIGATION.md`.
  3. Re-running docs checks and strict build before merge.
- Internal question backlog for this manual is stored at `projects/Ipcom5/team-questions.md` (not published).
- Redaction document index for IPcom5 is `projects/Ipcom5/redaction-docs.md`.
- Unredacted screenshot safety copies must be kept locally under `artifacts/private/ipcom5-unredacted-<timestamp>/` (with `MANIFEST.sha256`) and must never be committed.

## 12) PDF download button

Every published manual page gets a **"Download PDF"** button (red, top-right below the H1) injected automatically by `mkdocs_hooks.py` when the `TRIKDOCS_PDF_DOWNLOADS=1` env var is set at build time.

### Normal flow (generated PDF)
The hook generates a filename like `trikdis-rl14-en.pdf`, writes a `pdf-manifest.json` in the site root, and a separate build step (Netlify) renders the page to PDF and places it at that path.

### Bundled original PDF (front matter `pdf:`)
For EOL products or manuals where the auto-generated PDF would be degraded (e.g. missing EMF images, lost Word callout overlays), bundle the original source PDF instead:

1. Copy the PDF into the page's docs folder:
   ```
   docs/en/<category>/<product>/my-original.pdf
   ```

2. Add front matter to the page's `index.md`:
   ```yaml
   ---
   pdf: my-original.pdf
   ---
   ```

**Effect:**
- The button appears on every build, even without `TRIKDOCS_PDF_DOWNLOADS=1` (no generation needed).
- The button label changes to **"Download original PDF"** (localised per language) instead of the standard "Download PDF".
- The button links directly to the bundled file; the friendly download name is still derived from the page H1.
- The page is **excluded** from `pdf-manifest.json`, so the PDF generator does not overwrite it.

**Example:** `docs/en/receivers/ip-network/rl14/` — uses `rl14-original.pdf` because the source DOCX contained EMF images and Word callout text-box overlays that Pandoc cannot extract.

## 13) FAQ system (support-case-sourced Q&A)

Purpose: close the loop between real customer support emails/tickets and the docs — capture recurring questions as they actually come in, rather than guessing what readers need. Entries should trace back to a real support case, not be invented.

### Where content lives
`docs/en/faq/index.md` — one page today, grouped by product under `##` headings (e.g. `## FLEXi SP3`). Split into per-product pages (`docs/en/faq/<product>.md`, with a nav sub-list) only once a product's section or the page as a whole gets unwieldy — no fixed threshold, use judgment.

### Entry format
Each entry is a collapsible question, not a heading, wrapped in `pymdownx.snippets` section markers so it can be transcluded into a manual later even if it isn't yet:
```markdown
<span id="sp3-wiegand-reader-door-output"></span>

<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "How do I set up a single Wiegand reader (no keypad) to pulse a door output?"

    1. Step-by-step answer...
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->
```
- `??? question "..."` is a Material/pymdown-extensions `details` admonition (type `question`), collapsed by default. This keeps the page scanning as a list of questions rather than another manual, and keeps entries out of the heading-numbering pass.
- The `<span id="...">` is a manual anchor (slug: `<product>-<short-topic>`) for deep-linking into the FAQ page — collapsible admonitions get no automatic heading anchor, so without this span, nothing could target one specific question there.
- **The span must stay *outside* the `[start:...]`/`[end:...]` markers.** A manual can (and the pattern below expects it to) transclude the same section twice on one page — once as a top-of-page digest, once in context further down. HTML ids must be unique per page; if the span were inside the markers, transcluding twice would emit the same `id` twice on that page and break anchor resolution. Only the FAQ page needs the id (it's the one place anyone deep-links to); the transcluded copies don't need their own.
- Likewise keep any FAQ-page-only content (e.g. a closing "see the full manual" link) *outside* the markers — anything inside gets pulled verbatim into a manual too, where a self-link back to "the FLEXi SP3 manual" from inside the FLEXi SP3 manual would be circular.
- Pagefind (this repo's search) still indexes collapsed content: `pymdownx.details` renders a real `<details><summary>`, which is ordinary `<body>` DOM, not hidden from the indexer.

### Numbering exclusion lives in hooks.py, not mkdocs.yml
FAQ pages must not get auto-numbered headings (`## FLEXi SP3` must not become `## 1. FLEXi SP3`). **Adding `en/faq/` to `add-number.excludes:` in `mkdocs.yml` has no effect** — `_apply_heading_numbers()` in `mkdocs_hooks.py` calls `AddNumberPlugin().load_config(...)` with its own hardcoded `"excludes": []`, ignoring whatever `excludes:` is set in the YAML plugin config. The real exclusion point is `_should_number_headings()` in `mkdocs_hooks.py`, which already special-cases `<locale>/faq/` pages for every configured locale. If FAQ numbering ever misbehaves, fix it there, not in `mkdocs.yml`.

### Cross-linking from manuals
Product manuals pull the answer in **inline**, via a `pymdownx.snippets` include — never a link out to the FAQ page, so the reader never has to navigate away:
```markdown
--8<-- "en/faq/index.md:sp3-wiegand-reader-door-output"
```
The FAQ file (`docs/en/faq/index.md`) stays the single source of truth — edit the entry there once, everywhere that includes it picks up the change on next build. `pymdownx.snippets` config lives in `mkdocs.yml`: `base_path: [docs]` (so includes are written relative to `docs/`, e.g. `en/faq/index.md:<anchor>`), `check_paths: true` (fails the build on a bad path/section instead of silently rendering nothing), `dedent_subsections: true` (required — see nested sections below).

A manual includes each relevant entry **twice**, for two different readers:
1. **A "Common questions" digest near the top of the page** (right after the hero image, before the first `##` heading) — for a reader who lands on the page not knowing the manual answers their question at all. Label it with a bold line, not a heading (`**Common questions**`, not `## Common questions`) — a real heading would get numbered by `add-number` and renumber every section after it. Close the digest with a plain contact line: `Don't see your question? Contact [support@trikdis.lt](mailto:support@trikdis.lt).` — that line is also the natural place a future "ask a question" widget/chatbot would slot in later.
2. **In context, at the exact section the question is about** (e.g. inside "Linking RFID key fobs (cards)" for the Wiegand entry) — for a reader already reading that section via search or the TOC.

#### When the digest needs one extra thing the in-context copy shouldn't have
The digest often wants a "jump to the full section" link, e.g. `[Linking RFID key fobs (cards)](#541-linking-rfid-key-fobs-cards)`. Don't put this in the main shared section: it's an in-page link, so it's only valid on the SP3 manual page — it would be a dead link if it ended up on the FAQ page too (no such heading there), and it would be circular if it ended up on the in-context copy (already at that heading). Instead, nest a **second, narrower section** around just the reusable core (no wrapper, no link), and hand-write the `??? question "..."` wrapper plus the extra link locally at the digest only:

**Getting the anchor right:** don't hand-derive the slug and trust it — `add-number` renumbers the target heading (e.g. "Linking RFID key fobs (cards)" → "5.4.1 Linking RFID key fobs (cards)") and the final id is `<number>-<ascii-folded-slug>` (e.g. `541-linking-rfid-key-fobs-cards`). For non-English headings the folded slug can differ a lot from the source text — Lithuanian/Spanish accents get stripped (`kortelių` → `korteliu`), and Russian gets far more aggressive: Cyrillic isn't transliterated at all, just dropped, so "Регистрация RFID карточек (брелоков)" collapses to `541-rfid` (confirmed unique on the page — the numeric prefix is unique per heading position even when the text remnant is this short). `mkdocs build --strict` won't catch a wrong anchor (same-page fragments aren't validated, so it silently just fails to scroll). Build first, then read the real id from the built page's nav TOC entry (grep for the heading's number, e.g. `"5.4.1"`, and take the `href` on that link — it's generated by the same pipeline that assigned the heading's `id`, so it's authoritative), put that exact id in the link, rebuild, and confirm the rendered `href` matches the heading `id` exactly.
```markdown
<!-- in docs/en/faq/index.md -->
<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "How do I set up a single Wiegand reader (no keypad) to pulse a door output?"

<!-- --8<-- [start:sp3-wiegand-reader-door-output-body] -->
    1. Step-by-step answer...
<!-- --8<-- [end:sp3-wiegand-reader-door-output-body] -->
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->
```
```markdown
<!-- in the manual's top "Common questions" digest -->
??? question "How do I set up a single Wiegand reader (no keypad) to pulse a door output?"

    --8<-- "en/faq/index.md:sp3-wiegand-reader-door-output-body"

    See the full section: [Linking RFID key fobs (cards)](#linking-rfid-key-fobs-cards).
```
The in-context copy keeps using the simple outer include (no `-body` suffix), unchanged — no wrapper, no extra link, nothing circular. Nested markers of different names don't interfere with each other; extracting the outer section just treats the inner markers as skippable comments.

This only works with `dedent_subsections: true`: the `-body` section is authored indented (nested under the FAQ page's own `??? question`), and `pymdownx.snippets` re-indents whatever it splices in to match the including line's own indentation on top of whatever the extracted text already has. Without dedenting first, the digest's copy would double up (4 spaces baked into the extracted text + 4 more from being nested under the local wrapper) and fail to nest correctly.

Either way, it's the same underlying answer text kept in one place — see the "span must stay outside the markers" note above for why the id itself only needs to exist once, on the FAQ page.

### Nav visibility
The FAQ page is intentionally **not** listed in `mkdocs.yml`'s nav yet — one entry doesn't warrant a permanent top-level slot. It's still fully built and reachable via direct URL and via the manuals that transclude its entries inline (see Cross-linking from manuals above). See `NAV_VISIBILITY.md` → "A Simpler Option — Omit From `nav:` Entirely". Promote it by adding `- FAQ: faq/index.md` back into the English nav (right after `Home`) once there's enough content to justify it — no other change required.

### Adding a new entry from a support case
1. Identify the product and phrase the question the way a customer would ask it, not how support would.
2. Add `<span id="...">` + `??? question "..."` under that product's `##` heading in `docs/en/faq/index.md` (create the heading if it's a new product).
3. If the relevant manual should show this answer inline, add a `--8<-- "en/faq/index.md:<anchor>"` include both in its top-of-page "Common questions" digest (create one if the manual doesn't have one yet) and at the point in its text where the topic comes up (see Cross-linking from manuals above).
4. Rebuild with `mkdocs build --strict` and confirm the anchor resolves, the snippet include renders (not a literal `--8<--` line), and the accordion renders.
