package com.school.attendance.attendance.user;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.user.dto.CreateUserRequest;
import com.school.attendance.user.dto.UpdateUserRequest;
import com.school.attendance.user.enums.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserIntegrationTest extends BaseIntegrationTest {

    @Nested
    @DisplayName("POST /api/v1/users")
    class CreateUserTests {

        @Test
        @DisplayName("ADMIN - Should create a new teacher successfully")
        void adminShouldCreateUser() throws Exception {
            CreateUserRequest request = new CreateUserRequest(
                    "new_teacher", "SecurePass123!", "John Smith", UserRole.TEACHER
            );

            mockMvc.perform(post("/api/v1/users")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.status").value(201))
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.username").value("new_teacher"))
                    .andExpect(jsonPath("$.data.role").value("TEACHER"))
                    .andExpect(jsonPath("$.data.isActive").value(true));
        }

        @Test
        @DisplayName("ADMIN - Should return 409 for duplicate username")
        void adminShouldGet409ForDuplicate() throws Exception {
            CreateUserRequest request = new CreateUserRequest(
                    "admin_test", "password", "Duplicate", UserRole.TEACHER
            );

            mockMvc.perform(post("/api/v1/users")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.error.code").value("USER_001"));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden (403) from creating users")
        void teacherShouldBeForbidden() throws Exception {
            CreateUserRequest request = new CreateUserRequest(
                    "new_user", "password", "Name", UserRole.TEACHER
            );

            mockMvc.perform(post("/api/v1/users")
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("HEAD_TEACHER - Should be forbidden (403) from creating users")
        void headTeacherShouldBeForbidden() throws Exception {
            CreateUserRequest request = new CreateUserRequest(
                    "new_user", "password", "Name", UserRole.TEACHER
            );

            mockMvc.perform(post("/api/v1/users")
                            .header("Authorization", "Bearer " + headTeacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Unauthenticated - Should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            CreateUserRequest request = new CreateUserRequest(
                    "new_user", "password", "Name", UserRole.TEACHER
            );

            mockMvc.perform(post("/api/v1/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/users")
    class GetAllUsersTests {

        @Test
        @DisplayName("ADMIN - Should list all users")
        void adminShouldListUsers() throws Exception {
            mockMvc.perform(get("/api/v1/users")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data", hasSize(3)))
                    .andExpect(jsonPath("$.data[*].username", hasItems("admin_test", "head_test", "teacher_test")));
        }

        @Test
        @DisplayName("HEAD_TEACHER - Should list all users")
        void headTeacherShouldListUsers() throws Exception {
            mockMvc.perform(get("/api/v1/users")
                            .header("Authorization", "Bearer " + headTeacherToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(3)));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden from listing users")
        void teacherShouldBeForbidden() throws Exception {
            mockMvc.perform(get("/api/v1/users")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/users/{id}")
    class GetUserByIdTests {

        @Test
        @DisplayName("ADMIN - Should retrieve a specific user")
        void adminShouldGetUser() throws Exception {
            mockMvc.perform(get("/api/v1/users/" + teacherUser.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.username").value("teacher_test"))
                    .andExpect(jsonPath("$.data.role").value("TEACHER"));
        }

        @Test
        @DisplayName("ADMIN - Should return 404 for non-existent user")
        void adminShouldGet404() throws Exception {
            mockMvc.perform(get("/api/v1/users/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("USER_002"));
        }
    }

    @Nested
    @DisplayName("GET /api/v1/users/me")
    class GetCurrentUserTests {

        @Test
        @DisplayName("Any authenticated user - Should retrieve their own profile")
        void anyUserShouldGetOwnProfile() throws Exception {
            mockMvc.perform(get("/api/v1/users/me")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.username").value("teacher_test"))
                    .andExpect(jsonPath("$.data.role").value("TEACHER"));
        }

        @Test
        @DisplayName("Unauthenticated - Should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            mockMvc.perform(get("/api/v1/users/me"))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("PUT /api/v1/users/{id}")
    class UpdateUserTests {

        @Test
        @DisplayName("ADMIN - Should update user's name and role")
        void adminShouldUpdateUser() throws Exception {
            UpdateUserRequest request = new UpdateUserRequest(
                    "Updated Name", UserRole.HEAD_TEACHER, null
            );

            mockMvc.perform(put("/api/v1/users/" + teacherUser.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.fullName").value("Updated Name"))
                    .andExpect(jsonPath("$.data.role").value("HEAD_TEACHER"));
        }

        @Test
        @DisplayName("ADMIN - Should update user's password when provided")
        void adminShouldUpdatePassword() throws Exception {
            UpdateUserRequest request = new UpdateUserRequest(
                    "Test TEACHER", UserRole.TEACHER, "NewPassword123!"
            );

            mockMvc.perform(put("/api/v1/users/" + teacherUser.getId())
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk());

            // Verify the new password works
            loginAndGetToken("teacher_test", "NewPassword123!");
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden from updating users")
        void teacherShouldBeForbidden() throws Exception {
            UpdateUserRequest request = new UpdateUserRequest(
                    "Name", UserRole.TEACHER, null
            );

            mockMvc.perform(put("/api/v1/users/" + headTeacherUser.getId())
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/users/{id}/deactivate")
    class DeactivateUserTests {

        @Test
        @DisplayName("ADMIN - Should deactivate another user")
        void adminShouldDeactivateUser() throws Exception {
            mockMvc.perform(patch("/api/v1/users/" + teacherUser.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isActive").value(false));
        }

        @Test
        @DisplayName("ADMIN - Should not be able to deactivate themselves")
        void adminShouldNotDeactivateSelf() throws Exception {
            mockMvc.perform(patch("/api/v1/users/" + adminUser.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("USER_003"));
        }

        @Test
        @DisplayName("HEAD_TEACHER - Should be forbidden from deactivating users")
        void headTeacherShouldBeForbidden() throws Exception {
            mockMvc.perform(patch("/api/v1/users/" + teacherUser.getId() + "/deactivate")
                            .header("Authorization", "Bearer " + headTeacherToken))
                    .andExpect(status().isForbidden());
        }
    }
}
