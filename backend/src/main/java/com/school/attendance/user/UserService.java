package com.school.attendance.user;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.dto.CreateUserRequest;
import com.school.attendance.user.dto.UpdateUserRequest;
import com.school.attendance.user.dto.UserResponse;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.mapper.UserMapper;
import com.school.attendance.user.repository.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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


    public UserResponse getUserById(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
    }

    public UserResponse getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .map(userMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
    }


    @Transactional
    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
        userRepository.findByUsername(request.username()) // Note: Add username to UpdateUserRequest if you want to allow username changes
                .ifPresent(existingUser -> {
                    if (!existingUser.getId().equals(id)) {
                        throw new BusinessException(MessageKey.USER_ALREADY_EXISTS);
                    }
                });

        user.setFullName(request.fullName());
        user.setRole(request.role());

        if (request.newPassword() != null && !request.newPassword().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        }
        return userMapper.toDto(userRepository.save(user));
    }


    @Transactional
    public UserResponse deactivateUser(UUID id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
        // Prevent Admin from locking themselves out
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (user.getUsername().equals(currentUsername)) {
            throw new BusinessException(MessageKey.USER_CANNOT_DEACTIVATE_SELF);
        }
        user.setIsActive(false);
        return userMapper.toDto(userRepository.save(user));
    }

    @Transactional
    public UserResponse activateUser(UUID id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
        if (!user.getIsActive()) {
            user.setIsActive(true);
            return userMapper.toDto(userRepository.save(user));
        }
        return userMapper.toDto(user);
    }

}