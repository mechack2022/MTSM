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
import lombok.RequiredArgsConstructor;
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
        UUID schoolId = getSchoolId();

        // Validate grade level exists in code_set
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());

        // ✅ AUTO-GENERATE student number if blank
        String learnerNumber = (request.learnerNumber() == null || request.learnerNumber().isBlank())
                ? learnerNumberGenerator.generateNext(schoolId)
                : request.learnerNumber().trim().toUpperCase();

        // Validate student number uniqueness within the school
        if (learnerRepository.existsBySchoolIdAndLearnerNumber(schoolId, learnerNumber)) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_EXISTS);
        }

        Learner learner = Learner.builder()
                .schoolId(schoolId)
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
        UUID schoolId = getSchoolId();
        return learnerRepository.findBySchoolIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(schoolId)
                .stream()
                .map(learnerMapper::toDto)
                .toList();
    }

    public List<LearnerResponse> getLearnersByGradeLevel(UUID gradeLevelId) {
        UUID schoolId = getSchoolId();
        return learnerRepository.findBySchoolIdAndGradeLevelIdAndIsActiveTrue(schoolId, gradeLevelId)
                .stream()
                .map(learnerMapper::toDto)
                .toList();
    }

    public LearnerResponse getLearnerById(UUID id) {
        return learnerRepository.findById(id)
                .map(learnerMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));
    }

    @Transactional
    public LearnerResponse updateLearner(UUID id, UpdateLearnerRequest request) {
        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

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
        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        if (!learner.getIsActive()) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_DEACTIVATED);
        }

        learner.setIsActive(false);
        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    @Transactional
    public LearnerResponse activateLearner(UUID id) {
        Learner learner = learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));

        if (learner.getIsActive()) {
            throw new BusinessException(MessageKey.LEARNER_ALREADY_ACTIVE);
        }

        learner.setIsActive(true);
        return learnerMapper.toDto(learnerRepository.save(learner));
    }

    // Helper for EnrollmentService
    public Learner findLearnerEntityById(UUID id) {
        return learnerRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.LEARNER_NOT_FOUND));
    }

    private UUID getSchoolId() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(school -> school.getId())
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}