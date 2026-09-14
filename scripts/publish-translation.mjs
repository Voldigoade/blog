import { spawnSync } from "node:child_process";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import {
  TARGETS,
  assertCurrentTranslation,
  hasPublishedSource,
  removeAutomaticTranslation,
  translationPath,
} from "./translate.mjs";

function git(args, cwd, allowFailure = false) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  if (!allowFailure && result.status !== 0) {
    throw new Error((result.stderr || result.stdout || `git ${args[0]} failed`).trim());
  }
  return result;
}

function repositoryPath(path, cwd) {
  return relative(cwd, path).split(sep).join("/");
}

export function pushCommitWithRetry(options) {
  const {
    cwd,
    remote = "origin",
    branch = "main",
    attempts = 3,
    validate = () => true,
  } = options;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    git(["fetch", remote, branch], cwd);
    git(["rebase", `${remote}/${branch}`], cwd);
    if (!validate()) return { status: "obsolete", attempt };
    const pushed = git(["push", remote, `HEAD:${branch}`], cwd, true);
    if (pushed.status === 0) return { status: "pushed", attempt };
    if (attempt === attempts) {
      throw new Error((pushed.stderr || pushed.stdout || "translation push failed").trim());
    }
  }
  throw new Error("translation push failed");
}

function validateIdentity(locale, slug) {
  if (!TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`Invalid article slug "${slug}".`);
}

export function publishUnit(options) {
  const {
    cwd = resolve(fileURLToPath(new URL("..", import.meta.url))),
    locale,
    slug,
    action = "translate",
    remote = "origin",
    branch = "main",
  } = options;
  validateIdentity(locale, slug);
  if (action !== "translate" && action !== "remove") throw new Error(`Unsupported action "${action}".`);
  if (action === "remove") removeAutomaticTranslation(locale, slug);
  const path = repositoryPath(translationPath(locale, slug), cwd);
  git(["add", "-A", "--", path], cwd);
  const staged = git(["diff", "--cached", "--name-only"], cwd).stdout.trim().split(/\r?\n/).filter(Boolean);
  if (staged.length === 0) return { status: "noop", attempt: 0 };
  if (staged.length !== 1 || staged[0] !== path) {
    throw new Error(`Refusing to commit paths outside ${path}: ${staged.join(", ")}`);
  }
  git(["config", "user.name", "Voldigoade"], cwd);
  git(["config", "user.email", "245930475+Voldigoade@users.noreply.github.com"], cwd);
  const message = action === "translate"
    ? `Publish ${locale.toUpperCase()} article translation`
    : `Remove retired ${locale.toUpperCase()} article translation`;
  git(["commit", "-m", message, "--", path], cwd);
  return pushCommitWithRetry({
    cwd,
    remote,
    branch,
    validate: () => {
      try {
        if (action === "translate") assertCurrentTranslation(locale, slug);
        else if (hasPublishedSource(slug)) return false;
        return true;
      } catch {
        return false;
      }
    },
  });
}

function selectedValue(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

export function main(args = process.argv.slice(2)) {
  const locale = selectedValue(args, "--locale");
  const slug = selectedValue(args, "--slug");
  const action = selectedValue(args, "--action") || "translate";
  if (!locale || !slug) throw new Error("--locale and --slug are required.");
  const result = publishUnit({ locale, slug, action });
  console.log(`Translation publication ${result.status} after ${result.attempt} attempt(s).`);
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
