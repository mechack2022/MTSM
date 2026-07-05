package com.school.attendance.user.dto;

import com.school.attendance.user.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateUserRequest(
        @NotBlank(message = "Username is required") String username,
        @NotBlank(message = "Password is required") String password,
        @NotBlank(message = "Full name is required") String fullName,
        @NotNull(message = "Role is required") UserRole role
) {}