package com.school.attendance.audit.mapper;

import com.school.attendance.audit.dto.AuditLogResponse;
import com.school.attendance.audit.dto.CreateAuditLogRequest;
import com.school.attendance.audit.entity.AuditLog;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class AuditLogMapper {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy");
    private static final List<String> AVATAR_COLORS = Arrays.asList(
        "bg-blue-600 text-white",
        "bg-purple-600 text-white",
        "bg-teal-600 text-white",
        "bg-indigo-600 text-white",
        "bg-green-600 text-white",
        "bg-red-600 text-white"
    );

    public AuditLogResponse toResponse(AuditLog entity) {
        if (entity == null) {
            return null;
        }

        String initials = getInitials(entity.getUserName());
        String avatarColor = entity.getIsSystemGenerated()
            ? "bg-gray-200 text-gray-600"
            : AVATAR_COLORS.get(Math.abs(entity.getUserName().hashCode()) % AVATAR_COLORS.size());

        return AuditLogResponse.builder()
                .id(entity.getId())
                .timestamp(formatTimestamp(entity.getEventTimestamp()))
                .date(entity.getEventTimestamp().format(DATE_FORMATTER))
                .userName(entity.getUserName())
                .userRole(entity.getUserRole())
                .userInitials(initials)
                .avatarColor(avatarColor)
                .category(entity.getCategory())
                .categoryDisplayName(entity.getCategory().getDisplayName())
                .categoryColor(entity.getCategory().getColorClass())
                .eventTitle(entity.getEventTitle())
                .eventDescription(entity.getEventDescription())
                .affectedEntity(entity.getAffectedEntity())
                .affectedEntityType(entity.getAffectedEntityType())
                .ipAddress(entity.getIpAddress())
                .deviceInfo(entity.getDeviceInfo())
                .geoLocation(entity.getGeoLocation())
                .changeFrom(entity.getChangeFrom())
                .changeTo(entity.getChangeTo())
                .changeReason(entity.getChangeReason())
                .verificationMethod(entity.getVerificationMethod())
                .eventTimestamp(entity.getEventTimestamp())
                .severity(entity.getSeverity())
                .isSystemGenerated(entity.getIsSystemGenerated())
                .build();
    }

    public AuditLog toEntity(CreateAuditLogRequest request) {
        if (request == null) {
            return null;
        }

        return AuditLog.builder()
                .tenantId(request.getTenantId())
                .schoolId(request.getSchoolId())
                .userId(request.getUserId())
                .userName(request.getUserName())
                .userRole(request.getUserRole())
                .category(request.getCategory())
                .eventTitle(request.getEventTitle())
                .eventDescription(request.getEventDescription())
                .affectedEntity(request.getAffectedEntity())
                .affectedEntityType(request.getAffectedEntityType())
                .affectedEntityId(request.getAffectedEntityId())
                .ipAddress(request.getIpAddress())
                .deviceInfo(request.getDeviceInfo())
                .geoLocation(request.getGeoLocation())
                .changeFrom(request.getChangeFrom())
                .changeTo(request.getChangeTo())
                .changeReason(request.getChangeReason())
                .verificationMethod(request.getVerificationMethod())
                .severity(request.getSeverity())
                .isSystemGenerated(request.getIsSystemGenerated() != null ? request.getIsSystemGenerated() : false)
                .metadata(request.getMetadata())
                .build();
    }

    private String getInitials(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "";
        }

        String[] parts = name.trim().split("\\s+");
        if (parts.length == 1) {
            return parts[0].substring(0, Math.min(2, parts[0].length())).toUpperCase();
        }

        return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
    }

    private String formatTimestamp(java.time.LocalDateTime timestamp) {
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate yesterday = today.minusDays(1);
        java.time.LocalDate logDate = timestamp.toLocalDate();

        if (logDate.equals(today)) {
            return "Today, " + timestamp.format(TIME_FORMATTER);
        } else if (logDate.equals(yesterday)) {
            return "Yesterday, " + timestamp.format(TIME_FORMATTER);
        } else {
            return timestamp.format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"));
        }
    }
}
