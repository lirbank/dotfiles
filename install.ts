#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { createInterface, type Interface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const files: readonly (readonly [string, string])[] = [
  ["codex/AGENTS.md", ".codex/AGENTS.md"],
  ["codex/skills/wrap-up/SKILL.md", ".codex/skills/wrap-up/SKILL.md"],
  ["codex/skills/wrap-up/agents/openai.yaml", ".codex/skills/wrap-up/agents/openai.yaml"],
  ["claude/CLAUDE.md", ".claude/CLAUDE.md"],
  ["claude/settings.json", ".claude/settings.json"],
  ["claude/skills/wrap-up/SKILL.md", ".claude/skills/wrap-up/SKILL.md"],
  ["bin/up", ".local/bin/up"],
];

if (process.argv.length > 3) {
  throw new Error("Usage: ./install.ts [destination-directory]");
}

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const destinationRoot = resolve(process.argv[2] ?? homedir());

type Resolution = "target" | "source";

const choices: Partial<Record<string, Resolution>> = { t: "target", s: "source" };

type Prompter = { readonly rl: Interface; readonly lines: AsyncIterator<string> };

// Piped input is read line by line. Created on the first prompt so runs without differences never touch stdin.
let prompter: Prompter | undefined;

/** Open stdin for line reading. The iterator buffers piped lines and reports end of input as done. */
function openPrompter(): Prompter {
  const rl = createInterface({ input: process.stdin });
  return { rl, lines: rl[Symbol.asyncIterator]() };
}

/** Read one line of piped input. Resolves to null at end of input. */
async function readLine(): Promise<string | null> {
  prompter ??= openPrompter();
  const { value, done } = await prompter.lines.next();
  return done ? null : value;
}

/** Read one keypress from the terminal. Raw mode must already be on. Resolves to null on Ctrl+C. */
function readKey(): Promise<string | null> {
  return new Promise((resolve) => {
    process.stdin.once("data", (chunk: Buffer) => {
      process.stdin.pause();
      const key = chunk.toString();
      resolve(key === "\u0003" ? null : key);
    });
    process.stdin.resume();
  });
}

/** Ask how to resolve a file that differs. Keys other than t and s are ignored. Null means abort. */
async function ask(): Promise<Resolution | null> {
  const tty = process.stdin.isTTY;
  // Raw mode goes on before the prompt so an early keypress is neither echoed nor held back by the terminal.
  if (tty) process.stdin.setRawMode(true);
  process.stdout.write("Write [t]arget or [s]ource? ");
  while (true) {
    const answer = await (tty ? readKey() : readLine());
    const resolution = answer === null ? null : choices[answer.trim().toLowerCase()];
    if (resolution === undefined) continue;
    if (tty) process.stdin.setRawMode(false);
    console.log(resolution ?? "");
    return resolution;
  }
}

/** Print a unified diff from the repository copy to the installed copy. */
function showDiff(source: string, target: string, sourceLabel: string) {
  const labels = ["-L", `repo: ${sourceLabel}`, "-L", `installed: ${target}`];
  spawnSync("diff", ["-u", ...labels, source, target], { stdio: "inherit" });
}

for (const [source, destination] of files) {
  const sourcePath = resolve(sourceRoot, source);
  const target = resolve(destinationRoot, destination);

  if (!existsSync(target)) {
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(sourcePath, target);
    console.log(`Copied ${source} to ${target}`);
    continue;
  }

  if (readFileSync(sourcePath).equals(readFileSync(target))) {
    console.log(`Unchanged ${source}`);
    continue;
  }

  console.log(`\n${source} differs from ${target}`);
  showDiff(sourcePath, target, source);
  const resolution = await ask();

  if (resolution === null) {
    console.log("Aborted. Fix the difference by hand and run the installer again.");
    process.exitCode = 1;
    break;
  }

  if (resolution === "target") {
    copyFileSync(sourcePath, target);
    console.log(`Wrote ${target}`);
  } else {
    copyFileSync(target, sourcePath);
    console.log(`Wrote ${source}`);
  }
}

prompter?.rl.close();
