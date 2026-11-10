package com.school.attendance.common.exception;

import java.time.Instant;
import java.util.Map;

public record ValidationErrorResponse(
    int status,
    String message,
    Map<String, String> errors,
    String path,
    Instant timestamp
) {
    public ValidationErrorResponse(int status, String message, Map<String, String> errors, String path) {
        this(status, message, errors, path, Instant.now());
    }
}
