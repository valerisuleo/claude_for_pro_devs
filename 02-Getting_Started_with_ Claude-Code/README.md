# Getting started withClaude Code

## What Is Claude Code?

Claude Code is an agentic coding tool, also called a coding agent.

Traditional AI assistants work like a conversation: ask a question, get an answer, copy and paste it into your code, repeat. A coding agent is different. Instead of just giving suggestions, it has access to tools that allow it to take action — reading files, writing code, running commands, fixing bugs, and committing changes to Git, all on its own.

What makes Claude Code stand out:

- It lives in your terminal, making it editor-agnostic, while also integrating well with VS Code and JetBrains IDEs.
- It understands your entire codebase and can execute multi-step tasks autonomously.

Claude Code is used at companies like Netflix, Spotify, Uber, and Salesforce.


**Sign up** for an account. Two options are available:

- **Claude subscription** — a monthly plan with a free tier, a Pro plan, and a Max plan. The free tier is limited; Pro works for most use cases, but heavy users may need Max.
- **API (pay-as-you-go)** — billed by usage through the Anthropic API. Monitor spending closely, as costs can add up quickly.

Visit `claude.com/pricing` to choose a plan.


> ### Key shortcuts:

- `!` — run bash/shell commands directly (e.g., `!npm install`, `!git status`)
- `/model` — select the AI model
- `/terminal-setup` — install the `Shift + Enter` key binding for multi-line prompts
- `Control + L` — clear the prompt
- `@filename` — reference a file to give Claude context

## Running the Project, Project Memory, and First Commit

To run the project, you can either run the command directly:

```bash
!npm run dev
```

Or use a prompt like:

```
Run this app.
```

The prompt approach is slightly slower, but Claude can automatically fix issues — for example, installing missing dependencies before starting the dev server.

When Claude asks to execute a command, three options are presented: allow once, allow always, or deny. For safe, recurring commands like `npm install` or `npm run dev`, choosing **allow always** saves time.

**Background tasks** can be viewed with:

```
/tasks
```

Press `K` to kill a task, or `Escape`/`Enter`/`Space` to close the task view.

### Project Memory — `CLAUDE.md`

Without a memory file, Claude knows nothing about your project at the start of each session. The `/init` command creates a `CLAUDE.md` file — a special file that provides project-specific instructions and context to Claude every session.

```
/init
```

`CLAUDE.md` typically includes common commands, architecture description, patterns, and conventions. Its contents are loaded into Claude's context window with every request, so **keep it lean** — only include essential information.


## Prompting, Fixing a Bug, and Refactoring

**Key prompting rules:**

Be clear and specific. Instead of "Add authentication," say "Add JWT-based authentication to the login endpoint using the existing user model."

Give context upfront. If Claude needs to know about a file, library, pattern, or constraint, say it — don't make it guess.

Be concise. Get to the point. The shorter and clearer the prompt, the better the output. Avoid filler like "Hey Claude, can you please kindly help me with..."

**Fixing a bug:** Reference the file using `@App.jsx`, then describe the issue concisely:

```
In App.jsx, total income and expense are not calculated correctly. Fix it.
```

If the fix addresses the symptom rather than the root cause, use a follow-up prompt:

```
In the transactions array, amount should be a number.
```

Always review the changes in the Source Control panel before committing.

**Refactoring:** Claude Code follows patterns well — which is why it's important to establish clean patterns early by giving Claude small, reviewable tasks.

```
Extract the summary into a separate component.
```

If the refactor is incomplete (e.g., logic still belongs in the new component), follow up:

```
Move the calculation of total income, expenses, and balance into the Summary component.
```

## Plan Mode

Plan mode is used for building new features. Before writing any code, Claude analyzes the codebase, drafts an implementation plan, and waits for approval.

Switch between modes with `Shift + Tab`:

- **Accept edits on** — Claude modifies files freely
- **Plan mode** — Claude plans but does not edit until approved
- **Normal mode** — Claude asks for approval on each change

**Example:**

```
Add the ability to delete transactions.
```

Claude will produce a plan describing the changes it intends to make across files, the markup it will generate, and the steps to verify the feature works. You can then approve, request changes, or cancel.

When prompted to add a confirmation dialog:

```
Add a confirmation dialog box.
```

Claude updates the plan accordingly. Sample output:

```jsx
<button
  className="delete-button"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      onDeleteTransaction(transaction.id);
    }
  }}
>
  Delete
</button>
```

After approving the plan, Claude auto-accepts edits and implements the feature.

**Best practice:** Give Claude small, focused tasks so you can review and refine the code to establish consistent patterns. If Claude is given a large chunk of work, it may use different patterns in different parts of the application.

## Context Window, Costs, and MCP

### Context Window

The context window is Claude's working memory — everything it can see at any given moment, including conversation history, files it has read, and the `CLAUDE.md` file.

View context usage with:

```
/context
```

At the time of recording, Claude Opus 4.5 has a context window of 200,000 tokens. A token is roughly three-quarters of a word. As the context window fills up, response quality degrades — Claude may hallucinate, forget things, or produce lower-quality output.

**Context management commands:**

```
/compact
```
Summarizes the conversation history without clearing it — useful when continuing related tasks with a filling context window. Reduces usage while preserving relevant context.

```
/clear
```
Clears the conversation history entirely — use when switching to a completely unrelated task.

Note: System prompts, system tools, MCP tools, and the `CLAUDE.md` memory file are always present in the context window regardless of clearing.

**Best practice:** Clear the context when switching between unrelated tasks. Compact when working on related tasks and context is growing. Keep `CLAUDE.md` lean.

### Tracking Usage and Costs

- `/cost` — for API users
- `/usage` — for subscription users

