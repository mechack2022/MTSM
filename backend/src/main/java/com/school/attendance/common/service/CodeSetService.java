package com.school.attendance.common.service;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.dto.CodeSetRequest;
import com.school.attendance.common.dto.CodeSetResponse;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.mapper.CodeSetMapper;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.school.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import com.school.attendance.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;


@Service
@RequiredArgsConstructor
public class CodeSetService {

    private final CodeSetRepository codeSetRepository;
    private final CodeSetMapper codeSetMapper;

    @Transactional
    public CodeSetResponse createCodeSet(CodeSetRequest request) {
        UUID tenantId = resolveTenantId(request.targetTenantId());

        if (codeSetRepository.existsByTenantIdAndCodeSetGroupAndCode(
                tenantId, request.codeSetGroup(), request.code())) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_EXISTS);
        }

        CodeSet codeSet = CodeSet.builder()
                .tenantId(tenantId)
                .codeSetGroup(request.codeSetGroup())
                .code(request.code().trim().toUpperCase())
                .displayName(request.displayName().trim())
                .description(request.description())
                .attributes(request.attributes())
                .sortOrder(request.sortOrder())
                .isActive(true)
                .build();

        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    public List<CodeSetResponse> getActiveCodeSetsByGroup(CodeSetGroup group) {
        UUID tenantId = getTenantId();
        return codeSetRepository
                .findByTenantIdAndCodeSetGroupAndIsActiveTrueOrderBySortOrderAsc(tenantId, group)
                .stream()
                .map(codeSetMapper::toDto)
                .toList();
    }

    /**
     * Get ALL code sets for a group (including inactive).
     * Useful for admin management screens.
     */
    public List<CodeSetResponse> getAllCodeSetsByGroup(CodeSetGroup group) {
        UUID tenantId = getTenantId();
        return codeSetRepository
                .findByTenantIdAndCodeSetGroupOrderBySortOrderAsc(tenantId, group)
                .stream()
                .map(codeSetMapper::toDto)
                .toList();
    }

    /**
     * Get a single code set by ID.
     */
    public CodeSetResponse getCodeSetById(UUID id) {
        UUID tenantId = getTenantId();
        return codeSetRepository.findById(id)
                .filter(cs -> cs.getTenantId().equals(tenantId)) // Ensure it belongs to this tenant
                .map(codeSetMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));
    }

    @Transactional
    public CodeSetResponse updateCodeSet(UUID id, CodeSetRequest request) {
        UUID tenantId = getTenantId();
        CodeSet codeSet = codeSetRepository.findById(id)
                .filter(cs -> cs.getTenantId().equals(tenantId))
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));

        if (!codeSet.getCode().equalsIgnoreCase(request.code())) {
            if (codeSetRepository.existsByTenantIdAndCodeSetGroupAndCode(
                    tenantId, request.codeSetGroup(), request.code())) {
                throw new BusinessException(MessageKey.CODESET_ALREADY_EXISTS);
            }
        }

        codeSet.setCodeSetGroup(request.codeSetGroup());
        codeSet.setCode(request.code().trim().toUpperCase());
        codeSet.setDisplayName(request.displayName().trim());
        codeSet.setDescription(request.description());
        codeSet.setAttributes(request.attributes());
        codeSet.setSortOrder(request.sortOrder());

        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    @Transactional
    public CodeSetResponse deactivateCodeSet(UUID id) {
        CodeSet codeSet = findCodeSetById(id);
        if (!codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_DEACTIVATED);
        }
        codeSet.setIsActive(false);
        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    /**
     * Reactivate a previously deactivated code set.
     * Idempotent - safe to call multiple times.
     */
    @Transactional
    public CodeSetResponse activateCodeSet(UUID id) {
        CodeSet codeSet = findCodeSetById(id);
        if (codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_ACTIVE);
        }
        codeSet.setIsActive(true);
        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    public void validateCodeExists(CodeSetGroup group, UUID codeSetId) {
        UUID tenantId = getTenantId();
        CodeSet codeSet = codeSetRepository.findById(codeSetId)
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));

        if (!codeSet.getTenantId().equals(tenantId)
                || !codeSet.getCodeSetGroup().equals(group)
                || !codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_NOT_FOUND);
        }
    }

    // ══════════════════════════════════════════════════════════════
    // TENANT RESOLUTION HELPERS
    // ══════════════════════════════════════════════════════════════

    private CodeSet findCodeSetById(UUID id) {
        UUID tenantId = getTenantId();
        return codeSetRepository.findById(id)
                .filter(cs -> cs.getTenantId().equals(tenantId))
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));
    }

    /**
     * Resolves the tenant ID for the current operation.
     * - Tenant/ School-scoped users: use their own tenant ID
     * - Platform admins: must specify targetTenantId (e.g. via request DTO)
     */
    private UUID resolveTenantId(UUID requestedTenantId) {
        CustomUserDetails currentUser = getCurrentUserDetails();

        if (currentUser.isPlatformAdmin()) {
            if (requestedTenantId == null) {
                throw new BusinessException(MessageKey.INVALID_REQUEST,
                        "targetTenantId is required for platform admins");
            }
            return requestedTenantId;
        }

        // Tenant-scoped and school-scoped users both belong to a tenant
        return currentUser.getTenantId();
    }


    private UUID getTenantId() {
        CustomUserDetails currentUser = getCurrentUserDetails();

        if (currentUser.isPlatformAdmin()) {
            throw new BusinessException(MessageKey.INVALID_REQUEST,
                    "Platform admins must specify a target tenant");
        }

        return currentUser.getTenantId();
    }

    private CustomUserDetails getCurrentUserDetails() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails userDetails) {
            return userDetails;
        }
        throw new BusinessException(MessageKey.AUTH_UNAUTHORIZED);
    }
}