package com.school.attendance.common.controller;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.common.dto.CodeSetRequest;
import com.school.attendance.common.dto.CodeSetResponse;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.service.CodeSetService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/code-sets")
@RequiredArgsConstructor
public class CodeSetController {

    private final CodeSetService codeSetService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CodeSetResponse>> createCodeSet(
            @Valid @RequestBody CodeSetRequest request,
            HttpServletRequest httpRequest) {

        CodeSetResponse created = codeSetService.createCodeSet(request);

        return ResponseEntity.status(201).body(
                ApiResponse.success(
                        201,
                        messageResolver.getMessage(MessageKey.CODESET_CREATE_SUCCESS),
                        created,
                        httpRequest.getRequestURI()
                )
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<List<CodeSetResponse>>> getActiveCodeSetsByGroup(
            @RequestParam CodeSetGroup group,
            @RequestParam(defaultValue = "false") boolean includeInactive,
            HttpServletRequest httpRequest) {

        List<CodeSetResponse> codeSets = includeInactive
                ? codeSetService.getAllCodeSetsByGroup(group)
                : codeSetService.getActiveCodeSetsByGroup(group);

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CODESET_LIST_SUCCESS),
                        codeSets,
                        httpRequest.getRequestURI()
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HEAD_TEACHER', 'TEACHER')")
    public ResponseEntity<ApiResponse<CodeSetResponse>> getCodeSetById(
            @PathVariable UUID id,
            HttpServletRequest httpRequest) {

        CodeSetResponse codeSet = codeSetService.getCodeSetById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CODESET_GET_SUCCESS),
                        codeSet,
                        httpRequest.getRequestURI()
                )
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CodeSetResponse>> updateCodeSet(
            @PathVariable UUID id,
            @Valid @RequestBody CodeSetRequest request,
            HttpServletRequest httpRequest) {

        CodeSetResponse updated = codeSetService.updateCodeSet(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CODESET_UPDATE_SUCCESS),
                        updated,
                        httpRequest.getRequestURI()
                )
        );
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CodeSetResponse>> deactivateCodeSet(
            @PathVariable UUID id,
            HttpServletRequest httpRequest) {

        CodeSetResponse deactivated = codeSetService.deactivateCodeSet(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CODESET_DEACTIVATE_SUCCESS),
                        deactivated,
                        httpRequest.getRequestURI()
                )
        );
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CodeSetResponse>> activateCodeSet(
            @PathVariable UUID id,
            HttpServletRequest httpRequest) {

        CodeSetResponse activated = codeSetService.activateCodeSet(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        200,
                        messageResolver.getMessage(MessageKey.CODESET_ACTIVATE_SUCCESS),
                        activated,
                        httpRequest.getRequestURI()
                )
        );
    }
}
