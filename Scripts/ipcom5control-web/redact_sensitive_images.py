#!/usr/bin/env python3
import argparse
import csv
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageColor, ImageDraw

IP_RE = re.compile(r"(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?")
WAW_RE = re.compile(r"(?:waw01|vawo1|waw0?1|wawol|wawoi)", re.IGNORECASE)
HOST_RE = re.compile(r"(?:beta2|protegus)", re.IGNORECASE)
MAC_RE = re.compile(r"(?:[0-9A-F]{2}:){5}[0-9A-F]{2}", re.IGNORECASE)

LABEL_WORDS = {"sql", "user", "host", "port", "private", "public", "key", "pass", "database"}
SQL_VALUE_RE = re.compile(r"(?:beta2ipcom|localhost|/etc/letsencrypt)", re.IGNORECASE)
SAFE_KEEP_TOKENS = {"status", "valid", "enable", "http", "api"}


def phrase_tokens(text: str):
    return [normalize_token(x) for x in re.split(r"\s+", text.strip()) if normalize_token(x)]


def normalize_token(text: str) -> str:
    return re.sub(r"[^a-z0-9]", "", text.lower())


def word_rect(word):
    return [word["left"], word["top"], word["left"] + word["width"], word["top"] + word["height"]]


def area(rect):
    return max(0, rect[2] - rect[0]) * max(0, rect[3] - rect[1])


def intersects(a, b):
    return not (a[2] <= b[0] or b[2] <= a[0] or a[3] <= b[1] or b[3] <= a[1])


def intersection_area(a, b):
    x0 = max(a[0], b[0])
    y0 = max(a[1], b[1])
    x1 = min(a[2], b[2])
    y1 = min(a[3], b[3])
    if x1 <= x0 or y1 <= y0:
        return 0
    return (x1 - x0) * (y1 - y0)


def clamp_rect(rect, w, h):
    x0, y0, x1, y1 = rect
    x0 = max(0, min(w - 1, int(x0)))
    y0 = max(0, min(h - 1, int(y0)))
    x1 = max(1, min(w, int(x1)))
    y1 = max(1, min(h, int(y1)))
    if x1 <= x0:
        x1 = min(w, x0 + 1)
    if y1 <= y0:
        y1 = min(h, y0 + 1)
    return [x0, y0, x1, y1]


def expand_rect(rect, pad, w, h):
    x0, y0, x1, y1 = rect
    return clamp_rect([x0 - pad, y0 - pad, x1 + pad, y1 + pad], w, h)


def merge_rects(rects, gap=3):
    if not rects:
        return []
    pending = [list(r) for r in rects]
    changed = True
    while changed:
        changed = False
        out = []
        while pending:
            x0, y0, x1, y1 = pending.pop(0)
            merged = False
            for i, m in enumerate(out):
                mx0, my0, mx1, my1 = m
                if not (x1 < mx0 - gap or mx1 < x0 - gap or y1 < my0 - gap or my1 < y0 - gap):
                    out[i] = [min(mx0, x0), min(my0, y0), max(mx1, x1), max(my1, y1)]
                    merged = True
                    changed = True
                    break
            if not merged:
                out.append([x0, y0, x1, y1])
        pending = out
    return pending


def _shrink_bbox_for_sensitive_value(bbox, text, reason, image_size):
    x0, y0, x1, y1 = bbox
    w, h = image_size
    t = (text or "").lower()
    r = (reason or "").lower()
    if "/etc/letsencrypt" in t or "private_key" in r or "public_key" in r:
        dx = max(1, int((x1 - x0) * 0.02))
        x0 += dx
        x1 -= dx
        if y1 - y0 >= 10:
            y0 += 1
            y1 -= 1
    return clamp_rect([x0, y0, x1, y1], w, h)


def _subrect_for_word_span(word, start_idx, end_idx, image_size):
    w, h = image_size
    txt = word.get("text", "")
    text_len = max(1, len(txt))
    start_idx = max(0, min(text_len, int(start_idx)))
    end_idx = max(start_idx + 1, min(text_len, int(end_idx)))
    x0 = word["left"] + (word["width"] * (start_idx / text_len))
    x1 = word["left"] + (word["width"] * (end_idx / text_len))
    y0 = word["top"]
    y1 = word["top"] + word["height"]
    return clamp_rect([x0, y0, x1, y1], w, h)


def save_image(image: Image.Image, path: Path):
    if path.suffix.lower() == ".webp":
        image.save(path, format="WEBP", quality=95, method=6)
    elif path.suffix.lower() == ".png":
        image.save(path, format="PNG", optimize=True)
    else:
        image.save(path)


def run_tesseract_tsv(image_path: Path, psm: int, scale: int, min_conf: float):
    if scale == 1:
        source_path = image_path
    else:
        with Image.open(image_path) as src:
            resized = src.resize((src.width * scale, src.height * scale), Image.Resampling.BICUBIC)
            tmp = tempfile.NamedTemporaryFile(prefix="ipcom_redact_", suffix=".png", delete=False)
            source_path = Path(tmp.name)
            tmp.close()
            resized.save(source_path)

    try:
        output = subprocess.check_output(["tesseract", str(source_path), "stdout", "--psm", str(psm), "tsv"], text=True, stderr=subprocess.DEVNULL)
    finally:
        if scale != 1 and source_path.exists():
            source_path.unlink(missing_ok=True)

    words = []
    reader = csv.DictReader(output.splitlines(), delimiter="\t")
    for row in reader:
        if row.get("level") != "5":
            continue
        text = (row.get("text") or "").strip()
        if not text:
            continue
        try:
            conf = float(row.get("conf", "-1"))
            left = int(row["left"])
            top = int(row["top"])
            width = int(row["width"])
            height = int(row["height"])
        except Exception:
            continue
        if conf < min_conf:
            continue
        words.append(
            {
                "text": text,
                "norm": normalize_token(text),
                "left": int(left / scale),
                "top": int(top / scale),
                "width": max(1, int(width / scale)),
                "height": max(1, int(height / scale)),
                "conf": conf,
            }
        )
    return words


