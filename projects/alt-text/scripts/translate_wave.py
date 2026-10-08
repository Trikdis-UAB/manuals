#!/usr/bin/env python3
"""LT/ES/RU alt text, reusing the checked English alt text wherever the picture is the same.

Each picture on a <lang> page that needs alt is matched to its English counterpart in the
same manual:
  same     byte-identical file            -> translate the English alt (text only)
  redrawn  same wiring-*.webp name, or     -> translate the English alt and adapt it to this
           visually alike (dHash <= 20)       picture's own labels (Codex sees the picture)
  new      no counterpart, or the English  -> draft from the picture, in <lang>
           alt is too thin to reuse
Then everything is checked: 'same' translations against the English (text), the rest against
the picture (codex_wave.py verify --all). status/apply/review are codex_wave.py's, unchanged.

  translate_wave.py prepare <wave> <lang> [pages...]   # default: every <lang> page needing alt
  translate_wave.py draft   <wave> [--jobs 2]
  translate_wave.py check   <wave> [--jobs 2]          # text check of 'same'; then run
  codex_wave.py verify <wave> --all                    # picture check of 'redrawn' and 'new'
  codex_wave.py status|apply|review <wave>
"""
import argparse, collections, glob, hashlib, json, os, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import codex_wave as cw  # noqa: E402
from altlib import image_refs, needs_alt  # noqa: E402

ROOT = cw.ROOT
LANGS = {"lt": "Lithuanian", "es": "Spanish", "ru": "Russian"}
LANG_NOTES = {
    "lt": ("Lithuanian terms (TRIKDIS usage): control panel = centralė; communicator = komunikatorius; "
           "terminal = gnybtas; input/output = įėjimas/išėjimas; security detector = daviklis, but a gate "
           "position or temperature sensor = jutiklis; wireless = bevielis; expander = išplėtimo modulis; "
           "keypad = klaviatūra; board = plokštė; relay = relė; installer = montuotojas; "
           "Wiring diagram: = Prijungimo schema:."),
    "es": "Spanish: follow the page's own terms (panel de control, comunicador, terminal). "
          "Wiring diagram: = Diagrama de conexión:.",
    "ru": "Russian: follow the page's own terms (охранная панель, коммуникатор, клемма). "
          "Wiring diagram: = Схема подключения:.",
}
SAME_BATCH, PIC_BATCH, CHECK_BATCH = 30, 10, 40
THIN = 60          # an English alt shorter than this on a large picture is not worth reusing


def dhash(path, n=16):
    from PIL import Image
    try:
        im = Image.open(path).convert("L").resize((n + 1, n))
    except Exception:
        return None
    px = list(im.getdata())
    bits = 0
    for r in range(n):
        for c in range(n):
            bits = (bits << 1) | (px[r * (n + 1) + c] > px[r * (n + 1) + c + 1])
    return bits


def english_index():
    idx = {}
    for page in glob.glob(str(ROOT / "docs/en/**/index.md"), recursive=True):
        manual = str(Path(page).parent.relative_to(ROOT / "docs/en"))
        for r in image_refs(open(page, encoding="utf-8").read()):
            p = (Path(page).parent / r["src"]).resolve()
            if needs_alt(r["alt"]) or not p.is_file():
                continue
            idx.setdefault(manual, []).append({"name": p.name, "path": str(p), "alt": r["alt"],
                                               "sha1": hashlib.sha1(p.read_bytes()).hexdigest(), "dh": dhash(p)})
    return idx


def brief(lang):
    t = (ROOT / "projects/alt-text/TRANSLATE_BRIEF.md").read_text(encoding="utf-8")
    return t.replace("{LANG}", LANGS[lang]).replace("{LANG_NOTES}", LANG_NOTES[lang])


