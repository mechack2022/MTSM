package com.school.attendance.common.util;

import com.school.attendance.user.entity.AppUser;
import java.util.UUID;
import java.util.function.Predicate;

public class UserPredicates {

    public static Predicate<AppUser> hasRoleId(UUID roleId) {
        return user -> user.getRoleId() != null && user.getRoleId().equals(roleId);
    }

    public static Predicate<AppUser> isActive() {
        return user -> Boolean.TRUE.equals(user.getIsActive());
    }

    public static Predicate<AppUser> belongsToTenant(UUID tenantId) {
        return user -> tenantId != null && tenantId.equals(user.getTenantId());
    }

}