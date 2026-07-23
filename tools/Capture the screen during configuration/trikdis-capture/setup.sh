#!/bin/bash
echo "Setting up TrikdisConfig Capture Tool..."

command -v node >/dev/null 2>&1 || { echo "Node.js not found. Install from https://nodejs.org"; exit 1; }
node -e "if(parseInt(process.versions.node) < 18) { console.error('Node 18+ required'); process.exit(1); }"

npm install
npx playwright install chromium

echo ""
echo "Setup complete. Run: node capture.js"
