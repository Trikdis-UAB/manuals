#!/usr/bin/env python3
"""PDF build cache: restore cached PDFs and write a pending manifest for misses.

Usage:
  pdf_cache.py restore --site site --manifest site/pdf-manifest.json \
                       --cache-dir $NETLIFY_CACHE_DIR/pdf-cache \
                       --pending site/pdf-manifest-pending.json

  pdf_cache.py save --site site --manifest site/pdf-manifest-pending.json \
                    --cache-dir $NETLIFY_CACHE_DIR/pdf-cache

Global hash covers shared PDF assets (CSS, stamp script, fonts, logos).
Per-manual hash covers the source directory for each manual.
A PDF is restored from cache only when both hashes match.
"""
import argparse
import hashlib
import json
import os
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files/dirs whose change invalidates ALL PDFs.
_GLOBAL_FILES = [
    "Scripts/pdf-export.css",
    "Scripts/stamp_manual_pdf.py",
]
_GLOBAL_DIRS = [
    "Scripts/fonts",
    "docs/images",
]


def _hash_file(path: str, h) -> None:
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)


def _collect_global_paths() -> list[str]:
    paths = []
    for rel in _GLOBAL_FILES:
        p = os.path.join(ROOT, rel)
        if os.path.isfile(p):
            paths.append(p)
    for rel_dir in _GLOBAL_DIRS:
        d = os.path.join(ROOT, rel_dir)
        if os.path.isdir(d):
            for root, dirs, files in os.walk(d):
                dirs.sort()
                for fname in sorted(files):
                    paths.append(os.path.join(root, fname))
    return sorted(paths)


def compute_global_hash() -> str:
    h = hashlib.sha256()
    for p in _collect_global_paths():
        h.update(os.path.relpath(p, ROOT).encode())
        _hash_file(p, h)
    return h.hexdigest()[:16]


def compute_manual_hash(src_path: str) -> str:
    """Hash all files in the docs directory that contains src_path."""
    manual_dir = os.path.join(ROOT, "docs", os.path.dirname(src_path))
    h = hashlib.sha256()
    if os.path.isdir(manual_dir):
        for root, dirs, files in os.walk(manual_dir):
            dirs.sort()
            for fname in sorted(files):
                fpath = os.path.join(root, fname)
                h.update(os.path.relpath(fpath, ROOT).encode())
                _hash_file(fpath, h)
    return h.hexdigest()[:16]


def _cache_key(output_path: str) -> str:
    return hashlib.md5(output_path.encode()).hexdigest()


def cmd_restore(args) -> None:
    cache_dir: str = args.cache_dir
    manifest_path: str = args.manifest
    site_dir: str = args.site
    pending_path: str = args.pending

    if not os.path.exists(manifest_path):
        print(f"Manifest not found: {manifest_path}", file=sys.stderr)
        sys.exit(1)

    with open(manifest_path) as f:
        manifest = json.load(f)

    global_hash = compute_global_hash()
    print(f"PDF cache — global hash: {global_hash}")

    global_hash_file = os.path.join(cache_dir, "_global.hash")
    cached_global = ""
    if os.path.exists(global_hash_file):
        cached_global = open(global_hash_file).read().strip()

    if cached_global != global_hash:
        print(
            f"PDF cache — global hash changed ({cached_global or 'none'!r} → {global_hash!r}): "
            "all PDFs will be regenerated."
        )
        with open(pending_path, "w") as f:
            json.dump(manifest, f, indent=2)
        return

    pending = []
    restored = 0

    for entry in manifest:
        key = _cache_key(entry["output"])
        hash_file = os.path.join(cache_dir, f"{key}.hash")
        pdf_file = os.path.join(cache_dir, f"{key}.pdf")

        manual_hash = compute_manual_hash(entry["src_path"])
        expected = f"{global_hash}:{manual_hash}"
        cached_hash = open(hash_file).read().strip() if os.path.exists(hash_file) else ""

        if (
            cached_hash == expected
            and os.path.isfile(pdf_file)
            and os.path.getsize(pdf_file) > 0
        ):
            out_path = os.path.join(site_dir, entry["output"])
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            shutil.copy2(pdf_file, out_path)
            restored += 1
        else:
            pending.append(entry)

    total = len(manifest)
    print(
        f"PDF cache — {restored}/{total} restored from cache, "
        f"{len(pending)} need regeneration."
    )
    with open(pending_path, "w") as f:
        json.dump(pending, f, indent=2)


def cmd_save(args) -> None:
    cache_dir: str = args.cache_dir
    manifest_path: str = args.manifest
    site_dir: str = args.site

    if not os.path.exists(manifest_path):
        print(f"Pending manifest not found: {manifest_path}, nothing to save.", file=sys.stderr)
        return

    with open(manifest_path) as f:
        manifest = json.load(f)

    if not manifest:
        print("PDF cache — no pending PDFs to save.")
        return

    os.makedirs(cache_dir, exist_ok=True)
    global_hash = compute_global_hash()
    saved = 0
    skipped = 0

    for entry in manifest:
        key = _cache_key(entry["output"])
        src_pdf = os.path.join(site_dir, entry["output"])
        if not os.path.isfile(src_pdf) or os.path.getsize(src_pdf) == 0:
            print(f"  WARNING: generated PDF missing or empty: {src_pdf}")
            skipped += 1
            continue
        manual_hash = compute_manual_hash(entry["src_path"])
        shutil.copy2(src_pdf, os.path.join(cache_dir, f"{key}.pdf"))
        with open(os.path.join(cache_dir, f"{key}.hash"), "w") as f:
            f.write(f"{global_hash}:{manual_hash}")
        saved += 1

    with open(os.path.join(cache_dir, "_global.hash"), "w") as f:
        f.write(global_hash)

    print(
        f"PDF cache — saved {saved} PDFs to cache "
        f"(global hash: {global_hash})"
        + (f", {skipped} skipped (missing)" if skipped else "")
        + "."
    )


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest="cmd")

    r = sub.add_parser("restore", help="Restore cached PDFs; write pending manifest for misses.")
    r.add_argument("--site", required=True, help="Built site directory")
    r.add_argument("--manifest", required=True, help="Full pdf-manifest.json path")
    r.add_argument("--cache-dir", required=True, help="Persistent cache directory")
    r.add_argument("--pending", required=True, help="Output: filtered manifest of misses")

    s = sub.add_parser("save", help="Save newly generated PDFs to cache.")
    s.add_argument("--site", required=True, help="Built site directory")
    s.add_argument("--manifest", required=True, help="Pending manifest (entries that were generated)")
    s.add_argument("--cache-dir", required=True, help="Persistent cache directory")

    args = p.parse_args()
    if args.cmd == "restore":
        cmd_restore(args)
    elif args.cmd == "save":
        cmd_save(args)
    else:
        p.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
