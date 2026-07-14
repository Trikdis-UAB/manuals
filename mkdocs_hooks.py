"""
MkDocs hooks to normalize GitHub-style callouts for markdown-callouts.
"""

from __future__ import annotations

import html
import json
import logging
import os
import re
import shutil
import subprocess
import unicodedata
from collections import defaultdict
from pathlib import Path, PurePosixPath
from typing import Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import quote, urlparse

from mkdocs import plugins as mkdocs_plugins
from mkdocs_add_number_plugin.plugin import AddNumberPlugin

CALLOUT_RE = re.compile(r"^(?P<indent>\s*)>\s*\[!(?P<kind>[A-Z]+)\]\s*(?P<rest>.*)$")
NUMBERED_H2_RE = re.compile(r"^##\s+\d+\.")
LOGGER = logging.getLogger("mkdocs.hooks.manuals")
PDF_DOWNLOAD_ENABLED_VALUES = {"1", "true", "yes", "on"}
CRISP_ENABLED_VALUES = {"1", "true", "yes", "on"}
CRISP_CONFIG_SCRIPT_ID = "trikdocs-crisp-config"
DEFAULT_CRISP_WEBSITE_ID = "dbcf7c35-45bf-4a74-be56-7113429a5cb1"
DEFAULT_CRISP_PREVIEW_QUERY = "chat_preview"
PDF_DOWNLOAD_LABELS = {
    "en": "Download PDF",
    "lt": "Atsisiųsti PDF",
    "es": "Descargar PDF",
    "ru": "Скачать PDF",
}
PDF_DOWNLOAD_ORIGINAL_LABELS = {
    "en": "Download original PDF",
    "lt": "Atsisiųsti originalų PDF",
    "es": "Descargar PDF original",
    "ru": "Скачать оригинальный PDF",
}
INVALID_FILENAME_CHARS_RE = re.compile(r'[\\/:*?"<>|]+')
NON_ALNUM_RE = re.compile(r"[^a-z0-9]+")
H1_RE = re.compile(r"<h1\b[^>]*>(?P<content>.*?)</h1>", re.IGNORECASE | re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")
PDF_ACTION_RE = re.compile(
    r'(<div class="trik-pdf-download" data-manual-pdf-download>.*?</div>)',
    re.IGNORECASE | re.DOTALL,
)
PAGEFIND_SEARCH_CONTEXT_RE = re.compile(
    r'(<div class="trik-pagefind-search-context" data-pagefind-search-context="true".*?</div>)',
    re.IGNORECASE | re.DOTALL,
)
ETHERNET_QUICK_SETUP_RE = re.compile(
    r"^alarm-communicators/ethernet/quick-setup/(?P<communicator>e16t?)(?:/(?P<leaf>[^/]+))?/index\.md$",
    re.IGNORECASE,
)
PAGEFIND_SEARCH_CONTEXT_STYLE = (
    "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;white-space:normal;"
)
PAGEFIND_SEARCH_CONTEXT_WEIGHT = "8"
SP3_VARIANT_ALIASES = (
    "TX-SP3_3E",
    "TX-SP3_200",
    "TX-SP3_44E",
    "TX-SP3_24E",
    "SP3_3E",
    "SP3_200",
    "SP3_44E",
    "SP3_24E",
    "FLEXi SP3 Ethernet",
    "FLEXi SP3 WiFi",
    "FLEXi SP3 Ethernet 4G LTE",
    "FLEXi SP3 WiFi 4G LTE",
)
_PDF_MANIFEST_ENTRIES: List[Dict[str, str]] = []
_PDF_MANIFEST_KEYS: Set[Tuple[str, str]] = set()


class SearchScopeResolver:
    """Resolve page search scopes for language, manual, and subcategory."""

    def __init__(self):
        self._initialized = False
        self._languages: Set[str] = set()
        self._manual_scope_by_src: Dict[str, str] = {}
        self._subcategory_scope_by_src: Dict[str, str] = {}

    def _scope_from_parts(self, language: str, parts: Iterable[str]) -> str:
        encoded_parts = [quote(language, safe="")] + [quote(part, safe="") for part in parts if part]
        return "/" + "/".join(encoded_parts) + "/"

    def _scope_from_src_path(self, src_path: str) -> str:
        parts = src_path.split("/")
        language = parts[0]
        page_parts = parts[1:]
        if not page_parts:
            return self._scope_from_parts(language, [])

        filename = page_parts[-1]
        if filename.lower() == "index.md":
            return self._scope_from_parts(language, page_parts[:-1])

        stem = PurePosixPath(filename).stem
        return self._scope_from_parts(language, [*page_parts[:-1], stem])

    def _languages_from_config(self, config) -> Set[str]:
        alternates = (config.get("extra", {}) or {}).get("alternate", [])
        return {alt.get("lang") for alt in alternates if alt.get("lang")}

    def _build_index_directories(self, docs_dir: Path) -> Dict[str, Set[Tuple[str, ...]]]:
        index_dirs: Dict[str, Set[Tuple[str, ...]]] = defaultdict(set)
        for index_file in docs_dir.rglob("index.md"):
            rel_path = index_file.relative_to(docs_dir).as_posix()
            parts = rel_path.split("/")
            if len(parts) < 2:
                continue
            language = parts[0]
            if language not in self._languages:
                continue
            index_dirs[language].add(tuple(parts[1:-1]))
        return index_dirs

    def _compute_manual_scope(self, src_path: str, index_dirs: Dict[str, Set[Tuple[str, ...]]]) -> str:
        parts = src_path.split("/")
        language = parts[0]
        page_parts = parts[1:]
        if not page_parts:
            return self._scope_from_parts(language, [])

        filename = page_parts[-1]
        directory_parts = page_parts[:-1]

        candidates = []
        if filename.lower() == "index.md":
            candidates.append(tuple(directory_parts))
        for depth in range(len(directory_parts), 0, -1):
            candidates.append(tuple(directory_parts[:depth]))

        seen = set()
        for candidate in candidates:
            if not candidate or candidate in seen:
                continue
            seen.add(candidate)
            if candidate in index_dirs.get(language, set()):
                return self._scope_from_parts(language, candidate)

        return self._scope_from_src_path(src_path)

    def _scope_parts_without_language(self, scope: str, language: str) -> Tuple[str, ...]:
        trimmed = scope.strip("/")
        if not trimmed:
            return tuple()
        parts = trimmed.split("/")
        if not parts:
            return tuple()
        if parts[0] == language:
            return tuple(parts[1:])
        return tuple(parts)

    def _initialize(self, config):
        if self._initialized:
            return

        docs_dir = Path(config["docs_dir"])
        self._languages = self._languages_from_config(config)
        index_dirs = self._build_index_directories(docs_dir)

        source_pages = []
        for source_file in docs_dir.rglob("*.md"):
            src_path = source_file.relative_to(docs_dir).as_posix()
            parts = src_path.split("/")
            if len(parts) < 2:
                continue
            language = parts[0]
            if language not in self._languages:
                continue
            source_pages.append(src_path)

        for src_path in source_pages:
            self._manual_scope_by_src[src_path] = self._compute_manual_scope(src_path, index_dirs)

        manual_counts: Dict[Tuple[str, Tuple[str, ...]], Set[str]] = defaultdict(set)
        for src_path, manual_scope in self._manual_scope_by_src.items():
            language = src_path.split("/")[0]
            manual_parts = self._scope_parts_without_language(manual_scope, language)
            for depth in range(1, len(manual_parts)):
                ancestor = manual_parts[:depth]
                manual_counts[(language, ancestor)].add(manual_scope)

        for src_path, manual_scope in self._manual_scope_by_src.items():
            language = src_path.split("/")[0]
            manual_parts = self._scope_parts_without_language(manual_scope, language)
            subcategory_scope = self._scope_from_parts(language, [])

            for depth in range(len(manual_parts) - 1, 0, -1):
                ancestor = manual_parts[:depth]
                if depth == 1 or len(manual_counts[(language, ancestor)]) > 1:
                    subcategory_scope = self._scope_from_parts(language, ancestor)
                    break

            self._subcategory_scope_by_src[src_path] = subcategory_scope

        self._initialized = True

    def get_scopes(self, page, config) -> Optional[Dict[str, str]]:
        if not page or not getattr(page, "file", None):
            return None

        src_path = page.file.src_path
        parts = src_path.split("/")
        if len(parts) < 2:
            return None

        language = parts[0]
        self._initialize(config)
        if language not in self._languages:
            return None

        return {
            "language": language,
            "manual": self._manual_scope_by_src.get(src_path, self._scope_from_src_path(src_path)),
            "subcategory": self._subcategory_scope_by_src.get(src_path, self._scope_from_parts(language, [])),
        }


_SCOPE_RESOLVER = SearchScopeResolver()


def _language_locales(config) -> List[str]:
    return [
        alt.get("lang")
        for alt in (config.get("extra", {}) or {}).get("alternate", [])
        if alt.get("lang")
    ]


def _should_number_headings(page, markdown: str, config) -> bool:
    if not page or not getattr(page, "file", None):
        return False

    src_path = page.file.src_path
    if src_path == "index.md":
        return False

    locales = _language_locales(config)
    if any(src_path == f"{locale}/index.md" for locale in locales):
        return False

    if any(src_path.startswith(f"{locale}/faq/") for locale in locales):
        return False

    return not any(NUMBERED_H2_RE.match(line) for line in markdown.splitlines())


def _apply_heading_numbers(page, markdown: str) -> str:
    plugin = AddNumberPlugin()
    plugin.load_config(
        {
            "order": 2,
            "strict_mode": False,
            "excludes": [],
            "includes": [],
            "increment_pages": False,
            "increment_topnav": False,
        }
    )
    plugin.files_str = [page.file.src_path]
    plugin._order = plugin.config["order"] - 1
    return plugin.on_page_markdown(markdown, page, None, None)


def normalize_github_callouts(markdown: str) -> str:
    lines = markdown.splitlines()
    for idx, line in enumerate(lines):
        match = CALLOUT_RE.match(line)
        if not match:
            continue
        indent = match.group("indent")
        kind = match.group("kind")
        rest = match.group("rest").strip()
        if rest:
            lines[idx] = f"{indent}> {kind}: {rest}"
        else:
            lines[idx] = f"{indent}> {kind}:"
    return "\n".join(lines)


def on_page_markdown(markdown: str, page, config, files):
    markdown = normalize_github_callouts(markdown)
    if _should_number_headings(page, markdown, config):
        markdown = _apply_heading_numbers(page, markdown)
    return markdown


def on_pre_build(config):
    i18n_plugin = config.plugins.get("i18n")
    if i18n_plugin and getattr(i18n_plugin, "building", False):
        return

    _PDF_MANIFEST_ENTRIES.clear()
    _PDF_MANIFEST_KEYS.clear()


def _build_scope_marker(scopes: Dict[str, str]) -> str:
    filter_value = (
        "lang[data-language-scope],"
        "manual[data-manual-scope],"
        "subcategory[data-subcategory-scope]"
    )
    attributes = {
        "class": "pagefind-scope-marker",
        "hidden": "hidden",
        "aria-hidden": "true",
        "data-pagefind-filter": filter_value,
        "data-language-scope": scopes["language"],
        "data-manual-scope": scopes["manual"],
        "data-subcategory-scope": scopes["subcategory"],
    }
    serialized = " ".join(
        f'{name}="{html.escape(value, quote=True)}"' for name, value in attributes.items()
    )
    return f"<div {serialized}></div>"


def _pdf_downloads_enabled() -> bool:
    return os.environ.get("TRIKDOCS_PDF_DOWNLOADS", "0").strip().lower() in PDF_DOWNLOAD_ENABLED_VALUES


def _crisp_flag(name: str, default: str) -> bool:
    return os.environ.get(name, default).strip().lower() in CRISP_ENABLED_VALUES


def _crisp_config_payload(config) -> Dict[str, object]:
    website_id = os.environ.get("TRIKDOCS_CRISP_WEBSITE_ID", DEFAULT_CRISP_WEBSITE_ID).strip()
    preview_query = os.environ.get("TRIKDOCS_CRISP_PREVIEW_QUERY", DEFAULT_CRISP_PREVIEW_QUERY).strip()
    site_url = (config.get("site_url") or "").strip()
    host = urlparse(site_url).hostname or "docs.trikdis.com"
    locales = [locale for locale in _language_locales(config) if locale and locale != "xx"]

    return {
        "enabled": _crisp_flag("TRIKDOCS_CRISP_ENABLED", "1") and bool(website_id),
        "websiteId": website_id,
        "previewOnly": _crisp_flag("TRIKDOCS_CRISP_PREVIEW_ONLY", "1"),
        "previewQuery": preview_query or DEFAULT_CRISP_PREVIEW_QUERY,
        "host": host,
        "locales": locales,
    }


def _build_crisp_config_script(config) -> str:
    payload = json.dumps(_crisp_config_payload(config), ensure_ascii=False)
    return f'<script id="{CRISP_CONFIG_SCRIPT_ID}" type="application/json">{payload}</script>'


def _inject_crisp_config(html_content: str, config) -> str:
    if CRISP_CONFIG_SCRIPT_ID in html_content:
        return html_content
    return html_content + _build_crisp_config_script(config)


def _page_original_pdf(page) -> Optional[str]:
    """Return the original PDF filename from page front matter ``pdf:`` key, or None.

    When set, the download button will link to this pre-existing file in the page's
    own directory instead of a generated PDF.  Useful for EOL products where the
    original PDF manual contains content (e.g. callout overlays, EMF images) that
    the automated conversion cannot reproduce.

    Usage in page front matter::

        ---
        pdf: rl14-original.pdf
        ---
    """
    meta = getattr(page, "meta", {}) or {}
    value = meta.get("pdf")
    return str(value).strip() if value else None


def _page_route(page) -> str:
    route = (getattr(page, "url", "") or "").strip("/")
    return "/" if not route else f"/{route}/"


def _is_language_landing_page(src_path: str, config) -> bool:
    return src_path in {f"{locale}/index.md" for locale in _language_locales(config)}


def _is_pdf_eligible(page, config) -> bool:
    if not page or not getattr(page, "file", None):
        return False

    src_path = page.file.src_path
    if src_path == "index.md" or _is_language_landing_page(src_path, config):
        return False

    route = _page_route(page)
    if not any(route.startswith(f"/{locale}/") for locale in _language_locales(config)):
        return False

    if "/receivers/ipcom/" in route:
        return False

    # Pages with an original PDF bundled via front matter always show the button,
    # regardless of the TRIKDOCS_PDF_DOWNLOADS env flag (no generation needed).
    if _page_original_pdf(page):
        return True

    return _pdf_downloads_enabled()


def _pdf_label(page) -> str:
    src_path = getattr(getattr(page, "file", None), "src_path", "")
    language = src_path.split("/", 1)[0] if "/" in src_path else "en"
    return PDF_DOWNLOAD_LABELS.get(language, PDF_DOWNLOAD_LABELS["en"])


def _pdf_document_title(page, html_content: str = "") -> str:
    if html_content:
        match = H1_RE.search(html_content)
        if match:
            content = TAG_RE.sub("", match.group("content"))
            content = html.unescape(content).replace("¶", "").strip()
            if content:
                return content
    return (getattr(page, "title", "") or "").strip()


def _pdf_download_name(page, document_title: str = "") -> str:
    title = document_title or _pdf_document_title(page)
    base_name = f"TRIKDIS {title}" if title else "TRIKDIS Manual"
    sanitized = INVALID_FILENAME_CHARS_RE.sub(" ", base_name)
    sanitized = re.sub(r"\s+", " ", sanitized).strip().rstrip(".")
    return f"{sanitized or 'TRIKDIS Manual'}.pdf"


def _slugify_ascii(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii").lower()
    return NON_ALNUM_RE.sub("-", ascii_value).strip("-")


def _fallback_pdf_slug(page) -> str:
    src_path = getattr(getattr(page, "file", None), "src_path", "")
    parts = PurePosixPath(src_path).parts
    slug_parts = []
    for part in parts[1:]:
        if part.lower() == "index.md":
            continue
        stem = PurePosixPath(part).stem if part.lower().endswith(".md") else part
        slug = _slugify_ascii(stem)
        if slug:
            slug_parts.append(slug)
    return "-".join(slug_parts) or "manual"


def _pdf_internal_slug(page) -> str:
    src_path = getattr(getattr(page, "file", None), "src_path", "")
    parts = list(PurePosixPath(src_path).parts)
    if len(parts) < 2:
        return _fallback_pdf_slug(page)

    file_name = parts[-1]
    if "quick-setup" in parts:
        quick_setup_index = parts.index("quick-setup")
        if quick_setup_index + 1 < len(parts) - 1:
            candidate = parts[quick_setup_index + 1]
        elif quick_setup_index + 1 < len(parts):
            candidate = parts[quick_setup_index + 1]
        else:
            candidate = "quick-setup"
        slug = _slugify_ascii(candidate)
        return f"{slug}-quick-setup" if slug else "quick-setup"

    if file_name.lower() == "index.md" and len(parts) >= 2:
        candidate = parts[-2]
    else:
        candidate = PurePosixPath(file_name).stem

    return _slugify_ascii(candidate) or _fallback_pdf_slug(page)


def _pdf_output_filename(page, document_title: str = "") -> str:
    src_path = getattr(getattr(page, "file", None), "src_path", "")
    language = src_path.split("/", 1)[0] if "/" in src_path else "en"
    slug = _pdf_internal_slug(page)
    if not slug.endswith(f"-{language}"):
        slug = f"{slug}-{language}"
    return f"trikdis-{slug}.pdf"


def _build_pdf_download_action(page, document_title: str = "") -> str:
    original = _page_original_pdf(page)
    if original:
        # Bundled original PDF — use distinct label and link directly to the file.
        src_path = getattr(getattr(page, "file", None), "src_path", "")
        language = src_path.split("/", 1)[0] if "/" in src_path else "en"
        label = html.escape(PDF_DOWNLOAD_ORIGINAL_LABELS.get(language, PDF_DOWNLOAD_ORIGINAL_LABELS["en"]))
        href = html.escape(original, quote=True)
        download_name = html.escape(_pdf_download_name(page, document_title), quote=True)
    else:
        label = html.escape(_pdf_label(page))
        href = html.escape(_pdf_output_filename(page, document_title), quote=True)
        download_name = html.escape(_pdf_download_name(page, document_title), quote=True)
    return (
        '<div class="trik-pdf-download" data-manual-pdf-download>'
        f'<a class="md-button md-button--primary trik-pdf-download__link" href="{href}" download="{download_name}">{label}</a>'
        "</div>"
    )


def _inject_pdf_download_action(html_content: str, action_html: str) -> str:
    if "data-manual-pdf-download" in html_content:
        return html_content

    if H1_RE.search(html_content):
        return H1_RE.sub(lambda match: f"{match.group(0)}{action_html}", html_content, count=1)

    return action_html + html_content


def _page_language(page) -> str:
    url = (getattr(page, "url", "") or "").strip("/")
    if url:
        language = url.split("/", 1)[0]
        if language:
            return language

    src_path = getattr(getattr(page, "file", None), "src_path", "")
    if "/" in src_path:
        return src_path.split("/", 1)[0]

    return "en"


def _quick_setup_content_path(page) -> str:
    src_path = getattr(getattr(page, "file", None), "src_path", "")
    if "/" in src_path:
        return src_path.split("/", 1)[1]
    return src_path


def _normalize_search_term(value: str) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def _dedupe_search_terms(values: Iterable[str]) -> List[str]:
    terms: List[str] = []
    seen: Set[str] = set()
    for value in values:
        normalized = _normalize_search_term(value)
        if not normalized:
            continue
        key = normalized.casefold()
        if key in seen:
            continue
        seen.add(key)
        terms.append(normalized)
    return terms


def _humanize_search_slug(value: str) -> str:
    tokens = [token for token in re.split(r"[-_\s]+", str(value or "").strip()) if token]
    labels: List[str] = []
    for token in tokens:
        lowered = token.lower()
        if lowered == "wifi":
            labels.append("WiFi")
            continue
        if lowered == "lte":
            labels.append("LTE")
            continue
        if token.isupper() or any(character.isdigit() for character in token) or len(token) <= 3:
            labels.append(token.upper())
            continue
        labels.append(token.capitalize())
    return " ".join(labels)


def _quick_setup_panel_title(document_title: str, communicator: str) -> str:
    normalized_title = _normalize_search_term(document_title)
    if not normalized_title:
        return ""
    pattern = re.compile(
        rf"^(?P<label>.+?)\s+with\s+{re.escape(communicator.upper())}\s+quick setup$",
        re.IGNORECASE,
    )
    match = pattern.match(normalized_title)
    if not match:
        return ""
    return _normalize_search_term(match.group("label"))


def _build_sp3_search_context_terms(content_path: str, document_title: str) -> List[str]:
    if content_path != "control-panels/sp3/index.md":
        return []
    return _dedupe_search_terms([document_title, "FLEXi SP3", *SP3_VARIANT_ALIASES])


def _build_ethernet_quick_setup_search_context_terms(content_path: str, document_title: str) -> List[str]:
    match = ETHERNET_QUICK_SETUP_RE.match(content_path)
    if not match:
        return []

    communicator = (match.group("communicator") or "").upper()
    leaf = match.group("leaf") or ""
    panel_label = _humanize_search_slug(leaf)
    panel_title = _quick_setup_panel_title(document_title, communicator)

    aliases: List[str] = [
        document_title,
        communicator,
        f"{communicator} communicator",
        f"{communicator} quick setup",
        f"Ethernet communicator {communicator}",
        f"Ethernet {communicator} quick setup",
    ]

    panel_candidates = _dedupe_search_terms([panel_title, panel_label])
    for panel_candidate in panel_candidates:
        aliases.extend(
            [
                panel_candidate,
                f"{panel_candidate} {communicator}",
                f"{communicator} {panel_candidate}",
                f"{panel_candidate} {communicator} quick setup",
                f"{communicator} quick setup {panel_candidate}",
            ]
        )

    return _dedupe_search_terms(aliases)


def _build_pagefind_search_context_terms(page, document_title: str) -> List[str]:
    content_path = _quick_setup_content_path(page)
    sp3_terms = _build_sp3_search_context_terms(content_path, document_title)
    if sp3_terms:
        return sp3_terms

    ethernet_terms = _build_ethernet_quick_setup_search_context_terms(content_path, document_title)
    if ethernet_terms:
        return ethernet_terms

    return []


def _build_pagefind_search_context_block(page, document_title: str) -> str:
    terms = _build_pagefind_search_context_terms(page, document_title)
    if not terms:
        return ""

    items_html = "".join(f"<p>{html.escape(term)}</p>" for term in terms)
    aliases_attr = html.escape(" | ".join(terms), quote=True)
    return (
        '<div class="trik-pagefind-search-context" data-pagefind-search-context="true" '
        f'data-pagefind-meta="search_aliases[data-search-aliases], search_context_kind:manual-aliases" '
        f'data-search-aliases="{aliases_attr}" '
        f'aria-hidden="true" data-pagefind-weight="{PAGEFIND_SEARCH_CONTEXT_WEIGHT}" '
        f'style="{PAGEFIND_SEARCH_CONTEXT_STYLE}">'
        f"{items_html}"
        "</div>"
    )


def _build_quick_setup_product_block(page) -> str:
    content_path = _quick_setup_content_path(page)
    language = _page_language(page)

    if content_path.startswith("alarm-communicators/ethernet/quick-setup/e16/"):
        image_src = html.escape(f"/{language}/alarm-communicators/e16/image1.webp", quote=True)
        return (
            '<div class="trik-quick-setup-product trik-quick-setup-product--single" '
            'data-quick-setup-product="e16">'
            f'<img class="trik-quick-setup-product__image" src="{image_src}" alt="E16 product image" />'
            "</div>"
        )

    if content_path.startswith("alarm-communicators/ethernet/quick-setup/e16t/"):
        image_src = html.escape(f"/{language}/alarm-communicators/e16t/image1.webp", quote=True)
        return (
            '<div class="trik-quick-setup-product trik-quick-setup-product--single" '
            'data-quick-setup-product="e16t">'
            f'<img class="trik-quick-setup-product__image" src="{image_src}" alt="E16T product image" />'
            "</div>"
        )

    if content_path.startswith("alarm-communicators/cellular/quick-setup/"):
        family_images = [
            ("GT", f"/{language}/alarm-communicators/cellular/gt/image1.webp"),
            ("GT+", f"/{language}/alarm-communicators/cellular/gt-plus/image1.webp"),
            ("GET", f"/{language}/alarm-communicators/cellular/get/image1.webp"),
        ]
        items_html = "".join(
            (
                '<figure class="trik-quick-setup-product__item">'
                f'<img class="trik-quick-setup-product__image" src="{html.escape(src, quote=True)}" '
                f'alt="{html.escape(label)} product image" />'
                f"<figcaption>{html.escape(label)}</figcaption>"
                "</figure>"
            )
            for label, src in family_images
        )
        return (
            '<div class="trik-quick-setup-product trik-quick-setup-product--family" '
            'data-quick-setup-product="gt-family">'
            f'<div class="trik-quick-setup-product__group">{items_html}</div>'
            "</div>"
        )

    return ""


def _inject_quick_setup_product_block(html_content: str, block_html: str) -> str:
    if not block_html or "data-quick-setup-product" in html_content:
        return html_content

    if PDF_ACTION_RE.search(html_content):
        return PDF_ACTION_RE.sub(lambda match: f"{match.group(1)}{block_html}", html_content, count=1)

    if H1_RE.search(html_content):
        return H1_RE.sub(lambda match: f"{match.group(0)}{block_html}", html_content, count=1)

    return block_html + html_content


def _inject_pagefind_search_context_block(html_content: str, block_html: str) -> str:
    if not block_html or PAGEFIND_SEARCH_CONTEXT_RE.search(html_content):
        return html_content

    if PDF_ACTION_RE.search(html_content):
        return PDF_ACTION_RE.sub(lambda match: f"{match.group(1)}{block_html}", html_content, count=1)

    if H1_RE.search(html_content):
        return H1_RE.sub(lambda match: f"{match.group(0)}{block_html}", html_content, count=1)

    return block_html + html_content


def _build_pdf_manifest_entry(page, document_title: str = "") -> Dict[str, str]:
    dest_path = PurePosixPath(page.file.dest_path)
    output_filename = _pdf_output_filename(page, document_title)
    return {
        "src_path": page.file.src_path,
        "url": _page_route(page),
        "output": dest_path.parent.joinpath(output_filename).as_posix(),
        "download_name": _pdf_download_name(page, document_title),
    }


def _register_pdf_manifest_entry(page, document_title: str = ""):
    entry = _build_pdf_manifest_entry(page, document_title)
    key = (entry["src_path"], entry["url"])
    if key in _PDF_MANIFEST_KEYS:
        return

    _PDF_MANIFEST_KEYS.add(key)
    _PDF_MANIFEST_ENTRIES.append(entry)


def _write_pdf_manifest(config):
    if not _pdf_downloads_enabled():
        return

    site_dir = Path(config.get("site_dir", "site"))
    if not site_dir.exists():
        LOGGER.warning("Skipping PDF manifest write: site directory does not exist: %s", site_dir)
        return

    manifest_path = site_dir / "pdf-manifest.json"
    manifest_entries = sorted(_PDF_MANIFEST_ENTRIES, key=lambda entry: (entry["url"], entry["src_path"]))
    manifest_path.write_text(f"{json.dumps(manifest_entries, indent=2, ensure_ascii=False)}\n", encoding="utf-8")
    LOGGER.info("Wrote PDF manifest with %s entries to '%s'.", len(manifest_entries), manifest_path)


def on_page_content(html_content: str, page, config, files):
    scopes = _SCOPE_RESOLVER.get_scopes(page, config)
    if scopes and "pagefind-scope-marker" not in html_content:
        html_content += _build_scope_marker(scopes)

    document_title = _pdf_document_title(page, html_content)

    if _is_pdf_eligible(page, config):
        # Only register in the generation manifest when there is no bundled original PDF.
        if _pdf_downloads_enabled() and not _page_original_pdf(page):
            _register_pdf_manifest_entry(page, document_title)
        html_content = _inject_pdf_download_action(
            html_content,
            _build_pdf_download_action(page, document_title),
        )
        html_content = _inject_quick_setup_product_block(
            html_content,
            _build_quick_setup_product_block(page),
        )

    html_content = _inject_pagefind_search_context_block(
        html_content,
        _build_pagefind_search_context_block(page, document_title),
    )

    return _inject_crisp_config(html_content, config)


def _run_pagefind_index(site_dir: Path) -> bool:
    npx_path = shutil.which("npx")
    if not npx_path:
        LOGGER.warning("Skipping Pagefind indexing: 'npx' is not available in PATH.")
        return False

    command = [npx_path, "-y", "pagefind", "--site", str(site_dir)]
    completed = subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        output = (completed.stdout or completed.stderr or "").strip()
        LOGGER.warning("Pagefind indexing failed for '%s': %s", site_dir, output or "unknown error")
        return False

    LOGGER.info("Pagefind index generated for '%s'.", site_dir)
    return True


@mkdocs_plugins.event_priority(-101)
def on_post_build(config):
    i18n_plugin = config.plugins.get("i18n")
    if i18n_plugin and getattr(i18n_plugin, "building", False):
        return

    _write_pdf_manifest(config)

    if os.environ.get("MKDOCS_PAGEFIND_AUTOINDEX", "1").strip() in {"0", "false", "False"}:
        LOGGER.info("Skipping Pagefind indexing: MKDOCS_PAGEFIND_AUTOINDEX disabled.")
        return

    site_dir = Path(config.get("site_dir", "site"))
    if not site_dir.exists():
        LOGGER.warning("Skipping Pagefind indexing: site directory does not exist: %s", site_dir)
        return

    _run_pagefind_index(site_dir)
