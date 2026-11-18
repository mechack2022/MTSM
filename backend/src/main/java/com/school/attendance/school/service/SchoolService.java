package com.school.attendance.school.service;

import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.common.util.PasswordGenerator;
import com.school.attendance.common.util.PhoneNumberValidator;
import com.school.attendance.email.entity.EmailVerification;
import com.school.attendance.email.service.EmailVerificationService;
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
import com.school.attendance.user.entity.User;
import com.school.attendance.user.entity.UserRole;
import com.school.attendance.user.repository.UserRepository;
import com.school.attendance.user.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
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
    private final EmailVerificationService emailVerificationService;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

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

        // Validate school head email and phone
        if (request.schoolHeadEmail() == null || request.schoolHeadEmail().isBlank()) {
            throw new IllegalArgumentException("School head email is required");
        }

        // Check for duplicate email in User table
        if (userRepository.existsByEmail(request.schoolHeadEmail())) {
            throw new DuplicateResourceException("A user with this email already exists: " + request.schoolHeadEmail());
        }

        // Validate and format phone number (if provided)
        String formattedPhone = null;
        if (request.schoolHeadPhone() != null && !request.schoolHeadPhone().isBlank()) {
            if (!PhoneNumberValidator.isValidNigerianPhoneNumber(request.schoolHeadPhone())) {
                throw new IllegalArgumentException("Invalid Nigerian phone number. Expected format: 08012345678 or +2348012345678");
            }
            formattedPhone = PhoneNumberValidator.formatNigerianPhoneNumber(request.schoolHeadPhone());

            // Check for duplicate phone in User table
            if (userRepository.existsByPhone(formattedPhone)) {
                throw new DuplicateResourceException("A user with this phone number already exists: " + formattedPhone);
            }
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

        // Generate temporary password and create Keycloak user
        String tempPassword = PasswordGenerator.generatePassword();

        // Use the provided first and last names with fallback defaults
        String firstName = (request.schoolHeadFirstName() != null && !request.schoolHeadFirstName().isBlank())
                ? request.schoolHeadFirstName() : "School";
        String lastName = (request.schoolHeadLastName() != null && !request.schoolHeadLastName().isBlank())
                ? request.schoolHeadLastName() : "Admin";

        // Create the Keycloak user with school_admin role
        // Note: We only set tenant_id here; school_id will be set after school is created
        String keycloakUserId = keycloakUserService.createUser(
                request.schoolHeadEmail(),
                firstName,
                lastName,
                tempPassword,
                "school_admin",
                true // enabled
        );

        // Set tenant_id attribute (school_id will be set later after school creation)
        keycloakUserService.setUserAttributes(keycloakUserId, Map.of(
                "tenant_id", List.of(tenantId.toString())
        ));

        log.info("Created Keycloak school admin: {} for tenant: {}", keycloakUserId, tenantId);

        // Create User record for the school head
        User schoolHeadUser = User.builder()
                .email(request.schoolHeadEmail())
                .firstName(firstName)
                .lastName(lastName)
                .phone(formattedPhone)
                .keycloakId(keycloakUserId)
                .emailVerified(false)
                .tenantId(tenantId)
                .isPlatformAdmin(false)
                .build();
        User savedUser = userRepository.save(schoolHeadUser);
        log.info("Created user record: {} ({})", savedUser.getEmail(), savedUser.getId());

        // Create School referencing the user
        School school = School.builder()
                .tenantId(tenantId)
                .name(request.name())
                .campusCode(campusCode)
                .topology(request.topology())
                .educationalTiers(educationalTiers)
                .state(state)
                .localGovernment(localGovernment)
                .physicalAddress(request.physicalAddress())
                .schoolHeadUserId(savedUser.getId())
                .seatCapacity(request.seatCapacity())
                .currentStudents(0)
                .currentTeachers(0)
                .status(School.SchoolStatus.INACTIVE)
                .build();

        School savedSchool = schoolRepository.save(school);
        log.info("Created school: {} ({}) for tenant: {}", savedSchool.getName(), savedSchool.getCampusCode(), tenantId);

        // Update Keycloak user's school_id attribute now that school is created
        keycloakUserService.setUserAttributes(keycloakUserId, Map.of(
                "tenant_id", List.of(tenantId.toString()),
                "school_id", List.of(savedSchool.getId().toString())
        ));
        log.info("Updated Keycloak user {} with school_id: {}", keycloakUserId, savedSchool.getId());

        // Create UserRole assignment for SCHOOL_ADMIN
        UserRole schoolAdminRole = UserRole.builder()
                .userId(savedUser.getId())
                .role("SCHOOL_ADMIN")
                .tenantId(tenantId)
                .schoolId(savedSchool.getId())
                .isActive(true)
                .assignedAt(LocalDateTime.now())
                .assignedBy(savedUser.getId())  // Self-assigned during creation
                .build();
        userRoleRepository.save(schoolAdminRole);
        log.info("Assigned SCHOOL_ADMIN role to user: {} for school: {}", savedUser.getEmail(), savedSchool.getCampusCode());

        // Send email verification to the school admin with metadata
        String recipientName = firstName + " " + lastName;
        Map<String, Object> metadata = Map.of(
                "tenantId", tenantId.toString(),
                "schoolId", savedSchool.getId().toString(),
                "userId", savedUser.getId().toString(),
                "keycloakUserId", keycloakUserId,
                "recipientName", recipientName,
                "tempPassword", tempPassword
        );

        emailVerificationService.createVerificationAndSendEmail(
                request.schoolHeadEmail(),
                recipientName,
                EmailVerification.VerificationType.SCHOOL_ADMIN,
                metadata
        );

        log.info("Sent verification email to school admin: {}", request.schoolHeadEmail());

        return SchoolResponse.from(savedSchool, savedUser);
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllByTenantId(tenantId).stream()
                .map(this::toSchoolResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllActiveSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllActiveByTenantId(tenantId).stream()
                .map(this::toSchoolResponse)
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

        return toSchoolResponse(school);
    }

    @Transactional(readOnly = true)
    public SchoolResponse getSchoolByCampusCode(String campusCode, UUID tenantId) {
        School school = schoolRepository.findByCampusCode(campusCode)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with campus code: " + campusCode));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with campus code: " + campusCode);
        }

        return toSchoolResponse(school);
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

        // Update school head user if email or name is being changed
        // Note: School head can only be updated, not replaced with a different user
        if (request.schoolHeadEmail() != null || request.schoolHeadName() != null || request.schoolHeadPhone() != null) {
            // Fetch the school head user
            User schoolHeadUser = userRepository.findById(school.getSchoolHeadUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("School head user not found for school: " + id));

            boolean userUpdated = false;

            if (request.schoolHeadEmail() != null) {
                // Check for duplicate email before updating
                if (!schoolHeadUser.getEmail().equals(request.schoolHeadEmail()) &&
                    userRepository.existsByEmail(request.schoolHeadEmail())) {
                    throw new DuplicateResourceException("A user with this email already exists: " + request.schoolHeadEmail());
                }
                schoolHeadUser.setEmail(request.schoolHeadEmail());
                userUpdated = true;
            }

            if (request.schoolHeadName() != null) {
                // Split the full name and update firstName/lastName
                int lastSpaceIndex = request.schoolHeadName().lastIndexOf(' ');
                if (lastSpaceIndex > 0) {
                    schoolHeadUser.setFirstName(request.schoolHeadName().substring(0, lastSpaceIndex).trim());
                    schoolHeadUser.setLastName(request.schoolHeadName().substring(lastSpaceIndex + 1).trim());
                } else {
                    schoolHeadUser.setFirstName(request.schoolHeadName().trim());
                    schoolHeadUser.setLastName("");
                }
                userUpdated = true;
            }

            if (request.schoolHeadPhone() != null) {
                // Validate phone format and check for duplicates
                if (!request.schoolHeadPhone().isBlank()) {
                    if (!PhoneNumberValidator.isValidNigerianPhoneNumber(request.schoolHeadPhone())) {
                        throw new IllegalArgumentException("Invalid Nigerian phone number. Expected format: 08012345678 or +2348012345678");
                    }
                    String formattedPhoneUpdate = PhoneNumberValidator.formatNigerianPhoneNumber(request.schoolHeadPhone());

                    // Check for duplicate phone if different from current
                    if (!formattedPhoneUpdate.equals(schoolHeadUser.getPhone()) &&
                        userRepository.existsByPhone(formattedPhoneUpdate)) {
                        throw new DuplicateResourceException("A user with this phone number already exists: " + formattedPhoneUpdate);
                    }
                    schoolHeadUser.setPhone(formattedPhoneUpdate);
                } else {
                    schoolHeadUser.setPhone(null);
                }
                userUpdated = true;
            }

            if (userUpdated) {
                userRepository.save(schoolHeadUser);
                log.info("Updated school head user: {}", schoolHeadUser.getEmail());
            }
        }

        if (request.seatCapacity() != null) school.setSeatCapacity(request.seatCapacity());
        if (request.status() != null) school.setStatus(request.status());

        School updatedSchool = schoolRepository.save(school);
        log.info("Updated school: {} ({}) for tenant: {}", updatedSchool.getName(), updatedSchool.getCampusCode(), tenantId);

        return toSchoolResponse(updatedSchool);
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
                .map(this::toSchoolResponse)
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

    @Transactional(readOnly = true)
    public List<SchoolResponse> getSchoolsBySchoolHead(UUID userId) {
        return schoolRepository.findBySchoolHeadUserId(userId).stream()
                .map(this::toSchoolResponse)
                .toList();
    }

    @Transactional
    public SchoolResponse activateSchool(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        school.setStatus(School.SchoolStatus.ACTIVE);
        School updatedSchool = schoolRepository.save(school);
        log.info("Activated school: {} ({}) for tenant: {}", updatedSchool.getName(), updatedSchool.getCampusCode(), tenantId);

        return toSchoolResponse(updatedSchool);
    }

    @Transactional
    public SchoolResponse deactivateSchool(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        school.setStatus(School.SchoolStatus.INACTIVE);
        School updatedSchool = schoolRepository.save(school);
        log.info("Deactivated school: {} ({}) for tenant: {}", updatedSchool.getName(), updatedSchool.getCampusCode(), tenantId);

        return toSchoolResponse(updatedSchool);
    }

    private SchoolResponse toSchoolResponse(School school) {
        User schoolHeadUser = userRepository.findById(school.getSchoolHeadUserId())
                .orElse(null);
        return SchoolResponse.from(school, schoolHeadUser);
    }
}
