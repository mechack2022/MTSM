package com.school.attendance.classmanagement.entity;

import com.school.attendance.user.entity.SchoolSection;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "class_arms", indexes = {
        @Index(name = "idx_class_arm_school_id", columnList = "school_id"),
        @Index(name = "idx_class_arm_tenant_id", columnList = "tenant_id"),
        @Index(name = "idx_class_arm_section", columnList = "school_section"),
        @Index(name = "idx_class_arm_class_name", columnList = "class_name"),
        @Index(name = "idx_class_arm_lead_caregiver", columnList = "lead_caregiver_id"),
        @Index(name = "idx_class_arm_academic_year", columnList = "academic_year_id"),
        @Index(name = "idx_class_arm_deleted_at", columnList = "deleted_at")
})
// Note: Uniqueness is enforced via partial indexes in the database migration
// (uk_class_arm_school_year_not_null and uk_class_arm_school_no_year)
// because we need to handle NULL academic_year_id correctly
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassArm {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Enumerated(EnumType.STRING)
    @Column(name = "school_section", nullable = false, length = 50)
    private SchoolSection schoolSection;

    @Enumerated(EnumType.STRING)
    @Column(name = "class_name", nullable = false, length = 100)
    private ClassName className; // e.g., CRECHE, PRIMARY_1, JSS_1, SSS_3

    @Enumerated(EnumType.STRING)
    @Column(name = "arm_name", nullable = false, length = 100)
    private ArmName armName; // e.g., SUNSHINE, EMERALD, RAINBOW

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName; // Computed: "Crèche Sunshine"

    @Column(name = "capacity", nullable = false)
    private Integer capacity; // Max 30

    @Column(name = "current_enrollment", nullable = false)
    private Integer currentEnrollment = 0;

    @Column(name = "lead_caregiver_id")
    private UUID leadCaregiverId; // FK to Staff

    @Column(name = "academic_year_id")
    private UUID academicYearId;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

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
        if (this.isActive == null) {
            this.isActive = true;
        }
        if (this.currentEnrollment == null) {
            this.currentEnrollment = 0;
        }
        // Auto-generate full name
        if (this.fullName == null && this.className != null && this.armName != null) {
            this.fullName = this.className.getDisplayName() + " " + this.armName.getDisplayName();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        // Update full name if class name or arm name changed
        if (this.className != null && this.armName != null) {
            this.fullName = this.className.getDisplayName() + " " + this.armName.getDisplayName();
        }
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }

    public void softDelete(UUID deletedBy) {
        this.deletedAt = LocalDateTime.now();
        this.updatedBy = deletedBy;
    }

    public boolean isFull() {
        return currentEnrollment >= capacity;
    }

    public int getAvailableCapacity() {
        return capacity - currentEnrollment;
    }
}
