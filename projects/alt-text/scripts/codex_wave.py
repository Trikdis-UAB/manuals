#!/usr/bin/env python3
"""Run an alt-text wave with Codex (vision) doing the drafting and the re-check.

All state lives in projects/alt-text/work/<wave>/ (git-excluded), so an interrupted
run resumes where it stopped. Steps, run from the repo root:

  codex_wave.py prepare <wave> docs/en/.../index.md [...]   # batches, context, PNG copies
  codex_wave.py draft   <wave> [--jobs 2]                   # Codex drafts every batch
  codex_wave.py verify  <wave> [--jobs 2]                   # fresh Codex re-checks 'high' items
  codex_wave.py status  <wave>                              # counts + disputes to resolve
  codex_wave.py apply   <wave>                              # writes alt text into the pages
  codex_wave.py review  <wave>                              # HTML list of diagrams for a human

A dispute (the re-check says a draft is wrong) is never applied automatically: put the
settled text in work/<wave>/resolutions.json as {"<id>": "<alt>"} and run apply again.
Codex runs read-only (-s read-only) and only ever sees the public manual images and text.
"""
import argparse, collections, concurrent.futures as cf, glob, hashlib, html, json, os, re, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(HERE))
from altlib import image_refs, needs_alt  # noqa: E402

def _find_codex():
    """The Codex app moves its CLI on updates (2026-10-01: .../codex -> .../codex-cli/bin/codex)."""
    import shutil
    base = Path.home() / ".codex/plugins/.plugin-appserver"
    for p in [os.environ.get("CODEX_BIN"), shutil.which("codex"), base / "codex-cli/bin/codex", base / "codex"]:
        if p and Path(p).is_file() and os.access(p, os.X_OK):
            return str(p)
    found = sorted(base.glob("**/bin/codex")) if base.is_dir() else []
    if found:
        return str(found[0])
    sys.exit("Codex CLI not found; set CODEX_BIN")


CODEX = _find_codex()
MODEL = os.environ.get("CODEX_MODEL", "gpt-6-sol")
BATCH = 15
VERIFY_BATCH = 8
SITE = "https://docs.trikdis.com/"


def wdir(wave):
    return ROOT / "projects/alt-text/work" / wave


def load(p, default=None):
    try:
        return json.loads(Path(p).read_text(encoding="utf-8"))
    except FileNotFoundError:
        return default


def dump(p, data):
    Path(p).parent.mkdir(parents=True, exist_ok=True)
    Path(p).write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")


def numbered_nearby(lines, idx, span=30):
    out = [l.strip() for l in lines[max(0, idx - span):idx + span] if re.match(r"^\s*\d+\.\s+\S", l)]
    return " | ".join(out)[:900]


def prepare(a):
    W = wdir(a.wave)
    from PIL import Image
    known = {}
    for page in glob.glob(str(ROOT / "docs/en/**/index.md"), recursive=True):
        for r in image_refs(open(page, encoding="utf-8").read()):
            p = Path(page).parent / r["src"]
            if not needs_alt(r["alt"]) and len(r["alt"]) >= 60 and p.is_file():   # skip thin legacy alts
                known.setdefault(hashlib.sha1(p.read_bytes()).hexdigest(), r["alt"])
    groups = collections.OrderedDict()
    for page in a.pages:
        page = Path(page).resolve()
        manual = str(page.parent.relative_to(ROOT / "docs"))
        lines = page.read_text(encoding="utf-8").splitlines()
        items = json.loads(subprocess.check_output(
            [sys.executable, str(HERE / "extract_image_context.py"), str(page)]))
        for it in items:
            g = groups.setdefault(it["sha1"] or it["image"], {
                "image": it["image"], "sha1": it["sha1"], "occurrences": [],
                "heading_trail": it["heading_trail"], "context_before": it["context_before"],
                "context_after": it["context_after"], "numbered_list_nearby": numbered_nearby(lines, it["line"] - 1),
                "ocr_hint": it.get("ocr_hint", "")})
            g["occurrences"].append({"manual": manual, "src": it["src"]})
    items, reuse = [], {}
    for i, g in enumerate(groups.values(), 1):
        g["id"] = f"{a.wave}-{i:03d}"
        if g["sha1"] in known:
            reuse[g["id"]] = known[g["sha1"]]
        items.append(g)
    (W / "png").mkdir(parents=True, exist_ok=True)
    todo = [g for g in items if g["id"] not in reuse]
    for g in todo:
        png = W / "png" / f"{g['id']}.png"
        if not png.exists():
            Image.open(g["image"]).convert("RGB").save(png)
        g["png"] = str(png)
    dump(W / "all.json", items)
    dump(W / "reuse.json", reuse)
    for b in range(0, len(todo), BATCH):
        dump(W / "batches" / f"b{b // BATCH + 1:02d}.json", todo[b:b + BATCH])
    print(f"{len(items)} distinct pictures ({sum(len(g['occurrences']) for g in items)} on pages), "
          f"{len(reuse)} reuse shipped alt, {len(todo)} to draft in {-(-len(todo) // BATCH)} batches")


