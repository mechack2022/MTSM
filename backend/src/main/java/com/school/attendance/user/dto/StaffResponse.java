package com.school.attendance.user.dto;

import com.school.attendance.user.entity.Department;
import com.school.attendance.user.entity.HighestQualification;
import com.school.attendance.user.entity.NextOfKin;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.StaffRole;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffResponse {

    private UUID id;
    private UUID userId;
    private UUID schoolId;
    private UUID tenantId;
    private String staffNumber;

    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;

    private SchoolSection schoolSection;
    private String schoolSectionDisplay;

    private StaffRole primaryRole;
    private String primaryRoleDisplay;

    private Department department;

    private HighestQualification highestQualification;

    private String trcnLicenseNumber;
    private Boolean trcnVerified;

    private LocalDate dateOfBirth;
    private String gender;

    private NextOfKin nextOfKin;

    private String employmentType;
    private String employmentStatus;
    private LocalDate dateOfEmployment;

    private Boolean accountProvisioned;
    private Boolean hasUserAccount;
    private Boolean isPendingInvitation;
    private LocalDateTime invitationSentAt;
    private LocalDateTime invitationAcceptedAt;
    private LocalDateTime accountActivatedAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private UUID createdBy;
    private UUID updatedBy;
}
