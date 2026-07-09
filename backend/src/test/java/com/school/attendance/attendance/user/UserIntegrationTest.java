package com.school.attendance.attendance.user;


import com.fasterxml.jackson.databind.JsonNode;
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
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserIntegrationTest extends BaseIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private AppUserRepository userRepository;
    @Autowired private SchoolRepository schoolRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private String adminToken;
    private String teacherToken;

    @BeforeEach
    void setUp() throws Exception {

        userRepository.deleteAll();
        schoolRepository.deleteAll();

        School school = schoolRepository.save(School.builder().name("Test School").code("TEST-01").build());

        // Create Admin and Teacher
        userRepository.save(AppUser.builder().username("admin").passwordHash(passwordEncoder.encode("Admin123!")).fullName("Admin").role(UserRole.ADMIN).schoolId(school.getId()).isActive(true).build());
        userRepository.save(AppUser.builder().username("teacher").passwordHash(passwordEncoder.encode("Teach123!")).fullName("Teacher").role(UserRole.TEACHER).schoolId(school.getId()).isActive(true).build());

        // Fetch JWT Tokens for both users to use in subsequent tests
        adminToken = extractToken("admin", "Admin123!");
        teacherToken = extractToken("teacher", "Teach123!");
    }

    private String extractToken(String username, String password) throws Exception {
        String json = String.format("{\"username\":\"%s\", \"password\":\"%s\"}", username, password);
        MvcResult result = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(json)).andReturn();
        JsonNode response = objectMapper.readTree(result.getResponse().getContentAsString());
        return response.get("data").get("token").asText();
    }

    @Test
    void shouldRejectUnauthenticatedRequest() throws Exception {
        String requestBody = """
                { "username": "newuser", "password": "Pass123!", "fullName": "New User", "role": "TEACHER" }
                """;

        mockMvc.perform(post("/api/v1/users").contentType(MediaType.APPLICATION_JSON).content(requestBody))
                .andExpect(status().isUnauthorized()); // 401
    }

    @Test
    void shouldRejectTeacherFromCreatingUsers() throws Exception {
        String requestBody = """
                { "username": "newuser", "password": "Pass123!", "fullName": "New User", "role": "TEACHER" }
                """;

        mockMvc.perform(post("/api/v1/users")
                        .header("Authorization", "Bearer " + teacherToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldAllowAdminToCreateUser() throws Exception {
        String requestBody = """
                { "username": "newheadteacher", "password": "SecurePass!", "fullName": "Jane Doe", "role": "HEAD_TEACHER" }
                """;

        mockMvc.perform(post("/api/v1/users")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated()) // 201
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.username").value("newheadteacher"))
                .andExpect(jsonPath("$.data.role").value("HEAD_TEACHER"));
    }
}
