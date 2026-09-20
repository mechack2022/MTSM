package com.school.attendance.attendance;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.attendance.auth.AuthenticationRequest;
import com.school.attendance.auth.AuthenticationResponse;
import com.school.attendance.common.api.ApiResponse;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.enums.AccessScope;
import com.school.attendance.rbac.repository.RoleRepository;
import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Testcontainers
public abstract class BaseIntegrationTest {

    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("test_db")
            .withUsername("test_user")
            .withPassword("test_password");

    static {
        postgres.start();
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.security.jwt.secret-key", () -> "test-secret-key-that-is-long-enough-for-hmac-sha-256-algorithm-123456");
        registry.add("spring.security.jwt.expiration-time", () -> "3600000");
        registry.add("app.seed.enabled", () -> "false");

        registry.add("SEED_ADMIN_PASSWORD", () -> "TestPassword123!");
        registry.add("SEED_TENANT_ADMIN_PASSWORD", () -> "TestPassword123!");
    }

    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;
    @Autowired protected AppUserRepository userRepository;
    @Autowired protected SchoolRepository schoolRepository;
    @Autowired protected PasswordEncoder passwordEncoder;
    @Autowired protected CodeSetRepository codeSetRepository;
    @Autowired protected TenantRepository tenantRepository;
    @Autowired protected RoleRepository roleRepository;

    protected Tenant testTenant;
    protected School testSchool;
    protected Role adminRole;
    protected AppUser adminUser;
    protected String adminToken;

    protected UUID testAcademicYearId;
    protected UUID testGradeLevelId;
    protected UUID testAcademicTermId;

    @BeforeEach
    void setUpBase() throws Exception {
        userRepository.deleteAll();
        codeSetRepository.deleteAll();
        schoolRepository.deleteAll();
        roleRepository.deleteAll();
        tenantRepository.deleteAll();

        // 1. Create Tenant
        testTenant = tenantRepository.save(Tenant.builder()
                .name("Test Tenant")
                .code("TEST01")
                .contactEmail("test@test.com")
                .isActive(true)
                .build());

        testSchool = schoolRepository.save(School.builder()
                .tenantId(testTenant.getId())
                .name("Test School")
                .code("TEST-SCHOOL")
                .address("Test Address")
                .build());

        adminRole = roleRepository.save(Role.builder()
                .code("ADMIN")
                .displayName("Administrator")
                .accessScope(AccessScope.TENANT)
                .isSystemRole(true)
                .build());

        // 4. Create Code Sets (✅ NOW REQUIRES tenantId, NOT schoolId)
        CodeSet academicYear = codeSetRepository.save(CodeSet.builder()
                .tenantId(testTenant.getId())
                .codeSetGroup(CodeSetGroup.ACADEMIC_YEAR)
                .code("2026")
                .displayName("2025/2026")
                .sortOrder(1)
                .isActive(true)
                .build());
        testAcademicYearId = academicYear.getId();

        CodeSet gradeLevel = codeSetRepository.save(CodeSet.builder()
                .tenantId(testTenant.getId())
                .codeSetGroup(CodeSetGroup.GRADE_LEVEL)
                .code("G1")
                .displayName("Grade 1")
                .sortOrder(1)
                .isActive(true)
                .build());
        testGradeLevelId = gradeLevel.getId();

        CodeSet academicTerm = codeSetRepository.save(CodeSet.builder()
                .tenantId(testTenant.getId())
                .codeSetGroup(CodeSetGroup.ACADEMIC_TERM)
                .code("T1")
                .displayName("Term 1")
                .sortOrder(1)
                .isActive(true)
                .build());
        testAcademicTermId = academicTerm.getId();

        adminUser = createTestUser("admin_test", "password", adminRole.getId(), testTenant.getId());
        adminToken = loginAndGetToken("admin_test", "password");
    }

    protected AppUser createTestUser(String username, String rawPassword, UUID roleId, UUID tenantId) {
        return userRepository.save(AppUser.builder()
                .tenantId(tenantId)
                .roleId(roleId)
                .username(username)
                .passwordHash(passwordEncoder.encode(rawPassword))
                .fullName("Test Admin")
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
}