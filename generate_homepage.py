#!/usr/bin/env python3
"""Generate the custom homepage layout used on docs.trikdis.com."""
from pathlib import Path

def generate_homepage():
    """Write the custom homepage content to docs/index.md."""

    # Static homepage content tailored for the new UX
    content_en = """---
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
    content_lt = """---
hide:
  - toc
class: language-home
---

# Diegimo instrukcijos

<style>
  nav[aria-label=\"Table of contents\"] {
    display: none !important;
  }
</style>

<div class=\"nav-callout\" role=\"note\">
  <span class=\"nav-callout__icon\" aria-hidden=\"true\">
    <svg viewBox=\"0 0 24 24\" focusable=\"false\" aria-hidden=\"true\">
      <path d=\"M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z\" />
    </svg>
  </span>
  <span class=\"nav-callout__text\">Naudokite kairėje esantį meniu, kad rastumėte instrukcijas pagal produktą.</span>
  <span class=\"nav-callout__text--mobile\">Naudokite ☰ meniu, kad rastumėte instrukcijas pagal produktą.</span>
</div>

### Greiti veiksmai

- Naudokite paiešką, kad greitai rastumėte modelį ar raktažodį.
- Keiskite kalbą antraštėje.

### Kas naujo / Ar žinojote

- Greitas diegimas per programėlę – įrenginius galima pridėti ir nustatyti per kelias minutes (QR pagrindu).

### Naudingi resursai

- [Trikdis Support](https://www.trikdis.com/lt/pagalbos-uzklausa/) — užregistruokite užklausą arba kreipkitės į pagalbą.
- [Find a distributor](https://www.trikdis.com/all-distributors/) — susisiekite su regioniniu partneriu dėl mokymų ir sertifikavimo.
"""
    content_es = """---
hide:
  - toc
class: language-home
---

# Manuales de instalación

<style>
  nav[aria-label=\"Table of contents\"] {
    display: none !important;
  }
</style>

<div class=\"nav-callout\" role=\"note\">
  <span class=\"nav-callout__icon\" aria-hidden=\"true\">
    <svg viewBox=\"0 0 24 24\" focusable=\"false\" aria-hidden=\"true\">
      <path d=\"M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z\" />
    </svg>
  </span>
  <span class=\"nav-callout__text\">Usa el menú de la izquierda para buscar manuales por producto.</span>
  <span class=\"nav-callout__text--mobile\">Usa el menú ☰ para buscar manuales por producto.</span>
</div>

### Acciones rápidas

- Usa la búsqueda para ir directamente a un modelo o palabra clave.
- Cambia el idioma desde el encabezado.

### Novedades / ¿Sabías que?

- Instalación rápida desde la app: registra y configura dispositivos en minutos (con QR).

### Recursos útiles

- [Trikdis Support](https://www.trikdis.com/es/solicitud-de-soporte/) — abre un ticket o contacta con soporte.
- [Find a distributor](https://www.trikdis.com/es/distribuidores/) — contacta con un socio regional para formación y certificación.
"""
    content_ru = """---
hide:
  - toc
class: language-home
---

# Руководства по установке

<style>
  nav[aria-label=\"Table of contents\"] {
    display: none !important;
  }
</style>

<div class=\"nav-callout\" role=\"note\">
  <span class=\"nav-callout__icon\" aria-hidden=\"true\">
    <svg viewBox=\"0 0 24 24\" focusable=\"false\" aria-hidden=\"true\">
      <path d=\"M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z\" />
    </svg>
  </span>
  <span class=\"nav-callout__text\">Используйте меню слева, чтобы найти руководство по продукту.</span>
  <span class=\"nav-callout__text--mobile\">Используйте меню ☰, чтобы найти руководство по продукту.</span>
</div>

### Быстрые действия

- Используйте поиск, чтобы быстро перейти к модели или ключевому слову.
- Переключайте язык в заголовке.

### Новое / Полезно знать

- Быстрая установка через приложение — добавляйте и настраивайте устройства за несколько минут (QR-онбординг).

### Полезные ресурсы

- [Trikdis Support](https://www.trikdis.com/ru/podderzhka/) — создайте запрос или свяжитесь со службой поддержки.
- [Find a distributor](https://www.trikdis.com/ru/distribyutory/) — свяжитесь с региональным партнёром по обучению и сертификации.
"""

    docs_dir = Path(__file__).parent / "docs"
    targets = [
        (docs_dir / "index.md", content_en),
        (docs_dir / "en" / "index.md", content_en),
        (docs_dir / "lt" / "index.md", content_lt),
        (docs_dir / "es" / "index.md", content_es),
        (docs_dir / "ru" / "index.md", content_ru),
    ]
    for target, content in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        with open(target, "w") as f:
            f.write(content)
        print(f"✓ Generated {target}")

if __name__ == "__main__":
    generate_homepage()
