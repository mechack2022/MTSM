package com.school.attendance.enrollment.dto;

import com.school.attendance.enrollment.EnrollmentStatus;
import com.school.attendance.enrollment.EnrollmentType;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record EnrollmentResponse(
        UUID id,
        UUID learnerId,
        String learnerName,
        String studentNumber,
        UUID classSectionId,
        String className,
        UUID academicYearId,
        String academicYearDisplayName,
        LocalDate enrollmentDate,
        LocalDate withdrawalDate,
        EnrollmentStatus status,
        EnrollmentType enrollmentType,
        String previousSchoolName,
        Instant createdAt,
        UUID createdBy,
        Instant updatedAt,
        UUID updatedBy
) {}
