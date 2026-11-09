#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const skillsRoot = join(root, "skills");
const manifestPath = join(root, "skills.sh.json");
const provenancePath = join(root, "skill-provenance.json");
const errors = [];

function fail(path, message) {
  errors.push(`${relative(root, path)}: ${message}`);
}

function parseFrontmatter(path, source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    fail(path, "missing YAML frontmatter");
    return {};
  }

  const values = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-z_]+):\s*(.+)$/);
    if (field) values[field[1]] = field[2].replace(/^['"]|['"]$/g, "");
  }
  return values;
}

function validateMarkdownLinks(path, source) {
  for (const match of source.matchAll(/\]\((references\/[^)#]+|scripts\/[^)#]+)\)/g)) {
    const target = join(path, "..", match[1]);
    if (!existsSync(target)) fail(path, `linked resource does not exist: ${match[1]}`);
  }
}

if (!existsSync(skillsRoot)) errors.push("skills/: directory is missing");

const skillNames = existsSync(skillsRoot)
  ? readdirSync(skillsRoot).filter((name) => statSync(join(skillsRoot, name)).isDirectory()).sort()
  : [];

for (const name of skillNames) {
  const directory = join(skillsRoot, name);
  const skillPath = join(directory, "SKILL.md");
  const agentPath = join(directory, "agents", "openai.yaml");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) fail(directory, "directory name must be lowercase kebab-case");
  if (!existsSync(skillPath)) {
    fail(directory, "SKILL.md is missing");
    continue;
  }

  const source = readFileSync(skillPath, "utf8");
  const frontmatter = parseFrontmatter(skillPath, source);
  if (frontmatter.name !== name) fail(skillPath, `frontmatter name must equal ${name}`);
  if (!frontmatter.description || frontmatter.description.length < 40) fail(skillPath, "description is missing or too vague");
  if (/\bTODO\b|\[TODO/i.test(source)) fail(skillPath, "contains an unfinished TODO");
  validateMarkdownLinks(skillPath, source);

  if (!existsSync(agentPath)) {
    fail(directory, "agents/openai.yaml is missing");
  } else {
    const agent = readFileSync(agentPath, "utf8");
    if (!agent.includes(`$${name}`)) fail(agentPath, `default_prompt must mention $${name}`);
  }
}

if (!existsSync(manifestPath)) {
  errors.push("skills.sh.json: file is missing");
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const grouped = (manifest.groupings ?? []).flatMap((group) => group.skills ?? []);
  const duplicates = grouped.filter((name, index) => grouped.indexOf(name) !== index);
  const missing = skillNames.filter((name) => !grouped.includes(name));
  const unknown = grouped.filter((name) => !skillNames.includes(name));
  if (duplicates.length) errors.push(`skills.sh.json: duplicate skills: ${[...new Set(duplicates)].join(", ")}`);
  if (missing.length) errors.push(`skills.sh.json: ungrouped skills: ${missing.join(", ")}`);
  if (unknown.length) errors.push(`skills.sh.json: unknown skills: ${unknown.join(", ")}`);
}

if (!existsSync(provenancePath)) {
  errors.push("skill-provenance.json: file is missing");
} else {
  const provenance = JSON.parse(readFileSync(provenancePath, "utf8"));
  const records = provenance.skills ?? {};
  const recorded = Object.keys(records).sort();
  const missing = skillNames.filter((name) => !recorded.includes(name));
  const unknown = recorded.filter((name) => !skillNames.includes(name));

  if (missing.length) errors.push(`skill-provenance.json: missing skills: ${missing.join(", ")}`);
  if (unknown.length) errors.push(`skill-provenance.json: unknown skills: ${unknown.join(", ")}`);

  for (const name of skillNames) {
    const record = records[name];
    if (!record) continue;
    if (!record.origin) fail(provenancePath, `${name} is missing origin`);
    if (!record.relationship) fail(provenancePath, `${name} is missing relationship`);

    if (record.origin === "third-party") {
      if (!record.source_url?.startsWith("https://github.com/")) {
		fail(provenancePath, `${name} must link its upstream GitHub source`);
      }
      if (!record.license) fail(provenancePath, `${name} is missing its upstream license`);
      if (!record.license_file) {
		fail(provenancePath, `${name} is missing license_file`);
      } else if (!existsSync(join(root, record.license_file))) {
		fail(provenancePath, `${name} license file does not exist: ${record.license_file}`);
      }

      const skillPath = join(skillsRoot, name, "SKILL.md");
      const source = readFileSync(skillPath, "utf8");
      if (!source.includes(record.source_url)) {
		fail(skillPath, "must link the upstream source recorded in skill-provenance.json");
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${skillNames.length} skills.`);
