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
        } catch (BadCredentialsException e) {
            throw new BusinessException(MessageKey.AUTH_USER_NOT_FOUND);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtService.generateOnlineToken(userDetails);

        // Resolve a display role for the response
        String roleDisplay = userDetails.isPlatformAdmin()
                ? "PLATFORM_ADMIN"
                : userRepository.findById(userDetails.getUserId())
                .map(u -> u.getRoleId().toString())
                .orElse("UNKNOWN");

        return new AuthenticationResponse(
                token,
                userDetails.getUserId(),
                userDetails.getUsername(),
                roleDisplay
        );
    }
}