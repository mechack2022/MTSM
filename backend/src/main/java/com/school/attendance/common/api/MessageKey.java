package com.school.attendance.common.api;


import jakarta.validation.constraints.Null;
import org.springframework.http.HttpStatus;

public enum MessageKey {


    // Code Set Management (Success)
    CODESET_CREATE_SUCCESS(HttpStatus.CREATED, "codeset.create.success", null),
    CODESET_LIST_SUCCESS(HttpStatus.OK, "codeset.list.success", null),
    CODESET_GET_SUCCESS(HttpStatus.OK, "codeset.get.success", null),
    CODESET_UPDATE_SUCCESS(HttpStatus.OK, "codeset.update.success", null),
    CODESET_ACTIVATE_SUCCESS(HttpStatus.OK, "codeset.activate.success", null),
    CODESET_DEACTIVATE_SUCCESS(HttpStatus.OK, "codeset.deactivate.success", null),

    // Code Set Management (Errors)
    CODESET_ALREADY_EXISTS(HttpStatus.CONFLICT, "codeset.error.already_exists", "CODESET_001"),
    CODESET_NOT_FOUND(HttpStatus.NOT_FOUND, "codeset.error.not_found", "CODESET_002"),
    CODESET_ALREADY_ACTIVE(HttpStatus.BAD_REQUEST, "codeset.error.already_active", "CODESET_003"),
    CODESET_ALREADY_DEACTIVATED(HttpStatus.BAD_REQUEST, "codeset.error.already_deactivated", "CODESET_004"),
    CODESET_INVALID_GROUP(HttpStatus.BAD_REQUEST, "codeset.error.invalid_group", "CODESET_005"),
    // Authentication
    AUTH_LOGIN_SUCCESS(HttpStatus.OK, "auth.login.success", null),
    AUTH_BAD_CREDENTIALS(HttpStatus.UNAUTHORIZED, "auth.error.bad_credentials", "AUTH_001"),
    AUTH_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "auth.error.user_not_found", "AUTH_002"),
    AUTH_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "auth.error.unauthorized", "AUTH_003"),

    // User Management (Success)
    USER_CREATE_SUCCESS(HttpStatus.CREATED, "user.create.success", null),
    USER_LIST_SUCCESS(HttpStatus.OK, "user.list.success", null),
    USER_GET_SUCCESS(HttpStatus.OK, "user.get.success", null),
    USER_UPDATE_SUCCESS(HttpStatus.OK, "user.update.success", null),
    USER_DEACTIVATE_SUCCESS(HttpStatus.OK, "user.deactivate.success", null),
    USER_ME_SUCCESS(HttpStatus.OK, "user.me.success", null),
    USER_ACTIVATE_SUCCESS(HttpStatus.OK, "user.activate.success", null),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "user.error.already_exists", "USER_001"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "user.error.not_found", "USER_002"),
    USER_CANNOT_DEACTIVATE_SELF(HttpStatus.BAD_REQUEST, "user.error.cannot_deactivate_self", "USER_003"),
    CLASS_TEACHER_NOT_FOUND(HttpStatus.BAD_REQUEST, "class.error.teacher_not_found", "CLASS_003"),

    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "error.validation", "VALIDATION_001"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "error.internal", "SYS_001"),

    // School Management
    SCHOOL_GET_SUCCESS(HttpStatus.OK, "school.get.success", null),
    SCHOOL_UPDATE_SUCCESS(HttpStatus.OK, "school.update.success", null),

    // Class/Section Management
    CLASS_CREATE_SUCCESS(HttpStatus.CREATED, "class.create.success", null),
    CLASS_LIST_SUCCESS(HttpStatus.OK, "class.list.success", null),
    CLASS_GET_SUCCESS(HttpStatus.OK, "class.get.success", null),
    CLASS_UPDATE_SUCCESS(HttpStatus.OK, "class.update.success", null),
    CLASS_DEACTIVATE_SUCCESS(HttpStatus.OK, "class.deactivate.success", null),
    CLASS_ALREADY_EXISTS(HttpStatus.CONFLICT, "class.error.already_exists", "CLASS_001"),
    CLASS_ACTIVATE_SUCCESS(HttpStatus.OK, "class.activate.success", null),
    CLASS_ALREADY_ACTIVE(HttpStatus.BAD_REQUEST, "class.error.already_active", "CLASS_004"),
    CLASS_ALREADY_DEACTIVATED(HttpStatus.BAD_REQUEST, "class.error.already_deactivated", "CLASS_005"),
    CLASS_NOT_FOUND(HttpStatus.NOT_FOUND, "class.error.not_found", "CLASS_002");


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
