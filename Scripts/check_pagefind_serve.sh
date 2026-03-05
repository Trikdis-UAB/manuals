#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-8011}"
BASE_URL="http://127.0.0.1:${PORT}"
LOG_FILE="$(mktemp -t mkdocs-serve-pagefind.XXXXXX.log)"

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
  npm install --silent
fi

".venv/bin/mkdocs" serve --dev-addr "127.0.0.1:${PORT}" --strict >"${LOG_FILE}" 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 240); do
  if grep -q "Serving on ${BASE_URL}/" "${LOG_FILE}"; then
    break
  fi
  if ! kill -0 "${SERVER_PID}" 2>/dev/null; then
    cat "${LOG_FILE}"
    echo "mkdocs serve exited before startup."
    exit 1
  fi
  sleep 0.5
done

if ! grep -q "Serving on ${BASE_URL}/" "${LOG_FILE}"; then
  cat "${LOG_FILE}"
  echo "Timed out waiting for mkdocs serve startup."
  exit 1
fi

curl -fsS "${BASE_URL}/pagefind/pagefind.js" >/dev/null
PAGEFIND_BASE_URL="${BASE_URL}" npm run test:search-ui --silent

echo "Serve-mode Pagefind checks passed on ${BASE_URL}."
