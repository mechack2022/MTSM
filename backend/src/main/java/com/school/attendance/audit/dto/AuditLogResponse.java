package com.school.attendance.audit.dto;

import com.school.attendance.audit.enums.AuditLogCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogResponse {
    private UUID id;
    private String timestamp;
    private String date;
    private String userName;
    private String userRole;
    private String userInitials;
    private String avatarColor;
    private AuditLogCategory category;
    private String categoryDisplayName;
    private String categoryColor;
    private String eventTitle;
    private String eventDescription;
    private String affectedEntity;
    private String affectedEntityType;
    private String ipAddress;
    private String deviceInfo;
    private String geoLocation;
    private String changeFrom;
    private String changeTo;
    private String changeReason;
    private String verificationMethod;
    private LocalDateTime eventTimestamp;
    private String severity;
    private Boolean isSystemGenerated;
}
