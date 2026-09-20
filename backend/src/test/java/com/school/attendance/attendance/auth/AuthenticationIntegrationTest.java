package com.school.attendance.attendance.auth;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.auth.AuthenticationRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthenticationIntegrationTest extends BaseIntegrationTest {

    @Test
    @DisplayName("POST /login - Should authenticate valid admin and return JWT with Role Code")
    void shouldLoginSuccessfully() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("admin_test", "password");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.data.token").isNotEmpty())
                .andExpect(jsonPath("$.data.userId").value(adminUser.getId().toString()))
                .andExpect(jsonPath("$.data.username").value("admin_test"))
                .andExpect(jsonPath("$.data.role").value("ADMIN"))
                .andExpect(jsonPath("$.error").doesNotExist())
                .andExpect(jsonPath("$.path").value("/api/v1/auth/login"));
    }

    @Test
    @DisplayName("POST /login - Should return 401 for wrong password")
    void shouldRejectInvalidPassword() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("admin_test", "wrong_password");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Username or password is incorrect"))
                .andExpect(jsonPath("$.error.code").value("AUTH_001"))
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    @DisplayName("POST /login - Should return 401 for non-existent user")
    void shouldRejectNonExistentUser() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("ghost_user", "password");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("AUTH_001"))
                .andExpect(jsonPath("$.data").doesNotExist());
        // Note: For security, the response for wrong password and non-existent user
        // should ideally be identical to prevent user enumeration.
    }

    @Test
    @DisplayName("POST /login - Should return 400 for blank credentials")
    void shouldRejectBlankCredentials() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("", "");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("VALIDATION_001")) // Adjust if your validation code differs
                .andExpect(jsonPath("$.data").doesNotExist());
    }

    @Test
    @DisplayName("POST /login - Should return 401 for deactivated user")
    void shouldRejectDeactivatedUser() throws Exception {
        // Deactivate the user
        adminUser.setIsActive(false);
        userRepository.save(adminUser);

        AuthenticationRequest request = new AuthenticationRequest("admin_test", "password");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error.code").value("AUTH_001")) // Adjust if your code is AUTH_ACCOUNT_DEACTIVATED
                .andExpect(jsonPath("$.data").doesNotExist());
    }
}