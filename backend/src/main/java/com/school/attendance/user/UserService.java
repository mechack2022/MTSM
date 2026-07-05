package com.school.attendance.user;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.dto.CreateUserRequest;
import com.school.attendance.user.dto.UserResponse;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.mapper.UserMapper;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AppUserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse createUser(CreateUserRequest request) {
        userRepository.findByUsername(request.username())
                .ifPresent(existingUser -> {
                    throw new BusinessException(MessageKey.USER_ALREADY_EXISTS);
                });

        AppUser savedUser = userRepository.save(
                AppUser.builder()
                        .schoolId(getSchoolId())
                        .username(request.username())
                        .passwordHash(passwordEncoder.encode(request.password()))
                        .fullName(request.fullName())
                        .role(request.role())
                        .isActive(true)
                        .build()
        );
        return userMapper.toDto(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .toList();
    }

    private UUID getSchoolId() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(School::getId)
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}