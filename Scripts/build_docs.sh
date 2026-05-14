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

# On Netlify: wire pip and Playwright into the persistent cache directory.
# NETLIFY_CACHE_DIR survives across builds; nothing else in the build VM does.
if [[ -n "${NETLIFY_CACHE_DIR:-}" ]]; then
  export PIP_CACHE_DIR="${NETLIFY_CACHE_DIR}/pip"
  export PLAYWRIGHT_BROWSERS_PATH="${NETLIFY_CACHE_DIR}/playwright-browsers"
  echo "Netlify cache dir: ${NETLIFY_CACHE_DIR}"
fi

if [[ "${TRIKDOCS_INSTALL_DEPS:-0}" == "1" ]]; then
  "${PYTHON_BIN}" -m pip install --upgrade pip
  "${PYTHON_BIN}" -m pip install -r requirements.txt

  # Cache node_modules between Netlify builds keyed on package-lock.json hash.
  # Falls back to plain npm ci when not on Netlify or cache is stale.
  _NM_RESTORED=0
  if [[ -n "${NETLIFY_CACHE_DIR:-}" ]]; then
    _NM_CACHE="${NETLIFY_CACHE_DIR}/node_modules_cache"
    _LOCK_HASH=$("${PYTHON_BIN}" -c \
      "import hashlib; print(hashlib.md5(open('package-lock.json','rb').read()).hexdigest()[:16])" \
      2>/dev/null || echo "none")
    _CACHED_HASH=$(cat "${_NM_CACHE}/.lock_hash" 2>/dev/null || echo "")
    if [[ "${_LOCK_HASH}" == "${_CACHED_HASH}" && -d "${_NM_CACHE}/node_modules" ]]; then
      echo "Restoring node_modules from Netlify cache (lock hash: ${_LOCK_HASH})..."
      cp -a "${_NM_CACHE}/node_modules" node_modules
      _NM_RESTORED=1
    fi
  fi

  if [[ "${_NM_RESTORED}" == "0" ]]; then
    npm ci
    if [[ -n "${NETLIFY_CACHE_DIR:-}" ]]; then
      echo "Saving node_modules to Netlify cache..."
      rm -rf "${_NM_CACHE}"
      mkdir -p "${_NM_CACHE}"
      cp -a node_modules "${_NM_CACHE}/node_modules"
      echo "${_LOCK_HASH}" > "${_NM_CACHE}/.lock_hash"
    fi
  fi
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
