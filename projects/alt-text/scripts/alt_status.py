#!/usr/bin/env python3
"""How many images still need alt text, per manual.

Counts empty alt, missing alt attribute, empty Markdown alt and the pipeline's
"Product Image" placeholder (the older grep for alt="" missed the last three).

  python3 projects/alt-text/scripts/alt_status.py            # every language, summary
  python3 projects/alt-text/scripts/alt_status.py en         # one language, per manual
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from altlib import image_refs, needs_alt  # noqa: E402

DOCS = Path(__file__).resolve().parents[3] / "docs"


def manual_counts(lang):
    rows = []
    for page in sorted((DOCS / lang).rglob("index.md")):
        refs = image_refs(page.read_text(encoding="utf-8"))
        if not refs:
            continue
        missing = sum(1 for r in refs if needs_alt(r["alt"]))
        rows.append((missing, len(refs), str(page.parent.relative_to(DOCS))))
    return rows


def main():
    langs = sys.argv[1:] or ["en", "lt", "es", "ru"]
    for lang in langs:
        rows = manual_counts(lang)
        missing = sum(r[0] for r in rows)
        total = sum(r[1] for r in rows)
        print(f"{lang.upper()}: {missing} of {total} images need alt text")
        if len(langs) == 1:
            for m, t, path in sorted(rows, reverse=True):
                if m:
                    print(f"  {m:4d}/{t:<4d} {path}")


if __name__ == "__main__":
    main()
