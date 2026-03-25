# Nav Section Visibility — How WIP Sections Are Hidden

_Analysed March 2025 during Batch 2 (Hardware Receivers) conversion._

---

## The Behaviour

A section added to `mkdocs.yml` nav (e.g. Receivers, IPcom) is **technically live**
(pages are reachable via direct URL), but **not prominently visible** in the sidebar
to users browsing from other sections.  When you navigate directly to a page inside
the section, the section expands and its sub-nav becomes fully visible.

---

## The Three-Layer Mechanism

### Layer 1 — MkDocs Material toggle state (`navigation.sections`)

Material renders each top-level nav section as a collapsible group backed by a hidden
`<input type="checkbox" class="md-nav__toggle">`.  On page load, Material automatically
checks the toggle **only** for the section that contains the current page.  Every other
section's toggle remains unchecked (collapsed).

### Layer 2 — Custom CSS turns "collapsed" into "invisible"

Standard Material just indents collapsed sections' children; the custom CSS in
`docs/stylesheets/base.user.v2.css` (lines 487–489) goes further:

```css
.md-nav--primary .md-nav__toggle:not(:checked) ~ nav.md-nav {
  display: none;
}
```

The CSS sibling selector targets `nav.md-nav` — the sub-tree of children — when its
preceding toggle is unchecked.  The section **label** (e.g. "Receivers") is a sibling
`<label>` element, not inside `nav.md-nav`, so it remains rendered.  But all children
(IP Network, Radio, Landline and every individual manual link) disappear.

### Layer 3 — No cross-links and no section `index.md`

There is no `docs/en/receivers/index.md` landing page, and no internal links from
other sections point to Receivers.  So even though the label is visible in the
sidebar, there is no natural journey that takes a casual user there.

---

## Why This Was Used for IPcom (WIP)

When IPcom was first added as a work-in-progress:

- It was added to the nav under `Receivers`
- The Receivers section would only expand when someone was already on a receivers page
  — unlikely traffic for a freshly-added section
- The pages were live and directly accessible by URL for internal review, but invisible
  to users browsing from the Communicators section

The Batch 2 Receivers manuals are in exactly the same state as of their initial merge.

---

## How to Make a Section Fully Visible

When a section is ready for public promotion, any of these approaches work:

| Option | Effect | Change needed |
|--------|--------|---------------|
| Add `navigation.expand` to `mkdocs.yml` features | All sections always expanded | `mkdocs.yml` |
| Add featured links / cards on the home page | Surfaces the section for new visitors | `docs/en/index.md` |
| Add a `docs/en/receivers/index.md` landing page | Gives the section a direct entry point | new file |
| Link from related pages (e.g. Communicators → "pair with a receiver") | Natural cross-navigation | content edits |

`navigation.expand` is the blunt instrument; landing page + cross-links is the
recommended approach for a gradual, intentional rollout.

---

## Files Involved

| File | Role |
|------|------|
| `mkdocs.yml` → `features: [navigation.sections]` | Enables collapsible section toggles |
| `docs/stylesheets/base.user.v2.css` lines 487–493 | Hides unchecked section sub-navs entirely |
| `docs/javascripts/communicators-toggle.js` | Communicators-only A–Z toggle; **not related** to this hiding mechanism |
