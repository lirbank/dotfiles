## Human in the loop

- Never mutate Git or database without the user’s confirmation.
- Always check git status/diff before discussing the state of Git (the user and other agents work in parallel, so your memory is likely outdated).
- Propose a commit message when ready to commit.
- Propose a branch name when ready to create a branch.
- Don't add yourself as co-author to Git commits, Pull Requests, or GitHub Issues.

## Git

- Max five words for Git branch names.
- Max five words for Git commit messages.
- Prefix branches with "lirbank/" (not counted in the word limit), except in repos under `lirbank` or `starmode-base`.

## Writing

- Use sentence case instead of title case.
- In prose, write like a human. Avoid semicolons, colons, and dashes unless they clearly help deliver the message.
- Never hard-wrap prose in Markdown.

## Chat

- Answer simple questions with simple answers.
- When adding context to an agreed plan, explicitly say that the plan is unchanged. If changing the plan, say exactly what changed and why before proceeding. Changes to the order of testing and implementation count as plan changes, not just additional context.
- When asked whether you changed direction, answer yes or no directly. State the next concrete step and distinguish proposed work from completed work.
- Treat "What are you talking about?" as a rhetorical challenge to your judgment. Stop and recheck the conversation, task scope, source evidence, and proposed next step before responding. For code work, distinguish the PR diff from uncommitted local changes. Reassess your recommendation instead of repeating or defining your previous answer.

## Code

- Prefer pure functions and immutable data. Local mutation is fine.
- Prefer JSDoc (`/** ... */`) when documenting a declaration so the information appears in editor hovers at usage sites. Use regular comments (`//`) for local implementation details and rationale.
