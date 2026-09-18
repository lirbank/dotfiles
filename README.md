# Personal dotfiles

Personal skills and global instructions for Codex and Claude Code.

## Install

Run directly with Node.js 24 or newer.

```sh
./install.ts
```

Or run with Bun.

```sh
bun install.ts
```

The installer copies the files listed in `install.ts` into your home directory. It creates missing directories and overwrites those files without prompting. It leaves unrelated files alone. Source paths resolve relative to the installer, so you can run it from any directory.

To try an installation in a temporary directory, pass a destination.

```sh
./install.ts "$(mktemp -d)"
```

Edit the repository copies because installation overwrites the destination files. Keep shared skill instructions consistent between `codex/skills/` and `claude/skills/`, which use different invocation metadata.
