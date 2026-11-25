package com.school.attendance.user.controller;

import com.school.attendance.common.exception.ErrorResponse;
import com.school.attendance.user.dto.CreateStaffRequest;
import com.school.attendance.user.dto.StaffResponse;
import com.school.attendance.user.dto.UpdateStaffRequest;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.StaffRole;
import com.school.attendance.user.service.StaffService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @PostMapping
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<?> createStaff(
            @Valid @RequestBody CreateStaffRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt,
            HttpServletRequest httpRequest) {
        log.info("Creating staff - JWT claims: {}", jwt.getClaims());

        String schoolId = jwt.getClaimAsString("school_id");
        String tenantId = jwt.getClaimAsString("tenant_id");
        // Try user_id first, fallback to sub (standard JWT claim for user ID)
        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject(); // Use 'sub' claim if 'user_id' not present
        }

        log.info("Extracted - schoolId: {}, tenantId: {}, userId: {}", schoolId, tenantId, userId);

        if (schoolId == null || tenantId == null || userId == null) {
            log.error("Missing required JWT claims - schoolId: {}, tenantId: {}, userId: {}",
                schoolId, tenantId, userId);
            ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Missing required JWT claims: school_id, tenant_id, or user_id/sub. Please ensure you're logged in with a school admin account.",
                httpRequest.getRequestURI()
            );
            return ResponseEntity.badRequest().body(error);
        }

        StaffResponse response = staffService.createStaff(
                UUID.fromString(schoolId),
                UUID.fromString(tenantId),
                UUID.fromString(userId),
                request
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF')")
    public ResponseEntity<List<StaffResponse>> getAllStaff(
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) Boolean activeOnly,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<StaffResponse> staff;
        if (section != null) {
            SchoolSection schoolSection = SchoolSection.valueOf(section);
            staff = staffService.getStaffBySchoolAndSection(UUID.fromString(schoolId), schoolSection);
        } else if (role != null) {
            StaffRole staffRole = StaffRole.valueOf(role);
            staff = staffService.getStaffBySchoolAndRole(UUID.fromString(schoolId), staffRole);
        } else if (Boolean.TRUE.equals(activeOnly)) {
            staff = staffService.getActiveStaffBySchool(UUID.fromString(schoolId));
        } else {
            staff = staffService.getAllStaffBySchool(UUID.fromString(schoolId));
        }

        return ResponseEntity.ok(staff);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF')")
    public ResponseEntity<StaffResponse> getStaffById(
            @PathVariable UUID id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        StaffResponse staff = staffService.getStaffById(id, UUID.fromString(schoolId));
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<StaffResponse>> searchStaff(
            @RequestParam String q,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<StaffResponse> staff = staffService.searchStaff(UUID.fromString(schoolId), q);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<StaffResponse> updateStaff(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateStaffRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject();
        }

        if (schoolId == null || userId == null) {
            return ResponseEntity.badRequest().build();
        }

        StaffResponse staff = staffService.updateStaff(
                id,
                UUID.fromString(schoolId),
                UUID.fromString(userId),
                request
        );
        return ResponseEntity.ok(staff);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL')")
    public ResponseEntity<Void> deleteStaff(
            @PathVariable UUID id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject();
        }

        if (schoolId == null || userId == null) {
            return ResponseEntity.badRequest().build();
        }

        staffService.deleteStaff(id, UUID.fromString(schoolId), UUID.fromString(userId));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pending-activation")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL')")
    public ResponseEntity<List<StaffResponse>> getPendingActivationStaff(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<StaffResponse> pendingStaff = staffService.getPendingActivationStaff(UUID.fromString(schoolId));
        return ResponseEntity.ok(pendingStaff);
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<StaffRole>> getRolesForSection(
            @RequestParam String section) {
        SchoolSection schoolSection = SchoolSection.valueOf(section);
        List<StaffRole> roles = staffService.getRolesForSection(schoolSection);
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/stats/total-count")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<Long> getTotalStaffCount(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        long count = staffService.countStaffBySchool(UUID.fromString(schoolId));
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/active-count")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<Long> getActiveStaffCount(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        long count = staffService.countActiveStaffBySchool(UUID.fromString(schoolId));
        return ResponseEntity.ok(count);
    }

    @PostMapping("/activate-account")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF', 'SUBJECT_TEACHER', 'CLASS_TEACHER')")
    public ResponseEntity<StaffResponse> activateAccount(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        log.info("Staff activation request - JWT claims: {}", jwt.getClaims());

        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject();
        }

        log.info("Activating staff account for userId: {}", userId);

        if (userId == null) {
            log.error("No user_id or sub claim found in JWT");
            return ResponseEntity.badRequest().build();
        }

        try {
            StaffResponse staff = staffService.activateStaffAccount(UUID.fromString(userId));
            log.info("Successfully activated staff account: {}", staff.getEmail());
            return ResponseEntity.ok(staff);
        } catch (Exception e) {
            log.error("Failed to activate staff account for userId {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
