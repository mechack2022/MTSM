package com.school.attendance.security;

public final class JwtClaims {

    private JwtClaims() {
    }

    public static final String USER_ID = "userId";

    public static final String TENANT_ID = "tenantId";

    public static final String ROLE_ID = "roleId";

    public static final String ASSIGNED_SCHOOL_IDS = "assignedSchoolIds";

    public static final String PERMISSION_CODES = "permissionCodes";
}
