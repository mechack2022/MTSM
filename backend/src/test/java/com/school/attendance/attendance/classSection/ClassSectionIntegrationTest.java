package com.school.attendance.attendance.classSection;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.classsection.ClassSectionRepository;
import com.school.attendance.classsection.dto.ClassSectionRequest;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
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
import com.school.attendance.user.entity.AppUserSchool;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("ClassSection Multi-Tenant Integration Tests")
class ClassSectionIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private ClassSectionRepository classSectionRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    @Autowired
    private AppUserSchoolRepository appUserSchoolRepository;

    // Second tenant for cross-tenant tests
    private Tenant tenant2;
    private School school2;
    private AppUser admin2User;
    private String admin2Token;

    // Additional user types
    private Role schoolAdminRole;
    private Role teacherRole;
    private AppUser schoolAdminUser;
    private AppUser teacherUser;
    private String schoolAdminToken;
    private String teacherToken;

    @BeforeEach
    void setUp() throws Exception {
        classSectionRepository.deleteAll();
        appUserSchoolRepository.deleteAll();
        rolePermissionRepository.deleteAll();
        permissionRepository.deleteAll();

        // Create permissions for CLASS operations
        Permission classCreate = permissionRepository.save(Permission.builder()
                .code("CLASS_CREATE")
                .displayName("Create Class")
                .category("CLASS")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        Permission classRead = permissionRepository.save(Permission.builder()
                .code("CLASS_READ")
                .displayName("View Classes")
                .category("CLASS")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        Permission classUpdate = permissionRepository.save(Permission.builder()
                .code("CLASS_UPDATE")
                .displayName("Update Class")
                .category("CLASS")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        Permission classDeactivate = permissionRepository.save(Permission.builder()
                .code("CLASS_DEACTIVATE")
                .displayName("Deactivate Class")
                .category("CLASS")
                .resourceScope(ResourceScope.SCHOOL)
                .build());

        // Assign permissions to admin role (from BaseIntegrationTest)
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(adminRole.getId())
                .permissionId(classCreate.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(adminRole.getId())
                .permissionId(classRead.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(adminRole.getId())
                .permissionId(classUpdate.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(adminRole.getId())
                .permissionId(classDeactivate.getId())
                .build());

        // Create SCHOOL_ADMIN role with permissions
        schoolAdminRole = roleRepository.save(Role.builder()
                .code("SCHOOL_ADMIN")
                .displayName("School Administrator")
                .accessScope(AccessScope.ASSIGNED_SCHOOLS)
                .isSystemRole(true)
                .build());

        rolePermissionRepository.save(RolePermission.builder()
                .roleId(schoolAdminRole.getId())
                .permissionId(classCreate.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(schoolAdminRole.getId())
                .permissionId(classRead.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(schoolAdminRole.getId())
                .permissionId(classUpdate.getId())
                .build());
        rolePermissionRepository.save(RolePermission.builder()
                .roleId(schoolAdminRole.getId())
                .permissionId(classDeactivate.getId())
                .build());

        // Create TEACHER role with READ permission only
        teacherRole = roleRepository.save(Role.builder()
                .code("TEACHER")
                .displayName("Teacher")
                .accessScope(AccessScope.ASSIGNED_SCHOOLS)
                .isSystemRole(true)
                .build());

        rolePermissionRepository.save(RolePermission.builder()
                .roleId(teacherRole.getId())
                .permissionId(classRead.getId())
                .build());

        // Create school admin user
        schoolAdminUser = createTestUser("school_admin", "password", schoolAdminRole.getId(), testTenant.getId());
        appUserSchoolRepository.save(AppUserSchool.builder()
                .appUserId(schoolAdminUser.getId())
                .schoolId(testSchool.getId())
                .assignedBy(adminUser.getId())
                .build());
        schoolAdminToken = loginAndGetToken("school_admin", "password");

        // Create teacher user
        teacherUser = createTestUser("teacher", "password", teacherRole.getId(), testTenant.getId());
        appUserSchoolRepository.save(AppUserSchool.builder()
                .appUserId(teacherUser.getId())
                .schoolId(testSchool.getId())
                .assignedBy(adminUser.getId())
                .build());
        teacherToken = loginAndGetToken("teacher", "password");

        // Create second tenant for cross-tenant tests
        tenant2 = tenantRepository.save(Tenant.builder()
                .name("Second Tenant")
                .code("TEST02")
                .contactEmail("tenant2@test.com")
                .isActive(true)
                .build());

        school2 = schoolRepository.save(School.builder()
                .tenantId(tenant2.getId())
                .name("Second School")
                .code("TEST-SCHOOL-2")
                .address("Test Address 2")
                .build());

        admin2User = createTestUser("admin2", "password", adminRole.getId(), tenant2.getId());
        admin2Token = loginAndGetToken("admin2", "password");
    }

    @Nested
    @DisplayName("POST /api/v1/classes - Create ClassSection")
    class CreateClassTests {

        @Test
        @DisplayName("✅ TENANT_ADMIN should create class successfully with schoolId")
        void tenantAdminShouldCreateClass() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Grade 1 - Section A",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.status").value(201))
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.tenantId").value(testTenant.getId().toString()))
                    .andExpect(jsonPath("$.data.schoolId").value(testSchool.getId().toString()))
                    .andExpect(jsonPath("$.data.name").value("Grade 1 - Section A"))
                    .andExpect(jsonPath("$.data.gradeLevelId").value(testGradeLevelId.toString()))
                    .andExpect(jsonPath("$.data.gradeLevelDisplayName").value("Grade 1"))
                    .andExpect(jsonPath("$.data.academicYearId").value(testAcademicYearId.toString()))
                    .andExpect(jsonPath("$.data.academicYearDisplayName").value("2025/2026"))
                    .andExpect(jsonPath("$.data.capacity").value(30))
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }

        @Test
        @DisplayName("✅ SCHOOL_ADMIN should create class in assigned school")
        void schoolAdminShouldCreateClass() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Grade 2 - Section B",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    25
            );

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + schoolAdminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.name").value("Grade 2 - Section B"))
                    .andExpect(jsonPath("$.data.tenantId").value(testTenant.getId().toString()));
        }

        @Test
        @DisplayName("❌ Should return 400 when schoolId is missing")
        void shouldFailWhenSchoolIdMissing() throws Exception {
            String malformedJson = """
                {
                    "name": "Grade 1",
                    "gradeLevelId": "%s",
                    "academicYearId": "%s",
                    "capacity": 30
                }
                """.formatted(testGradeLevelId, testAcademicYearId);

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(malformedJson))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("❌ Should return 404 when school doesn't exist")
        void shouldFailWhenSchoolNotFound() throws Exception {
            UUID nonExistentSchoolId = UUID.randomUUID();
            ClassSectionRequest request = new ClassSectionRequest(
                    nonExistentSchoolId,
                    "Grade 1 - A",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("❌ Should return 409 for duplicate class name in same school and academic year")
        void shouldFailForDuplicateClassName() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Duplicate Class",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            // Create first
            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated());

            // Try duplicate
            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isConflict());
        }

        @Test
        @DisplayName("❌ TEACHER should be forbidden (403) from creating classes")
        void teacherShouldBeForbidden() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Grade 1",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("❌ Unauthenticated request should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Grade 1",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            mockMvc.perform(post("/api/v1/classes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("Multi-Tenant Isolation Tests")
    class MultiTenantIsolationTests {

        @Test
        @DisplayName("❌ Admin from Tenant1 should NOT access Tenant2's classes")
        void shouldEnforceTenantIsolation() throws Exception {
            // Create class in tenant2
            ClassSection class2 = classSectionRepository.save(ClassSection.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .name("Tenant 2 Class")
                    .gradeLevelId(testGradeLevelId)
                    .academicYearId(testAcademicYearId)
                    .capacity(30)
                    .isActive(true)
                    .build());

            // Try to access with tenant1 admin token
            mockMvc.perform(get("/api/v1/classes/" + class2.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound()); // Returns 404 to not leak existence
        }

        @Test
        @DisplayName("✅ Each tenant should only see their own classes")
        void eachTenantShouldSeeOnlyTheirClasses() throws Exception {
            // Create class in tenant 1
            classSectionRepository.save(ClassSection.builder()
                    .tenantId(testTenant.getId())
                    .schoolId(testSchool.getId())
                    .name("Tenant 1 Class")
                    .gradeLevelId(testGradeLevelId)
                    .academicYearId(testAcademicYearId)
                    .capacity(30)
                    .isActive(true)
                    .build());

            // Create class in tenant 2
            classSectionRepository.save(ClassSection.builder()
                    .tenantId(tenant2.getId())
                    .schoolId(school2.getId())
                    .name("Tenant 2 Class")
                    .gradeLevelId(testGradeLevelId)
                    .academicYearId(testAcademicYearId)
                    .capacity(30)
                    .isActive(true)
                    .build());

            // Tenant 1 admin should see only 1 class
            mockMvc.perform(get("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].name").value("Tenant 1 Class"));

            // Tenant 2 admin should see only 1 class
            mockMvc.perform(get("/api/v1/classes")
                            .header("Authorization", "Bearer " + admin2Token))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].name").value("Tenant 2 Class"));
        }

        @Test
        @DisplayName("❌ Cannot create class in another tenant's school")
        void cannotCreateClassInAnotherTenantsSchool() throws Exception {
            ClassSectionRequest request = new ClassSectionRequest(
                    school2.getId(), // Tenant 2's school
                    "Unauthorized Class",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            // Use tenant1 admin token
            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/classes - List Classes")
    class GetAllClassesTests {

        @Test
        @DisplayName("✅ Should list all active classes for tenant")
        void shouldListAllClasses() throws Exception {
            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
            createTestClass("Grade 1 - B", testAcademicYearId, testGradeLevelId);
            createTestClass("Grade 2 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data", hasSize(3)));
        }

        @Test
        @DisplayName("✅ Should filter classes by schoolId")
        void shouldFilterBySchool() throws Exception {
            createTestClass("School 1 Class", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes")
                            .param("schoolId", testSchool.getId().toString())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].schoolId").value(testSchool.getId().toString()));
        }

        @Test
        @DisplayName("✅ Should filter classes by academic year")
        void shouldFilterByAcademicYear() throws Exception {
            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
            createTestClass("Grade 1 - B", testAcademicYearId, testGradeLevelId);

            CodeSet academicYear2 = codeSetRepository.save(CodeSet.builder()
                    .tenantId(testTenant.getId())
                    .codeSetGroup(CodeSetGroup.ACADEMIC_YEAR)
                    .code("2025")
                    .displayName("2024/2025")
                    .sortOrder(2)
                    .isActive(true)
                    .build());
            createTestClass("Grade 2 - A", academicYear2.getId(), testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes")
                            .param("academicYearId", testAcademicYearId.toString())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(2)))
                    .andExpect(jsonPath("$.data[*].academicYearId", everyItem(is(testAcademicYearId.toString()))));
        }

        @Test
        @DisplayName("✅ Should filter by grade level")
        void shouldFilterByGradeLevel() throws Exception {
            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes")
                            .param("gradeLevelId", testGradeLevelId.toString())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].gradeLevelId").value(testGradeLevelId.toString()));
        }

        @Test
        @DisplayName("✅ TEACHER can list classes (read-only)")
        void teacherCanListClasses() throws Exception {
            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)));
        }
    }

    @Nested
    @DisplayName("GET /api/v1/classes/{id} - Get by ID")
    class GetClassByIdTests {

        @Test
        @DisplayName("✅ Should retrieve a specific class")
        void shouldGetClassById() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(get("/api/v1/classes/" + classSection.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.name").value("Grade 1 - A"))
                    .andExpect(jsonPath("$.data.id").value(classSection.getId().toString()))
                    .andExpect(jsonPath("$.data.tenantId").value(testTenant.getId().toString()));
        }

        @Test
        @DisplayName("❌ Should return 404 for non-existent class")
        void shouldGet404() throws Exception {
            mockMvc.perform(get("/api/v1/classes/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("PUT /api/v1/classes/{id} - Update")
    class UpdateClassTests {

        @Test
        @DisplayName("✅ Should update class successfully")
        void shouldUpdateClass() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Grade 1 - Section A (Updated)",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    35
            );

            mockMvc.perform(put("/api/v1/classes/" + classSection.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.name").value("Grade 1 - Section A (Updated)"))
                    .andExpect(jsonPath("$.data.capacity").value(35));
        }

        @Test
        @DisplayName("❌ TEACHER should be forbidden from updating classes")
        void teacherShouldBeForbidden() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            ClassSectionRequest request = new ClassSectionRequest(
                    testSchool.getId(),
                    "Updated",
                    testGradeLevelId,
                    testAcademicYearId,
                    null,
                    30
            );

            mockMvc.perform(put("/api/v1/classes/" + classSection.getId())
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/classes/{id}/deactivate - Deactivate")
    class DeactivateClassTests {

        @Test
        @DisplayName("✅ Should deactivate a class")
        void shouldDeactivateClass() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(false));
        }

        @Test
        @DisplayName("❌ TEACHER should be forbidden from deactivating classes")
        void teacherShouldBeForbidden() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);

            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/classes/{id}/activate - Activate")
    class ActivateClassTests {

        @Test
        @DisplayName("✅ Should reactivate a deactivated class")
        void shouldReactivateClass() throws Exception {
            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
            classSection.setIsActive(false);
            classSectionRepository.save(classSection);

            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/activate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }
    }

    private ClassSection createTestClass(String name, UUID academicYearId, UUID gradeLevelId) {
        return classSectionRepository.save(ClassSection.builder()
                .tenantId(testTenant.getId())
                .schoolId(testSchool.getId())
                .name(name)
                .gradeLevelId(gradeLevelId)
                .academicYearId(academicYearId)
                .capacity(30)
                .isActive(true)
                .build());
    }
}
