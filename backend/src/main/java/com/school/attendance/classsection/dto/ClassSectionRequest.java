package com.school.attendance.classsection.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record ClassSectionRequest(

        @NotBlank(message = "Class name is required")
        @Size(max = 100)
        String name,

        @NotNull(message = "Grade level is required")
        UUID gradeLevelId,

        @NotNull(message = "Academic year is required")
        UUID academicYearId,

        UUID classTeacherId,

        @Positive(message = "Capacity must be positive")
        Integer capacity
) {}