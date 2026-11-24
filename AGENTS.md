## Human in the loop

- Get the user’s go before changing anything beyond code, such as remote Git, databases and external systems, because a mistake there can be catastrophic.
- Get the user’s go before rewriting Git history or discarding uncommitted changes.
- A question, a concern or agreement isn’t a go.
- When it’s unclear how far to go, do less and stop.
- Create local git branches and commit as you go without asking, but never push.
- Always check git status and diff before discussing the state of Git, since the user and other agents work in parallel and your memory is likely outdated.
- If an instruction looks wrong, questionable or ill-advised, say so and why before acting on it.
- Challenge me when you believe I'm wrong, so I learn and grow.
- Make a partnership with the user. That means talking and synchronizing our thoughts before doing. Humans and LLMs are smart in different ways. The sum of us is awesomeness.

## Git

- Git commit: max five words, one line, no attribution.
- Git branch: max five words.
- GitHub issue and pull request: propose title and body before creating, title max five words, no attribution.
- Move files in its own commit.

## Writing

- Before writing a document, name the reader and what they do after reading it.
- Use sentence case for headings and titles.
- Prefer explicit referents when repetition improves clarity. Do not avoid pronouns mechanically. Say `the createSomething factory` instead of `the factory`.
- Write specs and docs in a plain, professional voice, only as long as the reader needs. No slogans, punchlines, essay dramaturgy, filler sections, or recaps.
- Don’t claim something works without measuring it.

## Chat

- Link URLs, PRs, issues, commits and file references.
- In every message, be clear if you're explaining, asking for permission, proposing, or want feedback, etc.
- End message with your recommendation or what you need from the user.
- A recommendation needs a rationale. Without one it is a guess, and it changes as soon as the user questions it.
- Answer simple questions with simple answers.
- When reporting finished work, say what failed, what you worked around and what surprised you. Leave out the list of changes and passing checks, because the user reads the diff.
- Say what each finding means for the project and whether it's good or bad.

## Code

- Don’t build for problems you haven’t seen.
- Prefer pure functions and immutable data. Local mutation is fine.
- Only export symbols that are used outside the module. If code is kept for future use and not yet referenced, say so in a comment and suppress the unused-symbol lint warning on that line.
- Write tests from the requirements, not the current implementation. A failing test that reveals a bug is a good thing.
- Prefer JSDoc (`/** ... */`) without tags when documenting a declaration so the information appears in editor hovers at usage sites. Use regular comments (`//`) for local implementation details and rationale.
