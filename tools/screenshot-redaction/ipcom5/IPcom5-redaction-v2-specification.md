# IPcom5 Screenshot Redaction V2 Specification

## 1. Purpose
Define the production specification for migrating IPcom5 screenshot anonymization from fill-only masking to a hybrid model:
- `replace` for structured values where format understanding matters.
- `blur` for noisy/non-structured regions where replacement hurts readability.
- `fill` as controlled fallback for OCR/placement failure.

This specification consolidates:
- `/Users/andriaus/Projects/TRIKDIS/manuals/tools/screenshot-redaction/ipcom5/agents.md`
- `/Users/andriaus/Projects/TRIKDIS/manuals/tools/screenshot-redaction/ipcom5/Blur and replace discussion.md`
- Current implementation state in `/Users/andriaus/Projects/personal/Utilities/Redact`

## Technical Grounding (Normative)
This sprint is grounded by:
- `/Users/andriaus/Projects/TRIKDIS/manuals/projects/Ipcom5/agents.md`

Primary workspace for execution:
- `/Users/andriaus/Projects/TRIKDIS/manuals`

Precedence for this specification:
1. System/developer/app instructions.
2. `/Users/andriaus/Projects/TRIKDIS/manuals/projects/Ipcom5/agents.md`.
3. `/Users/andriaus/Projects/TRIKDIS/manuals/tools/screenshot-redaction/ipcom5/IPcom5-redaction-v2-specification.md`.

## 2. Decision Summary
- Adopt lead developer proposal.
- Do not migrate to a new redaction engine in this iteration.
- Extend the existing OCR + rule pipeline for hybrid rendering.
- Enforce coordinate precision for replacement-critical fields.

## 3. Scope
### In scope
- IPcom5 documentation screenshots processed by current redaction pipeline.
- Redaction contract upgrades in spec and requirements JSON.
- Renderer support for `fill`, `blur`, and `replace`.
- Deterministic placeholder generation for structured data.
- Validation gates for geometry, secrecy, and replacement quality.
- Syncable changes for reusable utility mirror.

### Out of scope
- Full migration to Presidio/OpenCV-only external pipeline.
- System-wide OCR replacement.
- Non-IPcom product tuning beyond reusable defaults.

## 4. Current Baseline (As-Is)
Current utility (`/Users/andriaus/Projects/personal/Utilities/Redact`) provides:
- OCR extraction via Tesseract TSV.
- Rule hit detection with table/form-aware heuristics.
- Fill-based masking via rectangle draw.
- Validation with `must_redact`, `must_keep_visible`, `must_not_ocr`, and mask geometry checks.

Current gap:
- No first-class per-hit render mode (`blur`/`replace`) in the contract and renderer.
- No coordinate contract gate for replacement alignment.

## 5. UX and Security Principles
- Realistic fake principle: replacements must preserve data shape.
- Visual consistency: replacement format must be stable across pages.
- Contextual rendering: use replacement only where it improves understanding.
- Accessibility: avoid unreadable clutter from oversized masks.
- Security first: if replacement is uncertain, fallback to safe masking on that token only.

## 6. Functional Requirements
### FR-1 Render modes
Support per-rule/per-hit render modes:
- `fill`
- `blur`
- `replace`

### FR-2 Mode-specific behavior
- `fill`: existing rectangle masking behavior.
- `blur`: crop bbox, apply Gaussian blur radius, paste back.
- `replace`: use precise token/field coordinates, clear original glyphs by rebuilding an even local background, then draw deterministic placeholder text inside bbox.

### FR-2a Single-mode decision per field
- For each field instance in a run, apply exactly one primary mode: `blur` or `replace`.
- `fill` is allowed only as token-level fallback according to `fallback_render_mode`.

### FR-3 Deterministic replacement
- Same source token in the same image maps to same replacement.
- Sequential generators by kind (per image context) for repeating fields.

### FR-4 Field-level policy
- `waw01` button: blur.
- Footer hostname (`beta2.protegus.app`): replace with `example.domain.com`.
- IPv4 tokens: replace from `123.123.123.123`, increment last octet.
- Ports: replace from `12345`, increment by 1.
- Users table non-admin names/logins: blur.
- Objects UID/ICCID/IP columns: blur by default; replace for clearly isolated IP/port cells.

### FR-5 Protected content
Protected labels/tokens must remain readable and unoverlapped as defined by requirements contract.

### FR-6 Fallback policy
If OCR confidence/placement is below threshold, apply `fallback_render_mode` to affected token only.

