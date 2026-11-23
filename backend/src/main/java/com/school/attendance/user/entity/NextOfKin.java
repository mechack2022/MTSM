package com.school.attendance.user.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NextOfKin {
    private String name;
    private String phone;
    private String relationship;
}
