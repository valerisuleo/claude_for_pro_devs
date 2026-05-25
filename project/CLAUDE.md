# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation

Use the **Context7 MCP server** to fetch up-to-date documentation whenever working with any library or framework used in this project (Express, React, Vite, Bun, TypeScript, etc.). Always call `resolve-library-id` first, then `query-docs` with the resolved ID. Prefer this over training data for API references, configuration options, and version-specific behaviour.

## Commands

All commands run from the repo root using Bun workspaces.

```bash
# Install dependencies
bun install

# Run both server and client concurrently (separate terminals)
bun run server    # Express on http://localhost:3001
bun run client    # Vite on http://localhost:5173

# Run all packages at once
bun run dev

# Build all packages
bun run build

# Target a specific workspace directly
bun run --filter server dev
bun run --filter client dev
```

Server uses `bun --watch` (no nodemon needed). Client uses Vite HMR.

## Architecture

Bun monorepo with two workspace packages under `packages/`:

- **`packages/server`** — Express 5 + TypeScript, runs on Bun. Entry point: `src/index.ts`. All API routes are mounted under `/api` via `src/routes/api.ts`.
- **`packages/client`** — React 18 + Vite + TypeScript. Entry point: `src/main.tsx`.

**API proxying:** Vite's dev server proxies all `/api/*` requests to `http://localhost:3001`. The client always calls `/api/...` with no hardcoded host — this works in both dev (proxy) and production (same-origin or reverse proxy).

**CORS:** Server allows only `http://localhost:5173`. Update this when deploying.

**TypeScript:** `tsconfig.base.json` at the root defines shared compiler options. Each package extends it and adds its own `target`, `module`, and `jsx` settings.

## Adding New Server Routes

1. Add handler(s) to `packages/server/src/routes/api.ts` (or create a new router file and mount it in `src/index.ts`).
2. Use `Router` from Express, typed with `Request` / `Response` from `"express"`.

## Adding New Client Components

Components live in `packages/client/src/components/`. Props are typed with interfaces, not inline types, when more than one prop is needed.
