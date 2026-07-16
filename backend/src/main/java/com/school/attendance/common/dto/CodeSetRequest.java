package com.school.attendance.common.dto;


import com.school.attendance.common.enums.CodeSetGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record CodeSetRequest(
        @NotNull(message = "Code set group is required")
        CodeSetGroup codeSetGroup,

        @NotBlank(message = "Code is required")
        @Size(max = 50, message = "Code must be 50 characters or less")
        String code,

        @NotBlank(message = "Display name is required")
        @Size(max = 100, message = "Display name must be 100 characters or less")
        String displayName,

        @Size(max = 500, message = "Description must be 500 characters or less")
        String description,

        Map<String, Object> attributes,

        @NotNull(message = "Sort order is required")
        @Positive(message = "Sort order must be a positive number")
        Integer sortOrder
) {}


