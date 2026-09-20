package com.school.attendance.tenant.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateTenantRequest(
        @NotBlank(message = "Tenant name is required")
        @Size(max = 255)
        String name,

        @Email(message = "Invalid email format")
        @Size(max = 255)
        String contactEmail,

        @Size(max = 50)
        String contactPhone
) {}
