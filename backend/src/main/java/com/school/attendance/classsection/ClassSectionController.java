package com.school.attendance.classsection;

import com.school.attendance.classsection.dto.ClassSectionRequest;
import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/classes")
@RequiredArgsConstructor
public class ClassSectionController {

    private final ClassSectionService classSectionService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasAuthority('CLASS_CREATE')")
    public ResponseEntity<ApiResponse<ClassSectionResponse>> createClassSection(
            @Valid @RequestBody ClassSectionRequest request, HttpServletRequest req) {
        return ResponseEntity.status(201).body(
                ApiResponse.success(
                        201,
                        messageResolver.getMessage(MessageKey.CLASS_CREATE_SUCCESS),
                        classSectionService.createClassSection(request),
                        req.getRequestURI())
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('CLASS_READ')")
    public ResponseEntity<ApiResponse<ClassSectionResponse>> getClassSectionById(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.CLASS_GET_SUCCESS), classSectionService.getClassSectionById(id), req.getRequestURI())
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('CLASS_UPDATE')")
    public ResponseEntity<ApiResponse<ClassSectionResponse>> updateClassSection(
            @PathVariable UUID id, @Valid @RequestBody ClassSectionRequest request, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.CLASS_UPDATE_SUCCESS), classSectionService.updateClassSection(id, request), req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAuthority('CLASS_DEACTIVATE')")
    public ResponseEntity<ApiResponse<ClassSectionResponse>> deactivateClassSection(
            @PathVariable UUID id, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.CLASS_DEACTIVATE_SUCCESS), classSectionService.deactivateClassSection(id), req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAuthority('CLASS_DEACTIVATE')")
    public ResponseEntity<ApiResponse<ClassSectionResponse>> activateClassSection(
            @PathVariable UUID id, HttpServletRequest req) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CLASS_ACTIVATE_SUCCESS),
                        classSectionService.activateClassSection(id),
                        req.getRequestURI()
                )
        );
    }


    @GetMapping
    @PreAuthorize("hasAuthority('CLASS_READ')")
    public ResponseEntity<ApiResponse<List<ClassSectionResponse>>> getAllClasses(
            @RequestParam(required = false) UUID academicYearId,
            @RequestParam(required = false) UUID gradeLevelId,
            @RequestParam(required = false) UUID schoolId,
            HttpServletRequest req) {

        List<ClassSectionResponse> classes;

        if (academicYearId != null) {
            classes = classSectionService.getClassesByAcademicYear(academicYearId, schoolId);
        } else if (gradeLevelId != null) {
            classes = classSectionService.getClassesByGradeLevel(gradeLevelId, schoolId);
        } else {
            classes = classSectionService.getAllActiveClasses();
        }

        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.CLASS_LIST_SUCCESS), classes, req.getRequestURI())
        );
    }
}
