package com.school.attendance.classsection.dto;

import java.util.UUID;

public record ClassSectionResponse(
        UUID id,
        String name,
        String gradeLevel,
        String academicYear,
        UUID classTeacherId,
        String classTeacherName,
        Integer capacity,
        Boolean isActive
) {}