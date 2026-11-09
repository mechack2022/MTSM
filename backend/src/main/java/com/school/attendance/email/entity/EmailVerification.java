package com.school.attendance.email.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Email verification entity for managing email verification tokens
 * Reusable for various verification scenarios:
 * - Tenant admin email verification
 * - User signup email verification
 * - Email change verification
 * - Password reset email verification
 */
@Entity
@Table(name = "email_verification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String token;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationType verificationType;

    @Column(nullable = false)
    @Builder.Default
    private boolean verified = false;

    private Instant verifiedAt;

    @Column(nullable = false)
    private Instant expiresAt;

    /**
     * JSON metadata for additional context
     * Examples:
     * - {"tenantId": "uuid", "keycloakUserId": "uuid"} for TENANT_ADMIN
     * - {"userId": "uuid", "oldEmail": "old@example.com"} for EMAIL_CHANGE
     */
    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public enum VerificationType {
        TENANT_ADMIN,
        USER_SIGNUP,
        EMAIL_CHANGE,
        PASSWORD_RESET,
        GUARDIAN_EMAIL,
        CONTACT_EMAIL
    }

    public boolean isExpired() {
        return Instant.now().isAfter(expiresAt);
    }

    public boolean isValid() {
        return !verified && !isExpired();
    }
}
