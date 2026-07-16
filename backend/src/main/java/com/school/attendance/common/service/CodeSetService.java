package com.school.attendance.common.service;

import com.school.attendance.common.api.MessageKey;
import com.school.attendance.common.dto.CodeSetRequest;
import com.school.attendance.common.dto.CodeSetResponse;
import com.school.attendance.common.entity.CodeSet;
import com.school.attendance.common.enums.CodeSetGroup;
import com.school.attendance.common.exception.BusinessException;
import com.school.attendance.common.mapper.CodeSetMapper;
import com.school.attendance.common.repository.CodeSetRepository;
import com.school.attendance.school.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CodeSetService {

    private final CodeSetRepository codeSetRepository;
    private final SchoolRepository schoolRepository;
    private final CodeSetMapper codeSetMapper;

    @Transactional
    public CodeSetResponse createCodeSet(CodeSetRequest request) {
        UUID schoolId = getSchoolId();
        if (codeSetRepository.existsBySchoolIdAndCodeSetGroupAndCode(
                schoolId, request.codeSetGroup(), request.code())) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_EXISTS);
        }
        CodeSet codeSet = CodeSet.builder()
                .schoolId(schoolId)
                .codeSetGroup(request.codeSetGroup())
                .code(request.code().trim().toUpperCase())
                .displayName(request.displayName().trim())
                .description(request.description())
                .attributes(request.attributes())
                .sortOrder(request.sortOrder())
                .isActive(true)
                .build();

        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    public List<CodeSetResponse> getActiveCodeSetsByGroup(CodeSetGroup group) {
        UUID schoolId = getSchoolId();
        return codeSetRepository
                .findBySchoolIdAndCodeSetGroupAndIsActiveTrueOrderBySortOrderAsc(schoolId, group)
                .stream()
                .map(codeSetMapper::toDto)
                .toList();
    }

    /**
     * Get ALL code sets for a group (including inactive).
     * Useful for admin management screens.
     */
    public List<CodeSetResponse> getAllCodeSetsByGroup(CodeSetGroup group) {
        UUID schoolId = getSchoolId();
        return codeSetRepository
                .findBySchoolIdAndCodeSetGroupOrderBySortOrderAsc(schoolId, group)
                .stream()
                .map(codeSetMapper::toDto)
                .toList();
    }

    /**
     * Get a single code set by ID.
     */
    public CodeSetResponse getCodeSetById(UUID id) {
        UUID schoolId = getSchoolId();

        return codeSetRepository.findById(id)
                .filter(cs -> cs.getSchoolId().equals(schoolId)) // Ensure it belongs to this school
                .map(codeSetMapper::toDto)
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));
    }

    @Transactional
    public CodeSetResponse updateCodeSet(UUID id, CodeSetRequest request) {
        UUID schoolId = getSchoolId();

        CodeSet codeSet = codeSetRepository.findById(id)
                .filter(cs -> cs.getSchoolId().equals(schoolId))
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));

        if (!codeSet.getCode().equalsIgnoreCase(request.code())) {
            if (codeSetRepository.existsBySchoolIdAndCodeSetGroupAndCode(
                    schoolId, request.codeSetGroup(), request.code())) {
                throw new BusinessException(MessageKey.CODESET_ALREADY_EXISTS);
            }
        }

        codeSet.setCodeSetGroup(request.codeSetGroup());
        codeSet.setCode(request.code().trim().toUpperCase());
        codeSet.setDisplayName(request.displayName().trim());
        codeSet.setDescription(request.description());
        codeSet.setAttributes(request.attributes());
        codeSet.setSortOrder(request.sortOrder());

        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    @Transactional
    public CodeSetResponse deactivateCodeSet(UUID id) {
        CodeSet codeSet = findCodeSetById(id);

        if (!codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_DEACTIVATED);
        }
        codeSet.setIsActive(false);
        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    /**
     * Reactivate a previously deactivated code set.
     * Idempotent - safe to call multiple times.
     */
    @Transactional
    public CodeSetResponse activateCodeSet(UUID id) {
        CodeSet codeSet = findCodeSetById(id);

        if (codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_ALREADY_ACTIVE);
        }

        codeSet.setIsActive(true);
        return codeSetMapper.toDto(codeSetRepository.save(codeSet));
    }

    public void validateCodeExists(CodeSetGroup group, UUID codeSetId) {
        UUID schoolId = getSchoolId();

        CodeSet codeSet = codeSetRepository.findById(codeSetId)
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));

        if (!codeSet.getSchoolId().equals(schoolId)
                || !codeSet.getCodeSetGroup().equals(group)
                || !codeSet.getIsActive()) {
            throw new BusinessException(MessageKey.CODESET_NOT_FOUND);
        }
    }


    private CodeSet findCodeSetById(UUID id) {
        UUID schoolId = getSchoolId();
        return codeSetRepository.findById(id)
                .filter(cs -> cs.getSchoolId().equals(schoolId))
                .orElseThrow(() -> new BusinessException(MessageKey.CODESET_NOT_FOUND));
    }

    private UUID getSchoolId() {
        return schoolRepository.findFirstByOrderByIdAsc()
                .map(school -> school.getId())
                .orElseThrow(() -> new BusinessException(MessageKey.INTERNAL_ERROR));
    }
}
