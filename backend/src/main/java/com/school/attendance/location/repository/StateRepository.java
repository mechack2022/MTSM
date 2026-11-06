package com.school.attendance.location.repository;

import com.school.attendance.location.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StateRepository extends JpaRepository<State, UUID> {

    Optional<State> findByCode(String code);

    Optional<State> findByName(String name);

    boolean existsByName(String name);
}
