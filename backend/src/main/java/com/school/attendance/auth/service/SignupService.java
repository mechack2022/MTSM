package com.school.attendance.auth.service;

import com.school.attendance.auth.dto.SignupRequest;
import com.school.attendance.auth.dto.SignupResponse;
import com.school.attendance.auth.dto.VerifyEmailResponse;
import com.school.attendance.common.entity.EmailVerification;
import com.school.attendance.common.exception.ConflictException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.common.repository.EmailVerificationRepository;
import com.school.attendance.email.service.EmailService;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.repository.RoleRepository;
import com.school.attendance.seed.SystemRoleSeeder;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignupService {

    private final TenantRepository tenantRepository;
    private final AppUserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EmailVerificationRepository emailVerificationRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private static final int VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        validateSignupRequest(request);

        Tenant tenant = createTenant(request);
        Role tenantAdminRole = getTenantAdminRole();
        AppUser user = createUser(request, tenant, tenantAdminRole);
        EmailVerification verification = createEmailVerification(user);

        emailService.sendVerificationEmail(
            user.getEmail(),
            user.getFullName(),
            verification.getToken()
        );

        log.info("Signup completed for user: {} in tenant: {}", user.getUsername(), tenant.getCode());

        return SignupResponse.builder()
            .userId(user.getId())
            .tenantId(tenant.getId())
            .email(user.getEmail())
            .message("Signup successful! Please check your email to verify your account.")
            .build();
    }

    @Transactional
    public VerifyEmailResponse verifyEmail(String token) {
        EmailVerification verification = emailVerificationRepository.findByToken(token)
            .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired verification token"));

        if (verification.isUsed()) {
            throw new ConflictException("This verification link has already been used");
        }

        if (verification.isExpired()) {
            throw new ConflictException("This verification link has expired. Please request a new one");
        }

        AppUser user = userRepository.findById(verification.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setIsActive(true);
        userRepository.save(user);

        verification.setUsedAt(LocalDateTime.now());
        emailVerificationRepository.save(verification);

        Tenant tenant = tenantRepository.findById(user.getTenantId())
            .orElseThrow(() -> new ResourceNotFoundException("Tenant not found"));

        emailService.sendWelcomeEmail(user.getEmail(), user.getFullName(), tenant.getName());

        log.info("Email verified successfully for user: {}", user.getUsername());

        return VerifyEmailResponse.builder()
            .success(true)
            .message("Email verified successfully! You can now log in to your account.")
            .username(user.getUsername())
            .build();
    }

    @Transactional
    public void resendVerificationEmail(String email) {
        AppUser user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("No account found with this email"));

        if (user.getIsActive()) {
            throw new ConflictException("This account is already verified");
        }

        EmailVerification existingVerification = emailVerificationRepository
            .findByEmailAndTypeAndUsedAtIsNull(email, EmailVerification.EmailType.VERIFICATION)
            .orElse(null);

        if (existingVerification != null && !existingVerification.isExpired()) {
            throw new ConflictException("A verification email was recently sent. Please check your inbox");
        }

        EmailVerification newVerification = createEmailVerification(user);

        emailService.sendVerificationEmail(
            user.getEmail(),
            user.getFullName(),
            newVerification.getToken()
        );

        log.info("Verification email resent to: {}", email);
    }

    private void validateSignupRequest(SignupRequest request) {
        if (tenantRepository.existsByCode(request.getOrganizationCode())) {
            throw new ConflictException("Organization code already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already exists");
        }

        if (request.getContactEmail() != null &&
            tenantRepository.existsByContactEmail(request.getContactEmail())) {
            throw new ConflictException("Contact email already exists");
        }

        if (request.getContactPhone() != null &&
            tenantRepository.existsByContactPhone(request.getContactPhone())) {
            throw new ConflictException("Contact phone already exists");
        }
    }

    private Tenant createTenant(SignupRequest request) {
        Tenant tenant = Tenant.builder()
            .name(request.getOrganizationName())
            .code(request.getOrganizationCode())
            .contactEmail(request.getContactEmail())
            .contactPhone(request.getContactPhone())
            .isActive(true)
            .build();

        return tenantRepository.save(tenant);
    }

    private Role getTenantAdminRole() {
        return roleRepository.findByCode(SystemRoleSeeder.TENANT_ADMIN)
            .orElseThrow(() -> new IllegalStateException("TENANT_ADMIN role not found in system"));
    }

    private AppUser createUser(SignupRequest request, Tenant tenant, Role role) {
        AppUser user = AppUser.builder()
            .tenantId(tenant.getId())
            .username(request.getUsername())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .fullName(request.getFullName())
            .email(request.getEmail())
            .roleId(role.getId())
            .isActive(false)
            .build();

        return userRepository.save(user);
    }

    private EmailVerification createEmailVerification(AppUser user) {
        EmailVerification verification = EmailVerification.builder()
            .userId(user.getId())
            .tenantId(user.getTenantId())
            .email(user.getEmail())
            .type(EmailVerification.EmailType.VERIFICATION)
            .token(UUID.randomUUID().toString())
            .expiresAt(LocalDateTime.now().plusHours(VERIFICATION_TOKEN_EXPIRY_HOURS))
            .sentAt(LocalDateTime.now())
            .build();

        return emailVerificationRepository.save(verification);
    }
}
