#!/usr/bin/env python3
"""Compare a Swedish page with its English source and report structural drift.

A translation must change the words and nothing else. This checks what a
translator can silently break: headings (count and level, which drive the
section numbering), images, link targets, admonitions, tables, code blocks,
HTML tags, numbers and untranslated leftovers.

Usage:
    check_structure.py docs/en/<path>.md docs/sv/<path>.md
    check_structure.py --all            # every docs/sv page that has an EN twin

Exit code 1 when any FAIL is found. WARN lines need a human look.
"""
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

FENCE_RE = re.compile(r"^(```|~~~).*?^\1", re.M | re.S)
HEADING_RE = re.compile(r"^(#{1,6})\s+\S", re.M)
MD_IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)")
HTML_SRC_RE = re.compile(r"""src=["']([^"']+)["']""")
MD_LINK_RE = re.compile(r"(?<!!)\[[^\]]*\]\(([^)\s]+)")
HREF_RE = re.compile(r"""href=["']([^"']+)["']""")
ADMONITION_RE = re.compile(r"^\s*>\s*\[!(\w+)\]|^\s*(?:!!!|\?\?\?\+?)\s+(\w+)", re.M)
TABLE_ROW_RE = re.compile(r"^\s*\|.*\|\s*$", re.M)
HTML_TAG_RE = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9]*)\b")
NUMBER_RE = re.compile(r"(?<![\w.,])\d+(?:[.,]\d+)?(?![\w])")
ATTR_ID_RE = re.compile(r"\{[^}]*#[\w-]+[^}]*\}")
FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.S)

# English words that should almost never survive in Swedish prose outside UI labels.
LEFTOVER_EN = re.compile(
    r"\b(the|and|with|which|should|must|when|then|click|press|select|connect(?:ed)?|"
    r"communicator|control panel|keypad|zone|wiring|settings?)\b",
    re.I,
)


def strip_code(text: str) -> str:
    text = FENCE_RE.sub("", text)
    return re.sub(r"`[^`\n]+`", "", text)


def front_matter_keys(text: str) -> list[str]:
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return []
    return [line.split(":", 1)[0].strip() for line in m.group(1).splitlines()
            if re.match(r"^[A-Za-z_][\w-]*\s*:", line)]


def internal_anchor(target: str) -> bool:
    return "#" in target and not target.startswith(("http://", "https://", "mailto:"))


def normalise_number(n: str) -> str:
    return n.replace(",", ".")


def numbers(text: str) -> Counter:
    body = strip_code(text)
    body = re.sub(r"\]\([^)]*\)|(?:src|href)=[\"'][^\"']*[\"']", "", body)
    body = re.sub(r"\{[^}]*\}", "", body)
    body = re.sub(r"^#{1,6}\s", "", body, flags=re.M)
    return Counter(normalise_number(n) for n in NUMBER_RE.findall(body))


