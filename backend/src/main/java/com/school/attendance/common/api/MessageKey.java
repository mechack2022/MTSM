package com.school.attendance.common.api;


import org.springframework.http.HttpStatus;

public enum MessageKey {
    AUTH_LOGIN_SUCCESS(HttpStatus.OK, "auth.login.success", null),
    USER_CREATE_SUCCESS(HttpStatus.CREATED, "user.create.success", null),
    AUTH_BAD_CREDENTIALS(HttpStatus.UNAUTHORIZED, "auth.error.bad_credentials", "AUTH_001"),
    AUTH_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "auth.error.user_not_found", "AUTH_002"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "error.validation", "VALIDATION_001"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "error.internal", "SYS_001");

    private final HttpStatus httpStatus;
    private final String propertyKey;
    private final String errorCode;

    MessageKey(HttpStatus httpStatus, String propertyKey, String errorCode) {
        this.httpStatus = httpStatus;
        this.propertyKey = propertyKey;
        this.errorCode = errorCode;
    }

    public HttpStatus getHttpStatus() { return httpStatus; }
    public String getPropertyKey() { return propertyKey; }
    public String getErrorCode() { return errorCode; }
}
