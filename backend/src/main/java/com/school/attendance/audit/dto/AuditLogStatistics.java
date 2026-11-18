package com.school.attendance.audit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogStatistics {
    private long totalEvents;
    private long securityEvents;
    private long policyEvents;
    private long staffEvents;
    private long eventsThisWeek;
}
