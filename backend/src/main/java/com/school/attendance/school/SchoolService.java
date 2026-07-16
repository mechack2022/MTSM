package com.school.attendance.school;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.service.CodeSetService;
import com.school.attendance.school.dto.SchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.mapper.SchoolMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolMapper schoolMapper;
    private final CodeSetService codeSetService;

    @Transactional
    public SchoolResponse updateSchool(SchoolRequest request) {
        School school = schoolRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));

        if (request.academicYearId() != null) {
            codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());
        }

        if (request.currentTermId() != null) {
            codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_TERM, request.currentTermId());
        }

        school.setName(request.name());
        school.setCode(request.code());
        school.setAddress(request.address());
        school.setAcademicYearId(request.academicYearId());
        school.setCurrentTermId(request.currentTermId());
        school.setPhone(request.phone());
        school.setEmail(request.email());
        school.setLogoUrl(request.logoUrl());

        return schoolMapper.toDto(schoolRepository.save(school));
    }

    public SchoolResponse getSchool() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(schoolMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}