import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

import { pushCommitWithRetry } from "./publish-translation.mjs";
import { changedSlugs } from "./translation-plan.mjs";
import { selectAutomaticRows } from "./translate.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function identity(cwd) {
  git(cwd, "config", "user.name", "Scheduler Test");
  git(cwd, "config", "user.email", "scheduler@example.invalid");
}

function write(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

function syntheticRows(slugs) {
  return slugs.flatMap((slug) => ["en", "es", "de"].map((locale) => ({
    slug,
    locale,
    state: "missing",
    manual: false,
  })));
}

function testMatrixSelection() {
  assert.equal(selectAutomaticRows(syntheticRows(["article-a"])).length, 3);
  assert.equal(selectAutomaticRows(syntheticRows(["article-a", "article-b"])).length, 6);
  assert.deepEqual(
    selectAutomaticRows([
      { state: "current", manual: false },
      { state: "stale", manual: false },
      { state: "stale", manual: true },
      { state: "missing", manual: false },
    ]).map((row) => row.state),
    ["stale", "missing"],
  );
}

function testFailureIsolation() {
  const completed = [];
  const failed = [];
  for (const row of syntheticRows(["article-a"])) {
    try {
      if (row.locale === "en") throw new Error("simulated locale failure");
      completed.push(row.locale);
    } catch {
      failed.push(row.locale);
    }
  }
  assert.deepEqual(completed, ["es", "de"]);
  assert.deepEqual(failed, ["en"]);
}

function testWorkflowContract() {
  const translationWorkflow = yaml.load(
    readFileSync(join(ROOT, ".github", "workflows", "translate-publications.yml"), "utf8"),
    { schema: yaml.JSON_SCHEMA },
  );
  const strategy = translationWorkflow.jobs.translate.strategy;
  assert.equal(strategy["fail-fast"], false);
  assert.equal(strategy["max-parallel"], 3);
  assert.equal(translationWorkflow.jobs.translate.concurrency.group, "translation-${{ matrix.slug }}-${{ matrix.locale }}");
  assert.equal(translationWorkflow.jobs.translate.concurrency["cancel-in-progress"], true);
  assert.equal(translationWorkflow.jobs.translate.steps.some((step) => step.name === "Publish completed locale"), true);
  assert.equal(translationWorkflow.jobs.translate.steps.some((step) => step.name === "Build"), false);
  const deploymentWorkflow = yaml.load(
    readFileSync(join(ROOT, ".github", "workflows", "deploy-pages.yml"), "utf8"),
    { schema: yaml.JSON_SCHEMA },
  );
  assert.equal(deploymentWorkflow.concurrency.group, "pages");
  assert.equal(deploymentWorkflow.concurrency["cancel-in-progress"], false);
}

function testChangedArticleDetection(root) {
  const repository = join(root, "changes");
  mkdirSync(repository);
  git(repository, "init", "-b", "main");
  identity(repository);
  write(join(repository, "README.md"), "fixture\n");
  git(repository, "add", ".");
  git(repository, "commit", "-m", "Initial");
  const initial = git(repository, "rev-parse", "HEAD");
  write(join(repository, "src", "content", "blog", "article-a.md"), "---\ndraft: false\n---\n\nA\n");
  git(repository, "add", ".");
  git(repository, "commit", "-m", "Article A");
  const one = git(repository, "rev-parse", "HEAD");
  assert.deepEqual(changedSlugs(initial, one, repository), ["article-a"]);
  write(join(repository, "src", "content", "blog", "article-a.md"), "---\ndraft: false\n---\n\nA2\n");
  write(join(repository, "src", "content", "blog", "article-b.md"), "---\ndraft: false\n---\n\nB\n");
  git(repository, "add", ".");
  git(repository, "commit", "-m", "Articles A and B");
  const two = git(repository, "rev-parse", "HEAD");
  assert.deepEqual(changedSlugs(one, two, repository), ["article-a", "article-b"]);
}

function initializeRemote(root) {
  const remote = join(root, "remote.git");
  const seed = join(root, "seed");
  git(root, "init", "--bare", remote);
  mkdirSync(seed);
  git(seed, "init", "-b", "main");
  identity(seed);
  write(join(seed, "source.txt"), "v1\n");
  git(seed, "add", ".");
  git(seed, "commit", "-m", "Initial");
  git(seed, "remote", "add", "origin", remote);
  git(seed, "push", "-u", "origin", "main");
  return { remote, seed };
}

function clone(remote, path) {
  git(join(path, ".."), "clone", "-b", "main", remote, path);
  identity(path);
}

function commitTranslation(cwd, locale, slug) {
  write(join(cwd, "src", "content", "translations", locale, `${slug}.md`), `${locale}:${slug}\n`);
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", `Publish ${locale}`);
}

function testPushRetryAndIndependentLocales(root) {
  const { remote } = initializeRemote(root);
  const spanish = join(root, "spanish");
  const german = join(root, "german");
  clone(remote, spanish);
  clone(remote, german);
  commitTranslation(spanish, "es", "article-a");
  commitTranslation(german, "de", "article-a");
  git(spanish, "push", "origin", "HEAD:main");
  const result = pushCommitWithRetry({ cwd: german, validate: () => true });
  assert.equal(result.status, "pushed");
  const tree = git(german, "ls-tree", "-r", "--name-only", "origin/main");
  assert.match(tree, /translations\/es\/article-a\.md/);
  assert.match(tree, /translations\/de\/article-a\.md/);
  assert.doesNotMatch(tree, /translations\/en\/article-a\.md/);
}

function testStaleSourceGuard(root) {
  const remote = join(root, "remote.git");
  const stale = join(root, "stale");
  const update = join(root, "update");
  clone(remote, stale);
  clone(remote, update);
  commitTranslation(stale, "en", "article-stale");
  write(join(update, "source.txt"), "v2\n");
  git(update, "add", "source.txt");
  git(update, "commit", "-m", "Update source");
  git(update, "push", "origin", "HEAD:main");
  const result = pushCommitWithRetry({
    cwd: stale,
    validate: () => readFileSync(join(stale, "source.txt"), "utf8") === "v1\n",
  });
  assert.equal(result.status, "obsolete");
  git(stale, "fetch", "origin", "main");
  const tree = git(stale, "ls-tree", "-r", "--name-only", "origin/main");
  assert.doesNotMatch(tree, /translations\/en\/article-stale\.md/);
}

const temporary = mkdtempSync(join(tmpdir(), "voldigoade-scheduler-"));
try {
  testMatrixSelection();
  testFailureIsolation();
  testWorkflowContract();
  testChangedArticleDetection(temporary);
  testPushRetryAndIndependentLocales(temporary);
  testStaleSourceGuard(temporary);
  console.log("Translation scheduler verified: 1→3, 2→6, independent failures, push retry, progressive commits and stale-source rejection.");
} finally {
  if (existsSync(temporary)) rmSync(temporary, { recursive: true, force: true });
}
