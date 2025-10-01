#!/bin/bash
# Update navigation and homepage automatically

set -e

echo "📁 Scanning docs/ directory..."
python3 update_navigation.py

echo ""
echo "📄 Generating homepage..."
python3 generate_homepage.py

echo ""
echo "✅ Done! Site configuration updated."
echo ""
echo "Next steps:"
echo "  • Preview: mkdocs serve"
echo "  • Deploy: git add . && git commit -m 'Add new manual' && git push"
