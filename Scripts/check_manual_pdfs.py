#!/usr/bin/env python3
"""Validate generated manual PDFs and their injected download links."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path, PurePosixPath


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate generated manual PDFs.")
    parser.add_argument("--site", "--site-dir", dest="site", default="site", help="Built site directory")
    parser.add_argument(
        "--manifest",
        default=None,
        help="Path to pdf-manifest.json (defaults to <site>/pdf-manifest.json)",
    )
    return parser.parse_args()


def route_from_html_path(site_dir: Path, html_path: Path) -> str:
    rel = html_path.relative_to(site_dir).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return f"/{rel[:-10].strip('/')}/"
    return f"/{PurePosixPath(rel).with_suffix('').as_posix().strip('/')}/"


def is_explicitly_excluded(route: str) -> bool:
    return route in {"/", "/en/", "/lt/", "/es/", "/ru/"} or "/receivers/ipcom/" in route


def validate_manifest(manifest_path: Path) -> list[dict[str, str]]:
    if not manifest_path.exists():
        raise RuntimeError(f"PDF manifest not found: {manifest_path}")

    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise RuntimeError("PDF manifest must be a JSON array.")

    entries: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    seen_outputs: set[str] = set()
    required_keys = {"src_path", "url", "output"}
    for idx, entry in enumerate(data):
        if not isinstance(entry, dict):
            raise RuntimeError(f"Manifest entry #{idx + 1} is not an object.")
        if set(entry.keys()) != required_keys:
            raise RuntimeError(f"Manifest entry #{idx + 1} keys mismatch: {sorted(entry.keys())}")
        for key in required_keys:
            if not isinstance(entry[key], str) or not entry[key]:
                raise RuntimeError(f"Manifest entry #{idx + 1} has invalid '{key}'.")

        url = entry["url"]
        output = entry["output"]
        if not url.startswith("/") or not url.endswith("/"):
            raise RuntimeError(f"Manifest entry #{idx + 1} has non-normalized url: {url}")
        output_path = PurePosixPath(output)
        if output_path.is_absolute():
            raise RuntimeError(f"Manifest entry #{idx + 1} output must be site-relative: {output}")
        if output_path.name != "manual.pdf":
            raise RuntimeError(f"Manifest entry #{idx + 1} output must end with manual.pdf: {output}")
        if url in seen_urls:
            raise RuntimeError(f"Duplicate manifest url: {url}")
        if output in seen_outputs:
            raise RuntimeError(f"Duplicate manifest output: {output}")
        if is_explicitly_excluded(url):
            raise RuntimeError(f"Manifest entry must not include excluded route: {url}")

        seen_urls.add(url)
        seen_outputs.add(output)
        entries.append(entry)

    return entries


def main() -> int:
    args = parse_args()
    site_dir = Path(args.site).expanduser().resolve()
    manifest_path = Path(args.manifest).expanduser().resolve() if args.manifest else site_dir / "pdf-manifest.json"

    if not site_dir.exists():
        print(f"Site directory not found: {site_dir}", file=sys.stderr)
        return 2

    try:
        entries = validate_manifest(manifest_path)
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    failures: list[str] = []
    manifest_urls = {entry["url"] for entry in entries}

    for entry in entries:
        output_path = site_dir / PurePosixPath(entry["output"])
        html_path = output_path.parent / "index.html"
        if not html_path.exists():
            failures.append(f"Missing source HTML for manifest entry: {html_path.relative_to(site_dir)}")
            continue
        if not output_path.exists():
            failures.append(f"Missing PDF: {output_path.relative_to(site_dir)}")
            continue
        if output_path.stat().st_size == 0:
            failures.append(f"Empty PDF: {output_path.relative_to(site_dir)}")
            continue
        if output_path.read_bytes()[:4] != b"%PDF":
            failures.append(f"Invalid PDF header: {output_path.relative_to(site_dir)}")

        html = html_path.read_text(encoding="utf-8", errors="ignore")
        if "data-manual-pdf-download" not in html or "href=manual.pdf" not in html:
            failures.append(f"Missing injected PDF link in page HTML: {html_path.relative_to(site_dir)}")

    for html_path in site_dir.rglob("index.html"):
        route = route_from_html_path(site_dir, html_path)
        if route in manifest_urls:
            continue
        if not is_explicitly_excluded(route):
            continue
        html = html_path.read_text(encoding="utf-8", errors="ignore")
        if "data-manual-pdf-download" in html:
            failures.append(f"Excluded route contains a PDF link: {route}")

    if failures:
        print("Manual PDF validation failed:", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print(f"Validated {len(entries)} manual PDFs from {manifest_path.relative_to(site_dir.parent)}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
