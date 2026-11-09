package com.school.attendance.tenant.repository;

import com.school.attendance.tenant.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, UUID> {

    @Query("SELECT t FROM Tenant t WHERE t.code = :code AND t.deletedAt IS NULL")
    Optional<Tenant> findByCode(String code);

    @Query("SELECT COUNT(t) > 0 FROM Tenant t WHERE t.code = :code AND t.deletedAt IS NULL")
    boolean existsByCode(String code);

    @Query("SELECT COUNT(t) > 0 FROM Tenant t WHERE t.contactEmail = :contactEmail AND t.deletedAt IS NULL")
    boolean existsByContactEmail(String contactEmail);

    @Query("SELECT COUNT(t) > 0 FROM Tenant t WHERE t.cacNumber = :cacNumber AND t.deletedAt IS NULL")
    boolean existsByCacNumber(String cacNumber);

    @Query("SELECT COUNT(t) > 0 FROM Tenant t WHERE t.contactPhone = :contactPhone AND t.deletedAt IS NULL")
    boolean existsByContactPhone(String contactPhone);

    @Query("SELECT t FROM Tenant t WHERE t.status = 'ACTIVE' AND t.deletedAt IS NULL ORDER BY t.name")
    List<Tenant> findAllActive();

    @Query("SELECT t FROM Tenant t WHERE t.status = :status AND t.deletedAt IS NULL")
    List<Tenant> findByStatus(Tenant.TenantStatus status);

    @Query("SELECT t FROM Tenant t WHERE t.deletedAt IS NULL ORDER BY t.name")
    List<Tenant> findAll();

    @Query("SELECT t FROM Tenant t WHERE t.id = :id AND t.deletedAt IS NULL")
    Optional<Tenant> findById(UUID id);

    @Query("SELECT t FROM Tenant t WHERE (LOWER(t.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(t.code) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND t.deletedAt IS NULL ORDER BY t.name")
    List<Tenant> searchByNameOrCode(String searchTerm);

    @Query("SELECT t.contactEmail FROM Tenant t WHERE t.deletedAt IS NULL")
    List<String> findAllContactEmails();
}
