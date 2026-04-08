function parseArgs(argv) {
  const result = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = "1";
    }
  }

  return result;
}

function requiredValue(value, name) {
  if (!value) {
    throw new Error(`Missing required ${name}.`);
  }
  return value;
}

function buildHeaders(identifier, key, tier) {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${identifier}:${key}`).toString("base64")}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  if (tier) {
    headers["X-Crisp-Tier"] = tier;
  }

  return headers;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(payload)}`);
  }

  return payload;
}

function desiredPayload(currentSettings) {
  const currentChatbox =
    currentSettings && typeof currentSettings.chatbox === "object" && currentSettings.chatbox
      ? currentSettings.chatbox
      : {};
  const currentInbox =
    currentSettings && typeof currentSettings.inbox === "object" && currentSettings.inbox
      ? currentSettings.inbox
      : {};
  const blockedLocales = Array.isArray(currentChatbox.blocked_locales) ? currentChatbox.blocked_locales : [];
  const allowedLocales = new Set(["en", "lt", "es", "ru"]);

  return {
    ...currentSettings,
    inbox: {
      ...currentInbox,
      locale: ""
    },
    chatbox: {
      ...currentChatbox,
      position_reverse: false,
      color_theme: "red",
      color_mode: "auto",
      hide_on_away: true,
      locale: "",
      mode_initial: "chat",
      blocked_locales: blockedLocales.filter((locale) => !allowedLocales.has(locale))
    }
  };
}

function summarize(settings) {
  const chatbox = settings.chatbox || {};
  const inbox = settings.inbox || {};
  return {
    inbox_locale: inbox.locale || "",
    position_reverse: chatbox.position_reverse,
    color_theme: chatbox.color_theme,
    color_mode: chatbox.color_mode,
    hide_on_away: chatbox.hide_on_away,
    locale: chatbox.locale || "",
    mode_initial: chatbox.mode_initial,
    blocked_locales: chatbox.blocked_locales || []
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const websiteId = requiredValue(args["website-id"] || process.env.CRISP_WEBSITE_ID, "website id");
  const identifier = requiredValue(args.identifier || process.env.CRISP_IDENTIFIER, "Crisp identifier");
  const key = requiredValue(args.key || process.env.CRISP_KEY, "Crisp key");
  const tier = args.tier || process.env.CRISP_TIER || "";
  const headers = buildHeaders(identifier, key, tier);
  const apiRoot = `https://api.crisp.chat/v1/website/${websiteId}`;

  const before = await requestJson(`${apiRoot}/settings`, { headers });
  const payload = desiredPayload(before.data || {});

  if (args["dry-run"] === "1") {
    console.log(
      JSON.stringify(
        {
          websiteId,
          before: summarize(before.data || {}),
          payload
        },
        null,
        2,
      ),
    );
    return;
  }

  await requestJson(`${apiRoot}/settings`, {
    body: JSON.stringify(payload),
    headers,
    method: "PATCH"
  });

  const after = await requestJson(`${apiRoot}/settings`, { headers });
  console.log(
    JSON.stringify(
      {
        websiteId,
        before: summarize(before.data || {}),
        after: summarize(after.data || {}),
        applied: payload
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
