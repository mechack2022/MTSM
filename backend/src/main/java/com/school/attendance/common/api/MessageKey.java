package com.school.attendance.common.api;


import jakarta.validation.constraints.Null;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
@Getter
public enum MessageKey {

    // Generic validation errors
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "error.invalid_request", "VAL_001"),
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
    CANNOT_MODIFY_SAME_LEVEL(HttpStatus.FORBIDDEN, "user.error.cannot_modify_same_level", "USER_009"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "error.validation", "VALIDATION_001"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "error.internal", "SYS_001"),
    USER_CANNOT_MODIFY_SELF(HttpStatus.FORBIDDEN, "user.error.cannot_modify_self", "USER_005"),
    UNAUTHORIZED_ROLE_UPDATE(HttpStatus.FORBIDDEN, "user.error.unauthorized_role_update", "USER_006"),
    UNAUTHORIZED_SCHOOL_ASSIGNMENT(HttpStatus.FORBIDDEN, "user.error.unauthorized_school_assignment", "USER_007"),
    UNAUTHORIZED_USER_ACCESS(HttpStatus.FORBIDDEN, "user.error.unauthorized_user_access", "USER_008"),

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
    CLASS_NOT_FOUND(HttpStatus.NOT_FOUND, "class.error.not_found", "CLASS_002"),

    // ==========================================
    // Learner Management (Success)
    // ==========================================
    LEARNER_CREATE_SUCCESS(HttpStatus.CREATED, "learner.create.success", null),
    LEARNER_LIST_SUCCESS(HttpStatus.OK, "learner.list.success", null),
    LEARNER_GET_SUCCESS(HttpStatus.OK, "learner.get.success", null),
    LEARNER_UPDATE_SUCCESS(HttpStatus.OK, "learner.update.success", null),
    LEARNER_DEACTIVATE_SUCCESS(HttpStatus.OK, "learner.deactivate.success", null),
    LEARNER_ACTIVATE_SUCCESS(HttpStatus.OK, "learner.activate.success", null),

    // ==========================================
    // Learner Management (Errors)
    // ==========================================
    LEARNER_ALREADY_EXISTS(HttpStatus.CONFLICT, "learner.error.already_exists", "LEARNER_001"),
    LEARNER_NOT_FOUND(HttpStatus.NOT_FOUND, "learner.error.not_found", "LEARNER_002"),
    LEARNER_ALREADY_DEACTIVATED(HttpStatus.BAD_REQUEST, "learner.error.already_deactivated", "LEARNER_003"),
    LEARNER_ALREADY_ACTIVE(HttpStatus.BAD_REQUEST, "learner.error.already_active", "LEARNER_004"),
    LEARNER_INVALID_GRADE_LEVEL(HttpStatus.BAD_REQUEST, "learner.error.invalid_grade_level", "LEARNER_005"),
    LEARNER_GENERATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "learner.error.generation_failed", "LEARNER_006"),

    // ==========================================
    // Enrollment Management (Success)
    // ==========================================
    ENROLLMENT_CREATE_SUCCESS(HttpStatus.CREATED, "enrollment.create.success", null),
    ENROLLMENT_LIST_SUCCESS(HttpStatus.OK, "enrollment.list.success", null),
    ENROLLMENT_GET_SUCCESS(HttpStatus.OK, "enrollment.get.success", null),
    ENROLLMENT_WITHDRAW_SUCCESS(HttpStatus.OK, "enrollment.withdraw.success", null),

    // ==========================================
    // Enrollment Management (Errors)
    // ==========================================
    ENROLLMENT_ALREADY_ENROLLED(HttpStatus.CONFLICT, "enrollment.error.already_enrolled", "ENROLLMENT_001"),
    ENROLLMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "enrollment.error.not_found", "ENROLLMENT_002"),
    ENROLLMENT_ALREADY_WITHDRAWN(HttpStatus.BAD_REQUEST, "enrollment.error.already_withdrawn", "ENROLLMENT_003"),
    ENROLLMENT_LEARNER_DEACTIVATED(HttpStatus.BAD_REQUEST, "enrollment.error.learner_deactivated", "ENROLLMENT_004"),
    ENROLLMENT_CLASS_DEACTIVATED(HttpStatus.BAD_REQUEST, "enrollment.error.class_deactivated", "ENROLLMENT_005"),
    ENROLLMENT_GRADE_MISMATCH(HttpStatus.BAD_REQUEST, "enrollment.error.grade_mismatch", "ENROLLMENT_006"),
    ENROLLMENT_INVALID_DATE(HttpStatus.BAD_REQUEST, "enrollment.error.invalid_date", "ENROLLMENT_007"),
    ENROLLMENT_PREVIOUS_SCHOOL_REQUIRED(HttpStatus.BAD_REQUEST, "enrollment.error.previous_school_required", "ENROLLMENT_008"),
    SCHOOL_CODE_NOT_CONFIGURED(HttpStatus.BAD_REQUEST, "school.error.code_not_configured", "SCHOOL_001"),

   // Tenant Management (Success)
    TENANT_CREATE_SUCCESS(HttpStatus.CREATED, "tenant.create.success", null),
    TENANT_LIST_SUCCESS(HttpStatus.OK, "tenant.list.success", null),
    TENANT_GET_SUCCESS(HttpStatus.OK, "tenant.get.success", null),
    TENANT_UPDATE_SUCCESS(HttpStatus.OK, "tenant.update.success", null),
    TENANT_DEACTIVATE_SUCCESS(HttpStatus.OK, "tenant.deactivate.success", null),
    TENANT_ACTIVATE_SUCCESS(HttpStatus.OK, "tenant.activate.success", null),

    TENANT_ALREADY_EXISTS(HttpStatus.CONFLICT, "tenant.error.already_exists", "TENANT_001"),
    TENANT_NOT_FOUND(HttpStatus.NOT_FOUND, "tenant.error.not_found", "TENANT_002"),
    TENANT_ALREADY_DEACTIVATED(HttpStatus.BAD_REQUEST, "tenant.error.already_deactivated", "TENANT_003"),
    TENANT_ALREADY_ACTIVE(HttpStatus.BAD_REQUEST, "tenant.error.already_active", "TENANT_004"),
    TENANT_CODE_GENERATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "tenant.error.code_generation_failed", "TENANT_005"),
    // Tenant Errors
    TENANT_EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "tenant.error.email_already_exists", "TENANT_007"),
    TENANT_PHONE_ALREADY_EXISTS(HttpStatus.CONFLICT, "tenant.error.phone_already_exists", "TENANT_008"),

    // Role Management (Success)
    ROLE_CREATE_SUCCESS(HttpStatus.CREATED, "role.create.success", null),
    ROLE_LIST_SUCCESS(HttpStatus.OK, "role.list.success", null),
    ROLE_GET_SUCCESS(HttpStatus.OK, "role.get.success", null),
    ROLE_UPDATE_SUCCESS(HttpStatus.OK, "role.update.success", null),
    ROLE_DELETE_SUCCESS(HttpStatus.OK, "role.delete.success", null),
    ROLE_PERMISSIONS_ASSIGNED(HttpStatus.OK, "role.permissions.assigned", null),
    ROLE_PERMISSIONS_REVOKED(HttpStatus.OK, "role.permissions.revoked", null),

   // Role Management (Errors)
    ROLE_NOT_FOUND(HttpStatus.NOT_FOUND, "role.error.not_found", "ROLE_001"),
    ROLE_ALREADY_EXISTS(HttpStatus.CONFLICT, "role.error.already_exists", "ROLE_002"),
    ROLE_SYSTEM_ROLE_CANNOT_BE_MODIFIED(HttpStatus.FORBIDDEN, "role.error.system_role_cannot_be_modified", "ROLE_003"),
    ROLE_SYSTEM_ROLE_CANNOT_BE_DELETED(HttpStatus.FORBIDDEN, "role.error.system_role_cannot_be_deleted", "ROLE_004"),
    ROLE_SCOPE_MISMATCH(HttpStatus.BAD_REQUEST, "role.error.scope_mismatch", "ROLE_005"),
    ROLE_CANNOT_DELETE_ROLE_WITH_USERS(HttpStatus.CONFLICT, "role.error.cannot_delete_role_with_users", "ROLE_006"),
    ROLE_INVALID_ACCESS_SCOPE(HttpStatus.BAD_REQUEST, "role.error.invalid_access_scope", "ROLE_007"),
    ROLE_PERMISSION_NOT_FOUND(HttpStatus.BAD_REQUEST, "role.error.permission_not_found", "ROLE_008"),
    ROLE_CANNOT_ASSIGN_PERMISSION_OUTSIDE_CATALOG(HttpStatus.BAD_REQUEST, "role.error.cannot_assign_permission_outside_catalog", "ROLE_009"),

