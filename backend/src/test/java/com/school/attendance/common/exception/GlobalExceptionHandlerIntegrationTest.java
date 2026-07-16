package com.school.attendance.common.exception;
import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.classsection.dto.ClassSectionRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class GlobalExceptionHandlerIntegrationTest extends BaseIntegrationTest {

    @Nested
    @DisplayName("Exception Handler Coverage")
    class ExceptionHandlerTests {

        @Test
        @DisplayName("Should handle malformed JSON body with 400 VALIDATION_002")
        void shouldHandleMalformedJson() throws Exception {
            String malformedJson = "{ invalid json }";

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(malformedJson))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.error.code").value("VALIDATION_002"))
                    .andExpect(jsonPath("$.path").value("/api/v1/classes"));
        }

        @Test
        @DisplayName("Should handle malformed UUID in request body with 400 VALIDATION_002")
        void shouldHandleMalformedUUIDInBody() throws Exception {
            // This JSON string is intentionally malformed to trigger Jackson deserialization errors
            String body = """
                {
                    "name": "Grade 1",
                    "gradeLevelId": "not-a-uuid",
                    "academicYearId": "not-a-uuid",
                    "classTeacherId": "not-a-uuid",
                    "capacity": 30
                }
                """;

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("VALIDATION_002"));
        }

        @Test
        @DisplayName("Should handle malformed UUID in path variable with 400 VALIDATION_003")
        void shouldHandleMalformedUUIDInPath() throws Exception {
            mockMvc.perform(get("/api/v1/classes/not-a-uuid")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("VALIDATION_003"))
                    .andExpect(jsonPath("$.error.details").value(containsString("id")));
        }

        @Test
        @DisplayName("Should handle non-existent teacher ID with 400 CLASS_003")
        void shouldHandleNonExistentTeacher() throws Exception {
            // ✅ FIXED: Use the seeded UUIDs from BaseIntegrationTest instead of Strings
            ClassSectionRequest request = new ClassSectionRequest(
                    "Grade 1",
                    testGradeLevelId,
                    testAcademicYearId,
                    UUID.randomUUID(),
                    30
            );

            mockMvc.perform(post("/api/v1/classes")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("CLASS_003"))
                    .andExpect(jsonPath("$.error.details").value(containsString("teacher")));
        }

        @Test
        @DisplayName("Should handle non-existent user with 404 USER_002")
        void shouldHandleNonExistentUser() throws Exception {
            mockMvc.perform(get("/api/v1/users/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("USER_002"));
        }

        @Test
        @DisplayName("Should handle duplicate username with 409 USER_001")
        void shouldHandleDuplicateUsername() throws Exception {
            String body = """
                {
                    "username": "admin_test",
                    "password": "password123",
                    "fullName": "Duplicate",
                    "role": "TEACHER"
                }
                """;

            mockMvc.perform(post("/api/v1/users")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.error.code").value("USER_001"));
        }

        @Test
        @DisplayName("Should return standardized envelope for all errors")
        void shouldReturnStandardizedEnvelope() throws Exception {
            mockMvc.perform(get("/api/v1/users/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.status").value(404))
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.message").isNotEmpty())
                    .andExpect(jsonPath("$.data").doesNotExist())
                    .andExpect(jsonPath("$.error").isNotEmpty())
                    .andExpect(jsonPath("$.error.code").isNotEmpty())
                    .andExpect(jsonPath("$.error.details").isNotEmpty())
                    .andExpect(jsonPath("$.timestamp").isNotEmpty())
                    .andExpect(jsonPath("$.path").isNotEmpty());
        }
    }
}