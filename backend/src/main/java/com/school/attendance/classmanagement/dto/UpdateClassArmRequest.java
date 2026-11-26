package com.school.attendance.classmanagement.dto;

import com.school.attendance.classmanagement.entity.ArmName;
import com.school.attendance.classmanagement.entity.ClassName;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateClassArmRequest {

    private ClassName className;

    private ArmName armName;

    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 30, message = "Capacity cannot exceed 30 students")
    private Integer capacity;

    private UUID leadCaregiverId; // Can be set to null to unassign

    private Boolean isActive;
}
