package com.school.attendance.keycloak;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.ClientResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.ProtocolMapperRepresentation;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Initializes Keycloak configuration on application startup.
 * Creates protocol mappers to include tenant_id and school_id in JWT tokens.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class KeycloakInitializer {

    private final Keycloak keycloak;
    private final KeycloakAdminConfig config;

    @PostConstruct
    public void init() {
        try {
            log.info("🔧 Initializing Keycloak protocol mappers...");
            createUserAttributeMappers();
            log.info("✅ Keycloak initialization completed successfully");
        } catch (Exception e) {
            log.warn("⚠️  Failed to initialize Keycloak protocol mappers: {}. " +
                    "You may need to configure them manually in Keycloak Admin Console.", e.getMessage());
            log.debug("Full error:", e);
        }
    }

    private void createUserAttributeMappers() {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        List<ClientRepresentation> clients = realmResource.clients().findAll();

        for (ClientRepresentation client : clients) {
            // Find the frontend client (mtsms-frontend or similar)
            if (client.getClientId() != null &&
                (client.getClientId().equals("mtsms-frontend") ||
                 client.getClientId().contains("frontend") ||
                 client.getClientId().contains("attendance"))) {

                log.info("📝 Configuring protocol mappers for client: {}", client.getClientId());
                ClientResource clientResource = realmResource.clients().get(client.getId());

                // Get existing mappers
                List<ProtocolMapperRepresentation> existingMappers = clientResource.getProtocolMappers().getMappers();

                boolean hasTenantIdMapper = existingMappers.stream()
                        .anyMatch(m -> "tenant_id".equals(m.getName()));
                boolean hasSchoolIdMapper = existingMappers.stream()
                        .anyMatch(m -> "school_id".equals(m.getName()));

                // Create tenant_id mapper if it doesn't exist
                if (!hasTenantIdMapper) {
                    ProtocolMapperRepresentation tenantIdMapper = createUserAttributeMapper(
                            "tenant_id",
                            "tenant_id",
                            "tenant_id",
                            "String"
                    );
                    clientResource.getProtocolMappers().createMapper(tenantIdMapper);
                    log.info("✅ Created tenant_id protocol mapper for client: {}", client.getClientId());
                } else {
                    log.debug("ℹ️  tenant_id mapper already exists for client: {}", client.getClientId());
                }

                // Create school_id mapper if it doesn't exist
                if (!hasSchoolIdMapper) {
                    ProtocolMapperRepresentation schoolIdMapper = createUserAttributeMapper(
                            "school_id",
                            "school_id",
                            "school_id",
                            "String"
                    );
                    clientResource.getProtocolMappers().createMapper(schoolIdMapper);
                    log.info("✅ Created school_id protocol mapper for client: {}", client.getClientId());
                } else {
                    log.debug("ℹ️  school_id mapper already exists for client: {}", client.getClientId());
                }
            }
        }
    }

    /**
     * Creates a protocol mapper that maps a user attribute to a JWT claim.
     *
     * @param name          The name of the mapper
     * @param userAttribute The user attribute to read from
     * @param claimName     The claim name in the JWT token
     * @param claimType     The JSON type of the claim (String, int, boolean, etc.)
     * @return ProtocolMapperRepresentation ready to be added to a client
     */
    private ProtocolMapperRepresentation createUserAttributeMapper(
            String name,
            String userAttribute,
            String claimName,
            String claimType) {

        ProtocolMapperRepresentation mapper = new ProtocolMapperRepresentation();
        mapper.setName(name);
        mapper.setProtocol("openid-connect");
        mapper.setProtocolMapper("oidc-usermodel-attribute-mapper");

        Map<String, String> config = new HashMap<>();
        config.put("user.attribute", userAttribute);
        config.put("claim.name", claimName);
        config.put("jsonType.label", claimType);
        config.put("id.token.claim", "true");
        config.put("access.token.claim", "true");
        config.put("userinfo.token.claim", "true");

        mapper.setConfig(config);
        return mapper;
    }
}
