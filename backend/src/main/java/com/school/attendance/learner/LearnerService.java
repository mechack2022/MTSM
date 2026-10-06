package com.school.attendance.learner;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.service.CodeSetService;
import com.school.attendance.learner.dto.CreateLearnerRequest;
import com.school.attendance.learner.dto.LearnerResponse;
import com.school.attendance.learner.dto.UpdateLearnerRequest;
import com.school.attendance.learner.entity.Learner;
import com.school.attendance.learner.entity.LearnerNumberGenerator;
import com.school.attendance.learner.mapper.LearnerMapper;
import com.school.attendance.learner.repository.LearnerRepository;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LearnerService {

    private final LearnerRepository learnerRepository;
    private final SchoolRepository schoolRepository;
    private final LearnerMapper learnerMapper;
    private final CodeSetService codeSetService;
   private final LearnerNumberGenerator learnerNumberGenerator;
    @Transactional
    public LearnerResponse createLearner(CreateLearnerRequest request) {
        CustomUserDetails currentUser = getCurrentUserDetails();
        UUID tenantId = getTenantId();

        // Validate and get school
        School school = schoolRepository.findById(request.schoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));

        // Validate school belongs to the current tenant
        validateSchoolBelongsToTenant(school, tenantId);

        // Validate user has access to this school
        validateUserHasAccessToSchool(currentUser, school);

        // Validate grade level exists in code_set
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());

        // ✅ AUTO-GENERATE student number if blank
        String learnerNumber = (request.learnerNumber() == null || request.learnerNumber().isBlank())
                ? learnerNumberGenerator.generateNext(request.schoolId())
                : request.learnerNumber().trim().toUpperCase();

        // Validate student number uniqueness within the school
        if (learnerRepository.existsByTenantIdAndSchoolIdAndLearnerNumber(tenantId, request.schoolId(), learnerNumber)) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_EXISTS);
        }

        Learner learner = Learner.builder()
                .tenantId(tenantId)
                .schoolId(request.schoolId())
                .firstName(request.firstName().trim())
                .lastName(request.lastName().trim())
                .learnerNumber(learnerNumber)
                .gradeLevelId(request.gradeLevelId())
                .dateOfBirth(request.dateOfBirth())
                .sex(request.sex())
                .previousSchoolName(request.previousSchoolName())
                .isActive(true)
                .build();

        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    public List<LearnerResponse> getAllActiveLearners() {
        UUID tenantId = getTenantId();
        return learnerRepository.findByTenantIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(tenantId)
                .stream()
                .map(learnerMapper::toDto)
                .toList();
    }

    public List<LearnerResponse> getLearnersByGradeLevel(UUID gradeLevelId, UUID schoolId) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        if (schoolId != null) {
            // Validate school access
            School school = schoolRepository.findById(schoolId)
                    .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
            validateSchoolBelongsToTenant(school, tenantId);
            validateUserHasAccessToSchool(currentUser, school);

            return learnerRepository.findByTenantIdAndSchoolIdAndGradeLevelIdAndIsActiveTrue(
                    tenantId, schoolId, gradeLevelId)
                    .stream()
                    .map(learnerMapper::toDto)
                    .toList();
        } else {
            // Return all learners for the tenant (filtered by RLS)
            return learnerRepository.findByTenantIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(tenantId)
                    .stream()
                    .filter(l -> l.getGradeLevelId().equals(gradeLevelId))
                    .map(learnerMapper::toDto)
                    .toList();
        }
    }

    public LearnerResponse getLearnerById(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        // Validate tenant access
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        // Validate school access for school-scoped users
        if (currentUser.isSchoolScoped()) {
            if (!currentUser.getAssignedSchoolIds().contains(learner.getSchoolId())) {
                throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
            }
        }

        return learnerMapper.toDto(learner);
    }

    @Transactional
    public LearnerResponse updateLearner(UUID id, UpdateLearnerRequest request) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        // Validate tenant access
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(learner.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        // Validate grade level
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());

        //  Student number is NOT updated (audit integrity)
        learner.setFirstName(request.firstName().trim());
        learner.setLastName(request.lastName().trim());
        learner.setGradeLevelId(request.gradeLevelId());
        learner.setDateOfBirth(request.dateOfBirth());
        learner.setSex(request.sex());
        learner.setPreviousSchoolName(request.previousSchoolName());

        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    @Transactional
    public LearnerResponse deactivateLearner(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        // Validate tenant access
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(learner.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        if (!learner.getIsActive()) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_DEACTIVATED);
        }

        learner.setIsActive(false);
        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    @Transactional
    public LearnerResponse activateLearner(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        // Validate tenant access
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(learner.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        if (learner.getIsActive()) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_ACTIVE);
        }

        learner.setIsActive(true);
        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    // Helper for EnrollmentService
    public Learner findLearnerEntityById(UUID id) {
        UUID tenantId = getTenantId();

        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        // Validate tenant access
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        return learner;
    }

    // ══════════════════════════════════════════════════════════════
    // TENANT CONTEXT & AUTHORIZATION HELPERS
    // ══════════════════════════════════════════════════════════════

    private CustomUserDetails getCurrentUserDetails() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails userDetails) {
            return userDetails;
        }
        throw new BusinessException(MessageKey.AUTH_UNAUTHORIZED);
    }

    private UUID getTenantId() {
        CustomUserDetails currentUser = getCurrentUserDetails();
        if (currentUser.isPlatformAdmin()) {
            throw new BusinessException(MessageKey.INVALID_REQUEST,
                    "Platform admins must operate within a tenant context");
        }
        return currentUser.getTenantId();
    }

    private void validateSchoolBelongsToTenant(School school, UUID tenantId) {
        if (!school.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.SCHOOL_NOT_FOUND);
        }
    }

    private void validateUserHasAccessToSchool(CustomUserDetails currentUser, School school) {
        if (currentUser.isPlatformAdmin()) {
            return; // Platform admins have access to all schools
        }

        if (currentUser.isTenantScoped()) {
            return; // Tenant-scoped users have access to all schools in their tenant
        }

        // School-scoped users must have explicit access
        if (!currentUser.getAssignedSchoolIds().contains(school.getId())) {
            throw new BusinessException(MessageKey.UNAUTHORIZED_SCHOOL_ACCESS);
        }
    }
}