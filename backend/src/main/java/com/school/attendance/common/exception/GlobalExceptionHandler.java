package com.school.attendance.common.exception;

import com.school.attendance.common.api.ApiError;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private final MessageResolver messageResolver;

    public GlobalExceptionHandler(MessageResolver messageResolver) {
        this.messageResolver = messageResolver;
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(
            BusinessException ex, HttpServletRequest request) {

        MessageKey key = ex.getMessageKey();
        return buildErrorResponse(key, request.getRequestURI());
    }

    // --- Handles Spring Security Bad Credentials ---
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadCredentials(HttpServletRequest request) {
        return buildErrorResponse(MessageKey.AUTH_BAD_CREDENTIALS, request.getRequestURI());
    }

    // --- Handles Validation Errors ---
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        String details = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");

        ApiError error = new ApiError(MessageKey.VALIDATION_FAILED.getErrorCode(), details);
        String message = messageResolver.getMessage(MessageKey.VALIDATION_FAILED);

        return ResponseEntity.status(MessageKey.VALIDATION_FAILED.getHttpStatus()).body(
                ApiResponse.error(
                        MessageKey.VALIDATION_FAILED.getHttpStatus().value(),
                        message, error, request.getRequestURI()
                )
        );
    }

    // --- Helper Method to keep code DRY ---
    private ResponseEntity<ApiResponse<Void>> buildErrorResponse(MessageKey key, String path) {
        int status = key.getHttpStatus().value();
        ApiError error = ApiError.from(key, messageResolver);
        String message = messageResolver.getMessage(key);

        return ResponseEntity.status(status).body(
                ApiResponse.error(status, message, error, path)
        );
    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleDataIntegrityViolation(
            DataIntegrityViolationException ex, HttpServletRequest request) {

        Throwable rootCause = ex.getRootCause();
        String errorCode = "DB_CONSTRAINT_001";
        String details = "A database constraint was violated.";

        // Specifically handle PostgreSQL exceptions
        if (rootCause instanceof org.postgresql.util.PSQLException pgEx) {
            var serverErrorMessage = pgEx.getServerErrorMessage();
            if (serverErrorMessage != null) {
                String constraint = serverErrorMessage.getConstraint();
                String detail = serverErrorMessage.getDetail();

                // Map known database constraints to specific domain error codes
                if (constraint != null) {
                    switch (constraint) {
                        case "uk_app_user_username" -> {
                            errorCode = "USER_001";
                            details = "A user with this username already exists.";
                        }
                        case "uk_learner_school_student_number" -> {
                            errorCode = "LEARNER_001";
                            details = "A learner with this student number already exists in this school.";
                        }
                        case "uk_class_section_school_name_year" -> {
                            errorCode = "CLASS_001";
                            details = "A class with this name already exists for this academic year.";
                        }
                        case "fk_app_user_school", "fk_class_section_school", "fk_learner_school" -> {
                            errorCode = "DB_RELATIONAL_001";
                            details = "The referenced school or entity does not exist.";
                        }
                        default -> {
                            errorCode = "DB_CONSTRAINT_002";
                            details = detail != null ? detail : "Unique constraint violation on: " + constraint;
                        }
                    }
                } else if (detail != null) {
                    // Fallback for unique violations where constraint name isn't explicitly provided
                    errorCode = "DB_CONSTRAINT_003";
                    details = detail;
                }
            }
        }
        ApiError error = new ApiError(errorCode, details);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponse.error(
                        HttpStatus.CONFLICT.value(),
                        "Data Integrity Error",
                        error,
                        request.getRequestURI()
                )
        );
    }

    /**
     * Handles malformed JSON or invalid UUID formats in the request body.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleMalformedRequest(
            HttpMessageNotReadableException ex, HttpServletRequest request) {

        String details = "Invalid request format or malformed UUID.";
        ApiError error = new ApiError("VALIDATION_002", details);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiResponse.error(
                        HttpStatus.BAD_REQUEST.value(),
                        messageResolver.getMessage(MessageKey.VALIDATION_FAILED),
                        error,
                        request.getRequestURI()
                )
        );
    }

    /**
     * Handles invalid UUIDs or types in Path Variables (e.g., /classes/abc).
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex, HttpServletRequest request) {

        String details = "Invalid format for parameter: " + ex.getName();
        ApiError error = new ApiError("VALIDATION_003", details);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiResponse.error(
                        HttpStatus.BAD_REQUEST.value(),
                        messageResolver.getMessage(MessageKey.VALIDATION_FAILED),
                        error,
                        request.getRequestURI()
                )
        );
    }

}