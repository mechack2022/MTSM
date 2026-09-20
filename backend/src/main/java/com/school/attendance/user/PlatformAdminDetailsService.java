package com.school.attendance.user;


import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.repository.PermissionRepository;
import com.school.attendance.security.CustomUserDetails;
import com.school.attendance.user.entity.PlatformAdmin;
import com.school.attendance.user.repository.PlatformAdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

//@Service
@RequiredArgsConstructor
public class PlatformAdminDetailsService implements UserDetailsService {

    private final PlatformAdminRepository platformAdminRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        PlatformAdmin admin = platformAdminRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Platform admin not found: " + username));

        if (!admin.getIsActive()) {
            throw new UsernameNotFoundException("Platform admin account is deactivated: " + username);
        }

        // ✅ Fetch ALL permission codes from the catalog and grant them to the platform admin
        Set<String> allPermissions = permissionRepository.findAll().stream()
                .map(Permission::getCode)
                .collect(Collectors.toSet());

        return CustomUserDetails.forPlatformAdmin(
                admin.getId(),
                admin.getUsername(),
                admin.getPasswordHash(),
                admin.getIsActive(),
                allPermissions
        );
    }
}