// Permission Management (Success)
    PERMISSION_CREATE_SUCCESS(HttpStatus.CREATED, "permission.create.success", null),
    PERMISSION_LIST_SUCCESS(HttpStatus.OK, "permission.list.success", null),
    PERMISSION_GET_SUCCESS(HttpStatus.OK, "permission.get.success", null),

    // Authorization errors
    UNAUTHORIZED_TENANT_ACCESS(HttpStatus.FORBIDDEN, "error.unauthorized_tenant_access", "SEC_001"),
    UNAUTHORIZED_SCHOOL_ACCESS(HttpStatus.FORBIDDEN, "error.unauthorized_school_access", "SEC_002"),
    SCHOOL_OUTSIDE_TENANT(HttpStatus.BAD_REQUEST, "error.school_outside_tenant", "SEC_003"),

    // User state errors
    USER_ALREADY_DEACTIVATED(HttpStatus.BAD_REQUEST, "user.error.already_deactivated", "USER_005"),
    USER_ALREADY_ACTIVE(HttpStatus.BAD_REQUEST, "user.error.already_active", "USER_006"),

    ACCESS_DENIED(HttpStatus.FORBIDDEN, "error.access_denied", "SEC_004"),
    // School Errors
    SCHOOL_NOT_FOUND(HttpStatus.NOT_FOUND, "school.error.not_found", "SCHOOL_001"),
    SCHOOL_CODE_ALREADY_EXISTS(HttpStatus.CONFLICT, "school.error.code_exists", "SCHOOL_002"),
    CODESET_OUTSIDE_TENANT(HttpStatus.FORBIDDEN, "codeset.error.outside_tenant", "CODESET_002"),

    // School Success
    SCHOOL_CREATE_SUCCESS(HttpStatus.CREATED, "school.success.create", "SCHOOL_S01"),
    CODESET_OUTSIDE_SCHOOL(HttpStatus.FORBIDDEN, "codeset.error.outside_school", "CODESET_003"),
    SCHOOL_LIST_SUCCESS(HttpStatus.OK, "school.success.list", "SCHOOL_S02");


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
