package com.school.attendance.learner;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.learner.dto.CreateLearnerRequest;
import com.school.attendance.learner.dto.UpdateLearnerRequest;
import com.school.attendance.learner.entity.Learner;
import com.school.attendance.learner.repository.LearnerRepository;
import com.school.attendance.rbac.entity.Permission;
import com.school.attendance.rbac.entity.Role;
import com.school.attendance.rbac.entity.RolePermission;
import com.school.attendance.rbac.enums.AccessScope;
import com.school.attendance.rbac.enums.ResourceScope;
import com.school.attendance.rbac.repository.PermissionRepository;
import com.school.attendance.rbac.repository.RolePermissionRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class LearnerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private LearnerRepository learnerRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    @Autowired
    private AppUserSchoolRepository appUserSchoolRepository;

    private Permission learnerCreate;
    private Permission learnerRead;
    private Permission learnerUpdate;
    private Permission learnerDeactivate;

    private Tenant tenant2;
    private School school2;
    private AppUser admin2;
    private String admin2Token;

    @BeforeEach
    void setUp() throws Exception {
        learnerRepository.deleteAll();
        appUserSchoolRepository.deleteAll();
        rolePermissionRepository.deleteAll();
        permissionRepository.deleteAll();

        // Create permissions for LEARNER operations
        learnerCreate = permissionRepository.save(Permission.builder()
                .code("LEARNER_CREATE")
                .displayName("Create Learner")
                .category("LEARNER")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        learnerRead = permissionRepository.save(Permission.builder()
                .code("LEARNER_READ")
                .displayName("Read Learner")
                .category("LEARNER")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        learnerUpdate = permissionRepository.save(Permission.builder()
                .code("LEARNER_UPDATE")
                .displayName("Update Learner")
                .category("LEARNER")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        learnerDeactivate = permissionRepository.save(Permission.builder()
                .code("LEARNER_DEACTIVATE")
                .displayName("Deactivate Learner")
                .category("LEARNER")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        // Assign all permissions to admin role
        rolePermissionRepository.save(new RolePermission(adminRole.getId(), learnerCreate.getId()));
        rolePermissionRepository.save(new RolePermission(adminRole.getId(), learnerRead.getId()));
        rolePermissionRepository.save(new RolePermission(adminRole.getId(), learnerUpdate.getId()));
        rolePermissionRepository.save(new RolePermission(adminRole.getId(), learnerDeactivate.getId()));

        // Create second tenant for isolation tests
        tenant2 = tenantRepository.save(Tenant.builder()
                .name("Tenant 2")
                .code("TENANT2")
                .contactEmail("tenant2@test.com")
                .isActive(true)
                .build());

        school2 = schoolRepository.save(School.builder()
                .tenantId(tenant2.getId())
                .name("School 2")
                .code("SCH2")
                .address("School 2 Address")
                .build());

        Role admin2Role = roleRepository.save(Role.builder()
                .code("ADMIN2")
                .displayName("Admin 2")
                .accessScope(AccessScope.TENANT)
                .isSystemRole(false)
                .build());

        // Assign permissions to admin2 role
        rolePermissionRepository.save(new RolePermission(admin2Role.getId(), learnerCreate.getId()));
        rolePermissionRepository.save(new RolePermission(admin2Role.getId(), learnerRead.getId()));
        rolePermissionRepository.save(new RolePermission(admin2Role.getId(), learnerUpdate.getId()));
        rolePermissionRepository.save(new RolePermission(admin2Role.getId(), learnerDeactivate.getId()));

        admin2 = createTestUser("admin2", "password", admin2Role.getId(), tenant2.getId());
        admin2Token = loginAndGetToken("admin2", "password");
    }

    // Create Learner Tests
    @Nested
    @DisplayName("Create Learner Tests")
    class CreateLearnerTests {

        @Test
        @DisplayName("Should create learner successfully")
        void shouldCreateLearnerSuccessfully() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    testSchool.getId(),
                    "John",
                    "Doe",
                    "L2024001",
                    testGradeLevelId,
                    LocalDate.of(2010, 5, 15),
                    "Male",
                    "Previous School ABC"
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.status").value(201))
                    .andExpect(jsonPath("$.data.tenantId").value(testTenant.getId().toString()))
                    .andExpect(jsonPath("$.data.schoolId").value(testSchool.getId().toString()))
                    .andExpect(jsonPath("$.data.firstName").value("John"))
                    .andExpect(jsonPath("$.data.lastName").value("Doe"))
                    .andExpect(jsonPath("$.data.learnerNumber").value("L2024001"))
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }

        @Test
        @DisplayName("Should auto-generate learner number if not provided")
        void shouldAutoGenerateLearnerNumber() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    testSchool.getId(),
                    "Jane",
                    "Smith",
                    null,
                    testGradeLevelId,
                    LocalDate.of(2011, 8, 20),
                    "Female",
                    null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.learnerNumber").isNotEmpty());
        }

        @Test
        @DisplayName("Should fail when school ID is missing")
        void shouldFailWhenSchoolIdMissing() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    null,
                    "John",
                    "Doe",
                    "L2024001",
                    testGradeLevelId,
                    LocalDate.of(2010, 5, 15),
                    "Male",
                    null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Should fail with duplicate learner number")
        void shouldFailWithDuplicateLearnerNumber() throws Exception {
            learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("John")
                    .lastName("Doe")
                    .learnerNumber("L2024001")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            CreateLearnerRequest request = new CreateLearnerRequest(
                    testSchool.getId(),
                    "Jane",
                    "Smith",
                    "L2024001",
                    testGradeLevelId,
                    LocalDate.of(2011, 8, 20),
                    "Female",
                    null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isConflict());
        }

        @Test
        @DisplayName("Should fail when school doesn't belong to user's tenant")
        void shouldFailWhenSchoolNotInTenant() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    school2.getId(),
                    "John",
                    "Doe",
                    "L2024001",
                    testGradeLevelId,
                    LocalDate.of(2010, 5, 15),
                    "Male",
                    null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound());
        }
    }

    // Read Learner Tests
    @Nested
    @DisplayName("Read Learner Tests")
    class ReadLearnerTests {

        private Learner testLearner;

        @BeforeEach
        void setUpLearner() {
            testLearner = learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("John")
                    .lastName("Doe")
                    .learnerNumber("L2024001")
                    .gradeLevelId(testGradeLevelId)
                    .dateOfBirth(LocalDate.of(2010, 5, 15))
                    .sex("Male")
                    .isActive(true)
                    .build());
        }

        @Test
        @DisplayName("Should get learner by ID")
        void shouldGetLearnerById() throws Exception {
            mockMvc.perform(get("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.id").value(testLearner.getId().toString()))
                    .andExpect(jsonPath("$.data.firstName").value("John"))
                    .andExpect(jsonPath("$.data.lastName").value("Doe"))
                    .andExpect(jsonPath("$.data.learnerNumber").value("L2024001"));
        }

        @Test
        @DisplayName("Should get all active learners")
        void shouldGetAllActiveLearners() throws Exception {
            learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("Jane")
                    .lastName("Smith")
                    .learnerNumber("L2024002")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(get("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(2)));
        }

        @Test
        @DisplayName("Should filter learners by grade level")
        void shouldFilterByGradeLevel() throws Exception {
            mockMvc.perform(get("/api/v1/learners")
                            .param("gradeLevelId", testGradeLevelId.toString())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))));
        }

        @Test
        @DisplayName("Admin from Tenant1 should NOT access Tenant2's learners")
        void shouldEnforceTenantIsolation() throws Exception {
            Learner learner2 = learnerRepository.save(Learner.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .firstName("Bob")
                    .lastName("Johnson")
                    .learnerNumber("L2024999")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(get("/api/v1/learners/" + learner2.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound());
        }
    }

    // Update Learner Tests
    @Nested
    @DisplayName("Update Learner Tests")
    class UpdateLearnerTests {

        private Learner testLearner;

        @BeforeEach
        void setUpLearner() {
            testLearner = learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("John")
                    .lastName("Doe")
                    .learnerNumber("L2024001")
                    .gradeLevelId(testGradeLevelId)
                    .dateOfBirth(LocalDate.of(2010, 5, 15))
                    .sex("Male")
                    .isActive(true)
                    .build());
        }

        @Test
        @DisplayName("Should update learner successfully")
        void shouldUpdateLearnerSuccessfully() throws Exception {
            UpdateLearnerRequest request = new UpdateLearnerRequest(
                    testSchool.getId(),
                    "John Updated",
                    "Doe Updated",
                    testGradeLevelId,
                    LocalDate.of(2010, 6, 20),
                    "Male",
                    "New Previous School"
            );

            mockMvc.perform(put("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.firstName").value("John Updated"))
                    .andExpect(jsonPath("$.data.lastName").value("Doe Updated"))
                    .andExpect(jsonPath("$.data.learnerNumber").value("L2024001"));
        }

        @Test
        @DisplayName("Should fail to update learner from different tenant")
        void shouldFailToUpdateLearnerFromDifferentTenant() throws Exception {
            Learner learner2 = learnerRepository.save(Learner.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .firstName("Bob")
                    .lastName("Johnson")
                    .learnerNumber("L2024999")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            UpdateLearnerRequest request = new UpdateLearnerRequest(
                    school2.getId(),
                    "Bob Updated",
                    "Johnson Updated",
                    testGradeLevelId,
                    LocalDate.of(2010, 1, 1),
                    "Male",
                    null
            );

            mockMvc.perform(put("/api/v1/learners/" + learner2.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound());
        }
    }

    // Activate/Deactivate Tests
    @Nested
    @DisplayName("Activate/Deactivate Learner Tests")
    class ActivateDeactivateLearnerTests {

        private Learner testLearner;

        @BeforeEach
        void setUpLearner() {
            testLearner = learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("John")
                    .lastName("Doe")
                    .learnerNumber("L2024001")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());
        }

        @Test
        @DisplayName("Should deactivate learner successfully")
        void shouldDeactivateLearnerSuccessfully() throws Exception {
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(false));
        }

        @Test
        @DisplayName("Should activate learner successfully")
        void shouldActivateLearnerSuccessfully() throws Exception {
            testLearner.setIsActive(false);
            learnerRepository.save(testLearner);

            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/activate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }

        @Test
        @DisplayName("Should fail to deactivate learner from different tenant")
        void shouldFailToDeactivateLearnerFromDifferentTenant() throws Exception {
            Learner learner2 = learnerRepository.save(Learner.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .firstName("Bob")
                    .lastName("Johnson")
                    .learnerNumber("L2024999")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(patch("/api/v1/learners/" + learner2.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound());
        }
    }

    // Multi-Tenant Isolation Tests
    @Nested
    @DisplayName("Multi-Tenant Isolation Tests")
    class MultiTenantIsolationTests {

        @Test
        @DisplayName("Tenant1 admin should only see Tenant1 learners")
        void tenant1AdminShouldOnlySeeTenant1Learners() throws Exception {
            learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("Tenant1")
                    .lastName("Learner")
                    .learnerNumber("L1")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            learnerRepository.save(Learner.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .firstName("Tenant2")
                    .lastName("Learner")
                    .learnerNumber("L2")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(get("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].firstName").value("Tenant1"));
        }

        @Test
        @DisplayName("Tenant2 admin should only see Tenant2 learners")
        void tenant2AdminShouldOnlySeeTenant2Learners() throws Exception {
            learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("Tenant1")
                    .lastName("Learner")
                    .learnerNumber("L1")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            learnerRepository.save(Learner.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .firstName("Tenant2")
                    .lastName("Learner")
                    .learnerNumber("L2")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(get("/api/v1/learners")
                            .header("Authorization", "Bearer " + admin2Token))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].firstName").value("Tenant2"));
        }

        @Test
        @DisplayName("Cross-tenant access should be blocked")
        void crossTenantAccessShouldBeBlocked() throws Exception {
            Learner tenant1Learner = learnerRepository.save(Learner.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .firstName("Tenant1")
                    .lastName("Learner")
                    .learnerNumber("L1")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            mockMvc.perform(get("/api/v1/learners/" + tenant1Learner.getId())
                            .header("Authorization", "Bearer " + admin2Token))
                    .andExpect(status().isNotFound());
        }
    }
}
