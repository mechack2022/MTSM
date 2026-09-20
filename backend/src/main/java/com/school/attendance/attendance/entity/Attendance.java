package com.school.attendance.attendance.entity;

import com.school.attendance.common.entity.BaseAuditableEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "attendance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class Attendance extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "learner_id", nullable = false)
    private UUID learnerId;

    // ✅ NEW: Explicit class section reference
    @Column(name = "class_section_id", nullable = false)
    private UUID classSectionId;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "attendance_status_id", nullable = false)
    private UUID attendanceStatusId;

    @Column(name = "absence_reason_id")
    private UUID absenceReasonId;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "recorded_by")
    private UUID recordedBy;

    @Column(name = "recorded_at", nullable = false)
    private Instant recordedAt;

    // ✅ NEW: Server-side timestamp for when record was received
    @Builder.Default
    @Column(name = "server_received_at", nullable = false)
    private Instant serverReceivedAt = Instant.now();

    // ✅ NEW: Sync bookkeeping fields
    @Column(name = "change_id", nullable = false, unique = true)
    private UUID changeId;

    @Builder.Default
    @Column(name = "sync_status", nullable = false, length = 20)
    private String syncStatus = "PENDING";

    @Column(name = "source_device_id")
    private UUID sourceDeviceId;
}
