# Links to a section: use the real numbered id from the built page

Headings get ids like `3212-keypad-bus-and-tipring`: the number from the add-number plugin, then a slug
folded to ASCII. Lithuanian letters fold (`3212-klaviaturos-magistrale-ir-tipring`), Spanish accents
fold, and **Cyrillic is dropped**: the Russian "Шина клавиатуры и TIP/RING" becomes `3212-tipring`.

Nothing rewrites a link to the numbered id for you:

- **Same-page links** with the un-numbered slug (`#keypad-bus-and-tipring`) were not rewritten
  (tested 2026-07-14, LT/ES/RU FAQ).
- **Links to another page** (`../../gt/index.md#keypad-bus-and-tipring`) are not rewritten either
  (2026-11-12, DSC quick setups). They render as typed and land at the top of the page.

`mkdocs build --strict` passes either way; a wrong fragment fails silently.

How to apply:
1. Build, then read the target heading's id from the built HTML
   (`grep -o 'id=[0-9]*-[^ >]*' .review/site/<lang>/.../index.html`).
2. Put that exact id in the link.
3. Rebuild and check that each rendered `href`'s fragment exists as an `id` on its target page
   (a string comparison, per link). The same section can have a different number in another language
   or product: GET's wiring chapter is 3.3 in English and 3.2 in LT, ES and RU.
