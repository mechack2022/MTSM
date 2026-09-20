package com.school.attendance.tenant.dto;

import java.time.Instant;
import java.util.UUID;

public record TenantResponse(
        UUID id,
        String name,
        String code,
        String contactEmail,
        String contactPhone,
        Boolean isActive,
        Instant createdAt,
        UUID createdBy,
        Instant updatedAt,
        UUID updatedBy
) {}
