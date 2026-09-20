package com.school.attendance.common.config;

import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.repository.RoleRepository;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.entity.AppUserSchool;
import com.school.attendance.user.entity.PlatformAdmin;
import com.school.attendance.user.repository.AppUserRepository;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import com.school.attendance.user.repository.PlatformAdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
@Order(10)
public class DataSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final AppUserSchoolRepository appUserSchoolRepository;
    private final SchoolRepository schoolRepository;
    private final TenantRepository tenantRepository;
    private final RoleRepository roleRepository;
    private final PlatformAdminRepository platformAdminRepository; // ✅ NEW
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.enabled:false}")
    private boolean isSeedingEnabled;

    @Value("${app.seed.admin-password:Admin@123}")
    private String defaultAdminPassword;

    @Override
    public void run(String... args) {
        if (!isSeedingEnabled) {
            log.info("🚫 Database seeding is disabled via configuration.");
            return;
        }

        log.info("🌱 Starting multi-tenant database seeding...");

        // 1. Seed the platform admin (SUPER_ADMIN — above all tenants)
        seedPlatformAdmin();

        // 2. Seed a tenant + school + tenant admin for testing
        Tenant tenant = seedDefaultTenant();
        School school = seedDefaultSchool(tenant.getId());
        seedTenantAdmin(tenant.getId(), school.getId());

        log.info("✅ Database seeding completed successfully.");
    }

    // ─── Platform Admin (above all tenants) ────────────────────────
    private void seedPlatformAdmin() {
        String username = "superadmin";
        if (platformAdminRepository.existsByUsername(username)) {
            log.info("ℹ️ Platform admin '{}' already exists, skipping.", username);
            return;
        }

        PlatformAdmin admin = PlatformAdmin.builder()
                .username(username)
                .passwordHash(passwordEncoder.encode(defaultAdminPassword))
                .fullName("Platform Super Administrator")
                .isActive(true)
                .build();

        platformAdminRepository.save(admin);
        log.info("🔐 PLATFORM ADMIN SEEDED");
        log.info("   👤 Username: {}", username);
        log.info("   🔑 Password: {}", defaultAdminPassword);
        log.info("   🌐 Scope: SYSTEM (above all tenants)");
    }

    // ─── Tenant + School ───────────────────────────────────────────
    private Tenant seedDefaultTenant() {
        String tenantCode = "PILOT1";
        return tenantRepository.findByCode(tenantCode).orElseGet(() -> {
            Tenant t = Tenant.builder()
                    .name("Pilot Education Organization")
                    .code(tenantCode)
                    .contactEmail("admin@pilot-edu.org")
                    .isActive(true)
                    .build();
            Tenant saved = tenantRepository.save(t);
            log.info("✅ Seeded tenant: {}", tenantCode);
            return saved;
        });
    }

    private School seedDefaultSchool(UUID tenantId) {
        String schoolCode = "PILOT";
        return schoolRepository.findByCode(schoolCode).orElseGet(() -> {
            School s = School.builder()
                    .tenantId(tenantId)
                    .name("Pilot High School")
                    .code(schoolCode)
                    .address("123 Education Lane, Pilot City")
                    .build();
            School saved = schoolRepository.save(s);
            log.info("✅ Seeded school: {} under tenant", schoolCode);
            return saved;
        });
    }

    // ─── Tenant Admin (a regular app_user with TENANT_ADMIN role) ───
    private void seedTenantAdmin(UUID tenantId, UUID schoolId) {
        String username = "admin";
        if (userRepository.existsByUsername(username)) {
            log.info("ℹ️ Tenant admin '{}' already exists, skipping.", username);
            return;
        }

        Role tenantAdminRole = roleRepository.findByCode("TENANT_ADMIN")
                .orElseThrow(() -> new RuntimeException("TENANT_ADMIN role not found."));

        AppUser admin = AppUser.builder()
                .tenantId(tenantId)
                .username(username)
                .passwordHash(passwordEncoder.encode(defaultAdminPassword))
                .fullName("Tenant Administrator")
                .roleId(tenantAdminRole.getId())
                .isActive(true)
                .build();

        AppUser saved = userRepository.save(admin);

        // Assign to the school via join table (tenant admins typically see all schools
        // in their tenant, but we seed one explicit assignment for testing)
        AppUserSchool assignment = AppUserSchool.builder()
                .appUserId(saved.getId())
                .schoolId(schoolId)
                .assignedBy(saved.getId())
                .build();
        appUserSchoolRepository.save(assignment);

        log.info("🔐 TENANT ADMIN SEEDED");
        log.info("   👤 Username: {}", username);
        log.info("   🔑 Password: {}", defaultAdminPassword);
        log.info("   🏢 Tenant: {}", tenantId);
    }
}