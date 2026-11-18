package com.school.attendance.audit.enums;

/**
 * Categories for audit log entries
 * Used to classify different types of administrative actions and system events
 */
public enum AuditLogCategory {
    // Policy & Academic
    POLICY_UPDATE("Policy Update", "bg-blue-100 text-blue-700"),
    POLICY_SYNC("Policy Sync", "bg-teal-100 text-teal-700"),
    ACADEMIC_CALENDAR("Academic Calendar", "bg-indigo-100 text-indigo-700"),

    // Staff & Personnel
    STAFF_MANDATE("Staff Mandate", "bg-gray-200 text-blue-700"),
    STAFF_APPOINTMENT("Staff Appointment", "bg-purple-100 text-purple-700"),
    STAFF_TERMINATION("Staff Termination", "bg-red-100 text-red-700"),

    // Financial
    FINANCE_POLICY("Finance Policy", "bg-amber-100 text-amber-800"),
    PAYMENT_CONFIG("Payment Configuration", "bg-yellow-100 text-yellow-800"),
    BUDGET_APPROVAL("Budget Approval", "bg-green-100 text-green-700"),

    // Security & Authentication
    SECURITY_AUTH("Security Auth", "bg-teal-100 text-teal-700"),
    LOGIN_SUCCESS("Login Success", "bg-green-100 text-green-700"),
    LOGIN_FAILURE("Login Failure", "bg-red-100 text-red-700"),
    PASSWORD_CHANGE("Password Change", "bg-blue-100 text-blue-700"),
    TWO_FACTOR_AUTH("2FA Configuration", "bg-purple-100 text-purple-700"),

    // Tenant Operations
    TENANT_CREATION("Tenant Creation", "bg-emerald-100 text-emerald-700"),
    TENANT_UPDATE("Tenant Update", "bg-blue-100 text-blue-700"),
    TENANT_ACTIVATION("Tenant Activation", "bg-green-100 text-green-700"),
    TENANT_SUSPENSION("Tenant Suspension", "bg-orange-100 text-orange-700"),
    TENANT_DELETION("Tenant Deletion", "bg-red-100 text-red-700"),

    // School & Campus Operations
    SCHOOL_SETUP("School Setup", "bg-gray-200 text-gray-600"),
    SCHOOL_CREATION("School Creation", "bg-emerald-100 text-emerald-700"),
    SCHOOL_UPDATE("School Update", "bg-blue-100 text-blue-700"),
    SCHOOL_DELETION("School Deletion", "bg-red-100 text-red-700"),
    CAMPUS_CONFIG("Campus Configuration", "bg-blue-100 text-blue-700"),
    FACILITY_UPDATE("Facility Update", "bg-indigo-100 text-indigo-700"),

    // Student & Enrollment
    STUDENT_ENROLLMENT("Student Enrollment", "bg-green-100 text-green-700"),
    STUDENT_TRANSFER("Student Transfer", "bg-yellow-100 text-yellow-700"),
    STUDENT_WITHDRAWAL("Student Withdrawal", "bg-red-100 text-red-700"),

    // System & Technical
    SYSTEM_UPDATE("System Update", "bg-gray-100 text-gray-700"),
    DATA_EXPORT("Data Export", "bg-blue-100 text-blue-700"),
    DATA_IMPORT("Data Import", "bg-green-100 text-green-700"),
    BACKUP_RESTORE("Backup/Restore", "bg-purple-100 text-purple-700"),

    // Governance & Compliance
    COMPLIANCE_UPDATE("Compliance Update", "bg-teal-100 text-teal-700"),
    REGULATORY_FILING("Regulatory Filing", "bg-blue-100 text-blue-700"),
    AUDIT_TRAIL("Audit Trail", "bg-gray-100 text-gray-700");

    private final String displayName;
    private final String colorClass;

    AuditLogCategory(String displayName, String colorClass) {
        this.displayName = displayName;
        this.colorClass = colorClass;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getColorClass() {
        return colorClass;
    }
}
