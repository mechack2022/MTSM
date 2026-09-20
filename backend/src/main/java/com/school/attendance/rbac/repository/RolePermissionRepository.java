package com.school.attendance.rbac.repository;

import com.school.attendance.rbac.entity.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, UUID> {
    List<RolePermission> findByRoleId(UUID roleId);
    boolean existsByRoleIdAndPermissionId(UUID roleId, UUID permissionId);

    @Query("SELECT rp.permissionId FROM RolePermission rp WHERE rp.roleId IN :roleIds")
    List<UUID> findPermissionIdsByRoleIds(@Param("roleIds") List<UUID> roleIds);
}
