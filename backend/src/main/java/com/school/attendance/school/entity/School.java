package com.school.attendance.school.entity;

import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.school.enums.EducationalTier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "schools")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID tenantId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(unique = true, nullable = false, length = 50)
    private String campusCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Topology topology;

    // Educational tiers offered by this school (driven by topology)
    // COMPOSITE → All tiers automatically
    // STANDALONE/SATELLITE → User selects one or more tiers
    @ElementCollection(targetClass = EducationalTier.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "school_educational_tiers", joinColumns = @JoinColumn(name = "school_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "tier", nullable = false)
    @Builder.Default
    private Set<EducationalTier> educationalTiers = new HashSet<>();

    // Location references
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "local_government_id")
    private LocalGovernment localGovernment;

    @Column(length = 500)
    private String physicalAddress;

    @Column(length = 100)
    private String schoolHeadName;

    @Column(length = 100)
    private String schoolHeadEmail;

    @Column(length = 20)
    private String schoolHeadPhone;

    @Column(nullable = false)
    private Integer seatCapacity;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentStudents = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentTeachers = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private SchoolStatus status = SchoolStatus.ACTIVE;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    @Column
    private Instant deletedAt;

    public enum Topology {
        COMPOSITE,
        STANDALONE,
        SATELLITE
    }

    public enum SchoolStatus {
        ACTIVE,
        INACTIVE,
        SUSPENDED
    }
}
