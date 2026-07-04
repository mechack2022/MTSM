package com.school.attendance.auth;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final MessageResolver messageResolver;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(
            @Valid @RequestBody AuthenticationRequest request,
            HttpServletRequest httpRequest) {
        AuthenticationResponse authData = authService.login(request);
        String successMessage = messageResolver.getMessage(MessageKey.AUTH_LOGIN_SUCCESS);
        ApiResponse<AuthenticationResponse> response = ApiResponse.success(
                200,
                successMessage,
                authData,
                httpRequest.getRequestURI()
        );
        return ResponseEntity.ok(response);
    }
}

