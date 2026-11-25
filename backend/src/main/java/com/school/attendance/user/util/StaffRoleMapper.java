package com.school.attendance.user.util;

import com.school.attendance.user.entity.StaffRole;

public class StaffRoleMapper {

    public static String toKeycloakRole(StaffRole staffRole) {
        if (staffRole == null) {
            throw new IllegalArgumentException("StaffRole cannot be null");
        }

        return switch (staffRole.getCategory()) {
            case "ADMINISTRATIVE" -> "school_admin";
            case "LEADERSHIP" -> "head_teacher";
            case "EARLY_YEARS", "PRIMARY" -> {
                if (staffRole == StaffRole.FORM_TUTOR) {
                    yield "class_teacher";
                }
                yield "teacher";
            }
            case "JUNIOR_SECONDARY", "SENIOR_SECONDARY" -> {
                if (staffRole == StaffRole.FORM_TUTOR) {
                    yield "class_teacher";
                }
                yield "subject_teacher";
            }
            case "TEACHING" -> {
                if (staffRole == StaffRole.FORM_TUTOR) {
                    yield "class_teacher";
                } else if (staffRole == StaffRole.SUBJECT_TEACHER) {
                    yield "subject_teacher";
                }
                yield "teacher";
            }
            case "SUPPORT" -> "teacher";
            default -> throw new IllegalStateException("Unknown staff role category: " + staffRole.getCategory());
        };
    }

    public static boolean isTeachingRole(String keycloakRole) {
        return keycloakRole.equals("teacher")
                || keycloakRole.equals("subject_teacher")
                || keycloakRole.equals("class_teacher")
                || keycloakRole.equals("head_teacher");
    }

    public static boolean isAdministrativeRole(String keycloakRole) {
        return keycloakRole.equals("school_admin") || keycloakRole.equals("head_teacher");
    }
}
