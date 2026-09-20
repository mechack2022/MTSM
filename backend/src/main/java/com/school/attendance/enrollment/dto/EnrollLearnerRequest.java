package com.school.attendance.enrollment.dto;
import com.school.attendance.enrollment.EnrollmentType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record EnrollLearnerRequest(
        @NotNull(message = "Learner ID is required")
        UUID learnerId,

        @NotNull(message = "Class Section ID is required")
        UUID classSectionId,

        @NotNull(message = "Academic year is required")
        UUID academicYearId,

        @NotNull(message = "Enrollment date is required")
        LocalDate enrollmentDate,

        @NotNull(message = "Enrollment type is required")
        EnrollmentType enrollmentType,

        // ✅ Optional - only for TRANSFER_IN
        @Size(max = 255, message = "Previous school name must be 255 characters or less")
        String previousSchoolName
) {}
