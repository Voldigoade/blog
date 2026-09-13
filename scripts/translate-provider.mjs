import { spawn } from "node:child_process";
import { isAbsolute, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const LANGUAGE_NAMES = {
  en: "natural professional English",
  es: "natural neutral Spanish",
  de: "natural German",
  "pt-br": "natural Brazilian Portuguese",
  it: "natural standard Italian",
  ja: "natural Japanese editorial prose",
  "zh-cn": "natural Simplified Chinese editorial prose",
};
const SUPPORTED_TARGETS = Object.keys(LANGUAGE_NAMES);
const BATCH_CHARACTERS = 12000;
const MAX_ATTEMPTS = 3;

const WORKER_URL = new URL("./translation-worker.py", import.meta.url);
let workerPromise;

function pythonCandidates() {
  if (process.env.PYTHON_BIN) return [[process.env.PYTHON_BIN]];
  if (process.env.PYTHON) return [[process.env.PYTHON]];
  if (process.platform === "win32") return [["python"], ["python3"], ["py", "-3"]];
  return [["python3"], ["python"]];
}

function readLines(stream, onLine) {
  let buffer = "";
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    buffer += chunk;
    let end;
    while ((end = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, end).trim();
      buffer = buffer.slice(end + 1);
      if (line) onLine(line);
    }
  });
}

function startLocalWorker() {
  const attempts = pythonCandidates();
  return new Promise((resolveStartup, rejectStartup) => {
    const tryNext = (index, lastError) => {
      if (index >= attempts.length) {
        rejectStartup(lastError || new Error("no Python interpreter available for local translation"));
        return;
      }
      const [command, ...prefix] = attempts[index];
      let child;
      try {
        child = spawn(command, [...prefix, fileURLToPath(WORKER_URL)], {
          stdio: ["pipe", "pipe", "pipe"],
          env: { ...process.env, TOKENIZERS_PARALLELISM: "false", PYTHONIOENCODING: "utf-8" },
        });
      } catch (error) {
        tryNext(index + 1, error);
        return;
      }
      const worker = {
        child,
        pending: new Map(),
        nextId: 1,
        ready: false,
        dead: false,
        stderrTail: [],
      };
      const failAll = (error) => {
        worker.dead = true;
        for (const [, entry] of worker.pending) entry.reject(error);
        worker.pending.clear();
      };
      child.on("error", (error) => {
        if (!worker.ready && error?.code === "ENOENT") {
          tryNext(index + 1, error);
          return;
        }
        failAll(error);
        if (!worker.ready) rejectStartup(error);
      });
      child.on("exit", (code) => {
        const tail = worker.stderrTail.join("\n");
        const error = new Error(
          `local translation worker exited with code ${code}${tail ? `: ${tail.slice(-2000)}` : ""}`,
        );
        failAll(error);
        if (!worker.ready) rejectStartup(error);
      });
      child.stderr.setEncoding("utf8");
      child.stderr.on("data", (chunk) => {
        worker.stderrTail.push(chunk);
        if (worker.stderrTail.length > 20) worker.stderrTail.shift();
        process.stderr.write(`[translation-worker] ${chunk}`);
      });
      readLines(child.stdout, (line) => {
        let message;
        try {
          message = JSON.parse(line);
        } catch {
          return;
        }
        if (!worker.ready) {
          if (message?.ready === true) {
            worker.ready = true;
            resolveStartup(worker);
          }
          return;
        }
        const entry = worker.pending.get(message?.id);
        if (entry) {
          worker.pending.delete(message.id);
          entry.resolve(message);
        }
      });
    };
    tryNext(0);
  });
}

function localWorker() {
  workerPromise ??= startLocalWorker();
  return workerPromise;
}

export async function closeProvider() {
  if (!workerPromise) return;
  const worker = await workerPromise.catch(() => undefined);
  workerPromise = undefined;
  if (!worker || worker.dead) return;
  try {
    worker.child.stdin.end();
  } catch {
    worker.child.kill("SIGKILL");
    return;
  }
  await new Promise((resolveClose) => {
    const timer = setTimeout(() => {
      worker.child.kill("SIGKILL");
      resolveClose();
    }, 30000);
    timer.unref?.();
    worker.child.once("exit", () => {
      clearTimeout(timer);
      resolveClose();
    });
  });
}

function sendRequest(worker, payload) {
  return new Promise((resolveRequest, rejectRequest) => {
    if (worker.dead) {
      rejectRequest(new Error("local translation worker is not running"));
      return;
    }
    const id = worker.nextId++;
    worker.pending.set(id, { resolve: resolveRequest, reject: rejectRequest });
    worker.child.stdin.write(`${JSON.stringify({ ...payload, id })}\n`, (error) => {
      if (error) {
        worker.pending.delete(id);
        rejectRequest(error);
      }
    });
  });
}

function hasUrlScheme(value) {
  return /(?:https?:\/\/|mailto:)/i.test(value);
}

async function translateWithLocalModel(segments, context) {
  if (context.sourceLocale !== "fr" || !SUPPORTED_TARGETS.includes(context.targetLocale)) {
    throw new Error(`unsupported locale pair "${context.sourceLocale}->${context.targetLocale}"`);
  }
  const worker = await localWorker();
  const response = await sendRequest(worker, {
    sourceLocale: context.sourceLocale,
    targetLocale: context.targetLocale,
    segments,
  });
  if (response?.error) {
    throw new Error(`local translation failed (${context.targetLocale}): ${response.error}`);
  }
  const output = response?.translations;
  if (!Array.isArray(output) || output.length !== segments.length) {
    throw new Error("local translation must return one string for every input segment");
  }
  for (const [index, value] of output.entries()) {
    if (typeof value !== "string") {
      throw new Error(`local translation segment ${index} is not a string (${context.targetLocale})`);
    }
    if (segments[index].trim() && !value.trim()) {
      throw new Error(`local translation segment ${index} is empty (${context.targetLocale})`);
    }
    if (value.trim() && hasUrlScheme(value)) {
      throw new Error(`local translation segment ${index} introduces a URL (${context.targetLocale})`);
    }
  }
  return output;
}

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
  const adapter = await import(specifier);
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
  if (provider) {
    const output = await (await loadModuleAdapter(provider)).translateSegments(segments, context);
    if (!Array.isArray(output) || output.length !== segments.length) {
      throw new Error("translation service must return one string for every input segment");
    }
    return output;
  }
  if (process.env.TRANSLATION_PROVIDER === "remote") {
    return translateWithService(segments, context);
  }
  return translateWithLocalModel(segments, context);
}
