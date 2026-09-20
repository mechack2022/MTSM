package com.school.attendance.learner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateLearnerRequest(
        @NotBlank(message = "First name is required")
        @Size(max = 100)
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100)
        String lastName,

        @NotNull(message = "Grade level is required")
        UUID gradeLevelId,

        LocalDate dateOfBirth,

        @Size(max = 10)
        String sex,

        @Size(max = 255)
        String previousSchoolName
) {}