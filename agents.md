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
