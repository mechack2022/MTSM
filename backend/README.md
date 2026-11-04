# School Attendance System - Backend

**Fresh Start with Keycloak Authentication & Flyway Migrations**

---

## ✅ What's Been Done

### 1. **Deleted Old Code**
- ❌ Removed `auth/` package (custom JWT authentication)
- ❌ Removed `user/` package (custom user management)
- ❌ Removed `rbac/` package (custom roles/permissions)
- ❌ Removed `security/` package (old security config)
- ❌ Removed all domain packages (will rebuild from scratch)
- ❌ Removed all test files
- ❌ Removed Liquibase migrations

### 2. **Docker Setup**
✅ `docker-compose.yml` with 5 services:
  - **Keycloak** (port 8080) - Authentication server
  - **Keycloak DB** (port 5433) - Postgres for Keycloak
  - **App DB** (port 5432) - Postgres for application
  - **MailHog** (ports 1025, 8025) - Email testing
  - **PgAdmin** (port 5050) - Database management

✅ Keycloak pre-configured with:
  - Realm: `attendance`
  - Roles: `platform_admin`, `tenant_admin`, `school_admin`, `head_teacher`, `teacher`, `guardian`
  - Default admin user: `platform.admin@attendance.local` / `Admin@123`
  - SMTP: Connected to MailHog

✅ PostgreSQL custom configuration:
  - Optimized for Row-Level Security
  - Timezone: Africa/Lagos
  - Extensions: uuid-ossp, pg_trgm, pg_stat_statements

### 3. **pom.xml Updated**
✅ Removed:
  - Liquibase
  - JWT (jjwt-api, jjwt-impl, jjwt-jackson)

✅ Added:
  - Flyway Core + PostgreSQL driver
  - Spring OAuth2 Resource Server
  - Spring OAuth2 Client
  - Keycloak Admin Client

### 4. **application.yml Reconfigured**
✅ New configuration for:
  - Flyway migrations
  - Keycloak OAuth2 integration
  - Offline sync settings (21-day window)
  - Row-Level Security session variables
  - Server port 8090 (Keycloak uses 8080)

---

## 🚀 Quick Start

### 1. Start Docker Services

```bash
cd backend
docker-compose up -d
```

Wait ~60 seconds for Keycloak to initialize.

### 2. Verify Services

```bash
docker-compose ps
```

All services should show "Up (healthy)".

### 3. Access Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Keycloak Admin | http://localhost:8080 | admin / admin123 |
| MailHog (Email) | http://localhost:8025 | (no login) |
| PgAdmin | http://localhost:5050 | admin@attendance.local / admin123 |
| Swagger UI | http://localhost:8090/swagger-ui.html | (after app starts) |

### 4. Build the Application

```bash
./mvnw clean install -DskipTests
```

### 5. Run the Application

```bash
./mvnw spring-boot:run
```

Access at: http://localhost:8090

---

