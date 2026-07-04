package com.school.attendance.school;
import com.school.attendance.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID> {
    boolean existsByCode(String code);

    Optional<School> findFirstByOrderByIdAsc();
}