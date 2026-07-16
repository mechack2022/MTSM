package com.school.attendance.common.dto;


import com.school.attendance.common.enums.CodeSetGroup;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public record CodeSetResponse(
        UUID id,
        CodeSetGroup codeSetGroup,
        String code,
        String displayName,
        String description,
        Map<String, Object> attributes,
        Integer sortOrder,
        Boolean isActive,
        Instant createdAt,
        UUID createdBy
) {}
