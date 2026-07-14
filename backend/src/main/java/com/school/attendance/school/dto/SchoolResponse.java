package com.school.attendance.school.dto;

import java.util.UUID;

public record SchoolResponse(
        UUID id,
        String name,
        String code,
        String address,
        String academicYear,
        String currentTerm,
        String phone,
        String email,
        String logoUrl
) {}
