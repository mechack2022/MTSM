package com.school.attendance.learner.entity;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.learner.repository.LearnerIdSequenceRepository;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LearnerNumberGenerator {

    private final LearnerIdSequenceRepository sequenceRepository;
    private final SchoolRepository schoolRepository;

    @Transactional
    public String generateNext(UUID schoolId) {
        try {
            int currentYear = LocalDate.now().getYear();

            Long nextValue = sequenceRepository.upsertAndIncrement(schoolId, currentYear);

            School school = schoolRepository.findById(schoolId)
                    .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));

            String schoolCode = school.getCode();
            if (schoolCode == null || schoolCode.trim().isEmpty()) {
                throw new BusinessException(MessageKey.SCHOOL_CODE_NOT_CONFIGURED);
            }

            String cleanSchoolCode = schoolCode.trim().toUpperCase();

            // Format: [SchoolCode]-[Year]-[6-digit sequence]
            // Example: PILOT-2026-000001
            String learnerNumber = String.format("%s-%d-%06d", cleanSchoolCode, currentYear, nextValue);

            log.info("Generated learner number: {} for school: {}", learnerNumber, schoolId);
            return learnerNumber;

        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to generate learner number for school: {}", schoolId, e);
            throw new BusinessException(MessageKey.LEARNER_GENERATION_FAILED);
        }
    }
}