def collect_words(image: Image.Image, min_conf: float = 20.0):
    with tempfile.NamedTemporaryFile(prefix="ipcom_redact_collect_", suffix=".png", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    image.convert("RGB").save(tmp_path)

    try:
        all_words = []
        for psm in (6, 11):
            for scale in (1, 2):
                all_words.extend(run_tesseract_tsv(tmp_path, psm, scale, min_conf))
    finally:
        tmp_path.unlink(missing_ok=True)

    dedup = {}
    for word in all_words:
        key = (word["norm"], word["left"], word["top"], word["width"], word["height"])
        if key not in dedup or word["conf"] > dedup[key]["conf"]:
            dedup[key] = word

    result = list(dedup.values())
    result.sort(key=lambda w: (w["top"], w["left"]))
    for idx, word in enumerate(result, start=1):
        word["id"] = idx
    return result


def build_segments(words):
    if not words:
        return []

    rows = []
    for word in sorted(words, key=lambda w: (w["top"], w["left"])):
        cy = word["top"] + word["height"] / 2
        assigned = False
        for row in rows:
            tol = max(8, int(row["avg_h"] * 0.6))
            if abs(cy - row["cy"]) <= tol:
                row["words"].append(word)
                row["cy"] = (row["cy"] * row["count"] + cy) / (row["count"] + 1)
                row["avg_h"] = (row["avg_h"] * row["count"] + word["height"]) / (row["count"] + 1)
                row["count"] += 1
                assigned = True
                break
        if not assigned:
            rows.append({"words": [word], "cy": cy, "avg_h": float(word["height"]), "count": 1})

    segments = []
    for row in rows:
        sorted_row_words = sorted(row["words"], key=lambda w: w["left"])
        if not sorted_row_words:
            continue
        current = [sorted_row_words[0]]
        avg_h = max(10, int(row["avg_h"]))
        split_gap = max(24, int(avg_h * 1.8))

        for word in sorted_row_words[1:]:
            prev = current[-1]
            gap = word["left"] - (prev["left"] + prev["width"])
            if gap > split_gap:
                segments.append(_make_segment(current))
                current = [word]
            else:
                current.append(word)
        segments.append(_make_segment(current))

    segments.sort(key=lambda s: (s["top"], s["left"]))
    for idx, seg in enumerate(segments, start=1):
        seg["id"] = idx
    return segments


def _make_segment(words):
    left = min(w["left"] for w in words)
    top = min(w["top"] for w in words)
    right = max(w["left"] + w["width"] for w in words)
    bottom = max(w["top"] + w["height"] for w in words)
    text = " ".join(w["text"] for w in words)
    return {
        "words": words,
        "text": text,
        "norm_text": normalize_token(text),
        "left": left,
        "top": top,
        "right": right,
        "bottom": bottom,
    }


def _build_section_scopes(item, segments, w, h):
    section_defs = item.get("section_scopes") or {}
    if not isinstance(section_defs, dict) or not segments:
        return {}

    section_scopes = {}
    sorted_segments = sorted(segments, key=lambda s: (s["top"], s["left"]))
    for name, cfg in section_defs.items():
        if not isinstance(cfg, dict):
            continue
        header_phrases = cfg.get("headers", [])
        if isinstance(header_phrases, str):
            header_phrases = [header_phrases]
        header_norms = [normalize_token(p) for p in header_phrases if normalize_token(p)]
        if not header_norms:
            continue

        match = None
        for seg in sorted_segments:
            seg_norm = seg.get("norm_text", "")
            if any(h in seg_norm for h in header_norms):
                match = seg
                break
        if not match:
            continue

        x_pad = int(cfg.get("x_pad", 24))
        y_pad_top = int(cfg.get("y_pad_top", 10))
        y_pad_bottom = int(cfg.get("y_pad_bottom", 12))
        min_width = int(cfg.get("min_width", 280))

        x0 = max(0, match["left"] - x_pad)
        x1 = min(w, max(match["right"] + x_pad, x0 + min_width))
        y0 = max(0, match["top"] - y_pad_top)
        y1 = h

        next_headers = []
        for seg in sorted_segments:
            if seg["top"] <= match["top"]:
                continue
            if abs(seg["left"] - match["left"]) <= max(80, int(min_width * 0.22)):
                if any(hn in seg.get("norm_text", "") for hn in header_norms):
                    continue
                next_headers.append(seg)
        if next_headers:
            y1 = min(y1, next_headers[0]["top"] - y_pad_bottom)

        section_scopes[name] = [clamp_rect([x0, y0, x1, y1], w, h)]

    return section_scopes


def _resolve_scope_rects(item, rule, w, h, section_scopes=None):
    scopes = item.get("scopes") or {}
    scope_def = None
    if isinstance(scopes, dict):
        scope_def = scopes.get(rule)
        if scope_def is None:
            scope_def = scopes.get("default")
    elif isinstance(scopes, list):
        scope_def = scopes

    if not scope_def:
        return None

    rects = []
    for rect in scope_def:
        if isinstance(rect, str) and rect.startswith("section:"):
            if section_scopes:
                rects.extend(section_scopes.get(rect.split(":", 1)[1], []))
            continue
        if not isinstance(rect, list) or len(rect) != 4:
            continue
        if all(isinstance(x, (int, float)) for x in rect):
            if all(0 <= x <= 1 for x in rect):
                rects.append(clamp_rect([rect[0] * w, rect[1] * h, rect[2] * w, rect[3] * h], w, h))
            else:
                rects.append(clamp_rect(rect, w, h))
    return rects or None


def _in_scope(word, scopes):
    if not scopes:
        return True
    cx = word["left"] + word["width"] / 2
    cy = word["top"] + word["height"] / 2
    for x0, y0, x1, y1 in scopes:
        if x0 <= cx <= x1 and y0 <= cy <= y1:
            return True
    return False


def _filter_words(words, scopes):
    if not scopes:
        return words
    return [w for w in words if _in_scope(w, scopes)]


def _filter_segments(segments, scopes):
    if not scopes:
        return segments
    out = []
    for seg in segments:
        kept_words = [w for w in seg["words"] if _in_scope(w, scopes)]
        if not kept_words:
            continue
        out.append(_make_segment(kept_words))
    out.sort(key=lambda s: (s["top"], s["left"]))
    return out


def _segment_tokens(seg):
    return {normalize_token(w["text"]) for w in seg["words"] if normalize_token(w["text"])}


def _find_label_segments(segments, label_tokens):
    required = {normalize_token(x) for x in label_tokens if normalize_token(x)}
    if not required:
        return []
    found = []
    for seg in segments:
        tokens = _segment_tokens(seg)
        if required.issubset(tokens):
            found.append(seg)
    return found


def _find_value_segment(label_seg, segments, max_y_gap=120, x_tolerance=220):
    candidates = []
    for seg in segments:
        if seg["top"] <= label_seg["bottom"]:
            continue
        if seg["top"] - label_seg["bottom"] > max_y_gap:
            continue
        if abs(seg["left"] - label_seg["left"]) > x_tolerance:
            continue
        if len(seg["words"]) > 6:
            continue
        candidates.append(seg)
    if not candidates:
        return None
    candidates.sort(key=lambda s: (s["top"], abs(s["left"] - label_seg["left"])))
    for seg in candidates:
        tokens = _segment_tokens(seg)
        if not tokens:
            continue
        # Skip label-like rows so we do not mask labels such as "Public key".
        if {"private", "key"}.issubset(tokens) or {"public", "key"}.issubset(tokens):
            continue
        if {"sql", "user"}.issubset(tokens) or {"sql", "host"}.issubset(tokens) or {"sql", "port"}.issubset(tokens) or {"sql", "database"}.issubset(tokens):
            continue
        return seg
    return None


def _hit_filter(hits, match=None):
    if not match:
        return hits
    filtered = []
    text_re = re.compile(match["text_regex"], re.IGNORECASE) if match.get("text_regex") else None
    reason_in = {x for x in match.get("reason_in", [])}
    reason_contains = match.get("reason_contains")
    norm_in = {normalize_token(x) for x in match.get("norm_in", []) if normalize_token(x)}
    for hit in hits:
        if text_re and not text_re.search(hit.get("text", "")):
            continue
        if reason_in and hit.get("reason") not in reason_in:
            continue
        if reason_contains and reason_contains not in (hit.get("reason") or ""):
            continue
        if norm_in and normalize_token(hit.get("text", "")) not in norm_in:
            continue
        filtered.append(hit)
    return filtered


def _extract_inline_value_words(seg, label_tokens):
    label_norm = [normalize_token(x) for x in label_tokens if normalize_token(x)]
    words = sorted(seg["words"], key=lambda w: w["left"])
    norms = [normalize_token(w["text"]) for w in words]
    if not label_norm:
        return []

    last_label_idx = -1
    for idx in range(len(norms) - len(label_norm) + 1):
        if norms[idx : idx + len(label_norm)] == label_norm:
            last_label_idx = idx + len(label_norm) - 1
            break
    if last_label_idx < 0:
        last_label_idx = max((i for i, n in enumerate(norms) if n in set(label_norm)), default=-1)

    out = []
    for idx, word in enumerate(words):
        token = normalize_token(word["text"])
        if not token:
            continue
        if idx <= last_label_idx:
            continue
        if token in LABEL_WORDS:
            continue
        if token in SAFE_KEEP_TOKENS:
            continue
        if len(token) < 2 and not token.isdigit():
            continue
        out.append(word)
    return out


def _detect_rule_hits(rule, words, segments, item, image_size, allow_fallback, section_scopes=None):
    w, h = image_size
    fallback = item.get("fallback", {})
    fallback_rules = set(item.get("fallback_rules", []))
    force_fallback_rules = set(item.get("force_fallback_rules", []))
    scope_rects = _resolve_scope_rects(item, rule, w, h, section_scopes=section_scopes)
    scoped_words = _filter_words(words, scope_rects)
    scoped_segments = _filter_segments(segments, scope_rects)

    hits = []

    def plausible_word(word):
        if word["height"] <= 0 or word["width"] <= 0:
            return False
        width_ratio = word["width"] / max(1, w)
        height_ratio = word["height"] / max(1, h)
        norm = normalize_token(word["text"])
        if height_ratio > 0.22:
            return False
        if width_ratio > 0.52 and len(norm) < 10:
            return False
        return True

    def add_word_hit(word, reason="match"):
        if not plausible_word(word):
            return
        bbox = _shrink_bbox_for_sensitive_value(word_rect(word), word["text"], reason, (w, h))
        hits.append(
            {
                "rule": rule,
                "text": word["text"],
                "norm": word["norm"],
                "bbox": bbox,
                "conf": float(word["conf"]),
                "reason": reason,
                "word_id": word.get("id"),
            }
        )

    def add_segment_hit(seg, reason="match"):
        bbox = [seg["left"], seg["top"], seg["right"], seg["bottom"]]
        if (bbox[2] - bbox[0]) / max(1, w) > 0.58:
            return
        hits.append(
            {
                "rule": rule,
                "text": seg["text"],
                "norm": normalize_token(seg["text"]),
                "bbox": bbox,
                "conf": 0.0,
                "reason": reason,
                "word_id": None,
            }
        )

    def add_rect_hit(rect, reason="fallback", text="<fallback>"):
        hits.append({"rule": rule, "text": text, "norm": normalize_token(text), "bbox": rect, "conf": 0.0, "reason": reason, "word_id": None})

    if rule == "waw_badge":
        if allow_fallback and rule in force_fallback_rules and fallback.get("waw_badge"):
            fx0, fy0, fx1, fy1 = fallback["waw_badge"]
            add_rect_hit(clamp_rect([fx0 * w, fy0 * h, fx1 * w, fy1 * h], w, h))
            return hits
        for word in scoped_words:
            if word["top"] < int(0.24 * h) and WAW_RE.search(word["text"]):
                add_word_hit(word)
        if not hits and allow_fallback and rule in fallback_rules and fallback.get("waw_badge"):
            fx0, fy0, fx1, fy1 = fallback["waw_badge"]
            add_rect_hit(clamp_rect([fx0 * w, fy0 * h, fx1 * w, fy1 * h], w, h))

    elif rule == "footer_hostname":
        for word in scoped_words:
            if word["top"] >= int(0.78 * h) and HOST_RE.search(word["text"]):
                add_word_hit(word)
        if not hits and allow_fallback and rule in fallback_rules and fallback.get("footer_hostname"):
            fx0, fy0, fx1, fy1 = fallback["footer_hostname"]
            add_rect_hit(clamp_rect([fx0 * w, fy0 * h, fx1 * w, fy1 * h], w, h))

    elif rule == "hostname_any":
        for word in scoped_words:
            if HOST_RE.search(word["text"]):
                add_word_hit(word)
        if not hits and allow_fallback and rule in fallback_rules and fallback.get("hostname_any"):
            fx0, fy0, fx1, fy1 = fallback["hostname_any"]
            add_rect_hit(clamp_rect([fx0 * w, fy0 * h, fx1 * w, fy1 * h], w, h))

    elif rule == "ipv4_any":
        for word in scoped_words:
            txt = word["text"].strip("[](){}<>;,'\" ")
            if IP_RE.search(txt):
                add_word_hit(word)

    elif rule == "logs_identifiers":
        for word in scoped_words:
            if word["top"] < int(0.20 * h) or word["top"] > int(0.90 * h):
                continue
            txt = word["text"].strip("[](){}<>;,'\" ")
            norm = normalize_token(txt)
            if MAC_RE.search(txt):
                add_word_hit(word, "mac")
            elif re.fullmatch(r"\d{15,17}", norm):
                add_word_hit(word, "imei")
            elif len(norm) >= 10 and re.search(r"[0-9]", norm) and re.search(r"[a-f]", norm):
                add_word_hit(word, "hex_identifier")

    elif rule == "incoming_events_ids_ips":
        headers = [w for w in scoped_words if w["norm"] in {"puid", "uid", "ip"} and w["top"] < int(0.45 * h)]
        if headers:
            y_start = min(w["top"] + w["height"] for w in headers)
            y_end = int(0.94 * h)
            for seg in scoped_segments:
                if seg["top"] > y_start and "logout" in seg["text"].lower():
                    y_end = min(y_end, seg["top"] - 4)

            cols = []
            for header in headers:
                name = header["norm"]
                if name == "ip":
                    width = max(120, header["width"] + 140)
                else:
                    width = max(180, header["width"] + 210)
                cols.append((name, header["left"] - 20, header["left"] + width))

            for word in scoped_words:
                if not (y_start <= word["top"] <= y_end):
                    continue
                cx = word["left"] + word["width"] / 2
                token = normalize_token(word["text"])
                if not token:
                    continue
                for col_name, x0, x1 in cols:
                    if not (x0 <= cx <= x1):
                        continue
                    if col_name == "ip":
                        if IP_RE.search(word["text"]):
                            add_word_hit(word, "incoming_ip")
                    else:
                        digits = "".join(ch for ch in word["text"] if ch.isdigit())
                        if len(digits) >= 10:
                            add_word_hit(word, f"incoming_{col_name}")
                    break

    elif rule == "general_db_values":
        label_defs = [
            {"name": "sql_user", "tokens": ["sql", "user"], "segment_only": False, "max_y_gap": 60, "x_tolerance": 220},
            {"name": "sql_host", "tokens": ["sql", "host"], "segment_only": False, "max_y_gap": 60, "x_tolerance": 220},
            {"name": "sql_port", "tokens": ["sql", "port"], "segment_only": False, "max_y_gap": 60, "x_tolerance": 220},
            {"name": "sql_database", "tokens": ["sql", "database"], "segment_only": False, "max_y_gap": 60, "x_tolerance": 220},
            {"name": "private_key", "tokens": ["private", "key"], "segment_only": False, "max_y_gap": 48, "x_tolerance": 180},
            {"name": "public_key", "tokens": ["public", "key"], "segment_only": False, "max_y_gap": 48, "x_tolerance": 180},
        ]

        for label in label_defs:
            for label_seg in _find_label_segments(scoped_segments, label["tokens"]):
                inline_words = _extract_inline_value_words(label_seg, label["tokens"])
                for word in inline_words:
                    add_word_hit(word, f"{label['name']}_value")

                if inline_words:
                    continue

                value_seg = _find_value_segment(
                    label_seg,
                    scoped_segments,
                    max_y_gap=label.get("max_y_gap", 85),
                    x_tolerance=label.get("x_tolerance", 220),
                )
                if not value_seg:
                    continue
                if label["segment_only"]:
                    add_segment_hit(value_seg, reason=f"{label['name']}_value_seg")
                    continue
                for word in value_seg["words"]:
                    token = normalize_token(word["text"])
                    if not token:
                        continue
                    if token in LABEL_WORDS:
                        continue
                    if len(token) < 2 and not token.isdigit():
                        continue
                    add_word_hit(word, f"{label['name']}_value")

    elif rule == "api_ports":
        label_groups = [["https", "api", "port"], ["http", "api", "port"]]
        for tokens in label_groups:
            for label_seg in _find_label_segments(scoped_segments, tokens):
                value_seg = _find_value_segment(label_seg, scoped_segments, max_y_gap=90, x_tolerance=220)
                if not value_seg:
                    continue
                for word in value_seg["words"]:
                    token = normalize_token(word["text"])
                    if re.fullmatch(r"\d{2,5}", token):
                        value = int(token)
                        if 0 < value <= 65535:
                            add_word_hit(word, "api_port")

    elif rule == "db_ports":
        for label_seg in _find_label_segments(scoped_segments, ["sql", "port"]):
            value_seg = _find_value_segment(label_seg, scoped_segments, max_y_gap=95, x_tolerance=220)
            if not value_seg:
                continue
            for word in value_seg["words"]:
                token = normalize_token(word["text"])
                if re.fullmatch(r"\d{2,5}", token):
                    value = int(token)
                    if 0 < value <= 65535:
                        add_word_hit(word, "db_port")

    elif rule in {"receivers_ports", "receiver_ports"}:
        headers = [word for word in scoped_words if word["norm"] == "port" and word["top"] < int(0.72 * h)]
        for header in headers:
            x0 = header["left"] - 16
            x1 = header["left"] + max(110, header["width"] + 140)
            y0 = header["top"] + header["height"]
            y1 = int(0.95 * h)
            for word in scoped_words:
                if not (y0 <= word["top"] <= y1):
                    continue
                cx = word["left"] + word["width"] / 2
                if not (x0 <= cx <= x1):
                    continue
                if not re.fullmatch(r"\d{1,5}", word["norm"]):
                    continue
                value = int(word["norm"])
                if 0 < value <= 65535:
                    add_word_hit(word, "receiver_port")

    elif rule == "outputs_ip_whitelist":
        wl_seg = None
        for seg in scoped_segments:
            lt = seg["text"].lower()
            if "ip" in lt and "whitelist" in lt:
                wl_seg = seg
                break
        if wl_seg:
            x0 = wl_seg["left"] - 12
            x1 = wl_seg["right"] + 40
            y0 = wl_seg["bottom"]
            for word in scoped_words:
                if word["top"] <= y0:
                    continue
                cx = word["left"] + word["width"] / 2
                if not (x0 <= cx <= x1):
                    continue
                txt = word["text"].strip()
                if IP_RE.search(txt):
                    add_word_hit(word, "whitelist_ip")
                    continue
                # OCR often corrupts the last octet (for example "72.255.0.€").
                if re.search(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.[^\s]+", txt):
                    add_word_hit(word, "whitelist_ip_partial")
                    continue
                if re.search(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.$", txt):
                    add_word_hit(word, "whitelist_ip_partial")

    elif rule == "users_name_login_non_admin":
        name_headers = [w for w in scoped_words if w["norm"] == "name"]
        login_headers = [w for w in scoped_words if w["norm"] == "login"]
        if name_headers and login_headers:
            name_h = min(name_headers, key=lambda x: x["top"])
            login_h = min(login_headers, key=lambda x: x["top"])
            y_start = max(name_h["top"] + name_h["height"], login_h["top"] + login_h["height"]) + 2
            y_end = int(0.95 * h)

            for seg in scoped_segments:
                if seg["top"] > y_start and "add user" in seg["text"].lower():
                    y_end = min(y_end, seg["top"] - 4)

            name_x = (name_h["left"] - 20, name_h["left"] + max(180, name_h["width"] + 210))
            login_x = (login_h["left"] - 20, login_h["left"] + max(180, login_h["width"] + 210))
            allowed = {"admin", "administrator", "name", "login", "id", "password"}

            row_words = [w for w in scoped_words if y_start < w["top"] < y_end]
            rows = []
            for word in sorted(row_words, key=lambda x: (x["top"], x["left"])):
                cy = word["top"] + word["height"] / 2
                attached = False
                for row in rows:
                    if abs(cy - row["cy"]) <= max(8, int(row["avg_h"] * 0.55)):
                        row["words"].append(word)
                        row["cy"] = (row["cy"] * row["count"] + cy) / (row["count"] + 1)
                        row["avg_h"] = (row["avg_h"] * row["count"] + word["height"]) / (row["count"] + 1)
                        row["count"] += 1
                        attached = True
                        break
                if not attached:
                    rows.append({"words": [word], "cy": cy, "avg_h": float(word["height"]), "count": 1})

            for row in rows:
                name_login_words = []
                for word in row["words"]:
                    cx = word["left"] + word["width"] / 2
                    if name_x[0] <= cx <= name_x[1] or login_x[0] <= cx <= login_x[1]:
                        name_login_words.append(word)
                if not name_login_words:
                    continue
                row_norms = {normalize_token(w["text"]) for w in name_login_words}
                if "admin" in row_norms or "administrator" in row_norms:
                    continue
                for word in name_login_words:
                    token = normalize_token(word["text"])
                    # Ignore tiny OCR noise produced inside already-redacted cells.
                    if word["height"] < 8 or word["width"] < 12 or word["conf"] < 35:
                        continue
                    if len(token) < 3:
                        continue
                    if token and token not in allowed and not token.isdigit():
                        add_word_hit(word, "non_admin_identity")

    elif rule == "objects_uid_iccid":
        uid_headers = [w for w in scoped_words if w["norm"] == "uid"]
        iccid_headers = [w for w in scoped_words if w["norm"] == "iccid"]
        columns = []
        for header in uid_headers + iccid_headers:
            columns.append((header["left"] - 25, header["left"] + max(220, header["width"] + 230), header["top"] + header["height"]))

        for word in scoped_words:
            token = normalize_token(word["text"])
            raw_text = word["text"]
            digits = "".join(ch for ch in raw_text if ch.isdigit())
            raw_match = re.search(r"89\d{18,22}", raw_text)
            digits_match = re.search(r"89\d{18,22}", digits)
            if raw_match:
                bbox = _subrect_for_word_span(word, raw_match.start(), raw_match.end(), (w, h))
                hits.append(
                    {
                        "rule": rule,
                        "text": raw_text[raw_match.start() : raw_match.end()],
                        "norm": normalize_token(raw_text[raw_match.start() : raw_match.end()]),
                        "bbox": bbox,
                        "conf": float(word["conf"]),
                        "reason": "iccid_long",
                        "word_id": word.get("id"),
                    }
                )
                continue
            if digits_match:
                add_word_hit(word, "iccid_long")
                continue
            if len(token) < 8:
                continue
            if not re.search(r"\d{4,}", token):
                continue
            cx = word["left"] + word["width"] / 2
            for x0, x1, y0 in columns:
                if word["top"] > y0 and x0 <= cx <= x1:
                    add_word_hit(word, "uid_iccid")
                    break

    return hits


def detect_item_hits(item, words, segments, image_size, allow_fallback, rules_override=None):
    section_scopes = _build_section_scopes(item, segments, image_size[0], image_size[1])
    all_hits = []
    for rule in (rules_override if rules_override is not None else item.get("rules", [])):
        all_hits.extend(
            _detect_rule_hits(
                rule,
                words,
                segments,
                item,
                image_size,
                allow_fallback=allow_fallback,
                section_scopes=section_scopes,
            )
        )

    dedup = {}
    for hit in all_hits:
        x0, y0, x1, y1 = hit["bbox"]
        cx = (x0 + x1) / 2
        cy = (y0 + y1) / 2
        key = (
            hit["rule"],
            hit.get("reason", ""),
            hit.get("norm", ""),
            int(round(cx / 6)),
            int(round(cy / 6)),
        )
        current = dedup.get(key)
        if current is None:
            dedup[key] = hit
            continue
        curr_area = area(current["bbox"])
        new_area = area(hit["bbox"])
        curr_conf = float(current.get("conf", 0.0))
        new_conf = float(hit.get("conf", 0.0))
        if new_conf > curr_conf + 2.0:
            dedup[key] = hit
        elif abs(new_conf - curr_conf) <= 2.0 and new_area < curr_area:
            dedup[key] = hit
    return list(dedup.values())


def hits_to_rects(hits, image_size, padding):
    w, h = image_size
    rects = [expand_rect(hit["bbox"], padding, w, h) for hit in hits]
    return merge_rects(rects, gap=3)


def apply_masks(image, rects, fill):
    if not rects:
        return image
    draw = ImageDraw.Draw(image)
    for rect in rects:
        draw.rectangle(rect, fill=fill)
    return image


def analyze_geometry(rects, image_size, limits):
    w, h = image_size
    image_area = max(1, w * h)

    max_single = float(limits.get("max_single_ratio", 0.06))
    max_total = float(limits.get("max_total_ratio", 0.20))
    max_width = float(limits.get("max_width_ratio", 0.80))
    max_height = float(limits.get("max_height_ratio", 0.35))

    total_area = sum(area(r) for r in rects)
    total_ratio = total_area / image_area
    violations = []

    if total_ratio > max_total:
        violations.append(f"total mask ratio {total_ratio:.4f} > {max_total:.4f}")

    max_single_ratio = 0.0
    for rect in rects:
        single_ratio = area(rect) / image_area
        max_single_ratio = max(max_single_ratio, single_ratio)
        width_ratio = (rect[2] - rect[0]) / max(1, w)
        height_ratio = (rect[3] - rect[1]) / max(1, h)
        if single_ratio > max_single:
            violations.append(f"single mask ratio {single_ratio:.4f} > {max_single:.4f}")
        if width_ratio > max_width:
            violations.append(f"mask width ratio {width_ratio:.4f} > {max_width:.4f}")
        if height_ratio > max_height:
            violations.append(f"mask height ratio {height_ratio:.4f} > {max_height:.4f}")

    return {
        "total_ratio": total_ratio,
        "max_single_ratio": max_single_ratio,
        "limits": {
            "max_single_ratio": max_single,
            "max_total_ratio": max_total,
            "max_width_ratio": max_width,
            "max_height_ratio": max_height,
        },
        "violations": sorted(set(violations)),
    }


def check_protected_collisions(before_words, rects, protected_tokens):
    if not protected_tokens or not rects:
        return []
    protected_norm = {normalize_token(x) for x in protected_tokens if normalize_token(x)}
    collisions = []
    for word in before_words:
        if word["norm"] not in protected_norm:
            continue
        wrect = word_rect(word)
        for rect in rects:
            ov = intersection_area(wrect, rect)
            if ov <= 0:
                continue
            if ov / max(1, area(wrect)) < 0.12:
                continue
            if intersects(wrect, rect):
                collisions.append({"token": word["text"], "bbox": wrect, "mask": rect})
                break
    return collisions


def _mask_quality(rects, image_size):
    w, h = image_size
    items = []
    suspicious = []
    for idx, rect in enumerate(rects, start=1):
        rw = max(0, rect[2] - rect[0])
        rh = max(0, rect[3] - rect[1])
        ar = area(rect) / max(1, w * h)
        wr = rw / max(1, w)
        hr = rh / max(1, h)
        flags = []
        if wr > 0.96:
            flags.append("wide")
        if hr > 0.30:
            flags.append("tall")
        if ar > 0.15:
            flags.append("large")
        if flags:
            suspicious.append({"index": idx, "flags": flags, "bbox": rect})
        items.append(
            {
                "index": idx,
                "bbox": rect,
                "width": rw,
                "height": rh,
                "area_ratio": round(ar, 6),
                "width_ratio": round(wr, 6),
                "height_ratio": round(hr, 6),
                "flags": flags,
            }
        )
    return {"count": len(rects), "items": items, "suspicious": suspicious}


def _target_scope_rects(target, image_size):
    if not isinstance(target, dict):
        return None
    scope = target.get("scope")
    if not scope:
        return None
    w, h = image_size
    rects = []
    for rect in scope:
        if not isinstance(rect, list) or len(rect) != 4:
            continue
        if all(isinstance(x, (int, float)) for x in rect):
            if all(0 <= x <= 1 for x in rect):
                rects.append(clamp_rect([rect[0] * w, rect[1] * h, rect[2] * w, rect[3] * h], w, h))
            else:
                rects.append(clamp_rect(rect, w, h))
    return rects or None


def _words_in_scope(words, scopes):
    if not scopes:
        return list(words)
    return [w for w in words if _in_scope(w, scopes)]


def _collect_keep_target_words(words, segments, target, image_size):
    scopes = _target_scope_rects(target, image_size) if isinstance(target, dict) else None
    scoped_words = _words_in_scope(words, scopes)
    scoped_segments = _filter_segments(segments, scopes)

    if isinstance(target, str):
        target = {"phrase": target}
    if not isinstance(target, dict):
        return []

    if target.get("token"):
        tok = normalize_token(target["token"])
        return [w for w in scoped_words if w["norm"] == tok]

    if target.get("token_regex"):
        rgx = re.compile(target["token_regex"], re.IGNORECASE)
        return [w for w in scoped_words if rgx.search(w["text"])]

    if target.get("phrase"):
        ptoks = phrase_tokens(target["phrase"])
        if not ptoks:
            return []
        matches = []
        for seg in scoped_segments:
            words_sorted = sorted(seg["words"], key=lambda w: w["left"])
            norms = [normalize_token(w["text"]) for w in words_sorted]
            for idx in range(len(norms) - len(ptoks) + 1):
                if norms[idx : idx + len(ptoks)] == ptoks:
                    matches.extend(words_sorted[idx : idx + len(ptoks)])
            if matches:
                break
        if matches:
            return matches
        # fallback: all phrase tokens anywhere in scoped words
        token_set = set(ptoks)
        return [w for w in scoped_words if w["norm"] in token_set]

    return []


def _must_keep_visible(words, segments, target, image_size):
    matched = _collect_keep_target_words(words, segments, target, image_size)
    if isinstance(target, str):
        needed = phrase_tokens(target)
        present = {w["norm"] for w in matched}
        missing = [tok for tok in needed if tok not in present]
        return len(missing) == 0, missing, matched
    if isinstance(target, dict):
        if target.get("token"):
            tok = normalize_token(target["token"])
            ok = any(w["norm"] == tok for w in matched)
            return ok, ([] if ok else [tok]), matched
        if target.get("token_regex"):
            ok = len(matched) > 0
            return ok, ([] if ok else [target["token_regex"]]), matched
        if target.get("phrase"):
            needed = phrase_tokens(target["phrase"])
            present = {w["norm"] for w in matched}
            missing = [tok for tok in needed if tok not in present]
            return len(missing) == 0, missing, matched
    return True, [], matched


def _target_matches(target, item, words, segments, image_size):
    if isinstance(target, str):
        target = {"rule": target}
    if not isinstance(target, dict):
        return []
    rule = target.get("rule")
    if rule:
        hits = detect_item_hits(item, words, segments, image_size, allow_fallback=False, rules_override=[rule])
        return _hit_filter(hits, target.get("match"))

    token_regex = target.get("token_regex")
    if token_regex:
        rgx = re.compile(token_regex, re.IGNORECASE)
        out = []
        for word in words:
            if rgx.search(word["text"]):
                out.append(
                    {
                        "rule": "<token_regex>",
                        "text": word["text"],
                        "norm": word["norm"],
                        "bbox": word_rect(word),
                        "conf": float(word["conf"]),
                        "reason": "regex",
                    }
                )
        return out
    return []


def _pattern_to_regex(pattern):
    if isinstance(pattern, str):
        return re.compile(pattern)
    if isinstance(pattern, dict):
        flags = 0
        if "i" in str(pattern.get("flags", "")):
            flags |= re.IGNORECASE
        return re.compile(pattern.get("pattern", ""), flags=flags)
    return None


def _word_matches_pattern(word, pattern):
    rgx = _pattern_to_regex(pattern)
    if not rgx:
        return False
    return rgx.search(word.get("text", "")) is not None


def _find_pattern_hits(words, patterns):
    out = []
    for word in words:
        for pat in patterns:
            if _word_matches_pattern(word, pat):
                out.append(
                    {
                        "rule": "must_not_ocr",
                        "text": word["text"],
                        "norm": word["norm"],
                        "bbox": word_rect(word),
                        "conf": float(word["conf"]),
                        "reason": "must_not_ocr",
                        "word_id": word.get("id"),
                    }
                )
                break
    return out


def enforce_must_not_ocr(work_image, patterns, image_size, padding, max_passes=3):
    if not patterns:
        return [], []
    all_hits = []
    all_rects = []
    for _ in range(max_passes):
        words = collect_words(work_image.convert("RGB"))
        hits = _find_pattern_hits(words, patterns)
        if not hits:
            break
        rects = hits_to_rects(hits, image_size, padding=max(0, int(padding)))
        if not rects:
            break
        apply_masks(work_image, rects, fill="#E0E0E0")
        all_hits.extend(hits)
        all_rects.extend(rects)
    return all_hits, merge_rects(all_rects, gap=3)


def evaluate_requirements(req_item, item, before_words, before_segments, after_words, after_segments, image_size, masks):
    if not req_item:
        return {"status": "not_configured"}

    must_redact_results = []
    must_keep_results = []
    missed_targets = []
    forbidden_overlaps = []
    violations = []
    must_not_ocr_results = []

    for target in req_item.get("must_redact", []):
        tid = target.get("id") if isinstance(target, dict) else str(target)
        before_hits = _target_matches(target, item, before_words, before_segments, image_size)
        after_hits = _target_matches(target, item, after_words, after_segments, image_size)
        min_before = (target.get("min_before", 1) if isinstance(target, dict) else 1)
        max_after = (target.get("max_after", 0) if isinstance(target, dict) else 0)
        ok_before = len(before_hits) >= min_before
        ok_after = len(after_hits) <= max_after
        target_ok = ok_before and ok_after
        if not target_ok:
            missed_targets.append({"id": tid, "before_hits": len(before_hits), "after_hits": len(after_hits), "min_before": min_before, "max_after": max_after})
            violations.append(f"target:{tid} before={len(before_hits)} after={len(after_hits)}")
        must_redact_results.append(
            {
                "id": tid,
                "before_hits": len(before_hits),
                "after_hits": len(after_hits),
                "min_before": min_before,
                "max_after": max_after,
                "status": "ok" if target_ok else "failed",
            }
        )

    for target in req_item.get("must_keep_visible", []):
        label = target.get("id") if isinstance(target, dict) and target.get("id") else (target if isinstance(target, str) else "<target>")
        check_visible = True
        check_overlap = True
        if isinstance(target, dict) and target.get("check_visible") is False:
            check_visible = False
        if isinstance(target, dict) and target.get("check_overlap") is False:
            check_overlap = False
        if not check_visible:
            visible, missing, _ = (True, [], [])
        else:
            visible, missing, _ = _must_keep_visible(after_words, after_segments, target, image_size)
        overlap_words = _collect_keep_target_words(before_words, before_segments, target, image_size) if check_overlap else []
        overlaps = []
        for ow in overlap_words:
            wrect = word_rect(ow)
            for rect in masks:
                ov = intersection_area(wrect, rect)
                if ov <= 0:
                    continue
                if ov / max(1, area(wrect)) < 0.12:
                    continue
                if intersects(wrect, rect):
                    overlaps.append({"token": ow["text"], "bbox": wrect, "mask": rect})
                    break
        ok = visible and not overlaps
        if not ok:
            if not visible:
                violations.append(f"keep:{label} missing={','.join(missing)}")
            if overlaps:
                violations.append(f"keep:{label} overlaps={len(overlaps)}")
            forbidden_overlaps.extend(overlaps)
        must_keep_results.append(
            {
                "id": label,
                "visible": visible,
                "missing": missing,
                "overlaps": len(overlaps),
                "status": "ok" if ok else "failed",
            }
        )

    must_not_ocr_patterns = req_item.get("must_not_ocr", [])
    if isinstance(must_not_ocr_patterns, list) and must_not_ocr_patterns:
        residuals = _find_pattern_hits(after_words, must_not_ocr_patterns)
        must_not_ocr_results = [
            {
                "text": h["text"],
                "bbox": h["bbox"],
                "reason": h["reason"],
            }
            for h in residuals
        ]
        if residuals:
            violations.append(f"must_not_ocr:{len(residuals)}")

    # Rule expectations
    rule_expectations = req_item.get("rule_expectations", {}) if isinstance(req_item.get("rule_expectations"), dict) else {}
    min_masks = int(rule_expectations.get("min_masks", 0))
    max_masks = rule_expectations.get("max_masks")
    required_hits = rule_expectations.get("required_hits", [])
    allowed_zero = {x for x in rule_expectations.get("allowed_zero", [])}
    if len(masks) < min_masks:
        violations.append(f"min_masks:{len(masks)}<{min_masks}")
    if isinstance(max_masks, int) and len(masks) > max_masks:
        violations.append(f"max_masks:{len(masks)}>{max_masks}")

    required_hit_results = []
    for exp in required_hits:
        rule = exp.get("rule")
        if not rule:
            continue
        before_hits = detect_item_hits(item, before_words, before_segments, image_size, allow_fallback=False, rules_override=[rule])
        after_hits = detect_item_hits(item, after_words, after_segments, image_size, allow_fallback=False, rules_override=[rule])
        min_before = int(exp.get("min_before", 1))
        max_after = int(exp.get("max_after", 0))
        if rule in allowed_zero and len(before_hits) == 0:
            ok = len(after_hits) == 0
        else:
            ok = len(before_hits) >= min_before and len(after_hits) <= max_after
        if not ok:
            violations.append(f"rule:{rule} before={len(before_hits)} after={len(after_hits)}")
        required_hit_results.append(
            {
                "rule": rule,
                "before_hits": len(before_hits),
                "after_hits": len(after_hits),
                "min_before": min_before,
                "max_after": max_after,
                "status": "ok" if ok else "failed",
            }
        )

    return {
        "status": "ok" if not violations else "failed",
        "must_redact_passed": len(missed_targets) == 0,
        "must_keep_passed": all(x["status"] == "ok" for x in must_keep_results) if must_keep_results else True,
        "must_redact": must_redact_results,
        "must_keep_visible": must_keep_results,
        "must_not_ocr_residuals": must_not_ocr_results,
        "required_hits": required_hit_results,
        "missed_targets": missed_targets,
        "forbidden_overlaps": forbidden_overlaps,
        "violations": violations,
    }


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


def _draw_overlays(before_image, after_image, rects, overlay_path):
    overlay_path.parent.mkdir(parents=True, exist_ok=True)
    canvas = before_image.convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    fill = ImageColor.getrgb("#E57373") + (90,)
    border = ImageColor.getrgb("#C62828") + (220,)
    for rect in rects:
        draw.rectangle(rect, fill=fill, outline=border, width=2)

    merged = Image.new("RGB", (before_image.width * 2, before_image.height))
    merged.paste(canvas.convert("RGB"), (0, 0))
    merged.paste(after_image.convert("RGB"), (before_image.width, 0))
    save_image(merged, overlay_path)


def _draw_crops(before_image, after_image, rects, crop_dir, max_crops=16):
    crop_dir.mkdir(parents=True, exist_ok=True)
    for idx, rect in enumerate(rects[:max_crops], start=1):
        x0, y0, x1, y1 = rect
        pad = 16
        box = [max(0, x0 - pad), max(0, y0 - pad), min(before_image.width, x1 + pad), min(before_image.height, y1 + pad)]

        before_crop = before_image.crop(box)
        after_crop = after_image.crop(box)
        out = Image.new("RGB", (before_crop.width * 2 + 6, before_crop.height), "white")
        out.paste(before_crop, (0, 0))
        out.paste(after_crop, (before_crop.width + 6, 0))
        draw = ImageDraw.Draw(out)
        draw.rectangle([0, 0, before_crop.width - 1, before_crop.height - 1], outline="#B71C1C", width=2)
        draw.rectangle([before_crop.width + 6, 0, out.width - 1, out.height - 1], outline="#1B5E20", width=2)
        out.save(crop_dir / f"crop-{idx:02d}.png")


def _effective_geometry_limits(spec, item):
    base = spec.get("defaults", {}).get("geometry_limits", {})
    per_item = item.get("geometry_limits", {})
    merged = dict(base)
    merged.update(per_item)
    if not merged:
        merged = {
            "max_single_ratio": 0.06,
            "max_total_ratio": 0.20,
            "max_width_ratio": 0.80,
            "max_height_ratio": 0.35,
        }
    return merged


def _effective_protected_tokens(spec, item):
    merged = []
    for source in (spec.get("defaults", {}).get("protected_tokens", []), item.get("protected_tokens", [])):
        for token in source:
            if token not in merged:
                merged.append(token)
    return merged


def _effective_padding(spec, item):
    base = int(spec.get("style", {}).get("padding", 2))
    if isinstance(item.get("padding"), int):
        return max(0, int(item["padding"]))
    return max(0, base)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--spec", required=True)
    parser.add_argument("--max-passes", type=int, default=3)
    parser.add_argument("--emit-overlays", action="store_true")
    args = parser.parse_args()

    spec_path = Path(args.spec).resolve()
    repo_root = spec_path.parents[2]
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    requirements_by_path = _load_requirements(spec_path, spec)

    style_fill = spec.get("style", {}).get("fill", "#E0E0E0")
    review_root = repo_root / spec.get("review_dir", "artifacts/ui/ipcom5-redaction-review")
    before_root = review_root / "before"
    after_root = review_root / "after"
    overlays_root = review_root / "overlays"
    crops_root = review_root / "crops"
    before_root.mkdir(parents=True, exist_ok=True)
    after_root.mkdir(parents=True, exist_ok=True)

    report_items = []
    hard_failures = []

    for item in spec.get("items", []):
        rel_path = item["path"]
        image_path = repo_root / rel_path
        if not image_path.exists():
            hard_failures.append(f"Missing image: {rel_path}")
            continue

        before_path = before_root / rel_path
        after_path = after_root / rel_path
        before_path.parent.mkdir(parents=True, exist_ok=True)
        after_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(image_path, before_path)

        with Image.open(image_path) as src:
            base_image = src.convert("RGB")

        work_image = base_image.convert("RGBA")
        width, height = work_image.size

        before_words = collect_words(base_image)
        before_segments = build_segments(before_words)
        req_item = requirements_by_path.get(rel_path, {})

        all_rects = []
        pass_reports = []

        max_passes = int(item.get("max_passes", max(1, args.max_passes)))
        correction_rules = item.get("correction_rules")
        if correction_rules is not None and not isinstance(correction_rules, list):
            correction_rules = None

        for pass_index in range(1, max(1, max_passes) + 1):
            current_words = collect_words(work_image.convert("RGB"))
            current_segments = build_segments(current_words)
            active_rules = None
            if pass_index > 1 and correction_rules is not None:
                active_rules = correction_rules
            hits = detect_item_hits(
                item,
                current_words,
                current_segments,
                (width, height),
                allow_fallback=(pass_index == 1),
                rules_override=active_rules,
            )
            rects = hits_to_rects(hits, (width, height), padding=_effective_padding(spec, item))

            pass_reports.append(
                {
                    "index": pass_index,
                    "hit_count": len(hits),
                    "mask_count": len(rects),
                    "hits": [
                        {
                            "rule": h["rule"],
                            "text": h["text"],
                            "bbox": h["bbox"],
                            "conf": round(float(h["conf"]), 2),
                            "reason": h["reason"],
                        }
                        for h in hits
                    ],
                    "masks": rects,
                }
            )

            if not rects:
                break

            prev_len = len(all_rects)
            all_rects.extend(rects)
            all_rects = merge_rects(all_rects, gap=3)
            if len(all_rects) == prev_len and pass_index > 1:
                break

            apply_masks(work_image, rects, fill=style_fill)

        final_image = work_image.convert("RGB")
        enforced_hits = []
        enforced_rects = []
        must_not_ocr_patterns = req_item.get("must_not_ocr", []) if isinstance(req_item, dict) else []
        if isinstance(must_not_ocr_patterns, list) and must_not_ocr_patterns:
            enforced_hits, enforced_rects = enforce_must_not_ocr(
                work_image,
                must_not_ocr_patterns,
                (width, height),
                padding=max(0, _effective_padding(spec, item) - 1),
                max_passes=3,
            )
            if enforced_rects:
                all_rects.extend(enforced_rects)
                all_rects = merge_rects(all_rects, gap=3)
                final_image = work_image.convert("RGB")

        final_words = collect_words(final_image, min_conf=45.0)
        final_segments = build_segments(final_words)

        residual_hits = detect_item_hits(item, final_words, final_segments, (width, height), allow_fallback=False)
        residual_hits = [h for h in residual_hits if h.get("text") != "<fallback>"]

        limits = _effective_geometry_limits(spec, item)
        geometry = analyze_geometry(all_rects, (width, height), limits)
        protected = _effective_protected_tokens(spec, item)
        protected_collisions = check_protected_collisions(before_words, all_rects, protected)
        mask_quality = _mask_quality(all_rects, (width, height))
        requirements_result = evaluate_requirements(
            req_item,
            item,
            before_words,
            before_segments,
            final_words,
            final_segments,
            (width, height),
            all_rects,
        )

        critical = bool(item.get("critical", False))
        violations = []
        if residual_hits:
            violations.append(f"residual hits: {len(residual_hits)}")
        if geometry["violations"]:
            violations.extend(geometry["violations"])
        if protected_collisions:
            violations.append(f"protected token collisions: {len(protected_collisions)}")
        if mask_quality.get("suspicious"):
            violations.append(f"suspicious masks: {len(mask_quality['suspicious'])}")
        if requirements_result.get("status") == "failed":
            violations.extend([f"requirements: {x}" for x in requirements_result.get("violations", [])])

        if all_rects:
            save_image(final_image, image_path)
        shutil.copy2(image_path, after_path)

        if args.emit_overlays or critical:
            overlay_rel = Path(rel_path).with_suffix(".png")
            overlay_path = overlays_root / overlay_rel
            _draw_overlays(base_image, final_image, all_rects, overlay_path)
            _draw_crops(base_image, final_image, all_rects, crops_root / Path(rel_path).with_suffix(""))

        item_report = {
            "path": rel_path,
            "critical": critical,
            "image_size": [width, height],
            "rules": item.get("rules", []),
            "passes": pass_reports,
            "mask_count": len(all_rects),
            "masks": all_rects,
            "residuals": [
                {"rule": h["rule"], "text": h["text"], "bbox": h["bbox"], "conf": round(float(h["conf"]), 2), "reason": h["reason"]}
                for h in residual_hits
            ],
            "ocr_enforcement": {
                "hits": len(enforced_hits),
                "masks": enforced_rects,
            },
            "geometry": geometry,
            "mask_quality": mask_quality,
            "protected_collisions": protected_collisions,
            "requirements_result": requirements_result,
            "violations": violations,
            "status": "failed" if violations else "ok",
        }
        report_items.append(item_report)

        print(f"redacted: {rel_path} ({len(all_rects)} masks, {len(residual_hits)} residuals)")

        if violations:
            hard_failures.append(f"{rel_path}: {'; '.join(violations)}")

    report = {
        "summary": {
            "items": len(report_items),
            "failed": sum(1 for x in report_items if x["status"] != "ok"),
            "total_masks": sum(x["mask_count"] for x in report_items),
            "total_residuals": sum(len(x["residuals"]) for x in report_items),
        },
        "items": report_items,
    }

    report_path = review_root / "report.json"
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"report: {report_path}")

    if hard_failures:
        print("Redaction failures:")
        for failure in hard_failures:
            print(f"- {failure}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
