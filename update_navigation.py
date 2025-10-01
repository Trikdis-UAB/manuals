#!/usr/bin/env python3
"""Automatically update mkdocs.yml navigation from docs/ directory structure."""

import yaml
from pathlib import Path
import re

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

def scan_docs_directory(docs_path):
    """Scan docs directory and build navigation structure."""

    # Define category mapping (can be extended)
    categories = {
        'alarm-communicators': 'Alarm Communicators',
        'control-panels': 'Control Panels',
        'controllers': 'Controllers',
        'keypads': 'Keypads',
        'wireless-sensors': 'Wireless Sensors',
        'receivers': 'Receivers',
        'accessories': 'Accessories',
        'monitoring-software': 'Monitoring Software',
    }

    nav_structure = {}

    # Scan for manual directories (containing index.md)
    for item in docs_path.iterdir():
        if item.is_dir() and item.name not in ['images', 'stylesheets', 'javascripts']:
            index_file = item / 'index.md'
            if index_file.exists():
                # Get title from markdown file
                title = get_title_from_markdown(index_file)

                # Determine category (use manual directory name pattern)
                # For now, treat everything as alarm communicators
                # You can extend this logic based on folder structure
                category = 'Alarm Communicators'

                # Check if folder name suggests a category
                folder_name = item.name.lower()
                for cat_key, cat_name in categories.items():
                    if cat_key in folder_name:
                        category = cat_name
                        break

                if category not in nav_structure:
                    nav_structure[category] = []

                nav_structure[category].append({
                    'title': title,
                    'path': f'{item.name}/index.md'
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

    # Add English section with all categories
    english_section = {}
    for category, manuals in sorted(nav_structure.items()):
        category_items = []
        for manual in sorted(manuals, key=lambda x: x['title']):
            category_items.append({manual['title']: manual['path']})
        english_section[category] = category_items

    new_nav.append({'English': [english_section]})

    # Update config
    config['nav'] = new_nav

    # Write back to file
    with open(mkdocs_path, 'w') as f:
        yaml.dump(config, f, sort_keys=False, allow_unicode=True, default_flow_style=False)

    print(f"✓ Updated {mkdocs_path}")

    # Print summary
    total_manuals = sum(len(manuals) for manuals in nav_structure.values())
    print(f"  Found {total_manuals} manual(s) in {len(nav_structure)} category(ies):")
    for category, manuals in sorted(nav_structure.items()):
        print(f"    - {category}: {len(manuals)} manual(s)")
        for manual in sorted(manuals, key=lambda x: x['title']):
            print(f"      • {manual['title']}")

def main():
    """Main function."""
    script_dir = Path(__file__).parent
    docs_path = script_dir / 'docs'
    mkdocs_path = script_dir / 'mkdocs.yml'

    print("Scanning docs directory...")
    nav_structure = scan_docs_directory(docs_path)

    if not nav_structure:
        print("⚠ No manuals found in docs/")
        return

    print("\nUpdating mkdocs.yml...")
    update_mkdocs_nav(mkdocs_path, nav_structure)

    print("\nDone! Run 'python3 generate_homepage.py' to update the homepage.")

if __name__ == "__main__":
    main()
