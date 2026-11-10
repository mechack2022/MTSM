package com.school.attendance.email.controller;

import com.school.attendance.email.dto.ResendVerificationRequest;
import com.school.attendance.email.dto.VerifyEmailResponse;
import com.school.attendance.email.entity.EmailVerification;
import com.school.attendance.email.service.EmailVerificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/email-verification")
@RequiredArgsConstructor
@Tag(name = "Email Verification", description = "Email verification endpoints")
public class EmailVerificationController {

    private final EmailVerificationService verificationService;

    /**
     * Verify email using token
     */
    @GetMapping("/verify")
    @Operation(summary = "Verify email with token")
    public ResponseEntity<VerifyEmailResponse> verifyEmail(@RequestParam String token) {
        log.info("Email verification request received");

        Map<String, Object> metadata = verificationService.verifyEmail(token);

        String message = "Email verified successfully! You can now login to your account.";
        VerifyEmailResponse response = new VerifyEmailResponse(true, message, metadata);

        return ResponseEntity.ok(response);
    }

    /**
     * Resend verification email
     */
    @PostMapping("/resend")
    @Operation(summary = "Resend verification email")
    public ResponseEntity<Map<String, String>> resendVerificationEmail(
            @Valid @RequestBody ResendVerificationRequest request
    ) {
        log.info("Resend verification email request for: {}", request.email());

        verificationService.resendVerificationEmail(
                request.email(),
                EmailVerification.VerificationType.TENANT_ADMIN
        );

        return ResponseEntity.ok(Map.of(
                "message", "Verification email has been resent. Please check your inbox."
        ));
    }
}
