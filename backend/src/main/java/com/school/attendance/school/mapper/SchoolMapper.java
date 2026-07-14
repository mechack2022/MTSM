package com.school.attendance.school.mapper;

import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import org.springframework.stereotype.Component;

@Component
public class SchoolMapper implements EntityMapper<School, SchoolResponse> {

    @Override
    public SchoolResponse toDto(School school) {
        return new SchoolResponse(
                school.getId(),
                school.getName(),
                school.getCode(),
                school.getAddress(),
                school.getAcademicYear(),
                school.getCurrentTerm(),
                school.getPhone(),
                school.getEmail(),
                school.getLogoUrl()
        );
    }
}