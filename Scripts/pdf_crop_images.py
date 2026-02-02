#!/usr/bin/env python3
"""Render PDF pages and crop images based on a JSON spec.

Requires Ghostscript (gs). If Pillow is unavailable, uses macOS sips for cropping.
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image

    HAS_PIL = True
except Exception:
    HAS_PIL = False


DEFAULT_DPI = 300
DEFAULT_PATTERN = "page-%02d.png"


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def ensure_tool(name: str) -> None:
    if shutil.which(name) is None:
        raise RuntimeError(f"Required tool '{name}' not found in PATH.")


def render_pdf(pdf: Path, out_dir: Path, dpi: int, pattern: str) -> None:
    ensure_tool("gs")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = str(out_dir / pattern)
    cmd = [
        "gs",
        "-dSAFER",
        "-dBATCH",
        "-dNOPAUSE",
        "-sDEVICE=pngalpha",
        f"-r{dpi}",
        f"-sOutputFile={out_file}",
        str(pdf),
    ]
    run(cmd)


def crop_with_pil(src: Path, dest: Path, box: list[int]) -> None:
    x0, y0, x1, y1 = box
    with Image.open(src) as img:
        img.crop((x0, y0, x1 + 1, y1 + 1)).save(dest)


def crop_with_sips(src: Path, dest: Path, box: list[int]) -> None:
    ensure_tool("sips")
    x0, y0, x1, y1 = box
    width = x1 - x0 + 1
    height = y1 - y0 + 1
    cmd = [
        "sips",
        "-c",
        str(height),
        str(width),
        "--cropOffset",
        str(x0),
        str(y0),
        str(src),
        "--out",
        str(dest),
    ]
    run(cmd)


def main() -> None:
    parser = argparse.ArgumentParser(description="Render PDF pages and crop images.")
    parser.add_argument("--pdf", required=True, help="Path to source PDF")
    parser.add_argument("--spec", required=True, help="JSON crop spec file")
    parser.add_argument("--out", required=True, help="Output directory for crops")
    parser.add_argument("--dpi", type=int, default=DEFAULT_DPI, help="Render DPI")
    parser.add_argument(
        "--pattern",
        default=DEFAULT_PATTERN,
        help="Rendered page filename pattern (default: page-%%02d.png)",
    )
    parser.add_argument(
        "--keep-pages",
        action="store_true",
        help="Keep rendered pages (writes to --out/pages)",
    )

    args = parser.parse_args()
    pdf = Path(args.pdf).expanduser().resolve()
    spec_path = Path(args.spec).expanduser().resolve()
    out_dir = Path(args.out).expanduser().resolve()

    if not pdf.exists():
        raise RuntimeError(f"PDF not found: {pdf}")
    if not spec_path.exists():
        raise RuntimeError(f"Spec not found: {spec_path}")

    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    dpi = int(spec.get("dpi", args.dpi))
    pattern = str(spec.get("render_pattern", args.pattern))
    crops = spec.get("crops", [])
    if not crops:
        raise RuntimeError("Spec has no crops.")

    out_dir.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="pdf-crops-") as tmp:
        tmp_dir = Path(tmp)
        render_pdf(pdf, tmp_dir, dpi, pattern)

        for entry in crops:
            page = int(entry["page"])
            box = entry["box"]
            dest = out_dir / entry["dest"]
            src = tmp_dir / (pattern % page)
            if not src.exists():
                raise RuntimeError(f"Rendered page missing: {src}")
            dest.parent.mkdir(parents=True, exist_ok=True)
            if HAS_PIL:
                crop_with_pil(src, dest, box)
            else:
                crop_with_sips(src, dest, box)

        if args.keep_pages:
            pages_dir = out_dir / "pages"
            pages_dir.mkdir(parents=True, exist_ok=True)
            for rendered in tmp_dir.glob("*.png"):
                shutil.copy2(rendered, pages_dir / rendered.name)


if __name__ == "__main__":
    main()
