package com.school.attendance.common.api;


import org.springframework.http.HttpStatus;

public enum MessageKey {
    // ==========================================
    // Authentication
    // ==========================================
    AUTH_LOGIN_SUCCESS(HttpStatus.OK, "auth.login.success", null),
    AUTH_BAD_CREDENTIALS(HttpStatus.UNAUTHORIZED, "auth.error.bad_credentials", "AUTH_001"),
    AUTH_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "auth.error.user_not_found", "AUTH_002"),
    AUTH_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "auth.error.unauthorized", "AUTH_003"),
    // ==========================================
    // User Management (Success)
    // ==========================================
    USER_CREATE_SUCCESS(HttpStatus.CREATED, "user.create.success", null),
    USER_LIST_SUCCESS(HttpStatus.OK, "user.list.success", null),
    USER_GET_SUCCESS(HttpStatus.OK, "user.get.success", null),
    USER_UPDATE_SUCCESS(HttpStatus.OK, "user.update.success", null),
    USER_DEACTIVATE_SUCCESS(HttpStatus.OK, "user.deactivate.success", null),
    USER_ME_SUCCESS(HttpStatus.OK, "user.me.success", null),


    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "user.error.already_exists", "USER_001"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "user.error.not_found", "USER_002"),
    USER_CANNOT_DEACTIVATE_SELF(HttpStatus.BAD_REQUEST, "user.error.cannot_deactivate_self", "USER_003"),

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
