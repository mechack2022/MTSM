package com.school.attendance.classsection;

import com.school.attendance.classsection.entity.ClassSection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ClassSectionRepository extends JpaRepository<ClassSection, UUID> {
    // Multi-tenant queries - filter by both tenantId and schoolId
    List<ClassSection> findByTenantIdAndSchoolIdAndAcademicYearIdAndIsActiveTrue(
            UUID tenantId, UUID schoolId, UUID academicYearId);
    List<ClassSection> findByTenantIdAndSchoolIdAndGradeLevelIdAndIsActiveTrue(
            UUID tenantId, UUID schoolId, UUID gradeLevelId);
    List<ClassSection> findByTenantIdAndSchoolIdAndIsActiveTrue(UUID tenantId, UUID schoolId);
    boolean existsByTenantIdAndSchoolIdAndNameAndAcademicYearId(
            UUID tenantId, UUID schoolId, String name, UUID academicYearId);

    // Tenant-wide queries
    List<ClassSection> findByTenantIdAndIsActiveTrue(UUID tenantId);
    List<ClassSection> findByTenantIdAndClassTeacherIdAndIsActiveTrue(UUID tenantId, UUID classTeacherId);
}