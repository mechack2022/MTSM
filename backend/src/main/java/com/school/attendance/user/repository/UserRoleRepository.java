package com.school.attendance.user.repository;

import com.school.attendance.user.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for UserRole mapping entity.
 * Provides query methods for role-based access control.
 */
@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {

    /**
     * Find all roles for a user
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId")
    List<UserRole> findByUserId(@Param("userId") UUID userId);

    /**
     * Find all active roles for a user
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.isActive = true")
    List<UserRole> findActiveByUserId(@Param("userId") UUID userId);

    /**
     * Find a specific role for a user
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.isActive = true")
    Optional<UserRole> findByUserIdAndRole(@Param("userId") UUID userId, @Param("role") String role);

    /**
     * Find all roles for a user within a specific tenant
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.tenantId = :tenantId AND ur.isActive = true")
    List<UserRole> findByUserIdAndTenantId(@Param("userId") UUID userId, @Param("tenantId") UUID tenantId);

    /**
     * Find all roles for a user within a specific school
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.schoolId = :schoolId AND ur.isActive = true")
    List<UserRole> findByUserIdAndSchoolId(@Param("userId") UUID userId, @Param("schoolId") UUID schoolId);

    /**
     * Find a specific role for a user in a tenant context
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.tenantId = :tenantId AND ur.schoolId IS NULL AND ur.isActive = true")
    Optional<UserRole> findTenantRole(@Param("userId") UUID userId, @Param("role") String role, @Param("tenantId") UUID tenantId);

    /**
     * Find a specific role for a user in a school context
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.schoolId = :schoolId AND ur.isActive = true")
    Optional<UserRole> findSchoolRole(@Param("userId") UUID userId, @Param("role") String role, @Param("schoolId") UUID schoolId);

    /**
     * Check if a user has a specific role (any context)
     */
    @Query("SELECT COUNT(ur) > 0 FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.isActive = true")
    boolean hasRole(@Param("userId") UUID userId, @Param("role") String role);

    /**
     * Check if a user has a specific role in a tenant
     */
    @Query("SELECT COUNT(ur) > 0 FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.tenantId = :tenantId AND ur.isActive = true")
    boolean hasTenantRole(@Param("userId") UUID userId, @Param("role") String role, @Param("tenantId") UUID tenantId);

    /**
     * Check if a user has a specific role in a school
     */
    @Query("SELECT COUNT(ur) > 0 FROM UserRole ur WHERE ur.userId = :userId AND ur.role = :role AND ur.schoolId = :schoolId AND ur.isActive = true")
    boolean hasSchoolRole(@Param("userId") UUID userId, @Param("role") String role, @Param("schoolId") UUID schoolId);

    /**
     * Find all users with a specific role in a tenant
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.role = :role AND ur.tenantId = :tenantId AND ur.schoolId IS NULL AND ur.isActive = true")
    List<UserRole> findTenantRoleAssignments(@Param("role") String role, @Param("tenantId") UUID tenantId);

    /**
     * Find all users with a specific role in a school
     */
    @Query("SELECT ur FROM UserRole ur WHERE ur.role = :role AND ur.schoolId = :schoolId AND ur.isActive = true")
    List<UserRole> findSchoolRoleAssignments(@Param("role") String role, @Param("schoolId") UUID schoolId);

    /**
     * Count active roles for a user
     */
    @Query("SELECT COUNT(ur) FROM UserRole ur WHERE ur.userId = :userId AND ur.isActive = true")
    long countActiveRolesByUserId(@Param("userId") UUID userId);

    /**
     * Delete (revoke) all roles for a user
     */
    @Query("UPDATE UserRole ur SET ur.isActive = false, ur.revokedAt = CURRENT_TIMESTAMP, ur.revokedBy = :revokedBy WHERE ur.userId = :userId AND ur.isActive = true")
    void revokeAllUserRoles(@Param("userId") UUID userId, @Param("revokedBy") UUID revokedBy);
}
