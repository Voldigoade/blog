import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const LANGUAGE_NAMES = {
  en: "native professional English",
  es: "native neutral Spanish",
  de: "native professional German",
};
const MAX_ATTEMPTS = 3;
const MAX_OUTPUT_BYTES = 5_000_000;
const DEFAULT_TIMEOUT_MS = 900_000;

export class TranslationProviderError extends Error {
  constructor(category, message) {
    super(`${category}: ${message}`);
    this.category = category;
  }
}

export function sanitizeProviderText(value, secrets = []) {
  let text = String(value ?? "");
  for (const secret of secrets.filter(Boolean)) text = text.replaceAll(secret, "[redacted]");
  return text
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/(?:api[_-]?key|authorization|auth(?:entication)?)[\s:=]+[^\s,;]+/gi, "$1 [redacted]")
    .replace(/[\r\n\t]+/g, " ")
    .slice(-2000);
}

export function readProviderConfiguration(env = process.env) {
  const apiKey = env.TRANSLATION_API_KEY?.trim();
  const model = env.TRANSLATION_MODEL?.trim();
  const command = env.TRANSLATION_CLI_BIN?.trim() || "opencode";
  if (!apiKey || !model) {
    throw new TranslationProviderError("CONFIGURATION", "set TRANSLATION_API_KEY and TRANSLATION_MODEL");
  }
  if (!/^opencode\/[a-z0-9._-]+-free$/i.test(model)) {
    throw new TranslationProviderError("CONFIGURATION", "TRANSLATION_MODEL must identify an explicitly free OpenCode model");
  }
  return { apiKey, model, command };
}

function publicationShape(value) {
  return {
    title: value.title || "",
    description: value.description || "",
    heroImageAlt: value.heroImageAlt || "",
    coverAlt: value.coverAlt || "",
    seriesTitle: value.seriesTitle || "",
    body: value.body || "",
  };
}

export function buildTranslationPrompt(source, context, options = {}) {
  const target = LANGUAGE_NAMES[context.targetLocale];
  if (context.sourceLocale !== "fr" || !target) {
    throw new TranslationProviderError("CONFIGURATION", `unsupported locale pair ${context.sourceLocale}->${context.targetLocale}`);
  }
  const contract = [
    `Translate the complete French publication into ${target}.`,
    "Return only one valid JSON object with exactly these string fields: title, description, heroImageAlt, coverAlt, seriesTitle, body.",
    "Preserve every claim, negation, subject-object relationship, cause, comparison, chronology and distinction.",
    "Preserve every number, date, duration, percentage, quantity, unit, magnitude, name and entity.",
    "Preserve attribution, uncertainty and modality. Claims, allegations and possibilities must not become established facts.",
    "Do not summarize, omit, add, invent, explain or materially simplify anything.",
    "Write fluent native editorial prose with consistent terminology and the source's pacing and tone.",
    "Preserve all Markdown structure and every placeholder byte-for-byte, in the same order and position.",
    "Translate human-readable link labels but never modify protected destinations, code, math, paths, identifiers or syntax.",
    "Silently verify completeness and semantic fidelity before returning the final JSON. Do not return analysis, notes, prefaces or reasoning.",
  ];
  const payload = options.repairCandidate
    ? {
        task: "repair",
        targetLocale: context.targetLocale,
        defects: options.issues,
        authoritativeFrench: publicationShape(source),
        rejectedCandidate: publicationShape(options.repairCandidate),
      }
    : {
        task: "translate",
        targetLocale: context.targetLocale,
        authoritativeFrench: publicationShape(source),
      };
  if (options.repairCandidate) {
    contract.push("Correct every listed defect and return a complete replacement publication, not a partial patch.");
  }
  return `${contract.join("\n")}\n\n${JSON.stringify(payload)}`;
}

function parsePublicationJson(text) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  let value;
  try {
    value = JSON.parse(cleaned);
  } catch {
    throw new TranslationProviderError("INVALID_RESPONSE", "model output is not a JSON publication object");
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TranslationProviderError("INVALID_RESPONSE", "model output is not a JSON publication object");
  }
  const expected = ["title", "description", "heroImageAlt", "coverAlt", "seriesTitle", "body"];
  if (expected.some((key) => typeof value[key] !== "string")) {
    throw new TranslationProviderError("INVALID_RESPONSE", "model output has missing or non-string publication fields");
  }
  if (Object.keys(value).some((key) => !expected.includes(key))) {
    throw new TranslationProviderError("INVALID_RESPONSE", "model output contains unexpected publication fields");
  }
  return publicationShape(value);
}

export function parseCliOutput(stdout) {
  const lines = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const events = [];
  for (const line of lines) {
    try {
      events.push(JSON.parse(line));
    } catch {
      throw new TranslationProviderError("INVALID_RESPONSE", "CLI output contains a malformed JSON event");
    }
  }
  const errors = events.filter((event) => /error|failed/i.test(event.type || ""));
  if (errors.length > 0) {
    const detail = errors.map((event) => event.data?.message || event.data?.error || event.error || event.type).join(" — ");
    throw new TranslationProviderError(classifyFailure(detail), sanitizeProviderText(detail));
  }
  const sessionIds = [...new Set(events.map((event) => event.sessionID).filter((value) => typeof value === "string"))];
  if (sessionIds.length !== 1 || !sessionIds[0].startsWith("ses_")) {
    throw new TranslationProviderError("INVALID_RESPONSE", "CLI output does not identify exactly one valid session");
  }
  const text = events
    .map((event) => event.part?.text ?? event.data?.part?.text ?? event.text ?? event.data?.text)
    .filter((value) => typeof value === "string")
    .join("");
  if (!text.trim()) throw new TranslationProviderError("INVALID_RESPONSE", "CLI session returned no text payload");
  return { sessionId: sessionIds[0], publication: parsePublicationJson(text) };
}

