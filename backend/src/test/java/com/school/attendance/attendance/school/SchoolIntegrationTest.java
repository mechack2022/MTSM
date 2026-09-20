//package com.school.attendance.attendance.school;
//
//import com.school.attendance.attendance.BaseIntegrationTest;
//import com.school.attendance.school.dto.SchoolRequest;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Nested;
//import org.junit.jupiter.api.Test;
//import org.springframework.http.MediaType;
//
//import java.util.UUID;
//
//import static org.hamcrest.Matchers.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//class SchoolIntegrationTest extends BaseIntegrationTest {
//
//    @Nested
//    @DisplayName("GET /api/v1/school")
//    class GetSchoolTests {
//
//        @Test
//        @DisplayName("ADMIN - Should retrieve the school profile")
//        void adminShouldGetSchool() throws Exception {
//            mockMvc.perform(get("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.success").value(true))
//                    .andExpect(jsonPath("$.data.name").value("Test School"))
//                    .andExpect(jsonPath("$.data.code").value(startsWith("TEST-SCHOOL")))
//                    .andExpect(jsonPath("$.data.id").isNotEmpty())
//                    .andExpect(jsonPath("$.error").doesNotExist());
//        }
//
//        @Test
//        @DisplayName("HEAD_TEACHER - Should retrieve the school profile")
//        void headTeacherShouldGetSchool() throws Exception {
//            mockMvc.perform(get("/api/v1/school")
//                            .header("Authorization", "Bearer " + headTeacherToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.name").value("Test School"));
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should retrieve the school profile")
//        void teacherShouldGetSchool() throws Exception {
//            mockMvc.perform(get("/api/v1/school")
//                            .header("Authorization", "Bearer " + teacherToken))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.name").value("Test School"));
//        }
//
//        @Test
//        @DisplayName("Unauthenticated - Should return 401")
//        void unauthenticatedShouldGet401() throws Exception {
//            mockMvc.perform(get("/api/v1/school"))
//                    .andExpect(status().isUnauthorized());
//        }
//    }
//
//    @Nested
//    @DisplayName("PUT /api/v1/school")
//    class UpdateSchoolTests {
//
//        @Test
//        @DisplayName("ADMIN - Should update school profile successfully with UUID references")
//        void adminShouldUpdateSchool() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "Updated School Name",
//                    "UPDATED-CODE",
//                    "456 New Avenue",
//                    testAcademicYearId,
//                    testAcademicTermId,
//                    "+987654321",
//                    "updated@school.edu",
//                    "https://example.com/new-logo.png"
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.success").value(true))
//                    .andExpect(jsonPath("$.data.name").value("Updated School Name"))
//                    .andExpect(jsonPath("$.data.code").value("UPDATED-CODE"))
//                    .andExpect(jsonPath("$.data.academicYearId").value(testAcademicYearId.toString()))
//                    .andExpect(jsonPath("$.data.academicYearDisplayName").value("2025/2026")) // ✅ New field
//                    .andExpect(jsonPath("$.data.currentTermId").value(testAcademicTermId.toString()))
//                    .andExpect(jsonPath("$.data.currentTermDisplayName").value("Term 1"))     // ✅ New field
//                    .andExpect(jsonPath("$.data.phone").value("+987654321"))
//                    .andExpect(jsonPath("$.data.email").value("updated@school.edu"))
//                    .andExpect(jsonPath("$.data.logoUrl").value("https://example.com/new-logo.png"))
//                    .andExpect(jsonPath("$.data.createdAt").isNotEmpty()) // ✅ Audit fields
//                    .andExpect(jsonPath("$.data.updatedAt").isNotEmpty());
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should update only provided fields (others remain null)")
//        void adminShouldUpdatePartialFields() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "Updated School Name",
//                    "UPDATED-CODE-2",
//                    null,
//                    null, // academicYearId
//                    null, // currentTermId
//                    null,
//                    null,
//                    null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.data.name").value("Updated School Name"))
//                    .andExpect(jsonPath("$.data.academicYearId").doesNotExist());
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for invalid email format")
//        void adminShouldGet400ForInvalidEmail() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "School", "CODE", null, null, null, null, "not-an-email", null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.success").value(false))
//                    .andExpect(jsonPath("$.error.code").value("VALIDATION_001"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 400 for missing required name")
//        void adminShouldGet400ForMissingName() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "", "CODE", null, null, null, null, null, null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isBadRequest())
//                    .andExpect(jsonPath("$.error.code").value("VALIDATION_001"));
//        }
//
//        @Test
//        @DisplayName("ADMIN - Should return 404 for invalid academicYearId")
//        void adminShouldGet404ForInvalidAcademicYearId() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "School", "CODE", null,
//                    UUID.randomUUID(),
//                    null, null, null, null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + adminToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isNotFound()) // ✅ Changed from isBadRequest() to isNotFound()
//                    .andExpect(jsonPath("$.error.code").value("CODESET_002"));
//        }
//
//        @Test
//        @DisplayName("HEAD_TEACHER - Should be forbidden (403) from updating school")
//        void headTeacherShouldBeForbidden() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "Hacked Name", "HACKED", null, null, null, null, null, null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + headTeacherToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isForbidden());
//        }
//
//        @Test
//        @DisplayName("TEACHER - Should be forbidden (403) from updating school")
//        void teacherShouldBeForbidden() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "Hacked Name", "HACKED", null, null, null, null, null, null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .header("Authorization", "Bearer " + teacherToken)
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isForbidden());
//        }
//
//        @Test
//        @DisplayName("Unauthenticated - Should return 401")
//        void unauthenticatedShouldGet401() throws Exception {
//            SchoolRequest request = new SchoolRequest(
//                    "Name", "CODE", null, null, null, null, null, null
//            );
//
//            mockMvc.perform(put("/api/v1/school")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(request)))
//                    .andExpect(status().isUnauthorized());
//        }
//    }
//}