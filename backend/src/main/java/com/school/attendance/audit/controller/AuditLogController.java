package com.school.attendance.audit.controller;

import com.school.attendance.audit.dto.AuditLogResponse;
import com.school.attendance.audit.dto.AuditLogStatistics;
import com.school.attendance.audit.dto.CreateAuditLogRequest;
import com.school.attendance.audit.enums.AuditLogCategory;
import com.school.attendance.audit.service.AuditLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<Page<AuditLogResponse>> getAuditLogs(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) AuditLogCategory category,
            @RequestParam(required = false) UUID schoolId,
            @RequestParam(required = false) String severity,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        String tenantIdStr = jwt.getClaimAsString("tenant_id");
        if (tenantIdStr == null || tenantIdStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        UUID tenantId;
        try {
            tenantId = UUID.fromString(tenantIdStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Page<AuditLogResponse> auditLogs = auditLogService.getAuditLogs(
                tenantId, searchTerm, category, schoolId, severity, page, size);
        return ResponseEntity.ok(auditLogs);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<AuditLogStatistics> getStatistics(@AuthenticationPrincipal Jwt jwt) {
        String tenantIdStr = jwt.getClaimAsString("tenant_id");
        if (tenantIdStr == null || tenantIdStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        UUID tenantId;
        try {
            tenantId = UUID.fromString(tenantIdStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        AuditLogStatistics statistics = auditLogService.getStatistics(tenantId);
        return ResponseEntity.ok(statistics);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN')")
    public ResponseEntity<AuditLogResponse> createAuditLog(
            @Valid @RequestBody CreateAuditLogRequest request) {
        AuditLogResponse response = auditLogService.createAuditLog(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/date-range")
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogsByDateRange(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        String tenantIdStr = jwt.getClaimAsString("tenant_id");
        if (tenantIdStr == null || tenantIdStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        UUID tenantId;
        try {
            tenantId = UUID.fromString(tenantIdStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        List<AuditLogResponse> auditLogs = auditLogService.getAuditLogsByDateRange(
                tenantId, start, end);
        return ResponseEntity.ok(auditLogs);
    }
}
