package com.school.attendance.common.exception;

import com.school.attendance.common.api.MessageKey;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final MessageKey messageKey;
    public BusinessException(MessageKey messageKey) {
        super(messageKey.getPropertyKey());
        this.messageKey = messageKey;
    }
}
