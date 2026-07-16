package com.school.attendance.classsection.entity;

import com.school.attendance.common.entity.BaseAuditableEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "class_section")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class ClassSection extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "grade_level_id", nullable = false)
    private UUID gradeLevelId;

    @Column(name = "academic_year_id", nullable = false)
    private UUID academicYearId;

    @Column(name = "class_teacher_id")
    private UUID classTeacherId;

    @Column
    private Integer capacity;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

}