def run_codex(prompt, images, out_file, log_file):
    cmd = [CODEX, "exec", "-m", MODEL, "--skip-git-repo-check", "-s", "read-only",
           "-o", str(out_file), prompt]
    for im in images:
        cmd += ["-i", im]          # prompt must come before -i: -i takes every following argument
    with open(log_file, "w") as log, open(os.devnull) as devnull:
        subprocess.run(cmd, stdin=devnull, stdout=log, stderr=subprocess.STDOUT,
                       cwd=str(Path(out_file).parent), timeout=3600)
    text = Path(out_file).read_text(encoding="utf-8")
    return json.loads(text[text.index("["):text.rindex("]") + 1])


def item_block(g, extra=None):
    d = {"id": g["id"], "appears_on": [o["manual"] for o in g["occurrences"]],
         "heading_trail": g["heading_trail"], "text_before": g["context_before"],
         "text_after": g["context_after"]}
    if g.get("numbered_list_nearby"):
        d["numbered_list_on_page"] = g["numbered_list_nearby"]
    if g.get("ocr_hint"):
        d["ocr_hint_noisy"] = g["ocr_hint"]
    if extra:
        d.update(extra)
    return d


def draft_batch(W, bfile):
    out = W / "drafts" / bfile.name
    if out.exists():
        return f"{bfile.name}: already drafted"
    batch = load(bfile)
    brief = (ROOT / "projects/alt-text/CODEX_BRIEF.md").read_text(encoding="utf-8")
    prompt = (brief + "\n\n## Items (pictures attached in this order)\n" +
              json.dumps([item_block(g) for g in batch], ensure_ascii=False, indent=1))
    (W / "drafts").mkdir(exist_ok=True)
    res = run_codex(prompt, [g["png"] for g in batch], W / "drafts" / (bfile.stem + ".raw.txt"),
                    W / "drafts" / (bfile.stem + ".log"))
    got = {r["id"] for r in res}
    missing = [g["id"] for g in batch if g["id"] not in got]
    if missing:
        raise RuntimeError(f"{bfile.name}: Codex skipped {missing}")
    dump(out, res)
    return f"{bfile.name}: {len(res)} drafted, {sum(r.get('complexity') == 'high' for r in res)} high"


def verify_batch(W, n, group):
    out = W / "verify" / f"v{n:02d}.json"
    if out.exists():
        return f"v{n:02d}: already verified"
    prompt = (
        "You are checking alt text that ANOTHER model wrote for pictures from TRIKDIS installation "
        "manuals. Installers wire devices from these descriptions, so an error matters. The drafts "
        "may contain mistakes: swapped wires, wrong terminal, a crossing read as a turn (a crossing "
        "with no junction dot is a pass-over; each line keeps going straight), missing printed values, "
        "wrong callout names or photo sides, links in block diagrams that are not drawn. For each item, "
        "look at the attached picture (same order as the list) and check EVERY claim in the draft "
        "against it. Reply with ONLY a JSON array, no prose: "
        '[{"id": "...", "verdict": "ok|wrong", "problems": "what is wrong, empty if ok", '
        '"corrected_alt": "full corrected alt text if wrong, else empty"}]\n\n## Items\n' +
        json.dumps([item_block(g, {"draft_alt": g["draft"]["alt"]}) for g in group], ensure_ascii=False, indent=1))
    (W / "verify").mkdir(exist_ok=True)
    res = run_codex(prompt, [g["png"] for g in group], W / "verify" / f"v{n:02d}.raw.txt",
                    W / "verify" / f"v{n:02d}.log")
    dump(out, res)
    return f"v{n:02d}: {sum(r['verdict'] == 'ok' for r in res)} ok, {sum(r['verdict'] != 'ok' for r in res)} wrong"


def drafts(W):
    d = {}
    for f in sorted((W / "drafts").glob("b*.json")):
        for r in load(f):
            d[r["id"]] = r
    return d


def verdicts(W):
    v = {}
    for f in sorted((W / "verify").glob("v*.json")):
        for r in load(f):
            v[r["id"]] = r
    return v


def pool(fn, jobs, tasks):
    with cf.ThreadPoolExecutor(max_workers=jobs) as ex:
        for fut in cf.as_completed([ex.submit(fn, *t) for t in tasks]):
            try:
                print(fut.result(), flush=True)
            except Exception as e:  # keep the other batches going; rerun resumes
                print("FAILED:", e, flush=True)


