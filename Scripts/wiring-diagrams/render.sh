#!/usr/bin/env bash
# Render a wiring-diagram SVG to the WebP the manual uses, with system Chrome.
# Usage: Scripts/wiring-diagrams/render.sh <source.svg> <out.webp>
# The SVG's own width/height set the image size (1:1, like the other wiring diagrams).
set -euo pipefail
src="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
out="$2"
w=$(sed -n 's/.*<svg[^>]* width="\([0-9]*\)".*/\1/p' "$src" | head -1)
h=$(sed -n 's/.*<svg[^>]* height="\([0-9]*\)".*/\1/p' "$src" | head -1)
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size="$w,$h" \
  --screenshot="$tmp/out.png" "file://$src" >/dev/null 2>&1
cwebp -quiet -q 90 "$tmp/out.png" -o "$out"
echo "$out ${w}x${h}"
