package com.school.attendance.tenant.service;

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
import com.school.attendance.tenant.dto.CreateTenantRequest;
import com.school.attendance.tenant.dto.CreateTenantResponse;
import com.school.attendance.tenant.dto.TenantResponse;
import com.school.attendance.tenant.dto.UpdateTenantRequest;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final KeycloakUserService keycloakUserService;
    private final EmailVerificationService emailVerificationService;
    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;

    @Transactional
    public CreateTenantResponse createTenant(CreateTenantRequest request) {
        if (tenantRepository.existsByCode(request.code())) {
            throw new DuplicateResourceException("Tenant code already exists: " + request.code());
        }

        // Check for duplicate email
        if (tenantRepository.existsByContactEmail(request.contactEmail())) {
            throw new DuplicateResourceException("A tenant with this email address already exists: " + request.contactEmail());
        }

        // Check for duplicate CAC number (if provided)
        if (request.cacNumber() != null && !request.cacNumber().isBlank() &&
            tenantRepository.existsByCacNumber(request.cacNumber())) {
            throw new DuplicateResourceException("A tenant with this CAC number already exists: " + request.cacNumber());
        }

        // Check for duplicate contact phone (if provided)
        if (request.contactPhone() != null && !request.contactPhone().isBlank() &&
            tenantRepository.existsByContactPhone(request.contactPhone())) {
            throw new DuplicateResourceException("A tenant with this contact phone already exists: " + request.contactPhone());
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

        Tenant tenant = Tenant.builder()
                .code(request.code())
                .name(request.name())
                .cacNumber(request.cacNumber())
                .subdomain(request.subdomain())
                .state(state)
                .localGovernment(localGovernment)
                .address(request.address())
                .contactName(request.contactName())
                .roleTitle(request.roleTitle())
                .contactEmail(request.contactEmail())
                .contactPhone(request.contactPhone())
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

        String tempPassword = PasswordGenerator.generatePassword();
        String keycloakUserId = keycloakUserService.createTenantAdmin(
                savedTenant.getId().toString(),
                request.contactName(),
                request.contactEmail(),
                tempPassword
        );

        log.info("Created Keycloak tenant admin: {} for tenant: {}", keycloakUserId, savedTenant.getCode());

        // Send email verification
        Map<String, Object> metadata = Map.of(
                "tenantId", savedTenant.getId().toString(),
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

        String portalUrl = request.subdomain() != null
                ? "https://" + request.subdomain() + ".edumanage.ng"
                : "https://app.edumanage.ng";

        var credentials = new CreateTenantResponse.AdminCredentials(
                request.contactName(),
                request.contactEmail(),
                portalUrl
        );

        boolean emailVerified = emailVerificationService.isEmailVerified(
                request.contactEmail(),
                EmailVerification.VerificationType.TENANT_ADMIN
        );
        return new CreateTenantResponse(TenantResponse.from(savedTenant, emailVerified), credentials);
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
        if (request.contactName() != null) tenant.setContactName(request.contactName());
        if (request.roleTitle() != null) tenant.setRoleTitle(request.roleTitle());
        if (request.contactEmail() != null) tenant.setContactEmail(request.contactEmail());
        if (request.contactPhone() != null) tenant.setContactPhone(request.contactPhone());
        if (request.status() != null) tenant.setStatus(request.status());
        if (request.subscriptionTier() != null) tenant.setSubscriptionTier(request.subscriptionTier());
        if (request.studentQuota() != null) tenant.setStudentQuota(request.studentQuota());
        if (request.billingCycle() != null) tenant.setBillingCycle(request.billingCycle());
        if (request.subscriptionStartDate() != null) tenant.setSubscriptionStartDate(request.subscriptionStartDate());
        if (request.subscriptionEndDate() != null) tenant.setSubscriptionEndDate(request.subscriptionEndDate());
        if (request.metadata() != null) tenant.setMetadata(request.metadata());

        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Updated tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        return toTenantResponse(updatedTenant);
    }

    @Transactional
    public void deleteTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        // Soft delete - set deletedAt timestamp instead of removing from database
        tenant.setDeletedAt(Instant.now());
        tenantRepository.save(tenant);
        log.info("Soft deleted tenant: {} ({})", tenant.getName(), tenant.getCode());
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

        if (tenant.getStatus() == Tenant.TenantStatus.ACTIVE) {
            throw new IllegalStateException("Tenant is already active");
        }

        // Check if email has been verified before allowing activation
        boolean emailVerified = emailVerificationService.isEmailVerified(
                tenant.getContactEmail(),
                EmailVerification.VerificationType.TENANT_ADMIN
        );

        if (!emailVerified) {
            throw new IllegalStateException("Cannot activate tenant. Email verification is required before activation.");
        }

        // Enable the Keycloak user so they can login
        keycloakUserService.getUserByEmail(tenant.getContactEmail())
                .ifPresent(user -> {
                    keycloakUserService.enableUser(user.getId());
                    log.info("Enabled Keycloak user: {} for tenant: {}", tenant.getContactEmail(), tenant.getCode());
                });

        tenant.setStatus(Tenant.TenantStatus.ACTIVE);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Activated tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        return toTenantResponse(updatedTenant);
    }

    @Transactional
    public TenantResponse suspendTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        if (tenant.getStatus() == Tenant.TenantStatus.SUSPENDED) {
            throw new IllegalStateException("Tenant is already suspended");
        }

        // Disable the Keycloak user so they cannot login
        keycloakUserService.getUserByEmail(tenant.getContactEmail())
                .ifPresent(user -> {
                    keycloakUserService.disableUser(user.getId());
                    log.info("Disabled Keycloak user: {} for tenant: {}", tenant.getContactEmail(), tenant.getCode());
                });

        tenant.setStatus(Tenant.TenantStatus.SUSPENDED);
        Tenant updatedTenant = tenantRepository.save(tenant);
        log.info("Suspended tenant: {} ({})", updatedTenant.getName(), updatedTenant.getCode());

        return toTenantResponse(updatedTenant);
    }

    private TenantResponse toTenantResponse(Tenant tenant) {
        boolean emailVerified = emailVerificationService.isEmailVerified(
                tenant.getContactEmail(),
                EmailVerification.VerificationType.TENANT_ADMIN
        );
        return TenantResponse.from(tenant, emailVerified);
    }
}
