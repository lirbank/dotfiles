# Personal dotfiles

Personal skills and global instructions for Codex and Claude Code.

## Install

Requires Node.js 24 or newer.

```sh
./install.ts
```

The installer copies the files listed in `install.ts` into your home directory. It creates missing directories and overwrites those files without prompting. It leaves unrelated files alone. Source paths resolve relative to the installer, so you can run it from any directory.

To try an installation in a temporary directory, pass a destination.

```sh
./install.ts "$(mktemp -d)"
```

You can also run it with `bun install.ts`.

## Maintain

Edit the files here, run the installer, and try the changes. Manage Git separately. On another machine, clone or pull this repository and run the installer.

Keep shared skill instructions consistent between `codex/skills/` and `claude/skills/`. Their invocation metadata differs, so each tool has its own copy. Claude's global `CLAUDE.md` imports the installed Codex `AGENTS.md`.

To manage another file, add its source and destination to the list in `install.ts`. Include only deliberately selected configuration, never credentials or session history.
