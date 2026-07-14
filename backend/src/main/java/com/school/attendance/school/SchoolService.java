package com.school.attendance.school;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.school.dto.SchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.mapper.SchoolMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolMapper schoolMapper;

    @Transactional
    public SchoolResponse updateSchool(SchoolRequest request) {
        School school = schoolRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));

        school.setName(request.name());
        school.setCode(request.code());
        school.setAddress(request.address());
        school.setAcademicYear(request.academicYear());
        school.setCurrentTerm(request.currentTerm());
        school.setPhone(request.phone());
        school.setEmail(request.email());
        school.setLogoUrl(request.logoUrl());
        school.setUpdatedAt(Instant.now());

        return schoolMapper.toDto(schoolRepository.save(school));
    }

    public SchoolResponse getSchool() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(schoolMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}