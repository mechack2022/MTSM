package com.school.attendance.tenant;

import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.api.MessageResolver;
import com.school.attendance.tenant.dto.CreateTenantRequest;
import com.school.attendance.tenant.dto.TenantResponse;
import com.school.attendance.tenant.dto.UpdateTenantRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;
    private final MessageResolver messageResolver;

    @PostMapping
    @PreAuthorize("hasAuthority('TENANT_CREATE')")
    public ResponseEntity<ApiResponse<TenantResponse>> createTenant(
            @Valid @RequestBody CreateTenantRequest request,
            HttpServletRequest req) {
        return ResponseEntity.status(201).body(
                ApiResponse.success(201,
                        messageResolver.getMessage(MessageKey.TENANT_CREATE_SUCCESS),
                        tenantService.createTenant(request),
                        req.getRequestURI())
        );
    }

    @GetMapping
    @PreAuthorize("hasAuthority('TENANT_READ')")
    public ResponseEntity<ApiResponse<List<TenantResponse>>> getAllTenants(HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.TENANT_LIST_SUCCESS),
                        tenantService.getAllTenants(),
                        req.getRequestURI())
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('TENANT_READ')")
    public ResponseEntity<ApiResponse<TenantResponse>> getTenantById(
            @PathVariable UUID id,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.TENANT_GET_SUCCESS),
                        tenantService.getTenantById(id),
                        req.getRequestURI())
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('TENANT_UPDATE')")
    public ResponseEntity<ApiResponse<TenantResponse>> updateTenant(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTenantRequest request,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.TENANT_UPDATE_SUCCESS),
                        tenantService.updateTenant(id, request),
                        req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAuthority('TENANT_UPDATE')")
    public ResponseEntity<ApiResponse<TenantResponse>> deactivateTenant(
            @PathVariable UUID id,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.TENANT_DEACTIVATE_SUCCESS),
                        tenantService.deactivateTenant(id),
                        req.getRequestURI())
        );
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAuthority('TENANT_UPDATE')")
    public ResponseEntity<ApiResponse<TenantResponse>> activateTenant(
            @PathVariable UUID id,
            HttpServletRequest req) {
        return ResponseEntity.ok(
                ApiResponse.success(200,
                        messageResolver.getMessage(MessageKey.TENANT_ACTIVATE_SUCCESS),
                        tenantService.activateTenant(id),
                        req.getRequestURI())
        );
    }
}
