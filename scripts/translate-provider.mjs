import { isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const LANGUAGE_NAMES = {
  en: "natural professional English",
  es: "natural neutral Spanish",
  de: "natural German",
  "pt-br": "natural Brazilian Portuguese",
  it: "natural standard Italian",
  ja: "natural Japanese editorial prose",
  "zh-cn": "natural Simplified Chinese editorial prose",
};
const BATCH_CHARACTERS = 12000;
const MAX_ATTEMPTS = 3;
let adapterPromise;

function serviceConfiguration() {
  const endpoint = process.env.TRANSLATION_ENDPOINT;
  const apiKey = process.env.TRANSLATION_API_KEY;
  const model = process.env.TRANSLATION_MODEL;
  if (!endpoint || !apiKey || !model) {
    throw new Error("set TRANSLATION_ENDPOINT, TRANSLATION_API_KEY and TRANSLATION_MODEL before generating translations");
  }
  let url;
  try {
    url = new URL(endpoint);
  } catch {
    throw new Error("TRANSLATION_ENDPOINT must be a valid HTTP or HTTPS URL");
  }
  if (!/^https?:$/.test(url.protocol) || url.username || url.password) {
    throw new Error("TRANSLATION_ENDPOINT must be an HTTP or HTTPS URL without embedded credentials");
  }
  return { endpoint: url.href, apiKey, model };
}

function chunksOf(segments) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const segment of segments) {
    const nextSize = JSON.stringify(segment).length;
    if (current.length > 0 && size + nextSize > BATCH_CHARACTERS) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(segment);
    size += nextSize;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

function responseTranslations(payload) {
  if (Array.isArray(payload?.translations)) return payload.translations;
  const message = payload?.choices?.[0]?.message?.content ?? payload?.output_text;
  const content = Array.isArray(message)
    ? message.map((part) => typeof part === "string" ? part : part?.text || "").join("")
    : message;
  if (typeof content !== "string") throw new Error("translation service returned an unsupported response shape");
  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("translation service returned invalid JSON");
  }
  if (!Array.isArray(parsed?.translations)) throw new Error("translation service response has no translations array");
  return parsed.translations;
}

function requestBody(segments, context, model) {
  const target = LANGUAGE_NAMES[context.targetLocale];
  if (!target) throw new Error(`unsupported target locale "${context.targetLocale}"`);
  return {
    model,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `Translate French editorial writing into ${target}. Preserve meaning, technical precision, tone and segment order. Do not add, remove, summarize or explain anything. Return only a JSON object with a translations array containing exactly one string per input segment. Preserve any technical token that appears in the input.`,
      },
      {
        role: "user",
        content: JSON.stringify({
          sourceLocale: context.sourceLocale,
          targetLocale: context.targetLocale,
          segments,
        }),
      },
    ],
  };
}

async function requestChunk(segments, context, configuration) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(configuration.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${configuration.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody(segments, context, configuration.model)),
        signal: AbortSignal.timeout(120000),
      });
      if (!response.ok) {
        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === MAX_ATTEMPTS) {
          throw new Error(`translation service request failed with HTTP ${response.status}`);
        }
        lastError = new Error(`translation service request failed with HTTP ${response.status}`);
      } else {
        const text = await response.text();
        if (text.length > 2_000_000) throw new Error("translation service response is too large");
        const output = responseTranslations(JSON.parse(text));
        if (output.length !== segments.length || output.some((value) => typeof value !== "string")) {
          throw new Error("translation service must return one string for every input segment");
        }
        return output;
      }
    } catch (error) {
      lastError = error;
      if (attempt === MAX_ATTEMPTS || !/fetch failed|timeout|aborted|HTTP 429|HTTP 5\d\d/i.test(error.message)) throw error;
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 1000 * 2 ** (attempt - 1)));
  }
  throw lastError;
}

async function loadModuleAdapter(provider) {
  const specifier = provider.startsWith(".") || isAbsolute(provider)
    ? pathToFileURL(resolve(process.cwd(), provider)).href
    : provider;
  adapterPromise ??= import(specifier);
  const adapter = await adapterPromise;
  if (typeof adapter.translateSegments !== "function") {
    throw new Error("custom translation module does not export translateSegments");
  }
  return adapter;
}

async function translateWithService(segments, context) {
  const configuration = serviceConfiguration();
  const output = [];
  for (const chunk of chunksOf(segments)) {
    output.push(...await requestChunk(chunk, context, configuration));
  }
  return output;
}

export async function translateSegments(segments, context) {
  const provider = process.env.TRANSLATE_PROVIDER_MODULE;
  const output = provider
    ? await (await loadModuleAdapter(provider)).translateSegments(segments, context)
    : await translateWithService(segments, context);
  if (!Array.isArray(output) || output.length !== segments.length) {
    throw new Error("translation service must return one string for every input segment");
  }
  return output;
}
