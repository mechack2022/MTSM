package com.school.attendance.auth;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.security.JwtService;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        AppUser user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new BusinessException(MessageKey.AUTH_USER_NOT_FOUND));
        String token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                        .password(user.getPasswordHash())
                        .roles(user.getRole().name())
                        .build()
        );
        return new AuthenticationResponse(
                token, user.getId(), user.getUsername(), user.getRole().name()
        );
    }
}