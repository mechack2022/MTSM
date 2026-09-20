package com.school.attendance.sync.entity;

import com.school.attendance.common.entity.BaseAuditableEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "change_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class ChangeLog extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "school_id", nullable = false)
    private UUID schoolId;

    @Column(name = "entity_type", nullable = false, length = 50)
    private String entityType;

    @Column(name = "entity_id", nullable = false)
    private UUID entityId;

    @Column(name = "operation_type", nullable = false, length = 20)
    private String operationType;

    @Column(name = "change_id", nullable = false)
    private UUID changeId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "changed_data", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> changedData;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "previous_data", columnDefinition = "jsonb")
    private Map<String, Object> previousData;

    @Column(name = "changed_by")
    private UUID changedBy;

    @Builder.Default
    @Column(name = "sync_status", nullable = false, length = 20)
    private String syncStatus = "PENDING";
}