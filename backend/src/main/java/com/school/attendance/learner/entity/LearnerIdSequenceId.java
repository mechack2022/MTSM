package com.school.attendance.learner.entity;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LearnerIdSequenceId implements Serializable {
    private UUID schoolId;
    private Integer year;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LearnerIdSequenceId that)) return false;
        return Objects.equals(schoolId, that.schoolId) && Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(schoolId, year);
    }
}
