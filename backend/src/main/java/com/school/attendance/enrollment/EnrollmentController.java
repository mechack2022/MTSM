package com.school.attendance.enrollment;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.enrollment.dto.EnrollLearnerRequest;
import com.school.attendance.enrollment.dto.EnrollmentResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> enrollLearner(
            @Valid @RequestBody EnrollLearnerRequest request, HttpServletRequest req) {
        return ResponseEntity.status(201).body(
                ApiResponse.success(201, messageResolver.getMessage(MessageKey.ENROLLMENT_CREATE_SUCCESS),
                        enrollmentService.enrollLearner(request), req.getRequestURI())
        );
    }

    @GetMapping("/class/{classSectionId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getEnrollmentsByClass(
            @PathVariable UUID classSectionId, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.ENROLLMENT_LIST_SUCCESS),
                        enrollmentService.getEnrollmentsByClass(classSectionId), req.getRequestURI())
        );
    }

    @GetMapping("/learner/{learnerId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getEnrollmentsByLearner(
            @PathVariable UUID learnerId, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.ENROLLMENT_LIST_SUCCESS),
                        enrollmentService.getEnrollmentsByLearner(learnerId), req.getRequestURI())
        );
    }

    @GetMapping("/academic-year/{academicYearId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getEnrollmentsByAcademicYear(
            @PathVariable UUID academicYearId, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.ENROLLMENT_LIST_SUCCESS),
                        enrollmentService.getEnrollmentsByAcademicYear(academicYearId), req.getRequestURI())
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> getEnrollmentById(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.ENROLLMENT_GET_SUCCESS),
                        enrollmentService.getEnrollmentById(id), req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/withdraw")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> withdrawLearner(
            @PathVariable UUID id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate withdrawalDate,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.ENROLLMENT_WITHDRAW_SUCCESS),
                        enrollmentService.withdrawLearner(id, withdrawalDate), req.getRequestURI())
        );
    }
}