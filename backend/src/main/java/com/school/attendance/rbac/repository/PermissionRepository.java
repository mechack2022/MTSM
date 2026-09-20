package com.school.attendance.rbac.repository;

import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    Optional<Permission> findByCode(String code);
    List<Permission> findByCategory(String category);
    boolean existsByCode(String code);
}
