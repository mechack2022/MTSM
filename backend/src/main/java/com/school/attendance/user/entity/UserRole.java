package com.school.attendance.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * User Role mapping entity for role-based access control.
 *
 * This entity maps users to roles within specific scopes:
 * - Tenant-level roles (e.g., TENANT_ADMIN scoped to a tenant)
 * - School-level roles (e.g., SCHOOL_ADMIN, TEACHER scoped to a school)
 *
 * Examples:
 * - User A as TENANT_ADMIN for Tenant X (tenantId = X, schoolId = null)
 * - User B as SCHOOL_ADMIN for School Y (tenantId = X, schoolId = Y)
 * - User C as TEACHER for School Z (tenantId = X, schoolId = Z)
 */
@Entity
@Table(name = "user_roles",
       uniqueConstraints = {
           @UniqueConstraint(name = "uk_user_role_scope",
                           columnNames = {"user_id", "role", "tenant_id", "school_id"})
       },
       indexes = {
           @Index(name = "idx_user_role_user_id", columnList = "user_id"),
           @Index(name = "idx_user_role_tenant_id", columnList = "tenant_id"),
           @Index(name = "idx_user_role_school_id", columnList = "school_id"),
           @Index(name = "idx_user_role_role", columnList = "role"),
           @Index(name = "idx_user_role_is_active", columnList = "is_active")
       })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    /**
     * Role name (e.g., TENANT_ADMIN, SCHOOL_ADMIN, TEACHER, STAFF)
     */
    @Column(name = "role", nullable = false, length = 50)
    private String role;

    /**
     * Tenant scope - set for all tenant-scoped users
     */
    @Column(name = "tenant_id")
    private UUID tenantId;

    /**
     * School scope - set for school-level roles (SCHOOL_ADMIN, TEACHER, etc.)
     * Null for tenant-level roles
     */
    @Column(name = "school_id")
    private UUID schoolId;

    /**
     * Whether this role assignment is currently active
     */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    /**
     * When this role was assigned to the user
     */
    @Column(name = "assigned_at", nullable = false)
    private LocalDateTime assignedAt;

    /**
     * Who assigned this role
     */
    @Column(name = "assigned_by")
    private UUID assignedBy;

    /**
     * When this role was revoked (if applicable)
     */
    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    /**
     * Who revoked this role
     */
    @Column(name = "revoked_by")
    private UUID revokedBy;

    // Audit fields
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.assignedAt == null) {
            this.assignedAt = now;
        }
        if (this.isActive == null) {
            this.isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Revoke this role assignment
     */
    public void revoke(UUID revokedBy) {
        this.isActive = false;
        this.revokedAt = LocalDateTime.now();
        this.revokedBy = revokedBy;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Check if this is a tenant-level role (no school scope)
     */
    public boolean isTenantLevel() {
        return tenantId != null && schoolId == null;
    }

    /**
     * Check if this is a school-level role
     */
    public boolean isSchoolLevel() {
        return schoolId != null;
    }
}
