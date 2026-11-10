package com.school.attendance.keycloak;

import lombok.Getter;
import lombok.Setter;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "keycloak")
public class KeycloakAdminConfig {

    private String realm;
    private String authServerUrl;
    private Admin admin;

    @Getter
    @Setter
    public static class Admin {
        private String username;
        private String password;
        private String realm;
    }

    @Bean
    public Keycloak keycloakAdminClient() {
        return KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
                .realm(admin.getRealm())
                .username(admin.getUsername())
                .password(admin.getPassword())
                .clientId("admin-cli")
                .build();
    }
}
