package com.school.attendance.security;

import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.repository.PermissionRepository;
import com.school.attendance.rbac.repository.RolePermissionRepository;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.entity.AppUserSchool;
import com.school.attendance.user.repository.AppUserRepository;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

//@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserRepository userRepository;
    private final AppUserSchoolRepository appUserSchoolRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final PermissionRepository permissionRepository;


    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (!appUser.getIsActive()) {
            throw new UsernameNotFoundException("User account is deactivated: " + username);
        }

        Set<UUID> assignedSchoolIds = resolveAssignedSchools(appUser.getId());

        Set<String> permissions = resolvePermissions(appUser.getRoleId());

        return new CustomUserDetails(
                appUser.getId(),
                appUser.getTenantId(),
                assignedSchoolIds,
                appUser.getRoleId(),
                appUser.getUsername(),
                appUser.getPasswordHash(),
                appUser.getIsActive(),
                permissions
        );
    }

    private Set<UUID> resolveAssignedSchools(UUID userId) {
        List<AppUserSchool> assignments = appUserSchoolRepository.findByAppUserId(userId);
        if (assignments.isEmpty()) {
            return Set.of();
        }
        return assignments.stream()
                .map(AppUserSchool::getSchoolId)
                .collect(Collectors.toUnmodifiableSet());
    }

    private Set<String> resolvePermissions(UUID roleId) {
        if (roleId == null) return Set.of();

        List<UUID> permissionIds = rolePermissionRepository.findPermissionIdsByRoleIds(List.of(roleId));
        if (permissionIds.isEmpty()) return Set.of();

        return permissionRepository.findAllById(permissionIds).stream()
                .map(Permission::getCode)
                .collect(Collectors.toUnmodifiableSet());
    }
}