package com.school.attendance.attendance;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.auth.AuthenticationRequest;
import com.school.attendance.auth.AuthenticationResponse;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.enums.UserRole;
import com.school.attendance.user.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Testcontainers
public abstract class BaseIntegrationTest {

//    @Container
     @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("test_db")
            .withUsername("test_user")
            .withPassword("test_password");

    // Dynamic properties to point Spring Boot to the test container
    @org.springframework.test.context.DynamicPropertySource
    static void configureProperties(org.springframework.test.context.DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.security.jwt.secret-key", () -> "test-secret-key-that-is-long-enough-for-hmac-sha-256-algorithm-123456");
        registry.add("spring.security.jwt.expiration-time", () -> "3600000");
        registry.add("app.seed.enabled", () -> "false"); // Disable DataSeeder in tests
    }

    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;
    @Autowired protected AppUserRepository userRepository;
    @Autowired protected SchoolRepository schoolRepository;
    @Autowired protected PasswordEncoder passwordEncoder;

    protected School testSchool;
    protected AppUser adminUser;
    protected AppUser headTeacherUser;
    protected AppUser teacherUser;
    protected String adminToken;
    protected String headTeacherToken;
    protected String teacherToken;

    @BeforeEach
    void setUpBase() throws Exception {
        userRepository.deleteAll();
        schoolRepository.deleteAll();

        testSchool = schoolRepository.save(School.builder()
                .name("Test School")
                .code("TEST-SCHOOL")
                .address("Test Address")
                .build());

        adminUser = createTestUser("admin_test", "password", UserRole.ADMIN);
        headTeacherUser = createTestUser("head_test", "password", UserRole.HEAD_TEACHER);
        teacherUser = createTestUser("teacher_test", "password", UserRole.TEACHER);

        adminToken = loginAndGetToken("admin_test", "password");
        headTeacherToken = loginAndGetToken("head_test", "password");
        teacherToken = loginAndGetToken("teacher_test", "password");
    }

    protected AppUser createTestUser(String username, String rawPassword, UserRole role) {
        return userRepository.save(AppUser.builder()
                .schoolId(testSchool.getId())
                .username(username)
                .passwordHash(passwordEncoder.encode(rawPassword))
                .fullName("Test " + role.name())
                .role(role)
                .isActive(true)
                .build());
    }

    protected String loginAndGetToken(String username, String password) throws Exception {
        AuthenticationRequest request = new AuthenticationRequest(username, password);

        MvcResult result = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();

        String json = result.getResponse().getContentAsString();
        var responseType = objectMapper.getTypeFactory()
                .constructParametricType(ApiResponse.class, AuthenticationResponse.class);
        ApiResponse<AuthenticationResponse> response = objectMapper.readValue(json, responseType);
        return response.data().token();
    }

        static {
        postgres.start();
    }
}