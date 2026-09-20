package com.school.attendance.common.exception;

import com.school.attendance.common.api.MessageKey;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final MessageKey messageKey;
    private final String detail;

    public BusinessException(MessageKey messageKey) {
        super(messageKey.getPropertyKey());
        this.messageKey = messageKey;
        this.detail = null;
    }

    public BusinessException(MessageKey messageKey, String detail) {
        super(messageKey.getPropertyKey() + ": " + detail);
        this.messageKey = messageKey;
        this.detail = detail;
    }
}
