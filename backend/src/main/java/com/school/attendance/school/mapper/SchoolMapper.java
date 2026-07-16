package com.school.attendance.school.mapper;


import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SchoolMapper implements EntityMapper<School, SchoolResponse> {

    private final CodeSetRepository codeSetRepository;

    @Override
    public SchoolResponse toDto(School school) {
        String academicYearDisplayName = Optional.ofNullable(school.getAcademicYearId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse(null);

        String currentTermDisplayName = Optional.ofNullable(school.getCurrentTermId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse(null);

        return new SchoolResponse(
                school.getId(),
                school.getName(),
                school.getCode(),
                school.getAddress(),
                school.getAcademicYearId(),
                academicYearDisplayName,
                school.getCurrentTermId(),
                currentTermDisplayName,
                school.getPhone(),
                school.getEmail(),
                school.getLogoUrl(),
                school.getCreatedAt(),
                school.getCreatedBy(),
                school.getUpdatedAt(),
                school.getUpdatedBy()
        );
    }
}