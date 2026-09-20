package com.school.attendance.learner.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record LearnerResponse(
        UUID id,
        UUID schoolId,
        String firstName,
        String lastName,
        String fullName,
        String learnerNumber,
        UUID gradeLevelId,
        String gradeLevelDisplayName,
        LocalDate dateOfBirth,
        String sex,
        String previousSchoolName,
        Boolean isActive,
        Instant createdAt,
        UUID createdBy,
        Instant updatedAt,
        UUID updatedBy
) {}