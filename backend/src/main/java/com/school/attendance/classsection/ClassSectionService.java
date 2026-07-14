package com.school.attendance.classsection;

import com.school.attendance.classsection.dto.ClassSectionRequest;
import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.classsection.mapper.ClassSectionMapper;
import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClassSectionService {

    private final ClassSectionRepository classSectionRepository;
    private final SchoolRepository schoolRepository;
    private final ClassSectionMapper classSectionMapper;
    private final AppUserRepository userRepository;

    @Transactional
    public ClassSectionResponse createClassSection(ClassSectionRequest request) {
        UUID schoolId = schoolRepository.findFirstByOrderByIdAsc()
                .map(School::getId)
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));

        if (classSectionRepository.existsBySchoolIdAndNameAndAcademicYear(
                schoolId, request.name(), request.academicYear())) {
            throw new BusinessException(MessageKey.CLASS_ALREADY_EXISTS);
        }
        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }
        ClassSection classSection = ClassSection.builder()
                .schoolId(schoolId)
                .name(request.name())
                .gradeLevel(request.gradeLevel())
                .academicYear(request.academicYear())
                .classTeacherId(request.classTeacherId())
                .capacity(request.capacity())
                .isActive(true)
                .build();
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    public List<ClassSectionResponse> getAllActiveClasses() {
        UUID schoolId = schoolRepository.findFirstByOrderByIdAsc()
                .map(school -> school.getId())
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
        return classSectionRepository.findBySchoolIdAndIsActiveTrue(schoolId).stream()
                .map(classSectionMapper::toDto)
                .toList();
    }

    public List<ClassSectionResponse> getClassesByAcademicYear(String academicYear) {
        UUID schoolId = schoolRepository.findFirstByOrderByIdAsc()
                .map(school -> school.getId())
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
        return classSectionRepository.findBySchoolIdAndAcademicYearAndIsActiveTrue(schoolId, academicYear).stream()
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

        if (request.classTeacherId() != null) {
            userRepository.findById(request.classTeacherId())
                    .orElseThrow(() -> new BusinessException(MessageKey.CLASS_TEACHER_NOT_FOUND));
        }

        classSection.setName(request.name());
        classSection.setGradeLevel(request.gradeLevel());
        classSection.setAcademicYear(request.academicYear());
        classSection.setClassTeacherId(request.classTeacherId());
        classSection.setCapacity(request.capacity());
        classSection.setUpdatedAt(Instant.now());
        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse deactivateClassSection(UUID id) {
        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));

        classSection.setIsActive(false);
        classSection.setUpdatedAt(Instant.now());

        return classSectionMapper.toDto(classSectionRepository.save(classSection));
    }

    @Transactional
    public ClassSectionResponse activateClassSection(UUID id) {
        ClassSection classSection = classSectionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.CLASS_NOT_FOUND));
        if (!classSection.getIsActive()) {
            classSection.setIsActive(true);
            classSection.setUpdatedAt(Instant.now());
            return classSectionMapper.toDto(classSectionRepository.save(classSection));
        }
        return classSectionMapper.toDto(classSection);
    }
}