def prepare(a):
    from PIL import Image
    W = cw.wdir(a.wave)
    pages = a.pages or sorted(glob.glob(str(ROOT / f"docs/{a.lang}/**/index.md"), recursive=True))
    en = english_index()
    groups = collections.OrderedDict()
    for page in pages:
        page = Path(page).resolve()
        if not any(needs_alt(r["alt"]) for r in image_refs(page.read_text(encoding="utf-8"))):
            continue
        manual = str(page.parent.relative_to(ROOT / "docs"))
        lines = page.read_text(encoding="utf-8").splitlines()
        items = json.loads(subprocess.check_output(
            [sys.executable, str(HERE / "extract_image_context.py"), str(page)]))
        for it in items:
            g = groups.setdefault(it["sha1"] or it["image"], {
                "image": it["image"], "sha1": it["sha1"], "occurrences": [], "lang": a.lang,
                "heading_trail": it["heading_trail"], "context_before": it["context_before"],
                "context_after": it["context_after"],
                "numbered_list_nearby": cw.numbered_nearby(lines, it["line"] - 1)})
            g["occurrences"].append({"manual": manual, "src": it["src"]})
    stats = collections.Counter()
    for i, g in enumerate(groups.values(), 1):
        g["id"] = f"{a.wave}-{i:04d}"
        enman = g["occurrences"][0]["manual"].split("/", 1)[1]
        cands = en.get(enman, [])
        name = Path(g["image"]).name
        dh = dhash(g["image"])
        match, cls = None, "new"
        for c in cands:
            if c["sha1"] == g["sha1"]:
                match, cls = c, "same"
                break
        if not match and name.startswith("wiring-"):
            match = next((c for c in cands if c["name"] == name), None)
            cls = "redrawn" if match else cls
        if not match and dh is not None:
            best = min(((bin(dh ^ c["dh"]).count("1"), c) for c in cands if c["dh"] is not None),
                       key=lambda x: x[0], default=(999, None))
            if best[0] <= 20:
                match, cls = best[1], "redrawn"
        if match and len(match["alt"]) < THIN:
            try:
                w = Image.open(g["image"]).width
            except Exception:
                w = 0
            if w >= 300:            # thin legacy alt on a real picture: describe it afresh
                match, cls = None, "new"
        g["cls"] = cls
        if match:
            g["en_alt"], g["en_image"] = match["alt"], match["path"]
        stats[cls] += 1
    items = list(groups.values())
    (W / "png").mkdir(parents=True, exist_ok=True)
    for g in items:
        if g["cls"] != "same":
            png = W / "png" / f"{g['id']}.png"
            if not png.exists():
                Image.open(g["image"]).convert("RGB").save(png)
            g["png"] = str(png)
    cw.dump(W / "all.json", items)
    cw.dump(W / "reuse.json", {})
    for cls, size, pre in (("same", SAME_BATCH, "t"), ("redrawn", PIC_BATCH, "r"), ("new", PIC_BATCH, "n")):
        todo = [g for g in items if g["cls"] == cls]
        for b in range(0, len(todo), size):
            cw.dump(W / "batches" / f"b{pre}{b // size + 1:03d}.json", todo[b:b + size])
    print(f"{len(items)} distinct pictures ({sum(len(g['occurrences']) for g in items)} on pages): "
          + ", ".join(f"{k} {v}" for k, v in stats.items()))


def ctx(g, extra=None):
    d = {"id": g["id"], "heading_trail": g["heading_trail"], "text_before": g["context_before"],
         "text_after": g["context_after"]}
    if g.get("numbered_list_nearby"):
        d["numbered_list_on_page"] = g["numbered_list_nearby"]
    if extra:
        d.update(extra)
    return d


