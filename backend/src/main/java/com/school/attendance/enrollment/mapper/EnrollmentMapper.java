package com.school.attendance.enrollment.mapper;

import com.school.attendance.classsection.ClassSectionRepository;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.enrollment.Enrollment;
import com.school.attendance.enrollment.dto.EnrollmentResponse;

import com.school.attendance.learner.entity.Learner;
import com.school.attendance.learner.repository.LearnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class EnrollmentMapper implements EntityMapper<Enrollment, EnrollmentResponse> {

    private final LearnerRepository learnerRepository;
    private final ClassSectionRepository classSectionRepository;
    private final CodeSetRepository codeSetRepository;

    @Override
    public EnrollmentResponse toDto(Enrollment enrollment) {
        Learner learner = learnerRepository.findById(enrollment.getLearnerId()).orElse(null);

        String learnerName = learner != null
                ? learner.getFirstName() + " " + learner.getLastName()
                : "Unknown";
        String leanerNumber = learner != null ? learner.getLearnerNumber() : null;
        String previousSchoolName = learner != null ? learner.getPreviousSchoolName() : null;

        String className = classSectionRepository.findById(enrollment.getClassSectionId())
                .map(ClassSection::getName)
                .orElse("Unknown");

        String academicYearDisplayName = Optional.ofNullable(enrollment.getAcademicYearId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse("Unknown");

        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getLearnerId(),
                learnerName,
                leanerNumber,
                enrollment.getClassSectionId(),
                className,
                enrollment.getAcademicYearId(),
                academicYearDisplayName,
                enrollment.getEnrollmentDate(),
                enrollment.getWithdrawalDate(),
                enrollment.getStatus(),
                enrollment.getEnrollmentType(),
                previousSchoolName,
                enrollment.getCreatedAt(),
                enrollment.getCreatedBy(),
                enrollment.getUpdatedAt(),
                enrollment.getUpdatedBy()
        );
    }
}
