package com.school.attendance.tenant.dto;

import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.user.entity.User;
import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Builder
public record TenantDashboardResponse(
    // Tenant Basic Information
    UUID tenantId,
    String tenantCode,
    String tenantName,
    String cacNumber,
    String subdomain,
    String address,
    UUID contactUserId,
    String contactName,
    String contactEmail,
    String contactPhone,
    String stateName,
    String localGovernmentName,

    // Tenant Status & Subscription
    Tenant.TenantStatus status,
    Tenant.SubscriptionTier subscriptionTier,
    Integer studentQuota,
    Tenant.BillingCycle billingCycle,
    Instant subscriptionStartDate,
    Instant subscriptionEndDate,
    boolean emailVerified,

    // Aggregated Statistics
    Statistics statistics,

    // List of Schools
    List<SchoolResponse> schools,

    // Metadata
    String metadata,
    Instant createdAt,
    Instant updatedAt
) {
    @Builder
    public record Statistics(
        // School Statistics
        long totalSchools,
        long activeSchools,
        long suspendedSchools,

        // Student Statistics
        int totalSeatCapacity,        // Sum of all school capacities
        int totalCurrentStudents,     // Sum of all current students
        int availableSeats,           // totalSeatCapacity - totalCurrentStudents
        double occupancyRate,         // (totalCurrentStudents / totalSeatCapacity) * 100
        int remainingQuota,           // studentQuota - totalCurrentStudents

        // Staff Statistics
        int totalCurrentTeachers,     // Sum of all current teachers

        // Capacity Usage
        double quotaUsageRate         // (totalCurrentStudents / studentQuota) * 100
    ) {}

    public static TenantDashboardResponse from(
        Tenant tenant,
        User contactUser,
        List<SchoolResponse> schools,
        Statistics statistics
    ) {
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

        return TenantDashboardResponse.builder()
            // Basic Information
            .tenantId(tenant.getId())
            .tenantCode(tenant.getCode())
            .tenantName(tenant.getName())
            .cacNumber(tenant.getCacNumber())
            .subdomain(tenant.getSubdomain())
            .address(tenant.getAddress())
            .contactUserId(tenant.getContactUserId())
            .contactName(fullName)
            .contactEmail(contactUser != null ? contactUser.getEmail() : null)
            .contactPhone(contactUser != null ? contactUser.getPhone() : null)
            .stateName(tenant.getState() != null ? tenant.getState().getName() : null)
            .localGovernmentName(tenant.getLocalGovernment() != null ? tenant.getLocalGovernment().getName() : null)

            // Status & Subscription
            .status(tenant.getStatus())
            .subscriptionTier(tenant.getSubscriptionTier())
            .studentQuota(tenant.getStudentQuota())
            .billingCycle(tenant.getBillingCycle())
            .subscriptionStartDate(tenant.getSubscriptionStartDate())
            .subscriptionEndDate(tenant.getSubscriptionEndDate())
            .emailVerified(contactUser != null ? contactUser.getEmailVerified() : false)

            // Statistics
            .statistics(statistics)

            // Schools List
            .schools(schools)

            // Metadata
            .metadata(tenant.getMetadata())
            .createdAt(tenant.getCreatedAt())
            .updatedAt(tenant.getUpdatedAt())
            .build();
    }
}
