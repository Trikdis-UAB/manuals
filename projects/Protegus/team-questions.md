# Protegus app manual and FAQ: facts to confirm

Not published. Each Protegus app fact in the FAQ (`docs/en/faq/index.md`, `## Protegus app`) and
later the manual is listed here with its source, until the right person confirms it.
Igoris confirms app facts; Vytautas Petrovas confirms product and commercial facts
(`NOTES/agent-lessons/who-confirms-product-facts.md`). Questions go to them only through Andrius.

Answer from the source first and ask only what it can't settle: Igoris reviews the finished
entries, and gets a question only where the code and the API docs are silent or disagree.

Sources used (2026-10-29):
- Engineers' replies to customers in the Joy email eval (local only, cases named by id, no customer data here).
- Front-end source `Protegus_v3`, branch `master_eu_beta` at 3455abf0 (2026-10-27); the parts used were
  checked to be on `master_eu` (the released line) too.
- English app labels from the public translations endpoint, pack version 2610261621.
- API docs `protegus_internal_api` (describe the server's behaviour; the server source itself is not reachable).

## Status by FAQ entry

| Anchor | Claim | Source | Status |
|---|---|---|---|
| `protegus-installer-restrictions` | Advanced settings first tries the default administrator code 123456; if the device accepts it, access is full and the installer limits don't apply; they apply only with the installer code | Front-end: configurator read flow (default code, then the "Configuration access code" prompt). **Differs from the brief's wording** ("the owner gets full access whatever the installer restrictions", Vytautas e-06): it is the access code, not ownership, that gives full access | **Confirmed** by Igoris 2026-10-30 |
| `protegus-incorrect-keypad-code` | The panel rejected the code; a remembered code belongs to one account and one area; **Forget PIN** clears it; the next arm asks for the code | Vytautas (e-03); front-end area view and area service; API docs: arm/disarm (error text "Incorrect keypad code. Please try again.", `badPin`), forget-PIN | **Confirmed** by Igoris 2026-10-30 |
| `protegus-company-support-email` | **Help → Support ticket** about a company's system goes to that company's **Support e-mail** | Andrius (e-08); front-end: the ticket sends the account and the open system; API docs: help endpoint routes by the system's owning company | **Confirmed** by Igoris 2026-10-30 |
| ~~`protegus-white-screen`~~ | Removed 2026-10-30 | Igoris: the white-screen problem no longer happens; Aleksejus fixed it. The entry described a bug, so it isn't published | Closed |
| `protegus-company-tags` | Tag the systems and the installer; the installer's role needs View on **All systems** | Andrius (e-08). Server-side, and **the API docs disagree with each other**: tag list says a tagged user sees *only* systems sharing a tag; system-tag says a tag adds systems *on top of* what the user sees; system list says **All systems** shows every company system and an installer sees only tagged systems they installed. The app's own label for **All systems** also says "every system belonging to the company". Igoris answered (2026-10-30): "Montuotojas mato sistemas pagal žymes" (the installer sees systems by their tags), and approved the entry. The entry now adds "The installer then sees the systems that carry the tag." | **Confirmed** by Igoris 2026-10-30 |
| ~~`protegus-apporteq-end-of-life`~~ | Removed 2026-10-29: Andrius decided the Protegus manual and FAQ don't mention ApporteQ | | Closed |

## Questions (Lithuanian)

Drafted 2026-10-29 as a Gmail draft from joy@trikdis.lt, for Andrius to send: to Igoris
"Protegus programėlės DUK: klausimas ir įrašų patikra" (question 1 plus the five app entries
to review). The question on how the phone app loads was dropped: Andrius answered it. The draft to Vytautas (question 3) was dropped with the ApporteQ entry.
Record the answers here and move each entry's status to confirmed.

Sent 2026-10-29 19:23; Igoris replied 2026-10-30 08:53 (thread 1a18894f47b759a9): entries 2–5 OK, the white-screen problem fixed by Aleksejus, tags answered. The FAQ entries are done; the manual page sections still need his review.

Igoris (plus: peržiūrėti penkis DUK įrašus):

1. Žymės: montuotojas ir penkios sistemos turi tą pačią žymę. Ar jis mato tas sistemas, jei pats jų nesumontavo? Ir jei jo rolė turi „Visos sistemos“ peržiūrą, ar mato tik tas penkias, ar visas įmonės sistemas?


## Manual page `docs/en/protegus/index.md` (drafted 2026-10-29)

Sections 1 "Getting a system into the app" and 2 "Arming and disarming". Sources: front-end at
163fd1f2 (2026-10-29; on that day `origin/master_eu` and `origin/master_eu_beta` were the same
commit), the English label pack, and the API docs (set-area-status, area-pin, bypass-*,
cancel-alarm, user, transfer, activate, get-system-info-new, online, create-system). Screen labels
and messages are quoted from the labels or the API docs' "typical error text".

Not read from source, so Igoris must confirm (they are advice or wording, not code):

- Section 1: "If an installer set up your system, you don't add it again; ask to be invited or handed over."
- Expired invitation link: "Ask the owner to add you again."
- "System already exists": "Ask its owner to hand it over or invite you." Device of another company: "Contact that company."
- "Some data could not be read … PC Download code": "check the PC download code in the device settings."
- Step 4 is simplified to "Some communicators (GET, GT, GT+) offer Select the monitoring station". In code it is shown to a General user adding a G-family device, or to anyone with the device-setup-template right.
- The failure table's "What to do" column: "Try again; if it repeats, contact your installer" (panel refused) and "Try again, or disarm at the keypad" (disarm didn't take).
- "A bypassed zone does not cause an alarm."
- "Finish without transferring": the code shows it only when the system carries an installer access grant that hasn't been transferred yet. The page says only "in some cases". Igoris: when does an installer see it?

