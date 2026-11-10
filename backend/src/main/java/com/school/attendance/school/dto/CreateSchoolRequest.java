package com.school.attendance.school.dto;

import com.school.attendance.school.entity.School;
import com.school.attendance.school.enums.EducationalTier;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record CreateSchoolRequest(
    @NotBlank(message = "School name is required")
    @Size(min = 3, max = 200, message = "School name must be 3-200 characters")
    String name,

    @Size(min = 2, max = 50, message = "Campus code must be 2-50 characters")
    String campusCode, // Optional - will be auto-generated if not provided

    @NotNull(message = "Topology is required")
    School.Topology topology,

    // Educational tiers - Required only for STANDALONE/SATELLITE
    // For COMPOSITE, this will be ignored and all tiers will be auto-assigned
    Set<EducationalTier> educationalTiers,

    @NotNull(message = "State is required")
    UUID stateId,

    UUID localGovernmentId, // Optional

    @Size(max = 500, message = "Physical address must not exceed 500 characters")
    String physicalAddress,

    @Size(max = 50, message = "School head first name must not exceed 50 characters")
    String schoolHeadFirstName,

    @Size(max = 50, message = "School head last name must not exceed 50 characters")
    String schoolHeadLastName,

    @Email(message = "Invalid email format")
    @Size(max = 100, message = "School head email must not exceed 100 characters")
    String schoolHeadEmail,

    @Size(max = 20, message = "School head phone must not exceed 20 characters")
    String schoolHeadPhone,

    @NotNull(message = "Seat capacity is required")
    @Positive(message = "Seat capacity must be a positive number")
    Integer seatCapacity
) {}
