package com.school.attendance.audit.entity;

import com.school.attendance.audit.enums.AuditLogCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs", indexes = {
        @Index(name = "idx_audit_log_tenant_id", columnList = "tenant_id"),
        @Index(name = "idx_audit_log_category", columnList = "category"),
        @Index(name = "idx_audit_log_timestamp", columnList = "event_timestamp"),
        @Index(name = "idx_audit_log_user_id", columnList = "user_id"),
        @Index(name = "idx_audit_log_school_id", columnList = "school_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "school_id")
    private UUID schoolId;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "user_name", nullable = false, length = 255, columnDefinition = "VARCHAR(255)")
    private String userName;

    @Column(name = "user_role", nullable = false, length = 100, columnDefinition = "VARCHAR(100)")
    private String userRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 50)
    private AuditLogCategory category;

    @Column(name = "event_title", nullable = false, length = 500, columnDefinition = "VARCHAR(500)")
    private String eventTitle;

    @Column(name = "event_description", columnDefinition = "TEXT")
    private String eventDescription;

    @Column(name = "affected_entity", length = 500)
    private String affectedEntity;

    @Column(name = "affected_entity_type", length = 50)
    private String affectedEntityType;

    @Column(name = "affected_entity_id")
    private UUID affectedEntityId;

    @Column(name = "ip_address", length = 45, columnDefinition = "VARCHAR(45)")
    private String ipAddress;

    @Column(name = "device_info", length = 500)
    private String deviceInfo;

    @Column(name = "geo_location", length = 255)
    private String geoLocation;

    @Column(name = "change_from", columnDefinition = "TEXT")
    private String changeFrom;

    @Column(name = "change_to", columnDefinition = "TEXT")
    private String changeTo;

    @Column(name = "change_reason", columnDefinition = "TEXT")
    private String changeReason;

    @Column(name = "verification_method", length = 255)
    private String verificationMethod;

    @Column(name = "event_timestamp", nullable = false)
    private LocalDateTime eventTimestamp;

    @Column(name = "severity", length = 20)
    private String severity;

    @Column(name = "is_system_generated", nullable = false)
    private Boolean isSystemGenerated = false;

    @Column(name = "metadata", columnDefinition = "JSONB")
    private String metadata;

    @Column(name = "integrity_hash", length = 128)
    private String integrityHash;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "updated_by")
    private UUID updatedBy;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;

        if (eventTimestamp == null) {
            eventTimestamp = now;
        }
        if (severity == null) {
            severity = "INFO";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
