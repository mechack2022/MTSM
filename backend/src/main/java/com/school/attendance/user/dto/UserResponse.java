package com.school.attendance.user.dto;


import com.school.attendance.user.enums.UserRole;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String username,
        String fullName,
        UserRole role,
        Boolean isActive
) {}
