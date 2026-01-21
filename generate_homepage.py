#!/usr/bin/env python3
"""Generate the custom homepage layout used on docs.trikdis.com."""
from pathlib import Path

def generate_homepage():
    """Write the custom homepage content to docs/index.md."""

    # Static homepage content tailored for the new UX
    content = """---
hide:
  - toc
class: language-home
---

# <span id=\"welcome-message\" lang=\"en\">Welcome! Pick your language:</span>

<style>
  nav[aria-label=\"Table of contents\"] {
    display: none !important;
  }
</style>

<div class=\"language-grid\">
  <a class=\"language-card\" data-lang=\"en\" href=\"/en/\" lang=\"en\">English</a>
  <a class=\"language-card\" data-lang=\"lt\" href=\"/lt/\" lang=\"lt\">Lietuvių</a>
  <a class=\"language-card\" data-lang=\"es\" href=\"/es/\" lang=\"es\">Español</a>
</div>

## Find your manual fast

Installers can jump straight to the right document by using the search icon in the header or browsing the navigation tabs. Each manual includes PDF downloads, wiring diagrams, and configuration notes.

## Quick actions

- **Search the library** with product codes or keywords from wiring diagrams.
- **Switch languages** using the cards above.
- **Need help?** Reach the support team through the links in the top-right corner.

## Helpful resources

- [Trikdis Support](https://www.trikdis.com/support-ticket/) — open a support ticket or reach the help desk.
- [Find a distributor](https://www.trikdis.com/all-distributors/) — connect with a regional partner for training or certification updates.
"""

    docs_dir = Path(__file__).parent / "docs"
    targets = [
        docs_dir / "index.md",
        docs_dir / "en" / "index.md",
    ]
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        with open(target, "w") as f:
            f.write(content)
        print(f"✓ Generated {target}")

if __name__ == "__main__":
    generate_homepage()
