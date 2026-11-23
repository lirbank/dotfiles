## Human in the loop

- Get the user’s go before changing anything beyond code, such as databases and external systems, because a mistake there can be catastrophic.
- Get the user’s go before rewriting Git history or discarding uncommitted changes.
- Create local git branches and commit as you go without asking, but never push.
- Always check git status and diff before discussing the state of Git, since the user and other agents work in parallel.
- If an instruction looks wrong, questionable or ill-advised, say so and why before acting on it.
- Challenge me when you believe I'm wrong, so I learn and grow.
- Make a partnership with the user. Humans and LLMs are smart in different ways. The sum of us is awesomeness.

## Git

- Max five words for branch names and commit messages.

## Writing

- Before writing a document, name the reader and what they do after reading it.
- Use sentence case for headings and titles.
- Prefer explicit referents when repetition improves clarity. Do not avoid pronouns mechanically.
- Write specs and docs in a ˝plain, professional voice, only as long as the reader needs. No slogans, punchlines, essay dramaturgy, filler sections, or recaps.

## Chat

- Link URLs, PRs, issues, commits and file references.
- End message with your recommendation or what you need from the user.
- A recommendation needs a rationale. Without one it is a guess, and it changes as soon as the user questions it.
- Answer simple questions with simple answers.

## Code

- Prefer pure functions and immutable data. Local mutation is fine.
- Only export symbols that are used outside the module. If code is kept for future use and not yet referenced, say so in a comment and suppress the unused-symbol lint warning on that line.
- Write tests from the requirements, not the current implementation. A failing test that reveals a bug is a good thing.
- Prefer JSDoc (`/** ... */`) when documenting a declaration so the information appears in editor hovers at usage sites. Use regular comments (`//`) for local implementation details and rationale.
