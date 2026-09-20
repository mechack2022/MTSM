package com.school.attendance.auth;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.repository.RoleRepository;
import com.school.attendance.security.CustomUserDetails;
import com.school.attendance.security.JwtService;
import com.school.attendance.user.PlatformAdminDetailsService;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final PlatformAdminDetailsService platformAdminDetailsService;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (BadCredentialsException | DisabledException e) {
            // ✅ FIX 2: Catch BOTH wrong password and deactivated user.
            // Throw a generic 401 error to prevent user enumeration.
            // Make sure MessageKey.AUTH_INVALID_CREDENTIALS maps to HTTP 401 in your ExceptionHandler.
            throw new BusinessException(MessageKey.AUTH_BAD_CREDENTIALS);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtService.generateOnlineToken(userDetails);

        // ✅ FIX 1: Fetch the actual Role entity to get the String code (e.g., "ADMIN")
        String roleDisplay = userDetails.isPlatformAdmin()
                ? "PLATFORM_ADMIN"
                : roleRepository.findById(userDetails.getRoleId())
                .map(Role::getCode)
                .orElse("UNKNOWN");

        return new AuthenticationResponse(
                token,
                userDetails.getUserId(),
                userDetails.getUsername(),
                roleDisplay
        );
    }
}