## 7. Contract Changes

## 7.1 `redaction-spec.json` (proposed)
Add optional fields at rule/item level:
- `render_mode`: `fill | blur | replace`
- `blur`: `{ "radius": <number> }`
- `replace`: `{ "kind": "ipv4|hostname|port|uid|iccid|login|name", "pattern": "...", "start": <number|string>, "step": <number> }`
- `fallback_render_mode`: `fill` (default)

Allow per-item or per-rule override precedence:
1. Explicit hit/rule mode.
2. Item default mode.
3. Global default (`fill`).

## 7.2 `redaction-requirements.json` (proposed)
Add:
- `must_replace_patterns`: regex patterns expected after replacement.
- `forbid_render_mode`: disallow mode(s) in selected areas except explicit fallback events.
- `expected_boxes`: locked coordinate map for precision-critical fields.
- Optional image fingerprint/hash to invalidate stale coordinate maps after UI layout shifts.

## 8. Coordinate Contract (Replacement Precision)
Replacement requires stable geometry.

### Required checks per critical field
- A detected mask/hit exists.
- Hit overlaps expected box using configured threshold (IoU or center-in-box).
- Mask size remains within tolerance (no oversized bars).
- Sensitive source token is absent post-redaction.
- Protected labels have zero overlap with applied masks.

### Coordinate lifecycle
1. Define field-level keep/blur/replace contract.
2. Lock precise coordinates for fields requiring blur/replace.
3. Render by contract.
4. If image hash/layout changes, re-map coordinates or degrade to safe fallback and fail strict checks where required.

## 9. Rendering Details
### Replacement background reconstruction (mandatory)
- Before drawing replacement text, detect precise value bbox (token-level or locked `expected_boxes` region).
- Sample surrounding non-sensitive pixels around the bbox and compute a local background color/texture estimate.
- Paint/normalize the original value area so the background is visually even and old glyph traces are removed.
- Only after background normalization, render replacement text at the target coordinates.
- If reliable coordinate lock or background reconstruction fails, fallback per-token and record a fallback event.

### Text replacement layout
- Font size target: `0.78 * bbox_height` (minimum 10 px).
- Horizontal inset: 2-3 px.
- Left-aligned rendering.
- Clip or fit text to bbox width to prevent overflow.

### Visual quality
- Use blur radius tuned to avoid artifact blocks.
- Keep fill fallback color consistent with current design for emergency masking.

## 10. Validation and QA Gates
### Existing gates to keep
- `must_redact`
- `must_keep_visible`
- `must_not_ocr`
- geometry anomaly checks

### New gates
- `replace` mode requires matching `must_replace_patterns`.
- `blur` mode requires absence of original sensitive tokens.
- `forbid_render_mode` violations fail run.
- `expected_boxes` precision gate for critical images.
- `replace` mode must prove old value removal in the replaced area (no residual source token OCR match, plus clean background without visible old glyph remnants).

### Targeted QA image set
At minimum:
- `status.webp`
- `users.webp`
- `objects.webp`
- `outputs.webp`
- `general.webp`

## 11. Required Execution Commands
For IPcom5 pipeline and docs verification:

```bash
npm --prefix Scripts/ipcom5control-web run redact:images
npm --prefix Scripts/ipcom5control-web run check:redaction
npm --prefix Scripts/ipcom5control-web run check:scaffold
npm --prefix Scripts/ipcom5control-web run check:syntax
npm --prefix Scripts/ipcom5control-web run check:accessibility
npm --prefix Scripts/ipcom5control-web run check:login-capture
npm --prefix Scripts/ipcom5control-web run check:tab-screens
npm --prefix Scripts/ipcom5control-web run check:intro-page
npm --prefix Scripts/ipcom5control-web run check:monitoring-docs
.venv/bin/mkdocs build --strict
```

## 12. Implementation Phases
### Phase 1: Contract and renderer upgrade
- Add schema fields and parser defaults.
- Implement `blur` and `replace` renderers.
- Add deterministic placeholder generators.

### Phase 2: Precision hardening
- Add `expected_boxes` contract.
- Enforce overlap/tolerance checks and protected-label collision checks.

### Phase 3: IPcom rollout
- Apply field policy to all target IPcom screenshots.
- Tune critical images and fallback behavior.
- Run full required checks.

### Phase 4: Utility mirror sync
- Port stable changes into `/Users/andriaus/Projects/personal/Utilities/Redact`.
- Update utility docs/examples for hybrid mode usage.

