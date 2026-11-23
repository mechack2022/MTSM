package com.school.attendance.user.entity;

public enum Department {
    SCIENCES_AND_STEM,
    HUMANITIES_AND_LANGUAGES,
    PRIMARY_HOMEROOM,
    EYFS_AND_CRECHE,
    ADMINISTRATION_AND_OPERATIONS;

    public String getDisplayName() {
        return switch (this) {
            case SCIENCES_AND_STEM -> "Sciences & STEM";
            case HUMANITIES_AND_LANGUAGES -> "Humanities & Languages";
            case PRIMARY_HOMEROOM -> "Primary Homeroom";
            case EYFS_AND_CRECHE -> "EYFS & Crèche";
            case ADMINISTRATION_AND_OPERATIONS -> "Administration & Operations";
        };
    }
}
