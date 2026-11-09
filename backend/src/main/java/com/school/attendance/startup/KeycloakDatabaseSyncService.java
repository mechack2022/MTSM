package com.school.attendance.startup;

import com.school.attendance.keycloak.KeycloakUserService;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Startup service to sync Keycloak users with the application database.
 *
 * This service addresses the critical issue where Keycloak maintains its own
 * persistent database while the application database was configured with
 * create-drop, causing users to exist in Keycloak but not in the application.
 *
 * This service runs on application startup and:
 * 1. Identifies orphaned Keycloak users (users that don't have corresponding tenant records)
 * 2. Removes these orphaned users from Keycloak
 * 3. Ensures database and Keycloak are in sync
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakDatabaseSyncService {

    private final KeycloakUserService keycloakUserService;
    private final TenantRepository tenantRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void syncKeycloakWithDatabase() {
        log.info("=".repeat(80));
        log.info("Starting Keycloak-Database synchronization check...");
        log.info("=".repeat(80));

        try {
            // Get all email addresses from tenants in database
            Set<String> validEmails = new HashSet<>(tenantRepository.findAllContactEmails());
            log.info("Found {} tenant contact emails in database", validEmails.size());

            // Get all users from Keycloak with tenant_admin role
            List<UserRepresentation> keycloakUsers = getAllTenantAdmins();
            log.info("Found {} users in Keycloak", keycloakUsers.size());

            int orphanedCount = 0;
            int syncedCount = 0;

            for (UserRepresentation keycloakUser : keycloakUsers) {
                String email = keycloakUser.getEmail();

                // Skip if email is null
                if (email == null || email.isBlank()) {
                    log.warn("Keycloak user {} has no email, skipping", keycloakUser.getId());
                    continue;
                }

                // Check if this email exists in our database
                if (!validEmails.contains(email)) {
                    // Orphaned user - exists in Keycloak but not in database
                    log.warn("Found orphaned Keycloak user: {} ({}). Deleting from Keycloak...",
                            email, keycloakUser.getId());

                    try {
                        keycloakUserService.deleteUser(keycloakUser.getId());
                        orphanedCount++;
                        log.info("Successfully deleted orphaned user: {}", email);
                    } catch (Exception e) {
                        log.error("Failed to delete orphaned user {}: {}", email, e.getMessage());
                    }
                } else {
                    syncedCount++;
                }
            }

            log.info("=".repeat(80));
            log.info("Keycloak-Database synchronization completed!");
            log.info("  - Users in sync: {}", syncedCount);
            log.info("  - Orphaned users cleaned up: {}", orphanedCount);
            log.info("  - Total tenants in database: {}", validEmails.size());
            log.info("=".repeat(80));

        } catch (Exception e) {
            log.error("Error during Keycloak-Database synchronization: {}", e.getMessage(), e);
            log.warn("Continuing with application startup despite sync errors");
        }
    }

    /**
     * Get all Keycloak users - in a real system, you'd filter by tenant_admin role
     * For now, we'll get all users and filter those with tenant_id attribute
     */
    private List<UserRepresentation> getAllTenantAdmins() {
        try {
            var realmResource = keycloakUserService.getKeycloak().realm(keycloakUserService.getConfig().getRealm());

            // Get all users (you might want to add pagination for large user bases)
            List<UserRepresentation> allUsers = realmResource.users().list();

            // Filter users that have tenant_id attribute (these are tenant admins)
            return allUsers.stream()
                    .filter(user -> user.getAttributes() != null &&
                                  user.getAttributes().containsKey("tenant_id"))
                    .toList();
        } catch (Exception e) {
            log.error("Failed to fetch users from Keycloak: {}", e.getMessage());
            return List.of();
        }
    }
}
