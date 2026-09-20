package com.school.attendance.learner.mapper;

import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.learner.entity.Learner;
import com.school.attendance.learner.dto.LearnerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearnerMapper implements EntityMapper<Learner, LearnerResponse> {

    private final CodeSetRepository codeSetRepository;

    @Override
    public LearnerResponse toDto(Learner learner) {
        String gradeLevelDisplayName = Optional.ofNullable(learner.getGradeLevelId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse(null);

        return new LearnerResponse(
                learner.getId(),
                learner.getSchoolId(),
                learner.getFirstName(),
                learner.getLastName(),
                learner.getFirstName() + " " + learner.getLastName(),
                learner.getLearnerNumber(),
                learner.getGradeLevelId(),
                gradeLevelDisplayName,
                learner.getDateOfBirth(),
                learner.getSex(),
                learner.getPreviousSchoolName(),
                learner.getIsActive(),
                learner.getCreatedAt(),
                learner.getCreatedBy(),
                learner.getUpdatedAt(),
                learner.getUpdatedBy()
        );
    }
}