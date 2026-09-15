import assert from "node:assert/strict";

import { deterministicTranslationIssues, extractQuantities, generateTranslatedPublication } from "./translate.mjs";

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

const badEnglish = structuredClone(values.en);
badEnglish.body = badEnglish.body.replace("The company says", "A second question now adds itself. The company says");
assert.equal(
  deterministicTranslationIssues(source, badEnglish, "en").some((issue) => /non-native calque/i.test(issue)),
  true,
);

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

// Long-scale vs short-scale regression: 10 400 milliards de yens = 10.4e12.
// Spanish "billón" is 10^12 per the RAE (10^9 is only US Spanish usage).
const TEN_TRILLION = 10_400_000_000_000;
assert.deepEqual(extractQuantities("10 400 milliards", "fr"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10,4 billones", "es"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10.400 mil millones", "es"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10.4 trillion", "en"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10,400 billion", "en"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10,4 Billionen", "de"), [TEN_TRILLION]);
assert.deepEqual(extractQuantities("10.400 Milliarden", "de"), [TEN_TRILLION]);

assert.deepEqual(extractQuantities("5 700 milliards", "fr"), [5_700_000_000_000]);
assert.deepEqual(extractQuantities("5,7 billones", "es"), [5_700_000_000_000]);
assert.deepEqual(extractQuantities("5.7 trillion", "en"), [5_700_000_000_000]);
assert.deepEqual(extractQuantities("5,7 Billionen", "de"), [5_700_000_000_000]);
assert.deepEqual(extractQuantities("2 300 milliards", "fr"), [2_300_000_000_000]);
assert.deepEqual(extractQuantities("2,3 billones", "es"), [2_300_000_000_000]);

// Locale number formats: thin spaces, decimal commas and thousand dots.
// A comma with three trailing digits is a decimal fraction in fr/es/de
// (5,682 = 5.682) but a thousands group in en (5,682 = 5682), and vice versa.
assert.deepEqual(extractQuantities("10 400,5 milliards", "fr"), [10_400_500_000_000]);
assert.deepEqual(extractQuantities("6 429,3 milliards", "fr"), [6_429_300_000_000]);
assert.deepEqual(extractQuantities("6.429,3 mil millones", "es"), [6_429_300_000_000]);
assert.deepEqual(extractQuantities("688,8 milliards", "fr"), [688_800_000_000]);
assert.deepEqual(extractQuantities("230 milliards", "fr"), [230_000_000_000]);
assert.deepEqual(extractQuantities("230 billones", "es"), [230_000_000_000_000]);
assert.deepEqual(extractQuantities("5,682 billones", "es"), [5_682_000_000_000]);
assert.deepEqual(extractQuantities("5.682 trillion", "en"), [5_682_000_000_000]);
assert.deepEqual(extractQuantities("5,682 billion", "en"), [5_682_000_000_000]);
assert.deepEqual(extractQuantities("10.400 mil millones", "es"), [10_400_000_000_000]);
assert.deepEqual(extractQuantities("10,400 billion", "en"), [10_400_000_000_000]);

// French press abbreviation "Mds" (milliards), as used in data tables.
assert.deepEqual(extractQuantities("8 494 Mds", "fr"), [8_494_000_000_000]);
assert.deepEqual(extractQuantities("18 914 Mds", "fr"), [18_914_000_000_000]);
assert.deepEqual(extractQuantities("8,494 billones", "es"), [8_494_000_000_000]);
// English "Bln"/"bn" and German "Mrd." press abbreviations for a billion.
assert.deepEqual(extractQuantities("8 494 Bln", "en"), [8_494_000_000_000]);
assert.deepEqual(extractQuantities("8 494 Mrd.", "de"), [8_494_000_000_000]);

// Pre-existing singular/plural and hyphenated-compound behavior is preserved.
assert.deepEqual(extractQuantities("66 million years", "en"), [66_000_000]);
assert.deepEqual(extractQuantities("a 66-million-year-old Earth", "en"), [66_000_000]);
assert.deepEqual(extractQuantities("66 millions d'années", "fr"), [66_000_000]);
assert.deepEqual(extractQuantities("66 millones de años", "es"), [66_000_000]);
assert.deepEqual(extractQuantities("66 Millionen Jahren", "de"), [66_000_000]);

// End-to-end: a correctly localized Spanish rendering passes validation.
const yenSource = {
  slug: "fixture-yen",
  data: { title: "Pertes estimées", description: "Montants en jeu.", coverAlt: "" },
  body: "# Pertes estimées\n\nLe total atteint 10 400 milliards de yens, dont 5 700 milliards pour le numérique et 2 300 milliards pour la vidéo. Le tableau récapitule 18 914 Mds ¥.\n",
};
const yenSpanish = {
  title: "Pérdidas estimadas",
  description: "Cantidades en juego.",
  heroImageAlt: "",
  coverAlt: "",
  seriesTitle: "",
  body: "# Pérdidas estimadas\n\nEl total alcanza los 10,4 billones de yenes, con 5,7 billones para el sector digital y 2,3 billones para el vídeo. La tabla resume 18,914 billones de yenes.\n",
};
assert.deepEqual(deterministicTranslationIssues(yenSource, yenSpanish, "es"), []);

console.log("Deterministic translation and bounded repair tests passed.");
