package com.school.attendance.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CreateUserRequest(
        @NotBlank(message = "Username is required") String username,
        @NotBlank(message = "Password is required") String password,
        @NotBlank(message = "Full name is required") String fullName,
        @NotNull(message = "Role ID is required") UUID roleId,
         @NotNull(message = "Tenant ID is required") UUID tenantId,
        // If null/empty, the user is purely tenant-scoped (e.g., a Tenant Admin).
        List<UUID> schoolIds
) {}