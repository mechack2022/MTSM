package com.school.attendance.audit.service;

import com.school.attendance.audit.dto.AuditLogResponse;
import com.school.attendance.audit.dto.AuditLogStatistics;
import com.school.attendance.audit.dto.CreateAuditLogRequest;
import com.school.attendance.audit.entity.AuditLog;
import com.school.attendance.audit.enums.AuditLogCategory;
import com.school.attendance.audit.mapper.AuditLogMapper;
import com.school.attendance.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    public Page<AuditLogResponse> getAuditLogs(
            UUID tenantId,
            String searchTerm,
            AuditLogCategory category,
            UUID schoolId,
            String severity,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<AuditLog> auditLogs = auditLogRepository.searchAuditLogs(
                tenantId,
                searchTerm,
                category,
                schoolId,
                severity,
                pageable
        );

        return auditLogs.map(auditLogMapper::toResponse);
    }

    public AuditLogStatistics getStatistics(UUID tenantId) {
        LocalDateTime weekAgo = LocalDateTime.now().minusWeeks(1);

        long totalEvents = auditLogRepository.countByTenantId(tenantId);
        long securityEvents = countByCategories(tenantId,
                AuditLogCategory.SECURITY_AUTH,
                AuditLogCategory.LOGIN_SUCCESS,
                AuditLogCategory.LOGIN_FAILURE,
                AuditLogCategory.TWO_FACTOR_AUTH);

        long policyEvents = countByCategories(tenantId,
                AuditLogCategory.POLICY_UPDATE,
                AuditLogCategory.POLICY_SYNC,
                AuditLogCategory.ACADEMIC_CALENDAR);

        long staffEvents = countByCategories(tenantId,
                AuditLogCategory.STAFF_MANDATE,
                AuditLogCategory.STAFF_APPOINTMENT,
                AuditLogCategory.STAFF_TERMINATION);

        long eventsThisWeek = auditLogRepository.countByTenantIdAndEventTimestampAfter(tenantId, weekAgo);

        return AuditLogStatistics.builder()
                .totalEvents(totalEvents)
                .securityEvents(securityEvents)
                .policyEvents(policyEvents)
                .staffEvents(staffEvents)
                .eventsThisWeek(eventsThisWeek)
                .build();
    }

    @Transactional
    public AuditLogResponse createAuditLog(CreateAuditLogRequest request) {
        AuditLog auditLog = auditLogMapper.toEntity(request);
        AuditLog saved = auditLogRepository.save(auditLog);
        return auditLogMapper.toResponse(saved);
    }

    public List<AuditLogResponse> getAuditLogsByDateRange(
            UUID tenantId,
            LocalDateTime start,
            LocalDateTime end) {

        return auditLogRepository
                .findByTenantIdAndEventTimestampBetweenOrderByEventTimestampDesc(tenantId, start, end)
                .stream()
                .map(auditLogMapper::toResponse)
                .collect(Collectors.toList());
    }

    private long countByCategories(UUID tenantId, AuditLogCategory... categories) {
        long count = 0;
        for (AuditLogCategory category : categories) {
            count += auditLogRepository.countByTenantIdAndCategory(tenantId, category);
        }
        return count;
    }
}
