package com.school.attendance.tenant.entity;

import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tenants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 10)
    private String code;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(unique = true, length = 50)
    private String cacNumber;

    @Column(unique = true, length = 50)
    private String subdomain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lga_id")
    private LocalGovernment localGovernment;

    @Column(length = 500)
    private String address;

    @Column(length = 200)
    private String contactName;

    @Column(length = 100)
    private String roleTitle;

    @Column(nullable = false, unique = true, length = 100)
    private String contactEmail;

    @Column(unique = true, length = 20)
    private String contactPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TenantStatus status = TenantStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private SubscriptionTier subscriptionTier;

    @Column
    private Integer studentQuota;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private BillingCycle billingCycle;

    @Column
    private Instant subscriptionStartDate;

    @Column
    private Instant subscriptionEndDate;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    @Column
    private Instant deletedAt;

    public enum TenantStatus {
        ACTIVE, SUSPENDED, INACTIVE
    }

    public enum SubscriptionTier {
        BASIC, STANDARD, ENTERPRISE
    }

    public enum BillingCycle {
        ANNUAL, TERMLY, BIANNUAL
    }
}
