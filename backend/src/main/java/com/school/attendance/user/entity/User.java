package com.school.attendance.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Unified User entity to consolidate all user types in the system.
 * Replaces scattered user data across Tenant, School, AppUser, and PlatformAdmin tables.
 *
 * This entity stores:
 * - Tenant administrators (referenced by Tenant entity)
 * - School administrators (referenced by School entity)
 * - Platform administrators
 * - Staff, teachers, and other user types
 */
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_user_email", columnList = "email", unique = true),
        @Index(name = "idx_user_keycloak_id", columnList = "keycloak_id", unique = true),
        @Index(name = "idx_user_phone", columnList = "phone", unique = true),
        @Index(name = "idx_user_tenant_id", columnList = "tenant_id"),
        @Index(name = "idx_user_deleted_at", columnList = "deleted_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "phone", unique = true, length = 20)
    private String phone;

    /**
     * Link to Keycloak user ID for authentication
     */
    @Column(name = "keycloak_id", unique = true, length = 100)
    private String keycloakId;

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    /**
     * Tenant scope - null for platform admins, set for tenant-scoped users
     */
    @Column(name = "tenant_id")
    private UUID tenantId;

    /**
     * Flag to identify platform administrators (super admins)
     */
    @Column(name = "is_platform_admin", nullable = false)
    private Boolean isPlatformAdmin = false;

    // Audit fields
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "updated_by")
    private UUID updatedBy;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.emailVerified == null) {
            this.emailVerified = false;
        }
        if (this.isPlatformAdmin == null) {
            this.isPlatformAdmin = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Get user's full name, falling back to email if name not set
     */
    public String getFullName() {
        if (firstName == null && lastName == null) {
            return email;
        }
        if (firstName == null) {
            return lastName;
        }
        if (lastName == null) {
            return firstName;
        }
        return firstName + " " + lastName;
    }

    /**
     * Check if user is soft-deleted
     */
    public boolean isDeleted() {
        return deletedAt != null;
    }

    /**
     * Check if user is active (not deleted and email verified)
     */
    public boolean isActive() {
        return deletedAt == null && emailVerified;
    }

    /**
     * Soft delete this user
     */
    public void softDelete(UUID deletedBy) {
        this.deletedAt = LocalDateTime.now();
        this.updatedBy = deletedBy;
    }
}
