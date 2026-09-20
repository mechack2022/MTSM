package com.school.attendance.device.entity;

//import com.school.attendance.common.entity.BaseAuditableEntity;
//import jakarta.persistence.*;
//import lombok.*;
//import lombok.experimental.SuperBuilder;
//import java.time.Instant;
//import java.util.UUID;
//
//@Entity
//@Table(name = "device")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@SuperBuilder
//@EqualsAndHashCode(callSuper = true)
//public class Device extends BaseAuditableEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @Column(name = "app_user_id", nullable = false)
//    private UUID appUserId;
//
//    @Column(name = "device_label", length = 100)
//    private String deviceLabel;
//
//    @Column(name = "app_version", length = 20)
//    private String appVersion;
//
//    @Column(name = "last_sync_at")
//    private Instant lastSyncAt;
//
//    @Builder.Default
//    @Column(name = "is_active", nullable = false)
//    private Boolean isActive = true;
//}


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "device")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "app_user_id", nullable = false)
    private UUID appUserId;

    @Column(name = "device_label", length = 100)
    private String deviceLabel;

    @Column(name = "app_version", length = 20)
    private String appVersion;

    @Column(name = "last_sync_at")
    private Instant lastSyncAt;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Builder.Default
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}


