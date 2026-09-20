package com.school.attendance.user;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.enums.AccessScope;
import com.school.attendance.rbac.repository.RoleRepository;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.security.CustomUserDetails;
import com.school.attendance.user.dto.CreateUserRequest;
import com.school.attendance.user.dto.UpdateUserRequest;
import com.school.attendance.user.dto.UserResponse;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.entity.AppUserSchool;
import com.school.attendance.user.mapper.UserMapper;
import com.school.attendance.user.repository.AppUserRepository;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final AppUserRepository userRepository;
    private final AppUserSchoolRepository appUserSchoolRepository;
    private final RoleRepository roleRepository;
    private final SchoolRepository schoolRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    // ══════════════════════════════════════════════════════════════
    // CREATE
    // ══════════════════════════════════════════════════════════════

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        // 1. Uniqueness check
        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessException(MessageKey.USER_ALREADY_EXISTS);
        }

        // 2. Role validation
        Role targetRole = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new BusinessException(MessageKey.ROLE_NOT_FOUND));

        // 3. Get the authenticated creator
        CustomUserDetails creator = getCurrentUserDetails();

        // 4. TENANT VALIDATION — creator must have access to the target tenant
        validateTenantAccess(creator, request.tenantId());

        // 5. SCHOOL VALIDATION — if schools are specified, creator must have access to all of them
        Set<UUID> targetSchoolIds = validateSchoolAccess(creator, request.tenantId(), request.schoolIds());

        // 6. Create the AppUser (tenant-scoped row — NO school_id)
        AppUser newUser = AppUser.builder()
                .tenantId(request.tenantId())
                .username(request.username().trim())
                .passwordHash(passwordEncoder.encode(request.password()))
                .fullName(request.fullName().trim())
                .roleId(request.roleId())
                .isActive(true)
                .build();

        AppUser savedUser = userRepository.save(newUser);

        // 7. Create school assignments (if any) via the join table
        if (!targetSchoolIds.isEmpty()) {
            List<AppUserSchool> assignments = targetSchoolIds.stream()
                    .map(schoolId -> AppUserSchool.builder()
                            .appUserId(savedUser.getId())
                            .schoolId(schoolId)
                            .assignedBy(creator.getUserId())
                            .build())
                    .toList();
            appUserSchoolRepository.saveAll(assignments);
        }

        log.info("User '{}' created in tenant {} with {} school assignments",
                savedUser.getUsername(), request.tenantId(), targetSchoolIds.size());

        return userMapper.toDto(savedUser, targetRole, targetSchoolIds);
    }

    // ══════════════════════════════════════════════════════════════
    // READ
    // ══════════════════════════════════════════════════════════════

    public List<UserResponse> getAllUsers() {
        CustomUserDetails currentUser = getCurrentUserDetails();

        // ✅ Platform admins see ALL users across ALL tenants
        if (currentUser.isPlatformAdmin()) {
            return userRepository.findAll().stream()
                    .map(this::toDtoWithDetails)
                    .toList();
        }

        // ✅ Tenant admins see ALL users in their tenant
        if (currentUser.isTenantScoped()) {
            return userRepository.findByTenantId(currentUser.getTenantId()).stream()
                    .map(this::toDtoWithDetails)
                    .toList();
        }

        // ✅ School admins see ONLY users assigned to their schools
        List<UUID> creatorSchoolIds = List.copyOf(currentUser.getAssignedSchoolIds());
        Set<UUID> visibleUserIds = appUserSchoolRepository.findBySchoolIdIn(creatorSchoolIds).stream()
                .map(AppUserSchool::getAppUserId)
                .collect(Collectors.toSet());

        return userRepository.findAllById(visibleUserIds).stream()
                .map(this::toDtoWithDetails)
                .toList();
    }

    public UserResponse getUserById(UUID id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));

        CustomUserDetails currentUser = getCurrentUserDetails();
        validateCanSeeUser(currentUser, user);

        return toDtoWithDetails(user);
    }

    public UserResponse getCurrentUser() {
        CustomUserDetails currentUser = getCurrentUserDetails();
        AppUser user = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));
        return toDtoWithDetails(user);
    }

    // ══════════════════════════════════════════════════════════════
    // UPDATE
    // ══════════════════════════════════════════════════════════════

    @Transactional
    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));

        CustomUserDetails currentUser = getCurrentUserDetails();

        // Pass requested schools so validation knows what the final state will be
        Set<UUID> requestedSchools = request.schoolIds() != null ? new HashSet<>(request.schoolIds()) : null;
        validateCanModifyUser(currentUser, user, requestedSchools);

        // Update role (if provided)
        Role newRole = null;
        if (request.roleId() != null && !request.roleId().equals(user.getRoleId())) {
            newRole = roleRepository.findById(request.roleId())
                    .orElseThrow(() -> new BusinessException(MessageKey.ROLE_NOT_FOUND));
            user.setRoleId(request.roleId());
        }

        // Update full name (if provided)
        if (request.fullName() != null && !request.fullName().isBlank()) {
            user.setFullName(request.fullName().trim());
        }

        // Update password (if provided)
        if (request.newPassword() != null && !request.newPassword().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        }

        AppUser savedUser = userRepository.save(user);

        // Reassign school memberships (if provided)
        Set<UUID> finalSchoolIds;
        if (request.schoolIds() != null) {
            Set<UUID> targetSchoolIds = validateSchoolAccess(currentUser, user.getTenantId(), request.schoolIds());
            reassignSchools(user.getId(), targetSchoolIds, currentUser.getUserId());
            finalSchoolIds = targetSchoolIds;
        } else {
            finalSchoolIds = appUserSchoolRepository.findByAppUserId(user.getId()).stream()
                    .map(AppUserSchool::getSchoolId)
                    .collect(Collectors.toSet());
        }

        if (newRole == null) {
            newRole = roleRepository.findById(user.getRoleId()).orElse(null);
        }

        return userMapper.toDto(savedUser, newRole, finalSchoolIds);
    }

    // ══════════════════════════════════════════════════════════════
    // ACTIVATE / DEACTIVATE
    // ══════════════════════════════════════════════════════════════

    @Transactional
    public UserResponse deactivateUser(UUID id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));

        CustomUserDetails currentUser = getCurrentUserDetails();

        if (user.getId().equals(currentUser.getUserId())) {
            throw new BusinessException(MessageKey.USER_CANNOT_DEACTIVATE_SELF);
        }

        validateCanModifyUser(currentUser, user, null);

        if (!user.getIsActive()) {
            throw new BusinessException(MessageKey.USER_ALREADY_DEACTIVATED);
        }

        user.setIsActive(false);
        return toDtoWithDetails(userRepository.save(user));
    }

    @Transactional
    public UserResponse activateUser(UUID id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(MessageKey.USER_NOT_FOUND));

        CustomUserDetails currentUser = getCurrentUserDetails();
        validateCanModifyUser(currentUser, user, null);

        if (user.getIsActive()) {
            throw new BusinessException(MessageKey.USER_ALREADY_ACTIVE);
        }

        user.setIsActive(true);
        return toDtoWithDetails(userRepository.save(user));
    }

    // ══════════════════════════════════════════════════════════════
    // AUTHORIZATION HELPERS
    // ══════════════════════════════════════════════════════════════

    private void validateTenantAccess(CustomUserDetails creator, UUID targetTenantId) {
        if (creator.isPlatformAdmin()) {
            return;
        }
        if (!java.util.Objects.equals(creator.getTenantId(), targetTenantId)) {
            throw new BusinessException(MessageKey.UNAUTHORIZED_TENANT_ACCESS);
        }
    }

    private Set<UUID> validateSchoolAccess(CustomUserDetails creator, UUID targetTenantId, List<UUID> requestedSchoolIds) {
        if (requestedSchoolIds == null || requestedSchoolIds.isEmpty()) {
            return Set.of();
        }

        Set<UUID> requested = new HashSet<>(requestedSchoolIds);

        // 1. All requested schools MUST belong to the target tenant
        long matchingSchools = schoolRepository.findByIdInAndTenantId(List.copyOf(requested), targetTenantId).size();
        if (matchingSchools != requested.size()) {
            throw new BusinessException(MessageKey.SCHOOL_OUTSIDE_TENANT);
        }

        // 2. If creator is school-scoped, they can only assign schools they belong to.
        if (!creator.isPlatformAdmin() && creator.isSchoolScoped()) {
            Set<UUID> creatorSchools = creator.getAssignedSchoolIds();
            if (!creatorSchools.containsAll(requested)) {
                throw new BusinessException(MessageKey.UNAUTHORIZED_SCHOOL_ACCESS);
            }
        }
        return requested;
    }

    private void validateCanSeeUser(CustomUserDetails currentUser, AppUser targetUser) {
        if (!currentUser.getTenantId().equals(targetUser.getTenantId())) {
            throw new BusinessException(MessageKey.USER_NOT_FOUND); // Don't leak existence
        }

        if (currentUser.isSchoolScoped()) {
            Set<UUID> targetSchools = appUserSchoolRepository.findByAppUserId(targetUser.getId()).stream()
                    .map(AppUserSchool::getSchoolId)
                    .collect(Collectors.toSet());

            boolean anyOverlap = currentUser.getAssignedSchoolIds().stream().anyMatch(targetSchools::contains);
            if (!anyOverlap) {
                throw new BusinessException(MessageKey.USER_NOT_FOUND);
            }
        }
    }

    /**
     * Validates that the current user can MODIFY the target user based on the hierarchy.
     *
     * Hierarchy Rules:
     * 1. Platform Admin: Can modify ANY user (including self)
     * 2. Tenant Admin: Can modify users BELOW tenant level (School Admins, Teachers)
     * 3. School Admin: Can modify users BELOW school level (Teachers)
     * 4. Teacher: Cannot modify other users
     */
    private void validateCanModifyUser(CustomUserDetails currentUser, AppUser targetUser, Set<UUID> requestedSchoolIds) {
        // Rule 1: No self-modification (Platform Admin exempt)
        if (!currentUser.isPlatformAdmin() && currentUser.getUserId().equals(targetUser.getId())) {
            throw new BusinessException(MessageKey.USER_CANNOT_MODIFY_SELF);
        }

        // Platform Admin: no further restrictions
        if (currentUser.isPlatformAdmin()) {
            return;
        }

        AccessScope targetScope = roleRepository.findById(targetUser.getRoleId())
                .map(Role::getAccessScope)
                .orElseThrow(() -> new BusinessException(MessageKey.ROLE_NOT_FOUND));

        // Rule 2: Tenant Admin logic
        if (currentUser.isTenantScoped()) {
            if (!currentUser.getTenantId().equals(targetUser.getTenantId())) {
                throw new BusinessException(MessageKey.UNAUTHORIZED_TENANT_ACCESS);
            }
            if (targetScope == AccessScope.TENANT) {
                throw new BusinessException(MessageKey.CANNOT_MODIFY_SAME_LEVEL);
            }
            return; // Can modify School Admins and Teachers
        }

        // Rule 3: School Admin logic
        if (currentUser.isSchoolScoped()) {
            Set<UUID> currentUserSchools = currentUser.getAssignedSchoolIds();

            List<UUID> targetUserSchoolIds = appUserSchoolRepository.findByAppUserId(targetUser.getId()).stream()
                    .map(AppUserSchool::getSchoolId)
                    .toList();

            // Determine which schools to check: requested (if updating) OR existing
            Set<UUID> schoolsToCheck = (requestedSchoolIds != null && !requestedSchoolIds.isEmpty())
                    ? requestedSchoolIds
                    : new HashSet<>(targetUserSchoolIds);

            // If there are schools to check, ensure at least one overlaps with the admin's schools
            if (!schoolsToCheck.isEmpty()) {
                boolean hasOverlap = schoolsToCheck.stream().anyMatch(currentUserSchools::contains);
                if (!hasOverlap) {
                    throw new BusinessException(MessageKey.UNAUTHORIZED_USER_ACCESS);
                }
            }

            // Cannot modify other School Admins (same level)
            if (targetScope == AccessScope.ASSIGNED_SCHOOLS) {
                throw new BusinessException(MessageKey.CANNOT_MODIFY_SAME_LEVEL);
            }

            // Can only modify Teachers (OWN scope) or unassigned users being set up.
            // Block TENANT and SYSTEM scope users from being modified by School Admins.
            if (targetScope == AccessScope.TENANT || targetScope == AccessScope.SYSTEM) {
                throw new BusinessException(MessageKey.UNAUTHORIZED_USER_ACCESS);
            }

            return;
        }

        // Rule 4: Teacher (OWN scope) cannot modify other users
        throw new BusinessException(MessageKey.UNAUTHORIZED_USER_ACCESS);
    }

    private void reassignSchools(UUID userId, Set<UUID> newSchoolIds, UUID assignedBy) {
        appUserSchoolRepository.deleteByAppUserId(userId);
        if (!newSchoolIds.isEmpty()) {
            List<AppUserSchool> assignments = newSchoolIds.stream()
                    .map(schoolId -> AppUserSchool.builder()
                            .appUserId(userId)
                            .schoolId(schoolId)
                            .assignedBy(assignedBy)
                            .build())
                    .toList();
            appUserSchoolRepository.saveAll(assignments);
        }
    }

    private CustomUserDetails getCurrentUserDetails() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails userDetails) {
            return userDetails;
        }
        throw new BusinessException(MessageKey.AUTH_UNAUTHORIZED);
    }

    private UserResponse toDtoWithDetails(AppUser user) {
        Role role = roleRepository.findById(user.getRoleId()).orElse(null);
        Set<UUID> schoolIds = appUserSchoolRepository.findByAppUserId(user.getId()).stream()
                .map(AppUserSchool::getSchoolId)
                .collect(Collectors.toSet());
        return userMapper.toDto(user, role, schoolIds);
    }
}