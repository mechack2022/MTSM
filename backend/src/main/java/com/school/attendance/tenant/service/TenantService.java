package com.school.attendance.tenant.service;

import com.school.attendance.audit.dto.CreateAuditLogRequest;
import com.school.attendance.audit.enums.AuditLogCategory;
import com.school.attendance.audit.service.AuditLogService;
import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.common.util.PasswordGenerator;
import com.school.attendance.common.util.PhoneNumberValidator;
import com.school.attendance.email.entity.EmailVerification;
import com.school.attendance.email.service.EmailVerificationService;
import com.school.attendance.keycloak.KeycloakUserService;
import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.location.repository.LocalGovernmentRepository;
import com.school.attendance.location.repository.StateRepository;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.repository.SchoolRepository;
import com.school.attendance.tenant.dto.CreateTenantRequest;
import com.school.attendance.tenant.dto.CreateTenantResponse;
import com.school.attendance.tenant.dto.TenantDashboardResponse;
import com.school.attendance.tenant.dto.TenantResponse;
import com.school.attendance.tenant.dto.UpdateTenantRequest;
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

import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final SchoolRepository schoolRepository;
    private final KeycloakUserService keycloakUserService;
    private final EmailVerificationService emailVerificationService;
    private final AuditLogService auditLogService;
    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Transactional
    public CreateTenantResponse createTenant(CreateTenantRequest request) {
        if (tenantRepository.existsByCode(request.code())) {
            throw new DuplicateResourceException("Tenant code already exists: " + request.code());
        }

        // Check for duplicate email in User table
        if (userRepository.existsByEmail(request.contactEmail())) {
            throw new DuplicateResourceException("A user with this email address already exists: " + request.contactEmail());
        }

        // Check for duplicate CAC number (if provided)
        if (request.cacNumber() != null && !request.cacNumber().isBlank() &&
            tenantRepository.existsByCacNumber(request.cacNumber())) {
            throw new DuplicateResourceException("A tenant with this CAC number already exists: " + request.cacNumber());
        }

        // Check for duplicate contact phone (if provided)
        if (request.contactPhone() != null && !request.contactPhone().isBlank()) {
            // Check if phone already exists for another user
            userRepository.findByPhone(request.contactPhone()).ifPresent(existingUser -> {
                throw new DuplicateResourceException("A user with this contact phone already exists: " + request.contactPhone());
            });
        }

        // Check for duplicate subdomain (if provided)
        if (request.subdomain() != null && !request.subdomain().isBlank() &&
            tenantRepository.existsBySubdomain(request.subdomain())) {
            throw new DuplicateResourceException("A tenant with this subdomain already exists: " + request.subdomain());
        }

        // Validate phone number format (if provided)
        if (request.contactPhone() != null && !request.contactPhone().isBlank() &&
            !PhoneNumberValidator.isValidNigerianPhoneNumber(request.contactPhone())) {
            throw new IllegalArgumentException("Invalid Nigerian phone number. Expected format: 08012345678 or +2348012345678");
        }

        // Validate required fields
        if (request.stateId() == null || request.stateId().toString().isBlank()) {
            throw new IllegalArgumentException("State ID is required");
        }
        if (request.localGovernmentId() == null || request.localGovernmentId().toString().isBlank()) {
            throw new IllegalArgumentException("Local Government ID is required");
        }

        // Fetch State and LocalGovernment entities
        State state = stateRepository.findById(request.stateId())
                .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));

        LocalGovernment localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));

        // Generate temp password and create Keycloak user
        String tempPassword = PasswordGenerator.generatePassword();
        String keycloakUserId = keycloakUserService.createTenantAdmin(
                request.code(), // Use tenant code as temporary identifier
                request.contactName(),
                request.contactEmail(),
                tempPassword
        );

        log.info("Created Keycloak tenant admin: {} for tenant: {}", keycloakUserId, request.code());

        // Split contact name into first and last name
        String[] nameParts = splitName(request.contactName());
        String firstName = nameParts[0];
        String lastName = nameParts[1];

        // Create User record for the tenant admin
        User contactUser = User.builder()
                .email(request.contactEmail())
                .firstName(firstName)
                .lastName(lastName)
                .phone(request.contactPhone())
                .keycloakId(keycloakUserId)
                .emailVerified(false)
                .tenantId(null) // Will be set after tenant creation
                .isPlatformAdmin(false)
                .build();
        User savedUser = userRepository.save(contactUser);
        log.info("Created user record: {} ({})", savedUser.getEmail(), savedUser.getId());

        // Create Tenant referencing the user
        Tenant tenant = Tenant.builder()
                .code(request.code())
                .name(request.name())
                .cacNumber(request.cacNumber())
                .subdomain(request.subdomain())
                .state(state)
                .localGovernment(localGovernment)
                .address(request.address())
                .contactUserId(savedUser.getId()) // Reference user by ID
                .status(Tenant.TenantStatus.SUSPENDED)  // Start as SUSPENDED until manually activated by platform admin
                .subscriptionTier(request.subscriptionTier())
                .studentQuota(request.studentQuota())
                .billingCycle(request.billingCycle())
                .subscriptionStartDate(request.subscriptionStartDate() != null ? request.subscriptionStartDate() : Instant.now())
                .subscriptionEndDate(request.subscriptionEndDate())
                .metadata(request.metadata())
                .build();

        Tenant savedTenant = tenantRepository.save(tenant);
        log.info("Created tenant: {} ({})", savedTenant.getName(), savedTenant.getCode());

        // Update User's tenantId after tenant creation
        savedUser.setTenantId(savedTenant.getId());
        savedUser = userRepository.save(savedUser);
        log.info("Updated user {} with tenantId: {}", savedUser.getEmail(), savedTenant.getId());

        // Update Keycloak user's tenant_id attribute with actual UUID (not tenant code)
        keycloakUserService.setUserAttributes(keycloakUserId, Map.of(
                "tenant_id", List.of(savedTenant.getId().toString())
        ));
        log.info("Updated Keycloak user {} with tenant_id: {}", keycloakUserId, savedTenant.getId());

        // Create UserRole assignment for TENANT_ADMIN
        UserRole tenantAdminRole = UserRole.builder()
                .userId(savedUser.getId())
                .role("TENANT_ADMIN")
                .tenantId(savedTenant.getId())
                .schoolId(null) // Tenant-level role
                .isActive(true)
                .assignedAt(LocalDateTime.now())
                .assignedBy(savedUser.getId()) // Self-assigned during creation
                .build();
        userRoleRepository.save(tenantAdminRole);
        log.info("Assigned TENANT_ADMIN role to user: {} for tenant: {}", savedUser.getEmail(), savedTenant.getCode());

        // Send email verification
        Map<String, Object> metadata = Map.of(
                "tenantId", savedTenant.getId().toString(),
                "userId", savedUser.getId().toString(),
                "keycloakUserId", keycloakUserId,
                "recipientName", request.contactName(),
                "tempPassword", tempPassword
        );

        emailVerificationService.createVerificationAndSendEmail(
                request.contactEmail(),
                request.contactName(),
                EmailVerification.VerificationType.TENANT_ADMIN,
                metadata
        );

        log.info("Sent verification email to: {}", request.contactEmail());

        // Create audit log for tenant creation
        createAuditLog(
                savedTenant.getId(),
                null, // No school for tenant-level operation
                savedUser.getId(),
                request.contactName(),
                "PLATFORM_ADMIN", // This is typically done by platform admin
                AuditLogCategory.TENANT_CREATION,
                "Tenant Created",
                String.format("New tenant '%s' (code: %s) created with status %s",
                    savedTenant.getName(), savedTenant.getCode(), savedTenant.getStatus()),
                savedTenant.getName(),
                "Tenant",
                savedTenant.getId(),
                null,
                null,
                null,
                "INFO",
                true
        );

        String portalUrl = request.subdomain() != null
                ? "https://" + request.subdomain() + ".edumanage.ng"
                : "https://app.edumanage.ng";

        var credentials = new CreateTenantResponse.AdminCredentials(
                request.contactName(),
                request.contactEmail(),
                portalUrl
        );

        return new CreateTenantResponse(TenantResponse.from(savedTenant, savedUser), credentials);
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(this::toTenantResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> getAllActiveTenants() {
        return tenantRepository.findAllActive().stream()
                .map(this::toTenantResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantById(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));
        return toTenantResponse(tenant);
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantByCode(String code) {
        Tenant tenant = tenantRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with code: " + code));
        return toTenantResponse(tenant);
    }

    @Transactional
    public TenantResponse updateTenant(UUID id, UpdateTenantRequest request) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        // Fetch the contact user
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + id));

        if (request.name() != null) tenant.setName(request.name());

        if (request.stateId() != null) {
            State state = stateRepository.findById(request.stateId())
                    .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));
            tenant.setState(state);
        }

        if (request.localGovernmentId() != null) {
            LocalGovernment localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));
            tenant.setLocalGovernment(localGovernment);
        }

        if (request.address() != null) tenant.setAddress(request.address());

        // Update contact user fields if provided
        boolean userUpdated = false;
        if (request.contactName() != null) {
            String[] nameParts = splitName(request.contactName());
            contactUser.setFirstName(nameParts[0]);
            contactUser.setLastName(nameParts[1]);
            userUpdated = true;
        }
        if (request.contactEmail() != null) {
            // Check for duplicate email before updating
            if (!contactUser.getEmail().equals(request.contactEmail()) &&
                userRepository.existsByEmail(request.contactEmail())) {
                throw new DuplicateResourceException("A user with this email already exists: " + request.contactEmail());
            }
            contactUser.setEmail(request.contactEmail());
            userUpdated = true;
        }
        if (request.contactPhone() != null) {
            contactUser.setPhone(request.contactPhone());
            userUpdated = true;
        }

        if (userUpdated) {
            userRepository.save(contactUser);
            log.info("Updated contact user: {}", contactUser.getEmail());
        }

        if (request.status() != null) tenant.setStatus(request.status());
        if (request.subscriptionTier() != null) tenant.setSubscriptionTier(request.subscriptionTier());
        if (request.studentQuota() != null) tenant.setStudentQuota(request.studentQuota());
        if (request.billingCycle() != null) tenant.setBillingCycle(request.billingCycle());
        if (request.subscriptionStartDate() != null) tenant.setSubscriptionStartDate(request.subscriptionStartDate());
        if (request.subscriptionEndDate() != null) tenant.setSubscriptionEndDate(request.subscriptionEndDate());
        if (request.metadata() != null) tenant.setMetadata(request.metadata());

        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Updated tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        // Create audit log for tenant update
        createAuditLog(
                updatedTenant.getId(),
                null,
                contactUser.getId(),
                contactUser.getFirstName() + " " + contactUser.getLastName(),
                "TENANT_ADMIN",
                AuditLogCategory.TENANT_UPDATE,
                "Tenant Updated",
                String.format("Tenant '%s' (code: %s) information updated",
                    updatedTenant.getName(), updatedTenant.getCode()),
                updatedTenant.getName(),
                "Tenant",
                updatedTenant.getId(),
                null,
                null,
                null,
                "INFO",
                false
        );

        return toTenantResponse(updatedTenant);
    }

    @Transactional
    public void deleteTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        // Fetch the contact user for audit logging
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + id));

        // Soft delete - set deletedAt timestamp instead of removing from database
        tenant.setDeletedAt(Instant.now());
        tenantRepository.save(tenant);
        log.info("Soft deleted tenant: {} ({})", tenant.getName(), tenant.getCode());

        // Create audit log for tenant deletion
        createAuditLog(
                tenant.getId(),
                null,
                contactUser.getId(),
                contactUser.getFirstName() + " " + contactUser.getLastName(),
                "PLATFORM_ADMIN",
                AuditLogCategory.TENANT_DELETION,
                "Tenant Deleted",
                String.format("Tenant '%s' (code: %s) has been soft deleted",
                    tenant.getName(), tenant.getCode()),
                tenant.getName(),
                "Tenant",
                tenant.getId(),
                null,
                null,
                null,
                "WARNING",
                true
        );
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> searchTenants(String searchTerm) {
        return tenantRepository.searchByNameOrCode(searchTerm).stream()
                .map(this::toTenantResponse)
                .toList();
    }

    @Transactional
    public TenantResponse activateTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        // Fetch the contact user
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + id));

        if (tenant.getStatus() == Tenant.TenantStatus.ACTIVE) {
            throw new IllegalStateException("Tenant is already active");
        }

        // Check if email has been verified before allowing activation
        boolean emailVerified = emailVerificationService.isEmailVerified(
                contactUser.getEmail(),
                EmailVerification.VerificationType.TENANT_ADMIN
        );

        if (!emailVerified) {
            throw new IllegalStateException("Cannot activate tenant. Email verification is required before activation.");
        }

        // Update user's emailVerified status
        if (!contactUser.getEmailVerified()) {
            contactUser.setEmailVerified(true);
            userRepository.save(contactUser);
            log.info("Marked user {} as email verified", contactUser.getEmail());
        }

        // Enable the Keycloak user so they can login
        keycloakUserService.getUserByEmail(contactUser.getEmail())
                .ifPresent(user -> {
                    keycloakUserService.enableUser(user.getId());
                    log.info("Enabled Keycloak user: {} for tenant: {}", contactUser.getEmail(), tenant.getCode());
                });

        tenant.setStatus(Tenant.TenantStatus.ACTIVE);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Activated tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        // Create audit log for tenant activation
        createAuditLog(
                updatedTenant.getId(),
                null,
                contactUser.getId(),
                contactUser.getFirstName() + " " + contactUser.getLastName(),
                "PLATFORM_ADMIN",
                AuditLogCategory.TENANT_ACTIVATION,
                "Tenant Activated",
                String.format("Tenant '%s' (code: %s) has been activated and is now operational",
                    updatedTenant.getName(), updatedTenant.getCode()),
                updatedTenant.getName(),
                "Tenant",
                updatedTenant.getId(),
                "SUSPENDED",
                "ACTIVE",
                "Email verified and tenant approved by platform admin",
                "INFO",
                false
        );

        return toTenantResponse(updatedTenant);
    }

    @Transactional
    public TenantResponse suspendTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        // Fetch the contact user
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + id));

        if (tenant.getStatus() == Tenant.TenantStatus.SUSPENDED) {
            throw new IllegalStateException("Tenant is already suspended");
        }

        // Disable the Keycloak user so they cannot login
        keycloakUserService.getUserByEmail(contactUser.getEmail())
                .ifPresent(user -> {
                    keycloakUserService.disableUser(user.getId());
                    log.info("Disabled Keycloak user: {} for tenant: {}", contactUser.getEmail(), tenant.getCode());
                });

        tenant.setStatus(Tenant.TenantStatus.SUSPENDED);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Suspended tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        // Create audit log for tenant suspension
        createAuditLog(
                updatedTenant.getId(),
                null,
                contactUser.getId(),
                contactUser.getFirstName() + " " + contactUser.getLastName(),
                "PLATFORM_ADMIN",
                AuditLogCategory.TENANT_SUSPENSION,
                "Tenant Suspended",
                String.format("Tenant '%s' (code: %s) has been suspended and access revoked",
                    updatedTenant.getName(), updatedTenant.getCode()),
                updatedTenant.getName(),
                "Tenant",
                updatedTenant.getId(),
                "ACTIVE",
                "SUSPENDED",
                "Administrative action by platform admin",
                "WARNING",
                false
        );

        return toTenantResponse(updatedTenant);
    }

    @Transactional(readOnly = true)
    public TenantDashboardResponse getTenantDashboard(UUID tenantId) {
        // Get tenant information
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + tenantId));

        // Get all schools for this tenant
        List<School> schools = schoolRepository.findAllByTenantId(tenantId);

        // Convert schools to response DTOs
        List<SchoolResponse> schoolResponses = schools.stream()
                .map(school -> {
                    User schoolHeadUser = userRepository.findById(school.getSchoolHeadUserId()).orElse(null);
                    return SchoolResponse.from(school, schoolHeadUser);
                })
                .toList();

        // Calculate statistics
        long totalSchools = schools.size();
        long activeSchools = schools.stream()
                .filter(school -> school.getStatus() == School.SchoolStatus.ACTIVE)
                .count();
        long suspendedSchools = schools.stream()
                .filter(school -> school.getStatus() == School.SchoolStatus.SUSPENDED)
                .count();

        int totalSeatCapacity = schools.stream()
                .mapToInt(School::getSeatCapacity)
                .sum();

        int totalCurrentStudents = schools.stream()
                .mapToInt(School::getCurrentStudents)
                .sum();

        int totalCurrentTeachers = schools.stream()
                .mapToInt(School::getCurrentTeachers)
                .sum();

        int availableSeats = totalSeatCapacity - totalCurrentStudents;

        double occupancyRate = totalSeatCapacity > 0
                ? ((double) totalCurrentStudents / totalSeatCapacity) * 100
                : 0.0;

        int remainingQuota = tenant.getStudentQuota() - totalCurrentStudents;

        double quotaUsageRate = tenant.getStudentQuota() > 0
                ? ((double) totalCurrentStudents / tenant.getStudentQuota()) * 100
                : 0.0;

        TenantDashboardResponse.Statistics statistics = TenantDashboardResponse.Statistics.builder()
                .totalSchools(totalSchools)
                .activeSchools(activeSchools)
                .suspendedSchools(suspendedSchools)
                .totalSeatCapacity(totalSeatCapacity)
                .totalCurrentStudents(totalCurrentStudents)
                .availableSeats(availableSeats)
                .occupancyRate(Math.round(occupancyRate * 100.0) / 100.0) // Round to 2 decimal places
                .totalCurrentTeachers(totalCurrentTeachers)
                .remainingQuota(remainingQuota)
                .quotaUsageRate(Math.round(quotaUsageRate * 100.0) / 100.0) // Round to 2 decimal places
                .build();

        // Fetch the contact user
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + tenantId));

        log.info("Generated dashboard for tenant: {} ({}) - {} schools, {} students, {} teachers",
                tenant.getName(), tenant.getCode(), totalSchools, totalCurrentStudents, totalCurrentTeachers);

        return TenantDashboardResponse.from(tenant, contactUser, schoolResponses, statistics);
    }

    private TenantResponse toTenantResponse(Tenant tenant) {
        // Fetch the contact user
        User contactUser = userRepository.findById(tenant.getContactUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Contact user not found for tenant: " + tenant.getId()));

        return TenantResponse.from(tenant, contactUser);
    }

    /**
     * Split a full name into first and last name.
     * Handles various name formats.
     */
    private String[] splitName(String fullName) {
        if (fullName == null || fullName.isBlank()) {
            return new String[]{"", ""};
        }

        String trimmed = fullName.trim();
        int lastSpaceIndex = trimmed.lastIndexOf(' ');

        if (lastSpaceIndex == -1) {
            // No space found - use entire name as first name
            return new String[]{trimmed, ""};
        }

        // Split at last space to handle middle names properly
        String firstName = trimmed.substring(0, lastSpaceIndex).trim();
        String lastName = trimmed.substring(lastSpaceIndex + 1).trim();

        return new String[]{firstName, lastName};
    }

    /**
     * Helper method to create audit log entries
     */
    private void createAuditLog(
            UUID tenantId,
            UUID schoolId,
            UUID userId,
            String userName,
            String userRole,
            AuditLogCategory category,
            String eventTitle,
            String eventDescription,
            String affectedEntity,
            String affectedEntityType,
            UUID affectedEntityId,
            String changeFrom,
            String changeTo,
            String changeReason,
            String severity,
            boolean isSystemGenerated
    ) {
        try {
            CreateAuditLogRequest auditLogRequest = CreateAuditLogRequest.builder()
                    .tenantId(tenantId)
                    .schoolId(schoolId)
                    .userId(userId)
                    .userName(userName)
                    .userRole(userRole)
                    .category(category)
                    .eventTitle(eventTitle)
                    .eventDescription(eventDescription)
                    .affectedEntity(affectedEntity)
                    .affectedEntityType(affectedEntityType)
                    .affectedEntityId(affectedEntityId)
                    .changeFrom(changeFrom)
                    .changeTo(changeTo)
                    .changeReason(changeReason)
                    .severity(severity)
                    .isSystemGenerated(isSystemGenerated)
                    .build();

            auditLogService.createAuditLog(auditLogRequest);
            log.debug("Created audit log: {} - {}", category, eventTitle);
        } catch (Exception e) {
            // Don't fail the operation if audit logging fails
            log.error("Failed to create audit log for {}: {}", eventTitle, e.getMessage());
        }
    }
}
