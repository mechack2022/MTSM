package com.school.attendance.classsection.dto;

import java.time.Instant;
import java.util.UUID;

public record ClassSectionResponse(
        UUID id,
        String name,
        UUID gradeLevelId,
        String gradeLevelDisplayName,
        UUID academicYearId,
        String academicYearDisplayName,
        UUID classTeacherId,
        String classTeacherName,
        Integer capacity,
        Boolean isActive,
        Instant createdAt,
        UUID createdBy,
        Instant updatedAt,
        UUID updatedBy
) {}