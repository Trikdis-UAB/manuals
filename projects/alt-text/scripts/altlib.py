"""Shared image-reference parsing for the alt-text scripts.

An image on a manual page is one of:
  <img alt="..." src="./imageN.webp" ...>   (most pages, from the DOCX pipeline)
  <img src="./imageN.webp" ... alt="...">   (some pages; alt may be missing entirely)
  ![alt](./imageN.webp)                     (a few hand-written pages)
An image "needs alt" when the alt is empty, absent, or the pipeline placeholder
"Product Image".
"""
import re

PLACEHOLDER_ALTS = {"product image"}

IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE)
MD_IMG_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)([^)]*)\)")
SRC_RE = re.compile(r'\bsrc="([^"]+)"')
ALT_RE = re.compile(r'\balt="([^"]*)"')
IMAGE_EXT_RE = re.compile(r"\.(?:webp|png|jpe?g|gif|svg)$", re.IGNORECASE)


def needs_alt(alt):
    return alt is None or alt.strip() == "" or alt.strip().lower() in PLACEHOLDER_ALTS


def image_refs(text):
    """Yield dicts {start, end, kind, src, alt, raw} for every image, in page order."""
    refs = []
    for m in IMG_TAG_RE.finditer(text):
        src = SRC_RE.search(m.group(0))
        if not src or not IMAGE_EXT_RE.search(src.group(1)):
            continue
        alt = ALT_RE.search(m.group(0))
        refs.append({"start": m.start(), "end": m.end(), "kind": "html",
                     "src": src.group(1), "alt": alt.group(1) if alt else None,
                     "raw": m.group(0)})
    for m in MD_IMG_RE.finditer(text):
        if not IMAGE_EXT_RE.search(m.group(2)):
            continue
        refs.append({"start": m.start(), "end": m.end(), "kind": "md",
                     "src": m.group(2), "alt": m.group(1), "raw": m.group(0)})
    refs.sort(key=lambda r: r["start"])
    return refs


def with_alt(ref, alt):
    """The ref's raw markup with its alt set to `alt` (caller has sanitised it)."""
    raw = ref["raw"]
    if ref["kind"] == "md":
        return "![" + alt + "](" + raw[raw.index("](") + 2:]
    if ALT_RE.search(raw):
        return ALT_RE.sub(lambda _: 'alt="' + alt + '"', raw, count=1)
    return raw.replace("<img ", '<img alt="' + alt + '" ', 1)


def sanitise(alt):
    """Alt text safe inside alt="..." and ![...]: no double quotes, brackets or newlines."""
    alt = " ".join(alt.split())
    return alt.replace('"', "").replace("[", "(").replace("]", ")").replace("<", "").replace(">", "")
