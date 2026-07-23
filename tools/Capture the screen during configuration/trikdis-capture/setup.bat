@echo off
echo Setting up TrikdisConfig Capture Tool...

where node >nul 2>&1 || (echo Node.js not found. Install from https://nodejs.org && pause && exit /b 1)

npm install
npx playwright install chromium

echo.
echo Setup complete. Run: node capture.js
pause