def compare(en_path: Path, sv_path: Path) -> tuple[list[str], list[str]]:
    en = en_path.read_text(encoding="utf-8")
    sv = sv_path.read_text(encoding="utf-8")
    fails: list[str] = []
    warns: list[str] = []

    if front_matter_keys(en) != front_matter_keys(sv):
        fails.append(f"front matter keys differ: {front_matter_keys(en)} vs {front_matter_keys(sv)}")

    en_code, sv_code = FENCE_RE.findall(en), FENCE_RE.findall(sv)
    if len(FENCE_RE.findall(en)) != len(FENCE_RE.findall(sv)):
        fails.append(f"code block count {len(en_code)} vs {len(sv_code)}")

    en_b, sv_b = strip_code(en), strip_code(sv)

    en_h = [len(h) for h in HEADING_RE.findall(en_b)]
    sv_h = [len(h) for h in HEADING_RE.findall(sv_b)]
    if en_h != sv_h:
        fails.append(
            f"heading sequence differs (EN {len(en_h)}: {Counter(en_h)}, SV {len(sv_h)}: {Counter(sv_h)}); "
            "section numbers will shift"
        )

    if Counter(ATTR_ID_RE.findall(en_b)) != Counter(ATTR_ID_RE.findall(sv_b)):
        fails.append("attribute blocks with {#id} differ (ids must stay identical)")

    en_img = Counter(MD_IMAGE_RE.findall(en_b) + HTML_SRC_RE.findall(en_b))
    sv_img = Counter(MD_IMAGE_RE.findall(sv_b) + HTML_SRC_RE.findall(sv_b))
    if en_img != sv_img:
        missing = en_img - sv_img
        extra = sv_img - en_img
        fails.append(f"images differ; missing {dict(missing)} extra {dict(extra)}")
    for img in sv_img:
        if not img.startswith(("http://", "https://", "data:")):
            rel_img = img.split("#")[0]
            # Markdown paths resolve from the file; raw <img src> resolves from the page URL,
            # which for a non-index page is a folder named after the file.
            candidates = [(sv_path.parent / rel_img).resolve()]
            if sv_path.name != "index.md":
                candidates.append((sv_path.with_suffix("") / rel_img).resolve())
            if not any(c.exists() for c in candidates):
                fails.append(f"image file not found next to SV page: {img}")

    def canon(target: str, page: Path, lang: str) -> str:
        """Map a link to a language-neutral page key, so that an EN relative .md link and the
        SV '/en/...' link that stands in for a not-yet-translated page compare equal."""
        path = target.split("#")[0]
        if path.startswith(("http://", "https://", "mailto:")) or not path:
            return target
        if path.startswith("/"):
            parts = path.strip("/").split("/", 1)
            rest = parts[1] if len(parts) > 1 else ""
            return "page:" + rest.strip("/")
        docs_lang = REPO / "docs" / lang
        resolved = (page.parent / path).resolve()
        try:
            rel = resolved.relative_to(docs_lang).as_posix()
        except ValueError:
            return target
        rel = re.sub(r"(^|/)index\.md$", "", rel)
        rel = re.sub(r"\.md$", "", rel)
        return "page:" + rel.strip("/")

    def link_targets(text: str, page: Path, lang: str) -> Counter:
        return Counter(
            canon(t, page, lang)
            for t in MD_LINK_RE.findall(text) + HREF_RE.findall(text)
            if not internal_anchor(t)
        )

    en_l, sv_l = link_targets(en_b, en_path, "en"), link_targets(sv_b, sv_path, "sv")
    if en_l != sv_l:
        fails.append(f"link targets differ; missing {dict(en_l - sv_l)} extra {dict(sv_l - en_l)}")

    en_anchor = [t for t in MD_LINK_RE.findall(en_b) + HREF_RE.findall(en_b) if internal_anchor(t)]
    sv_anchor = [t for t in MD_LINK_RE.findall(sv_b) + HREF_RE.findall(sv_b) if internal_anchor(t)]
    if len(en_anchor) != len(sv_anchor):
        fails.append(f"section links count {len(en_anchor)} vs {len(sv_anchor)}")
    if sv_anchor:
        warns.append(f"{len(sv_anchor)} section link(s): verify after build with check_anchors.py")

    en_adm = Counter(a or b for a, b in ADMONITION_RE.findall(en_b))
    sv_adm = Counter(a or b for a, b in ADMONITION_RE.findall(sv_b))
    if en_adm != sv_adm:
        fails.append(f"admonitions differ: {dict(en_adm)} vs {dict(sv_adm)}")

    en_rows, sv_rows = len(TABLE_ROW_RE.findall(en_b)), len(TABLE_ROW_RE.findall(sv_b))
    if en_rows != sv_rows:
        fails.append(f"table rows {en_rows} vs {sv_rows}")

    en_tags = Counter(f"{c}{t.lower()}" for c, t in HTML_TAG_RE.findall(en_b))
    sv_tags = Counter(f"{c}{t.lower()}" for c, t in HTML_TAG_RE.findall(sv_b))
    soft = {"sup", "/sup", "sub", "/sub"}
    hard_diff = {k for k in (en_tags - sv_tags) + (sv_tags - en_tags) if k not in soft}
    if hard_diff:
        fails.append(f"HTML tags differ; missing {dict(en_tags - sv_tags)} extra {dict(sv_tags - en_tags)}")
    elif en_tags != sv_tags:
        warns.append("only <sup>/<sub> tags differ (fine if an English ordinal became 'ingång 1')")

    en_n, sv_n = numbers(en), numbers(sv)
    lost = en_n - sv_n
    if lost:
        warns.append(f"numbers in EN not found in SV (check values/units): {dict(lost)}")
    added = sv_n - en_n
    if added:
        warns.append(f"numbers in SV not in EN: {dict(added)}")

    same_alt = {a for a, b in zip(re.findall(r'alt="([^"]*)"', en_b), re.findall(r'alt="([^"]*)"', sv_b))
                if a and a == b}
    same_alt |= {a for a, b in zip(re.findall(r"!\[([^\]]+)\]", en_b), re.findall(r"!\[([^\]]+)\]", sv_b))
                 if a == b}
    if same_alt:
        warns.append(f"{len(same_alt)} alt text(s) identical to English, e.g. {sorted(same_alt)[0][:60]!r}")

    prose = re.sub(r"\*\*[^*]+\*\*|<[^>]+>|\]\([^)]*\)|alt=\"[^\"]*\"", " ", sv_b)
    leftovers = Counter(w.lower() for w in LEFTOVER_EN.findall(prose))
    if sum(leftovers.values()) > 3:
        warns.append(f"possible untranslated English: {dict(leftovers.most_common(8))}")

    en_lines, sv_lines = len(en.splitlines()), len(sv.splitlines())
    if sv_lines < en_lines * 0.85:
        fails.append(f"SV has {sv_lines} lines vs EN {en_lines}: content may be missing")

    return fails, warns


def main(argv: list[str]) -> int:
    if argv[1:] == ["--all"]:
        pairs = []
        for sv_path in sorted((REPO / "docs" / "sv").rglob("*.md")):
            rel = sv_path.relative_to(REPO / "docs" / "sv")
            en_path = REPO / "docs" / "en" / rel
            if en_path.exists() and rel.as_posix() != "index.md":
                pairs.append((en_path, sv_path))
    elif len(argv) == 3:
        pairs = [(Path(argv[1]), Path(argv[2]))]
    else:
        print(__doc__)
        return 2

    failed = False
    for en_path, sv_path in pairs:
        fails, warns = compare(en_path, sv_path)
        status = "FAIL" if fails else ("WARN" if warns else "OK")
        print(f"[{status}] {sv_path.relative_to(REPO) if sv_path.is_absolute() else sv_path}")
        for f in fails:
            print(f"  FAIL {f}")
        for w in warns:
            print(f"  WARN {w}")
        failed |= bool(fails)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
