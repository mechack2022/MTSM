package com.school.attendance.seed;

import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.enums.ResourceScope; // ✅ UPDATED
import com.school.attendance.rbac.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Order(1)
@RequiredArgsConstructor
@Slf4j
public class PermissionCatalogSeeder implements CommandLineRunner {

    private final PermissionRepository permissionRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (permissionRepository.count() > 0) {
            log.info("Permission catalog already seeded ({} permissions). Skipping.", permissionRepository.count());
            return;
        }

        log.info("🔐 Seeding permission catalog...");
        permissionRepository.saveAll(buildCatalog());
        log.info("✅ Permission catalog seeded successfully");
    }

    private List<Permission> buildCatalog() {
        return List.of(
                // ─── TENANT MANAGEMENT (SYSTEM scope) ─────────────────
                permission("TENANT_CREATE", "Create Tenant", "Create a new tenant/organization", "TENANT", ResourceScope.SYSTEM),
                permission("TENANT_READ", "View Tenants", "View tenant list and details", "TENANT", ResourceScope.SYSTEM),
                permission("TENANT_UPDATE", "Update Tenant", "Update tenant details", "TENANT", ResourceScope.SYSTEM),

                // ─── SCHOOL MANAGEMENT (TENANT scope) ─────────────────
                permission("SCHOOL_CREATE", "Create School", "Create a new school under a tenant", "SCHOOL", ResourceScope.TENANT),
                permission("SCHOOL_READ", "View School", "View school profile", "SCHOOL", ResourceScope.SCHOOL),
                permission("SCHOOL_UPDATE", "Update School", "Update school profile", "SCHOOL", ResourceScope.SCHOOL),

                // ─── USER MANAGEMENT (SCHOOL scope) ───────────────────
                permission("USER_CREATE", "Create User", "Create a new user at the school", "USER", ResourceScope.SCHOOL),
                permission("USER_READ", "View Users", "View users at the school", "USER", ResourceScope.SCHOOL),
                permission("USER_UPDATE", "Update User", "Update a user's details", "USER", ResourceScope.SCHOOL),
                permission("USER_DEACTIVATE", "Deactivate User", "Deactivate a user account", "USER", ResourceScope.SCHOOL),

                // ─── ROLE MANAGEMENT ──────────────────────────────────
                permission("ROLE_CREATE", "Create Custom Role", "Create a custom role from the permission catalog", "ROLE", ResourceScope.SCHOOL),
                permission("ROLE_READ", "View Roles", "View available roles", "ROLE", ResourceScope.SCHOOL),
                permission("ROLE_UPDATE", "Update Role", "Update a custom role's permissions", "ROLE", ResourceScope.SCHOOL),
                permission("ROLE_ASSIGN", "Assign Role", "Assign a role to a user", "ROLE", ResourceScope.SCHOOL),

                // ─── PERMISSION CATALOG (SYSTEM scope, read-only) ─────
                permission("PERMISSION_READ", "View Permission Catalog", "View the seeded permission catalog", "PERMISSION", ResourceScope.SYSTEM),

                // ─── CODE SET / REFERENCE DATA ────────────────────────
                permission("CODESET_CREATE", "Create Reference Value", "Create a code set entry", "CODESET", ResourceScope.SCHOOL),
                permission("CODESET_READ", "View Reference Values", "View code set entries", "CODESET", ResourceScope.SCHOOL),
                permission("CODESET_UPDATE", "Update Reference Value", "Update a code set entry", "CODESET", ResourceScope.SCHOOL),
                permission("CODESET_DEACTIVATE", "Deactivate Reference Value", "Deactivate a code set entry", "CODESET", ResourceScope.SCHOOL),

                // ─── LEARNER MANAGEMENT ───────────────────────────────
                permission("LEARNER_CREATE", "Create Learner", "Create a new learner record", "LEARNER", ResourceScope.SCHOOL),
                permission("LEARNER_READ", "View Learners", "View learner records", "LEARNER", ResourceScope.SCHOOL),
                permission("LEARNER_UPDATE", "Update Learner", "Update a learner's details", "LEARNER", ResourceScope.SCHOOL),
                permission("LEARNER_DEACTIVATE", "Deactivate Learner", "Deactivate a learner who has left", "LEARNER", ResourceScope.SCHOOL),

                // ─── CLASS SECTION MANAGEMENT ─────────────────────────
                permission("CLASS_CREATE", "Create Class", "Create a new class/section", "CLASS", ResourceScope.SCHOOL),
                permission("CLASS_READ", "View Classes", "View classes/sections", "CLASS", ResourceScope.SCHOOL),
                permission("CLASS_UPDATE", "Update Class", "Update a class's details", "CLASS", ResourceScope.SCHOOL),
                permission("CLASS_DEACTIVATE", "Deactivate Class", "Deactivate a class/section", "CLASS", ResourceScope.SCHOOL),

                // ─── ENROLLMENT MANAGEMENT ────────────────────────────
                permission("ENROLLMENT_CREATE", "Enroll Learner", "Enroll a learner into a class", "ENROLLMENT", ResourceScope.SCHOOL),
                permission("ENROLLMENT_READ", "View Enrollments", "View enrollment records", "ENROLLMENT", ResourceScope.SCHOOL),
                permission("ENROLLMENT_WITHDRAW", "Withdraw Learner", "Withdraw a learner from a class", "ENROLLMENT", ResourceScope.SCHOOL),

                // ─── ATTENDANCE ───────────────────────────────────────
                permission("ATTENDANCE_CREATE", "Mark Attendance", "Record attendance for a class", "ATTENDANCE", ResourceScope.SCHOOL),
                permission("ATTENDANCE_READ", "View Attendance", "View attendance records", "ATTENDANCE", ResourceScope.SCHOOL),
                permission("ATTENDANCE_UPDATE", "Correct Attendance", "Correct a previously recorded attendance entry", "ATTENDANCE", ResourceScope.SCHOOL),

                // ─── SYNC & CONFLICT ──────────────────────────────────
                permission("SYNC_UPLOAD", "Upload Sync Data", "Upload offline-captured data to the server", "SYNC", ResourceScope.SCHOOL),
                permission("SYNC_CONFLICT_READ", "View Sync Conflicts", "View unresolved sync conflicts", "SYNC", ResourceScope.SCHOOL),
                permission("SYNC_CONFLICT_RESOLVE", "Resolve Sync Conflict", "Resolve a sync conflict", "SYNC", ResourceScope.SCHOOL),

                // ─── DEVICE MANAGEMENT ────────────────────────────────
                permission("DEVICE_REGISTER", "Register Device", "Register a new device for offline capture", "DEVICE", ResourceScope.SCHOOL),
                permission("DEVICE_READ", "View Devices", "View registered devices", "DEVICE", ResourceScope.SCHOOL),
                permission("DEVICE_DEACTIVATE", "Deactivate Device", "Deactivate a lost or retired device", "DEVICE", ResourceScope.SCHOOL),
                // ─── AGGREGATED REPORTING (TENANT scope) ──────────────
                permission("REPORT_TENANT_AGGREGATE", "View Tenant Aggregates", "View aggregated attendance/enrollment across all schools in tenant", "REPORT", ResourceScope.TENANT),
                permission("REPORT_SCHOOL_SUMMARY", "View School Summary", "View attendance summary for own school", "REPORT", ResourceScope.SCHOOL)
        );
    }


    private Permission permission(String code, String displayName, String description,
                                  String category, ResourceScope resourceScope) {
        return Permission.builder()
                .code(code)
                .displayName(displayName)
                .description(description)
                .category(category)
                .resourceScope(resourceScope)
                .build();
    }
}