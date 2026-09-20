package com.school.attendance.auth;

import java.util.UUID;

public record AuthenticationResponse(
        String token,
        UUID userId,
        String username,
        String role

) {}