# Protegus app manual: proposed outline (draft for Andrius)

Not published. Proposed 2026-10-29, revised the same day after a Codex review. Facts in the
manual follow `team-questions.md`: source first, then Igoris reviews every app fact, and Vytautas
the product and commercial ones. Nothing unconfirmed is published, not even with an "unverified"
label.

## Order by usage

PostHog (production web.protegus.app, 30 days to 2026-10-29) decides the order, never the facts. The numbers
are kept in the private Workspace (`Products/Protegus-app-manual-private.md`), not here: this repo is public.

- Most used, in order: arm, control an output, disarm, event history, log in, the area screen, system
  settings, the users list, "add a system", zone status, edit a user, system information, notification
  settings, Advanced settings, password reset.
- Where users fail most: arming and disarming (open zones first, then the panel rejecting the command and a
  wrong keypad code), log-in, and adding a system (most who open it don't reach the details step).
- Phones dominate; few open the desktop layout or the company screens.

## Proposed outline

**One page,** `docs/en/protegus/index.md`, "Protegus app", in the site's single-page form:
numbered sections, one PDF, one place to search. Installer and company procedures are labelled
as such, and each says what permission it needs. Split company administration into its own
manual only if it grows.

**Device configuration** (Advanced settings) stays in each product's manual, which already has
"Protegus app" tabs. This manual links to them.

| # | Section | Contents | Why | Write |
|---|---|---|---|---|
| 1 | Getting started | Install, register, log in (email, Google, Apple), choose account, region, password reset, two-factor and losing it, replacing a phone | Everyone starts here; a common failure | 3 |
| 2 | Getting a system into the app | Three paths: **you were invited** (accept the invitation), **the system was handed over to you** (ownership transfer), **new installation** (Unique ID or QR, the offline screen, details, areas and zones, Bluetooth and Wi-Fi setup, a device already in another account) | Biggest drop-off; an end user arrives by invitation, not by "add" | **2** |
| 3 | The home screen | A short orientation: system list, system dashboard, areas, outputs, statuses. The full icon list can wait | Every user sees it | 6 |
| 4 | Arming and disarming | Arm, stay/sleep, disarm; what "sent" vs "confirmed" means; keypad code, Remember and Forget PIN; open zones and bypass; why arming fails | Top action and top failure | **1** |
| 5 | Controlling outputs | Gates, lights, pulse vs on/off; an output command vs whether the gate really moved; output quick view and settings | Second most used action | 4 |
| 6 | Users and permissions | Owner and users, inviting, what each user may do, keypad codes, output rights, revoking access, transfer ownership and what it changes, owner privacy | The most frustrated screen | 5 |
| 7 | Events and notifications | Event history and filters, notification settings, and right beside them: notifications don't arrive | Fourth most used | 7 |
| 8 | Which code is which | Account password, panel keypad code (PIN), the Protegus service access code, the configuration access code (administrator/installer). Where each is set and which error means which | Customers mix them up, and the app has a separate error for each | 8 |
| 9 | System settings | Information, zones, areas, sensors, cameras, re-read, delete, fire reset, home screen layout | Used often, screen by screen | 9 |
| 10 | Advanced settings | Who can open it, administrator vs installer code, links to each product's settings | Installer questions | 10 |
| 11 | Company accounts | Not written here. Aivaras is writing a separate Protegus 2 Company manual covering the whole company side (company settings, templates, support e-mail, tags, roles, clients, sub-companies, payments), checked against the app (his email, 2026-11-26). Link to it once it is published | Avoids two texts on one subject | — |
| 12 | Account, help and support | Profile, language, password, delete account; Help, support ticket; **what to send support** (app version, system, time, exact error) | Where users ask for help | 12 |
| 13 | Troubleshooting | A symptom index that links to the fixes in sections 1–11, not a second copy of them | | with each section |

**Not decided:** the payment/plan and order screens, and "request assistance" / "change
installer" are in the app. Whether and how to cover them is Vytautas's commercial question
(where they apply, and what they cost).

## How the text is written (so people and Joy find the answer)

- **Headings:** a task as the heading ("Arm or disarm an area"), and each failure as a question
  under it, with the app's exact error text ("Why does arming fail with 'Incorrect keypad code'?").
- **Each passage:** a direct answer first, then conditions (permission, device, firmware), numbered
  steps, and what you should see when it worked. A caveat sits next to the claim it limits.
- **Words:** symptom words people use (white screen, gate doesn't open) beside the app's own labels.
  No screenshot-only steps, and no vague "this code" or generic "Settings".
- **FAQ entries:** pulled in at the matching section and in a "Common questions" digest at the top.
  Before choosing one page or several for Joy's sake, test about 20 real questions against the
  built page, including answers inside the collapsed FAQ blocks.
- **Phone first:** write the phone layout. Desktop only where it differs, and in the company
  section, which is desktop-only. Use a "Phone / Desktop" tab only where the steps really differ.

## From the April plan: kept and dropped

- **Kept:**
  - one manual, not two;
  - screenshots with sample data only (they show the screens; they don't prove server behaviour);
  - a list of uncertain facts outside the page;
  - the normal path first, failures separately.
- **Dropped:**
  - "AI support guidance" blocks in public pages: Joy's rules belong in Joy;
  - status front matter and per-article agent folders: `team-questions.md` does this;
  - separate desktop and mobile agents.

## Open decisions for Andrius

1. One page now, split later?
2. Start writing with sections 4 and 2 (arming, getting a system in)?
3. Payment, assistance and change-installer screens: include them (needs Vytautas), or leave them out for now?
