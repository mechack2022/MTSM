package com.school.attendance.startup;

import com.school.attendance.keycloak.KeycloakUserService;
import com.school.attendance.user.entity.User;
import com.school.attendance.user.entity.UserRole;
import com.school.attendance.user.repository.UserRepository;
import com.school.attendance.user.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Bootstrap service to create the platform admin user on first startup.
 * This runs BEFORE KeycloakDatabaseSyncService to ensure the platform admin
 * exists in the database before Keycloak sync happens.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlatformAdminBootstrap {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final KeycloakUserService keycloakUserService;

    private static final String PLATFORM_ADMIN_EMAIL = "platform.admin@mtsms.local";
    private static final String PLATFORM_ADMIN_PASSWORD = "Admin@123456";
    private static final String PLATFORM_ADMIN_FIRST_NAME = "Platform";
    private static final String PLATFORM_ADMIN_LAST_NAME = "Administrator";

    @EventListener(ApplicationReadyEvent.class)
    @Order(1) // Run before KeycloakDatabaseSyncService
    public void createPlatformAdminIfNotExists() {
        log.info("=".repeat(80));
        log.info("Checking for platform administrator...");
        log.info("=".repeat(80));

        try {
            // Check if platform admin already exists in database
            if (userRepository.existsByEmail(PLATFORM_ADMIN_EMAIL)) {
                log.info("✅ Platform administrator already exists: {}", PLATFORM_ADMIN_EMAIL);
                log.info("=".repeat(80));
                return;
            }

            log.info("🔧 Creating platform administrator...");

            // Check if user exists in Keycloak
            var keycloakUser = keycloakUserService.getUserByEmail(PLATFORM_ADMIN_EMAIL);
            String keycloakUserId;

            if (keycloakUser.isPresent()) {
                // User exists in Keycloak, use existing ID
                keycloakUserId = keycloakUser.get().getId();
                log.info("Found existing Keycloak user: {}", PLATFORM_ADMIN_EMAIL);
            } else {
                // Create new user in Keycloak with platform_admin role, enabled by default
                keycloakUserId = keycloakUserService.createUser(
                        PLATFORM_ADMIN_EMAIL,
                        PLATFORM_ADMIN_FIRST_NAME,
                        PLATFORM_ADMIN_LAST_NAME,
                        PLATFORM_ADMIN_PASSWORD,
                        "platform_admin",
                        true // enabled
                );
                log.info("Created Keycloak platform admin: {}", keycloakUserId);
            }

            // Create User entity in database
            User platformAdmin = User.builder()
                    .email(PLATFORM_ADMIN_EMAIL)
                    .firstName(PLATFORM_ADMIN_FIRST_NAME)
                    .lastName(PLATFORM_ADMIN_LAST_NAME)
                    .phone(null)
                    .keycloakId(keycloakUserId)
                    .emailVerified(true) // Platform admin is pre-verified
                    .tenantId(null) // Platform admin has no tenant scope
                    .isPlatformAdmin(true)
                    .build();

            User savedUser = userRepository.save(platformAdmin);
            log.info("✅ Created platform admin user in database: {} ({})",
                    savedUser.getEmail(), savedUser.getId());

            // Create UserRole assignment for PLATFORM_ADMIN
            UserRole platformAdminRole = UserRole.builder()
                    .userId(savedUser.getId())
                    .role("PLATFORM_ADMIN")
                    .tenantId(null) // Global scope
                    .schoolId(null)
                    .isActive(true)
                    .assignedAt(LocalDateTime.now())
                    .assignedBy(savedUser.getId()) // Self-assigned
                    .build();

            userRoleRepository.save(platformAdminRole);
            log.info("✅ Assigned PLATFORM_ADMIN role to user: {}", savedUser.getEmail());

            log.info("=".repeat(80));
            log.info("✅ Platform administrator created successfully!");
            log.info("   Email: {}", PLATFORM_ADMIN_EMAIL);
            log.info("   Password: {}", PLATFORM_ADMIN_PASSWORD);
            log.info("=".repeat(80));

        } catch (Exception e) {
            log.error("❌ Failed to create platform administrator: {}", e.getMessage(), e);
            log.warn("Continuing with application startup despite bootstrap error");
        }
    }
}
