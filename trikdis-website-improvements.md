# trikdis.com — Website Navigation Improvement Recommendations
_Analysis date: 2026-03-24 | Based on live browser inspection + raw HTTP simulation_

---

## Executive Summary

### How This Analysis Was Conducted

This report emerged from a two-track analysis of trikdis.com carried out on 2026-03-24.

The first track was a standard browser-based review: navigating the product catalogue, clicking through category and filter pages, and documenting how a human installer would experience the site. This surface-level pass identified structural issues — keypads buried under the wrong category, missing cross-links to documentation, no product search, a Receivers menu item that leads nowhere.

The second track was more revealing. As part of building a documentation coverage map (comparing which products have manuals on docs.trikdis.com), an AI agent was tasked with extracting the complete product list from trikdis.com programmatically — the same way an AI assistant on a mobile device would retrieve the page. The agent queried the DOM using `querySelectorAll`, collected all product links, and compiled its results. It reported 6 communicators and 6 expanders/accessories.

Both counts were wrong.

Live browser inspection confirmed 10 communicators and 9 expanders. The discrepancy exposed a concrete, reproducible failure mode: **trikdis.com renders a meaningful portion of its product catalogue via client-side JavaScript**. A plain HTTP GET request — exactly what Claude on Android, ChatGPT, Perplexity, and most AI tools issue when asked to look something up — returns an incomplete page. Products silently disappear from the response. The AI agent had no way to know this; it treated its first-pass result as authoritative and moved on. The downstream documentation coverage report contained errors as a direct result.

Additionally, the product pages use deeply nested `div` structures with no semantic HTML, no `aria-label` attributes, and inconsistent text node depth — meaning even agents that do receive the full page may silently drop structured product attributes like connectivity tags during parsing.

---

### Key Findings

**For human visitors:** The site is broadly functional but has friction points that cause useful products and information to go undiscovered. Filter-based navigation hides newer communicators from users who don't scroll far enough. Keypads are miscategorised. There are no links from product pages to installation manuals. Old bookmarked URLs are dead.

**For AI agents and search engines:** The site has a structural invisibility problem. At least 4 communicators are completely absent from the server-rendered HTML and only materialise after JavaScript executes. No structured data (Schema.org) is present anywhere. The product site and documentation site share no machine-readable connection. There is no canonical product inventory an AI can use to verify its own results.

---

### Implications

The practical consequence is this: if a customer, installer, or distributor uses an AI assistant to research Trikdis products, the assistant is likely working from an incomplete picture. A question like "which Trikdis communicators support Ethernet?" could return a confidently wrong answer — citing only GET, because E16 and E16T never appeared in the HTTP response the AI retrieved.

This is not a hypothetical risk. It was observed directly during the analysis that produced this document.

---

### Suggested Solutions — At a Glance

The 14 issues in this report vary in implementation cost. The three highest-impact, lowest-effort actions are:

1. **Enable server-side rendering for product loops** (fixes the AI invisibility problem at source — a WordPress/Elementor configuration change, not a code rewrite)
2. **Add `Product` Schema.org markup to product pages** (makes every product page self-describing to both search engines and AI agents; a one-time template change)
3. **Add "Installation Manual →" links from product pages to docs.trikdis.com** (benefits humans and machines simultaneously; requires no platform changes, just content edits)

Full details, root causes, and implementation notes follow in the two sections below.

---

## 1. Visitor & Installer Experience (Human UX)

This section covers improvements for the primary human audience: security installers, system integrators, and end-users browsing the product catalogue.

### 1.1 De-Emphasised Products Require Scrolling to Discover

On the Communicators page, 6 products appear immediately on load (GT+, GET, FireCom, G17F, T16, G16). Four more — G16T, E16, E16T, and the original GT — only appear as the user scrolls down the page. There is no visual indicator (e.g. "showing 6 of 10") that more products exist below the fold.

**Impact:** A visitor who doesn't scroll far enough may conclude the product list is complete and miss relevant products. This particularly affects G16T, E16, and E16T, which are still actively sold but visually buried.

**Recommendation:** Display all products in a uniform grid that doesn't require progressive scrolling to reveal. If pagination is preferred, add a visible count ("Showing 6 of 10") and a clear "Load more" button. Avoid invisible or unlabelled content below the fold.

---

### 1.2 Keypads Are Buried Under "Alarm Control Panels"

