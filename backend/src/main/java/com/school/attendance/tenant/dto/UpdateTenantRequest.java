package com.school.attendance.tenant.dto;

import com.school.attendance.tenant.entity.Tenant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record UpdateTenantRequest(
    @Size(min = 3, max = 200, message = "Name must be 3-200 characters")
    String name,

    UUID stateId,
    UUID localGovernmentId,

    @Size(max = 500, message = "Address must not exceed 500 characters")
    String address,

    @Size(max = 200, message = "Contact name must not exceed 200 characters")
    String contactName,

    @Size(max = 100, message = "Role title must not exceed 100 characters")
    String roleTitle,

    @Email(message = "Invalid email format")
    String contactEmail,

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    String contactPhone,

    Tenant.TenantStatus status,
    Tenant.SubscriptionTier subscriptionTier,
    Integer studentQuota,
    Tenant.BillingCycle billingCycle,
    Instant subscriptionStartDate,
    Instant subscriptionEndDate,
    String metadata
) {}
