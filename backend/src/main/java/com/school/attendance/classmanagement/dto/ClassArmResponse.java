package com.school.attendance.classmanagement.dto;

import com.school.attendance.classmanagement.entity.ArmName;
import com.school.attendance.classmanagement.entity.ClassName;
import com.school.attendance.user.entity.SchoolSection;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassArmResponse {

    private UUID id;
    private UUID tenantId;
    private UUID schoolId;

    private SchoolSection schoolSection;
    private String schoolSectionDisplay;

    private ClassName className;
    private String classNameDisplay;
    private ArmName armName;
    private String armNameDisplay;
    private String fullName;

    private Integer capacity;
    private Integer currentEnrollment;
    private Integer availableCapacity;
    private Boolean isFull;

    private UUID leadCaregiverId;
    private String leadCaregiverName;
    private String leadCaregiverEmail;

    private UUID academicYearId;
    private String academicYearDisplay;

    private Boolean isActive;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private UUID createdBy;
    private UUID updatedBy;
}
