package com.school.attendance.school.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SchoolRequest(
        @NotBlank(message = "School name is required")
        @Size(max = 255)
        String name,

        @NotBlank(message = "School code is required")
        @Size(max = 50)
        String code,

        @Size(max = 500)
        String address,

        @Size(max = 20)
        String academicYear,

        @Size(max = 50)
        String currentTerm,

        @Size(max = 50)
        String phone,

        @Email(message = "Invalid email format")
        @Size(max = 255)
        String email,

        @Size(max = 500)
        String logoUrl
) {}
