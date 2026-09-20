package com.school.attendance.learner.repository;

import com.school.attendance.learner.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, UUID> {

   boolean existsBySchoolIdAndLearnerNumber(UUID schoolId, String learnerNumber);
    Optional<Learner> findBySchoolIdAndLearnerNumber(UUID schoolId, String studentNumber);

    List<Learner> findBySchoolIdAndIsActiveTrueOrderByLastNameAscFirstNameAsc(UUID schoolId);

    List<Learner> findBySchoolIdAndGradeLevelIdAndIsActiveTrue(UUID schoolId, UUID gradeLevelId);

}
