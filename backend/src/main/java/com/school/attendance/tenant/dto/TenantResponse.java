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
    UUID stateId,
    String stateName,
    UUID localGovernmentId,
    String localGovernmentName,
    String address,
    String contactName,
    String roleTitle,
    String contactEmail,
    String contactPhone,
    Tenant.TenantStatus status,
    Boolean emailVerified,
    Tenant.SubscriptionTier subscriptionTier,
    Integer studentQuota,
    Tenant.BillingCycle billingCycle,
    Instant subscriptionStartDate,
    Instant subscriptionEndDate,
    String metadata,
    Instant createdAt,
    Instant updatedAt
) {
    public static TenantResponse from(Tenant tenant, Boolean emailVerified) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getCode(),
                tenant.getName(),
                tenant.getCacNumber(),
                tenant.getSubdomain(),
                tenant.getState() != null ? tenant.getState().getId() : null,
                tenant.getState() != null ? tenant.getState().getName() : null,
                tenant.getLocalGovernment() != null ? tenant.getLocalGovernment().getId() : null,
                tenant.getLocalGovernment() != null ? tenant.getLocalGovernment().getName() : null,
                tenant.getAddress(),
                tenant.getContactName(),
                tenant.getRoleTitle(),
                tenant.getContactEmail(),
                tenant.getContactPhone(),
                tenant.getStatus(),
                emailVerified,
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
