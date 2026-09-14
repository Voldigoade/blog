import assert from "node:assert/strict";

import {
  TranslationProviderError,
  buildTranslationPrompt,
  parseCliOutput,
  readProviderConfiguration,
  sanitizeProviderText,
  translatePublication,
  withProviderRetries,
} from "./translate-provider.mjs";

const source = {
  title: "Titre",
  description: "Description",
  heroImageAlt: "",
  coverAlt: "Image",
  seriesTitle: "",
  body: "# Titre\n\nUn article cohérent.\n",
};
const translated = {
  title: "Title",
  description: "Description",
  heroImageAlt: "",
  coverAlt: "Image",
  seriesTitle: "",
  body: "# Title\n\nA coherent article.\n",
};

assert.throws(() => readProviderConfiguration({}), /CONFIGURATION/);
assert.throws(
  () => readProviderConfiguration({ TRANSLATION_API_KEY: "secret", TRANSLATION_MODEL: "opencode/example-paid" }),
  /explicitly free/,
);
assert.equal(
  readProviderConfiguration({ TRANSLATION_API_KEY: "secret", TRANSLATION_MODEL: "opencode/example-free" }).model,
  "opencode/example-free",
);

const prompt = buildTranslationPrompt(source, { sourceLocale: "fr", targetLocale: "en" });
assert.match(prompt, /complete French publication/);
assert.match(prompt, /Preserve every claim, negation/);
assert.match(prompt, /Silently verify completeness/);
assert.equal(prompt.includes("Un article cohérent."), true);

const repairPrompt = buildTranslationPrompt(source, { sourceLocale: "fr", targetLocale: "es" }, {
  repairCandidate: translated,
  issues: ["negation changed"],
});
assert.match(repairPrompt, /complete replacement publication/);
assert.match(repairPrompt, /negation changed/);

const event = JSON.stringify({
  type: "text",
  sessionID: "ses_fixture",
  part: { text: JSON.stringify(translated) },
});
assert.deepEqual(parseCliOutput(event).publication, translated);
assert.throws(() => parseCliOutput("not-json"), /malformed JSON event/);
assert.throws(
  () => parseCliOutput(JSON.stringify({ type: "error", sessionID: "ses_fixture", data: { message: "429 capacity" } })),
  (error) => error.category === "RATE_LIMIT",
);

const secret = "test-private-credential";
assert.equal(sanitizeProviderText(`Bearer ${secret}`, [secret]).includes(secret), false);

let retryCalls = 0;
const delays = [];
const retried = await withProviderRetries(async () => {
  retryCalls += 1;
  if (retryCalls === 1) throw new TranslationProviderError("RATE_LIMIT", "temporary capacity");
  return "ok";
}, { sleep: async (delay) => delays.push(delay), random: () => 0 });
assert.equal(retried, "ok");
assert.equal(retryCalls, 2);
assert.deepEqual(delays, [1000]);

let requests = 0;
const result = await translatePublication(source, {
  sourceLocale: "fr",
  targetLocale: "de",
  locale: "de",
  slug: "fixture",
}, {
  attempts: 1,
  invoke: async (requestPrompt, context) => {
    requests += 1;
    assert.match(requestPrompt, /native professional German/);
    assert.equal(context.slug, "fixture");
    return { publication: translated };
  },
});
assert.equal(requests, 1);
assert.deepEqual(result, translated);

console.log("Translation CLI adapter tests passed.");
