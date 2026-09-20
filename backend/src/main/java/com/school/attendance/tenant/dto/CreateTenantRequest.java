package com.school.attendance.tenant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateTenantRequest(
        @NotBlank(message = "Tenant name is required")
        @Size(max = 255, message = "Tenant name must be 255 characters or less")
        String name,

        @Email(message = "Invalid email format")
        @Size(max = 255, message = "Email must be 255 characters or less")
        String contactEmail,

        @Size(max = 50, message = "Phone must be 50 characters or less")
        String contactPhone
) {}
