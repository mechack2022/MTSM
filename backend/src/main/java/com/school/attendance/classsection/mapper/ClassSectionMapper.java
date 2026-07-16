package com.school.attendance.classsection.mapper;

import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ClassSectionMapper implements EntityMapper<ClassSection, ClassSectionResponse> {

    private final AppUserRepository userRepository;
    private final CodeSetRepository codeSetRepository;

    @Override
    public ClassSectionResponse toDto(ClassSection classSection) {

        String teacherName = Optional.ofNullable(classSection.getClassTeacherId())
                .flatMap(userRepository::findById)
                .map(AppUser::getFullName)
                .orElse(null);


        String gradeLevelDisplayName = Optional.ofNullable(classSection.getGradeLevelId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse(null);


        String academicYearDisplayName = Optional.ofNullable(classSection.getAcademicYearId())
                .flatMap(codeSetRepository::findById)
                .map(CodeSet::getDisplayName)
                .orElse(null);

        return new ClassSectionResponse(
                classSection.getId(),
                classSection.getName(),
                classSection.getGradeLevelId(),
                gradeLevelDisplayName,
                classSection.getAcademicYearId(),
                academicYearDisplayName,
                classSection.getClassTeacherId(),
                teacherName,
                classSection.getCapacity(),
                classSection.getIsActive(),
                classSection.getCreatedAt(),
                classSection.getCreatedBy(),
                classSection.getUpdatedAt(),
                classSection.getUpdatedBy()
        );
    }
}