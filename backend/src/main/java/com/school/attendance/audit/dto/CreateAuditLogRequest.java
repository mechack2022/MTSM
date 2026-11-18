package com.school.attendance.audit.dto;

import com.school.attendance.audit.enums.AuditLogCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateAuditLogRequest {

    @NotNull
    private UUID tenantId;

    private UUID schoolId;
    private UUID userId;

    @NotBlank
    private String userName;

    @NotBlank
    private String userRole;

    @NotNull
    private AuditLogCategory category;

    @NotBlank
    private String eventTitle;

    private String eventDescription;
    private String affectedEntity;
    private String affectedEntityType;
    private UUID affectedEntityId;
    private String ipAddress;
    private String deviceInfo;
    private String geoLocation;
    private String changeFrom;
    private String changeTo;
    private String changeReason;
    private String verificationMethod;
    private String severity;
    private Boolean isSystemGenerated;
    private String metadata;
}
