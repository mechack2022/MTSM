package com.school.attendance.enrollment;
//
//import com.school.attendance.common.entity.BaseAuditableEntity;
//import jakarta.persistence.*;
//import lombok.*;
//import lombok.experimental.SuperBuilder;
//
//import java.time.LocalDate;
//import java.util.UUID;
//
//@Entity
//@Table(name = "enrollment")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@SuperBuilder
//@EqualsAndHashCode(callSuper = true)
//public class Enrollment extends BaseAuditableEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @Column(name = "learner_id", nullable = false)
//    private UUID learnerId;
//
//    @Column(name = "class_section_id", nullable = false)
//    private UUID classSectionId;
//
//    @Column(name = "academic_year_id", nullable = false)
//    private UUID academicYearId;
//
//    @Column(name = "enrollment_date", nullable = false)
//    private LocalDate enrollmentDate;
//
//    @Column(name = "withdrawal_date")
//    private LocalDate withdrawalDate;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "status", nullable = false, length = 20)
//    private EnrollmentStatus status;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "enrollment_type", nullable = false, length = 20)
//    private EnrollmentType enrollmentType;
//}


import com.school.attendance.common.entity.BaseAuditableEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "enrollment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class Enrollment extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "learner_id", nullable = false)
    private UUID learnerId;

    @Column(name = "class_section_id", nullable = false)
    private UUID classSectionId;

    @Column(name = "academic_year_id", nullable = false)
    private UUID academicYearId;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    @Column(name = "withdrawal_date")
    private LocalDate withdrawalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private EnrollmentStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "enrollment_type", nullable = false, length = 20)
    private EnrollmentType enrollmentType;

    // ✅ NEW: Sync bookkeeping fields
    @Column(name = "change_id", unique = true)
    private UUID changeId;

    @Builder.Default
    @Column(name = "sync_status", nullable = false, length = 20)
    private String syncStatus = "SYNCED";

    @Column(name = "source_device_id")
    private UUID sourceDeviceId;
}