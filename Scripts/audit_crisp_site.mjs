import fs from "node:fs/promises";

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
    Accept: "application/json"
  };

  if (tier) {
    headers["X-Crisp-Tier"] = tier;
  }

  return headers;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let json = null;

  if (text) {
    try {
      json = JSON.parse(text);
    } catch (error) {
      json = { raw: text };
    }
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(json)}`);
  }

  return json;
}

async function head(url, options = {}) {
  const response = await fetch(url, { ...options, method: "HEAD" });
  return response.status;
}

async function maybeWriteOutput(filePath, payload) {
  if (!filePath) {
    return;
  }
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const websiteId = requiredValue(args["website-id"] || process.env.CRISP_WEBSITE_ID, "website id");
  const identifier = requiredValue(args.identifier || process.env.CRISP_IDENTIFIER, "Crisp identifier");
  const key = requiredValue(args.key || process.env.CRISP_KEY, "Crisp key");
  const tier = args.tier || process.env.CRISP_TIER || "";
  const headers = buildHeaders(identifier, key, tier);
  const apiRoot = `https://api.crisp.chat/v1/website/${websiteId}`;

  const settings = await requestJson(`${apiRoot}/settings`, { headers });
  const helpdeskStatus = await head(`${apiRoot}/helpdesk`, { headers });

  let helpdesk = null;
  let locales = [];
  if (helpdeskStatus === 200) {
    helpdesk = await requestJson(`${apiRoot}/helpdesk`, { headers });
    const localeResponse = await requestJson(`${apiRoot}/helpdesk/locales/1`, { headers });
    locales = localeResponse.data || [];
  }

  const summary = {
    websiteId,
    helpdeskStatus,
    settings: {
      name: settings.data?.name || "",
      domain: settings.data?.domain || "",
      inbox_locale: settings.data?.inbox?.locale || "",
      position_reverse: settings.data?.chatbox?.position_reverse,
      color_theme: settings.data?.chatbox?.color_theme,
      color_mode: settings.data?.chatbox?.color_mode,
      hide_on_away: settings.data?.chatbox?.hide_on_away,
      mode_initial: settings.data?.chatbox?.mode_initial,
      locale: settings.data?.chatbox?.locale || "",
      blocked_locales: settings.data?.chatbox?.blocked_locales || [],
      blocked_pages: settings.data?.chatbox?.blocked_pages || []
    },
    helpdesk: helpdesk
      ? {
          name: helpdesk.data?.name || "",
          url: helpdesk.data?.url || ""
        }
      : null,
    helpdeskLocales: locales.map((entry) => ({
      locale: entry.locale,
      url: entry.url,
      articles: entry.articles,
      categories: entry.categories
    }))
  };

  await maybeWriteOutput(args.out, summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
