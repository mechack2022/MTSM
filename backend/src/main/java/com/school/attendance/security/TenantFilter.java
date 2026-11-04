package com.school.attendance.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

    private final TenantContext tenantContext;
    private final JdbcTemplate jdbcTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            setTenantContext();
            filterChain.doFilter(request, response);
        } finally {
            clearTenantContext();
        }
    }

    private void setTenantContext() {
        tenantContext.getCurrentTenantId().ifPresent(tenantId -> {
            jdbcTemplate.execute(String.format("SET app.current_tenant_id = '%s'", tenantId));
            log.debug("Set tenant context: {}", tenantId);
        });

        tenantContext.getCurrentUserId().ifPresent(userId -> {
            jdbcTemplate.execute(String.format("SET app.current_user_id = '%s'", userId));
            log.debug("Set user context: {}", userId);
        });

        if (tenantContext.hasRole("PLATFORM_ADMIN")) {
            jdbcTemplate.execute("SET app.current_user_role = 'platform_admin'");
        } else if (tenantContext.hasRole("TENANT_ADMIN")) {
            jdbcTemplate.execute("SET app.current_user_role = 'tenant_admin'");
        }
    }

    private void clearTenantContext() {
        try {
            jdbcTemplate.execute("RESET app.current_tenant_id");
            jdbcTemplate.execute("RESET app.current_user_id");
            jdbcTemplate.execute("RESET app.current_user_role");
        } catch (Exception e) {
            log.warn("Failed to clear tenant context", e);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/actuator/") ||
               path.startsWith("/api-docs") ||
               path.startsWith("/swagger-ui");
    }
}
