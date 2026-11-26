package com.school.attendance.classmanagement.dto;

import com.school.attendance.classmanagement.entity.ArmName;
import com.school.attendance.classmanagement.entity.ClassName;
import com.school.attendance.user.entity.SchoolSection;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateClassArmRequest {

    @NotNull(message = "School section is required")
    private SchoolSection schoolSection;

    @NotNull(message = "Class name is required")
    private ClassName className; // e.g., CRECHE, PRIMARY_1, JSS_1

    @NotNull(message = "Arm name is required")
    private ArmName armName; // e.g., SUNSHINE, EMERALD, RAINBOW

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 30, message = "Capacity cannot exceed 30 students")
    private Integer capacity;

    private UUID leadCaregiverId; // Optional - can be assigned later

    private UUID academicYearId; // Optional - defaults to current academic year

    @Builder.Default
    private Boolean isActive = true;
}
