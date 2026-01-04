#!/usr/bin/env python3
"""Generate mkdocs.yml navigation using doc_sources.csv metadata with two-tier categories."""

from __future__ import annotations

import csv
from collections import OrderedDict
from pathlib import Path
from typing import Union

import yaml

DOC_SOURCES_PATH = Path('/Users/local/projects/knowledgebase-conversion-pipeline/doc_sources.csv')
REPO_ROOT = Path(__file__).parent
DOCS_DIR = REPO_ROOT / 'docs'
MKDOCS_PATH = REPO_ROOT / 'mkdocs.yml'

LANGUAGE_LABELS = {
    'en': 'English',
    'es': 'Spanish',
    'lt': 'Lithuanian',
    'ru': 'Russian',
}

LANGUAGE_DIRS = {
    'en': 'en',
    'es': 'es',
    'lt': 'lt',
    'ru': 'ru',
}

PRODUCT_CATEGORY_DIR = {
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
    'SK_LCD_BUTTON': 'keypads',
    'SK_LED_BUTTON': 'keypads',
    'FLEXI_SK_LCD': 'keypads',
    'FLEXI_SK_LED': 'keypads',
}

PRODUCT_SLUG = {
    'GET': 'cellular/get',
    'GT': 'cellular/gt',
    'GT_PLUS': 'cellular/gt-plus',
    'FIRECOM': 'fire-panels/firecom',
    'E16': 'e16',
    'E16T': 'e16t',
    'G16': 'cellular/g16',
    'G16T': 'cellular/g16t',
    'G17F': 'fire-panels/g17f',
    'T16': 't16',
    'SP3': 'sp3',
    'CG17': 'cg17',
    'GATOR_CELL': 'gator',
    'GATOR_WIFI': 'gator-wifi',
    'SK_LCD_BUTTON': 'sk-lcd-button',
    'SK_LED_BUTTON': 'sk-led-button',
    'FLEXI_SK_LCD': 'flexi-sk-lcd',
    'FLEXI_SK_LED': 'flexi-sk-led',
}

TOP_LEVEL_LABELS = {
    'en': {
        'alarm-communicators': 'Communicators',
        'control-panels': 'Control Panels',
        'gate-controllers': 'Gate Controllers',
        'keypads': 'Keypads',
    },
    'es': {
        'alarm-communicators': 'Comunicadores',
        'control-panels': 'Paneles de control',
        'gate-controllers': 'Controladores',
        'keypads': 'Teclados',
    },
    'lt': {
        'alarm-communicators': 'Komunikatoriai',
        'control-panels': 'Apsaugos centrelės',
        'gate-controllers': 'Valdikliai',
        'keypads': 'Klaviatūros',
    },
    'ru': {
        'alarm-communicators': 'Коммуникаторы',
        'control-panels': 'Панели управления',
        'gate-controllers': 'Контроллеры',
        'keypads': 'Клавиатуры',
    },
}

SUBCATEGORY_CATEGORY_DIRS = {'alarm-communicators'}

NavItem = dict[str, str]
NavGroup = OrderedDict[str, list[NavItem]]
NavEntry = Union[NavGroup, list[NavItem]]
NavStructure = dict[str, OrderedDict[str, NavEntry]]


def build_nav_from_sources(csv_path: Path):
    nav: NavStructure = {}

    with csv_path.open('r', encoding='utf-8-sig') as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            product = row.get('product_code', '').strip()
            language = row.get('language', '').strip().lower()
            category_label = row.get('category', '').strip()
            product_name = row.get('product_name', '').strip()

            if not (product and language and category_label and product_name):
                continue

            lang_dir = LANGUAGE_DIRS.get(language)
            category_dir = PRODUCT_CATEGORY_DIR.get(product)
            slug = PRODUCT_SLUG.get(product)
            if not (lang_dir and category_dir and slug):
                continue

            md_path = DOCS_DIR / lang_dir / category_dir / slug / 'index.md'
            if not md_path.exists():
                continue

            top_label = TOP_LEVEL_LABELS.get(language, {}).get(
                category_dir, category_dir.replace('-', ' ').title()
            )

            lang_nav = nav.setdefault(language, OrderedDict())
            entry = {
                'title': product_name,
                'path': '/'.join(md_path.relative_to(DOCS_DIR).parts)
            }

            is_subcategorized = category_dir in SUBCATEGORY_CATEGORY_DIRS

            if is_subcategorized:
                top_nav = lang_nav.get(top_label)
                if top_nav is None or isinstance(top_nav, list):
                    # Initialize or convert to an OrderedDict for subcategories
                    top_nav = OrderedDict()
                    lang_nav[top_label] = top_nav
                manual_list = top_nav.setdefault(category_label, [])
                if entry not in manual_list:
                    manual_list.append(entry)
            else:
                top_nav = lang_nav.get(top_label)
                if top_nav is None:
                    lang_nav[top_label] = [entry]
                elif isinstance(top_nav, list):
                    if entry not in top_nav:
                        top_nav.append(entry)
                else:
                    flattened: list[dict[str, str]] = []
                    for manuals in top_nav.values():
                        for manual in manuals:
                            if manual not in flattened:
                                flattened.append(manual)
                    if entry not in flattened:
                        flattened.append(entry)
                    lang_nav[top_label] = flattened


    return nav


def update_mkdocs(nav_structure):
    with MKDOCS_PATH.open('r', encoding='utf-8') as fh:
        config = yaml.safe_load(fh)

    new_nav = [{'Home': 'index.md'}]

    for language, top_categories in nav_structure.items():
        lang_label = LANGUAGE_LABELS.get(language, language.upper())
        communicator_label = TOP_LEVEL_LABELS.get(language, {}).get('alarm-communicators')
        lang_section = []
        for top_label, value in top_categories.items():
            if isinstance(value, list):
                items = [{manual['title']: manual['path']} for manual in value]
                lang_section.append({top_label: items})
            elif communicator_label and top_label != communicator_label:
                items = []
                for manuals in value.values():
                    items.extend({manual['title']: manual['path']} for manual in manuals)
                lang_section.append({top_label: items})
            else:
                sub_entries = []
                for sub_label, manuals in value.items():
                    items = [{manual['title']: manual['path']} for manual in manuals]
                    sub_entries.append({sub_label: items})
                lang_section.append({top_label: sub_entries})
        new_nav.append({lang_label: lang_section})

    config['nav'] = new_nav

    with MKDOCS_PATH.open('w', encoding='utf-8') as fh:
        yaml.dump(config, fh, sort_keys=False, allow_unicode=True, default_flow_style=False)

    total = 0
    for top_categories in nav_structure.values():
        for value in top_categories.values():
            if isinstance(value, list):
                total += len(value)
            else:
                for manuals in value.values():
                    total += len(manuals)
    print(f"✓ Updated {MKDOCS_PATH}")
    print(f"  Found {total} manual(s) across {len(nav_structure)} language(s)")


def main() -> None:
    if not DOC_SOURCES_PATH.exists():
        raise SystemExit(f"doc_sources.csv not found at {DOC_SOURCES_PATH}")

    nav_structure = build_nav_from_sources(DOC_SOURCES_PATH)
    if not nav_structure:
        raise SystemExit('No manuals found when scanning doc_sources.csv')

    update_mkdocs(nav_structure)


if __name__ == '__main__':
    main()
