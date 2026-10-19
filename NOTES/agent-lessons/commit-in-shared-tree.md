# Committing in a tree other sessions are working in

This checkout usually holds other sessions' unfinished work: staged deletions, unstaged edits, untracked folders. Never `git add -A`, never `git stash`, never `git pull --rebase --autostash`. Each of these can sweep their work into your commit or shuffle it between the index and the working tree.

**Your files are untouched by anyone else:** `git commit -m "…" -- <paths>`. With paths, git commits only those paths and leaves everything else staged exactly as it was. A new file must be `git add`ed first, or the pathspec fails.

**You changed lines in a file that also holds someone else's unstaged edits** (2026-10-19: one table row in each GT+ `index.md`, while another session had new screenshots half-done in the same files): build the commit in a separate index so only your lines go in.

```bash
export GIT_INDEX_FILE=<scratchpad>/commit.idx
git read-tree HEAD
git update-index <files only you touched>
# shared file: take HEAD's version, apply only your change, store it as a blob
blob=$(git show HEAD:<path> | <your edit> | git hash-object -w --stdin)
git update-index --cacheinfo 100644,$blob,<path>
git commit -m "…"
unset GIT_INDEX_FILE
git reset -q -- <every path you committed>   # resync the real index; the other session's edits stay unstaged
```

**`origin/main` moved meanwhile.** `rebase` and `merge` refuse while the index holds someone else's staged work. If the remote commit touches none of your paths, rebuild your commit on top of it the same way: `read-tree origin/main` in a separate index, add your blobs, then `write-tree` and `commit-tree -p origin/main`. Then `git update-ref refs/heads/main <new> <old>` and `git checkout HEAD -- <the paths the remote commit changed>`. Check first that nobody has local edits to those paths.

Afterwards, run `git status` and compare it with the status before your commit. Then message the session that owns the shared file, so it doesn't overwrite your line from a stale read.
