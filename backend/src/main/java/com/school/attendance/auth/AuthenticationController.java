package com.school.attendance.auth;

import com.school.attendance.auth.dto.ResendVerificationRequest;
import com.school.attendance.auth.dto.SignupRequest;
import com.school.attendance.auth.dto.SignupResponse;
import com.school.attendance.auth.dto.VerifyEmailResponse;
import com.school.attendance.auth.service.SignupService;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final SignupService signupService;
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

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponse>> signup(
            @Valid @RequestBody SignupRequest request,
            HttpServletRequest httpRequest) {
        SignupResponse signupData = signupService.signup(request);
        ApiResponse<SignupResponse> response = ApiResponse.success(
                HttpStatus.CREATED.value(),
                signupData.getMessage(),
                signupData,
                httpRequest.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<VerifyEmailResponse>> verifyEmail(
            @RequestParam String token,
            HttpServletRequest httpRequest) {
        VerifyEmailResponse verifyData = signupService.verifyEmail(token);
        ApiResponse<VerifyEmailResponse> response = ApiResponse.success(
                200,
                verifyData.getMessage(),
                verifyData,
                httpRequest.getRequestURI()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<Void>> resendVerification(
            @Valid @RequestBody ResendVerificationRequest request,
            HttpServletRequest httpRequest) {
        signupService.resendVerificationEmail(request.getEmail());
        ApiResponse<Void> response = ApiResponse.success(
                200,
                "Verification email sent successfully. Please check your inbox.",
                null,
                httpRequest.getRequestURI()
        );
        return ResponseEntity.ok(response);
    }
}

