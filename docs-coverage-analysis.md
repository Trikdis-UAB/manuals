# docs.trikdis.com — Product Coverage Analysis
_Last verified: 2026-03-24 (live check of trikdis.com + docs repo)_

This table compares every product listed on **trikdis.com** against the documentation published on **docs.trikdis.com**.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Documented — manual exists on docs.trikdis.com |
| ❌ | **Missing** — product is on trikdis.com but has NO docs page |
| 🔅 | De-emphasised — product is visible on scroll in the "All" view and accessible via a specific filter, but does not appear in the initial above-the-fold product grid |
| ⚠️ | Docs-only — page exists on docs.trikdis.com but product is no longer listed on trikdis.com |

> **Language note:** docs.trikdis.com serves EN, LT, ES, and RU. This analysis tracks whether a manual exists at all (any language). EN is most complete; LT/ES/RU mirror the same product set but lack some EN-only content (e.g. Ethernet quick-setup guides and IPcom are English-only).

---

## Communicators

_The initial above-the-fold grid on trikdis.com shows: GT+, GET, FireCom, G17F, T16, G16. Four more products (G16T, E16, E16T, GT original) load on scroll via Elementor client-side rendering — they are visible in the "All" view but only after scrolling, and are absent from the raw HTML returned by a plain HTTP GET request._

| Product | On trikdis.com | Visibility | docs.trikdis.com | Notes |
|---------|---------------|------------|-----------------|-------|
| GT+ | ✅ | All view | ✅ | 4G LTE, Plug & Play, Serial BUS, TIP RING |
| GET | ✅ | All view | ✅ | 4G LTE, Ethernet, Plug & Play, Serial BUS, TIP RING |
| FireCom | ✅ | All view | ✅ | Fire panel communicator |
| G17F | ✅ | All view | ✅ | Fire panel communicator |
| T16 | ✅ | All view | ✅ | VHF/UHF radio communicator |
| G16 | ✅ | All view | ✅ | |
| G16T | ✅ 🔅 | Scroll-loaded in All view; also via 4G LTE filter | ✅ | De-emphasised but still sold |
| E16 | ✅ 🔅 | Scroll-loaded in All view; also via Ethernet filter | ✅ | De-emphasised but still sold |
| E16T | ✅ 🔅 | Scroll-loaded in All view; also via Ethernet filter | ✅ | De-emphasised but still sold |
| GT (original) | ⚠️ | Not listed on trikdis.com | ✅ | Superseded by GT+. Confirm if doc should be kept as legacy or removed |

---

## Control Panels

| Product | On trikdis.com | Visibility | docs.trikdis.com | Notes |
|---------|---------------|------------|-----------------|-------|
| FLEXi SP3 | ✅ | All view | ✅ | |
| CG17 | ✅ | All view | ✅ | Small-object panel |

---

## Keypads

> trikdis.com groups keypads under "Alarm Control Panels". docs.trikdis.com lists them as a separate "Keypads" section.

| Product | On trikdis.com | Visibility | docs.trikdis.com | Notes |
|---------|---------------|------------|-----------------|-------|
| SK-LCD Button | ✅ | All view | ✅ | |
| SK-LED Button | ✅ | All view | ✅ | |
| SK-LCD TouchPad | ✅ | All view | ✅ | |
| SK-LED TouchPad | ✅ | All view | ✅ | |
| FLEXi SK LCD | ⚠️ | Not listed separately | ✅ | Bundled with FLEXi SP3; docs page exists |
| FLEXi SK LED | ⚠️ | Not listed separately | ✅ | Bundled with FLEXi SP3; docs page exists |

---

## Gate Controllers

| Product | On trikdis.com | Visibility | docs.trikdis.com | Notes |
|---------|---------------|------------|-----------------|-------|
| GATOR | ✅ | All view | ✅ | 4G LTE gate controller |
| GATOR WiFi | ✅ | All view | ✅ | Wi-Fi gate controller |

---

## Receivers / Software

> trikdis.com has a dedicated "Receivers" category with 7 hardware products. **None of these have docs.** The only documented item is IPcom (software), which has no product page on trikdis.com.
>
> **Planned nav structure:** Receivers → IP Network (RL14, IPcom), Radio (RFH11, R11, RR-IP12, RF11), Landline (RT2, RTH2). RF11 DOCX not yet sourced — to be added in a future pass.

| Product | On trikdis.com | Tags | docs.trikdis.com | Notes |
|---------|---------------|------|-----------------|-------|
| IPcom | ⚠️ | Software/server | ✅ | No product page — documented in docs as a receiver UI guide (EN only) |
| **RL14** | ✅ | CMS Equipment, IP & SMS, Rack Mount | ❌ | Hardware receiver |
| **RFH11** | ✅ | Multi-format Decoding, RS232, VHF/UHF | ❌ | Hardware receiver |
| **R11** | ✅ | FM/FSK, Multi-Protocol, VHF Radio | ❌ | Hardware receiver |
| **RF11** | ✅ | Modular Integration, Multi-Protocol, VHF/UHF | ❌ | Hardware receiver — DOCX not yet sourced, deferred |
| **RT2** | ✅ | Multi-format Decoding, PSTN, Surgard Output | ❌ | Hardware receiver |
| **RR-IP12** | ✅ | GPRS, IP, Modular Integration, Repeater, VHF/UHF | ❌ | Hardware receiver |
| **RTH2** | ✅ | Multi-format Decoding, PSTN, Standalone | ❌ | Hardware receiver |

---

## Expanders & Accessories — ❌ ENTIRELY MISSING FROM DOCS

