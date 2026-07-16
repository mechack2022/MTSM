package com.school.attendance.classsection;

import com.school.attendance.classsection.dto.ClassSectionRequest;
import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.classsection.mapper.ClassSectionMapper;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.service.CodeSetService;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClassSectionService {

    private final ClassSectionRepository classSectionRepository;
    private final SchoolRepository schoolRepository;
    private final ClassSectionMapper classSectionMapper;
    private final AppUserRepository userRepository;
    private final CodeSetService codeSetService;

    @Transactional
    public ClassSectionResponse createClassSection(ClassSectionRequest request) {
        UUID schoolId = getSchoolId();
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());
        if (classSectionRepository.existsBySchoolIdAndNameAndAcademicYearId(
                schoolId, request.name(), request.academicYearId())) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_EXISTS);
        }

        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }

        ClassSection classSection = ClassSection.builder()
                .schoolId(schoolId)
                .name(request.name())
                .gradeLevelId(request.gradeLevelId())
                .academicYearId(request.academicYearId())
                .classTeacherId(request.classTeacherId())
                .capacity(request.capacity())
                .isActive(true)
                .build();
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    public List<ClassSectionResponse> getAllActiveClasses() {
        UUID schoolId = getSchoolId();
        return classSectionRepository.findBySchoolIdAndIsActiveTrue(schoolId).stream()
                .map(classSectionMapper::toDto)
                .toList();
    }

    public List<ClassSectionResponse> getClassesByAcademicYear(UUID academicYearId) {
        UUID schoolId = getSchoolId();
        return classSectionRepository.findBySchoolIdAndAcademicYearIdAndIsActiveTrue(schoolId, academicYearId).stream()
                .map(classSectionMapper::toDto)
                .toList();
    }

    // ✅ New method: filter by grade level
    public List<ClassSectionResponse> getClassesByGradeLevel(UUID gradeLevelId) {
        UUID schoolId = getSchoolId();
        return classSectionRepository.findBySchoolIdAndGradeLevelIdAndIsActiveTrue(schoolId, gradeLevelId).stream()
                .map(classSectionMapper::toDto)
                .toList();
    }

    public ClassSectionResponse getClassSectionById(UUID id) {
        return classSectionRepository.findById(id)
                .map(classSectionMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));
    }

    @Transactional
    public ClassSectionResponse updateClassSection(UUID id, ClassSectionRequest request) {
        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        // ✅ Validate grade level and academic year
        codeSetService.validateCodeExists(CodeSetGroup.GRADE_LEVEL, request.gradeLevelId());
        codeSetService.validateCodeExists(CodeSetGroup.ACADEMIC_YEAR, request.academicYearId());

        // ✅ Validate teacher if provided
        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }

        classSection.setName(request.name());
        classSection.setGradeLevelId(request.gradeLevelId());
        classSection.setAcademicYearId(request.academicYearId());
        classSection.setClassTeacherId(request.classTeacherId());
        classSection.setCapacity(request.capacity());

        // ✅ No more setUpdatedAt() - JPA auditing handles it!

        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse deactivateClassSection(UUID id) {
        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        if (!classSection.getIsActive()) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_DEACTIVATED);
        }

        classSection.setIsActive(false);
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse activateClassSection(UUID id) {
        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        if (classSection.getIsActive()) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_ACTIVE);
        }

        classSection.setIsActive(true);
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    private UUID getSchoolId() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(School::getId)
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}