# Language versions of a manual are not copies of the English one

Each language page was converted from its own source document. Image file numbers, their
order, and sometimes the content differ between the en, lt, es and ru pages of the same manual.

Seen on 2026-10-05 while splitting the wiring diagrams (PR #25):

- English G16 and E16 show six input schematics in one 3 × 2 image; LT, ES and RU show the
  same six as two images of three.
- Spanish E16T has a relay drawing only; the other languages pair relay | LED in one image.
- The Spanish G17F input image has NC + resistor before NO + resistor; the others have the
  reverse.
- The same diagram can have a different image number: the E16T input schematics are image14
  in Spanish and image13 in the other languages.

How to apply: never map an image across languages by its number or position. Look at each
language's images (a contact sheet per section is quick) and read the captions in the
localized image before naming or describing it. The artwork itself has typos (Russian
"NC/EOL" on a normally open circuit, Lithuanian "uždara" for an open one), so describe what
the drawing shows.