> All 9 products below are confirmed listed on trikdis.com as of 2026-03-24. iO-8, RF-S8, and PB-LoRa are all accessible at their respective `/en/equipment/` URLs. None of these products have documentation on docs.trikdis.com.

| Product | On trikdis.com | Tags | docs.trikdis.com | Priority |
|---------|---------------|------|-----------------|---------|
| **iO-LORA** | ✅ | 433/868 MHz, Expander, LoRa | ❌ | 🔴 High |
| **iO8-LoRa** | ✅ | 433/868 MHz, Expander, LoRa | ❌ | 🔴 High |
| **RF-LoRa** | ✅ | 433/868 MHz, Expander, Receiver, LoRa | ❌ | 🔴 High |
| AX-ANT-KIT | ✅ | 433 MHz, Antenna | ❌ | 🟡 Low — antenna kit; installation is simple |
| AX-ANT01S_SF | ✅ | Antenna | ❌ | 🟡 Low — same |
| SMA–SMF / 50/01 | ✅ | Antenna, Extension cable | ❌ | 🟡 Low — cable accessory |
| **iO-8** | ✅ | 433/868 MHz, Expander | ❌ | 🔴 High — confirmed listed at `/en/equipment/io-8-3/` |
| **RF-S8** | ✅ | 868 MHz, Expander, Receiver | ❌ | 🔴 High — confirmed listed at `/en/equipment/rf-s8/` |
| **PB-LoRa** | ✅ | LoRa, Panic Button | ❌ | 🔴 High — confirmed listed at `/en/equipment/pb-lora/` |

---

## Wireless Sensors — ❌ ENTIRELY MISSING FROM DOCS

| Product | On trikdis.com | Tags | docs.trikdis.com | Priority |
|---------|---------------|------|-----------------|---------|
| **Smart Plug S8** | ✅ | 868 MHz, Plug & Play, S8 | ❌ | 🔴 High |
| **Smart Smoke Detector S8** | ✅ | 868 MHz, Plug & Play, S8 | ❌ | 🔴 High |
| **SOS S8** | ✅ | 868 MHz, Plug & Play, S8 | ❌ | 🔴 High |
| **Curtain mini** | ✅ | 433 MHz, M4, Plug & Play | ❌ | 🔴 High |
| **Curtain mini PRO** | ✅ | 433 MHz, M4, Plug & Play | ❌ | 🔴 High |
| **Corner PIR** | ✅ | 433 MHz, M4, Plug & Play | ❌ | 🔴 High |

---

## Summary

| Category | Total on trikdis.com | Documented ✅ | Missing ❌ |
|----------|---------------------|--------------|-----------|
| Communicators | 9 listed (+ GT legacy) | 9 (+ 1 legacy) | 0 |
| Control Panels | 2 | 2 | 0 |
| Keypads | 4 listed (+ 2 FLEXi variants) | 6 | 0 |
| Gate Controllers | 2 | 2 | 0 |
| Receivers / Software | 7 hardware + IPcom (software) | 1 (IPcom only) | **7** |
| Expanders & Accessories | 9 listed | 0 | **9** |
| Wireless Sensors | 6 | 0 | **6** |
| **TOTAL** | **39 listed** | **20** | **22 confirmed gaps** |

---

## Recommended Action Plan

### 🔴 Immediate — 19 high-priority products with no docs

**Wireless Sensors (6):**
1. Smart Plug S8, Smart Smoke Detector S8, SOS S8 — S8 ecosystem, document together
2. Curtain mini, Curtain mini PRO, Corner PIR — M4 433 MHz sensors

**LoRa ecosystem (6):**
3. iO-LORA, iO8-LoRa, RF-LoRa — LoRa hub/expander/receiver trio, document together
4. iO-8, RF-S8, PB-LoRa — confirmed listed; iO-8 expander, RF-S8 receiver, PB-LoRa panic button

**Hardware Receivers (7):**
5. RL14 — IP/SMS rack-mount receiver for CMS
6. RFH11 — VHF/UHF multi-format receiver with RS232
7. R11 — FM/FSK VHF radio multi-protocol receiver
8. RF11 — VHF/UHF modular multi-protocol receiver
9. RT2 — PSTN multi-format decoder with Surgard output
10. RR-IP12 — GPRS/IP modular repeater receiver
11. RTH2 — PSTN standalone multi-format decoder

### 🟡 Low priority — 3 accessory products with no docs

- **AX-ANT-KIT** — 433 MHz antenna kit; no complex installation guide needed
- **AX-ANT01S_SF** — antenna accessory; same
- **SMA–SMF / 50/01** — antenna extension cable; same

### 🟡 Confirm with team

- **GT (original)** — keep or retire the docs page? Product not listed on trikdis.com.
- **FLEXi SK LCD / FLEXi SK LED** — are these truly separate products from SK-LCD/SK-LED? (docs page exists, trikdis.com does not list them separately)
- **E16, E16T, G16T** — confirm still actively sold (scroll-loaded in "All" view on trikdis.com, also accessible via Ethernet/4G LTE filters); docs coverage is in place ✅

### 🟢 Already well covered

- All 9 communicators (GT+, GET, G16, G16T, FireCom, G17F, T16, E16, E16T) ✅ — G16T, E16, E16T are scroll-loaded in the "All" view but fully listed and documented
- Both control panels (FLEXi SP3, CG17) ✅
- Both gate controllers (GATOR, GATOR WiFi) ✅
- All 6 keypads (SK-LCD/LED Button, SK-LCD/LED TouchPad, FLEXi SK LCD/LED) ✅
- IPcom software receiver UI guide ✅
