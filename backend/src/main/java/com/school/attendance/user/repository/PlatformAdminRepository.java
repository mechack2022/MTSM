package com.school.attendance.user.repository;

import com.school.attendance.user.entity.PlatformAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlatformAdminRepository extends JpaRepository<PlatformAdmin, UUID> {
    Optional<PlatformAdmin> findByUsername(String username);
    boolean existsByUsername(String username);
}
