package com.school.attendance.school.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record UpdateSchoolRequest(
        @Size(max = 255, message = "School name must be 255 characters or less")
        String name,

        UUID academicYearId,
        UUID currentTermId,

        @Size(max = 500)
        String address,

        @Size(max = 50)
        String phone,

        @Email(message = "Invalid email format")
        @Size(max = 255)
        String email,

        @Size(max = 500)
        String logoUrl
) {}