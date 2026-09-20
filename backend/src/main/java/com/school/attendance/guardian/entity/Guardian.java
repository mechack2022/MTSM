//package com.school.attendance.guardian.entity;
//
//import com.school.attendance.common.entity.BaseAuditableEntity;
//import jakarta.persistence.*;
//import lombok.*;
//import lombok.experimental.SuperBuilder;
//
//import java.util.UUID;
//
//@Entity
//@Table(name = "guardian")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@SuperBuilder
//@EqualsAndHashCode(callSuper = true)
//public class Guardian extends BaseAuditableEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @Column(name = "school_id", nullable = false)
//    private UUID schoolId;
//
//    @Column(name = "full_name", nullable = false, length = 255)
//    private String fullName;
//
//    @Column(length = 50)
//    private String phone;
//
//    @Column(length = 255)
//    private String email;
//
//    @Column(length = 500)
//    private String address;
//
//    @Column(name = "preferred_contact_method", length = 20)
//    private String preferredContactMethod;
//
//    @Builder.Default
//    @Column(name = "is_active", nullable = false)
//    private Boolean isActive = true;
//}