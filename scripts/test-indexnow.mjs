import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  canonicalUrlForChange,
  chunkUrls,
  collectChangedUrls,
  dedupeAndSortUrls,
  parseContentChange,
  submitIndexNow,
  urlForChangedPath,
} from "./indexnow.mjs";

const ORIGIN = "https://voldigoade.xyz";

assert.deepEqual(parseContentChange("src/content/blog/foo.md"), { kind: "fr", locale: "fr", filenameSlug: "foo" });
assert.deepEqual(parseContentChange("src/content/translations/en/foo.md"), { kind: "translation", locale: "en", filenameSlug: "foo" });
assert.deepEqual(parseContentChange("src/content/translations/es/foo.mdx"), { kind: "translation", locale: "es", filenameSlug: "foo" });
assert.deepEqual(parseContentChange("src/content/translations/de/foo.md"), { kind: "translation", locale: "de", filenameSlug: "foo" });
assert.equal(parseContentChange("src/content/blog/_draft.md"), null);
assert.equal(parseContentChange("src/content/translations/en/_draft.md"), null);
assert.equal(parseContentChange("src/content/translations/fr/foo.md"), null);
assert.equal(parseContentChange("src/content/translations/it/foo.md"), null);
assert.equal(parseContentChange("scripts/indexnow.mjs"), null);
assert.equal(parseContentChange("public/images/posts/a.png"), null);
assert.equal(parseContentChange("src/content/blog/nested/foo.md"), null);

assert.equal(canonicalUrlForChange({ locale: "fr", slug: "foo" }), `${ORIGIN}/publications/foo/`);
assert.equal(canonicalUrlForChange({ locale: "en", slug: "foo" }), `${ORIGIN}/en/publications/foo/`);
assert.equal(canonicalUrlForChange({ locale: "es", slug: "foo" }), `${ORIGIN}/es/publications/foo/`);
assert.equal(canonicalUrlForChange({ locale: "de", slug: "foo" }), `${ORIGIN}/de/publications/foo/`);
assert.equal(canonicalUrlForChange({ locale: "it", slug: "foo" }), null);
assert.equal(canonicalUrlForChange({ locale: "fr", slug: "../x" }), null);

assert.deepEqual(dedupeAndSortUrls(["b", "a", "b", ""]), ["a", "b"]);
assert.deepEqual(chunkUrls(["c", "a", "b", "a"], 2), [["a", "b"], ["c"]]);

const dry = await submitIndexNow([`${ORIGIN}/publications/foo/`], { dryRun: true });
assert.equal(dry.dryRun, true);
assert.equal(dry.payload.urlList.length, 1);
await assert.rejects(submitIndexNow([], { dryRun: true }));

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" });
}

const repo = mkdtempSync(join(tmpdir(), "indexnow-fixture-"));
try {
  git(repo, "init", "-q");
  git(repo, "config", "user.name", "Fixture");
  git(repo, "config", "user.email", "fixture@example.com");
  mkdirSync(join(repo, "src", "content", "blog"), { recursive: true });
  mkdirSync(join(repo, "src", "content", "translations", "en"), { recursive: true });
  writeFileSync(join(repo, "src", "content", "blog", "keep.md"), "---\ntitle: Keep\ndraft: false\n---\n\nBody.\n");
  writeFileSync(join(repo, "src", "content", "blog", "drafted.md"), "---\ntitle: Draft\ndraft: true\n---\n\nBody.\n");
  git(repo, "add", "-A");
  git(repo, "commit", "-qm", "base");
  const before = git(repo, "rev-parse", "HEAD").trim();

  writeFileSync(join(repo, "src", "content", "blog", "foo.md"), "---\ntitle: Foo\ndraft: false\n---\n\nBody.\n");
  writeFileSync(join(repo, "src", "content", "blog", "drafted.md"), "---\ntitle: Draft\ndraft: true\n---\n\nEdited while still a draft.\n");
  writeFileSync(join(repo, "src", "content", "translations", "en", "foo.md"), "---\ntitle: Foo\nlocale: en\nsourceSlug: foo\ndraft: false\n---\n\nBody.\n");
  writeFileSync(join(repo, "public.txt"), "internal\n");
  mkdirSync(join(repo, "public"), { recursive: true });
  writeFileSync(join(repo, "public", "note.txt"), "internal\n");
  git(repo, "add", "-A");
  git(repo, "commit", "-qm", "add foo");
  const after = git(repo, "rev-parse", "HEAD").trim();

  const urls = collectChangedUrls({ before, after, cwd: repo });
  assert.ok(urls.includes(`${ORIGIN}/publications/foo/`), `missing FR url in ${JSON.stringify(urls)}`);
  assert.ok(urls.includes(`${ORIGIN}/en/publications/foo/`), `missing EN url in ${JSON.stringify(urls)}`);
  assert.ok(!urls.some((u) => u.includes("drafted") && !u.includes("foo")), "draft handling unexpected");
  assert.ok(!urls.some((u) => u.includes("public.txt") || u.includes("note.txt")), "internal file leaked");
  assert.deepEqual(urls, [...urls].sort());

  const draftedOnly = urlForChangedPath(repo, "src/content/blog/drafted.md", "M");
  assert.equal(draftedOnly, null);

  const draftRepo = mkdtempSync(join(tmpdir(), "indexnow-draft-"));
  try {
    git(draftRepo, "init", "-q");
    git(draftRepo, "config", "user.name", "Fixture");
    git(draftRepo, "config", "user.email", "fixture@example.com");
    mkdirSync(join(draftRepo, "src", "content", "blog"), { recursive: true });
    git(draftRepo, "commit", "-q", "--allow-empty", "-m", "base");
    const b2 = git(draftRepo, "rev-parse", "HEAD").trim();
    writeFileSync(join(draftRepo, "src", "content", "blog", "hidden.md"), "---\ntitle: Hidden\ndraft: true\n---\n\nBody.\n");
    git(draftRepo, "add", "-A");
    git(draftRepo, "commit", "-qm", "draft only");
    const a2 = git(draftRepo, "rev-parse", "HEAD").trim();
    assert.deepEqual(collectChangedUrls({ before: b2, after: a2, cwd: draftRepo }), []);
  } finally {
    rmSync(draftRepo, { recursive: true, force: true });
  }

  git(repo, "rm", "-q", "src/content/blog/foo.md");
  git(repo, "commit", "-qm", "remove foo");
  const removed = git(repo, "rev-parse", "HEAD").trim();
  const deletionUrls = collectChangedUrls({ before: after, after: removed, cwd: repo });
  assert.ok(deletionUrls.includes(`${ORIGIN}/publications/foo/`), `deletion URL missing in ${JSON.stringify(deletionUrls)}`);
} finally {
  rmSync(repo, { recursive: true, force: true });
}

console.log("IndexNow changed-URL discovery tests passed without external calls.");
