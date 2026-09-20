package com.school.attendance.learner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "learner_id_sequence")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(LearnerIdSequenceId.class)
public class LearnerIdSequence {

    @Id
    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Id
    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "current_value", nullable = false)
    private Long currentValue;
}
