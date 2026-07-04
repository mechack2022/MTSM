package com.school.attendance.common.util;

import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.enums.UserRole;

import java.util.function.Predicate;

public final class UserPredicates {

    private UserPredicates() {}

    // A functional rule: Is the user active?
    public static Predicate<AppUser> isActive() {
        return AppUser::getIsActive;
    }

    // A functional rule: Does the user have a specific role?
    public static Predicate<AppUser> hasRole(UserRole role) {
        return user -> user.getRole() == role;
    }

    // Composing rules: Is the user an active Admin?
    public static Predicate<AppUser> isActiveAdmin() {
        return isActive().and(hasRole(UserRole.ADMIN));
    }
}
