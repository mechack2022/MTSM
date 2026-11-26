package com.school.attendance.classmanagement.controller;

import com.school.attendance.classmanagement.dto.ClassArmResponse;
import com.school.attendance.classmanagement.dto.CreateClassArmRequest;
import com.school.attendance.classmanagement.dto.UpdateClassArmRequest;
import com.school.attendance.classmanagement.entity.ArmName;
import com.school.attendance.classmanagement.entity.ClassName;
import com.school.attendance.classmanagement.service.ClassArmService;
import com.school.attendance.common.exception.ErrorResponse;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.Staff;
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
@RequestMapping("/api/v1/class-arms")
@RequiredArgsConstructor
public class ClassArmController {

    private final ClassArmService classArmService;

    @PostMapping
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<?> createClassArm(
            @Valid @RequestBody CreateClassArmRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt,
            HttpServletRequest httpRequest) {
        log.info("Creating class arm - JWT claims: {}", jwt.getClaims());

        String schoolId = jwt.getClaimAsString("school_id");
        String tenantId = jwt.getClaimAsString("tenant_id");
        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject();
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

        ClassArmResponse response = classArmService.createClassArm(
                UUID.fromString(schoolId),
                UUID.fromString(tenantId),
                UUID.fromString(userId),
                request
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF')")
    public ResponseEntity<List<ClassArmResponse>> getAllClassArms(
            @RequestParam(required = false) String section,
            @RequestParam(required = false) UUID academicYearId,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<ClassArmResponse> classArms;
        if (section != null && academicYearId != null) {
            SchoolSection schoolSection = SchoolSection.valueOf(section);
            classArms = classArmService.getClassArmsBySchoolAndSection(UUID.fromString(schoolId), schoolSection)
                    .stream()
                    .filter(ca -> ca.getAcademicYearId() != null && ca.getAcademicYearId().equals(academicYearId))
                    .toList();
        } else if (section != null) {
            SchoolSection schoolSection = SchoolSection.valueOf(section);
            classArms = classArmService.getClassArmsBySchoolAndSection(UUID.fromString(schoolId), schoolSection);
        } else if (academicYearId != null) {
            classArms = classArmService.getClassArmsBySchoolAndAcademicYear(UUID.fromString(schoolId), academicYearId);
        } else {
            classArms = classArmService.getAllClassArmsBySchool(UUID.fromString(schoolId));
        }

        return ResponseEntity.ok(classArms);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF')")
    public ResponseEntity<ClassArmResponse> getClassArmById(
            @PathVariable UUID id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        ClassArmResponse classArm = classArmService.getClassArmById(id, UUID.fromString(schoolId));
        return ResponseEntity.ok(classArm);
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER', 'TEACHER', 'STAFF')")
    public ResponseEntity<List<ClassArmResponse>> searchClassArms(
            @RequestParam String q,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<ClassArmResponse> classArms = classArmService.searchClassArms(UUID.fromString(schoolId), q);
        return ResponseEntity.ok(classArms);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<ClassArmResponse> updateClassArm(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateClassArmRequest request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        String userId = jwt.getClaimAsString("user_id");
        if (userId == null) {
            userId = jwt.getSubject();
        }

        if (schoolId == null || userId == null) {
            return ResponseEntity.badRequest().build();
        }

        ClassArmResponse classArm = classArmService.updateClassArm(
                id,
                UUID.fromString(schoolId),
                UUID.fromString(userId),
                request
        );
        return ResponseEntity.ok(classArm);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL')")
    public ResponseEntity<Void> deleteClassArm(
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

        classArmService.deleteClassArm(id, UUID.fromString(schoolId), UUID.fromString(userId));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats/total-count")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<Long> getTotalClassArmsCount(
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        long count = classArmService.countClassArmsBySchool(UUID.fromString(schoolId));
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/count-by-section")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<Long> getClassArmsCountBySection(
            @RequestParam String section,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        SchoolSection schoolSection = SchoolSection.valueOf(section);
        long count = classArmService.countClassArmsBySchoolAndSection(UUID.fromString(schoolId), schoolSection);
        return ResponseEntity.ok(count);
    }

    /**
     * Get eligible staff for a specific school section
     * This endpoint returns staff members who can be assigned as lead caregivers:
     * - From the same school section
     * - Account activated (accountActivatedAt is not null)
     * - Email verified (via User entity)
     * - Employment status is ACTIVE or ON_LEAVE
     */
    @GetMapping("/eligible-staff")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<Staff>> getEligibleStaffForSection(
            @RequestParam String section,
            @org.springframework.security.core.annotation.AuthenticationPrincipal Jwt jwt) {
        String schoolId = jwt.getClaimAsString("school_id");
        if (schoolId == null) {
            return ResponseEntity.badRequest().build();
        }

        SchoolSection schoolSection = SchoolSection.valueOf(section);
        List<Staff> eligibleStaff = classArmService.getEligibleStaffForSection(
                UUID.fromString(schoolId),
                schoolSection
        );
        return ResponseEntity.ok(eligibleStaff);
    }

    /**
     * Get available class names for a specific school section
     * This endpoint returns the class name options (e.g., CRECHE, PRIMARY_1, JSS_1, SSS_1)
     * that can be used when creating a class arm for the given section
     */
    @GetMapping("/available-class-names")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<ClassName>> getAvailableClassNames(@RequestParam String section) {
        SchoolSection schoolSection = SchoolSection.valueOf(section);
        List<ClassName> classNames = ClassName.getClassNamesForSection(schoolSection);
        return ResponseEntity.ok(classNames);
    }

    /**
     * Get available arm names for a specific school section
     * This endpoint returns the arm name options (e.g., SUNSHINE, EMERALD, DIAMOND, TECH, BUSINESS)
     * that can be used when creating a class arm for the given section
     */
    @GetMapping("/available-arm-names")
    @PreAuthorize("hasAnyRole('SCHOOL_ADMIN', 'PRINCIPAL', 'HEAD_TEACHER')")
    public ResponseEntity<List<ArmName>> getAvailableArmNames(@RequestParam String section) {
        SchoolSection schoolSection = SchoolSection.valueOf(section);
        List<ArmName> armNames = ArmName.getArmNamesForSection(schoolSection);
        return ResponseEntity.ok(armNames);
    }
}
