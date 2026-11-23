package com.school.attendance.user.repository;

import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.Staff;
import com.school.attendance.user.entity.StaffRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StaffRepository extends JpaRepository<Staff, UUID> {

    List<Staff> findBySchoolIdAndDeletedAtIsNull(UUID schoolId);

    List<Staff> findBySchoolIdAndSchoolSectionAndDeletedAtIsNull(UUID schoolId, SchoolSection schoolSection);

    List<Staff> findBySchoolIdAndPrimaryRoleAndDeletedAtIsNull(UUID schoolId, StaffRole primaryRole);

    List<Staff> findBySchoolIdAndEmploymentStatusAndDeletedAtIsNull(UUID schoolId, String employmentStatus);

    List<Staff> findByTenantIdAndDeletedAtIsNull(UUID tenantId);

    Optional<Staff> findByIdAndDeletedAtIsNull(UUID id);

    Optional<Staff> findByEmailAndDeletedAtIsNull(String email);

    Optional<Staff> findByStaffNumberAndDeletedAtIsNull(String staffNumber);

    Optional<Staff> findByUserIdAndDeletedAtIsNull(UUID userId);

    boolean existsByEmailAndDeletedAtIsNull(String email);

    boolean existsByStaffNumberAndDeletedAtIsNull(String staffNumber);

    @Query("SELECT s FROM Staff s WHERE s.schoolId = :schoolId AND s.deletedAt IS NULL " +
           "AND (LOWER(s.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Staff> searchBySchoolId(@Param("schoolId") UUID schoolId, @Param("searchTerm") String searchTerm);

    @Query("SELECT COUNT(s) FROM Staff s WHERE s.schoolId = :schoolId AND s.deletedAt IS NULL")
    long countBySchoolId(@Param("schoolId") UUID schoolId);

    @Query("SELECT COUNT(s) FROM Staff s WHERE s.schoolId = :schoolId " +
           "AND s.employmentStatus = 'ACTIVE' AND s.deletedAt IS NULL")
    long countActiveStaffBySchoolId(@Param("schoolId") UUID schoolId);

    @Query("SELECT COUNT(s) FROM Staff s WHERE s.schoolId = :schoolId " +
           "AND s.schoolSection = :section AND s.deletedAt IS NULL")
    long countBySchoolIdAndSection(@Param("schoolId") UUID schoolId, @Param("section") SchoolSection section);

    @Query("SELECT s FROM Staff s WHERE s.schoolId = :schoolId " +
           "AND s.accountProvisioned = false AND s.deletedAt IS NULL")
    List<Staff> findPendingActivationBySchoolId(@Param("schoolId") UUID schoolId);
}