The product navigation groups keypads (SK-LCD, SK-LED, SK-LCD Touch, SK-LED Touch) inside the "Alarm Control Panels" category with no dedicated section or sub-label. There is no standalone "Keypads" entry in the top navigation.

**Impact:** An installer searching specifically for keypad specifications has no obvious place to look. The category label "Alarm Control Panels" does not suggest it also contains peripheral accessories.

**Recommendation:** Either add a dedicated "Keypads" top-level category, or add a clearly labelled sub-heading within Alarm Control Panels that makes the keypad group visible at a glance.

---

### 1.3 No Cross-Links Between Product Pages and docs.trikdis.com

Individual product pages on trikdis.com do not link to the corresponding installation manual on docs.trikdis.com. The two sites are completely disconnected from a user-journey perspective.

**Impact:** Installers who land on a product page have no obvious path to the manual. They must either already know docs.trikdis.com exists or search for it separately, increasing support enquiries unnecessarily.

**Recommendation:** Add a prominent "Installation Manual →" button or link on every product page pointing directly to the relevant docs.trikdis.com page. This is high-impact for minimal development effort.

---

### 1.4 Old URLs Return 404 Errors

The previous URL structure (e.g. `trikdis.com/alarm-communicators/`, `trikdis.com/alarm-communicators/cellular-alarm-communicators/cellular-communicator-g16/`) now returns 404 Not Found after the site redesign.

**Impact:** Bookmarks, forum posts, distributor links, and historical search engine results pointing to old URLs lead to dead ends. This erodes trust and discards years of accumulated inbound traffic.

**Recommendation:** Implement 301 permanent redirects from all old URL patterns to their equivalents in the new `/en/equipment/` structure. This is a standard, low-cost fix with significant SEO and UX benefit.

---

### 1.5 No Receivers Category in the Product Navigation

The IPcom receiver is documented on docs.trikdis.com but has no product page in the main navigation on trikdis.com. The top-level nav shows "Receivers" as a menu item but it leads nowhere functional in the current product structure.

**Recommendation:** Either create a Receivers product page for IPcom or remove the menu item to avoid confusing visitors who click it expecting a destination.

---

### 1.6 Newer Product Families Are Hard to Discover

The LoRa ecosystem (iO-LORA, iO8-LoRa, RF-LoRa, PB-LoRa) and the S8 wireless sensor line (Smart Plug S8, Smoke Detector S8, SOS S8) represent a significant new product generation. They are only reachable by navigating into Expanders or Wireless Sensors — there is no homepage feature, banner, or "New Products" callout drawing attention to them.

**Recommendation:** Add a "New" badge to recently launched products and consider a highlighted section on the products landing page that spotlights the latest additions.

---

### 1.7 No On-Site Product Search

There is no search box on the product catalogue pages. Visitors who know a specific model name (e.g. "G16T") have no fast path to jump directly to it.

**Recommendation:** Add a simple product search or filter-by-name input on catalogue pages.

---

## 2. Discoverability for AI Agents & Search Engines (Machine-Readable UX)

This section covers how well trikdis.com exposes its content to automated consumers: search engine crawlers (Googlebot, Bingbot), AI assistants (Claude, ChatGPT, Perplexity), and API-based tools that retrieve pages programmatically. All findings in this section are based on direct HTTP simulation and live DOM inspection conducted on 2026-03-24.

---

### 2.1 Four Products Are Completely Invisible to AI HTTP Fetchers

**This is the most critical finding in this section.**

The Communicators page uses Elementor's client-side loop rendering. When the page is fetched via a plain HTTP GET — exactly how AI assistants like Claude on Android or ChatGPT retrieve pages — the raw HTML response (152 KB) contains only 6 products: GT+, GET, FireCom, G17F, T16, G16.

The remaining 4 communicators — **G16T, E16, E16T, and GT (original)** — are injected into the DOM entirely by JavaScript after page load. They are absent from the raw HTML, absent from any embedded JSON or script data blocks, and absent from any XHR/fetch API calls. They only materialise when Elementor executes and renders the additional product cards client-side, which requires a full browser runtime.

**Simulated AI client responses by platform:**

