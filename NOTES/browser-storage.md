# What docs.trikdis.com stores in the visitor's browser

The list a cookie or privacy policy needs. ePrivacy Art 5(3) treats local and session
storage like cookies. Update this file in the same commit as any script that adds, renames
or removes a key.

Checked against the code on 2026-10-28 (manuals main 5433af4).

## Cookies

- **Google Analytics** (`_ga`, `_ga_*`). Set only after the visitor presses Accept in the
  banner. Analytics.
- **Chatwoot widget** (chat.trikdis.com). Nothing from Chatwoot loads until the visitor
  clicks the chat button. The widget then stores a visitor id so the conversation can
  continue. Functional, on request.
- None from PostHog: it runs with `cookieless_mode: "always"`.

## localStorage (kept between visits)

| Key | Set by | What it holds | Kind |
|---|---|---|---|
| `/.__consent` | theme | the visitor's banner choice | strictly necessary |
| `/.__palette` | theme | light or dark | functional |
| `/.__tabs` | theme (`content.tabs.link`) | the content tab last chosen, so linked tabs match | functional |
| `trikdocs-chat-engaged` | support-chat.js | the visitor has opened the chat, so it comes back on later pages | functional |
| `trikdocs-chat-counted` | support-chat.js | chat numbers already reported to GA, so they aren't sent twice. Written only after analytics consent | analytics, behind consent |

## sessionStorage (cleared when the tab closes)

| Key | Set by | What it holds | Kind |
|---|---|---|---|
| `trikdocs-chat-teaser-dismissed` | support-chat.js | the visitor closed the chat invitation | functional |
| `trikdocs-chat-teaser-shown` | support-chat.js | the invitation was shown this visit, so it doesn't come back | functional |
| `trikdocs-chat-pdf-downloaded` | support-chat.js | products whose PDF was downloaded this visit (no invitation on those) | functional |
| `trikdocs-chat-preview-enabled` | support-chat.js | staff preview switch for the chat | functional |
| `communicatorsView` | communicators-toggle.js | the communicators page view last chosen | functional |
| `__pagefindPendingResultNavigation` | pagefind-modal-search.js | the search result being opened, removed once it opens | functional |

None of the sessionStorage or functional keys leave the browser.

## Cookieless analytics (PostHog, no storage)

Sent for every visitor, without consent: `$pageview`, `$pageleave`, `file_download`,
`search` (the settled term; never anything with "@" or 7+ digits in a row, at most 80
characters), `joy_chat_started` (chat number, language and `via`), and `joy_teaser_eligible`,
`joy_teaser_shown` and `joy_teaser_action` (the invitation). No search terms or identifiers
in the joy_ events. The IP address and the full browser string are deleted once the daily
visitor hash is computed. Details: `~/.codex/tool-registry.md`, docs site entry.
