package com.school.attendance.learner.dto;


import lombok.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class StudentIdSequenceId implements Serializable {
    private UUID schoolId;
    private Integer year;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentIdSequenceId that)) return false;
        return Objects.equals(schoolId, that.schoolId) && Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(schoolId, year);
    }
}