New questions (Lithuanian, for the next message to Igoris):

2. „Device could not process request, it may have been malformed“ (centralė atmetė komandą) gauna daug naudotojų. Kodėl taip būna dažniausiai ir ką naudotojui daryti?

## Manual page: "Controlling outputs" (drafted 2026-11-28)

Sources: released front-end `origin/master_eu` at 634717bf (2026-11-17; the output screens are the same
in beta 5e0b73e5), the label pack of 2026-11-18, and the API docs (toggle-pgm, pgm). Not read from
source, so Igoris must confirm:

- "The icon shows the output's state as the device reports it, not whether the gate or door really
  moved." The device reports the output's state (toggle-pgm); the sentence about the gate is our inference.
- The failure table's "What to do" column: "Try again in a moment" (no answer) and "Ask the owner or
  installer to check your user in the device" (device refused).
- The GATOR safety confirmation is shortened to one sentence. In code it appears for output 5 with
  Advanced Gator Monitoring on and an input bypassed.

Bugs seen: listed in the private Workspace note `Products/Protegus-app-manual-private.md` (this repo is public).

## Manual page: "Getting started" (drafted 2026-11-28)

Sources: released front-end `origin/master_eu` 634717bf (login, register, reset, two-factor, biometric
screens; beta differs only in an offline programming mode and region-from-link), the label pack of
2026-11-18, and the API docs (auth/login, register, activate, password-reset-*, 2fa-*, biometric-login).
Not read from source, so Igoris must confirm:

- Settled 2026-11-28 from the live EU log-in page (web.protegus.app): it shows the Google button and
  the **Your region** choice on the email step.
- The advice column of the log-in table ("check the email and the region", "wait, then try again").

One log-in behaviour is deliberately left out of the public page, and the bugs seen are listed: both in
the private Workspace note `Products/Protegus-app-manual-private.md` (this repo is public).

## Bugs found while reading the code

Listed in the private Workspace note `Products/Protegus-app-manual-private.md` (this repo is public), for the developers. Not in this repo.
