package com.school.attendance.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank(message = "Organization name is required")
    @Size(max = 255, message = "Organization name too long")
    private String organizationName;

    @NotBlank(message = "Organization code is required")
    @Pattern(
        regexp = "^[A-Z]{6}$",
        message = "Code must be exactly 6 uppercase letters"
    )
    private String organizationCode;

    @NotBlank(message = "Full name is required")
    @Size(max = 255, message = "Name too long")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email too long")
    private String email;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 100, message = "Username must be 3-100 characters")
    @Pattern(
        regexp = "^[a-zA-Z0-9_]+$",
        message = "Username can only contain letters, numbers, and underscores"
    )
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Size(max = 255, message = "Contact email too long")
    @Email(message = "Invalid contact email format")
    private String contactEmail;

    @Size(max = 50, message = "Contact phone too long")
    private String contactPhone;
}
