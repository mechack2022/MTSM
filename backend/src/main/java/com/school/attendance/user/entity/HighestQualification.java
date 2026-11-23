package com.school.attendance.user.entity;

public enum HighestQualification {
    NCE,
    B_ED,
    B_SC_PGDE,
    M_ED_M_SC,
    PGDE,
    REGISTERED_NURSE,
    OND_HND_GENERAL;

    public String getDisplayName() {
        return switch (this) {
            case NCE -> "NCE (National Certificate in Education)";
            case B_ED -> "B.Ed (Bachelor of Education)";
            case B_SC_PGDE -> "B.Sc / B.A + PGDE";
            case M_ED_M_SC -> "M.Ed / M.Sc";
            case PGDE -> "PGDE";
            case REGISTERED_NURSE -> "Registered Nurse (RN / RM)";
            case OND_HND_GENERAL -> "OND / HND / General";
        };
    }
}
