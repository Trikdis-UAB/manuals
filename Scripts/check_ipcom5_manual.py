from __future__ import annotations

from pathlib import Path
import struct


BASE = Path(__file__).resolve().parents[1] / "docs" / "en" / "receivers" / "ipcom5control"
DOC = BASE / "index.md"

REQUIRED_IMAGES = {
    "image3.png": (1500, 700),
    "token-expiration-time.png": (1200, 600),
    "edit-scopes.png": (600, 400),
    "step-users-tab.png": (1100, 250),
    "step-password-list.png": (1100, 400),
    "step-show-passwords.png": (1100, 250),
    "step-write-settings.png": (1100, 250),
    "step-add-user.png": (800, 600),
    "step-fill-fields.png": (1100, 150),
    "step-scopes-row.png": (1500, 150),
    "step-visible-receivers-row.png": (1500, 120),
    "step-visible-receivers.png": (1200, 1500),
}
LANDSCAPE_MIN_WIDTH = 1100
LANDSCAPE_MIN_RATIO = 1.4


def assert_order(text: str, first: str, second: str) -> None:
    first_idx = text.find(first)
    second_idx = text.find(second)
    if first_idx == -1 or second_idx == -1:
        raise RuntimeError(f"Missing expected text for order check: '{first}' or '{second}'.")
    if first_idx >= second_idx:
        raise RuntimeError(f"Order check failed: '{first}' should appear before '{second}'.")


def main() -> None:
    if not DOC.exists():
        raise RuntimeError(f"Missing manual: {DOC}")

    text = DOC.read_text(encoding="utf-8")

    if "# IPCom (v.5) Control web" not in text:
        raise RuntimeError("Manual title missing or incorrect.")

    assert_order(
        text,
        "Run the IPCOM .exe application.",
        "Create and save connections to different receivers.",
    )
    assert_order(
        text,
        "Enter your username and password in the login window.",
        "Press the Login button.",
    )

    if "Check the box to see passwords" not in text:
        raise RuntimeError("Show passwords note missing.")

    lines = text.splitlines()
    for idx, line in enumerate(lines):
        if "Check the box to see passwords" in line:
            prev_idx = idx - 1
            while prev_idx >= 0 and not lines[prev_idx].strip():
                prev_idx -= 1
            prev = lines[prev_idx] if prev_idx >= 0 else ""
            if not prev.lstrip().startswith("!!! note"):
                raise RuntimeError("Show passwords note should be an admonition.")

    if "Create individual user accounts with limited rights" not in text:
        raise RuntimeError("Final NOTE callout missing.")
    if "Safety note" not in text:
        raise RuntimeError("Safety note callout missing.")

    for name, (min_w, min_h) in REQUIRED_IMAGES.items():
        path = BASE / name
        if not path.exists():
            raise RuntimeError(f"Missing required image: {path}")
        with path.open("rb") as handle:
            signature = handle.read(8)
            if signature != b"\x89PNG\r\n\x1a\n":
                raise RuntimeError(f"Image {name} is not a valid PNG.")
            _length = handle.read(4)
            chunk_type = handle.read(4)
            if chunk_type != b"IHDR":
                raise RuntimeError(f"Image {name} missing IHDR chunk.")
            width, height = struct.unpack(">II", handle.read(8))
        if width > height and (width / height) >= LANDSCAPE_MIN_RATIO and width < LANDSCAPE_MIN_WIDTH:
            raise RuntimeError(
                f"Image {name} is landscape and too narrow: {width}px (min {LANDSCAPE_MIN_WIDTH}px)."
            )
        if width < min_w or height < min_h:
            raise RuntimeError(
                f"Image {name} too small: {width}x{height} (min {min_w}x{min_h})."
            )

    print("✅ IPCom5 manual checks passed")


if __name__ == "__main__":
    main()
