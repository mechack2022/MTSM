package com.school.attendance.tenant.dto;


import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.tenant.entity.Tenant;
import org.springframework.stereotype.Component;

@Component
public class TenantMapper implements EntityMapper<Tenant, TenantResponse> {

    @Override
    public TenantResponse toDto(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getCode(),
                tenant.getContactEmail(),
                tenant.getContactPhone(),
                tenant.getIsActive(),
                tenant.getCreatedAt(),
                tenant.getCreatedBy(),
                tenant.getUpdatedAt(),
                tenant.getUpdatedBy()
        );
    }
}
