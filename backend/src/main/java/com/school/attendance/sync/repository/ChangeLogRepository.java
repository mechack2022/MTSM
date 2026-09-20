package com.school.attendance.sync.repository;

import com.school.attendance.sync.entity.ChangeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChangeLogRepository extends JpaRepository<ChangeLog, UUID> {
    Optional<ChangeLog> findByChangeId(UUID changeId);
    boolean existsByChangeId(UUID changeId);
}
