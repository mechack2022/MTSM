package com.school.attendance.tenant.service;

import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.keycloak.KeycloakUserService;
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
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final KeycloakUserService keycloakUserService;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Transactional
    public CreateTenantResponse createTenant(CreateTenantRequest request) {
        if (tenantRepository.existsByCode(request.code())) {
            throw new DuplicateResourceException("Tenant code already exists: " + request.code());
        }

        Tenant tenant = Tenant.builder()
                .code(request.code())
                .name(request.name())
                .cacNumber(request.cacNumber())
                .subdomain(request.subdomain())
                .state(request.state())
                .address(request.address())
                .contactName(request.contactName())
                .roleTitle(request.roleTitle())
                .contactEmail(request.contactEmail())
                .contactPhone(request.contactPhone())
                .status(Tenant.TenantStatus.ACTIVE)
                .subscriptionTier(request.subscriptionTier())
                .studentQuota(request.studentQuota())
                .billingCycle(request.billingCycle())
                .subscriptionStartDate(request.subscriptionStartDate() != null ? request.subscriptionStartDate() : Instant.now())
                .subscriptionEndDate(request.subscriptionEndDate())
                .metadata(request.metadata())
                .build();

        Tenant savedTenant = tenantRepository.save(tenant);
        log.info("Created tenant: {} ({})", savedTenant.getName(), savedTenant.getCode());

        String tempPassword = generateTemporaryPassword();
        String keycloakUserId = keycloakUserService.createTenantAdmin(
                savedTenant.getId().toString(),
                request.contactName(),
                request.contactEmail(),
                tempPassword
        );

        log.info("Created Keycloak tenant admin: {} for tenant: {}", keycloakUserId, savedTenant.getCode());

        String portalUrl = request.subdomain() != null
                ? "https://" + request.subdomain() + ".edumanage.ng"
                : "https://app.edumanage.ng";

        var credentials = new CreateTenantResponse.AdminCredentials(
                request.contactName(),
                request.contactEmail(),
                tempPassword,
                portalUrl
        );

        return new CreateTenantResponse(TenantResponse.from(savedTenant), credentials);
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(TenantResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> getAllActiveTenants() {
        return tenantRepository.findAllActive().stream()
                .map(TenantResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantById(UUID id) {
        return tenantRepository.findById(id)
                .map(TenantResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public TenantResponse getTenantByCode(String code) {
        return tenantRepository.findByCode(code)
                .map(TenantResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with code: " + code));
    }

    @Transactional
    public TenantResponse updateTenant(UUID id, UpdateTenantRequest request) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        if (request.name() != null) tenant.setName(request.name());
        if (request.state() != null) tenant.setState(request.state());
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

        return TenantResponse.from(updatedTenant);
    }

    @Transactional
    public void deleteTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + id));

        tenantRepository.delete(tenant);
        log.info("Deleted tenant: {} ({})", tenant.getName(), tenant.getCode());
    }

    @Transactional(readOnly = true)
    public List<TenantResponse> searchTenants(String searchTerm) {
        return tenantRepository.searchByNameOrCode(searchTerm).stream()
                .map(TenantResponse::from)
                .toList();
    }

    private String generateTemporaryPassword() {
        StringBuilder password = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            password.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return password.toString();
    }
}
