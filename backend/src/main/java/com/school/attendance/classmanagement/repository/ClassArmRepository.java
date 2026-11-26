package com.school.attendance.classmanagement.repository;

import com.school.attendance.classmanagement.entity.ArmName;
import com.school.attendance.classmanagement.entity.ClassArm;
import com.school.attendance.classmanagement.entity.ClassName;
import com.school.attendance.user.entity.SchoolSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClassArmRepository extends JpaRepository<ClassArm, UUID> {

    List<ClassArm> findBySchoolIdAndDeletedAtIsNull(UUID schoolId);

    List<ClassArm> findBySchoolIdAndSchoolSectionAndDeletedAtIsNull(UUID schoolId, SchoolSection schoolSection);

    List<ClassArm> findBySchoolIdAndAcademicYearIdAndDeletedAtIsNull(UUID schoolId, UUID academicYearId);

    List<ClassArm> findBySchoolIdAndSchoolSectionAndAcademicYearIdAndDeletedAtIsNull(
            UUID schoolId, SchoolSection schoolSection, UUID academicYearId);

    List<ClassArm> findBySchoolIdAndIsActiveAndDeletedAtIsNull(UUID schoolId, Boolean isActive);

    Optional<ClassArm> findByIdAndDeletedAtIsNull(UUID id);

    boolean existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdAndDeletedAtIsNull(
            UUID schoolId, ClassName className, ArmName armName, UUID academicYearId);

    // Check for duplicates when academic year is null
    boolean existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdIsNullAndDeletedAtIsNull(
            UUID schoolId, ClassName className, ArmName armName);

    @Query("SELECT ca FROM ClassArm ca WHERE ca.schoolId = :schoolId AND ca.deletedAt IS NULL " +
           "AND (LOWER(ca.className) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(ca.armName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(ca.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<ClassArm> searchBySchoolId(@Param("schoolId") UUID schoolId, @Param("searchTerm") String searchTerm);

    @Query("SELECT COUNT(ca) FROM ClassArm ca WHERE ca.schoolId = :schoolId AND ca.deletedAt IS NULL")
    long countBySchoolId(@Param("schoolId") UUID schoolId);

    @Query("SELECT COUNT(ca) FROM ClassArm ca WHERE ca.schoolId = :schoolId " +
           "AND ca.schoolSection = :section AND ca.deletedAt IS NULL")
    long countBySchoolIdAndSection(@Param("schoolId") UUID schoolId, @Param("section") SchoolSection section);

    @Query("SELECT ca FROM ClassArm ca WHERE ca.schoolId = :schoolId " +
           "AND ca.leadCaregiverId = :staffId AND ca.deletedAt IS NULL")
    List<ClassArm> findBySchoolIdAndLeadCaregiver(@Param("schoolId") UUID schoolId, @Param("staffId") UUID staffId);

    @Query("SELECT SUM(ca.currentEnrollment) FROM ClassArm ca WHERE ca.schoolId = :schoolId " +
           "AND ca.schoolSection = :section AND ca.deletedAt IS NULL")
    Long getTotalEnrollmentBySection(@Param("schoolId") UUID schoolId, @Param("section") SchoolSection section);
}
