package com.school.attendance.common.config;

import com.school.attendance.security.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.UUID;

@Configuration
public class AuditorAwareConfig {

    @Bean
    public AuditorAware<UUID> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                return Optional.empty();
            }

            Object principal = authentication.getPrincipal();

            if (principal instanceof String && "anonymousUser".equals(principal)) {
                return Optional.empty();
            }

            if (principal instanceof CustomUserDetails userDetails) {
                if (userDetails.isPlatformAdmin()) {
                    return Optional.empty();
                }

                return Optional.ofNullable(userDetails.getUserId());
            }

            return Optional.empty();
        };
    }
}
