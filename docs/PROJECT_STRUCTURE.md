# Complete Project Structure

```
school-attendance/
├── backend/                                    # Spring Boot API + sync server
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/school/attendance/
│   │   │   │   ├── AttendanceApplication.java      # Entry point
│   │   │   │   ├── common/                         # Shared cross-feature code
│   │   │   │   │   ├── config/
│   │   │   │   │   │   ├── ClockConfig.java
│   │   │   │   │   │   ├── OpenApiConfig.java
│   │   │   │   │   │   └── WebConfig.java
│   │   │   │   │   ├── exception/
│   │   │   │   │   │   ├── ConflictException.java
│   │   │   │   │   │   └── ResourceNotFoundException.java
│   │   │   │   │   ├── web/
│   │   │   │   │   │   ├── ApiResponse.java
│   │   │   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │   │   └── util/
│   │   │   │   ├── learner/                        # Learner feature
│   │   │   │   │   ├── Learner.java
│   │   │   │   │   ├── LearnerController.java
│   │   │   │   │   ├── LearnerService.java
│   │   │   │   │   ├── LearnerRepository.java
│   │   │   │   │   └── dto/
│   │   │   │   ├── school/                         # School feature
│   │   │   │   │   ├── School.java
│   │   │   │   │   ├── SchoolController.java
│   │   │   │   │   ├── SchoolService.java
│   │   │   │   │   ├── SchoolRepository.java
│   │   │   │   │   └── dto/
│   │   │   │   ├── enrollment/                     # Enrollment feature
│   │   │   │   │   ├── Enrollment.java
│   │   │   │   │   ├── EnrollmentController.java
│   │   │   │   │   ├── EnrollmentService.java
│   │   │   │   │   ├── EnrollmentRepository.java
│   │   │   │   │   └── dto/
│   │   │   │   ├── attendance/                     # Attendance feature
│   │   │   │   │   ├── AttendanceRecord.java
│   │   │   │   │   ├── AttendanceController.java
│   │   │   │   │   ├── AttendanceService.java
│   │   │   │   │   ├── AttendanceRepository.java
│   │   │   │   │   └── dto/
│   │   │   │   ├── sync/                           # Critical sync module
│   │   │   │   │   ├── SyncController.java
│   │   │   │   │   ├── SyncService.java
│   │   │   │   │   ├── IdempotencyService.java
│   │   │   │   │   ├── ConflictResolver.java
│   │   │   │   │   ├── ChangeLog.java
│   │   │   │   │   └── dto/
│   │   │   │   └── security/
│   │   │   │       └── SecurityConfig.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       ├── application-prod.yml
│   │   │       └── db/migration/
│   │   │           ├── V1__create_school_and_learner.sql
│   │   │           ├── V2__create_enrollment.sql
│   │   │           ├── V3__create_attendance.sql
│   │   │           └── V4__create_change_log.sql
│   │   └── test/
│   │       └── java/com/school/attendance/
│   │           ├── learner/
│   │           ├── attendance/
│   │           └── sync/                           # Most critical tests
│   │               ├── ConflictResolverTest.java
│   │               ├── SyncIdempotencyTest.java
│   │               └── SyncIntegrationTest.java
│   ├── pom.xml
│   ├── Dockerfile
│   └── .dockerignore
│
├── client/                                     # Offline-first PWA
│   ├── src/
│   │   ├── features/
│   │   │   ├── attendance/                     # Attendance UI
│   │   │   └── learners/                       # Learner roster UI
│   │   ├── db/                                 # Local store (IndexedDB)
│   │   │   ├── localStore.ts
│   │   │   └── schema.ts
│   │   ├── sync/                               # Client-side sync
│   │   │   ├── pendingQueue.ts
│   │   │   ├── syncEngine.ts
│   │   │   └── changeEnvelope.ts
│   │   ├── api/
│   │   │   └── backendClient.ts
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   ├── manifest.json
│   │   └── service-worker.js
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   ├── Dockerfile
│   └── .dockerignore
│
├── deploy/                                     # Deployment configs
│   ├── docker-compose.prod.yml
│   └── README.md
│
├── docs/                                       # Documentation
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   └── PROJECT_STRUCTURE.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml                          # Orchestration
├── Makefile                                    # Dev shortcuts
├── .env.example                                # Environment template
├── .gitignore
└── README.md
```

## Key Design Points

### Backend Structure
- **Feature-based packages**: Each domain (learner, attendance, etc.) is self-contained
- **Sync isolation**: The sync module is separate and heavily tested
- **Migration-first**: Schema changes only via Flyway migrations

### Client Structure
- **Offline-first**: Local store (IndexedDB) is primary data source
- **Sync separation**: Data capture and sync are separate concerns
- **PWA**: Service worker enables offline app launch

### DevOps
- **Single command**: `make up` starts entire system
- **Docker everywhere**: Dev/prod parity via containers
- **CI from day one**: Tests run on every push

## Future Seams

The structure has deliberate extension points for future milestones:
- `ai-service/` folder (not created yet)
- Message queue service in docker-compose
- Microservice split: sync module can be extracted cleanly
