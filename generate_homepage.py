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

# Installation Manuals

<style>
  nav[aria-label=\"Table of contents\"] {
    display: none !important;
  }
</style>

Use the menu on the left to browse manuals by product.

<div class=\"nav-callout\" role=\"note\">
  <span class=\"nav-callout__icon\" aria-hidden=\"true\">
    <svg viewBox=\"0 0 24 24\" focusable=\"false\" aria-hidden=\"true\">
      <path d=\"M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z\" />
    </svg>
  </span>
  <span class=\"nav-callout__text\">Use the menu on the left to browse manuals by product.</span>
  <span class=\"nav-callout__text--mobile\">Use the ☰ menu to browse manuals by product.</span>
</div>

### Quick actions

- Use Search to jump straight to a model or keyword.
- Switch language from the header.

### What's new / Did you know

- Quick installation via the app - enroll and set up devices in minutes using the mobile app (QR-based onboarding).

### Helpful resources

- [Trikdis Support](https://www.trikdis.com/support-ticket/) — open a ticket or contact the help desk.
- [Find a distributor](https://www.trikdis.com/all-distributors/) — connect with a regional partner for training and certification.
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
