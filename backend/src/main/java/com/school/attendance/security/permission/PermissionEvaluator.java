package com.school.attendance.security.permission;

import com.school.attendance.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PermissionEvaluator {

    private final TenantContext tenantContext;

    public boolean hasPermission(Permission permission) {
        return getUserPermissions().contains(permission);
    }

    public boolean hasPermission(Permission permission, UUID tenantId) {
        if (!hasPermission(permission)) {
            return false;
        }

        if (tenantContext.isPlatformAdmin()) {
            return true;
        }

        return tenantContext.getCurrentTenantId()
                .map(currentTenantId -> currentTenantId.equals(tenantId))
                .orElse(false);
    }

    public boolean hasPermission(Permission permission, UUID tenantId, UUID schoolId) {
        if (!hasPermission(permission, tenantId)) {
            return false;
        }

        if (tenantContext.isPlatformAdmin() || tenantContext.isTenantAdmin()) {
            return true;
        }

        return tenantContext.getCurrentSchoolIds().contains(schoolId);
    }

    public boolean canAccessTenant(UUID tenantId) {
        if (tenantContext.isPlatformAdmin()) {
            return true;
        }

        return tenantContext.getCurrentTenantId()
                .map(currentTenantId -> currentTenantId.equals(tenantId))
                .orElse(false);
    }

    public boolean canAccessSchool(UUID schoolId) {
        if (tenantContext.isPlatformAdmin() || tenantContext.isTenantAdmin()) {
            return true;
        }

        return tenantContext.getCurrentSchoolIds().contains(schoolId);
    }

    public Set<Permission> getUserPermissions() {
        return tenantContext.getAuthentication()
                .map(auth -> auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .filter(role -> role.startsWith("ROLE_"))
                        .map(role -> role.substring(5))
                        .flatMap(role -> RolePermissionMapper.getPermissions(role).stream())
                        .collect(Collectors.toSet()))
                .orElse(Set.of());
    }
}
