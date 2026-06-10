package com.school.attendance.common.exception;

/**
 * Thrown when a conflict occurs that cannot be automatically resolved.
 */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
