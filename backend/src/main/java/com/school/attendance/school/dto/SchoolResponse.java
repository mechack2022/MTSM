package com.school.attendance.school.dto;

import java.time.Instant;
import java.util.UUID;

public record SchoolResponse(
        UUID id,
        String name,
        String code,
        String address,
        UUID academicYearId,
        String academicYearDisplayName,
        UUID currentTermId,
        String currentTermDisplayName,
        String phone,
        String email,
        String logoUrl,
        Instant createdAt,
        UUID createdBy,
        Instant updatedAt,
        UUID updatedBy
) {}
