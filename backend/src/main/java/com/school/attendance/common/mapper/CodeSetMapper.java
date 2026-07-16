package com.school.attendance.common.mapper;
import com.school.attendance.common.api.EntityMapper;
import com.school.attendance.common.dto.CodeSetResponse;
import com.school.attendance.common.entity.CodeSet;
import org.springframework.stereotype.Component;

@Component
public class CodeSetMapper implements EntityMapper<CodeSet, CodeSetResponse> {

    @Override
    public CodeSetResponse toDto(CodeSet codeSet) {
        return new CodeSetResponse(
                codeSet.getId(),
                codeSet.getCodeSetGroup(),
                codeSet.getCode(),
                codeSet.getDisplayName(),
                codeSet.getDescription(),
                codeSet.getAttributes(),
                codeSet.getSortOrder(),
                codeSet.getIsActive(),
                codeSet.getCreatedAt(),
                codeSet.getCreatedBy()
        );
    }
}
