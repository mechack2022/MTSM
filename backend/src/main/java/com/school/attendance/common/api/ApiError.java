package com.school.attendance.common.api;

public record ApiError(
        String code,
        String details
) {
    public static ApiError from(MessageKey key, MessageResolver resolver) {
        return new ApiError(
                key.getErrorCode(),
                resolver.getMessage(key)
        );
    }
}