export function classifyFailure(value) {
  const text = String(value ?? "");
  if (/429|rate.?limit|capacity|overload|temporar(?:y|ily) unavailable/i.test(text)) return "RATE_LIMIT";
  if (/timed?\s*out|timeout|aborted/i.test(text)) return "TIMEOUT";
  if (/401|403|unauthori[sz]ed|forbidden|authentication|invalid.?key/i.test(text)) return "AUTHENTICATION";
  if (/model.*(?:not found|unavailable|invalid)|provider.*(?:not found|unavailable)/i.test(text)) return "CONFIGURATION";
  return "REMOTE_SERVER";
}

function retryable(category) {
  return ["RATE_LIMIT", "TIMEOUT", "REMOTE_SERVER"].includes(category);
}

export async function withProviderRetries(operation, options = {}) {
  const sleep = options.sleep || ((delay) => new Promise((resolve) => setTimeout(resolve, delay)));
  const random = options.random || Math.random;
  const attempts = options.attempts || MAX_ATTEMPTS;
  let failure;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      failure = error instanceof TranslationProviderError
        ? error
        : new TranslationProviderError(classifyFailure(error?.message), sanitizeProviderText(error?.message));
      if (!retryable(failure.category) || attempt === attempts) throw failure;
      const delay = Math.min(30_000, 1000 * 2 ** (attempt - 1)) + Math.floor(random() * 500);
      await sleep(delay);
    }
  }
  throw failure;
}

function safeName(value) {
  return String(value || "translation").toLowerCase().replace(/[^a-z0-9._-]+/g, "-").slice(0, 100) || "translation";
}

export function runCliProcess(prompt, context, options = {}) {
  const configuration = options.configuration || readProviderConfiguration();
  const base = options.tempRoot || process.env.RUNNER_TEMP || tmpdir();
  const parent = join(base, "translation", safeName(context.slug), safeName(context.targetLocale));
  mkdirSync(parent, { recursive: true });
  const workDir = mkdtempSync(join(parent, "request-"));
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
  return new Promise((resolveRun, rejectRun) => {
    const childEnv = { ...process.env };
    delete childEnv.TRANSLATION_API_KEY;
    delete childEnv.TRANSLATION_API_ENDPOINT;
    childEnv.OPENCODE_AUTH_CONTENT = JSON.stringify({ opencode: { type: "api", key: configuration.apiKey } });
    childEnv.OPENCODE_CONFIG_CONTENT = JSON.stringify({ permission: { "*": "deny" } });
    childEnv.OPENCODE_DISABLE_AUTOUPDATE = "true";
    const args = ["--pure", "run", "--dir", workDir, "--model", configuration.model, "--format", "json", prompt];
    const child = spawn(configuration.command, args, { cwd: workDir, env: childEnv, shell: false, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (callback) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        rmSync(workDir, { recursive: true, force: true });
      } catch {
        undefined;
      }
      callback();
    };
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5000).unref?.();
      finish(() => rejectRun(new TranslationProviderError("TIMEOUT", "CLI translation exceeded its time limit")));
    }, timeoutMs);
    timer.unref?.();
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (Buffer.byteLength(stdout) > MAX_OUTPUT_BYTES) child.kill("SIGTERM");
    });
    child.stderr.on("data", (chunk) => {
      stderr = (stderr + chunk).slice(-100_000);
    });
    child.on("error", (error) => {
      finish(() => rejectRun(new TranslationProviderError(classifyFailure(error.message), sanitizeProviderText(error.message, [configuration.apiKey]))));
    });
    child.on("close", (code) => {
      finish(() => {
        if (Buffer.byteLength(stdout) > MAX_OUTPUT_BYTES) {
          rejectRun(new TranslationProviderError("INVALID_RESPONSE", "CLI output exceeded the safety limit"));
          return;
        }
        if (code !== 0) {
          const detail = sanitizeProviderText(stderr || stdout || `CLI exited with code ${code}`, [configuration.apiKey]);
          rejectRun(new TranslationProviderError(classifyFailure(detail), detail));
          return;
        }
        try {
          resolveRun(parseCliOutput(stdout));
        } catch (error) {
          rejectRun(error);
        }
      });
    });
  });
}

export async function translatePublication(source, context, options = {}) {
  const prompt = buildTranslationPrompt(source, context, options);
  const started = Date.now();
  const invoke = options.invoke || ((value, requestContext) => runCliProcess(value, requestContext, options));
  const result = await withProviderRetries(
    (attempt) => invoke(prompt, { ...context, attempt }),
    { sleep: options.sleep, random: options.random, attempts: options.attempts },
  );
  const publication = result.publication || result;
  const validated = publicationShape(publication);
  parsePublicationJson(JSON.stringify(validated));
  if (!validated.body.trim()) throw new TranslationProviderError("INVALID_RESPONSE", "translated publication body is empty");
  console.log(`Translation response accepted for ${context.locale || context.targetLocale}/${context.slug} in ${Date.now() - started} ms.`);
  return validated;
}

export async function closeProvider() {
  return undefined;
}
