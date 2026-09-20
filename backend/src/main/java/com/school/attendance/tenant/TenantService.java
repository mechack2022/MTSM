package com.school.attendance.tenant;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.tenant.dto.CreateTenantRequest;
import com.school.attendance.tenant.dto.TenantMapper;
import com.school.attendance.tenant.dto.TenantResponse;
import com.school.attendance.tenant.dto.UpdateTenantRequest;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;
    private final TenantCodeGenerator tenantCodeGenerator;

    @Transactional
    public TenantResponse createTenant(CreateTenantRequest request) {
        if (request.contactEmail() != null &&
                tenantRepository.existsByContactEmail(request.contactEmail())) {
            throw new BusinessException(MessageKey.TENANT_EMAIL_ALREADY_EXISTS);
        }

        if (request.contactPhone() != null &&
                tenantRepository.existsByContactPhone(request.contactPhone())) {
            throw new BusinessException(MessageKey.TENANT_PHONE_ALREADY_EXISTS);
        }
        // ✅ Auto-generate the unique 6-char code
        String code = tenantCodeGenerator.generateUnique();

        Tenant tenant = Tenant.builder()
                .name(request.name().trim())
                .code(code)
                .contactEmail(request.contactEmail())
                .contactPhone(request.contactPhone())
                .isActive(true)
                .build();

        return tenantMapper.toDto(tenantRepository.save(tenant));
    }

    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenantMapper::toDto)
                .toList();
    }

    public TenantResponse getTenantById(UUID id) {
        return tenantRepository.findById(id)
                .map(tenantMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));
    }

    public TenantResponse getTenantByCode(String code) {
        return tenantRepository.findByCode(code.toUpperCase())
                .map(tenantMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));
    }

//    @Transactional
//    public TenantResponse updateTenant(UUID id, UpdateTenantRequest request) {
//        Tenant tenant = tenantRepository.findById(id)
//                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));
//
//        tenant.setName(request.name().trim());
//        tenant.setContactEmail(request.contactEmail());
//        tenant.setContactPhone(request.contactPhone());
//
//        return tenantMapper.toDto(tenantRepository.save(tenant));
//    }

    @Transactional
    public TenantResponse updateTenant(UUID id, UpdateTenantRequest request) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));

        tenant.setName(request.name().trim());
        tenant.setContactEmail(request.contactEmail());
        tenant.setContactPhone(request.contactPhone());

        return tenantMapper.toDto(tenantRepository.save(tenant));
    }

    @Transactional
    public TenantResponse deactivateTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));

        if (!tenant.getIsActive()) {
            throw new BusinessException(MessageKey.TENANT_ALREADY_DEACTIVATED);
        }

        tenant.setIsActive(false);
        return tenantMapper.toDto(tenantRepository.save(tenant));
    }

    @Transactional
    public TenantResponse activateTenant(UUID id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));

        if (tenant.getIsActive()) {
            throw new BusinessException(MessageKey.TENANT_ALREADY_ACTIVE);
        }

        tenant.setIsActive(true);
        return tenantMapper.toDto(tenantRepository.save(tenant));
    }

    /**
     * Internal helper for other services that need the raw entity.
     * Used by SchoolContext, SchoolService, etc.
     */
    public Tenant findTenantEntityById(UUID id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.TENANT_NOT_FOUND));
    }
}
