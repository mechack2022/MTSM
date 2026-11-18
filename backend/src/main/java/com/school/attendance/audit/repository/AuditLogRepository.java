package com.school.attendance.audit.repository;

import com.school.attendance.audit.entity.AuditLog;
import com.school.attendance.audit.enums.AuditLogCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    Page<AuditLog> findByTenantIdOrderByEventTimestampDesc(UUID tenantId, Pageable pageable);

    Page<AuditLog> findByTenantIdAndCategoryOrderByEventTimestampDesc(
            UUID tenantId, AuditLogCategory category, Pageable pageable);

    Page<AuditLog> findByTenantIdAndSchoolIdOrderByEventTimestampDesc(
            UUID tenantId, UUID schoolId, Pageable pageable);

    Page<AuditLog> findByTenantIdAndSeverityOrderByEventTimestampDesc(
            UUID tenantId, String severity, Pageable pageable);

    @Query("SELECT a FROM AuditLog a WHERE a.tenantId = :tenantId " +
           "AND (:searchTerm IS NULL OR LOWER(a.userName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(a.eventTitle) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(a.eventDescription) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(a.ipAddress) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "AND (:category IS NULL OR a.category = :category) " +
           "AND (:schoolId IS NULL OR a.schoolId = :schoolId) " +
           "AND (:severity IS NULL OR a.severity = :severity) " +
           "ORDER BY a.eventTimestamp DESC")
    Page<AuditLog> searchAuditLogs(
            @Param("tenantId") UUID tenantId,
            @Param("searchTerm") String searchTerm,
            @Param("category") AuditLogCategory category,
            @Param("schoolId") UUID schoolId,
            @Param("severity") String severity,
            Pageable pageable);

    @Query("SELECT COUNT(a) FROM AuditLog a WHERE a.tenantId = :tenantId")
    long countByTenantId(@Param("tenantId") UUID tenantId);

    @Query("SELECT COUNT(a) FROM AuditLog a WHERE a.tenantId = :tenantId AND a.category = :category")
    long countByTenantIdAndCategory(
            @Param("tenantId") UUID tenantId,
            @Param("category") AuditLogCategory category);

    @Query("SELECT COUNT(a) FROM AuditLog a WHERE a.tenantId = :tenantId " +
           "AND a.eventTimestamp >= :startDate")
    long countByTenantIdAndEventTimestampAfter(
            @Param("tenantId") UUID tenantId,
            @Param("startDate") LocalDateTime startDate);

    List<AuditLog> findByTenantIdAndEventTimestampBetweenOrderByEventTimestampDesc(
            UUID tenantId, LocalDateTime start, LocalDateTime end);
}
