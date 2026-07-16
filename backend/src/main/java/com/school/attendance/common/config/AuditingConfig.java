package com.school.attendance.common.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class AuditingConfig {
    // Enables @CreatedBy, @LastModifiedBy, etc.
}