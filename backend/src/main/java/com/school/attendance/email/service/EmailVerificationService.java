package com.school.attendance.email.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.email.entity.EmailVerification;
import com.school.attendance.email.repository.EmailVerificationRepository;
import com.school.attendance.keycloak.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;

/**
 * Service for managing email verification tokens and flow
 * Reusable for various verification scenarios
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationRepository verificationRepository;
    private final EmailService emailService;
    private final KeycloakUserService keycloakUserService;
    private final ObjectMapper objectMapper;

    @Value("${app.mail.app-url:http://localhost:3000}")
    private String appUrl;

    /**
     * Create verification token and send verification email
     *
     * @param email The email address to verify
     * @param recipientName Name of the recipient
     * @param verificationType Type of verification
     * @param metadata Additional context data (tenantId, userId, etc.)
     * @return The verification token
     */
    @Transactional
    public String createVerificationAndSendEmail(
            String email,
            String recipientName,
            EmailVerification.VerificationType verificationType,
            Map<String, Object> metadata
    ) {
        // Delete any existing unverified tokens for this email and type
        verificationRepository.deleteByEmailAndVerificationTypeAndVerifiedFalse(email, verificationType);

        // Generate unique token
        String token = UUID.randomUUID().toString();

        // Convert metadata to JSON
        String metadataJson = null;
        if (metadata != null && !metadata.isEmpty()) {
            try {
                metadataJson = objectMapper.writeValueAsString(metadata);
            } catch (JsonProcessingException e) {
                log.error("Failed to serialize metadata", e);
            }
        }

        // Create verification record
        EmailVerification verification = EmailVerification.builder()
                .email(email)
                .token(token)
                .verificationType(verificationType)
                .verified(false)
                .expiresAt(Instant.now().plus(24, ChronoUnit.HOURS)) // 24 hour expiry
                .metadata(metadataJson)
                .build();

        verificationRepository.save(verification);

        // Build verification link
        String verificationLink = String.format("%s/verify-email?token=%s", appUrl, token);

        // Send verification email
        emailService.sendVerificationEmail(email, recipientName, verificationLink);

        log.info("Created verification token for email: {} (type: {})", email, verificationType);
        return token;
    }

    /**
     * Verify email using token
     *
     * @param token The verification token
     * @return Metadata associated with the verification
     */
    @Transactional
    public Map<String, Object> verifyEmail(String token) {
        EmailVerification verification = verificationRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid verification token"));

        // Check if already verified
        if (verification.isVerified()) {
            throw new BusinessException("This email has already been verified");
        }

        // Check if expired
        if (verification.isExpired()) {
            throw new BusinessException("Verification token has expired. Please request a new one.");
        }

        // Mark as verified
        verification.setVerified(true);
        verification.setVerifiedAt(Instant.now());
        verificationRepository.save(verification);

        // Parse metadata
        Map<String, Object> metadata = parseMetadata(verification.getMetadata());

        // If this is a tenant admin verification, update Keycloak
        if (verification.getVerificationType() == EmailVerification.VerificationType.TENANT_ADMIN) {
            String keycloakUserId = (String) metadata.get("keycloakUserId");
            if (keycloakUserId != null) {
                try {
                    updateKeycloakEmailVerified(keycloakUserId);
                } catch (Exception e) {
                    log.error("Failed to update Keycloak email verification status", e);
                    // Don't fail the whole verification if Keycloak update fails
                }
            }
        }

        log.info("Verified email: {} (type: {})", verification.getEmail(), verification.getVerificationType());
        return metadata;
    }

    /**
     * Resend verification email
     */
    @Transactional
    public void resendVerificationEmail(String email, EmailVerification.VerificationType verificationType) {
        EmailVerification verification = verificationRepository
                .findFirstByEmailAndVerificationTypeAndVerifiedFalseOrderByCreatedAtDesc(email, verificationType)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No pending verification found for this email"));

        if (verification.isVerified()) {
            throw new BusinessException("Email is already verified");
        }

        // Create new token (invalidates old one)
        Map<String, Object> metadata = parseMetadata(verification.getMetadata());
        String recipientName = (String) metadata.getOrDefault("recipientName", "User");

        createVerificationAndSendEmail(email, recipientName, verificationType, metadata);
    }

    /**
     * Check if email is verified
     */
    public boolean isEmailVerified(String email, EmailVerification.VerificationType verificationType) {
        return verificationRepository.existsByEmailAndVerificationTypeAndVerifiedTrue(email, verificationType);
    }

    /**
     * Update Keycloak user's emailVerified status
     */
    private void updateKeycloakEmailVerified(String keycloakUserId) {
        try {
            keycloakUserService.setEmailVerified(keycloakUserId, true);
            log.info("Updated Keycloak emailVerified for user: {}", keycloakUserId);
        } catch (Exception e) {
            log.error("Failed to update Keycloak emailVerified status for user {}: {}",
                    keycloakUserId, e.getMessage());
            throw e;
        }
    }

    /**
     * Parse JSON metadata to Map
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> parseMetadata(String metadataJson) {
        if (metadataJson == null || metadataJson.isBlank()) {
            return Map.of();
        }
        try {
            return objectMapper.readValue(metadataJson, Map.class);
        } catch (JsonProcessingException e) {
            log.error("Failed to parse metadata JSON", e);
            return Map.of();
        }
    }

    /**
     * Cleanup expired verification tokens (scheduled job)
     */
    @Transactional
    public void cleanupExpiredTokens() {
        verificationRepository.deleteExpiredTokens(Instant.now());
        log.info("Cleaned up expired verification tokens");
    }
}
