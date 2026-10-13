package com.school.attendance.enrollment;

import com.school.attendance.classsection.ClassSectionRepository;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.service.CodeSetService;
import com.school.attendance.enrollment.dto.EnrollLearnerRequest;
import com.school.attendance.enrollment.dto.EnrollmentResponse;

import com.school.attendance.enrollment.mapper.EnrollmentMapper;

import com.school.attendance.learner.entity.Learner;
import com.school.attendance.learner.repository.LearnerRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final LearnerRepository learnerRepository;
    private final ClassSectionRepository classSectionRepository;
    private final SchoolRepository schoolRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final CodeSetService codeSetService;

    @Transactional
    public EnrollmentResponse enrollLearner(EnrollLearnerRequest request) {
        CustomUserDetails currentUser = getCurrentUserDetails();
        UUID tenantId = getTenantId();

        // Validate learner exists and is active
        Learner learner = learnerRepository.findById(request.learnerId())
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));
        if (!learner.getIsActive()) {
            throw new BusinessException(MessageKey.ENROLLMENT_LEARNER_DEACTIVATED);
        }

        // Validate learner belongs to current tenant
        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        // Validate class section exists and is active
        ClassSection classSection = classSectionRepository.findById(request.classSectionId())
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));
        if (!classSection.getIsActive()) {
            throw new BusinessException(MessageKey.ENROLLMENT_CLASS_DEACTIVATED);
        }

        // Validate class section belongs to current tenant
        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate learner and class are from the same school
        if (!learner.getSchoolId().equals(classSection.getSchoolId())) {
            throw new BusinessException(MessageKey.INVALID_REQUEST,
                    "Learner and class must be from the same school");
        }

        // Get school for access validation
        School school = schoolRepository.findById(learner.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateSchoolBelongsToTenant(school, tenantId);
        validateUserHasAccessToSchool(currentUser, school);

        // Validate Academic Year exists in code_set
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());

        // Validate Grade Level Match
        if (!learner.getGradeLevelId().equals(classSection.getGradeLevelId())) {
            throw new BusinessException(MessageKey.ENROLLMENT_GRADE_MISMATCH);
        }

        // Validate TRANSFER_IN has previousSchoolName
        if (request.enrollmentType() == EnrollmentType.TRANSFER_IN) {
            if (request.previousSchoolName() == null || request.previousSchoolName().isBlank()) {
                throw new BusinessException(MessageKey.ENROLLMENT_PREVIOUS_SCHOOL_REQUIRED);
            }
            learner.setPreviousSchoolName(request.previousSchoolName().trim());
            learnerRepository.save(learner);
        }

        // Check for existing active enrollment in the same academic year
        enrollmentRepository.findByLearnerIdAndAcademicYearIdAndStatus(
                        request.learnerId(), request.academicYearId(), EnrollmentStatus.ACTIVE)
                .ifPresent(existing -> {
                    throw new BusinessException(MessageKey.ENROLLMENT_ALREADY_ENROLLED);
                });

        Enrollment enrollment = Enrollment.builder()
                .tenantId(tenantId)
                .schoolId(school.getId())
                .learnerId(request.learnerId())
                .classSectionId(request.classSectionId())
                .academicYearId(request.academicYearId())
                .enrollmentDate(request.enrollmentDate())
                .status(EnrollmentStatus.ACTIVE)
                .enrollmentType(request.enrollmentType())
                .build();

        return enrollmentMapper.toDto(enrollmentRepository.save(enrollment));
    }

    public List<EnrollmentResponse> getEnrollmentsByClass(UUID classSectionId) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        // Validate class section exists and belongs to tenant
        ClassSection classSection = classSectionRepository.findById(classSectionId)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        if (!classSection.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.CLASS_NOT_FOUND);
        }

        // Validate user has access to this school
        School school = schoolRepository.findById(classSection.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        return enrollmentRepository.findByClassSectionIdAndStatus(classSectionId, EnrollmentStatus.ACTIVE)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public List<EnrollmentResponse> getEnrollmentsByLearner(UUID learnerId) {
        UUID tenantId = getTenantId();

        // Validate learner exists and belongs to tenant
        Learner learner = learnerRepository.findById(learnerId)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        if (!learner.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.LEARNER_NOT_FOUND);
        }

        return enrollmentRepository.findByLearnerIdOrderByEnrollmentDateDesc(learnerId)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public List<EnrollmentResponse> getEnrollmentsByAcademicYear(UUID academicYearId) {
        UUID tenantId = getTenantId();

        // Validate academic year exists and belongs to tenant
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, academicYearId);

        // RLS will filter by tenant automatically
        return enrollmentRepository.findByAcademicYearIdAndStatus(academicYearId, EnrollmentStatus.ACTIVE)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public EnrollmentResponse getEnrollmentById(UUID id) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND));

        // Validate enrollment belongs to current tenant
        if (!enrollment.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND);
        }

        // Validate school access for school-scoped users
        if (currentUser.isSchoolScoped()) {
            if (!currentUser.getAssignedSchoolIds().contains(enrollment.getSchoolId())) {
                throw new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND);
            }
        }

        return enrollmentMapper.toDto(enrollment);
    }

    @Transactional
    public EnrollmentResponse withdrawLearner(UUID enrollmentId, LocalDate withdrawalDate) {
        UUID tenantId = getTenantId();
        CustomUserDetails currentUser = getCurrentUserDetails();

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND));

        // Validate enrollment belongs to current tenant
        if (!enrollment.getTenantId().equals(tenantId)) {
            throw new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND);
        }

        // Validate user has access to this school
        School school = schoolRepository.findById(enrollment.getSchoolId())
                .orElseThrow(() -> new BusinessException(MessageKey.SCHOOL_NOT_FOUND));
        validateUserHasAccessToSchool(currentUser, school);

        if (enrollment.getStatus() != EnrollmentStatus.ACTIVE) {
            throw new BusinessException(MessageKey.ENROLLMENT_ALREADY_WITHDRAWN);
        }

        if (withdrawalDate.isBefore(enrollment.getEnrollmentDate())) {
            throw new BusinessException(MessageKey.ENROLLMENT_INVALID_DATE);
        }

        enrollment.setStatus(EnrollmentStatus.WITHDRAWN);
        enrollment.setWithdrawalDate(withdrawalDate);

        return enrollmentMapper.toDto(enrollmentRepository.save(enrollment));
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