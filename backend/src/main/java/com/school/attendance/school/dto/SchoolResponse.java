package com.school.attendance.school.dto;

import com.school.attendance.school.entity.School;
import com.school.attendance.school.enums.EducationalTier;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record SchoolResponse(
    UUID id,
    UUID tenantId,
    String name,
    String campusCode,
    School.Topology topology,
    Set<EducationalTier> educationalTiers,
    UUID stateId,
    String stateName,
    UUID localGovernmentId,
    String localGovernmentName,
    String physicalAddress,
    String schoolHeadName,
    String schoolHeadEmail,
    String schoolHeadPhone,
    Integer seatCapacity,
    Integer currentStudents,
    Integer currentTeachers,
    School.SchoolStatus status,
    Instant createdAt,
    Instant updatedAt
) {
    public static SchoolResponse from(School school) {
        return new SchoolResponse(
            school.getId(),
            school.getTenantId(),
            school.getName(),
            school.getCampusCode(),
            school.getTopology(),
            school.getEducationalTiers(),
            school.getState() != null ? school.getState().getId() : null,
            school.getState() != null ? school.getState().getName() : null,
            school.getLocalGovernment() != null ? school.getLocalGovernment().getId() : null,
            school.getLocalGovernment() != null ? school.getLocalGovernment().getName() : null,
            school.getPhysicalAddress(),
            school.getSchoolHeadName(),
            school.getSchoolHeadEmail(),
            school.getSchoolHeadPhone(),
            school.getSeatCapacity(),
            school.getCurrentStudents(),
            school.getCurrentTeachers(),
            school.getStatus(),
            school.getCreatedAt(),
            school.getUpdatedAt()
        );
    }
}
