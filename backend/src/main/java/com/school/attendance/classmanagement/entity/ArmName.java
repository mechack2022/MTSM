package com.school.attendance.classmanagement.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.school.attendance.user.entity.SchoolSection;
import lombok.Getter;

import java.util.List;

@Getter
public enum ArmName {
    // Early Years Arm Names
    SUNSHINE("Sunshine"),
    RAINBOW("Rainbow"),
    STARS("Stars"),
    DOLPHINS("Dolphins"),
    BUTTERFLIES("Butterflies"),
    LITTLE_ANGELS("Little Angels"),
    BLUEBELL("Bluebell"),
    DAISY("Daisy"),
    RUBY("Ruby"),

    // Primary & Secondary Gemstone Arm Names
    GOLD("Gold"),
    SILVER("Silver"),
    DIAMOND("Diamond"),
    EMERALD("Emerald"),
    SAPPHIRE("Sapphire"),
    PEARL("Pearl"),

    // Junior Secondary Specific
    BRONZE("Bronze"),
    TECH("Tech"),
    BUSINESS("Business"),
    AGRIC("Agric"),
    BECE_ALPHA("BECE Alpha"),
    BECE_BETA("BECE Beta"),

    // Senior Secondary Specific
    SCIENCE("Science"),
    COMMERCIAL("Commercial"),
    ARTS("Arts"),
    HUMANITIES("Humanities"),
    SCIENCE_TECH("Science & Tech"),
    ARTS_HUMANITIES("Arts & Humanities"),
    WAEC_INTENSIVE("WAEC Intensive");

    private final String displayName;

    ArmName(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static ArmName fromString(String value) {
        if (value == null) {
            return null;
        }
        for (ArmName armName : ArmName.values()) {
            if (armName.displayName.equalsIgnoreCase(value) ||
                armName.name().equalsIgnoreCase(value)) {
                return armName;
            }
        }
        throw new IllegalArgumentException("Unknown arm name: " + value);
    }

    /**
     * Get suggested arm names for a specific school section
     */
    public static List<ArmName> getArmNamesForSection(SchoolSection section) {
        return switch (section) {
            case EARLY_YEARS -> List.of(
                SUNSHINE, RAINBOW, STARS, DOLPHINS, BUTTERFLIES,
                LITTLE_ANGELS, BLUEBELL, DAISY, RUBY
            );
            case PRIMARY -> List.of(
                GOLD, SILVER, DIAMOND, EMERALD, RUBY, SAPPHIRE, PEARL
            );
            case JUNIOR_SECONDARY -> List.of(
                DIAMOND, SILVER, PEARL, SAPPHIRE, EMERALD, BRONZE,
                TECH, BUSINESS, AGRIC, BECE_ALPHA, BECE_BETA
            );
            case SENIOR_SECONDARY -> List.of(
                GOLD, SILVER, DIAMOND, EMERALD, RUBY,
                SCIENCE, COMMERCIAL, ARTS, HUMANITIES,
                SCIENCE_TECH, ARTS_HUMANITIES, WAEC_INTENSIVE
            );
        };
    }

    @Override
    public String toString() {
        return displayName;
    }
}
