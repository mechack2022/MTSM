package com.school.attendance.learner.repository;

import com.school.attendance.learner.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, UUID> {

    // Tenant-aware queries
    Optional<Learner> findByIdAndTenantId(UUID id, UUID tenantId);

    boolean existsByTenantIdAndSchoolIdAndLearnerNumber(UUID tenantId, UUID schoolId, String learnerNumber);

    Optional<Learner> findByTenantIdAndSchoolIdAndLearnerNumber(UUID tenantId, UUID schoolId, String learnerNumber);

    List<Learner> findByTenantIdAndSchoolIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(UUID tenantId, UUID schoolId);

    List<Learner> findByTenantIdAndSchoolIdAndGradeLevelIdAndIsActiveTrue(UUID tenantId, UUID schoolId, UUID gradeLevelId);

    List<Learner> findByTenantIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(UUID tenantId);

}
