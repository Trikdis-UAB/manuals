#!/usr/bin/env python3
"""Generate homepage index from mkdocs.yml nav structure."""

import yaml
from pathlib import Path

def format_nav_item(item, level=0):
    """Format a single navigation item as markdown."""

    if isinstance(item, str):
        # Simple string item (like 'index.md')
        return ""
    elif isinstance(item, dict):
        lines = []
        for key, value in item.items():
            if isinstance(value, str):
                # Page link: "Title: path/to/page.md"
                lines.append(f"- [{key}]({value})")
            elif isinstance(value, list):
                # Section with children
                if level == 0:
                    lines.append(f"## {key}\n")
                else:
                    lines.append(f"### {key}\n")
                for child in value:
                    child_lines = format_nav_item(child, level + 1)
                    if child_lines:
                        lines.append(child_lines)
        return "\n".join(lines)
    return ""

def generate_homepage():
    """Generate homepage content from mkdocs.yml nav."""

    # Read mkdocs.yml
    mkdocs_path = Path(__file__).parent / "mkdocs.yml"
    with open(mkdocs_path, 'r') as f:
        config = yaml.safe_load(f)

    # Start building content
    content = """---
hide:
  - toc
---

# TRIKDIS Product Documentation

**Languages:** [English](#english) | [Lietuvių](#lietuviu) | [Español](#espanol) | [Русский](#russian)

---

"""

    # Process navigation items (skip Home page)
    nav_items = config.get('nav', [])
    for item in nav_items:
        if isinstance(item, dict):
            for key, value in item.items():
                if key != "Home":  # Skip Home page itself
                    content += format_nav_item({key: value})
                    content += "\n\n"

    content += """---

## How to Use This Site

- **Browse by category** - Use the navigation menu on the left
- **Search** - Click the search icon in the header
- **Download PDF** - Available on individual manual pages

**Need support?** Visit [www.trikdis.com](https://www.trikdis.com) or contact your local distributor.
"""

    # Write to index.md
    index_path = Path(__file__).parent / "docs" / "index.md"
    with open(index_path, 'w') as f:
        f.write(content)

    print(f"✓ Generated {index_path}")

if __name__ == "__main__":
    generate_homepage()
