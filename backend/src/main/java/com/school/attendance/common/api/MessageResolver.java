package com.school.attendance.common.api;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MessageResolver {

    private final MessageSource messageSource;

    public MessageResolver(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String getMessage(MessageKey key) {
        return messageSource.getMessage(
                key.getPropertyKey(),
                null,
                LocaleContextHolder.getLocale()
        );
    }
}
