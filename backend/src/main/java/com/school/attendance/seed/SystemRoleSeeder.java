package com.school.attendance.seed;

import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.enums.AccessScope;
import com.school.attendance.rbac.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Order(2)
@RequiredArgsConstructor
@Slf4j
public class SystemRoleSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public static final String SUPER_ADMIN = "SUPER_ADMIN";
    public static final String TENANT_ADMIN = "TENANT_ADMIN";
    public static final String SCHOOL_ADMIN = "SCHOOL_ADMIN";
    public static final String HEAD_TEACHER = "HEAD_TEACHER";
    public static final String TEACHER = "TEACHER";

    @Override
    @Transactional
    public void run(String... args) {
        if (roleRepository.count() > 0) {
            log.info("Roles already seeded ({} roles). Skipping.", roleRepository.count());
            return;
        }

        log.info("👥 Seeding system roles...");
        roleRepository.saveAll(buildSystemRoles());
        log.info("✅ System roles seeded successfully");
    }

    private List<Role> buildSystemRoles() {
        return List.of(
                Role.builder()
                        .code(SUPER_ADMIN)
                        .displayName("Super Administrator")
                        .description("Full system access — manages tenants and system configuration")
                        .accessScope(AccessScope.SYSTEM)
                        .isSystemRole(true)
                        .build(),

                Role.builder()
                        .code(TENANT_ADMIN)
                        .displayName("Tenant Administrator")
                        .description("Manages schools and tenant-level configuration within their organization")
                        .accessScope(AccessScope.TENANT)
                        .isSystemRole(true)
                        .build(),

                Role.builder()
                        .code(SCHOOL_ADMIN)
                        .displayName("School Administrator")
                        .description("Manages their school's profile, users, and class structure")
                        .accessScope(AccessScope.ASSIGNED_SCHOOLS)
                        .isSystemRole(true)
                        .build(),

                Role.builder()
                        .code(HEAD_TEACHER)
                        .displayName("Head Teacher")
                        .description("Views attendance summaries, manages learners, reviews sync conflicts")
                        .accessScope(AccessScope.ASSIGNED_SCHOOLS)
                        .isSystemRole(true)
                        .build(),

                Role.builder()
                        .code(TEACHER)
                        .displayName("Class Teacher")
                        .description("Records attendance for their assigned class; views class roster")
                        .accessScope(AccessScope.ASSIGNED_SCHOOLS)
                        .isSystemRole(true)
                        .build()
        );
    }
}