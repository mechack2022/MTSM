package com.school.attendance.email.repository;

import com.school.attendance.email.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, UUID> {

    /**
     * Find verification by token
     */
    Optional<EmailVerification> findByToken(String token);

    /**
     * Find the latest unverified verification for an email and type
     */
    Optional<EmailVerification> findFirstByEmailAndVerificationTypeAndVerifiedFalseOrderByCreatedAtDesc(
            String email,
            EmailVerification.VerificationType verificationType
    );

    /**
     * Check if email has a verified token of specific type
     */
    boolean existsByEmailAndVerificationTypeAndVerifiedTrue(
            String email,
            EmailVerification.VerificationType verificationType
    );

    /**
     * Delete expired tokens (cleanup job)
     */
    @Modifying
    @Query("DELETE FROM EmailVerification e WHERE e.expiresAt < :now AND e.verified = false")
    void deleteExpiredTokens(Instant now);

    /**
     * Delete all unverified tokens for an email and type
     */
    @Modifying
    void deleteByEmailAndVerificationTypeAndVerifiedFalse(
            String email,
            EmailVerification.VerificationType verificationType
    );
}
