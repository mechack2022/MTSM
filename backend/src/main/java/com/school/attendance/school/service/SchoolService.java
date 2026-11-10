package com.school.attendance.school.service;

import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.common.util.PasswordGenerator;
import com.school.attendance.common.util.PhoneNumberValidator;
import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.location.repository.LocalGovernmentRepository;
import com.school.attendance.location.repository.StateRepository;
import com.school.attendance.school.dto.CreateSchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.dto.UpdateSchoolRequest;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.enums.EducationalTier;
import com.school.attendance.school.repository.SchoolRepository;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final TenantRepository tenantRepository;
    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;
    private final CampusCodeGenerator campusCodeGenerator;
    private final com.school.attendance.keycloak.KeycloakUserService keycloakUserService;

    @Transactional
    public SchoolResponse createSchool(UUID tenantId, CreateSchoolRequest request) {
        // Get tenant information
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + tenantId));

        // Auto-generate campus code if not provided
        String campusCode = request.campusCode();
        if (campusCode == null || campusCode.isBlank()) {
            campusCode = campusCodeGenerator.generateCampusCode(tenant.getCode(), tenantId);
            log.info("Auto-generated campus code: {} for tenant: {}", campusCode, tenant.getCode());
        } else {
            // If provided, check for duplicate
            if (schoolRepository.existsByCampusCode(campusCode)) {
                throw new DuplicateResourceException("A school with this campus code already exists: " + campusCode);
            }
        }

        // Fetch state entity
        State state = stateRepository.findById(request.stateId())
                .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));

        // Fetch local government entity if provided
        LocalGovernment localGovernment = null;
        if (request.localGovernmentId() != null) {
            localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));

            // Validate that LGA belongs to the selected state
            if (!localGovernment.getState().getId().equals(request.stateId())) {
                throw new IllegalArgumentException("Local Government does not belong to the selected state");
            }
        }

        // Validate and format phone number (if provided)
        String formattedPhone = null;
        if (request.schoolHeadPhone() != null && !request.schoolHeadPhone().isBlank()) {
            if (!PhoneNumberValidator.isValidNigerianPhoneNumber(request.schoolHeadPhone())) {
                throw new IllegalArgumentException("Invalid Nigerian phone number. Expected format: 08012345678 or +2348012345678");
            }
            formattedPhone = PhoneNumberValidator.formatNigerianPhoneNumber(request.schoolHeadPhone());
        }

        // Determine educational tiers based on topology
        Set<EducationalTier> educationalTiers;
        if (request.topology() == School.Topology.COMPOSITE) {
            // COMPOSITE schools automatically get ALL tiers
            educationalTiers = new HashSet<>(Arrays.asList(EducationalTier.values()));
            log.info("COMPOSITE topology selected - assigning all educational tiers");
        } else {
            // STANDALONE/SATELLITE schools use user-selected tiers
            educationalTiers = request.educationalTiers() != null && !request.educationalTiers().isEmpty()
                    ? new HashSet<>(request.educationalTiers())
                    : new HashSet<>();
            log.info("{} topology selected - using user-selected tiers: {}", request.topology(), educationalTiers);
        }

        School school = School.builder()
                .tenantId(tenantId)
                .name(request.name())
                .campusCode(campusCode)
                .topology(request.topology())
                .educationalTiers(educationalTiers)
                .state(state)
                .localGovernment(localGovernment)
                .physicalAddress(request.physicalAddress())
                .schoolHeadName(buildFullName(request.schoolHeadFirstName(), request.schoolHeadLastName()))
                .schoolHeadEmail(request.schoolHeadEmail())
                .schoolHeadPhone(formattedPhone)
                .seatCapacity(request.seatCapacity())
                .currentStudents(0)
                .currentTeachers(0)
                .status(School.SchoolStatus.ACTIVE)
                .build();

        School savedSchool = schoolRepository.save(school);
        log.info("Created school: {} ({}) for tenant: {}", savedSchool.getName(), savedSchool.getCampusCode(), tenantId);

        // Create a Keycloak user account for the school admin (school head)
        if (request.schoolHeadEmail() != null && !request.schoolHeadEmail().isBlank()) {
            try {
                // Check if email is already in use in Keycloak
                if (keycloakUserService.getUserByEmail(request.schoolHeadEmail()).isPresent()) {
                    throw new DuplicateResourceException("A user with this email already exists: " + request.schoolHeadEmail());
                }

                // Generate a temporary password for the school admin
                String tempPassword = PasswordGenerator.generatePassword();

                // Use the provided first and last names with fallback defaults
                String firstName = (request.schoolHeadFirstName() != null && !request.schoolHeadFirstName().isBlank())
                        ? request.schoolHeadFirstName() : "School";
                String lastName = (request.schoolHeadLastName() != null && !request.schoolHeadLastName().isBlank())
                        ? request.schoolHeadLastName() : "Admin";

                // Create the Keycloak user with school_admin role and set tenant_id + school_id attributes
                String userId = keycloakUserService.createUserWithTenantAndSchool(
                        request.schoolHeadEmail(),
                        firstName,
                        lastName,
                        tempPassword,
                        "school_admin",
                        tenantId,
                        savedSchool.getId()
                );

                // Send email verification to the school admin
                keycloakUserService.sendVerificationEmail(userId);

                log.info("Created school admin user for school: {} - Email: {} (Name: {} {})",
                        savedSchool.getName(), request.schoolHeadEmail(), firstName, lastName);
            } catch (DuplicateResourceException e) {
                // Re-throw validation errors to fail the school creation
                throw e;
            } catch (Exception e) {
                log.error("Failed to create school admin user for school {}: {}", savedSchool.getName(), e.getMessage());
                // Don't fail the entire school creation if user creation fails for other reasons
                // The school is still created, but the admin user needs to be created manually
            }
        } else {
            log.warn("No school head email provided for school: {}. School admin user not created.", savedSchool.getName());
        }

        return SchoolResponse.from(savedSchool);
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllByTenantId(tenantId).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllActiveSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllActiveByTenantId(tenantId).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public SchoolResponse getSchoolById(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        return SchoolResponse.from(school);
    }

    @Transactional(readOnly = true)
    public SchoolResponse getSchoolByCampusCode(String campusCode, UUID tenantId) {
        School school = schoolRepository.findByCampusCode(campusCode)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with campus code: " + campusCode));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with campus code: " + campusCode);
        }

        return SchoolResponse.from(school);
    }

    @Transactional
    public SchoolResponse updateSchool(UUID id, UUID tenantId, UpdateSchoolRequest request) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        if (request.name() != null) school.setName(request.name());

        // Handle topology and educational tiers together
        if (request.topology() != null) {
            school.setTopology(request.topology());

            // If topology is changed to COMPOSITE, auto-assign all tiers
            if (request.topology() == School.Topology.COMPOSITE) {
                Set<EducationalTier> allTiers = new HashSet<>(Arrays.asList(EducationalTier.values()));
                school.setEducationalTiers(allTiers);
                log.info("Topology changed to COMPOSITE - auto-assigning all educational tiers");
            } else if (request.educationalTiers() != null) {
                // For STANDALONE/SATELLITE, use provided tiers
                school.setEducationalTiers(request.educationalTiers());
                log.info("Topology changed to {} - using provided tiers: {}", request.topology(), request.educationalTiers());
            }
        } else if (request.educationalTiers() != null) {
            // Only update tiers if topology wasn't changed
            school.setEducationalTiers(request.educationalTiers());
        }

        // Update state if provided
        if (request.stateId() != null) {
            State state = stateRepository.findById(request.stateId())
                    .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));
            school.setState(state);
        }

        // Update local government if provided
        if (request.localGovernmentId() != null) {
            LocalGovernment localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));

            // Validate that LGA belongs to the current or new state
            UUID currentStateId = school.getState() != null ? school.getState().getId() : null;
            if (currentStateId != null && !localGovernment.getState().getId().equals(currentStateId)) {
                throw new IllegalArgumentException("Local Government does not belong to the school's state");
            }
            school.setLocalGovernment(localGovernment);
        }

        if (request.physicalAddress() != null) school.setPhysicalAddress(request.physicalAddress());
        if (request.schoolHeadName() != null) school.setSchoolHeadName(request.schoolHeadName());
        if (request.schoolHeadEmail() != null) school.setSchoolHeadEmail(request.schoolHeadEmail());
        if (request.schoolHeadPhone() != null) school.setSchoolHeadPhone(request.schoolHeadPhone());
        if (request.seatCapacity() != null) school.setSeatCapacity(request.seatCapacity());
        if (request.status() != null) school.setStatus(request.status());

        School updatedSchool = schoolRepository.save(school);
        log.info("Updated school: {} ({}) for tenant: {}", updatedSchool.getName(), updatedSchool.getCampusCode(), tenantId);

        return SchoolResponse.from(updatedSchool);
    }

    @Transactional
    public void deleteSchool(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        // Soft delete - set deletedAt timestamp
        school.setDeletedAt(Instant.now());
        schoolRepository.save(school);
        log.info("Soft deleted school: {} ({}) for tenant: {}", school.getName(), school.getCampusCode(), tenantId);
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> searchSchools(UUID tenantId, String searchTerm) {
        return schoolRepository.searchByTenantIdAndNameOrCode(tenantId, searchTerm).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public long countActiveSchools(UUID tenantId) {
        return schoolRepository.countActiveByTenantId(tenantId);
    }

    @Transactional(readOnly = true)
    public int sumCurrentStudents(UUID tenantId) {
        return schoolRepository.sumCurrentStudentsByTenantId(tenantId);
    }

    @Transactional(readOnly = true)
    public int sumCurrentTeachers(UUID tenantId) {
        return schoolRepository.sumCurrentTeachersByTenantId(tenantId);
    }

    /**
     * Helper method to build a full name from first and last names.
     * @param firstName The first name
     * @param lastName The last name
     * @return The full name, or null if both are empty
     */
    private String buildFullName(String firstName, String lastName) {
        boolean hasFirstName = firstName != null && !firstName.isBlank();
        boolean hasLastName = lastName != null && !lastName.isBlank();

        if (hasFirstName && hasLastName) {
            return firstName.trim() + " " + lastName.trim();
        } else if (hasFirstName) {
            return firstName.trim();
        } else if (hasLastName) {
            return lastName.trim();
        }
        return null;
    }
}
