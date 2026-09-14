import { appendFileSync, existsSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  TARGETS,
  automaticRows,
  hasPublishedSource,
  readTranslation,
  sourceFiles,
} from "./translate.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TRANSLATIONS = join(ROOT, "src", "content", "translations");

function selectedValue(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function validateLocale(locale) {
  if (locale && !TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
}

export function changedSlugs(before, after, cwd = ROOT) {
  if (!before || !after) throw new Error("Changed-source planning requires both --before and --after.");
  let base = before;
  if (/^0+$/.test(base)) base = `${after}^`;
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "--no-renames", base, after, "--", "src/content/blog"],
    { cwd, encoding: "utf8" },
  );
  return [...new Set(output.split(/\r?\n/)
    .filter(Boolean)
    .filter((path) => [".md", ".mdx"].includes(extname(path).toLowerCase()))
    .map((path) => basename(path).replace(/\.(md|mdx)$/i, ""))
    .filter((slug) => slug && !slug.startsWith("_")))]
    .sort();
}

function translationSlugs() {
  const slugs = [];
  for (const locale of TARGETS) {
    const directory = join(TRANSLATIONS, locale);
    if (!existsSync(directory)) continue;
    for (const name of readdirSync(directory)) {
      if (!/^[^_].*\.(md|mdx)$/i.test(name)) continue;
      slugs.push(name.replace(/\.(md|mdx)$/i, ""));
    }
  }
  return [...new Set(slugs)].sort();
}

export function planSlugs(slugs, options = {}) {
  const locales = options.locale ? [options.locale] : TARGETS;
  validateLocale(options.locale);
  const work = [];
  for (const slug of [...new Set(slugs)].sort()) {
    if (hasPublishedSource(slug)) {
      for (const row of automaticRows({ slug, locale: options.locale, force: options.force })) {
        work.push({ slug, locale: row.locale, action: "translate", sourceHash: row.hash, force: Boolean(options.force) });
      }
      continue;
    }
    for (const locale of locales) {
      const existing = readTranslation(locale, slug);
      if (existing && !existing.manual) work.push({ slug, locale, action: "remove", sourceHash: "", force: false });
    }
  }
  return work.sort((left, right) =>
    left.slug.localeCompare(right.slug) || TARGETS.indexOf(left.locale) - TARGETS.indexOf(right.locale),
  );
}

export function reconciliationSlugs() {
  return [...new Set([...sourceFiles().map((source) => source.slug), ...translationSlugs()])].sort();
}

export function writeGithubPlan(work, outputPath, summaryPath) {
  appendFileSync(outputPath, `has_work=${work.length > 0}\n`);
  appendFileSync(outputPath, `matrix=${JSON.stringify({ include: work })}\n`);
  appendFileSync(outputPath, `action=${work[0]?.action || "none"}\n`);
  if (!summaryPath) return;
  const lines = work.length === 0
    ? ["## Translation plan", "", "No translation work is required."]
    : [
        "## Translation plan",
        "",
        "| Article | Locale | Action |",
        "| --- | --- | --- |",
        ...work.map((item) => `| ${item.slug} | ${item.locale.toUpperCase()} | ${item.action} |`),
      ];
  appendFileSync(summaryPath, `${lines.join("\n")}\n`);
}

export function buildPlan(args = process.argv.slice(2)) {
  if (args.includes("--empty")) return [];
  const locale = selectedValue(args, "--locale");
  validateLocale(locale);
  const slug = selectedValue(args, "--slug");
  const before = selectedValue(args, "--before");
  const after = selectedValue(args, "--after");
  const reconcile = args.includes("--reconcile");
  const force = args.includes("--force");
  let slugs;
  if (slug) slugs = [slug];
  else if (before || after) slugs = changedSlugs(before, after);
  else if (reconcile) slugs = reconciliationSlugs();
  else throw new Error("Select --slug, --before/--after, or --reconcile.");
  return planSlugs(slugs, { locale, force });
}

export function main(args = process.argv.slice(2)) {
  const work = buildPlan(args);
  const outputPath = selectedValue(args, "--github-output") || process.env.GITHUB_OUTPUT;
  const summaryPath = selectedValue(args, "--github-summary") || process.env.GITHUB_STEP_SUMMARY;
  if (outputPath) writeGithubPlan(work, outputPath, summaryPath);
  else console.log(JSON.stringify({ include: work }, null, 2));
  return work;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