def draft(a):
    W = wdir(a.wave)
    pool(draft_batch, a.jobs, [(W, f) for f in sorted((W / "batches").glob("b*.json"))])


def verify(a):
    W = wdir(a.wave)
    d = drafts(W)
    done = set(verdicts(W))
    want = [g for g in load(W / "all.json") if g["id"] in d and g["id"] not in done
            and (a.all or d[g["id"]].get("complexity") == "high")]
    todo = [dict(g, draft=d[g["id"]]) for g in want]
    start = max([int(f.stem[1:]) for f in (W / "verify").glob("v*.json")] + [0]) + 1
    pool(verify_batch, a.jobs, [(W, start + i // VERIFY_BATCH, todo[i:i + VERIFY_BATCH]) for i in range(0, len(todo), VERIFY_BATCH)])


def final_alts(W):
    d, v, reuse = drafts(W), verdicts(W), load(W / "reuse.json", {})
    res = load(W / "resolutions.json", {})
    alts, open_ = {}, []
    for g in load(W / "all.json"):
        i = g["id"]
        if i in res:
            alts[i] = res[i]
        elif i in reuse:
            alts[i] = reuse[i]
        elif i not in d:
            open_.append((i, "not drafted"))
        elif i not in v and (d[i].get("complexity") == "high" or v):
            open_.append((i, "not re-checked"))
        elif i in v and v[i]["verdict"] != "ok":
            open_.append((i, "DISPUTE: " + v[i].get("problems", "")))
        else:
            alts[i] = d[i]["alt"]
    return alts, open_


def status(a):
    W = wdir(a.wave)
    alts, open_ = final_alts(W)
    d = drafts(W)
    print(f"ready {len(alts)}, open {len(open_)}; drafted {len(d)}, high {sum(r.get('complexity') == 'high' for r in d.values())}, verified {len(verdicts(W))}")
    for i, why in open_:
        print(" ", i, why[:300])
    notes = [(i, r["note"]) for i, r in d.items() if r.get("note")]
    if notes:
        print("notes from drafts (report, do not fix silently):")
        for i, n in notes:
            print(" ", i, n[:300])


def apply(a):
    W = wdir(a.wave)
    alts, open_ = final_alts(W)
    per = collections.defaultdict(list)
    for g in load(W / "all.json"):
        if g["id"] in alts:
            for o in g["occurrences"]:
                entry = {"src": o["src"], "alt": alts[g["id"]]}
                if entry not in per[o["manual"]]:   # same picture used twice on a page: apply handles both
                    per[o["manual"]].append(entry)
    for manual, lst in per.items():
        page = ROOT / "docs" / manual / "index.md"
        pending = {r["src"] for r in image_refs(page.read_text(encoding="utf-8")) if needs_alt(r["alt"])}
        lst = [e for e in lst if e["src"] in pending]    # rerun-safe: skip what is already applied
        if not lst:
            print(f"{manual}: nothing left to apply")
            continue
        f = W / f"apply-{manual.replace('/', '_')}.json"
        dump(f, lst)
        subprocess.run([sys.executable, str(HERE / "apply_alt_text.py"), str(ROOT / "docs" / manual / "index.md"), str(f)], check=True)
    if open_:
        print(f"{len(open_)} items left open (see status); rerun apply after resolving them")


def review(a):
    W = wdir(a.wave)
    alts, _ = final_alts(W)
    d = drafts(W)
    rows, n = [], 0
    for g in load(W / "all.json"):
        if g["id"] not in alts or d.get(g["id"], {}).get("kind") not in ("wiring", "diagram") and "numbered callouts" not in alts[g["id"]]:
            continue
        n += 1
        o = g["occurrences"][0]
        url = SITE + o["manual"] + "/" + o["src"].lstrip("./")
        rows.append(f'<p><b>{n}. {html.escape(o["manual"].split("/")[-1].upper())}</b> – {html.escape(g["heading_trail"].split(" > ")[-1])}<br>'
                    f'<img src="{url}" width="560" style="max-width:100%;border:1px solid #ddd"><br>{html.escape(alts[g["id"]])}</p>')
    (W / "review.html").write_text("\n".join(rows), encoding="utf-8")
    print(f"{n} items -> {W / 'review.html'}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("prepare", "draft", "verify", "status", "apply", "review"):
        s = sub.add_parser(name)
        s.add_argument("wave")
        if name == "prepare":
            s.add_argument("pages", nargs="+")
        if name in ("draft", "verify"):
            s.add_argument("--jobs", type=int, default=2)
        if name == "verify":
            s.add_argument("--all", action="store_true", help="also re-check 'simple' items (catches drafts that slipped to a neighbouring picture)")
    a = ap.parse_args()
    globals()[a.cmd](a)
