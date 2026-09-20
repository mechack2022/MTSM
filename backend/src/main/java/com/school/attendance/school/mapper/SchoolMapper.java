package com.school.attendance.school.mapper;


import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class SchoolMapper implements EntityMapper<School, SchoolResponse> {

    private final CodeSetRepository codeSetRepository;

    public SchoolResponse toDto(School school) {
        return new SchoolResponse(
                school.getId(),
                school.getName(),
                school.getCode(),
                school.getAddress(),
                school.getAcademicYearId(),
                resolveDisplayName(school.getAcademicYearId()),
                school.getCurrentTermId(),
                resolveDisplayName(school.getCurrentTermId()),
                school.getPhone(),
                school.getEmail(),
                school.getLogoUrl(),
                school.getCreatedAt(),
                school.getCreatedBy(),
                school.getUpdatedAt(),
                school.getUpdatedBy()
        );
    }

    private String resolveDisplayName(UUID codeSetId) {
        if (codeSetId == null) return null;
        return codeSetRepository.findById(codeSetId)
                .map(CodeSet::getDisplayName)
                .orElse(null);
    }
}