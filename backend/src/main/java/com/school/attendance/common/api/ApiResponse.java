package com.school.attendance.common.api;

import java.time.Instant;

public record ApiResponse<T>(
        int status,
        boolean success,
        String message,
        T data,
        ApiError error,
        Instant timestamp,
        String path
) {
    public static <T> ApiResponse<T> success(int status, String message, T data, String path) {
        return new ApiResponse<>(status, true, message, data, null, Instant.now(), path);
    }

    public static <T> ApiResponse<T> error(int status, String message, ApiError error, String path) {
        return new ApiResponse<>(status, false, message, null, error, Instant.now(), path);
    }
}
