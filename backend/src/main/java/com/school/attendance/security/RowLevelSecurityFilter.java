package com.school.attendance.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Filter that sets PostgreSQL session variables for Row-Level Security (RLS).
 *
 * This filter executes AFTER authentication and sets the following PostgreSQL
 * session variables that are used by RLS policies:
 * - app.current_tenant_id: The tenant ID of the authenticated user
 * - app.current_user_id: The user ID of the authenticated user
 * - app.is_platform_admin: Whether the user is a platform administrator
 *
 * These session variables enable database-level tenant isolation, providing
 * defense-in-depth security beyond application-level filtering.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RowLevelSecurityFilter extends OncePerRequestFilter {

    private final DataSource dataSource;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {

            try {
                setPostgresSessionVariables(userDetails);
                log.debug("RLS context set for user: {} (tenant: {}, isPlatformAdmin: {})",
                        userDetails.getUserId(),
                        userDetails.getTenantId(),
                        userDetails.isPlatformAdmin());
            } catch (Exception e) {
                log.error("Failed to set RLS context: {}", e.getMessage(), e);
                // Continue processing - application-level security will still apply
            }
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            // Clean up session variables after request completes
            if (authentication != null && authentication.isAuthenticated()
                    && authentication.getPrincipal() instanceof CustomUserDetails) {
                try {
                    clearPostgresSessionVariables();
                } catch (Exception e) {
                    log.warn("Failed to clear RLS context: {}", e.getMessage());
                }
            }
        }
    }

    /**
     * Sets PostgreSQL session variables for the current authenticated user.
     * These variables are used by Row-Level Security policies to filter data.
     */
    private void setPostgresSessionVariables(CustomUserDetails userDetails) {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {

            // Set platform admin flag
            String isPlatformAdmin = userDetails.isPlatformAdmin() ? "true" : "false";
            statement.execute("SET LOCAL app.is_platform_admin = '" + isPlatformAdmin + "'");

            // Set user ID
            statement.execute("SET LOCAL app.current_user_id = '" + userDetails.getUserId().toString() + "'");

            // Set tenant ID (only for non-platform admins)
            if (!userDetails.isPlatformAdmin() && userDetails.getTenantId() != null) {
                statement.execute("SET LOCAL app.current_tenant_id = '" + userDetails.getTenantId().toString() + "'");
            }

        } catch (SQLException e) {
            throw new RuntimeException("Failed to set RLS session variables", e);
        }
    }

    /**
     * Clears PostgreSQL session variables.
     * Called after request processing completes to ensure clean state.
     */
    private void clearPostgresSessionVariables() {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {

            statement.execute("RESET app.is_platform_admin");
            statement.execute("RESET app.current_user_id");
            statement.execute("RESET app.current_tenant_id");

        } catch (SQLException e) {
            // Log but don't throw - connection pool will reset on next use
            log.debug("Failed to reset session variables (will be reset by connection pool): {}", e.getMessage());
        }
    }
}