def draft_batch(W, bfile):
    out = W / "drafts" / bfile.name
    if out.exists():
        return f"{bfile.name}: already drafted"
    batch = cw.load(bfile)
    lang = batch[0]["lang"]
    kind = bfile.stem[1]
    if kind == "t":
        prompt = (brief(lang) + "\n\n## Task\nThe picture is the same file as on the English page. "
                  "Translate each English alt (en_alt) into " + LANGS[lang] + ".\n\n## Items\n"
                  + json.dumps([ctx(g, {"en_alt": g["en_alt"]}) for g in batch], ensure_ascii=False, indent=1))
        images = []
    elif kind == "r":
        prompt = (brief(lang) + "\n\n## Task\nEach attached picture (same order as the items) is the "
                  + LANGS[lang] + " version of the English picture described by en_alt: usually the same "
                  "drawing or screen with translated labels, but it can differ. Translate en_alt and adapt "
                  "it to THIS picture: labels exactly as printed here; if the picture differs from en_alt "
                  "(missing or extra element, other value or wire), describe this picture and say what differs "
                  "in note.\n\n## Items\n"
                  + json.dumps([ctx(g, {"en_alt": g["en_alt"]}) for g in batch], ensure_ascii=False, indent=1))
        images = [g["png"] for g in batch]
    else:
        prompt = ((ROOT / "projects/alt-text/CODEX_BRIEF.md").read_text(encoding="utf-8")
                  + f"\n\n## Language\nThis is the {LANGS[lang]} manual: write every alt text in {LANGS[lang]}, "
                  "keeping labels, names and values exactly as printed in the picture. " + LANG_NOTES[lang]
                  + "\n\n## Items (pictures attached in this order)\n"
                  + json.dumps([ctx(g) for g in batch], ensure_ascii=False, indent=1))
        images = [g["png"] for g in batch]
    (W / "drafts").mkdir(exist_ok=True)
    res = cw.run_codex(prompt, images, W / "drafts" / (bfile.stem + ".raw.txt"), W / "drafts" / (bfile.stem + ".log"))
    got = {r["id"]: r for r in res}
    missing = [g["id"] for g in batch if g["id"] not in got]
    if missing:
        raise RuntimeError(f"{bfile.name}: Codex skipped {missing}")
    for r in res:                      # pictures are always re-checked; 'same' get the text check
        r["complexity"] = "simple" if kind == "t" else "high"
    cw.dump(out, res)
    return f"{bfile.name}: {len(res)} drafted"


def draft(a):
    W = cw.wdir(a.wave)
    cw.pool(draft_batch, a.jobs, [(W, f) for f in sorted((W / "batches").glob("b*.json"))])


def check_batch(W, n, group):
    out = W / "verify" / f"vt{n:03d}.json"
    if out.exists():
        return f"{out.name}: already checked"
    lang = group[0]["lang"]
    prompt = (
        f"You are checking {LANGS[lang]} translations of alt text for pictures in TRIKDIS installation "
        "manuals. The English (en_alt) was checked against the picture and is correct. For each item, "
        f"check that the {LANGS[lang]} alt says exactly the same: no fact added, dropped or changed; terminal "
        "names, model names, wire codes, screen labels and values unchanged; no identifier (IMEI, serial, "
        "MAC, UID, phone, e-mail, password, name) added; natural "
        + LANGS[lang] + " using the page's own terms (text_before/text_after). " + LANG_NOTES[lang]
        + " Reply with ONLY a JSON array: "
        '[{"id": "...", "verdict": "ok|wrong", "problems": "", "corrected_alt": "full corrected alt if wrong, else empty"}]'
        "\n\n## Items\n" + json.dumps([ctx(g, {"en_alt": g["en_alt"], "translated_alt": g["draft"]["alt"]})
                                       for g in group], ensure_ascii=False, indent=1))
    (W / "verify").mkdir(exist_ok=True)
    res = cw.run_codex(prompt, [], W / "verify" / f"vt{n:03d}.raw.txt", W / "verify" / f"vt{n:03d}.log")
    cw.dump(out, res)
    return f"{out.name}: {sum(r['verdict'] == 'ok' for r in res)} ok, {sum(r['verdict'] != 'ok' for r in res)} wrong"


def check(a):
    W = cw.wdir(a.wave)
    d, done = cw.drafts(W), set(cw.verdicts(W))
    todo = [dict(g, draft=d[g["id"]]) for g in cw.load(W / "all.json")
            if g["cls"] == "same" and g["id"] in d and g["id"] not in done]
    start = max([int(f.stem[2:]) for f in (W / "verify").glob("vt*.json") if f.stem[2:].isdigit()] + [0]) + 1
    cw.pool(check_batch, a.jobs, [(W, start + i // CHECK_BATCH, todo[i:i + CHECK_BATCH])
                                  for i in range(0, len(todo), CHECK_BATCH)])
    print("next: codex_wave.py verify", a.wave, "--all   (checks the pictures)")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prepare"); p.add_argument("wave"); p.add_argument("lang", choices=sorted(LANGS)); p.add_argument("pages", nargs="*")
    for name in ("draft", "check"):
        s = sub.add_parser(name); s.add_argument("wave"); s.add_argument("--jobs", type=int, default=2)
    a = ap.parse_args()
    globals()[a.cmd](a)
