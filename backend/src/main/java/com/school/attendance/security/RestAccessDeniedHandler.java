package com.school.attendance.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.common.api.ApiError;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;
    private final MessageResolver messageResolver;

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // ✅ Use the ApiError.from() factory method
        ApiError apiError = ApiError.from(MessageKey.ACCESS_DENIED, messageResolver);

        // ✅ Use the ApiResponse.error() factory method
        ApiResponse<Void> errorResponse = ApiResponse.error(
                HttpStatus.FORBIDDEN.value(),
                messageResolver.getMessage(MessageKey.ACCESS_DENIED),
                apiError,
                request.getRequestURI()
        );

        objectMapper.writeValue(response.getWriter(), errorResponse);
    }

    }
