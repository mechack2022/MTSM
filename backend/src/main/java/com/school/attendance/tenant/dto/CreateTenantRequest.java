package com.school.attendance.tenant.dto;

import com.school.attendance.tenant.entity.Tenant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record CreateTenantRequest(
    @NotBlank(message = "Tenant code is required")
    @Size(min = 2, max = 10, message = "Code must be 2-10 characters")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "Code must be uppercase letters, numbers, or hyphens")
    String code,

    @NotBlank(message = "Tenant name is required")
    @Size(min = 3, max = 200, message = "Name must be 3-200 characters")
    String name,

    @Size(max = 50, message = "CAC number must not exceed 50 characters")
    String cacNumber,

    @Size(max = 50, message = "Subdomain must not exceed 50 characters")
    @Pattern(regexp = "^[a-z0-9-]*$", message = "Subdomain must be lowercase letters, numbers, or hyphens")
    String subdomain,

    @NotNull(message = "State is required")
    UUID stateId,

    @NotNull(message = "Local Government Area is required")
    UUID localGovernmentId,

    @Size(max = 500, message = "Address must not exceed 500 characters")
    String address,

    @Size(max = 200, message = "Contact name must not exceed 200 characters")
    String contactName,

    @Size(max = 100, message = "Role title must not exceed 100 characters")
    String roleTitle,

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    String contactEmail,

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    String contactPhone,

    Tenant.SubscriptionTier subscriptionTier,
    Integer studentQuota,
    Tenant.BillingCycle billingCycle,
    Instant subscriptionStartDate,
    Instant subscriptionEndDate,
    String metadata
) {}
