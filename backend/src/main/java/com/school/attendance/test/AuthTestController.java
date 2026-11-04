package com.school.attendance.test;

import com.school.attendance.security.TenantContext;
import com.school.attendance.security.permission.Permission;
import com.school.attendance.security.permission.PermissionEvaluator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class AuthTestController {

    private final TenantContext tenantContext;
    private final PermissionEvaluator permissionEvaluator;

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of("message", "This is a public endpoint - no authentication required");
    }

    @GetMapping("/authenticated")
    public Map<String, Object> authenticatedEndpoint() {
        return Map.of(
            "message", "You are authenticated!",
            "userId", tenantContext.getCurrentUserId().orElse("N/A"),
            "username", tenantContext.getCurrentUsername().orElse("N/A"),
            "email", tenantContext.getCurrentUserEmail().orElse("N/A"),
            "tenantId", tenantContext.getCurrentTenantId().map(Object::toString).orElse("N/A"),
            "schoolId", tenantContext.getCurrentSchoolId().map(Object::toString).orElse("N/A"),
            "isPlatformAdmin", tenantContext.isPlatformAdmin(),
            "isTenantAdmin", tenantContext.isTenantAdmin(),
            "isSchoolAdmin", tenantContext.isSchoolAdmin()
        );
    }

    @GetMapping("/permissions")
    public Map<String, Object> checkPermissions() {
        return Map.of(
            "canCreateTenant", permissionEvaluator.hasPermission(Permission.TENANT_CREATE),
            "canCreateSchool", permissionEvaluator.hasPermission(Permission.SCHOOL_CREATE),
            "canCreateUser", permissionEvaluator.hasPermission(Permission.USER_CREATE),
            "canCreateLearner", permissionEvaluator.hasPermission(Permission.LEARNER_CREATE),
            "canMarkAttendance", permissionEvaluator.hasPermission(Permission.ATTENDANCE_CREATE),
            "allPermissions", permissionEvaluator.getUserPermissions()
        );
    }

    @GetMapping("/platform-admin-only")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public Map<String, String> platformAdminOnly() {
        return Map.of("message", "You are a platform admin!");
    }

    @GetMapping("/school-admin-only")
    @PreAuthorize("hasRole('SCHOOL_ADMIN')")
    public Map<String, String> schoolAdminOnly() {
        return Map.of("message", "You are a school admin!");
    }
}
