package com.school.attendance.school;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.school.dto.UpdateSchoolRequest;
import com.school.attendance.school.mapper.SchoolMapper;
import com.school.attendance.security.CustomUserDetails;
import com.school.attendance.school.dto.SchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final TenantRepository tenantRepository;
    private final CodeSetRepository codeSetRepository;
    private final SchoolMapper schoolMapper;

    @Transactional
    public SchoolResponse createSchool(SchoolRequest request, UUID targetTenantId) {
        CustomUserDetails currentUser = getCurrentUserDetails();

        // 1. Resolve the target tenant (use provided or infer from user)
        UUID effectiveTenantId = resolveTargetTenant(currentUser, targetTenantId);

        // 2. Validate tenant exists
        if (!tenantRepository.existsById(effectiveTenantId)) {
            throw new BusinessException(MessageKey.TENANT_NOT_FOUND);
        }

        // 3. Validate creator has access to the target tenant
        validateTenantAccess(currentUser, effectiveTenantId);

        // 4. Validate code uniqueness (schema has uk_school_code)
        if (schoolRepository.existsByCode(request.code())) {
            throw new BusinessException(MessageKey.SCHOOL_CODE_ALREADY_EXISTS);
        }

        // 6. Build and save the school
        School school = School.builder()
                .tenantId(effectiveTenantId)
                .name(request.name().trim())
                .code(request.code().trim().toUpperCase())
                .address(request.address())
                .academicYearId(null)
                .currentTermId(null)
                .phone(request.phone())
                .email(request.email())
                .logoUrl(request.logoUrl())
                .build();

        School saved = schoolRepository.save(school);
        return schoolMapper.toDto(saved);
    }

    public List<SchoolResponse> getAllSchools() {
        CustomUserDetails currentUser = getCurrentUserDetails();

        List<School> schools;

        if (currentUser.isPlatformAdmin()) {
            schools = schoolRepository.findAll();
        } else if (currentUser.isTenantScoped()) {
            schools = schoolRepository.findByTenantId(currentUser.getTenantId());
        } else {
            // School-scoped user: return only their assigned schools
            List<UUID> assignedSchoolIds = List.copyOf(currentUser.getAssignedSchoolIds());
            schools = schoolRepository.findByIdIn(assignedSchoolIds);
        }

        return schools.stream()
                .map(schoolMapper::toDto)
                .toList();
    }

    public SchoolResponse getSchoolById(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));

        validateCanSeeSchool(getCurrentUserDetails(), school);
        return schoolMapper.toDto(school);
    }

    public SchoolResponse getSchoolByCode(String code) {
        School school = schoolRepository.findByCode(code.toUpperCase())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));

        validateCanSeeSchool(getCurrentUserDetails(), school);
        return schoolMapper.toDto(school);
    }

    @Transactional
    public SchoolResponse updateSchool(UUID id, UpdateSchoolRequest request) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));

        CustomUserDetails currentUser = getCurrentUserDetails();
        validateCanModifySchool(currentUser, school);

        // Update basic fields (only if provided)
        if (request.name() != null && !request.name().isBlank()) {
            school.setName(request.name().trim());
        }
        if (request.address() != null) school.setAddress(request.address());
        if (request.phone() != null) school.setPhone(request.phone());
        if (request.email() != null) school.setEmail(request.email());
        if (request.logoUrl() != null) school.setLogoUrl(request.logoUrl());

        if (request.academicYearId() != null) {
            validateCodeSetBelongsToTenant(request.academicYearId(), school.getTenantId(), CodeSetGroup.ACADEMIC_YEAR);
            school.setAcademicYearId(request.academicYearId());
        }

        if (request.currentTermId() != null) {
            validateCodeSetBelongsToTenant(request.currentTermId(), school.getTenantId(), CodeSetGroup.ACADEMIC_TERM);
            school.setCurrentTermId(request.currentTermId());
        }

        return schoolMapper.toDto(schoolRepository.save(school));
    }

    // ══════════════════════════════════════════════════════════════
    // AUTHORIZATION HELPERS
    // ══════════════════════════════════════════════════════════════

    private UUID resolveTargetTenant(CustomUserDetails currentUser, UUID requestedTenantId) {
        if (currentUser.isPlatformAdmin()) {
            // Platform admin MUST specify the target tenant
            if (requestedTenantId == null) {
                throw new BusinessException(MessageKey.INVALID_REQUEST, "tenantId is required for platform admins");
            }
            return requestedTenantId;
        }

        return currentUser.getTenantId();
    }

    private void validateTenantAccess(CustomUserDetails creator, UUID targetTenantId) {
        if (creator.isPlatformAdmin()) return;
        if (!java.util.Objects.equals(creator.getTenantId(), targetTenantId)) {
            throw new BusinessException(MessageKey.UNAUTHORIZED_TENANT_ACCESS);
        }
    }

    private void validateCanSeeSchool(CustomUserDetails currentUser, School school) {
        if (currentUser.isPlatformAdmin()) return;
        if (!currentUser.getTenantId().equals(school.getTenantId())) {
            throw new BusinessException(MessageKey.SCHOOL_NOT_FOUND); // Don't leak existence
        }
        if (currentUser.isSchoolScoped() &&
                !currentUser.getAssignedSchoolIds().contains(school.getId())) {
            throw new BusinessException(MessageKey.SCHOOL_NOT_FOUND);
        }
    }

    private void validateCanModifySchool(CustomUserDetails currentUser, School school) {
        validateCanSeeSchool(currentUser, school);
        // School-scoped users cannot modify schools (only view them)
        if (currentUser.isSchoolScoped()) {
            throw new BusinessException(MessageKey.UNAUTHORIZED_SCHOOL_ACCESS);
        }
    }


    private CustomUserDetails getCurrentUserDetails() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails userDetails) {
            return userDetails;
        }
        throw new BusinessException(MessageKey.AUTH_UNAUTHORIZED);
    }

    private void validateCodeSetBelongsToTenant(UUID codeSetId, UUID tenantId, CodeSetGroup expectedGroup) {
        CodeSet codeSet = codeSetRepository.findById(codeSetId)
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));

        if (codeSet.getCodeSetGroup() != expectedGroup) {
            throw new BusinessException(MessageKey.INVALID_REQUEST,
                    String.format("Provided ID is not a valid %s", expectedGroup.name()));
        }

        // ✅ Just check tenant - no school lookup needed!
        if (!codeSet.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CODESET_OUTSIDE_TENANT);
        }
    }

}