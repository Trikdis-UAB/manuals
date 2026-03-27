#!/usr/bin/env bash
# convert-images-to-webp.sh
# Converts all PNG/JPG/JPEG images in docs/ to WebP format
# and updates all references in markdown and config files.
#
# Usage: ./scripts/convert-images-to-webp.sh [--dry-run]
#
# Requirements: cwebp (brew install webp)

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="$REPO_DIR/docs"
DRY_RUN=false
QUALITY=90          # lossy quality for photos (0-100)
LOSSLESS_THRESHOLD=50000  # files under 50KB get lossless (icons, small diagrams)

if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "=== DRY RUN MODE — no files will be changed ==="
    echo
fi

# Verify cwebp is installed
if ! command -v cwebp &>/dev/null; then
    echo "ERROR: cwebp not found. Install with: brew install webp"
    exit 1
fi

echo "Docs directory: $DOCS_DIR"
echo

# ── Step 1: Convert image files ──────────────────────────────────────────────

converted=0
skipped=0
failed=0
saved_bytes=0

convert_file() {
    local src="$1"
    local base="${src%.*}"
    local dst="${base}.webp"

    # Skip if webp already exists
    if [[ -f "$dst" ]]; then
        ((skipped++)) || true
        return
    fi

    local src_size
    src_size=$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src" 2>/dev/null)

    # Choose lossless for small files (icons, tiny diagrams)
    local mode_flag
    if [[ "$src_size" -lt "$LOSSLESS_THRESHOLD" ]]; then
        mode_flag="-lossless"
    else
        mode_flag="-q $QUALITY"
    fi

    if $DRY_RUN; then
        ((converted++)) || true
        return
    fi

    if cwebp $mode_flag "$src" -o "$dst" -quiet 2>/dev/null; then
        local dst_size
        dst_size=$(stat -f%z "$dst" 2>/dev/null || stat -c%s "$dst" 2>/dev/null)
        local diff=$((src_size - dst_size))
        saved_bytes=$((saved_bytes + diff))
        ((converted++)) || true
    else
        echo "  [FAILED] $src"
        ((failed++)) || true
    fi
}

echo "=== Step 1: Converting image files to WebP ==="

total_images=$(find "$DOCS_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | wc -l | tr -d ' ')
echo "  Found $total_images images to convert..."
echo

progress=0
while IFS= read -r -d '' img; do
    convert_file "$img"
    ((progress++)) || true
    # Print progress every 500 files
    if (( progress % 500 == 0 )); then
        echo "  Progress: $progress / $total_images"
    fi
done < <(find "$DOCS_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)

echo
echo "  Converted: $converted"
echo "  Skipped (webp exists): $skipped"
echo "  Failed: $failed"
if ! $DRY_RUN && (( saved_bytes != 0 )); then
    echo "  Space saved: $(echo "scale=1; $saved_bytes / 1048576" | bc)MB"
fi
echo

# ── Step 2: Update references in markdown and config files ───────────────────

echo "=== Step 2: Updating image references ==="
echo

md_updated=0

# Update .md files in docs/
while IFS= read -r -d '' mdfile; do
    if grep -qE '\.(png|jpg|jpeg)' "$mdfile"; then
        if ! $DRY_RUN; then
            # Use [^a-z] instead of \b for macOS sed compatibility
            # Match .png/.jpg/.jpeg followed by non-alpha or end of line
            sed -i '' \
                -e 's/\.png\([^a-zA-Z]\)/.webp\1/g' \
                -e 's/\.png$/.webp/g' \
                -e 's/\.jpg\([^a-zA-Z]\)/.webp\1/g' \
                -e 's/\.jpg$/.webp/g' \
                -e 's/\.jpeg\([^a-zA-Z]\)/.webp\1/g' \
                -e 's/\.jpeg$/.webp/g' \
                "$mdfile"
        fi
        ((md_updated++)) || true
    fi
done < <(find "$DOCS_DIR" -type f -name "*.md" -print0)

echo "  Markdown files updated: $md_updated"

# Update mkdocs.yml (logo, favicon references)
yml_file="$REPO_DIR/mkdocs.yml"
if [[ -f "$yml_file" ]] && grep -qE '\.(png|jpg|jpeg)' "$yml_file"; then
    if ! $DRY_RUN; then
        sed -i '' \
            -e 's/\.png\([^a-zA-Z]\)/.webp\1/g' \
            -e 's/\.png$/.webp/g' \
            -e 's/\.jpg\([^a-zA-Z]\)/.webp\1/g' \
            -e 's/\.jpg$/.webp/g' \
            -e 's/\.jpeg\([^a-zA-Z]\)/.webp\1/g' \
            -e 's/\.jpeg$/.webp/g' \
            "$yml_file"
    fi
    echo "  mkdocs.yml updated"
fi
echo

# ── Step 3: Remove original files ────────────────────────────────────────────

echo "=== Step 3: Removing original PNG/JPG/JPEG files ==="

removed=0
kept=0

while IFS= read -r -d '' img; do
    img_base="${img%.*}"
    if [[ -f "${img_base}.webp" ]]; then
        if ! $DRY_RUN; then
            rm "$img"
        fi
        ((removed++)) || true
    else
        echo "  [KEPT - no webp] $img"
        ((kept++)) || true
    fi
done < <(find "$DOCS_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)

echo
echo "  Removed: $removed"
if (( kept > 0 )); then
    echo "  Kept (no webp counterpart): $kept"
fi
echo

# ── Summary ──────────────────────────────────────────────────────────────────

echo "════════════════════════════════════"
echo "  SUMMARY"
echo "════════════════════════════════════"
echo "  Images converted:       $converted"
echo "  Markdown files updated: $md_updated"
echo "  Original files removed: $removed"
if ! $DRY_RUN && (( saved_bytes > 0 )); then
    echo "  Total space saved:      $(echo "scale=1; $saved_bytes / 1048576" | bc)MB"
fi
echo "════════════════════════════════════"
echo
if $DRY_RUN; then
    echo "This was a dry run. Run without --dry-run to apply changes."
fi
