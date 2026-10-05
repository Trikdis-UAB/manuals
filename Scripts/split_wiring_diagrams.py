#!/usr/bin/env python3
"""Split images that hold several wiring diagrams into one image each.

Each diagram gets its own heading, file and alt text, so it can be linked to,
found by search and read by Joy one panel at a time. The diagram's own title
(e.g. "DSC panel connection diagram") stays inside the image.

A cut runs along the middle of a blank gutter between two diagrams. Each piece is
cropped to its drawing and given a white margin of PAD px. Images keep the
`wiring-diagram` class so the PDF export still treats them as schematics
(Scripts/export_manual_pdfs.mjs) under their new, non-"wiring" headings.

Usage (repo root):  python3 Scripts/split_wiring_diagrams.py <spec.json> [--preview <dir>]
  --preview writes the pieces to <dir> and leaves the page and its folder untouched.

Spec: {"page": "...index.md", "heading_level": 4, "images": [ITEM, ...]}   (any ITEM may set its own heading_level)
  Two side by side:   {"src": "image22.webp", "min_gap": 20,
                       "left":  {"file": "wiring-dsc.webp", "heading": "DSC", "alt": "..."},
                       "right": {"file": "wiring-paradox.webp", "heading": "PARADOX", "alt": "..."}}
  Several, in rows:   {"src": "image23.webp", "rows": 2, "parts": [PIECE, ...]}   (row by row)
  Already one:        {"src": "image21.webp", "single": {"heading": "...", "file": "wiring-x.webp"}}
                      gets a heading; with "file" it is also renamed and shown no taller than
                      the median piece split in its section (else on the page), instead of its
                      inch-based size.
Refuses to run twice: each image's <img> line must still be on the page.
"""
import json
import re
import statistics
import sys
from pathlib import Path

from PIL import Image

PAD = 12  # px of white kept around each diagram
INK = 200  # grey level below which a pixel is drawing; fainter lines and compression noise are not


