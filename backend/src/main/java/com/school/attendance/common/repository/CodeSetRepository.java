package com.school.attendance.common.repository;

import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CodeSetRepository extends JpaRepository<CodeSet, UUID> {
    boolean existsByTenantIdAndCodeSetGroupAndCode(UUID tenantId, CodeSetGroup group, String code);

    List<CodeSet> findByTenantIdAndCodeSetGroupAndIsActiveTrueOrderBySortOrderAsc(
            UUID tenantId, CodeSetGroup group);

    List<CodeSet> findByTenantIdAndCodeSetGroupOrderBySortOrderAsc(
            UUID tenantId, CodeSetGroup group);
}
