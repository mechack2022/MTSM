# School Attendance System - Pilot

Single-school learner and attendance tracking system with offline-first capabilities.

## Quick Start

```bash
# Copy environment template
cp .env.example .env

# Start the entire system
make up

# Run backend tests
make test

# View logs
make logs
```

## Architecture

- **Backend**: Spring Boot API with PostgreSQL
- **Client**: Offline-first PWA
- **Database**: PostgreSQL 16
- **Orchestration**: Docker Compose

## Development

The system is designed as a monorepo with clean separation:
- `backend/` - Spring Boot REST API and sync server
- `client/` - Progressive Web App with offline capabilities
- `deploy/` - Docker and infrastructure configuration
- `docs/` - Documentation and design specifications

## Key Features

- Offline-first attendance marking
- Automatic conflict resolution
- Idempotent sync protocol
- Change log for audit trail

See `docs/` for detailed documentation.