## 📁 Project Structure (Current State)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/school/attendance/
│   │   │   └── AttendanceApplication.java  ← Only file left
│   │   └── resources/
│   │       ├── db/migration/               ← Flyway migrations (empty, ready for V001...)
│   │       ├── application.yml             ← Fresh config with Keycloak
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── application-test.yml
│   │       └── messages.properties
│   └── test/                               ← Empty (deleted all tests)
│
├── docker-compose.yml                      ← Multi-service Docker setup
├── keycloak/
│   └── realm-export.json                   ← Keycloak realm configuration
├── postgres/
│   ├── postgresql.conf                     ← Custom PostgreSQL config
│   └── init-scripts/
│       └── 01-init-extensions.sql          ← Database initialization
├── pgadmin/
│   └── servers.json                        ← PgAdmin pre-configured servers
│
├── pom.xml                                 ← Updated dependencies
├── README.md                               ← This file
└── DOCKER_SETUP.md                         ← Detailed Docker guide
```

---

## 🏗️ Next Steps (Implementation Order)

### Phase 1: Security & Configuration (Week 1)

1. **Get Keycloak Client Secret**
   ```bash
   # Login to Keycloak admin console
   # Clients → attendance-backend → Credentials → Copy secret
   # Paste into application.yml at line 76
   ```

2. **Create Security Configuration**
   ```
   src/main/java/com/school/attendance/config/SecurityConfig.java
   - Configure OAuth2 Resource Server
   - Set up CORS
   - Define public vs protected endpoints
   ```

3. **Create RLS (Row-Level Security) Filter**
   ```
   src/main/java/com/school/attendance/security/RLSFilter.java
   - Extract tenant ID from JWT
   - Extract user ID from JWT
   - Set PostgreSQL session variables
   ```

### Phase 2: Database Schema (Week 1-2)

4. **Create Flyway Migrations**
   ```
   V001__create_tenants.sql
   V002__create_schools.sql
   V003__create_learners.sql
   V004__enable_row_level_security.sql
   V005__create_devices.sql
   V006__create_sync_queue.sql
   V007__create_attendance.sql
   ```

5. **Enable RLS Policies**
   - Tenant isolation
   - School-based access
   - User-level permissions

### Phase 3: Core Domain (Week 2-3)

6. **Build Domain Modules** (in this order)
   ```
   tenant/         ← Multi-tenancy
   school/         ← School management
   learner/        ← Student/learner records
   enrollment/     ← Class enrollments
   attendance/     ← Attendance marking
   device/         ← Device registry for offline
   sync/           ← Offline sync with conflict queue
   ```

7. **Implement Keycloak Integration**
   ```
   keycloak/KeycloakAdminService.java
   - Create users
   - Assign roles
   - Send invitations
   - Manage tenants/schools as Keycloak groups
   ```

### Phase 4: Offline Sync (Week 4)

8. **Device Registration Flow**
   - Device fingerprinting
   - Public key exchange
   - Encryption key wrapping

9. **Sync Conflict Resolution**
   - Quarantine queue for revoked users
   - Conflict detection
   - Admin review workflow

### Phase 5: Testing (Week 5)

10. **Integration Tests**
    - Use Testcontainers for Keycloak
    - Test RLS policies
    - Test offline sync flow

---

## 🔑 Key Architectural Decisions

### Authentication Strategy

**Keycloak Handles:**
- User registration & login
- Email verification
- Password reset
- MFA/2FA
- Token issuance & rotation
- Session management

**Your Backend Handles:**
- Authorization (who can access what data)
- Row-Level Security enforcement
- Offline device trust
- Sync conflict resolution

### Offline Strategy (21-Day Window)

| Aspect | Configuration |
|--------|---------------|
| Max offline days | 21 days |
| Refresh token lifetime | 30 days (21 + 9 grace) |
| Device trust period | 60 days (re-verify after) |
| Max devices per user | 3 devices |
| Sync batch size | 100 changes |

**How it works:**
1. Teacher logs in online → Keycloak issues tokens
2. Device is registered → Gets encryption keys
3. Teacher goes offline → Works locally for up to 21 days
4. Teacher comes back online → Sync validates permissions AT SYNC TIME
5. If user was revoked while offline → Changes go to quarantine queue

### Database Strategy

**Flyway Benefits:**
- ✅ Plain SQL for PostgreSQL-specific features
- ✅ Versioned migrations (V001, V002, ...)
- ✅ Forward-only (no rollback complexity)

**Row-Level Security:**
```sql
-- Every table has these policies:
1. Tenant isolation (users only see their tenant's data)
2. School-based access (staff only see their school's data)
3. Role-based filtering (teachers see different data than admins)
```

---

## 📊 Entity Relationship (Planned)

```
Tenant (1) ──────────> (N) School
                          │
                          ├─> (N) Staff (linked to Keycloak user)
                          │
                          └─> (N) Class/Section
                                │
                                └─> (N) Enrollment
                                      │
                                      └─> (1) Learner

User (Keycloak) ─────> (N) Device
                        │
                        └─> (N) SyncChange (offline queue)

Attendance Record:
  - learner_id
  - date
  - status (present/absent/late)
  - marked_by (staff_id)
  - device_id (for audit)
```

---

## 🛡️ Security Notes

### Development Credentials (CHANGE IN PRODUCTION!)

| Service | Username | Password |
|---------|----------|----------|
| Keycloak Admin | admin | admin123 |
| Keycloak User | platform.admin@attendance.local | Admin@123 |
| App DB | attendance | attendance_dev_password |
| Keycloak DB | keycloak | keycloak_dev_password |
| PgAdmin | admin@attendance.local | admin123 |

### Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Generate strong Keycloak client secrets
- [ ] Enable SSL/TLS (KC_HOSTNAME_STRICT_HTTPS: true)
- [ ] Enable PostgreSQL SSL
- [ ] Remove MailHog (use real SMTP)
- [ ] Remove PgAdmin (or secure it)
- [ ] Set up Keycloak clustering (HA)
- [ ] Configure database backups
- [ ] Use Docker secrets instead of environment variables
- [ ] Set resource limits in docker-compose
- [ ] Enable rate limiting on sync endpoints

---

## 🐛 Troubleshooting

### Application won't start

**Error:** `Cannot create bean 'entityManagerFactory'`

**Cause:** Database not initialized or Flyway migrations failed

**Solution:**
```bash
# Check database is running
docker-compose ps app-db

# Check Flyway migration status
./mvnw flyway:info

# Reset database (WARNING: deletes all data!)
docker-compose down -v
docker-compose up -d
```

### Keycloak connection refused

**Error:** `Unable to connect to Keycloak at http://localhost:8080`

**Solution:**
```bash
# Verify Keycloak is healthy
docker-compose ps keycloak

# Check Keycloak logs
docker-compose logs keycloak

# Restart Keycloak
docker-compose restart keycloak
```

### JWT validation fails

**Error:** `An error occurred while attempting to decode the Jwt`

**Causes:**
1. Keycloak not running
2. Wrong issuer-uri in application.yml
3. Clock skew between services

**Solution:**
```bash
# Verify issuer URI matches
curl http://localhost:8080/realms/attendance/.well-known/openid-configuration

# Should return JSON with issuer: "http://localhost:8080/realms/attendance"
```

---

## 📚 Documentation

- **DOCKER_SETUP.md** - Detailed Docker guide with troubleshooting
- **ARCHITECTURE.md** - System architecture (update this as you build)
- **API.md** - API documentation (create this when you add endpoints)

---

## 🤝 Contributing

Since this is a fresh start:
1. Create feature branches from `main`
2. Follow naming: `feature/tenant-management`, `feature/offline-sync`, etc.
3. Write tests for new features
4. Update migrations in sequential order (V001, V002, ...)
5. Never modify a shipped migration - always create a new one

---

## 📞 Support

**Issues with Docker?** → See DOCKER_SETUP.md
**Need help with Keycloak?** → https://www.keycloak.org/documentation
**Flyway migrations?** → https://flywaydb.org/documentation

---

**Status:** ✅ Clean slate ready for implementation
**Next:** Start with Phase 1 (Security Configuration)
