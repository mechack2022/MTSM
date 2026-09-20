package com.school.attendance.seed;

import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.entity.RolePermission;
import com.school.attendance.rbac.repository.PermissionRepository;
import com.school.attendance.rbac.repository.RolePermissionRepository;
import com.school.attendance.rbac.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Order(3)
@RequiredArgsConstructor
@Slf4j
public class RolePermissionSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (rolePermissionRepository.count() > 0) {
            log.info("Role-permission mappings already seeded ({} mappings). Skipping.",
                    rolePermissionRepository.count());
            return;
        }

        log.info("🔗 Seeding role-permission mappings...");

        Map<String, Role> rolesByCode = roleRepository.findAll().stream()
                .collect(Collectors.toMap(Role::getCode, r -> r));

        Map<String, Permission> permissionsByCode = permissionRepository.findAll().stream()
                .collect(Collectors.toMap(Permission::getCode, p -> p));

        List<RolePermission> mappings = buildMappings(rolesByCode, permissionsByCode);
        rolePermissionRepository.saveAll(mappings);

        log.info("✅ Role-permission mappings seeded successfully ({} mappings)", mappings.size());
    }

    private List<RolePermission> buildMappings(Map<String, Role> roles, Map<String, Permission> perms) {
        return Stream.of(
                        // ══════════════════════════════════════════════════════════════
                        // 1. SUPER_ADMIN (Platform Admin)
                        // Bypasses all checks. Gets every permission in the catalog.
                        // ══════════════════════════════════════════════════════════════
                        mapAll(roles.get(SystemRoleSeeder.SUPER_ADMIN), perms),

                        // ══════════════════════════════════════════════════════════════
                        // 2. TENANT_ADMIN
                        // Manages the entire tenant. Creates schools, users, and custom roles.
                        // CANNOT modify the tenant record itself (enforced by service layer).
                        // ══════════════════════════════════════════════════════════════
                        mapTo(roles.get(SystemRoleSeeder.TENANT_ADMIN), perms,
                                // Schools (Full management)
                                "SCHOOL_CREATE", "SCHOOL_READ", "SCHOOL_UPDATE", // ✅ Removed SCHOOL_DEACTIVATE
                                // Users (Full management, service layer restricts same-level)
                                "USER_CREATE", "USER_READ", "USER_UPDATE", "USER_DEACTIVATE",
                                // Roles (Can create tenant-scoped custom roles)
                                "ROLE_CREATE", "ROLE_READ", "ROLE_UPDATE", "ROLE_ASSIGN",
                                "PERMISSION_READ",
                                // Code Sets (Full management for tenant-wide or school setup)
                                "CODESET_CREATE", "CODESET_READ", "CODESET_UPDATE", "CODESET_DEACTIVATE",
                                // Operational Data (Full oversight across all schools in tenant)
                                "LEARNER_CREATE", "LEARNER_READ", "LEARNER_UPDATE", "LEARNER_DEACTIVATE",
                                "CLASS_CREATE", "CLASS_READ", "CLASS_UPDATE", "CLASS_DEACTIVATE",
                                "ENROLLMENT_CREATE", "ENROLLMENT_READ", "ENROLLMENT_WITHDRAW",
                                "ATTENDANCE_CREATE", "ATTENDANCE_READ", "ATTENDANCE_UPDATE",
                                // Sync & Devices
                                "SYNC_CONFLICT_READ", "SYNC_CONFLICT_RESOLVE",
                                "DEVICE_REGISTER", "DEVICE_READ", "DEVICE_DEACTIVATE",
                                // Reports
                                "REPORT_TENANT_AGGREGATE"
                        ),

                        // ══════════════════════════════════════════════════════════════
                        // 3. SCHOOL_ADMIN
                        // Manages school-level operations. CANNOT update the school record itself.
                        // Manages teachers and learners within their assigned schools.
                        // ══════════════════════════════════════════════════════════════
                        mapTo(roles.get(SystemRoleSeeder.SCHOOL_ADMIN), perms,
                                // School visibility only (Tenant Admin manages the school record)
                                "SCHOOL_READ",

                                // User Management (Manage-down: Teachers only)
                                "USER_CREATE", "USER_READ", "USER_UPDATE", "USER_DEACTIVATE",

                                // Role Management (Can only ASSIGN existing roles, cannot create new ones)
                                "ROLE_READ", "ROLE_ASSIGN",

                                // Code Set Management (Manages school-specific configurations)
                                "CODESET_CREATE", "CODESET_READ", "CODESET_UPDATE", "CODESET_DEACTIVATE",

                                // Learner & Class Management
                                "LEARNER_CREATE", "LEARNER_READ", "LEARNER_UPDATE", "LEARNER_DEACTIVATE",
                                "CLASS_CREATE", "CLASS_READ", "CLASS_UPDATE", "CLASS_DEACTIVATE",
                                "ENROLLMENT_CREATE", "ENROLLMENT_READ", "ENROLLMENT_WITHDRAW",

                                // Attendance Management (Can correct/override records)
                                "ATTENDANCE_CREATE", "ATTENDANCE_READ", "ATTENDANCE_UPDATE",

                                // Sync & Device Management
                                "SYNC_UPLOAD", "SYNC_CONFLICT_READ", "SYNC_CONFLICT_RESOLVE",
                                "DEVICE_REGISTER", "DEVICE_READ",

                                // Reporting
                                "REPORT_SCHOOL_SUMMARY"
                        ),

                        // ══════════════════════════════════════════════════════════════
                        // 4. HEAD_TEACHER
                        // Manages learners and attendance for their assigned classes.
                        // ══════════════════════════════════════════════════════════════
                        mapTo(roles.get(SystemRoleSeeder.HEAD_TEACHER), perms,
                                // CRITICAL: Must read code sets to load attendance dropdowns
                                "CODESET_READ",

                                // Learner Management
                                "LEARNER_CREATE", "LEARNER_READ", "LEARNER_UPDATE", "LEARNER_DEACTIVATE",

                                // Class Visibility (Cannot create/update classes)
                                "CLASS_READ",

                                // Enrollment Management
                                "ENROLLMENT_CREATE", "ENROLLMENT_READ", "ENROLLMENT_WITHDRAW",

                                // Attendance Management
                                "ATTENDANCE_CREATE", "ATTENDANCE_READ", "ATTENDANCE_UPDATE",

                                // Sync Management
                                "SYNC_UPLOAD", "SYNC_CONFLICT_READ", "SYNC_CONFLICT_RESOLVE",

                                // Reporting
                                "REPORT_SCHOOL_SUMMARY"
                        ),

                        // ══════════════════════════════════════════════════════════════
                        // 5. TEACHER
                        // Captures attendance for their own classes. Read-only for everything else.
                        // ══════════════════════════════════════════════════════════════
                        mapTo(roles.get(SystemRoleSeeder.TEACHER), perms,
                                // CRITICAL: Must read code sets to load attendance dropdowns
                                "CODESET_READ",

                                // CRITICAL: Must read learners to see names when marking attendance
                                "LEARNER_READ",

                                // Class & Enrollment Visibility
                                "CLASS_READ",
                                "ENROLLMENT_READ",

                                // Attendance Capture (OWN scope enforced by service layer)
                                "ATTENDANCE_CREATE", "ATTENDANCE_READ", "ATTENDANCE_UPDATE",

                                // Offline Sync
                                "SYNC_UPLOAD"
                        )
                ).flatMap(List::stream)
                .collect(Collectors.toList());
    }

    private List<RolePermission> mapAll(Role role, Map<String, Permission> perms) {
        return perms.values().stream()
                .map(p -> RolePermission.builder()
                        .roleId(role.getId())
                        .permissionId(p.getId())
                        .build())
                .collect(Collectors.toList());
    }

    private List<RolePermission> mapTo(Role role, Map<String, Permission> perms, String... codes) {
        return Set.of(codes).stream()
                .map(code -> {
                    Permission p = perms.get(code);
                    if (p == null) {
                        throw new IllegalStateException("Permission not found in catalog: " + code);
                    }
                    return RolePermission.builder()
                            .roleId(role.getId())
                            .permissionId(p.getId())
                            .build();
                })
                .collect(Collectors.toList());
    }
}