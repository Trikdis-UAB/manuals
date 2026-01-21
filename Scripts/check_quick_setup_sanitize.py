from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path("docs/en/alarm-communicators/cellular/quick-setup")
TARGET_DIRS = [
    ROOT / "dsc neo hs",
    ROOT / "dsc pc",
    ROOT / "honeywell vista",
    ROOT / "interlogix nx-4v2 nx-6v2",
    ROOT / "interlogix nx-8v2",
]

BAD_HEADING_RE = re.compile(r"^#{2,6}\\s+\\*\\*\\d+\\.\\*\\*")
BAD_IMAGE_SRC_RE = re.compile(r'src="\\./')


def main() -> int:
    errors: list[str] = []

    if ROOT.exists():
        for test_file in ROOT.rglob("test"):
            if test_file.is_file():
                errors.append(f"Unexpected test file: {test_file}")

    for base in TARGET_DIRS:
        if not base.exists():
            continue
        for path in base.rglob("*.md"):
            for idx, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
                if line.strip() == "[TOC]":
                    errors.append(f"{path}:{idx} contains [TOC]")
                if "<style>" in line or "</style>" in line:
                    errors.append(f"{path}:{idx} contains inline <style>")
                if BAD_HEADING_RE.match(line):
                    errors.append(f"{path}:{idx} has manual heading numbering")
                if BAD_IMAGE_SRC_RE.search(line):
                    errors.append(f"{path}:{idx} uses src=./ (should be ../ for assets)")

    if errors:
        print("Quick setup sanitation checks failed:")
        for err in errors:
            print(f"- {err}")
        return 1

    print("Quick setup sanitation checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
