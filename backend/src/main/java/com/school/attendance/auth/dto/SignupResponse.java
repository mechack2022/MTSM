package com.school.attendance.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponse {
    private UUID userId;
    private UUID tenantId;
    private String email;
    private String message;
    private boolean emailSent;
}
