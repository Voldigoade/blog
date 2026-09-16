import assert from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { paginatedAlternateRoutes } from "../src/i18n/pagination.ts";

const asymmetricCounts = { fr: 17, en: 15, es: 15, de: 15 };
const asymP1 = paginatedAlternateRoutes(1, asymmetricCounts, 8);
assert.deepStrictEqual(asymP1, ["fr", "en", "es", "de"], "Asymmetric page 1 should include all locales");

const asymP2 = paginatedAlternateRoutes(2, asymmetricCounts, 8);
assert.deepStrictEqual(asymP2, ["fr", "en", "es", "de"], "Asymmetric page 2 should include all locales");

const asymP3 = paginatedAlternateRoutes(3, asymmetricCounts, 8);
assert.deepStrictEqual(asymP3, ["fr"], "Asymmetric page 3 should only include fr");

const symmetricCounts = { fr: 20, en: 20, es: 20, de: 20 };
const symP3 = paginatedAlternateRoutes(3, symmetricCounts, 8);
assert.deepStrictEqual(symP3, ["fr", "en", "es", "de"], "Symmetric page 3 should include all locales");

const partialCounts = { fr: 17, en: 17, es: 10, de: 10 };
const partP3 = paginatedAlternateRoutes(3, partialCounts, 8);
assert.deepStrictEqual(partP3, ["fr", "en"], "Partial page 3 should include fr and en only");

const computingP3Path = resolve(process.cwd(), "dist/sections/computing/3/index.html");
if (existsSync(computingP3Path)) {
  const html = readFileSync(computingP3Path, "utf8");

  assert.ok(
    html.includes('<link rel="canonical" href="https://voldigoade.xyz/sections/computing/3/">'),
    "Computing page 3 must have correct canonical",
  );
  assert.ok(
    html.includes('<link rel="alternate" hreflang="fr" href="https://voldigoade.xyz/sections/computing/3/">'),
    "Computing page 3 must have fr alternate",
  );
  assert.ok(
    html.includes('<link rel="alternate" hreflang="x-default" href="https://voldigoade.xyz/sections/computing/3/">'),
    "Computing page 3 must have x-default pointing to FR canonical",
  );

  assert.ok(
    !html.includes('hreflang="en"'),
    "Computing page 3 must NOT have en alternate",
  );
  assert.ok(
    !html.includes('hreflang="es"'),
    "Computing page 3 must NOT have es alternate",
  );
  assert.ok(
    !html.includes('hreflang="de"'),
    "Computing page 3 must NOT have de alternate",
  );

  assert.ok(
    !/href=["'][^"']*\/en\/sections\/computing\/3\/?["']/.test(html),
    "Computing page 3 must NOT link to missing /en/sections/computing/3/",
  );
  assert.ok(
    !/href=["'][^"']*\/es\/sections\/computing\/3\/?["']/.test(html),
    "Computing page 3 must NOT link to missing /es/sections/computing/3/",
  );
  assert.ok(
    !/href=["'][^"']*\/de\/sections\/computing\/3\/?["']/.test(html),
    "Computing page 3 must NOT link to missing /de/sections/computing/3/",
  );
}

console.log("Paginated alternate routes regression tests passed.");
