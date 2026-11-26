package com.school.attendance.classmanagement.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.school.attendance.user.entity.SchoolSection;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
public enum ClassName {
    // Early Years (Nursery/Pre-Primary)
    CRECHE("Crèche"),
    PRE_NURSERY("Pre-Nursery"),
    NURSERY_1("Nursery 1"),
    NURSERY_2("Nursery 2"),
    RECEPTION("Reception"),

    // Primary
    PRIMARY_1("Primary 1"),
    PRIMARY_2("Primary 2"),
    PRIMARY_3("Primary 3"),
    PRIMARY_4("Primary 4"),
    PRIMARY_5("Primary 5"),
    PRIMARY_6("Primary 6"),

    // Junior Secondary
    JSS_1("JSS 1"),
    JSS_2("JSS 2"),
    JSS_3("JSS 3"),

    // Senior Secondary
    SSS_1("SSS 1"),
    SSS_2("SSS 2"),
    SSS_3("SSS 3");

    private final String displayName;

    ClassName(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static ClassName fromString(String value) {
        if (value == null) {
            return null;
        }
        for (ClassName className : ClassName.values()) {
            if (className.displayName.equalsIgnoreCase(value) ||
                className.name().equalsIgnoreCase(value)) {
                return className;
            }
        }
        throw new IllegalArgumentException("Unknown class name: " + value);
    }

    /**
     * Get all class names for a specific school section
     */
    public static List<ClassName> getClassNamesForSection(SchoolSection section) {
        return switch (section) {
            case EARLY_YEARS -> List.of(CRECHE, PRE_NURSERY, NURSERY_1, NURSERY_2, RECEPTION);
            case PRIMARY -> List.of(PRIMARY_1, PRIMARY_2, PRIMARY_3, PRIMARY_4, PRIMARY_5, PRIMARY_6);
            case JUNIOR_SECONDARY -> List.of(JSS_1, JSS_2, JSS_3);
            case SENIOR_SECONDARY -> List.of(SSS_1, SSS_2, SSS_3);
        };
    }

    @Override
    public String toString() {
        return displayName;
    }
}
