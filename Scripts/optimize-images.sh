#!/bin/bash
# Optimize images for web and A4 print
# Max width: 1200px (good for 150 DPI A4 print, ~8 inches wide)
# Quality: 85% (good balance between quality and file size)

set -e

TARGET_DIR="${1:-.}"
MAX_WIDTH=1200
QUALITY=85

echo "🖼️  Optimizing images in: $TARGET_DIR"
echo "📏 Max width: ${MAX_WIDTH}px"
echo "🎨 Quality: ${QUALITY}%"
echo ""

# Count images
TOTAL=$(find "$TARGET_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | wc -l | tr -d ' ')
echo "Found $TOTAL images"
echo ""

OPTIMIZED=0
SKIPPED=0
TOTAL_SAVED=0

# Process each image
find "$TARGET_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r img; do
  # Get current size
  BEFORE_SIZE=$(stat -f%z "$img")
  BEFORE_KB=$((BEFORE_SIZE / 1024))

  # Get current dimensions
  WIDTH=$(sips -g pixelWidth "$img" | grep pixelWidth | awk '{print $2}')

  # Skip if already small enough
  if [ "$WIDTH" -le "$MAX_WIDTH" ]; then
    echo "⏭️  $(basename "$img") - Already optimal (${WIDTH}px, ${BEFORE_KB}KB)"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Create backup
  cp "$img" "${img}.bak"

  # Resize and optimize
  if [[ "$img" == *.png ]]; then
    # PNG: Resize, then optimize with pngquant if available
    sips -Z "$MAX_WIDTH" "$img" >/dev/null 2>&1

    if command -v pngquant &> /dev/null; then
      pngquant --quality=80-95 --force --ext .png "$img" >/dev/null 2>&1 || true
    fi
  else
    # JPG: Resize with quality setting
    sips -Z "$MAX_WIDTH" -s format jpeg -s formatOptions "$QUALITY" "$img" >/dev/null 2>&1
  fi

  # Get new size
  AFTER_SIZE=$(stat -f%z "$img")
  AFTER_KB=$((AFTER_SIZE / 1024))
  SAVED_KB=$((BEFORE_KB - AFTER_KB))
  SAVED_PCT=$(( (BEFORE_SIZE - AFTER_SIZE) * 100 / BEFORE_SIZE ))

  # Get new width
  NEW_WIDTH=$(sips -g pixelWidth "$img" | grep pixelWidth | awk '{print $2}')

  echo "✅ $(basename "$img") - ${WIDTH}px→${NEW_WIDTH}px, ${BEFORE_KB}KB→${AFTER_KB}KB (saved ${SAVED_KB}KB, -${SAVED_PCT}%)"

  OPTIMIZED=$((OPTIMIZED + 1))
  TOTAL_SAVED=$((TOTAL_SAVED + SAVED_KB))

  # Remove backup if optimization was successful
  rm "${img}.bak"
done

echo ""
echo "📊 Summary:"
echo "   Optimized: $OPTIMIZED images"
echo "   Skipped: $SKIPPED images"
echo "   Total saved: $((TOTAL_SAVED / 1024))MB"
echo ""
echo "✨ Done!"
