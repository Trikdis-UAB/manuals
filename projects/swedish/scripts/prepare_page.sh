#!/bin/bash
# Prepare docs/sv/<path> for translating docs/en/<path>: copy the page's images and other
# non-Markdown files. Screenshots stay English: the software has no Swedish interface.
# The Markdown itself is written by the translator, never copied here.
#
# Usage: prepare_page.sh "alarm-communicators/cellular/get/index.md"
# Afterwards check_structure.py reports any image the page uses that is still missing.
set -euo pipefail
cd "$(dirname "$0")/../../.."
rel="$1"
src_dir="docs/en/$(dirname "$rel")"
dst_dir="docs/sv/$(dirname "$rel")"
[ -f "docs/en/$rel" ] || { echo "no such EN page: docs/en/$rel" >&2; exit 1; }
mkdir -p "$dst_dir"

# Files next to the page.
find "$src_dir" -maxdepth 1 -type f ! -name '*.md' ! -name 'Icon*' ! -name '.DS_Store' \
  -exec cp -p {} "$dst_dir/" \;

# Asset-only subfolders (e.g. protegus-app/). A subfolder with its own Markdown is another
# manual and is prepared separately.
for sub in "$src_dir"/*/; do
  [ -d "$sub" ] || continue
  if ! find "$sub" -name '*.md' -print -quit | grep -q .; then
    name="$(basename "$sub")"
    mkdir -p "$dst_dir/$name"
    (cd "$sub" && find . -type f ! -name 'Icon*' ! -name '.DS_Store' -print0) |
      while IFS= read -r -d '' f; do
        mkdir -p "$dst_dir/$name/$(dirname "$f")"
        cp -p "$sub/$f" "$dst_dir/$name/$f"
      done
  fi
done

echo "prepared $dst_dir ($(find "$dst_dir" -maxdepth 2 -type f ! -name '*.md' | wc -l | tr -d ' ') asset files)"
