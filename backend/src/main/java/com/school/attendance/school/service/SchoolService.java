package com.school.attendance.school.service;

import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.location.entity.LocalGovernment;
import com.school.attendance.location.entity.State;
import com.school.attendance.location.repository.LocalGovernmentRepository;
import com.school.attendance.location.repository.StateRepository;
import com.school.attendance.school.dto.CreateSchoolRequest;
import com.school.attendance.school.dto.SchoolResponse;
import com.school.attendance.school.dto.UpdateSchoolRequest;
import com.school.attendance.school.entity.School;
import com.school.attendance.school.enums.EducationalTier;
import com.school.attendance.school.repository.SchoolRepository;
import com.school.attendance.tenant.entity.Tenant;
import com.school.attendance.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final TenantRepository tenantRepository;
    private final StateRepository stateRepository;
    private final LocalGovernmentRepository localGovernmentRepository;
    private final CampusCodeGenerator campusCodeGenerator;

    @Transactional
    public SchoolResponse createSchool(UUID tenantId, CreateSchoolRequest request) {
        // Get tenant information
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + tenantId));

        // Auto-generate campus code if not provided
        String campusCode = request.campusCode();
        if (campusCode == null || campusCode.isBlank()) {
            campusCode = campusCodeGenerator.generateCampusCode(tenant.getCode(), tenantId);
            log.info("Auto-generated campus code: {} for tenant: {}", campusCode, tenant.getCode());
        } else {
            // If provided, check for duplicate
            if (schoolRepository.existsByCampusCode(campusCode)) {
                throw new DuplicateResourceException("A school with this campus code already exists: " + campusCode);
            }
        }

        // Fetch state entity
        State state = stateRepository.findById(request.stateId())
                .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));

        // Fetch local government entity if provided
        LocalGovernment localGovernment = null;
        if (request.localGovernmentId() != null) {
            localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));

            // Validate that LGA belongs to the selected state
            if (!localGovernment.getState().getId().equals(request.stateId())) {
                throw new IllegalArgumentException("Local Government does not belong to the selected state");
            }
        }

        // Determine educational tiers based on topology
        Set<EducationalTier> educationalTiers;
        if (request.topology() == School.Topology.COMPOSITE) {
            // COMPOSITE schools automatically get ALL tiers
            educationalTiers = new HashSet<>(Arrays.asList(EducationalTier.values()));
            log.info("COMPOSITE topology selected - assigning all educational tiers");
        } else {
            // STANDALONE/SATELLITE schools use user-selected tiers
            educationalTiers = request.educationalTiers() != null && !request.educationalTiers().isEmpty()
                    ? new HashSet<>(request.educationalTiers())
                    : new HashSet<>();
            log.info("{} topology selected - using user-selected tiers: {}", request.topology(), educationalTiers);
        }

        School school = School.builder()
                .tenantId(tenantId)
                .name(request.name())
                .campusCode(campusCode)
                .topology(request.topology())
                .educationalTiers(educationalTiers)
                .state(state)
                .localGovernment(localGovernment)
                .physicalAddress(request.physicalAddress())
                .schoolHeadName(request.schoolHeadName())
                .schoolHeadEmail(request.schoolHeadEmail())
                .schoolHeadPhone(request.schoolHeadPhone())
                .seatCapacity(request.seatCapacity())
                .currentStudents(0)
                .currentTeachers(0)
                .status(School.SchoolStatus.ACTIVE)
                .build();

        School savedSchool = schoolRepository.save(school);
        log.info("Created school: {} ({}) for tenant: {}", savedSchool.getName(), savedSchool.getCampusCode(), tenantId);

        return SchoolResponse.from(savedSchool);
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllByTenantId(tenantId).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> getAllActiveSchoolsByTenant(UUID tenantId) {
        return schoolRepository.findAllActiveByTenantId(tenantId).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public SchoolResponse getSchoolById(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        return SchoolResponse.from(school);
    }

    @Transactional(readOnly = true)
    public SchoolResponse getSchoolByCampusCode(String campusCode, UUID tenantId) {
        School school = schoolRepository.findByCampusCode(campusCode)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with campus code: " + campusCode));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with campus code: " + campusCode);
        }

        return SchoolResponse.from(school);
    }

    @Transactional
    public SchoolResponse updateSchool(UUID id, UUID tenantId, UpdateSchoolRequest request) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        if (request.name() != null) school.setName(request.name());

        // Handle topology and educational tiers together
        if (request.topology() != null) {
            school.setTopology(request.topology());

            // If topology is changed to COMPOSITE, auto-assign all tiers
            if (request.topology() == School.Topology.COMPOSITE) {
                Set<EducationalTier> allTiers = new HashSet<>(Arrays.asList(EducationalTier.values()));
                school.setEducationalTiers(allTiers);
                log.info("Topology changed to COMPOSITE - auto-assigning all educational tiers");
            } else if (request.educationalTiers() != null) {
                // For STANDALONE/SATELLITE, use provided tiers
                school.setEducationalTiers(request.educationalTiers());
                log.info("Topology changed to {} - using provided tiers: {}", request.topology(), request.educationalTiers());
            }
        } else if (request.educationalTiers() != null) {
            // Only update tiers if topology wasn't changed
            school.setEducationalTiers(request.educationalTiers());
        }

        // Update state if provided
        if (request.stateId() != null) {
            State state = stateRepository.findById(request.stateId())
                    .orElseThrow(() -> new ResourceNotFoundException("State not found with id: " + request.stateId()));
            school.setState(state);
        }

        // Update local government if provided
        if (request.localGovernmentId() != null) {
            LocalGovernment localGovernment = localGovernmentRepository.findById(request.localGovernmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Local Government not found with id: " + request.localGovernmentId()));

            // Validate that LGA belongs to the current or new state
            UUID currentStateId = school.getState() != null ? school.getState().getId() : null;
            if (currentStateId != null && !localGovernment.getState().getId().equals(currentStateId)) {
                throw new IllegalArgumentException("Local Government does not belong to the school's state");
            }
            school.setLocalGovernment(localGovernment);
        }

        if (request.physicalAddress() != null) school.setPhysicalAddress(request.physicalAddress());
        if (request.schoolHeadName() != null) school.setSchoolHeadName(request.schoolHeadName());
        if (request.schoolHeadEmail() != null) school.setSchoolHeadEmail(request.schoolHeadEmail());
        if (request.schoolHeadPhone() != null) school.setSchoolHeadPhone(request.schoolHeadPhone());
        if (request.seatCapacity() != null) school.setSeatCapacity(request.seatCapacity());
        if (request.status() != null) school.setStatus(request.status());

        School updatedSchool = schoolRepository.save(school);
        log.info("Updated school: {} ({}) for tenant: {}", updatedSchool.getName(), updatedSchool.getCampusCode(), tenantId);

        return SchoolResponse.from(updatedSchool);
    }

    @Transactional
    public void deleteSchool(UUID id, UUID tenantId) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));

        // Verify the school belongs to the tenant
        if (!school.getTenantId().equals(tenantId)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }

        // Soft delete - set deletedAt timestamp
        school.setDeletedAt(Instant.now());
        schoolRepository.save(school);
        log.info("Soft deleted school: {} ({}) for tenant: {}", school.getName(), school.getCampusCode(), tenantId);
    }

    @Transactional(readOnly = true)
    public List<SchoolResponse> searchSchools(UUID tenantId, String searchTerm) {
        return schoolRepository.searchByTenantIdAndNameOrCode(tenantId, searchTerm).stream()
                .map(SchoolResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public long countActiveSchools(UUID tenantId) {
        return schoolRepository.countActiveByTenantId(tenantId);
    }

    @Transactional(readOnly = true)
    public int sumCurrentStudents(UUID tenantId) {
        return schoolRepository.sumCurrentStudentsByTenantId(tenantId);
    }

    @Transactional(readOnly = true)
    public int sumCurrentTeachers(UUID tenantId) {
        return schoolRepository.sumCurrentTeachersByTenantId(tenantId);
    }
}
