# Personal dotfiles

Personal skills, global instructions, settings and helper scripts for Codex and Claude Code.

## Install

Run directly with Node.js 24 or newer.

```sh
./install.ts
```

Or run with Bun.

```sh
bun install.ts
```

The installer copies the files listed in `install.ts` into your home directory. It leaves unrelated files alone. Source paths resolve relative to the installer, so you can run it from any directory. When an installed file differs from the repository copy, it shows the diff and asks which side to write. Ctrl+C aborts so you can reconcile them by hand.

To try an installation in a temporary directory, pass a destination.

```sh
./install.ts "$(mktemp -d)"
```

Keep shared skill instructions consistent between `codex/skills/` and `claude/skills/`, which use different invocation metadata.

## Scripts

The installer places `bin/up` in `~/.local/bin`. Run `up` to upgrade Bun, Claude Code, Codex, pnpm and Homebrew packages in one go.