## 13. Risks and Mitigations
- OCR misses in dense tables.
- Layout drift causing replacement misalignment.
- Overuse of fallback masking reducing UX quality.

Mitigations:
- Precision coordinate gate for replacement-critical fields.
- Strict `must_not_ocr` and `must_replace_patterns` checks.
- Hash/layout invalidation for stale coordinate maps.
- Restrict fallback to token-level events.

## 14. Acceptance Criteria
Implementation is accepted when all are true:
- Hybrid render modes are available and contract-driven.
- Field policy outcomes match this specification on critical pages.
- No forbidden sensitive patterns remain OCR-detectable.
- Required replacement patterns are present where configured.
- Protected labels remain visible and unmasked.
- All required commands pass without new redaction-attributable errors.

## 15. Per-Field Contract (Authoritative V2)
This section is the required field-level contract for analysis, decision, and final anonymized value strategy.

### 15.1 Placeholder Dictionary (for `replace`)
| Kind | Output format contract | Output length contract |
|---|---|---|
| `hostname_primary` | `example.domain.com` (fixed) | 18 chars |
| `hostname_db` | `db.example.internal` (fixed) | 19 chars |
| `ipv4_seq` | `123.123.123.N` where `N` starts at `123` and increments per hit | 15 chars |
| `port_seq` | decimal port, starts `12345`, increments by `1` per hit | 5 chars |
| `sql_user` | `dbuserNN` (`NN` zero-padded sequence) | 8 chars |
| `sql_database` | `ipcom_demo` (fixed) | 10 chars |
| `path_private_key` | `/etc/ssl/private/example-key.pem` (fixed) | 32 chars |
| `path_public_key` | `/etc/ssl/certs/example-cert.pem` (fixed) | 31 chars |

