#!/usr/bin/env python3
"""Post-conversion fixes for the G16 manual (the 2G/3G/4G DOCX, July 2022 onwards).

The conversion pipeline (knowledgebase-conversion-pipeline/scripts/convert-single.sh)
gets most of this manual right, but in every language it mangles two layouts that
exist only in this DOCX, and it leaves three smaller things to fix:

1. Hero: the DOCX cover shows both hardware variants (2G and 3G/4G) side by side.
   The pipeline keeps at most the first photo (LT and ES get none at all).
2. "Communicator elements": the DOCX table alternates variant-label rows with
   photo + legend rows. The pipeline drops both photos and collapses the numbered
   1-6 legend into a single table cell.
3. Admonitions: the pipeline recognises only the English "Important" label, so
   in LT/ES/RU the DOCX's SVARBU / IMPORTANTE / ВАЖНО callouts come out as plain
   notes. Each admonition is re-typed from its own DOCX label (same order, same
   count), with the localized titles used everywhere else on the site.
4. Apostrophes typed as backticks in the DOCX ("panel`s").
5. Chapter titles typed as numbered list paragraphs (LT and RU "Remote
   configuration") come out as "1. **Title**" list items. They are promoted to
   the heading level the DOCX's own table of contents gives them.

Photos, labels and legend items are read from the DOCX itself (via pandoc JSON),
so the rebuilt sections stay in each language's own words.

Usage, on the pipeline output folder, before copying it into docs/:

    cd ../knowledgebase-conversion-pipeline
    DOCUMENT_TITLE="Cellular communicator G16" OUT_DIR=/tmp/g16 \\
        ./scripts/convert-single.sh ".../_ENG/G16 2G 3G 4G UM_ENG_2024 07 05.docx"
    cd ../manuals
    python3 Scripts/postfix_g16_conversion.py --lang en \\
        --docx ".../_ENG/G16 2G 3G 4G UM_ENG_2024 07 05.docx" \\
        --md "/tmp/g16/G16 2G 3G 4G UM_ENG_2024 07 05/index.md"

Then convert the images with Scripts/convert-images-to-webp.sh <folder>.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from pathlib import Path

# Admonition titles as used across the site; None keeps a bare "!!! note".
CALLOUT_TITLES = {
    "en": {"note": None, "important": "Important"},
    "lt": {"note": "Pastaba", "important": "Svarbu"},
    "es": {"note": "Nota", "important": "Importante"},
    "ru": {"note": "Примечание", "important": "Важно"},
}
CALLOUT_LABEL_RE = re.compile(
    r"(?i)(?P<note>note|pastaba|nota|примечание)|(?P<important>important|svarbu|importante|важно)"
)
ADMONITION_RE = re.compile(r'^([ \t]*)!!! (?:note|warning)(?: "[^"]*")?[ \t]*$', re.MULTILINE)
# A Word TOC bookmark inside a list item marks a heading that pandoc demoted.
TOC_LIST_HEADING_RE = re.compile(
    r'^\d+\.[ \t]+<span id="_Toc\d+"></span>\*\*(?P<title>[^*]+)\*\*[ \t]*$', re.MULTILINE
)

HERO_BLOCK_RE = re.compile(
    r'\A\s*<div style="text-align: center;">\s*<img [^>]*>\s*</div>\s*', re.DOTALL
)


def walk(node):
    if isinstance(node, dict):
        yield node
        for value in node.values():
            yield from walk(value)
    elif isinstance(node, list):
        for value in node:
            yield from walk(value)


def text_of(node) -> str:
    parts = []
    for item in walk(node):
        kind = item.get("t")
        if kind == "Str":
            parts.append(item["c"])
        elif kind in ("Space", "SoftBreak", "LineBreak"):
            parts.append(" ")
    return re.sub(r"\s+", " ", "".join(parts)).strip()


def images_of(node) -> list[dict]:
    found = []
    for item in walk(node):
        if item.get("t") == "Image":
            attrs = dict(item["c"][0][2])
            found.append({
                "src": Path(item["c"][2][0]).name,
                "width": attrs.get("width"),
                "height": attrs.get("height"),
            })
    return found


def table_rows(table: dict) -> list[list]:
    """Header rows plus body rows, each row as its list of cells."""
    head_rows = table["c"][3][1]
    body_rows = [row for body in table["c"][4] for row in body[3]]
    return [row[1] for row in head_rows + body_rows]


def cell_blocks(cell) -> list:
    return cell[4]


def read_docx(docx: Path) -> dict:
    raw = subprocess.run(
        ["pandoc", "-f", "docx", "-t", "json", str(docx)],
        check=True, capture_output=True, text=True,
    ).stdout
    doc = json.loads(raw)
    tables = [block for block in doc["blocks"] if block.get("t") == "Table"]

    # Cover: the first table; photos in one row, captions ("2G", "3G, 4G") in the next.
    cover_rows = table_rows(tables[0])
    photos, captions = [], []
    for row in cover_rows:
        row_images = [images_of(cell_blocks(cell)) for cell in row]
        if any(row_images) and not photos:
            photos = [imgs[0] for imgs in row_images if imgs]
        elif photos and not captions:
            captions = [text_of(cell_blocks(cell)) for cell in row]
    if len(photos) != 2 or len(captions) != 2:
        sys.exit(f"cover table: expected 2 photos + 2 captions, got {photos} / {captions}")

    # Elements: the table holding a numbered legend (>= 5 items) and one variant photo
    # per row in its first column. ("Installation process" also has a legend and two
    # photos, but both photos sit in one row's second column.)
    def is_elements(table):
        has_legend = any(
            item.get("t") == "OrderedList" and len(item["c"][1]) >= 5 for item in walk(table)
        )
        photo_rows = [row for row in table_rows(table) if images_of(cell_blocks(row[0]))]
        return has_legend and len(photo_rows) >= 2

    elements = [table for table in tables if is_elements(table)]
    if len(elements) != 1:
        sys.exit(f"expected exactly one 'Communicator elements' table, found {len(elements)}")
    variants = []
    for row in table_rows(elements[0]):
        first = cell_blocks(row[0])
        row_images = images_of(first)
        label = text_of(first)
        if row_images:
            variants[-1]["image"] = row_images[0]
        elif label:
            variants.append({"label": label})
    legend_list = next(
        item for item in walk(elements[0])
        if item.get("t") == "OrderedList" and len(item["c"][1]) >= 5
    )
    legend = [text_of(entry) for entry in legend_list["c"][1]]
    if len(variants) != 2 or not all("image" in v for v in variants):
        sys.exit(f"elements table: expected 2 labelled photos, got {variants}")

    # Callouts: one-row tables whose first cell is just the label ("Note:", "SVARBU:").
    callouts = []
    for table in tables:
        rows = table_rows(table)
        if not rows or not rows[0]:
            continue
        label = text_of(cell_blocks(rows[0][0])).rstrip(":!").strip()
        match = CALLOUT_LABEL_RE.fullmatch(label)
        if match:
            callouts.append(match.lastgroup)

    # Table of contents: "7 Remote configuration 31" -> level 2 (H2), "7.1 ..." -> H3.
    plain = subprocess.run(
        ["pandoc", "-f", "docx", "-t", "plain", "--wrap=none", str(docx)],
        check=True, capture_output=True, text=True,
    ).stdout
    toc_levels = {}
    for line in plain.splitlines():
        match = re.fullmatch(r"(\d+(?:\.\d+)*)\s+(.+?)\s+\d+", line.strip())
        if match:
            toc_levels.setdefault(match.group(2), match.group(1).count(".") + 2)

    return {"photos": photos, "captions": captions, "variants": variants,
            "legend": legend, "callouts": callouts, "toc_levels": toc_levels}


def img_tag(image: dict) -> str:
    size = ""
    if image["width"] and image["height"]:
        size = f' style="width:{image["width"]};height:{image["height"]}"'
    return f'<img alt="" src="./{image["src"]}"{size} />'


def hero_html(data: dict) -> str:
    figures = []
    for photo, caption, variant in zip(data["photos"], data["captions"], data["variants"]):
        figures.append(
            '  <figure style="margin: 0;">\n'
            f'    <img src="./{photo["src"]}" alt="{html.escape(variant["label"], quote=True)}"'
            ' style="width: 100%; height: auto;" />\n'
            '    <figcaption style="font-size: 0.9em; text-align: center; margin-top: 0.5rem;">'
            f"{html.escape(caption)}</figcaption>\n"
            "  </figure>"
        )
    return (
        '<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 200px));'
        ' justify-content: center; align-items: end; gap: 1.5rem; margin: 1rem 0;">\n'
        + "\n".join(figures)
        + "\n</div>"
    )


def elements_markdown(data: dict) -> str:
    parts = []
    for variant in data["variants"]:
        parts.append(f"**{variant['label']}**")
        parts.append(img_tag(variant["image"]))
    parts.extend(f"{number}.  {item}" for number, item in enumerate(data["legend"], 1))
    return "\n\n".join(parts)


def replace_hero(text: str, data: dict) -> str:
    match = re.search(r"^# .*$", text, re.MULTILINE)
    if not match:
        sys.exit("no H1 title found")
    head, rest = text[: match.end()], text[match.end():]
    rest = HERO_BLOCK_RE.sub("", rest, count=1)
    return f"{head}\n\n{hero_html(data)}\n\n{rest.lstrip()}"


def replace_elements_table(text: str, data: dict) -> str:
    lines = text.split("\n")
    first_label = data["variants"][0]["label"]
    starts = [i for i, line in enumerate(lines) if line.startswith("|") and first_label in line]
    if len(starts) != 1:
        sys.exit(f"expected one table row containing {first_label!r}, found {len(starts)}")
    start = end = starts[0]
    while start > 0 and lines[start - 1].startswith("|"):
        start -= 1
    while end + 1 < len(lines) and lines[end + 1].startswith("|"):
        end += 1
    return "\n".join(lines[:start] + [elements_markdown(data)] + lines[end + 1:])


def retype_callouts(text: str, lang: str, callouts: list[str]) -> str:
    found = ADMONITION_RE.findall(text)
    if len(found) != len(callouts):
        sys.exit(f"{len(found)} admonitions in markdown but {len(callouts)} callouts in DOCX")
    titles = CALLOUT_TITLES[lang]
    kinds = iter(callouts)

    def retype(match: re.Match) -> str:
        kind = next(kinds)
        title = titles[kind]
        head = "!!! warning" if kind == "important" else "!!! note"
        return f'{match.group(1)}{head} "{title}"' if title else f"{match.group(1)}{head}"

    return ADMONITION_RE.sub(retype, text)


def promote_toc_list_headings(text: str, toc_levels: dict[str, int]) -> str:
    def promote(match: re.Match) -> str:
        title = match.group("title").strip()
        level = toc_levels.get(title)
        if not level:
            sys.exit(f"list item looks like a demoted heading but is not in the TOC: {title!r}")
        return f"{'#' * level} {title}"

    return TOC_LIST_HEADING_RE.sub(promote, text)


def fix_backtick_apostrophes(text: str) -> str:
    return re.sub(r"(?<=\w)\\?`(?=\w)", "'", text)


def validate(md: Path, text: str, data: dict) -> None:
    problems = []
    if len(re.findall(r"^# ", text, re.MULTILINE)) != 1:
        problems.append("expected exactly one H1")
    referenced = set(re.findall(r'src="\./([^"]+)"|\]\(\./([^)]+)\)', text))
    referenced = {a or b for a, b in referenced}
    missing = sorted(name for name in referenced if not (md.parent / name).exists()
                     and not name.startswith("protegus-"))
    if missing:
        problems.append(f"referenced images missing: {missing}")
    present = {p.name for p in md.parent.glob("image*.png")}
    unused = sorted(present - referenced)
    if unused:
        problems.append(f"images extracted but not referenced: {unused}")
    for item in data["legend"]:
        if item not in text:
            problems.append(f"legend item not in output: {item!r}")
    if problems:
        sys.exit("validation failed:\n  " + "\n  ".join(problems))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--lang", required=True, choices=["en", "lt", "es", "ru"])
    parser.add_argument("--docx", required=True, type=Path)
    parser.add_argument("--md", required=True, type=Path, help="pipeline output index.md")
    args = parser.parse_args()

    data = read_docx(args.docx)
    text = args.md.read_text(encoding="utf-8")
    text = replace_hero(text, data)
    text = replace_elements_table(text, data)
    text = retype_callouts(text, args.lang, data["callouts"])
    text = fix_backtick_apostrophes(text)
    text = promote_toc_list_headings(text, data["toc_levels"])
    validate(args.md, text, data)
    args.md.write_text(text, encoding="utf-8")
    print(f"{args.lang}: hero {[p['src'] for p in data['photos']]}, "
          f"elements {[v['image']['src'] for v in data['variants']]}, "
          f"legend {len(data['legend'])} items -> {args.md}")


if __name__ == "__main__":
    main()
