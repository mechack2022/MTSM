package com.school.attendance.tenant.dto;

import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.user.entity.User;

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
    UUID contactUserId,
    String contactName,
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
    public static TenantResponse from(Tenant tenant, User contactUser) {
        // Build full name from user's firstName and lastName
        String fullName = null;
        if (contactUser != null) {
            String firstName = contactUser.getFirstName() != null ? contactUser.getFirstName() : "";
            String lastName = contactUser.getLastName() != null ? contactUser.getLastName() : "";
            fullName = (firstName + " " + lastName).trim();
            if (fullName.isEmpty()) {
                fullName = null;
            }
        }

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
                tenant.getContactUserId(),
                fullName,
                contactUser != null ? contactUser.getEmail() : null,
                contactUser != null ? contactUser.getPhone() : null,
                tenant.getStatus(),
                contactUser != null ? contactUser.getEmailVerified() : false,
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
