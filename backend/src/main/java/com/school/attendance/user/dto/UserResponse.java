package com.school.attendance.user.dto;


import com.school.attendance.user.enums.UserRole;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record UserResponse(
        UUID id,
        UUID tenantId,
        String username,
        String fullName,
        UUID roleId,
        String roleCode,
        String roleDisplayName,
        List<UUID> assignedSchoolIds,
        Boolean isActive,
        Instant createdAt,
        Instant updatedAt
) {}
