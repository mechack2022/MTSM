package com.school.attendance.user.mapper;

import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.user.dto.UserResponse;
import com.school.attendance.user.entity.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements EntityMapper<AppUser, UserResponse> {

    @Override
    public UserResponse toDto(AppUser user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole(),
                user.getIsActive()
        );
    }
}
