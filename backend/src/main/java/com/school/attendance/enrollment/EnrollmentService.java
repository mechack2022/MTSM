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
import lombok.RequiredArgsConstructor;
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
    private final EnrollmentMapper enrollmentMapper;
    private final CodeSetService codeSetService;

    @Transactional
    public EnrollmentResponse enrollLearner(EnrollLearnerRequest request) {
        Learner learner = learnerRepository.findById(request.learnerId())
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));
        if (!learner.getIsActive()) {
            throw new BusinessException(MessageKey.ENROLLMENT_LEARNER_DEACTIVATED);
        }

        //  Validate Class exists and is active
        ClassSection classSection = classSectionRepository.findById(request.classSectionId())
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));
        if (!classSection.getIsActive()) {
            throw new BusinessException(MessageKey.ENROLLMENT_CLASS_DEACTIVATED);
        }

        //  Validate Academic Year exists in code_set
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());

        // Validate Grade Level Match
        if (!learner.getGradeLevelId().equals(classSection.getGradeLevelId())) {
            throw new BusinessException(MessageKey.ENROLLMENT_GRADE_MISMATCH);
        }

        //  Validate TRANSFER_IN has previousSchoolName
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
        return enrollmentRepository.findByClassSectionIdAndStatus(classSectionId, EnrollmentStatus.ACTIVE)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public List<EnrollmentResponse> getEnrollmentsByLearner(UUID learnerId) {
        return enrollmentRepository.findByLearnerIdOrderByEnrollmentDateDesc(learnerId)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public List<EnrollmentResponse> getEnrollmentsByAcademicYear(UUID academicYearId) {
        return enrollmentRepository.findByAcademicYearIdAndStatus(academicYearId, EnrollmentStatus.ACTIVE)
                .stream()
                .map(enrollmentMapper::toDto)
                .toList();
    }

    public EnrollmentResponse getEnrollmentById(UUID id) {
        return enrollmentRepository.findById(id)
                .map(enrollmentMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND));
    }

    @Transactional
    public EnrollmentResponse withdrawLearner(UUID enrollmentId, LocalDate withdrawalDate) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new BusinessException(MessageKey.ENROLLMENT_NOT_FOUND));

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
}