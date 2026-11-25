package com.school.attendance.user.service;

import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.common.util.PasswordGenerator;
import com.school.attendance.email.service.EmailService;
import com.school.attendance.keycloak.KeycloakUserService;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.repository.SchoolRepository;
import com.school.attendance.user.dto.CreateStaffRequest;
import com.school.attendance.user.dto.StaffResponse;
import com.school.attendance.user.dto.UpdateStaffRequest;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.Staff;
import com.school.attendance.user.entity.StaffRole;
import com.school.attendance.user.entity.User;
import com.school.attendance.user.repository.StaffRepository;
import com.school.attendance.user.repository.UserRepository;
import com.school.attendance.user.util.StaffRoleMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final EmailService emailService;
    private final KeycloakUserService keycloakUserService;

    @Value("${app.mail.app-url:http://localhost:3000}")
    private String appUrl;

    @Transactional
    public StaffResponse createStaff(UUID schoolId, UUID tenantId, UUID createdBy, CreateStaffRequest request) {
        log.info("Creating staff member: {} {} for school: {}", request.getFirstName(), request.getLastName(), schoolId);

        if (staffRepository.existsByEmailAndDeletedAtIsNull(request.getEmail())) {
            throw new DuplicateResourceException("Staff member with email already exists: " + request.getEmail());
        }

        if (!request.getPrimaryRole().isApplicableForTier(request.getSchoolSection().getTierName())) {
            throw new IllegalArgumentException(
                String.format("Role %s is not applicable for section %s",
                    request.getPrimaryRole().getDisplayName(),
                    request.getSchoolSection().getDisplayName())
            );
        }

        String staffNumber = generateStaffNumber(schoolId, request.getSchoolSection());

        Staff staff = Staff.builder()
                .schoolId(schoolId)
                .tenantId(tenantId)
                .staffNumber(staffNumber)
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .schoolSection(request.getSchoolSection())
                .primaryRole(request.getPrimaryRole())
                .department(request.getDepartment())
                .highestQualification(request.getHighestQualification())
                .trcnLicenseNumber(request.getTrcnLicenseNumber())
                .trcnVerified(false)
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .nextOfKin(request.getNextOfKin())
                .employmentType(request.getEmploymentType())
                .employmentStatus(request.getEmploymentStatus())
                .accountProvisioned(false)
                .createdBy(createdBy)
                .build();

        Staff savedStaff = staffRepository.save(staff);
        log.info("Created staff: {} - {} {}", savedStaff.getStaffNumber(), savedStaff.getFirstName(), savedStaff.getLastName());

        String tempPassword = null;
        try {
            tempPassword = PasswordGenerator.generatePassword();
            String keycloakRole = StaffRoleMapper.toKeycloakRole(request.getPrimaryRole());

            String keycloakUserId = keycloakUserService.createUserWithTenantAndSchool(
                    request.getEmail(),
                    request.getFirstName(),
                    request.getLastName(),
                    tempPassword,
                    keycloakRole,
                    tenantId,
                    schoolId
            );

            savedStaff.setUserId(UUID.fromString(keycloakUserId));
            savedStaff.setAccountProvisioned(true);
            savedStaff = staffRepository.save(savedStaff);

            User user = User.builder()
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .phone(request.getPhone())
                    .keycloakId(keycloakUserId)
                    .emailVerified(false)
                    .tenantId(tenantId)
                    .isPlatformAdmin(false)
                    .createdBy(createdBy)
                    .build();
            userRepository.save(user);

            log.info("Created Keycloak user and User record for staff: {} with role: {}", savedStaff.getEmail(), keycloakRole);
        } catch (Exception e) {
            log.error("Failed to create Keycloak user for staff: {} - {}", request.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to provision staff account in Keycloak", e);
        }

        if (Boolean.TRUE.equals(request.getSendInvitationEmail())) {
            sendStaffInvitation(savedStaff, tempPassword);
        }

        return toStaffResponse(savedStaff);
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getAllStaffBySchool(UUID schoolId) {
        return staffRepository.findBySchoolIdAndDeletedAtIsNull(schoolId).stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getStaffBySchoolAndSection(UUID schoolId, SchoolSection section) {
        return staffRepository.findBySchoolIdAndSchoolSectionAndDeletedAtIsNull(schoolId, section).stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getStaffBySchoolAndRole(UUID schoolId, StaffRole role) {
        return staffRepository.findBySchoolIdAndPrimaryRoleAndDeletedAtIsNull(schoolId, role).stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getActiveStaffBySchool(UUID schoolId) {
        return staffRepository.findBySchoolIdAndEmploymentStatusAndDeletedAtIsNull(schoolId, "ACTIVE").stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public StaffResponse getStaffById(UUID id, UUID schoolId) {
        Staff staff = staffRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        if (!staff.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }

        return toStaffResponse(staff);
    }

    @Transactional(readOnly = true)
    public StaffResponse getStaffByEmail(String email) {
        Staff staff = staffRepository.findByEmailAndDeletedAtIsNull(email)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with email: " + email));

        return toStaffResponse(staff);
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> searchStaff(UUID schoolId, String searchTerm) {
        return staffRepository.searchBySchoolId(schoolId, searchTerm).stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional
    public StaffResponse updateStaff(UUID id, UUID schoolId, UUID updatedBy, UpdateStaffRequest request) {
        Staff staff = staffRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        if (!staff.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }

        if (request.getEmail() != null && !staff.getEmail().equals(request.getEmail())) {
            if (staffRepository.existsByEmailAndDeletedAtIsNull(request.getEmail())) {
                throw new DuplicateResourceException("Staff member with email already exists: " + request.getEmail());
            }
            staff.setEmail(request.getEmail());
        }

        if (request.getFirstName() != null) staff.setFirstName(request.getFirstName());
        if (request.getLastName() != null) staff.setLastName(request.getLastName());
        if (request.getPhone() != null) staff.setPhone(request.getPhone());

        if (request.getSchoolSection() != null && request.getPrimaryRole() != null) {
            if (!request.getPrimaryRole().isApplicableForTier(request.getSchoolSection().getTierName())) {
                throw new IllegalArgumentException(
                    String.format("Role %s is not applicable for section %s",
                        request.getPrimaryRole().getDisplayName(),
                        request.getSchoolSection().getDisplayName())
                );
            }
            staff.setSchoolSection(request.getSchoolSection());
            staff.setPrimaryRole(request.getPrimaryRole());
        } else {
            if (request.getSchoolSection() != null) staff.setSchoolSection(request.getSchoolSection());
            if (request.getPrimaryRole() != null) staff.setPrimaryRole(request.getPrimaryRole());
        }

        if (request.getDepartment() != null) staff.setDepartment(request.getDepartment());
        if (request.getHighestQualification() != null) staff.setHighestQualification(request.getHighestQualification());
        if (request.getTrcnLicenseNumber() != null) staff.setTrcnLicenseNumber(request.getTrcnLicenseNumber());
        if (request.getTrcnVerified() != null) staff.setTrcnVerified(request.getTrcnVerified());
        if (request.getDateOfBirth() != null) staff.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) staff.setGender(request.getGender());
        if (request.getNextOfKin() != null) staff.setNextOfKin(request.getNextOfKin());
        if (request.getEmploymentType() != null) staff.setEmploymentType(request.getEmploymentType());

        if (request.getEmploymentStatus() != null) {
            String oldStatus = staff.getEmploymentStatus();
            String newStatus = request.getEmploymentStatus();

            if (staff.getUserId() != null && !newStatus.equals(oldStatus)) {
                syncKeycloakAccountStatus(staff.getUserId(), newStatus);
            }
            staff.setEmploymentStatus(newStatus);
        }

        staff.setUpdatedBy(updatedBy);

        Staff updatedStaff = staffRepository.save(staff);
        log.info("Updated staff: {} - {} {}", updatedStaff.getStaffNumber(), updatedStaff.getFirstName(), updatedStaff.getLastName());

        return toStaffResponse(updatedStaff);
    }

    @Transactional
    public void deleteStaff(UUID id, UUID schoolId, UUID deletedBy) {
        Staff staff = staffRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        if (!staff.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }

        if (staff.getUserId() != null) {
            try {
                keycloakUserService.disableUser(staff.getUserId().toString());
                log.info("Disabled Keycloak account for deleted staff: {}", staff.getEmail());
            } catch (Exception e) {
                log.error("Failed to disable Keycloak account for staff: {} - {}", staff.getEmail(), e.getMessage());
            }

            userRepository.findByKeycloakId(staff.getUserId().toString()).ifPresent(user -> {
                user.softDelete(deletedBy);
                userRepository.save(user);
                log.info("Soft deleted User record for staff: {}", staff.getEmail());
            });
        }

        staff.softDelete(deletedBy);
        staffRepository.save(staff);
        log.info("Soft deleted staff: {} - {} {}", staff.getStaffNumber(), staff.getFirstName(), staff.getLastName());
    }

    @Transactional(readOnly = true)
    public long countStaffBySchool(UUID schoolId) {
        return staffRepository.countBySchoolId(schoolId);
    }

    @Transactional(readOnly = true)
    public long countActiveStaffBySchool(UUID schoolId) {
        return staffRepository.countActiveStaffBySchoolId(schoolId);
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getPendingActivationStaff(UUID schoolId) {
        return staffRepository.findPendingActivationBySchoolId(schoolId).stream()
                .map(this::toStaffResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StaffRole> getRolesForSection(SchoolSection section) {
        return StaffRole.getRolesForTier(section.getTierName());
    }

    @Transactional
    public StaffResponse activateStaffAccount(UUID userId) {
        Staff staff = staffRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found for user: " + userId));

        if (staff.getAccountActivatedAt() != null) {
            log.info("Staff account already activated: {}", staff.getEmail());
            return toStaffResponse(staff);
        }

        staff.setAccountActivatedAt(LocalDateTime.now());
        if (staff.getInvitationAcceptedAt() == null) {
            staff.setInvitationAcceptedAt(LocalDateTime.now());
        }
        if (staff.getDateOfEmployment() == null) {
            staff.setDateOfEmployment(LocalDateTime.now().toLocalDate());
        }

        Staff updatedStaff = staffRepository.save(staff);

        userRepository.findByKeycloakId(userId.toString()).ifPresent(user -> {
            user.setEmailVerified(true);
            userRepository.save(user);
            log.info("Set emailVerified=true for user: {}", user.getEmail());
        });

        log.info("Activated staff account: {} - {} {}",
                updatedStaff.getStaffNumber(), updatedStaff.getFirstName(), updatedStaff.getLastName());

        return toStaffResponse(updatedStaff);
    }

    private void syncKeycloakAccountStatus(UUID userId, String employmentStatus) {
        try {
            String keycloakUserId = userId.toString();

            switch (employmentStatus) {
                case "ACTIVE", "ON_LEAVE" -> {
                    keycloakUserService.enableUser(keycloakUserId);
                    log.info("Enabled Keycloak account for staff with status: {}", employmentStatus);
                }
                case "INACTIVE", "SUSPENDED", "TERMINATED" -> {
                    keycloakUserService.disableUser(keycloakUserId);
                    log.info("Disabled Keycloak account for staff with status: {}", employmentStatus);
                }
                default -> log.warn("Unknown employment status: {}", employmentStatus);
            }
        } catch (Exception e) {
            log.error("Failed to sync Keycloak account status: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to sync staff account status with Keycloak", e);
        }
    }

    private String generateStaffNumber(UUID schoolId, SchoolSection section) {
        long count = staffRepository.countBySchoolId(schoolId);
        String sectionCode = section.getCode();
        String schoolCode = schoolId.toString().substring(0, 8).toUpperCase();
        return String.format("%s-%s-%05d", schoolCode, sectionCode, count + 1);
    }

    private void sendStaffInvitation(Staff staff, String tempPassword) {
        try {
            School school = schoolRepository.findById(staff.getSchoolId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + staff.getSchoolId()));

            String loginUrl = String.format("%s/login", appUrl);

            log.info("Attempting to send invitation email to: {} with password: {}", staff.getEmail(), tempPassword);

            emailService.sendStaffInvitationEmail(
                    staff.getEmail(),
                    staff.getFullName(),
                    school.getName(),
                    staff.getStaffNumber(),
                    tempPassword,
                    loginUrl
            );

            staff.setInvitationSentAt(LocalDateTime.now());
            staffRepository.save(staff);

            log.info("SUCCESS: Invitation email sent to staff: {} ({}) at {}",
                    staff.getStaffNumber(), staff.getFullName(), staff.getEmail());
        } catch (Exception e) {
            log.error("FAILED: Could not send invitation email to staff: {} - Error: {}",
                    staff.getEmail(), e.getMessage(), e);
            log.warn("Staff account was created but invitation email was not sent. Please send credentials manually.");
        }
    }

    private StaffResponse toStaffResponse(Staff staff) {
        return StaffResponse.builder()
                .id(staff.getId())
                .userId(staff.getUserId())
                .schoolId(staff.getSchoolId())
                .tenantId(staff.getTenantId())
                .staffNumber(staff.getStaffNumber())
                .email(staff.getEmail())
                .firstName(staff.getFirstName())
                .lastName(staff.getLastName())
                .fullName(staff.getFullName())
                .phone(staff.getPhone())
                .schoolSection(staff.getSchoolSection())
                .schoolSectionDisplay(staff.getSchoolSection() != null ? staff.getSchoolSection().getDisplayName() : null)
                .primaryRole(staff.getPrimaryRole())
                .primaryRoleDisplay(staff.getPrimaryRole() != null ? staff.getPrimaryRole().getDisplayName() : null)
                .department(staff.getDepartment())
                .highestQualification(staff.getHighestQualification())
                .trcnLicenseNumber(staff.getTrcnLicenseNumber())
                .trcnVerified(staff.getTrcnVerified())
                .dateOfBirth(staff.getDateOfBirth())
                .gender(staff.getGender())
                .nextOfKin(staff.getNextOfKin())
                .employmentType(staff.getEmploymentType())
                .employmentStatus(staff.getEmploymentStatus())
                .dateOfEmployment(staff.getDateOfEmployment())
                .accountProvisioned(staff.getAccountProvisioned())
                .hasUserAccount(staff.hasUserAccount())
                .isPendingInvitation(staff.isPendingInvitation())
                .invitationSentAt(staff.getInvitationSentAt())
                .invitationAcceptedAt(staff.getInvitationAcceptedAt())
                .accountActivatedAt(staff.getAccountActivatedAt())
                .createdAt(staff.getCreatedAt())
                .updatedAt(staff.getUpdatedAt())
                .deletedAt(staff.getDeletedAt())
                .createdBy(staff.getCreatedBy())
                .updatedBy(staff.getUpdatedBy())
                .build();
    }
}
