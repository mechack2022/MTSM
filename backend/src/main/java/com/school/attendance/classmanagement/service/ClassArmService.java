package com.school.attendance.classmanagement.service;

import com.school.attendance.classmanagement.dto.ClassArmResponse;
import com.school.attendance.classmanagement.dto.CreateClassArmRequest;
import com.school.attendance.classmanagement.dto.UpdateClassArmRequest;
import com.school.attendance.classmanagement.entity.ClassArm;
import com.school.attendance.classmanagement.repository.ClassArmRepository;
import com.school.attendance.common.exception.DuplicateResourceException;
import com.school.attendance.common.exception.ResourceNotFoundException;
import com.school.attendance.user.entity.SchoolSection;
import com.school.attendance.user.entity.Staff;
import com.school.attendance.user.entity.User;
import com.school.attendance.user.repository.StaffRepository;
import com.school.attendance.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClassArmService {

    private final ClassArmRepository classArmRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    @Transactional
    public ClassArmResponse createClassArm(UUID schoolId, UUID tenantId, UUID createdBy,
                                           CreateClassArmRequest request) {
        log.info("Creating class arm: {} {} for school: {}", request.getClassName(), request.getArmName(), schoolId);

        // Check for duplicate class arm (class name + arm name must be unique within school and academic year)
        boolean exists;
        if (request.getAcademicYearId() != null) {
            exists = classArmRepository.existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdAndDeletedAtIsNull(
                    schoolId, request.getClassName(), request.getArmName(), request.getAcademicYearId());
        } else {
            // When no academic year specified, check for duplicates without academic year
            exists = classArmRepository.existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdIsNullAndDeletedAtIsNull(
                    schoolId, request.getClassName(), request.getArmName());
        }

        if (exists) {
            throw new DuplicateResourceException(
                    "Class arm '" + request.getClassName().getDisplayName() + " " + request.getArmName().getDisplayName() +
                            "' already exists" + (request.getAcademicYearId() != null ? " for this academic year" : ""));
        }

        // Validate lead caregiver if provided
        if (request.getLeadCaregiverId() != null) {
            validateLeadCaregiver(request.getLeadCaregiverId(), request.getSchoolSection(), schoolId, null);
        }

        // Create class arm
        ClassArm classArm = ClassArm.builder()
                .tenantId(tenantId)
                .schoolId(schoolId)
                .schoolSection(request.getSchoolSection())
                .className(request.getClassName())
                .armName(request.getArmName())
                .capacity(request.getCapacity())
                .currentEnrollment(0)
                .leadCaregiverId(request.getLeadCaregiverId())
                .academicYearId(request.getAcademicYearId())
                .isActive(request.getIsActive())
                .createdBy(createdBy)
                .build();

        ClassArm savedClassArm = classArmRepository.save(classArm);
        log.info("Created class arm: {} with ID: {}", savedClassArm.getFullName(), savedClassArm.getId());

        return toClassArmResponse(savedClassArm);
    }

    @Transactional(readOnly = true)
    public List<ClassArmResponse> getAllClassArmsBySchool(UUID schoolId) {
        return classArmRepository.findBySchoolIdAndDeletedAtIsNull(schoolId).stream()
                .map(this::toClassArmResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ClassArmResponse> getClassArmsBySchoolAndSection(UUID schoolId, SchoolSection section) {
        return classArmRepository.findBySchoolIdAndSchoolSectionAndDeletedAtIsNull(schoolId, section).stream()
                .map(this::toClassArmResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ClassArmResponse> getClassArmsBySchoolAndAcademicYear(UUID schoolId, UUID academicYearId) {
        return classArmRepository.findBySchoolIdAndAcademicYearIdAndDeletedAtIsNull(schoolId, academicYearId).stream()
                .map(this::toClassArmResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClassArmResponse getClassArmById(UUID id, UUID schoolId) {
        ClassArm classArm = classArmRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class arm not found with id: " + id));

        if (!classArm.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Class arm not found with id: " + id);
        }

        return toClassArmResponse(classArm);
    }

    @Transactional
    public ClassArmResponse updateClassArm(UUID id, UUID schoolId, UUID updatedBy,
                                           UpdateClassArmRequest request) {
        ClassArm classArm = classArmRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class arm not found with id: " + id));

        if (!classArm.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Class arm not found with id: " + id);
        }

        // Check for duplicate if class name or arm name is being changed
        boolean classNameChanged = request.getClassName() != null && !request.getClassName().equals(classArm.getClassName());
        boolean armNameChanged = request.getArmName() != null && !request.getArmName().equals(classArm.getArmName());

        if (classNameChanged || armNameChanged) {
            var newClassName = request.getClassName() != null ? request.getClassName() : classArm.getClassName();
            var newArmName = request.getArmName() != null ? request.getArmName() : classArm.getArmName();

            boolean exists;
            if (classArm.getAcademicYearId() != null) {
                exists = classArmRepository.existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdAndDeletedAtIsNull(
                        schoolId, newClassName, newArmName, classArm.getAcademicYearId());
            } else {
                exists = classArmRepository.existsBySchoolIdAndClassNameAndArmNameAndAcademicYearIdIsNullAndDeletedAtIsNull(
                        schoolId, newClassName, newArmName);
            }

            if (exists) {
                throw new DuplicateResourceException(
                        "Class arm '" + newClassName.getDisplayName() + " " + newArmName.getDisplayName() +
                                "' already exists" + (classArm.getAcademicYearId() != null ? " for this academic year" : ""));
            }
        }

        // Update fields if provided
        if (request.getClassName() != null) {
            classArm.setClassName(request.getClassName());
        }

        if (request.getArmName() != null) {
            classArm.setArmName(request.getArmName());
        }

        if (request.getCapacity() != null) {
            // Validate new capacity is not less than current enrollment
            if (request.getCapacity() < classArm.getCurrentEnrollment()) {
                throw new IllegalArgumentException(
                        "Cannot set capacity (" + request.getCapacity() +
                                ") lower than current enrollment (" + classArm.getCurrentEnrollment() + ")");
            }
            classArm.setCapacity(request.getCapacity());
        }

        if (request.getLeadCaregiverId() != null) {
            validateLeadCaregiver(request.getLeadCaregiverId(), classArm.getSchoolSection(), schoolId, classArm.getId());
            classArm.setLeadCaregiverId(request.getLeadCaregiverId());
        }

        if (request.getIsActive() != null) {
            classArm.setIsActive(request.getIsActive());
        }

        classArm.setUpdatedBy(updatedBy);

        ClassArm updatedClassArm = classArmRepository.save(classArm);
        log.info("Updated class arm: {} - {}", updatedClassArm.getId(), updatedClassArm.getFullName());

        return toClassArmResponse(updatedClassArm);
    }

    @Transactional
    public void deleteClassArm(UUID id, UUID schoolId, UUID deletedBy) {
        ClassArm classArm = classArmRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class arm not found with id: " + id));

        if (!classArm.getSchoolId().equals(schoolId)) {
            throw new ResourceNotFoundException("Class arm not found with id: " + id);
        }

        // Check if class arm has students enrolled
        if (classArm.getCurrentEnrollment() > 0) {
            throw new IllegalStateException(
                    "Cannot delete class arm with enrolled students. Please reassign students first.");
        }

        classArm.softDelete(deletedBy);
        classArmRepository.save(classArm);
        log.info("Soft deleted class arm: {} - {}", classArm.getId(), classArm.getFullName());
    }

    @Transactional(readOnly = true)
    public long countClassArmsBySchool(UUID schoolId) {
        return classArmRepository.countBySchoolId(schoolId);
    }

    @Transactional(readOnly = true)
    public long countClassArmsBySchoolAndSection(UUID schoolId, SchoolSection section) {
        return classArmRepository.countBySchoolIdAndSection(schoolId, section);
    }

    @Transactional(readOnly = true)
    public List<ClassArmResponse> searchClassArms(UUID schoolId, String searchTerm) {
        return classArmRepository.searchBySchoolId(schoolId, searchTerm).stream()
                .map(this::toClassArmResponse)
                .toList();
    }

    /**
     * Get eligible staff for a specific school section
     * Staff must be:
     * - From the same school section
     * - Account activated (accountActivatedAt is not null)
     * - Email verified (via User entity)
     * - Employment status is ACTIVE or ON_LEAVE
     */
    @Transactional(readOnly = true)
    public List<Staff> getEligibleStaffForSection(UUID schoolId, SchoolSection section) {
        List<Staff> sectionStaff = staffRepository.findBySchoolIdAndSchoolSectionAndDeletedAtIsNull(schoolId, section);

        return sectionStaff.stream()
                .filter(staff -> staff.getAccountActivatedAt() != null) // Must have activated account
                .filter(staff -> staff.getUserId() != null) // Must have user account
                .filter(staff -> {
                    // Check if email is verified via User entity
                    return userRepository.findByKeycloakId(staff.getUserId().toString())
                            .map(User::getEmailVerified)
                            .orElse(false);
                })
                .filter(staff -> "ACTIVE".equals(staff.getEmploymentStatus()) ||
                                 "ON_LEAVE".equals(staff.getEmploymentStatus())) // Active or temporarily away
                .toList();
    }

    /**
     * Validate that the staff member is eligible to be a lead caregiver for the given section
     * @param staffId The ID of the staff member to validate
     * @param section The school section for the class arm
     * @param schoolId The school ID
     * @param excludeClassArmId Class arm ID to exclude from assignment check (used when updating)
     */
    private void validateLeadCaregiver(UUID staffId, SchoolSection section, UUID schoolId, UUID excludeClassArmId) {
        Staff staff = staffRepository.findByIdAndDeletedAtIsNull(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + staffId));

        // Must be from same school
        if (!staff.getSchoolId().equals(schoolId)) {
            throw new IllegalArgumentException("Staff must be from the same school");
        }

        // Must be from same section
        if (!staff.getSchoolSection().equals(section)) {
            throw new IllegalArgumentException(
                    "Staff must be from the same school section. Expected: " + section +
                            ", but staff is in: " + staff.getSchoolSection());
        }

        // Must have activated account
        if (staff.getAccountActivatedAt() == null) {
            throw new IllegalArgumentException("Staff member has not activated their account yet");
        }

        // Must have verified email
        if (staff.getUserId() != null) {
            User user = userRepository.findByKeycloakId(staff.getUserId().toString())
                    .orElseThrow(() -> new ResourceNotFoundException("User account not found for staff"));

            if (!Boolean.TRUE.equals(user.getEmailVerified())) {
                throw new IllegalArgumentException("Staff member's email is not verified");
            }
        } else {
            throw new IllegalArgumentException("Staff member does not have a user account");
        }

        // Must be active or on leave
        if (!"ACTIVE".equals(staff.getEmploymentStatus()) && !"ON_LEAVE".equals(staff.getEmploymentStatus())) {
            throw new IllegalArgumentException(
                    "Staff member must have ACTIVE or ON_LEAVE employment status. Current status: " +
                            staff.getEmploymentStatus());
        }

        // Check if staff is already assigned to another class arm
        List<ClassArm> assignedClassArms = classArmRepository.findBySchoolIdAndLeadCaregiver(schoolId, staffId);

        // Filter out the class arm being updated (if any)
        List<ClassArm> otherAssignments = assignedClassArms.stream()
                .filter(ca -> excludeClassArmId == null || !ca.getId().equals(excludeClassArmId))
                .toList();

        if (!otherAssignments.isEmpty()) {
            ClassArm existingAssignment = otherAssignments.get(0);
            throw new IllegalArgumentException(
                    staff.getFullName() + " is already assigned as lead " +
                            (section == SchoolSection.EARLY_YEARS ? "caregiver" : "form teacher") +
                            " for '" + existingAssignment.getFullName() + "'. " +
                            "A teacher can only lead one class at a time.");
        }
    }

    private ClassArmResponse toClassArmResponse(ClassArm classArm) {
        ClassArmResponse.ClassArmResponseBuilder builder = ClassArmResponse.builder()
                .id(classArm.getId())
                .tenantId(classArm.getTenantId())
                .schoolId(classArm.getSchoolId())
                .schoolSection(classArm.getSchoolSection())
                .schoolSectionDisplay(classArm.getSchoolSection() != null ?
                        classArm.getSchoolSection().getDisplayName() : null)
                .className(classArm.getClassName())
                .classNameDisplay(classArm.getClassName() != null ?
                        classArm.getClassName().getDisplayName() : null)
                .armName(classArm.getArmName())
                .armNameDisplay(classArm.getArmName() != null ?
                        classArm.getArmName().getDisplayName() : null)
                .fullName(classArm.getFullName())
                .capacity(classArm.getCapacity())
                .currentEnrollment(classArm.getCurrentEnrollment())
                .availableCapacity(classArm.getAvailableCapacity())
                .isFull(classArm.isFull())
                .academicYearId(classArm.getAcademicYearId())
                .isActive(classArm.getIsActive())
                .createdAt(classArm.getCreatedAt())
                .updatedAt(classArm.getUpdatedAt())
                .deletedAt(classArm.getDeletedAt())
                .createdBy(classArm.getCreatedBy())
                .updatedBy(classArm.getUpdatedBy());

        // Add lead caregiver info if assigned
        if (classArm.getLeadCaregiverId() != null) {
            staffRepository.findByIdAndDeletedAtIsNull(classArm.getLeadCaregiverId())
                    .ifPresent(staff -> {
                        builder.leadCaregiverId(staff.getId());
                        builder.leadCaregiverName(staff.getFullName());
                        builder.leadCaregiverEmail(staff.getEmail());
                    });
        }

        return builder.build();
    }
}
