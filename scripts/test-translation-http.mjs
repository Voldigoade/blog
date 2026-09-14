import assert from "node:assert/strict";
import { parseCompletion, readConfiguration, requestCompletion, retryDelay } from "./translation-http.mjs";

const configuration = {
  endpoint: "https://translation.example/v1/chat/completions",
  apiKey: "test-only-credential",
  model: "test-version",
};
const payload = {
  model: configuration.model,
  choices: [{ finish_reason: "stop", message: { content: '{"text":"Hello"}' } }],
  usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
};
const messages = [{ role: "user", content: "Return a JSON greeting." }];
assert.throws(() => readConfiguration({}), /CONFIGURATION/);
assert.throws(() => readConfiguration({ TRANSLATION_API_ENDPOINT: "https://user:pass@example.com", TRANSLATION_API_KEY: "key", TRANSLATION_MODEL: "test" }), /CONFIGURATION/);
assert.deepEqual(parseCompletion(payload, configuration.model).value, { text: "Hello" });
for (const invalid of [null, {}, { ...payload, model: "other" }, { ...payload, choices: [] }, { ...payload, choices: [{ finish_reason: "length" }] }, { ...payload, choices: [{ finish_reason: "stop", message: { content: "[]" } }] }]) {
  assert.throws(() => parseCompletion(invalid, configuration.model), /INVALID_RESPONSE/);
}
assert.equal(retryDelay("3", 0), 3000);
assert.equal(retryDelay("Thu, 01 Jan 1970 00:00:05 GMT", 0, 1000), 4000);
assert.equal(retryDelay(null, 2, 0, () => 0), 4000);
for (const status of [400, 401, 403, 404, 422]) {
  let calls = 0;
  await assert.rejects(requestCompletion(messages, {
    configuration,
    fetch: async () => { calls += 1; return new Response("private response", { status }); },
  }), (error) => error.status === status && !error.message.includes("private") && !error.message.includes(configuration.apiKey));
  assert.equal(calls, 1);
}
for (const status of [408, 429, 500, 502, 503, 504]) {
  let calls = 0;
  const delays = [];
  const result = await requestCompletion(messages, {
    configuration,
    sleep: async (delay) => delays.push(delay),
    fetch: async (url, request) => {
      assert.equal(url, configuration.endpoint);
      assert.equal(request.headers.Authorization, `Bearer ${configuration.apiKey}`);
      const body = JSON.parse(request.body);
      assert.equal(body.model, configuration.model);
      assert.equal(body.temperature, 0);
      assert.deepEqual(body.response_format, { type: "json_object" });
      calls += 1;
      return calls === 1 ? new Response("", { status, headers: { "retry-after": "2" } }) : Response.json(payload);
    },
  });
  assert.deepEqual(result.usage, payload.usage);
  assert.deepEqual(delays, [2000]);
  assert.equal(calls, 2);
}
let calls = 0;
await assert.rejects(requestCompletion(messages, {
  configuration,
  sleep: async () => {},
  fetch: async () => { calls += 1; throw new Error(configuration.apiKey); },
}), (error) => error.category === "REMOTE_SERVER" && !error.message.includes(configuration.apiKey));
assert.equal(calls, 4);
await assert.rejects(requestCompletion(messages, {
  configuration,
  sleep: async () => assert.fail("must not retry before the requested delay"),
  fetch: async () => new Response("", { status: 429, headers: { "retry-after": "3600" } }),
}), /RATE_LIMIT/);
console.log("Hosted translation HTTP tests passed.");
