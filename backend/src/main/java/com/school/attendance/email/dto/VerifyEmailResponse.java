package com.school.attendance.email.dto;

import java.util.Map;

public record VerifyEmailResponse(
        boolean success,
        String message,
        Map<String, Object> metadata
) {}
