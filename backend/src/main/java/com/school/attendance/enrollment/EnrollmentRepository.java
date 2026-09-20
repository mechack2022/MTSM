package com.school.attendance.enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    Optional<Enrollment> findByLearnerIdAndAcademicYearIdAndStatus(
            UUID learnerId, UUID academicYearId, EnrollmentStatus status);

    List<Enrollment> findByClassSectionIdAndStatus(UUID classSectionId, EnrollmentStatus status);

    List<Enrollment> findByLearnerIdOrderByEnrollmentDateDesc(UUID learnerId);

    List<Enrollment> findByAcademicYearIdAndStatus(UUID academicYearId, EnrollmentStatus status);
}