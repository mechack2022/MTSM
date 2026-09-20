package com.school.attendance.learner.repository;

import com.school.attendance.learner.entity.LearnerIdSequence;
import com.school.attendance.learner.entity.LearnerIdSequenceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface LearnerIdSequenceRepository extends JpaRepository<LearnerIdSequence, LearnerIdSequenceId> {

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO learner_id_sequence (school_id, year, current_value)
        VALUES (:schoolId, :year, 1)
        ON CONFLICT (school_id, year)
        DO UPDATE SET current_value = learner_id_sequence.current_value + 1
        RETURNING current_value
        """, nativeQuery = true)
    Long upsertAndIncrement(@Param("schoolId") UUID schoolId, @Param("year") int year);
}