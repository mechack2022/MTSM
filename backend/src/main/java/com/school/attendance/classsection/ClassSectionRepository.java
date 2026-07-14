package com.school.attendance.classsection;

import com.school.attendance.classsection.entity.ClassSection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ClassSectionRepository extends JpaRepository<ClassSection, UUID> {
    List<ClassSection> findBySchoolIdAndAcademicYearAndIsActiveTrue(UUID schoolId, String academicYear);
    List<ClassSection> findBySchoolIdAndIsActiveTrue(UUID schoolId);
    boolean existsBySchoolIdAndNameAndAcademicYear(UUID schoolId, String name, String academicYear);
    List<ClassSection> findByClassTeacherIdAndIsActiveTrue(UUID classTeacherId);

}