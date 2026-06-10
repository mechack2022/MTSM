# Codebase Structure & DevOps Guide
## Single-School Learner & Attendance System (Pilot)

Scope: the pilot (Milestones 0 & 1) — Spring Boot backend, PostgreSQL, an
offline-first web/PWA client, all orchestrated with Docker. The structure leaves
clean seams for the future AI service and message queue **without building them now**.

Guiding principles:
- **Monorepo** — one repo, top-level folders per deployable piece.
- **Package the backend by feature**, not by technical layer.
- **`sync` is its own isolated, heavily-tested module** — it holds the riskiest logic.
- **Migrations are versioned SQL from commit #1** (Flyway) — never auto-DDL.
- **Docker + one compose file from day one** — the whole system runs with one command.
- **Config via environment; secrets never committed.**

## Top-level layout

```
school-attendance/
├── backend/                 # Spring Boot API + sync server
├── client/                  # Offline-first web / PWA
├── deploy/                  # Compose overrides, env templates, infra
├── docs/                    # BRD, user stories, this guide, design notes
├── .github/workflows/       # CI pipelines
├── docker-compose.yml       # The whole system, one command
├── .env.example             # Documented env vars (no real secrets)
├── .gitignore
├── Makefile                 # Solo-dev shortcuts
└── README.md
```

## Backend Structure

Packaged by feature, not by layer:
- `learner/` - Learner management
- `school/` - School configuration
- `enrollment/` - Enrollment tracking
- `attendance/` - Attendance records
- `sync/` - Critical sync and conflict resolution logic
- `common/` - Shared cross-feature utilities

## Client Structure

Offline-first architecture:
- `features/` - UI features
- `db/` - IndexedDB local store
- `sync/` - Client-side sync engine
- `api/` - Backend communication

## Key Design Decisions

1. **Migrations are append-only** - Shipped migrations never change
2. **No hard deletes** - Status flags and change logs instead
3. **Change log is first-class** - Audit trail for all changes
4. **Sync module is isolated** - Most critical, most tested code
5. **Docker from day one** - Reproducible environments

See individual feature documentation for implementation details.
