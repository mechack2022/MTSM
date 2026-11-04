package com.school.attendance.keycloak;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakUserService {

    private final Keycloak keycloak;
    private final KeycloakAdminConfig config;

    public String createUser(String email, String firstName, String lastName, String password, String role) {
        RealmResource realmResource = keycloak.realm(config.getRealm());

        UserRepresentation user = new UserRepresentation();
        user.setUsername(email);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEnabled(true);
        user.setEmailVerified(true);

        Response response = realmResource.users().create(user);

        if (response.getStatus() != 201) {
            throw new RuntimeException("Failed to create user: " + response.getStatusInfo());
        }

        String userId = extractUserIdFromResponse(response);

        setUserPassword(userId, password, false);

        assignRoleToUser(userId, role);

        log.info("Created Keycloak user: {} with role: {}", email, role);
        return userId;
    }

    public String createUserWithTenantAndSchool(String email, String firstName, String lastName,
                                                 String password, String role, UUID tenantId, UUID schoolId) {
        String userId = createUser(email, firstName, lastName, password, role);

        setUserAttributes(userId, Map.of(
            "tenant_id", List.of(tenantId.toString()),
            "school_id", List.of(schoolId.toString())
        ));

        return userId;
    }

    public void updateUserTenantAndSchool(String userId, UUID tenantId, List<UUID> schoolIds) {
        setUserAttributes(userId, Map.of(
            "tenant_id", List.of(tenantId.toString()),
            "school_ids", schoolIds.stream().map(UUID::toString).toList()
        ));
    }

    public void assignRoleToUser(String userId, String roleName) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        UserResource userResource = realmResource.users().get(userId);

        var role = realmResource.roles().get(roleName).toRepresentation();
        userResource.roles().realmLevel().add(List.of(role));
    }

    public void removeRoleFromUser(String userId, String roleName) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        UserResource userResource = realmResource.users().get(userId);

        var role = realmResource.roles().get(roleName).toRepresentation();
        userResource.roles().realmLevel().remove(List.of(role));
    }

    public void setUserPassword(String userId, String password, boolean temporary) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        UserResource userResource = realmResource.users().get(userId);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(temporary);

        userResource.resetPassword(credential);
    }

    public void setUserAttributes(String userId, Map<String, List<String>> attributes) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        UserResource userResource = realmResource.users().get(userId);

        UserRepresentation user = userResource.toRepresentation();
        user.setAttributes(attributes);
        userResource.update(user);
    }

    public Optional<UserRepresentation> getUserByEmail(String email) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        List<UserRepresentation> users = realmResource.users().searchByEmail(email, true);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public void deleteUser(String userId) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        realmResource.users().get(userId).remove();
        log.info("Deleted Keycloak user: {}", userId);
    }

    public void enableUser(String userId) {
        updateUserStatus(userId, true);
    }

    public void disableUser(String userId) {
        updateUserStatus(userId, false);
    }

    private void updateUserStatus(String userId, boolean enabled) {
        RealmResource realmResource = keycloak.realm(config.getRealm());
        UserResource userResource = realmResource.users().get(userId);

        UserRepresentation user = userResource.toRepresentation();
        user.setEnabled(enabled);
        userResource.update(user);
    }

    private String extractUserIdFromResponse(Response response) {
        String location = response.getHeaderString("Location");
        return location.substring(location.lastIndexOf('/') + 1);
    }
}
