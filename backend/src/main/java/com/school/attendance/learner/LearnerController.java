package com.school.attendance.learner;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.learner.dto.CreateLearnerRequest;
import com.school.attendance.learner.dto.LearnerResponse;
import com.school.attendance.learner.dto.UpdateLearnerRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/learners")
@RequiredArgsConstructor
public class LearnerController {

    private final LearnerService learnerService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<LearnerResponse>> createLearner(
            @Valid @RequestBody CreateLearnerRequest request, HttpServletRequest req) {
        return ResponseEntity.status(201).body(
                ApiResponse.success(201, messageResolver.getMessage(MessageKey.LEARNER_CREATE_SUCCESS),
                        learnerService.createLearner(request), req.getRequestURI())
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<List<LearnerResponse>>> getAllLearners(
            @RequestParam(required = false) UUID gradeLevelId, HttpServletRequest req) {

        List<LearnerResponse> learners = (gradeLevelId != null)
                ? learnerService.getLearnersByGradeLevel(gradeLevelId)
                : learnerService.getAllActiveLearners();

        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.LEARNER_LIST_SUCCESS),
                        learners, req.getRequestURI())
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<LearnerResponse>> getLearnerById(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.LEARNER_GET_SUCCESS),
                        learnerService.getLearnerById(id), req.getRequestURI())
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<LearnerResponse>> updateLearner(
            @PathVariable UUID id, @Valid @RequestBody UpdateLearnerRequest request, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.LEARNER_UPDATE_SUCCESS),
                        learnerService.updateLearner(id, request), req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<LearnerResponse>> deactivateLearner(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.LEARNER_DEACTIVATE_SUCCESS),
                        learnerService.deactivateLearner(id), req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER')")
    public ResponseEntity<ApiResponse<LearnerResponse>> activateLearner(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.LEARNER_ACTIVATE_SUCCESS),
                        learnerService.activateLearner(id), req.getRequestURI())
        );
    }
}