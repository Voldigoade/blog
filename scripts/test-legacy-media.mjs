import assert from "node:assert/strict";

import { findIssuesForText, fixText } from "./check-legacy-media.mjs";

const legacyImage = "![alt](/blog/images/posts/a.png)";
const canonicalImage = "![alt](/images/posts/a.png)";
assert.equal(findIssuesForText("src/content/blog/fixture.md", `${legacyImage}\n`).length, 1);
assert.equal(fixText(`${legacyImage}\n`).fixed, `${canonicalImage}\n`);

const legacyLink = "[read more](/blog/images/posts/a.png)";
assert.equal(findIssuesForText("src/content/blog/fixture.md", `${legacyLink}\n`).length, 1);
assert.equal(fixText(`${legacyLink}\n`).fixed, "[read more](/images/posts/a.png)\n");

const legacyRef = "[img]: /blog/images/posts/a.png";
assert.equal(findIssuesForText("src/content/blog/fixture.md", `${legacyRef}\n`).length, 1);
assert.equal(fixText(`${legacyRef}\n`).fixed, "[img]: /images/posts/a.png\n");

const legacyFrontmatter = `---\ntitle: Fixture\ncoverImage: /blog/images/posts/a.png\n---\n\nBody.\n`;
assert.equal(findIssuesForText("src/content/blog/fixture.md", legacyFrontmatter).length, 1);
assert.ok(fixText(legacyFrontmatter).fixed.includes("coverImage: /images/posts/a.png"));

const fenced = "```\n![alt](/blog/images/posts/a.png)\n```\n";
assert.equal(findIssuesForText("src/content/blog/fixture.md", fenced).length, 0);
assert.equal(fixText(fenced).fixed, fenced);

const inlineCode = "`![alt](/blog/images/posts/a.png)`\n";
assert.equal(findIssuesForText("src/content/blog/fixture.md", inlineCode).length, 0);
assert.equal(fixText(inlineCode).fixed, inlineCode);

const prose = "The old prefix /blog/images/posts/a.png is mentioned here.\n";
assert.equal(findIssuesForText("src/content/blog/fixture.md", prose).length, 0);
assert.equal(fixText(prose).fixed, prose);

const external = "[site](https://voldigoade.github.io/blog/images/posts/a.png)\n";
assert.equal(findIssuesForText("src/content/blog/fixture.md", external).length, 0);
assert.equal(fixText(external).fixed, external);

const canonical = "![alt](/images/posts/a.png)\n";
assert.equal(findIssuesForText("src/content/blog/fixture.md", canonical).length, 0);

const mixed = `---\ntitle: Fixture\ncoverImage: /images/posts/cover.png\n---\n\n${legacyImage}\n\n\`\`\`\n${legacyImage}\n\`\`\`\n`;
const mixedIssues = findIssuesForText("src/content/blog/fixture.md", mixed);
assert.equal(mixedIssues.length, 1);
assert.equal(mixedIssues[0].line, 6);
const mixedFixed = fixText(mixed).fixed;
assert.ok(mixedFixed.includes(canonicalImage));
assert.ok(mixedFixed.includes("```\n![alt](/blog/images/posts/a.png)\n```"));

console.log("Legacy media migration checks passed: Markdown destinations are detected and normalized without touching prose, code or external URLs.");
