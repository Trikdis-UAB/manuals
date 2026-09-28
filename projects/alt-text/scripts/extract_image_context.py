#!/usr/bin/env python3
"""Context package for the alt-text drafter: for each image on a manual page that
needs alt text, its heading trail and the text just above and below it.
Deterministic, no model involved.

  python3 projects/alt-text/scripts/extract_image_context.py docs/en/.../index.md > batch.json

Each item carries the image's absolute path (for the drafter to open), a content
hash (to reuse one draft for byte-identical pictures) and, when Joy's OCR cache has
the picture, its OCR text as a spelling hint for printed labels. OCR is noisy:
the picture itself is the source of truth.
"""
import hashlib
import json
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from altlib import image_refs, needs_alt  # noqa: E402

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
OCR_CACHE = Path(os.environ.get(
    "JOY_OCR_CACHE", Path.home() / "Projects/TRIKDIS/whatsapp-ai-support/state/ocr-cache.json"))


def strip_markup(line):
    line = re.sub(r"<[^>]+>", "", line)
    line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)
    return re.sub(r"[*_`#|]", "", line).strip()


def ocr_hint(text):
    """Keep OCR lines that look like words or labels; drop the noise."""
    keep = [ln.strip() for ln in text.splitlines()
            if len(re.findall(r"[A-Za-z0-9]", ln)) >= 2]
    return " | ".join(keep)[:600]


def main(md_path, context_lines=3):
    md_path = Path(md_path)
    text = md_path.read_text(encoding="utf-8")
    lines = text.splitlines()
    line_starts = [0]
    for ln in lines:
        line_starts.append(line_starts[-1] + len(ln) + 1)
    try:
        ocr = json.loads(OCR_CACHE.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        ocr = {}

    trail_at = []
    trail = []
    for ln in lines:
        m = HEADING_RE.match(ln)
        if m:
            level = len(m.group(1))
            trail = trail[:level - 1] + [strip_markup(m.group(2))]
        trail_at.append(" > ".join(t for t in trail if t))

    out = []
    for ref in image_refs(text):
        if not needs_alt(ref["alt"]):
            continue
        idx = max(i for i, s in enumerate(line_starts) if s <= ref["start"])
        idx = min(idx, len(lines) - 1)
        before = [strip_markup(x) for x in lines[max(0, idx - 12):idx]]
        after = [strip_markup(x) for x in lines[idx + 1:idx + 13]]
        image = (md_path.parent / ref["src"]).resolve()
        digest = hashlib.sha1(image.read_bytes()).hexdigest() if image.is_file() else None
        item = {
            "line": idx + 1,
            "src": ref["src"],
            "image": str(image),
            "sha1": digest,
            "heading_trail": trail_at[idx],
            "context_before": " / ".join([x for x in before if x][-context_lines:]),
            "context_after": " / ".join([x for x in after if x][:context_lines]),
        }
        if digest and ocr.get(digest):
            item["ocr_hint"] = ocr_hint(ocr[digest])
        out.append(item)
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main(sys.argv[1])
