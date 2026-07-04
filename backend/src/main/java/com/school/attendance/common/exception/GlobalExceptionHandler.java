package com.school.attendance.common.exception;

import com.school.attendance.common.api.ApiError;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
}