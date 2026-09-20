package com.school.attendance.school;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.school.dto.SchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.dto.UpdateSchoolRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasAuthority('SCHOOL_CREATE')")
    public ResponseEntity<ApiResponse<SchoolResponse>> createSchool(
            @Valid @RequestBody SchoolRequest request,
            @RequestParam(required = false) UUID tenantId,
            HttpServletRequest httpRequest) {
        SchoolResponse created = schoolService.createSchool(request, tenantId);
        return ResponseEntity.status(201).body(
                ApiResponse.success(
                        201,
                        messageResolver.getMessage(MessageKey.SCHOOL_CREATE_SUCCESS),
                        created,
                        httpRequest.getRequestURI()
                )
        );
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCHOOL_READ')")
    public ResponseEntity<ApiResponse<List<SchoolResponse>>> getAllSchools(HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.SCHOOL_LIST_SUCCESS),
                        schoolService.getAllSchools(),
                        req.getRequestURI()
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCHOOL_READ')")
    public ResponseEntity<ApiResponse<SchoolResponse>> getSchoolById(
            @PathVariable UUID id,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.SCHOOL_GET_SUCCESS),
                        schoolService.getSchoolById(id),
                        req.getRequestURI()
                )
        );
    }

    @GetMapping("/code/{code}")
    @PreAuthorize("hasAuthority('SCHOOL_READ')")
    public ResponseEntity<ApiResponse<SchoolResponse>> getSchoolByCode(
            @PathVariable String code,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.SCHOOL_GET_SUCCESS),
                        schoolService.getSchoolByCode(code),
                        req.getRequestURI()
                )
        );
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCHOOL_UPDATE')")
    public ResponseEntity<ApiResponse<SchoolResponse>> updateSchool(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSchoolRequest request,
            HttpServletRequest httpRequest) {

        SchoolResponse updated = schoolService.updateSchool(id, request);
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.SCHOOL_UPDATE_SUCCESS),
                        updated, httpRequest.getRequestURI())
        );
    }
}