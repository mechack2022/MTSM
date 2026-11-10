package com.school.attendance.school.controller;

import com.school.attendance.school.dto.CreateSchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.dto.UpdateSchoolRequest;
import com.school.attendance.school.service.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @PostMapping
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<SchoolResponse> createSchool(
            @Valid @RequestBody CreateSchoolRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SchoolResponse response = schoolService.createSchool(UUID.fromString(tenantId), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<SchoolResponse>> getAllSchools(
            @RequestParam(required = false) Boolean activeOnly,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        List<SchoolResponse> schools = Boolean.TRUE.equals(activeOnly)
                ? schoolService.getAllActiveSchoolsByTenant(UUID.fromString(tenantId))
                : schoolService.getAllSchoolsByTenant(UUID.fromString(tenantId));
        return ResponseEntity.ok(schools);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<SchoolResponse> getSchoolById(
            @PathVariable UUID id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SchoolResponse school = schoolService.getSchoolById(id, UUID.fromString(tenantId));
        return ResponseEntity.ok(school);
    }

    @GetMapping("/code/{code}")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<SchoolResponse> getSchoolByCampusCode(
            @PathVariable String code,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SchoolResponse school = schoolService.getSchoolByCampusCode(code, UUID.fromString(tenantId));
        return ResponseEntity.ok(school);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN')")
    public ResponseEntity<SchoolResponse> updateSchool(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSchoolRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        SchoolResponse school = schoolService.updateSchool(id, UUID.fromString(tenantId), request);
        return ResponseEntity.ok(school);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<Void> deleteSchool(
            @PathVariable UUID id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        schoolService.deleteSchool(id, UUID.fromString(tenantId));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<SchoolResponse>> searchSchools(
            @RequestParam String q,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        List<SchoolResponse> schools = schoolService.searchSchools(UUID.fromString(tenantId), q);
        return ResponseEntity.ok(schools);
    }

    @GetMapping("/stats/active-count")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN')")
    public ResponseEntity<Long> getActiveSchoolCount(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        long count = schoolService.countActiveSchools(UUID.fromString(tenantId));
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/total-students")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN')")
    public ResponseEntity<Integer> getTotalStudents(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        int total = schoolService.sumCurrentStudents(UUID.fromString(tenantId));
        return ResponseEntity.ok(total);
    }

    @GetMapping("/stats/total-teachers")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN')")
    public ResponseEntity<Integer> getTotalTeachers(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String tenantId = jwt.getClaimAsString("tenant_id");
        if (tenantId == null || tenantId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        int total = schoolService.sumCurrentTeachers(UUID.fromString(tenantId));
        return ResponseEntity.ok(total);
    }
}