| AI Client | JS Execution | Scroll Simulation | Products Seen | Missing |
|-----------|-------------|-------------------|--------------|---------|
| Claude Android (web tool) | ❌ No | ❌ No | 6 / 10 | G16T, E16, E16T, GT |
| ChatGPT Android (browsing) | ❌ No | ❌ No | 6 / 10 | G16T, E16, E16T, GT |
| Perplexity (web fetch) | ❌ No | ❌ No | 6 / 10 | G16T, E16, E16T, GT |
| Google Search (Googlebot) | ✅ Yes | Partial | 10 / 10 | None (indexed) |
| Full browser (human) | ✅ Yes | ✅ Yes | 10 / 10 | None |

**What an AI assistant actually "sees" when asked about Trikdis communicators:**

```
Products found: GT+, GET, FireCom, G17F, T16, G16
Products silently missed: G16T, E16, E16T, GT
```

If a user asks Claude or ChatGPT on their phone "which Trikdis communicators support Ethernet?", the AI will have no knowledge of E16 or E16T from a live page fetch. It may confidently answer "only GET supports Ethernet" — which is incorrect.

**Root cause:** Elementor renders the first batch of product cards server-side and injects the remainder via JavaScript. There are no API calls or lazy-load endpoints involved — the hidden products are embedded in the compiled JavaScript bundle and rendered on the client. A plain HTTP fetcher has no access to this data.

**Recommendation:** All product cards should be present in the initial server-rendered HTML, even if CSS hides them until scrolled into view. WordPress/Elementor supports server-side rendering of post loops; this option should be enabled, or a static-HTML output should be configured for product category pages.

---

### 2.2 Zero Structured Data (Schema.org) on Product or Category Pages

Live inspection confirmed there are no `<script type="application/ld+json">` blocks on any product or category page. No `Product`, `ItemList`, or `TechArticle` schema is present anywhere on the site.

**Impact:** Google cannot generate product rich results. More importantly for AI agents, there is no machine-readable signal about what a page describes, what category a product belongs to, or where the installation manual lives. When an AI assistant retrieves a product page, it must infer everything from free-form prose and class names.

**Recommendation:** Add `Product` schema to every equipment page. At minimum include `name`, `description`, `brand`, `sku`, and a `seeAlso` link pointing to the corresponding docs.trikdis.com page. Add `ItemList` schema to category pages listing all products.

