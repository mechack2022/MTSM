package com.school.attendance.security.permission;

import java.util.Map;
import java.util.Set;

import static com.school.attendance.security.permission.Permission.*;

public class RolePermissionMapper {

    private static final Map<String, Set<Permission>> ROLE_PERMISSIONS = Map.ofEntries(

            Map.entry("PLATFORM_ADMIN", Set.of(values())),

            Map.entry("TENANT_ADMIN", Set.of(
                    TENANT_READ, TENANT_UPDATE,
                    SCHOOL_CREATE, SCHOOL_READ, SCHOOL_UPDATE, SCHOOL_DELETE,
                    USER_CREATE, USER_READ, USER_UPDATE, USER_DELETE, USER_ASSIGN_ROLE,
                    STAFF_CREATE, STAFF_READ, STAFF_UPDATE, STAFF_DELETE, STAFF_ASSIGN,
                    LEARNER_CREATE, LEARNER_READ, LEARNER_UPDATE, LEARNER_DELETE, LEARNER_ENROLL,
                    CLASS_CREATE, CLASS_READ, CLASS_UPDATE, CLASS_DELETE,
                    ATTENDANCE_CREATE, ATTENDANCE_READ, ATTENDANCE_UPDATE, ATTENDANCE_DELETE,
                    REPORT_VIEW_TENANT,
                    AUDIT_LOG_READ,
                    SETTINGS_READ, SETTINGS_UPDATE,
                    CODESET_CREATE, CODESET_READ, CODESET_UPDATE, CODESET_DELETE
            )),

            Map.entry("SCHOOL_ADMIN", Set.of(
                    SCHOOL_READ, SCHOOL_UPDATE,
                    USER_CREATE, USER_READ, USER_UPDATE, USER_ASSIGN_ROLE,
                    STAFF_CREATE, STAFF_READ, STAFF_UPDATE, STAFF_DELETE, STAFF_ASSIGN,
                    LEARNER_CREATE, LEARNER_READ, LEARNER_UPDATE, LEARNER_DELETE, LEARNER_ENROLL,
                    CLASS_CREATE, CLASS_READ, CLASS_UPDATE, CLASS_DELETE,
                    ATTENDANCE_CREATE, ATTENDANCE_READ, ATTENDANCE_UPDATE,
                    REPORT_VIEW_SCHOOL,
                    AUDIT_LOG_READ,
                    SETTINGS_READ,
                    CODESET_READ
            )),

            Map.entry("PRINCIPAL", Set.of(
                    SCHOOL_READ,
                    USER_READ,
                    STAFF_READ, STAFF_UPDATE, STAFF_ASSIGN,
                    LEARNER_CREATE, LEARNER_READ, LEARNER_UPDATE, LEARNER_ENROLL,
                    CLASS_CREATE, CLASS_READ, CLASS_UPDATE,
                    ATTENDANCE_READ,
                    REPORT_VIEW_SCHOOL,
                    SETTINGS_READ,
                    CODESET_READ
            )),

            Map.entry("HEAD_TEACHER", Set.of(
                    SCHOOL_READ,
                    STAFF_READ,
                    LEARNER_CREATE, LEARNER_READ, LEARNER_UPDATE, LEARNER_ENROLL,
                    CLASS_READ, CLASS_UPDATE,
                    ATTENDANCE_CREATE, ATTENDANCE_READ, ATTENDANCE_UPDATE,
                    REPORT_VIEW_CLASS,
                    CODESET_READ
            )),

            Map.entry("CLASS_TEACHER", Set.of(
                    LEARNER_READ,
                    CLASS_READ,
                    ATTENDANCE_CREATE, ATTENDANCE_READ, ATTENDANCE_UPDATE,
                    REPORT_VIEW_CLASS,
                    CODESET_READ
            )),

            Map.entry("SUBJECT_TEACHER", Set.of(
                    LEARNER_READ,
                    CLASS_READ,
                    ATTENDANCE_CREATE, ATTENDANCE_READ, ATTENDANCE_UPDATE,
                    REPORT_VIEW_CLASS,
                    CODESET_READ
            )),

            Map.entry("TEACHER", Set.of(
                    LEARNER_READ,
                    CLASS_READ,
                    ATTENDANCE_CREATE, ATTENDANCE_READ,
                    REPORT_VIEW_OWN,
                    CODESET_READ
            ))
    );

    public static Set<Permission> getPermissions(String role) {
        return ROLE_PERMISSIONS.getOrDefault(role.toUpperCase(), Set.of());
    }

    public static boolean hasPermission(String role, Permission permission) {
        return getPermissions(role).contains(permission);
    }
}
