import assert from "node:assert/strict";

import {
  assertProtectedSyntax,
  shieldInline,
  tokenizeBlocks,
  translatePreparedSegments,
  unshieldInline,
} from "./translate.mjs";

const protectedValue = "`Problème → excellente réponse attendue`";
const markdown = `- ${protectedValue}\n`;
const blocks = tokenizeBlocks(markdown);
const list = blocks.find((block) => block.type === "list");

assert.ok(list);
assert.equal(list.prefix, "- ");
assert.equal(list.content, protectedValue);

for (const locale of ["en", "es", "de"]) {
  const { shielded, placeholders } = shieldInline(list.content);
  let providerCalls = 0;
  const translated = await translatePreparedSegments(
    [shielded],
    [placeholders],
    { sourceLocale: "fr", targetLocale: locale },
    async () => {
      providerCalls += 1;
      return [];
    },
  );
  const restored = unshieldInline(translated[0], placeholders);
  assert.equal(providerCalls, 0);
  assert.equal(shielded, "%%CODE_0%%");
  assert.equal(restored, protectedValue);
  const reconstructed = `${list.prefix}${restored}${list.suffix}`;
  assert.equal(reconstructed, markdown);
  assert.deepEqual(assertProtectedSyntax(markdown, reconstructed, locale), [protectedValue]);
}

assert.throws(
  () => assertProtectedSyntax(markdown, "- `Problema → excelente respuesta esperada`\n", "es"),
  /Protected source syntax is missing/,
);

console.log("Protected inline list syntax preserved byte-for-byte for EN, ES and DE.");
