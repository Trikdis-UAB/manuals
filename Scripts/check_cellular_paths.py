#!/usr/bin/env python3
"""
Targeted check to ensure cellular manuals are under the cellular folder.
"""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
LANGS = ["en", "lt", "es", "ru"]
REQUIRED = ["get", "g16", "g16t"]


def main() -> int:
  errors = []
  for lang in LANGS:
    base = ROOT / "docs" / lang / "alarm-communicators"
    for name in REQUIRED:
      expected = base / "cellular" / name / "index.md"
      if not expected.exists():
        errors.append(f"Missing {expected.relative_to(ROOT)}")

    legacy_paths = [
      base / "dual-path" / "get",
      base / "g16",
      base / "g16t",
    ]
    for path in legacy_paths:
      if path.exists():
        errors.append(f"Legacy path still exists: {path.relative_to(ROOT)}")

  if errors:
    for error in errors:
      print(error, file=sys.stderr)
    return 1

  print("✅ Cellular manual paths are tidy.")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
