package com.school.attendance.tenant.dto;

public record CreateTenantResponse(
    TenantResponse tenant,
    AdminCredentials adminCredentials
) {
    public record AdminCredentials(
        String adminName,
        String adminEmail,
        String portalUrl
    ) {}
}
