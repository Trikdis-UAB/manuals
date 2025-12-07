#!/bin/bash
# Find the latest English DOCX manual for a product

set -e

PRODUCT_DIR="$1"

if [ -z "$PRODUCT_DIR" ]; then
    echo "Usage: $0 <product-directory>"
    echo "Example: $0 /Volumes/TRIKDIS/PRODUKTAI/GET"
    exit 1
fi

# Check if directory exists
if [ ! -d "$PRODUCT_DIR" ]; then
    echo "Error: Directory does not exist: $PRODUCT_DIR"
    exit 1
fi

# Look for _EN directory
EN_DIR="${PRODUCT_DIR}/_EN"
if [ ! -d "$EN_DIR" ]; then
    echo "Error: English directory not found: $EN_DIR"
    exit 1
fi

# Find latest DOCX file (excluding temp files starting with ~$)
LATEST_DOCX=$(find "$EN_DIR" -maxdepth 1 -name "*.docx" ! -name "~\$*" -type f -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -1)

if [ -z "$LATEST_DOCX" ]; then
    echo "Error: No DOCX files found in: $EN_DIR"
    exit 1
fi

# Output the path
echo "$LATEST_DOCX"
