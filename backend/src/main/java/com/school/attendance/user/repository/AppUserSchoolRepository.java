package com.school.attendance.user.repository;

import com.school.attendance.user.entity.AppUserSchool;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppUserSchoolRepository extends JpaRepository<AppUserSchool, UUID> {
    Optional<AppUserSchool> findByAppUserIdAndSchoolId(UUID appUserId, UUID schoolId);
    void deleteByAppUserIdAndSchoolId(UUID appUserId, UUID schoolId);
    List<AppUserSchool> findByAppUserId(UUID appUserId);
    boolean existsByAppUserIdAndSchoolId(UUID appUserId, UUID schoolId);
    List<AppUserSchool> findBySchoolIdIn(List<UUID> schoolIds);

    @Modifying
    @Transactional
    @Query("DELETE FROM AppUserSchool a WHERE a.appUserId = :appUserId")
    void deleteByAppUserId(@Param("appUserId") UUID appUserId);
}