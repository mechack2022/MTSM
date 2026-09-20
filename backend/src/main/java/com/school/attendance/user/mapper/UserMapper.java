package com.school.attendance.user.mapper;

import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.user.dto.UserResponse;
import com.school.attendance.user.entity.AppUser;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
public class UserMapper {

    public UserResponse toDto(AppUser user, Role role, Set<UUID> assignedSchoolIds) {
        return new UserResponse(
                user.getId(),
                user.getTenantId(),
                user.getUsername(),
                user.getFullName(),
                user.getRoleId(),
                role != null ? role.getCode() : null,
                role != null ? role.getDisplayName() : null,
                assignedSchoolIds != null ? List.copyOf(assignedSchoolIds) : List.of(),
                user.getIsActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
