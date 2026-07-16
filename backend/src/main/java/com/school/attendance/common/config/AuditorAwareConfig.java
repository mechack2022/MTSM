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
    public AuditorAware<UUID> auditorAware() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()
                    || authentication.getPrincipal() instanceof String) {
                return Optional.empty();
            }
            if (authentication.getPrincipal() instanceof CustomUserDetails customUserDetails) {
                return Optional.of(customUserDetails.getId());
            }

            return Optional.empty();
        };
    }
}
