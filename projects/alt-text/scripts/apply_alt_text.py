#!/usr/bin/env python3
"""Write drafted alt text into a manual page, strictly.

  python3 projects/alt-text/scripts/apply_alt_text.py docs/en/.../index.md drafts.json

drafts.json is a list of {"src": "./image4.webp", "alt": "..."} (extra keys ignored).
Only images that still need alt text are touched. Every draft must match exactly one
such image on the page (or every occurrence of a picture repeated on that page), and
the count of images needing alt must drop by exactly the number applied. Anything
else is an error and nothing is written. An earlier version silently applied 0 of N,
so "no error" alone was never proof: this one checks.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from altlib import image_refs, needs_alt, sanitise, with_alt  # noqa: E402


def norm(src):
    return src[2:] if src.startswith("./") else src


def main(md_path, drafts_path):
    md_path = Path(md_path)
    with open(md_path, encoding="utf-8", newline="") as fh:   # keep CRLF files CRLF
        text = fh.read()
    drafts = json.loads(Path(drafts_path).read_text(encoding="utf-8"))
    refs = image_refs(text)
    before = sum(1 for r in refs if needs_alt(r["alt"]))

    errors, edits = [], []
    seen = set()
    for d in drafts:
        src, alt = norm(d["src"]), sanitise(d.get("alt", ""))
        if src in seen:
            errors.append(f"{src}: drafted twice")
            continue
        seen.add(src)
        if not alt:
            errors.append(f"{src}: empty draft")
            continue
        targets = [r for r in refs if norm(r["src"]) == src and needs_alt(r["alt"])]
        if not targets:
            errors.append(f"{src}: no image needing alt text with this src on the page")
            continue
        edits.extend((r, alt) for r in targets)

    if errors:
        print("NOT APPLIED:\n  " + "\n  ".join(errors))
        sys.exit(1)

    for ref, alt in sorted(edits, key=lambda e: e[0]["start"], reverse=True):
        text = text[:ref["start"]] + with_alt(ref, alt) + text[ref["end"]:]

    after = sum(1 for r in image_refs(text) if needs_alt(r["alt"]))
    if before - after != len(edits):
        print(f"NOT APPLIED: expected {len(edits)} fewer images needing alt, got {before - after}")
        sys.exit(1)
    with open(md_path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)
    print(f"Applied {len(edits)} alt texts ({len(drafts)} drafts) to {md_path}; "
          f"needing alt: {before} -> {after}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
