package com.school.attendance.school;
import com.school.attendance.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID> {
    Optional<School> findFirstByOrderByIdAsc();
    List<School> findByIdInAndTenantId(List<UUID> ids, UUID tenantId);
    boolean existsByIdAndTenantId(UUID id, UUID tenantId);
    Optional<School> findByCode(String code);
    boolean existsByCode(String code);
    List<School> findByTenantId(UUID tenantId);
    List<School> findByIdIn(List<UUID> ids);
}