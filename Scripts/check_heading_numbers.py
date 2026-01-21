from __future__ import annotations

import re
import sys
from pathlib import Path


def main() -> int:
    target = Path("site/en/control-panels/cg17/index.html")
    if not target.exists():
        print(f"Missing build output: {target}")
        return 1

    html = target.read_text(encoding="utf-8")
    if not re.search(r"<h2[^>]*>\s*\d+\.\s", html):
        print("Heading numbering not found in CG17 manual output.")
        return 1

    print("Heading numbering found in CG17 manual output.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
