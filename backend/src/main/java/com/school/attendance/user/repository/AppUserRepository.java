package com.school.attendance.user.repository;

import com.school.attendance.user.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    List<AppUser> findByTenantId(UUID tenantId);
    Optional<AppUser> findByUsernameAndTenantId(String username, UUID tenantId);
}
