package com.school.attendance.school;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.school.dto.SchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/school")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;
    private final MessageResolver messageResolver;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<SchoolResponse>> getSchool(HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.SCHOOL_GET_SUCCESS), schoolService.getSchool(), req.getRequestURI())
        );
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SchoolResponse>> updateSchool(
            @Valid @RequestBody SchoolRequest request, HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200, messageResolver.getMessage(MessageKey.SCHOOL_UPDATE_SUCCESS), schoolService.updateSchool(request), req.getRequestURI())
        );
    }
}