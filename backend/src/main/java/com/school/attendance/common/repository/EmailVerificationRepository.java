package com.school.attendance.common.repository;

import com.school.attendance.common.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, UUID> {

    Optional<EmailVerification> findByToken(String token);

    Optional<EmailVerification> findByEmailAndTypeAndUsedAtIsNull(
        String email,
        EmailVerification.EmailType type
    );

    List<EmailVerification> findByUserIdAndType(UUID userId, EmailVerification.EmailType type);

    List<EmailVerification> findByEmailAndType(String email, EmailVerification.EmailType type);

    void deleteByExpiresAtBeforeAndUsedAtIsNotNull(LocalDateTime dateTime);
}
