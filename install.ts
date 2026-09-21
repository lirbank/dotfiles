#!/usr/bin/env node

import { copyFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const files: readonly (readonly [string, string])[] = [
  ["codex/AGENTS.md", ".codex/AGENTS.md"],
  ["codex/skills/wrap-up/SKILL.md", ".codex/skills/wrap-up/SKILL.md"],
  ["codex/skills/wrap-up/agents/openai.yaml", ".codex/skills/wrap-up/agents/openai.yaml"],
  ["claude/CLAUDE.md", ".claude/CLAUDE.md"],
  ["claude/skills/wrap-up/SKILL.md", ".claude/skills/wrap-up/SKILL.md"],
  ["bin/up", ".local/bin/up"],
];

if (process.argv.length > 3) {
  throw new Error("Usage: ./install.ts [destination-directory]");
}

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const destinationRoot = resolve(process.argv[2] ?? homedir());

for (const [source, destination] of files) {
  const target = resolve(destinationRoot, destination);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(resolve(sourceRoot, source), target);
  console.log(`Copied ${source} to ${target}`);
}
