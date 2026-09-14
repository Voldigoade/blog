import assert from "node:assert/strict";

import { deterministicTranslationIssues, generateTranslatedPublication } from "./translate.mjs";

const source = {
  slug: "fixture",
  data: {
    title: "Une enquête technique",
    description: "Un récit précis.",
    coverAlt: "Des puces de calcul",
  },
  body: `# Une enquête technique

Pas 151 millions de tokens. Pas 151 millions de caractères.

L'entreprise affirme avoir observé le système pendant quatorze jours.

Le modèle a traité environ 100 millions de prompts sur des puces de calcul Nvidia.

- \`Problème → excellente réponse attendue\`
`,
};

const values = {
  en: {
    title: "A technical investigation",
    description: "A precise account.",
    heroImageAlt: "",
    coverAlt: "Computing chips",
    seriesTitle: "",
    body: `# A technical investigation

Not 151 million tokens. Not 151 million characters.

The company says it observed the system for fourteen days.

The model processed approximately 100 million prompts on Nvidia computing chips.

- \`Problème → excellente réponse attendue\`
`,
  },
  es: {
    title: "Una investigación técnica",
    description: "Un relato preciso.",
    heroImageAlt: "",
    coverAlt: "Chips de computación",
    seriesTitle: "",
    body: `# Una investigación técnica

No 151 millones de tokens. No 151 millones de caracteres.

La empresa afirma haber observado el sistema durante catorce días.

El modelo procesó aproximadamente 100 millones de prompts en chips de computación Nvidia.

- \`Problème → excellente réponse attendue\`
`,
  },
  de: {
    title: "Eine technische Untersuchung",
    description: "Ein präziser Bericht.",
    heroImageAlt: "",
    coverAlt: "Computerchips",
    seriesTitle: "",
    body: `# Eine technische Untersuchung

Nicht 151 Millionen Token. Nicht 151 Millionen Zeichen.

Das Unternehmen gibt an, das System vierzehn Tage lang beobachtet zu haben.

Das Modell verarbeitete ungefähr 100 Millionen Prompts auf Nvidia-Computerchips.

- \`Problème → excellente réponse attendue\`
`,
  },
};

for (const locale of ["en", "es", "de"]) {
  assert.deepEqual(deterministicTranslationIssues(source, values[locale], locale), []);
}

const badSpanish = structuredClone(values.es);
badSpanish.body = badSpanish.body
  .replace("No 151 millones de tokens", "Más de 151 millones de tokens")
  .replace("catorce días", "4 días")
  .replace("prompts", "clics")
  .replace("chips de computación", "insectos");
const issues = deterministicTranslationIssues(source, badSpanish, "es");
assert.equal(issues.some((issue) => /negation/i.test(issue)), true);
assert.equal(issues.some((issue) => /fourteen days/i.test(issue)), true);
assert.equal(issues.some((issue) => /prompts or queries/i.test(issue)), true);
assert.equal(issues.some((issue) => /semiconductor/i.test(issue)), true);

let calls = 0;
const repaired = await generateTranslatedPublication(source, "en", async (prepared, context, options) => {
  calls += 1;
  assert.match(prepared.body, /%%CODE_0%%/);
  if (calls === 1) {
    const candidate = { ...values.en, body: values.en.body.replace("Not 151 million tokens", "More than 151 million tokens") };
    candidate.body = candidate.body.replace("`Problème → excellente réponse attendue`", "%%CODE_0%%");
    return candidate;
  }
  assert.equal(context.targetLocale, "en");
  assert.equal(options.issues.some((issue) => /negation/i.test(issue)), true);
  const candidate = structuredClone(values.en);
  candidate.body = candidate.body.replace("`Problème → excellente réponse attendue`", "%%CODE_0%%");
  return candidate;
});
assert.equal(calls, 2);
assert.equal(repaired.body.includes("Not 151 million tokens"), true);
assert.equal(repaired.body.includes("`Problème → excellente réponse attendue`"), true);

console.log("Deterministic translation and bounded repair tests passed.");
