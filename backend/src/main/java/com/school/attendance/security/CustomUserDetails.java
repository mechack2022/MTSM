package com.school.attendance.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
public class CustomUserDetails extends User {

    private final UUID userId;
    private final UUID tenantId;
    private final Set<UUID> assignedSchoolIds;
    private final UUID roleId;
    private final Set<String> permissions;
    private final boolean platformAdmin;

    //  Constructor for regular tenant-facing users
    public CustomUserDetails(UUID userId,
                             UUID tenantId,
                             Set<UUID> assignedSchoolIds,
                             UUID roleId,
                             String username,
                             String password,
                             boolean enabled,
                             Set<String> permissions) {
        super(username, password, enabled, true, true, true, buildAuthorities(permissions));
        this.userId = userId;
        this.tenantId = tenantId;
        this.assignedSchoolIds = assignedSchoolIds == null ? Set.of() : Set.copyOf(assignedSchoolIds);
        this.roleId = roleId;
        this.permissions = permissions == null ? Set.of() : Set.copyOf(permissions);
        this.platformAdmin = false;
    }

    public static CustomUserDetails forPlatformAdmin(UUID userId,
                                                     String username,
                                                     String password,
                                                     boolean enabled,
                                                     Set<String> permissions) {
        return new CustomUserDetails(
                userId, null, Set.of(), null,
                username, password, enabled, permissions, true
        );
    }

    private CustomUserDetails(UUID userId,
                              UUID tenantId,
                              Set<UUID> assignedSchoolIds,
                              UUID roleId,
                              String username,
                              String password,
                              boolean enabled,
                              Set<String> permissions,
                              boolean platformAdmin) {
        super(username, password, enabled, true, true, true, buildAuthorities(permissions));
        this.userId = userId;
        this.tenantId = tenantId;
        this.assignedSchoolIds = assignedSchoolIds == null ? Set.of() : Set.copyOf(assignedSchoolIds);
        this.roleId = roleId;
        this.permissions = permissions == null ? Set.of() : Set.copyOf(permissions);
        this.platformAdmin = platformAdmin;
    }

    private static Collection<? extends GrantedAuthority> buildAuthorities(Set<String> permissions) {
        if (permissions == null || permissions.isEmpty()) return Set.of();
        return permissions.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toUnmodifiableSet());
    }

    public boolean isSchoolScoped() {
        return !platformAdmin && !assignedSchoolIds.isEmpty();
    }

    public boolean isTenantScoped() {
        return !platformAdmin && assignedSchoolIds.isEmpty();
    }

    public boolean isPlatformAdmin() {
        return platformAdmin;
    }


    public boolean hasPermission(String permissionCode) {
        return platformAdmin || permissions.contains(permissionCode);
    }

    public boolean hasAllPermissions(String... codes) {
        if (platformAdmin) return true;
        for (String c : codes) {
            if (!permissions.contains(c)) return false;
        }
        return true;
    }

    public boolean hasAnyPermission(String... codes) {
        if (platformAdmin) return true;
        for (String c : codes) {
            if (permissions.contains(c)) return true;
        }
        return false;
    }

    public boolean hasAccessToSchool(UUID schoolId) {
        if (platformAdmin) return true;
        if (schoolId == null) return false;
        if (isTenantScoped()) return true;
        return assignedSchoolIds.contains(schoolId);
    }


}