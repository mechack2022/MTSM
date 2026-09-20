package com.school.attendance.learner;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.learner.dto.CreateLearnerRequest;
import com.school.attendance.learner.dto.UpdateLearnerRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class LearnerIntegrationTest extends BaseIntegrationTest {

    @Nested
    @DisplayName("POST /api/v1/learners")
    class CreateLearnerTests {

        @Test
        @DisplayName("ADMIN - Should create learner with auto-generated student number")
        void adminShouldCreateLearnerWithAutoNumber() throws Exception {
            String body = """
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "gradeLevelId": "%s",
                    "dateOfBirth": "2015-05-15",
                    "sex": "Male"
                }
                """.formatted(testGradeLevelId);

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.firstName").value("John"))
                    .andExpect(jsonPath("$.data.lastName").value("Doe"))
                    .andExpect(jsonPath("$.data.fullName").value("John Doe"))
                    .andExpect(jsonPath("$.data.studentNumber").isNotEmpty())  // ✅ Auto-generated
                    .andExpect(jsonPath("$.data.gradeLevelId").value(testGradeLevelId.toString()))
                    .andExpect(jsonPath("$.data.gradeLevelDisplayName").value("Grade 1"))
                    .andExpect(jsonPath("$.data.isActive").value(true))
                    .andExpect(jsonPath("$.data.createdAt").isNotEmpty())
                    .andExpect(jsonPath("$.data.createdBy").isNotEmpty());
        }

        @Test
        @DisplayName("ADMIN - Should create learner with manual student number")
        void adminShouldCreateLearnerWithManualNumber() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "Jane", "Smith", "MANUAL-123", testGradeLevelId,
                    LocalDate.of(2016, 3, 20), "Female", null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.studentNumber").value("MANUAL-123"));
        }

        @Test
        @DisplayName("ADMIN - Should create transfer student with previous school name")
        void adminShouldCreateTransferStudent() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "Transfer", "Student", "TRANSFER-001", testGradeLevelId,
                    LocalDate.of(2015, 8, 10), "Male", "Riverside Elementary"
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.previousSchoolName").value("Riverside Elementary"));
        }

        @Test
        @DisplayName("ADMIN - Should return 409 for duplicate student number")
        void adminShouldGet409ForDuplicateStudentNumber() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "Duplicate", "Student", "EXISTING-001", testGradeLevelId,
                    null, null, null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.error.code").value("LEARNER_001"));
        }

        @Test
        @DisplayName("ADMIN - Should return 404 for invalid grade level")
        void adminShouldGet404ForInvalidGradeLevel() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "John", "Doe", null, java.util.UUID.randomUUID(),
                    null, null, null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("CODESET_002"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for missing required fields")
        void adminShouldGet400ForMissingFields() throws Exception {
            String body = """
                {
                    "firstName": "",
                    "lastName": "",
                    "gradeLevelId": null
                }
                """;

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("VALIDATION_001"));
        }

        @Test
        @DisplayName("HEAD_TEACHER - Should create a learner")
        void headTeacherShouldCreateLearner() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "HT", "Student", null, testGradeLevelId, null, null, null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + headTeacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated());
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden (403) from creating learners")
        void teacherShouldBeForbidden() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "T", "Student", null, testGradeLevelId, null, null, null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Unauthenticated - Should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            CreateLearnerRequest request = new CreateLearnerRequest(
                    "U", "Student", null, testGradeLevelId, null, null, null
            );

            mockMvc.perform(post("/api/v1/learners")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/learners")
    class GetAllLearnersTests {

        @Test
        @DisplayName("ADMIN - Should list all active learners")
        void adminShouldListAllLearners() throws Exception {
            mockMvc.perform(get("/api/v1/learners")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))))
                    .andExpect(jsonPath("$.data[0].fullName").isNotEmpty());
        }

        @Test
        @DisplayName("ADMIN - Should filter learners by grade level")
        void adminShouldFilterByGradeLevel() throws Exception {
            mockMvc.perform(get("/api/v1/learners")
                            .param("gradeLevelId", testGradeLevelId.toString())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))))
                    .andExpect(jsonPath("$.data[*].gradeLevelId", everyItem(is(testGradeLevelId.toString()))));
        }

        @Test
        @DisplayName("TEACHER - Should list learners")
        void teacherShouldListLearners() throws Exception {
            mockMvc.perform(get("/api/v1/learners")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Unauthenticated - Should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            mockMvc.perform(get("/api/v1/learners"))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/learners/{id}")
    class GetLearnerByIdTests {

        @Test
        @DisplayName("ADMIN - Should retrieve a specific learner")
        void adminShouldGetLearnerById() throws Exception {
            mockMvc.perform(get("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.firstName").value("Existing"))
                    .andExpect(jsonPath("$.data.lastName").value("Learner"))
                    .andExpect(jsonPath("$.data.studentNumber").value("EXISTING-001"));
        }

        @Test
        @DisplayName("ADMIN - Should return 404 for non-existent learner")
        void adminShouldGet404() throws Exception {
            mockMvc.perform(get("/api/v1/learners/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("LEARNER_002"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for malformed UUID in path")
        void adminShouldGet400ForMalformedPathUUID() throws Exception {
            mockMvc.perform(get("/api/v1/learners/not-a-uuid")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("VALIDATION_003"));
        }
    }

    @Nested
    @DisplayName("PUT /api/v1/learners/{id}")
    class UpdateLearnerTests {

        @Test
        @DisplayName("ADMIN - Should update learner details")
        void adminShouldUpdateLearner() throws Exception {
            UpdateLearnerRequest request = new UpdateLearnerRequest(
                    "Updated", "Name", testGradeLevelId,
                    LocalDate.of(2015, 5, 15), "Female", null
            );

            mockMvc.perform(put("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.firstName").value("Updated"))
                    .andExpect(jsonPath("$.data.lastName").value("Name"))
                    .andExpect(jsonPath("$.data.sex").value("Female"))
                    .andExpect(jsonPath("$.data.studentNumber").value("EXISTING-001")); // ✅ Unchanged
        }

        @Test
        @DisplayName("ADMIN - Should return 400 when updating with invalid grade level")
        void adminShouldGet400ForInvalidGradeLevel() throws Exception {
            UpdateLearnerRequest request = new UpdateLearnerRequest(
                    "Updated", "Name", java.util.UUID.randomUUID(),
                    null, null, null
            );

            mockMvc.perform(put("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("CODESET_002"));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden from updating learners")
        void teacherShouldBeForbidden() throws Exception {
            UpdateLearnerRequest request = new UpdateLearnerRequest(
                    "Updated", "Name", testGradeLevelId, null, null, null
            );

            mockMvc.perform(put("/api/v1/learners/" + testLearner.getId())
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/learners/{id}/deactivate")
    class DeactivateLearnerTests {

        @Test
        @DisplayName("ADMIN - Should deactivate a learner")
        void adminShouldDeactivateLearner() throws Exception {
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(false));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 if already deactivated (Idempotency check)")
        void adminShouldGet400IfAlreadyDeactivated() throws Exception {
            // First deactivate
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk());

            // Try again
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("LEARNER_003"));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden from deactivating learners")
        void teacherShouldBeForbidden() throws Exception {
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/learners/{id}/activate")
    class ActivateLearnerTests {

        @Test
        @DisplayName("ADMIN - Should reactivate a deactivated learner")
        void adminShouldReactivateLearner() throws Exception {
            // First deactivate
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk());

            // Then reactivate
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/activate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 if already active (Idempotency check)")
        void adminShouldGet400IfAlreadyActive() throws Exception {
            mockMvc.perform(patch("/api/v1/learners/" + testLearner.getId() + "/activate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("LEARNER_004"));
        }
    }
}
