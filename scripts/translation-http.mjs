const MAX_ATTEMPTS = 4;
const TIMEOUT_MS = 180000;
const MAX_RETRY_DELAY_MS = 120000;

export class TranslationError extends Error {
  constructor(category, message, status) {
    super(`${category}: ${message}`);
    this.category = category;
    this.status = status;
  }
}

export function readConfiguration(env = process.env) {
  const apiKey = env.TRANSLATION_API_KEY;
  const model = env.TRANSLATION_MODEL;
  let endpoint;
  try {
    endpoint = new URL(env.TRANSLATION_API_ENDPOINT);
  } catch {
    throw new TranslationError("CONFIGURATION", "set a valid TRANSLATION_API_ENDPOINT");
  }
  if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
    throw new TranslationError("CONFIGURATION", "the endpoint must use HTTPS without credentials, query parameters or fragments");
  }
  if (!apiKey?.trim() || !model?.trim()) {
    throw new TranslationError("CONFIGURATION", "set TRANSLATION_API_KEY and TRANSLATION_MODEL");
  }
  return { endpoint: endpoint.href, apiKey, model };
}

export function retryDelay(value, attempt, now = Date.now(), random = Math.random) {
  if (value) {
    const seconds = Number(value);
    const delay = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(value) - now;
    if (Number.isFinite(delay) && delay >= 0) return delay;
  }
  return Math.min(30000, 1000 * 2 ** attempt) + Math.floor(random() * 500);
}

function errorDetail(payload) {
  const error = payload?.error && typeof payload.error === "object" ? payload.error : payload;
  const values = [error?.type, error?.code, error?.message, error?.detail]
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map((value) => String(value).replace(/[\r\n\t]+/g, " ").replace(/Bearer\s+\S+/gi, "Bearer [redacted]").slice(0, 300));
  return [...new Set(values)].join(" — ");
}

async function httpError(response) {
  let detail = "";
  try {
    detail = errorDetail(await response.json());
  } catch {
    detail = "";
  }
  const status = response.status;
  const category = status === 401 || status === 403 ? "AUTHENTICATION"
    : status === 429 ? "RATE_LIMIT"
      : status === 408 ? "TIMEOUT"
        : status >= 500 ? "REMOTE_SERVER" : "CONFIGURATION";
  return new TranslationError(category, `request rejected with HTTP ${status}${detail ? ` (${detail})` : ""}`, status);
}

export function parseCompletion(payload, model) {
  if (payload?.model !== model) {
    throw new TranslationError("INVALID_RESPONSE", "response does not identify the configured model");
  }
  const choice = payload?.choices?.[0];
  if (!Array.isArray(payload.choices) || payload.choices.length !== 1 || choice?.finish_reason !== "stop") {
    throw new TranslationError("INVALID_RESPONSE", "completion is missing, truncated or did not finish normally");
  }
  let value;
  try {
    value = JSON.parse(choice.message.content);
  } catch {
    throw new TranslationError("INVALID_RESPONSE", "completion must contain a JSON object");
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TranslationError("INVALID_RESPONSE", "completion must contain a JSON object");
  }
  const usage = {};
  for (const key of ["prompt_tokens", "completion_tokens", "total_tokens"]) {
    const count = payload.usage?.[key];
    if (Number.isSafeInteger(count) && count >= 0) usage[key] = count;
  }
  return { value, usage };
}

export async function requestCompletion(messages, options = {}) {
  const configuration = options.configuration ?? readConfiguration();
  const send = options.fetch ?? globalThis.fetch;
  const sleep = options.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    let response;
    let failure;
    try {
      response = await send(configuration.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${configuration.apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          model: configuration.model,
          temperature: 0,
          stream: false,
          response_format: { type: "json_object" },
          messages,
          ...(options.maxTokens ? { max_tokens: options.maxTokens } : {}),
        }),
        signal: AbortSignal.timeout(options.timeoutMs ?? TIMEOUT_MS),
      });
    } catch (error) {
      failure = new TranslationError(
        /Timeout|Abort/.test(error?.name) ? "TIMEOUT" : "REMOTE_SERVER",
        "request did not complete",
      );
    }
    if (response?.ok) {
      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new TranslationError("INVALID_RESPONSE", "response is not valid JSON");
      }
      return parseCompletion(payload, configuration.model);
    }
    if (response) {
      failure = await httpError(response);
      if (![408, 429, 500, 502, 503, 504].includes(response.status)) throw failure;
    }
    if (attempt === MAX_ATTEMPTS - 1) throw failure;
    const delay = retryDelay(response?.headers.get("retry-after"), attempt);
    if (delay > MAX_RETRY_DELAY_MS) throw failure;
    await sleep(delay);
  }
}
