# Previewing a worktree without stopping for an approval

A new or changed entry in `.claude/launch.json` makes the next `preview_start` ask Andrius for approval,
even though `mcp__Claude_Browser__*` is allowed in `~/.claude/settings.json`. The allow rule covers the
tool, not a server command it has not run before.

On 2026-11-25 a session added `mkdocs-sp3-preview` (mkdocs serve for the `sp3-app-tabs` worktree) at
21:34 and called `preview_start`. The request sat unanswered overnight and the session did nothing for
ten hours, while Andrius had left it to work on its own. `~/Library/Logs/Claude/main.log` shows it:
`Emitted tool permission request … for mcp__Claude_Browser__preview_start`, answered at 06:46.

How to apply:
- To see a branch's pages, use what needs no approval: `mkdocs build --strict` into a scratch folder and
  check the built HTML, and the pull request's Netlify preview
  (`https://deploy-preview-<PR>--trikdis-manuals.netlify.app/…`, ready a minute or two after a push).
- Use the in-app browser only with a configuration that already exists in `launch.json` and is unchanged.
- If a new server really is needed, ask for it while Andrius is there, never as the last step before he
  leaves, and do everything else first (global CLAUDE.md §8).
