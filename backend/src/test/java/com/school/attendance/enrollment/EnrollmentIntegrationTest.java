package com.school.attendance.enrollment;

import com.school.attendance.attendance.BaseIntegrationTest;
import com.school.attendance.classsection.entity.ClassSection;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.enrollment.dto.EnrollLearnerRequest;
import com.school.attendance.learner.entity.Learner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EnrollmentIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    protected ClassSection testClassSection;

    @BeforeEach
    void setUpEnrollmentFixtures() {
        testClassSection = createTestClassSection("Grade 1 - Section A", testAcademicYearId);
    }

    @Nested
    @DisplayName("POST /api/v1/enrollments")
    class EnrollLearnerTests {

        @Test
        @DisplayName("ADMIN - Should enroll a new learner successfully")
        void adminShouldEnrollNewLearner() throws Exception {
            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.learnerId").value(testLearner.getId().toString()))
                    .andExpect(jsonPath("$.data.learnerName").value("Existing Learner"))
                    .andExpect(jsonPath("$.data.studentNumber").value("EXISTING-001"))
                    .andExpect(jsonPath("$.data.classSectionId").value(testClassSection.getId().toString()))
                    .andExpect(jsonPath("$.data.className").value("Grade 1 - Section A"))
                    .andExpect(jsonPath("$.data.academicYearDisplayName").value("2025/2026"))
                    .andExpect(jsonPath("$.data.status").value("ACTIVE"))
                    .andExpect(jsonPath("$.data.enrollmentType").value("NEW"))
                    .andExpect(jsonPath("$.data.createdAt").isNotEmpty());
        }

        @Test
        @DisplayName("ADMIN - Should enroll a transfer student with previous school")
        void adminShouldEnrollTransferStudent() throws Exception {
            // Create a transfer learner
            Learner transferLearner = learnerRepository.save(Learner.builder()
                    .schoolId(testSchool.getId())
                    .firstName("Transfer")
                    .lastName("Student")
                    .studentNumber("TRANSFER-001")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    transferLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.TRANSFER_IN,
                    "Riverside Elementary"
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.enrollmentType").value("TRANSFER_IN"))
                    .andExpect(jsonPath("$.data.previousSchoolName").value("Riverside Elementary"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for TRANSFER_IN without previous school name")
        void adminShouldGet400ForTransferWithoutPreviousSchool() throws Exception {
            Learner transferLearner = learnerRepository.save(Learner.builder()
                    .schoolId(testSchool.getId())
                    .firstName("Transfer")
                    .lastName("Student")
                    .studentNumber("TRANSFER-002")
                    .gradeLevelId(testGradeLevelId)
                    .isActive(true)
                    .build());

            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    transferLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.TRANSFER_IN,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_008"));
        }

        @Test
        @DisplayName("ADMIN - Should return 409 for duplicate active enrollment in same year")
        void adminShouldGet409ForDuplicateEnrollment() throws Exception {
            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            // First enrollment
            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated());

            // Duplicate enrollment
            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isConflict())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_001"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for grade level mismatch")
        void adminShouldGet400ForGradeMismatch() throws Exception {
            // Create a class with a different grade level
            CodeSet gradeLevel2 = codeSetRepository.save(CodeSet.builder()
                    .schoolId(testSchool.getId())
                    .codeSetGroup(CodeSetGroup.GRADE_LEVEL)
                    .code("G2")
                    .displayName("Grade 2")
                    .sortOrder(2)
                    .isActive(true)
                    .build());

            ClassSection mismatchedClass = classSectionRepository.save(ClassSection.builder()
                    .schoolId(testSchool.getId())
                    .name("Grade 2 - Section A")
                    .gradeLevelId(gradeLevel2.getId())  // Different grade
                    .academicYearId(testAcademicYearId)
                    .isActive(true)
                    .build());

            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),              // Grade 1 learner
                    mismatchedClass.getId(),          // Grade 2 class
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_006"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for enrolling deactivated learner")
        void adminShouldGet400ForDeactivatedLearner() throws Exception {
            testLearner.setIsActive(false);
            learnerRepository.save(testLearner);

            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_004"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 for enrolling in deactivated class")
        void adminShouldGet400ForDeactivatedClass() throws Exception {
            testClassSection.setIsActive(false);
            classSectionRepository.save(testClassSection);

            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_005"));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden (403) from enrolling learners")
        void teacherShouldBeForbidden() throws Exception {
            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .header("Authorization", "Bearer " + teacherToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Unauthenticated - Should return 401")
        void unauthenticatedShouldGet401() throws Exception {
            EnrollLearnerRequest request = new EnrollLearnerRequest(
                    testLearner.getId(),
                    testClassSection.getId(),
                    testAcademicYearId,
                    LocalDate.of(2025, 9, 1),
                    EnrollmentType.NEW,
                    null
            );

            mockMvc.perform(post("/api/v1/enrollments")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/enrollments/class/{classSectionId}")
    class GetEnrollmentsByClassTests {

        @Test
        @DisplayName("ADMIN - Should list enrollments for a class")
        void adminShouldListEnrollmentsByClass() throws Exception {
            // Create an enrollment
            enrollmentRepository.save(Enrollment.builder()
                    .learnerId(testLearner.getId())
                    .classSectionId(testClassSection.getId())
                    .academicYearId(testAcademicYearId)
                    .enrollmentDate(LocalDate.of(2025, 9, 1))
                    .status(EnrollmentStatus.ACTIVE)
                    .enrollmentType(EnrollmentType.NEW)
                    .build());

            mockMvc.perform(get("/api/v1/enrollments/class/" + testClassSection.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].className").value("Grade 1 - Section A"));
        }

        @Test
        @DisplayName("TEACHER - Should list enrollments for a class")
        void teacherShouldListEnrollmentsByClass() throws Exception {
            mockMvc.perform(get("/api/v1/enrollments/class/" + testClassSection.getId())
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isOk());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/enrollments/learner/{learnerId}")
    class GetEnrollmentsByLearnerTests {

        @Test
        @DisplayName("ADMIN - Should list enrollments for a learner")
        void adminShouldListEnrollmentsByLearner() throws Exception {
            enrollmentRepository.save(Enrollment.builder()
                    .learnerId(testLearner.getId())
                    .classSectionId(testClassSection.getId())
                    .academicYearId(testAcademicYearId)
                    .enrollmentDate(LocalDate.of(2025, 9, 1))
                    .status(EnrollmentStatus.ACTIVE)
                    .enrollmentType(EnrollmentType.NEW)
                    .build());

            mockMvc.perform(get("/api/v1/enrollments/learner/" + testLearner.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data", hasSize(1)))
                    .andExpect(jsonPath("$.data[0].learnerName").value("Existing Learner"));
        }
    }

    @Nested
    @DisplayName("GET /api/v1/enrollments/{id}")
    class GetEnrollmentByIdTests {

        @Test
        @DisplayName("ADMIN - Should retrieve a specific enrollment")
        void adminShouldGetEnrollmentById() throws Exception {
            var enrollment = enrollmentRepository.save(
                    Enrollment.builder()
                            .learnerId(testLearner.getId())
                            .classSectionId(testClassSection.getId())
                            .academicYearId(testAcademicYearId)
                            .enrollmentDate(LocalDate.of(2025, 9, 1))
                            .status(EnrollmentStatus.ACTIVE)
                            .enrollmentType(EnrollmentType.NEW)
                            .build());

            mockMvc.perform(get("/api/v1/enrollments/" + enrollment.getId())
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.id").value(enrollment.getId().toString()))
                    .andExpect(jsonPath("$.data.status").value("ACTIVE"));
        }

        @Test
        @DisplayName("ADMIN - Should return 404 for non-existent enrollment")
        void adminShouldGet404() throws Exception {
            mockMvc.perform(get("/api/v1/enrollments/00000000-0000-0000-0000-000000000000")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_002"));
        }
    }

    @Nested
    @DisplayName("PATCH /api/v1/enrollments/{id}/withdraw")
    class WithdrawLearnerTests {

        @Test
        @DisplayName("ADMIN - Should withdraw a learner")
        void adminShouldWithdrawLearner() throws Exception {
            var enrollment = enrollmentRepository.save(
                    Enrollment.builder()
                            .learnerId(testLearner.getId())
                            .classSectionId(testClassSection.getId())
                            .academicYearId(testAcademicYearId)
                            .enrollmentDate(LocalDate.of(2025, 9, 1))
                            .status(EnrollmentStatus.ACTIVE)
                            .enrollmentType(EnrollmentType.NEW)
                            .build());

            mockMvc.perform(patch("/api/v1/enrollments/" + enrollment.getId() + "/withdraw")
                            .param("withdrawalDate", "2025-12-15")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.status").value("WITHDRAWN"))
                    .andExpect(jsonPath("$.data.withdrawalDate").value("2025-12-15"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 when withdrawing already withdrawn enrollment")
        void adminShouldGet400ForAlreadyWithdrawn() throws Exception {
            var enrollment = enrollmentRepository.save(
                    Enrollment.builder()
                            .learnerId(testLearner.getId())
                            .classSectionId(testClassSection.getId())
                            .academicYearId(testAcademicYearId)
                            .enrollmentDate(LocalDate.of(2025, 9, 1))
                            .withdrawalDate(LocalDate.of(2025, 10, 1))
                            .status(EnrollmentStatus.WITHDRAWN)
                            .enrollmentType(EnrollmentType.NEW)
                            .build());

            mockMvc.perform(patch("/api/v1/enrollments/" + enrollment.getId() + "/withdraw")
                            .param("withdrawalDate", "2025-12-15")
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_003"));
        }

        @Test
        @DisplayName("ADMIN - Should return 400 when withdrawal date is before enrollment date")
        void adminShouldGet400ForInvalidWithdrawalDate() throws Exception {
            var enrollment = enrollmentRepository.save(
                   Enrollment.builder()
                            .learnerId(testLearner.getId())
                            .classSectionId(testClassSection.getId())
                            .academicYearId(testAcademicYearId)
                            .enrollmentDate(LocalDate.of(2025, 9, 1))
                            .status(EnrollmentStatus.ACTIVE)
                            .enrollmentType(EnrollmentType.NEW)
                            .build());

            mockMvc.perform(patch("/api/v1/enrollments/" + enrollment.getId() + "/withdraw")
                            .param("withdrawalDate", "2025-01-01")  // Before enrollment
                            .header("Authorization", "Bearer " + adminToken))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error.code").value("ENROLLMENT_007"));
        }

        @Test
        @DisplayName("TEACHER - Should be forbidden from withdrawing learners")
        void teacherShouldBeForbidden() throws Exception {
            var enrollment = enrollmentRepository.save(
                    Enrollment.builder()
                            .learnerId(testLearner.getId())
                            .classSectionId(testClassSection.getId())
                            .academicYearId(testAcademicYearId)
                            .enrollmentDate(LocalDate.of(2025, 9, 1))
                            .status(EnrollmentStatus.ACTIVE)
                            .enrollmentType(EnrollmentType.NEW)
                            .build());

            mockMvc.perform(patch("/api/v1/enrollments/" + enrollment.getId() + "/withdraw")
                            .param("withdrawalDate", "2025-12-15")
                            .header("Authorization", "Bearer " + teacherToken))
                    .andExpect(status().isForbidden());
        }
    }
}
