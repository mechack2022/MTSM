package com.school.attendance.school.enums;

import lombok.Getter;

/**
 * Educational Tiers represent the academic levels offered by a school/campus.
 * A school can offer one or more tiers depending on its topology.
 */
@Getter
public enum EducationalTier {
    EARLY_YEARS("Early Years / Nursery (Crèche - Pre-Primary)"),
    PRIMARY("Primary School (Basic 1 - Basic 6)"),
    JUNIOR_SECONDARY("Junior Secondary (JSS1 - JSS3)"),
    SENIOR_SECONDARY("Senior Secondary (SS1 - SS3)");

    private final String displayName;

    EducationalTier(String displayName) {
        this.displayName = displayName;
    }
}
