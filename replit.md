# Brightline Dental Studio

A dental practice web application with a React frontend and Express API backend, backed by Supabase.

## Stack

- **Frontend**: React + Vite + TypeScript, Radix UI, Tailwind CSS (`artifacts/brightline-dental`)
- **API server**: Express 5 + TypeScript, built with esbuild (`artifacts/api-server`)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Replit Auth (openid-client)
- **Monorepo**: npm workspaces

## Running the project

Two workflows run the app:

| Workflow | Command | Port |
|---|---|---|
| `artifacts/brightline-dental: web` | `pnpm --filter @workspace/brightline-dental run dev` | auto-assigned |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | 8080 |

The API server builds before starting (`npm run build` via `build.mjs` → esbuild → `dist/index.mjs`).

## Environment secrets

Set via Replit Secrets (never commit values):

| Key | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only) |
| `SESSION_SECRET` | Express session signing |

If Supabase credentials are missing or invalid, the API server automatically falls back to an in-memory mock (`artifacts/api-server/src/lib/supabase.ts`).

## Database setup

Run `SUPABASE_SETUP.sql` against your Supabase project to create the required tables and policies.

## User preferences

_No preferences recorded yet._
