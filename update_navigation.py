#!/usr/bin/env python3
"""Automatically update mkdocs.yml navigation from docs/ directory structure."""

import csv
import yaml
from pathlib import Path
import re

DOC_SOURCES_PATH = Path('/Users/local/projects/knowledgebase-conversion-pipeline/doc_sources.csv')

PRODUCT_CATEGORY_MAP = {
    'GT': 'alarm-communicators',
    'GT_PLUS': 'alarm-communicators',
    'GET': 'alarm-communicators',
    'FIRECOM': 'alarm-communicators',
    'E16': 'alarm-communicators',
    'E16T': 'alarm-communicators',
    'G16': 'alarm-communicators',
    'G16T': 'alarm-communicators',
    'G17F': 'alarm-communicators',
    'T16': 'alarm-communicators',
    'SP3': 'control-panels',
    'CG17': 'control-panels',
    'GATOR_CELL': 'gate-controllers',
    'GATOR_WIFI': 'gate-controllers',
}

LANGUAGE_LABELS = {
    'en': 'English',
    'lt': 'Lithuanian',
    'es': 'Spanish',
    'ru': 'Russian'
}



def load_category_labels(csv_path: Path):
    """Create mapping of language/category folder to display label using doc_sources.csv."""

    labels = {}
    if not csv_path.exists():
        return labels

    with csv_path.open('r', encoding='utf-8-sig') as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            product = row.get('product_code', '').strip()
            language = row.get('language', '').strip()
            category_text = row.get('category', '').strip()

            folder = PRODUCT_CATEGORY_MAP.get(product)
            if not folder or not language or not category_text:
                continue

            labels.setdefault(language, {})
            labels[language].setdefault(folder, category_text)

    return labels

def get_title_from_markdown(md_path):
    """Extract the first H1 heading from a markdown file."""
    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            for line in f:
                # Look for # Heading or H1 in frontmatter
                if line.startswith('# '):
                    return line[2:].strip()
        # Fallback to filename
        return md_path.parent.name.replace('-', ' ').title()
    except Exception:
        return md_path.parent.name.replace('-', ' ').title()

def scan_docs_directory(docs_path, category_labels):
    """Scan docs directory and build navigation structure grouped by language."""

    categories = {
        'alarm-communicators': 'Alarm Communicators',
        'control-panels': 'Control Panels',
        'gate-controllers': 'Gate Controllers',
        'controllers': 'Controllers',
        'keypads': 'Keypads',
        'wireless-sensors': 'Wireless Sensors',
        'receivers': 'Receivers',
        'accessories': 'Accessories',
        'monitoring-software': 'Monitoring Software',
    }

    nav_structure = {}

    for index_file in docs_path.rglob('index.md'):
        # Skip top-level docs/index.md and assets
        rel_parts = index_file.relative_to(docs_path).parts
        if len(rel_parts) < 2:
            continue

        language = rel_parts[0]
        category_key = rel_parts[1] if len(rel_parts) > 1 else ''

        # Ignore non-manual directories
        if language in {'images', 'stylesheets', 'javascripts', 'preview'}:
            continue

        category_name = category_labels.get(language, {}).get(
            category_key,
            categories.get(category_key, category_key.replace('-', ' ').title() or 'Manuals')
        )

        title = get_title_from_markdown(index_file)
        nav_structure.setdefault(language, {})
        nav_structure[language].setdefault(category_name, [])
        nav_structure[language][category_name].append({
            'title': title,
            'path': '/'.join(index_file.relative_to(docs_path).parts)
        })

    return nav_structure

def update_mkdocs_nav(mkdocs_path, nav_structure):
    """Update the nav section in mkdocs.yml.

    CRITICAL: This function only updates the 'nav' section.
    It preserves all other configuration, especially:

    plugins:
      - search
      - add-number:
          order: 2           # Start numbering from H2 (skip H1)
          strict_mode: false # Required for proper numbering - DO NOT CHANGE!
          excludes:
            - index.md

    This is the ONLY working configuration for heading numbering.
    NEVER change order or strict_mode!
    """

    with open(mkdocs_path, 'r') as f:
        config = yaml.safe_load(f)

    # Build new nav structure
    new_nav = [
        {'Home': 'index.md'}
    ]

    for language, categories in sorted(nav_structure.items(), key=lambda x: x[0]):
        lang_label = LANGUAGE_LABELS.get(language, language.upper())
        lang_section = []
        for category, manuals in sorted(categories.items()):
            category_items = []
            for manual in sorted(manuals, key=lambda x: x['title']):
                category_items.append({manual['title']: manual['path']})
            lang_section.append({category: category_items})
        new_nav.append({lang_label: lang_section})

    # Update config
    config['nav'] = new_nav

    # Write back to file
    with open(mkdocs_path, 'w') as f:
        yaml.dump(config, f, sort_keys=False, allow_unicode=True, default_flow_style=False)

    print(f"✓ Updated {mkdocs_path}")

    # Print summary
    total_manuals = sum(len(manual) for lang in nav_structure.values() for manual in lang.values())
    print(f"  Found {total_manuals} manual(s) across {len(nav_structure)} language(s):")
    for language, categories in sorted(nav_structure.items(), key=lambda x: x[0]):
        print(f"    - {language}: {sum(len(m) for m in categories.values())} manual(s)")
        for category, manuals in sorted(categories.items()):
            print(f"        * {category}: {len(manuals)} manual(s)")
            for manual in sorted(manuals, key=lambda x: x['title']):
                print(f"            • {manual['title']}")

def main():
    """Main function."""
    script_dir = Path(__file__).parent
    docs_path = script_dir / 'docs'
    mkdocs_path = script_dir / 'mkdocs.yml'

    print("Scanning docs directory...")
    category_labels = load_category_labels(DOC_SOURCES_PATH)
    nav_structure = scan_docs_directory(docs_path, category_labels)

    if not nav_structure:
        print("⚠ No manuals found in docs/")
        return

    print("\nUpdating mkdocs.yml...")
    update_mkdocs_nav(mkdocs_path, nav_structure)

    print("\nDone! Run 'python3 generate_homepage.py' to update the homepage.")

if __name__ == "__main__":
    main()
