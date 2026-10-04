package com.school.attendance.classsection;

import com.school.attendance.classsection.dto.ClassSectionRequest;
import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.classsection.mapper.ClassSectionMapper;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.service.CodeSetService;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.security.CustomUserDetails;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClassSectionService {

    private final ClassSectionRepository classSectionRepository;
    private final SchoolRepository schoolRepository;
    private final ClassSectionMapper classSectionMapper;
    private final AppUserRepository userRepository;
    private final CodeSetService codeSetService;

    @Transactional
    public ClassSectionResponse createClassSection(ClassSectionRequest request) {
        CustomUserDetails currentUser = getCurrentUserDetails();
        UUID tenantId = getTenantId();

        // Validate and get school
        School school = schoolRepository.findById(request.schoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));

        // Validate school belongs to the current tenant
        validateSchoolBelongsToTenant(school, tenantId);

        // Validate user has access to this school
        validateUserHasAccessToSchool(currentUser, school);

        // Validate grade level and academic year belong to tenant
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());

        // Check for duplicate class section name within the same school and academic year
        if (classSectionRepository.existsByTenantIdAndSchoolIdAndNameAndAcademicYearId(
                tenantId, request.schoolId(), request.name(), request.academicYearId())) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_EXISTS);
        }

        // Validate class teacher if provided
        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }

        ClassSection classSection = ClassSection.builder()
                .tenantId(tenantId)
                .schoolId(request.schoolId())
                .name(request.name())
                .gradeLevelId(request.gradeLevelId())
                .academicYearId(request.academicYearId())
                .classTeacherId(request.classTeacherId())
                .capacity(request.capacity())
                .isActive(true)
                .build();

        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    public List<ClassSectionResponse> getAllActiveClasses() {
        UUID tenantId = getTenantId();
        return classSectionRepository.findByTenantIdAndIsActiveTrue(tenantId).stream()
                .map(classSectionMapper::toDto)
                .toList();
    }

    public List<ClassSectionResponse> getClassesByAcademicYear(UUID academicYearId, UUID schoolId) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        if (schoolId != null) {
            // Validate school access
            School school = schoolRepository.findById(schoolId)
                    .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
            validateSchoolBelongsToTenant(school, tenantId);
            validateUserHasAccessToSchool(currentUser, school);

            return classSectionRepository.findByTenantIdAndSchoolIdAndAcademicYearIdAndIsActiveTrue(
                    tenantId, schoolId, academicYearId).stream()
                    .map(classSectionMapper::toDto)
                    .toList();
        } else {
            // Return all classes for the tenant (filtered by RLS)
            return classSectionRepository.findByTenantIdAndIsActiveTrue(tenantId).stream()
                    .filter(cs -> cs.getAcademicYearId().equals(academicYearId))
                    .map(classSectionMapper::toDto)
                    .toList();
        }
    }

    public List<ClassSectionResponse> getClassesByGradeLevel(UUID gradeLevelId, UUID schoolId) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        if (schoolId != null) {
            // Validate school access
            School school = schoolRepository.findById(schoolId)
                    .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
            validateSchoolBelongsToTenant(school, tenantId);
            validateUserHasAccessToSchool(currentUser, school);

            return classSectionRepository.findByTenantIdAndSchoolIdAndGradeLevelIdAndIsActiveTrue(
                    tenantId, schoolId, gradeLevelId).stream()
                    .map(classSectionMapper::toDto)
                    .toList();
        } else {
            // Return all classes for the tenant (filtered by RLS)
            return classSectionRepository.findByTenantIdAndIsActiveTrue(tenantId).stream()
                    .filter(cs -> cs.getGradeLevelId().equals(gradeLevelId))
                    .map(classSectionMapper::toDto)
                    .toList();
        }
    }

    public ClassSectionResponse getClassSectionById(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        // Validate tenant access
        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate school access for school-scoped users
        if (currentUser.isSchoolScoped()) {
            if (!currentUser.getAssignedSchoolIds().contains(classSection.getSchoolId())) {
                throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
            }
        }

        return classSectionMapper.toDto(classSection);
    }

    @Transactional
    public ClassSectionResponse updateClassSection(UUID id, ClassSectionRequest request) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        // Validate tenant access
        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(classSection.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        // Validate grade level and academic year
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());

        // Validate teacher if provided
        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }

        classSection.setName(request.name());
        classSection.setGradeLevelId(request.gradeLevelId());
        classSection.setAcademicYearId(request.academicYearId());
        classSection.setClassTeacherId(request.classTeacherId());
        classSection.setCapacity(request.capacity());

        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse deactivateClassSection(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        // Validate tenant access
        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(classSection.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        if (!classSection.getIsActive()) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_DEACTIVATED);
        }

        classSection.setIsActive(false);
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse activateClassSection(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        // Validate tenant access
        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate school access
        School school = schoolRepository.findById(classSection.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        if (classSection.getIsActive()) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_ACTIVE);
        }

        classSection.setIsActive(true);
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
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