package com.school.attendance.tenant;


import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
@Slf4j
public class TenantCodeGenerator {

    private static final int CODE_LENGTH = 6;
    private static final int MAX_ATTEMPTS = 5;

    // 32 chars: excludes ambiguous O/0 and I/1 for human readability
    private static final String CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private static final SecureRandom RANDOM = new SecureRandom();

    private final TenantRepository tenantRepository;

    /**
     * Generates a unique, 6-character uppercase tenant code.
     * Uses SecureRandom + uniqueness retry to guarantee no collisions.
     *
     * Example outputs: "K7M3QX", "BRT4N9", "ZHP2WD"
     */
    public String generateUnique() {
        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            String code = generateRandomCode();

            if (!tenantRepository.existsByCode(code)) {
                log.debug("Generated tenant code: {} on attempt {}", code, attempt);
                return code;
            }

            log.warn("Tenant code collision on attempt {}: {}", attempt, code);
        }

        // Astronomically unlikely with 32^6 combinations, but fail loudly if it happens
        log.error("Failed to generate unique tenant code after {} attempts", MAX_ATTEMPTS);
        throw new BusinessException(MessageKey.TENANT_CODE_GENERATION_FAILED);
    }

    private String generateRandomCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(CHARSET.charAt(RANDOM.nextInt(CHARSET.length())));
        }
        return code.toString();
    }
}
