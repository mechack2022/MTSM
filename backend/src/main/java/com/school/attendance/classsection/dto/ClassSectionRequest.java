package com.school.attendance.classsection.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record ClassSectionRequest(
        @NotBlank(message = "Class name is required")
        @Size(max = 100)
        String name,

        @NotBlank(message = "Grade level is required")
        @Size(max = 20)
        String gradeLevel,

        @NotBlank(message = "Academic year is required")
        @Size(max = 20)
        String academicYear,

        UUID classTeacherId,

        @Positive(message = "Capacity must be positive")
        Integer capacity
) {}