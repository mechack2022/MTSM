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
    List<CodeSet> findBySchoolIdAndCodeSetGroupAndIsActiveTrueOrderBySortOrderAsc(
            UUID schoolId, CodeSetGroup codeSetGroup);

    List<CodeSet> findBySchoolIdAndCodeSetGroupOrderBySortOrderAsc(
            UUID schoolId, CodeSetGroup codeSetGroup);

    Optional<CodeSet> findBySchoolIdAndCodeSetGroupAndCode(
            UUID schoolId, CodeSetGroup codeSetGroup, String code);

    boolean existsBySchoolIdAndCodeSetGroupAndCode(
            UUID schoolId, CodeSetGroup codeSetGroup, String code);

    boolean existsBySchoolIdAndId(UUID schoolId, UUID id);

    long countBySchoolIdAndCodeSetGroup(UUID schoolId, CodeSetGroup codeSetGroup);
}
