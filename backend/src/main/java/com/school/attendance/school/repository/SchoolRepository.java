package com.school.attendance.school.repository;

import com.school.attendance.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<School, UUID> {

    @Query("SELECT s FROM School s WHERE s.id = :id AND s.deletedAt IS NULL")
    Optional<School> findById(UUID id);

    @Query("SELECT s FROM School s WHERE s.campusCode = :campusCode AND s.deletedAt IS NULL")
    Optional<School> findByCampusCode(String campusCode);

    @Query("SELECT COUNT(s) > 0 FROM School s WHERE s.campusCode = :campusCode AND s.deletedAt IS NULL")
    boolean existsByCampusCode(String campusCode);

    @Query("SELECT s FROM School s WHERE s.tenantId = :tenantId AND s.deletedAt IS NULL ORDER BY s.name")
    List<School> findAllByTenantId(UUID tenantId);

    @Query("SELECT s FROM School s WHERE s.tenantId = :tenantId AND s.status = 'ACTIVE' AND s.deletedAt IS NULL ORDER BY s.name")
    List<School> findAllActiveByTenantId(UUID tenantId);

    @Query("SELECT s FROM School s WHERE s.tenantId = :tenantId AND s.status = :status AND s.deletedAt IS NULL")
    List<School> findByTenantIdAndStatus(UUID tenantId, School.SchoolStatus status);

    @Query("SELECT s FROM School s WHERE s.deletedAt IS NULL ORDER BY s.name")
    List<School> findAll();

    @Query("SELECT s FROM School s WHERE s.tenantId = :tenantId AND (LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(s.campusCode) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND s.deletedAt IS NULL ORDER BY s.name")
    List<School> searchByTenantIdAndNameOrCode(UUID tenantId, String searchTerm);

    @Query("SELECT COUNT(s) FROM School s WHERE s.tenantId = :tenantId AND s.status = 'ACTIVE' AND s.deletedAt IS NULL")
    long countActiveByTenantId(UUID tenantId);

    @Query("SELECT COALESCE(SUM(s.currentStudents), 0) FROM School s WHERE s.tenantId = :tenantId AND s.status = 'ACTIVE' AND s.deletedAt IS NULL")
    int sumCurrentStudentsByTenantId(UUID tenantId);

    @Query("SELECT COALESCE(SUM(s.currentTeachers), 0) FROM School s WHERE s.tenantId = :tenantId AND s.status = 'ACTIVE' AND s.deletedAt IS NULL")
    int sumCurrentTeachersByTenantId(UUID tenantId);
}
