#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-8012}"
SITE_DIR="${2:-site}"
BASE_URL="http://127.0.0.1:${PORT}"
LOG_FILE="$(mktemp -t manual-pdf-site.XXXXXX.log)"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "${SERVER_PID}" 2>/dev/null; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" 2>/dev/null || true
  fi
  rm -f "${LOG_FILE}"
}
trap cleanup EXIT

cd "${ROOT_DIR}"

if [[ ! -x "node_modules/.bin/playwright" ]]; then
  npm ci --silent
fi

PYTHON_BIN="python3"
if [[ -x ".venv/bin/python" ]]; then
  PYTHON_BIN=".venv/bin/python"
fi

"${PYTHON_BIN}" -m http.server "${PORT}" --bind 127.0.0.1 --directory "${SITE_DIR}" >"${LOG_FILE}" 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 120); do
  if curl -fsS "${BASE_URL}/" >/dev/null 2>&1; then
    break
  fi
  if ! kill -0 "${SERVER_PID}" 2>/dev/null; then
    cat "${LOG_FILE}"
    echo "Static site server exited before startup."
    exit 1
  fi
  sleep 0.25
done

if ! curl -fsS "${BASE_URL}/" >/dev/null 2>&1; then
  cat "${LOG_FILE}"
  echo "Timed out waiting for static site server startup."
  exit 1
fi

MANUAL_PDF_BASE_URL="${BASE_URL}" npm run test:manual-pdf-ui --silent
echo "Manual PDF UI checks passed on ${BASE_URL}."