Costs are directly tied to context window size. Longer conversations mean more input tokens per request. Proper context management is the primary way to control costs.

### MCP — Model Context Protocol

MCP allows Claude to connect to external services like GitHub, Slack, or a Postgres database.

**Why MCP exists:** Without it, each AI provider would need to write and maintain custom integrations for every external service. MCP solves this by introducing two participants:

- **MCP server** — abstracts an external service. It knows how to communicate with GitHub (or Slack, or Postgres), handles authentication, message formats, and API changes.
- **MCP client** — embedded in Claude Code. Communicates with any MCP server using a standard JSON-based format, without needing to know the specifics of each service.

This is analogous to how a browser can communicate with any website using HTTP — no custom code needed per site.

**Available MCP servers include:** GitHub (issues, pull requests, repositories), Slack (messages, channels), Postgres (queries), Playwright (browser automation), Google Drive, Sentry, and hundreds more.

> **Important:** Every registered MCP server adds its tool descriptions to the context window at startup. Only add the tools you actually need — unnecessary MCP servers increase costs, usage, and the risk of confusing Claude with too many options.

### `Context7` MCP Server

Context7 is an MCP server that fetches up-to-date, version-specific documentation and injects it directly into your prompt. This solves the problem of Claude generating outdated or hallucinated APIs from stale training data.



**Setup:**

1. Sign up at `context7.com` (free).
2. Create an API key from the dashboard.
3. Add the MCP server to Claude Code using the provided command (choose local or remote installation).
4. Restart Claude.

Verify the connection with:

```
/mcp
```

Context7 has two tools: 

1. `ResolveLibraryID` (finds the library's ID on Context7) 
2. and `QueryDocs` (fetches current documentation for that library).

**Usage example:**

```
Add a chart using Recharts to show spending by category. Use Context7.
```

> !! Claude will use Context7 to fetch current Recharts documentation before generating code, avoiding deprecated or non-existent APIs.

## Skills

Skills are sets of instructions that teach Claude how to handle specific tasks — think of them as reusable custom prompts or cheat sheets for particular workflows.

**MCP servers vs. skills:**

- MCP servers give Claude access to *external services*
- Skills teach Claude *how to do something* — a workflow, a pattern, a process

**Examples of skills:**

- Steps to follow before deploying an application
- Generating API documentation in a specific team format
- Writing unit tests with a particular library, naming convention, and file structure

If you find yourself typing the same instructions repeatedly, it's time to create a skill.

### Creating a Custom Skill

```
Create a custom skill called deploy.

When deploying, we should run all tests first, then build the production bundle and push to the staging area.
```

Claude creates a `SKILL.md` file inside `.claude/skills/deploy/`. Skills become custom slash commands:

```
/deploy
```

Skills are project-level by default and can be shared with team members via source control.

### Installing External Skills

Pre-built skills are available at `skillsnpm.com`. Install them using `npx`:

```bash
npx <skill-install-command>
```

Select the skills to install, the target agent (Claude Code), the installation scope (project or global), and the installation method (symlink recommended).

**Example — frontend design skill:**

```
/frontend-design

Improve the look and feel of this app. Make it modern and polished.
```

This skill contains instructions for creating distinctive, production-grade frontend interfaces with high design quality.

> **How skills work in context?** When Claude starts, it loads the short description of each registered skill into the context window. The full skill instructions are only loaded when the skill is invoked. This is a more efficient approach than putting all instructions in `CLAUDE.md`.

## Checkpointing

Claude Code automatically saves the state of the project before each file edit — no configuration required.

**To undo changes:** Press `Escape` twice or run `/rewind`. This shows the full conversation history for the current session. Select any previous step to restore the code and/or conversation to that state.

Restore options:

1. Restore code and conversation
2. Restore conversation only
3. Restore code only
4. Make no changes

**Limitations:**

- Only tracks changes made by Claude's file editing tools — bash commands that move or delete files are not tracked
- Only works within the current session — a new terminal window starts a new session with no checkpoint history

**Checkpointing vs. Git:**

- Checkpoints = local, session-level undo
- Git = permanent version history, branches, collaboration

Checkpointing does not replace Git. Use both.

## Sub-agents

A sub-agent is a separate Claude instance with its own context window, system prompt, and set of tools. When a task produces a large amount of output — running tests, fetching documentation, processing logs, exploring a large codebase — Claude delegates it to a sub-agent. The sub-agent does the heavy lifting and returns only a clean summary to the main conversation, keeping the main context focused.

View and manage agents with:

```
/agents
```

Built-in agents include a bash agent (for running shell commands) and a plan agent (for feature planning).

### Creating a Custom Sub-agent

From `/agents`, create a new agent by providing:

- **Location** — project (shared with team) or home directory (personal)
- **Description** — what the agent does and when to use it
- **Tools** — read-only, edit, execution, or all tools
- **Model** — Sonnet, Opus, or Haiku
- **Background color** — for visual identification in terminal output
- **Memory** — whether the agent has its own memory file

**Example — code reviewer agent:**

```
Help me review my code, identify issues, and suggest improvements for readability, maintainability, performance, and best practices.
```

### Using the Code-Reviewer Sub-agent

```
Use the code-reviewer subagent to review my code.
```

Press `Control + B` to run the agent in the background. View background tasks with `/tasks`. When the agent finishes, it reports a summary back to the main conversation.

**On acting on suggestions:** Not every suggestion from a code review needs to be implemented. Performance optimizations that make code less readable, or concerns that don't apply at the current scale of the application, are often not worth the added complexity. As a general principle:

> Premature optimization is the root of all evil.

Focus on genuine priority issues — bugs, missing validation, duplicated logic — and leave micro-optimizations for when they actually matter.