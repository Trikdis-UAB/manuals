# This repo is public: so are its notes

`Trikdis-UAB/manuals` is a **public** GitHub repository. Everything committed and pushed is readable by anyone,
not only the built site: `projects/`, `NOTES/`, `tools/`, branch commits and pull requests. Being off the nav,
or unmerged, hides nothing on GitHub.

Keep out of it, in any file and any commit you will push:
- business numbers (PostHog user counts, failure rates, sales figures);
- security-relevant behaviour of our products that we deliberately leave out of the manuals;
- bug lists for the developers, customer data, and anything from the Joy eval folder.

Put those in the private Workspace (`~/Projects/TRIKDIS/Workspace`, e.g. `Products/…`) and leave a one-line
pointer in the repo note. Check before the first push: `git show <commits> | grep` for numbers and the
sensitive words. History counts too, so clean an unpushed branch by squashing, not by a later commit.

2026-11-28: the Protegus app manual notes held PostHog usage numbers, the app bug list and a note that some
log-ins skip two-factor authentication. Caught before the first push; moved to
`Workspace/Products/Protegus-app-manual-private.md` and the branch squashed.

For a colleague's review, send the pull request's Netlify preview link
(`https://deploy-preview-<PR>--trikdis-manuals.netlify.app/…`, served with `x-robots-tag: noindex`) with deep links
to the sections to check, not a PDF. A page merged to main outside the nav is not private either: Joy reads every
page on main and starts answering from it.
