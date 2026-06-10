# Development Guide

## Prerequisites

- Java 17+
- Node.js 20+
- Docker & Docker Compose
- Maven (or use included wrapper)

## Getting Started

1. Clone the repository
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Start the system:
   ```bash
   make up
   ```
4. Access the application:
   - Client: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Docs: http://localhost:8080/swagger-ui.html

## Development Workflow

### Backend Development

```bash
# Run tests
make test

# Run with hot reload (outside Docker)
cd backend
./mvnw spring-boot:run

# Access database
make psql
```

### Client Development

```bash
# Run dev server with hot reload
cd client
npm install
npm run dev

# Lint code
npm run lint
```

### Database Migrations

Migrations are in `backend/src/main/resources/db/migration/`

```bash
# Apply migrations
make migrate

# Create new migration
# Add V{n}__{description}.sql in db/migration/
```

## Testing

### Unit Tests
```bash
make test
```

### Integration Tests (Testcontainers)
```bash
make test-integration
```

### Sync Module Tests
The most critical tests are in `backend/src/test/java/com/school/attendance/sync/`

## Project Structure

See `docs/ARCHITECTURE.md` for detailed structure documentation.

## Common Issues

### Port Already in Use
```bash
# Check what's using the port
lsof -i :8080
# Stop services
make down
```

### Database Issues
```bash
# Reset database
make clean
make up
```

## Tips

- Use `make logs` to debug issues
- Backend logs show SQL queries in dev mode
- Client has React DevTools support
- Database changes require new migrations (never edit existing ones)
