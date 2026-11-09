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

    Optional<Tenant> findByCode(String code);
    boolean existsByCode(String code);

    boolean existsByContactEmail(String contactEmail);

    boolean existsByCacNumber(String cacNumber);

    boolean existsByContactPhone(String contactPhone);

    @Query("SELECT t FROM Tenant t WHERE t.status = 'ACTIVE' ORDER BY t.name")
    List<Tenant> findAllActive();

    List<Tenant> findByStatus(Tenant.TenantStatus status);
    @Query("SELECT t FROM Tenant t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(t.code) LIKE LOWER(CONCAT('%', :searchTerm, '%')) ORDER BY t.name")
    List<Tenant> searchByNameOrCode(String searchTerm);
}
