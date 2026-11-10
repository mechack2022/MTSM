package com.school.attendance.tenant.controller;

import com.school.attendance.tenant.dto.CreateTenantRequest;
import com.school.attendance.tenant.dto.CreateTenantResponse;
import com.school.attendance.tenant.dto.TenantDashboardResponse;
import com.school.attendance.tenant.dto.TenantResponse;
import com.school.attendance.tenant.dto.UpdateTenantRequest;
import com.school.attendance.tenant.service.TenantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<CreateTenantResponse> createTenant(@Valid @RequestBody CreateTenantRequest request) {
        CreateTenantResponse response = tenantService.createTenant(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<List<TenantResponse>> getAllTenants(
            @RequestParam(required = false) Boolean activeOnly) {
        List<TenantResponse> tenants = Boolean.TRUE.equals(activeOnly)
                ? tenantService.getAllActiveTenants()
                : tenantService.getAllTenants();
        return ResponseEntity.ok(tenants);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<TenantResponse> getTenantById(@PathVariable UUID id) {
        TenantResponse tenant = tenantService.getTenantById(id);
        return ResponseEntity.ok(tenant);
    }

    @GetMapping("/code/{code}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<TenantResponse> getTenantByCode(@PathVariable String code) {
        TenantResponse tenant = tenantService.getTenantByCode(code);
        return ResponseEntity.ok(tenant);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<TenantResponse> updateTenant(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTenantRequest request) {
        TenantResponse tenant = tenantService.updateTenant(id, request);
        return ResponseEntity.ok(tenant);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<Void> deleteTenant(@PathVariable UUID id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<List<TenantResponse>> searchTenants(@RequestParam String q) {
        List<TenantResponse> tenants = tenantService.searchTenants(q);
        return ResponseEntity.ok(tenants);
    }

    @PostMapping("/{id}/activate")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<TenantResponse> activateTenant(@PathVariable UUID id) {
        TenantResponse tenant = tenantService.activateTenant(id);
        return ResponseEntity.ok(tenant);
    }

    @PostMapping("/{id}/suspend")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<TenantResponse> suspendTenant(@PathVariable UUID id) {
        TenantResponse tenant = tenantService.suspendTenant(id);
        return ResponseEntity.ok(tenant);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('TENANT_ADMIN', 'SCHOOL_ADMIN', 'TEACHER')")
    public ResponseEntity<TenantResponse> getMyTenant(@org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.oauth2.jwt.Jwt jwt) {
        String tenantIdStr = jwt.getClaimAsString("tenant_id");
        if (tenantIdStr == null || tenantIdStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        UUID tenantId;
        try {
            tenantId = UUID.fromString(tenantIdStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        TenantResponse tenant = tenantService.getTenantById(tenantId);
        return ResponseEntity.ok(tenant);
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('TENANT_ADMIN')")
    public ResponseEntity<TenantDashboardResponse> getTenantDashboard(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.oauth2.jwt.Jwt jwt) {
        // Extract tenant ID from JWT
        String tenantIdStr = jwt.getClaimAsString("tenant_id");
        if (tenantIdStr == null || tenantIdStr.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        UUID tenantId;
        try {
            tenantId = UUID.fromString(tenantIdStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        // Get comprehensive dashboard data
        TenantDashboardResponse dashboard = tenantService.getTenantDashboard(tenantId);
        return ResponseEntity.ok(dashboard);
    }
}
