package com.school.attendance.attendance.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.enums.UserRole;
import com.school.attendance.user.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthenticationIntegrationTest extends BaseIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private AppUserRepository userRepository;
    @Autowired private SchoolRepository schoolRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private UUID schoolId;

    @BeforeEach
    void setUp() {

        userRepository.deleteAll();
        schoolRepository.deleteAll();

        School school = schoolRepository.save(School.builder().name("Test School").code("TEST-01").build());
        schoolId = school.getId();

        userRepository.save(AppUser.builder()
                .username("testteacher")
                .passwordHash(passwordEncoder.encode("TestPass123!"))
                .fullName("Test Teacher")
                .role(UserRole.TEACHER)
                .schoolId(schoolId)
                .isActive(true)
                .build());
    }

    @Test
    void shouldLoginSuccessfullyAndReturnStandardEnvelope() throws Exception {
        String loginJson = """
                {
                  "username": "testteacher",
                  "password": "TestPass123!"
                }
                """;

        mockMvc.perform(
                post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status()
                 .isOk()
                )
                // Asserting the Standardized Envelope Structure
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Login successful")) // From messages.properties
                .andExpect(jsonPath("$.path").value("/api/v1/auth/login"))
                .andExpect(jsonPath("$.timestamp").isNotEmpty())
                .andExpect(jsonPath("$.error").isEmpty())
                // Asserting the Data Payload
                .andExpect(jsonPath("$.data.token").isString())
                .andExpect(jsonPath("$.data.token").isNotEmpty())
                .andExpect(jsonPath("$.data.username").value("testteacher"))
                .andExpect(jsonPath("$.data.role").value("TEACHER"))
                .andExpect(jsonPath("$.data.userId").isString());
    }

    @Test
    void shouldReturn401WithStandardErrorEnvelopeForBadCredentials() throws Exception {
        String loginJson = """
                {
                  "username": "testteacher",
                  "password": "WrongPassword!"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isUnauthorized())
                // Asserting the Error Envelope Structure
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.data").isEmpty())
                .andExpect(jsonPath("$.error.code").value("AUTH_001"))
                .andExpect(jsonPath("$.error.details").value("Username or password is incorrect"));
    }
}
