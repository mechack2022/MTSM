package com.school.attendance.user.repository;

import com.school.attendance.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for unified User entity.
 * Provides query methods for all user types in the system.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Find user by email address
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by Keycloak ID
     */
    Optional<User> findByKeycloakId(String keycloakId);

    /**
     * Check if a user with the given email exists
     */
    boolean existsByEmail(String email);

    /**
     * Check if a user with the given Keycloak ID exists
     */
    boolean existsByKeycloakId(String keycloakId);

    /**
     * Find all users for a specific tenant (excluding soft-deleted)
     */
    @Query("SELECT u FROM User u WHERE u.tenantId = :tenantId AND u.deletedAt IS NULL")
    List<User> findByTenantId(@Param("tenantId") UUID tenantId);

    /**
     * Find all active users (email verified and not deleted)
     */
    @Query("SELECT u FROM User u WHERE u.emailVerified = true AND u.deletedAt IS NULL")
    List<User> findAllActiveUsers();

    /**
     * Find all platform administrators
     */
    @Query("SELECT u FROM User u WHERE u.isPlatformAdmin = true AND u.deletedAt IS NULL")
    List<User> findAllPlatformAdmins();

    /**
     * Get all user emails (for Keycloak synchronization)
     * This returns emails from ALL user types to prevent accidental deletion
     */
    @Query("SELECT u.email FROM User u WHERE u.deletedAt IS NULL")
    List<String> findAllEmails();

    /**
     * Find user by email (ignoring soft-deleted users)
     */
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deletedAt IS NULL")
    Optional<User> findActiveByEmail(@Param("email") String email);

    /**
     * Find user by Keycloak ID (ignoring soft-deleted users)
     */
    @Query("SELECT u FROM User u WHERE u.keycloakId = :keycloakId AND u.deletedAt IS NULL")
    Optional<User> findActiveByKeycloakId(@Param("keycloakId") String keycloakId);

    /**
     * Count total users in a tenant
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.tenantId = :tenantId AND u.deletedAt IS NULL")
    long countByTenantId(@Param("tenantId") UUID tenantId);

    /**
     * Find users with unverified emails
     */
    @Query("SELECT u FROM User u WHERE u.emailVerified = false AND u.deletedAt IS NULL")
    List<User> findAllUnverifiedUsers();

    /**
     * Find user by phone number
     */
    Optional<User> findByPhone(String phone);

    /**
     * Check if a user with the given phone exists
     */
    boolean existsByPhone(String phone);
}