### 15.2 Field Matrix (analysis + decision + value)
| Field ID | Coverage (screens/rules) | Type and length analysis | Decision | Decided replacement value/pattern | Validation contract | Status |
|---|---|---|---|---|---|---|
| `instance_badge_waw01` | all `waw_badge` targets | short alphanumeric label, approx 5 chars, format is not instructional | `blur` | n/a | source token must not OCR-match | accepted |
| `footer_hostname` | `status.webp`, `logs.webp`, `general.webp`, `internal-events.webp`, `receivers.webp`, `outputs.webp`, `users.webp`, `incoming-events.webp`, `objects.webp` (`footer_hostname`) | FQDN, typical 12-40 chars | `replace` | fixed `example.domain.com` | `must_replace_patterns`: `\\bexample\\.domain\\.com\\b`; forbid `fill` except fallback | accepted |
| `footer_hostname_section` | `status-sections/footer-left.png` (`hostname_any`) | FQDN, typical 12-40 chars | `replace` | fixed `example.domain.com` | same as `footer_hostname` | accepted |
| `ipv4_status` | `status.webp`, `status-sections/output-buffers.png`, `status-sections/connected-users.png` (`ipv4_any`) | IPv4 token, source length 7-15 | `replace` | `123.123.123.123+` sequence | `must_replace_patterns`: `\\b123\\.123\\.123\\.\\d{1,3}\\b`; original IP regex must not persist | accepted |
| `ipv4_outputs_whitelist` | `outputs.webp` (`outputs_ip_whitelist`) | IPv4 list entry, source length 7-15 | `replace` | `123.123.123.123+` sequence | same IPv4 replacement gate | accepted |
| `ipv4_incoming_events` | `incoming-events.webp` (`incoming_events_ids_ips`, reason `incoming_ip`) | IPv4 in table column, source length 7-15 | `replace` | `123.123.123.123+` sequence | same IPv4 replacement gate | accepted |
| `ipv4_objects` | `objects.webp`, `objects-sections/actions-and-filters.png`, `objects-sections/object-list-table.png` (`ipv4_any`) | IPv4 in object rows, source length 7-15 | `replace` for isolated IP cells; otherwise `blur` | replace uses `123.123.123.123+` | for replaced cells enforce IPv4 placeholder pattern; for blurred cells enforce source absence | accepted |
| `ports_receivers` | `receivers.webp` + receiver section screens (`receiver_ports`) | numeric TCP/UDP/COM/modem port, source length 1-5 | `replace` | `12345+` sequence | `must_replace_patterns`: `\\b123\\d{2}\\b`; original sensitive ports must not OCR-match | accepted |
| `ports_api_http_https` | `general-sections/api-settings.png` (`api_ports`) | numeric API port, source length 2-5 | `replace` | `12345+` sequence | same port replacement gate | accepted |
| `port_sql` | `general-sections/database-settings.png` (`db_ports`) and `general.webp` (`general_db_values`, reason `sql_port_value`) | numeric SQL port, source length 2-5 | `replace` | `12345+` sequence | same port replacement gate | accepted |
| `sql_host_value` | `general.webp`, `general-sections/database-settings.png` (`general_db_values`, reason `sql_host_value`) | hostname/domain, source length 5-64 | `replace` | fixed `db.example.internal` | `must_replace_patterns`: `\\bdb\\.example\\.internal\\b`; source host tokens must not remain | accepted |
| `sql_user_value` | `general.webp`, `general-sections/database-settings.png` (`general_db_values`, reason `sql_user_value`) | login-like identifier, source length 4-32 | `replace` | `dbuserNN` sequence, starting `dbuser01` | `must_replace_patterns`: `\\bdbuser\\d{2}\\b`; source user tokens must not remain | accepted |
| `sql_database_value` | `general.webp`, `general-sections/database-settings.png` (`general_db_values`, reason `sql_database_value`) | DB name token, source length 3-64 | `replace` | fixed `ipcom_demo` | `must_replace_patterns`: `\\bipcom_demo\\b`; source DB tokens must not remain | accepted |
| `private_key_value` | `general.webp`, `general-sections/api-settings.png` (`general_db_values`, reason `private_key_value`/`private_key_value_seg`) | file path, source length ~20-120 | `replace` | fixed `/etc/ssl/private/example-key.pem` | `must_replace_patterns`: `/etc/ssl/private/example-key\\.pem`; source path fragments must not remain | accepted |
| `public_key_value` | `general.webp`, `general-sections/api-settings.png` (`general_db_values`, reason `public_key_value`/`public_key_value_seg`) | file path/cert ref, source length ~20-120 | `replace` | fixed `/etc/ssl/certs/example-cert.pem` | `must_replace_patterns`: `/etc/ssl/certs/example-cert\\.pem`; source path/domain fragments must not remain | accepted |
| `logs_mac_imei_hex` | `logs.webp` (`logs_identifiers`: `mac`, `imei`, `hex_identifier`) | high-entropy identifiers, variable length (12-32+) | `blur` | n/a | source identifiers must not OCR-match | accepted |
| `incoming_events_uid` | `incoming-events.webp` (`incoming_events_ids_ips`, reason `incoming_uid`) | long numeric/identifier column, source length often 10+ | `blur` | n/a | source UID tokens must not OCR-match | accepted |
| `incoming_events_puid` | `incoming-events.webp` (`incoming_events_ids_ips`, reason `incoming_puid`) | long numeric/identifier column, source length often 10+ | `blur` | n/a | source PUID tokens must not OCR-match | accepted |
| `users_name_non_admin` | `users.webp`, `users-sections/users-table.png` (`users_name_login_non_admin`) | personal name token(s), variable length | `blur` (keep `admin`/`administrator`) | n/a | non-admin identities absent after OCR; admin row preserved | accepted |
| `users_login_non_admin` | `users.webp`, `users-sections/users-table.png` (`users_name_login_non_admin`) | login identifier, source length 3-32 | `blur` (keep `admin`/`administrator`) | n/a | same as above | accepted |
| `objects_uid` | `objects.webp` + object section screens (`objects_uid_iccid`, reason `uid_iccid`) | mixed alphanumeric UID, source length >=8 with numeric payload | `blur` | n/a | source UID tokens absent after OCR | accepted |
| `objects_iccid` | `objects.webp` + object section screens (`objects_uid_iccid`, reason `iccid_long`) | ICCID-like numeric identifier, source length 19-22 | `blur` now; candidate `replace` later | future candidate `8912345678901234567+` | current gate is source absence; add replacement regex if mode is changed | `[REVIEW]` |

### 15.3 Contract Rules
1. For every row with decision `replace`, `must_replace_patterns` is mandatory in requirements.
2. For every row with decision `blur`, replacement pattern checks are not required, but source-token absence is required.
3. All `replace` rows must define `expected_boxes` on critical images before final rollout.
4. If `expected_boxes` fails overlap/size tolerances, renderer must fall back per-token and report fallback event.
5. Any contract row marked `[REVIEW]` blocks promotion to strict replace mode for that field.

## 16. Implementation Note
This specification intentionally keeps the existing OCR + rules architecture and extends it for quality and UX. External tooling research remains backlog work, not a blocker for V2 delivery.
