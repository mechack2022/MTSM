package com.school.attendance.tenant.dto;

import com.school.attendance.tenant.entity.Tenant;

import java.time.Instant;
import java.util.UUID;

public record TenantResponse(
    UUID id,
    String code,
    String name,
    String cacNumber,
    String subdomain,
    String state,
    String address,
    String contactName,
    String roleTitle,
    String contactEmail,
    String contactPhone,
    Tenant.TenantStatus status,
    Tenant.SubscriptionTier subscriptionTier,
    Integer studentQuota,
    Tenant.BillingCycle billingCycle,
    Instant subscriptionStartDate,
    Instant subscriptionEndDate,
    String metadata,
    Instant createdAt,
    Instant updatedAt
) {
    public static TenantResponse from(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getCode(),
                tenant.getName(),
                tenant.getCacNumber(),
                tenant.getSubdomain(),
                tenant.getState(),
                tenant.getAddress(),
                tenant.getContactName(),
                tenant.getRoleTitle(),
                tenant.getContactEmail(),
                tenant.getContactPhone(),
                tenant.getStatus(),
                tenant.getSubscriptionTier(),
                tenant.getStudentQuota(),
                tenant.getBillingCycle(),
                tenant.getSubscriptionStartDate(),
                tenant.getSubscriptionEndDate(),
                tenant.getMetadata(),
                tenant.getCreatedAt(),
                tenant.getUpdatedAt()
        );
    }
}
