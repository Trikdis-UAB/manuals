#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT_DIR}"

CONTEXT_VALUE="${CONTEXT:-${NETLIFY_CONTEXT:-dev}}"
if [[ -z "${TRIKDOCS_PDF_DOWNLOADS:-}" ]]; then
  if [[ "${CONTEXT_VALUE}" == "production" ]]; then
    export TRIKDOCS_PDF_DOWNLOADS=1
  else
    export TRIKDOCS_PDF_DOWNLOADS=0
  fi
fi

export MKDOCS_PAGEFIND_AUTOINDEX="${MKDOCS_PAGEFIND_AUTOINDEX:-0}"
export TRIKDOCS_PDF_CONCURRENCY="${TRIKDOCS_PDF_CONCURRENCY:-2}"
export TRIKDOCS_CRISP_ENABLED="${TRIKDOCS_CRISP_ENABLED:-1}"
export TRIKDOCS_CRISP_PREVIEW_ONLY="${TRIKDOCS_CRISP_PREVIEW_ONLY:-1}"
export TRIKDOCS_CRISP_PREVIEW_QUERY="${TRIKDOCS_CRISP_PREVIEW_QUERY:-chat_preview}"

PYTHON_BIN="${PYTHON_BIN:-}"
if [[ -z "${PYTHON_BIN}" ]]; then
  if [[ -x ".venv/bin/python" ]]; then
    PYTHON_BIN=".venv/bin/python"
  else
    PYTHON_BIN="python3"
  fi
fi

if [[ "${PYTHON_BIN}" == */* ]]; then
  [[ -x "${PYTHON_BIN}" ]] || {
    echo "Python interpreter not found: ${PYTHON_BIN}" >&2
    exit 1
  }
else
  command -v "${PYTHON_BIN}" >/dev/null 2>&1 || {
    echo "Python interpreter not found in PATH: ${PYTHON_BIN}" >&2
    exit 1
  }
fi

export TRIKDOCS_PYTHON_BIN="${PYTHON_BIN}"

if [[ "${TRIKDOCS_INSTALL_DEPS:-0}" == "1" ]]; then
  "${PYTHON_BIN}" -m pip install --upgrade pip
  "${PYTHON_BIN}" -m pip install -r requirements.txt
  npm ci
fi

echo "Building docs for context='${CONTEXT_VALUE}' with PDFs='${TRIKDOCS_PDF_DOWNLOADS}'."

"${PYTHON_BIN}" generate_homepage.py
"${PYTHON_BIN}" -m mkdocs build --strict
quick_setup_product_args=(--site-dir site)
if [[ "${TRIKDOCS_PDF_DOWNLOADS}" == "1" ]]; then
  quick_setup_product_args+=(--require-blocks)
fi
"${PYTHON_BIN}" Scripts/check_quick_setup_product_images.py "${quick_setup_product_args[@]}"
npx -y pagefind --site site
"${PYTHON_BIN}" Scripts/check_search_scopes.py --site-dir site
node Scripts/check_pagefind_smoke.mjs --site site
node Scripts/check_ai_readiness.mjs --site site

if [[ "${TRIKDOCS_PDF_DOWNLOADS}" == "1" ]]; then
  [[ -x "node_modules/.bin/playwright" ]] || {
    echo "Missing Playwright dependencies. Run 'npm ci' or set TRIKDOCS_INSTALL_DEPS=1." >&2
    exit 1
  }
  npx playwright install chromium
  node Scripts/export_manual_pdfs.mjs --site site --manifest site/pdf-manifest.json
  "${PYTHON_BIN}" Scripts/check_manual_pdfs.py --site site --manifest site/pdf-manifest.json
  Scripts/check_manual_pdf_site.sh 8012 site
fi

echo "Docs build completed successfully."
