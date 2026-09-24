import { BlogPost } from "../posts";
export const postHowToWriteAiPromptsForCodingAssistants: BlogPost = {
  slug: "how-to-write-ai-prompts-for-coding-assistants",
  title: "How to Write AI Prompts for Coding Assistants (2026)",
  description: "How to write AI prompts for coding assistants: give context, set scope, specify stack and constraints, ask for tests, and iterate with these prompt patterns.",
  date: "September 24, 2026",
  readTime: "8 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-write-ai-prompts-for-coding-assistants_cover.webp",
  content: `![How to Write AI Prompts for Coding Assistants (2026)](/how-to-write-ai-prompts-for-coding-assistants_cover.webp)

Most bad code from AI assistants is not a model problem — it is a prompting problem. A vague request like "make a login page" forces the assistant to guess your stack, your conventions, and your edge cases, and guesses compound into bugs. Developers who treat coding assistants as skilled-but-new teammates — people who need context, constraints, and feedback — get dramatically better output. Here is how to write prompts for tools like Cursor, GitHub Copilot, Claude Code, and Windsurf that consistently produce working, reviewable code.

## Why most AI coding prompts fail

AI coding assistants are context engines. Cursor, Claude Code, and Windsurf all build an index of your codebase and use your prompt to decide which files, docs, and tests to pull in. When your prompt is vague, the context they retrieve is generic — and generic context produces generic code. Three patterns cause almost every failure:

- **Missing context:** The assistant does not know your framework version, your existing utilities, or your coding conventions, so it invents its own.
- **Unbounded scope:** Asking for too much in one prompt (a full feature, its tests, and its docs) spreads attention thin and errors creep in at the seams.
- **No acceptance criteria:** Without a definition of "done," the assistant stops at the first thing that looks plausible instead of what is actually correct.

Every technique below exists to fix one of these three problems.

## Technique 1: Ground the prompt in your actual code

Never prompt in a vacuum. Every major assistant gives you a way to point it at real files:

- **Cursor:** reference files with \`@\` mentions (e.g. \`@src/lib/auth.ts\`), or let Composer work across the files you have open. Its codebase indexing pulls in related files automatically, but an explicit mention is always stronger.
- **Claude Code:** it reads your filesystem directly, so name the paths: "look at \`src/routes/api/checkout/route.ts\` and its tests before changing anything."
- **GitHub Copilot agent mode:** use \`#codebase\` in chat to search your workspace, and \`#file\` to pin a specific file into context.
- **Windsurf:** Cascade flows track your workspace state; mention the module or feature name and it usually resolves the right files.

A grounded prompt looks like this: *"Following the error-handling pattern in \`src/lib/api-client.ts\`, add a retry wrapper to the fetch calls in \`src/services/orders.ts\`."* One sentence, three pieces of context, and the assistant now knows your conventions instead of guessing.

## Technique 2: State the stack and the constraints up front

Assistants train on years of code spanning many framework versions, so they default to whatever is most common in their training data — not what your project uses. Lock this down in every prompt:

- Language and version: "TypeScript 5, strict mode, no \`any\`."
- Framework and version: "Next.js 15 App Router, server components by default."
- Style rules: "ESLint: no semicolons, single quotes, 2-space indent." Or better: point at your config file.
- What NOT to do: "Do not add new dependencies. Do not change the public API of this module."

That last item — negative constraints — is disproportionately powerful. Assistants love to add dependencies and refactor your architecture; telling them what is off-limits prevents the most common unwanted rewrites.

## Technique 3: One task per prompt, with a definition of done

Agent-mode assistants (Cursor's Composer, Claude Code, Windsurf's Cascade, Cline's Act mode) can do multi-step tasks, but quality collapses when a single prompt tries to do five things. Break work into single-outcome prompts:

1. "Add a \`POST /api/feedback\` endpoint that validates the body with Zod and stores it via the existing Prisma client."
2. "Write unit tests for that endpoint covering validation failures and DB errors."
3. "Refactor the validation schemas into \`src/lib/schemas/feedback.ts\` and update imports."

Each prompt ends with acceptance criteria: "Done means \`pnpm test feedback\` passes and the endpoint returns 400 for a missing email field." The assistant now has a target it can verify instead of a vibe to chase. If you use Cline, its **Plan mode** formalizes this: it writes a plan, you approve it, and only then does Act mode execute.

## Technique 4: Show, don't just tell — prompt with examples

Few-shot prompting works for code just as well as it does for text. If you want output in a particular shape, show one example:

> "Convert these handlers to the new middleware style. Example — before: \`app.get('/users', async (req, res) => { ... })\`, after: \`router.use('/users', validate(auth), getUsers)\`. Now convert \`routes/orders.js\`."

This single example eliminates entire categories of formatting mistakes, import errors, and convention drift. It is the fastest way to get consistent output across a large migration or refactor.

## Technique 5: Run a tight iterate-and-debug loop

The first draft is a starting point, not a deliverable. The strongest workflow is a loop:

1. Generate the change with a focused prompt.
2. Run it — tests, type-checker, or a quick manual check.
3. Paste the **actual error output** back to the assistant and ask it to fix exactly that: "TypeScript error at line 42: \`Property 'data' does not exist on type 'ApiResponse'\`. Fix without changing the response type."

Paste real errors, not summaries. Error messages contain the precise type signatures and stack frames the assistant needs; your paraphrase of them does not. For debugging, also tell it what you already ruled out: "I checked — the env var is set. The failure is in the query builder." This stops it from re-investigating dead ends.

## Technique 6: Use plan mode for anything risky or large

Before a multi-file refactor, database migration, or architecture change, ask for a plan first — no code yet:

> "Plan a migration from Jest to Vitest for this repo. List every config file, script, and test helper that must change, and flag risks. Do not write any code yet."

Review the plan, correct it, then say "execute." Claude Code users get this natively with plan mode; in Cursor, a plain "plan only" instruction does the same job. This catches the classic failure where an assistant confidently rewrites 40 files in the wrong direction — you pay for the thinking once instead of the rework three times.

## Copy-paste prompt templates

Steal and adapt these. Replace the bracketed parts:

**New feature:** "Add [feature] to [module/file]. Use [stack, version]. Follow the patterns in [reference file]. Constraints: [list]. Done when [test command] passes and [behavior]. Do not [list prohibitions]."

**Refactor:** "Refactor [file/function] to [goal, e.g. extract the retry logic into a helper]. Preserve the public API and all existing behavior — every existing test must still pass. Plan first, then execute."

**Debug:** "This fails with [paste full error]. The relevant code is [file:lines]. I already ruled out [X]. Find the root cause, explain it in one sentence, then fix."

**Code review:** "Review this diff for bugs, security issues, and performance problems. Be specific: cite line numbers. Do not comment on style."

**Explain legacy code:** "Explain what [file/function] does, in the order a new maintainer needs to understand it: inputs, side effects, failure modes."

## Tool-specific prompting notes

- **Cursor:** Composer is best for multi-file edits; inline Tab completion is best for boilerplate. Use custom rules (\`.cursorrules\` or project rules) to persist your conventions so you do not repeat them in every prompt.
- **Claude Code:** It asks permission before editing files or running commands — use that pause to check its plan. Long-context strength means you can point it at whole directories for architecture questions.
- **GitHub Copilot:** Agent mode plus \`#codebase\` is the power combo. Its PR and issue integration means prompts like "implement the issue described in #142" work directly.
- **Windsurf:** Cascade's memory of your session means follow-up prompts can be short ("now do the same for orders") — but reset context with a fresh session when you switch tasks.
- **Cline:** Free and open-source, BYO API key. Use Plan mode for anything non-trivial; it is the most explicit planning workflow of the bunch.

## What to never put in a prompt

A word of caution, because these mistakes are common: never paste secrets, API keys, or production credentials into a coding assistant prompt. Use environment variable names and placeholder values in examples. Never commit AI-generated code without reading it — assistants confidently invent APIs that do not exist, and generated tests sometimes pass without actually asserting anything. And for authentication, payments, and infrastructure code, treat every AI suggestion as a draft that needs human review.

## Key takeaways

- Ground every prompt in real files: mention paths, reference existing patterns, never prompt in a vacuum.
- State the stack, versions, and negative constraints up front — assistants guess when you do not tell them.
- One task per prompt, each with a definition of done (a test command or an observable behavior).
- Paste real error output when debugging; show an example when you want a specific shape.
- Plan first for risky or large changes — review the plan before any code is written.
- Persist conventions in project rules so you stop repeating them, and never commit AI code without reading it.`,
};
