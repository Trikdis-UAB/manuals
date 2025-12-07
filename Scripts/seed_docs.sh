#!/usr/bin/env bash
set -euo pipefail

ORG=Trikdis
PROD_REPO=manuals
STG_REPO=manuals-darbiniai
DOM_PROD=docs.trikdis.com
DOM_STG=docs-darbiniai.trikdis.com

seed_repo () {
  local REPO="$1" DOMAIN="$2" SITENAME="$3"

  rm -rf "$REPO"
  git clone "git@github.com:$ORG/$REPO.git"
  cd "$REPO"

  mkdir -p docs/manual .github/workflows

  cat > mkdocs.yml <<YAML
site_name: $SITENAME
site_url: https://$DOMAIN
theme:
  name: material
  features:
    - navigation.instant
nav:
  - Home: index.md
  - First Manual: manual/index.md
YAML

  cat > docs/index.md <<'MD'
# TRIKDIS Manuals
Welcome. This site is built with MkDocs Material.
MD

  cat > docs/manual/index.md <<'MD'
# First Manual
Getting started content goes here.
MD

  cat > .github/workflows/deploy.yml <<YAML
name: Deploy docs
on:
  push:
    branches: [ main ]
permissions:
  contents: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.x'
      - run: pip install mkdocs mkdocs-material
      - run: mkdocs build --strict
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
          cname: $DOMAIN
YAML

  git add .
  git commit -m "seed: mkdocs + gh-pages deploy"
  git branch -M main || true
  git push -u origin main

  cd ..
}

seed_repo "$PROD_REPO" "$DOM_PROD" "TRIKDIS Manuals (Public)"
seed_repo "$STG_REPO" "$DOM_STG" "TRIKDIS Manuals (Darbiniai)"
