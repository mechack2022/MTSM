package com.school.attendance.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class TenantContext {

    public Optional<String> getCurrentUserId() {
        return getJwt().map(jwt -> jwt.getClaim("sub"));
    }

    public Optional<String> getCurrentUsername() {
        return getJwt().map(jwt -> {
            String preferred = jwt.getClaim("preferred_username");
            return preferred != null ? preferred : jwt.getSubject();
        });
    }

    public Optional<String> getCurrentUserEmail() {
        return getJwt().map(jwt -> jwt.getClaim("email"));
    }

    public Optional<UUID> getCurrentTenantId() {
        return getJwt().map(jwt -> {
            String tenantId = jwt.getClaim("tenant_id");
            return tenantId != null ? UUID.fromString(tenantId) : null;
        });
    }

    public Optional<UUID> getCurrentSchoolId() {
        return getJwt().map(jwt -> {
            String schoolId = jwt.getClaim("school_id");
            return schoolId != null ? UUID.fromString(schoolId) : null;
        });
    }

    public List<UUID> getCurrentSchoolIds() {
        return getJwt().map(jwt -> {
            List<String> schoolIds = jwt.getClaim("school_ids");
            return schoolIds != null
                ? schoolIds.stream().map(UUID::fromString).toList()
                : getCurrentSchoolId().map(List::of).orElse(List.of());
        }).orElse(List.of());
    }

    public boolean hasRole(String role) {
        return getAuthentication()
                .map(auth -> auth.getAuthorities().stream()
                        .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role.toUpperCase())))
                .orElse(false);
    }

    public boolean isPlatformAdmin() {
        return hasRole("PLATFORM_ADMIN");
    }

    public boolean isTenantAdmin() {
        return hasRole("TENANT_ADMIN");
    }

    public boolean isSchoolAdmin() {
        return hasRole("SCHOOL_ADMIN");
    }

    public Optional<Authentication> getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Optional.ofNullable(authentication)
                .filter(Authentication::isAuthenticated)
                .filter(auth -> !"anonymousUser".equals(auth.getPrincipal()));
    }

    private Optional<Jwt> getJwt() {
        return getAuthentication()
                .map(auth -> (Jwt) auth.getPrincipal());
    }
}
