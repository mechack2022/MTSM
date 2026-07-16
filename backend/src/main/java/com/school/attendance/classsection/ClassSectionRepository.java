package com.school.attendance.classsection;

import com.school.attendance.classsection.entity.ClassSection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ClassSectionRepository extends JpaRepository<ClassSection, UUID> {
    List<ClassSection> findBySchoolIdAndAcademicYearIdAndIsActiveTrue(UUID schoolId, UUID academicYearId);
    List<ClassSection> findBySchoolIdAndGradeLevelIdAndIsActiveTrue(UUID schoolId, UUID gradeLevelId);
    List<ClassSection> findBySchoolIdAndIsActiveTrue(UUID schoolId);
    boolean existsBySchoolIdAndNameAndAcademicYearId(UUID schoolId, String name, UUID academicYearId);
    List<ClassSection> findByClassTeacherIdAndIsActiveTrue(UUID classTeacherId);

}