**Example for the GT+ page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "GT+ Communicator",
  "brand": { "@type": "Brand", "name": "Trikdis" },
  "description": "4G LTE alarm communicator. Grade 4 certified. Supports Serial BUS, TIP RING, and Plug & Play installation.",
  "url": "https://trikdis.com/en/equipment/gt-3/",
  "seeAlso": "https://docs.trikdis.com/en/alarm-communicators/cellular/gt-plus/"
}
```

---

### 2.3 trikdis.com and docs.trikdis.com Are Disconnected Domains to AI

From a machine perspective, the product website and the documentation site are two entirely unrelated domains. There are no `<link rel>` tags, no `seeAlso` structured data, and no HTML anchor links connecting a product page on trikdis.com to its manual on docs.trikdis.com.

**Impact:** When an AI agent browses trikdis.com and docs.trikdis.com independently, it cannot reliably map a product to its manual. A user asking "how do I configure the E16T?" may get an answer sourced from the wrong page, an outdated cache, or no answer at all if the AI only searched trikdis.com and found nothing useful.

**Recommendation:**
- Add `seeAlso` structured data on every trikdis.com product page pointing to the docs URL.
- Add a reciprocal HTML link on every docs.trikdis.com manual page pointing back to the product page.
- Consider a `robots.txt` or sitemap entry that references both domains together.

---

### 2.4 Old URLs Not Redirected — Breaks AI Retrieval Augmentation

AI assistants that use Retrieval-Augmented Generation (RAG) or maintain a web index may have cached the old `trikdis.com/alarm-communicators/...` URL structure. When these tools attempt to fetch the cached URL to answer a question, they receive a 404 and return either stale data or nothing.

**Recommendation:** Implement 301 redirects from all legacy URL patterns to new ones. This benefits both human users (section 1.4) and AI retrieval systems that rely on historical URL references.

---

### 2.5 No XML Sitemap Covering the New URL Structure

No publicly accessible sitemap was confirmed at `/sitemap.xml` or `/sitemap_index.xml` that enumerates all pages under the new `/en/equipment/` URL structure.

**Impact:** Search engines and AI crawlers that rely on sitemaps for discovery may not be indexing newly added products. The LoRa and S8 product lines in particular — which have no inbound links from legacy pages — may be entirely absent from AI training data and search indexes.

**Recommendation:** Publish a comprehensive XML sitemap covering every product page, category page, and ideally cross-referencing docs.trikdis.com. Submit to Google Search Console and Bing Webmaster Tools.

---

### 2.6 Product Listing Pages Contain No Semantic HTML

The product cards use deeply nested Elementor `div` structures with no semantic HTML elements (`<article>`, `<section>`, `<nav>`, `<main>`). Product names are in `<h1>` elements regardless of page hierarchy. Links have no `aria-label` attributes. Images have no `alt` text.

**Impact:** AI models that parse HTML structure (rather than raw text) receive no useful signals about content hierarchy, product relationships, or navigational intent. Screen readers and accessibility tools are similarly disadvantaged.

**Recommendation:** Use semantic HTML elements for product cards (`<article>` per product, `<h2>` for product names on listing pages), add `alt` text to all product images, and add `aria-label` attributes to "View details" links so they indicate which product they refer to.

---

### 2.7 No Machine-Readable Product Inventory

There is no canonical, machine-readable list of Trikdis products available anywhere on trikdis.com — no `/products.json` endpoint, no `llms.txt` file, no comprehensive `ItemList` Schema block on category pages.

**Why this matters beyond theoretical completeness:** During the analysis that produced this report, an AI agent attempted to verify the full product list by querying the live DOM. Because 4 communicators were JS-rendered (issue 2.1) and because the HTML structure is non-semantic (issue 2.6), the agent's first-pass count was wrong. With a reliable product inventory available as a separate resource, the agent could have cross-checked its DOM results against a known authoritative list and caught its own errors before writing them into the coverage report.

This is the broader pattern: when a site provides no ground-truth reference, every automated consumer — AI assistant, crawler, integration partner — must independently re-derive the product list by scraping, and each one is exposed to the same rendering and parsing failure modes. A single published inventory eliminates this problem at source.

**Recommendation:** Publish a plain-text or JSON product inventory at a stable URL (e.g. `/llms.txt` or `/api/products.json`) listing all current products with their name, category, URL, and a link to their documentation page. This costs almost nothing to maintain if generated from the existing CMS, and immediately improves reliability for any automated consumer of the site. The `llms.txt` convention is an emerging standard specifically designed for AI agent consumption and would be a meaningful differentiator for a product line that serves technically sophisticated installers.

**Example `llms.txt` structure:**
```
# Trikdis Products

## Communicators
- GT+ Communicator: https://trikdis.com/en/equipment/gt-3/ | Docs: https://docs.trikdis.com/en/alarm-communicators/cellular/gt-plus/
- GET Communicator: https://trikdis.com/en/equipment/get-3/ | Docs: https://docs.trikdis.com/en/alarm-communicators/cellular/get/
- G16T: https://trikdis.com/en/equipment/g16t/ | Docs: https://docs.trikdis.com/en/alarm-communicators/cellular/g16t/
- E16: https://trikdis.com/en/equipment/e16/ | Docs: https://docs.trikdis.com/en/alarm-communicators/ethernet/e16/
...
```

---

## Summary Table

| # | Issue | Affects | Priority |
|---|-------|---------|----------|
| 1.1 | Scroll-loaded products have no visibility indicator | Humans | 🟠 Medium |
| 1.2 | Keypads buried in wrong category | Humans | 🟠 Medium |
| 1.3 | No links from product pages to docs | Humans | 🔴 High |
| 1.4 | Old URLs return 404 | Humans + Machines | 🔴 High |
| 1.5 | Receivers menu item leads nowhere | Humans | 🟡 Low |
| 1.6 | LoRa / S8 products hard to discover | Humans | 🟠 Medium |
| 1.7 | No product search | Humans | 🟡 Low |
| 2.1 | 4 products invisible to AI HTTP fetchers | Machines | 🔴 Critical |
| 2.2 | No Schema.org structured data | Machines | 🔴 High |
| 2.3 | trikdis.com and docs.trikdis.com not linked | Machines | 🔴 High |
| 2.4 | Dead URLs break AI retrieval | Machines | 🔴 High |
| 2.5 | No XML sitemap for new URL structure | Machines | 🟠 Medium |
| 2.6 | Non-semantic HTML throughout | Machines | 🟠 Medium |
| 2.7 | No machine-readable product inventory / llms.txt | Machines | 🟠 Medium |
