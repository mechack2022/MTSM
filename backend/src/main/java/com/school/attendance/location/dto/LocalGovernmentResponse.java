package com.school.attendance.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocalGovernmentResponse {

    private UUID id;
    private String name;
    private UUID stateId;
    private String stateName;
}
