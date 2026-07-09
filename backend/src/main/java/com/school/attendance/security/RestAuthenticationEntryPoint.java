package com.school.attendance.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.common.api.ApiError;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final MessageResolver messageResolver;
    private final ObjectMapper objectMapper;

    public RestAuthenticationEntryPoint(MessageResolver messageResolver, ObjectMapper objectMapper) {
        this.messageResolver = messageResolver;
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        // 1. Force 401 Status
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        // 2. Build the Standardized Envelope
        ApiError error = ApiError.from(MessageKey.AUTH_UNAUTHORIZED, messageResolver);
        ApiResponse<Void> body = ApiResponse.error(
                HttpStatus.UNAUTHORIZED.value(),
                messageResolver.getMessage(MessageKey.AUTH_UNAUTHORIZED),
                error,
                request.getRequestURI()
        );

        // 3. Write JSON to response
        objectMapper.writeValue(response.getOutputStream(), body);
    }
}