def gutter(img: Image.Image, min_gap: int = 20) -> int:
    g = img.convert("L")
    w, h = g.size
    px = g.load()
    best = (0, 0)
    run_start = None
    for x in range(int(w * 0.3), int(w * 0.7) + 1):
        # Blank = (almost) no dark pixels; tolerates light compression noise in the gap.
        blank = x < int(w * 0.7) and sum(1 for y in range(0, h, 2) if px[x, y] < INK) <= max(1, h // 400)
        if blank and run_start is None:
            run_start = x
        if not blank and run_start is not None:
            if x - run_start > best[1] - best[0]:
                best = (run_start, x)
            run_start = None
    if best[1] - best[0] < min_gap:
        sys.exit("no clear gutter found")
    return (best[0] + best[1]) // 2


def cuts(img: Image.Image, n: int, axis: str, min_gap: int = 20) -> list:
    """Positions of the n-1 widest blank gutters across x (columns) or y (rows), left to right."""
    g = img.convert("L")
    w, h = g.size
    px = g.load()
    length = w if axis == "x" else h
    if axis == "x":
        blank = [sum(1 for y in range(0, h, 2) if px[x, y] < INK) <= max(1, h // 400) for x in range(w)]
    else:
        blank = [sum(1 for x in range(0, w, 2) if px[x, y] < INK) <= max(1, w // 400) for y in range(h)]
    runs, start = [], None
    for i, b in enumerate(blank + [False]):
        if b and start is None:
            start = i
        if not b and start is not None:
            if start > 0 and i < length:  # a run touching the edge is margin, not a gutter
                runs.append((start, i))
            start = None
    runs = sorted(runs, key=lambda r: r[1] - r[0], reverse=True)[: n - 1]
    if len(runs) < n - 1 or any(b - a < min_gap for a, b in runs):
        sys.exit(f"found {len(runs)} of {n - 1} clear gutters along {axis}")
    return sorted((a + b) // 2 for a, b in runs)


def trim(img: Image.Image) -> Image.Image:
    l, t, r, b = img.convert("L").point(lambda v: 255 if v < INK else 0).getbbox()
    # Drawing sits exactly PAD from every edge of a white canvas, also where it touched the source edge.
    # Up to 2 px around it are kept for the anti-aliasing of the outermost lines.
    box = (max(l - 2, 0), max(t - 2, 0), min(r + 2, img.width), min(b + 2, img.height))
    out = Image.new("RGB", (r - l + 2 * PAD, b - t + 2 * PAD), "white")
    out.paste(img.crop(box), (PAD - (l - box[0]), PAD - (t - box[1])))
    return out


def pieces(img: Image.Image, item: dict) -> list:
    """(target, image) for every diagram in a composite, row by row."""
    if "parts" not in item:
        x = gutter(img, item.get("min_gap", 20))
        return [(item["left"], trim(img.crop((0, 0, x, img.height)))),
                (item["right"], trim(img.crop((x, 0, img.width, img.height))))]
    rows = item.get("rows", 1)
    cols = len(item["parts"]) // rows
    gap = item.get("min_gap", 20)
    ys = [0] + (cuts(img, rows, "y", gap) if rows > 1 else []) + [img.height]
    out = []
    for r in range(rows):
        band = img.crop((0, ys[r], img.width, ys[r + 1]))
        xs = [0] + (cuts(band, cols, "x", gap) if cols > 1 else []) + [band.width]
        for c in range(cols):
            out.append((item["parts"][r * cols + c], trim(band.crop((xs[c], 0, xs[c + 1], band.height)))))
    return out


def main() -> None:
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    preview = Path(sys.argv[sys.argv.index("--preview") + 1]) if "--preview" in sys.argv else None
    page = Path(spec["page"])
    folder = page.parent
    text = page.read_text(encoding="utf-8")
    heights = {}  # section heading -> heights of the pieces split from images in it
    lines = {}
    section = {}
    for item in spec["images"]:
        pattern = re.compile(r'^<img [^\n]*src="\./' + re.escape(item["src"]) + r'"[^\n]*/>$', re.M)
        found = pattern.findall(text)
        if len(found) != 1:
            sys.exit(f'{item["src"]}: expected one <img> line on the page, found {len(found)}')
        lines[item["src"]] = found[0]
        above = re.findall(r"^#{1,6} .*$", text[: text.index(found[0])], re.M)
        section[item["src"]] = above[-1] if above else ""
    for item in spec["images"]:  # composites first: singles are sized against their pieces
        if "single" in item:
            continue
        hashes = "#" * item.get("heading_level", spec.get("heading_level", 4))
        blocks = []
        for target, part in pieces(Image.open(folder / item["src"]).convert("RGB"), item):
            part.save((preview or folder) / target["file"], "WEBP", lossless=True, method=6)
            heights.setdefault(section[item["src"]], []).append(part.height)
            alt = target["alt"].replace('"', "&quot;")
            blocks.append(f'{hashes} {target["heading"]}\n\n'
                          f'<img class="wiring-diagram" alt="{alt}" src="./{target["file"]}" '
                          f'width="{part.width}" height="{part.height}" />')
        text = text.replace(lines[item["src"]], "\n\n".join(blocks), 1)
        print(f'{item["src"]}: split into {len(blocks)}')
    for item in spec["images"]:
        if "single" not in item:
            continue
        hashes = "#" * item.get("heading_level", spec.get("heading_level", 4))
        line, single = lines[item["src"]], item["single"]
        if 'class="wiring-diagram"' not in line:
            line = line.replace("<img ", '<img class="wiring-diagram" ', 1)
        if "file" in single:
            w, h = Image.open(folder / item["src"]).size
            # As tall as its neighbours: the pieces in the same section, else all pieces on the page.
            ref = heights.get(section[item["src"]]) or [x for hs in heights.values() for x in hs]
            if ref and h > statistics.median(ref):
                w, h = round(w * statistics.median(ref) / h), round(statistics.median(ref))
            line = re.sub(r'\s*style="[^"]*"', "", line).replace(f'src="./{item["src"]}"', f'src="./{single["file"]}"')
            line = line.replace(" />", f' width="{w}" height="{h}" />')
            if not preview:
                (folder / item["src"]).rename(folder / single["file"])
        text = text.replace(lines[item["src"]], f'{hashes} {single["heading"]}\n\n{line}', 1)
        print(f'{item["src"]}: heading added' + (f' -> {single["file"]}' if "file" in single else ""))
    if preview:
        (preview / "page.md").write_text(text, encoding="utf-8")
    else:
        page.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
