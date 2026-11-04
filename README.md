# MTSMS - Multi-Tenant School Management System

A comprehensive school attendance and management system with multi-tenant architecture, built with Spring Boot and React.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2+ with PostgreSQL
- **Frontend**: React 18+ with TypeScript and Vite
- **Authentication**: Keycloak OAuth2 (Direct Access Grants)
- **Database**: PostgreSQL 16 with Row-Level Security (RLS)
- **Email**: MailHog (development)

## 🚀 Quick Start

### Prerequisites

- Java 21+
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone and Setup Environment

```bash
# Clone the repository
git clone <repository-url>
cd school-attendance

# Copy environment template
cp .env.example .env

# Edit .env with your credentials (for development, defaults are fine)
nano .env
```

### 2. Start Infrastructure Services

```bash
# Start all Docker services (Keycloak, PostgreSQL, MailHog, PgAdmin)
docker-compose up -d

# Wait for services to be healthy (~60 seconds)
docker-compose ps
```

### 3. Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

Wait for: `Started SchoolAttendanceBackendApplication`

### 4. Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will be available at: http://localhost:3005

### 5. Login

- **URL**: http://localhost:3005
- **Username**: `platform.admin@mtsms.local`
- **Password**: `Admin@123456`

## 📁 Project Structure

```
school-attendance/
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Environment template
├── docker-compose.yml            # Infrastructure services
├── backend/                      # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/school/attendance/
│   │   │   │   ├── keycloak/     # Keycloak integration
│   │   │   │   ├── security/     # JWT, permissions, RLS
│   │   │   │   └── test/         # Test controllers
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   ├── keycloak/                 # Keycloak realm config (gitignored)
│   ├── postgres/                 # PostgreSQL config (gitignored)
│   └── pom.xml
└── client/                       # React frontend
    ├── src/
    │   ├── hooks/                # React hooks (auth, etc)
    │   ├── lib/                  # Keycloak, API client
    │   ├── pages/                # Pages/routes
    │   └── store/                # Zustand state
    └── package.json
```

## 🔑 Environment Variables

All environment variables are in the root `.env` file:

- **Database**: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- **Keycloak**: `KEYCLOAK_REALM`, `KEYCLOAK_CLIENT_SECRET`, etc.
- **Frontend**: `VITE_API_BASE_URL`, `VITE_KEYCLOAK_URL`

See `.env.example` for all variables.

## 🌐 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3005 | See login section |
| Backend API | http://localhost:8090 | - |
| Keycloak Admin | http://localhost:8080 | admin / admin123 |
| PgAdmin | http://localhost:5050 | admin@attendance.local / admin123 |
| MailHog | http://localhost:8025 | - |
| PostgreSQL | localhost:5432 | mtsms / mtsms_dev_password |

## 🧪 Testing

### Test Authentication
```bash
# Get JWT token
curl -X POST http://localhost:8080/realms/MTSMS/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=mtsms-frontend" \
  -d "username=platform.admin@mtsms.local" \
  -d "password=Admin@123456"

# Test authenticated endpoint
curl -X GET http://localhost:8090/api/v1/test/authenticated \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

## 🛑 Stopping Services

```bash
# Stop all Docker services
docker-compose down

# Stop backend (Ctrl+C in terminal)
# Stop frontend (Ctrl+C in terminal)
```

## 📝 Development Workflow

1. Make changes to code
2. Backend auto-reloads (Spring DevTools)
3. Frontend auto-reloads (Vite HMR)
4. Test changes
5. Commit when ready

## 🔒 Security Notes

- **DO NOT** commit `.env` file (contains secrets)
- **DO NOT** commit `backend/keycloak/` directory (contains realm secrets)
- Change all passwords in production
- Use environment-specific `.env` files for staging/production

## 📚 Documentation

- **Keycloak Docs**: https://www.keycloak.org/documentation
- **Spring Security**: https://docs.spring.io/spring-security/reference/
- **React Query**: https://tanstack.com/query/latest

## 🐛 Troubleshooting

### Docker services won't start
```bash
docker-compose down -v
docker-compose up -d
```

### Port already in use
```bash
lsof -ti:8080 | xargs kill -9  # Keycloak
lsof -ti:8090 | xargs kill -9  # Backend
lsof -ti:3005 | xargs kill -9  # Frontend
```

### Backend can't connect to database
- Ensure Docker services are running: `docker-compose ps`
- Check `.env` file has correct credentials
- Restart backend after Docker services are healthy

## 📄 License

[Your License Here]
