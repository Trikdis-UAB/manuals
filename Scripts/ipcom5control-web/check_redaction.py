#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

from PIL import Image

from redact_sensitive_images import (
    build_segments,
    check_protected_collisions,
    collect_words,
    detect_item_hits,
)


def _index_report_items(report):
    items = report.get("items", []) if isinstance(report, dict) else []
    return {item.get("path"): item for item in items if isinstance(item, dict) and item.get("path")}


def _load_requirements(spec_path, spec):
    req_rel = spec.get("requirements_file")
    if not req_rel:
        return {}
    req_path = Path(req_rel)
    if not req_path.is_absolute():
        req_path = (spec_path.parent / req_path).resolve()
    if not req_path.exists():
        return {}
    req = json.loads(req_path.read_text(encoding="utf-8"))
    items = req.get("items", []) if isinstance(req, dict) else []
    out = {}
    for item in items:
        if isinstance(item, dict) and item.get("path"):
            out[item["path"]] = item
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--spec", required=True)
    args = parser.parse_args()

    spec_path = Path(args.spec).resolve()
    repo_root = spec_path.parents[2]
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    requirements = _load_requirements(spec_path, spec)

    review_root = repo_root / spec.get("review_dir", "artifacts/ui/ipcom5-redaction-review")
    report_path = review_root / "report.json"
    if not report_path.exists():
        raise SystemExit(f"Redaction check failed: missing report {report_path}")

    report = json.loads(report_path.read_text(encoding="utf-8"))
    report_items = _index_report_items(report)

    errors = []
    for item in spec.get("items", []):
        rel_path = item["path"]
        image_path = repo_root / rel_path
        if not image_path.exists():
            errors.append(f"Missing image: {rel_path}")
            continue

        rep = report_items.get(rel_path)
        if rep is None:
            errors.append(f"Missing report entry for {rel_path}")
            continue

        with Image.open(image_path) as img:
            img_rgb = img.convert("RGB")
        words = collect_words(img_rgb, min_conf=45.0)
        segments = build_segments(words)
        residual_hits = detect_item_hits(item, words, segments, img_rgb.size, allow_fallback=False)
        residual_hits = [h for h in residual_hits if h.get("text") != "<fallback>"]

        if residual_hits:
            errors.append(f"{rel_path}: residual sensitive tokens found ({len(residual_hits)})")

        geometry = rep.get("geometry", {})
        geometry_violations = geometry.get("violations", []) if isinstance(geometry, dict) else []
        if geometry_violations:
            errors.append(f"{rel_path}: geometry violations in report ({'; '.join(geometry_violations)})")

        protected_collisions = rep.get("protected_collisions", []) if isinstance(rep.get("protected_collisions"), list) else []
        if protected_collisions:
            errors.append(f"{rel_path}: protected token collisions in report ({len(protected_collisions)})")

        before_path = review_root / "before" / rel_path
        if before_path.exists() and isinstance(rep.get("masks"), list):
            with Image.open(before_path) as before_img:
                before_words = collect_words(before_img.convert("RGB"), min_conf=45.0)
            protected_tokens = []
            for token in spec.get("defaults", {}).get("protected_tokens", []):
                if token not in protected_tokens:
                    protected_tokens.append(token)
            for token in item.get("protected_tokens", []):
                if token not in protected_tokens:
                    protected_tokens.append(token)
            if protected_tokens:
                calc_collisions = check_protected_collisions(before_words, rep.get("masks", []), protected_tokens)
                if calc_collisions:
                    errors.append(f"{rel_path}: calculated protected token collisions ({len(calc_collisions)})")

        if rep.get("status") not in ("ok", None):
            errors.append(f"{rel_path}: report status is {rep.get('status')}")

        mask_quality = rep.get("mask_quality")
        if not isinstance(mask_quality, dict):
            errors.append(f"{rel_path}: report missing mask_quality")
        else:
            suspicious = mask_quality.get("suspicious", [])
            if suspicious:
                errors.append(f"{rel_path}: suspicious mask geometry ({len(suspicious)})")

        req_item = requirements.get(rel_path)
        if req_item:
            req_result = rep.get("requirements_result")
            if not isinstance(req_result, dict):
                errors.append(f"{rel_path}: report missing requirements_result")
            else:
                if req_result.get("status") != "ok":
                    errors.append(f"{rel_path}: requirements failed ({'; '.join(req_result.get('violations', []))})")
                if req_result.get("missed_targets"):
                    errors.append(f"{rel_path}: missed requirement targets ({len(req_result.get('missed_targets', []))})")
                if req_result.get("forbidden_overlaps"):
                    errors.append(f"{rel_path}: forbidden overlaps ({len(req_result.get('forbidden_overlaps', []))})")
                if req_result.get("must_not_ocr_residuals"):
                    errors.append(f"{rel_path}: must_not_ocr residuals ({len(req_result.get('must_not_ocr_residuals', []))})")

    if errors:
        print("Redaction check failed:")
        for err in errors:
            print(f"- {err}")
        raise SystemExit(1)

    summary = report.get("summary", {})
    print(
        "Redaction check passed. "
        f"items={summary.get('items', 'n/a')} "
        f"masks={summary.get('total_masks', 'n/a')} "
        f"residuals={summary.get('total_residuals', 'n/a')}"
    )


if __name__ == "__main__":
    main()
