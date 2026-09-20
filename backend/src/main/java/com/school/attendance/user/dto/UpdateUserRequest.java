package com.school.attendance.user.dto;


import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record UpdateUserRequest(
        @Size(max = 255)
        String fullName,
        UUID roleId,
        List<UUID> schoolIds,
        @Size(min = 6)
        String newPassword
) {}