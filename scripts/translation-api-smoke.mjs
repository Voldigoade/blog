import { appendFile } from "node:fs/promises";
import { requestCompletion } from "./translation-http.mjs";

try {
  const result = await requestCompletion([
    { role: "system", content: 'Translate French to English faithfully. Return only a JSON object with one string field named "translation".' },
    { role: "user", content: "La Terre tourne autour du Soleil." },
  ], { maxTokens: 100 });
  if (typeof result.value.translation !== "string" || !/earth/i.test(result.value.translation) || !/sun/i.test(result.value.translation)) {
    throw new Error("SEMANTIC_VALIDATION: the small translation fixture did not pass");
  }
  console.log(`API authentication and translation smoke passed. Usage: ${JSON.stringify(result.usage)}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Translation API preflight\n\nAuthentication and tiny English translation passed.\n\nToken usage: ${JSON.stringify(result.usage)}\n`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
