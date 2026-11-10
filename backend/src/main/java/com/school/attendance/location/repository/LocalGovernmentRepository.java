package com.school.attendance.location.repository;

import com.school.attendance.location.entity.LocalGovernment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LocalGovernmentRepository extends JpaRepository<LocalGovernment, UUID> {

    List<LocalGovernment> findByStateId(UUID stateId);

    List<LocalGovernment> findByState_Code(String stateCode);

    boolean existsByNameAndStateId(String name, UUID stateId);
}
