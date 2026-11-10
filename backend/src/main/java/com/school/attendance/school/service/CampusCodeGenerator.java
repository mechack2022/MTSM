package com.school.attendance.school.service;

import com.school.attendance.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CampusCodeGenerator {

    private final SchoolRepository schoolRepository;

    /**
     * Generate a unique campus code for a tenant
     * Format: TENANT_CODE-XXX (e.g., CROWN-001, CROWN-002)
     *
     * @param tenantCode The tenant's code
     * @param tenantId The tenant's UUID
     * @return A unique campus code
     */
    public String generateCampusCode(String tenantCode, UUID tenantId) {
        // Count existing schools for this tenant to get the next sequence number
        long schoolCount = schoolRepository.findAllByTenantId(tenantId).size();

        String campusCode;
        int sequence = (int) schoolCount + 1;

        // Keep incrementing until we find a unique code
        do {
            campusCode = String.format("%s-%03d", tenantCode, sequence);
            sequence++;
        } while (schoolRepository.existsByCampusCode(campusCode));

        return campusCode;
    }
}
