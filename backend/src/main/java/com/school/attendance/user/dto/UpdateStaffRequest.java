package com.school.attendance.user.dto;

import com.school.attendance.common.validation.AgeRange;
import com.school.attendance.user.entity.Department;
import com.school.attendance.user.entity.HighestQualification;
import com.school.attendance.user.entity.NextOfKin;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.StaffRole;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateStaffRequest {

    @Email(message = "Invalid email format")
    private String email;

    private String firstName;

    private String lastName;

    @Pattern(regexp = "^[0-9+\\-() ]*$", message = "Invalid phone number format")
    private String phone;

    private SchoolSection schoolSection;

    private StaffRole primaryRole;

    private Department department;

    private HighestQualification highestQualification;

    private String trcnLicenseNumber;

    private Boolean trcnVerified;

    @Past(message = "Date of birth must be in the past")
    @AgeRange(min = 18, max = 70, message = "Staff member must be between 18 and 70 years old")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^(MALE|FEMALE|OTHER)$", message = "Gender must be MALE, FEMALE, or OTHER")
    private String gender;

    private NextOfKin nextOfKin;

    @Pattern(regexp = "^(FULL_TIME|PART_TIME|CONTRACT|TEMPORARY)$",
             message = "Employment type must be FULL_TIME, PART_TIME, CONTRACT, or TEMPORARY")
    private String employmentType;

    @Pattern(regexp = "^(ACTIVE|INACTIVE|SUSPENDED|TERMINATED|ON_LEAVE)$",
             message = "Invalid employment status")
    private String employmentStatus;
}
