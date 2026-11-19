#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function readJSON(path: string): Promise<unknown> {
  return JSON.parse(await readFile(resolve(repositoryRoot, path), "utf8"));
}

function record(value: unknown, label: string): Record<string, unknown> {
  assert(typeof value === "object" && value !== null && !Array.isArray(value), `${label} must be an object`);
  return value as Record<string, unknown>;
}

function strings(value: unknown, label: string): string[] {
  assert(Array.isArray(value) && value.every((entry) => typeof entry === "string"), `${label} must be a string array`);
  return value;
}

function navigationPages(value: unknown): string[] {
  if (typeof value === "string") return [value];
  const item = record(value, "navigation item");
  assert(Array.isArray(item.pages), "navigation group must contain pages");
  return item.pages.flatMap(navigationPages);
}

async function pageExists(page: string): Promise<boolean> {
  for (const extension of [".md", ".mdx"]) {
    try {
      await access(resolve(repositoryRoot, "docs", `${page}${extension}`));
      return true;
    } catch {
      // Try the other supported documentation extension.
    }
  }
  return false;
}

const config = record(await readJSON("docs/docs.json"), "docs config");
const navigation = record(config.navigation, "docs navigation");
assert(Array.isArray(navigation.groups), "docs navigation must contain groups");
const pages = navigation.groups.flatMap(navigationPages);

for (const page of pages) {
  assert(page.startsWith("labor/"), `documentation page must stay under /labor: ${page}`);
  assert(await pageExists(page), `documentation page is missing: ${page}`);
}

for (const asset of ["docs/logo-dark.svg", "docs/logo-light.svg", "docs/favicon.svg"]) {
  await access(resolve(repositoryRoot, asset));
}

const skillsConfig = record(await readJSON("skills.sh.json"), "skills.sh config");
assert(Array.isArray(skillsConfig.groupings), "skills.sh config must contain groupings");
const skills = skillsConfig.groupings.flatMap((group, index) => strings(record(group, `groupings[${index}]`).skills, `groupings[${index}].skills`));
assert(new Set(skills).size === skills.length, "skills.sh config contains duplicate skills");

const corpus = record(await readJSON("evals/routing.json"), "routing corpus");
assert(Array.isArray(corpus.skills), "routing corpus must contain skills");
assert(Array.isArray(corpus.overlap_cases), "routing corpus must contain overlap cases");
const routingCases = corpus.skills.reduce((total, entry, index) => {
  const skill = record(entry, `routing skills[${index}]`);
  return total
    + strings(skill.should_trigger, `routing skills[${index}].should_trigger`).length
    + strings(skill.should_not_trigger, `routing skills[${index}].should_not_trigger`).length
    + strings(skill.ambiguous, `routing skills[${index}].ambiguous`).length;
}, corpus.overlap_cases.length);

const home = await readFile(resolve(repositoryRoot, "docs/labor/index.mdx"), "utf8");
assert(home.includes(`${skills.length} public skills`), "home page skill count is stale");
assert(home.includes(`${routingCases} routing cases`), "home page routing case count is stale");

const catalog = await readFile(resolve(repositoryRoot, "docs/labor/skills/index.mdx"), "utf8");
for (const skill of skills) {
  const source = `https://github.com/inttegro/labor/tree/master/skills/${skill}`;
  assert(catalog.includes(source), `skill catalog is missing ${skill}`);
}

console.log(`Validated ${pages.length} documentation pages for ${skills.length} skills and ${routingCases} routing cases.`);
