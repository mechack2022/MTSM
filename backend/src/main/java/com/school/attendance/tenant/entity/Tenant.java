package com.school.attendance.tenant.entity;

import com.school.attendance.common.entity.BaseAuditableEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "tenant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class Tenant extends BaseAuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    // ✅ Enforced by DB: exactly 6 uppercase alphanumeric characters
    @Column(nullable = false, unique = true, length = 6, updatable = false)
    private String code;

    @Column(name = "contact_email", length = 255, unique = true)
    private String contactEmail;

    @Column(name = "contact_phone", length = 50, unique = true)
    private String contactPhone;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
