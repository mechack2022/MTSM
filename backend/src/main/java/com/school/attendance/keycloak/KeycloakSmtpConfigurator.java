package com.school.attendance.keycloak;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.RealmRepresentation;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Configures Keycloak SMTP settings for email functionality.
 * Sets up MailHog as the SMTP server for development.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class KeycloakSmtpConfigurator {

    private final Keycloak keycloak;
    private final KeycloakAdminConfig config;

    @PostConstruct
    public void configureSmtp() {
        try {
            log.info("📧 Configuring Keycloak SMTP settings...");

            RealmResource realmResource = keycloak.realm(config.getRealm());
            RealmRepresentation realm = realmResource.toRepresentation();

            // Check if SMTP is already configured
            Map<String, String> existingSmtp = realm.getSmtpServer();
            if (existingSmtp != null && !existingSmtp.isEmpty()) {
                log.info("ℹ️  SMTP already configured. Host: {}, Port: {}",
                    existingSmtp.get("host"), existingSmtp.get("port"));
                return;
            }

            // Configure SMTP settings for MailHog
            Map<String, String> smtpConfig = new HashMap<>();
            smtpConfig.put("host", "mailhog");
            smtpConfig.put("port", "1025");
            smtpConfig.put("from", "noreply@mtsms.local");
            smtpConfig.put("fromDisplayName", "MTSMS - School Management System");
            smtpConfig.put("replyTo", "");
            smtpConfig.put("replyToDisplayName", "");
            smtpConfig.put("envelopeFrom", "");
            smtpConfig.put("ssl", "false");
            smtpConfig.put("starttls", "false");
            smtpConfig.put("auth", "false");

            realm.setSmtpServer(smtpConfig);
            realmResource.update(realm);

            log.info("✅ Keycloak SMTP configured successfully for MailHog (mailhog:1025)");
        } catch (Exception e) {
            log.warn("⚠️  Failed to configure Keycloak SMTP: {}. " +
                    "You may need to configure SMTP manually in Keycloak Admin Console.", e.getMessage());
            log.debug("Full error:", e);
        }
    }
}
