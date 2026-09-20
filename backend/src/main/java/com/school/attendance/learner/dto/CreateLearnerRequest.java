package com.school.attendance.learner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record CreateLearnerRequest(
        @NotBlank(message = "First name is required")
        @Size(max = 100, message = "First name must be 100 characters or less")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100, message = "Last name must be 100 characters or less")
        String lastName,

        @Size(max = 50, message = "Learner number must be 50 characters or less")
        String learnerNumber,

        @NotNull(message = "Grade level is required")
        UUID gradeLevelId,

        LocalDate dateOfBirth,

        @Size(max = 10, message = "Sex must be 10 characters or less")
        String sex,

        @Size(max = 255, message = "Previous school name must be 255 characters or less")
        String previousSchoolName
) {}
