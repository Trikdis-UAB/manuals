#!/usr/bin/env python3
"""Split images that hold two wiring diagrams side by side into one image each.

Each diagram gets its own heading, file and alt text, so it can be linked to,
found by search and read by Joy one panel at a time. The diagram's own title
(e.g. "DSC panel connection diagram") stays inside the image.

The split column is the middle of the widest blank gutter in the middle of the image.
Each half is cropped to its drawing and given a white margin of PAD px.
Images keep the `wiring-diagram` class so the PDF export still treats them as
schematics (Scripts/export_manual_pdfs.mjs) under their new, non-"wiring" headings.

Usage (repo root):  python3 Scripts/split_wiring_diagrams.py <spec.json>
Spec: {"page": "...index.md", "heading_level": 4,
       "images": [{"src": "image22.webp",
                   "left":  {"file": "wiring-dsc.webp", "heading": "DSC", "alt": "..."},
                   "right": {"file": "wiring-paradox.webp", "heading": "PARADOX", "alt": "..."}}]}
Refuses to run twice: the composite <img> line must still be on the page.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

PAD = 12  # px of white kept around each diagram
INK = 200  # grey level below which a pixel is drawing; fainter lines and compression noise are not


def gutter(img: Image.Image) -> int:
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
    if best[1] - best[0] < 20:
        sys.exit("no clear gutter found")
    return (best[0] + best[1]) // 2


def trim(img: Image.Image) -> Image.Image:
    l, t, r, b = img.convert("L").point(lambda v: 255 if v < INK else 0).getbbox()
    # Drawing sits exactly PAD from every edge of a white canvas, also where it touched the source edge.
    # Up to 2 px around it are kept for the anti-aliasing of the outermost lines.
    box = (max(l - 2, 0), max(t - 2, 0), min(r + 2, img.width), min(b + 2, img.height))
    out = Image.new("RGB", (r - l + 2 * PAD, b - t + 2 * PAD), "white")
    out.paste(img.crop(box), (PAD - (l - box[0]), PAD - (t - box[1])))
    return out


def main() -> None:
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    page = Path(spec["page"])
    folder = page.parent
    hashes = "#" * spec.get("heading_level", 4)
    text = page.read_text(encoding="utf-8")
    for item in spec["images"]:
        pattern = re.compile(r'^<img [^\n]*src="\./' + re.escape(item["src"]) + r'"[^\n]*/>$', re.M)
        found = pattern.findall(text)
        if len(found) != 1:
            sys.exit(f'{item["src"]}: expected one <img> line on the page, found {len(found)}')
        if "single" in item:
            # Already one diagram per image: only give it a heading and the PDF class.
            line = found[0]
            if 'class="wiring-diagram"' not in line:
                line = line.replace("<img ", '<img class="wiring-diagram" ', 1)
            text = text.replace(found[0], f'{hashes} {item["single"]["heading"]}\n\n{line}', 1)
            print(f'{item["src"]}: heading added')
            continue
        img = Image.open(folder / item["src"]).convert("RGB")
        x = gutter(img)
        blocks = []
        for side, crop in (("left", (0, 0, x, img.height)), ("right", (x, 0, img.width, img.height))):
            part = trim(img.crop(crop))
            target = item[side]
            part.save(folder / target["file"], "WEBP", lossless=True, method=6)
            alt = target["alt"].replace('"', "&quot;")
            blocks.append(f'{hashes} {target["heading"]}\n\n'
                          f'<img class="wiring-diagram" alt="{alt}" src="./{target["file"]}" '
                          f'width="{part.width}" height="{part.height}" />')
        text = text.replace(found[0], "\n\n".join(blocks), 1)
        print(f'{item["src"]}: split at x={x} -> {item["left"]["file"]}, {item["right"]["file"]}')
    page.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
