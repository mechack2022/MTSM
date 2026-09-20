package com.school.attendance.sync.repository;

import com.school.attendance.sync.entity.SyncConflict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SyncConflictRepository extends JpaRepository<SyncConflict, UUID> {
    List<SyncConflict> findBySchoolIdAndStatus(UUID schoolId, String status);
}