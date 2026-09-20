//package com.school.attendance.attendance.classSection;
//
//import com.school.attendance.attendance.BaseIntegrationTest;
//import com.school.attendance.classsection.ClassSectionRepository;
//import com.school.attendance.classsection.dto.ClassSectionRequest;
//import com.school.attendance.classsection.entity.ClassSection;
//import com.school.attendance.common.entity.CodeSet;
//import com.school.attendance.common.enums.CodeSetGroup;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Nested;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//
//import java.util.UUID;
//
//import static org.hamcrest.Matchers.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//class ClassSectionIntegrationTest extends BaseIntegrationTest {
//
//    @Autowired
//    private ClassSectionRepository classSectionRepository;
//
//    @Nested
//    @DisplayName("POST /api/v1/classes")
//    class CreateClassTests {
//
//        @Test
//        @DisplayName("ADMIN - Should create a class successfully")
//        void adminShouldCreateClass() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1 - Section A",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    teacherUser.getId(),
//                    30
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isCreated())
//                    .andExpect(jsonPath("$.status").value(201))
//                    .andExpect(jsonPath("$.success").value(true))
//                    .andExpect(jsonPath("$.data.name").value("Grade 1 - Section A"))
//                    .andExpect(jsonPath("$.data.gradeLevelId").value(testGradeLevelId.toString()))
//                    .andExpect(jsonPath("$.data.gradeLevelDisplayName").value("Grade 1"))
//                    .andExpect(jsonPath("$.data.academicYearId").value(testAcademicYearId.toString()))
//                    .andExpect(jsonPath("$.data.academicYearDisplayName").value("2025/2026"))
//                    .andExpect(jsonPath("$.data.classTeacherId").value(teacherUser.getId().toString()))
//                    .andExpect(jsonPath("$.data.classTeacherName").value(teacherUser.getFullName()))
//                    .andExpect(jsonPath("$.data.capacity").value(30))
//                    .andExpect(jsonPath("$.data.isActive").value(true));
//        }
//
//        @Test
//        @DisplayName("HEAD_TEACHER - Should create a class successfully")
//        void headTeacherShouldCreateClass() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 2 - Section B",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    null,
//                    25
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + headTeacherToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isCreated())
//                    .andExpect(jsonPath("$.data.name").value("Grade 2 - Section B"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 409 for duplicate class name in same academic year")
//        void adminShouldGet409ForDuplicate() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Duplicate Class",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    null,
//                    30
//            );
//
//            // Create first
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isCreated());
//
//            // Try duplicate
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isConflict())
//                    .andExpect(jsonPath("$.error.code").value("CLASS_001"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should allow same class name in different academic year")
//        void adminShouldAllowSameNameDifferentYear() throws Exception {
//            // Create a second academic year for this test
//            CodeSet academicYear2 = codeSetRepository.save(CodeSet.builder()
//                    .schoolId(testSchool.getId())
//                    .codeSetGroup(CodeSetGroup.ACADEMIC_YEAR)
//                    .code("2025")
//                    .displayName("2024/2025")
//                    .sortOrder(2)
//                    .isActive(true)
//                    .build());
//
//            ClassSectionRequest requestYear1 = new ClassSectionRequest(
//                    "Grade 1 - Section A",
//                    testGradeLevelId,
//                    academicYear2.getId(),
//                    null,
//                    30
//            );
//
//            ClassSectionRequest requestYear2 = new ClassSectionRequest(
//                    "Grade 1 - Section A",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    null,
//                    30
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(requestYear1)))
//                    .andExpect(status().isCreated());
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(requestYear2)))
//                    .andExpect(status().isCreated());
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for non-existent teacher ID")
//        void adminShouldGet400ForInvalidTeacher() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1 - Section A",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    UUID.randomUUID(), // Non-existent teacher
//                    30
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("CLASS_003"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for malformed UUID")
//        void adminShouldGet400ForMalformedUUID() throws Exception {
//            String malformedJson = """
//                {
//                    "name": "Grade 1",
//                    "gradeLevelId": "not-a-uuid",
//                    "academicYearId": "not-a-uuid",
//                    "classTeacherId": "not-a-uuid",
//                    "capacity": 30
//                }
//                """;
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(malformedJson))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("VALIDATION_002"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for missing required fields")
//        void adminShouldGet400ForMissingFields() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "", null, null, null, null
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("VALIDATION_001"));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should be forbidden (403) from creating classes")
//        void teacherShouldBeForbidden() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1", testGradeLevelId, testAcademicYearId, null, 30
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .header("Authorization", "Bearer " + teacherToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isForbidden());
//        }
//
//        @Test
//        @DisplayName("Unauthenticated - Should return 401")
//        void unauthenticatedShouldGet401() throws Exception {
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1", testGradeLevelId, testAcademicYearId, null, 30
//            );
//
//            mockMvc.perform(post("/api/v1/classes")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isUnauthorized());
//        }
//    }
//
//    @Nested
//    @DisplayName("GET /api/v1/classes")
//    class GetAllClassesTests {
//
//        @Test
//        @DisplayName("ADMIN - Should list all active classes")
//        void adminShouldListAllClasses() throws Exception {
//            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//            createTestClass("Grade 1 - B", testAcademicYearId, testGradeLevelId);
//            createTestClass("Grade 2 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(get("/api/v1/classes")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.success").value(true))
//                    .andExpect(jsonPath("$.data", hasSize(3)));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should filter classes by academic year")
//        void adminShouldFilterByAcademicYear() throws Exception {
//            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//            createTestClass("Grade 1 - B", testAcademicYearId, testGradeLevelId);
//
//            CodeSet academicYear2 = codeSetRepository.save(CodeSet.builder()
//                    .schoolId(testSchool.getId())
//                    .codeSetGroup(CodeSetGroup.ACADEMIC_YEAR)
//                    .code("2025")
//                    .displayName("2024/2025")
//                    .sortOrder(2)
//                    .isActive(true)
//                    .build());
//            createTestClass("Grade 2 - A", academicYear2.getId(), testGradeLevelId);
//
//            mockMvc.perform(get("/api/v1/classes")
//                            .param("academicYearId", testAcademicYearId.toString()) // ✅ Updated param name
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data", hasSize(2)))
//                    .andExpect(jsonPath("$.data[*].academicYearId", everyItem(is(testAcademicYearId.toString()))));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should list classes")
//        void teacherShouldListClasses() throws Exception {
//            createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(get("/api/v1/classes")
//                            .header("Authorization", "Bearer " + teacherToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data", hasSize(1)));
//        }
//    }
//
//    @Nested
//    @DisplayName("GET /api/v1/classes/{id}")
//    class GetClassByIdTests {
//
//        @Test
//        @DisplayName("ADMIN - Should retrieve a specific class")
//        void adminShouldGetClassById() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(get("/api/v1/classes/" + classSection.getId())
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.name").value("Grade 1 - A"))
//                    .andExpect(jsonPath("$.data.id").value(classSection.getId().toString()));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 404 for non-existent class")
//        void adminShouldGet404() throws Exception {
//            mockMvc.perform(get("/api/v1/classes/00000000-0000-0000-0000-000000000000")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isNotFound())
//                    .andExpect(jsonPath("$.error.code").value("CLASS_002"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for malformed UUID in path")
//        void adminShouldGet400ForMalformedPathUUID() throws Exception {
//            mockMvc.perform(get("/api/v1/classes/not-a-uuid")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("VALIDATION_003"));
//        }
//    }
//
//    @Nested
//    @DisplayName("PUT /api/v1/classes/{id}")
//    class UpdateClassTests {
//
//        @Test
//        @DisplayName("ADMIN - Should update class successfully")
//        void adminShouldUpdateClass() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1 - Section A (Updated)",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    teacherUser.getId(),
//                    35
//            );
//
//            mockMvc.perform(put("/api/v1/classes/" + classSection.getId())
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.name").value("Grade 1 - Section A (Updated)"))
//                    .andExpect(jsonPath("$.data.capacity").value(35))
//                    .andExpect(jsonPath("$.data.classTeacherName").value(teacherUser.getFullName()));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 when updating with invalid teacher ID")
//        void adminShouldGet400ForInvalidTeacherOnUpdate() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Grade 1 - A",
//                    testGradeLevelId,
//                    testAcademicYearId,
//                    UUID.randomUUID(), // Non-existent
//                    30
//            );
//
//            mockMvc.perform(put("/api/v1/classes/" + classSection.getId())
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("CLASS_003"));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should be forbidden from updating classes")
//        void teacherShouldBeForbidden() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            ClassSectionRequest request = new ClassSectionRequest(
//                    "Updated", testGradeLevelId, testAcademicYearId, null, 30
//            );
//
//            mockMvc.perform(put("/api/v1/classes/" + classSection.getId())
//                            .header("Authorization", "Bearer " + teacherToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isForbidden());
//        }
//    }
//
//    @Nested
//    @DisplayName("PATCH /api/v1/classes/{id}/deactivate")
//    class DeactivateClassTests {
//
//        @Test
//        @DisplayName("ADMIN - Should deactivate a class")
//        void adminShouldDeactivateClass() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/deactivate")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.isActive").value(false));
//        }
//
//        @Test
//        @DisplayName("HEAD_TEACHER - Should deactivate a class")
//        void headTeacherShouldDeactivateClass() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/deactivate")
//                            .header("Authorization", "Bearer " + headTeacherToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.isActive").value(false));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should be forbidden from deactivating classes")
//        void teacherShouldBeForbidden() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/deactivate")
//                            .header("Authorization", "Bearer " + teacherToken))
//                    .andExpect(status().isForbidden());
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 404 for non-existent class")
//        void adminShouldGet404() throws Exception {
//            mockMvc.perform(patch("/api/v1/classes/00000000-0000-0000-0000-000000000000/deactivate")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isNotFound())
//                    .andExpect(jsonPath("$.error.code").value("CLASS_002"));
//        }
//    }
//
//    @Nested
//    @DisplayName("PATCH /api/v1/classes/{id}/activate")
//    class ActivateClassTests {
//
//        @Test
//        @DisplayName("ADMIN - Should reactivate a deactivated class")
//        void adminShouldReactivateClass() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//            classSection.setIsActive(false);
//            classSectionRepository.save(classSection);
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/activate")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.isActive").value(true));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 if already active (Idempotency check)")
//        void adminShouldGet400IfAlreadyActive() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//            // classSection is already active by default
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/activate")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isBadRequest()) // ✅ Updated to expect 400
//                    .andExpect(jsonPath("$.error.code").value("CLASS_004"));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should be forbidden from activating classes")
//        void teacherShouldBeForbidden() throws Exception {
//            ClassSection classSection = createTestClass("Grade 1 - A", testAcademicYearId, testGradeLevelId);
//
//            mockMvc.perform(patch("/api/v1/classes/" + classSection.getId() + "/activate")
//                            .header("Authorization", "Bearer " + teacherToken))
//                    .andExpect(status().isForbidden());
//        }
//    }
//
//
//    private ClassSection createTestClass(String name, UUID academicYearId, UUID gradeLevelId) {
//        return classSectionRepository.save(ClassSection.builder()
//                .schoolId(testSchool.getId())
//                .name(name)
//                .gradeLevelId(gradeLevelId)
//                .academicYearId(academicYearId)
//                .capacity(30)
//                .isActive(true)
//                .build());
//    }
//}