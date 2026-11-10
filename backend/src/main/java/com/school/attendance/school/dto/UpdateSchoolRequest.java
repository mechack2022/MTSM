package com.school.attendance.school.dto;

import com.school.attendance.school.entity.School;
import com.school.attendance.school.enums.EducationalTier;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record UpdateSchoolRequest(
    @Size(min = 3, max = 200, message = "School name must be 3-200 characters")
    String name,

    School.Topology topology,

    // Educational tiers - when updating topology, tiers will be automatically adjusted
    Set<EducationalTier> educationalTiers,

    UUID stateId,

    UUID localGovernmentId,

    @Size(max = 500, message = "Physical address must not exceed 500 characters")
    String physicalAddress,

    @Size(max = 100, message = "School head name must not exceed 100 characters")
    String schoolHeadName,

    @Email(message = "Invalid email format")
    @Size(max = 100, message = "School head email must not exceed 100 characters")
    String schoolHeadEmail,

    @Size(max = 20, message = "School head phone must not exceed 20 characters")
    String schoolHeadPhone,

    @Positive(message = "Seat capacity must be a positive number")
    Integer seatCapacity,

    School.SchoolStatus status
) {}
