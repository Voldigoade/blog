import { translatePublication } from "./translate-provider.mjs";

try {
  const result = await translatePublication({
    title: "",
    description: "",
    heroImageAlt: "",
    coverAlt: "",
    seriesTitle: "",
    body: "Le ciel est bleu.",
  }, {
    sourceLocale: "fr",
    targetLocale: "en",
    locale: "en",
    slug: "integration-smoke",
  });
  if (!/\bsky\b/i.test(result.body) || !/\bblue\b/i.test(result.body)) {
    throw new Error("SEMANTIC_VALIDATION: the tiny translation did not preserve sky and blue");
  }
  console.log("Authenticated CLI translation smoke passed.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
