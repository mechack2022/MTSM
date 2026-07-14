package com.school.attendance.classsection.mapper;

import com.school.attendance.classsection.dto.ClassSectionResponse;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ClassSectionMapper implements EntityMapper<ClassSection, ClassSectionResponse> {

    private final AppUserRepository userRepository;

    @Override
    public ClassSectionResponse toDto(ClassSection classSection) {
        String teacherName = Optional.ofNullable(classSection.getClassTeacherId())
                .flatMap(userRepository::findById)
                .map(AppUser::getFullName)
                .orElse(null);

        return new ClassSectionResponse(
                classSection.getId(),
                classSection.getName(),
                classSection.getGradeLevel(),
                classSection.getAcademicYear(),
                classSection.getClassTeacherId(),
                teacherName,
                classSection.getCapacity(),
                classSection.getIsActive()
        );
    }
}