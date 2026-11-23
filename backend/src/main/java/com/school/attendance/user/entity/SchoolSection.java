package com.school.attendance.user.entity;

public enum SchoolSection {
    EARLY_YEARS("Early Years", "Crèche, Pre-Nursery, Nursery 1-2", "EY"),
    PRIMARY("Primary", "Basic 1-6 (UBE Primary)", "PR"),
    JUNIOR_SECONDARY("Junior Secondary", "JSS 1-3 / Basic 7-9", "JS"),
    SENIOR_SECONDARY("Senior Secondary", "SSS 1-3", "SS");

    private final String displayName;
    private final String description;
    private final String code;

    SchoolSection(String displayName, String description, String code) {
        this.displayName = displayName;
        this.description = description;
        this.code = code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    public String getCode() {
        return code;
    }

    public String getTierName() {
        return this.name();
    }
}
