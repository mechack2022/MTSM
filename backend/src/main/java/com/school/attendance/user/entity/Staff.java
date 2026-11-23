package com.school.attendance.user.entity;

import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "staff", indexes = {
        @Index(name = "idx_staff_user_id", columnList = "user_id"),
        @Index(name = "idx_staff_school_id", columnList = "school_id"),
        @Index(name = "idx_staff_email", columnList = "email"),
        @Index(name = "idx_staff_number", columnList = "staff_number", unique = true),
        @Index(name = "idx_staff_section", columnList = "school_section"),
        @Index(name = "idx_staff_primary_role", columnList = "primary_role"),
        @Index(name = "idx_staff_employment_status", columnList = "employment_status"),
        @Index(name = "idx_staff_deleted_at", columnList = "deleted_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "staff_number", unique = true, length = 50)
    private String staffNumber;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "phone", length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "school_section", nullable = false, length = 50)
    private SchoolSection schoolSection;

    @Enumerated(EnumType.STRING)
    @Column(name = "primary_role", nullable = false, length = 100)
    private StaffRole primaryRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", length = 100)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(name = "highest_qualification", length = 100)
    private HighestQualification highestQualification;

    @Column(name = "trcn_license_number", length = 50)
    private String trcnLicenseNumber;

    @Column(name = "trcn_verified", nullable = false)
    private Boolean trcnVerified = false;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 20)
    private String gender;

    @Type(JsonBinaryType.class)
    @Column(name = "next_of_kin", columnDefinition = "jsonb")
    private NextOfKin nextOfKin;

    @Column(name = "employment_type", length = 50)
    private String employmentType;

    @Column(name = "employment_status", length = 50)
    private String employmentStatus;

    @Column(name = "date_of_employment")
    private LocalDate dateOfEmployment;

    @Column(name = "account_provisioned", nullable = false)
    private Boolean accountProvisioned = false;

    @Column(name = "invitation_sent_at")
    private LocalDateTime invitationSentAt;

    @Column(name = "invitation_accepted_at")
    private LocalDateTime invitationAcceptedAt;

    @Column(name = "account_activated_at")
    private LocalDateTime accountActivatedAt;

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
        if (this.trcnVerified == null) {
            this.trcnVerified = false;
        }
        if (this.accountProvisioned == null) {
            this.accountProvisioned = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }

    public void softDelete(UUID deletedBy) {
        this.deletedAt = LocalDateTime.now();
        this.updatedBy = deletedBy;
    }

    public boolean isActive() {
        return deletedAt == null && "ACTIVE".equals(employmentStatus);
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public boolean hasUserAccount() {
        return userId != null && accountProvisioned;
    }

    public boolean isPendingInvitation() {
        return userId == null && !accountProvisioned;
    }
}
